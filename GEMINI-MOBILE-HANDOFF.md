# Handoff for Gemini — Nuovo / שולחן השף — Mobile Rebuild

**Read this whole file before suggesting or writing anything.** It is a complete,
self-contained briefing on the project: what it is, how it's built, its exact design
language, every section on the page, the animation system, and — most importantly —
**exactly how the phone (mobile) version looks and behaves right now and why it's not
good enough.** The goal of the next phase is to **rebuild the mobile experience from
scratch, mobile-first**, while keeping the (excellent, finished) desktop version
untouched and staying 100% on-brand.

---

## 0. TL;DR of the mission

- The **desktop site is finished and looks great.** Do **not** change desktop output.
- The **mobile site is weak**: it's mostly the desktop layout with grids collapsed to
  one column at a `900px` breakpoint. It works, but it has no real mobile-first UX, the
  rhythm/spacing is off on small screens, touch targets and flow weren't designed for a
  phone, and it feels like a shrunk desktop rather than a native phone experience.
- We are **rebuilding mobile from zero**, mobile-first, keeping the brand identity exact.

---

## 1. What the project is

A **Hebrew, right-to-left (RTL)** marketing / landing site for a **private chef** brand:
**"Nuovo / שולחן השף"** (literally "The Chef's Table"), chef Ohad. The chef comes to
your home and runs a restaurant-grade dinner — live chef stations, a personal menu,
full hosting. It's a single long-scroll landing page (no routing, no backend).

- **Language:** Hebrew, RTL. `<html lang="he" dir="rtl">`.
- **Vibe:** quiet luxury / editorial — think Loewe, Bottega Veneta, Kinfolk, Cereal
  magazine, a Michelin restaurant's digital portal. **Restraint is the brand.**
- **Goal of the page:** get the visitor to contact / book the chef (CTA: "ליצירת קשר"
  = "get in touch", and a booking form).

---

## 2. Tech stack & how to run it

- **React 18 + Vite 5.** Plain JSX. **No TypeScript.**
- **CSS Modules** for all styling (`<Name>.module.css` next to each `<Name>.jsx`).
  **There is NO Tailwind and NO CSS-in-JS. Do not introduce them.**
- **No backend, no router, no state library.** One page renders one big component tree.
- Dependencies are tiny: just `react` + `react-dom` (+ Vite dev deps). Don't add libraries
  unless truly necessary — the brand prizes a hand-built, lean codebase.

Run it:
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # always build to verify before declaring done
```

Deploy: Vercel auto-deploys on push to `main`. **Do not commit or push unless the user
explicitly asks.**

### File / folder map
```
index.html                         # fonts, meta, RTL <html dir="rtl">, hero preload
src/main.jsx                       # React entry
src/App.jsx                        # renders <HebrewPage/>
src/styles/globals.css             # reset + CANONICAL PALETTE (:root tokens) + reveal/parallax CSS
src/pages/he/HebrewPage.jsx        # THE page: section order + all scroll/reveal/parallax/anchor JS
src/pages/he/HebrewPage.module.css # page shell: font tokens, --max, --pad-x, page background
src/pages/he/data/lqip.js          # generated low-res blur-up placeholders for images
src/pages/he/hooks/useReveal.js    # (reveal helper)
src/pages/he/hooks/useMagnetic.js  # (subtle magnetic-button hover, desktop only)
src/pages/he/components/<Name>/<Name>.jsx + <Name>.module.css
```

Components (each is one section or one UI piece):
`Nav, Hero, About, Process, PureFlavors, MenuBridge, Tracks, Upgrades, TableArt,
Testimonials, ServiceIncludes, Kitchen, Booking, Footer, ScrollProgress,
FloatWhatsApp, FloatBook, BackToTop, PremiumImage, Reels`.

---

## 3. The design language (BRAND — do not break this)

This is the single most important section. The client has **hard rules** and iterates
from screenshots. Breaking these triggers pushback.

### 3.1 Canonical palette
Defined once in `src/styles/globals.css :root` and re-exposed as friendly names in
`HebrewPage.module.css .page`. **Never hardcode hex values in components — always use the
`var()` tokens.** Every colour is a real culinary/material reference. **No pure `#000`,
no pure `#FFF`, no "tech"/"SaaS" colours, no orange.**

| Friendly token | Hex | Material / role |
|---|---|---|
| `--paper` | `#F2EFE9` | Raw linen / warm alabaster — the main page canvas |
| `--paper-2` / `--paper-dim` | `#E8E3DB` | Stone — subtle section contrast |
| `--paper-hi` | `#F8F6F1` | Lifted linen highlight |
| `--clay` | `#CDC8BE` | Earthy taupe (zero yellow) — secondary cards |
| `--rule` | `#BDB7AB` | Faded clay — ultra-delicate hairlines/borders |
| `--ink` | `#231F1C` | Charred espresso (warm brown-black) — ALL text |
| `--ink-70` | `rgba(35,31,28,.72)` | Editorial grey for body copy |
| `--warm` (THE accent) | `#7B6044` | Muted architectural bronze/copper — decoration only |
| `--warm-hover` | `#4F3E2B` | Deep bronze — hover/interaction |

