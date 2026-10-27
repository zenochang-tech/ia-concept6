/* ============================================================================
   publishers.jsx — "For Publishers" overview page.
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, FinalCta, Testimonials, Faq, AppDownload, EarnFeatures, HeroHexDeco, HERO_HEXDECO_CSS, LogoMarquee } = window;

const LinkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

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
          <span className="ph-eyebrow" data-reveal>Affiliate Marketing for Publishers</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Turn your audience into income.</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="2">Promote what you love, earn on every sale, and get paid faster.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="3">
            <a href="/partners/" className="btn btn-primary btn-lg">Start Earning <Arrow /></a>
          </div>
          <span className="ph-free" data-reveal data-reveal-delay="3">Free to join. No fees, no catch.</span>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />

          <div className={on(0)} aria-hidden={slide !== 0}>
            <div className="ph-photo"><img className="ph-flip" src="media/figma/pub-hero-creator.png" alt="A creator filming a product review to share with her audience" loading="eager" /></div>
            <div className="ph-slide-ui">
              <div className="ph-glass ph-g-link"><div className="ph-link"><span className="ph-link-ic"><LinkIcon /></span>invl.me/yourDeepLink</div></div>
              <div className="ph-glass ph-g-prod"><span className="ph-prod-lbl">Necklace</span><img className="ph-prod-img" src="media/figma/pub-hero-necklace.png" alt="" /></div>
            </div>
          </div>

          <div className={on(1)} aria-hidden={slide !== 1}>
            <div className="ph-photo"><img src="media/figma/pub-hero-slide2.png" alt="A publisher reviewing their sales in the dashboard" loading="eager" /></div>
            <div className="ph-slide-ui">
              <div className="ph-glass ph-g-sales"><div className="ph-stat"><span className="ph-stat-lbl"><span className="ph-stat-cur">$</span> Total Sales</span><span className="ph-stat-row"><b>136,578</b><em>&uarr;36%</em></span></div></div>
            </div>
          </div>

          <div className={on(2)} aria-hidden={slide !== 2}>
            <div className="ph-photo"><img className="ph-flip" src="media/figma/pub-hero-slide3.png" alt="A publisher checking conversion analytics" loading="eager" /></div>
            <div className="ph-slide-ui">
              <div className="ph-glass ph-g-conv"><div className="ph-stat"><span className="ph-stat-lbl">Conversion Rate</span><span className="ph-stat-row"><b>12<small>%</small></b><em>&uarr;21%</em></span></div></div>
            </div>
          </div>

          <div className={on(3)} aria-hidden={slide !== 3}>
            <div className="ph-photo"><img src="media/figma/pub-hero-slide4.png" alt="A publisher receiving a payout notification" loading="eager" /></div>
            <div className="ph-slide-ui">
              <div className="ph-glass ph-g-pay-a"><div className="ph-pay"><span>Payout Received</span><b>+ $48</b></div></div>
              <div className="ph-glass ph-g-pay-b"><div className="ph-pay"><span>Payout Received</span><b>+ $61</b></div></div>
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
        .ph-eyebrow{ display:inline-block; font:600 13px/1 var(--font-body); letter-spacing:.02em; color:var(--ember);
          background:rgba(240,88,38,.10); border-radius:var(--r-full); padding:8px 15px; }
        .ph-title{ margin-top:20px; font-size:clamp(38px,5.4vw,64px); line-height:1.0; letter-spacing:-.03em; color:var(--warm-900); }
        .ph-sub{ margin-top:20px; max-width:520px; font-size:clamp(16px,1.4vw,19px); line-height:1.55; color:var(--warm-600); }
        .ph-actions{ margin-top:30px; display:flex; gap:12px; flex-wrap:wrap; }
        .ph-free{ display:block; margin-top:16px; font:500 14px/1 var(--font-body); color:var(--warm-400); }
        /* visual */
        /* aspect matches the Figma hexagon (437×492) so the pointy-top hex reads regular, not stretched-wide */
        .ph-visual{ position:relative; aspect-ratio:437/492; max-width:492px; width:100%; margin-left:auto; }
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
  return <LogoMarquee caption="Explore and promote 4,000+ brands who are looking for publishers like you today." fill={false} />;
}

