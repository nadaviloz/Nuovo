# Handoff — Nuovo / שולחן השף (private-chef site)

A **Hebrew, right-to-left (RTL)** single-page marketing/landing site for the private-chef
brand **"Nuovo / שולחן השף"** (chef Ohad). The chef comes to your home and runs a
restaurant-grade dinner — live chef stations, a personal menu, full hosting. One long-scroll
landing page, no routing, no backend. The vibe is **quiet luxury / editorial** (Loewe,
Bottega Veneta, Kinfolk, Cereal). The page's goal is to get the visitor to contact / book.

## Tech stack & how to run

- **React 18 + Vite 5**, plain JSX. **No TypeScript.**
- **CSS Modules** for all styling (`<Name>.module.css` next to each `<Name>.jsx`).
  **No Tailwind, no CSS-in-JS — do not introduce them.**
- **No backend, no router, no state library.** Dependencies are intentionally tiny:
  `react` + `react-dom` (+ Vite dev deps). Don't add libraries unless truly necessary.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # always build to verify before declaring done
```

Deploy: Vercel auto-deploys on push to `main`. **Don't commit or push unless explicitly asked.**

## File / folder map

```
index.html                          # fonts, meta, RTL <html dir="rtl">, hero preload
src/main.jsx                        # React entry
src/App.jsx                         # renders <HebrewPage/>
src/styles/globals.css              # reset + CANONICAL PALETTE (:root tokens) + reveal/parallax CSS
src/pages/he/HebrewPage.jsx         # THE page: section order + all scroll/reveal/parallax/anchor JS
src/pages/he/HebrewPage.module.css  # page shell: font tokens, --max, --pad-x, page background
src/pages/he/data/lqip.js           # generated low-res blur-up placeholders for images
src/pages/he/hooks/useReveal.js     # reveal helper (used by About)
src/pages/he/hooks/useMagnetic.js   # subtle magnetic-button hover, desktop only (used by Hero)
src/pages/he/components/<Name>/<Name>.jsx + <Name>.module.css
```

Components: `Nav, Hero, About, Process, PureFlavors, MenuBridge, Tracks, Upgrades, TableArt,
Testimonials, ServiceIncludes, Kitchen, Booking, Footer, ScrollProgress, FloatWhatsApp,
FloatBook, BackToTop, PremiumImage, Reels`. (`Reels` — swipeable short-video reels — is
mounted inside `Kitchen`. `PremiumImage` is the shared image component, used by PureFlavors,
Upgrades, and TableArt.)

## The design language (BRAND — do not break this)

The client has **hard rules** and iterates from PC + phone screenshots. Breaking these
triggers pushback.

### Canonical palette
Defined once in `globals.css :root`, re-exposed as friendly names in `HebrewPage.module.css`.
**Never hardcode hex in components — always use the `var()` tokens.** No pure `#000`, no pure
`#FFF`, no "tech"/SaaS colours, **no orange**.

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F2EFE9` | Warm linen — main page canvas |
| `--paper-2` / `--paper-dim` | `#E8E3DB` | Stone — subtle section contrast |
| `--paper-hi` | `#F8F6F1` | Lifted linen highlight |
| `--clay` | `#CDC8BE` | Earthy taupe — secondary cards |
| `--rule` | `#BDB7AB` | Faded clay — ultra-delicate hairlines |
| `--ink` | `#231F1C` | Charred espresso (warm brown-black) — ALL text |
| `--ink-70` | `rgba(35,31,28,.72)` | Editorial grey for body copy |
| `--warm` (THE accent) | `#7B6044` | Muted bronze/copper — **decoration only** |
| `--warm-hover` | `#4F3E2B` | Deep bronze — hover/interaction |

Dark sections (Hero on mobile, Testimonials, Kitchen) sit on a near-black warm surface
(`~#111`) with light text.

> **STRICT TYPE RULE:** all typography is `--ink` / `--ink-70` (or white on dark sections).
> The bronze accent (`--warm`) is **decoration ONLY** — the thin hairline under titles, faint
> borders, the ambient glow, the booking pill, the scrollbar. **Never** colour body / headline
> / price / label text orange or copper.

### Fonts (loaded in `index.html`)
- `Assistant` (Hebrew + Latin) → `--serif`, `--brand`, `--accent` (workhorse).
- `DM Sans` → `--label` (uppercase eyebrows / labels / nav links).
- `Libre Baskerville` (italic) → display titles / editorial italic accents.
- Type is fluid via `clamp()` **with px ceilings** so nothing grows unbounded on 4K.

### Signature title style (LIKE)
Big **one-row** titles (desktop `white-space:nowrap`; mobile wraps normally). The second word
is often an **italic accent** (Libre Baskerville italic) in **brown/ink — not copper**. A thin
**copper hairline** sits under each title (`::after`) — the one place copper touches near text,
and it's a *line*, not the text. A tiny eyebrow label like "/ 03" uses the `_num_` class.