Dark sections (Hero on mobile, Testimonials, Kitchen) sit on a near-black warm surface
(`~#111` / `rgba(14,14,14,…)`), with light text.

> **STRICT TYPE RULE:** **All typography is `--ink` / `--ink-70`** (or white on dark
> sections). The bronze accent (`--warm`) is **decoration ONLY** — the thin hairline
> under titles, faint borders, the ambient glow, the booking pill, the scrollbar.
> **Never** color body/headline/price/label text orange or copper. Saturated accent on
> text reads cheap and kills the quiet-luxury feel.

### 3.2 Fonts (loaded in `index.html` via Google Fonts)
- `Assistant` (Hebrew + Latin) → `--serif`, `--brand`, `--accent` (the workhorse).
- `DM Sans` → `--label` (uppercase eyebrows / small labels / nav links).
- `Libre Baskerville` (italic) → display titles / editorial italic accents.
- Nav brand wordmark uses `Cormorant Garamond` italic ("Nuovo").
- Body line-height ~1.6–1.85. Type is fluid via `clamp()` **with px ceilings** so nothing
  grows unbounded on 4K.

### 3.3 The signature title style (LIKES)
- Big **one-row** section titles. On desktop they use `white-space:nowrap`; **on mobile
  they're allowed to wrap** (every section already flips `.title{white-space:normal}` at
  the mobile breakpoint — keep doing this).
- The second word of a title is often an **italic accent** (Libre Baskerville italic), in
  **brown/ink — not copper**.
- A thin **copper hairline rule** sits under each title (`::after`). This is the one place
  copper touches near text — it's a *line*, not the text.
- A tiny eyebrow label like "/ 03" with a small copper tick before it (the `_num_` class).

### 3.4 Hard rules — the client HATES these (never ship):
- Grey card boxes.
- **Gradient "melt" fades between sections.** Sections are separated by clean cuts and
  thin copper hairlines — never a soft gradient band.
- Cursor gimmicks. (A barely-perceptible magnetic CTA / faint card glow is tolerated
  ONLY when gated to `pointer:fine` + `prefers-reduced-motion:no-preference`; first to cut.)
- Plain "Word-doc"-looking titles.
- **Images awkwardly cut at the edges.**
- Oversized decorative elements.

### 3.5 LIKES — lean into these:
- Editorial typography, generous luxurious whitespace.
- Large, well-framed **real photography**.
- One-row titles + italic accent word + copper hairline.
- Subtle, faded background elements (desktop-only ambient copper glow).

### 3.6 Shadows / borders / RTL mechanics
- Shadows: **multi-layer, soft, low-opacity, warm** (e.g.
  `0 2px 8px rgba(40,28,18,.03), 0 16px 40px -20px rgba(40,28,18,.14), 0 40px 80px -44px rgba(40,28,18,.12)`).
  No harsh single black shadows.
- Borders: hairline-thin and faint (`1px solid var(--rule-2)` ≈ `rgba(189,183,171,.55)`).
- **RTL:** use **logical properties** everywhere — `margin-inline`, `padding-inline`,
  `inset-inline`, `*-inline-start/end` — **not** `left`/`right`. The reading direction is
  right→left.
- Layout tokens: `--max: 1440px` (content max width), `--pad-x: clamp(24px,5vw,96px)`
  (side gutters). A `.wrap` centers content within `--max` with `--pad-x` gutters.
- `background-attachment: fixed` is **desktop only** (iOS Safari renders it unreliably);
  under `900px` the page drops the fixed ambient-glow background to flat paper.

---

## 4. The animation / reveal system (ONE orchestrator — don't fight it)

All scroll animation is centralized in `HebrewPage.jsx`. **Do not add a private
IntersectionObserver per component** (it races React StrictMode and desyncs).

1. **Headline clip-mask reveal.** On mount, the page walks every `h1/h2/h3` and wraps each
   line in `<span class="he-mask"><span class="he-inner">…</span></span>`. The inner starts
   translated 110% down inside an `overflow:hidden` mask; when the section gets
   `.he-revealed`, the lines slide up. Staggered via `--i`.
2. **Child fade-up.** Ledes, body paragraphs, CTAs, cards, steps, etc. get `.he-child`
   (opacity 0 + translateY 28px → settle), also staggered.
3. **Trigger.** A single `IntersectionObserver` adds `.he-revealed` to each `section`/
   `header` as it enters the viewport (`threshold:0`, `rootMargin: 0px 0px -12% 0px` so
   tall sections still fire on phones). Hero reveals immediately on first paint.
