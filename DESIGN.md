# Nexus-Sync, design context

## Theme decision

Light, warm paper surface. Forced by the scene sentence.

> A staff platform engineer at a Series D fintech, on a Wednesday at 10am, sitting in a glass walled office with overcast daylight from a north facing window. They are evaluating a vendor for the 80 person backend team. They are calm, slightly skeptical, not impressed by gimmicks. This browser tab is one of nine.

Daylight, calm, skeptical, editorial reading mode. That is a light surface. Dark mode in this scene reads as "another developer tool trying to look serious by being black." We are the page that looks confident in daylight.

## Color strategy: Committed

One saturated color owns 30 to 60 percent of the page surface, paired with a tinted paper neutral and a deep ink for type. No third accent.

### Tokens, OKLCH

| Role | OKLCH | Approx hex | Use |
|---|---|---|---|
| `--paper` | `oklch(0.972 0.008 75)` | `#f7f3ec` | Primary surface, body background. Tinted warm. |
| `--paper-2` | `oklch(0.945 0.012 75)` | `#ede7d9` | Subtle alternate sections, table zebra. |
| `--ink` | `oklch(0.18 0.012 75)` | `#1f1c16` | Body text, headings. Tinted near black. Never `#000`. |
| `--ink-2` | `oklch(0.42 0.010 75)` | `#5d564b` | Secondary copy, captions, meta. |
| `--rule` | `oklch(0.86 0.012 75)` | `#d3ccbe` | One pixel hairline rules and borders. |
| `--signal` | `oklch(0.62 0.165 38)` | `#c2562b` | Committed brand color, oxidized copper. Calls to action, key emphasis, link underlines. Owns 30 to 50 percent of hero and section openers. |
| `--signal-deep` | `oklch(0.48 0.140 38)` | `#8d3a17` | Hover state for signal, high contrast text on `--signal`. |
| `--code-ink` | `oklch(0.30 0.045 235)` | `#1f3a5b` | Inline code and tabular figures only. The only cool hue, used under 3 percent of surface. |

`#000` and `#fff` are banned. Every neutral is tinted toward hue 75 (warm).

### Why oxidized copper

Copper is unfashionable in developer tooling. That is the point. It is the deliberate reverse of the cyan and magenta neon trap. On warm paper, in daylight, it reads editorial and slightly industrial without screaming. It is closer to a print masthead than to a Series A SaaS hero.

## Typography

- Display, a high contrast serif. First choice: **Source Serif 4** at 700, italics for emphasis. Fallback: Charter, Iowan Old Style, Georgia.
- Text, a sturdy sans for UI and long body. **Inter** at 420, 520, 620 weights. Or **IBM Plex Sans** if Inter feels overused. Body line height 1.55, line length capped at 68ch.
- Code, **JetBrains Mono** at 0.92em. Used in code samples and inline command names.

Type scale, ratio 1.333 (perfect fourth).

| Step | Size, line height | Weight | Use |
|---|---|---|---|
| Display | 76 / 1.04 | 620 | Hero only |
| H1 | 48 / 1.1 | 620 | Section openers |
| H2 | 32 / 1.15 | 620 | Sub sections |
| H3 | 22 / 1.3 | 620 | Card headings, table headers |
| Body L | 19 / 1.55 | 420 | Lead paragraphs |
| Body | 17 / 1.6 | 420 | Default running text |
| Meta | 14 / 1.45 | 520 | Captions, labels |
| Mono | 15 / 1.55 | 420 | Code |

## Layout and rhythm

- Asymmetric grid. The page is not a column of equal rows. Sections vary: full bleed quote, narrow editorial column, two column compare, full bleed code listing.
- Varied vertical rhythm. Hero gets 144px top padding. Dense reference sections get 64px. Identical padding everywhere is monotony.
- 1px hairline rules in `--rule` separate sections. No big drop shadowed cards.
- No identical card grids. Where multiple items must appear, use a numbered editorial list, a definition list, or a varied size mosaic.
- Code samples are first class layout objects, not screenshots. They live in monospace blocks in the natural reading flow.

## Motion

- Reveal on scroll for body text is banned. The page is editorial, not theatrical.
- Animate transform and opacity only.
- Curves: `cubic-bezier(0.16, 1, 0.3, 1)` (ease out quart) for everything. 220ms for state changes, 380ms for entrances. No bounce, no elastic, no spring.
- Two purposeful motions are allowed.
  1. The mirror sync diagram in the hero animates on hover, not on load.
  2. The editor mock has a one character typing cursor blink.

## Banned for this project

- Floating Kubernetes hexagons.
- Isometric grid floors.
- Multi stop neon gradients.
- Glassmorphic blurs of any kind. If translucency is needed, a flat tinted overlay only.
- "As featured in" logo bars when no real logos exist.
- A dark mode toggle in v1. The page is light. We commit.

## Accessibility

- Body text contrast 7:1 minimum against `--paper`. `--ink` on `--paper` is approximately 14:1.
- Link affordance, 1px copper underline at rest, 2px on hover. Never color only.
- Focus rings, 2px `--signal` with 2px offset, on every interactive element.
- All motion respects `prefers-reduced-motion: reduce`.
