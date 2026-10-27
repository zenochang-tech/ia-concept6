/* ============================================================================
   publishers.jsx — "For Publishers" overview page.
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, PlatformTabs, FinalCta, Testimonials, PUB_VOICES, Faq, AppDownload, HeroHexDeco, HERO_HEXDECO_CSS } = window;

/* ---------- Section 1 — Hero ---------------------------------------------- */
function PubHero() {
  return (
    <section id="pub-hero" className="ph-sec">
      <HeroHexDeco />
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <div className="ph-copy">
          <span className="ph-eyebrow" data-reveal>For Technology Partners</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Turn the product you've built into revenue.</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="2">Whether you run an app, a web platform, or your own software, integrate once and earn when your users act on the offers and cashback you surface, all through our API.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="3">
            <a href="/partners/" className="btn btn-primary btn-lg">Start Earning <Arrow /></a>
          </div>
          <span className="ph-free" data-reveal data-reveal-delay="3">Free to join. Start earning today.</span>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo ph-photo-fill"><img src="media/figma/tech-partner-hero-img.png?v=2" alt="A technology partner integrating Involve offers into their own product" loading="eager" /></div>
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
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; }
        /* ---- fade slider: each slide (photo + its UI) cross-fades in/out ---- */
        .ph-slide{ position:absolute; inset:0; z-index:1; opacity:0; transition:opacity .85s cubic-bezier(.4,0,.2,1); }
        .ph-slide.is-active{ opacity:1; z-index:2; }
        @media (prefers-reduced-motion: reduce){ .ph-slide{ transition:none; } }
        .ph-photo{ position:absolute; inset:0; z-index:1;
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; }
        .ph-photo img{ width:100%; height:100%; object-fit:cover; display:block; }
        /* creator photo floats with transparent margins; scale it up (clipped to the hexagon by
           the .ph-photo mask) so it fills the hexagon like the express-withdrawal photo */
        .ph-photo-fill img{ object-fit:contain; transform:scale(1.04); transform-origin:50% 54%; }
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
        .ph-g-pay-a{ right:-6%; top:10%; }
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
          .ph-g-link, .ph-g-sales, .ph-g-conv, .ph-g-pay-a{ right:0; }
          .ph-g-prod, .ph-g-pay-b{ left:0; }
          .ph-g-pay-a{ top:2%; }          /* hero pill moved 8% up on mobile */
          .ph-g-pay-a .ph-pay b{ font-size:13.5px; }   /* number font -10% on mobile */
        }
      `}</style>
    </section>
  );
}

/* ---------- Testimonials (shared Testimonials, ia-sections.jsx) --------- */
// Shared list, but this page punctuates the Siakap Keli pull-quote without the dash.
const VOICES = PUB_VOICES.map((v) => (v.name === 'Siakap Keli' ? { ...v, quote: 'Such a good overall experience with IA, very friendly & professional.' } : v));
function PubVoices() {
  return <Testimonials items={VOICES} />;
}

/* ---------- Section 8 — "Questions, answered." (FAQ accordion) ------------
   Copy supplied by the client. Two answers carry links (beginner guide, Express
   Withdrawal) — hrefs are placeholders pending the real URLs. Example figures
   (4.2% commission, 10 working days) are illustrative — confirm before launch. */
const PUB_FAQ = [
  ['What can the API do?',
    'Generate deeplinks, pull offers and product data, and track sales at item level. Deeplink generation is capped at 1,000 per rolling 30 days.'],
  ['How does postback work?',
    'When a conversion is created or updated, we send the data to a URL you configure, so your system is notified in real time. You handle the received data on your own server.'],
  ['Can I pull a product datafeed?',
    'Yes. Pull live product data per advertiser to surface in your product. Feeds vary by advertiser.'],
  ['How technical is the integration?',
    "You'll need a developer to set up the API and postback, but the docs are clear and the endpoints are simple."],
  ['What kind of products qualify?',
    'Apps, web apps, software, and platforms with their own users.'],
];
function PubFAQ() {
  return <Faq items={PUB_FAQ} />;
}

/* ---------- Final CTA (shared FinalCta, ia-sections.jsx) ----------------- */
function PubCTA() {
  return <FinalCta title="Turn your product into revenue." />;
}

/* ---------- CC §2 — "Made for TikTok, YouTube, Instagram, and more." ---------- */
const MADE_POINTS = [
  ['Runs inside your own product.', 'One API integration puts offers, links, and tracking inside your app, web platform, or software, all in your own UI and on your own terms.'],
  ['Real-time, hands-off.', 'Postback pushes every conversion to your server the moment it happens, so your systems stay in sync without anyone logging in to check.'],
];
/* Animated "Built for teams that build" visual (from the Figma storyboard): the
   partner app phone sits centred in a tinted square (same box as the creator page),
   and coded cards reveal in a looping sequence.
   Phase A: API card types in BEHIND the phone, then the datafeed card slides in.
   Phase B: Postback URL card, then the conversion card (check + title first, then
   the details expand). Reduced motion shows a static resting state. */
const BV_CODE = 'GET /v2/offers\n200 OK {\n  "commission": 8.0,\n  "status": "active"\n}';
const BV_FEED = [
  { img: 'df-prod-1.png', n: 'N°04 Silk Satin Shirt', p: '$780' },
  { img: 'df-prod-2.png', n: 'N°22 Calfskin Frame Bag', p: '$2,400' },
  { img: 'df-prod-3.png', n: 'N°11 Wool Crepe Blazer', p: '$1,600' },
];
function BuiltViz() {
  const reduced = prefersReduced();
  const [s, setS] = React.useState({ api: false, type: 0, feed: false, post: false, convT: false, convD: false });
  React.useEffect(() => {
    if (reduced) { setS({ api: true, type: BV_CODE.length, feed: true, post: false, convT: false, convD: false }); return; }
    let alive = true;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      while (alive) {
        setS({ api: false, type: 0, feed: false, post: false, convT: false, convD: false });
        await sleep(450); if (!alive) return;
        setS((v) => ({ ...v, api: true })); await sleep(560); if (!alive) return;   // API card in (behind phone)
        for (let i = 1; i <= BV_CODE.length; i++) { if (!alive) return; setS((v) => ({ ...v, type: i })); await sleep(26); }  // typing
        await sleep(480); if (!alive) return;
        setS((v) => ({ ...v, feed: true })); await sleep(2900); if (!alive) return; // datafeed in + hold
        setS((v) => ({ ...v, api: false, feed: false })); await sleep(700); if (!alive) return;
        setS((v) => ({ ...v, post: true })); await sleep(1500); if (!alive) return; // postback in
        setS((v) => ({ ...v, convT: true })); await sleep(780); if (!alive) return; // conversion check + title
        setS((v) => ({ ...v, convD: true })); await sleep(2900); if (!alive) return; // details expand + hold
        setS((v) => ({ ...v, post: false, convT: false, convD: false })); await sleep(700);
      }
    })();
    return () => { alive = false; };
  }, [reduced]);
  const done = s.type >= BV_CODE.length;
  return (
    <div className="bv" aria-hidden="true">
      {/* API card — sits BEHIND the phone, text types in */}
      <div className={'bv-card bv-api' + (s.api ? ' in' : '')}>
        <div className="bv-dots"><i /><i /><i /></div>
        {done ? (
          <div className="bv-code">
            <div><span className="c-mut">GET</span> <span className="c-str">/v2/offers</span></div>
            <div><span className="c-ok">200 OK</span> {'{'}</div>
            <div className="bv-ind"><span className="c-key">"commission"</span>: <span className="c-num">8.0</span>,</div>
            <div className="bv-ind"><span className="c-key">"status"</span>: <span className="c-str">"active"</span></div>
            <div>{'}'}</div>
          </div>
        ) : (
          <pre className="bv-code bv-typing">{BV_CODE.slice(0, s.type)}<span className="bv-caret" /></pre>
        )}
      </div>

      {/* Phone — always on, in front of the API card */}
      <div className="bv-phone"><img src="media/figma/ready-to-wear-mockup.png" alt="A fashion store app with Involve offers and tracking built in" loading="lazy" /></div>

      {/* Datafeed card (bottom-right) */}
      <div className={'bv-card bv-feed' + (s.feed ? ' in' : '')}>
        <div className="bv-feed-h">Live datafeed</div>
        {BV_FEED.map((it) => (
          <div className="bv-row" key={it.n}><span className="bv-thumb"><img src={`media/figma/${it.img}`} alt="" loading="lazy" /></span><span className="bv-row-n">{it.n}</span><span className="bv-row-p">{it.p}</span></div>
        ))}
      </div>

      {/* Postback card (top-right) */}
      <div className={'bv-card bv-post' + (s.post ? ' in' : '')}>
        <div className="bv-post-h">Postback URL</div>
        <code className="bv-url">https://maison.com/pb?order={'{id}'}&amp;amt={'{total}'}</code>
        <div className="bv-post-s"><span className="bv-dot-ok" /> 200 &middot; delivered</div>
      </div>

      {/* Conversion card (bottom-left) — check + title first, details expand after */}
      <div className={'bv-card bv-conv' + (s.convT ? ' in' : '')}>
        <div className="bv-conv-top">
          <span className="bv-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></span>
          <span className="bv-conv-t">Conversion tracked</span>
          <span className="bv-conv-ago">0.4s ago</span>
        </div>
        <div className={'bv-conv-dw' + (s.convD ? ' in' : '')}>
          <div className="bv-conv-d">
            <div className="bv-conv-prod"><b>Wool Crepe Blazer</b> <span className="bv-conv-id">#525546348</span></div>
            <div className="bv-conv-com">Commission (8%) &middot; $128.00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
function MadeFor() {
  return (
    <section id="cc-made" className="mf-sec">
      <div className="wrap">
        <div className="mf-grid">
          <div className="mf-left">
            <h2 className="mf-title" data-reveal>Built for teams that build.</h2>
            <p className="mf-sub" data-reveal data-reveal-delay="1">If you run your own product and have the engineers to integrate, you can plug Involve straight in.</p>
            <div className="mf-points" data-reveal data-reveal-delay="1">
              {MADE_POINTS.map(([t, d]) => (
                <div className="mf-point" key={t}>
                  <h3 className="mf-pt">{t}</h3>
                  <p className="mf-pd">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mf-visual" data-reveal>
            <BuiltViz />
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
        /* ---- animated phone + tool cards in a tinted square (same box as the creator page) ---- */
        .bv{ position:relative; width:100%; max-width:476px; margin-inline:auto; aspect-ratio:476/445;
          border-radius:var(--r-xl); overflow:hidden; background:var(--warm-100); }
        .bv-phone{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:42%; aspect-ratio:338/712; z-index:2; }
        .bv-phone img{ width:100%; height:100%; object-fit:cover; display:block; filter:drop-shadow(0 18px 34px rgba(15,28,46,.20)); }
        .bv-card{ position:absolute; border-radius:var(--r-lg); box-shadow:0 18px 40px rgba(15,28,46,.16);
          opacity:0; transform:translateY(14px) scale(.96); transition:opacity .5s ease, transform .6s cubic-bezier(.22,1,.36,1); }
        .bv-card.in{ opacity:1; transform:none; }
        .bv-api{ z-index:1; top:13%; left:2%; width:45%; background:#1c1c20; padding:11px 13px 13px; }   /* behind the phone */
        .bv-feed{ z-index:3; bottom:7%; right:2%; width:47%; background:#fff; padding:12px 13px; }
        .bv-post{ z-index:3; top:9%; right:2%; width:49%; background:#fff; padding:12px 13px; }
        .bv-conv{ z-index:3; bottom:9%; left:2%; width:53%; background:#fff; padding:11px 13px; }
        /* API code card (types in) */
        .bv-dots{ display:flex; gap:5px; margin-bottom:8px; }
        .bv-dots i{ width:8px; height:8px; border-radius:50%; }
        .bv-dots i:nth-child(1){ background:#ff5f57; } .bv-dots i:nth-child(2){ background:#febc2e; } .bv-dots i:nth-child(3){ background:#28c840; }
        .bv-code{ font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:11px; line-height:1.6; color:#cfd1d4; }
        .bv-typing{ margin:0; white-space:pre; min-height:4.8em; }
        .bv-caret{ display:inline-block; width:6px; height:1em; background:#cfd1d4; margin-left:1px; vertical-align:-2px; animation:bvBlink 1s steps(1) infinite; }
        @keyframes bvBlink{ 50%{ opacity:0; } }
        .bv-ind{ padding-left:12px; }
        .c-mut{ color:#8a8d93; } .c-ok{ color:#28c840; } .c-key{ color:#7fb0ff; } .c-str{ color:#f0a35e; } .c-num{ color:#c08cff; }
        /* datafeed list card */
        .bv-feed-h, .bv-post-h{ font:700 10px/1 var(--font-body); letter-spacing:.09em; text-transform:uppercase; color:var(--warm-400); margin-bottom:9px; }
        .bv-row{ display:flex; align-items:center; gap:9px; padding:5px 0; }
        .bv-row + .bv-row{ border-top:1px solid var(--warm-100); }
        .bv-thumb{ width:26px; height:26px; border-radius:var(--r-md); overflow:hidden; background:linear-gradient(135deg,#eceae6,#d6d1c8); flex:0 0 auto; }
        .bv-thumb img{ width:100%; height:100%; object-fit:cover; display:block; }
        .bv-row-n{ flex:1; min-width:0; font:500 12px/1.2 var(--font-body); color:var(--warm-900); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .bv-row-p{ font:700 12px/1 var(--font-body); color:var(--warm-900); }
        /* postback card */
        .bv-url{ display:block; font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:10.5px; line-height:1.45; color:var(--midnight-light); word-break:break-all; }
        .bv-post-s{ display:flex; align-items:center; gap:6px; margin-top:9px; font:600 11px/1 var(--font-body); color:var(--warm-500); }
        .bv-dot-ok{ width:7px; height:7px; border-radius:50%; background:#2fb563; }
        /* conversion card — check + title, then details expand */
        .bv-conv-top{ display:flex; align-items:center; gap:9px; }
        .bv-check{ flex:0 0 auto; width:24px; height:24px; border-radius:50%; background:#1f9254; color:#fff; display:flex; align-items:center; justify-content:center; }
        .bv-check svg{ width:13px; height:13px; }
        .bv-conv-t{ flex:1; font:800 13px/1.1 var(--font-display); color:var(--warm-900); }
        .bv-conv-ago{ font:400 10px/1 var(--font-body); color:var(--warm-400); }
        .bv-conv-dw{ display:grid; grid-template-rows:0fr; opacity:0; transition:grid-template-rows .45s ease, opacity .3s ease; }
        .bv-conv-dw.in{ grid-template-rows:1fr; opacity:1; }
        .bv-conv-d{ overflow:hidden; }
        .bv-conv-prod{ margin-top:9px; font:400 11.5px/1.35 var(--font-body); color:var(--warm-900); }
        .bv-conv-prod b{ font-weight:700; } .bv-conv-id{ color:var(--warm-400); }
        .bv-conv-com{ margin-top:2px; font:500 11px/1.35 var(--font-body); color:var(--warm-500); }
        @media (prefers-reduced-motion: reduce){ .bv-card{ transition:none; } .bv-conv-dw{ transition:none; } .bv-caret{ animation:none; } }
        @media (max-width:860px){ .mf-grid{ grid-template-columns:1fr; gap:32px; } .mf-visual{ order:-1; width:100%; max-width:476px; margin-inline:auto; } }
      `}</style>
    </section>
  );
}
/* ---------- CC §3 — "Built for the way you create." (tab view, reused from the
   publisher overview's platform stepper — pf-* pattern). One tab per tool. ---------- */