4. **Parallax.** JS writes `--parallax-y` on `[data-parallax]` photo elements per scroll
   frame; CSS applies `translate3d`. (Default amount `0.15`.)
5. **Eased anchor scrolling.** Clicks on `a[href^="#"]` are intercepted for a custom
   eased scroll, offset by 80px for the fixed nav.
6. **`prefers-reduced-motion: reduce`** disables all of the above (everything just shows).
   Honor this on anything new.
7. **Reveal cadence tokens** (in `globals.css :root`): `--reveal-duration: 1.05s`,
   `--reveal-ease: cubic-bezier(0.16,1,0.3,1)`, `--reveal-stagger: 110ms`. Long, slow,
   no bounce — the Loewe/Bottega cadence.

**Images go through `<PremiumImage>`** — blur-up from generated LQIPs in
`data/lqip.js`, zero layout shift, clip reveal, optional hover `zoom`. If you swap a
photo, the LQIP must be regenerated. Use this component for images, don't hand-roll `<img>`.

---

## 5. The page, section by section (render order in `HebrewPage.jsx`)

Reading top → bottom, this is the whole experience:

1. **`ScrollProgress`** — a thin copper progress bar tracking scroll position.
2. **`Nav`** — fixed floating "pill" navbar (see §6 for full mobile detail). Dark glass
   pill, brand wordmark "Nuovo", 4 anchor links, a "ליצירת קשר" (contact) CTA.
3. **`Hero`** (`<header>`) — full-screen on desktop: big background food photo with a slow
   Ken Burns zoom, headline + lede + two CTAs overlaid. The pitch: "you host, we bring the
   restaurant."
4. **`About` (`#about`, "מי אני" / who I am)** — chef portrait + editorial intro copy. Two
   columns on desktop (sticky portrait + text).
5. **`Process` (`#how`, "איך זה עובד" / how it works)** — 4 numbered steps (I–IV) with
   icons, joined by a copper rail.
6. **`PureFlavors`** — editorial "pure flavors" statement: large title + lede + a big
   chef-plating photo. Two-column body on desktop.
7. **`MenuBridge`** — a transitional editorial moment: two numbered steps (01 / 02) along a
   vertical "spine" line, with a reveal where the numerals wipe up and the spine draws down.
8. **`Tracks` (`#tracks`, "מסלולים" / packages)** — the pricing/packages section: a row of
   cards, each with a name, description, a "min diners" pill and a price. Decorative food
   "peek" cutouts bleed in at the sides (desktop).
9. **`Upgrades`** — optional add-ons: a grid of cards, each with a photo + label
   ("NUOVO" regular + "UPGRADES" bold).
10. **`TableArt`** — the table-styling / tablescape story: a stepped flow of photo + copy,
    then a masonry photo gallery, then a big "final statement" line.
11. **`Testimonials`** — customer quotes styled as chat/QA cards in a masonry/column layout.
    Dark section.
