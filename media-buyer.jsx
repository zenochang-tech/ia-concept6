/* ============================================================================
   publishers.jsx — "For Publishers" overview page.
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, FinalCta, Testimonials, Faq, AppDownload, HeroHexDeco, HERO_HEXDECO_CSS, NumberedSteps, IconColumns } = window;

/* ---------- Section 1 — Hero ---------------------------------------------- */
function PubHero() {
  return (
    <section id="pub-hero" className="ph-sec">
      <HeroHexDeco />
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <div className="ph-copy">
          <span className="ph-eyebrow" data-reveal>For Media Buyers</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Run paid traffic across hundreds of brands, with tracking built in.</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="2">Turn ad spend into profit, with the attribution, reporting, and payouts to run it at scale.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="3">
            <a href="/partners/" className="btn btn-primary btn-lg">Start Earning <Arrow /></a>
          </div>
          <span className="ph-free" data-reveal data-reveal-delay="3">Free to join. Start earning today.</span>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo ph-photo-fill"><img src="media/figma/mb-hero.png" alt="A media buyer's campaign dashboard" loading="eager" /></div>
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

/* ---------- Testimonials (shared Testimonials, ia-sections.jsx) --------- */
function PubVoices() {
  return <Testimonials />;
}

/* ---------- Section 8 — "Questions, answered." (FAQ accordion) ------------
   Copy supplied by the client. Two answers carry links (beginner guide, Express
   Withdrawal) — hrefs are placeholders pending the real URLs. Example figures
   (4.2% commission, 10 working days) are illustrative — confirm before launch. */
const PUB_FAQ = [
  ['Can I use server-to-server postback?',
    'Yes. Fire postbacks to your own tracker so your data matches ours.'],
  ['How fast is tracking?',
    'Real time within 10 to 30 minutes for most conversions, plus manual tracking where needed.'],
  ['Which traffic sources are allowed?',
    'Check each offer\'s terms. Some brands restrict paid search or brand bidding.'],
];
function PubFAQ() {
  return <Faq items={PUB_FAQ} />;
}

/* ---------- Final CTA (shared FinalCta, ia-sections.jsx) ----------------- */
function PubCTA() {
  return <FinalCta title="Turn ad spend into profit." />;
}

/* ---------- Website §2 — "Monetise your content, without disrupting it." (4 icon columns) ---------- */
const AFF_WHY = [
  { t: 'Rates and terms up front.', d: 'See commissions before you spend, so you can protect your margin.',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" /><circle cx="12" cy="12" r="2.6" /></svg> },
  { t: 'Reliable attribution.', d: 'Last-click tracking and server-to-server postback to match your own systems.',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.2" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3" /></svg> },
  { t: 'Real-time performance.', d: 'EPC, conversion, and payout data as it happens, not days later.',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l2.5-7 4 14 2.5-7H21" /></svg> },
];
function WhyChoose() {
  return (
    <IconColumns id="aff-why" title="Why media buyers run on Involve." items={AFF_WHY} />
  );
}
/* ---------- Website §1b — "How it works" (3 numbered steps) — Figma 2546:45038 ---------- */
const HIW_STEPS = [
  ['01', 'Pick high-converting offers', 'Browse 4,000+ offers with rates and terms up front, so you can model your margins.'],
  ['02', 'Drive paid traffic', 'Send search, social, and native traffic through your trackable links.'],
  ['03', 'Track every conversion', 'See clicks, sales, and EPC in real time, and fire postbacks to your own tracker.'],
  ['04', 'Get paid', 'Withdraw in your local currency once conversions are validated, or sooner with Express Withdrawal.'],
];
function HowItWorks() {
  return <NumberedSteps id="web-how" title="How you earn." steps={HIW_STEPS} />;
}
/* ---------- Media-buyer signature section — "Built for how you run." (3 image cards, same
   design as "Earn from what your users already do."; images to be supplied) ---------- */
const BUILT_RUN = [
  ['mb-run-1.png', 'Know your margin before you spend.', 'See the payout and EPC on every offer up front, so you can work out your numbers before you buy a single click. Payout, minus your traffic cost, is your profit. We show you the first two, you control the third.'],
  ['mb-run-2.png', 'Plug into your own tracker.', 'Fire server-to-server postbacks into Voluum, RedTrack, Binom, or your own stack. Pass your click IDs and sub IDs through the link and get them back on conversion, so your reporting matches ours to the cent.'],
  ['mb-run-3.png', 'Know the rules before you run.', 'Every offer lists its allowed traffic sources and brand-bidding rules up front, so you know what you can run before you spend, and you keep every commission you earn.'],
];
function BuiltRun() {
  return (
    <section id="mb-run" className="mr-sec">
      <div className="wrap">
        <h2 className="mr-title" data-reveal>Built for how you run.</h2>
        <div className="mr-grid">
          {BUILT_RUN.map(([img, t, d], i) => (
            <div className="mr-card" key={t} data-reveal data-reveal-delay={i + 1}>
              <div className="mr-visual"><img src={`media/figma/${img}`} alt="" loading="lazy" /></div>
              <h3 className="mr-ct">{t}</h3>
              <p className="mr-cd">{d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .mr-sec{ background:var(--warm-50); padding:clamp(56px,9vh,110px) 0; }
        .mr-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); max-width:820px; margin:0 auto; }
        .mr-grid{ margin-top:clamp(40px,6vh,64px); display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(20px,2.6vw,32px); align-items:start; }
        .mr-card{ min-width:0; }
        .mr-visual{ display:flex; align-items:center; justify-content:center; border-radius:var(--r-xl); overflow:hidden; aspect-ratio:414/260;
          background:var(--warm-100); color:var(--warm-400); }
        .mr-visual img{ width:100%; height:100%; object-fit:cover; display:block; }
        .mr-ct{ margin-top:24px; font-family:var(--font-display); font-weight:800; font-size:21px; letter-spacing:-.01em; color:var(--warm-900); }
        .mr-cd{ margin-top:12px; font:400 16px/1.4 var(--font-body); color:var(--warm-600); }
        @media (max-width:820px){ .mr-grid{ grid-template-columns:1fr; gap:36px; max-width:440px; margin-left:auto; margin-right:auto; } }
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
        <HowItWorks />
        <BuiltRun />
        <WhyChoose />
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
