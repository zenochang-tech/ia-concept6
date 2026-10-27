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
   Self-contained looping animation: scattered/raw traffic on the left resolves
   through a central checkpoint into clean/validated traffic on the right.
   Full standalone version + video-export notes live in traffic-validation.html.
   All motion is driven by one normalized t∈[0,1) that wraps → seamless loop. */
const TRAFFIC_CONFIG = {
  leftLineCount: 35, rightLineCount: 12, particleCount: 120,
  cycleSeconds: 8, dashCyclesPerLoop: 6, pulsesPerLoop: 1,
  lineColor: '#3A5980', lineOpacity: 0.42, particleColor: '#4A6A94',
  centerLineColor: '#2E4A6B', lineThickness: 1, leftDisorderAmount: 1, centerXFrac: 0.48,
};
function initTrafficViz(canvas, userConfig) {
  const C = Object.assign({}, TRAFFIC_CONFIG, userConfig || {});
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rgb = (h) => { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  const LINE = rgb(C.lineColor), CEN = rgb(C.centerLineColor), PART = rgb(C.particleColor);
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const rnd = (a, b) => a + Math.random() * (b - a);
  let W = 0, H = 0, dpr = 1, cx = 0, my = 0, uh = 0, leftLines = [], rightLines = [], parts = [];
  const DASH = 18;
  function layout() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect(); W = Math.max(1, r.width); H = Math.max(1, r.height);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = W * C.centerXFrac; my = H * 0.06; uh = H - my * 2;
    leftLines = [];
    for (let i = 0; i < C.leftLineCount; i++) {
      const y0 = my + rnd(-0.05, 1.05) * uh, y1 = my + (0.5 + rnd(-0.34, 0.34)) * uh;
      const cy = (y0 + y1) / 2 + rnd(-0.18, 0.18) * uh * C.leftDisorderAmount;
      leftLines.push({ x0: rnd(-0.04, 0.02) * W, y0, cx1: rnd(0.32, 0.66) * cx, cy1: cy, x1: cx, y1, op: C.lineOpacity * rnd(0.5, 1), ph: Math.random() });
    }
    rightLines = [];
    for (let j = 0; j < C.rightLineCount; j++) rightLines.push({ y: my + uh * ((j + 0.5) / C.rightLineCount), op: C.lineOpacity * rnd(0.7, 1) });
    parts = [];
    for (let k = 0; k < C.particleCount; k++) {
      const left = Math.random() < 0.72;
      const y = left ? my + Math.random() * uh : my + uh * ((Math.floor(Math.random() * C.rightLineCount) + 0.5) / C.rightLineCount) + rnd(-2.5, 2.5);
      parts.push({ p0: Math.random(), y, r: rnd(0.6, 1.7), sp: rnd(0.6, 1.3), tw: Math.random(), left });
    }
  }
  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    const flow = ((t * C.dashCyclesPerLoop) % 1) * DASH;
    ctx.lineWidth = C.lineThickness; ctx.lineCap = 'round'; ctx.setLineDash([2, DASH - 2]);
    for (const L of leftLines) { ctx.strokeStyle = rgba(LINE, L.op); ctx.lineDashOffset = -flow - L.ph * DASH; ctx.beginPath(); ctx.moveTo(L.x0, L.y0); ctx.quadraticCurveTo(L.cx1, L.cy1, L.x1, L.y1); ctx.stroke(); }
    for (const R of rightLines) { ctx.strokeStyle = rgba(LINE, R.op); ctx.lineDashOffset = -flow; ctx.beginPath(); ctx.moveTo(cx, R.y); ctx.lineTo(W * 1.02, R.y); ctx.stroke(); }
    ctx.setLineDash([]);
    ctx.strokeStyle = rgba(CEN, 0.5); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(cx, my * 0.6); ctx.lineTo(cx, H - my * 0.6); ctx.stroke();
    const py = my + (0.5 - 0.5 * Math.cos(2 * Math.PI * t * C.pulsesPerLoop)) * uh;
    const g = ctx.createRadialGradient(cx, py, 0, cx, py, 24); g.addColorStop(0, rgba(CEN, 0.13)); g.addColorStop(1, rgba(CEN, 0));
    ctx.fillStyle = g; ctx.fillRect(cx - 24, py - 24, 48, 48);
    for (const P of parts) {
      const b0 = P.left ? 0 : C.centerXFrac, b1 = P.left ? C.centerXFrac : 1;
      const prog = (P.p0 + t * P.sp) % 1, x = (b0 + prog * (b1 - b0)) * W;
      const edge = Math.min(1, (x - b0 * W) / 34, (b1 * W - x) / 34), tw = 0.55 + 0.45 * Math.sin(2 * Math.PI * (t * 2 + P.tw));
      ctx.fillStyle = rgba(PART, Math.max(0, 0.5 * edge) * tw); ctx.beginPath(); ctx.arc(x, P.y, P.r, 0, Math.PI * 2); ctx.fill();
    }
  }
  canvas.__tvRenderFrame = (t) => draw(((t % 1) + 1) % 1);   // deterministic frame (verification / export parity)
  let raf = 0, start = null, visible = true;
  function frame(now) { if (start == null) start = now; draw((((now - start) / 1000) / C.cycleSeconds) % 1); if (visible && !reduce) raf = requestAnimationFrame(frame); }
  function play() { if (!raf && !reduce) { start = null; raf = requestAnimationFrame(frame); } }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
  layout(); reduce ? draw(0) : play();
  const onResize = () => { layout(); if (reduce) draw(0); };
  window.addEventListener('resize', onResize);
  let io = null;
  if ('IntersectionObserver' in window) { io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; visible ? play() : stop(); }, { threshold: 0 }); io.observe(canvas); }
  return function destroy() { stop(); window.removeEventListener('resize', onResize); if (io) io.disconnect(); };
}
function TrafficViz() {
  const ref = React.useRef(null);
  React.useEffect(() => { if (!ref.current) return; return initTrafficViz(ref.current); }, []);
  return <canvas ref={ref} className="rl-canvas" aria-hidden="true" />;
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
        .rl-viz{ position:absolute; right:0; top:0; bottom:0; width:min(66%, 780px); z-index:0;
          -webkit-mask-image:linear-gradient(90deg, transparent 0%, #000 26%); mask-image:linear-gradient(90deg, transparent 0%, #000 26%); }
        .rl-canvas{ width:100%; height:100%; display:block; }
        .rl-body{ position:relative; z-index:2; max-width:640px; }
        .rl-title{ font-size:clamp(30px,4vw,48px); line-height:1.14; letter-spacing:-.02em; color:var(--warm-900); }
        .rl-desc{ margin-top:20px; max-width:620px; font:400 16px/1.35 var(--font-body); color:var(--warm-600); }
        .rl-list{ margin-top:28px; display:flex; flex-direction:column; gap:16px; }
        .rl-list li{ display:flex; align-items:center; gap:12px; font:500 16px/1.3 var(--font-body); color:var(--warm-900); }
        .rl-check{ flex:0 0 auto; width:20px; height:20px; color:var(--success); display:inline-flex; align-items:center; justify-content:center; }
        .rl-check svg{ width:20px; height:20px; }
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
            <img className="as-heximg" src="media/figma/adv-stat-hex-tint.svg" alt="" aria-hidden="true" />
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