### Hard rules — the client HATES these (never ship)
Grey card boxes · gradient "melt" fades between sections (use clean cuts + thin copper
hairlines) · cursor gimmicks (a barely-perceptible magnetic CTA / faint glow is tolerated
ONLY when gated to `pointer:fine` + `prefers-reduced-motion:no-preference`) · plain
"Word-doc" titles · images awkwardly cut at the edges · oversized decorative elements.

### LIKES — lean into these
Editorial typography, generous whitespace, large well-framed **real photography**, one-row
titles + italic accent + copper hairline, subtle faded background elements.

### Shadows / borders / RTL mechanics
- Shadows: **multi-layer, soft, low-opacity, warm** — never a harsh single black shadow.
- Borders: hairline-thin and faint (`1px solid var(--rule-2)` ≈ `rgba(189,183,171,.55)`).
- **RTL:** use **logical properties** everywhere — `margin-inline`, `padding-inline`,
  `inset-inline`, `*-inline-start/end` — **never** `left`/`right`.
- Layout tokens: `--max: 1440px` (content max width), `--pad-x: clamp(24px,5vw,96px)` (gutters).
  A `.wrap` centers content within `--max` with `--pad-x` gutters.
- `background-attachment: fixed` is **desktop only** (iOS Safari unreliable); under `900px`
  the page drops the fixed ambient glow to flat paper.

## Animation / reveal system (ONE orchestrator — don't fight it)

All scroll animation is centralized in `HebrewPage.jsx`. **Do not add a private
IntersectionObserver per component** (it races React StrictMode and desyncs).

1. **Headline clip-mask reveal** — on mount the page wraps each `h1/h2/h3` line in
   `<span class="he-mask"><span class="he-inner">…</span></span>`; lines slide up when the
   section gets `.he-revealed`. Staggered via `--i`.
2. **Child fade-up** — ledes, paragraphs, CTAs, cards, steps get `.he-child` (opacity 0 +
   translateY → settle), also staggered.
3. **Trigger** — a single `IntersectionObserver` adds `.he-revealed` per section/header
   (`threshold:0`, `rootMargin: 0px 0px -12% 0px` so tall sections still fire on phones).
   Hero reveals immediately on first paint.
4. **Parallax** — JS writes `--parallax-y` on `[data-parallax]` photos per scroll frame; CSS
   applies `translate3d` (default amount `0.15`).
5. **Eased anchor scrolling** — clicks on `a[href^="#"]` get a custom eased scroll, offset 80px.
6. **`prefers-reduced-motion: reduce`** disables all of the above. Honor it on anything new.
7. Reveal cadence tokens (`globals.css :root`): `--reveal-duration: 1.05s`,
   `--reveal-ease: cubic-bezier(0.16,1,0.3,1)`, `--reveal-stagger: 110ms`.

**Images go through `<PremiumImage>`** — blur-up from generated LQIPs in `data/lqip.js`, zero
layout shift, clip reveal, optional hover `zoom`. If you swap a photo, the LQIP must be
regenerated. Use this component for images; don't hand-roll `<img>`.

## The page, section by section (render order in `HebrewPage.jsx`)

`ScrollProgress` (thin copper progress bar) · `Nav` (fixed dark-glass "pill" navbar; mobile
collapses to a hamburger + dropdown) · `Hero` (full-screen photo + headline + CTAs; mobile =
dark surface with image-as-card on top, stacked full-width CTAs) · `About` (#about — portrait
+ intro) · `Process` (#how — 4 numbered steps on a copper rail; mobile 2×2) · `PureFlavors`
(editorial statement + chef-plating photo) · `MenuBridge` (two numbered steps on a vertical
spine, wipe-up reveal) · `Tracks` (#tracks — pricing/package cards + decorative food "peek"
cutouts) · `Upgrades` (add-on cards, photo + label) · `TableArt` (tablescape story: stepped
photo+copy, masonry gallery, final statement) · `Testimonials` (dark; quote cards, mobile =
swipe carousel) · `ServiceIncludes` (#service — two item columns + spine + plate "peek") ·
`Kitchen` (dark live-stations block; mounts `Reels`) · `Booking` (#book — the conversion form,
bento layout) · `Footer`.

Floating UI (always on screen): `FloatWhatsApp` (round FAB, bottom-right), `FloatBook` (pill,
bottom-left, jumps to #book), `BackToTop` (round, appears on scroll, above the WhatsApp FAB).

## Known placeholders / TODO

- **WhatsApp number** is a placeholder `972500000000` in `FloatWhatsApp.jsx` — must be set.
- **Dessert ("קינוחים") upgrade** photo is a placeholder (`/uploads/gallery/gallery-1.jpg`).
- iOS native date input had a clipping issue in Booking — fixed with an invisible-input
  pattern; date handling on iOS is a known soft spot, retest on a real iPhone after changes.
- `./memento.sh save|list|undo` snapshots `src/` and `public/` locally (a homemade undo on
  top of git).
