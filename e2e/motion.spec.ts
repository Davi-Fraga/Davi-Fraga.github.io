import { expect, test } from "@playwright/test";


test.describe("offscreen editorial reveals", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("keep mobile editorial content accessible before scrolling", async ({ page }) => {
    await page.goto("/");
    expect(await page.evaluate(() => window.scrollY)).toBe(0);

    const education = page.getByRole("heading", {
      name: "Engenharia de Software",
      exact: true,
    });
    const experience = page.getByRole("heading", {
      name: "Estagiário em Desenvolvimento Web",
    });

    await expect
      .poll(() =>
        education.evaluate((element) =>
          element.closest("[data-reveal-state]")?.getAttribute("data-reveal-state"),
        ),
      )
      .toBe("active");

    await expect(education).toBeVisible();
    await expect(experience).toBeVisible();
    await expect(page.getByLabel("Stack e Tecnologias")).toContainText("Backend");
    await expect(page.getByLabel("Sobre o desenvolvedor")).toContainText("Sobre mim");
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });
});

async function expectActiveLenisInstances(
  page: import("@playwright/test").Page,
  count: number,
) {
  await expect(page.locator("html")).toHaveAttribute(
    "data-lenis-instances",
    String(count),
  );
}

test.describe("reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("does not initialize Lenis", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
    await expectActiveLenisInstances(page, 0);
    await expect(page.getByRole("heading", { name: /Gestão LGND/i })).toBeVisible();
  });

  test("shows every numeric metric at its final accessible value without count-up", async ({ page }) => {
    await page.goto("/");
    const counters = page.locator('[data-counter-state="reduced"]');

    const metricCards = page.getByRole("region", {
      name: "Métricas de engenharia e produção",
    }).locator("[data-metric]");
    await expect(counters).toHaveCount(await metricCards.count());
    await expect(counters.nth(0)).toHaveText("578+");
    await expect(counters.nth(0)).toHaveAttribute("aria-label", "578+");
    await expect(counters.nth(1)).toHaveText("1.000+");
    await expect(counters.nth(1)).toHaveAttribute("aria-label", "1.000+");
    await expect(counters.nth(2)).toHaveText("226+");
    await expect(counters.nth(3)).toHaveText("5");
  });
});

test("capable desktop maintains exactly one active Lenis instance", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop");

  await page.goto("/");
  await expectActiveLenisInstances(page, 1);
});

test("production ignores motion harness query parameters", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop");
  test.skip(process.env.E2E_HARNESSES === "1", "Requires the production server");

  await page.goto("/?motion-provider-harness=1&motion-primitives-harness=1");

  await expect(
    page.getByRole("button", { name: "Desmontar smooth scroll" }),
  ).toHaveCount(0);
  await expect(page.locator("[data-parser-result]")).toHaveCount(0);
  await expect(page.getByTestId("strict-mode-copy-harness")).toHaveCount(0);
  await expect(page.getByText("strict-mode@example.com")).toHaveCount(0);

  const scripts = await page.locator('script[src]').evaluateAll((elements) =>
    elements.map((element) => (element as HTMLScriptElement).src),
  );
  const clientCode = (
    await Promise.all(scripts.map((script) => fetch(script).then((response) => response.text())))
  ).join("\n");

  expect(clientCode).not.toContain("motion-primitives-harness");
  expect(clientCode).not.toContain("motion-provider-harness");
  expect(clientCode).not.toContain("strict-mode@example.com");
  expect(clientCode).not.toContain("strict-mode-copy-harness");
});

test("unmounts and remounts the provider in the same document", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop");
  test.skip(process.env.E2E_HARNESSES !== "1", "Requires explicit test harness mode");

  await page.goto("/?motion-primitives-harness=1");
  await expectActiveLenisInstances(page, 2);

  await page
    .locator('button[aria-label="Desmontar smooth scroll"]')
    .evaluate((button: HTMLButtonElement) => button.click());
  await expectActiveLenisInstances(page, 1);

  await page
    .locator('button[aria-label="Remontar smooth scroll"]')
    .evaluate((button: HTMLButtonElement) => button.click());
  await expectActiveLenisInstances(page, 2);
});

test("Pixel 5 with normal motion keeps native scrolling", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chrome");

  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await expectActiveLenisInstances(page, 0);
});