12. **`ServiceIncludes` (`#service`, "מה כלול" / what's included)** — two columns of
    included-items lists separated by a vertical spine, plus a decorative plate "peek".
13. **`Kitchen`** — a dark "live kitchen / stations" feature block.
14. **`Booking` (`#book`)** — the conversion form: a "bento" layout with the form fields
    (name, date, segmented choices, etc.) and supporting info. This is the primary goal.
15. **`Footer`** — multi-column footer (collapses to one column on mobile).

**Floating / fixed UI (always on screen):**
- **`FloatWhatsApp`** — a round WhatsApp FAB, bottom-right.
  ⚠️ The WhatsApp number is still a **placeholder** (`972500000000`) — must be set.
- **`FloatBook`** — a small "book" pill, bottom-left, jumps to `#book`.
- **`BackToTop`** — a round back-to-top button, appears on scroll, bottom-right (sits above
  the WhatsApp FAB).

`Reels` exists as a component (swipeable short-video reels) but is **not currently mounted**
in the page tree — ignore unless asked.

---

## 6. ⭐ HOW THE PHONE LOOKS RIGHT NOW (current mobile state — read carefully)

The mobile version was **not designed mobile-first.** It is the finished desktop layout
with a set of `@media (max-width: …)` overrides bolted on — mostly at **`900px`**, with a
few at `720/640/600px`. The dominant move is "collapse multi-column grids to a single
column." It *functions*, but it lacks intentional mobile UX, the vertical rhythm is
inconsistent between sections (each section invented its own clamp paddings), and several
sections only barely adapt. **Breakpoints are inconsistent across components** (900 vs 980
vs 760 vs 720 vs 640 vs 600) — there is no shared mobile system.

Here is the **exact current behavior of every piece on a phone:**

### Nav (`max-width: 900px`)
- Desktop links + contact CTA are **hidden**. A **hamburger button** appears (44×44px, three
  bars that animate into an X when open).
- Brand wordmark shrinks to 38px. Pill height 64px.
- Tapping the burger opens a **dropdown panel** below the pill: near-black glass
  (`rgba(10,10,10,.98)`), rounded `22px`, the 4 links stacked (22px, 17px vertical padding,
  hairline dividers) + a full-width light "ליצירת קשר" CTA pill at the bottom.
- Opening the menu sets `body{overflow:hidden}` (locks scroll). Panel fades/slides in.
- *Weak points:* it's a dropdown, not a full-height sheet; no backdrop dimming over the
  page; only 4 links (no jump to Tracks-pricing or Booking beyond the CTA); the burger sits
  in the pill but the overall nav UX wasn't designed as a mobile system.

### Hero (`max-width: 900px`) — the one section that *was* deliberately reworked for mobile
- Switches to a **dark surface** (matches Testimonials), `display:block`, padding
  `20px 20px 48px`. Desktop's full-bleed background photo is dropped.
- The photo becomes a **contained card at the top** (`order:1`), `aspect-ratio 4/5`,
  rounded `22px`, with a soft shadow. The Ken Burns zoom keeps looping.
- Below it, centered: **eyebrow → headline → lede → CTAs**, stacked with `gap:20px`.
  Headline `clamp(30px,8.5vw,44px)`, lede 16px.
- CTAs become **full-width stacked buttons** (`flex-direction:column; align-items:stretch`):
  primary = white bg / dark text with a circular clay arrow badge; secondary = ghost outline
  (light border, light text on dark). Padding ~16–18px (decent touch size).
- This is the **template/quality bar** for what the rest of mobile should feel like, but the
  other sections were not brought up to it.

### About (`max-width: 900px`)
- Head + grid collapse to one column. Title wraps normally. The sticky portrait becomes
  static and flows inline. (Minimal — just a collapse.)

### Process (`max-width: 900px`)
- Head → one column; title wraps. The 4 steps go to a **2×2 grid** (`1fr 1fr`).
- The single connecting copper rail (which only reached the first row) is replaced by a
  **per-step horizontal hairline** through each icon so all rows look consistent.
- *Weak point:* on a narrow phone, 2 columns of stepped content can get cramped.

### PureFlavors (`max-width: 900px`)
- One column; title wraps; lede stretches full width. Body → single column. The media photo
  becomes `aspect-ratio 3/4`, capped at `70vh`. Section paddings use their own clamps.

### MenuBridge (`max-width: 760px`)
- The vertical spine moves from center to the **inline-end (right, RTL)** edge.
- The two steps stretch full width with end padding so they clear the spine. Numerals
  resize to `clamp(56px,16vw,80px)`.

### Tracks / pricing (`max-width: 1100px` then `900px` then `720px`)
- Decorative food "peek" cutouts get repositioned and shrunk at 1100/720 so they stay on
  screen (they bleed off-edge otherwise).
- At `900px`: head → one column; the cards become a **single-column stack** (`gap:18px`,
  padded by `--pad-x`), no horizontal offsets. Card footer (min-diners pill + price) is
  forced to a consistent vertical stack so every card matches.
- *Weak points:* a tall vertical stack of pricing cards with no horizontal scroll/carousel;
  the decorative peeks are fiddly on small screens; price/CTA hierarchy wasn't re-tuned for
  thumb reach.

### Upgrades (`max-width: 1024px` then `720px`)
- Media aspect flips to 16/9 then 4/3. At 720: head margin reset, title wraps, grid →
  **one column**.

### TableArt (`max-width: 900px`)
- Lots of overrides: head/flow → one column; stepped photo+copy stack vertically; the
  alternating offset is removed; step media → `aspect-ratio 4/3`, rounded 14px.
- The **masonry gallery** becomes a **2-column grid** with a full-width hero image spanning
  both columns and the rest as square tiles (one wide `16/9` tile at the end).
- The big "final statement" line scales to `clamp(38px,12vw,62px)`.
- *Weak point:* this is the most complex section on mobile and the gallery grid is doing a
  lot — worth rethinking as a cleaner mobile gallery (carousel?).

### Testimonials (`max-width: 1100px` → 2 cols, `900px` head, `640px`)
- At `640px` the column layout becomes a **horizontal swipe carousel**: a flex row with
  `scroll-snap-type: x mandatory`, each card `flex: 0 0 85%`, scrollbar hidden, bled to the
  page edges with negative inline margins. (This is a nice mobile pattern already.)

### ServiceIncludes (`max-width: 900px`)
- Head → one column; the two item columns stack (`1fr`); the **vertical spine is hidden**;
  the note goes full width. The decorative plate "peek" hugs the bottom-left, ~50% opacity,
  sized `min(60vw,290px)`.

### Booking / the form (`max-width: 980px` then `600px`)
- At `980px` the "bento" grid → one column. At `600px`: the head → one column; lede full
  width; a two-up `row2` field group → one column; segmented controls (`.seg`) shrink to
  `padding:9px 10px; font-size:13px`.
- *Weak points:* the form was not redesigned for a phone — field grouping, label sizing,
  the date input, and the segmented choices are desktop controls squeezed down. (Note: there
  is project history of a **native date input clipping on iPhone** that needed an
  invisible-input fix — date handling on iOS is a known soft spot.) The booking flow is the
  conversion goal and deserves a proper mobile form UX (big tap targets, logical step order,
  thumb-friendly submit).

### Footer (`max-width: 900px`)
- Grid → one column. (Minimal.)

### Floating buttons (mobile sizes)
- **WhatsApp FAB** (`max-width: 640px`): `bottom:18px; right:18px; 56×56`.
- **FloatBook** (`max-width: 900px`): 50px tall pill, `bottom:18px; left:16px`, font ~11.5px.
- **BackToTop** (`max-width: 900px`): 44×44, `bottom:88px; right:16px` (stacked above WhatsApp).
- *Weak point:* three floating elements on a small screen can crowd the corners and overlap
  content / the booking CTA — the floating-UI strategy should be reconsidered for mobile
  (e.g. a single sticky bottom action bar).

### Cross-cutting mobile weaknesses (the "why it's terrible" summary)
1. **No mobile-first system.** It's desktop-down with ad-hoc breakpoints (900/980/760/720/
   640/600) and each section reinvents its own spacing — vertical rhythm is inconsistent.
