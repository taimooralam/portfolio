# taimooralam.com

The personal site of Taimoor Alam, Founder & Fractional CTO. One page, for business owners.

Built with **Vite 5, React 18, Tailwind CSS 3 and Framer Motion 11**, deployed on **Vercel**.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build into dist/
npm run preview  # serve dist/ locally
```

Node 18 or newer.

## Where things live

```
index.html              the head: title, description, Open Graph, JSON-LD, icons
src/App.jsx             the page, top to bottom
src/site/content.js     every word on the page (his, verbatim; see the comments)
src/site/PinnedHeader.jsx  the photo that shrinks into the pinned top bar
src/site/parts.jsx      the moving line, the fade-in, and Gap (a visible placeholder
                        for words not yet written; none may remain at go-live)
src/index.css           Inter (hosted here) with a size-matched fallback, base styles
public/logos/           company logos as SVG, light and dark (logos.json lists each source)
public/brand/           his mark, عالم in square Kufic: alam*.svg (nine tiles per square,
                        for large sizes) and alam-small*.svg (one tile, for small sizes)
public/fonts/           Inter, SIL Open Font License
scripts/alam_mark.py    regenerates the mark at any tile size
```

## Deploys

Every push to a branch gets a Vercel preview link. A push or merge to `master` deploys
the live site, taimooralam.com, so merge only when the site is meant to change.

## Licence

Code: MIT. Inter: SIL Open Font License (`public/fonts/inter-LICENSE.txt`). Company logos
belong to their owners and are shown only to name where he has worked.
