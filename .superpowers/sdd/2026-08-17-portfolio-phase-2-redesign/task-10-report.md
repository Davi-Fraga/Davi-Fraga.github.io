# Task 10 Report

Date: 2026-08-18

## Status

Task 10 implemented without modifying `data/*`, committing, pushing, creating a PR, or using subagents.

## Changes

- Added `e2e/performance.spec.ts` covering:
  - full home scroll with no console errors or uncaught page errors;
  - non-zero project visual dimensions;
  - three repeated home/case/back navigation cycles with `data-lenis-instances <= 1` and correct home restoration;
  - no horizontal overflow at 320, 375/Pixel 5, 768/tablet, and 1440/desktop.
- Added `screenshot: "only-on-failure"` to `playwright.config.ts`; no golden snapshots were introduced.
- Audited `app` and `components` for `framer-motion|motion-wrapper`.
  - `rg` is unavailable in this Windows environment.
  - Equivalent repository search found only the legacy `components/motion-wrapper.tsx` import before cleanup and zero matches after cleanup.
  - No justified Framer Motion microinteraction remained.
- Removed `framer-motion` from `package.json` and `package-lock.json`.
- Deleted obsolete `components/motion-wrapper.tsx`.
- No DESIGN.md exception was added because no Framer Motion usage remains.

## Verification

### Task-specific baseline before cleanup

- `npm run build`: passed.
- `npx playwright test e2e/performance.spec.ts e2e/responsive.spec.ts`: 45 passed, 1 skipped.

### Required full verification after cleanup

- `npm ci`: passed on retry, 547 packages installed.
  - First attempt hit transient Windows `EPERM` while unlinking `next-swc.win32-x64-msvc.node`.
  - Process inspection found no Node process referencing the worktree; identical retry passed.
  - npm reported 3 high-severity audit findings. No forced dependency updates were made because that is outside Task 10.
