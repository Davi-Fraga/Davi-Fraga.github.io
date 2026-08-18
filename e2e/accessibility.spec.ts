import { expect, test } from "@playwright/test";

test("home skip link moves focus to main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const link = page.getByRole("link", { name: "Pular para o conteúdo principal" });
  await expect(link).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main-content")).toBeFocused();
});

test("case exposes the same main landmark", async ({ page }) => {
  await page.goto("/projects/gestao-lgnd");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main-content")).toBeFocused();
});

test.describe("reduced motion", () => {
  test.use({ javaScriptEnabled: false });

  test("hero motion content is immediately visible without transforms", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const heading = page.locator("#inicio h1");
    const motionWrapper = heading.locator("..");
    await expect(heading).toBeVisible();
    await expect(page.getByRole("link", { name: /Ver projetos/i })).toBeVisible();
    await expect(motionWrapper).toHaveCSS("opacity", "1");
    await expect(motionWrapper).toHaveCSS("transform", "none");
  });
});

test("home has one correctly ordered h1", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("#inicio h1")).toHaveCount(1);
  await expect(page.locator("#inicio h2").first()).not.toBeVisible();
});

test("architecture diagram uses neutral data-safe text and exposes each node once", async ({ page }) => {
  await page.goto("/");
  const diagram = page.locator('[data-project-slug="gestao-lgnd"] [data-architecture-diagram]');

  await expect(diagram.getByRole("heading", { name: "Fluxo de arquitetura" })).toBeVisible();
  await expect(diagram.getByText("5 etapas", { exact: true })).toBeVisible();
  await expect(diagram.getByRole("list")).toHaveCount(1);

  for (const nodeTitle of [
    "Frontend Next.js",
    "Reverse Proxy & TLS",
    "Core API NestJS",
    "Filas Assíncronas & Cache",
    "Persistência Relacional",
  ]) {
    await expect(diagram.getByText(nodeTitle, { exact: true })).toHaveCount(1);
  }
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("closed menu is hidden and cannot receive focus", async ({ page }) => {
    await page.goto("/");
    const menu = page.locator("#mobile-navigation");
    await expect(menu).toBeHidden();

    await page.keyboard.press("Tab");
    for (let index = 0; index < 8; index += 1) {
      await expect(menu.locator(":focus")).toHaveCount(0);
      await page.keyboard.press("Tab");
    }
  });

  test("menu exposes its relationship and Escape restores toggle focus", async ({ page }) => {
    await page.goto("/");
    const toggle = page.locator('button[aria-controls="mobile-navigation"]');
    await expect(toggle).toHaveAccessibleName("Abrir menu");
    await expect(toggle).toHaveAttribute("aria-controls", "mobile-navigation");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#mobile-navigation")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-navigation")).toBeHidden();
    await expect(toggle).toBeFocused();
  });
});
