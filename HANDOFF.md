# Handoff — Nuovo chef site, Kitchen video gallery

## Project
Hebrew RTL marketing site for private chef "Nuovo/שולחן". React + Vite, no backend.
Run: `npm run dev` → http://localhost:5174 (or 5173). Nothing is committed or deployed —
the **Vercel site (nuovo-phi.vercel.app) is STALE**; I've been viewing old builds, which
caused repeated "already-fixed" confusion. **Hard-refresh (⌘⇧R)** to see current local state.

## Done this session (all local, uncommitted)
1. **Mobile section reveal fix** — `HebrewPage.jsx` IntersectionObserver was `threshold:0.2`,
   which hid sections taller than the viewport on phones. Now `threshold:0, rootMargin '0px 0px -12% 0px'`.
2. **TableArt connector arrows** (`TableArt.module.css` mobile) — now alternate left/right with a
   gentle 6° lean, sized to sit in the gap.
3. **Tracks peek photos** (`Tracks.module.css`) — the tomato/fish photos had a white glow halo
   (bright plates fading over the muted page). Fixed with `filter: brightness(.82) contrast(1.05)
   saturate(1.06) sepia(.1)` + tighter radial mask. Blend modes don't work here (`isolation:isolate`).
4. **Kitchen video gallery** — main work, see below.

## Kitchen gallery (`src/pages/he/components/Reels/Reels.jsx`)
- Two-tab toggle (פיצה / מנות שף), single horizontal scrolling reel row at all widths.
- **7 pizza** reels (`reel-pizza-1..7`) + **10 chef** reels (`reel-chef-1..10`), each `.mp4` + `.jpg`
  poster in `public/uploads/`. Videos compressed 540×960, crf30, no audio.
- Source raw videos: `~/Desktop/ohadproject/Videos/` (cryptic SaveClip names; classify with ffmpeg frames).

### IMPORTANT: cache-buster
`const V = '?v=13'` in Reels.jsx is appended to every poster/video URL. Re-sorting reuses
filenames, so browsers serve stale images. **Bump V (→14, 15…) every time you change a reel's file.**

### How to apply a custom thumbnail (the workflow that works)
User sends: a thumbnail image path + a screenshot of the video (the dish). To match:
extract frames with `ffmpeg -ss <t> -i reel.mp4 -frames:v 1 out.png` and compare. Then:
```
ffmpeg -y -i "<SRC>" -vf "scale=540:960:force_original_aspect_ratio=increase,crop=540:960" \
  -q:v 3 public/uploads/reel-<cat>-<n>.jpg
```
Then bump `const V` in Reels.jsx. Verify with Playwright (see below).

### Thumbnail status
DONE (custom): pizza-1 פסטו וזיתים, pizza-2 פסטו ורוקט, pizza-3 צ׳דר, pizza-6 פיצה ירוקה,
pizza-7 מרגריטה · chef-1 tuna, chef-2 freekeh salad, chef-3 baked pasta, chef-5 salmon,
chef-6 ravioli, chef-7 beetroot, chef-10 plated cubes.

STILL ON FIRST-FRAME POSTERS (need custom): **pizza-4** (פסטו ומוצרלה), **pizza-5** (עגבניות שרי),
**chef-4** (רוטב ירוק), **chef-8** (פסטה טרייה / pasta-making), **chef-9** (חציל וסלסה / eggplant-on-green).

### Two UNPLACED thumbnails in ~/Downloads (user must say which video):
- `עיצוב ללא שם(11).png` — red/radicchio + parmesan pizza. Looks like pizza-1's FINAL frame
  (pizza-1 video = pesto+mozz → +tomatoes/olives [= (9).png, applied] → +red topping [= (11).png]).
  Open question: replace pizza-1's (9).png with (11).png, or it's a different reel.
- `SaveClip.App_644964899_...n.jpg` — a folded/closed CALZONE. Matches no current video; user said
  "replace this thumbnail with that" without naming the target. Needs the video screenshot.

## Verifying (Playwright is available but not in node_modules)
```
PWDIR=/Users/nadav/.npm/_npx/e41f203b7505f1fb/node_modules
ln -sf "$PWDIR/playwright" node_modules/playwright; ln -sf "$PWDIR/playwright-core" node_modules/playwright-core
# run a .mjs from the project dir; scroll #kitchen, click [role=tab], screenshot [class*="_card_"]
# remove the symlinks after
```

## Next steps
1. Place pizza-4, pizza-5, chef-4, chef-8, chef-9 thumbnails as the user sends them.
2. Resolve (11).png and the calzone.
3. **Commit everything and deploy to Vercel** so the user stops reviewing stale builds.