- `npm run lint`: exited successfully with 0 errors and 5 pre-existing warnings:
  - `app/projects/[slug]/page.tsx`: unused `Cpu` and `index`.
  - `components/ui/chart.tsx`: unused `_`.
  - `components/ui/use-toast.ts`: `actionTypes` used only as a type.
  - `hooks/use-toast.ts`: `actionTypes` used only as a type.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npm run test:e2e`: 132 passed, 14 skipped, 0 failed in 36.2s.

## Build and performance observations

Production build:

- Next.js 16.1.6 with Turbopack.
- Optimized compile: 3.6s in the final run.
- Static routes: `/`, `/_not-found`.
- SSG route: `/projects/[slug]`, including six generated case paths.
- The current Next.js/Turbopack build output did not print route/chunk byte sizes, so exact route/chunk bytes could not be recorded from the required build command.
- Build warns that the workspace root was inferred from the parent repository lockfile because this linked worktree has another lockfile. No root configuration was changed because it is outside Task 10.
- Removing Framer Motion eliminates its runtime and the duplicate client fade wrapper from the dependency graph.
- Production E2E observed no console/page errors during full scroll, no horizontal overflow at required widths, non-zero visual reservations, and no Lenis accumulation across repeated navigation.
- No permanent Lighthouse or Playwright performance artifacts were generated or committed.

LCP, CLS, and INP limitations:

- Stable lab LCP/CLS/INP comparison was not available in this CLI environment without introducing a persistent Lighthouse setup or an approved baseline.
- Automated checks directly cover the relevant regressions available here: reserved visual space, full-page runtime errors, overflow, production navigation, and Lenis lifecycle.
- No before/after browser baseline exists, so no regression delta is claimed.

## Browser QA and environmental limitations

Automated production-mode coverage validates keyboard contracts, touch emulation, reduced motion, anchors/top return, browser history, repeated navigation, scrollbar-driven programmatic scrolling, reverse scrolling, responsive resize behavior, and widths 320, 375, 430, 768, 1024, 1280, 1440, and 1920.

Not physically available in this environment:

- hardware trackpad testing;
- physical mobile/tablet hardware;
- subjective slow/fast wheel feel and stutter assessment;
- real-user INP measurement.

Pixel 5 behavior is covered through Playwright device emulation. Screenshots are retained only when a test fails.

## Final acceptance checklist

- [x] Protected editorial content remains covered by `e2e/portfolio.spec.ts`.
- [x] No `data/*` file changed.
- [x] `DESIGN.md` remains the design-system source of truth.
- [x] One Lenis instance maximum and native/reduced-motion fallback are covered.
- [x] GSAP/reveal lifecycle and cleanup contracts remain covered by the full E2E suite.
- [x] Reduced motion remains covered in CSS/JavaScript behavior tests.
- [x] Mobile simplification and touch behavior remain covered.
- [x] Honest project visuals reserve stable non-zero space.
- [x] Gestão LGND remains the unique signature project.
- [x] Secondary cases and experience timeline remain covered.
- [x] No scroll hijacking symptom or horizontal overflow detected at configured widths.
- [x] Keyboard, focus, touch targets, headings, skip links, and menu semantics remain covered.
- [x] Framer Motion and the duplicate wrapper were removed after a zero-usage audit.
- [x] Lint, typecheck, build, and complete E2E suite passed; lint retains 5 warnings noted above.
- [x] No permanent Lighthouse artifacts were created.

## Fix round 1 — App Router Lenis lifecycle regression

The original navigation contract used `page.goto()` and `page.goBack()`, allowing document recreation to reset DOM counters. It was replaced with three home → Gestão LGND case → home cycles through the application’s existing Next `<Link>` anchors. The test waits for URL and route state after each transition and never uses `page.goto()` between navigation steps.

Safe numeric instrumentation on `<html>` now records:

- active Lenis instances;
- active GSAP ticker callbacks for Lenis RAF;
- active Lenis scroll listeners;
- cumulative Lenis creations and destructions.

No Lenis object is exposed globally. Every transition asserts exactly one active instance/callback/listener on capable desktop and zero on Pixel 5/native scrolling. It also asserts `created - destroyed` equals the expected active count, so any accumulation to 2+ fails.

TDD evidence:

- RED: focused test failed on both projects because `data-lenis-ticker-callbacks` and `data-lenis-scroll-listeners` did not exist.
- GREEN after instrumentation and production rebuild: focused App Router test passed on Chromium desktop and Pixel 5.
- Focused suites: `npx playwright test e2e/performance.spec.ts e2e/motion.spec.ts` — 57 passed, 11 capability skips, 0 failed.
- `npm run lint` — exit 0, 5 existing warnings and 0 errors.
- `npm run typecheck` — passed.
- `npm run build` — passed; optimized compile in 3.3s.
- `npm run test:e2e` — 132 passed, 14 capability skips, 0 failed in 37.4s.

## Final review fix wave

Three final-review findings were corrected in one TDD wave without modifying `data/*`:

- Experience timeline scrub now reuses `canUseStickyProjects`, requiring ready desktop, hover, fine pointer, no coarse pointer, no touch points, and no reduced-motion preference. All unsupported combinations expose the static `reduced` state and final line rendering.
- The inferred labels `Arquitetura de Produção — Monorepo & Pipeline` and `Camadas integradas` were replaced with neutral `Fluxo de arquitetura` and `5 etapas` text derived only from node count.
- Architecture nodes now use one visual and semantic `<ol>/<li>` representation; the duplicated screen-reader-only list was removed.

### RED

- Command: `npm run build; npx playwright test e2e/motion.spec.ts e2e/accessibility.spec.ts -g "desktop viewport with touch capability|architecture diagram uses neutral" --project=chromium-desktop --workers=1`.
- Result: 2 expected failures.
  - Desktop viewport with `navigator.maxTouchPoints = 1` received `data-timeline-state="active"` instead of `reduced`.
  - The architecture diagram did not expose the neutral `Fluxo de arquitetura` heading.

### GREEN

- Focused motion/responsive/accessibility: 89 passed, 13 capability skips, 0 failed.
- `npm run lint`: exit 0, 0 errors and 5 pre-existing warnings.
- `npm run typecheck`: passed.
- `npm run build`: passed; optimized compile in 3.4s. The existing multiple-lockfile workspace-root warning remains.
- Full E2E: `npm run test:e2e -- --workers=1` — 135 passed, 15 intentional skips, 0 failed.
- No `data/*` file was changed. No commit, push, PR, or subagent was used.

## Concerns

- npm reports 3 high-severity dependency audit findings; remediation requires a separately scoped dependency review.
- Exact route/chunk byte sizes and stable LCP/CLS/INP deltas remain unavailable from the current build output/environment.
- Hardware trackpad and physical-device behavior require manual follow-up on suitable hardware.
- Next.js still warns that the workspace root is inferred from multiple lockfiles; no configuration was changed because it is outside this fix wave.