test("767px fine pointer viewport keeps native scrolling", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop");
  await page.setViewportSize({ width: 767, height: 900 });

  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await expectActiveLenisInstances(page, 0);
});

test("desktop navbar compacts after 64px and expands at the top", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop");
  await page.goto("/");
  const banner = page.getByRole("banner");
  await expect(banner).toHaveAttribute("data-compact", "false");

  await page.evaluate(() => window.scrollTo(0, 100));
  await expect(banner).toHaveAttribute("data-compact", "true");

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(banner).toHaveAttribute("data-compact", "false");
});

test("hero completes enhancement without blocking CTAs", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#inicio")).toHaveAttribute(
    "data-hero-motion",
    /complete|reduced/,
  );
  await expect(page.getByRole("link", { name: /Ver projetos/i })).toBeEnabled();
});

test("capable desktop progressively enhances the featured project stack", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop");
  await page.goto("/");

  const stack = page.locator("[data-featured-projects]");
  await expect(stack).toHaveAttribute("data-project-motion", "sticky");
  await expect(stack.locator("[data-project-slug]")).toHaveCount(4);
});

test.describe("reduced featured project motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("keeps project visuals and stack static", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("[data-featured-projects]")).toHaveAttribute(
      "data-project-motion",
      "static",
    );
    await expect(
      page.locator('[data-featured-projects] [data-image-reveal-state="reduced"]'),
    ).toHaveCount(4);
  });
});

test("numeric metrics count up once and keep their localized final strings", async ({ page }) => {
  await page.goto("/");
  const counters = page.locator("[data-counter-state]");

  const metricCards = page.getByRole("region", {
    name: "Métricas de engenharia e produção",
  }).locator("[data-metric]");
  await expect(counters).toHaveCount(await metricCards.count());
  await counters.first().scrollIntoViewIfNeeded();
  await expect(counters.nth(0)).toHaveAttribute("data-counter-state", "complete");
  await expect(counters.nth(0)).toHaveText("578+");
  await expect(counters.nth(0)).toHaveAttribute("aria-label", "578+");
  await expect(counters.nth(1)).toHaveText("1.000+");
  await expect(counters.nth(1)).toHaveAttribute("aria-label", "1.000+");

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(counters.nth(0)).toHaveText("578+");
  await expect(counters.nth(0)).toHaveAttribute("data-counter-state", "complete");
});

test("counter parser exposes localized and static results", async ({ page }) => {
  test.skip(process.env.E2E_HARNESSES !== "1", "Requires explicit test harness mode");
  await page.goto("/?motion-primitives-harness=1");
  const parserResults = page.locator("[data-parser-result]");

  await expect(parserResults).toHaveCount(3);
  await expect(parserResults.nth(0)).toHaveText(
    JSON.stringify({ numericValue: 578, prefix: "", suffix: "+", locale: "pt-BR", finalValue: "578+" }),
  );
  await expect(parserResults.nth(1)).toHaveText(
    JSON.stringify({ numericValue: 1000, prefix: "", suffix: "+", locale: "pt-BR", finalValue: "1.000+" }),
  );
  await expect(parserResults.nth(2)).toHaveText(
    JSON.stringify({ numericValue: null, prefix: "", suffix: "", locale: "pt-BR", finalValue: "Em produção" }),
  );
});

test("signature project Gestão LGND exposes complete animated architecture diagram on capable desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop");
  await page.goto("/");

  const signature = page.locator('[data-project-slug="gestao-lgnd"][data-signature="true"]');
  await expect(signature).toBeVisible();

  const diagram = signature.locator("[data-architecture-diagram]");
  await expect(diagram).toBeVisible();
  await diagram.scrollIntoViewIfNeeded();

  await expect(diagram).toHaveAttribute("data-architecture-state", /complete|animating/);
  await expect(diagram.locator("[data-architecture-node]")).toHaveCount(5);

  const expectedNodes = [
    "Frontend Next.js",
    "Reverse Proxy & TLS",
    "Core API NestJS",
    "Filas Assíncronas & Cache",
    "Persistência Relacional",
  ];

  for (const nodeTitle of expectedNodes) {
    await expect(diagram.getByText(nodeTitle, { exact: true })).toBeVisible();
  }

  // Verify other featured projects do NOT render the architecture diagram
  const otherProjects = page.locator('[data-featured-projects] [data-project-slug]:not([data-project-slug="gestao-lgnd"])');
  await expect(otherProjects.locator("[data-architecture-diagram]")).toHaveCount(0);
});