/* ---------- Section 3 — "If you have an audience, you can earn." ----------- */
const PUB_AUDIENCE = [
  ['Creators', 'Influencers and video makers. Share products your followers already trust, and earn every time they buy.', 'pub-aud-creators-v2.png'],
  ['Content and news sites', 'Blogs, review sites, publishers. Turn your articles and reviews into income that keeps earning after you publish.', 'pub-aud-content.png'],
  ['Cashback and loyalty sites', 'Cashback, rewards, points. Give members deals worth coming back for, and earn on the sales they drive.', 'pub-aud-cashback.png'],
  ['Coupon and deal sites', 'Promo codes, offers, discounts. Post the deals people are already searching for, and earn on every purchase.', 'pub-aud-coupon.png'],
  ['Comparison sites', 'Reviews and buying guides. Help people choose the right product, and earn when they buy through you.', 'pub-aud-comparison.png'],
  ['App owners', 'Show relevant products and cashback to your users, automated through our premium API integration.', 'pub-aud-appowners.png'],
  ['Media buyers and agencies', 'Run paid campaigns across hundreds of brands, with tracking and reports built in.', 'pub-aud-mediabuyers-v2.png'],
];
function PubAudience() {
  const scrollRef = React.useRef(null);
  const thumbRef = React.useRef(null);
  const barRef = React.useRef(null);
  React.useEffect(() => {
    const sc = scrollRef.current, thumb = thumbRef.current, bar = barRef.current;
    if (!sc || !thumb) return;
    const trackW = () => (bar ? bar.clientWidth : 134);
    let tw = 28;
    const update = () => {
      const T = trackW(), max = sc.scrollWidth - sc.clientWidth;
      tw = Math.max(28, Math.round(T * (sc.clientWidth / sc.scrollWidth)));
      const x = max > 0 ? (sc.scrollLeft / max) * (T - tw) : 0;
      thumb.style.width = tw + 'px';
      thumb.style.transform = `translateX(${x.toFixed(1)}px)`;
    };
    update();
    sc.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    // ---- drag the cards. Release listeners live on WINDOW so a mouseup anywhere
    // (even off the element / off-window) always ends the drag → never stays stuck. ----
    let cDown = false, sX = 0, sLeft = 0, moved = false, cPid = null;
    const cMove = (e) => { if (!cDown) return; const dx = e.clientX - sX; if (Math.abs(dx) > 3) moved = true; sc.scrollLeft = sLeft - dx; };
    const cEnd = () => { if (!cDown) return; cDown = false; sc.classList.remove('grabbing'); if (cPid != null) { try { sc.releasePointerCapture(cPid); } catch (_) {} cPid = null; } window.removeEventListener('pointermove', cMove); window.removeEventListener('pointerup', cEnd); window.removeEventListener('pointercancel', cEnd); };
    const cStart = (e) => { if (e.pointerType === 'mouse' && e.button !== 0) return; cDown = true; moved = false; sX = e.clientX; sLeft = sc.scrollLeft; cPid = e.pointerId; sc.classList.add('grabbing'); try { sc.setPointerCapture(e.pointerId); } catch (_) {} window.addEventListener('pointermove', cMove); window.addEventListener('pointerup', cEnd); window.addEventListener('pointercancel', cEnd); };
    const onClick = (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } };
    sc.addEventListener('pointerdown', cStart);
    sc.addEventListener('click', onClick, true);

    // ---- drag the ember scrollbar (grab the track/thumb → scrolls the cards) ----
    let bDown = false, bPid = null;
    const bSeek = (clientX) => { const T = trackW(), max = sc.scrollWidth - sc.clientWidth, r = bar.getBoundingClientRect(); let x = clientX - r.left - tw / 2; x = Math.max(0, Math.min(T - tw, x)); sc.scrollLeft = (T - tw) > 0 ? (x / (T - tw)) * max : 0; };
    const bMove = (e) => { if (bDown) bSeek(e.clientX); };
    const bEnd = () => { if (!bDown) return; bDown = false; bar.classList.remove('dragging'); if (bPid != null) { try { bar.releasePointerCapture(bPid); } catch (_) {} bPid = null; } window.removeEventListener('pointermove', bMove); window.removeEventListener('pointerup', bEnd); window.removeEventListener('pointercancel', bEnd); };
    const bStart = (e) => { if (e.pointerType === 'mouse' && e.button !== 0) return; bDown = true; bPid = e.pointerId; bar.classList.add('dragging'); try { bar.setPointerCapture(e.pointerId); } catch (_) {} bSeek(e.clientX); window.addEventListener('pointermove', bMove); window.addEventListener('pointerup', bEnd); window.addEventListener('pointercancel', bEnd); e.preventDefault(); };
    if (bar) bar.addEventListener('pointerdown', bStart);

    return () => {
      sc.removeEventListener('scroll', update); window.removeEventListener('resize', update);
      sc.removeEventListener('pointerdown', cStart); sc.removeEventListener('click', onClick, true);
      window.removeEventListener('pointermove', cMove); window.removeEventListener('pointerup', cEnd); window.removeEventListener('pointercancel', cEnd);
      if (bar) bar.removeEventListener('pointerdown', bStart);
      window.removeEventListener('pointermove', bMove); window.removeEventListener('pointerup', bEnd); window.removeEventListener('pointercancel', bEnd);
    };
  }, []);
  return (
    <section id="pub-audience" className="au-sec">
      <div className="wrap au-head">
        <div className="au-head-l" data-reveal>
          <h2 className="au-title">If you have an audience, you can earn.</h2>
          <p className="au-sub">Whatever you run, there's a way to earn with it, across campaigns, promo codes, product deals and more.</p>
        </div>
        <div ref={barRef} className="au-bar" data-reveal data-reveal-delay="1" aria-hidden="true"><span ref={thumbRef} className="au-bar-thumb" /></div>
      </div>
      <div ref={scrollRef} className="au-scroll" data-reveal data-reveal-delay="1">
        <div className="au-track">
          {PUB_AUDIENCE.map(([t, d, img]) => (
            <article className="au-card" key={t}>
              <img className="au-card-img" src={`media/figma/${img}`} alt="" draggable="false" loading="lazy" />
              <div className="au-card-body">
                <h3 className="au-card-t">{t}</h3>
                <p className="au-card-d">{d}</p>
              </div>
            </article>
          ))}
          <span className="au-track-end" aria-hidden="true" />
        </div>
      </div>
      <style>{`
        .au-sec{ background:var(--warm-50); padding:clamp(67px,9.66vh,132px) 0 clamp(55px,8.28vh,105px); overflow:hidden; }
        .au-head{ display:flex; align-items:flex-end; justify-content:space-between; gap:24px; flex-wrap:wrap; }
        .au-title{ font-size:clamp(30px,4vw,48px); line-height:1.06; letter-spacing:-.03em; color:var(--warm-900); }
        .au-sub{ margin-top:14px; max-width:620px; font-size:16px; line-height:1.4; color:var(--warm-600); }
        .au-bar{ position:relative; width:134px; height:12px; border-radius:var(--r-full); background:var(--warm-200); flex:0 0 auto; cursor:pointer; touch-action:none; }
        .au-bar.dragging{ cursor:grabbing; }
        .au-bar-thumb{ position:absolute; left:0; top:0; height:12px; width:66px; border-radius:var(--r-full); background:var(--ember); will-change:transform,width; pointer-events:none; }
        .au-scroll{ margin-top:clamp(24px,3.4vh,40px); overflow-x:auto; overflow-y:hidden; cursor:grab; scrollbar-width:none; -ms-overflow-style:none;
          padding-inline:max(32px, calc((100% - var(--maxw)) / 2 + 32px)); }
        .au-scroll::-webkit-scrollbar{ display:none; }
        .au-scroll.grabbing{ cursor:grabbing; }
        .au-track{ display:flex; gap:16px; width:max-content; }
        .au-track-end{ flex:0 0 max(1px, calc((100% - var(--maxw)) / 2)); }
        .au-card{ position:relative; flex:0 0 auto; width:clamp(268px,80vw,320px); height:426px; border-radius:var(--r-xl); overflow:hidden;
          background:linear-gradient(180deg,#f4f4f0 42%,#e7e7e1 100%); box-shadow:0 12px 30px rgba(15,28,46,.06);
          transition:transform .34s cubic-bezier(.22,1,.36,1), box-shadow .34s; }
        /* image anchored to the BOTTOM of the card, faded into the surface at its top so it never sits under the text */
        .au-card-img{ position:absolute; left:0; right:0; bottom:0; width:100%; height:60%; object-fit:cover; object-position:center 24%; opacity:.32; transition:opacity .34s ease; -webkit-user-drag:none; pointer-events:none;
          -webkit-mask:linear-gradient(180deg, transparent 0%, #000 30%); mask:linear-gradient(180deg, transparent 0%, #000 30%); }
        .au-card-body{ position:relative; z-index:1; padding:26px 28px; opacity:.7; transition:opacity .34s ease; }
        .au-card-t{ font-family:var(--font-display); font-weight:800; font-size:21px; line-height:1.25; letter-spacing:-.02em; color:var(--warm-900); }
        .au-card-d{ margin-top:10px; font:400 16px/1.31 var(--font-body); color:var(--warm-600); max-width:277px; }
        .au-card:hover{ box-shadow:0 24px 50px rgba(15,28,46,.16); }
        .au-card:hover .au-card-img{ opacity:.9; }
        .au-card:hover .au-card-body{ opacity:.96; }
        @media (max-width:820px){ .au-bar{ display:none; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 4 — "Simple enough to start today" (hexagon steps) ----- */
function roundedHexPath(cx, cy, R, r) {
  const angs = [-90, -30, 30, 90, 150, 210].map((d) => (d * Math.PI) / 180);
  const V = angs.map((a) => [cx + R * Math.cos(a), cy + R * Math.sin(a)]);
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const dist = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
  let d = '';
  for (let i = 0; i < 6; i++) {
    const p = V[i], prev = V[(i + 5) % 6], next = V[(i + 1) % 6];
    const a = lerp(p, prev, r / dist(p, prev)), b = lerp(p, next, r / dist(p, next));
    d += (i === 0 ? 'M ' : 'L ') + a[0].toFixed(2) + ' ' + a[1].toFixed(2);
    d += ' Q ' + p[0].toFixed(2) + ' ' + p[1].toFixed(2) + ' ' + b[0].toFixed(2) + ' ' + b[1].toFixed(2) + ' ';
  }
  return d + 'Z';
}
const HEX_PATH = roundedHexPath(180, 180, 168, 22);
const PUB_STEPS = [
  ['s1', '01. Get matched', "Create your free account, add your property and complete a quick verification. We match you with brands that fit your audience, so there's no cold outreach."],
  ['s2', '02. Go live', 'Pick a brand, generate your trackable link, coupon, or banner in a couple of clicks, and share it with your audience.'],
  ['s3', '03. Track everything', 'Watch your clicks, sales, and commissions update in real time, in your dashboard or the app.'],
  ['s4', '04. Get paid', 'Withdraw your earnings in your preferred currency once your conversions are validated.'],
];
const PUB_PILLS = [['pTL', 'Grow and repeat'], ['pTR', 'Pick and promote'], ['pBL', 'Earnings confirmed'], ['pBR', 'Your audience buys']];
function PubSteps() {
  const svgRef = React.useRef(null);
  const gradRef = React.useRef(null);   // ember outline radial (follows cursor point)
  const edgeRef = React.useRef(null);   // outline group (opacity fades in on hover)
  const faceERef = React.useRef(null);  // soft ember radial on the face (follows cursor)
  const faceMRef = React.useRef(null);  // soft midnight radial on the face (opposite the cursor)
  React.useEffect(() => {
    const svg = svgRef.current, grad = gradRef.current, edge = edgeRef.current;
    const faceE = faceERef.current, faceM = faceMRef.current;
    if (!svg || !grad || !edge || !faceE || !faceM) return;
    const stage = svg.closest('.hs-stage') || svg.parentElement;
    if (prefersReduced()) return;
    const C = 180, DCX = 96, DCY = 100;              // hex centre + default ember hot-spot (top-left)
    // outline follow-point (starts off the top so it fades in from above)
    let ptx = C, pty = -220, pcx = C, pcy = -220;
    // ember hot-spot centre for the face + halo colour (defaults to top-left)
    let ftx = DCX, fty = DCY, fcx = DCX, fcy = DCY;
    let ti = 0, ci = 0, raf = 0;
    const setColor = (x, y) => {
      const bx = (2 * C - x).toFixed(1), by = (2 * C - y).toFixed(1);
      const sx = x.toFixed(1), sy = y.toFixed(1);
      faceE.setAttribute('cx', sx); faceE.setAttribute('cy', sy);           // ember glob at the cursor
      faceM.setAttribute('cx', bx); faceM.setAttribute('cy', by);           // midnight glob opposite
    };
    const tick = () => {
      pcx += (ptx - pcx) * 0.18; pcy += (pty - pcy) * 0.18;
      fcx += (ftx - fcx) * 0.12; fcy += (fty - fcy) * 0.12;
      ci += (ti - ci) * 0.10;
      grad.setAttribute('cx', pcx.toFixed(1)); grad.setAttribute('cy', pcy.toFixed(1));
      edge.style.opacity = ci.toFixed(3);
      setColor(fcx, fcy);
      const settled = Math.abs(ptx - pcx) < 0.4 && Math.abs(ftx - fcx) < 0.4 && Math.abs(fty - fcy) < 0.4 && Math.abs(ti - ci) < 0.01;
      if (!settled) raf = requestAnimationFrame(tick); else raf = 0;
    };
    const onMove = (e) => {
      const r = svg.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 360;
      const my = ((e.clientY - r.top) / r.height) * 360;
      ptx = mx; pty = my; ftx = mx; fty = my;   // ember hot-spot sits under the cursor
      ti = 1;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => { ti = 0; pty = -220; ftx = DCX; fty = DCY; if (!raf) raf = requestAnimationFrame(tick); };
    setColor(DCX, DCY);
    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', onLeave);
    return () => { stage.removeEventListener('mousemove', onMove); stage.removeEventListener('mouseleave', onLeave); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <section id="pub-steps" className="hs-sec">
      <div className="wrap"><h2 className="hs-title" data-reveal>Simple enough to start today</h2></div>
      <div className="hs-stage" data-reveal data-reveal-delay="1">
        <div className="hs-hexwrap">
          <svg ref={svgRef} className="hs-hex" viewBox="0 0 360 360" aria-hidden="true">
            <defs>
              {/* neutral white plate base — the colour comes from the soft face globs on top */}
              <linearGradient id="hsPlate" x1="86" y1="104" x2="292" y2="330" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="1" stopColor="#eef1f6" />
              </linearGradient>
              {/* on-plate colour = two soft radial globs (no linear seam): ember near cursor, midnight opposite */}
              <radialGradient ref={faceERef} id="hsFaceE" gradientUnits="userSpaceOnUse" cx="96" cy="100" r="250">
                <stop offset="0" stopColor="#F05826" stopOpacity="0.24" />
                <stop offset="0.45" stopColor="#F05826" stopOpacity="0.10" />
                <stop offset="1" stopColor="#F05826" stopOpacity="0" />
              </radialGradient>
              <radialGradient ref={faceMRef} id="hsFaceM" gradientUnits="userSpaceOnUse" cx="264" cy="260" r="250">
                <stop offset="0" stopColor="#6A9CDF" stopOpacity="0.24" />
                <stop offset="0.45" stopColor="#6A9CDF" stopOpacity="0.10" />
                <stop offset="1" stopColor="#6A9CDF" stopOpacity="0" />
              </radialGradient>
              <radialGradient ref={gradRef} id="hsEdge" gradientUnits="userSpaceOnUse" cx="180" cy="-200" r="150">
                <stop offset="0" stopColor="#F05826" stopOpacity="1" />
                <stop offset="0.45" stopColor="#F05826" stopOpacity="0.6" />
                <stop offset="1" stopColor="#F05826" stopOpacity="0" />
              </radialGradient>
              <clipPath id="hsClip"><path d={HEX_PATH} /></clipPath>
              <filter id="hsFaceBlur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="16" /></filter>
              <filter id="hsGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6" /></filter>
            </defs>
            {/* neutral plate */}
            <path d={HEX_PATH} fill="url(#hsPlate)" className="hs-plate" />
            {/* dynamic ember/midnight colour — soft, blurred radial globs clipped to the hex (stays inside the shape) */}
            <g clipPath="url(#hsClip)">
              <g filter="url(#hsFaceBlur)">
                <path d={HEX_PATH} fill="url(#hsFaceE)" />
                <path d={HEX_PATH} fill="url(#hsFaceM)" />
              </g>
            </g>
            <g ref={edgeRef} style={{ opacity: 0 }}>
              <path d={HEX_PATH} fill="none" stroke="url(#hsEdge)" strokeWidth="8" filter="url(#hsGlow)" strokeLinejoin="round" />
              <path d={HEX_PATH} fill="none" stroke="url(#hsEdge)" strokeWidth="2.5" strokeLinejoin="round" />
            </g>
          </svg>
        </div>
        {PUB_PILLS.map(([cls, label]) => (
          <span key={cls} className={'hs-pill ' + cls}>{label}</span>
        ))}
        {PUB_STEPS.map(([cls, title, desc]) => (
          <div key={cls} className={'hs-step ' + cls}>
            <h3 className="hs-step-t">{title}</h3>
            <p className="hs-step-d">{desc}</p>
          </div>
        ))}
      </div>
      <style>{`
        .hs-sec{ background:var(--warm-50); padding:clamp(67px,9.66vh,132px) 0 clamp(77px,12.42vh,166px); overflow:hidden; }
        .hs-title{ text-align:center; font-size:clamp(30px,4vw,48px); line-height:1.1; letter-spacing:-.03em; color:var(--warm-900); }
        .hs-stage{ position:relative; max-width:1040px; height:680px; margin:clamp(64px,9vh,120px) auto 0; }
        .hs-hexwrap{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:360px; height:360px; filter:drop-shadow(0 34px 60px rgba(15,28,46,.10)); }
        .hs-hex{ width:100%; height:100%; overflow:visible; pointer-events:none; }
        .hs-pill{ position:absolute; transform:translate(-50%,-50%); background:#fff; border-radius:var(--r-full); padding:9px 18px;
          font-family:var(--font-body); font-weight:700; font-size:16px; color:var(--warm-900); white-space:nowrap; box-shadow:0 6px 12px rgba(0,0,0,.08); z-index:2; }
        .hs-pill.pTL{ left:calc(50% - 143px); top:calc(50% - 108px); }
        .hs-pill.pTR{ left:calc(50% + 154px); top:calc(50% - 108px); }
        .hs-pill.pBL{ left:calc(50% - 143px); top:calc(50% + 66px); }
        .hs-pill.pBR{ left:calc(50% + 154px); top:calc(50% + 66px); }
        .hs-step{ position:absolute; transform:translate(-50%,-50%); text-align:center; }
        .hs-step-t{ font-family:var(--font-display); font-weight:800; font-size:21px; letter-spacing:-.02em; color:var(--warm-900); }
        .hs-step-d{ margin-top:10px; font:400 16px/1.31 var(--font-body); color:var(--warm-600); }
        .hs-step.s1{ left:50%; top:calc(50% - 255px); width:420px; }
        .hs-step.s2{ left:calc(50% + 375px); top:calc(50% - 4px); width:277px; }
        .hs-step.s3{ left:50%; top:calc(50% + 245px); width:277px; }
        .hs-step.s4{ left:calc(50% - 375px); top:calc(50% - 4px); width:277px; }
        @media (max-width:980px){
          .hs-stage{ height:auto; display:flex; flex-direction:column; align-items:center; gap:34px; max-width:460px; }
          .hs-hexwrap, .hs-pill{ display:none; }
          .hs-step{ position:static; transform:none; width:100% !important; max-width:420px; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 5 — "You could earn … from this offer" ----------------
   Estimate model (all mockup values, kept internally consistent):
     earnings = clicks × PE_CONV × PE_AOV × commission_rate
   PE_AOV is used in the maths but never shown on screen. */
const PE_CONV = 0.035;   // conversion rate (shown as 3.5%)
const PE_AOV = 75;       // average order value in $ (used in the calc, not displayed)
// kind 'pct' → % of order value; kind 'flat' → fixed $ per approved conversion.
const PUB_OFFERS = [
  { name: 'JD Sports', key: 'jdsports', kind: 'pct', rate: 0.08 },
  { name: 'Uniqlo', key: 'uniqlo', kind: 'pct', rate: 0.06, boxed: true },
  { name: 'Puma', key: 'puma', kind: 'pct', rate: 0.10 },
  // NOTE: UOB pays a FLAT $60 per approved card (not a %). The card + calculator
  // render this as "$60 per approved card"; earnings = conversions × $60.
  { name: 'UOB', key: 'uob', kind: 'flat', rate: 60 },
  { name: 'Tiktok', key: 'tiktok', kind: 'pct', rate: 0.08 },
  { name: 'Huawei', key: 'huawei', kind: 'pct', rate: 0.04 },
];
// commission label for a given offer (calculator detail line + card copy share this)
const offerCommissionLabel = (o) => o.kind === 'flat' ? `$${o.rate} per approved card` : `${Math.round(o.rate * 100)}% commission`;
function PubEarn() {
  const [clicks, setClicks] = React.useState(1000);
  const [active, setActive] = React.useState(0);   // default selected offer = JD Sports
  const MIN = 100, MAX = 5000;
  const offer = PUB_OFFERS[active];
  // earnings = clicks × conversion_rate × average_order_value × commission_rate
  //   (UOB is a flat $ per approved conversion, so its rate replaces AOV × %)
  const conversions = clicks * PE_CONV;
  const earnings = offer.kind === 'flat' ? conversions * offer.rate : conversions * PE_AOV * offer.rate;
  const estimate = Math.round(earnings);
  const pct = ((clicks - MIN) / (MAX - MIN)) * 100;
  return (
    <section id="pub-earn" className="pe-sec">
      <div className="wrap pe-wrap">
        <div className="pe-forecast" data-reveal>
          <h2 className="pe-title">You could earn <span className="pe-amt">${estimate.toLocaleString()}</span> from this offer</h2>
          <p className="pe-sub">based on an estimated <b>{clicks.toLocaleString()}</b> clicks and a 3.5% conversion rate</p>
          <input className="pe-slider" type="range" min={MIN} max={MAX} step={50} value={clicks}
            onChange={(e) => setClicks(+e.target.value)} aria-label="Estimated monthly clicks"
            style={{ '--pct': pct + '%' }} />
          <p className="pe-note">{offerCommissionLabel(offer)} · cost-per-sale (CPS)</p>
          <p className="pe-disc">*Estimates only, actual earnings vary by your traffic and niche.</p>
          <a href="/partners/" className="btn btn-primary btn-lg pe-cta">Start Earning Today <Arrow /></a>
          <p className="pe-forecast-link">Want a number based on your real channels?<br /><a href="/partners/">Get your personalized forecast</a></p>
        </div>
        <div className="pe-cards" data-reveal data-reveal-delay="1">
          {PUB_OFFERS.map((o, i) => (
            <button type="button" className={'of-card' + (i === active ? ' active' : '')} key={o.key} onClick={() => setActive(i)} aria-pressed={i === active}>
              <span className="of-thumb">
                <img className="of-bg" src={`media/figma/pub-off-${o.key}-bg.png`} alt="" loading="lazy" />
                <span className="of-scrim" aria-hidden="true" />
                {o.boxed
                  ? <span className="of-logobox"><img src={`media/figma/pub-off-${o.key}-logo.png`} alt={`${o.name} logo`} /></span>
                  : <img className="of-logo" src={`media/figma/pub-off-${o.key}-logo.png`} alt={`${o.name} logo`} />}
              </span>
              <span className="of-name">{o.name}</span>
              <span className="of-comm"><small>Up to</small>{offerCommissionLabel(o)}</span>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        .pe-sec{ position:relative; background:var(--warm-50); padding:clamp(67px,9.66vh,138px) 0 clamp(77px,12.42vh,166px); overflow:hidden; }
        .pe-wrap{ position:relative; z-index:1; display:grid; grid-template-columns:1.02fr .98fr; gap:clamp(28px,4vw,64px); align-items:center; }
        .pe-title{ font-size:clamp(30px,3.8vw,48px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .pe-amt{ color:var(--warm-900); }
        .pe-sub{ margin-top:16px; font-size:clamp(17px,1.7vw,24px); line-height:1.35; color:var(--warm-600); }
        .pe-sub b{ color:var(--ember); font-weight:600; }
        .pe-slider{ -webkit-appearance:none; appearance:none; width:min(486px,100%); height:12px; margin-top:26px; border-radius:var(--r-full); outline:none; cursor:pointer;
          background:linear-gradient(90deg, #F05826 0%, #c43e18 var(--pct), #d9d9d9 var(--pct), #d9d9d9 100%); }
        .pe-slider::-webkit-slider-thumb{ -webkit-appearance:none; appearance:none; width:26px; height:26px; border-radius:50%; background:#fff; border:3px solid #F05826; box-shadow:0 4px 10px rgba(15,28,46,.22); cursor:grab; }
        .pe-slider::-moz-range-thumb{ width:26px; height:26px; border-radius:50%; background:#fff; border:3px solid #F05826; box-shadow:0 4px 10px rgba(15,28,46,.22); cursor:grab; }
        .pe-note{ margin-top:14px; font:italic 500 16px/1.4 var(--font-body); color:var(--warm-600); }
        .pe-disc{ margin-top:8px; font:400 13px/1.4 var(--font-body); color:var(--warm-500, #9a938c); }
        .pe-cta{ margin-top:22px; }
        .pe-forecast-link{ margin-top:18px; font:500 16px/1.5 var(--font-body); color:var(--warm-600); }
        .pe-forecast-link a{ color:var(--ember); text-decoration:underline; }
        /* offer cards */
        .pe-cards{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .of-card{ display:flex; flex-direction:column; background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-lg); padding:6px 6px 0; text-align:left; font:inherit; color:inherit; -webkit-appearance:none; appearance:none; cursor:pointer;
          transition:transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s, border-color .22s; }
        .of-card:hover{ box-shadow:var(--shadow-lg); }
        .of-card.active{ border-color:var(--warm-900); }
        .of-thumb{ position:relative; display:block; aspect-ratio:186/127; border-radius:var(--r-md); overflow:hidden; }
        .of-bg{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .of-scrim{ position:absolute; inset:0; background:rgba(0,0,0,.6); }
        .of-logo{ position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:52px; height:52px; object-fit:contain; z-index:1; }
        .of-logobox{ position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:50px; height:50px; border-radius:var(--r-md); overflow:hidden; background:#fff; display:flex; align-items:center; justify-content:center; z-index:1; }
        .of-logobox img{ width:100%; height:100%; object-fit:cover; }
        .of-name{ margin:12px 12px 0; font-family:var(--font-display); font-weight:500; font-size:15px; color:var(--warm-900); }
        .of-comm{ margin:4px 12px 14px; font:600 16px/1.3 var(--font-body); color:var(--warm-900); display:flex; flex-direction:column; }
        .of-comm small{ font-weight:600; font-size:12px; color:var(--warm-900); }
        @media (max-width:900px){
          .pe-wrap{ grid-template-columns:1fr; }
          .pe-cards{ grid-template-columns:repeat(3,1fr); }
        }
        @media (max-width:560px){ .pe-cards{ grid-template-columns:repeat(2,1fr); } }
      `}</style>
    </section>
  );
}

/* ---------- Section 6 — "Built for how you actually earn." (shared EarnFeatures, ia-sections.jsx) */
const PUB_BUILT_CSS = `
        .be-title{ text-align:center; font-size:clamp(30px,4vw,48px); line-height:1.1; letter-spacing:-.03em; color:var(--warm-900); }
      `;
function PubBuilt() {
  return (
    <EarnFeatures title="Built for how you actually earn." tileAlts={null} css={PUB_BUILT_CSS}
      brandsCopy="Promote Shopee, Lazada, Zalora, Nike and hundreds more across retail, travel, beauty and finance. One account, hundreds of brands, so you earn more in one place instead of chasing programs one by one." />
  );
}

/* ---------- Testimonials (shared Testimonials, ia-sections.jsx) --------- */
const PUB_VOICES_CSS = `
        .tv-title{ text-align:center; font-size:clamp(30px,4vw,48px); line-height:1.1; letter-spacing:-.03em; color:var(--warm-900); }
      `;
function PubVoices() {
  return <Testimonials css={PUB_VOICES_CSS} />;
}

/* ---------- Section 8 — "Questions, answered." (FAQ accordion) ------------
   Copy supplied by the client. Two answers carry links (beginner guide, Express
   Withdrawal) — hrefs are placeholders pending the real URLs. Example figures
   (4.2% commission, 10 working days) are illustrative — confirm before launch. */
const PUB_FAQ = [
  ['What is affiliate marketing?',
    <>Affiliate marketing is a performance-based way to earn: you promote an advertiser&rsquo;s products with your own trackable link, and you earn a commission on every sale you drive. On the Involve Asia platform, you get access to hundreds of brands, the links and tracking to promote them, and the payouts, all in one place. <a href="/resources/affiliate-marketing-guide/">Read our beginner guide</a>.</>],
  ['How does affiliate marketing work?',
    'You share a trackable link. When someone clicks it and buys, the sale is recorded to you, and you earn a commission. Even if they come back days later, a cookie keeps the sale credited to you. On Involve Asia you find campaigns, track performance, and get paid from the dashboard and the app.'],
  ['What is an affiliate program?',
    'An affiliate program is an advertiser’s set of offers and commissions for publishers who promote them. On the platform you search for the brands you like, generate a link, and start promoting. Some programs approve publishers before promotion begins.'],
  ['Is affiliate marketing legal?',
    'Yes. Affiliate marketing is a legitimate, widely used marketing model. We keep every partnership and promotion compliant and transparent, so both publishers and advertisers can trust the numbers.'],
  ['What is an affiliate platform, and how is it different from a network?',
    'A network is the connective layer that links advertisers and publishers. A platform is the full product that sits on top: the offers, the link and tracking tools, the reporting, and the payouts, in one place. Involve Asia is an affiliate marketing platform that gives both sides everything they need to grow.'],
  ['What types of publishers can join?',
    'Almost any kind. Social and influencer, content and news sites, coupon and deal sites, cashback and loyalty sites, comparison sites, app owners, and media buyers or agencies. If you have an audience or traffic, there is a way to earn.'],
  ['Do I need a website?',
    'No. You can earn with a blog, a YouTube channel, Instagram, Facebook, TikTok, an email list, an app, and more. Just create an account, add your property, and start.'],
  ['Is it free to join?',
    'Yes. Joining is free, there are no fees to sign up, and no cost to use the platform.'],
  ['How do I get started and approved?',
    'Create your account, add your property, and apply to the programs you want to promote. Some advertisers approve publishers before promotion begins; once you are approved, you can generate links and start earning.'],
  ['How are commissions calculated?',
    'Each brand sets its own commission. For example, a fashion brand might pay 4.2% on every validated sale. Two things shape your payout: the validation period (the advertiser confirms the sale is genuine and not cancelled before it pays out) and the cookie period (how long after a click a purchase still counts for you). Both are shown on each offer.'],
  ['How and when do I get paid?',
    <>You get paid by PayPal or bank transfer, in your preferred currency, within 10 working days of your request, once your conversions are validated. If you want your earnings sooner, <a href="/express-withdrawal/">Express Withdrawal</a> lets eligible publishers unlock a portion before validation, subject to a processing fee and approval.</>],
  ['How do I track my performance?',
    'Log in and open Reports, then Performance Report. Filter by date range, brand, or campaign type to see your clicks, sales, and earnings in real time. Advanced publishers can also pull performance through the API.'],
];
const PUB_FAQ_CSS = `
        .fq-title{ text-align:center; font-size:clamp(30px,4vw,48px); line-height:1.1; letter-spacing:-.03em; color:var(--warm-900); }
      `;
function PubFAQ() {
  return <Faq items={PUB_FAQ} css={PUB_FAQ_CSS} />;
}

/* ---------- Final CTA (shared FinalCta, ia-sections.jsx) ----------------- */
const PUB_CTA_CSS = `
        .pc-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(199px,33.12vh,365px) 0 clamp(232px,35.88vh,430px); }
        .pc-title{ font-size:clamp(30px,4vw,48px); line-height:1.15; letter-spacing:-.03em; color:var(--warm-900); max-width:900px; }
      `;
function PubCTA() {
  return <FinalCta title="Start earning with your audience today." label="Create your free account" css={PUB_CTA_CSS} />;
}

function PublisherApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <PubHero />
        <PubLogos />
        <PubAudience />
        <PubSteps />
        <PubEarn />
        <PubBuilt />
        <PubVoices />
        <PubFAQ />
        <PubCTA />
      </main>
      <Footer />
      <AppDownload showOnMobile />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PublisherApp />);
