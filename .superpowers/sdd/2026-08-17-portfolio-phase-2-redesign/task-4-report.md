# Task 4 Report — Reusable Reveal and Counter with metric migration

## Status

Completed only Task 4 in `C:\Dev\Portifolio-DaviFraga\.worktrees\portfolio-phase-2`.

## Changes

- Added `components/motion/reveal.tsx` with visible SSR markup, scoped GSAP/ScrollTrigger lifecycle, `once` support, `up`/`none` direction, reduced-motion static fallback, state markers and `useGSAP` context cleanup.
- Added `components/motion/counter.tsx` with exported `parseCounterValue`, localized integer parsing, suffix preservation for `578+` and `1.000+`, static nonnumeric fallback, final accessible label, 700–1200ms duration clamp, reduced-motion final value and one-shot ScrollTrigger.
- Returned `components/metrics-section.tsx` to a Server Component and retained only four small Counter client islands, matching the four current numeric metrics.
- Migrated `components/section-title.tsx` from the broad Framer wrapper to one reusable Reveal without changing headings or copy.
- Preserved all metric values, labels and details. No file under `data/` changed.

## TDD evidence

The initial focused run failed for the intended missing feature: four failures reported zero `[data-counter-state]` elements, while 9 existing tests passed and 5 cross-project tests were skipped.

After implementation, the focused motion suite passed with 13 tests passed, 5 intentional cross-project skips and 0 failures. A strict-locator mistake in the new test was corrected from asserting one attribute against all four counters to asserting the first counter; production behavior was unchanged.

## Verification

- `npm run lint`: exit 0; 0 errors, 14 unrelated existing warnings.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npx playwright test e2e/portfolio.spec.ts e2e/motion.spec.ts`: 33 passed, 5 intentional cross-project skips, 0 failed.
- Combined gate: `lint=0 typecheck=0 build=0 tests=0`.
- `git diff --check`: passed.
- `git diff -- data`: empty.

## Fix round 1

- Root cause: `once={false}` only forwarded the boolean to ScrollTrigger; the tween had no explicit reverse/replay lifecycle. Reveal now uses `toggleActions="play reverse play reverse"`, emits observable `reversing`/`reversed` states, and replays on re-entry. One-shot Reveal uses the explicit `play none none none` lifecycle.
- Removed `toHaveCount(4)` from Task 4 motion contracts. Tests derive the expected counter count from the public `[data-metric]` card contract rendered from current profile metrics, without importing or duplicating editorial data.
- Added a query-string-only `MotionPrimitivesHarness`. It renders nothing in SSR/default navigation, creates no route or indexable page, and exposes real `parseCounterValue` results only under `?motion-primitives-harness=1`.
- Added real automated parser coverage for `578+`, `1.000+`, and nonnumeric `Em produção`.
- TDD RED: the focused desktop suite reported the missing `[data-metric]` contract, zero parser observations, and absent repeatable Reveal harness/behavior.
- TDD GREEN: focused desktop motion suite passed 10 tests with 1 intentional project skip; repeatability was observed as `complete → reversed → complete`.
- Fresh full verification: lint exit 0 with 14 unrelated warnings; typecheck passed; build passed; portfolio + motion E2E passed 36 tests with 6 intentional cross-project skips and 0 failures.
- `git diff --check` passed; `git diff -- data` remained empty; native search found no `toHaveCount(4)` in `e2e/motion.spec.ts`.

## Concerns

- Next.js and Playwright still warn that multiple lockfiles cause workspace-root inference to select `C:\Dev\Portifolio-DaviFraga`; this predates Task 4 and was not changed.
- Build configuration still reports `Skipping validation of types`; the mandatory separate typecheck passed.
- Lint retains 14 unrelated unused-symbol warnings outside Task 4 scope.
- Automated browser coverage exercises the four current numeric metrics. The exported parser's nonnumeric branch is implemented as a static final string, but no current profile metric supplies a nonnumeric fixture and `data/*` was intentionally not edited.
- No physical touch-device or trackpad QA was performed; Playwright desktop and Pixel 5 projects passed the requested portfolio/motion gate.
