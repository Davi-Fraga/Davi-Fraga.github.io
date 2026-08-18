# Portfolio Phase 2 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesenhar o portfólio com um sistema visual técnico premium, motion progressivo e acessível, preservando integralmente o conteúdo e os contratos editoriais atuais.

**Architecture:** Manter conteúdo e composição principal server-rendered e introduzir islands client pequenos para Lenis, GSAP, counters, diagramas e progresso. Tokens serão compartilhados por `DESIGN.md`, CSS variables, Tailwind e configuração TypeScript; cada efeito terá fallback para touch e reduced motion.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 3, shadcn/Radix, Lenis, GSAP, ScrollTrigger, `@gsap/react`, Playwright e ESLint.

**Spec:** `docs/superpowers/specs/2026-08-17-portfolio-phase-2-redesign-design.md`

## Global Constraints

- Não modificar `data/profile.ts`, `data/projects.ts`, `data/experience.ts` ou `data/skills.ts`.
- Preservar textos, métricas, links, slugs, SEO, ordem editorial e contratos de `e2e/portfolio.spec.ts`.
- Gestão LGND permanece primeiro, maior destaque e único signature moment.
- Não inventar screenshots, dados, arquitetura, métricas ou tecnologias.
- Abaixo de 768px e em touch, não usar pin, scrub, tilt ou Lenis.
- Reduced motion desativa Lenis, pin, scrub, count-up, parallax, tilt e transforms não essenciais.
- Usar GSAP para timelines/scroll e CSS ou Framer Motion apenas para microinterações isoladas.
- Não instalar Inspira, Cult ou Skiper UI; não copiar componentes proprietários.
- Não criar cursor customizado, WebGL novo, partículas, neon, scroll hijacking ou hover-only.
- Não fazer commit, push ou PR sem solicitação explícita do usuário.

---

### Task 1: Baseline, design system e contratos de acessibilidade

**Files:**
- Create: `DESIGN.md`
- Create: `eslint.config.mjs`
- Create: `components/navigation/skip-link.tsx`
- Create: `e2e/accessibility.spec.ts`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/projects/[slug]/page.tsx`
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `components/hero.tsx`

**Interfaces:**
- Produces: `SkipLink({ targetId?: string; children?: React.ReactNode }): React.JSX.Element`
- Produces: semantic CSS tokens consumed by every later task.

- [ ] **Step 1: Capture the clean baseline**

Run:

```powershell
npm ci
npm run typecheck
npm run build
npm run test:e2e
```

Expected: record every pre-existing failure before editing. Do not attribute baseline failures to this redesign.

- [ ] **Step 2: Write failing accessibility contracts**

Create `e2e/accessibility.spec.ts`:

```ts
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

