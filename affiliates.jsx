/* ============================================================================
   affiliates.jsx — "For Affiliate Partners" page.
   All copy lives in content/pages/affiliates/<lang>.json and arrives through
   useCopy — this file only holds the layout.
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, PlatformTabs, FinalCta, Testimonials, PUB_VOICES, Faq, AppDownload, HeroHexGrid, HERO_HEXGRID_CSS, IconColumns, useCopy, rich } = window;

/* ---------- Section 1 — Hero ---------------------------------------------- */
function PubHero({ c }) {
  return (
    <section id="pub-hero" className="ph-sec">
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <HeroHexGrid />
        <div className="ph-copy">
          <span className="ph-eyebrow" data-reveal>{c.eyebrow}</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">{c.title}</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="2">{c.sub}</p>
          <div className="ph-actions" data-reveal data-reveal-delay="3">
            <a href="/partners/" className="btn btn-primary btn-lg">{c.cta} <Arrow /></a>
          </div>
          <span className="ph-free" data-reveal data-reveal-delay="3">{c.free}</span>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo ph-photo-fill"><img src="media/figma/aff-hero-img.png" alt={c.imageAlt} loading="eager" /></div>
        </div>
      </div>

      <style>{`
        .ph-sec{ position:relative; isolation:isolate; overflow:hidden; background:var(--warm-50); padding:clamp(40px,6vh,84px) 0 clamp(56px,9vh,116px); }
        ${HERO_HEXGRID_CSS}
        /* gradient blend from the hero into the logo strip below */
        .ph-basefade{ position:absolute; left:0; right:0; bottom:0; height:clamp(120px,24%,240px); z-index:0; pointer-events:none;
          background:linear-gradient(180deg, rgba(250,250,248,0) 0%, rgba(250,250,248,.65) 55%, var(--warm-50) 100%); }
        .ph-wrap{ position:relative; display:grid; grid-template-columns:1.02fr .98fr; gap:clamp(24px,4vw,60px); align-items:center; }
        /* copy */
        .ph-copy{ min-width:0; }
        .ph-eyebrow{ display:inline-block; font:600 13px/1 var(--font-body); letter-spacing:.02em; color:var(--ember);
          background:rgba(240,88,38,.10); border-radius:var(--r-full); padding:8px 15px; }
        .ph-title{ margin-top:20px; font-size:clamp(28px,4.4vw,50px); line-height:1.0; letter-spacing:-.03em; color:var(--warm-900); }
        .ph-sub{ margin-top:20px; max-width:520px; font-size:clamp(16px,1.4vw,19px); line-height:1.55; color:var(--warm-600); }
        .ph-actions{ margin-top:30px; display:flex; gap:12px; flex-wrap:wrap; }
        .ph-free{ display:block; margin-top:16px; font:500 14px/1 var(--font-body); color:var(--warm-400); }
        /* visual */
        /* match the advertiser hero: 1/1 container, 520px; the hexagon mask uses contain so the
           pointy-top hex keeps its 437:492 shape (centred) inside the square, same footprint as the advertiser */
        .ph-visual{ position:relative; aspect-ratio:1/1; max-width:520px; width:100%; margin-left:auto; }
        .ph-hexglow{ position:absolute; inset:2% 2% 2% 2%; z-index:0; pointer-events:none;
          display:none;  /* glow retired in v3.5.2 */ }
        /* soft hex plate behind the photo — rounded pointy-top (r≈38.67), ember → midnight gradient */
        .ph-hexplate{ position:absolute; inset:0; z-index:0; background:var(--warm-150);
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; }
        /* single contained hero image (laptop mockup) over the hex plate */
        .ph-heroimg{ position:absolute; inset:0; z-index:2; display:flex; align-items:center; justify-content:center; }
        .ph-heroimg img{ width:100%; height:100%; object-fit:contain; display:block; }
        /* ---- fade slider: each slide (photo + its UI) cross-fades in/out ---- */
        .ph-slide{ position:absolute; inset:0; z-index:1; opacity:0; transition:opacity .85s cubic-bezier(.4,0,.2,1); }
        .ph-slide.is-active{ opacity:1; z-index:2; }
        @media (prefers-reduced-motion: reduce){ .ph-slide{ transition:none; } }
        .ph-photo{ position:absolute; inset:0; z-index:1;
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; }
        .ph-photo img{ width:100%; height:100%; object-fit:cover; display:block; }
        /* hero mockup floats with transparent margins; scale it up (clipped to the hexagon by
           the .ph-photo mask) so it fills the hexagon like the express-withdrawal photo */
        .ph-photo-fill img{ object-fit:contain; transform:scale(1.04); transform-origin:48% 54%; }
        /* slides 1 & 3 are mirrored horizontally (no zoom) */
        .ph-photo img.ph-flip{ transform:scaleX(-1); }
        /* per-slide UI: subtle rise + fade in, synced with the slide */
        .ph-slide-ui{ position:absolute; inset:0; z-index:3; pointer-events:none; }
        .ph-slide-ui > *{ opacity:0; transform:translateY(12px); transition:opacity .7s cubic-bezier(.4,0,.2,1), transform .7s cubic-bezier(.4,0,.2,1); }
        .ph-slide.is-active .ph-slide-ui > *{ opacity:1; transform:translateY(0); transition-delay:.18s; }
        /* frosted glass box behind every UI element (matches Figma) */
        .ph-glass{ position:absolute; padding:7px; border-radius:var(--r-xl); background:rgba(255,255,255,.30);
          -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px); box-shadow:0 14px 34px rgba(15,28,46,.12); }
        .ph-g-link{ border-radius:var(--r-full); padding:6px; top:22%; right:-6%; }
        .ph-g-prod{ left:-3%; bottom:12%; width:26%; max-width:120px; }
        .ph-g-sales{ right:-3%; bottom:8%; }
        .ph-g-conv{ right:-7%; top:15%; }
        .ph-g-pay-a{ left:-8%; top:14%; }
        .ph-g-pay-b{ left:-8%; top:26%; }
        .ph-slide.is-active .ph-slide-ui > .ph-g-pay-b{ opacity:.62; }   /* second payout sits behind, fainter */
        /* inner white cards / pills */
        .ph-link{ display:inline-flex; align-items:center; gap:9px; background:#fff; border-radius:var(--r-full); padding:9px 16px 9px 9px;
          box-shadow:0 2px 6px rgba(15,28,46,.08); font:600 14px/1 var(--font-body); color:var(--warm-900); white-space:nowrap; }
        .ph-link-ic{ display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:var(--r-full);
          background:var(--warm-150); color:var(--warm-700); flex:0 0 auto; }
        .ph-prod-lbl{ display:block; font:500 11px/1.3 var(--font-body); color:#fff; text-shadow:0 3px 8px rgba(0,0,0,.35); margin:1px 2px 7px; }
        .ph-prod-img{ width:100%; aspect-ratio:1/1; object-fit:cover; border-radius:var(--r-lg); display:block; }
        .ph-stat{ background:#fff; border-radius:var(--r-xl); box-shadow:0 2px 6px rgba(15,28,46,.08); padding:12px 15px; display:flex; flex-direction:column; gap:4px; }
        .ph-stat-lbl{ display:inline-flex; align-items:center; gap:6px; font:600 12px/1.2 var(--font-body); color:var(--warm-900); }
        .ph-stat-cur{ display:inline-flex; align-items:center; justify-content:center; width:16px; height:16px; border-radius:var(--r-sm); background:var(--warm-150); font:700 10px/1 var(--font-body); color:var(--warm-800); }
        .ph-stat-row{ display:flex; align-items:baseline; gap:8px; }
        .ph-stat-row b{ font-family:var(--font-display); font-weight:800; font-size:22px; letter-spacing:-.02em; color:var(--warm-900); }
        .ph-stat-row b small{ font-size:.6em; font-weight:800; }
        .ph-stat-row em{ font-style:normal; font-weight:700; font-size:11px; color:#047857; background:#dcfce7; border-radius:var(--r-md); padding:2px 6px; }
        .ph-pay{ display:flex; align-items:center; justify-content:space-between; gap:16px; background:#fff; border-radius:var(--r-lg); box-shadow:0 2px 6px rgba(15,28,46,.08); padding:9px 14px; white-space:nowrap; }
        .ph-pay span{ font:500 13px/1 var(--font-body); color:var(--warm-800); }
        .ph-pay b{ font-family:var(--font-display); font-weight:800; font-size:15px; color:var(--warm-900); }
        .ph-g-pay-b .ph-pay{ padding:9px 14px; }
        @media (max-width:900px){
          .ph-wrap{ grid-template-columns:1fr; gap:36px; }
          .ph-copy{ text-align:center; display:flex; flex-direction:column; align-items:center; }
          .ph-sub{ margin-left:auto; margin-right:auto; }
          .ph-sec{ padding-top:12px; }
          /* hexagon 15% smaller than the full column (and the old 420px cap), centred */
          .ph-visual{ order:-1; width:85%; max-width:357px; margin:0 auto; justify-self:center; }
          /* floating UI cards: 15% smaller, and pushed back out to where they sat around the full-width
             hexagon (8.8% of the 85% box = the 7.5% it lost each side; only the anchored side's margin moves
             an absolutely positioned card). Scale from the anchored edge so that edge stays put. */
          .ph-glass{ scale:.85; margin-inline:-8.8%; transform-origin:left center; }
          .ph-g-link, .ph-g-sales, .ph-g-conv, .ph-ga-appl{ transform-origin:right center; }
          /* keep the floating UI within the hexagon so the composition stays centred */
          .ph-g-link, .ph-g-sales, .ph-g-conv{ right:0; }
          .ph-g-prod, .ph-g-pay-a, .ph-g-pay-b{ left:0; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Testimonials (shared Testimonials, ia-sections.jsx) --------- */
// Shared list, but this page punctuates the Siakap Keli pull-quote without the dash.
function PubVoices({ c }) {
  const voices = PUB_VOICES.map((v) => (v.name === 'Siakap Keli' ? { ...v, quote: c.siakapKeliQuote } : v));
  return <Testimonials items={voices} />;
}

/* ---------- Section 8 — "Questions, answered." (FAQ accordion) ------------
   Copy supplied by the client. Two answers carry links (beginner guide, Express
   Withdrawal) — hrefs are placeholders pending the real URLs. Example figures
   (4.2% commission, 10 working days) are illustrative — confirm before launch. */
function PubFAQ({ c }) {
  return <Faq items={c.items.map(([q, a]) => [q, rich(a)])} />;
}

/* ---------- Final CTA (shared FinalCta, ia-sections.jsx) ----------------- */
function PubCTA({ c }) {
  return <FinalCta title={c.title} />;
}

/* ---------- Affiliates §2 — "Built for every kind of affiliate site." (3 cards) ---------- */
/* Sub-type feature section — two cards, same layout as the Creator "Made for…" and
   Technology "Built for teams that build." sections (mf-* pattern). */
/* Browser coverflow (Option A): a browser window centred in the tinted square,
   cycling through the affiliate site types (blog / cashback / coupon / comparison),
   with prev/next peeking at 40% opacity. Parallels the creator phone coverflow.
   Placeholder browser chrome until real site mockups (aff-site-1..4.png) land. */
const AFF_SITES = [
  { key: 'blog', img: 'aff-site-1.png', tint: 'linear-gradient(135deg,#f1ece6,#e4ddd2)' },
  { key: 'cashback', img: 'aff-site-2.png', tint: 'linear-gradient(135deg,#e8f0ea,#d6e5db)' },
  { key: 'coupon', img: 'aff-site-3.png', tint: 'linear-gradient(135deg,#f4ece7,#ecd9cd)' },
  { key: 'compare', img: 'aff-site-4.png', tint: 'linear-gradient(135deg,#e9ebf3,#d6dcec)' },
];
function AffFlow({ c }) {   // c = { flowLabel, sites: [{ url, alt }] } by index
  const N = AFF_SITES.length;
  const reduced = prefersReduced();
  const [active, setActive] = React.useState(0);
  const refs = React.useRef([]);
  const first = React.useRef(true);
  React.useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setActive((a) => (a + 1) % N), 3200);
    return () => clearInterval(id);
  }, [reduced, N]);
  React.useLayoutEffect(() => {
    const animate = !first.current && !reduced;
    refs.current.forEach((el, i) => {
      if (!el) return;
      const d = (i - active + N) % N;            // 0 centre, 1 right peek, 2 hidden (off-stage right), 3 left peek
      let left, op, scale, z;
      if (d === 0) { left = '50%'; op = '1'; scale = '1'; z = '3'; }
      else if (d === 1) { left = '97%'; op = '0.4'; scale = '0.88'; z = '2'; }
      else if (d === 3) { left = '3%'; op = '0.4'; scale = '0.88'; z = '2'; }
      else { left = '140%'; op = '0'; scale = '0.8'; z = '1'; }
      el.style.transition = (d === 2 && animate) ? 'none' : (animate ? '' : 'none');   // teleport the recycled item off-stage
      el.style.left = left; el.style.opacity = op; el.style.zIndex = z;
      el.style.transform = 'translate(-50%,-50%) scale(' + scale + ')';
    });
    if (first.current) {
      if (refs.current[0]) void refs.current[0].offsetWidth;
      refs.current.forEach((el) => { if (el) el.style.transition = ''; });
      first.current = false;
    }
  }, [active, reduced, N]);
  return (
    <div className="afc" role="group" aria-label={c.flowLabel}>
      {AFF_SITES.map((s, i) => (
        <div key={s.key} ref={(el) => (refs.current[i] = el)} className="afc-item" aria-hidden={((i - active + N) % N) !== 0}>
          <div className="afc-win">
            <div className="afc-bar"><span className="afc-dots"><i /><i /><i /></span><span className="afc-url">{c.sites[i].url}</span></div>
            <div className="afc-body">
              {s.img
                ? <img className="afc-shot" src={`media/figma/${s.img}`} alt={c.sites[i].alt} loading="lazy" />
                : <div className="afc-ph" style={{ background: s.tint }}><span className="afc-hero" /><span className="afc-line w1" /><span className="afc-line w2" /><span className="afc-line w3" /></div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
function BuiltKinds({ c }) {
  return (
    <section id="aff-kinds" className="mf-sec">
      <div className="wrap">
        <div className="mf-grid">
          <div className="mf-left">
            <h2 className="mf-title" data-reveal>{c.title}</h2>
            <p className="mf-sub" data-reveal data-reveal-delay="1">{c.sub}</p>
            <div className="mf-points" data-reveal data-reveal-delay="1">
              {c.points.map(([t, d]) => (
                <div className="mf-point" key={t}>
                  <h3 className="mf-pt">{t}</h3>
                  <p className="mf-pd">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mf-visual" data-reveal>
            <AffFlow c={c} />
          </div>
        </div>
      </div>
      <style>{`
        .mf-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .mf-grid{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,440px); gap:clamp(32px,5vw,72px); align-items:center; }
        .mf-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); max-width:520px; }
        .mf-sub{ margin-top:14px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:520px; }
        .mf-points{ margin-top:clamp(24px,4vh,40px); display:flex; flex-direction:column; gap:clamp(20px,3vh,30px); }
        .mf-pt{ font-family:var(--font-display); font-weight:800; font-size:19px; letter-spacing:-.01em; color:var(--warm-900); }
        .mf-pd{ margin-top:8px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:520px; }
        .mf-visual{ position:relative; }
        /* ---- browser coverflow (affiliate site types) ---- */
        .afc{ position:relative; width:100%; max-width:476px; margin-inline:auto; aspect-ratio:476/445;
          border-radius:var(--r-xl); overflow:hidden; background:var(--warm-150); }
        .afc-item{ position:absolute; top:50%; left:50%; width:76%; aspect-ratio:4/3;
          transform:translate(-50%,-50%); transform-origin:center;
          transition:left .7s cubic-bezier(.45,0,.15,1), opacity .7s ease, transform .7s cubic-bezier(.45,0,.15,1);
          will-change:left,opacity,transform; }
        .afc-win{ width:100%; height:100%; border-radius:var(--r-xl); overflow:hidden; display:flex; flex-direction:column;
          box-shadow:0 20px 44px rgba(15,28,46,.18); background:#fff; }
        .afc-bar{ display:flex; align-items:center; gap:8px; padding:7px 10px; background:#f3f1ee; border-bottom:1px solid var(--warm-200); flex:0 0 auto; }
        .afc-dots{ display:flex; gap:4px; } .afc-dots i{ width:7px; height:7px; border-radius:50%; background:#d8d3cc; }
        .afc-url{ flex:1; font:500 10px/1 var(--font-body); color:var(--warm-500); background:#fff; border-radius:var(--r-sm); padding:4px 8px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .afc-body{ flex:1; position:relative; overflow:hidden; background:#fff; }
        .afc-shot{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }
        .afc-ph{ position:absolute; inset:0; padding:16px; display:flex; flex-direction:column; gap:8px; }
        .afc-hero{ height:46%; border-radius:var(--r-lg); background:rgba(15,28,46,.07); margin-bottom:4px; }
        .afc-line{ height:7px; border-radius:var(--r-sm); background:rgba(15,28,46,.08); }
        .afc-line.w1{ width:72%; } .afc-line.w2{ width:52%; } .afc-line.w3{ width:62%; }
        @media (prefers-reduced-motion: reduce){ .afc-item{ transition:none; } }
        @media (max-width:860px){ .mf-grid{ grid-template-columns:1fr; gap:32px; } .mf-visual{ order:-1; width:100%; max-width:476px; margin-inline:auto; } }
      `}</style>
    </section>
  );
}
/* ---------- Affiliates §3 — "Why affiliate sites choose Involve." (4 icon columns) ---------- */
// Icons by index; the column text comes from c.items.
const AFF_WHY = [
  { ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg> },
  { ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M8 13h6M8 17h4" /></svg> },
  { ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="6" rx="7.5" ry="3" /><path d="M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6" /><path d="M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" /></svg> },
  { ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 14.5l2 2 4-4" /></svg> },
];
const WHY_CSS = `
        .wy-grid{ margin-top:clamp(34px,5vh,54px); display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(24px,3vw,40px); }
        @media (max-width:960px){ .wy-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); gap:clamp(28px,4vw,40px); } }
      `;
function WhyChoose({ c }) {
  const items = AFF_WHY.map((w, i) => ({ ...w, t: c.items[i][0], d: c.items[i][1] }));
  return (
    <IconColumns id="aff-why" title={c.title} items={items}
      proof={c.proof} css={WHY_CSS} />
  );
}
/* ---------- Affiliates §4b — "How it works" (3 numbered steps) — Figma 2546:45012 ---------- */
// Step images by index; the step text comes from c.steps.
const HIW_IMG = ['general-hye-01.png', 'affp-hye-02.png', 'general-hye-03.png', 'general-hye-04.png'];
// Card 1 (Pick a brand): a 4x2 grid of brand logos where one logo is "active" at
// a time; a single timer advances the playhead row by row (0..7) and loops.
const BG_COUNT = 8;
const BG_DWELL = 2000;      // ms each logo stays active before advancing
const BG_ROWPAUSE = 160;    // extra dwell on the last logo of each row (index 3 and 7)
function BrandGrid() {
  const [active, setActive] = React.useState(0);
  const activeRef = React.useRef(0);
  const hoverRef = React.useRef(false);
  const visibleRef = React.useRef(true);
  const timerRef = React.useRef(null);
  const wrapRef = React.useRef(null);
  const ctrl = React.useRef({ play: () => {}, stop: () => {} });
  React.useEffect(() => {
    if (prefersReduced()) return;                 // static grid, no loop
    const stop = () => { if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; } };
    const schedule = () => {
      const i = activeRef.current;
      const delay = BG_DWELL + (i === 3 || i === 7 ? BG_ROWPAUSE : 0);
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        const next = (activeRef.current + 1) % BG_COUNT;
        activeRef.current = next;
        setActive(next);
        if (!hoverRef.current && visibleRef.current && !document.hidden) schedule();
      }, delay);
    };
    const play = () => { if (!hoverRef.current && visibleRef.current && !document.hidden && !timerRef.current) schedule(); };
    ctrl.current = { play, stop };
    const io = new IntersectionObserver((e) => {
      visibleRef.current = e[0].isIntersecting;
      if (visibleRef.current) play(); else stop();
    }, { threshold: 0.2 });
    if (wrapRef.current) io.observe(wrapRef.current);
    const onVis = () => { if (document.hidden) stop(); else play(); };
    document.addEventListener('visibilitychange', onVis);
    play();
    return () => { stop(); io.disconnect(); document.removeEventListener('visibilitychange', onVis); ctrl.current = { play: () => {}, stop: () => {} }; };
  }, []);
  const enter = (i) => { hoverRef.current = true; ctrl.current.stop(); activeRef.current = i; setActive(i); };
  const leave = () => { hoverRef.current = false; ctrl.current.play(); };
  return (
    <div className="bg-grid" ref={wrapRef} onMouseLeave={leave} aria-hidden="true">
      {Array.from({ length: BG_COUNT }).map((_, i) => (
        <span className={'bg-logo' + (i === active ? ' is-active' : '')} key={i} onMouseEnter={() => enter(i)}>
          <img src={`media/figma/brand-logos${i + 1}.png`} alt="" loading="lazy" />
        </span>
      ))}
    </div>
  );
}
// Card 4 (Get paid): one pill whose currency steps USD -> MYR -> EUR, each code
// fading up & out then the next fading in from below (echoes the publisher tier pill, no icon).
const GP_CURR = [
  { key: 'usd', label: 'USD', amount: '1,000' },
  { key: 'myr', label: 'MYR', amount: '4,086' },
  { key: 'eur', label: 'EUR', amount: '883' },
];
const GP_HOLD = 2600;   // each currency holds ~2.6s
const GP_EXIT = 340;    // last 340ms = old code fades up & out
function GetPaidPill() {
  const [step, setStep] = React.useState(0);
  const [phase, setPhase] = React.useState('in');
  React.useEffect(() => {
    if (prefersReduced()) { setStep(0); setPhase('in'); return; }
    setPhase('in');
    const tOut = setTimeout(() => setPhase('out'), GP_HOLD - GP_EXIT);
    const tNext = setTimeout(() => setStep((s) => (s + 1) % GP_CURR.length), GP_HOLD);
    return () => { clearTimeout(tOut); clearTimeout(tNext); };
  }, [step]);
  const c = GP_CURR[step];
  const ph = phase === 'out' ? ' is-out' : ' is-in';
  return (
    <span className="gp-pill" aria-live="polite">
      <em className={'gp-label' + ph} key={c.key}>{c.label}<span className="gp-amt">{c.amount}</span></em>
    </span>
  );
}
function HowItWorks({ c }) {
  return (
    <section id="af-how" className="hiw-sec">
      <div className="wrap">
        <h2 className="hiw-title" data-reveal>{c.title}</h2>
        <div className="hiw-grid">
          {c.steps.map(([t, d], i) => (
            <div className="hiw-step" key={t} data-reveal data-reveal-delay={i + 1}>
              <div className="hiw-card"><img src={`media/figma/${HIW_IMG[i]}`} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} /></div>
              <h3 className="hiw-ct">{i + 1}. {t}</h3>
              <p className="hiw-cd">{d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .hiw-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .hiw-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .hiw-grid{ margin-top:clamp(34px,5.5vh,58px); display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(20px,2.2vw,32px); }
        .hiw-step{ min-width:0; }
        .hiw-card{ height:178px; border-radius:var(--r-lg); background:var(--warm-150); overflow:hidden; display:flex; align-items:center; justify-content:center; }
        .hiw-card img{ width:100%; height:100%; object-fit:cover; object-position:left center; display:block; }   /* art bleeds off the right; keep its left inset */
        .bg-grid{ --bg-cell:50px; --bg-gap:6px; --bg-inactive:0.746;
          display:grid; grid-template-columns:repeat(4,var(--bg-cell)); grid-auto-rows:var(--bg-cell); gap:var(--bg-gap);
          justify-content:center; align-content:center; }
        .bg-logo{ width:var(--bg-cell); height:var(--bg-cell); display:flex; align-items:center; justify-content:center;
          transform:scale(var(--bg-inactive)); opacity:.45; will-change:transform,opacity;
          transition:transform .384s cubic-bezier(.4,0,.2,1), opacity .384s cubic-bezier(.4,0,.2,1); }
        .bg-logo.is-active{ transform:scale(1); opacity:1;
          transition:transform .384s cubic-bezier(.34,1.26,.64,1), opacity .384s cubic-bezier(.4,0,.2,1); }
        .bg-logo img{ width:100%; height:100%; object-fit:contain; display:block; }
        @media (prefers-reduced-motion: reduce){ .bg-logo{ transform:none; opacity:1; transition:none; } }
        .hiw-card-pay{ position:relative; }
        .gp-pill{ position:absolute; left:24px; top:50%; transform:translateY(-50%);
          display:inline-flex; align-items:center; justify-content:flex-start; width:420px; flex:0 0 auto; box-sizing:border-box;
          background:#fff; border-radius:var(--r-xl); padding:18px 30px; box-shadow:0 8px 18px rgba(15,28,46,.10);
          font-family:var(--font-display); font-weight:800; font-size:32px; letter-spacing:.005em; color:var(--warm-900); white-space:nowrap; }
        .gp-label{ font-style:normal; display:inline-block; }
        .gp-amt{ color:var(--warm-300); margin-left:0.198em; }
        .gp-label.is-in{ animation:gp-in .42s cubic-bezier(.2,.7,.3,1) both; }
        .gp-label.is-out{ animation:gp-out .32s ease both; }
        @keyframes gp-in{ from{ opacity:0; transform:translateY(12px); } to{ opacity:1; transform:translateY(0); } }
        @keyframes gp-out{ from{ opacity:1; transform:translateY(0); } to{ opacity:0; transform:translateY(-12px); } }
        @media (prefers-reduced-motion: reduce){ .gp-label{ animation:none; opacity:1; transform:none; } }
        .hiw-ct{ margin-top:22px; font-family:var(--font-display); font-weight:800; font-size:21px; line-height:1.38; letter-spacing:-.02em; color:var(--warm-900); }
        .hiw-cd{ margin-top:14px; font:400 16px/1.31 var(--font-body); color:var(--warm-600); }
        @media (max-width:900px){ .hiw-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); gap:clamp(24px,3vw,32px); } }
        @media (max-width:520px){ .hiw-grid{ grid-template-columns:1fr; gap:48px; max-width:440px; } }
      `}</style>
    </section>
  );
}
/* ---------- Affiliates §4 — "Built to run at any scale." (tab view, reused from the
   Creator Partners tools section — pf-* pattern). Datafeed Manager / API / Creative Hub. ---------- */
