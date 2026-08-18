# Task 5 Report — Featured projects, honest visuals and responsive stack

## Status

Completed only Task 5 in `C:\Dev\Portifolio-DaviFraga\.worktrees\portfolio-phase-2`.

## Changes

- Added `components/motion/image-reveal.tsx` with discriminated `ProjectVisual = RealProjectImage | TechnicalPlaceholder`, a `next/image` branch requiring dimensions/alt/sizes, and an explicit fixed-aspect placeholder branch.
- Current project cards use only the honest placeholder `Visual técnico — screenshot não disponível`; no screenshot or product visual was invented.
- Rebuilt the four featured projects in their existing order as one responsive sequence. Capable desktop uses CSS sticky cards and one scoped GSAP/ScrollTrigger context that moderately reduces prior-card scale/opacity without pin spacing.
- Mobile, touch and reduced-motion use normal vertical flow with title, context, summary, metrics, stack and case CTA visible without hover.
- Preserved private-link suppression by rendering repository/demo actions only for nonempty, non-`#` URLs.
- Kept Gestão LGND free of Task 6 architecture and kept secondary cases free of Task 7 tilt/Shift Card behavior.
- Added responsive coverage for 320, 375, 430, 768, 1024, 1280, 1440 and 1920 pixels, fixed the observed 320px overflow, and covered static flow plus placeholder aspect ratio.
- No file under `data/` changed.

## TDD evidence

- RED: initial production build passed; focused responsive/motion run produced 9 failures. Missing-feature failures covered absent stack state, absent placeholders and absent mobile flow contracts. The new width matrix also exposed a real 320px overflow (`scrollWidth 363`, `clientWidth 320`).
- GREEN round 1: 37 tests passed, 7 intentional cross-project skips and 2 tests failed only because the reduced-motion selector counted the 2 secondary case visuals in addition to the required 4 featured visuals. The test was correctly scoped to `[data-featured-projects]`.
- Full-gate compatibility round: tests exposed the preserved editorial label `PROJETO DESTAQUE Nº 1` had been shortened and secondary cases were initially hidden by an unnecessary Reveal before scrolling. The exact label and immediately visible case markup were restored.
- Final fresh gate: 59 tests passed, 7 intentional cross-project skips and 0 failures.

## Verification

- `npm run lint`: exit 0; 0 errors, 9 warnings outside Task 5.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npx playwright test e2e/portfolio.spec.ts e2e/motion.spec.ts e2e/responsive.spec.ts`: final fresh run 62 passed, 8 skipped, 0 failed.
- Responsive overflow checks passed at all requested widths in Chromium desktop and Pixel 5 projects.
- `git diff -- data`: empty.

## Fix round 1

- Root cause: `isSignature` was accepted by `FeaturedProjectCard` but ignored, so Gestão LGND shared the same `featured` variant and 70vh minimum as the other three projects. The prop now selects an explicit `signature` variant with the only `data-signature="true"`, a stronger controlled surface and 86vh desktop minimum while all remaining featured cards retain `data-variant="featured"` and 70vh.
- The signature remains the first Gestão LGND card and does not add `ArchitectureDiagram`, architecture nodes or Task 6 behavior.
- Root cause: the Task 5 card rewrite rendered metric value and label but omitted the existing optional `metric.description`. Every provided description is now rendered without truncation on featured desktop and mobile cards.
- TDD RED: focused responsive execution reported 3 intended failures: zero signature markers and missing `456 de API e 122 Web` in both browser projects.
- The first GREEN attempt accidentally reused a stale production server/build and included one unrelated `ERR_NETWORK_CHANGED`; after a required rebuild, focused responsive verification passed 23 tests with 1 intentional desktop-only skip and 0 failures.
- New contracts assert exactly one signature, first position, Gestão LGND slug, explicit variants, observably greater desktop height, and all 13 real featured metric descriptions at 375px and 1440px.
- Fresh lint/typecheck/build passed. The first combined E2E gate had 61 passes and one unrelated navigation timeout in the existing Flamengo return-link test under parallel Chromium load; that exact test passed alone in 767ms. A fresh complete rerun then passed 62 tests with 8 intentional cross-project/desktop-only skips and 0 failures.

## Concerns

- Next.js/Playwright still warn that multiple lockfiles cause workspace-root inference to select `C:\Dev\Portifolio-DaviFraga`; this predates Task 5 and was not changed.
- Build still prints `Skipping validation of types`; the separate mandatory typecheck passed.
- Lint retains 9 unrelated unused-symbol warnings outside Task 5 scope.
- Capability behavior is automated through desktop fine-pointer, Pixel 5 touch and reduced-motion contexts. No physical touch device, trackpad or manual visual resize session was available.
- The real-image branch is implemented and typed but intentionally unused until authentic assets are supplied.
