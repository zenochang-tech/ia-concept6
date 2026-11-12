/* ============================================================================
   ia-shared.jsx — SHARED UI for all pages (single source).
   Loaded as the FIRST babel script on every page, BEFORE the page's own bundle.
   Exposes: Nav, Footer, Arrow, HexCursor, BackToTop, prefersReduced,
            useSmoothScroll(), useScrollReveal().
   NOTE: the homepage (ia-bundle.jsx) still carries its own copies for now;
   migrating it to load this file is a planned follow-up.
   ============================================================================ */

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Fetch a text asset, retrying a dropped connection or non-OK response (decorative SVGs
// like the hero honeycomb are fetched at runtime, and one failed request left them blank).
const fetchText = (url, tries = 3) => fetch(url).then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); })
  .catch((e) => { if (tries <= 1) throw e; return new Promise((res) => setTimeout(res, 400)).then(() => fetchText(url, tries - 1)); });

// Hero honeycomb backdrop used by About, Glossary, Pricing, Get Started and Terms. Two artworks:
//   'rings'  — media/figma/hero-hex-rings.svg (the homepage hero rings, 1200×1200), mirrored
//              horizontally; trial, Nov 2026
//   'figma'  — media/figma/pub-cta-hexfield.svg (the #FAC9B9 hexes) — the previous design
// To revert, set HERO_DECO_ART = 'figma'. To compare in the browser, add ?herodeco=figma or
// ?herodeco=rings to the URL. Returns the hex paths, the art size and the <g> transform.
const HERO_DECO_ARTS = {
  rings: { src: 'media/figma/hero-hex-rings.svg', W: 1200, H: 1200, flipX: true,
    parse: (txt) => Array.from(txt.matchAll(/<path\b[^>]*\bd="([^"]+)"/g), (m) => m[1]) },
  figma: { src: 'media/figma/pub-cta-hexfield.svg', W: 1204.11, H: 1189.86, flipX: false,
    parse: (txt) => {
      const out = []; const re = /<path\b([^>]*)>/g; let m;
      while ((m = re.exec(txt))) {
        const attrs = m[1], dm = /\bd="([^"]+)"/.exec(attrs), fm = /\bfill="([^"]+)"/.exec(attrs);
        if (dm && fm && fm[1].toUpperCase() === '#FAC9B9') out.push(dm[1]);
      }
      return out;
    } },
};
const HERO_DECO_ART = 'rings';
function useHeroDecoArt() {
  const [art] = React.useState(() => {
    const q = typeof location !== 'undefined' ? new URLSearchParams(location.search).get('herodeco') : null;
    return HERO_DECO_ARTS[q] || HERO_DECO_ARTS[HERO_DECO_ART];
  });
  const [paths, setPaths] = React.useState([]);
  React.useEffect(() => {
    let alive = true;
    fetchText(art.src).then((txt) => { if (alive) setPaths(art.parse(txt)); }).catch(() => {});
    return () => { alive = false; };
  }, []);
  return { paths, W: art.W, H: art.H, transform: art.flipX ? `translate(${art.W} 0) scale(-1 1)` : undefined };
}

// Hover push for the hero honeycombs above (same feel as the homepage hero and final CTA fields):
// hexes within R of the cursor are pushed radially away (MAXPUSH·f², f = 1 − dist/R) and ease
// back when it leaves. R and the push are set in on-screen px and converted to the art's own
// units through the <g>'s screen matrix, so the viewBox padding, "slice" cropping and the
// horizontal flip are all accounted for. The fields are pointer-events:none behind the copy,
// so the cursor is tracked on the document and counts only while it's over the field.
function useHexPush(svgRef, paths) {
  React.useLayoutEffect(() => {
    const svg = svgRef.current, g = svg && svg.querySelector('g');
    if (!g || !paths.length || prefersReduced()) return;
    const hexes = Array.from(g.querySelectorAll('.hx')).map((el) => {
      const b = el.getBBox();
      return { el, cx: b.x + b.width / 2, cy: b.y + b.height / 2, dx: 0, dy: 0 };
    });
    const R_PX = 200, PUSH_PX = 36;
    let R = 0, MAXPUSH = 0, mx = 0, my = 0, active = false, raf = 0;
    const frame = () => {
      let moving = false;
      for (const h of hexes) {
        let tx = 0, ty = 0;
        if (active) {
          const ddx = h.cx - mx, ddy = h.cy - my, dist = Math.hypot(ddx, ddy);
          if (dist < R && dist > 0.01) { const f = 1 - dist / R, push = MAXPUSH * f * f, inv = push / dist; tx = ddx * inv; ty = ddy * inv; }
        }
        h.dx += (tx - h.dx) * 0.2; h.dy += (ty - h.dy) * 0.2;
        if (Math.abs(h.dx) > 0.06 || Math.abs(h.dy) > 0.06) { h.el.setAttribute('transform', `translate(${h.dx.toFixed(2)} ${h.dy.toFixed(2)})`); moving = true; }
        else if (h.dx !== 0 || h.dy !== 0) { h.dx = 0; h.dy = 0; h.el.removeAttribute('transform'); }
      }
      if (active || moving) raf = requestAnimationFrame(frame); else raf = 0;
    };
    const onMove = (e) => {
      const r = svg.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (inside) {
        const m = g.getScreenCTM();
        if (!m) return;
        const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
        const k = 1 / Math.hypot(m.a, m.b);                     // art units per screen px
        mx = pt.x; my = pt.y; R = R_PX * k; MAXPUSH = PUSH_PX * k;
      }
      if (inside !== active || inside) { active = inside; if (!raf) raf = requestAnimationFrame(frame); }
    };
    const onLeave = () => { active = false; if (!raf) raf = requestAnimationFrame(frame); };
    document.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => { document.removeEventListener('mousemove', onMove); document.documentElement.removeEventListener('mouseleave', onLeave); if (raf) cancelAnimationFrame(raf); };
  }, [paths]);
}

// Nav mega-menu — clean Stripe-style columns: each column has a non-clickable title (head)
// with a thin #E8E8E2 divider under it, then its links. Column titles are suggestions —
// rename freely. No feature image card.
const NAV = [
  { label: 'For Publishers', href: 'for-publishers', tone: 'pub',
    feat: { head: '500+ brands, ready to promote', desc: 'Find the ones your audience already loves, and start earning.', cta: 'Browse Brands', href: 'https://app.involve.asia/directory', img: 'media/webp/sub-card-publisher.webp', scrim: 'linear-gradient(26.17deg, rgba(196, 62, 24, 0.32) 19.76%, rgba(196, 62, 24, 0.1024) 55.25%)' },
    columns: [
      { head: 'Explore', links: [
        ['Publisher Overview', 'for-publishers'],
        ['Brand Directory', 'https://app.involve.asia/directory'],
        ['Success Stories', 'https://involve.asia/blog/category/partners/success-stories-partners/'],
      ]},
      { head: "Who It's For", links: [
        ['Creator Partners', 'content-creators'],
        ['Affiliate Partners', 'affiliates'],
        ['Technology Partners', 'technology-partners'],
      ]},
      { head: 'Features', links: [
        ['Express Withdrawal', 'express-withdrawal'],
        ['Developer API', 'api-overview'],
        ['Data Feed', 'datafeed'],
      ]},
    ]},
  { label: 'For Advertisers', href: 'for-advertisers', tone: 'adv',
    feat: { head: 'Simple, scalable pricing', desc: 'Volume-based plans that grow with your program.', cta: 'See Pricing', href: 'pricing', img: 'media/webp/sub-card-advertiser.webp', scrim: 'linear-gradient(26.17deg, rgba(61, 90, 128, 0.32) 19.76%, rgba(61, 90, 128, 0.1024) 55.25%)' },
    columns: [
      { head: 'Explore', links: [
        ['Advertiser Overview', 'for-advertisers'],
        ['Pricing', 'pricing'],
        ['Case Study', 'https://involve.asia/blog/category/advertisers/success-stories/'],
      ]},
      { head: 'Features', links: [
        ['Automation', 'automation'],
        ['Partner Discovery', 'partner-discovery'],
        ['How We Track', 'how-we-track'],
      ]},
    ]},
  { label: 'Resources', href: 'blog',
    feat: { head: 'The Involve blog', desc: 'Guides, trends, and affiliate marketing insights.', cta: 'Read the Blog', href: 'blog', img: 'media/webp/sub-card-resources.webp', scrim: 'linear-gradient(26.17deg, rgba(3, 3, 3, 0.32) 19.76%, rgba(2, 2, 2, 0.1024) 55.25%)' },
    columns: [
      { head: 'Learn', links: [
        ['Blog', 'blog'],
        ['Glossary', 'glossary'],
      ]},
      { head: 'Support', links: [
        ['Help Centre', 'https://helpcentre.involve.asia/'],
        ['Download App', 'download-app'],
        ['API Docs', 'https://api.involve.asia/docs/'],
      ]},
    ]},
  { label: 'Company', href: 'about',
    feat: { head: 'About Involve Asia', desc: '12 years connecting brands and partners across Asia.', cta: 'Our Story', href: 'about', img: 'media/webp/sub-card-company.webp', scrim: 'linear-gradient(26.17deg, rgba(3, 3, 3, 0.32) 19.76%, rgba(2, 2, 2, 0.1024) 55.25%)' },
    columns: [
      { head: 'Company', links: [
        ['About Us', 'about'],
        ['Careers', 'https://careers.involve.asia/'],
      ]},
    ]},
];

/* ---------- Translation ----------------------------------------------------
   content/i18n.json lists the languages and which pages are translated; a translated
   page keeps its copy in content/pages/<page>/<lang>.json (en.json is the base, other
   languages override it key by key). build-i18n.py writes each language copy of the
   page to its own folder (id/referral-program.html, with <base href="../"> and
   window.IA_LANG). The production build inlines window.IA_I18N / window.IA_COPY, so
   the JSON is only fetched here on the unbuilt local preview. */
function loadJSON(url) {
  try {
    const x = new XMLHttpRequest();
    x.open('GET', url, false);
    x.send();
    return x.status === 200 ? JSON.parse(x.responseText) : null;
  } catch (e) { return null; }
}
const IA_I18N = window.IA_I18N || loadJSON('content/i18n.json')
  || { default: 'en', languages: [{ code: 'en', path: '', menu: 'EN', label: 'English' }], pages: {} };
const LANGS = IA_I18N.languages;
const langOf = (code) => LANGS.find((l) => l.code === code) || LANGS[0];
const currentLang = () => window.IA_LANG || IA_I18N.default;
// page key from the URL: /ia-concept6/id/referral-program(.html) → "referral-program", folder root → "index"
const currentPage = () => decodeURIComponent(location.pathname.split('/').pop().replace(/\.html$/, '')) || 'index';
const hasLang = (page, code) => code === IA_I18N.default || (IA_I18N.pages[page] || []).includes(code);

// Same page in another language. Language pages carry <base href="../">, so every
// href here is written from the site root: "referral-program", "id/referral-program".
function langHref(code, page = currentPage()) {
  const dir = langOf(code).path;
  const p = page === 'index' ? '' : page;
  return (dir ? dir + '/' + p : p) || './';
}
// An internal page link ("about", "pricing?x=1") points at this language's copy when
// that page is translated; otherwise it stays on the English page.
function localHref(href) {
  const lang = currentLang();
  if (lang === IA_I18N.default || typeof href !== 'string') return href;
  const m = href.match(/^([a-z0-9-]+)([?#].*)?$/i);
  return m && hasLang(m[1], lang) ? langOf(lang).path + '/' + href : href;
}

const deepMerge = (base, over) => {
  if (Array.isArray(over) || typeof over !== 'object' || over === null) return over === undefined ? base : over;
  const out = { ...(base || {}) };
  for (const k of Object.keys(over)) out[k] = deepMerge(out[k], over[k]);
  return out;
};
// A page's copy in the current language (English for any key a translation leaves out).
function useCopy(page) {
  return React.useMemo(() => {
    if (window.IA_COPY) return window.IA_COPY;
    const base = loadJSON(`content/pages/${page}/${IA_I18N.default}.json`) || {};
    const lang = currentLang();
    return lang === IA_I18N.default ? base : deepMerge(base, loadJSON(`content/pages/${page}/${lang}.json`) || {});
  }, [page]);
}
// Copy strings may use **bold**, [label](link) and line breaks (\n).
function rich(str, linkClass) {
  if (str == null) return null;
  const out = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)|\n/g;
  let last = 0, m;
  while ((m = re.exec(str))) {
    if (m.index > last) out.push(str.slice(last, m.index));
    if (m[1] !== undefined) out.push(<b key={m.index}>{m[1]}</b>);
    else if (m[2] !== undefined) out.push(<a key={m.index} className={linkClass} href={localHref(m[3])}>{m[2]}</a>);
    else out.push(<br key={m.index} />);
    last = re.lastIndex;
  }
  if (last < str.length) out.push(str.slice(last));
  return out;
}

// Language switcher icon: Lucide "globe" (outline, 1.5px stroke, currentColor), per the design
// system's icon rules — used in the nav and the footer instead of the 🌐 emoji.
function GlobeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: '0 0 auto' }}>
      <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
    </svg>
  );
}

