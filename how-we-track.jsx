/* ============================================================================
   how-we-track.jsx — "How we track" page (advertisers).
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass.
   All copy lives in content/pages/how-we-track/<lang>.json and arrives through
   useCopy — this file only holds the layout.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, FinalCta, HeroHexGrid, HERO_HEXGRID_CSS, useCopy, rich } = window;

/* ---------- Section 1 — Hero ---------------------------------------------- */
function PubHero({ c }) {
  return (
    <section id="pub-hero" className="ph-sec">
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <HeroHexGrid />
        <div className="ph-copy">
          <h1 className="ph-title" data-reveal data-reveal-delay="1">{c.title}</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="1">{c.sub}</p>
          <div className="ph-actions" data-reveal data-reveal-delay="2">
            <a href="/advertisers/" className="btn btn-advertiser btn-lg">{c.cta} <Arrow /></a>
          </div>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo ph-photo-df"><img src="media/figma/hwt-hero.png" alt={c.imageAlt} loading="eager" /></div>
          <div className="ph-static-ui" data-reveal data-reveal-delay="2">
            <div className="ph-glass ph-g-added"><div className="ph-added">{c.added}</div></div>
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
        .ph-hexplate{ position:absolute; inset:0; z-index:0; background:var(--warm-150);
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
        /* datafeed hero: "2,087 new products added" pill, top of the product list */
        .ph-g-added{ top:13%; left:23%; transform:translateX(-40%); }
        .ph-added{ background:#fff; border-radius:var(--r-xl); box-shadow:0 2px 6px rgba(15,28,46,.08); padding:11px 18px; white-space:nowrap; font:600 14px/1 var(--font-body); color:var(--warm-900); }
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
        }
      `}</style>
    </section>
  );
}

/* ---------- Final CTA (shared FinalCta, ia-sections.jsx) ----------------- */
function PubCTA({ c }) {
  return <FinalCta title={c.title} href="/advertisers/" tone="advertiser" label={c.label} />;
}

/* ---------- How-We-Track §2 — "One consolidated, verified view" ---------- */
function ConsolidatedView({ c }) {
  return (
    <section id="hwt-view" className="cv-sec">
      <div className="wrap">
        <h2 className="cv-title" data-reveal>{c.title}</h2>
        <div className="cv-cards">
          <div className="cv-card cv-card-old" data-reveal>
            <div className="cv-diagram"><img src="media/figma/hwt-old-way.png" alt={c.old.imageAlt} loading="lazy" /></div>
            <span className="cv-ey">{c.old.eyebrow}</span>
            <h3 className="cv-ct">{c.old.title}</h3>
            <p className="cv-cd">{c.old.desc}</p>
            <ul className="cv-list">
              {c.old.points.map((t, i) => <li key={i}><span className="cv-mk cv-x" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg></span>{t}</li>)}
            </ul>
          </div>
          <div className="cv-card cv-card-new" data-reveal data-reveal-delay="1">
            <div className="cv-diagram"><img src="media/figma/hwt-consolidated.png" alt={c.new.imageAlt} loading="lazy" /></div>
            <span className="cv-ey cv-ey-adv">{c.new.eyebrow}</span>
            <h3 className="cv-ct">{c.new.title}</h3>
            <p className="cv-cd">{c.new.desc}</p>
            <ul className="cv-list">
              {c.new.points.map((t, i) => <li key={i}><span className="cv-mk cv-ok" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M6 12.5l4 4 8-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>{t}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <style>{`
        .cv-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .cv-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .cv-cards{ margin-top:clamp(34px,5vh,52px); display:grid; grid-template-columns:1fr 1fr; gap:clamp(20px,2.6vw,32px); align-items:stretch; }
        .cv-card{ border:1px solid var(--warm-200); border-radius:var(--r-xl); padding:clamp(22px,2.6vw,30px); background:#fff; box-shadow:0 14px 34px rgba(15,28,46,.05); display:flex; flex-direction:column; }
        .cv-diagram{ margin-bottom:22px; border-radius:var(--r-xl); overflow:hidden; }
        .cv-diagram img{ display:block; width:100%; height:auto; }
        .cv-ey{ font:700 13px/1 var(--font-body); letter-spacing:.01em; color:var(--warm-400); }
        .cv-ey-adv{ color:var(--midnight-light); }
        .cv-ct{ margin-top:10px; font-family:var(--font-display); font-weight:800; font-size:clamp(19px,1.7vw,23px); letter-spacing:-.01em; color:var(--warm-900); }
        .cv-cd{ margin-top:12px; font:400 15px/1.5 var(--font-body); color:var(--warm-600); }
        .cv-list{ margin-top:20px; display:flex; flex-direction:column; gap:14px; list-style:none; }
        .cv-list li{ display:flex; align-items:center; gap:12px; font:500 15px/1.4 var(--font-body); color:var(--warm-900); }
        .cv-mk{ flex:0 0 auto; width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; }
        .cv-mk svg{ width:14px; height:14px; }
        .cv-x{ background:rgba(61,90,128,.12); color:var(--midnight-soft); }
        .cv-ok{ background:#dcfce7; color:#047857; }
        @media (max-width:820px){ .cv-cards{ grid-template-columns:1fr; } }
      `}</style>
    </section>
  );
}
/* ---------- How-We-Track §3 — "How tracking works" (3 numbered steps) ---------- */
function HowItWorks({ c }) {
  return (
    <section id="hwt-how" className="hw-sec">
      <div className="wrap">
        <h2 className="hw-title" data-reveal>{c.title}</h2>
        <div className="hw-grid">
          {c.items.map(([n, t, d], i) => (
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
        .hw-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .hw-grid{ margin-top:clamp(30px,4vh,48px); display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(28px,4vw,56px); }
        .hw-num{ display:inline-flex; align-items:center; justify-content:center; width:54px; height:54px; border-radius:50%; background:var(--midnight); color:#fff; font-family:var(--font-display); font-weight:800; font-size:19px; }
        .hw-st{ margin-top:20px; font-family:var(--font-display); font-weight:800; font-size:19px; letter-spacing:-.01em; color:var(--warm-900); }
        .hw-sd{ margin-top:10px; font:400 15px/1.5 var(--font-body); color:var(--warm-600); max-width:300px; }
        @media (max-width:820px){ .hw-grid{ grid-template-columns:1fr; gap:32px; max-width:440px; } }
      `}</style>
    </section>
  );
}
/* ---------- How-We-Track §4 — "Verified, not just reported" (copy + status table) ---------- */
function Verified({ c }) {
  return (
    <section id="hwt-verified" className="vf-sec">
      <div className="wrap">
        <div className="vf-box" data-reveal>
          <div className="vf-grid">
            <div className="vf-left">
              <h2 className="vf-title">{rich(c.title)}</h2>
              <p className="vf-body">{c.body}</p>
              <ul className="vf-list">
                {c.checks.map((t, i) => <li key={i}><span className="vf-ok" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M6 12.5l4 4 8-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>{t}</li>)}
              </ul>
            </div>
            <div className="vf-visual" data-reveal data-reveal-delay="1">
              <img src="media/figma/hwt-verified-trans.png" alt={c.imageAlt} loading="eager" />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .vf-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .vf-box{ background:#fff; border-radius:var(--r-xl); padding:clamp(26px,3.2vw,48px); box-shadow:0 1px 3px rgba(15,28,46,.05); }
        .vf-grid{ display:grid; grid-template-columns:minmax(0,420px) minmax(0,1fr); gap:clamp(32px,4.5vw,64px); align-items:center; }
        .vf-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(26px,3vw,38px); line-height:1.1; letter-spacing:-.03em; color:var(--warm-900); }
        .vf-body{ margin-top:18px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:460px; }
        .vf-list{ margin-top:24px; display:flex; flex-direction:column; gap:16px; list-style:none; }
        .vf-list li{ display:flex; align-items:center; gap:12px; font:500 15px/1.4 var(--font-body); color:var(--warm-900); }
        .vf-ok{ flex:0 0 auto; width:22px; height:22px; border-radius:50%; background:#dcfce7; color:#047857; display:flex; align-items:center; justify-content:center; }
        .vf-ok svg{ width:14px; height:14px; }
        .vf-visual{ border-radius:var(--r-xl); overflow:hidden; background:var(--warm-150); aspect-ratio:1158/700; display:flex; align-items:center; justify-content:center; }
        .vf-visual img{ display:block; width:100%; height:100%; object-fit:contain; }
        /* status table (kept for reference; the section now uses a provided image) */
        .vf-visual .vf-table{ border-radius:var(--r-xl); overflow:hidden; background:var(--warm-50); border:1px solid var(--warm-200); }
        .vf-table{ width:100%; font-family:var(--font-body); }
        .vf-tr{ display:grid; grid-template-columns:1.2fr 1fr 1.1fr; align-items:center; gap:12px; padding:16px clamp(18px,2vw,28px); border-bottom:1px solid var(--warm-200); }
        .vf-tr:last-child{ border-bottom:none; }
        .vf-tr span{ font-size:14px; color:var(--warm-800); }
        .vf-thead{ background:#fff; }
        .vf-thead span{ font-weight:700; font-size:12px; letter-spacing:.04em; text-transform:uppercase; color:var(--warm-400); }
        .vf-badge{ display:inline-flex; align-items:center; gap:6px; font-weight:700; font-size:13px; padding:5px 11px; border-radius:var(--r-full); }
        .vf-badge svg{ width:13px; height:13px; }
        .vf-app{ background:#dcfce7; color:#047857; }
        .vf-rej{ background:#fee2e2; color:#b91c1c; }
        @media (max-width:900px){ .vf-grid{ grid-template-columns:1fr; gap:28px; } }
        @media (max-width:420px){ .vf-tr{ padding:14px 16px; gap:8px; } .vf-tr span{ font-size:13px; } .vf-badge{ padding:4px 8px; font-size:12px; } }
      `}</style>
    </section>
  );
}
function PublisherApp() {
  useSmoothScroll();
  useScrollReveal();
  const c = useCopy('how-we-track');
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <PubHero c={c.hero} />
        <ConsolidatedView c={c.view} />
        <HowItWorks c={c.how} />
        <Verified c={c.verified} />
        <PubCTA c={c.cta} />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PublisherApp />);
