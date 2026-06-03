# Handoff — Nuovo chef site (continue coding)

## Project
Hebrew **RTL** marketing site for private chef "Nuovo / שולחן השף". **React 18 + Vite 5**, no backend.
- Run: `cd ~/Downloads/Testing-Product && npm run dev` → http://localhost:5173
- Repo: `github.com/nadaviloz/Nuovo`, branch `main`. Vercel auto-deploys on push.
- Components: `src/pages/he/components/<Name>/<Name>.jsx` + `<Name>.module.css`
- Main page + scroll/reveal/parallax logic: `src/pages/he/HebrewPage.jsx`
- Design tokens: `src/pages/he/HebrewPage.module.css`, `src/styles/globals.css`

## Git state (READ THIS FIRST)
- Last **pushed** commit: `b22f76c` "Clean up repo and tighten code comments".
- Everything since then is **LOCAL, UNCOMMITTED** (the title / image edits below).
- `node_modules/`, `dist/`, `.backups/` are now gitignored AND untracked — leave them out of git.
- **Don't commit or push unless the user explicitly says so.** Always `npm run build` to verify.

## Done this session
1. **Repo cleanup** (committed + pushed in `b22f76c`): untracked node_modules/dist/.backups;
   deleted dead files/folders (root `uploads/`, `assets/`, `skills/`, `undo.sh`, unused images in
   `public/assets`). Trimmed AI-style comments across components; fixed stale "Faq" references.
2. **Headlines → one row + editorial "title signature"** (LOCAL, uncommitted). Applied to
   **About**, **PureFlavors**, **TableArt**: removed forced `<br>`; head grid → `auto 1fr` so the
   title takes only the width it needs; `white-space:nowrap` (reverts to `normal` under 900px);
   bigger fonts; the `<em>` second part is the italic **accent** font in **brown** (`color:inherit`,
   NOT copper); a classic copper hairline `::after` rule sits under each title.
   - **Process** title also one-row but **shrunk** (`clamp(30px,3.6vw,54px)`) since it's long.
3. **MenuBridge 01/02**: pulled the two steps closer to the center spine, smaller vertical gap,
   fixed the "· All Fish" line wrap (hint `max-width:52ch`). Added a reveal animation — numerals
   **wipe up** (clip-path + scale) a beat after each row, and the spine **draws downward**. Numerals
   slightly bigger. Respects `prefers-reduced-motion`.
4. **Upgrades**: title bigger + more formal (uppercase serif, `NUOVO` regular + `UPGRADES` bold in
   warm/brown). Header block moved flush right (`.head{margin-inline-start:0; margin-inline-end:auto}`).
5. **Process decorative plate**: added a new rose-sashimi cutout, user didn't like it → **fully
   removed** (img + `.peek` CSS + the asset). Process is now just title + 4 steps.
6. **PureFlavors photo** swapped to the chef-plating shot → `public/assets/pureflavors-chef.jpg`
   (was `/uploads/gallery/gallery-2.jpg`).

## Customer preferences (important)
- HATES: grey card boxes, gradient melt fades between sections, cursor gimmicks, plain "Word-doc"
  looking titles, images awkwardly cut at edges, oversized decorative elements.
- LIKES: editorial typography, big **one-row** section titles with an **italic accent** second word
  + a thin **copper hairline** under them, accent **text in brown** (copper only for the line),
  quiet luxury, generous whitespace, RTL, real photos, subtle/faded background elements.
- Iterates visually from **PC and phone screenshots**. Mobile is handled separately — desktop titles
  use `nowrap`, mobile wraps normally on purpose.

## Photo library (NOT in the repo)
`~/Desktop/ohadproject/` → `EventPhotos/`, `FoodPhotos/`, `Videos/`, `WebsiteAssets/`,
`PhotosFromINST/SavedFromInstagram/`, `Reviews/`, `כלים/`. New downloads land in `~/Downloads`
(usually `SaveClip.App_*`), then get sorted into ohadproject on request.

## Open / next
1. Decide whether to **commit + push** the current local title/image changes.
2. **Dessert (קינוחים) upgrade** photo is still a placeholder (`/uploads/gallery/gallery-1.jpg`).
3. **WhatsApp number** is still a placeholder in `FloatWhatsApp.jsx` (`972500000000`).
4. Sanity-check the one-row titles + the new PureFlavors photo on a phone.

## Memento checkpoints
`./memento.sh save|list|undo` snapshots `src/` and `public/` locally.