// trailing tick on the selected language (select-option pattern); hidden on the other rows so the codes stay aligned
function LangTick() {
  return <svg className="lang-opt-tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>;
}

// One row of the language menu: a link to this page in that language, or a dimmed row
// when the page isn't translated into it yet.
function LangOption({ l, lang, page, role, mobile }) {
  const cls = 'lang-opt' + (mobile ? ' lang-opt-m' : '') + (l.code === lang ? ' is-selected' : '');
  const inner = <React.Fragment><span>{l.label}</span><span className="lang-opt-code">{l.menu}<LangTick /></span></React.Fragment>;
  if (!hasLang(page, l.code)) {
    return <span role={role} aria-disabled="true" title="This page isn't available in this language yet" className={cls + ' is-off'}>{inner}</span>;
  }
  return <a role={role} aria-checked={role ? l.code === lang : undefined} aria-current={l.code === lang ? 'page' : undefined} hrefLang={l.hreflang} lang={l.htmlLang} href={langHref(l.code, page)} className={cls}>{inner}</a>;
}

function Caret({ open }) {
  return <svg width="11" height="11" viewBox="0 0 12 12" style={{ marginLeft: 3, transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none' }}><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

// Column-menu link (new grouped dropdowns). A page that isn't live yet is marked
// `soon` — rendered non-clickable with a grey "(coming soon)" tag.
function MegaLink({ link }) {
  const [t, href, soon] = link;
  if (soon) return <span className="mega4-link mega4-soon"><b>{t}</b><em>(coming soon)</em></span>;
  return <a href={localHref(href)} role="menuitem" className="mega4-link"><b>{t}</b></a>;
}


function Nav({ getStartedTone = 'midnight', homeHref = './' }) {
  const [open, setOpen] = React.useState(null);
  const lang = currentLang();
  const page = currentPage();
  const [langOpen, setLangOpen] = React.useState(false);
  const [mobile, setMobile] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [onDark, setOnDark] = React.useState(false);   // dark Midnight surface under the nav (Change 3)
  const navRef = React.useRef(null);
  const closeT = React.useRef(null);
  React.useEffect(() => {
    const f = () => {
      setScrolled(window.scrollY > 20);
      const s = document.getElementById('stats');
      const r = s && s.getBoundingClientRect();
      // Dark chrome while the dark stats section spans the nav line, OR while a honeycomb
      // wipe has (nearly) covered the viewport — the wipe stages flag this via a body class
      // so the logo/links crossfade in step with the Midnight coverage at the top edge.
      setOnDark((!!r && r.top <= 74 && r.bottom > 74) || document.body.className.indexOf('hexwipe-dark') !== -1);
      setOpen(null);   // close the mega on scroll (matches Concept 3)
    };
    f(); window.addEventListener('scroll', f, { passive: true });
    window.addEventListener('resize', f);
    return () => { window.removeEventListener('scroll', f); window.removeEventListener('resize', f); };
  }, []);
  // Entrance: nav drops in + fades on load (same fade-up language as the page).
  React.useLayoutEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !navRef.current || prefersReduced()) return;
    // clearProps: 'transform' so no residual matrix() is left on the header — a transform
    // would make it a containing block / backdrop root and break the mega's blur in some browsers.
    const tw = gsap.from(navRef.current, { y: -20, autoAlpha: 0, duration: 0.7, ease: 'power3.out', clearProps: 'transform' });
    return () => tw.kill();
  }, []);
  // Hover-intent open/close (140ms grace, as in Concept 3) so travelling from a link
  // down into the mega panel doesn't dismiss it.
  const openMega = (i) => { clearTimeout(closeT.current); setOpen(i); };
  const scheduleClose = () => { clearTimeout(closeT.current); closeT.current = setTimeout(() => setOpen(null), 140); };
  const R = (k, fb) => (window.__resources && window.__resources[k]) || fb;
  // Nav CTA leads to Publisher sign-up, so it is always the Ember Publisher CTA (by request,
  // overriding v3.5.2's one-primary / zero-Ember-on-Advertiser rules). getStartedTone is kept for the call sites.
  const gsClass = 'btn-primary';
  // Design-system chrome: the sticky nav is solid Midnight (not a blurred glass) once
  // scrolled, over a dark section, or with the mobile menu open. Transparent only at the top.
  const dark = onDark || scrolled || mobile;

  return (
    <React.Fragment>
    <header ref={navRef} className={`hdr4${dark ? ' nav-on-dark' : ''}${scrolled ? ' solid' : ''}`} style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: dark ? 'var(--midnight)' : 'transparent',
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
      boxShadow: 'none',
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.10)' : 'transparent'}`,
      transition: 'background .3s, border-color .3s, box-shadow .3s',
    }} onMouseLeave={scheduleClose}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', height: scrolled ? 62 : 74, gap: 24, position: 'relative', transition: 'height .3s' }}>
        <a href={localHref(homeHref)} aria-label="Involve Asia home" style={{ display: 'flex', alignItems: 'center', flex: '0 0 auto', zIndex: 2, position: 'relative' }}>
          <img src={R('logoMidnight', "media/brand/wordmark-midnight.png")} alt="Involve Asia" width="132" height="28" style={{ height: 28, width: 'auto', transition: 'opacity .35s ease', opacity: dark ? 0 : 1 }} />
          <img src={R('logoWhite', "media/brand/wordmark-white.png")} alt="" aria-hidden="true" width="132" height="28" style={{ height: 28, width: 'auto', position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', transition: 'opacity .35s ease', opacity: dark ? 1 : 0 }} />
        </a>

        {/* Left-aligned primary nav (Concept 3) */}
        <nav className="nav-desk" style={{ display: 'flex', alignItems: 'center', gap: 28, marginLeft: 22, marginRight: 'auto' }} aria-label="Primary">
          {NAV.map((n, i) => (
            <a key={n.label} href={localHref(n.href)} aria-expanded={open === i} aria-haspopup="true"
              className={open === i ? 'is-open' : ''}
              onMouseEnter={() => openMega(i)}
              style={{ display: 'inline-flex', alignItems: 'center', font: '500 14px/1 var(--font-body)',
                color: open === i ? 'var(--warm-900)' : 'var(--warm-600)', padding: '8px 0', transition: 'color .15s' }}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: 18, zIndex: 2 }}>
          {/* Language dropdown */}
          <div style={{ position: 'relative' }} onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
            <button aria-label="Change language" aria-expanded={langOpen} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--warm-600)', font: '600 13px/1 var(--font-body)', padding: '8px 2px' }}>
              <GlobeIcon />{langOf(lang).menu}<Caret open={langOpen} />
            </button>
            {langOpen && (
              <div role="menu" className="lang-menu" style={{ position: 'absolute', top: '100%', right: 0, marginTop: 4, minWidth: 200, background: '#fff', border: '1px solid var(--warm-200)', borderRadius: 'var(--r-md)', boxShadow: 'var(--shadow-xl)', padding: 6 }}>
                {LANGS.map(l => <LangOption key={l.code} l={l} lang={lang} page={page} role="menuitemradio" />)}
              </div>
            )}
          </div>
          <a href="https://app.involve.asia/v2/login" className="nav-login" style={{ font: '600 14px/1 var(--font-body)', color: 'var(--warm-900)', padding: '8px 4px' }}>Login</a>
          <a href="https://app.involve.asia/v2/create-account" className={`btn ${gsClass}`} style={{ padding: '11px 22px', fontSize: 14 }}>Get Started <span className="arw">→</span></a>
        </div>
        <button className="nav-burger" aria-label="Open menu" aria-expanded={mobile} onClick={() => setMobile(v => !v)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--midnight)', marginLeft: 'auto', zIndex: 2 }}>
          <svg width="26" height="26" viewBox="0 0 24 24"><path d={mobile ? 'M5 5l14 14M19 5L5 19' : 'M4 7h16M4 12h16M4 17h16'} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* Mobile panel: absolutely positioned under the sticky header so it overlays the page
          instead of growing the header and pushing the content down */}
      {mobile && (
        <div className="nav-mobile" style={{ position: 'absolute', top: '100%', left: 0, right: 0, borderTop: '1px solid var(--warm-200)', background: 'var(--warm-50)', padding: '12px 0 24px', maxHeight: 'calc(100dvh - 75px)', overflowY: 'auto', overscrollBehavior: 'contain', boxShadow: '0 24px 40px rgba(15,28,46,.10)' }}>
          <div className="wrap">
            {NAV.map((n) => (
              <details key={n.label} style={{ borderBottom: '1px solid var(--warm-200)' }}>
                <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 4px', fontWeight: 600, fontSize: 16, cursor: 'pointer', listStyle: 'none' }}>{n.label}<Caret /></summary>
                <div style={{ padding: '0 4px 12px' }}>
                  {n.columns
                    ? n.columns.map((col, ci) => (
                        <div key={ci} style={{ marginTop: ci ? 22 : 6 }}>
                          {col.top && <a href={localHref(col.top[1])} style={{ display: 'block', padding: '10px 12px', color: 'var(--warm-600)', fontSize: 15 }}>{col.top[0]}</a>}
                          {col.head && <div style={{ margin: '0 0 10px', padding: '2px 0 9px', borderBottom: '1px solid var(--warm-200)', font: '700 12px/1 var(--font-body)', color: 'var(--warm-400)' }}>{col.head}</div>}
                          {col.links.map(([t, href, soon]) => soon
                            ? <span key={t} style={{ display: 'block', padding: '10px 12px', color: 'var(--warm-400)', fontSize: 15 }}>{t} <em style={{ fontStyle: 'normal', fontSize: 13 }}>(coming soon)</em></span>
                            : <a key={t} href={localHref(href)} style={{ display: 'block', padding: '10px 12px', color: 'var(--warm-600)', fontSize: 15 }}>{t}</a>)}
                        </div>
                      ))
                    : n.items.map((it) => <a key={it.t} href={localHref(it.href)} style={{ display: 'block', padding: '10px 12px', color: 'var(--warm-600)', fontSize: 15 }}>{it.t}</a>)}
                </div>
              </details>
            ))}
            <details style={{ borderBottom: '1px solid var(--warm-200)' }}>
              <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 4px', fontWeight: 600, fontSize: 16, cursor: 'pointer', listStyle: 'none' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><GlobeIcon size={18} />Language: {langOf(lang).menu}</span><Caret /></summary>
              <div style={{ padding: '0 4px 12px' }}>
                {LANGS.map(l => <LangOption key={l.code} l={l} lang={lang} page={page} mobile />)}
              </div>
            </details>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
              <a href="https://app.involve.asia/v2/login" className="btn btn-secondary btn-block">Login</a>
              <a href="https://app.involve.asia/v2/create-account" className={`btn ${gsClass} btn-block`}>Get Started</a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .lang-menu{transform-origin:top right; animation:navPanel .18s cubic-bezier(.22,1,.36,1) both;}
        /* language options follow the design system's .select-option states: hover warm-100; selected =
           warm-900 600 on the ember tint with a trailing ember tick (never ember text) */
        .lang-opt{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;text-align:left;border:none;cursor:pointer;
          padding:10px 12px;border-radius:var(--r-sm);background:none;font:500 14px/1.2 var(--font-body);color:var(--warm-900);transition:background .15s;}
        .lang-opt:hover, .lang-opt:focus-visible{background:var(--warm-100);}
        .lang-opt.is-selected{font-weight:600;background:rgba(240,88,38,.06);}
        .lang-opt.is-off{color:var(--warm-400);cursor:default;}
        .lang-opt.is-off:hover{background:none;}
        .lang-opt-code{display:inline-flex;align-items:center;gap:6px;font:600 12px/1 var(--font-body);color:var(--warm-400);}
        .lang-opt-tick{width:14px;height:14px;color:var(--ember);visibility:hidden;}
        .lang-opt.is-selected .lang-opt-tick{visibility:visible;}
        .lang-opt-m{padding:11px 12px;font-size:15px;}
        .lang-opt-m .lang-opt-code{font-size:13px;}
        /* The sticky nav is transparent over the hero, so let the hero's decoration (hexagons,
           floating cards) run up behind it instead of being cut off at the nav line. Sides and
           bottom stay clipped (overflow-x:clip also keeps horizontal scroll away). */
        main > section:first-child{ overflow:visible !important; overflow-x:clip !important; clip-path:inset(-100vh 0 0 0); }
        main > section:first-child .ph-hexdeco{ overflow:visible; }
        @keyframes navPanel{from{opacity:0;transform:translateY(-8px) scale(.985)}to{opacity:1;transform:none}}
        .nav-item:hover{background:var(--warm-150);}
        .nav-desk a{color:var(--warm-600);}
        .nav-desk a:hover, .nav-desk a.is-open{color:var(--warm-900);}
        .nav-login:hover{color:var(--ember);}
        .nav-on-dark .nav-login:hover{color:var(--ember-light);}
        .btn .arw{display:inline-block;margin-left:6px;}
        /* Mega items — Concept 3 look with real descriptions */
        .mega4-item b{display:block;font-family:var(--font-body);font-weight:700;font-size:15px;color:var(--warm-900);transition:color .2s cubic-bezier(.4,0,.2,1);}
        .mega4-item .d{display:block;font-size:13px;color:var(--warm-400);margin-top:6px;line-height:1.45;}
        .mega4-item:hover b{color:var(--ember);}
        /* grouped column dropdowns (Advertisers / Publishers) */
        .mega4-col{width:200px;}
        .mega4-head{display:block;font:700 12px/1 var(--font-body);color:var(--warm-400);margin-bottom:11px;}
        .mega4-divider{display:block;height:1px;background:#E8E8E2;margin:0 0 12px;}
        .mega4-link{display:block;padding:8px 0;}
        .mega4-link b{font-family:var(--font-body);font-weight:700;font-size:15px;color:var(--warm-900);transition:color .2s cubic-bezier(.4,0,.2,1);}
        a.mega4-link:hover b{color:var(--ember);}
        .mega4-soon{cursor:default;}
        .mega4-soon b{color:var(--warm-400);}
        .mega4-soon em{font-style:normal;font-size:12px;color:var(--warm-400);margin-left:7px;}
        /* right-side feature card in the mega panel: image + dark scrim overlay, whole card clickable */
        .mega4-feat{ position:relative; display:block; margin-left:auto; flex:0 0 clamp(260px,24vw,320px); height:clamp(224px,23vh,254px); border-radius:var(--r-xl); overflow:hidden; text-decoration:none; box-shadow:0 12px 30px rgba(15,28,46,.14); }
        .mega4-feat img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; will-change:transform; transition:transform .5s cubic-bezier(.22,1,.36,1); }
        .mega4-feat-scrim{ display:none; }
        .mega4-feat-body{ position:absolute; left:0; right:0; bottom:0; z-index:1; display:flex; flex-direction:column; gap:7px; padding:22px; }
        .mega4-feat-head{ font-family:var(--font-display); font-weight:800; font-size:19px; line-height:1.15; letter-spacing:-.01em; color:#fff; }
        .mega4-feat-desc{ font:400 13.5px/1.45 var(--font-body); color:rgba(255,255,255,.86); }
        .mega4-feat-cta{ display:inline-flex; align-items:center; gap:7px; margin-top:5px; font:700 13.5px/1 var(--font-body); color:#fff; }
        .mega4-feat-cta svg{ transition:transform .2s ease; }
        /* Nav over the dark Midnight surface: links + icons go light, in lockstep with the white logo. */
        .nav-on-dark .nav-desk a{color:rgba(255,255,255,.82) !important;}
        .nav-on-dark .nav-desk a:hover, .nav-on-dark .nav-desk a.is-open{color:#fff !important;}
        /* the language options sit on the white dropdown, so they keep their own (dark) colours */
        .nav-on-dark .nav-right button:not(.lang-opt), .nav-on-dark .nav-login{color:rgba(255,255,255,.82) !important;}
        .nav-on-dark .nav-burger{color:#fff !important;}
        .nav-desk a, .nav-right button, .nav-login{transition:color .3s ease, background .15s;}
        @media (prefers-reduced-motion: reduce){ .mega4, .mega4-overlay, .lang-menu{transition:none; animation:none;} }
        @media (max-width: 1040px){
          .nav-desk{display:none !important;}
          .nav-right{display:none !important;}
          .nav-burger{display:inline-flex !important;}
          .mega4{display:none !important;}
        }
      `}</style>
    </header>

    {/* Frosted full-page blur overlay behind the mega (Concept 3). Rendered as a SIBLING
        of the header — NOT nested inside it — so the header's stacking context / transform
        can't clip the backdrop, and the blur reliably applies to the page content. */}
    <div className="mega4-overlay" onClick={() => { setOpen(null); setMobile(false); }} style={{
      position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(248,250,250,.35)',
      backdropFilter: 'blur(9px)', WebkitBackdropFilter: 'blur(9px)',
      opacity: (open !== null || mobile) ? 1 : 0, visibility: (open !== null || mobile) ? 'visible' : 'hidden',
      transition: 'opacity .35s cubic-bezier(.4,0,.2,1), visibility .35s cubic-bezier(.4,0,.2,1)',
    }} />

    {/* Full-width mega panel, drops from the top (Concept 3) */}
    <div className="mega4" role="region" onMouseEnter={() => clearTimeout(closeT.current)} onMouseLeave={scheduleClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 95, background: 'var(--warm-50)',
      boxShadow: '0 24px 40px rgba(15,28,46,.10)', borderBottom: '1px solid var(--warm-200)',
      padding: '92px 0 44px',
      opacity: open !== null ? 1 : 0, visibility: open !== null ? 'visible' : 'hidden',
      transform: open !== null ? 'translateY(0)' : 'translateY(-16px)',
      transition: 'opacity .35s cubic-bezier(.4,0,.2,1), transform .4s cubic-bezier(.4,0,.2,1), visibility .35s cubic-bezier(.4,0,.2,1)',
    }}>
      {NAV.map((n, i) => open === i && (
        <div key={n.label} className="wrap" role="menu">
          <div className="mega4-cols" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px clamp(44px,5vw,72px)', alignItems: 'flex-start' }}>
            {n.columns.map((col, ci) => (
              <div key={ci} className="mega4-col">
                <span className="mega4-head">{col.head}</span>
                <span className="mega4-divider" aria-hidden="true" />
                {col.links.map(l => <MegaLink key={l[0]} link={l} />)}
              </div>
            ))}
            {n.feat && (
              <a className="mega4-feat" href={localHref(n.feat.href)} role="menuitem">
                <img src={n.feat.img} alt="" loading="lazy" />
                <span className="mega4-feat-scrim" aria-hidden="true" style={{ background: n.feat.scrim }} />
                <span className="mega4-feat-body">
                  <span className="mega4-feat-head">{n.feat.head}</span>
                  <span className="mega4-feat-desc">{n.feat.desc}</span>
                  <span className="mega4-feat-cta">{n.feat.cta} <Arrow s={15} /></span>
                </span>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
    </React.Fragment>
  );
}

function Arrow({ s = 16 }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

const FOOT = [
  { h: 'For Publishers', links: [['Overview','for-publishers'],['All Brands Directory','https://app.involve.asia/directory'],['Express Withdrawal','express-withdrawal'],['Developer API','api-overview'],['Data Feed','datafeed']] },
  { h: 'For Advertisers', links: [['Overview','for-advertisers'],['How We Track','how-we-track'],['Partner Discovery','partner-discovery'],['Automation','automation'],['Case Studies','https://involve.asia/blog/category/advertisers/success-stories/']] },
  { h: 'Involve', links: [['About Us','about'],['Careers','https://careers.involve.asia/'],['Blog','blog'],['Support','https://helpcentre.involve.asia/'],['Terms & Conditions','terms-conditions'],['Privacy Policy','https://app.involve.asia/publisher/privacypolicy']] },
];
// [name, url, icon] — icons are the white 48×48 "[name]-Social Icon.svg" exports
const SOCIAL = [['Facebook','https://www.facebook.com/involveasia','facebook'],['Twitter','https://twitter.com/InvolveAsia','twitter'],['Instagram','https://www.instagram.com/involveasia/','instagram'],['LinkedIn','https://www.linkedin.com/company/involve-asia/','linkedin']];
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: 'var(--midnight)', color: 'var(--warm-300)', paddingTop: 64 }}>
      <style>{`
        .foot-grid{ display:grid; grid-template-columns:1.4fr repeat(3,1fr); gap:32px; padding-bottom:48px; }
        @media (max-width:900px){ .foot-grid{ grid-template-columns:repeat(3,1fr) !important; gap:32px 24px !important; } .foot-grid > :first-child{ grid-column:1 / -1; } }
        @media (max-width:560px){ .foot-grid{ grid-template-columns:1fr 1fr !important; gap:30px 20px !important; } }
      `}</style>
      <div className="wrap">
        <div aria-hidden="true" style={{ height: 1, background: 'var(--midnight-mid)', marginBottom: 56 }}></div>
        <div className="foot-grid">
          <div style={{ maxWidth: 280 }}>
            <img src={(window.__resources && window.__resources.logoWhite) || "media/brand/wordmark-white.png"} alt="Involve Asia" width="140" height="30" style={{ height: 30, width: 'auto' }} />
            <p style={{ marginTop: 16, fontSize: 14, color: 'var(--warm-300)', lineHeight: 1.6 }}>
              The affiliate marketing platform connecting advertisers with creators and publishers across Asia.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {SOCIAL.map(([n, u, ic]) => (
                <a key={n} href={u} target="_blank" rel="noopener noreferrer" aria-label={`Involve Asia on ${n} (opens in a new tab)`} style={{ width: 38, height: 38, borderRadius: 'var(--r-lg)', background: 'var(--midnight-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warm-300)', fontSize: 12, fontWeight: 600, transition: 'background .15s' }}
                   onMouseEnter={e => e.currentTarget.style.background = 'var(--midnight-soft)'}
                   onMouseLeave={e => e.currentTarget.style.background = 'var(--midnight-mid)'}>
                  <img src={`media/figma/${ic}-Social%20Icon.svg`} alt="" width="18" height="18" style={{ display: 'block', width: 18, height: 18 }} />
                </a>
              ))}
            </div>
          </div>
          {FOOT.map(col => (
            <div key={col.h}>
              <h4 style={{ fontSize: 13, color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 700 }}>{col.h}</h4>
              <ul style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {col.links.map(([t, u]) => (
                  <li key={t}><a href={localHref(u)} style={{ fontSize: 14, color: 'var(--warm-300)', transition: 'color .15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--warm-300)'}>{t}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--midnight-mid)', padding: '24px 0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <p style={{ fontSize: 13, color: 'var(--warm-300)' }}>© 2014–{year} Involve Asia Technologies Sdn Bhd · 201201032669 (1017157-V)</p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span aria-label={`Language: ${langOf(currentLang()).label}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--midnight-mid)', borderRadius: 'var(--r-md)', padding: '8px 14px', color: 'var(--warm-300)', font: '500 13px/1 var(--font-body)' }}><GlobeIcon />{langOf(currentLang()).label}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Hexagon cursor follower ----------------
   A small #D2D2CC hexagon trails the real cursor with an eased lag (GSAP quickTo).
   Over any clickable element it rotates 90°, enlarges and dims. Extras for polish:
   fades in on first move / out when the pointer leaves the window, a subtle click
   pulse, and it's disabled on touch + reduced-motion (and never blocks clicks). The
   native cursor stays visible — the hexagon is a trailing accent, not a replacement. */
const CURSOR_CLICKABLE = 'a,button,[role="button"],input,textarea,select,label,summary,.nm-door,.offer-card,.offer-rail-tab,[data-cursor="link"]';
function HexCursor() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current, gsap = window.gsap;
    if (!el || !gsap) return;
    if (!window.matchMedia('(pointer: fine)').matches || prefersReduced()) return;  // skip on touch / reduced-motion
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    const xTo = gsap.quickTo(el, 'x', { duration: 0.36, ease: 'power3' });   // snappier lag
    const yTo = gsap.quickTo(el, 'y', { duration: 0.36, ease: 'power3' });
    const poly = el.querySelector('polygon');
    let shown = false, isHover = false;
    const base = () => (isHover ? 0.45 : 0.9);
    const onMove = (e) => {
      xTo(e.clientX); yTo(e.clientY);
      if (!shown) { shown = true; gsap.to(el, { opacity: base(), duration: 0.3 }); }
      const over = !!(e.target.closest && e.target.closest(CURSOR_CLICKABLE));
      if (over !== isHover) {
        isHover = over;
        gsap.to(el, { rotation: over ? 180 : 0, scale: over ? 1.7 : 1, opacity: base(), duration: 0.32, ease: 'power3' });
        // over a clickable: a light fill → soft adaptive highlight, kept low so text behind stays readable
        gsap.to(poly, { fillOpacity: over ? 0.22 : 0, duration: 0.32, ease: 'power3' });
      }
    };
    const onLeaveWin = () => gsap.to(el, { opacity: 0, duration: 0.25 });
    const onEnterWin = () => { if (shown) gsap.to(el, { opacity: base(), duration: 0.25 }); };
    const onDown = () => gsap.to(el, { scale: isHover ? 1.45 : 0.7, duration: 0.12 });
    const onUp = () => gsap.to(el, { scale: isHover ? 1.7 : 1, duration: 0.2, ease: 'power2' });
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeaveWin);
    document.addEventListener('mouseenter', onEnterWin);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeaveWin);
      document.removeEventListener('mouseenter', onEnterWin);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);
  return (
    <div ref={ref} className="hex-cursor" aria-hidden="true">
      <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ display: 'block', overflow: 'visible' }}>
        <polygon points="50,5 88.97,27.5 88.97,72.5 50,95 11.03,72.5 11.03,27.5" fill="#D2D2CC" fillOpacity="0" stroke="#D2D2CC" strokeWidth="7" strokeLinejoin="round" />
      </svg>
      <style>{`
        /* hexagon cursor; mix-blend EXCLUSION auto-contrasts against light & dark backdrops
           but with softer, less harsh tones than difference. Fills in on hover (see JS). */
        .hex-cursor{position:fixed; left:0; top:0; z-index:9990; width:26px; height:29px; pointer-events:none;
          mix-blend-mode:exclusion; will-change:transform,opacity;}
        @media (pointer: coarse){ .hex-cursor{display:none;} }
        @media (prefers-reduced-motion: reduce){ .hex-cursor{display:none;} }
      `}</style>
    </div>
  );
}