test("home has one correctly ordered h1", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("#inicio h1")).toHaveCount(1);
  await expect(page.locator("#inicio h2").first()).not.toBeVisible();
});
```

- [ ] **Step 3: Verify the new tests fail for the intended reasons**

Run:

```powershell
npm run build
npx playwright test e2e/accessibility.spec.ts
```

Expected: FAIL because skip links/case main focus are absent and Hero heading order is invalid.

- [ ] **Step 4: Add minimal lint tooling**

Install compatible versions after checking current Next peer requirements:

```powershell
npm install --save-dev eslint eslint-config-next
```

Add to `package.json`:

```json
"lint": "eslint ."
```

Configure `eslint.config.mjs` with Next.js core-web-vitals and TypeScript presets only. Do not add formatting rules that force unrelated rewrites.

- [ ] **Step 5: Write `DESIGN.md` as the visual source of truth**

Document exact semantic colors, Geist/JetBrains roles, 4/8px spacing scale, 16/20/24px radii, 1200–1400px containers, 75ch text width, motion durations, GSAP easings, breakpoints, touch/reduced-motion behavior, project surfaces and the honest placeholder rule.

- [ ] **Step 6: Implement global tokens and typography**

Replace Inter with Geist through `next/font/google`, preserve JetBrains Mono, remove unconditional `scroll-smooth`, and map semantic variables through `app/globals.css` and `tailwind.config.ts`. Add a visible `:focus-visible` style and reduced-motion CSS shell without implementing JS motion yet.

- [ ] **Step 7: Implement skip links and correct headings**

Create `SkipLink`, render it before Navbar on home and case pages, ensure both mains use `id="main-content"` and `tabIndex={-1}`, and change the Hero name from a leading `h2` to non-heading text while preserving the single current `h1` copy.

- [ ] **Step 8: Run the task gate**

```powershell
npm run lint
npm run typecheck
npm run build
npx playwright test e2e/portfolio.spec.ts e2e/accessibility.spec.ts
```

Expected: all pass; no file under `data/` changed.

---

### Task 2: Motion configuration, capability detection and Lenis provider

**Files:**
- Create: `lib/motion/config.ts`
- Create: `hooks/use-reduced-motion.ts`
- Create: `hooks/use-motion-capabilities.ts`
- Create: `components/providers/smooth-scroll-provider.tsx`
- Create: `e2e/motion.spec.ts`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `motionConfig: Readonly<MotionConfig>`.
- Produces: `useReducedMotion(): { prefersReducedMotion: boolean; isReady: boolean }`.
- Produces: `useMotionCapabilities(): MotionCapabilities`.
- Produces: `SmoothScrollProvider({ children }): React.JSX.Element`.

- [ ] **Step 1: Write failing reduced-motion and Lenis tests**

Add to `e2e/motion.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("does not initialize Lenis", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
    await expect(page.locator("html")).not.toHaveAttribute("data-lenis", "active");
    await expect(page.getByRole("heading", { name: /Gestão LGND/i })).toBeVisible();
  });
});

test("desktop creates at most one Lenis marker", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('html[data-lenis="active"]')).toHaveCount(1);
});
```

- [ ] **Step 2: Verify failure**

```powershell
npm run build
npx playwright test e2e/motion.spec.ts
```

Expected: FAIL because the attributes/provider do not exist.

- [ ] **Step 3: Install the only new motion dependencies**

```powershell
npm install lenis gsap @gsap/react
```

- [ ] **Step 4: Implement centralized configuration**

Define typed durations (`fast: .2`, `base: .4`, `reveal: .7`, `visual: .9`, counters `.7–1.2`), easings (`power2.out`, `power3.out`, `expo.out`), `mobileMax: 767`, `desktopMin: 768`, navbar offset 64, reveal offset 24, image scale 1.025, card shift 4 and Flamengo tilt 3.

- [ ] **Step 5: Implement SSR-safe capability hooks**

Use `matchMedia` subscriptions with cleanup. `prefersNativeScroll` is true for reduced motion, coarse pointer or `navigator.maxTouchPoints > 0`. `canUseStickyProjects` requires desktop, hover and fine pointer.

- [ ] **Step 6: Implement one global Lenis instance**

In `SmoothScrollProvider`, dynamically initialize only when capabilities permit. Register `ScrollTrigger`, wire `lenis.on("scroll", ScrollTrigger.update)`, use `gsap.ticker` with `lenis.raf(time * 1000)`, remove callback/listener, destroy Lenis and clear document attributes during cleanup. Do not disable lag smoothing unless measured later.

- [ ] **Step 7: Integrate the provider**

Wrap application children inside the existing theme provider without converting `app/layout.tsx` to a Client Component. Ensure anchor, keyboard, scrollbar and history behavior remain native.

- [ ] **Step 8: Run the task gate**

```powershell
npm run lint
npm run typecheck
npm run build
npx playwright test e2e/motion.spec.ts e2e/portfolio.spec.ts
```

---

### Task 3: Navbar and Hero progressive enhancement

**Files:**
- Modify: `components/navbar.tsx`
- Modify: `components/hero.tsx`
- Modify: `e2e/accessibility.spec.ts`
- Modify: `e2e/motion.spec.ts`

**Interfaces:**
- Consumes: `motionConfig`, `useReducedMotion`, `useMotionCapabilities`.
- Produces: Navbar `data-compact="true|false"` and Hero `data-hero-motion="idle|complete|reduced"` contracts.

- [ ] **Step 1: Write failing Navbar tests**

Test at 375px that the closed panel `#mobile-navigation` is hidden and its links cannot receive focus; opening sets `aria-expanded=true` and `aria-controls`; Escape closes and restores focus. Test desktop scroll to 100px changes the banner to `data-compact="true"` and returning to top resets it.