test.describe("reduced architecture diagram motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("renders architecture diagram directly in reduced state with all nodes visible", async ({ page }) => {
    await page.goto("/");
    const diagram = page.locator('[data-project-slug="gestao-lgnd"] [data-architecture-diagram]');
    await expect(diagram).toBeVisible();
    await expect(diagram).toHaveAttribute("data-architecture-state", "reduced");
    await expect(diagram.locator("[data-architecture-node]")).toHaveCount(5);
  });
});

test("repeatable Reveal reverses on exit and replays on re-entry", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop");
  test.skip(process.env.E2E_HARNESSES !== "1", "Requires explicit test harness mode");
  await page.goto("/?motion-primitives-harness=1");
  const reveal = page.locator("[data-reveal-state]", {
    has: page.locator('[data-testid="repeatable-reveal"]'),
  });

  await reveal.scrollIntoViewIfNeeded();
  await expect(reveal).toHaveAttribute("data-reveal-state", "complete");
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(reveal).toHaveAttribute("data-reveal-state", "reversed");
  await reveal.scrollIntoViewIfNeeded();
  await expect(reveal).toHaveAttribute("data-reveal-state", "complete");
});

test("Flamengo engineering case enables tilt only on fine pointer desktop and disables on reduced motion", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop");
  await page.goto("/");

  const casesSection = page.locator("#cases");
  await casesSection.scrollIntoViewIfNeeded();

  const flamengoCard = casesSection.locator('[data-project-slug="landing-flamengo"]');
  await expect(flamengoCard).toBeVisible();
  await expect(flamengoCard).toHaveAttribute("data-variant", "engineering-case");
  await expect(flamengoCard).toHaveAttribute("data-tilt", "enabled");

  const coligacaoCard = casesSection.locator('[data-project-slug="coligacao-2026"]');
  await expect(coligacaoCard).toHaveAttribute("data-variant", "engineering-case");
  await expect(coligacaoCard).toHaveAttribute("data-tilt", "disabled");
});

test("Flamengo engineering case disables tilt on coarse/touch mobile viewports", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chrome");
  await page.goto("/");

  const flamengoCard = page.locator('[data-project-slug="landing-flamengo"]');
  await expect(flamengoCard).toBeVisible();
  await expect(flamengoCard).toHaveAttribute("data-tilt", "disabled");
});

test.describe("reduced motion disables tilt and keeps experience timeline static", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("disables tilt on Flamengo card in reduced motion mode", async ({ page }) => {
    await page.goto("/");
    const flamengoCard = page.locator('[data-project-slug="landing-flamengo"]');
    await expect(flamengoCard).toHaveAttribute("data-tilt", "disabled");
  });

  test("renders experience timeline in static reduced state", async ({ page }) => {
    await page.goto("/");
    const timeline = page.locator("[data-experience-timeline]");
    await expect(timeline).toBeVisible();
    await expect(timeline).toHaveAttribute("data-timeline-state", "reduced");
  });
});

test("capable desktop animates experience timeline progress", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop");
  await page.goto("/");

  const timeline = page.locator("[data-experience-timeline]");
  await expect(timeline).toBeVisible();
  await timeline.scrollIntoViewIfNeeded();
  await expect(timeline).toHaveAttribute("data-timeline-state", /active|complete/);
});

test("desktop viewport with touch capability keeps experience timeline static", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop");
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "maxTouchPoints", {
      configurable: true,
      get: () => 1,
    });
  });
  await page.goto("/");

  const timeline = page.locator("[data-experience-timeline]");
  await expect(timeline).toHaveAttribute("data-timeline-state", "reduced");
  await expect(timeline.locator("line.text-primary")).toHaveAttribute(
    "stroke-dashoffset",
    "0",
  );
});