/* Back-to-top sticky CTA (Figma 1542:59021) — a translucent-grey halo with a white inner
   circle and a muted up-chevron, fixed bottom-right. Shows ONLY when the user is (a) past
   the hero AND (b) scrolling up; hides on scroll-down or back in the hero. Subtle fade +
   rise on enter/exit. Reads scroll from Lenis (falls back to window scroll). */
function BackToTop() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const hero = document.getElementById('hero');
    let last = -1;
    // Poll the scroll position (Lenis owns scrolling, so native 'scroll' events don't fire,
    // and Lenis may init after this mounts) — reading lenis.scroll each tick is timing-proof.
    const id = setInterval(() => {
      const l = window.__lenis;
      const y = (l && typeof l.scroll === 'number') ? l.scroll : (window.scrollY || window.pageYOffset || 0);
      if (last < 0) { last = y; return; }
      const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
      const pastHero = y > heroBottom - 120;
      if (y > last + 3) setShow(false);                  // scrolling down → hide
      else if (y < last - 3 && pastHero) setShow(true);  // scrolling up, past hero → show
      else if (!pastHero) setShow(false);                // back in the hero → hide
      last = y;
    }, 100);
    return () => clearInterval(id);
  }, []);
  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 0.9 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <React.Fragment>
      <button type="button" className={'b2t' + (show ? ' b2t-in' : '')} onClick={toTop} aria-label="Back to top" tabIndex={show ? 0 : -1}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 15l6-6 6 6" /></svg>
      </button>
      <style>{`
        .b2t{ position:fixed; right:clamp(16px,2.5vw,28px); bottom:clamp(16px,2.5vw,28px); z-index:90;
          width:64px; height:64px; padding:0; border:none; background:rgba(222,222,222,.32); border-radius:50%;
          display:flex; align-items:center; justify-content:center; cursor:pointer;
          opacity:0; transform:translateY(14px) scale(.92); pointer-events:none; visibility:hidden;
          transition:opacity .38s ease, transform .42s cubic-bezier(.22,1,.36,1), visibility 0s linear .42s; }
        .b2t::before{ content:""; position:absolute; width:46px; height:46px; background:#fff; border:1px solid var(--warm-200); border-radius:50%; box-shadow:0 6px 18px rgba(15,28,46,.10); }
        .b2t svg{ position:relative; z-index:1; width:17px; height:17px; color:#a7a7a1; transition:color .2s ease; }
        .b2t:hover svg{ color:var(--warm-600); }
        .b2t:hover::before{ box-shadow:0 8px 22px rgba(15,28,46,.16); }
        .b2t.b2t-in{ opacity:1; transform:translateY(0) scale(1); pointer-events:auto; visibility:visible;
          transition:opacity .4s ease, transform .5s cubic-bezier(.22,1,.36,1); }
        @media (prefers-reduced-motion:reduce){
          .b2t{ transform:none; transition:opacity .2s linear, visibility 0s linear .2s; }
          .b2t.b2t-in{ transform:none; transition:opacity .2s linear; }
        }
      `}</style>
    </React.Fragment>
  );
}


