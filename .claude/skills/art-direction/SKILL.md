---
name: art-direction
description: "Brand & art-direction rules for the Nuovo / שולחן השף private-chef site. Use whenever designing, building, styling, refactoring, or reviewing UI for this project — colors, palette, layout, typography, spacing, motion, images, shadows, RTL. Encodes the client's hard do's and don'ts, the canonical palette, the CSS-Modules + RTL architecture, the reveal orchestrator, and the PremiumImage pipeline. Read this BEFORE touching any visual code so changes stay on-brand and don't trigger client pushback."
---

# Nuovo — Art Direction

Brand DNA and hard rules for the **Nuovo / שולחן השף** private-chef marketing site.
The aesthetic is **quiet luxury, editorial, Hebrew RTL** — Loewe / Bottega Veneta
cadence, not generic "SaaS startup." Restraint is the brand. When in doubt, do less.

## When to apply
Read this before any visual work on this project: new sections, styling, palette
or color changes, layout, typography, spacing/rhythm, motion, images, shadows,
borders, or design review. If a request conflicts with a rule below, **surface the
conflict** instead of silently following it.

## Stack & architecture (do not fight it)
- **React 18 + Vite 5 + CSS Modules.** There is **NO Tailwind** — do not introduce it.
- Components live in `src/pages/he/components/<Name>/<Name>.{jsx,module.css}`.
- Page + scroll/reveal/parallax orchestration: `src/pages/he/HebrewPage.jsx`.
- **RTL throughout.** Use logical properties (`margin-inline`, `padding-inline`,
  `inset-inline`), not left/right. Desktop section titles use `white-space:nowrap`;
  mobile wraps normally (handled per-component).
- Reveals are driven by ONE orchestrator: the section gets `.he-revealed`, which
  triggers `.he-inner` (headline clip-mask) and `.he-child` (staggered fade-up).
  Hook new reveals into this — **never add a private IntersectionObserver per
  element** (it races React StrictMode and drifts out of sync).
- Images go through **`<PremiumImage>`** (blur-up from generated LQIPs in
  `src/pages/he/data/lqip.js`, zero-CLS, clip reveal, opt-in hover `zoom`).
  Regenerate `lqip.js` with the sharp tooling after swapping photos.
- Respect `prefers-reduced-motion` on everything that moves.

## The palette — physical, tactile, culinary
Single source of truth: `src/styles/globals.css :root`. Sections map their local
tokens to these via `var()`; **never hardcode hexes in components.**

Every colour derives from a physical culinary material — ceramics, roasted coffee,
raw linen, spices. **NO pure `#000` / `#FFF`. NO digital/plastic hexes. NO generic
"SaaS" colours or "tech orange."** It should feel like an expensive architectural
magazine (Kinfolk, Cereal) or a Michelin restaurant's digital portal.

**Foundation — the canvas**
| Token | Value | Material |
|---|---|---|
| `--paper` | `#F2EFE9` | Raw Linen / Warm Alabaster — primary surface, easy on the eye |
| `--paper-dim` | `#E8E3DB` | Stone — subtle section contrast |

**Mid-tones — structure**
| Token | Value | Material |
|---|---|---|
| `--clay` | `#CDC8BE` | Earthy Taupe (zero yellow undertone) — secondary cards |
| `--rule` | `#BDB7AB` | Faded Clay — ultra-delicate borders & hairlines |

**Accent — restrained warmth**
| Token | Value | Material |
|---|---|---|
| `--warm` | `#7B6044` | Muted Architectural Bronze — subdued, deep, must NOT read as orange |
| `--warm-hover` | `#4F3E2B` | Deep Bronze — interaction / hover state |

> **STRICT TYPOGRAPHY RULE — no accent on text.** Headers, body, step/numerals,
> labels, links, prices — **all** typography uses `--ink` or `--ink-70` (charred
> espresso). Text must be sharp, legible, dark. The accent (`--warm`) is for
> **decoration only** — hairlines under titles, faint borders, the ambient glow,
> the booking pill, the scroll bar. A saturated/orange accent on fonts reads
> cheap and breaks the quiet-luxury vibe. Keep the bronze muted.

**Ink — typography**
| Token | Value | Material |
|---|---|---|
| `--ink` | `#231F1C` | Charred Espresso — warm brown-black, "wet ink on paper" |
| `--ink-70` | `rgba(35,31,28,.7)` | editorial grey for body copy |

To re-theme the whole brand, change these tokens — not the components.

## The client's hard rules
**HATES (never ship these):**
- Grey card boxes.
- **Gradient "melt" fades between sections.** Separate sections with clean cuts
  and thin **copper hairline** rules — never a soft gradient band.
- Cursor gimmicks. (Subtle magnetic CTA / faint ambient card glow are allowed
  ONLY if gated to `pointer:fine` + `prefers-reduced-motion:no-preference` and
  kept barely perceptible. They are the first things to cut if the client reacts.)
- Plain "Word-doc" looking titles.
- Images awkwardly cut at edges.
- Oversized decorative elements.

**LIKES (lean into these):**
- Editorial typography; big **one-row** section titles with an **italic accent**
  second word and a thin **copper hairline** rule beneath.
- Accent **text in warm brown/copper** (copper reserved for the hairline/accents).
- Generous, luxurious whitespace.
- Real photography, large and well-framed.
- Subtle, faded background elements (the desktop-only ambient copper glow).

## Layout, type, shadows
- Max content width `var(--max)` (1440px; 1640px past 2200px). Side padding
  `var(--pad-x)`. Sections breathe with `clamp()` padding (`py` ~clamp(80–150px)).
- Fluid type via `clamp()` with **px ceilings** so nothing grows unbounded on 4K.
  Cap line length (~50–68ch). `text-wrap: balance` on headlines, `pretty` on body;
  `hanging-punctuation: first allow-end last` for RTL quotes.
- Shadows are **multi-layer, buttery, low-opacity warm** (e.g.
  `0 2px 8px rgba(40,28,18,.03), 0 16px 40px -20px rgba(40,28,18,.14),
  0 40px 80px -44px rgba(40,28,18,.12)`). No harsh single-layer black shadows.
- Borders are **hairline-thin and faint** (`1px solid var(--c-rule-2)`).
- `background-attachment: fixed` is desktop-only — drop to flat paper under 900px
  (iOS Safari renders fixed unreliably).

## Working process (non-negotiable)
- **Verify on desktop AND mobile** before declaring done (the client iterates from
  PC and phone screenshots). Run the dev server and look; don't ship unseen.
- **Be honest about conflicts.** If a request fights a rule here or the existing
  intentional design, say so and recommend the on-brand alternative — that is what
  protects the brand, which is the whole job.
- **Do not commit or push unless explicitly asked.** Always `npm run build` to verify.
- Prefer refining existing tokens/patterns over inventing new ones. The most
  sophisticated move is usually restraint.
