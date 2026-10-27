/* ============================================================================
   publishers.jsx — "For Publishers" overview page.
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, FinalCta, Faq, AppDownload, HeroHexDeco, HERO_HEXDECO_CSS, NumberedSteps, IconColumns } = window;

/* ---------- Section 1 — Hero ---------------------------------------------- */
function PubHero() {
  return (
    <section id="pub-hero" className="ph-sec">
      <HeroHexDeco />
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <div className="ph-copy">
          <span className="ph-eyebrow" data-reveal>For Agencies</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Run affiliate for every client from one platform</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="2">You don't need an audience of your own. Manage campaigns for multiple clients in one place, with the brands, tracking, and reporting to run them all.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="3">
            <span className="ph-act">
              <a href="https://app.involve.asia/v2/create-account" className="btn btn-primary btn-lg">Sign up free <Arrow /></a>
              <span className="ph-act-note">Free to join. Get API access in ~48 hours.</span>
            </span>
          </div>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo ph-photo-fill"><img src="media/figma/hero-image-agencies.png" alt="Agency dashboard managing multiple client affiliate campaigns" loading="eager" /></div>
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
        .ph-eyebrow{ display:inline-block; font:600 13px/1 var(--font-body); letter-spacing:.02em; color:var(--ember);
          background:rgba(240,88,38,.10); border-radius:var(--r-full); padding:8px 15px; }
        .ph-title{ margin-top:20px; font-size:clamp(28px,4.4vw,50px); line-height:1.0; letter-spacing:-.03em; color:var(--warm-900); }
        .ph-sub{ margin-top:20px; max-width:520px; font-size:clamp(16px,1.4vw,19px); line-height:1.55; color:var(--warm-600); }
        .ph-actions{ margin-top:30px; display:flex; gap:clamp(16px,2vw,28px); flex-wrap:wrap; align-items:flex-start; }
        .ph-act{ display:flex; flex-direction:column; gap:10px; align-items:flex-start; }
        .ph-act .btn{ align-self:stretch; }
        .ph-act-note{ font:500 13px/1.4 var(--font-body); color:var(--warm-400); max-width:230px; }
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
          .ph-actions{ justify-content:center; }
          .ph-act{ align-items:center; }
          .ph-act-note{ text-align:center; }
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
  ['Can I manage more than one client?',
    'Yes. Run all your clients from one account and separate each with sub-IDs, or hold a separate account per client for clean billing. Either way, the API lets you pull the data into your own reporting.'],
  ['Do I need my own audience or traffic?',
    <>No. This path is for agencies running affiliate activity for clients, not for monetising your own audience — if that's you, see the <a href="for-publishers.html">five publisher types</a> instead.</>],
  ['How do we integrate technically?',
    <>Through our Publisher API — pull offers, generate deeplinks, and sync conversions (with sub-ID breakdowns per client). See the <a href="api-overview.html">API page</a> for the endpoints and docs.</>],
  ["How do we keep each client's performance separate?",
    'Use sub-IDs to tag and report activity per client, or run a separate account per client — whichever fits how you bill.'],
];
const PUB_FAQ_CSS = `
        .fq-xlinks{ margin:clamp(28px,4vh,44px) auto 0; max-width:1160px; text-align:center; font:400 15px/1.6 var(--font-body); color:var(--warm-600); }
        .fq-xlinks a{ color:var(--ember); font-weight:600; text-decoration:underline; text-underline-offset:2px; }
        .fq-xlinks a:hover{ opacity:.82; }
      `;
function PubFAQ() {
  return (
    <Faq items={PUB_FAQ} css={PUB_FAQ_CSS}
      after={<React.Fragment>
        <p className="fq-xlinks" data-reveal>Need the technical detail? <a href="api-overview.html">See the API page</a>. Have your own audience to monetise? <a href="for-publishers.html">See the five publisher types</a>.</p>
      </React.Fragment>} />
  );
}

/* ---------- Final CTA (shared FinalCta, ia-sections.jsx) ----------------- */
function PubCTA() {
  return <FinalCta title="Run affiliate for every client, from one platform." label="Sign up free" />;
}

/* ---------- Affiliates §3 — "Why affiliate sites choose Involve." (4 icon columns) ---------- */
const AFF_WHY = [
  { t: 'Sign up and get API access', d: 'Register free, request your API key, and start activating offers and generating trackable links for your clients.',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 12l9 5 9-5" /><path d="M3 16.5l9 5 9-5" /></svg> },
  { t: 'Separate clients with sub-IDs', d: 'Tag activity by client and see conversions broken out per client.',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="6" rx="7.5" ry="3" /><path d="M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6" /><path d="M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" /></svg> },
  { t: 'Talk to us to scale', d: 'Our team helps you pick the right setup — one account with sub-IDs for a combined view, or a separate account per client — and gets you running.',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 14.5l2 2 4-4" /></svg> },
];
function WhyChoose() {
  return (
    <IconColumns id="aff-why" title="How it works." items={AFF_WHY} />
  );
}
/* ---------- Affiliates §4 — "Scale with bulk tools and our API." (copy + code card) ---------- */
function ScaleApi() {
  return (
    <section id="aff-api" className="sa-sec">
      <div className="wrap">
        <div className="sa-grid">
          <div className="sa-left" data-reveal>
            <h2 className="sa-title">The API for integration.</h2>
            <p className="sa-body">Pull offers, generate trackable deeplinks, and sync conversion data into your own systems and client dashboards. See the API page for endpoints and docs.</p>
            <a className="sa-link" href="api-overview.html">
              API overview
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 5.5l6.5 6.5L9 18.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
          <div className="sa-code" data-reveal data-reveal-delay="1">
            <div className="sa-code-bar">
              <span className="sa-dot sa-dot-r" />
              <span className="sa-dot sa-dot-y" />
              <span className="sa-dot sa-dot-g" />
              <span className="sa-file">involve_asia_api_v2.json</span>
            </div>
            <div className="sa-code-body">
              <div className="cl"><span className="c-com">{'// Initialize connection with Involve API'}</span></div>
              <div className="cl"><span className="c-txt">GET </span><span className="c-grn">https://api.involve.asia/v2/offers</span></div>
              <div className="cl"><span className="c-txt">Authorization: Bearer ia_app_key_849204</span></div>
              <div className="sa-hr" />
              <div className="cl"><span className="c-com">{'// JSON Response'}</span></div>
              <div className="cl"><span className="c-cyan">{'{'}</span></div>
              <div className="cl"><span className="c-txt">{'  "status": '}</span><span className="c-yel">"active"</span><span className="c-txt">,</span></div>
              <div className="cl"><span className="c-txt">{'  "cashback_rate_pct": '}</span><span className="c-pur">12.0</span><span className="c-txt">,</span></div>
              <div className="cl"><span className="c-txt">{'  "commission_share": '}</span><span className="c-pur">0.08</span></div>
              <div className="cl"><span className="c-cyan">{'}'}</span></div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .sa-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .sa-grid{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,492px); gap:clamp(36px,5vw,80px); align-items:center; }
        .sa-left{ max-width:520px; }
        .sa-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.14; letter-spacing:-.03em; color:var(--warm-900); }
        .sa-body{ margin-top:22px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:500px; }
        .sa-link{ margin-top:26px; display:inline-flex; align-items:center; gap:8px; font:700 16px/1 var(--font-body); color:var(--warm-900); text-decoration:none; }
        .sa-link svg{ transition:transform .2s ease; }
        .sa-link:hover svg{ transform:translateX(3px); }
        .sa-code{ background:#1e1e1e; border-radius:var(--r-xl); padding:clamp(20px,2vw,27px); box-shadow:0 24px 50px rgba(15,28,46,.22); }
        .sa-code-bar{ display:flex; align-items:center; gap:7px; }
        .sa-dot{ width:10px; height:10px; border-radius:50%; flex:none; }
        .sa-dot-r{ background:#ff5f56; } .sa-dot-y{ background:#ffbd2e; } .sa-dot-g{ background:#27c93f; }
        .sa-file{ margin-left:8px; font:400 10px/1 var(--font-body); color:#7f7f7f; }
        .sa-code-body{ margin-top:17px; font-family:ui-monospace,"SF Mono",Menlo,Consolas,monospace; font-size:11.9px; line-height:17px; overflow-x:auto; }
        .sa-code-body .cl{ white-space:pre; color:#f8f8f2; }
        .sa-hr{ height:1px; background:rgba(255,255,255,.12); margin:6px 0; }
        .c-com{ color:#75715e; } .c-txt{ color:#f8f8f2; } .c-grn{ color:#a6e22e; } .c-cyan{ color:#66d9ef; } .c-yel{ color:#e6db74; } .c-pur{ color:#ae81ff; }
        @media (max-width:820px){ .sa-grid{ grid-template-columns:minmax(0,1fr); gap:32px; } }
      `}</style>
    </section>
  );
}
/* ---------- Affiliates §4b — "How it works" (3 numbered steps) — Figma 2546:45012 ---------- */
const HIW_STEPS = [
  ['01', 'Access to the catalogue', '500+ brands and 4,000+ offers to activate for any client.'],
  ['02', 'One place for every client', "Run and track each client's campaigns without juggling separate tools."],
  ['03', 'Consolidated tracking and reporting', "See every client's performance in one account, separated cleanly with sub-IDs — or pull it all into your own dashboard through the API."],
];
function HowItWorks() {
  return <NumberedSteps id="af-how" title="What you get." steps={HIW_STEPS} cols={3} />;
}
function PublisherApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <PubHero />
        <HowItWorks />
        <ScaleApi />
        <WhyChoose />
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