/* Lenis inertia smooth-scroll + smooth in-page anchor scrolling (off under reduced-motion). */
function useSmoothScroll() {
  React.useEffect(() => {
    if (prefersReduced() || !window.Lenis) return;
    const lenis = new window.Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.4 });
    window.__lenis = lenis;
    const gsap = window.gsap, ST = window.ScrollTrigger;
    let raf = null, tick = null;
    if (gsap && ST) {
      lenis.on('scroll', ST.update);
      tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    } else {
      const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        // Honour the target's own scroll-margin-top (e.g. pages with a sticky sub-bar
        // set a larger one); fall back to the default 80px header offset.
        const smt = parseFloat(getComputedStyle(el).scrollMarginTop) || 80;
        lenis.scrollTo(el, { offset: -smt, duration: 1.1 });
      }
    };
    document.addEventListener('click', onClick);
    return () => {
      if (tick && gsap) gsap.ticker.remove(tick);
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);
}

/* Scroll-reveal: add `.in` to [data-reveal] as they enter view (reduced-motion shows all). */
function useScrollReveal() {
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'));
    if (prefersReduced()) { els.forEach(e => e.classList.add('in')); return; }
    // On mobile, reveal the hero immediately on page load (its fade-in plays on load,
    // not on scroll into view) — the rest of the page still reveals as it enters view.
    const heroEls = window.matchMedia('(max-width:900px)').matches
      ? Array.from(document.querySelectorAll('#pub-hero [data-reveal]')) : [];
    const heroSet = new Set(heroEls);
    heroEls.forEach(e => e.classList.add('in'));
    const io = new IntersectionObserver((ents) => {
      ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    els.forEach(e => { if (!heroSet.has(e)) io.observe(e); });
    return () => io.disconnect();
  }, []);
}

