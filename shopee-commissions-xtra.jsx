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
          <span className="ph-eyebrow" data-reveal>For Shopee affiliates</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Shopee Commissions XTRA: earn extra on top of your base commission</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="2">With Shopee Commissions XTRA, earn extra commission on top of your base commission from brand stores and top-selling products on Shopee.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="3">
            <a href="/partners/" className="btn btn-primary btn-lg">Start Earning <Arrow /></a>
          </div>
          <span className="ph-free" data-reveal data-reveal-delay="3">Live in Malaysia, Singapore, Indonesia, the Philippines, Thailand, Vietnam, and Taiwan.</span>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo ph-photo-fill"><img src="media/figma/commissions-xtra-hero-img.png" alt="Shopee Commissions XTRA" loading="eager" /></div>
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
  ['Do direct and indirect links attribute across all regions?',
    'For now, it applies only to Malaysia, Singapore, Indonesia, the Philippines, Thailand, Vietnam, and Taiwan.'],
  ['As a partner, how do I know whether a conversion is direct or indirect?',
    'Check Advertiser Sub ID 5 in the Conversion Report. Direct = ORDERED_IN_SAME_SHOP; indirect = ORDERED_IN_DIFFERENT_SHOP. ORDERED_IN_SAME_SHOP covers both the same SKU and a different SKU bought from the same shop.'],
  ['What is the best way to maximise your earnings?',
    'Promote Shopee Commissions XTRA brands and products directly to a relevant audience, and get to know your audience\'s preferences and needs.'],
  ['If there is an indirect purchase from my link, will I still get commission?',
    'Yes. You will earn base commission.'],
];
function PubFAQ() {
  return <Faq items={PUB_FAQ} />;
}

/* ---------- Final CTA (shared FinalCta, ia-sections.jsx) ----------------- */
const PUB_CTA_CSS = `
        .pc-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(96px,16vh,200px) 0 clamp(104px,17vh,210px); }
        .pc-title{ font-size:clamp(24px,3vw,34px); line-height:1.15; letter-spacing:-.03em; color:var(--warm-900); max-width:900px; }
        .pc-sub{ margin-top:16px; font:400 16px/1.55 var(--font-body); color:var(--warm-600); max-width:580px; }
        @media (max-width:700px){ .pc-sec{ padding:clamp(60px,9vh,84px) 0 clamp(68px,10vh,96px); } }
      `;
function PubCTA() {
  return <FinalCta title="Get more commissions with Shopee Smart URL." sub="One link that sends your audience to a Shopee Commissions XTRA brand store, rotating on every click." label="Get Started" css={PUB_CTA_CSS} />;
}