2. **Layout = "collapse to one column."** Few sections have a genuinely re-thought small-
   screen layout (Hero and the Testimonials carousel are the exceptions).
3. **Touch & thumb ergonomics not designed.** Tap targets are inconsistent; primary actions
   aren't placed for thumb reach; the form is a shrunk desktop form.
4. **Floating UI crowds the corners** (WhatsApp + Book + BackToTop all at once).
5. **Decorative "peek" images** are desktop devices that fight small screens and get
   manually nudged.
6. **Known device issue:** iOS native date input clipping (Booking).

---

## 7. Known placeholders / TODO baggage (not mobile-specific but relevant)
- **WhatsApp number** is a placeholder `972500000000` in `FloatWhatsApp.jsx`.
- Dessert ("קינוחים") upgrade photo is a placeholder (`/uploads/gallery/gallery-1.jpg`).
- There are local uncommitted edits in repo history; don't assume git is clean.
- `memento.sh save|list|undo` snapshots `src/` and `public/` locally (a homemade undo).

---

## 8. The mission for Gemini (the actual task)

1. **Treat the desktop output as the source of truth for content, features, and brand** —
   but **not** for mobile layout. Don't change what desktop renders.
2. **Design a real mobile-first UX** for this RTL Hebrew long-scroll landing page:
   - A coherent mobile **navigation** strategy (the dropdown is OK but could be a fuller,
     sheet-style menu; consider an always-reachable contact/book action).
   - A consistent **spacing/rhythm system** for mobile (shared section padding, type scale,
     touch target minimums ≥44px) instead of per-section ad-hoc clamps.
   - Re-thought **layouts** per section (not just "one column"): where a carousel, an
     accordion, a sticky CTA, or a simplified gallery serves the phone better.
   - A proper mobile **Booking form** flow (logical field order, large inputs, iOS-safe
     date input, thumb-friendly submit) — this is the conversion goal.
   - A sane **floating-UI** plan for phones (don't crowd three FABs; consider one sticky
     bottom bar).
3. **Stay exactly on-brand:** the palette tokens, the fonts, the one-row-title + italic-
   accent + copper-hairline signature, quiet-luxury restraint, real photography, RTL logical
   properties, the central reveal orchestrator, `<PremiumImage>`, and `prefers-reduced-
   motion`. **No Tailwind, no new color hexes, no orange text, no grey card boxes, no
   gradient melt fades, no oversized decorations, no images cut awkwardly at edges.**
4. **Honor the constraints:** React 18 + Vite + CSS Modules only; logical (RTL) properties;
   keep desktop pixel-identical; `npm run build` must pass; verify on a real phone viewport
   (the client iterates from phone screenshots).
5. **If a request conflicts with a brand rule, say so** and propose the on-brand
   alternative — protecting the brand is the job.

> Suggested first step: agree on a shared mobile foundation (breakpoint(s), spacing scale,
> type scale, touch-target rules, floating-UI strategy) before touching individual sections,
> so the rebuild is a system and not another pile of one-off overrides.

---

## Appendix A — Every current mobile CSS block, verbatim

These are the **actual, literal `@media (max-width: …)` blocks** that make up the entire
current mobile version, copied verbatim from each component's `.module.css`. (Hover-only and
`prefers-reduced-motion` blocks are omitted — they aren't mobile-layout code.) The class
names are CSS-Module local names (they get hashed at build time). This is the complete set
of mobile overrides that exist today — there is nothing else.

