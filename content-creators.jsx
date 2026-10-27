/* ============================================================================
   publishers.jsx — "For Publishers" overview page.
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, PlatformTabs, FinalCta, Testimonials, PUB_VOICES, Faq, AppDownload, HeroHexDeco, HERO_HEXDECO_CSS } = window;

/* ---------- Section 1 — Hero ---------------------------------------------- */
function PubHero() {
  return (
    <section id="pub-hero" className="ph-sec">
      <HeroHexDeco />
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <div className="ph-copy">
          <span className="ph-eyebrow" data-reveal>For Creator Partners</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Turn the content you already make into income.</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="2">Thousands of brands want to work with creators and influencers like you, whatever your follower count. Share what you love, earn on every sale.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="3">
            <a href="/partners/" className="btn btn-primary btn-lg">Start Earning <Arrow /></a>
          </div>
          <span className="ph-free" data-reveal data-reveal-delay="3">Free to join. Start earning today.</span>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo ph-photo-fill"><img src="media/figma/creator-partner-hero-image.png?v=2" alt="A content creator sharing product recommendations with her audience" loading="eager" /></div>
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
        /* ---- fade slider: each slide (photo + its UI) cross-fades in/out ---- */
        .ph-slide{ position:absolute; inset:0; z-index:1; opacity:0; transition:opacity .85s cubic-bezier(.4,0,.2,1); }
        .ph-slide.is-active{ opacity:1; z-index:2; }
        @media (prefers-reduced-motion: reduce){ .ph-slide{ transition:none; } }
        .ph-photo{ position:absolute; inset:0; z-index:1;
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; }
        .ph-photo img{ width:100%; height:100%; object-fit:cover; display:block; }
        /* creator photo floats with transparent margins; scale it up (clipped to the hexagon by
           the .ph-photo mask) so it fills the hexagon like the express-withdrawal photo */
        .ph-photo-fill img{ object-fit:contain; transform:scale(1.04); transform-origin:50% 54%; }
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
        .ph-g-pay-a{ right:-6%; top:10%; }
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
        @media (max-width:900px){
          .ph-wrap{ grid-template-columns:1fr; gap:36px; }
          .ph-copy{ text-align:center; display:flex; flex-direction:column; align-items:center; }
          .ph-sub{ margin-left:auto; margin-right:auto; }
          .ph-visual{ order:-1; max-width:420px; margin:0 auto; justify-self:center; }
          /* keep the floating UI within the hexagon so the composition stays centred */
          .ph-g-link, .ph-g-sales, .ph-g-conv, .ph-g-pay-a{ right:0; }
          .ph-g-prod, .ph-g-pay-b{ left:0; }
          .ph-g-pay-a{ top:2%; }          /* hero pill moved 8% up on mobile */
          .ph-g-pay-a .ph-pay b{ font-size:13.5px; }   /* number font -10% on mobile */
        }
      `}</style>
    </section>
  );
}

/* ---------- Testimonials (shared Testimonials, ia-sections.jsx) --------- */
// Shared list, but this page punctuates the Siakap Keli pull-quote without the dash.
const VOICES = PUB_VOICES.map((v) => (v.name === 'Siakap Keli' ? { ...v, quote: 'Such a good overall experience with IA, very friendly & professional.' } : v));
function PubVoices() {
  return <Testimonials items={VOICES} />;
}

/* ---------- Section 8 — "Questions, answered." (FAQ accordion) ------------
   Copy supplied by the client. Two answers carry links (beginner guide, Express
   Withdrawal) — hrefs are placeholders pending the real URLs. Example figures
   (4.2% commission, 10 working days) are illustrative — confirm before launch. */
const PUB_FAQ = [
  ['Do I need a big following?',
    'No. You earn on the sales you drive, not on follower count, so engagement matters more than size.'],
  ['Which platforms can I use?',
    'Instagram, TikTok, YouTube, and more. Anywhere you can share a link or a code.'],
  ['How and when do I get paid?',
    'Once your sales are validated you withdraw in your local currency, with Express Withdrawal for early access.'],
  ["I'm an influencer. Is this for me?",
    'Yes. Whether you call yourself a creator or an influencer, if you have an audience on any platform, you can earn, whatever your follower count.'],
];
function PubFAQ() {
  return <Faq items={PUB_FAQ} />;
}

/* ---------- Final CTA (shared FinalCta, ia-sections.jsx) ----------------- */
function PubCTA() {
  return <FinalCta title="Turn your audience into income." />;
}

/* ---------- CC §2 — "Made for TikTok, YouTube, Instagram, and more." ---------- */
const MADE_POINTS = [
  ['Earn on any platform.', "Involve works on any platform your followers are on. Your link works wherever you post, so you're never tied to one channel. Wherever you can share a link, you can earn."],
  ['No website, no shop, no minimum following.', "You don't need a store or a big audience to start. Share your link wherever your followers are, and earn when they buy."],
];
/* Auto-play peek carousel for the "Made for TikTok, YouTube, Instagram" visual.
   Coverflow-style: centre screen at full opacity, prev/next neighbours peek at 32%.
   Motion (per Figma node 3134:4169): each screen slides in from the right to centre,
   its platform icon pops up; on the way out to the left the icon shrinks and fades;
   the recycled screen re-enters from off-stage right. Fixed sequence, right→left loop.
   `img` is each video's poster: its first frame (shown on the peeking slides before they play). */
const SOCIAL_SCREENS = [
  { key: 'tiktok',    label: 'TikTok',    video: 'tiktok-live-vid.mp4',     img: 'creator-social-tiktok-poster.webp', icon: 'creator-icon-1.svg', tint: 'linear-gradient(155deg,#26262b,#3c3c44)' },
  { key: 'youtube',   label: 'YouTube',   video: 'youtube-vid.mp4',         img: 'creator-social-youtube-poster.webp', icon: 'creator-icon-3.svg', tint: 'linear-gradient(155deg,#ff5b5b,#c1121f)' },
  { key: 'instagram', label: 'Instagram', video: 'instagram-story-vid.mp4', img: 'creator-social-instagram-poster.webp', icon: 'creator-icon-2.svg', tint: 'linear-gradient(155deg,#feda75,#d62976 52%,#5b51d8)' },
];
const MADEFOR_MS = 5000;   // matches the 5s clips so each video plays fully before advancing
function MadeForCarousel() {
  const N = SOCIAL_SCREENS.length;
  const reduced = prefersReduced();
  const [active, setActive] = React.useState(0);
  const refs = React.useRef([]);
  const videoRefs = React.useRef([]);
  const first = React.useRef(true);
  React.useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setActive(a => (a + 1) % N), MADEFOR_MS);
    return () => clearInterval(id);
  }, [reduced, N]);
  /* Play the active slide's video from the start; pause every other.
     When a slide becomes active again it restarts from 0. */
  React.useEffect(() => {
    if (reduced) return;                               // reduced motion: leave videos paused on their poster frame
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        try { v.currentTime = 0; } catch (e) {}
        const p = v.play();
        if (p && p.catch) p.catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, reduced]);
  React.useLayoutEffect(() => {
    const animate = !first.current && !reduced;
    refs.current.forEach((el, i) => {
      if (!el) return;
      const d = (i - active + N) % N;                 // 0 = centre, 1 = right peek, 2 = left peek
      if (d === 1 && animate) {                        // recycled screen re-enters from off-stage right
        el.style.transition = 'none';
        el.style.left = '175%';
        void el.offsetWidth;                           // commit the jump without animating it
        el.style.transition = '';
        el.style.left = '103.125%';
      } else {
        el.style.transition = animate ? '' : 'none';
        el.style.left = d === 0 ? '50%' : (d === 2 ? '-3.125%' : '103.125%');
      }
      el.style.opacity = d === 0 ? '1' : '0.32';
      el.style.zIndex = d === 0 ? '3' : '1';
    });
    if (first.current) {                               // let the initial placement paint un-animated, then enable transitions
      if (refs.current[0]) void refs.current[0].offsetWidth;
      refs.current.forEach(el => { if (el) el.style.transition = ''; });
      first.current = false;
    }
  }, [active, reduced, N]);
  return (
    <div className="mf-cv" role="group" aria-roledescription="carousel" aria-label="The same creator sharing a product across TikTok, YouTube and Instagram">
      {SOCIAL_SCREENS.map((s, i) => {
        const d = (i - active + N) % N;
        return (
          <div key={s.key} ref={el => (refs.current[i] = el)}
               className={`mf-cv-screen${d === 0 ? ' is-center' : ''}`} aria-hidden={d !== 0}>
            <div className="mf-cv-frame" style={(s.video || s.img) ? undefined : { background: s.tint }}>
              {s.video
                ? <video ref={el => (videoRefs.current[i] = el)}
                         src={`media/video/${s.video}`}
                         poster={s.img ? `media/figma/${s.img}` : undefined}
                         muted playsInline preload="auto" aria-label={`${s.label} preview`} />
                : s.img
                  ? <img src={`media/figma/${s.img}`} alt={`${s.label} preview`} loading="lazy" />
                  : <span className="mf-cv-ph">{s.label}</span>}
            </div>
            <div className="mf-cv-icon" aria-hidden="true">
              {s.icon
                ? <img src={`media/figma/${s.icon}`} alt="" />
                : <span className="mf-cv-ico-ph">{s.label[0]}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
function MadeFor() {
  return (
    <section id="cc-made" className="mf-sec">
      <div className="wrap">
        <div className="mf-grid">
          <div className="mf-left">
            <h2 className="mf-title" data-reveal>Made for TikTok, YouTube, Instagram, and more.</h2>
            <div className="mf-points" data-reveal data-reveal-delay="1">
              {MADE_POINTS.map(([t, d]) => (
                <div className="mf-point" key={t}>
                  <h3 className="mf-pt">{t}</h3>
                  <p className="mf-pd">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mf-visual" data-reveal>
            <MadeForCarousel />
          </div>
        </div>
      </div>
      <style>{`
        .mf-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .mf-grid{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,440px); gap:clamp(32px,5vw,72px); align-items:center; }
        .mf-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); max-width:520px; }
        .mf-points{ margin-top:clamp(24px,4vh,40px); display:flex; flex-direction:column; gap:clamp(20px,3vh,30px); }
        .mf-pt{ font-family:var(--font-display); font-weight:800; font-size:19px; letter-spacing:-.01em; color:var(--warm-900); }
        .mf-pd{ margin-top:8px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:520px; }
        .mf-visual{ position:relative; }
        /* ---- auto-play peek carousel (coverflow) ---- */
        .mf-cv{ position:relative; width:100%; max-width:476px; margin-inline:auto; aspect-ratio:476/445;
          border-radius:var(--r-xl); overflow:hidden; background:var(--warm-100); }
        /* top-anchored + taller than the frame, so the bottom crops against the rounded container (Figma) */
        .mf-cv-screen{ position:absolute; top:8%; left:50%; width:38%; aspect-ratio:224/452;
          transform:translateX(-50%); transition:left .8s cubic-bezier(.45,0,.15,1), opacity .8s ease;
          will-change:left,opacity; }
        .mf-cv-frame{ position:absolute; inset:0; border-radius:var(--r-xl); overflow:hidden;
          box-shadow:-5px 4px 9px rgba(0,0,0,.16); }
        .mf-cv-frame img, .mf-cv-frame video{ width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }
        .mf-cv-ph{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
          color:rgba(255,255,255,.94); font-family:var(--font-display); font-weight:800; font-size:clamp(15px,2.6vw,20px); letter-spacing:-.01em; }
        /* platform icon tile on the top-left of the screen; pops in on centre, shrinks/fades on the way out */
        .mf-cv-icon{ position:absolute; top:-3%; left:-7%; width:29%; aspect-ratio:1; border-radius:22%;
          overflow:hidden; z-index:4; box-shadow:-6px 5px 9px rgba(0,0,0,.16);
          opacity:0; transform:scale(.4); transform-origin:top left;
          transition:opacity .3s ease, transform .38s cubic-bezier(.34,1.56,.64,1); }
        .mf-cv-icon img{ width:100%; height:100%; object-fit:cover; display:block; }
        .mf-cv-ico-ph{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
          background:#141418; color:#fff; font-family:var(--font-display); font-weight:800; font-size:clamp(14px,3vw,22px); }
        .mf-cv-screen.is-center .mf-cv-icon{ opacity:1; transform:scale(1); transition-delay:.5s; }
        @media (prefers-reduced-motion: reduce){ .mf-cv-screen{ transition:none; } .mf-cv-icon{ transition:none; } }
        @media (max-width:860px){ .mf-grid{ grid-template-columns:1fr; gap:32px; } .mf-visual{ order:-1; max-width:476px; width:100%; margin-inline:auto; } }
      `}</style>
    </section>
  );
}
/* ---------- CC §3 — "Built for the way you create." (tab view, reused from the
   publisher overview's platform stepper — pf-* pattern). One tab per tool. ---------- */
const CREATE_TABS = [
  { key: 'app', t: 'Mobile app', d: 'Generate links and grab codes on the go. Share to your socials in seconds, and check your clicks, conversions, and earnings from your phone.', img: 'creator-partner-53-slide1.png?v=2',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></svg> },
  { key: 'code', t: 'Code Generator', d: "Get a unique code to share where links don't work, like your Instagram captions. Your audience uses it at checkout and the sale tracks back to you.", img: 'creator-partner-slide2.png',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2a2 2 0 0 1-.6-1.4V4a1 1 0 0 1 1-1h7.8a2 2 0 0 1 1.4.6l7.6 7.6a2 2 0 0 1 0 2.6Z" /><path d="M7.5 7.5h.01" /></svg> },
  { key: 'creative', t: 'Creative Hub', d: 'Grab ready-made banners and coupon codes from top brands and drop them straight into your content.', img: 'creator-partner-slide3.png',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg> },
];
const CREATE_TABS_CSS = `
        .pf-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; overflow:hidden; }
        .pf-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .pf-sub{ text-align:center; margin-top:14px; font-size:16px; line-height:1.4; color:var(--warm-600); }
        .pf-grid{ margin-top:clamp(40px,6vh,72px); display:grid; grid-template-columns:minmax(0,412px) 1fr; gap:clamp(32px,4vw,64px); align-items:stretch; }
        .pf-steps{ display:flex; flex-direction:column; }
        .pf-step{ position:relative; display:flex; gap:20px; align-items:stretch; text-align:left; background:none; border:none; cursor:pointer; padding:30px 0; width:100%; }
        .pf-rail-fill{ position:absolute; left:0; top:0; width:4px; border-radius:var(--r-full); background:var(--ember); height:0; }
        .pf-step-t{ display:flex; align-items:center; gap:11px; font-family:var(--font-display); font-weight:800; font-size:21px; letter-spacing:-.02em; color:var(--warm-900); }
        .pf-step.on .pf-step-d{ margin-top:12px; }
        .pf-visual{ position:relative; align-self:center; width:100%; aspect-ratio:5/3; overflow:hidden;
          border-radius:var(--r-xl);
          background:var(--warm-100); }
        .pf-img{ position:absolute; inset:0; width:100%; height:100%;
          object-fit:contain; object-position:center; opacity:0; transition:opacity .5s ease; }
        .pf-step-fig{ display:none; }
        @media (max-width:900px){
          .pf-grid{ grid-template-columns:1fr; gap:0; }
          .pf-visual{ display:none; }
          .pf-step{ gap:0; padding:22px 0; }
          .pf-rail{ display:none; }
          .pf-step-fig{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .45s ease; }
          .pf-step.on .pf-step-fig{ grid-template-rows:1fr; }
          .pf-step-fig-in{ overflow:hidden; min-height:0; }
          .cct-img-m{ display:block; width:100%; height:auto; margin:16px 0 4px; border-radius:var(--r-xl); box-shadow:0 12px 28px rgba(15,28,46,.12); }
        }`;
function BuiltCreate() {
  return (
    <PlatformTabs id="cc-create" className="cct-sec" items={CREATE_TABS} figClass="cct-img-m" css={CREATE_TABS_CSS}
      title="Built for the way you create."
      sub="Everything you need to turn your content into income, in one place." />
  );
}
/* ---------- CC §3b — "Why creators earn with Involve." (3 icon columns) — Figma 2667:17675 ---------- */
const WE_ICONS = {
  bag: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 8h12l-1 12.5H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></svg>,
  heart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20.5S4.5 16 4.5 10.6A3.6 3.6 0 0 1 12 7.5a3.6 3.6 0 0 1 7.5 3.1C19.5 16 12 20.5 12 20.5Z" /></svg>,
  file: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5" /><path d="M9.3 14.4l1.9 1.9 3.5-3.7" /></svg>,
};
const WHY_EARN = [
  ['bag', 'You earn per sale, not per follower.', 'A small, engaged audience can out-earn a big one. No minimum following to start.'],
  ['heart', 'Promote what already fits.', 'Keep making what you make. Add links to the products you would recommend anyway.'],
  ['file', 'Get paid faster.', 'Earnings are validated daily, and Express Withdrawal lets you withdraw before validation finishes.'],
];
function WhyEarn() {
  return (
    <section id="cc-why" className="we-sec">
      <div className="wrap">
        <h2 className="we-title" data-reveal>Why creators earn with Involve.</h2>
        <div className="we-grid">
          {WHY_EARN.map(([ic, t, d], i) => (
            <div className="we-item" key={t} data-reveal data-reveal-delay={i + 1}>
              <span className="we-icon">{WE_ICONS[ic]}</span>
              <h3 className="we-ct">{t}</h3>
              <p className="we-cd">{d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .we-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .we-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .we-grid{ margin-top:clamp(34px,5vh,54px); display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(28px,4vw,56px); }
        .we-item{ min-width:0; }
        .we-icon{ display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:var(--r-xl); background:rgba(240,88,38,.12); color:var(--ember); }
        .we-icon svg{ width:24px; height:24px; display:block; }
        .we-ct{ margin-top:clamp(20px,3vh,26px); font-family:var(--font-display); font-weight:800; font-size:20px; letter-spacing:-.01em; color:var(--warm-900); }
        .we-cd{ margin-top:8px; font:400 16px/1.45 var(--font-body); color:var(--warm-600); max-width:340px; }
        @media (max-width:760px){ .we-grid{ grid-template-columns:1fr; gap:clamp(24px,4vh,34px); max-width:440px; margin-inline:auto; } }
      `}</style>
    </section>
  );
}
/* ---------- CC §2b — "How it works" (3 numbered steps) — Figma 2546:45011 ---------- */
const HIW_STEPS = [
  { t: 'Pick a brand', d: 'Browse 500+ brands and choose products that fit your audience.', img: 'general-hye-01.png' },
  { t: 'Share your link', d: 'Drop a trackable link in your bio, stories, or captions, or share a promo code.', img: 'cc-hye-02.png' },
  { t: 'Earn on every sale', d: 'When a follower buys through your link, the sale is credited to you.', img: 'general-hye-03.png' },
  { t: 'Get paid', d: 'Withdraw in your local currency once sales are validated, or sooner with Express Withdrawal.', img: 'general-hye-04.png' },
];
// Card 1 (Pick a brand): a 4x2 grid of brand logos where one logo is "active" at
// a time; a single timer advances the playhead row by row (0..7) and loops.
const BG_COUNT = 8;
const BG_DWELL = 2000;      // ms each logo stays active before advancing
const BG_ROWPAUSE = 160;    // extra dwell on the last logo of each row (index 3 and 7)
function BrandGrid() {
  const [active, setActive] = React.useState(0);
  const activeRef = React.useRef(0);
  const hoverRef = React.useRef(false);
  const visibleRef = React.useRef(true);
  const timerRef = React.useRef(null);
  const wrapRef = React.useRef(null);
  const ctrl = React.useRef({ play: () => {}, stop: () => {} });
  React.useEffect(() => {
    if (prefersReduced()) return;                 // static grid, no loop
    const stop = () => { if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; } };
    const schedule = () => {
      const i = activeRef.current;
      const delay = BG_DWELL + (i === 3 || i === 7 ? BG_ROWPAUSE : 0);
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        const next = (activeRef.current + 1) % BG_COUNT;
        activeRef.current = next;
        setActive(next);
        if (!hoverRef.current && visibleRef.current && !document.hidden) schedule();
      }, delay);
    };
    const play = () => { if (!hoverRef.current && visibleRef.current && !document.hidden && !timerRef.current) schedule(); };
    ctrl.current = { play, stop };
    const io = new IntersectionObserver((e) => {
      visibleRef.current = e[0].isIntersecting;
      if (visibleRef.current) play(); else stop();
    }, { threshold: 0.2 });
    if (wrapRef.current) io.observe(wrapRef.current);
    const onVis = () => { if (document.hidden) stop(); else play(); };
    document.addEventListener('visibilitychange', onVis);
    play();
    return () => { stop(); io.disconnect(); document.removeEventListener('visibilitychange', onVis); ctrl.current = { play: () => {}, stop: () => {} }; };
  }, []);
  const enter = (i) => { hoverRef.current = true; ctrl.current.stop(); activeRef.current = i; setActive(i); };
  const leave = () => { hoverRef.current = false; ctrl.current.play(); };
  return (
    <div className="bg-grid" ref={wrapRef} onMouseLeave={leave} aria-hidden="true">
      {Array.from({ length: BG_COUNT }).map((_, i) => (
        <span className={'bg-logo' + (i === active ? ' is-active' : '')} key={i} onMouseEnter={() => enter(i)}>
          <img src={`media/figma/brand-logos${i + 1}.png`} alt="" loading="lazy" />
        </span>
      ))}
    </div>
  );
}
// Card 4 (Get paid): one pill whose currency steps USD -> MYR -> EUR, each code
// fading up & out then the next fading in from below (echoes the publisher tier pill, no icon).
const GP_CURR = [
  { key: 'usd', label: 'USD', amount: '1,000' },
  { key: 'myr', label: 'MYR', amount: '4,086' },
  { key: 'eur', label: 'EUR', amount: '883' },
];
const GP_HOLD = 2600;   // each currency holds ~2.6s
const GP_EXIT = 340;    // last 340ms = old code fades up & out
function GetPaidPill() {
  const [step, setStep] = React.useState(0);
  const [phase, setPhase] = React.useState('in');
  React.useEffect(() => {
    if (prefersReduced()) { setStep(0); setPhase('in'); return; }
    setPhase('in');
    const tOut = setTimeout(() => setPhase('out'), GP_HOLD - GP_EXIT);
    const tNext = setTimeout(() => setStep((s) => (s + 1) % GP_CURR.length), GP_HOLD);
    return () => { clearTimeout(tOut); clearTimeout(tNext); };
  }, [step]);
  const c = GP_CURR[step];
  const ph = phase === 'out' ? ' is-out' : ' is-in';
  return (
    <span className="gp-pill" aria-live="polite">
      <em className={'gp-label' + ph} key={c.key}>{c.label}<span className="gp-amt">{c.amount}</span></em>
    </span>
  );
}
function HowItWorks() {
  return (
    <section id="cc-how" className="hiw-sec">
      <div className="wrap">
        <h2 className="hiw-title" data-reveal>How you earn.</h2>
        <div className="hiw-grid">
          {HIW_STEPS.map((s, i) => (
            <div className="hiw-step" key={s.t} data-reveal data-reveal-delay={i + 1}>
              <div className="hiw-card"><img src={`media/figma/${s.img}`} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} /></div>
              <h3 className="hiw-ct">{i + 1}. {s.t}</h3>
              <p className="hiw-cd">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .hiw-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .hiw-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .hiw-grid{ margin-top:clamp(34px,5.5vh,58px); display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(20px,2.2vw,32px); }
        .hiw-step{ min-width:0; }
        .hiw-card{ height:178px; border-radius:var(--r-lg); background:var(--warm-100); overflow:hidden; display:flex; align-items:center; justify-content:center; }
        .hiw-card img{ width:100%; height:100%; object-fit:cover; object-position:left center; display:block; }   /* art bleeds off the right; keep its left inset */
        .bg-grid{ --bg-cell:50px; --bg-gap:6px; --bg-inactive:0.746;
          display:grid; grid-template-columns:repeat(4,var(--bg-cell)); grid-auto-rows:var(--bg-cell); gap:var(--bg-gap);
          justify-content:center; align-content:center; }
        .bg-logo{ width:var(--bg-cell); height:var(--bg-cell); display:flex; align-items:center; justify-content:center;
          transform:scale(var(--bg-inactive)); opacity:.45; will-change:transform,opacity;
          transition:transform .384s cubic-bezier(.4,0,.2,1), opacity .384s cubic-bezier(.4,0,.2,1); }
        .bg-logo.is-active{ transform:scale(1); opacity:1;
          transition:transform .384s cubic-bezier(.34,1.26,.64,1), opacity .384s cubic-bezier(.4,0,.2,1); }
        .bg-logo img{ width:100%; height:100%; object-fit:contain; display:block; }
        @media (prefers-reduced-motion: reduce){ .bg-logo{ transform:none; opacity:1; transition:none; } }
        .hiw-card-pay{ position:relative; }
        .gp-pill{ position:absolute; left:24px; top:50%; transform:translateY(-50%);
          display:inline-flex; align-items:center; justify-content:flex-start; width:420px; flex:0 0 auto; box-sizing:border-box;
          background:#fff; border-radius:var(--r-xl); padding:18px 30px; box-shadow:0 8px 18px rgba(15,28,46,.10);
          font-family:var(--font-display); font-weight:800; font-size:32px; letter-spacing:.005em; color:var(--warm-900); white-space:nowrap; }
        .gp-label{ font-style:normal; display:inline-block; }
        .gp-amt{ color:var(--warm-300); margin-left:0.198em; }
        .gp-label.is-in{ animation:gp-in .42s cubic-bezier(.2,.7,.3,1) both; }
        .gp-label.is-out{ animation:gp-out .32s ease both; }
        @keyframes gp-in{ from{ opacity:0; transform:translateY(12px); } to{ opacity:1; transform:translateY(0); } }
        @keyframes gp-out{ from{ opacity:1; transform:translateY(0); } to{ opacity:0; transform:translateY(-12px); } }
        @media (prefers-reduced-motion: reduce){ .gp-label{ animation:none; opacity:1; transform:none; } }
        .hiw-ct{ margin-top:22px; font-family:var(--font-display); font-weight:800; font-size:21px; line-height:1.38; letter-spacing:-.02em; color:var(--warm-900); }
        .hiw-cd{ margin-top:14px; font:400 16px/1.31 var(--font-body); color:var(--warm-600); }
        @media (max-width:900px){ .hiw-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); gap:clamp(24px,3vw,32px); } }
        @media (max-width:520px){ .hiw-grid{ grid-template-columns:1fr; gap:clamp(24px,4vh,34px); max-width:440px; } }
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
        <MadeFor />
        <HowItWorks />
        <BuiltCreate />
        <WhyEarn />
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
