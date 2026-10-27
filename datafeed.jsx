/* ============================================================================
   publishers.jsx — "For Publishers" overview page.
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, FinalCta, AppDownload, HeroHexDeco, HERO_HEXDECO_CSS } = window;

/* ---------- Section 1 — Hero ---------------------------------------------- */
function PubHero() {
  return (
    <section id="pub-hero" className="ph-sec">
      <HeroHexDeco />
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <div className="ph-copy">
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Feature a whole catalogue, without collecting it by hand.</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="1">Datafeed hands you an advertiser&rsquo;s full product list in one file, names, prices, images, and more, so you can feature as many products as you want without gathering each one yourself.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="2">
            <a href="/partners/" className="btn btn-primary btn-lg">Start Earning <Arrow /></a>
          </div>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo ph-photo-df"><img src="media/figma/datafeed-hero-1.png" alt="A product list synced to a site through Involve Datafeed" loading="eager" /></div>
          <div className="ph-static-ui" data-reveal data-reveal-delay="2">
            <div className="ph-glass ph-g-added"><div className="ph-added">2,087 new products added</div></div>
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
        .ph-heroimg{ position:absolute; inset:0; z-index:2; filter:drop-shadow(0 30px 60px rgba(15,28,46,.24)); }
        .ph-heroimg img{ width:100%; height:100%; object-fit:contain; display:block; }
        /* ---- fade slider: each slide (photo + its UI) cross-fades in/out ---- */
        .ph-slide{ position:absolute; inset:0; z-index:1; opacity:0; transition:opacity .85s cubic-bezier(.4,0,.2,1); }
        .ph-slide.is-active{ opacity:1; z-index:2; }
        @media (prefers-reduced-motion: reduce){ .ph-slide{ transition:none; } }
        .ph-photo{ position:absolute; inset:0; z-index:1;
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; }
        .ph-photo img{ width:100%; height:100%; object-fit:cover; display:block; }
        /* datafeed hero is a floating product-list mockup: scale it up (clipped to the hexagon
           by the .ph-photo mask) so it fills the hexagon like a full-bleed photo */
        .ph-photo-df img{ object-fit:contain; transform:scale(1.04); transform-origin:57% 60%; }
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
        /* datafeed hero: "2,087 new products added" pill, top of the product list */
        .ph-g-added{ top:13%; left:23%; transform:translateX(-40%); }
        .ph-added{ background:#fff; border-radius:var(--r-xl); box-shadow:0 2px 6px rgba(15,28,46,.08); padding:11px 18px; white-space:nowrap; font:600 14px/1 var(--font-body); color:var(--warm-900); }
        @media (max-width:900px){
          .ph-wrap{ grid-template-columns:1fr; gap:36px; }
          .ph-copy{ text-align:center; display:flex; flex-direction:column; align-items:center; }
          .ph-sub{ margin-left:auto; margin-right:auto; }
          .ph-visual{ order:-1; max-width:420px; margin:0 auto; justify-self:center; }
          /* keep the floating UI within the hexagon so the composition stays centred */
          .ph-g-link, .ph-g-sales, .ph-g-conv{ right:0; }
          .ph-g-prod, .ph-g-pay-a, .ph-g-pay-b{ left:0; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Final CTA (shared FinalCta, ia-sections.jsx) ----------------- */
const PUB_CTA_CSS = `
        .pc-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(199px,33.12vh,365px) 0 clamp(232px,35.88vh,430px); }
        .pc-title{ font-size:clamp(24px,3vw,34px); line-height:1.15; letter-spacing:-.03em; color:var(--warm-900); max-width:900px; }
      `;
function PubCTA() {
  return <FinalCta title="Fill your site with products that earn today." css={PUB_CTA_CSS} />;
}

/* ---------- Datafeed §2 — "What is Involve Datafeed?" (manual vs datafeed) ---------- */
const DF_MANUAL = [
  'Find each product and copy its title and image from the brand’s site.',
  'Generate an affiliate link for it.',
  'Paste everything onto your site.',
  'Repeat for every product.',
];
const DF_WAY = [
  'Download the brand’s product feed, the whole catalogue in one file.',
  'Add your tracking to the feed’s product links, following the brand’s guide, once per brand.',
  'Publish the products on your site.',
];
function WhatIs() {
  return (
    <section id="df-what" className="wi-sec">
      <div className="wrap wi-grid">
        <div className="wi-copy" data-reveal>
          <h2 className="wi-title">What is Involve Datafeed?</h2>
          <p className="wi-sub">A datafeed is a ready-made file of an advertiser&rsquo;s products, with the details you need to feature them: product name, price, product URL, image, description, and category. Instead of adding products one by one, you get the whole catalogue at once, then add your own tracking so the sales are credited to you.</p>
        </div>
        <div className="wi-visual" data-reveal data-reveal-delay="1">
          <img src="media/figma/datafeed-grid-1.png" alt="A grid of an advertiser's products ready to feature through Involve Datafeed" loading="lazy" />
        </div>
      </div>
      <style>{`
        .wi-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; overflow:hidden; }
        .wi-grid{ display:grid; grid-template-columns:minmax(0,420px) minmax(0,1fr); gap:clamp(32px,5vw,72px); align-items:center; }
        .wi-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.14; letter-spacing:-.03em; color:var(--warm-900); }
        .wi-sub{ margin-top:18px; font:400 16px/1.55 var(--font-body); color:var(--warm-600); max-width:460px; }
        /* product grid bleeds off the right viewport edge (matches the other datafeed visuals) */
        .wi-visual{ position:relative; align-self:stretch; min-height:clamp(340px,42vh,520px); overflow:hidden;
          margin-right:calc(min(100vw, var(--maxw)) / 2 - 50vw - 32px); border-radius:22px 0 0 22px;
          background:linear-gradient(150deg,#f4f4f0 0%,#f6f1ec 50%,#eceae6 100%); }
        .wi-visual img{ position:absolute; top:clamp(20px,3vw,36px); left:clamp(20px,3vw,36px);
          width:calc(100% - clamp(20px,3vw,36px)); height:calc(100% - clamp(20px,3vw,36px));
          object-fit:cover; object-position:left top; border-radius:16px 0 0 0; display:block; }
        @media (max-width:900px){
          .wi-grid{ grid-template-columns:1fr; gap:30px; }
          .wi-visual{ position:static; margin-right:0; min-height:0; border-radius:var(--r-xl); overflow:visible; background:none; }
          .wi-visual img{ position:static; top:auto; left:auto; width:100%; height:auto; border-radius:var(--r-xl); }
        }
      `}</style>
    </section>
  );
}
/* ---------- Datafeed §4 — "How it works" (3 numbered steps) ---------- */
const DF_STEPS = [
  ['01', 'Find the advertiser.', 'Browse the datafeed and pick the advertiser whose products you want to feature.'],
  ['02', 'Get the feed and guide.', 'Download the product feed and that advertiser’s step-by-step guide.'],
  ['03', 'Add your tracking.', 'Follow the guide to add your tracking to the product links, so your clicks and sales are credited to you.'],
  ['04', 'Feature the products.', 'Publish them across your site.'],
];
function HowItWorks() {
  return (
    <section id="df-how" className="hw-sec">
      <div className="wrap">
        <h2 className="hw-title" data-reveal>How it works</h2>
        <div className="hw-grid">
          {DF_STEPS.map(([n, t, d], i) => (
            <div className="hw-step" key={n} data-reveal data-reveal-delay={i + 1}>
              <span className="hw-num">{n}</span>
              <h3 className="hw-st">{t}</h3>
              <p className="hw-sd">{d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .hw-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .hw-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .hw-grid{ margin-top:clamp(30px,4vh,48px); display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(24px,2.6vw,44px); }
        .hw-num{ display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:50%; background:var(--ember); color:#fff; font-family:var(--font-display); font-weight:800; font-size:17px; }
        .hw-st{ margin-top:18px; font-family:var(--font-display); font-weight:800; font-size:18px; letter-spacing:-.01em; color:var(--warm-900); }
        .hw-sd{ margin-top:10px; font:400 15px/1.5 var(--font-body); color:var(--warm-600); max-width:300px; }
        @media (max-width:900px){ .hw-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); gap:34px 26px; } }
        @media (max-width:560px){ .hw-grid{ grid-template-columns:1fr; max-width:440px; } }
      `}</style>
    </section>
  );
}
/* ---------- Datafeed §5 — "The manual way / The Involve Datafeed way" (comparison) ---------- */
function WaysCompare() {
  return (
    <section id="df-ways" className="wc-sec">
      <div className="wrap">
        <div className="wc-cards">
          <div className="wc-card wc-manual" data-reveal>
            <h3 className="wc-ct">The manual way</h3>
            <ol className="wc-list">
              {DF_MANUAL.map((t, i) => <li key={i}>{i + 1}. {t}</li>)}
            </ol>
          </div>
          <div className="wc-card wc-hl" data-reveal data-reveal-delay="1">
            <h3 className="wc-ct">The <span className="wc-em">Involve Datafeed</span> way</h3>
            <p className="wc-sub">Get the catalogue in one file. Add your tracking once, then feature as many products as you like.</p>
            <ol className="wc-list">
              {DF_WAY.map((t, i) => <li key={i}>{i + 1}. {t}</li>)}
            </ol>
          </div>
        </div>
      </div>
      <style>{`
        .wc-sec{ background:var(--warm-50); padding:clamp(30px,4vh,56px) 0 clamp(40px,7vh,88px); }
        .wc-cards{ display:grid; grid-template-columns:1fr 1fr; gap:clamp(20px,2.6vw,32px); align-items:stretch; }
        .wc-card{ border-radius:var(--r-xl); padding:clamp(24px,3vw,34px); }
        .wc-manual{ background:rgba(255,255,255,.5); border:1px solid var(--warm-200); }
        .wc-hl{ background:#fff; box-shadow:0 14px 34px rgba(15,28,46,.06); }
        .wc-ct{ font-family:var(--font-display); font-weight:800; font-size:22px; letter-spacing:-.01em; color:var(--warm-900); }
        .wc-em{ color:var(--ember); }
        .wc-sub{ margin-top:12px; font:600 15px/1.4 var(--font-body); color:var(--warm-900); }
        .wc-list{ margin-top:18px; display:flex; flex-direction:column; gap:14px; list-style:none; padding:0; }
        .wc-list li{ font:400 15px/1.45 var(--font-body); color:var(--warm-600); }
        @media (max-width:820px){ .wc-cards{ grid-template-columns:1fr; } }
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
        <WhatIs />
        <HowItWorks />
        <WaysCompare />
        <PubCTA />
      </main>
      <Footer />
      <AppDownload />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PublisherApp />);