### `src/pages/he/HebrewPage.module.css`
```css
@media (max-width: 900px){
  .page{
    background-image: none;
    background-attachment: scroll;
  }
}
```

### `src/pages/he/components/Nav/Nav.module.css`
```css
@media (max-width: 900px){
  .navInner{height:64px}
  .navLinks{display:none}
  .right{display:none}
  .brand{font-size:38px}
  .burger{display:flex}
  .mobileMenu{
    display:flex;
    visibility:hidden;opacity:0;
    transform: translateY(-10px);
    pointer-events:none;
    transition: opacity .28s ease, transform .28s cubic-bezier(.2,.7,.2,1), visibility 0s linear .28s;
  }
  .open .mobileMenu{
    visibility:visible;opacity:1;
    transform: translateY(0);
    pointer-events:auto;
    transition: opacity .28s ease, transform .28s cubic-bezier(.2,.7,.2,1), visibility 0s;
  }
}
```

### `src/pages/he/components/Hero/Hero.module.css`
```css
@media (max-width: 900px){
  /* Mobile redesign: dark surface (matches testimonials), image-as-card on top,
     headline + stacked CTAs below. PC animations (Ken Burns, word reveal, lede
     fade) are preserved by NOT overriding them here. */
  .hero{
    min-height:0;
    display:block;
    /* background-color + noise/grid textures inherited from base .hero rule (matches testimonials). */
    padding: 20px 20px 48px;
    overflow:visible;
  }
  .hero::before,.hero::after{display:none}
  .wrap{
    width:100%;
    padding-left:0; padding-right:0;
  }
  .content{
    position:relative;
    text-align:center;
    max-width:none;
    margin:0;
    display:flex;
    flex-direction:column;
    gap:20px;
  }

  /* Image becomes a contained card at the top instead of a full-bleed background.
     Ken Burns animation from .photoLayer base rule keeps running. */
  .photoFrame{
    position:relative;
    inset:auto;
    order:1;
    width:100%;
    aspect-ratio: 4 / 5;
    border-radius:22px;
    overflow:hidden;
    box-shadow:
      0 0 0 1px rgba(255,255,255,.08),
      0 24px 60px rgba(0,0,0,.55);
  }
  .photoLayer{
    background-position: center 22%;
    background-size: cover;
    /* Looping Ken Burns so the photo stays alive past the initial 16s play. */
    animation: heroKenBurns 14s ease-in-out infinite alternate;
  }
  /* No heavy gradient overlay needed since text now sits BELOW the photo. */
  .photoLayer::after{ display:none; }

  .eyebrow{
    order:2;
    position:static; transform:none;
    justify-content:center;
    margin:8px 0 0;
  }

  .headline{
    order:3;
    position:static; right:auto; bottom:auto;
    text-align:center;
    max-width:none;
    margin:0;
    font-size:clamp(30px, 8.5vw, 44px);
    line-height:1.1;
    letter-spacing:-.02em;
  }

  .lede{
    order:4;
    position:static; right:auto; bottom:auto;
    text-align:center;
    max-width:none;
    margin:0 auto;
    padding:0 4px;
    font-size:16px;
    line-height:1.65;
  }

  .ctas{
    order:5;
    position:static;
    margin:8px 0 0;
    flex-direction:column;
    align-items:stretch;
    justify-content:center;
    gap:12px;
    width:100%;
  }

  /* Primary: match desktop — white bg, dark text, circular --clay arrow badge. */
  .btnPrimary{
    padding:18px 24px;
    font-size:13px;
    justify-content:center;
  }

  /* Secondary: outline / ghost with light border + light text on dark. */
  .btnText{
    background:transparent;
    color:var(--paper);
    border:1.5px solid rgba(255,255,255,.55);
    border-radius:10px;
    padding:16px 24px;
    font-size:14px;
    letter-spacing:.08em;
    justify-content:center;
  }
  .btnText:hover{
    background:rgba(255,255,255,.06);
    border-color:#ffffff;
    box-shadow:none;
  }
}
```

### `src/pages/he/components/About/About.module.css`
```css
@media (max-width: 900px){
  .head, .grid{grid-template-columns:1fr}
  .title{white-space:normal}
  /* No sticky on a single-column phone layout — let the portrait flow. */
  .portrait{ position:static; top:auto; margin-top:0 }
}
```

