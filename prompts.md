# Nexus-Sync, image prompt pack (v2, editorial register)

These prompts replace the v1 neon dev-tool pack. They match the design language defined in `DESIGN.md`: warm paper surface, oxidized copper signal color, Source Serif 4 plus Inter plus JetBrains Mono. No glassmorphism. No neon. No isometric grids. No floating Kubernetes hexagons.

If a prompt produces glowing cyan, dark mode, hex floors, or futuristic cityscapes, the prompt has drifted and should be regenerated.

## Brand color reference

| Role | OKLCH | Approx hex |
|---|---|---|
| Paper | `oklch(0.972 0.008 75)` | `#f7f3ec` |
| Paper 2 | `oklch(0.945 0.012 75)` | `#ede7d9` |
| Ink | `oklch(0.18 0.012 75)` | `#1f1c16` |
| Signal (oxidized copper) | `oklch(0.62 0.165 38)` | `#c2562b` |

---

## 1. Hero photograph (replaces the neon scene)

> Editorial still life photograph. Top down, raked daylight from the upper left. A weathered linen surface, warm cream paper tone. On the surface: a single sheet of dot grid printer paper showing a hand drawn diagram of a file flowing into a labeled rectangle ("pod-7f2a"), a brass mechanical pencil, a steel coffee cup with a ring of stain on the linen, a small index card with "1.8s" written in graphite, a folded technical magazine. One copper key fob in the lower right is the only saturated color in the frame. Soft shadows, no harsh specular highlights, calm depth of field. Restrained, magazine grade, the opposite of a SaaS hero. Aspect 16 by 9.
>
> Negative: glow, neon, blur, gradients, isometric, futuristic, dark mode, screens, code editor, holograms, particles.
>
> Midjourney parameters: `--ar 16:9 --style raw --v 6 --s 100`.

---

## 2. Wordmark logo

> Wordmark only. The text "Nexus-Sync" set in Source Serif 4 at 600 weight, slight negative tracking, color ink (`#1f1c16`) on paper (`#f7f3ec`). Above the letter y in "Sync", a single small filled circle in oxidized copper (`#c2562b`), sized to the optical weight of a serif diacritic dot. No icon, no shield, no enclosure. Provide an inverted version with paper text on ink ground. Vector. Aspect 4 by 1.

---

## 3. Editorial diagram, two color line drawing

> A line drawing in two colors only: ink (`#1f1c16`) at 1.25 stroke weight, and oxidized copper (`#c2562b`) for the receiving block. Subject: a manila file glyph labeled `app/page.tsx` in JetBrains Mono on the left, a copper filled rectangle labeled `pod-7f2a` on the right, connected by a single horizontal line with a small arrowhead. The composition has generous warm paper margins. No background pattern, no grid, no perspective, no shadow. Reads like a figure in a Bret Victor essay. Aspect 16 by 5.

---

## 4. Long form post header

> Editorial header for a long form engineering post. Warm paper background. Headline set in Source Serif 4 italic, ink color, left aligned, 60px. Subhead in Inter 17px ink secondary. A horizontal hairline rule under the masthead. No imagery. The page itself is the design. Aspect 16 by 9.

---

## 5. Pricing table screenshot

> A close crop of a print magazine pricing table. Paper texture. Three rows separated by 1px hairline rules. Each row has a serif italic name, two lines of body in serif regular, and a price set in JetBrains Mono on the right. No card, no border, no badge, no recommended pill, no shadow. Calm, magazine grade. Aspect 4 by 3.

---

## 6. Founder portrait, optional

> Black and white portrait of a software engineer in their late thirties, sitting at a wooden desk in a glass walled office, north light from camera right. They are holding a printed page of TypeScript with copper colored highlight marks. Calm expression, slight smile. Mid frame, 50mm equivalent, f2.8, natural light only, no studio lighting. Aspect 4 by 5.

---

## Tone rules carried into prompts

- Avoid the words seamless, blazing, hyper, futuristic, AI powered.
- Specify daylight, not back lit.
- Specify warm cream, not pure white.
- If the model insists on adding a screen or code editor, ask it to remove and try again.
