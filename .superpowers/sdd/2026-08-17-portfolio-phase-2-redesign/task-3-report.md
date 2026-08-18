# Task 3 Report — Navbar and Hero progressive enhancement

## Status

Completed only Task 3 in `C:\Dev\Portifolio-DaviFraga\.worktrees\portfolio-phase-2`.

## Changes

- Navbar exposes `data-compact="true|false"`, switches after the centralized 64px offset, and preserves active-section detection.
- Closed mobile navigation uses `hidden`, removing links from visibility and keyboard focus.
- Mobile toggle now exposes `aria-controls="mobile-navigation"`; Escape closes the menu and restores toggle focus.
- Scroll-to-top respects reduced motion and bounds normal smooth scrolling so the existing navigation contract completes reliably.
- Hero replaces its duplicated Framer Motion wrappers with one scoped `useGSAP` timeline.
- Hero SSR markup remains visible; desktop fine-pointer enhancement runs badge → headline/name → description → stack → CTAs with 0.08s stagger.
- Mobile/touch skips entrance transforms and marks completion immediately; reduced motion marks `data-hero-motion="reduced"` immediately after capability detection.
- Hero uses one low-opacity CSS grid and one atmospheric glow.
- Existing content and links were preserved; no `data/*` file changed.

## TDD evidence

Initial Task 3 run failed as expected on missing `aria-controls`, compact-state contract, and Hero motion-state contract: 5 failed, 16 passed, 5 skipped. After implementation, focused accessibility/motion tests passed: 21 passed, 5 skipped.

The complete suite then exposed the existing scroll-top contract timing out after the Lenis integration. Root cause was distance-dependent native smooth scrolling exceeding the 3s contract. A bounded normal-motion fallback was added; the focused regression passed on desktop and mobile.

## Verification

- `npm run lint`: exit 0; 0 errors, 15 existing unrelated warnings.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npx playwright test e2e/portfolio.spec.ts e2e/accessibility.spec.ts e2e/motion.spec.ts`: 41 passed, 5 intentional cross-project skips, 0 failed.
- `git status --short -- data`: no changes.

## Concerns

- Next.js/Playwright warns that multiple lockfiles cause workspace-root inference to select `C:\Dev\Portifolio-DaviFraga`; this predates Task 3 and was not changed.
- Build configuration still reports `Skipping validation of types`; the required separate typecheck passed.
- Lint retains 15 unrelated unused-symbol warnings outside Task 3 scope.