test.describe("case reading progress", () => {
  test.use({ viewport: { width: 1280, height: 600 } });

  test("exposes semantics, starts at zero, grows, reaches 100 and stays clamped", async ({ page }) => {
    await page.goto("/projects/gestao-lgnd");

    const progress = page.getByRole("progressbar", {
      name: "Progresso de leitura do case",
    });
    await expect(progress).toHaveAttribute("aria-valuemin", "0");
    await expect(progress).toHaveAttribute("aria-valuemax", "100");
    await expect(progress).toHaveAttribute("aria-valuenow", "0");

    const positions = await page.locator("#case-content").evaluate((element) => {
      const top = element.getBoundingClientRect().top + window.scrollY;
      return {
        middle: top + (element.clientHeight - window.innerHeight) / 2,
        end: top + element.clientHeight - window.innerHeight,
      };
    });

    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), positions.middle);
    await expect
      .poll(async () => Number(await progress.getAttribute("aria-valuenow")))
      .toBeGreaterThan(0);

    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), positions.end);
    await expect(progress).toHaveAttribute("aria-valuenow", "100");

    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(progress).toHaveAttribute("aria-valuenow", "100");
    expect(Number(await progress.getAttribute("aria-valuenow"))).toBeLessThanOrEqual(100);
  });

  test("treats a target that fits the viewport as unread before its top and complete when reached", async ({ page }) => {
    await page.goto("/projects/gestao-lgnd");
    const progress = page.getByRole("progressbar", {
      name: "Progresso de leitura do case",
    });
    const targetTop = await page.locator("#case-content").evaluate((element) => {
      element.style.height = "200px";
      element.style.overflow = "hidden";
      element.style.marginBottom = "1000px";
      return element.getBoundingClientRect().top + window.scrollY;
    });

    await page.evaluate((top) => window.scrollTo(0, top - 100), targetTop);
    await expect(progress).toHaveAttribute("aria-valuenow", "0");

    await page.evaluate((top) => window.scrollTo(0, top), targetTop);
    await expect(progress).toHaveAttribute("aria-valuenow", "100");
  });

  test("recalculates after resize through the shared scheduler", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 600 });
    await page.goto("/projects/gestao-lgnd");
    const progress = page.getByRole("progressbar", {
      name: "Progresso de leitura do case",
    });
    const scrollY = await page.locator("#case-content").evaluate((element) => {
      element.style.height = "1200px";
      element.style.overflow = "hidden";
      return element.getBoundingClientRect().top + window.scrollY + 300;
    });

    await page.evaluate((nextScrollY) => window.scrollTo(0, nextScrollY), scrollY);
    await expect(progress).toHaveAttribute("aria-valuenow", "50");

    await page.setViewportSize({ width: 1280, height: 900 });
    await expect(progress).toHaveAttribute("aria-valuenow", "100");
  });

  test("updates the visual with scaleX without mutating width", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 600 });
    await page.goto("/projects/gestao-lgnd");
    const progress = page.getByRole("progressbar", {
      name: "Progresso de leitura do case",
    });
    const visual = progress.locator('[aria-hidden="true"]');
    const initialWidth = await visual.evaluate((element) => element.style.width);

    await page.locator("#case-content").evaluate((element) => {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top + (element.clientHeight - window.innerHeight) / 2);
    });

    await expect
      .poll(async () => Number(await progress.getAttribute("aria-valuenow")))
      .toBeGreaterThan(0);
    const accessibleProgress = Number(await progress.getAttribute("aria-valuenow"));
    const visualScale = await visual.evaluate((element) => {
      const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
      return matrix.a;
    });
    expect(visualScale).toBeCloseTo(accessibleProgress / 100, 1);
    expect(await visual.evaluate((element) => element.style.width)).toBe(initialWidth);
  });
});

test("case pages do not repeat the signature architecture", async ({ page }) => {
  await page.goto("/projects/gestao-lgnd");

  await expect(page.locator('[data-signature="true"]')).toHaveCount(0);
  await expect(page.locator("[data-architecture-diagram]")).toHaveCount(0);
});

test.describe("reduced case motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("shows case content immediately without an entrance transform", async ({ page }) => {
    await page.goto("/projects/gestao-lgnd");

    const content = page.locator("#case-content");
    await expect(content).toBeVisible();
    await expect(content).toHaveCSS("opacity", "1");
    await expect(content).toHaveCSS("transform", "none");
  });
});
