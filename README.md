# Involve Asia — Corporate Website Revamp (Concept 5)

Static preview build for internal review.

- **Homepage** — `index.html` → `ia-bundle.jsx`
- **Publisher Overview** — `for-publishers.html` → `publishers.jsx`
- **Shared UI** (Nav, Footer, Back-to-Top, smooth scroll, reveal) — `ia-shared.jsx`
- **Shared page sections** (platform tab slider, final CTA, testimonials, FAQ, logo
  marquee, "how it works" steps, icon columns, hero hexagons, app-download QR) —
  `ia-sections.jsx`, loaded after `ia-shared.jsx`; pages pass their copy and items as props

GSAP and Lenis load from a CDN (needs internet). All images/videos are bundled in
`media/`. While editing, the `.jsx` files still compile in the browser
(Babel-standalone), so any page opens straight from a local server with no build.

## SEO
`build-seo.py` writes each page's canonical URL, favicon, share tags (Open Graph /
Twitter), JSON-LD and — for the `-v2` and test pages — `noindex`, plus `sitemap.xml`
and `robots.txt`. It reads the page's own `<title>` and meta description, so to change
those, edit them in the page and rerun `python3 build-seo.py`.

The share image is expected at `media/brand/og-default.png` (1200×630).

## Production build
`npm run build` (needs Node 22+) runs `build-seo.py`, then `scripts/build.mjs`, which
writes a publishable copy to `dist/`: page scripts compiled ahead of time, React's
production builds instead of Babel, and every page pre-rendered to real HTML so
search engines and link previews see the content. `npm run preview` serves `dist/`
on http://localhost:8800.

## Deploy on GitHub Pages
Every push to `main` runs `.github/workflows/deploy-pages.yml`, which builds and
publishes `dist/`.
1. One-time: repo **Settings → Pages → Build and deployment → Source: "GitHub Actions"**.
2. Push to `main`; the site is live ~2–3 minutes later at `https://<username>.github.io/<repo>/`.