// Keys, images and icons by index; the tab text comes from c.items.
const AFF_TOOLS = [
  { key: 'datafeed', img: 'aff-partner-slide1.png?v=2',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" /><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></svg> },
  { key: 'api', img: 'aff-partner-slide2.png?v=2',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8l-4 4 4 4" /><path d="M16 8l4 4-4 4" /><path d="M13 6l-2 12" /></svg> },
  { key: 'creative', img: 'creator-partner-slide3.png?v=2',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg> },
];
const AFF_TOOLS_CSS = `
        .pf-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; overflow:hidden; }
        .pf-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .pf-sub{ text-align:center; margin-top:14px; font-size:16px; line-height:1.4; color:var(--warm-600); }
        .pf-grid{ margin-top:clamp(40px,6vh,72px); display:grid; grid-template-columns:minmax(0,412px) 1fr; gap:clamp(32px,4vw,64px); align-items:stretch; }
        .pf-steps{ display:flex; flex-direction:column; }
        .pf-step{ position:relative; display:flex; gap:20px; align-items:stretch; text-align:left; background:none; border:none; cursor:pointer; padding:30px 0; width:100%; }
        .pf-rail-fill{ position:absolute; left:0; top:0; width:4px; border-radius:var(--r-full); background:var(--ember); height:0; }
        .pf-step-t{ display:flex; align-items:center; gap:11px; font-family:var(--font-display); font-weight:800; font-size:21px; letter-spacing:-.02em; color:var(--warm-900); }
        .pf-step.on .pf-step-d{ margin-top:12px; }
        .pf-visual{ position:relative; align-self:center; width:100%; aspect-ratio:5/3; overflow:hidden;
          border-radius:var(--r-xl);
          background:var(--warm-150); }
        .pf-img{ position:absolute; inset:0; width:100%; height:100%;
          object-fit:contain; object-position:center; opacity:0; transition:opacity .5s ease; }
        .pf-step-fig{ display:none; }
        @media (max-width:900px){
          .pf-grid{ grid-template-columns:1fr; gap:0; }
          .pf-visual{ display:none; }
          /* each step becomes a white bordered card; tap to open (no auto-advance) */
          .pf-steps{ gap:12px; }
          .pf-step{ gap:0; padding:6%; background:#fff; border:0.5px solid #D2D2CC; border-radius:var(--r-xl); }
          .pf-step + .pf-step{ border-top:0.5px solid #D2D2CC; }
          .pf-step:not(.on){ opacity:1; }
          .pf-step-t{ font-size:18px; }   /* a clear step below the 24px section title */
          .pf-rail{ display:none; }
          .pf-step-fig{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .45s ease; }
          .pf-step.on .pf-step-fig{ grid-template-rows:1fr; }
          .pf-step-fig-in{ overflow:hidden; min-height:0; }
          /* the source PNGs are bleed compositions (content offset right/down on a wide canvas),
             so crop to the readable top-left over the warm-150 panel (as on desktop) instead of squashing the whole canvas.
             No shadow: the collapsing fig clips it to a grey strip under the panel; desktop has none either. */
          .pf-step-fig-img{ display:block; width:100%; aspect-ratio:5/3; object-fit:contain; object-position:center;
            margin:18px 0 0; border-radius:var(--r-xl);
            background:var(--warm-150); }
        }`;
function AffTools({ c }) {
  const items = AFF_TOOLS.map((tool, i) => ({ ...tool, t: c.items[i][0], d: c.items[i][1] }));
  return (
    <PlatformTabs id="aff-tools" items={items} mobileCards figClass="pf-step-fig-img" css={AFF_TOOLS_CSS}
      title={c.title}
      sub={c.sub} />
  );
}
function PublisherApp() {
  useSmoothScroll();
  useScrollReveal();
  const c = useCopy('affiliates');
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <PubHero c={c.hero} />
        <BuiltKinds c={c.kinds} />
        <HowItWorks c={c.how} />
        <AffTools c={c.tools} />
        <WhyChoose c={c.why} />
        <PubVoices c={c.voices} />
        <PubFAQ c={c.faq} />
        <PubCTA c={c.cta} />
      </main>
      <Footer />
      <AppDownload />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PublisherApp />);
