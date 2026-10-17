# Nexus-Sync, design context

## Theme decision

Light, warm paper surface. Forced by the scene sentence.

> A staff platform engineer at a Series D fintech, on a Wednesday at 10am, sitting in a glass walled office with overcast daylight from a north facing window. They are evaluating a vendor for the 80 person backend team. They are calm, slightly skeptical, not impressed by gimmicks. This browser tab is one of nine.

Daylight, calm, skeptical, editorial reading mode. That is a light surface. Dark mode in this scene reads as "another developer tool trying to look serious by being black." We are the page that looks confident in daylight.

## Color strategy: Restrained

The site uses copper as a restrained accent, not 30 to 60 percent of the surface. Copper carries the primary buttons, the pod block in the hero diagram, link underlines, focus rings, selection, and small status dots. Everything else is tinted warm neutral. No third accent.

### Tokens, OKLCH

| Role | OKLCH | Approx hex | Use |
|---|---|---|---|
| `--paper` | `oklch(0.972 0.008 75)` | `#f9f5f0` | Primary surface, body background. Tinted warm. |
| `--paper-2` | `oklch(0.945 0.012 75)` | `#f2ece4` | Subtle alternate sections, table zebra. |
| `--ink` | `oklch(0.18 0.012 75)` | `#15110c` | Body text, headings. Tinted near black. Never `#000`. |
| `--ink-2` | `oklch(0.42 0.010 75)` | `#504c47` | Secondary copy, captions, meta. |
| `--rule` | `oklch(0.86 0.012 75)` | `#d6d0c9` | One pixel hairline rules and section separators. |
| `--rule-strong` | `oklch(0.62 0.012 75)` | `#8a857e` | Borders that identify controls (inputs, switches). 3.4:1 on paper. |
| `--signal` | `oklch(0.62 0.165 38)` | `#d65a32` | Oxidized copper accent. Link underlines, focus rings, selection, the hero diagram pod, small status dots. |
| `--signal-deep` | `oklch(0.48 0.140 38)` | `#9c3917` | Fills primary buttons, and is the copper for small copper text, because `--signal` on paper is 3.60:1, below 4.5:1 for text. |
| `--code-ink` | `oklch(0.30 0.045 235)` | `#143141` | Inline code and tabular figures only. The only cool hue, used under 3 percent of surface. |

`#000` and `#fff` are banned. Every neutral is tinted toward hue 75 (warm).

### Why oxidized copper

Copper is unfashionable in developer tooling. That is the point. It is the deliberate reverse of the cyan and magenta neon trap. On warm paper, in daylight, it reads editorial and slightly industrial without screaming. It is closer to a print masthead than to a Series A SaaS hero.

## Typography

- Display, a high contrast serif: **Source Serif 4** at 700 for display and 600 for headings, italics for emphasis. Fallback: Charter, Iowan Old Style, Georgia.
- Text, a sturdy sans for UI and long body: **Inter** at 400, 500, 600. Body line height 1.55 to 1.6.
- Code, **JetBrains Mono** (variable), loaded so any weight renders rather than being synthesized.

Type scale, ratio 1.333 (perfect fourth). Matches `tailwind.config.ts`.

| Step | Size / line height | Weight | Use |
|---|---|---|---|
| Display | 76 / 1.04 | 700 | Hero only |
| H1 | 48 / 1.1 | 600 | Section openers |
| H2 | 32 / 1.15 | 600 | Sub sections |
| H3 | 22 / 1.3 | 600 | Card headings, table headers |
| Body L | 19 / 1.55 | 400 | Lead paragraphs |
| Body | 17 / 1.6 | 400 | Default running text |
| Meta | 14 / 1.45 | 500 | Captions, labels |
| Mono | 15 / 1.55 | 400 | Code |

## Layout and rhythm

- Asymmetric grid. The page is not a column of equal rows. Sections vary: full bleed quote, narrow editorial column, two column compare, full bleed code listing.
- Varied vertical rhythm. Hero top padding is 176px on desktop (`pt-44`), 128px on tablet, 80px on phones. Dense reference sections get less. Identical padding everywhere is monotony.
- 1px hairline rules in `--rule` separate sections. No big drop shadowed cards.
- No identical card grids. Where multiple items must appear, use a numbered editorial list, a definition list, or a varied size mosaic.
- Code samples are first class layout objects, not screenshots. They live in monospace blocks in the natural reading flow.

## Motion

- Reveal on scroll for body text is banned. The page is editorial, not theatrical.
- Animate transform and opacity only.
- Curve: `cubic-bezier(0.16, 1, 0.3, 1)` (ease out quart), now Tailwind's default curve. 200ms for state changes, 220ms for log entrances. No bounce, no elastic, no spring.
- Two purposeful motions are allowed.
  1. The hero diagram on hover: the 94ms label fades in and one copper dash travels from the file to the pod in 640ms.
  2. The /start boot sequence: progress ring, milestone bar, log lines, and a caret blinking at 900ms.

## Labels and headings

Headings carry themselves. There are no eyebrow labels above headings. A small mono label appears only when it carries information: step counters (02 / 04), dates (Updated May 2026), docs section names, field labels (Preview URL), file names (`nexus.config.ts`), and "Engineering note", which the hero and footer links name.

## Banned for this project

- Floating Kubernetes hexagons.
- Isometric grid floors.
- Multi stop neon gradients.
- Glassmorphic blurs of any kind. If translucency is needed, a flat tinted overlay only.
- "As featured in" logo bars when no real logos exist.
- A dark mode toggle in v1. The page is light. We commit.

## Accessibility

- Body text contrast 7:1 minimum against `--paper`. `--ink` on `--paper` is approximately 14:1.
- Control borders use `--rule-strong` (3:1 or better).
- Link affordance, 1px copper underline at rest, 2px on hover. Never color only.
- Focus rings, 2px `--signal` with 2px offset, on every interactive element.
- All motion respects `prefers-reduced-motion: reduce`.
