import { expect, test } from "@playwright/test";

test.describe("contact email copy", () => {
  test("keeps feedback enabled after the Strict Mode effect replay", async ({ page }) => {
    test.skip(process.env.STRICT_MODE_E2E !== "1", "Requires the Next.js development Strict Mode cycle");

    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: () => Promise.resolve() },
        configurable: true,
      });
    });
    await page.goto("/?motion-primitives-harness=1");

    const copyButton = page
      .getByTestId("strict-mode-copy-harness")
      .locator('button[aria-label="Copiar endereço de e-mail"]');
    await copyButton.scrollIntoViewIfNeeded();
    await copyButton.click();

    await expect(copyButton).toContainText("E-mail copiado");
  });
  test("copies email with successful feedback and polite aria-live announcement", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");

    await page.evaluate(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: {
          writeText: () => Promise.resolve(),
        },
        configurable: true,
      });
    });

    const contactSection = page.locator("#contato");
    await contactSection.scrollIntoViewIfNeeded();

    const copyBtn = contactSection.getByRole("button", { name: /Copiar (endereço de )?e-mail/i });
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    await expect(copyBtn).toContainText("E-mail copiado");
    const announcer = page.locator('[data-testid="copy-email-announcer"]');
    await expect(announcer).toContainText("E-mail copiado");
    await expect(announcer).toHaveAttribute("aria-live", "polite");
  });

  test("shows error feedback when clipboard fails without false success", async ({ page }) => {
    await page.goto("/");

    await page.evaluate(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: {
          writeText: () => Promise.reject(new Error("Permission denied")),
        },
        configurable: true,
      });
    });

    const contactSection = page.locator("#contato");
    await contactSection.scrollIntoViewIfNeeded();

    const copyBtn = contactSection.getByRole("button", { name: /Copiar (endereço de )?e-mail/i });
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    await expect(copyBtn).not.toContainText("E-mail copiado");
    await expect(copyBtn).not.toContainText("Copiado");
    await expect(copyBtn).toContainText(/Erro ao copiar|Não foi possível copiar/i);
    const announcer = page.locator('[data-testid="copy-email-announcer"]');
    await expect(announcer).toContainText(/Não foi possível copiar/i);
    await expect(announcer).toHaveAttribute("aria-live", "polite");
  });

  test("ignores an obsolete clipboard rejection after a newer attempt succeeds", async ({ page }) => {
    await page.addInitScript(() => {
      const attempts: Array<{
        resolve: () => void;
        reject: () => void;
      }> = [];

      Object.defineProperty(navigator, "clipboard", {
        value: {
          writeText: () =>
            new Promise<void>((resolve, reject) => {
              attempts.push({
                resolve,
                reject: () => reject(new Error("Obsolete failure")),
              });
            }),
        },
        configurable: true,
      });

      Object.assign(window, {
        resolveClipboardAttempt: (index: number) => attempts[index]?.resolve(),
        rejectClipboardAttempt: (index: number) => attempts[index]?.reject(),
      });
    });
    await page.goto("/");

    const contactSection = page.locator("#contato");
    await contactSection.scrollIntoViewIfNeeded();
    const copyBtn = contactSection.getByRole("button", { name: /Copiar (endereço de )?e-mail/i });

    await copyBtn.click();
    await copyBtn.click();
    await page.evaluate(() =>
      (window as typeof window & { resolveClipboardAttempt: (index: number) => void })
        .resolveClipboardAttempt(1),
    );
    await expect(copyBtn).toContainText("E-mail copiado");

    await page.evaluate(() =>
      (window as typeof window & { rejectClipboardAttempt: (index: number) => void })
        .rejectClipboardAttempt(0),
    );
    await expect(copyBtn).toContainText("E-mail copiado");
    await expect(page.locator('[data-testid="copy-email-announcer"]')).toContainText(
      "E-mail copiado",
    );
  });
});

test.describe("contact magnetic enhancement", () => {
  test("enables only on capable desktop", async ({ page }, testInfo) => {
    await page.goto("/");
    await expect(page.locator('[data-magnetic-contact]')).toHaveAttribute(
      "data-magnetic",
      testInfo.project.name === "chromium-desktop" ? "enabled" : "disabled",
    );
  });

  test.describe("reduced motion", () => {
    test("stays static", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");
      await expect(page.locator('[data-magnetic-contact]')).toHaveAttribute(
        "data-magnetic",
        "disabled",
      );
    });
  });
});

function expectTouchTarget(box: { width: number; height: number } | null, label: string) {
  expect(box, `${label} must be visible and have a bounding box`).not.toBeNull();
  expect(box!.height, `${label} height`).toBeGreaterThanOrEqual(44);
  expect(box!.width, `${label} width`).toBeGreaterThanOrEqual(44);
}

async function expectLocatorTouchTargets(
  locator: import("@playwright/test").Locator,
  label: string,
) {
  const count = await locator.count();
  expect(count, `${label} must contain expected controls`).toBeGreaterThan(0);

  for (let index = 0; index < count; index += 1) {
    expectTouchTarget(await locator.nth(index).boundingBox(), `${label} control ${index + 1}`);
  }
}

async function expectVisibleLocatorTouchTargets(
  locator: import("@playwright/test").Locator,
  label: string,
) {
  const count = await locator.count();
  expect(count, `${label} must contain expected controls`).toBeGreaterThan(0);

  let visibleCount = 0;
  for (let index = 0; index < count; index += 1) {
    const control = locator.nth(index);
    if (await control.isVisible()) {
      visibleCount += 1;
      expectTouchTarget(await control.boundingBox(), `${label} visible control ${visibleCount}`);
    }
  }
  expect(visibleCount, `${label} must expose visible controls`).toBeGreaterThan(0);
}

function mobileHeaderControls(page: import("@playwright/test").Page) {
  return page.locator("header").locator("a, button");
}

function contactControls(page: import("@playwright/test").Page) {
  return page.locator("#contato").locator("button, a");
}

function footerControls(page: import("@playwright/test").Page) {
  return page.locator("footer").locator("a, button");
}

function mobileViewport() {
  return { viewport: { width: 375, height: 812 } };
}

test.describe("mobile touch targets in header, contact and footer", () => {
  test.use(mobileViewport());

  test("interactive targets are at least 44x44px", async ({ page }) => {
    await page.goto("/");

    await expectVisibleLocatorTouchTargets(mobileHeaderControls(page), "mobile header");

    const section = page.locator("#contato");
    await section.scrollIntoViewIfNeeded();
    await expectLocatorTouchTargets(contactControls(page), "contact");
    await expectLocatorTouchTargets(footerControls(page), "footer");
  });
});