const CREATE_TABS = [
  { key: 'api', t: 'API', d: 'Authenticate with your key and secret, pull offers and conversions, and generate tracking links programmatically, with no manual dashboard work.', img: 'tech-api-tool-card.png?v=2',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8l-4 4 4 4" /><path d="M16 8l4 4-4 4" /><path d="M13 6l-2 12" /></svg> },
  { key: 'postback', t: 'Postback', d: 'Get conversions pushed to your server in real time (server-to-server), so you never have to log in and check reports. You handle the data on your own system.', img: 'postback-tool-slide.png?v=2',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9h11a4 4 0 0 1 0 8h-2" /><path d="M7 20l-3-3 3-3" /><path d="M20 5v4h-4" /></svg> },
  { key: 'datafeed', t: 'Datafeed Manager', d: 'Pull live product data like prices, offers, and stock to surface catalogues inside your product.', img: 'aff-partner-slide1.png?v=2',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" /><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></svg> },
];
const CREATE_TABS_CSS = `
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
          background:var(--warm-100); }
        .pf-img{ position:absolute; inset:0; width:100%; height:100%;
          object-fit:contain; object-position:center; opacity:0; transition:opacity .5s ease; }
        .pf-step-fig{ display:none; }
        @media (max-width:900px){
          .pf-grid{ grid-template-columns:1fr; gap:0; }
          .pf-visual{ display:none; }
          .pf-step{ gap:0; padding:22px 0; }
          .pf-rail{ display:none; }
          .pf-step-fig{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .45s ease; }
          .pf-step.on .pf-step-fig{ grid-template-rows:1fr; }
          .pf-step-fig-in{ overflow:hidden; min-height:0; }
          .cct-img-m{ display:block; width:100%; height:auto; margin:16px 0 4px; border-radius:var(--r-xl); box-shadow:0 12px 28px rgba(15,28,46,.12); }
        }`;
function BuiltCreate() {
  return (
    <PlatformTabs id="cc-create" className="cct-sec" items={CREATE_TABS} figClass="cct-img-m" css={CREATE_TABS_CSS}
      title="Built to integrate."
      sub="The three tools your engineers will use." />
  );
}
/* ---------- CC §3b — "Why creators earn with Involve." (3 icon columns) — Figma 2667:17675 ---------- */
const WE_ICONS = {
  bag: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 8h12l-1 12.5H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></svg>,
  heart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20.5S4.5 16 4.5 10.6A3.6 3.6 0 0 1 12 7.5a3.6 3.6 0 0 1 7.5 3.1C19.5 16 12 20.5 12 20.5Z" /></svg>,
  file: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5" /><path d="M9.3 14.4l1.9 1.9 3.5-3.7" /></svg>,
  ui: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /><path d="M8 4v5" /></svg>,
  grid: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>,
  bolt: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>,
  code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 8l-4 4 4 4" /><path d="M16 8l4 4-4 4" /><path d="M13 6l-2 12" /></svg>,
};
const WHY_EARN = [
  ['ui', 'Your product, your experience.', 'Offers live inside your own UI. You control how they look and where they appear.'],
  ['grid', 'One integration, hundreds of brands.', 'Connect once to access 500+ brands and 4,000+ offers.'],
  ['bolt', 'Real-time and hands-off.', 'Postback and the API keep offers current and conversions flowing, so no one has to check a dashboard.'],
  ['code', 'Built for developers.', 'Clear API docs, item-level tracking, and reliable payouts.'],
];
function WhyEarn() {
  return (
    <section id="cc-why" className="we-sec">
      <div className="wrap">
        <h2 className="we-title" data-reveal>Why technology partners build on Involve.</h2>
        <div className="we-grid">
          {WHY_EARN.map(([ic, t, d], i) => (
            <div className="we-item" key={t} data-reveal data-reveal-delay={i + 1}>
              <span className="we-icon">{WE_ICONS[ic]}</span>
              <h3 className="we-ct">{t}</h3>
              <p className="we-cd">{d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .we-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .we-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .we-grid{ margin-top:clamp(34px,5vh,54px); display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(24px,3vw,40px); }
        @media (max-width:960px){ .we-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); } }
        .we-item{ min-width:0; }
        .we-icon{ display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:var(--r-xl); background:rgba(240,88,38,.12); color:var(--ember); }
        .we-icon svg{ width:24px; height:24px; display:block; }
        .we-ct{ margin-top:clamp(20px,3vh,26px); font-family:var(--font-display); font-weight:800; font-size:20px; letter-spacing:-.01em; color:var(--warm-900); }
        .we-cd{ margin-top:8px; font:400 16px/1.45 var(--font-body); color:var(--warm-600); max-width:340px; }
        @media (max-width:760px){ .we-grid{ grid-template-columns:1fr; gap:clamp(24px,4vh,34px); max-width:440px; margin-inline:auto; } }
      `}</style>
    </section>
  );
}
/* ---------- CC §2b — "How it works" (3 numbered steps) — Figma 2546:45011 ---------- */
const HIW_STEPS = [
  { t: 'Connect the API', d: 'Integrate once, and bring product data, trackable links, and real-time conversions into your own product.', img: 'general-hye-01.png' },
  { t: 'Surface relevant offers', d: 'Show cashback and deals your users actually want, inside your own UI.', img: 'tp-hye-02.png' },
  { t: 'Earn on every sale', d: 'When a user buys through your product, the sale is credited to you.', img: 'general-hye-03.png' },
  { t: 'Get paid', d: 'Withdraw in your local currency once sales are validated, or sooner with Express Withdrawal.', img: 'general-hye-04.png' },
];
// Card 1 (Connect the API): a code editor card that bleeds off the right & bottom
// of the frame (cropped), with the request lines typing in then a JSON response
// section revealing, on a loop. All values are placeholders, not real credentials.
const AC_REQ = '// Initialize connection with Involve API\nGET https://api.example.com/v2/offers\nAuthorization: Bearer ia_app_key_••••••';
function ApiCard() {
  const reduced = prefersReduced();
  const [n, setN] = React.useState(0);
  const [resp, setResp] = React.useState(false);
  React.useEffect(() => {
    if (reduced) { setN(AC_REQ.length); setResp(true); return; }
    let alive = true;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      while (alive) {
        setN(0); setResp(false); await sleep(520); if (!alive) return;
        for (let i = 1; i <= AC_REQ.length; i++) { if (!alive) return; setN(i); await sleep(24); }  // type request
        await sleep(560); if (!alive) return;
        setResp(true); await sleep(2600); if (!alive) return;                                       // reveal JSON response + hold
      }
    })();
    return () => { alive = false; };
  }, [reduced]);
  const done = n >= AC_REQ.length;
  return (
    <div className="ac-card" aria-hidden="true">
      <div className="ac-head"><span className="ac-dots"><i /><i /><i /></span><span className="ac-file">involve_asia_api_v2.json</span></div>
      {done ? (
        <div className="ac-code">
          <div className="ac-mut">// Initialize connection with Involve API</div>
          <div><span className="ac-kw">GET</span> <span className="ac-url">https://api.example.com/v2/offers</span></div>
          <div>Authorization: Bearer <span className="ac-key">ia_app_key_{'••••••'}</span></div>
          <div className={'ac-resp' + (resp ? ' in' : '')}>
            <div className="ac-div" />
            <div className="ac-mut">// JSON Response</div>
            <div>{'{'}</div>
          </div>
        </div>
      ) : (
        <pre className="ac-code ac-typing">{AC_REQ.slice(0, n)}<span className="ac-caret" /></pre>
      )}
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
function HowItWorks() {
  return (
    <section id="cc-how" className="hiw-sec">
      <div className="wrap">
        <h2 className="hiw-title" data-reveal>How you earn.</h2>
        <div className="hiw-grid">
          {HIW_STEPS.map((s, i) => (
            <div className="hiw-step" key={s.t} data-reveal data-reveal-delay={i + 1}>
              <div className="hiw-card"><img src={`media/figma/${s.img}`} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} /></div>
              <h3 className="hiw-ct">{i + 1}. {s.t}</h3>
              <p className="hiw-cd">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .hiw-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .hiw-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .hiw-grid{ margin-top:clamp(34px,5.5vh,58px); display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(20px,2.2vw,32px); }
        .hiw-step{ min-width:0; }
        .hiw-card{ height:178px; border-radius:var(--r-lg); background:var(--warm-100); overflow:hidden; display:flex; align-items:center; justify-content:center; }
        .hiw-card img{ width:100%; height:100%; object-fit:cover; object-position:left center; display:block; }   /* art bleeds off the right; keep its left inset */
        /* card 1 — code editor card cropped off the right & bottom of the frame */
        .hiw-card-api{ position:relative; }
        .ac-card{ position:absolute; top:26px; left:32px; width:300px; min-height:180px; box-sizing:border-box;
          background:#1c1c20; border-radius:16px 16px 0 0; padding:13px 15px 16px; box-shadow:0 18px 40px rgba(15,28,46,.18); }
        .ac-head{ display:flex; align-items:center; gap:10px; margin-bottom:12px; }
        .ac-dots{ display:flex; gap:5px; } .ac-dots i{ width:8px; height:8px; border-radius:50%; }
        .ac-dots i:nth-child(1){ background:#ff5f57; } .ac-dots i:nth-child(2){ background:#febc2e; } .ac-dots i:nth-child(3){ background:#28c840; }
        .ac-file{ font:400 10px/1 ui-monospace,SFMono-Regular,Menlo,monospace; color:#8a8d93; }
        .ac-code{ font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:9px; line-height:1.85; color:#e6e7e9; white-space:pre; }
        .ac-typing{ margin:0; min-height:5.2em; }
        .ac-mut{ color:#7d8089; }
        .ac-kw{ color:#e6e7e9; }
        .ac-url{ color:#5bd66f; }
        .ac-key{ color:#e6e7e9; }
        .ac-caret{ display:inline-block; width:5px; height:1em; background:#cfd1d4; margin-left:1px; vertical-align:-1px; animation:acBlink 1s steps(1) infinite; }
        @keyframes acBlink{ 50%{ opacity:0; } }
        .ac-div{ height:1px; background:rgba(255,255,255,.12); margin:9px 0; }
        .ac-resp{ opacity:0; transform:translateY(6px); transition:opacity .4s ease, transform .4s ease; }
        .ac-resp.in{ opacity:1; transform:none; }
        @media (prefers-reduced-motion: reduce){ .ac-resp{ transition:none; } .ac-caret{ animation:none; } }
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
        @media (max-width:520px){ .hiw-grid{ grid-template-columns:1fr; gap:clamp(24px,4vh,34px); max-width:440px; } }
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
        <MadeFor />
        <HowItWorks />
        <BuiltCreate />
        <WhyEarn />
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
