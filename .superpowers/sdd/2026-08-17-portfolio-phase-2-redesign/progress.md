# SDD ledger — plan: docs/superpowers/plans/2026-08-17-portfolio-phase-2-redesign.md

Baseline: 2026-08-17, HEAD 955827b, typecheck PASS, build PASS, Playwright 20/20 PASS.
Ruling: execute without commits because user authorized worktree explicitly without commit or push. Cost if wrong: task diffs cannot be isolated by commit; review packages must use file snapshots/diffs.

## Preflight dependency scan

| Tasks | Shared file/interface | Finding |
|---|---|---|
| 1 → 2 | `app/layout.tsx`, `app/globals.css`, design tokens | Clean: Task 1 establishes tokens/layout; Task 2 consumes them. |
| 1 → 3 | `components/hero.tsx`, accessibility contracts | Clean: Task 1 fixes semantics; Task 3 adds motion without changing copy. |
| 2 → 3 | motion config/hooks/provider | Clean: Task 3 consumes Task 2 interfaces. |
| 2 → 4 | reduced-motion hooks and GSAP lifecycle | Clean: Reveal/Counter depend on Task 2. |
| 4 → 5 | Reveal primitives | Clean: project visuals consume prior primitives. |
| 5 → 6 | `featured-project-card.tsx`, ImageReveal | Clean: Task 6 adds the signature to Task 5's card. |
| 5 → 7 | `project-card.tsx`, projects layout | Clean: Task 7 extends secondary variants. |
| 4 → 8 | Reveal primitive | Clean: low-motion sections consume prior primitive. |
| 1 → 9 | case page landmarks | Clean: Task 9 adds progress without changing Task 1 semantics. |
| 2 → 9 | reduced motion and lifecycle | Clean: case transition consumes prior capability rules. |
| 1–9 → 10 | all motion imports and tests | Clean: Task 10 removes duplicate paths only after migrations. |
| Task 1 | Tests vs code/files | Clean; one test selector may require semantic adjustment if legitimate section `h2` exists after Hero. |
| Task 2 | Tests vs touch behavior | Ruling: desktop Chromium expects Lenis; mobile/touch may omit marker. Cost if device detection differs: test must assert capability rather than force initialization. |
| Task 3 | Navbar observer vs existing behavior | Clean; preserve active section and all links. |
| Task 4 | Counter count | Ruling: derive expected numeric count from current profile data, not hardcode an assumed count. Cost if wrong: brittle editorial test. |
| Task 5 | Screenshots | Clean: only honest placeholders until real assets exist. |
| Task 6 | Architecture labels | Ruling: tests derive labels from current data rather than duplicating guessed labels. Cost if wrong: test can mask data drift. |
| Task 7 | Tilt and timeline | Clean; capability-gated and no new library. |
| Task 8 | Clipboard and targets | Clean; retain mailto fallback. |
| Task 9 | Progress target | Clean; preserve all case content and SEO. |
| Task 10 | Framer removal | Clean; remove only if zero justified imports remain. |

Task 1: fix round 1/5 (3 addressed, 0 open — ESLint presets restored; reduced-motion immediate visibility; lockfile reproducibility documented).
Task 1: complete (working-tree diff from 955827b, review clean; no commits by user constraint).
Task 2: fix round 1/5 (1 addressed, 1 open — viewport gating fixed; same-document remount proof missing).
Task 2: fix round 2/5 (1 addressed, 0 open — provider lifecycle verified 1→0→1).
Task 2: complete (working-tree diff, review clean; no commits by user constraint).
Task 3: complete (working-tree diff, review clean; no fix rounds).
Task 4: fix round 1/5 (2 addressed, 0 open — repeatable Reveal and derived/parser tests).
Task 4: complete (working-tree diff, review clean).
Task 5: fix round 1/5 (2 addressed, 0 open — Gestão LGND restored as unique/larger signature; metric descriptions restored).
Task 5: complete (working-tree diff, review clean).
Task 6: complete (working-tree diff, review clean; no fix rounds).
Task 7: complete (working-tree diff, review clean; no fix rounds).
Task 8: fix round 1/5 (4 addressed, 1 open — capability gating, server island, skills tab order, touch targets; clipboard lifecycle incomplete).
Task 8: fix round 2/5 (Reveal offscreen accessibility root cause addressed; clipboard Strict Mode issue open).
Task 8: fix round 3/5 (Strict Mode clipboard lifecycle addressed, 0 open).
Task 8: complete (working-tree diff, review clean).
Task 9: fix round 1/5 (2 addressed, 0 open — progress edge cases/resize and deterministic boundary tests).
Task 9: complete (working-tree diff, review clean).
Task 10: fix round 1/5 (1 addressed, 0 open — App Router Lenis/ticker/listener lifecycle test).
Task 10: complete (working-tree diff, review clean).
Final review: fix wave addressed hybrid-touch timeline gating, neutral architecture labels and duplicate accessibility nodes.
Final review: clean (SPEC PASS, QUALITY APPROVED).
Final verification: lint 0 errors/5 warnings; typecheck PASS; build PASS; E2E 135 passed/15 skipped/0 failed; data/* clean.

