import { expect, test } from "@playwright/test";

const widths = [320, 375, 430, 768, 1024, 1280, 1440, 1920];

for (const width of widths) {
  test(`${width}px has no horizontal page overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
}

test("375px shows all featured project essentials in static normal flow", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");

  const stack = page.locator('[data-featured-projects]');
  await expect(stack).toHaveAttribute("data-project-motion", "static");

  const cards = stack.locator('[data-project-slug]');
  await expect(cards).toHaveCount(4);

  const expectedProjects = [
    ["gestao-lgnd", "Gestão LGND — Central da Manada"],
    ["redmine-consolidador", "Consolidador Redmine"],
    ["projeto-oab", "Plataforma de Gestão Jurídica"],
    ["fluxocorreto", "FluxoCorreto"],
  ] as const;

  for (const [slug, title] of expectedProjects) {
    const card = stack.locator(`[data-project-slug="${slug}"]`);
    await expect(card.getByRole("heading", { name: title })).toBeVisible();
    await expect(card.locator('[data-project-context]')).toBeVisible();
    await expect(card.getByRole("link", { name: /Ver case/i })).toBeVisible();
  }

  const positions = await cards.evaluateAll((elements) =>
    elements.map((element) => element.getBoundingClientRect().top + window.scrollY),
  );
  expect(positions).toEqual([...positions].sort((a, b) => a - b));
});

test("desktop exposes one first and observably larger signature project", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const stack = page.locator("[data-featured-projects]");
  const cards = stack.locator("[data-project-slug]");
  const signature = stack.locator('[data-signature="true"]');

  await expect(signature).toHaveCount(1);
  await expect(signature).toHaveAttribute("data-project-slug", "gestao-lgnd");
  await expect(signature).toHaveAttribute("data-variant", "signature");
  await expect(cards.nth(0)).toHaveAttribute("data-signature", "true");
  await expect(cards.nth(1)).toHaveAttribute("data-variant", "featured");

  const signatureBox = await signature.boundingBox();
  const nextBox = await cards.nth(1).boundingBox();
  expect(signatureBox?.height).toBeGreaterThan(nextBox?.height ?? 0);
});

test("featured metric descriptions remain visible on desktop and mobile", async ({ page }) => {
  const descriptions = [
    "456 de API e 122 Web",
    "Dados reais em produção",
    "Cluster em VPS próprio",
    "Modelagem relacional",
    "Consolidação paralela",
    "Execução resiliente",
    "Segurança de logs/APIs",
    "Casos reais de teste",
    "Normalização multijurisdicional",
    "Deduplicação por hash",
    "Unitários, integração e E2E",
    "Alta cobertura de cenários",
    "Regras financeiras estritas",
  ];

  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const stack = page.locator("[data-featured-projects]");

    for (const description of descriptions) {
      await expect(stack.getByText(description, { exact: true })).toBeVisible();
    }
  }
});

test("featured projects use honest fixed-aspect placeholders", async ({ page }) => {
  await page.goto("/");

  const visuals = page.locator('[data-featured-projects] [data-project-visual="placeholder"]');
  await expect(visuals).toHaveCount(4);

  for (const visual of await visuals.all()) {
    await expect(visual).toContainText("Visual técnico — screenshot não disponível");
    const box = await visual.boundingBox();
    expect(box?.width).toBeGreaterThan(0);
    expect(box?.height).toBeGreaterThan(0);
    expect((box?.width ?? 0) / (box?.height ?? 1)).toBeGreaterThan(1.4);
  }
});

test("architecture diagram is static and visible on mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");

  const diagram = page.locator('[data-project-slug="gestao-lgnd"] [data-architecture-diagram]');
  await expect(diagram).toBeVisible();
  await expect(diagram).toHaveAttribute("data-architecture-state", /static|reduced/);
  await expect(diagram.locator("[data-architecture-node]")).toHaveCount(5);
});

test("case studies do not render the signature architecture diagram", async ({ page }) => {
  await page.goto("/projects/gestao-lgnd");
  await expect(page.locator("[data-architecture-diagram]")).toHaveCount(0);
});

test("375px renders secondary technical cases in normal flow with essential details and CTAs visible without hover", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");

  const casesSection = page.locator("#cases");
  await expect(casesSection).toBeVisible();

  const secondaryProjects = [
    ["coligacao-2026", "Coligação 2026", "/projects/coligacao-2026"],
    ["landing-flamengo", "Landing Page Flamengo", "/projects/landing-flamengo"],
  ] as const;

  for (const [slug, title, href] of secondaryProjects) {
    const card = casesSection.locator(`[data-project-slug="${slug}"]`);
    await expect(card).toBeVisible();
    await expect(card).toHaveAttribute("data-variant", "engineering-case");
    await expect(card.getByRole("heading", { name: title })).toBeVisible();
    await expect(card.locator("[data-project-context]")).toBeVisible();
    await expect(card.getByRole("link", { name: /Ver case/i })).toHaveAttribute("href", href);
    await expect(card.getByRole("link", { name: /Ver case/i })).toBeVisible();
  }
});

test("experience section preserves GetCoders to Redmine case link on mobile and desktop", async ({ page }) => {
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const experienceSection = page.locator("#experiencia");
    await expect(experienceSection).toBeVisible();
    await experienceSection.scrollIntoViewIfNeeded();

    const redmineLink = experienceSection.getByRole("link", { name: /Ver case corporativo/i });
    await expect(redmineLink).toBeVisible();
    await expect(redmineLink).toHaveAttribute("href", "/projects/redmine-consolidador");
  }
});