/* ---------- Affiliates §3 — "Why affiliate sites choose Involve." (4 icon columns) ---------- */
const AFF_WHY = [
  { t: 'Direct links', d: 'Your customer buys the same product from the same store. You earn base commission plus Commissions XTRA. If the store is not a Commissions XTRA brand, you earn base commission only.',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" /><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" /></svg> },
  { t: 'Indirect links', d: 'Your customer buys a different product from a different store. You earn base commission only.',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5" /><path d="M21 3l-8 8" /><path d="M16 21h5v-5" /><path d="M21 21l-6-6" /><path d="M3 5l6 6" /></svg> },
];
const WHY_CSS = `
        .wy-grid{ margin:clamp(34px,5vh,54px) auto 0; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:clamp(28px,4vw,56px); max-width:840px; }
      `;
function WhyChoose() {
  return (
    <IconColumns id="aff-why" title="Two link types, one simple rule." items={AFF_WHY}
      proof="You still earn base commission plus Commissions XTRA when a customer buys a different product at the same store." css={WHY_CSS} />
  );
}
/* ---------- Affiliates §4b — "How it works" (3 numbered steps) — Figma 2546:45012 ---------- */
const HIW_STEPS = [
  ['01', 'Promote brand stores', 'Share affiliate links to brand stores that are under Shopee Commissions XTRA.'],
  ['02', 'Promote XTRA products', 'Feature products that are part of Shopee Commissions XTRA.'],
  ['03', 'When unsure, link a store or product', 'Always generate your affiliate link from a product or brand store, so it can qualify.'],
];
function HowItWorks() {
  return <NumberedSteps id="af-how" title="Tips to earn more with Commissions XTRA." steps={HIW_STEPS} cols={3} />;
}
/* ---------- Shopee XTRA — "What is Commissions XTRA" intro ---------- */
function XtraIntro() {
  return (
    <section id="sx-intro" className="sx-intro">
      <div className="wrap">
        <h2 className="sx-intro-h" data-reveal>Earn Commissions XTRA on brand stores and top products.</h2>
        <p className="sx-intro-p" data-reveal data-reveal-delay="1">Promote a brand's stores and products that are under Shopee Commissions XTRA, and earn extra commission on top of your base commission. The full list of eligible stores is on the Shopee Commissions XTRA page in your Involve dashboard.</p>
      </div>
      <style>{`
        .sx-intro{ background:var(--warm-50); padding:clamp(40px,7vh,80px) 0 0; text-align:center; }
        .sx-intro-h{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); max-width:760px; margin:0 auto; }
        .sx-intro-p{ margin:18px auto 0; max-width:660px; font:400 clamp(16px,1.4vw,19px)/1.55 var(--font-body); color:var(--warm-600); }
      `}</style>
    </section>
  );
}

/* ---------- Shopee XTRA — old vs new attribution journey (diagram images to be provided) ---------- */
function XtraAttribution() {
  const IMG = 'media/figma/Shopee-Commissions-XTRA-NEW-V2.png';
  const [open, setOpen] = React.useState(false);
  const [zoom, setZoom] = React.useState(false);
  const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width:700px)').matches;
  const openLb = () => { if (isMobile()) { setZoom(false); setOpen(true); } };
  const close = () => setOpen(false);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open]);
  return (
    <section id="sx-attr" className="sx-attr">
      <div className="wrap">
        <h2 className="sx-attr-h" data-reveal>Here's how the latest Shopee attribution works.</h2>
        <p className="sx-attr-note" data-reveal data-reveal-delay="1">Please tap to enlarge</p>
        <figure className="sx-attr-figure" data-reveal data-reveal-delay="1">
          <img src={IMG} alt="The Shopee Commissions XTRA attribution journey" loading="lazy" onClick={openLb} />
        </figure>
        <p className="sx-attr-eg" data-reveal>Here, Nike is used as an example of a Shopee Commissions XTRA brand.</p>
      </div>
      {open && (
        <div className="sx-lb" role="dialog" aria-modal="true" aria-label="Shopee attribution journey" onClick={close}>
          <button type="button" className="sx-lb-x" aria-label="Close" onClick={close}>&times;</button>
          <div className="sx-lb-scroll" onClick={(e) => e.stopPropagation()}>
            <div className="sx-lb-inner">
              <img
                src={IMG}
                alt="The Shopee Commissions XTRA attribution journey"
                className={`sx-lb-img${zoom ? ' zoomed' : ''}`}
                onClick={() => setZoom((z) => !z)}
              />
            </div>
          </div>
        </div>
      )}
      <style>{`
        .sx-attr{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; text-align:center; }
        .sx-attr-h{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .sx-attr-note{ display:none; margin:14px auto 0; font:400 15px/1.5 var(--font-body); color:var(--warm-400); }
        .sx-attr-figure{ margin:clamp(28px,4vh,44px) auto 0; max-width:1000px; }
        .sx-attr-figure img{ display:block; width:100%; height:auto; border-radius:var(--r-xl); }
        .sx-attr-eg{ margin:clamp(24px,3.5vh,36px) auto 0; font:400 15px/1.5 var(--font-body); color:var(--warm-600); }
        .sx-lb{ position:fixed; inset:0; z-index:1000; background:rgba(15,28,46,.92); }
        .sx-lb-x{ position:fixed; top:14px; right:16px; z-index:2; width:44px; height:44px; border:none; border-radius:var(--r-full); background:rgba(255,255,255,.14); color:#fff; font-size:26px; line-height:1; cursor:pointer; }
        .sx-lb-x:hover{ background:rgba(255,255,255,.24); }
        .sx-lb-scroll{ position:absolute; inset:0; overflow:auto; -webkit-overflow-scrolling:touch; }
        .sx-lb-inner{ min-width:100%; min-height:100%; display:flex; align-items:center; justify-content:center; padding:16px; box-sizing:border-box; }
        .sx-lb-img{ max-width:100%; max-height:calc(100vh - 32px); height:auto; border-radius:var(--r-lg); cursor:zoom-in; touch-action:pinch-zoom; }
        .sx-lb-img.zoomed{ max-width:none; max-height:none; width:min(1600px,300vw); height:auto; cursor:zoom-out; }
        @media (max-width:700px){
          .sx-attr-note{ display:block; }
          .sx-attr-figure img{ cursor:zoom-in; }
        }
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
        <XtraIntro />
        <WhyChoose />
        <XtraAttribution />
        <HowItWorks />
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