- [ ] **Step 2: Write the failing Hero motion test**

```ts
test("hero completes enhancement without blocking CTAs", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#inicio")).toHaveAttribute("data-hero-motion", /complete|reduced/);
  await expect(page.getByRole("link", { name: /Ver projetos/i })).toBeEnabled();
});
```

- [ ] **Step 3: Verify failures**

```powershell
npm run build
npx playwright test e2e/accessibility.spec.ts e2e/motion.spec.ts
```

- [ ] **Step 4: Fix Navbar semantics and lifecycle**

Conditionally render or use `hidden`/`inert` for the closed menu, support Escape/focus restoration, retain section activity, links, theme and curriculum. Use one passive listener or observer with cleanup. Respect reduced motion in scroll-to-top.

- [ ] **Step 5: Implement the Hero timeline**

Use one scoped `useGSAP` timeline for badge, name/headline, description, stack and CTAs with roughly `.08s` stagger. Keep content visible in SSR markup, activate enhancement only after mount, and immediately mark reduced mode. Add CSS grid and one low-opacity glow without Canvas/WebGL.

- [ ] **Step 6: Validate hydration and interaction**

```powershell
npm run lint
npm run typecheck
npm run build
npx playwright test e2e/portfolio.spec.ts e2e/accessibility.spec.ts e2e/motion.spec.ts
```

Expected: no hidden focus targets, hydration errors or blocked CTA.

---

### Task 4: Reusable Reveal and Counter with metric migration

**Files:**
- Create: `components/motion/reveal.tsx`
- Create: `components/motion/counter.tsx`
- Modify: `components/metrics-section.tsx`
- Modify: `components/section-title.tsx`
- Modify: `e2e/motion.spec.ts`

**Interfaces:**
- Produces: `RevealProps` with `children`, `className?`, `delay?`, `direction?: "up" | "none"`, `once?`, `as?: "div" | "li"`.
- Produces: `parseCounterValue(value: string): ParsedCounterValue`.
- Produces: `Counter({ value, duration?, ariaLabel? }): React.JSX.Element`.

- [ ] **Step 1: Write failing counter tests**

Assert numeric metrics finish once, final strings `578+` and `1.000+` remain visible and accessible, and reduced motion uses `data-counter-state="reduced"` without intermediate values.

- [ ] **Step 2: Verify failure**

```powershell
npm run build
npx playwright test e2e/motion.spec.ts
```

- [ ] **Step 3: Implement `Reveal`**

Content must be visible by default. After mount, use a scoped ScrollTrigger once; reduced motion applies no transform. Expose `data-reveal-state` and clean all triggers via `useGSAP` context.

- [ ] **Step 4: Implement robust counter parsing**

Support localized integer strings and suffixes such as `578+` and `1.000+`; nonnumeric values remain static. Expose final value through `aria-label`, animate once for 700–1200ms and never repeat on reverse scroll.

- [ ] **Step 5: Migrate metrics and section title**

Keep the section server-rendered except tiny counter islands. Preserve all labels/details and avoid wrapping every small element in a reveal.

- [ ] **Step 6: Run the task gate**

```powershell
npm run lint
npm run typecheck
npm run build
npx playwright test e2e/portfolio.spec.ts e2e/motion.spec.ts
```

---

### Task 5: Featured projects, honest visuals and responsive stack

