/* ============================================================================
   publishers.jsx — "For Publishers" overview page.
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, PlatformTabs, FinalCta, Testimonials, Faq, AppDownload, HeroHexDeco, HERO_HEXDECO_CSS, NumberedSteps } = window;

/* ---------- Section 1 — Hero ---------------------------------------------- */
function PubHero() {
  return (
    <section id="pub-hero" className="ph-sec">
      <HeroHexDeco />
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <div className="ph-copy">
          <span className="ph-eyebrow" data-reveal>For App Owners</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Turn your app into a new revenue stream.</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="2">Show relevant offers and cashback to your users, earning that runs inside your app through our API.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="3">
            <a href="/partners/" className="btn btn-primary btn-lg">Start Earning <Arrow /></a>
          </div>
          <span className="ph-free" data-reveal data-reveal-delay="3">Free to join. Start earning today.</span>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo"><img src="media/figma/app-owners-hero.png" alt="An app showing recommended products and content that earn its owner a commission" loading="eager" /></div>
          <div className="ph-static-ui" data-reveal data-reveal-delay="2">
            <div className="ph-glass ph-g-pay-a"><div className="ph-pay"><span>Commission Earned</span><b>+ $816</b></div></div>
          </div>
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
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat;
          filter:drop-shadow(0 26px 54px rgba(15,28,46,.10)); }
        /* ---- fade slider: each slide (photo + its UI) cross-fades in/out ---- */
        .ph-slide{ position:absolute; inset:0; z-index:1; opacity:0; transition:opacity .85s cubic-bezier(.4,0,.2,1); }
        .ph-slide.is-active{ opacity:1; z-index:2; }
        @media (prefers-reduced-motion: reduce){ .ph-slide{ transition:none; } }
        .ph-photo{ position:absolute; inset:0; z-index:1;
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; }
        .ph-photo img{ width:100%; height:100%; object-fit:cover; display:block; }
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
          .ph-visual{ order:-1; max-width:420px; margin:0 auto; justify-self:center; }
          /* keep the floating UI within the hexagon so the composition stays centred */
          .ph-g-link, .ph-g-sales, .ph-g-conv{ right:0; }
          .ph-g-prod, .ph-g-pay-a, .ph-g-pay-b{ left:0; }
          .ph-g-pay-a{ top:70%; }   /* hero pill moved 15% lower on mobile */
        }
      `}</style>
    </section>
  );
}

/* ---------------- "Built for how you actually earn." — auto-advancing platform stepper ----------------
   Same interaction as the advertiser page's "One platform…" section: left tabs auto-advance on a
   timer (a fill bar tracks the dwell), each swaps the dashboard image on the right. Ember accent. */
const PUB_PLATFORM = [
  { key: 'shopping', t: 'Shopping apps', d: 'Show your users relevant products from brands they already trust, and earn a commission whenever they buy through your app.', img: 'app-stepper-shopping.png' },
  { key: 'cashback', t: 'Cashback and rewards apps', d: 'Reward your users with cashback and points on the brands they already buy, and earn a share of every qualifying purchase.', img: 'app-stepper-cashback.png' },
  { key: 'content', t: 'Content and community apps', d: 'Recommend products that fit your content and community, and earn a commission whenever your audience buys through your app.', img: 'app-stepper-content.png' },
];
const PUB_PLATFORM_CSS = `
        .pf-sec{ background:var(--warm-50); padding:clamp(77px,11.11vh,152px) 0 clamp(89px,14.28vh,191px); overflow:hidden; }
        .pf-title{ text-align:left; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .pf-sub{ text-align:left; margin-top:16px; max-width:540px; font-size:16px; line-height:1.4; color:var(--warm-600); }
        .pf-grid{ display:grid; grid-template-columns:minmax(0,1fr) minmax(290px,360px); gap:clamp(32px,5vw,80px); align-items:center; }
        .pf-left{ display:flex; flex-direction:column; }
        .pf-steps{ margin-top:clamp(26px,4vh,44px); display:flex; flex-direction:column; }
        .pf-step{ position:relative; display:flex; gap:20px; align-items:stretch; text-align:left; background:none; border:none; cursor:pointer; padding:34px 0; width:100%; }
        .pf-rail-fill{ position:absolute; left:0; top:0; width:4px; border-radius:var(--r-full); background:var(--ember); height:0; }
        .pf-step-t{ display:block; font-family:var(--font-display); font-weight:800; font-size:21px; letter-spacing:-.02em; color:var(--warm-900); transition:opacity .3s ease; }
        .pf-step.on .pf-step-d{ margin-top:14px; }
        .pf-step-d a{ color:var(--ember); font-weight:600; text-decoration:underline; text-underline-offset:2px; }
        /* contained phone-mockup card; each tab's app screen cross-fades in place */
        .pf-visual{ position:relative; width:100%; max-width:360px; margin:0 auto; aspect-ratio:692/1226; }
        .pf-img{ position:absolute; inset:0; width:100%; height:100%; object-fit:contain;
          opacity:0; transition:opacity .5s ease; filter:drop-shadow(0 24px 46px rgba(15,28,46,.14)); }
        .pf-step-fig{ display:none; }
        @media (max-width:900px){
          .pf-grid{ grid-template-columns:1fr; gap:0; }
          .pf-visual{ display:none; }
          /* each step becomes a white bordered card; tap to open (no auto-advance) */
          .pf-steps{ margin-top:clamp(22px,3vh,32px); gap:12px; }
          .pf-step{ gap:0; padding:6%; background:#fff; border:0.5px solid #D2D2CC; border-radius:var(--r-xl); }
          .pf-step + .pf-step{ border-top:0.5px solid #D2D2CC; }
          .pf-step:not(.on){ opacity:1; }
          .pf-rail{ display:none; }
          .pf-step-fig{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .45s ease; }
          .pf-step.on .pf-step-fig{ grid-template-rows:1fr; }
          .pf-step-fig-in{ overflow:hidden; min-height:0; }
          .pf-step-fig-img{ display:block; width:100%; max-width:230px; height:auto; margin:18px auto 0; filter:drop-shadow(0 16px 30px rgba(15,28,46,.14)); }
        }`;
function PubPlatform() {
  return (
    <PlatformTabs id="pub-platform" items={PUB_PLATFORM} split mobileCards figClass="pf-step-fig-img" css={PUB_PLATFORM_CSS}
      title="Built for any app with an engaged audience."
      sub="If your users act on what you show them, you can earn from it. Connect once through our API, and relevant offers and tracking run in the background." />
  );
}

/* ---------- Testimonials (shared Testimonials, ia-sections.jsx) --------- */
function PubVoices() {
  return <Testimonials />;
}

/* ---------- Section 8 — "Questions, answered." (FAQ accordion) ------------
   Copy supplied by the client. Two answers carry links (beginner guide, Express
   Withdrawal) — hrefs are placeholders pending the real URLs. Example figures
   (4.2% commission, 10 working days) are illustrative — confirm before launch. */
const PUB_FAQ = [
  ['What can the API do?',
    'Generate deeplinks, pull offers and product data, and track sales at item level. Deeplink generation is capped at 1,000 per rolling 30 days.'],
  ['Not sure what to promote in my app?',
    <>Start with the brands your users already shop. See <a href="website.html">Content sites</a> for ideas.</>],
  ['How technical is the integration?',
    'You will need a developer to connect the API. The docs cover every endpoint.'],
];
function PubFAQ() {
  return <Faq items={PUB_FAQ} />;
}

/* ---------- Final CTA (shared FinalCta, ia-sections.jsx) ----------------- */
function PubCTA() {
  return <FinalCta title="Start monetizing your app today." />;
}

/* ---------- App-owners §3 — "Earn from what your users already do." (3 cards) ---------- */
const EARN_CARDS = [
  ['app-earn-1.png', 'Earn on every sale', 'Recommend products and services your users want, and earn a commission whenever they buy.'],
  ['app-earn-2.png', 'Give cashback, build loyalty', 'Offer cashback and rewards that keep users coming back, set up once and run automatically.'],
  ['app-earn-3.png', 'Native, not intrusive', 'Blend real product recommendations into your app so they feel like part of the experience, not an ad.'],
];
function AppEarn() {
  return (
    <section id="app-earn" className="eu-sec">
      <div className="wrap">
        <h2 className="eu-title" data-reveal>Earn from what your users already do.</h2>
        <div className="eu-grid">
          {EARN_CARDS.map(([img, t, d], i) => (
            <div className="eu-card" key={t} data-reveal data-reveal-delay={i + 1}>
              <div className="eu-visual"><img src={`media/figma/${img}`} alt="" loading="lazy" /></div>
              <h3 className="eu-ct">{t}</h3>
              <p className="eu-cd">{d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .eu-sec{ background:var(--warm-50); padding:clamp(56px,9vh,110px) 0; }
        .eu-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); max-width:820px; margin:0 auto; }
        .eu-grid{ margin-top:clamp(40px,6vh,64px); display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(20px,2.6vw,32px); }
        .eu-card{ min-width:0; }
        .eu-visual{ border-radius:var(--r-xl); overflow:hidden; aspect-ratio:414/260; background:var(--warm-100); }
        .eu-visual img{ width:100%; height:100%; object-fit:cover; display:block; }
        .eu-ct{ margin-top:24px; font-family:var(--font-display); font-weight:800; font-size:21px; letter-spacing:-.01em; color:var(--warm-900); }
        .eu-cd{ margin-top:12px; font:400 16px/1.4 var(--font-body); color:var(--warm-600); }
        @media (max-width:820px){ .eu-grid{ grid-template-columns:1fr; gap:36px; max-width:440px; margin-left:auto; margin-right:auto; } }
      `}</style>
    </section>
  );
}
/* ---------- App-owners §4 — "Automated through our API." (copy + code card) ---------- */
function AppApi() {
  return (
    <section id="app-api" className="aa-sec">
      <div className="wrap">
        <div className="aa-box">
        <div className="aa-grid">
          <div className="aa-left" data-reveal>
            <h2 className="aa-title">Automated through <br />our API.</h2>
            <p className="aa-body">Connect once, and our API keeps your app stocked with the latest offers, generates your links, and tracks every conversion, so earning runs in the background while you focus on your product.</p>
            <a className="aa-link" href="#">
              API overview
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 5.5l6.5 6.5L9 18.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
          <div className="aa-code" data-reveal data-reveal-delay="1">
            <div className="aa-code-bar">
              <span className="aa-dot aa-dot-r" />
              <span className="aa-dot aa-dot-y" />
              <span className="aa-dot aa-dot-g" />
              <span className="aa-file">involve_asia_api_v2.json</span>
            </div>
            <div className="aa-code-body">
              <div className="cl"><span className="c-com">{'// Initialize connection with Involve API'}</span></div>
              <div className="cl"><span className="c-txt">GET </span><span className="c-grn">https://api.involve.asia/v2/offers</span></div>
              <div className="cl"><span className="c-txt">Authorization: Bearer ia_app_key_849204</span></div>
              <div className="aa-hr" />
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
      </div>
      <style>{`
        .aa-sec{ background:var(--warm-50); padding:clamp(56px,9vh,110px) 0; }
        .aa-box{ background:#fff; border-radius:var(--r-xl); padding:clamp(28px,3.5vw,56px); box-shadow:0 1px 3px rgba(15,28,46,.04); }
        .aa-grid{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,492px); gap:clamp(36px,5vw,80px); align-items:center; }
        .aa-left{ max-width:580px; }
        .aa-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.14; letter-spacing:-.03em; color:var(--warm-900); }
        .aa-body{ margin-top:22px; font:400 16px/1.42 var(--font-body); color:var(--warm-600); max-width:520px; }
        .aa-link{ margin-top:26px; display:inline-flex; align-items:center; gap:8px; font:700 16px/1 var(--font-body); color:var(--warm-900); text-decoration:none; }
        .aa-link svg{ transition:transform .2s ease; }
        .aa-link:hover svg{ transform:translateX(3px); }
        .aa-code{ background:#1e1e1e; border-radius:var(--r-xl); padding:clamp(20px,2vw,27px); box-shadow:0 12px 13px rgba(0,0,0,.15); }
        .aa-code-bar{ display:flex; align-items:center; gap:7px; }
        .aa-dot{ width:10px; height:10px; border-radius:50%; flex:none; }
        .aa-dot-r{ background:#ff5f56; } .aa-dot-y{ background:#ffbd2e; } .aa-dot-g{ background:#27c93f; }
        .aa-file{ margin-left:8px; font:400 10px/1 var(--font-body); color:#7f7f7f; }
        .aa-code-body{ margin-top:17px; font-family:ui-monospace,"SF Mono",Menlo,Consolas,monospace; font-size:11.9px; line-height:17px; overflow-x:auto; }
        .aa-code-body .cl{ white-space:pre; color:#f8f8f2; }
        .aa-hr{ height:1px; background:rgba(255,255,255,.12); margin:6px 0; }
        .c-com{ color:#75715e; } .c-txt{ color:#f8f8f2; } .c-grn{ color:#a6e22e; } .c-cyan{ color:#66d9ef; } .c-yel{ color:#e6db74; } .c-pur{ color:#ae81ff; }
        @media (max-width:820px){ .aa-grid{ grid-template-columns:minmax(0,1fr); gap:32px; } }
      `}</style>
    </section>
  );
}
/* ---------- App-owners §4b — "How you earn." (3 numbered steps) — Figma 2546:45558 ---------- */
const HIW_STEPS = [
  ['01', 'Connect the API', 'Integrate once, and pull offers, links, and tracking straight into your app.'],
  ['02', 'Surface relevant offers', 'Show cashback and deals your users actually want, inside your own UI.'],
  ['03', 'Earn on every sale', 'When a user buys through your app, the sale is tracked to you.'],
  ['04', 'Get paid', 'Withdraw in your local currency once sales are validated, or sooner with Express Withdrawal.'],
];
function HowItWorks() {
  return <NumberedSteps id="ao-how" title="How you earn." steps={HIW_STEPS} />;
}
/* ---------- App-owners §4c — "Why app owners build on Involve." (3 icon columns) ---------- */
const WB_ICONS = {
  app: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><line x1="10" y1="18.5" x2="14" y2="18.5" /></svg>,
  brands: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 12l9 5 9-5" /><path d="M3 16.5l9 5 9-5" /></svg>,
  dev: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="8 7.5 3.5 12 8 16.5" /><polyline points="16 7.5 20.5 12 16 16.5" /></svg>,
};
const WHY_BUILD = [
  ['app', 'Your app, your experience.', 'Offers live inside your own UI. You control how they look and where they appear.'],
  ['brands', 'One integration, hundreds of brands.', 'Connect once to access 500+ brands and 4,000+ offers.'],
  ['dev', 'Built for developers.', 'Clear API docs, item-level tracking, and reliable payouts.'],
];
function WhyBuild() {
  return (
    <section id="ao-why" className="wb-sec">
      <div className="wrap">
        <h2 className="wb-title" data-reveal>Why app owners build on Involve.</h2>
        <div className="wb-grid">
          {WHY_BUILD.map(([ic, t, d], i) => (
            <div className="wb-item" key={t} data-reveal data-reveal-delay={i + 1}>
              <span className="wb-ic">{WB_ICONS[ic]}</span>
              <h3 className="wb-ct">{t}</h3>
              <p className="wb-cd">{d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .wb-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .wb-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .wb-grid{ margin-top:clamp(34px,5vh,54px); display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(28px,4vw,56px); }
        .wb-item{ min-width:0; }
        .wb-ic{ display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:var(--r-xl); background:rgba(240,88,38,.12); color:var(--ember); }
        .wb-ic svg{ width:24px; height:24px; display:block; }
        .wb-ct{ margin-top:20px; font-family:var(--font-display); font-weight:800; font-size:20px; letter-spacing:-.01em; color:var(--warm-900); }
        .wb-cd{ margin-top:8px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:340px; }
        @media (max-width:760px){ .wb-grid{ grid-template-columns:1fr; max-width:440px; margin-inline:auto; gap:clamp(24px,4vh,34px); } }
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
        <PubPlatform />
        <HowItWorks />
        <AppEarn />
        <AppApi />
        <WhyBuild />
        <PubVoices />
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