// "Pick your side" honeycomb (.hf-scene, on React pages and the static glossary-term pages):
// fade the hexes in one by one when the scene enters the viewport, and back out (reverse
// order) once it has fully left. Timing/order live in the section CSS (--i); this only
// toggles classes. The hidden start state is keyed to html.hx-js (set here) rather than to
// the section, so the build's pre-rendered markup (only #root is baked) stays visible without JS.
(function hexSceneReveal() {
  if (typeof document === 'undefined' || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('hx-js');
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting && e.intersectionRatio >= 0.2) e.target.classList.add('is-in');
    else if (!e.isIntersecting) e.target.classList.remove('is-in');
  }), { threshold: [0, 0.2] });
  // React pages render the section after this script runs, and on the built site React replaces
  // the pre-rendered markup, so keep watching (at most one lookup per frame) and re-attach to
  // whichever .hf-scene is current.
  let current = null, queued = false;
  const scan = () => {
    const el = document.querySelector('.hf-scene');
    if (!el || el === current) return;
    if (current) io.unobserve(current);
    current = el; io.observe(el);
  };
  new MutationObserver(() => { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; scan(); }); })
    .observe(document.documentElement, { childList: true, subtree: true });
  scan();
})();

Object.assign(window, { prefersReduced, fetchText, useHeroDecoArt, useHexPush, GlobeIcon, Nav, Arrow, Footer, HexCursor, BackToTop, useSmoothScroll, useScrollReveal,
  IA_I18N, currentLang, currentPage, langHref, localHref, useCopy, rich });