**Files:**
- Create: `components/motion/image-reveal.tsx`
- Create: `e2e/responsive.spec.ts`
- Modify: `components/projects-section.tsx`
- Modify: `components/featured-project-card.tsx`
- Modify: `components/project-card.tsx`
- Modify: `e2e/motion.spec.ts`

**Interfaces:**
- Produces: discriminated `ProjectVisual = RealProjectImage | TechnicalPlaceholder`.
- Produces: `ImageReveal({ visual, className?, testId? }): React.JSX.Element`.
- Updates: `FeaturedProjectCard({ project, index, isSignature? })`.
- Updates: `ProjectCard({ project, featuredNumber?, variant?, allowTilt? })`.

- [ ] **Step 1: Write responsive failing tests**

For widths 320, 375, 430, 768, 1024, 1280, 1440 and 1920, assert `documentElement.scrollWidth <= clientWidth`. At 375px assert `data-project-motion="static"`, all four featured projects appear in normal flow and essential title/context/CTA are visible without hover.

- [ ] **Step 2: Write the honest-placeholder test**

Assert projects without real assets show `Visual técnico — screenshot não disponível` inside a fixed-aspect visual region.

- [ ] **Step 3: Verify failures**

```powershell
npm run build
npx playwright test e2e/responsive.spec.ts e2e/motion.spec.ts
```

- [ ] **Step 4: Implement `ImageReveal`**

Use `next/image` only for real assets with dimensions, alt and sizes. For current missing assets, render the explicit technical placeholder with stable aspect ratio. GSAP reveal uses clip-path, opacity and scale 1.025→1 once; reduced motion shows it directly.

- [ ] **Step 5: Implement desktop project progression**

Preserve the four-project order. Use CSS sticky and a single scoped GSAP/ScrollTrigger context to reduce previous card scale/opacity discretely. Do not create long pin spacing or pin on touch/reduced/mobile.

- [ ] **Step 6: Implement mobile cards**

Below 768px render normal vertical flow with image/placeholder, category, name, summary, metrics, stack and CTA visible. Retain private-link suppression.

- [ ] **Step 7: Run the task gate**

```powershell
npm run lint
npm run typecheck
npm run build
npx playwright test e2e/portfolio.spec.ts e2e/motion.spec.ts e2e/responsive.spec.ts
```

Manually resize from 1440px to 375px while positioned in projects and confirm no residual pin gaps.

---

### Task 6: Gestão LGND signature architecture

**Files:**
- Create: `components/projects/architecture-diagram.tsx`
- Modify: `components/featured-project-card.tsx`
- Modify: `e2e/motion.spec.ts`
- Modify: `e2e/responsive.spec.ts`

**Interfaces:**
- Produces: `ArchitectureDiagram({ title, nodes, metrics, visual }): React.JSX.Element` using existing `ArchitectureNode[]` and `ProjectMetric[]`.

- [ ] **Step 1: Write failing signature tests**

Assert exactly one `[data-signature="true"]`, architecture exists only under `[data-project-slug="gestao-lgnd"]`, and every visible node label matches `project.caseStudy.architecture.flow`. In reduced mode, assert `data-architecture-state="reduced"` and every node is visible.

- [ ] **Step 2: Verify failure**

```powershell
npm run build
npx playwright test e2e/motion.spec.ts
```

- [ ] **Step 3: Implement semantic architecture markup**

Render nodes from existing data, include a semantic list, use an `aria-hidden` responsive SVG for connections and a stable `viewBox`. Do not add inferred services.

- [ ] **Step 4: Implement the single signature timeline**

Sequence container, first node, line stroke, remaining nodes, indicators, metrics and visual. Use one ScrollTrigger, run once, clean with context, and switch to static content for mobile/touch/reduced.

- [ ] **Step 5: Run the task gate**

```powershell
npm run lint
npm run typecheck
npm run build
npx playwright test e2e/portfolio.spec.ts e2e/motion.spec.ts e2e/responsive.spec.ts
```

