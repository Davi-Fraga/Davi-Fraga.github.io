# Task 2 Report

## Status

Implemented Task 2 only. No commit, push, PR, or subagent dispatch was performed.

## Implementation

- Added typed centralized motion configuration in `lib/motion/config.ts`.
- Added SSR-safe reduced-motion and capability hooks with `matchMedia` listener cleanup.
- Added one global `SmoothScrollProvider` inside the existing `ThemeProvider` without converting the root layout to a Client Component.
- Added dynamic Lenis/GSAP/ScrollTrigger initialization only for non-touch, fine-pointer desktop capability.
- Added complete cleanup for the GSAP ticker callback, Lenis scroll listener, Lenis instance, and document attributes.
- Preserved native scrolling for reduced-motion, coarse-pointer, and touch devices.
- Installed only `lenis`, `gsap`, and `@gsap/react`.
- Added `e2e/motion.spec.ts`; desktop Chromium requires exactly one active marker, while mobile/touch has no marker requirement.
- Reused Task 1 design tokens, reduced-motion CSS, ESLint configuration, theme provider, and layout changes without reverting them.
- No files under `data/` were modified.

## TDD Evidence

RED command:

```text
npm run build
npx playwright test e2e/motion.spec.ts
```

Expected failures observed before implementation:

- `data-motion="reduced"` missing.
- `html[data-lenis="active"]` count was 0 instead of 1 on desktop Chromium.
- Result: 3 failed, 1 skipped.

GREEN focused result after implementation:

- Result: 3 passed, 1 intentional mobile skip.

## Final Verification

```text
npm run lint
npm run typecheck
npm run build
npx playwright test e2e/motion.spec.ts e2e/portfolio.spec.ts
```

Results:

- Lint: exit 0; 0 errors, 15 pre-existing unused-variable warnings outside Task 2 files.
- Typecheck: passed.
- Production build: passed.
- Relevant E2E: 23 passed, 1 intentional mobile skip, 0 failed.
- Protected data diff: empty.

## Concerns

- Next.js warns that the workspace root is inferred from the parent repository lockfile because both the parent checkout and worktree contain lockfiles. Build still passes; changing Next configuration is outside Task 2.
- `npm install` reports 3 high-severity audit findings in the dependency tree. No automatic audit fix was run because it could introduce unapproved dependency changes.
- Physical touch/trackpad hardware was not available; Playwright Pixel 5 emulation validated the mobile reduced-motion/native-scroll path.

## Fix round 1

### Findings corrected

- `prefersNativeScroll` now explicitly includes viewports below the configured desktop breakpoint, so Lenis is prohibited below 768px even with hover, fine pointer and zero touch points.
- Active Lenis lifecycles are now observable through `html[data-lenis-instances]`, initialized to `0`, incremented only after Lenis construction and listener/ticker registration, decremented during the existing cleanup, and removed when the provider unmounts. No Lenis object is exposed globally.
- Motion E2E now checks the real active-instance count for capable desktop, page navigation and reload/remount, Pixel 5 with normal motion, 767px with fine pointer, and reduced motion.

### TDD evidence

RED focused result before production changes:

```text
npx playwright test e2e/motion.spec.ts
```

- The capable desktop and navigation/remount tests failed because `data-lenis-instances` did not exist.
- The 767px fine-pointer page visibly had `data-lenis="active"`, proving Lenis initialized below the breakpoint.
- With an explicit zero contract, reduced-motion and Pixel 5 also failed until lifecycle instrumentation was implemented.
- Result: 6 failed, 4 project-specific skips.

GREEN focused result after the minimal fix:

- Result: 6 passed, 4 project-specific skips, 0 failed.

### Final verification

```text
npm run lint
npm run typecheck
npm run build
npx playwright test e2e/motion.spec.ts e2e/portfolio.spec.ts
```

- Lint: exit 0; 0 errors and the same 15 pre-existing unused-variable warnings outside Task 2.
- Typecheck: passed.
- Production build: passed.
- E2E: 26 passed, 4 project-specific skips, 0 failed.
- Protected `data/*` diff: empty.
- No commit, push, PR or subagent dispatch.

### Remaining concerns

- Next.js still warns about parent/worktree lockfile root inference; correcting build-root configuration remains outside Task 2.
- The existing dependency audit still reports 3 high-severity findings; no broad or forceful dependency update was performed.
- Pixel 5 coverage is browser emulation; physical touch and trackpad hardware were unavailable.

## Fix round 2

### Finding corrected

- Replaced the full-document navigation/reload lifecycle assertion with a true same-document React lifecycle test.
- Added `SmoothScrollRoot`, a removable client boundary that renders `SmoothScrollProvider` unchanged for normal requests.
- The harness activates only with the exact `?motion-provider-harness=1` query, adds no public route, no indexable content and no global Lenis reference.
- Query-only controls unmount and remount the provider while preserving the same document and JavaScript realm.
- Provider cleanup leaves the safe observable counter at `data-lenis-instances="0"`; remount creates one fresh lifecycle and returns it to `1`.

### TDD evidence

RED:

```text
npx playwright test e2e/motion.spec.ts --project=chromium-desktop
```

- The new test reached active count `1`, then timed out because the query-controlled unmount control did not exist.
- Result: 1 failed, 3 passed, 1 project-specific skip.

GREEN focused:

- The same document now observes `data-lenis-instances` transition `1 → 0 → 1` through real React unmount/remount.
- Result: 4 passed, 1 project-specific skip, 0 failed.

### Final verification

```text
npm run lint
npm run typecheck
npm run build
npx playwright test e2e/motion.spec.ts e2e/portfolio.spec.ts
```

- Lint: exit 0; 0 errors and the same 15 pre-existing warnings outside Task 2.
- Typecheck: passed.
- Production build: passed.
- E2E: 26 passed, 4 project-specific skips, 0 failed.
- Protected `data/*` diff: empty.
- No commit, push or subagent dispatch.

### Remaining concerns

- Next.js continues to warn about parent/worktree lockfile root inference.
- The query harness is intentionally removable after lifecycle regression coverage moves to a component runner.
- Physical touch and trackpad hardware remain unavailable; Pixel 5 uses Playwright emulation.
