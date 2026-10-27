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
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Find the right publishers, or let us find them for you.</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="1">Search over 1,000,000 publishers and invite the ones that fit your brand.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="2">
            <a href="/advertisers/" className="btn btn-advertiser btn-lg">See plans and pricing <Arrow /></a>
          </div>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo ph-photo-df"><img src="media/figma/pd-hero.png" alt="A dashboard listing over a million publishers to invite to your brand" loading="eager" /></div>
          <div className="ph-static-ui" data-reveal data-reveal-delay="2">
            <img className="ph-hero-el" src="media/figma/pd-hero-element.png" alt="" aria-hidden="true" />
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
        /* partner-discovery hero: floating publisher-avatar cluster over the top-left of the dashboard */
        .ph-hero-el{ position:absolute; top:5%; left:1%; width:37%; height:auto; display:block; filter:drop-shadow(0 16px 32px rgba(15,28,46,.16)); }
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
  return <FinalCta title="Put the right partners to work for your brand." href="/advertisers/" tone="advertiser" label="Grow my brand" />;
}

/* ---------- How-We-Track §2 — "One consolidated, verified view" ---------- */
function ConsolidatedView() {
  return (
    <section id="pd-discover" className="dv-sec">
      <div className="wrap dv-grid">
        <div className="dv-copy" data-reveal>
          <h2 className="dv-title">Discover publishers that fit.</h2>
          <div className="dv-point">
            <h3 className="dv-pt">Filter to the right fit.</h3>
            <p className="dv-pd">Narrow by category, channel, and membership tier, or search by name, ID, or keyword.</p>
          </div>
          <div className="dv-point">
            <h3 className="dv-pt">See the numbers first.</h3>
            <p className="dv-pd">Check each publisher&rsquo;s audience countries, clicks, and conversions before you invite them.</p>
          </div>
        </div>
        <div className="dv-visual" data-reveal data-reveal-delay="1">
          <span className="dv-glow" aria-hidden="true" />
          <img src="media/figma/pd-discover.png" alt="A publisher profile card showing membership tier, clicks and conversions with an Invite Publisher button" loading="lazy" />
        </div>
      </div>
      <style>{`
        .dv-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; overflow:hidden; }
        .dv-grid{ display:grid; grid-template-columns:minmax(0,440px) minmax(0,1fr); gap:clamp(36px,5vw,80px); align-items:center; }
        .dv-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.14; letter-spacing:-.03em; color:var(--warm-900); }
        .dv-point{ margin-top:clamp(24px,3vh,34px); }
        .dv-pt{ font-family:var(--font-display); font-weight:800; font-size:18px; letter-spacing:-.01em; color:var(--warm-900); }
        .dv-pd{ margin-top:8px; font:400 15px/1.5 var(--font-body); color:var(--warm-600); max-width:440px; }
        .dv-visual{ position:relative; }
        .dv-glow{ position:absolute; inset:4% -6% -8% 4%; z-index:0; pointer-events:none; background:radial-gradient(58% 58% at 68% 60%, rgba(61,90,128,.14), rgba(61,90,128,0) 70%); filter:blur(8px); }
        .dv-visual img{ position:relative; z-index:1; width:100%; height:auto; display:block; border-radius:var(--r-xl); filter:drop-shadow(0 10px 30px rgba(15,28,46,.10)) drop-shadow(0 4px 8px rgba(15,28,46,.06)); }
        @media (max-width:860px){ .dv-grid{ grid-template-columns:1fr; gap:32px; } .dv-visual{ max-width:520px; margin-inline:auto; } }
      `}</style>
    </section>
  );
}
/* ---------- Partner Discovery §3 — "Publisher recruitment" (2 image cards) ---------- */
const PR_CARDS = [
  { img: 'pd-recruit-1.png', t: 'Bring your partners on with one link.', d: <>Share your referral link, and any publisher who signs up through it is auto-approved for your offer, so you can onboard your existing partners in a single step.</> },
  { img: 'pd-recruit-2.png', t: 'We recruit publishers for you.', d: <>On Growth and above, our team runs recruitment campaigns and introduces publishers that fit your brand, real people who know your vertical. <b>Only the partners you choose come on board, so you stay in control.</b></> },
];
function HowItWorks() {
  return (
    <section id="pd-recruit" className="pr-sec">
      <div className="wrap">
        <h2 className="pr-title" data-reveal>Publisher recruitment</h2>
        <div className="pr-grid">
          {PR_CARDS.map((c, i) => (
            <div className="pr-card" key={i} data-reveal data-reveal-delay={i + 1}>
              <div className="pr-fig"><img src={`media/figma/${c.img}`} alt="" loading="lazy" /></div>
              <h3 className="pr-ct">{c.t}</h3>
              <p className="pr-cd">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .pr-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .pr-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .pr-grid{ margin-top:clamp(30px,4.5vh,52px); display:grid; grid-template-columns:1fr 1fr; gap:clamp(24px,3vw,42px); }
        .pr-fig{ border-radius:var(--r-xl); overflow:hidden; background:var(--warm-100); aspect-ratio:598/350; }
        .pr-fig img{ width:100%; height:100%; object-fit:cover; object-position:center; display:block; }
        .pr-ct{ margin-top:22px; font-family:var(--font-display); font-weight:800; font-size:clamp(18px,1.5vw,21px); letter-spacing:-.01em; color:var(--warm-900); }
        .pr-cd{ margin-top:10px; font:400 15px/1.55 var(--font-body); color:var(--warm-600); max-width:520px; }
        .pr-cd b{ font-weight:700; color:var(--warm-900); }
        @media (max-width:820px){ .pr-grid{ grid-template-columns:1fr; gap:36px; max-width:460px; margin-inline:auto; } }
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
