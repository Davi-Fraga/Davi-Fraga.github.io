# Design System

## Direction

Technical, premium and restrained. Hierarchy and product clarity take precedence over decoration. Gestão LGND is the only complex signature surface. Never invent screenshots: when no real asset exists, show an explicit technical placeholder labeled `Visual técnico — screenshot não disponível`.

## Typography

- Geist: interface, display and body copy through `next/font` and `--font-geist`.
- JetBrains Mono: labels, metrics, code and technical metadata through `--font-jetbrains-mono`.
- Display sizes use `clamp()` where appropriate; body copy is 16–18px with at least 1.5 line-height.
- Long-form text is limited to 75ch; preferred reading measure is 65–75ch.
- Pages expose one `h1`; subsequent headings follow document order.

## Semantic colors

All runtime colors are HSL channels consumed with `hsl(var(--token))`.

| Role | Light | Dark |
| --- | --- | --- |
| Background | `220 33% 98%` | `228 35% 6%` |
| Surface | `0 0% 100%` | `226 30% 9%` |
| Surface elevated | `225 25% 96%` | `225 27% 12%` |
| Foreground | `228 35% 10%` | `220 25% 96%` |
| Muted foreground | `220 12% 42%` | `220 12% 66%` |
| Border | `224 20% 88%` | `225 20% 18%` |
| Border hover | `258 72% 58%` | `258 82% 70%` |
| Accent | `258 72% 52%` | `258 82% 68%` |
| Accent secondary | `211 90% 52%` | `211 92% 66%` |

Accent violet communicates primary actions and active state. Secondary blue is restricted to technical details. Existing component aliases (`card`, `primary`, `secondary`, `muted`, `ring`) map to these roles.

## Spacing and shape

- Base unit: 4px. Primary rhythm: 8px.
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80 and 96px.
- Card radius: 16px (`--radius-card`).
- Primary surfaces: 20px (`--radius-surface`) or 24px (`--radius-surface-lg`).
- Compact actions and status controls: pill (`9999px`).
- Standard content container: 1200px; wide visual container: 1400px.

## Surfaces

Project surfaces use tonal backgrounds, one-pixel borders and controlled contrast. Elevated surfaces may use a subtle shadow but never animated heavy blur or filter. Real images reserve dimensions or aspect ratio. Missing images use the honest placeholder rule above.

## Motion

| Role | Duration | Intended use |
| --- | --- | --- |
| Fast | 200ms | focus, hover, compact state |
| Base | 400ms | UI transitions |
| Reveal | 700ms | section/content entry |
| Visual | 900ms | image and diagram entry |
| Counter | 700–1200ms | one-time metrics |

GSAP easings: `power2.out` for UI, `power3.out` for reveals and `expo.out` for primary visual emphasis. Motion must explain hierarchy, progress or state. Continuous effects are avoided.

## Breakpoints and capabilities

- Mobile: 320–767px.
- Desktop enhancement begins at 768px.
- QA widths: 320, 375, 430, 768, 1024, 1280, 1440 and 1920px.
- Touch/coarse-pointer experiences use native scrolling and no pin, scrub, tilt or Lenis.
- Capability checks must combine viewport, hover, pointer and touch information rather than width alone.

## Accessibility and reduced motion

Target WCAG 2.2 AA. Keyboard focus is always visible and skip links precede navigation. Essential information cannot depend on hover. With `prefers-reduced-motion: reduce`, disable smooth scrolling, nonessential transforms, parallax, pin, scrub, tilt, count-up and infinite indicators; final content and values remain immediately visible.