---

### Task 7: Secondary cases, experience timeline and education

**Files:**
- Modify: `components/project-card.tsx`
- Modify: `components/projects-section.tsx`
- Modify: `components/experience-section.tsx`
- Modify: `components/academic-projects-section.tsx`
- Modify: `e2e/motion.spec.ts`
- Modify: `e2e/responsive.spec.ts`

**Interfaces:**
- Consumes: `Reveal`, `useMotionCapabilities`, `motionConfig`.
- Produces: `data-tilt="enabled|disabled"` for the Flamengo case and static/progress timeline states.

- [ ] **Step 1: Write failing interaction contracts**

At 375px assert Coligação and Flamengo details/CTAs are visible without hover. In reduced mode assert Flamengo tilt is disabled. Assert GetCoders retains the Redmine case href.

- [ ] **Step 2: Verify failure**

```powershell
npm run build
npx playwright test e2e/responsive.spec.ts e2e/motion.spec.ts
```

- [ ] **Step 3: Implement adapted Shift Cards**

Use maximum `translateY(-4px)`, image scale 1.025 and border contrast. Keep essential details in normal markup. Enable the exclusive 3-degree Flamengo tilt only for fine pointer and allowed motion, with listener cleanup.

- [ ] **Step 4: Implement the experience SVG timeline**

Preserve all experience/education content and Redmine relationship. Animate only the line fill and entry opacity/y on capable desktop. Mobile/reduced receives a static line/border.

- [ ] **Step 5: Simplify academic project motion**

Replace broad Framer wrappers with one-time Reveal while retaining repositories and content.

- [ ] **Step 6: Run the task gate**

```powershell
npm run lint
npm run typecheck
npm run build
npx playwright test e2e/portfolio.spec.ts e2e/motion.spec.ts e2e/responsive.spec.ts
```

---

### Task 8: Stack, About, Contact and Footer

**Files:**
- Create: `components/contact/copy-email-button.tsx`
- Create: `e2e/contact.spec.ts`
- Modify: `components/skills-grid.tsx`
- Modify: `components/about-section.tsx`
- Modify: `components/contact-section.tsx`
- Modify: `components/footer.tsx`
- Modify: `e2e/accessibility.spec.ts`

**Interfaces:**
- Produces: `CopyEmailButton({ email }): React.JSX.Element`.
- Produces: `ClipboardFeedback = "idle" | "success" | "error"`.

- [ ] **Step 1: Write clipboard tests**

Mock clipboard resolution and rejection. On success assert `E-mail copiado`; on failure assert `Não foi possível copiar o e-mail` and ensure the button never says `Copiado` falsely.

- [ ] **Step 2: Write touch-target test**

At 375px measure header/contact/footer interactive controls and require at least 44×44px for primary icon/action targets.

- [ ] **Step 3: Verify failures**

```powershell
npm run build
npx playwright test e2e/contact.spec.ts e2e/accessibility.spec.ts
```

- [ ] **Step 4: Implement clipboard island**

Await `navigator.clipboard.writeText`, handle missing API and rejection, provide visible and `aria-live="polite"` feedback, and retain `mailto:` fallback.

- [ ] **Step 5: Refine low-motion sections**

Keep Stack grouped without carousels/bars/percentages; add only border/background hover/focus. Keep About nearly static. Apply at most one subtle reveal to Contact/Footer and correct target sizes.

- [ ] **Step 6: Remove unnecessary client boundaries**

Where Framer Motion was the only client dependency, return the section to a Server Component and retain only small interactive islands.

- [ ] **Step 7: Run the task gate**

```powershell
npm run lint
npm run typecheck
npm run build
npx playwright test e2e/portfolio.spec.ts e2e/contact.spec.ts e2e/accessibility.spec.ts
```

---

### Task 9: Case page transition and reading progress

