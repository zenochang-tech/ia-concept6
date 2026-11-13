/* ============================================================================
   publishers.jsx — "For Publishers" overview page.
   All copy lives in content/pages/for-publishers/<lang>.json and arrives through
   useCopy — this file only holds the layout.
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, PlatformTabs, FinalCta, Testimonials, Faq, AppDownload, EarnFeatures, HeroHexGrid, HERO_HEXGRID_CSS, LogoMarquee, useCopy, rich } = window;

const LinkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

/* ---------- Section 1 — Hero ---------------------------------------------- */
function PubHero({ c }) {
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
  const [s1, s2, s3, s4] = c.slides;
  return (
    <section id="pub-hero" className="ph-sec">
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <HeroHexGrid />
        <div className="ph-copy">
          <span className="ph-eyebrow" data-reveal>{c.eyebrow}</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">{c.title}</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="2">{c.sub}</p>
          <div className="ph-actions" data-reveal data-reveal-delay="3">
            <a href="/partners/" className="btn btn-primary btn-lg">{c.cta} <Arrow /></a>
          </div>
          <span className="ph-free" data-reveal data-reveal-delay="3">{c.free}</span>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />

          <div className={on(0)} aria-hidden={slide !== 0}>
            <div className="ph-photo"><img className="ph-flip" src="media/figma/pub-hero-creator.png" alt={s1.alt} loading="eager" /></div>
            <div className="ph-slide-ui">
              <div className="ph-glass ph-g-link"><div className="ph-link"><span className="ph-link-ic"><LinkIcon /></span>{s1.link}</div></div>
              <div className="ph-glass ph-g-prod"><span className="ph-prod-lbl">{s1.product}</span><img className="ph-prod-img" src="media/figma/pub-hero-necklace.png" alt="" /></div>
            </div>
          </div>

          <div className={on(1)} aria-hidden={slide !== 1}>
            <div className="ph-photo"><img src="media/figma/pub-hero-slide2.png" alt={s2.alt} loading="eager" /></div>
            <div className="ph-slide-ui">
              <div className="ph-glass ph-g-sales"><div className="ph-stat"><span className="ph-stat-lbl">{s2.label}</span><span className="ph-stat-row"><b>{s2.value}</b><em>{s2.change}</em></span></div></div>
            </div>
          </div>

          <div className={on(2)} aria-hidden={slide !== 2}>
            <div className="ph-photo"><img className="ph-flip" src="media/figma/pub-hero-slide3.png" alt={s3.alt} loading="eager" /></div>
            <div className="ph-slide-ui">
              <div className="ph-glass ph-g-conv"><div className="ph-stat"><span className="ph-stat-lbl">{s3.label}</span><span className="ph-stat-row"><b>{s3.value}<small>{s3.unit}</small></b><em>{s3.change}</em></span></div></div>
            </div>
          </div>

          <div className={on(3)} aria-hidden={slide !== 3}>
            <div className="ph-photo"><img src="media/figma/pub-hero-slide4.png" alt={s4.alt} loading="eager" /></div>
            <div className="ph-slide-ui">
              <div className="ph-glass ph-g-pay-a"><div className="ph-pay"><span>{s4.label}</span><b>{s4.payouts[0]}</b></div></div>
              <div className="ph-glass ph-g-pay-b"><div className="ph-pay"><span>{s4.label}</span><b>{s4.payouts[1]}</b></div></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ph-sec{ position:relative; isolation:isolate; overflow:hidden; background:var(--warm-50); padding:clamp(40px,6vh,84px) 0 clamp(56px,9vh,116px); }
        ${HERO_HEXGRID_CSS}
        /* gradient blend from the hero into the logo strip below */
        .ph-basefade{ position:absolute; left:0; right:0; bottom:0; height:clamp(120px,24%,240px); z-index:0; pointer-events:none;
          background:linear-gradient(180deg, rgba(250,250,248,0) 0%, rgba(250,250,248,.65) 55%, var(--warm-50) 100%); }
        .ph-wrap{ position:relative; display:grid; grid-template-columns:1.02fr .98fr; gap:clamp(24px,4vw,60px); align-items:center; }
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
        .ph-hexplate{ position:absolute; inset:0; z-index:0; background:var(--warm-150);
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
        .ph-g-link{ border-radius:var(--r-xl); padding:6px; top:22%; right:-6%; }
        .ph-g-prod{ left:-3%; bottom:12%; width:26%; max-width:120px; }
        .ph-g-sales{ right:-3%; bottom:8%; }
        .ph-g-conv{ right:-7%; top:15%; }
        .ph-g-pay-a{ left:-8%; top:14%; }
        .ph-g-pay-b{ left:-8%; top:26%; }
        .ph-slide.is-active .ph-slide-ui > .ph-g-pay-b{ opacity:.62; }   /* second payout sits behind, fainter */
        /* inner white cards / pills */
        .ph-link{ display:inline-flex; align-items:center; gap:9px; background:#fff; border-radius:var(--r-lg); padding:9px 16px 9px 9px;
          box-shadow:0 2px 6px rgba(15,28,46,.08); font:600 14px/1 var(--font-body); color:var(--warm-900); white-space:nowrap; }
        .ph-link-ic{ display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:var(--r-full);
          background:var(--warm-150); color:var(--warm-700); flex:0 0 auto; }
        .ph-prod-lbl{ display:block; font:500 11px/1.3 var(--font-body); color:#fff; text-shadow:0 3px 8px rgba(0,0,0,.35); margin:1px 2px 7px; }
        .ph-prod-img{ width:100%; aspect-ratio:1/1; object-fit:cover; border-radius:var(--r-lg); display:block; }
        .ph-stat{ background:#fff; border-radius:var(--r-xl); box-shadow:0 2px 6px rgba(15,28,46,.08); padding:12px 15px; display:flex; flex-direction:column; gap:4px; }
        .ph-stat-lbl{ display:inline-flex; align-items:center; gap:6px; font:600 12px/1.2 var(--font-body); color:var(--warm-900); }
        .ph-stat-cur{ display:inline-flex; align-items:center; justify-content:center; width:16px; height:16px; border-radius:var(--r-sm); background:var(--warm-150); font:700 10px/1 var(--font-body); color:var(--warm-800); }
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
          .ph-sec{ padding-top:12px; }
          /* hexagon 15% smaller than the full column (and the old 420px cap), centred */
          .ph-visual{ order:-1; width:85%; max-width:357px; margin:0 auto; justify-self:center; }
          /* floating UI cards: 15% smaller, and pushed back out to where they sat around the full-width
             hexagon (8.8% of the 85% box = the 7.5% it lost each side; only the anchored side's margin moves
             an absolutely positioned card). Scale from the anchored edge so that edge stays put. */
          .ph-glass{ scale:.85; margin-inline:-8.8%; transform-origin:left center; }
          .ph-g-link, .ph-g-sales, .ph-g-conv, .ph-ga-appl{ transform-origin:right center; }
          /* keep the floating UI within the hexagon so the composition stays centred */
          .ph-g-link, .ph-g-sales, .ph-g-conv{ right:0; }
          .ph-g-prod, .ph-g-pay-a, .ph-g-pay-b{ left:0; }
          /* per-slide UI repositioning for mobile */
          .ph-g-link{ top:4.5%; padding:5px; }  /* slide 1: pill at the top right of the hexagon, clear of the face */
          .ph-link{ gap:7px; padding:6px 12px 6px 6px; font-size:12px; }   /* slide 1: smaller pill on mobile */
          .ph-link-ic{ width:24px; height:24px; }
          .ph-link-ic svg{ width:13px; height:13px; }
          .ph-g-conv{ top:auto; bottom:9%; }     /* slide 3: moved to the bottom-right of the hexagon */
          .ph-g-pay-a{ top:54%; }                /* slide 4: large payout pill moved 40% lower */
          .ph-g-pay-b{ display:none; }           /* slide 4: hide the smaller payout pill */
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 2 — Logo strip ---------------------------------------- */
function PubLogos({ c }) {
  return <LogoMarquee caption={c.caption} />;
}

/* ---------- Section 3 — "If you have an audience, you can earn." ----------- */
// Card images by index; the titles/descriptions come from c.cards.
const PUB_AUDIENCE_IMG = ['creator-partner-type-image.png', 'aff-partner-type-image.png', 'tech-partner-type-image.png'];
function PubAudience({ c }) {
  return (
    <section id="pub-audience" className="au-sec">
      <div className="wrap">
        <div className="au-head-l" data-reveal>
          <h2 className="au-title">{c.title}</h2>
          <p className="au-sub">{c.sub}</p>
        </div>
        <div className="au-grid" data-reveal data-reveal-delay="1">
          {c.cards.map(([t, d], i) => (
            <div className="au-card" key={t}>
              <img className="au-card-img" src={`media/figma/${PUB_AUDIENCE_IMG[i]}`} alt="" draggable="false" loading="lazy" />
              <div className="au-card-body">
                <h3 className="au-card-t">{t}</h3>
                <p className="au-card-d">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .au-sec{ background:var(--warm-50); padding:clamp(67px,9.66vh,132px) 0 clamp(55px,8.28vh,105px); overflow:hidden; }
        .au-title{ font-size:clamp(24px,3vw,34px); line-height:1.06; letter-spacing:-.03em; color:var(--warm-900); }
        .au-sub{ margin-top:14px; max-width:620px; font-size:16px; line-height:1.4; color:var(--warm-600); }
        .au-grid{ margin-top:clamp(28px,4vh,44px); display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(18px,2vw,24px); }
        .au-card{ position:relative; display:block; min-width:0; height:495px; border-radius:var(--r-xl); overflow:hidden;
          background:#ffffff; box-shadow:0 12px 30px rgba(15,28,46,.06); }
        /* image anchored to the BOTTOM of the card, faded into the surface at its top so it never sits under the text */
        .au-card-img{ position:absolute; left:0; right:0; bottom:0; width:100%; height:80%; object-fit:cover; object-position:center 24%; -webkit-user-drag:none; pointer-events:none;
          -webkit-mask:linear-gradient(180deg, transparent 0%, #000 30%); mask:linear-gradient(180deg, transparent 0%, #000 30%); }
        .au-card-body{ position:relative; z-index:1; padding:26px 28px; }
        .au-card-t{ font-family:var(--font-display); font-weight:800; font-size:21px; line-height:1.25; letter-spacing:-.02em; color:var(--warm-900); }
        .au-card-d{ margin-top:10px; font:400 16px/1.31 var(--font-body); color:var(--warm-600); max-width:277px; }
        @media (max-width:820px){ .au-grid{ grid-template-columns:1fr; max-width:420px; margin-inline:auto; } }
      `}</style>
    </section>
  );
}

/* ---------------- "Built for how you actually earn." — auto-advancing platform stepper ----------------
   Same interaction as the advertiser page's "One platform…" section: left tabs auto-advance on a
   timer (a fill bar tracks the dwell), each swaps the dashboard image on the right. Ember accent. */
// Step keys + dashboard images by index; the step text comes from c.items.
const PUB_PLATFORM = [
  { key: 'find', img: 'publisher-feature-01.png' },
  { key: 'links', img: 'publisher-feature-02.png' },
  { key: 'track', img: 'publisher-feature-03.png' },
  { key: 'paid', img: 'publisher-feature-04.png' },
];
const PUB_PLATFORM_CSS = `
        .pf-sec{ background:var(--warm-50); padding:clamp(77px,11.11vh,152px) 0 clamp(89px,14.28vh,191px); overflow:hidden; }
        .pf-title{ text-align:center; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .pf-sub{ text-align:center; margin-top:14px; font-size:16px; line-height:1.4; color:var(--warm-600); }
        .pf-grid{ margin-top:clamp(40px,6vh,72px); display:grid; grid-template-columns:minmax(0,412px) 1fr; gap:clamp(32px,4vw,64px); align-items:stretch; }
        .pf-steps{ display:flex; flex-direction:column; }
        .pf-step{ position:relative; display:flex; gap:20px; align-items:stretch; text-align:left; background:none; border:none; cursor:pointer; padding:34px 0; width:100%; }
        .pf-rail-fill{ position:absolute; left:0; top:0; width:4px; border-radius:var(--r-full); background:var(--ember); height:0; }
        .pf-step-t{ display:block; font-family:var(--font-display); font-weight:800; font-size:21px; letter-spacing:-.02em; color:var(--warm-900); transition:opacity .3s ease; }
        .pf-step.on .pf-step-d{ margin-top:14px; }
        .pf-step-d a{ color:var(--ember); font-weight:600; text-decoration:underline; text-underline-offset:2px; }
        /* light warm/ember gradient container; the dashboard sits inset top-left and bleeds off the right */
        .pf-visual{ position:relative; align-self:center; width:100%; aspect-ratio:5/3; overflow:hidden; border-radius:var(--r-xl);
          background:var(--warm-150); }
        .pf-img{ position:absolute; inset:0; width:100%; height:100%;
          object-fit:contain; object-position:center;
          opacity:0; transition:opacity .5s ease; }
        .pf-step-fig{ display:none; }
        @media (max-width:900px){
          .pf-grid{ grid-template-columns:1fr; gap:0; }
          .pf-visual{ display:none; }
          /* each step becomes a white bordered card; tap to open (no auto-advance) */
          .pf-steps{ gap:12px; }
          .pf-step{ gap:0; padding:6%; background:#fff; border:0.5px solid #D2D2CC; border-radius:var(--r-xl); }
          .pf-step + .pf-step{ border-top:0.5px solid #D2D2CC; }
          .pf-step:not(.on){ opacity:1; }
          .pf-step-t{ font-size:18px; }   /* a clear step below the 24px section title */
          .pf-rail{ display:none; }
          .pf-step-fig{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .45s ease; }
          .pf-step.on .pf-step-fig{ grid-template-rows:1fr; }
          .pf-step-fig-in{ overflow:hidden; min-height:0; }
          /* the source PNGs are bleed compositions (content offset right/down on a wide canvas),
             so crop to the readable top-left over the warm-150 panel (as on desktop) instead of squashing the whole canvas.
             No shadow: the collapsing fig clips it to a grey strip under the panel; desktop has none either. */
          .pf-step-fig-img{ display:block; width:100%; aspect-ratio:5/3; object-fit:contain; object-position:center;
            margin:18px 0 0; border-radius:var(--r-xl);
            background:var(--warm-150); }
        }`;
function PubPlatform({ c }) {
  const items = PUB_PLATFORM.map((p, i) => ({ ...p, t: c.items[i][0], d: c.items[i][1] }));
  return (
    <PlatformTabs id="pub-platform" items={items} mobileCards figClass="pf-step-fig-img" css={PUB_PLATFORM_CSS}
      title={c.title}
      sub={c.sub} />
  );
}

/* ---------- Section 6 — "Built for how you actually earn." (shared EarnFeatures, ia-sections.jsx) */
function PubBuilt() {
  return <EarnFeatures />;
}

/* ---------- Testimonials (shared Testimonials, ia-sections.jsx) --------- */
const PUB_VOICES_CSS = `
        @media (max-width:900px){ .tv-card{ width:min(440px, calc(100vw - 80px)); height:auto; min-height:440px; } .tv-card:not(.is-active){ opacity:0 !important; }
          /* inset the gradient box from the screen edges instead of full-bleed */
          .tv-sec{ padding-left:20px; padding-right:20px; }
          .tv-stage{ min-height:440px; } }
      `;
function PubVoices() {
  return <Testimonials css={PUB_VOICES_CSS} />;
}

/* ---------- Section 8 — "Questions, answered." (FAQ accordion) ------------
   Copy supplied by the client. Two answers carry links (beginner guide, Express
   Withdrawal) — hrefs are placeholders pending the real URLs. Example figures
   (4.2% commission, 10 working days) are illustrative — confirm before launch. */
function PubFAQ({ c }) {
  return <Faq items={c.items.map(([q, a]) => [q, rich(a)])} />;
}

/* ---------- Final CTA (shared FinalCta, ia-sections.jsx) ----------------- */
function PubCTA({ c }) {
  return <FinalCta title={c.title} label={c.label} />;
}

function PublisherApp() {
  useSmoothScroll();
  useScrollReveal();
  const c = useCopy('for-publishers');
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <PubHero c={c.hero} />
        <PubLogos c={c.logos} />
        <PubAudience c={c.audience} />
        <PubPlatform c={c.platform} />
        {/* <PubEarn /> hidden per request */}
        <PubBuilt />
        <PubVoices />
        <PubFAQ c={c.faq} />
        <PubCTA c={c.cta} />
      </main>
      <Footer />
      <AppDownload />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PublisherApp />);
