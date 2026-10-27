/* ============================================================================
   publishers.jsx — "For Publishers" overview page.
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, FinalCta, HeroHexDeco, HERO_HEXDECO_CSS } = window;

/* ---------- Section 1 — Hero ---------------------------------------------- */
function PubHero() {
  return (
    <section id="pub-hero" className="ph-sec">
      <HeroHexDeco />
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <div className="ph-copy">
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Automate the busywork, scale the program.</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="1">Run the repetitive parts of your program automatically, so you spend your time on growth, not admin.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="2">
            <a href="/advertisers/" className="btn btn-advertiser btn-lg">See plans and pricing <Arrow /></a>
          </div>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo ph-photo-df"><img src="media/figma/auto-hero.png" alt="An advertiser dashboard running an affiliate program automatically" loading="eager" /></div>
          <div className="ph-static-ui" data-reveal data-reveal-delay="2">
            <div className="ph-glass ph-g-ap">
              <div className="ph-ap">
                <small>Active publishers</small>
                <b><em>622</em> publishers</b>
              </div>
            </div>
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
        .ph-photo-df img{ object-fit:contain; transform:scale(1.02); transform-origin:40% 35%; }
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
        /* automation hero: floating "Active publishers / 622 publishers" pill over the top-left of the dashboard */
        .ph-g-ap{ top:9%; left:0; border-radius:var(--r-xl); padding:6px; }
        .ph-ap{ background:#fff; border-radius:var(--r-xl); box-shadow:0 2px 6px rgba(15,28,46,.08); padding:12px 20px; white-space:nowrap; }
        .ph-ap small{ display:block; font:600 12px/1 var(--font-body); color:var(--warm-600); }
        .ph-ap b{ display:block; margin-top:7px; font-family:var(--font-display); font-weight:800; font-size:22px; letter-spacing:-.02em; color:var(--warm-900); }
        .ph-ap b em{ font-style:normal; color:var(--midnight-light); }
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
function PubCTA() {
  return <FinalCta title="Scale your program without scaling the work." href="/advertisers/" tone="advertiser" label="Grow my brand" />;
}

/* ---------- Automation §2 — "Set it up once, let it run." (3 image columns) ---------- */
const SU_STEPS = [
  { img: 'auto-step-1.png', t: 'Onboard publishers automatically.', d: 'Once approved, publishers are set up and ready to promote.' },
  { img: 'auto-step-2.png', t: 'Set commission rules once.', d: 'Set your commission on each offer, with multi-tier rates on Growth and above, so your payouts follow performance.' },
  { img: 'auto-step-3.png', t: 'Centralise your payments.', d: 'Pay every partner from one place, with variable payouts handled for you.' },
];
function ConsolidatedView() {
  return (
    <section id="auto-setup" className="su-sec">
      <div className="wrap">
        <h2 className="su-title" data-reveal>Set it up once, let it run.</h2>
        <div className="su-grid">
          {SU_STEPS.map((s, i) => (
            <div className="su-col" key={i} data-reveal data-reveal-delay={i + 1}>
              <div className="su-fig"><img src={`media/figma/${s.img}`} alt="" loading="lazy" /></div>
              <h3 className="su-ct">{s.t}</h3>
              <p className="su-cd">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .su-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .su-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .su-grid{ margin-top:clamp(30px,4.5vh,52px); display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(24px,3vw,40px); align-items:start; }
        .su-fig{ border-radius:var(--r-xl); overflow:hidden; background:var(--warm-100); aspect-ratio:414/260; }
        .su-fig img{ width:100%; height:100%; object-fit:cover; object-position:center; display:block; }
        .su-ct{ margin-top:20px; font-family:var(--font-display); font-weight:800; font-size:clamp(17px,1.4vw,20px); letter-spacing:-.01em; color:var(--warm-900); }
        .su-cd{ margin-top:9px; font:400 15px/1.5 var(--font-body); color:var(--warm-600); }
        @media (max-width:820px){ .su-grid{ grid-template-columns:1fr; gap:36px; max-width:460px; margin-inline:auto; } }
      `}</style>
    </section>
  );
}
/* ---------- Automation §3 — "Part of one platform" (2 link cards) ---------- */
const OP_CARDS = [
  { t: 'How We Track', href: 'how-we-track.html', link: 'Explore tracking systems',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l2.5-7 5 14 2.5-7H21" /></svg>,
    d: 'Reliable tracking and attribution that credits every sale to the publisher who drove it, so your reporting and payouts stay accurate.' },
  { t: 'Partner Discovery', href: 'partner-discovery.html', link: 'Find verified partners',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>,
    d: 'Search over 1,000,000 publishers by category, channel, and audience, and invite the ones that fit, or have our team recruit them for you.' },
];
function HowItWorks() {
  return (
    <section id="auto-platform" className="op-sec">
      <div className="wrap">
        <h2 className="op-title" data-reveal>Part of one platform</h2>
        <p className="op-sub" data-reveal data-reveal-delay="1">Automation works alongside the rest of the platform. For tracking and attribution, see How We Track. To find and recruit publishers, see Partner Discovery.</p>
        <div className="op-grid">
          {OP_CARDS.map((c, i) => (
            <a className="op-card" href={c.href} key={i} data-reveal data-reveal-delay={i + 1}>
              <div className="op-head"><h3 className="op-ct">{c.t}</h3><span className="op-ic" aria-hidden="true">{c.ic}</span></div>
              <p className="op-cd">{c.d}</p>
              <span className="op-link">{c.link} <Arrow /></span>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        .op-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .op-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .op-sub{ text-align:center; margin:14px auto 0; max-width:620px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        .op-grid{ margin-top:clamp(30px,4.5vh,50px); display:grid; grid-template-columns:1fr 1fr; gap:clamp(20px,2.5vw,32px); }
        .op-card{ display:block; background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-xl); padding:clamp(26px,2.6vw,40px); box-shadow:0 1px 3px rgba(15,28,46,.04); transition:box-shadow .2s ease, transform .2s ease, border-color .2s ease; }
        .op-card:hover{ box-shadow:0 16px 38px rgba(15,28,46,.08); border-color:var(--warm-300); }
        .op-head{ display:flex; align-items:center; justify-content:space-between; gap:14px; }
        .op-ct{ font-family:var(--font-display); font-weight:800; font-size:clamp(18px,1.5vw,21px); letter-spacing:-.01em; color:var(--warm-900); }
        .op-ic{ flex:0 0 auto; width:24px; height:24px; color:var(--midnight-light); }
        .op-ic svg{ width:24px; height:24px; }
        .op-cd{ margin-top:16px; font:400 15px/1.6 var(--font-body); color:var(--warm-600); }
        .op-link{ display:inline-flex; align-items:center; gap:8px; margin-top:22px; font:700 15px/1 var(--font-body); color:var(--midnight-light); }
        .op-link svg{ transition:transform .2s ease; }
        .op-card:hover .op-link svg{ transform:translateX(3px); }
        @media (max-width:760px){ .op-grid{ grid-template-columns:1fr; gap:18px; max-width:520px; margin-inline:auto; } }
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
        <ConsolidatedView />
        <HowItWorks />
        <PubCTA />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PublisherApp />);
