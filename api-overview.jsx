/* ============================================================================
   publishers.jsx — "For Publishers" overview page.
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, FinalCta, Faq, AppDownload, HeroHexDeco, HERO_HEXDECO_CSS } = window;

/* ---------- Section 1 — Hero ---------------------------------------------- */
function PubHero() {
  return (
    <section id="pub-hero" className="ph-sec">
      <HeroHexDeco />
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <div className="ph-copy">
          <span className="ph-eyebrow" data-reveal>Developer API</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Build and automate with the Involve Asia Developer API.</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="1">Pull promotions, generate tracking links, and get your reports, all without logging into the dashboard. Bring affiliate earning into your own app or workflow.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="2">
            <a href="/partners/" className="btn btn-primary btn-lg">Apply for an API Key <Arrow /></a>
            <a href="https://api.involve.asia/docs/" className="btn btn-secondary btn-lg">Read the API docs <Arrow /></a>
          </div>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo ph-photo-fill"><img src="media/figma/api-overview-hero-image.png" alt="Involve Asia API code example: authenticate, list offers, and generate a deeplink" loading="eager" /></div>
        </div>
      </div>

      <style>{`
        .ph-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(40px,6vh,84px) 0 clamp(56px,9vh,116px); }
        ${HERO_HEXDECO_CSS}
        /* gradient blend from the hero into the logo strip below */
        .ph-basefade{ position:absolute; left:0; right:0; bottom:0; height:clamp(120px,24%,240px); z-index:0; pointer-events:none;
          background:linear-gradient(180deg, rgba(250,250,248,0) 0%, rgba(250,250,248,.65) 55%, var(--warm-50) 100%); }
        .ph-wrap{ position:relative; z-index:1; display:grid; grid-template-columns:1.02fr .98fr; gap:clamp(24px,4vw,60px); align-items:center; }
        /* copy */
        .ph-copy{ min-width:0; }
        .ph-eyebrow{ display:inline-block; font:700 14px/1 var(--font-body); letter-spacing:-.01em; color:var(--warm-900); }
        .ph-title{ margin-top:16px; font-size:clamp(28px,4.4vw,50px); line-height:1.0; letter-spacing:-.03em; color:var(--warm-900); }
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
        .ph-hexplate{ position:absolute; inset:0; z-index:0; background:var(--warm-100);
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; }
        /* hero visual: code-editor card pre-masked to the hexagon (transparent PNG), sits over the hex plate */
        .ph-heroimg{ position:absolute; inset:0; z-index:2; }
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
        .ph-photo-fill img{ object-fit:contain; transform:scale(1.04); transform-origin:60% 66%; }
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
        .ph-g-pay-a{ left:-7%; top:55%; }
        .ph-g-pay-b{ left:-8%; top:26%; }
        .ph-slide.is-active .ph-slide-ui > .ph-g-pay-b{ opacity:.62; }   /* second payout sits behind, fainter */
        /* single-image hero: static floating pill (above the photo, no slider fade) */
        .ph-static-ui{ position:absolute; inset:0; z-index:3; pointer-events:none; }
        /* inner white cards / pills */
        .ph-link{ display:inline-flex; align-items:center; gap:9px; background:#fff; border-radius:var(--r-full); padding:9px 16px 9px 9px;
          box-shadow:0 2px 6px rgba(15,28,46,.08); font:600 14px/1 var(--font-body); color:var(--warm-900); white-space:nowrap; }
        .ph-link-ic{ display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:var(--r-full);
          background:var(--warm-100); color:var(--warm-700); flex:0 0 auto; }
        .ph-prod-lbl{ display:block; font:500 11px/1.3 var(--font-body); color:#fff; text-shadow:0 3px 8px rgba(0,0,0,.35); margin:1px 2px 7px; }
        .ph-prod-img{ width:100%; aspect-ratio:1/1; object-fit:cover; border-radius:var(--r-lg); display:block; }
        .ph-stat{ background:#fff; border-radius:var(--r-xl); box-shadow:0 2px 6px rgba(15,28,46,.08); padding:12px 15px; display:flex; flex-direction:column; gap:4px; }
        .ph-stat-lbl{ display:inline-flex; align-items:center; gap:6px; font:600 12px/1.2 var(--font-body); color:var(--warm-900); }
        .ph-stat-cur{ display:inline-flex; align-items:center; justify-content:center; width:16px; height:16px; border-radius:var(--r-sm); background:var(--warm-100); font:700 10px/1 var(--font-body); color:var(--warm-800); }
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
          /* two CTAs side by side — 2-column, like the homepage hero */
          .ph-actions{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px 12px; width:100%; max-width:420px; margin-inline:auto; }
          .ph-actions .btn{ width:100%; justify-content:center; padding:13px 10px; font-size:13px; }
          .ph-visual{ order:-1; max-width:420px; margin:0 auto; justify-self:center; }
          /* keep the floating UI within the hexagon so the composition stays centred */
          .ph-g-link, .ph-g-sales, .ph-g-conv{ right:0; }
          .ph-g-prod, .ph-g-pay-a, .ph-g-pay-b{ left:0; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 8 — "Questions, answered." (FAQ accordion) ------------
   Copy supplied by the client. Two answers carry links (beginner guide, Express
   Withdrawal) — hrefs are placeholders pending the real URLs. Example figures
   (4.2% commission, 10 working days) are illustrative — confirm before launch. */
const PUB_FAQ = [
  ['What does the API do?',
    'Build an affiliate app, or add affiliate capabilities to your own platform, populate reports, generate links, access ready-made campaign banners and landing pages, and pull promotional content.'],
  ['Who can use it?',
    'Media buyers, KOL agencies, programmatic and affiliate networks, cashback, and content sites.'],
  ['How many links can I generate?',
    'Up to 1,000 unique links per rolling 30-day window.'],
  ['Which tools can I use?',
    'Postman, cURL, Insomnia, SoapUI, Paw, or any tool that fits your stack.'],
  ['How do I track performance?',
    'Pull the performance report through the API, including individual transactions and custom parameters.'],
  ['What do I need?',
    'A team member with programming experience to set it up.'],
];
function PubFAQ() {
  return <Faq items={PUB_FAQ} />;
}

/* ---------- Final CTA (shared FinalCta, ia-sections.jsx) ----------------- */
function PubCTA() {
  return <FinalCta title="Start building with the API." label="Apply for an API Key" />;
}

/* ---------- API §2 — "Automate the work, scale your earnings." (4 cards) ---------- */
const AUTO_CARDS = [
  ['api-auto-1.png', 'Get the latest promotion data', 'Commission rates and payout terms for every offer you have access to.'],
  ['api-auto-2.png', 'Generate tracking links', 'Turn product URLs into trackable deeplinks through the API, up to 1,000 unique links every 30 days.'],
  ['api-auto-3.png', 'Pull performance reports', 'Conversions and earnings, in your own format.'],
  ['api-auto-4.png', 'Get campaign banners and vouchers', 'Ready-made creatives and seasonal deals.'],
];
function AutoWork() {
  return (
    <section id="api-auto" className="aw-sec">
      <div className="wrap">
        <h2 className="aw-title" data-reveal>Automate the work, scale your earnings.</h2>
        <div className="aw-grid">
          {AUTO_CARDS.map(([img, t, d], i) => (
            <div className="aw-card" key={t} data-reveal data-reveal-delay={(i % 3) + 1}>
              <div className="aw-visual"><img src={`media/figma/${img}`} alt="" loading="lazy" /></div>
              <h3 className="aw-ct">{t}</h3>
              <p className="aw-cd">{d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .aw-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .aw-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .aw-grid{ margin-top:clamp(34px,5vh,54px); display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(18px,2vw,26px); }
        .aw-card{ min-width:0; }
        .aw-visual{ border-radius:var(--r-xl); overflow:hidden; aspect-ratio:290/177; background:var(--warm-100); }
        .aw-visual img{ width:100%; height:100%; object-fit:cover; display:block; }
        .aw-ct{ margin-top:18px; font-family:var(--font-display); font-weight:800; font-size:18px; letter-spacing:-.01em; color:var(--warm-900); }
        .aw-cd{ margin-top:8px; font:400 15px/1.4 var(--font-body); color:var(--warm-600); }
        @media (max-width:900px){ .aw-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); gap:26px 22px; } }
        @media (max-width:540px){ .aw-grid{ grid-template-columns:1fr; max-width:360px; margin-inline:auto; } }
      `}</style>
    </section>
  );
}
/* ---------- API §3 — "Boosted commissions on Shopee, built in." (promo band) ---------- */
function ShopeeBand() {
  return (
    <section id="api-shopee" className="sb-sec">
      <div className="wrap">
        <div className="sb-card" data-reveal>
          <div className="sb-body">
            <h2 className="sb-title">Boosted commissions on Shopee, built in.</h2>
            <p className="sb-desc">Some Shopee brands pay boosted rates through Commissions XTRA. Pull the full list through the API and refresh it automatically, so you always know which Shopee shops are paying more, and promote them first.</p>
            <a href="shopee-commissions-xtra.html" className="sb-link">Learn More <Arrow /></a>
          </div>
          <div className="sb-visual"><img src="media/figma/api-shopee-xtra.png" alt="Shopee Commissions XTRA" loading="lazy" /></div>
        </div>
      </div>
      <style>{`
        .sb-sec{ background:var(--warm-50); padding:clamp(8px,2vh,24px) 0 clamp(40px,7vh,88px); }
        .sb-card{ background:#fff; border-radius:var(--r-xl); box-shadow:0 1px 3px rgba(15,28,46,.05); padding:clamp(28px,4vw,56px); display:grid; grid-template-columns:1fr minmax(0,392px); gap:clamp(28px,4vw,56px); align-items:center; overflow:hidden; }
        .sb-body{ max-width:560px; }
        .sb-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(22px,2.6vw,32px); line-height:1.14; letter-spacing:-.02em; color:var(--warm-900); }
        .sb-desc{ margin-top:16px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        .sb-link{ margin-top:20px; display:inline-flex; align-items:center; gap:7px; font:700 15px/1 var(--font-body); color:var(--ember); }
        .sb-link svg{ width:16px; height:16px; transition:transform .2s ease; }
        .sb-link:hover svg{ transform:translateX(3px); }
        .sb-visual img{ width:100%; height:auto; border-radius:var(--r-xl); display:block; }
        @media (max-width:820px){ .sb-card{ grid-template-columns:1fr; gap:28px; } .sb-visual{ max-width:420px; } }
      `}</style>
    </section>
  );
}
/* ---------- API §4 — "Built for teams that build" (category grid) ---------- */
const TEAM_CATS = [
  ['Product & app teams', 'Surface offers and cashback inside your own app or platform, and earn on what your users buy.'],
  ['High-volume publishers', 'Generate tracking links and sync conversions programmatically, without touching the dashboard.'],
  ['Data-driven teams', 'Pull offers, conversions, and product feeds into your own systems and reporting.'],
];
function BuiltTeams() {
  return (
    <section id="api-teams" className="bt-sec">
      <div className="wrap">
        <div className="bt-grid">
          <div className="bt-head" data-reveal>
            <h2 className="bt-title">Who builds with the API</h2>
            <p className="bt-sub">For teams that run affiliate data and links inside their own systems, through automation.</p>
          </div>
          <div className="bt-cats" data-reveal data-reveal-delay="1">
            {TEAM_CATS.map(([t, d]) => (
              <div className="bt-cat" key={t}>
                <span className="bt-cat-t">{t}</span>
                <span className="bt-cat-d">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .bt-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .bt-grid{ display:grid; grid-template-columns:minmax(0,360px) 1fr; gap:clamp(32px,5vw,72px); align-items:start; }
        .bt-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .bt-sub{ margin-top:16px; font:400 16px/1.45 var(--font-body); color:var(--warm-600); max-width:340px; }
        .bt-cats{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(22px,3vw,38px) clamp(20px,2.5vw,32px); }
        .bt-cat{ display:flex; flex-direction:column; gap:6px; }
        .bt-cat-t{ font-family:var(--font-display); font-weight:800; font-size:16px; letter-spacing:-.01em; color:var(--warm-900); }
        .bt-cat-d{ font:400 14px/1.35 var(--font-body); color:var(--warm-400); }
        @media (max-width:900px){ .bt-grid{ grid-template-columns:1fr; gap:32px; } .bt-cats{ grid-template-columns:repeat(2,1fr); gap:26px 20px; } }
      `}</style>
    </section>
  );
}
/* ---------- API §5 — "Get started in three steps" ---------- */
const START_STEPS = [
  { t: 'Request your API key', d: 'Request your API key from your dashboard.', cta: true,
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12V6.5a1.8 1.8 0 0 1 3.6 0V11m0-.5a1.8 1.8 0 0 1 3.6 0V12m0-.8a1.8 1.8 0 0 1 3.6 0v3.8a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-5.2-3l-1.9-3.3a1.8 1.8 0 0 1 3.1-1.8L8 12" /></svg> },
  { t: 'Add the key to your tool', d: 'Add the key to your API tool (Postman, cURL, Insomnia, and more).', cta: false,
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M12 11.5v4M10 13.5h4" /></svg> },
  { t: 'Follow documentation', d: 'Follow the documentation to pull data, generate links, and build.', cta: false,
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 14.5l2 2 4-4" /></svg> },
];
function GetStarted() {
  return (
    <section id="api-start" className="gs-sec">
      <div className="wrap">
        <h2 className="gs-title" data-reveal>Get started in three steps</h2>
        <div className="gs-grid">
          {START_STEPS.map((s, i) => (
            <div className="gs-step" key={s.t} data-reveal data-reveal-delay={i + 1}>
              <span className="gs-ic" aria-hidden="true">{s.ic}</span>
              <h3 className="gs-st">{s.t}</h3>
              <p className="gs-sd">{s.d}</p>
              {s.cta && <a href="/partners/" className="btn btn-primary gs-cta">Apply here <Arrow /></a>}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .gs-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .gs-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .gs-grid{ margin-top:clamp(36px,5vh,56px); display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(28px,4vw,56px); }
        .gs-step{ display:flex; flex-direction:column; align-items:flex-start; }
        .gs-ic{ width:46px; height:46px; border-radius:var(--r-xl); background:var(--ember-tint); color:var(--ember); display:flex; align-items:center; justify-content:center; }
        .gs-ic svg{ width:23px; height:23px; }
        .gs-st{ margin-top:20px; font-family:var(--font-display); font-weight:800; font-size:20px; letter-spacing:-.01em; color:var(--warm-900); }
        .gs-sd{ margin-top:10px; font:400 16px/1.45 var(--font-body); color:var(--warm-600); max-width:320px; }
        .gs-cta{ margin-top:20px; }
        @media (max-width:820px){ .gs-grid{ grid-template-columns:1fr; gap:34px; max-width:420px; margin-inline:auto; } .gs-title{ text-align:left; } }
      `}</style>
    </section>
  );
}
function PublisherApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <PubHero />
        <AutoWork />
        <ShopeeBand />
        <BuiltTeams />
        <GetStarted />
        <PubFAQ />
        <PubCTA />
      </main>
      <Footer />
      <AppDownload />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PublisherApp />);