**Files:**
- Create: `components/cases/case-reading-progress.tsx`
- Modify: `app/projects/[slug]/page.tsx`
- Modify: `e2e/motion.spec.ts`

**Interfaces:**
- Produces: `CaseReadingProgress({ targetId, label? }): React.JSX.Element` with progressbar semantics.

- [ ] **Step 1: Write failing case progress tests**

Assert `role="progressbar"`, min/max 0/100 and a growing integer `aria-valuenow` after scrolling through `#case-content`. Assert case pages contain no `[data-signature="true"]`.

- [ ] **Step 2: Verify failure**

```powershell
npm run build
npx playwright test e2e/motion.spec.ts
```

- [ ] **Step 3: Implement the progress island**

Use one passive scroll listener and one requestAnimationFrame, update `scaleX()` and integer `aria-valuenow`, then cancel RAF/remove listener on cleanup.

- [ ] **Step 4: Integrate without changing editorial structure**

Add `#case-content`, retain metadata, headings, all content blocks and next-project order. Apply a 300–450ms opacity/y entrance that becomes static under reduced motion. Do not repeat the home architecture animation.

- [ ] **Step 5: Run the task gate**

```powershell
npm run lint
npm run typecheck
npm run build
npx playwright test e2e/portfolio.spec.ts e2e/accessibility.spec.ts e2e/motion.spec.ts
```

---

### Task 10: Motion cleanup, performance regression checks and full QA

**Files:**
- Create: `e2e/performance.spec.ts`
- Modify or delete: `components/motion-wrapper.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `playwright.config.ts`
- Modify: remaining section files still importing old wrappers.

**Interfaces:**
- Consumes: all earlier motion primitives.
- Produces: no duplicate reveal implementation and no unnecessary Framer Motion dependency.

- [ ] **Step 1: Write runtime/performance contracts**

Test that a full home scroll produces no console errors/page errors, project visuals reserve nonzero space, repeated home/case navigation leaves at most one Lenis marker, and all configured viewports have no horizontal overflow.

- [ ] **Step 2: Verify tests against the current implementation**

```powershell
npm run build
npx playwright test e2e/performance.spec.ts e2e/responsive.spec.ts
```

- [ ] **Step 3: Remove duplicate motion paths**

Search:

```powershell
rg "framer-motion|motion-wrapper" app components
```

Migrate remaining equivalent fades to the approved primitives. If no justified imports remain, uninstall Framer Motion and delete `components/motion-wrapper.tsx`; otherwise document the exact retained microinteraction in `DESIGN.md` and remove only obsolete wrappers.

- [ ] **Step 4: Expand Playwright viewport coverage**

Keep production server behavior and add projects or explicit tests for 320, 375/Pixel 5, 768/tablet and desktop. Use screenshots on failure, not as brittle golden tests.

- [ ] **Step 5: Run complete technical verification**

```powershell
npm ci
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Expected: all pass. If `npm ci` changes no tracked files, continue; otherwise investigate lockfile inconsistency.

- [ ] **Step 6: Run browser QA**

Validate keyboard, touch, reduced motion, anchors, back/forward, scrollbar, slow/fast/reverse scroll and resize while inside Hero/projects/timeline. Check 320, 375, 430, 768, 1024, 1280, 1440 and 1920px. Record any environment limitation such as unavailable physical trackpad/mobile hardware.

- [ ] **Step 7: Compare performance before and after**

Record Next build route/chunk sizes and measure home LCP, CLS and INP in production mode. Do not commit generated Lighthouse/Playwright artifacts unless explicitly requested. Simplify any effect causing visible stutter, layout shift or excessive client JavaScript.

- [ ] **Step 8: Walk the final acceptance checklist**

Confirm every criterion in the spec: protected content, DESIGN.md, one Lenis instance, GSAP cleanup, reduced motion, mobile simplification, honest visuals, unique LGND signature, secondary cases, timeline, no scroll hijacking/overflow, accessibility, image stability, no redundant dependency, lint/typecheck/tests/build.
