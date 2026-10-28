/* ============================================================================
   publishers.jsx — "For Publishers" overview page.
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, PlatformTabs, FinalCta, HeroHexDeco, HERO_HEXDECO_CSS, LogoMarquee } = window;

/* ---------- Section 1 — Hero ---------------------------------------------- */
function PubHero() {
  // Right-hand visual is a 4-slide fade slider: each slide's photo + its floating UI
  // cross-fade in/out together every 1.5s. Reduced-motion holds slide 1.
  const [slide, setSlide] = React.useState(0);
  const N = 4;
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % N), 2000);
    return () => clearInterval(id);
  }, []);
  const on = (i) => 'ph-slide' + (slide === i ? ' is-active' : '');
  return (
    <section id="pub-hero" className="ph-sec">
      <HeroHexDeco />
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <div className="ph-copy">
          <span className="ph-eyebrow" data-reveal>Affiliate Marketing for Advertisers</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Grow your sales with the right publishers.</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="2">Reach 1,000,000+ publishers, pay only for verified sales, and see results sooner. Launch in days, not months, whatever you sell.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="3">
            <a href="/advertisers/" className="btn btn-advertiser btn-lg">See plans and pricing <Arrow /></a>
          </div>
          <span className="ph-free" data-reveal data-reveal-delay="3">Our team helps you launch, and you only pay when a sale is real.</span>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <img className="ph-hexbg" src="media/figma/advertiser-slider-background.png" alt="" aria-hidden="true" />
          {/* Slide 0 — dashboard */}
          <div className={on(0)} aria-hidden={slide !== 0}>
            <img className="ph-hexart" src="media/figma/advertiser-hero-card-01.png" alt="Advertiser dashboard with gross sales, commission paid and performance trends" loading="eager" />
            <div className="ph-slide-ui">
              <div className="ph-glass ph-ga-conv"><div className="ph-av-stat"><span className="ph-av-lbl"><span className="ph-av-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m7 14 4-4 3 3 5-6" /></svg></span>Conversion Rate</span><span className="ph-av-row"><b>10%</b><em>&uarr;9%</em></span></div></div>
            </div>
          </div>

          {/* Slide 1 — find & invite publishers */}
          <div className={on(1)} aria-hidden={slide !== 1}>
            <img className="ph-hexart" src="media/figma/advertiser-hero-card-02.png" alt="1,428 active publishers found — Clarke, Fernandez, Michelle, Jeanne" loading="eager" />
            <div className="ph-slide-ui">
              <div className="ph-glass ph-ga-cat"><div className="ph-cat"><small>Publishers for</small>Fashion category</div></div>
            </div>
          </div>

          {/* Slide 2 — 11.11 campaign */}
          <div className={on(2)} aria-hidden={slide !== 2}>
            <img className="ph-hexart" src="media/figma/advertiser-hero-card-03.png" alt="11.11 Campaign" loading="eager" />
            <div className="ph-slide-ui">
              <div className="ph-glass ph-ga-live"><div className="ph-live">11.11 Campaign is live!</div></div>
              <div className="ph-glass ph-ga-appl"><div className="ph-cat"><small>Applicants</small>428 publishers</div></div>
            </div>
          </div>

          {/* Slide 3 — validated conversions */}
          <div className={on(3)} aria-hidden={slide !== 3}>
            <img className="ph-hexart" src="media/figma/advertiser-hero-card-04.png" alt="918 conversions found for 11.11 campaign" loading="eager" />
            <div className="ph-slide-ui">
              <div className="ph-glass ph-ga-vc"><div className="ph-cat"><small>Validated Conversion</small>316</div></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ph-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(40px,6vh,84px) 0 clamp(56px,9vh,116px); }
        ${HERO_HEXDECO_CSS}
        .phd1{ top:-62%; right:-10%; }
        .phd2{ top:6%; right:-30%; }
        .phd3{ left:32%; bottom:-54%; }
        /* gradient blend from the hero into the logo strip below */
        .ph-basefade{ position:absolute; left:0; right:0; bottom:0; height:clamp(120px,24%,240px); z-index:0; pointer-events:none;
          background:linear-gradient(180deg, rgba(250,250,248,0) 0%, rgba(250,250,248,.65) 55%, var(--warm-50) 100%); }
        .ph-wrap{ position:relative; z-index:1; display:grid; grid-template-columns:1.02fr .98fr; gap:clamp(24px,4vw,60px); align-items:center; }
        /* copy */
        .ph-copy{ min-width:0; }
        .ph-eyebrow{ display:inline-block; font:600 13px/1 var(--font-body); letter-spacing:.02em; color:var(--midnight-light);
          background:var(--midnight-light-tint); border-radius:var(--r-full); padding:8px 15px; }
        .ph-title{ margin-top:20px; font-size:clamp(38px,5.4vw,64px); line-height:1.0; letter-spacing:-.03em; color:var(--warm-900); }
        .ph-sub{ margin-top:20px; max-width:520px; font-size:clamp(16px,1.4vw,19px); line-height:1.55; color:var(--warm-600); }
        .ph-actions{ margin-top:30px; display:flex; gap:12px; flex-wrap:wrap; }
        .ph-free{ display:block; margin-top:16px; font:500 14px/1 var(--font-body); color:var(--warm-400); }
        /* visual */
        /* aspect matches the Figma hexagon (437×492) so the pointy-top hex reads regular, not stretched-wide */
        .ph-visual{ position:relative; aspect-ratio:1/1; max-width:520px; width:100%; margin-left:auto; }
        /* shared hexagon backdrop behind every slide */
        .ph-hexbg{ position:absolute; inset:0; width:100%; height:100%; object-fit:contain; z-index:0; display:block;
          filter:drop-shadow(0 34px 60px rgba(15,28,46,.12)); }
        /* pre-exported hexagon slide graphic (transparent corners), shown at natural proportions */
        .ph-hexart{ position:absolute; inset:0; width:100%; height:100%; object-fit:contain; z-index:1; display:block; }
        .ph-hexglow{ position:absolute; inset:2% 2% 2% 2%; z-index:0; pointer-events:none;
          display:none;  /* glow retired in v3.5.2 */ }
        /* soft hex plate behind the photo — rounded pointy-top (r≈38.67), ember → midnight gradient */
        .ph-hexplate{ position:absolute; inset:0; z-index:0; background:var(--warm-100);
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/100% 100% no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/100% 100% no-repeat;
          filter:drop-shadow(0 26px 54px rgba(15,28,46,.10)); }
        /* ---- fade slider: each slide (photo + its UI) cross-fades in/out ---- */
        .ph-slide{ position:absolute; inset:0; z-index:1; opacity:0; transition:opacity .85s cubic-bezier(.4,0,.2,1); }
        .ph-slide.is-active{ opacity:1; z-index:2; }
        @media (prefers-reduced-motion: reduce){ .ph-slide{ transition:none; } }
        .ph-photo{ position:absolute; inset:0; z-index:1;
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/100% 100% no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/100% 100% no-repeat; }
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
        .ph-g-pay-a{ left:-8%; top:14%; }
        .ph-g-pay-b{ left:-8%; top:31%; }
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
        /* ===== advertiser hero slides ===== */
        /* white UI card centred in the hexagon plate (slides 1 & 3) */
        .ph-uicard{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); z-index:2; width:78%; max-height:80%; overflow:hidden;
          background:#fff; border-radius:var(--r-xl); box-shadow:0 18px 40px rgba(15,28,46,.14); padding:15px 15px 8px; display:flex; flex-direction:column; }
        .ph-uc-head{ font:600 12px/1.3 var(--font-body); color:var(--warm-600); padding:0 3px 10px; }
        .ph-plist{ display:flex; flex-direction:column; }
        .ph-plist li{ display:flex; align-items:center; gap:10px; padding:8px 3px; border-top:1px solid var(--warm-100); }
        .ph-plist li:first-child{ border-top:none; }
        .ph-pl-av{ width:34px; height:34px; border-radius:var(--r-lg); flex:0 0 auto; display:flex; align-items:center; justify-content:center;
          background:linear-gradient(150deg,#dbe4f2,#eef2f8); color:var(--midnight-light); font-family:var(--font-display); font-weight:800; font-size:14px; }
        .ph-pl-meta{ display:flex; flex-direction:column; gap:1px; min-width:0; flex:1; }
        .ph-pl-meta b{ font:700 13px/1.2 var(--font-body); color:var(--warm-900); }
        .ph-pl-meta small{ font:400 11px/1.2 var(--font-body); color:#9a938c; }
        .ph-pl-btn{ flex:0 0 auto; font:600 12px/1 var(--font-body); color:#fff; background:var(--midnight-light); border-radius:var(--r-full); padding:7px 14px; }
        .ph-clist{ display:flex; flex-direction:column; }
        .ph-clist li{ display:flex; align-items:center; gap:11px; padding:6px 3px; }
        .ph-cl-chk{ width:22px; height:22px; border-radius:50%; background:#10b981; flex:0 0 auto; display:flex; align-items:center; justify-content:center; }
        .ph-cl-chk svg{ width:13px; height:13px; }
        .ph-cl-meta{ display:flex; flex-direction:column; }
        .ph-cl-meta b{ font-family:var(--font-display); font-weight:800; font-size:15px; letter-spacing:-.01em; color:var(--warm-900); }
        .ph-cl-meta small{ font:400 11px/1.2 var(--font-body); color:#9a938c; }
        /* 11.11 campaign text over the product photo (slide 2) */
        .ph-camp{ position:absolute; left:11%; bottom:17%; z-index:2; display:flex; flex-direction:column; color:#fff; text-shadow:0 3px 12px rgba(0,0,0,.45); pointer-events:none; }
        .ph-camp b{ font-family:var(--font-display); font-weight:800; font-size:clamp(26px,6vw,36px); line-height:1; letter-spacing:-.02em; }
        .ph-camp span{ font-family:var(--font-body); font-weight:700; font-size:clamp(15px,3.2vw,19px); margin-top:3px; }
        /* glass positions */
        .ph-ga-conv{ left:-8%; top:14%; }
        .ph-ga-cat{ left:-9%; bottom:12%; }
        .ph-ga-live{ left:-2%; top:8%; }
        .ph-ga-appl{ right:-7%; bottom:12%; }
        .ph-ga-vc{ left:-8%; top:14%; }
        /* conversion-rate stat card (slide 0) */
        .ph-av-stat{ background:#fff; border-radius:var(--r-xl); box-shadow:0 2px 6px rgba(15,28,46,.08); padding:11px 14px; display:flex; flex-direction:column; gap:5px; white-space:nowrap; }
        .ph-av-lbl{ display:inline-flex; align-items:center; gap:7px; font:600 12px/1.2 var(--font-body); color:var(--warm-900); }
        .ph-av-ic{ display:inline-flex; align-items:center; justify-content:center; width:20px; height:20px; border-radius:var(--r-md); background:var(--midnight-light-tint); color:var(--midnight-light); flex:0 0 auto; }
        .ph-av-ic svg{ width:12px; height:12px; }
        .ph-av-row{ display:flex; align-items:baseline; gap:8px; }
        .ph-av-row b{ font-family:var(--font-display); font-weight:800; font-size:22px; letter-spacing:-.02em; color:var(--warm-900); }
        .ph-av-row em{ font-style:normal; font-weight:700; font-size:11px; color:#047857; background:#dcfce7; border-radius:var(--r-md); padding:2px 6px; }
        /* label/value pill (Publishers for…, Applicants…, Validated Conversion…) */
        .ph-cat{ background:#fff; border-radius:var(--r-lg); box-shadow:0 2px 6px rgba(15,28,46,.08); padding:9px 14px; white-space:nowrap; display:flex; flex-direction:column; gap:2px;
          font-family:var(--font-body); font-weight:700; font-size:14px; color:var(--warm-900); }
        .ph-cat small{ font:500 10.5px/1.1 var(--font-body); color:#9a938c; }
        .ph-live{ background:#fff; border-radius:var(--r-lg); box-shadow:0 2px 6px rgba(15,28,46,.08); padding:10px 16px; white-space:nowrap;
          font-family:var(--font-body); font-weight:700; font-size:14px; color:var(--warm-900); }
        @media (max-width:900px){
          .ph-wrap{ grid-template-columns:1fr; gap:36px; }
          .ph-copy{ text-align:center; display:flex; flex-direction:column; align-items:center; }
          .ph-sub{ margin-left:auto; margin-right:auto; }
          .ph-visual{ order:-1; max-width:420px; margin:0 auto; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 2 — Logo strip ---------------------------------------- */
function PubLogos() {
  return <LogoMarquee caption="Trusted by brands your customers already know, across retail, travel, beauty, and finance." fill={false} />;
}

/* ---------- Final CTA (shared FinalCta, ia-sections.jsx) ----------------- */
const PUB_CTA_CSS = `
        .pc-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(199px,33.12vh,365px) 0 clamp(232px,35.88vh,430px); }
        .pc-title{ font-size:clamp(30px,4vw,48px); line-height:1.15; letter-spacing:-.03em; color:var(--warm-900); max-width:900px; }
      `;
function PubCTA() {
  return <FinalCta title="Start growing your business with the right plan today." href="/advertisers/" tone="advertiser" label="See plans and pricing" css={PUB_CTA_CSS} />;
}

/* ---------- Advertiser Section 3 — "Whatever your goal, grow it here." ------ */
const ADV_GOALS = [
  {
    key: 'awareness', title: 'Build awareness',
    desc: 'Get your brand in front of new audiences through creators, content sites, and comparison sites.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>),
  },
  {
    key: 'customers', title: 'Win customers',
    desc: 'Turn attention into action with promotions that reach new buyers and bring existing ones back.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.2" /><path d="M3.4 20a6 6 0 0 1 11.2 0" /><path d="M18.6 6.1c1.2-1.3 3.4-.4 3.4 1.3 0 1.5-2.2 3-3.4 3.9-1.2-.9-3.4-2.4-3.4-3.9 0-1.7 2.2-2.6 3.4-1.3Z" /></svg>),
  },
  {
    key: 'revenue', title: 'Grow revenue',
    desc: 'Drive result-driven growth with publishers who are paid to perform, tracked down to every conversion.',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>),
  },
];
function AdvGoals() {
  return (
    <section id="adv-goals" className="ag-sec">
      <div className="wrap">
        <h2 className="ag-title" data-reveal>Whatever your goal, grow it here.</h2>
        <p className="ag-sub" data-reveal data-reveal-delay="1">Whatever your goal, there is a publisher and a strategy for it.</p>
        <div className="ag-grid">
          {ADV_GOALS.map((g, i) => (
            <div className="ag-item" key={g.key} data-reveal data-reveal-delay={i + 1}>
              <span className="ag-ico" aria-hidden="true">{g.icon}</span>
              <h3 className="ag-item-t">{g.title}</h3>
              <p className="ag-item-d">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .ag-sec{ background:var(--warm-50); padding:clamp(77px,11.11vh,152px) 0 clamp(63px,9.52vh,121px); }
        .ag-title{ text-align:center; font-size:clamp(30px,4vw,48px); line-height:1.1; letter-spacing:-.03em; color:var(--warm-900); }
        .ag-sub{ text-align:center; margin-top:14px; font-size:18px; line-height:1.4; color:var(--warm-600); }
        .ag-grid{ margin-top:clamp(40px,6vh,72px); display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(28px,3.4vw,56px); max-width:1120px; margin-inline:auto; }
        .ag-ico{ width:42px; height:42px; border-radius:var(--r-lg); background:var(--midnight-light-tint); display:inline-flex; align-items:center; justify-content:center; color:var(--midnight); }
        .ag-ico svg{ width:22px; height:22px; }
        .ag-item-t{ margin-top:22px; font-family:var(--font-display); font-weight:800; font-size:21px; letter-spacing:-.02em; color:var(--warm-900); }
        .ag-item-d{ margin-top:10px; font:400 16px/1.31 var(--font-body); color:var(--warm-600); max-width:330px; }
        @media (max-width:820px){ .ag-grid{ grid-template-columns:1fr; gap:32px; max-width:440px; } }
      `}</style>
    </section>
  );
}
/* ---------- Advertiser Section 4 — "One platform…" (auto-advancing stepper) --
   4 steps; the active one expands (header + description) with a top→bottom fill
   bar that takes 5s, then advances to the next. Right image swaps per step. */
const ADV_PLATFORM = [
  {
    key: 'find', t: 'Find and choose your publishers',
    d: (<>Search 1,000,000+ publishers by audience, channel, and membership tier, and approve who represents your brand. Prefer a hand? Request recruitment and our Advertiser Solutions team sources and recommends publishers that fit your brand, and re-engages the ones who go quiet. <a href="/advertisers/partner-discovery/">Partner Discovery</a></>),
    img: 'adv-plat-1.png',
  },
  {
    key: 'launch', t: 'Launch offers and share your creatives',
    d: 'Set your commission, launch an offer, and upload your campaigns for publishers to pick up, then see who is promoting them.',
    img: 'adv-plat-2.png',
  },
  {
    key: 'track', t: 'Track every result in real time',
    d: 'Watch clicks, conversions, and payouts as they happen, with conversion-level detail and exports whenever you need them.',
    img: 'adv-plat-3.png',
  },
  {
    key: 'reward', t: 'Reward what works',
    d: 'Set tiered commissions and adjust payouts per publisher, so your best performers earn more and your budget follows your strongest results.',
    img: 'adv-plat-4.png',
  },
];
const ADV_PLATFORM_CSS = `
        .pf-sec{ background:var(--warm-50); padding:clamp(77px,11.11vh,152px) 0 clamp(89px,14.28vh,191px); overflow:hidden; }
        .pf-title{ text-align:center; font-size:clamp(30px,4vw,48px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .pf-sub{ text-align:center; margin-top:14px; font-size:16px; line-height:1.4; color:var(--warm-600); }
        .pf-grid{ margin-top:clamp(40px,6vh,72px); display:grid; grid-template-columns:minmax(0,447px) 1fr; gap:clamp(32px,4vw,64px); align-items:center; }
        .pf-steps{ display:flex; flex-direction:column; }
        .pf-step{ position:relative; display:flex; gap:20px; align-items:stretch; text-align:left; background:none; border:none; cursor:pointer; padding:34px 0; width:100%; }
        .pf-rail-fill{ position:absolute; left:0; top:0; width:4px; border-radius:var(--r-full); background:var(--midnight-light); height:0; }
        .pf-step-t{ display:block; font-family:var(--font-display); font-weight:800; font-size:21px; letter-spacing:-.02em; color:var(--warm-900); transition:opacity .3s ease; }
        .pf-step.on .pf-step-d{ margin-top:14px; }
        .pf-step-d a{ color:var(--midnight-light); font-weight:600; text-decoration:underline; text-underline-offset:2px; }
        /* light ember→cool gradient container; the dashboard sits inset top-left and bleeds off the right */
        .pf-visual{ position:relative; aspect-ratio:1152/632; border-radius:var(--r-xl); overflow:hidden;
          background:var(--warm-100); }
        /* dashboard fills the right half flush to the right/bottom edges (bleeds off right); gradient frames the top-left */
        .pf-img{ position:absolute; top:clamp(20px,3.2vw,40px); left:clamp(20px,3.2vw,40px);
          width:calc(100% - clamp(20px,3.2vw,40px)); height:calc(100% - clamp(20px,3.2vw,40px));
          object-fit:cover; object-position:left top; border-radius:16px 0 0 0;
          opacity:0; transition:opacity .5s ease; }
        @media (max-width:900px){
          .pf-grid{ grid-template-columns:1fr; gap:28px; }
          .pf-visual{ order:-1; }
        }`;
function AdvPlatform() {
  return (
    <PlatformTabs id="adv-platform" items={ADV_PLATFORM} css={ADV_PLATFORM_CSS}
      title="One platform, everything you need to run your program"
      sub="Find publishers, launch offers, share your creatives, and track every sale, all in one place." />
  );
}
/* ---------- "Traffic Validation" animated graphic (canvas) -----------------
   Story, left → right: raw clicks travel along loose curves into a checkpoint.
   Each one is judged there — valid traffic turns success-green, snaps into an
   ordered lane and runs into the "Validated sales" counter; invalid traffic
   turns grey and drops away. Unhurried pace to match the rest of the page.
   Flat strokes only (no glows), Midnight + Warm + success (no Ember on
   Advertiser pages). Layout is seeded, so it composes the same on every load.
   First time it scrolls into view the paths draw in; it pauses off-screen;
   reduced-motion gets one still, finished frame. */
const TRAFFIC_CONFIG = {
  seed: 7, sources: 18, lanes: 6, gateXFrac: 0.40, chipW: 176, chipRight: 28,
  spawnPerSec: 2.6, validShare: 0.7, leftSecs: [3.6, 4.6], rightSecs: [3.4, 4.0],
  startCount: 1284, introSecs: 1.5,
};
function initTrafficViz(canvas, chip, userConfig) {
  const C = Object.assign({}, TRAFFIC_CONFIG, userConfig || {});
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css = getComputedStyle(document.documentElement);
  const tok = (n, f) => (css.getPropertyValue(n).trim() || f);
  const rgb = (h) => { const n = parseInt(h.replace('#', ''), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  const MID = rgb(tok('--midnight-light', '#3D5A80')), GATE = rgb(tok('--midnight-light', '#3D5A80'));
  const OK = rgb(tok('--success', '#10B981')), NO = rgb(tok('--warm-300', '#D2D2CC'));
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const mix = (a, b, k) => [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * k));
  // seeded RNG (mulberry32) → same composition every load
  let s = C.seed >>> 0;
  const rand = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const rnd = (a, b) => a + rand() * (b - a);
  const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
  const qpt = (P, t) => { const u = 1 - t; return [u * u * P[0] + 2 * u * t * P[2] + t * t * P[4], u * u * P[1] + 2 * u * t * P[3] + t * t * P[5]]; };
  const numEl = chip && chip.querySelector('[data-tv-num]');
  let W = 0, H = 0, dpr = 1, gx = 0, chipX = 0, chipY = 0, src = [], lanes = [], dots = [], rings = [];
  let count = C.startCount, intro = reduce ? 1 : 0, spawnAcc = 0, warmed = false;
  const setCount = () => { if (numEl) numEl.textContent = count.toLocaleString('en-US'); };
  function layout() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    if (Math.round(r.width) === Math.round(W) && Math.round(r.height) === Math.round(H) && src.length) return false;   // unchanged → keep traffic flowing
    W = Math.max(1, r.width); H = Math.max(1, r.height);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    gx = W * C.gateXFrac; chipX = W - C.chipRight - C.chipW; chipY = H / 2;
    s = C.seed >>> 0;
    // ordered lanes: a short straight run from the gate, then a long, gentle S-bend (cubic with level
    // tangents at both ends) that merges into the chip's left edge. Each lane is pre-sampled into a
    // polyline with cumulative lengths so dots move along it at an even speed.
    lanes = [];
    const bendX = gx + (chipX - gx) * 0.3, span = chipX - bendX;
    for (let j = 0; j < C.lanes; j++) {
      const y = H * (0.22 + 0.56 * (j + 0.5) / C.lanes), ey = chipY + (y - chipY) * 0.12;
      const B = [bendX, y, bendX + span * 0.5, y, chipX - span * 0.5, ey, chipX, ey];
      const pts = [[gx, y]];
      for (let i = 0; i <= 40; i++) { const t = i / 40, u = 1 - t; pts.push([u * u * u * B[0] + 3 * u * u * t * B[2] + 3 * u * t * t * B[4] + t * t * t * B[6], u * u * u * B[1] + 3 * u * u * t * B[3] + 3 * u * t * t * B[5] + t * t * t * B[7]]); }
      const cum = [0];
      for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
      lanes.push({ y, pts, cum, len: cum[cum.length - 1] });
    }
    // loose source curves: scattered starts on the left edge, each ending exactly on a lane's entry point
    // (sorted top→bottom and shared out in order, so every entry continues into its lane and curves cross less)
    const starts = Array.from({ length: C.sources }, () => H * rnd(0.04, 0.96)).sort((a, b) => a - b);
    src = starts.map((y0, i) => {
      const L = lanes[Math.min(C.lanes - 1, Math.floor(i * C.lanes / C.sources))], y1 = L.y;
      return { L, P: [W * rnd(-0.02, 0.06), y0, gx * rnd(0.35, 0.7), (y0 + y1) / 2 + H * rnd(-0.16, 0.16), gx, y1], op: rnd(0.09, 0.16) };
    });
    dots = []; rings = []; warmed = false;
    return true;
  }
  function spawn() {
    const S = src[Math.floor(Math.random() * src.length)];
    dots.push({ S, ok: Math.random() < C.validShare, ph: 0, t: 0, dur: C.leftSecs[0] + Math.random() * (C.leftSecs[1] - C.leftSecs[0]), r: 2.2 + Math.random() * 1, vy: 0, x: 0, y: 0, a: 1 });
  }
  function judge(d) {
    rings.push({ x: gx, y: d.S.P[5], t: 0, ok: d.ok });
    if (d.ok) { d.ph = 1; d.t = 0; d.L = d.S.L; d.dur = C.rightSecs[0] + Math.random() * (C.rightSecs[1] - C.rightSecs[0]); }
    else { d.ph = 2; d.t = 0; d.x = gx; d.y = d.S.P[5]; d.vy = 0; d.vx = -8 - Math.random() * 6; }
  }
  // position along a valid dot's lane at fraction k of its length (even speed from gate to chip)
  function rightPos(d, k) {
    const L = d.L, target = k * L.len; let i = 1;
    while (i < L.cum.length - 1 && L.cum[i] < target) i++;
    const seg = L.cum[i] - L.cum[i - 1] || 1, f = (target - L.cum[i - 1]) / seg, a = L.pts[i - 1], b = L.pts[i];
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
  }
  function update(dt) {
    if (intro < 1) intro = Math.min(1, intro + dt / C.introSecs);
    // fast-forward a few seconds unseen so traffic is already flowing end to end; it fades in as the paths finish drawing
    if (!warmed) { for (let i = 0; i < 200; i++) step(0.05); rings = []; count = C.startCount; setCount(); warmed = true; }
    step(dt);
  }
  function step(dt) {
    { spawnAcc += dt * C.spawnPerSec; while (spawnAcc >= 1) { spawn(); spawnAcc -= 1; } }
    for (const d of dots) {
      d.t += dt;
      if (d.ph === 0 && d.t >= d.dur) judge(d);
      else if (d.ph === 1 && d.t >= d.dur) { d.done = true; count += 1; if (warmed) setCount(); }
      else if (d.ph === 2) { d.vy += 60 * dt; d.x += d.vx * dt; d.y += d.vy * dt; d.a -= dt * 0.9; if (d.a <= 0) d.done = true; }
    }
    dots = dots.filter((d) => !d.done);
    for (const R of rings) R.t += dt;
    rings = rings.filter((R) => R.t < 1);
  }
  function strokePath(draw, p) {   // draws a path revealed to fraction p (intro)
    if (p <= 0) return; if (p < 1) ctx.setLineDash([2000 * p, 4000]); draw(); ctx.setLineDash([]);
  }
  function render() {
    ctx.clearRect(0, 0, W, H);
    const pL = ease(intro / 0.55), pG = ease((intro - 0.3) / 0.35), pR = ease((intro - 0.5) / 0.5);
    ctx.lineCap = 'round'; ctx.lineWidth = 1;
    for (const S of src) { ctx.strokeStyle = rgba(MID, S.op); strokePath(() => { ctx.beginPath(); ctx.moveTo(S.P[0], S.P[1]); ctx.quadraticCurveTo(S.P[2], S.P[3], S.P[4], S.P[5]); ctx.stroke(); }, pL); }
    ctx.lineWidth = 1.25;
    for (const L of lanes) { ctx.strokeStyle = rgba(MID, 0.2); strokePath(() => { ctx.beginPath(); ctx.moveTo(L.pts[0][0], L.pts[0][1]); for (const p of L.pts) ctx.lineTo(p[0], p[1]); ctx.stroke(); }, pR); }
    // checkpoint: a Midnight-Light bar that grows from its centre
    if (pG > 0) {
      const top = H * 0.14, bot = H * 0.86, mid = (top + bot) / 2, half = (bot - top) / 2 * pG;
      ctx.strokeStyle = rgba(GATE, 1); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx, mid - half); ctx.lineTo(gx, mid + half); ctx.stroke();
    }
    // judgement rings — flat stroke that expands and fades
    for (const R of rings) {
      const k = R.t / 1; ctx.strokeStyle = rgba(R.ok ? OK : NO, 0.9 * (1 - k)); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(R.x, R.y, 3 + 9 * ease(k), 0, Math.PI * 2); ctx.stroke();
    }
    ctx.globalAlpha = ease((intro - 0.6) / 0.4);
    for (const d of dots) {
      let x, y, c, a = 1;
      if (d.ph === 0) { const k = d.t / d.dur; [x, y] = qpt(d.S.P, k); c = MID; a = Math.min(1, k * 6) * 0.85; }
      else if (d.ph === 1) { [x, y] = rightPos(d, Math.min(1, d.t / d.dur)); c = mix(MID, OK, Math.min(1, d.t / 0.5)); }
      else { x = d.x; y = d.y; c = NO; a = Math.max(0, d.a); }
      ctx.fillStyle = rgba(c, a); ctx.beginPath(); ctx.arc(x, y, d.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  // still frame for reduced motion / export: dots placed along every stage of the journey
  function stillFrame() {
    dots = []; rings = [];
    src.forEach((S, i) => { if (i % 2 === 0) dots.push({ S, ph: 0, t: 0.35 + 0.5 * ((i * 37) % 10) / 10, dur: 1, r: 2.2 }); });
    lanes.forEach((L, j) => [0.3, 0.55, 0.85].forEach((k, n) => dots.push({ S: src.find((x) => x.L === L), L, ph: 1, t: k + 0.3, dur: 1.3, r: 2.4 })));
    rings.push({ x: gx, y: src[4].P[5], t: 0.2, ok: true }, { x: gx, y: src[11].P[5], t: 0.25, ok: false });
    render();
  }
  canvas.__tvRenderFrame = () => stillFrame();
  let raf = 0, last = 0, visible = false, started = false;
  function frame(now) { const dt = Math.min(0.05, (now - last) / 1000 || 0); last = now; update(dt); render(); raf = visible ? requestAnimationFrame(frame) : 0; }
  function play() { if (!raf && !reduce) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
  layout(); setCount();
  if (reduce) { stillFrame(); if (chip) chip.classList.add('tv-in'); }
  const onResize = () => { if (layout() && (reduce || !started)) stillFrame(); };
  window.addEventListener('resize', onResize);
  let io = null;
  const enter = () => { visible = true; if (!started) { started = true; if (chip) setTimeout(() => chip.classList.add('tv-in'), C.introSecs * 650); } play(); };
  if (reduce) { /* static */ }
  else if ('IntersectionObserver' in window) { io = new IntersectionObserver((es) => { if (es[0].isIntersecting) enter(); else { visible = false; stop(); } }, { threshold: 0.3 }); io.observe(canvas); }
  else enter();
  return function destroy() { stop(); window.removeEventListener('resize', onResize); if (io) io.disconnect(); };
}
function TrafficViz() {
  const ref = React.useRef(null), chipRef = React.useRef(null);
  React.useEffect(() => { if (!ref.current) return; return initTrafficViz(ref.current, chipRef.current); }, []);
  return (
    <>
      <canvas ref={ref} className="rl-canvas" aria-hidden="true" />
      <div ref={chipRef} className="tv-chip" aria-hidden="true">
        <span className="tv-chip-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></span>
        <span className="tv-chip-txt"><span className="tv-chip-l">Validated sales</span><b data-tv-num>1,284</b></span>
      </div>
    </>
  );
}
/* ---------- Advertiser Section 5 — "You only pay for sales that are real" ---- */
const ADV_REAL_POINTS = [
  'Every conversion verified before payout',
  'Fraud protection built in',
  'Every sale tracked to the publisher who drove it',
];
function AdvReal() {
  return (
    <section id="adv-real" className="rl-sec">
      <div className="wrap">
        <div className="rl-card" data-reveal>
          <div className="rl-viz" aria-hidden="true"><TrafficViz /></div>
          <div className="rl-body">
            <h2 className="rl-title">You only pay for<br />sales that are real</h2>
            <p className="rl-desc">Every conversion is checked and validated before you pay, and fraud protection screens out fake clicks and junk traffic. You approve what counts, so your budget only ever goes to genuine results, never wasted spend.</p>
            <ul className="rl-list">
              {ADV_REAL_POINTS.map((t) => (
                <li key={t}>
                  <span className="rl-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <style>{`
        .rl-sec{ position:relative; z-index:2; background:transparent; padding:clamp(48px,7vh,96px) 0; }
        .rl-card{ position:relative; overflow:hidden; border-radius:var(--r-xl); background:#fff;
          box-shadow:0 18px 44px rgba(15,28,46,.04); min-height:446px; display:flex; align-items:center;
          padding:clamp(32px,5vw,74px); }
        /* animated traffic-validation canvas fills the right; masked so its left edge melts into the card white */
        .rl-viz{ position:absolute; right:0; top:0; bottom:0; width:min(60%, 760px); z-index:0;
          -webkit-mask-image:linear-gradient(90deg, transparent 0%, #000 16%); mask-image:linear-gradient(90deg, transparent 0%, #000 16%); }
        .rl-canvas{ width:100%; height:100%; display:block; }
        /* "Validated sales" counter the clean lanes run into (canvas reserves 176px + 28px on the right for it) */
        .tv-chip{ position:absolute; right:28px; top:50%; width:176px; transform:translateY(-50%); display:flex; align-items:center; gap:10px;
          padding:12px 14px; background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-lg); opacity:0; transition:opacity .5s ease; }
        .tv-chip.tv-in{ opacity:1; }
        .tv-chip-ic{ flex:0 0 auto; width:28px; height:28px; border-radius:var(--r-md); display:flex; align-items:center; justify-content:center;
          background:color-mix(in srgb, var(--success) 12%, #fff); color:var(--success); }
        .tv-chip-ic svg{ width:16px; height:16px; }
        .tv-chip-l{ display:block; font:500 12px/1.2 var(--font-body); color:var(--warm-600); }
        .tv-chip b{ display:block; margin-top:2px; font:700 20px/1.2 var(--font-body); color:var(--warm-900); font-variant-numeric:tabular-nums; }
        .rl-body{ position:relative; z-index:2; max-width:min(640px, 44%); }
        .rl-title{ font-size:clamp(30px,4vw,48px); line-height:1.14; letter-spacing:-.02em; color:var(--warm-900); }
        .rl-desc{ margin-top:20px; max-width:620px; font:400 16px/1.35 var(--font-body); color:var(--warm-600); }
        .rl-list{ margin-top:28px; display:flex; flex-direction:column; gap:16px; }
        .rl-list li{ display:flex; align-items:center; gap:12px; font:500 16px/1.3 var(--font-body); color:var(--warm-900); }
        .rl-check{ flex:0 0 auto; width:20px; height:20px; color:var(--success); display:inline-flex; align-items:center; justify-content:center; }
        .rl-check svg{ width:20px; height:20px; }
        /* mobile/narrow: the viz would sit on top of the copy — hide it entirely */
        @media (max-width:820px){ .rl-viz{ display:none; } .rl-body{ max-width:640px; } }
        @media (max-width:760px){
          .rl-fade{ background:linear-gradient(180deg, #fff 62%, rgba(255,255,255,.5) 100%); }
          .rl-graphic{ height:auto; width:100%; top:auto; bottom:0; object-position:center bottom; opacity:.5; }
        }
      `}</style>
    </section>
  );
}
/* ---------- Advertiser Section 6b — "This is what real sales add up to." ----
   Honeycomb of 8 hexagons (positions transcribed exactly from Figma → no overlap)
   with 3 stats overlaid. Coordinates are % of a 1440×1172 proportional stage. */
const ADV_STAT_HEX = [
  { x: 20.21, y: 49.67 }, { x: 42.85, y: 33.88 }, { x: 65.28, y: 49.67 }, { x: 43.19, y: 65.72 },
  { x: 87.64, y: 65.72 }, { x: 87.64, y: 33.88 }, { x: 65.21, y: 16.98 }, { x: 87.29, y: 0 },
];
// number that counts up 0 → value the first time it scrolls into view
function CountStat({ prefix = '', value, decimals = 0, suffix = '' }) {
  const ref = React.useRef(null);
  const fmt = (n) => prefix + n.toFixed(decimals) + suffix;
  const [txt, setTxt] = React.useState(fmt(0));
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    if (prefersReduced()) { setTxt(fmt(value)); return; }
    let raf = 0, done = false;
    const animate = () => {
      const dur = 1600; let start = null;
      const step = (now) => {
        if (start == null) start = now;
        const p = Math.min(1, (now - start) / dur);
        setTxt(fmt(value * (1 - Math.pow(1 - p, 3))));   // easeOutCubic
        if (p < 1) raf = requestAnimationFrame(step); else setTxt(fmt(value));
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting && !done) { done = true; animate(); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return <b ref={ref}>{txt}</b>;
}
function AdvStats() {
  return (
    <section id="adv-stats" className="as-sec">
      <div className="as-stage" data-reveal>
        {ADV_STAT_HEX.map((h, i) => (
          <span className="as-hexcell" key={i} style={{ left: h.x + '%', top: h.y + '%' }}>
            <svg className="as-heximg" viewBox="0 0 347.854 395.886" preserveAspectRatio="none" aria-hidden="true"><path d="M164.586 2.50294C170.366 -0.834312 177.488 -0.834312 183.268 2.50294L338.513 92.1335C344.293 95.4707 347.854 101.638 347.854 108.313V287.574C347.854 294.248 344.293 300.416 338.513 303.753L183.268 393.384C177.488 396.721 170.366 396.721 164.586 393.384L9.34109 303.753C3.5608 300.416 0 294.248 0 287.574V108.313C0 101.638 3.5608 95.4707 9.34109 92.1335L164.586 2.50294Z" fill="var(--warm-100)" /></svg>
          </span>
        ))}
        <h2 className="as-heading">This is what real sales<br />add up to.</h2>
        <div className="as-stat as-s500"><CountStat value={500} suffix="+" /><span>brands</span></div>
        <div className="as-stat as-s11m"><CountStat value={1.1} decimals={1} suffix="M+" /><span>trusted publishers</span></div>
        <div className="as-stat as-s32b"><CountStat prefix="$" value={3.2} decimals={1} suffix="B+" /><span>sales driven for brands</span></div>
      </div>
      <style>{`
        /* pulled up/down into the neighbouring sections so the hexagons overlap them (neighbours are z-above → their card/heading stay on top) */
        .as-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:0; z-index:1; margin:-11vw 0; }
        .as-stage{ position:relative; width:100%; max-width:1440px; margin:0 auto; aspect-ratio:1440/1172; }
        .as-hexcell{ position:absolute; width:27.89%; aspect-ratio:1/1; }
        .as-heximg{ position:absolute; top:0.72%; left:6.7%; width:86.6%; height:98.56%; transform:rotate(-90deg); display:block; opacity:1; }
        .as-heading{ position:absolute; left:8.13%; top:45.6%; transform:translateY(-50%); z-index:2;
          font-family:var(--font-display); font-weight:800; font-size:clamp(26px,2.78vw,40px); line-height:1.15; letter-spacing:-.03em; color:var(--warm-900); }
        .as-stat{ position:absolute; z-index:2; display:flex; flex-direction:column; }
        .as-stat b{ font-family:var(--font-body); font-weight:700; font-size:clamp(40px,5.18vw,74px); line-height:1; letter-spacing:-.03em; color:#3d5a80; }
        .as-stat span{ margin-top:8px; font-family:var(--font-body); font-weight:400; font-size:clamp(17px,1.94vw,28px); line-height:1.15; letter-spacing:-.02em; color:var(--warm-900); white-space:nowrap; }
        .as-s500{ left:50%; top:46.5%; }
        .as-s11m{ left:26.67%; top:62.2%; }
        .as-s32b{ left:79.69%; top:63.3%; transform:translateX(-50%); }
        @media (max-width:860px){
          .as-stage{ aspect-ratio:auto; display:flex; flex-direction:column; align-items:center; text-align:center; gap:26px; padding:8px 20px 20px; }
          .as-hexcell{ display:none; }
          .as-heading{ position:static; transform:none; }
          .as-stat{ position:static; align-items:center; }
          .as-s32b{ transform:none; }
        }
      `}</style>
    </section>
  );
}
/* ---------- Advertiser Section 7 — "Proven results across every industry." --
   Case-study carousel: big photo cards (dark overlay) with a stat headline,
   quote, attribution and brand logo. Active card centred; sides peek faded. */
const ADV_CASES = [
  {
    key: 'shopee', bg: 'adv-case-shopee-bg.png', logo: 'adv-case-shopee-logo.png', logoAlt: 'Shopee',
    head: "Involve increased Shopee’s partnerships from 2,000 to 20,000 partners within 2 years",
    quote: "Our growth would not have been possible without Involve’s support. Involve has been one of our biggest affiliate partners from the start, and a benchmark & role model to our other partners.",
    who: 'Shopee Malaysia',
  },
  {
    key: 'decathlon', bg: 'adv-case-decathlon-bg.png', logo: 'adv-case-decathlon-logo.png', logoAlt: 'Decathlon',
    head: 'Involve saves time onboarding new partnerships & optimizes your existing ones',
    quote: "Involve saves us so much time by not having to reach out to new partners one by one. Involve also optimized our existing partnerships, where we saw a 3.4% growth despite implementing a commission cut.",
    who: 'DECATHLON',
  },
  {
    key: 'limitless', bg: 'adv-case-limitless-bg.png', logo: 'adv-case-limitless-logo.svg', logoAlt: 'Limitless Technology',
    head: 'A remarkable 8% increase in orders within a short period of time.',
    quote: 'Through their expansive network of publisher and influencer channels, which have become instrumental marketing avenues for us, we have achieved significant milestones. The growth we have experienced across our diverse range of brands has been nothing short of extraordinary, with a remarkable 8% increase in orders within a short period of time.',
    who: 'Limitless Technology',
  },
  {
    key: 'alibaba', bg: 'adv-case-alibaba-bg.png', logo: 'adv-case-alibaba-logo.png', logoAlt: 'Alibaba Group',
    head: 'Involve Asia focuses on a variety of traffic and development.',
    quote: 'Involve Asia focuses on a variety of traffic and development, and looks forward to common progress in the future!',
    who: 'Alibaba Group',
  },
];
function AdvResults() {
  const [active, setActive] = React.useState(0);
  const [dx, setDx] = React.useState(1060);
  const stageRef = React.useRef(null);
  const N = ADV_CASES.length, mod = (n) => ((n % N) + N) % N, go = (d) => setActive((v) => mod(v + d));
  React.useEffect(() => {
    if (prefersReduced()) return;
    const t = setTimeout(() => setActive((v) => mod(v + 1)), 6500);
    return () => clearTimeout(t);
  }, [active]);
  React.useEffect(() => {
    const m = () => { const w = stageRef.current ? stageRef.current.clientWidth : 1059; const cw = Math.min(1059, w - 160); setDx(Math.round(cw * 0.97 + 36)); };
    m(); window.addEventListener('resize', m); return () => window.removeEventListener('resize', m);
  }, []);
  return (
    <section id="adv-results" className="rs-sec">
      <div className="wrap">
        <div className="rs-head">
          <div>
            <h2 className="rs-title" data-reveal>Proven results across every industry.</h2>
            <p className="rs-sub" data-reveal data-reveal-delay="1">Real brands growing on the platform, in their own words.</p>
          </div>
          <div className="rs-nav" data-reveal data-reveal-delay="1">
            <button type="button" className="rs-arrow" onClick={() => go(-1)} aria-label="Previous case study">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
            </button>
            <button type="button" className="rs-arrow" onClick={() => go(1)} aria-label="Next case study">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>
        <div className="rs-stage" ref={stageRef} data-reveal data-reveal-delay="1">
          {ADV_CASES.map((c, j) => {
            let d = (j - active + N) % N; if (d > N / 2) d -= N;
            const on = d === 0;
            const style = {
              transform: `translateX(-50%) translateX(${d * dx}px) scale(${on ? 1 : 0.94})`,
              opacity: on ? 1 : 0.24, zIndex: on ? 2 : 1, pointerEvents: on ? 'auto' : 'none',
            };
            return (
              <article className={'rs-card' + (on ? ' on' : '')} key={c.key} style={style} aria-hidden={!on}>
                <img className="rs-bg" src={`media/figma/${c.bg}`} alt="" loading="lazy" />
                <span className="rs-scrim" aria-hidden="true" />
                <div className="rs-body">
                  <div className="rs-copy">
                    <h3 className="rs-cardhead">{c.head}</h3>
                    <p className="rs-quote">&ldquo;{c.quote}&rdquo;</p>
                    <p className="rs-who">{c.who}</p>
                  </div>
                  <img className="rs-logo" src={`media/figma/${c.logo}`} alt={c.logoAlt} loading="lazy" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <style>{`
        .rs-sec{ position:relative; z-index:2; background:transparent; padding:clamp(48px,7vh,96px) 0; overflow:hidden; }
        .rs-head{ display:flex; align-items:flex-end; justify-content:space-between; gap:24px; flex-wrap:wrap; }
        .rs-title{ font-size:clamp(30px,4vw,48px); line-height:1.06; letter-spacing:-.03em; color:var(--warm-900); }
        .rs-sub{ margin-top:14px; font-size:16px; color:var(--warm-700); }
        .rs-nav{ display:flex; gap:12px; }
        .rs-arrow{ width:44px; height:44px; border-radius:50%; border:none; background:var(--warm-900); color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:opacity .15s, transform .15s; }
        .rs-arrow:hover{ opacity:.85; } .rs-arrow:active{ transform:scale(.94); }
        .rs-stage{ position:relative; margin-top:clamp(28px,4vh,44px); height:clamp(360px,32vw,400px); }
        .rs-card{ position:absolute; left:50%; top:0; width:min(1059px, calc(100% - 160px)); height:100%; transform-origin:center;
          border-radius:clamp(20px,2.4vw,32px); overflow:hidden;
          transition:transform .55s cubic-bezier(.22,1,.36,1), opacity .55s ease; will-change:transform,opacity; }
        .rs-bg{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; }
        .rs-scrim{ position:absolute; inset:0; background:rgba(0,0,0,.56); }
        .rs-body{ position:relative; z-index:1; height:100%; display:flex; align-items:center; justify-content:space-between; gap:clamp(24px,4vw,48px); padding:clamp(26px,3.6vw,52px); }
        .rs-copy{ max-width:540px; }
        .rs-cardhead{ font-family:var(--font-body); font-weight:700; font-size:clamp(16px,1.6vw,18px); line-height:1.3; color:#fff; letter-spacing:-.01em; }
        .rs-quote{ margin-top:18px; font:400 15.5px/1.42 var(--font-body); color:rgba(255,255,255,.9); }
        .rs-who{ margin-top:18px; font-weight:700; font-size:16px; color:#fff; }
        /* logo occupies the Figma 277×117 box, contained + centred */
        .rs-logo{ flex:0 0 auto; width:clamp(180px,23vw,277px); height:clamp(78px,10vw,117px); object-fit:contain; object-position:center; }
        @media (max-width:820px){
          .rs-body{ flex-direction:column; align-items:flex-start; justify-content:center; }
          .rs-logo{ order:-1; margin-bottom:8px; }
          .rs-stage{ height:auto; min-height:420px; }
          .rs-card{ position:relative; left:auto; width:100%; height:auto; min-height:420px; transform:none !important; opacity:1 !important; }
          .rs-card:not(.on){ display:none; }
        }
      `}</style>
    </section>
  );
}
/* ---------- Advertiser Section 8 — "Recognised, and built on trust" (awards) */
const ADV_AWARDS = [
  ['adv-award-bcorp.png', 'Certified B Corporation'],
  ['adv-award-deloitte.png', 'Deloitte Technology Fast 500'],
  ['adv-award-msc.png', 'MSC Malaysia Status Company'],
  ['adv-award-forbes.png', 'Forbes Asia 100 To Watch'],
];
function AdvAwards() {
  return (
    <section id="adv-awards" className="aw-sec">
      <div className="wrap">
        <p className="aw-head" data-reveal>Recognised, and built on trust</p>
        <div className="aw-row" data-reveal data-reveal-delay="1">
          {ADV_AWARDS.map(([file, alt]) => (
            <img className="aw-badge" key={file} src={`media/figma/${file}`} alt={alt} loading="lazy" />
          ))}
        </div>
      </div>
      <style>{`
        .aw-sec{ background:var(--warm-50); padding:clamp(40px,6vh,84px) 0 clamp(48px,7vh,92px); }
        .aw-head{ text-align:center; font:400 clamp(17px,1.7vw,20px)/1.4 var(--font-body); color:var(--warm-600); }
        .aw-row{ margin-top:clamp(26px,4vh,44px); display:flex; align-items:center; justify-content:center; gap:clamp(36px,6vw,89px); flex-wrap:wrap; }
        .aw-badge{ height:clamp(96px,10vw,145px); width:auto; max-width:180px; object-fit:contain; }
      `}</style>
    </section>
  );
}
function AdvertiserApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <PubHero />
        <PubLogos />
        <AdvGoals />
        <AdvPlatform />
        <AdvReal />
        <AdvStats />
        <AdvResults />
        <AdvAwards />
        <PubCTA />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AdvertiserApp />);