### `src/pages/he/components/Process/Process.module.css`
```css
@media (max-width: 900px){
  .head{grid-template-columns:1fr}
  .title{white-space:normal}
  .grid{grid-template-columns:1fr 1fr}
  /* The single threaded rail only reaches the first row, so on the 2×2 mobile
     grid the bottom row (III, IV) had no line. Replace it with a per-step
     hairline through each icon so every row reads the same. */
  .grid::before{ display:none; }
  .step::before{
    content:"";
    position:absolute;
    /* icon vertical centre: step padding-top (72px) + half the 58px icon */
    top: calc(72px + 29px);
    left:0; right:0;
    height:1px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(123, 96, 68,.45) 26%,
      rgba(123, 96, 68,.45) 50%,
      rgba(79, 62, 43,.45) 74%,
      transparent 100%);
    pointer-events:none;
  }
}
```

### `src/pages/he/components/PureFlavors/PureFlavors.module.css`
```css
@media (max-width: 900px){
  .section{
    padding-top: clamp(64px, 16vw, 92px);
    padding-bottom: clamp(74px, 17vw, 104px);
  }
  .head{
    grid-template-columns: 1fr;
    margin-bottom: clamp(40px, 10vw, 56px);
  }
  .title{ white-space: normal; }
  .lede{
    max-width: none;
    justify-self: stretch;
  }
  .body{
    grid-template-columns: 1fr;
    gap: clamp(30px, 8vw, 44px);
  }
  .media{
    aspect-ratio: 3 / 4;
    max-height: 70vh;
  }
}
```

### `src/pages/he/components/MenuBridge/MenuBridge.module.css`
```css
@media (max-width: 760px){
  .spine{
    left: auto;
    right: clamp(18px, 5vw, 28px);
    transform: none;
  }

  .stepOne,
  .stepTwo{
    align-self: stretch;
    margin-inline: 0;
    max-width: none;
    padding-inline-end: clamp(36px, 12vw, 52px);
  }

  .stepTwo{
    grid-template-columns: auto 1fr;
  }
  .stepTwo .numeral{ order: unset }
  .stepTwo .copy{ order: unset }

  .numeral{
    font-size: clamp(56px, 16vw, 80px);
  }
}
```

### `src/pages/he/components/Tracks/Tracks.module.css`
```css
@media (max-width: 1100px){
  .peekLeft{
    width: clamp(340px, 46vw, 480px);
    top: auto;
    bottom: -120px;
    left: -10%;
    transform: translate(0, 0);
  }
  .peekRight{
    width: clamp(300px, 38vw, 420px);
    bottom: auto;
    top: -100px;
    right: -8%;
    transform: translate(0, 0);
    opacity: .85;
  }
}

@media (max-width: 720px){
  .peekLeft{
    width: 300px;
    top: -90px;
    bottom: auto;
    left: -26%;
    opacity: .8;
  }
  /* Keep the fish dish actually on screen at the bottom of the section
     instead of pushed off the top edge. */
  .peekRight{
    width: 280px;
    top: auto;
    bottom: -70px;
    right: -22%;
    opacity: .8;
  }
}

@media (max-width: 1280px){
  .grid{ grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px }
  .track:hover{ transform: translateY(-8px) }
}

@media (max-width: 900px){
  .head{ grid-template-columns: 1fr }
  .grid{
    display: grid;
    grid-template-columns: 1fr;
    width: auto;
    margin-inline: 0;
    margin-top: clamp(36px, 9vw, 56px);
    gap: 18px;
    padding-inline: var(--pad-x);
  }
  .track,
  .track:nth-child(n){
    transform: translateY(0);
    padding: 30px 26px 28px;
    min-height: 0;
  }
  .track:hover,
  .track:nth-child(n):hover{ transform: translateY(-6px) }
  /* Keep every card's footer identical: the min-diners pill and the price
     always stack the same way, instead of wrapping differently per card. */
  .tMeta{
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
    gap: 14px;
  }
  .tMin{ order: 1 }
  .tPriceWrap{ order: 2 }
}
```

### `src/pages/he/components/Upgrades/Upgrades.module.css`
```css
@media (max-width: 1024px){
  .media{ aspect-ratio: 16 / 9 }
}

@media (max-width: 720px){
  .head{ margin-inline-start: 0 }
  .title{ white-space: normal; }
  .grid{
    grid-template-columns: 1fr;
    gap: clamp(20px, 6vw, 28px);
    margin-top: clamp(36px, 9vw, 56px);
  }
  .media{ aspect-ratio: 4 / 3 }
  .card:hover{ transform: translateY(-5px) }
  .desc{ flex: 0 1 auto }
}
```

