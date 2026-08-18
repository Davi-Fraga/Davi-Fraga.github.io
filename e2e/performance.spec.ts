import { expect, test, type Page } from "@playwright/test";

const overflowViewports = [
  { name: "320 mobile", width: 320, height: 800 },
  { name: "375 Pixel 5", width: 375, height: 851 },
  { name: "768 tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

async function waitForMotionReady(page: Page) {
  await expect(page.locator("html")).toHaveAttribute("data-motion", /full|reduced/);
}

test("home full scroll produces no console errors or page errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));

  await page.goto("/");
  await waitForMotionReady(page);
  await page.evaluate(async () => {
    const step = Math.max(1, Math.floor(window.innerHeight * 0.75));
    for (let top = 0; top < document.documentElement.scrollHeight; top += step) {
      window.scrollTo(0, top);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  await page.waitForTimeout(250);

  expect(errors).toEqual([]);
});

test("project visuals reserve non-zero space", async ({ page }) => {
  await page.goto("/");
  const visuals = page.locator("[data-project-visual]");
  await expect(visuals).not.toHaveCount(0);

  for (const visual of await visuals.all()) {
    const box = await visual.boundingBox();
    expect(box?.width).toBeGreaterThan(0);
    expect(box?.height).toBeGreaterThan(0);
  }
});

test("App Router navigation keeps the Lenis runtime balanced", async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  await page.goto("/");
  await waitForMotionReady(page);

  const root = page.locator("html");
  const expectedActive = testInfo.project.name === "chromium-desktop" ? "1" : "0";
  const assertRuntime = async () => {
    await expect(root).toHaveAttribute("data-lenis-instances", expectedActive);
    await expect(root).toHaveAttribute("data-lenis-ticker-callbacks", expectedActive);
    await expect(root).toHaveAttribute("data-lenis-scroll-listeners", expectedActive);

    const lifecycle = await root.evaluate((element) => ({
      created: Number(element.getAttribute("data-lenis-created") ?? "0"),
      destroyed: Number(element.getAttribute("data-lenis-destroyed") ?? "0"),
    }));
    expect(lifecycle.created - lifecycle.destroyed).toBe(Number(expectedActive));
  };

  await assertRuntime();

  for (let index = 0; index < 3; index += 1) {
    await page
      .locator('[data-project-slug="gestao-lgnd"]')
      .getByRole("link", { name: /Ver case completo/i })
      .evaluate((link: HTMLAnchorElement) => link.click());
    await expect(page).toHaveURL(/\/projects\/gestao-lgnd$/);
    await expect(page.locator("#case-content")).toBeVisible();
    await assertRuntime();

    await page
      .getByRole("link", { name: "Voltar aos Projetos" })
      .evaluate((link: HTMLAnchorElement) => link.click());
    await expect(page).toHaveURL(/\/#projetos$/);
    await expect(page.locator("#projetos")).toBeAttached();
    await assertRuntime();
  }
});

for (const viewport of overflowViewports) {
  test(`${viewport.name} has no horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
}
