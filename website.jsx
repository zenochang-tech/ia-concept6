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
          <span className="ph-eyebrow" data-reveal>For Content Sites</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Add income to the content you already publish.</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="2">Blogs, niche sites, and news. Earn on the content you already publish, without changing how you write.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="3">
            <a href="/partners/" className="btn btn-primary btn-lg">Start Earning <Arrow /></a>
          </div>
          <span className="ph-free" data-reveal data-reveal-delay="3">Free to join. Start earning today.</span>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo ph-photo-fill"><img src="media/figma/website-hero.png" alt="A content website shown on a laptop" loading="eager" /></div>
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
  ['Will affiliate links change how my site looks?',
    'No. You choose where links go. There are no forced ads or banners.'],
  ['Do old articles still earn?',
    'Yes. Any post with a live link keeps earning on every sale it drives.'],
  ['What kinds of sites qualify?',
    'Blogs, niche sites, news and media. Any site with content and readers.'],
];
function PubFAQ() {
  return <Faq items={PUB_FAQ} />;
}

/* ---------- Final CTA (shared FinalCta, ia-sections.jsx) ----------------- */
function PubCTA() {
  return <FinalCta title="Start earning from your website." />;
}

/* ---------- Website §3 — "Made for content that already has an audience." (3 cards) ---------- */
const AFF_KINDS = [
  ['website-kind-1.png', 'Blogs', 'Add relevant links to the posts you already write, and earn from content you were making anyway.'],
  ['website-kind-2(v2).png', 'Niche sites', 'Run a specialist blog or site your niche follows. Add links to the reviews and guides you already write, and earn on what your readers buy.'],
  ['website-kind-3.png', 'News and media sites', 'Turn your articles into income that keeps earning long after you publish.'],
];
function BuiltKinds() {
  return (
    <section id="aff-kinds" className="ak-sec">
      <div className="wrap">
        <h2 className="ak-title" data-reveal>Made for content that already has an audience.</h2>
        <div className="ak-grid">
          {AFF_KINDS.map(([img, t, d, cross], i) => (
            <div className="ak-card" key={t} data-reveal data-reveal-delay={(i % 3) + 1}>
              <img className="ak-mock" src={`media/figma/${img}`} alt="" loading="lazy" />
              <div className="ak-body">
                <h3 className="ak-ct">{t}</h3>
                <p className="ak-cd">{d}</p>
                {cross && <p className="ak-xlink">{cross[0]} <a href={cross[2]}>{cross[1]}</a>.</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .ak-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .ak-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .ak-grid{ margin-top:clamp(34px,5vh,54px); display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(20px,2.4vw,30px); }
        .ak-card{ position:relative; min-width:0; aspect-ratio:397/426; border-radius:var(--r-lg); overflow:hidden; }
        .ak-mock{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; }
        .ak-body{ position:relative; z-index:1; padding:24px 24px 0; }
        .ak-ct{ font-family:var(--font-display); font-weight:800; font-size:clamp(17px,1.4vw,20px); letter-spacing:-.01em; color:var(--warm-900); }
        .ak-cd{ margin-top:9px; font:400 15px/1.45 var(--font-body); color:var(--warm-600); max-width:300px; }
        .ak-xlink{ margin-top:10px; font:400 12.5px/1.4 var(--font-body); color:var(--warm-400); max-width:300px; }
        .ak-xlink a{ color:var(--ember); font-weight:600; text-decoration:none; }
        .ak-xlink a:hover{ text-decoration:underline; }
        @media (max-width:860px){ .ak-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); gap:26px 22px; } }
        @media (max-width:560px){ .ak-grid{ grid-template-columns:1fr; max-width:420px; margin-inline:auto; } }
      `}</style>
    </section>
  );
}
/* ---------- Website §2 — "Monetise your content, without disrupting it." (4 icon columns) ---------- */
const AFF_WHY = [
  { t: 'Links that fit your content.', d: 'You place contextual links yourself. No forced ads or banners cluttering your site.',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 14.5l5-5" /><path d="M12 7l1.2-1.2a4 4 0 0 1 5.7 5.7L17.5 13" /><path d="M12 17l-1.2 1.2a4 4 0 0 1-5.7-5.7L6.5 11" /></svg> },
  { t: 'Your best content keeps earning.', d: 'A review you wrote last year still earns today.',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 0 1 13.7-5.7L20 8" /><path d="M20 4v4h-4" /><path d="M20 12a8 8 0 0 1-13.7 5.7L4 16" /><path d="M4 20v-4h4" /></svg> },
  { t: 'Reporting that guides what to write.', d: 'See which posts and links drive sales, so you know what to publish next.',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><rect x="5" y="11" width="3.4" height="7" rx="1" /><rect x="10.3" y="5" width="3.4" height="13" rx="1" /><rect x="15.6" y="8.5" width="3.4" height="9.5" rx="1" /></svg> },
];
function WhyChoose() {
  return (
    <IconColumns id="aff-why" title="Why content sites earn with Involve." items={AFF_WHY} />
  );
}
/* ---------- Website §1b — "How it works" (3 numbered steps) — Figma 2546:45038 ---------- */
const HIW_STEPS = [
  ['01', 'Find offers', 'Browse 500+ brands and pick the ones your readers already care about.'],
  ['02', 'Add links to your content', 'Drop trackable links into new or existing articles and reviews, in a couple of clicks.'],
  ['03', 'Earn after you publish', 'Older posts keep earning every time a reader clicks and buys.'],
  ['04', 'Get paid', 'Withdraw in your local currency once sales are validated, or sooner with Express Withdrawal.'],
];
function HowItWorks() {
  return <NumberedSteps id="web-how" title="How you earn." steps={HIW_STEPS} />;
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
        <BuiltKinds />
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
