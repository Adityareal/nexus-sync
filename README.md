# Nexus-Sync, landing page (v3 editorial)

A Next.js 14 landing page for an ephemeral developer cloud. The visual language deliberately rejects the saturated dev tool category aesthetic (dark mode plus cyan and magenta neon, isometric 3D, glowing data bridges, glassmorphic cards). It commits to a warm paper surface and a single oxidized copper signal color, set in Source Serif 4 with Inter for UI and JetBrains Mono for code.

The design choices are documented in `PRODUCT.md` and `DESIGN.md` per the impeccable skill. Read those before changing a token.

## Run

```bash
npm install
npm run dev
# open http://localhost:3000
```

Requires Node 18 or later.

## Design tokens

OKLCH, in `tailwind.config.ts` and `app/globals.css`.

| Role | OKLCH |
|---|---|
| `paper` | `oklch(0.972 0.008 75)` |
| `paper-2` | `oklch(0.945 0.012 75)` |
| `ink` | `oklch(0.18 0.012 75)` |
| `ink-2` | `oklch(0.42 0.010 75)` |
| `rule` | `oklch(0.86 0.012 75)` |
| `signal` | `oklch(0.62 0.165 38)` |
| `signal-deep` | `oklch(0.48 0.140 38)` |
| `code-ink` | `oklch(0.30 0.045 235)` |

`#000` and `#fff` are banned. Every neutral is tinted toward warm hue 75.

## Type scale

Source Serif 4 for display, Inter for UI text, JetBrains Mono for code. Sizes: 76, 48, 32, 22, 19, 17, 15, 14. Ratio 1.333. See `tailwind.config.ts`.

## Banned for this project

- Glassmorphism, gradient text, neon, isometric perspective, floating Kubernetes hexagons.
- Identical card grids, hero metric tile templates, em dashes in copy, the word seamless.
- Dark mode in v1.

## File map

- `app/page.tsx`, the editorial landing page.
- `app/layout.tsx`, font wiring via `next/font`.
- `app/globals.css`, OKLCH custom properties and base styles.
- `components/Logo.tsx`, ink wordmark with a single copper diacritic.
- `components/HeroIllustration.tsx`, two color mirror diagram.
- `components/Icons.tsx`, deprecated.
- `tailwind.config.ts`, design tokens.
- `PRODUCT.md`, audience, voice, anti references, hard constraints.
- `DESIGN.md`, theme decision, color strategy, typography, motion.
- `prompts.md`, image prompt pack matching the editorial register.
- `SKILL.md`, the impeccable design skill.