### `src/pages/he/components/TableArt/TableArt.module.css`
```css
@media (max-width: 900px){
  .section{
    padding-top: clamp(64px, 16vw, 92px);
    padding-bottom: clamp(74px, 17vw, 104px);
  }
  .head{
    grid-template-columns: 1fr;
  }
  .title{ white-space: normal;
    margin-bottom: clamp(52px, 13vw, 74px);
  }
  .lede{
    max-width: none;
    justify-self: stretch;
  }
  .flow{
    grid-template-columns: 1fr;
    gap: clamp(44px, 12vw, 64px);
  }
  .step{
    gap: clamp(18px, 5vw, 26px);
  }
  .step:nth-child(2){
    margin-top: 0;
  }
  .stepMedia{
    aspect-ratio: 4 / 3;
    border-radius: 14px;
  }
  .stepCopy{
    max-width: none;
  }
  .stepKicker{
    margin-bottom: 12px;
  }
  .galleryWrap{
    margin-top: clamp(34px, 10vw, 52px);
  }
  .finalStatement{
    width: 100%;
    margin-top: clamp(90px, 24vw, 122px);
  }
  .finalStatement p{
    font-size: clamp(38px, 12vw, 62px);
  }
  .galleryHead{
    display: grid;
    gap: 12px;
    justify-items: end;
  }
  .masonry{
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 8px;
  }
  .galleryHero{
    grid-column: 1 / span 2;
    grid-row: auto;
    aspect-ratio: 4 / 3;
  }
  .a, .b, .c, .d, .e{
    display: block;
    grid-column: auto;
    grid-row: auto;
    aspect-ratio: 1;
  }
  .e{
    grid-column: 1 / span 2;
    aspect-ratio: 16 / 9;
  }
}
```

### `src/pages/he/components/Testimonials/Testimonials.module.css`
```css
@media (max-width: 1100px){
  .grid{column-count:2}
}
@media (max-width: 900px){
  .head{grid-template-columns:1fr}
}
@media (max-width: 640px){
  .grid{
    column-count: unset;
    display: flex;
    align-items: flex-start;
    gap: 14px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    margin-inline: calc(var(--pad-x) * -1);
    padding-inline: var(--pad-x);
    padding-bottom: 14px;
  }
  .grid::-webkit-scrollbar{ display: none }
  .chat{
    flex: 0 0 85%;
    margin: 0;
    scroll-snap-align: center;
  }
}
```

### `src/pages/he/components/ServiceIncludes/ServiceIncludes.module.css`
```css
@media (max-width: 900px){
  .section{
    padding-top: clamp(64px, 16vw, 92px);
    padding-bottom: clamp(74px, 17vw, 104px);
  }
  .head{
    grid-template-columns: 1fr;
    margin-bottom: clamp(44px, 11vw, 64px);
  }
  .lede{
    max-width: none;
    justify-self: stretch;
  }
  .cols{
    grid-template-columns: 1fr;
    gap: clamp(38px, 10vw, 56px);
  }
  .spine{ display: none; }
  .note{
    width: 100%;
  }
  /* Plate hugs the bottom-left edge, only a soft crescent showing. */
  .peek{
    width: min(60vw, 290px);
    bottom: clamp(8px, 4vw, 36px);
    transform: translate(-30%, 22%);
    opacity: .5;
  }
}
```

### `src/pages/he/components/Kitchen/Kitchen.module.css`
```css
@media (max-width: 900px){
  .head{ grid-template-columns:1fr; gap:24px }
}
```

### `src/pages/he/components/Booking/Booking.module.css`
```css
@media (max-width: 980px){
  .bento{ grid-template-columns: 1fr; }
}

@media (max-width: 600px){
  .head{
    grid-template-columns: 1fr;
    align-items: start;
    gap: 18px;
  }
  .lede{ max-width: none; justify-self: stretch; }
  .row2{ grid-template-columns: 1fr; }
  .seg{ padding: 9px 10px; font-size: 13px; }
}
```

### `src/pages/he/components/Footer/Footer.module.css`
```css
@media (max-width: 900px){
  .grid{grid-template-columns:1fr}
}
```

### `src/pages/he/components/Reels/Reels.module.css` (component exists but is NOT mounted)
```css
@media (max-width: 640px){
  .head{ flex-wrap:wrap; gap:12px }
  /* Phones swipe natively — drop the mouse affordances. */
  .nav{ display:none }
  .grid{ gap:12px; scroll-snap-type: x mandatory; cursor:auto }
  .card{
    flex: 0 0 64%;
    scroll-snap-align: center;
  }
}
```

### Floating UI — `FloatWhatsApp`, `FloatBook`, `BackToTop`
```css
/* FloatWhatsApp/FloatWhatsApp.module.css */
@media (max-width:640px){
  .fab{bottom:18px;right:18px;height:56px}
  .icon{width:56px;height:56px}
}

/* FloatBook/FloatBook.module.css */
@media (max-width: 900px){
  .book{
    height: 50px;
    padding: 0 18px;
    font-size: 11.5px;
    gap: 8px;
    bottom: 18px;
    left: 16px;
  }
}

/* BackToTop/BackToTop.module.css */
@media (max-width: 900px){
  .top{
    width: 44px;
    height: 44px;
    bottom: 88px;
    right: 16px;
  }
}
```

That is the **entire** mobile codebase as it stands today.
