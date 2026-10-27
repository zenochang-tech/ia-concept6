/* ============================================================================
   publishers.jsx — "For Publishers" overview page.
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal } = window;

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
      <div className="ph-hexdeco" aria-hidden="true">
        <img className="phd phd1" src="media/figma/pub-hero-deco1.svg?v=2" alt="" />
        <img className="phd phd2" src="media/figma/pub-hero-deco2.svg?v=2" alt="" />
        <img className="phd phd3" src="media/figma/pub-hero-deco3.svg?v=2" alt="" />
        <img className="phd phd4" src="media/figma/pub-hero-deco4.svg?v=2" alt="" />
      </div>
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
        /* decorative hexagons (Figma Polygon 64–67) — same size as the slider hexagon (492px), faint */
        .ph-hexdeco{ position:absolute; inset:0; z-index:0; pointer-events:none; overflow:hidden; }
        .phd{ position:absolute; width:492px; height:auto; }
        .phd1{ top:-62%; right:-10%; }
        .phd2{ top:6%; right:-30%; }
        .phd3{ left:32%; bottom:-54%; }
        .phd4{ left:-14%; bottom:-54%; }
        @media (max-width:900px){ .ph-hexdeco{ display:none; } }
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
          display:none;  /* colour glow retired in v3.5.2 */ }
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
const PUB_LOGOS = [
  ['Apple', 'pub-logo-apple.png', 42],
  ['Nike', 'pub-logo-nike.png', 34],
  ['SHEIN', 'pub-logo-shein.png', 22],
  ['UOB', 'pub-logo-uob.png', 26],
  ['TikTok Shop', 'pub-logo-tiktokshop.png', 60],
  ['airasia', 'pub-logo-airasia.png', 30],
  ['Klook', 'pub-logo-klook.png', 54],
];
function PubLogos() {
  const trackRef = React.useRef(null);
  // Auto-sliding + draggable marquee, ported from the homepage TrustStrip. Content is
  // duplicated so wrapping the offset into (-half, 0] loops seamlessly. Reduced-motion =
  // static, drag-only.
  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const norm = (o, half) => { if (!half) return 0; o %= half; if (o > 0) o -= half; return o; };
    const SPEED = 30;                                    // px/sec — subtle
    const s = { offset: 0, half: el.scrollWidth / 2 || 1, dragging: false, startX: 0, startOffset: 0 };
    const draw = () => { el.style.transform = `translate3d(${s.offset.toFixed(1)}px,0,0)`; };
    const row = el.parentElement;
    const onDown = (e) => { s.dragging = true; s.startX = e.clientX; s.startOffset = s.offset; row.classList.add('grabbing'); try { row.setPointerCapture(e.pointerId); } catch (_) {} };
    const onMove = (e) => { if (!s.dragging) return; s.offset = norm(s.startOffset + (e.clientX - s.startX), s.half); draw(); };
    const onUp = (e) => { if (!s.dragging) return; s.dragging = false; row.classList.remove('grabbing'); try { row.releasePointerCapture(e.pointerId); } catch (_) {} };
    row.addEventListener('pointerdown', onDown);
    row.addEventListener('pointermove', onMove);
    row.addEventListener('pointerup', onUp);
    row.addEventListener('pointercancel', onUp);
    row.addEventListener('lostpointercapture', onUp);
    const onResize = () => { s.half = el.scrollWidth / 2 || 1; };
    let raf = 0, last = null;
    if (reduce) { draw(); }
    else {
      const tick = (now) => {
        if (last == null) last = now;
        const dt = Math.min(0.05, (now - last) / 1000); last = now;
        if (!s.dragging) s.offset = norm(s.offset - SPEED * dt, s.half);
        draw();
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      window.addEventListener('resize', onResize);
    }
    return () => { if (raf) cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); row.removeEventListener('pointerdown', onDown); row.removeEventListener('pointermove', onMove); row.removeEventListener('pointerup', onUp); row.removeEventListener('pointercancel', onUp); row.removeEventListener('lostpointercapture', onUp); };
  }, []);
  const dup = [...PUB_LOGOS, ...PUB_LOGOS];
  return (
    <section id="pub-logos" className="pl-sec">
      <div className="wrap">
        <p className="pl-cap" data-reveal>Trusted by brands your customers already know, across retail, travel, beauty, and finance.</p>
      </div>
      <div className="pl-marquee" data-reveal data-reveal-delay="1">
        <div ref={trackRef} className="pl-track">
          {dup.map(([name, file, h], i) => (
            <img key={i} className="pl-logo" src={`media/figma/${file}`} alt={`${name} logo`} style={{ height: h }} draggable="false" />
          ))}
        </div>
      </div>
      <style>{`
        .pl-sec{ background:var(--warm-50); padding:clamp(28px,4vh,48px) 0 clamp(20px,3vh,36px); }
        .pl-cap{ text-align:center; color:var(--warm-600); font-size:16px; line-height:1.5; max-width:718px; margin:0 auto; }
        .pl-marquee{ margin-top:clamp(22px,3.4vh,38px); overflow:hidden; width:100%; cursor:grab; touch-action:pan-y; user-select:none;
          -webkit-mask-image:linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image:linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
        .pl-marquee.grabbing{ cursor:grabbing; }
        .pl-track{ display:flex; align-items:center; gap:clamp(40px,5.5vw,84px); width:max-content; will-change:transform; }
        .pl-logo{ display:block; width:auto; object-fit:contain; opacity:.9; flex:0 0 auto; -webkit-user-drag:none; user-drag:none; pointer-events:none; }
      `}</style>
    </section>
  );
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
        .au-bar-thumb{ position:absolute; left:0; top:0; height:12px; width:66px; border-radius:var(--r-full); background:var(--midnight-light); will-change:transform,width; pointer-events:none; }
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
                <stop offset="0" stopColor="#3D5A80" stopOpacity="0.24" />
                <stop offset="0.45" stopColor="#3D5A80" stopOpacity="0.10" />
                <stop offset="1" stopColor="#3D5A80" stopOpacity="0" />
              </radialGradient>
              <radialGradient ref={faceMRef} id="hsFaceM" gradientUnits="userSpaceOnUse" cx="264" cy="260" r="250">
                <stop offset="0" stopColor="#6A9CDF" stopOpacity="0.24" />
                <stop offset="0.45" stopColor="#6A9CDF" stopOpacity="0.10" />
                <stop offset="1" stopColor="#6A9CDF" stopOpacity="0" />
              </radialGradient>
              <radialGradient ref={gradRef} id="hsEdge" gradientUnits="userSpaceOnUse" cx="180" cy="-200" r="150">
                <stop offset="0" stopColor="#3D5A80" stopOpacity="1" />
                <stop offset="0.45" stopColor="#3D5A80" stopOpacity="0.6" />
                <stop offset="1" stopColor="#3D5A80" stopOpacity="0" />
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
          <a href="/partners/" className="btn btn-advertiser btn-lg pe-cta">Start Earning Today <Arrow /></a>
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
        .pe-sub b{ color:var(--midnight-light); font-weight:600; }
        .pe-slider{ -webkit-appearance:none; appearance:none; width:min(486px,100%); height:12px; margin-top:26px; border-radius:var(--r-full); outline:none; cursor:pointer;
          background:linear-gradient(90deg, #3D5A80 0%, #243856 var(--pct), #d9d9d9 var(--pct), #d9d9d9 100%); }
        .pe-slider::-webkit-slider-thumb{ -webkit-appearance:none; appearance:none; width:26px; height:26px; border-radius:50%; background:#fff; border:3px solid #3D5A80; box-shadow:0 4px 10px rgba(15,28,46,.22); cursor:grab; }
        .pe-slider::-moz-range-thumb{ width:26px; height:26px; border-radius:50%; background:#fff; border:3px solid #3D5A80; box-shadow:0 4px 10px rgba(15,28,46,.22); cursor:grab; }
        .pe-note{ margin-top:14px; font:italic 500 16px/1.4 var(--font-body); color:var(--warm-600); }
        .pe-disc{ margin-top:8px; font:400 13px/1.4 var(--font-body); color:var(--warm-500, #9a938c); }
        .pe-cta{ margin-top:22px; }
        .pe-forecast-link{ margin-top:18px; font:500 16px/1.5 var(--font-body); color:var(--warm-600); }
        .pe-forecast-link a{ color:var(--midnight-light); text-decoration:underline; }
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

/* ---------- Section 6 — "Built for how you actually earn." ---------------- */
// Card 1 storyboard: one pill whose label steps Validating… → Processing payout →
// Commission Paid; on the last step the emerald check pops + draws in, then it loops.
const PAYOUT_STEPS = [
  { key: 'validating', label: 'Validating…' },
  { key: 'processing', label: 'Processing payout' },
  { key: 'paid', label: 'Commission Paid', done: true },
];
const PAYOUT_HOLD = 2000;   // each step lasts a 2-second beat
const PAYOUT_EXIT = 340;    // last 340ms of the beat = old message fades up & out
function PayoutPill() {
  const [step, setStep] = React.useState(0);
  const [phase, setPhase] = React.useState('in');   // 'in' = fade in up, 'out' = fade up out
  React.useEffect(() => {
    if (prefersReduced()) { setStep(2); setPhase('in'); return; }   // rest on final state, no loop
    setPhase('in');
    const tOut = setTimeout(() => setPhase('out'), PAYOUT_HOLD - PAYOUT_EXIT);
    const tNext = setTimeout(() => setStep((s) => (s + 1) % PAYOUT_STEPS.length), PAYOUT_HOLD);
    return () => { clearTimeout(tOut); clearTimeout(tNext); };
  }, [step]);
  const st = PAYOUT_STEPS[step];
  return (
    <div className="be-card be-card-pay">
      <span className="be2-pill" aria-live="polite">
        {/* whole icon+text group fades as a unit; keyed by step so each swap re-enters */}
        <span className={'be2-content' + (phase === 'out' ? ' is-out' : ' is-in')} key={st.key}>
          <span className="be2-ico">
            {st.done
              ? (
                <span className="be2-circle">
                  <svg className="be2-checksvg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path className="be2-checkpath" pathLength="1" d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
              )
              : <span className="be2-dot" />}
          </span>
          <em className="be2-label">{st.label}</em>
        </span>
      </span>
    </div>
  );
}
// Card 4 storyboard: one pill whose tier steps Silver → Gold → Platinum. Text fades up/in
// (same as PayoutPill); the crown badge shrinks out then shrinks back in on each swap.
const PUB_TIERS = [
  { key: 'silver', label: 'Silver', crown: 'pub-tier-silver-crown.png', bg: '#F3F3F3' },
  { key: 'gold', label: 'Gold', crown: 'pub-tier-gold-crown.png', bg: '#F5F3DC' },
  { key: 'platinum', label: 'Platinum', crown: 'pub-tier-platinum-crown.png', bg: '#F6F0FF' },
];
const TIER_HOLD = 3500;   // tier pill steps on a 3.5-second beat
function TierPill() {
  const [step, setStep] = React.useState(0);
  const [phase, setPhase] = React.useState('in');
  React.useEffect(() => {
    if (prefersReduced()) { setStep(0); setPhase('in'); return; }
    setPhase('in');
    const tOut = setTimeout(() => setPhase('out'), TIER_HOLD - PAYOUT_EXIT);
    const tNext = setTimeout(() => setStep((s) => (s + 1) % PUB_TIERS.length), TIER_HOLD);
    return () => { clearTimeout(tOut); clearTimeout(tNext); };
  }, [step]);
  const t = PUB_TIERS[step];
  const ph = phase === 'out' ? ' is-out' : ' is-in';
  return (
    <div className="be-card be-card-tierclip">
      <span className="tr-pill" aria-live="polite">
        <span className={'tr-ico' + ph} key={t.key} style={{ background: t.bg }}>
          <img className="tr-crown" src={`media/figma/${t.crown}`} alt="" />
        </span>
        <em className={'tr-label' + ph} key={t.key + '-l'}>{t.label}</em>
      </span>
    </div>
  );
}
function PubBuilt() {
  return (
    <section id="pub-built" className="be-sec">
      <div className="wrap">
        <h2 className="be-title" data-reveal>Built for how you actually earn.</h2>
        <div className="be-grid">
          {/* 1 — Payout status pill (cycles Validating → Processing → Commission Paid) */}
          <div className="be-col" data-reveal>
            <PayoutPill />
            <h3 className="be-col-t">Get paid<br />easier and faster</h3>
            <p className="be-col-d">We confirm earnings every day, and with Express Withdrawal you can withdraw a portion of your earnings before your conversions are even validated. Less waiting, more earning.</p>
          </div>
          {/* 2 — Brand logos */}
          <div className="be-col" data-reveal data-reveal-delay="1">
            <div className="be-card">
              <div className="be-logos">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <span className="be-tile" key={n}><img src={`media/figma/pub-be-t${n}.png`} alt="" loading="lazy" /></span>
                ))}
              </div>
            </div>
            <h3 className="be-col-t">Brands your audience already knows</h3>
            <p className="be-col-d">Promote Shopee, Lazada, Zalora, Nike and hundreds more across retail, travel, beauty and finance. One account, hundreds of brands, so you earn more in one place instead of chasing programs one by one.</p>
          </div>
          {/* 3 — Live stats chart */}
          <div className="be-col" data-reveal data-reveal-delay="2">
            <div className="be-card">
              <div className="be-chart">
                <svg className="be-chart-svg" viewBox="0 0 250 120" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0,86 C28,80 40,58 66,62 C92,66 104,96 130,92 C156,88 168,54 194,50 C220,46 236,64 250,58" fill="none" stroke="#cfd6cf" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M0,64 C26,66 42,40 68,44 C94,48 106,26 132,30 C158,34 172,52 196,40 C220,28 236,20 250,16" fill="none" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <span className="be-stat be-stat-clicks"><small>Total clicks</small><b>21,086</b></span>
                <span className="be-stat be-stat-conv"><small>Conversion Rate</small><b className="be-up">+38.1<span>%</span></b></span>
              </div>
            </div>
            <h3 className="be-col-t">Know exactly what's working</h3>
            <p className="be-col-d">Generate trackable links in bulk, follow every click and sale in live reports, and find clear guides whenever you need them.</p>
          </div>
          {/* 4 — Tier pill (cycles Silver → Gold → Platinum) */}
          <div className="be-col" data-reveal data-reveal-delay="3">
            <TierPill />
            <h3 className="be-col-t">Unlock more as you grow</h3>
            <p className="be-col-d">As you earn more, you get access to upsized commissions, exclusive promotions, and member bonuses that reward your growth.</p>
          </div>
        </div>
      </div>
      <style>{`
        .be-sec{ background:var(--warm-50); padding:clamp(55px,8.28vh,110px) 0 clamp(77px,12.42vh,160px); }
        .be-title{ text-align:center; font-size:clamp(30px,4vw,48px); line-height:1.1; letter-spacing:-.03em; color:var(--warm-900); }
        .be-grid{ margin-top:clamp(32px,5vh,64px); display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(20px,2.2vw,32px); }
        .be-card{ position:relative; height:178px; border-radius:var(--r-xl); background:var(--warm-100); overflow:hidden; display:flex; align-items:center; justify-content:center; }
        .be-card-clip{ justify-content:flex-end; }
        .be-col-t{ margin-top:22px; font-family:var(--font-display); font-weight:800; font-size:21px; line-height:1.38; letter-spacing:-.02em; color:var(--warm-900); }
        .be-col-d{ margin-top:14px; font:400 16px/1.31 var(--font-body); color:var(--warm-600); }
        /* pill (payout verified) */
        .be-pill{ display:inline-flex; align-items:center; gap:10px; background:#fff; border-radius:var(--r-full); padding:11px 20px 11px 12px; box-shadow:0 6px 12px rgba(0,0,0,.08); font-family:var(--font-body); font-weight:700; font-size:21px; color:var(--warm-900); white-space:nowrap; }
        .be-check{ display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:50%; background:#10b981; flex:0 0 auto; }
        /* tier pill bleeds off the right edge */
        .be-tier{ margin-right:-34px; font-size:24px; padding:14px 24px 14px 12px; gap:12px; }
        .be-crown{ display:inline-flex; align-items:center; justify-content:center; width:44px; height:44px; border-radius:50%; background:radial-gradient(circle at 35% 30%, #f4f4f4, #c9ccd1); flex:0 0 auto; }
        .be-crown img{ width:26px; height:26px; object-fit:contain; }
        /* card 1 — ONE fixed-size status pill; only the icon + text swap inside it */
        .be-card-pay{ align-items:center; }
        .be2-pill{ display:inline-flex; align-items:center; width:223px; max-width:100%; box-sizing:border-box; justify-content:flex-start;
          background:#fff; border-radius:var(--r-full); padding:11px 18px; box-shadow:0 6px 14px rgba(15,28,46,.10);
          font-family:var(--font-body); font-weight:700; font-size:15.5px; letter-spacing:-.01em; color:var(--warm-900); white-space:nowrap; }
        .be2-content{ display:inline-flex; align-items:center; gap:11px; }
        .be2-content.is-in{ animation:be2-in .42s cubic-bezier(.2,.7,.3,1) both; }   /* next content fades in from below */
        .be2-content.is-out{ animation:be2-out .34s ease both; }                     /* previous message fades up & out */
        .be2-ico{ width:26px; height:26px; display:inline-flex; align-items:center; justify-content:center; flex:0 0 auto; }
        .be2-label{ font-style:normal; display:inline-block; }
        .be2-dot{ width:13px; height:13px; border-radius:50%; background:#9aa3ad; animation:be2-dot 1.8s ease-in-out infinite; }
        .be2-circle{ position:relative; display:inline-flex; align-items:center; justify-content:center; width:26px; height:26px; border-radius:50%; background:#047857;
          animation:be2-circle-in .6s cubic-bezier(0,0,.35,1) both; }
        .be2-checksvg{ width:16px; height:16px; }
        .be2-checkpath{ stroke:#fff; stroke-width:3; stroke-linecap:round; stroke-linejoin:round; fill:none; stroke-dasharray:1; stroke-dashoffset:1;
          animation:be2-draw-in .4s cubic-bezier(0,0,.35,1) .16s both; }
        @keyframes be2-in{ from{ opacity:0; transform:translateY(11px); } to{ opacity:1; transform:translateY(0); } }
        @keyframes be2-out{ from{ opacity:1; transform:translateY(0); } to{ opacity:0; transform:translateY(-11px); } }
        @keyframes be2-circle-in{
          0%{ opacity:0; transform:scale(.9); box-shadow:0 0 0 0 rgba(4,120,87,.22); }
          40%{ opacity:1; transform:scale(1); box-shadow:0 0 0 0 rgba(4,120,87,.22); animation-timing-function:cubic-bezier(0,0,.35,1); }
          100%{ opacity:1; transform:scale(1); box-shadow:0 0 0 6px rgba(4,120,87,0); }
        }
        @keyframes be2-draw-in{ from{ stroke-dashoffset:1; } to{ stroke-dashoffset:0; } }
        @keyframes be2-dot{ 0%,100%{ opacity:.4; } 50%{ opacity:1; } }         /* subtle: gentle breathe */
        @media (prefers-reduced-motion: reduce){
          .be2-content,.be2-circle,.be2-checkpath,.be2-dot{ animation:none; }
          .be2-content{ opacity:1; transform:none; } .be2-circle{ opacity:1; transform:none; } .be2-checkpath{ stroke-dashoffset:0; }
        }
        /* card 4 — enlarged tier pill anchored left, cut ~50% off the right edge (clipped by the card) */
        .be-card-tierclip{ overflow:hidden; }
        .be-card-tierclip .tr-pill{ position:absolute; left:22px; top:50%; transform:translateY(-50%); }
        .tr-pill{ display:inline-flex; align-items:center; gap:14px; width:482px; flex:0 0 auto; box-sizing:border-box; justify-content:flex-start;
          background:#fff; border-radius:var(--r-full); padding:11px 22px; box-shadow:0 8px 18px rgba(15,28,46,.10);
          font-family:var(--font-display); font-weight:800; font-size:23px; letter-spacing:-.01em; color:var(--warm-900); white-space:nowrap; }
        .tr-ico{ position:relative; width:44px; height:44px; flex:0 0 auto; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; will-change:transform; }
        .tr-crown{ width:30px; height:30px; object-fit:contain; object-position:bottom; transform:rotate(-17.77deg); }
        .tr-label{ font-style:normal; display:inline-block; }
        .tr-ico.is-in{ animation:tr-scalein .5s cubic-bezier(.34,1.35,.5,1) both; }   /* shrink in (soft overshoot) */
        .tr-ico.is-out{ animation:tr-scaleout .32s ease both; }                       /* shrink out */
        .tr-label.is-in{ animation:be2-in .42s cubic-bezier(.2,.7,.3,1) both; }
        .tr-label.is-out{ animation:be2-out .32s ease both; }
        @keyframes tr-scalein{ from{ opacity:0; transform:scale(.35); } to{ opacity:1; transform:scale(1); } }
        @keyframes tr-scaleout{ from{ opacity:1; transform:scale(1); } to{ opacity:0; transform:scale(.35); } }
        @media (prefers-reduced-motion: reduce){
          .tr-ico,.tr-label{ animation:none; opacity:1; transform:none; }
          .tr-crown{ transform:rotate(-17.77deg); }
        }
        /* brand-logo grid */
        .be-logos{ display:grid; grid-template-columns:repeat(4,1fr); gap:11px; padding:0 22px; }
        .be-tile{ width:43px; height:43px; border-radius:var(--r-lg); background:#fff; box-shadow:0 3px 8px rgba(0,0,0,.06); display:flex; align-items:center; justify-content:center; overflow:hidden; }
        .be-tile img{ width:100%; height:100%; object-fit:cover; }
        /* chart */
        .be-chart{ position:relative; width:100%; height:100%; }
        .be-chart-svg{ position:absolute; inset:18px 16px; width:calc(100% - 32px); height:calc(100% - 36px); }
        .be-stat{ position:absolute; display:flex; flex-direction:column; gap:1px; background:#fff; border:1px solid #f4f4f0; border-radius:var(--r-xl); padding:8px 12px; box-shadow:0 5px 8px rgba(0,0,0,.08); }
        .be-stat small{ font:700 11px/1.3 var(--font-body); color:var(--warm-900); }
        .be-stat b{ font:700 17px/1.1 var(--font-body); color:var(--warm-900); }
        .be-stat .be-up{ color:#047857; }
        .be-stat .be-up span{ font-size:11px; }
        .be-stat-clicks{ left:16px; top:16px; }
        .be-stat-conv{ right:12px; bottom:24px; }
        @media (max-width:900px){ .be-grid{ grid-template-columns:repeat(2,1fr); gap:28px 24px; } .be-card-clip{ justify-content:center; } .be-tier{ margin-right:0; } }
        @media (max-width:540px){ .be-grid{ grid-template-columns:1fr; max-width:420px; margin-inline:auto; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 7 — "Hear from publishers like you." (testimonials) --- */
// Testimonials sourced from involve.asia/partners/overview — `quote` is the most impactful
// line pulled from each; `body` is the full testimonial.
const PUB_VOICES = [
  {
    quote: 'I used Involve to start a side income, but now my website generates me a full-time income.',
    body: 'I used Involve to start a side income, but now my website is able to generate me a full-time income. It’s also much better from any site that I have worked with. I like that Involve has strong offers from brands from Southeast Asia, which my audience is.',
    name: 'Tyha Abdullah', avatar: 'publisher-tyhaAbdullah.png', initials: 'TA',
  },
  {
    quote: 'Who would have thought that we would make 5-figure income in just 2 months.',
    body: 'Who would have thought that we would be able to make 5 figure income in just 2 months, definitely Affiliate Marketing with Involve Asia can help us make money online more easily.',
    name: 'Media Terkini', avatar: 'publisher-MediaTerkini.png', initials: 'MT',
  },
  {
    quote: 'There are branded products to promote, and it’s risk-free.',
    body: 'It’s a good chance for people who want to start Affiliate Marketing by using Involve Asia. There are branded products to promote, and it’s risk-free. I don’t see why people wouldn’t want to try.',
    name: 'Weng Hoon', avatar: 'pub-voice-wenghonn.png',
  },
  {
    quote: 'For the first time, I hit 5-digits in commissions and peaked during the 11.11 Sales.',
    body: 'I started to push in promoting Offers at the beginning of 2020 on my website and Facebook page. Later, in July 2020, for the first time, I hit 5-digits in commissions and peaked in November during the 11.11 Sales.',
    name: 'Promocodes.My', avatar: 'publisher-promoCodesMy.png', initials: 'PM',
  },
  {
    quote: 'Involve Asia is always the perfect choice for us to gain commission from our promoted products.',
    body: 'Involve Asia is always the perfect choice for Vocket in order for us to gain commission from our promoted products. Most importantly, with Involve Asia we gain conversions directly from the promoted products with their affiliate links.',
    name: 'The Vocket', avatar: 'publisher-vocket.png', initials: 'TV',
  },
  {
    quote: 'We couldn’t have done it without this valuable partnership.',
    body: 'Thanks to Involve Asia support, then only we can continue to provide high-quality content to our audience while earning a decent affiliate commission. We couldn’t have done it without this valuable partnership.',
    name: 'My Weekend Plan', avatar: 'publisher-weekendPlan.png', initials: 'MW',
  },
  {
    quote: 'I find it user-friendly and convenient to browse and search for Offers in the dashboard.',
    body: 'With Involve Asia, I find it user-friendly and convenient to browse and search for Offers in the dashboard. The filters provide me options to choose from so I can promote suitable Offers for my followers.',
    name: 'MY Great Sales', avatar: 'publisher-myGreatSales.png', initials: 'MG',
  },
  {
    quote: 'Such a good overall experience with IA — very friendly & professional.',
    body: 'Had such a good overall experience with IA esp Jia who assisted us – very friendly & professional consultations. She was thorough & informative. IA helps increase and gain pretty good income from the generated link.',
    name: 'Siakap Keli', avatar: 'publisher-siakapkeli.png', initials: 'SK',
  },
  {
    quote: 'It’s a win-win situation.',
    body: 'Keep making videos that are informational, not just for yourself, but for your audience too. Your audience believes in you and this is one way for them to support their favorite YouTubers while also helping themselves purchase products. It’s a win-win situation.',
    name: 'Fazli Halim', avatar: 'publisher-fazlihalim.png', initials: 'FH',
  },
];
function PubVoices() {
  const [i, setI] = React.useState(0);
  const N = PUB_VOICES.length;
  const mod = (n) => ((n % N) + N) % N;
  const go = (d) => setI((v) => mod(v + d));
  // auto-advance every 4.5s; timer resets whenever the slide changes (manual or auto)
  React.useEffect(() => {
    if (prefersReduced()) return;
    const t = setTimeout(() => setI((v) => mod(v + 1)), 4500);
    return () => clearTimeout(t);
  }, [i]);
  const DX = 300;   // horizontal gap between neighbouring card positions (px)
  return (
    <section id="pub-voices" className="tv-sec">
      <div className="tv-panel">
        <h2 className="tv-title" data-reveal>Hear from publishers like you.</h2>
        <p className="tv-sub" data-reveal data-reveal-delay="1">Real people earning on the platform, in their own words.</p>
        <div className="tv-stage" data-reveal data-reveal-delay="1">
          {/* every card is positioned by its offset from the active index; changing `i` slides them all */}
          {PUB_VOICES.map((v, j) => {
            let d = (j - i + N) % N; if (d > N / 2) d -= N;          // signed shortest distance
            const near = Math.abs(d);
            const scale = d === 0 ? 1 : near === 1 ? 0.92 : 0.88;
            const ty = d === 0 ? '0%' : '20%';                       // neighbours sit 20% lower
            const op = d === 0 ? 1 : near === 1 ? 0.3 : 0;           // neighbours faint; further hidden
            const z = d === 0 ? 3 : near === 1 ? 2 : 1;
            const style = {
              transform: `translateX(-50%) translateX(${d * DX}px) translateY(${ty}) scale(${scale})`,
              opacity: op, zIndex: z, pointerEvents: d === 0 ? 'auto' : 'none',
            };
            return (
              <article key={j} className={'tv-card' + (d === 0 ? ' is-active' : '')} style={style} aria-hidden={d !== 0}>
                <p className="tv-quote">&ldquo;{v.quote}&rdquo;</p>
                <p className="tv-body">{v.body}</p>
                <div className="tv-author">
                  {v.avatar
                    ? <img className="tv-avatar" src={`media/figma/${v.avatar}`} alt="" />
                    : <span className="tv-avatar tv-avatar-mono" aria-hidden="true">{v.initials}</span>}
                  <span className="tv-name">{v.name}</span>
                </div>
              </article>
            );
          })}
        </div>
        <div className="tv-nav" data-reveal data-reveal-delay="1">
          <button type="button" className="tv-arrow" onClick={() => go(-1)} aria-label="Previous testimonial">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          </button>
          <button type="button" className="tv-arrow" onClick={() => go(1)} aria-label="Next testimonial">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
      <style>{`
        .tv-sec{ background:var(--warm-50); padding:clamp(28px,4.14vh,55px) 0 clamp(67px,9.66vh,132px); }
        .tv-panel{ position:relative; max-width:1273px; margin:0 auto; padding:clamp(48px,7vh,90px) clamp(20px,4vw,56px) clamp(40px,6vh,72px); border-radius:clamp(28px,4vw,64px); overflow:hidden;
          background:linear-gradient(156deg, rgba(61,90,128,.16) 37%, rgba(106,156,223,.16) 85%), #fff; }
        .tv-title{ text-align:center; font-size:clamp(30px,4vw,48px); line-height:1.1; letter-spacing:-.03em; color:var(--warm-900); }
        .tv-sub{ text-align:center; margin-top:14px; font-size:16px; color:var(--warm-700); }
        .tv-stage{ position:relative; margin-top:clamp(28px,4vh,44px); min-height:392px; }
        .tv-card{ position:absolute; left:50%; top:0; width:min(535px,86vw); height:322px; box-sizing:border-box; transform-origin:center top;
          background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-xl); box-shadow:none; padding:30px 32px; display:flex; flex-direction:column; gap:18px;
          transition:transform .62s cubic-bezier(.32,.72,0,1), opacity .62s cubic-bezier(.32,.72,0,1); will-change:transform,opacity; }
        .tv-card.is-active{ box-shadow:none; }
        .tv-quote{ font:700 16px/1.32 var(--font-body); color:var(--warm-700); }
        .tv-body{ font:400 16px/1.32 var(--font-body); color:var(--warm-700); }
        .tv-author{ display:flex; align-items:center; gap:16px; margin-top:auto; }   /* pin to bottom of the fixed-height card */
        .tv-avatar{ width:56px; height:56px; border-radius:50%; object-fit:cover; flex:0 0 auto; }
        .tv-avatar-mono{ display:flex; align-items:center; justify-content:center; background:linear-gradient(150deg,#fbe4d8,#e7edf7); color:var(--warm-900);
          font-family:var(--font-display); font-weight:800; font-size:19px; letter-spacing:-.01em; }
        .tv-name{ font-family:var(--font-body); font-weight:700; font-size:16px; color:var(--warm-900); }
        .tv-nav{ display:flex; justify-content:center; gap:16px; margin-top:clamp(20px,3vh,34px); }
        .tv-arrow{ width:44px; height:44px; border-radius:50%; border:none; background:var(--warm-900); color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:opacity .15s, transform .15s; }
        .tv-arrow:hover{ opacity:.85; }
        .tv-arrow:active{ transform:scale(.94); }
        @media (max-width:900px){ .tv-card{ width:min(440px,88vw); } .tv-card:not(.is-active){ opacity:0 !important; } }
        @media (prefers-reduced-motion: reduce){ .tv-card{ transition:none; } }
      `}</style>
    </section>
  );
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
function PubFAQ() {
  const [open, setOpen] = React.useState(() => new Set([0]));
  const toggle = (i) => setOpen((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  return (
    <section id="pub-faq" className="fq-sec">
      <div className="wrap">
        <h2 className="fq-title" data-reveal>Questions, answered.</h2>
        <div className="fq-list" data-reveal data-reveal-delay="1">
          {PUB_FAQ.map(([q, a], i) => {
            const isOpen = open.has(i);
            return (
              <div className={'fq-item' + (isOpen ? ' open' : '')} key={i}>
                <button type="button" className="fq-q" onClick={() => toggle(i)} aria-expanded={isOpen}>
                  <span>{q}</span>
                  <span className="fq-ic" aria-hidden="true"><i /><i /></span>
                </button>
                <div className="fq-a-wrap"><div className="fq-a"><p>{a}</p></div></div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        .fq-sec{ background:var(--warm-50); padding:clamp(67px,9.66vh,132px) 0 clamp(77px,12.42vh,160px); }
        .fq-title{ text-align:center; font-size:clamp(30px,4vw,48px); line-height:1.1; letter-spacing:-.03em; color:var(--warm-900); }
        .fq-list{ margin-top:clamp(32px,5vh,60px); display:flex; flex-direction:column; gap:12px; max-width:1160px; margin-inline:auto; }
        .fq-item{ background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-lg); }
        .fq-q{ width:100%; display:flex; align-items:center; justify-content:space-between; gap:20px; padding:24px; background:none; border:none; cursor:pointer; text-align:left; font:700 18px/1.35 var(--font-body); color:var(--warm-900); }
        .fq-ic{ position:relative; width:18px; height:18px; flex:0 0 auto; }
        .fq-ic i{ position:absolute; background:#111110; border-radius:var(--r-sm); }
        .fq-ic i:nth-child(1){ left:0; right:0; top:8px; height:2px; }
        .fq-ic i:nth-child(2){ top:0; bottom:0; left:8px; width:2px; transition:transform .25s ease; }
        .fq-item.open .fq-ic i:nth-child(2){ transform:scaleY(0); }
        .fq-a-wrap{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .3s ease; }
        .fq-item.open .fq-a-wrap{ grid-template-rows:1fr; }
        .fq-a{ overflow:hidden; }
        .fq-a p{ margin:0 24px; padding-bottom:24px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        .fq-a a{ color:var(--midnight-light); font-weight:600; text-decoration:underline; text-underline-offset:2px; }
        .fq-a a:hover{ opacity:.82; }
      `}</style>
    </section>
  );
}

/* ---------- Section 9 — Final CTA + interactive honeycomb ------------------
   Decorative honeycomb (pub-cta-hexfield.svg = 229 pre-split ember hexes). Reuses the
   homepage hero interaction: hexes are pushed radially away from the cursor and ease back. */
function PubCtaHexField() {
  const svgRef = React.useRef(null);
  const [paths, setPaths] = React.useState([]);
  const W = 1204.11, H = 1189.86;
  React.useEffect(() => {
    let alive = true;
    fetch('media/figma/pub-cta-hexfield.svg').then((r) => r.text()).then((txt) => {
      if (!alive) return;
      const out = []; const re = /<path\b([^>]*)>/g; let m;
      while ((m = re.exec(txt))) {
        const attrs = m[1], dm = /\bd="([^"]+)"/.exec(attrs), fm = /\bfill="([^"]+)"/.exec(attrs);
        if (dm && fm && fm[1].toUpperCase() === '#FAC9B9') out.push(dm[1]);
      }
      setPaths(out);
    }).catch(() => {});
    return () => { alive = false; };
  }, []);
  React.useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg || !paths.length || prefersReduced()) return;
    const sec = svg.closest('.pc-sec') || svg.parentElement;
    const hexes = Array.from(svg.querySelectorAll('.hx')).map((el) => { const b = el.getBBox(); return { el, cx: b.x + b.width / 2, cy: b.y + b.height / 2, dx: 0, dy: 0 }; });
    const R = 175, MAXPUSH = 34;
    let mx = -9999, my = -9999, active = false, raf = 0;
    const frame = () => {
      let moving = false;
      for (const h of hexes) {
        let tx = 0, ty = 0;
        if (active) {
          const ddx = h.cx - mx, ddy = h.cy - my, dist = Math.hypot(ddx, ddy);
          if (dist < R && dist > 0.01) { const f = 1 - dist / R, push = MAXPUSH * f * f, inv = push / dist; tx = ddx * inv; ty = ddy * inv; }
        }
        h.dx += (tx - h.dx) * 0.2; h.dy += (ty - h.dy) * 0.2;
        if (Math.abs(h.dx) > 0.06 || Math.abs(h.dy) > 0.06) { h.el.setAttribute('transform', `translate(${h.dx.toFixed(2)} ${h.dy.toFixed(2)})`); moving = true; }
        else if (h.dx !== 0 || h.dy !== 0) { h.dx = 0; h.dy = 0; h.el.removeAttribute('transform'); }
      }
      if (active || moving) raf = requestAnimationFrame(frame); else raf = 0;
    };
    // SVG is CSS-flipped vertically (scaleY(-1)), so invert the screen→viewBox Y mapping.
    const onMove = (e) => { const r = svg.getBoundingClientRect(); mx = (e.clientX - r.left) * (W / r.width); my = H - (e.clientY - r.top) * (H / r.height); active = true; if (!raf) raf = requestAnimationFrame(frame); };
    const onLeave = () => { active = false; if (!raf) raf = requestAnimationFrame(frame); };
    sec.addEventListener('mousemove', onMove); sec.addEventListener('mouseleave', onLeave);
    return () => { sec.removeEventListener('mousemove', onMove); sec.removeEventListener('mouseleave', onLeave); if (raf) cancelAnimationFrame(raf); };
  }, [paths]);
  return (
    <svg ref={svgRef} className="pc-hexfield" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <g fill="var(--warm-200)">{paths.map((d, i) => <path key={i} className="hx" d={d} />)}</g>
    </svg>
  );
}
function PubCTA() {
  return (
    <section id="pub-cta" className="pc-sec">
      <PubCtaHexField />
      <span className="pc-topfade" aria-hidden="true" />
      <span className="pc-wash" aria-hidden="true" />
      <div className="wrap pc-inner">
        <h2 className="pc-title" data-reveal>Start growing your business with the right plan today.</h2>
        <a href="/advertisers/" className="btn btn-advertiser btn-lg pc-btn" data-reveal data-reveal-delay="1">See plans and pricing <Arrow /></a>
      </div>
      <style>{`
        .pc-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(199px,33.12vh,365px) 0 clamp(232px,35.88vh,430px); }
        .pc-hexfield{ position:absolute; left:0; top:50%; transform:translateY(-44%) scaleY(-1); width:100%; height:auto; z-index:0; pointer-events:none; opacity:.6;
          -webkit-mask-image:linear-gradient(180deg, transparent, #000 16%, #000 84%, transparent); mask-image:linear-gradient(180deg, transparent, #000 16%, #000 84%, transparent); }
        .pc-hexfield .hx{ will-change:transform; }
        /* gradient blend into the section above */
        .pc-topfade{ position:absolute; left:0; right:0; top:0; height:clamp(200px,26%,340px); z-index:0; pointer-events:none;
          background:linear-gradient(180deg, var(--warm-50) 0%, rgba(250,250,248,.6) 45%, rgba(250,250,248,0) 100%); }
        .pc-wash{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:760px; height:420px; z-index:0; pointer-events:none;
          background:radial-gradient(ellipse at center, var(--warm-50) 32%, rgba(250,250,248,0) 72%); }
        .pc-inner{ position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; text-align:center; }
        .pc-title{ font-size:clamp(30px,4vw,48px); line-height:1.15; letter-spacing:-.03em; color:var(--warm-900); max-width:900px; }
        .pc-btn{ margin-top:26px; }
      `}</style>
    </section>
  );
}

/* ---------- Sticky app-download QR (collapsible; sits above Back-to-Top) ---- */
function AppDownload() {
  const [open, setOpen] = React.useState(() => {
    // stay dismissed across publisher pages within the same browser session
    try { return sessionStorage.getItem('ia-appdl-dismissed') !== '1'; } catch (e) { return true; }
  });
  return (
    <div className={'adl' + (open ? ' adl-open' : '')}>
      <div className="adl-card" role="dialog" aria-label="Download the Involve Asia app" aria-hidden={!open}>
        <h3 className="adl-title">Scan to start earning</h3>
        <p className="adl-sub">Sign up and track your earnings on the app.</p>
        <span className="adl-qr"><img src="media/figma/pub-app-qr.png" alt="QR code to download the Involve Asia app" /></span>
        <button type="button" className="adl-dismiss" onClick={() => { try { sessionStorage.setItem('ia-appdl-dismissed', '1'); } catch (e) {} setOpen(false); }}>Maybe later</button>
      </div>
      <button type="button" className="adl-bubble" onClick={() => setOpen(true)} aria-label="Get the Involve Asia app" aria-hidden={open} tabIndex={open ? -1 : 0}>
        <img src="media/figma/pub-app-icon.png" alt="" aria-hidden="true" />
      </button>
      <style>{`
        /* app CTA now sits in the very bottom-right corner … */
        .adl{ position:fixed; right:clamp(16px,2.5vw,28px); bottom:clamp(16px,2.5vw,28px); z-index:95; }
        /* … and the Back-to-Top button is pushed up above it (scoped to this page via body specificity) */
        body .b2t{ bottom:calc(clamp(16px,2.5vw,28px) + 76px); }
        .adl-card, .adl-bubble{ position:absolute; right:0; bottom:0; transition:opacity .3s ease, transform .34s cubic-bezier(.22,1,.36,1); }
        /* expanded card (sized down ~20%) */
        .adl-card{ transform-origin:bottom right; width:min(183px, calc(100vw - 32px));
          background:var(--midnight-light); border-radius:var(--r-lg) var(--r-lg) 0 var(--r-lg);
          box-shadow:0 15px 36px rgba(15,28,46,.24); padding:18px 18px 16px; display:flex; flex-direction:column; align-items:center; text-align:center; }
        .adl-title{ font-family:var(--font-display); font-weight:800; font-size:14.5px; line-height:1.15; color:#fff; }
        .adl-sub{ margin-top:6px; font:400 12px/1.28 var(--font-body); color:rgba(255,255,255,.92); }
        .adl-qr{ margin-top:13px; width:100%; aspect-ratio:1/1; background:#fff; border-radius:var(--r-lg); display:flex; align-items:center; justify-content:center; }
        .adl-qr img{ width:88%; height:88%; object-fit:contain; }
        .adl-dismiss{ margin-top:13px; background:none; border:none; cursor:pointer; font:400 12px/1 var(--font-body); color:#fff; text-decoration:underline; text-underline-offset:2px; }
        .adl-dismiss:hover{ opacity:.85; }
        /* collapsed teardrop bubble (points to the bottom-right corner) */
        .adl-bubble{ width:64px; height:64px; padding:0; border:none; cursor:pointer;
          background:linear-gradient(104.8deg, #3D5A80 0%, #243856 100%); border-radius:50% 50% 0 50%;
          box-shadow:0 10px 22px rgba(61,90,128,.34); display:flex; align-items:center; justify-content:center; }
        .adl-bubble img{ width:34px; height:34px; object-fit:contain; }
        .adl-bubble:hover{ box-shadow:var(--shadow-md); }
        /* toggle: show card when open, bubble when closed */
        .adl .adl-card{ opacity:0; transform:scale(.9) translateY(8px); pointer-events:none; }
        .adl .adl-bubble{ opacity:1; transform:scale(1); pointer-events:auto; }
        .adl.adl-open .adl-card{ opacity:1; transform:scale(1) translateY(0); pointer-events:auto; }
        .adl.adl-open .adl-bubble{ opacity:0; transform:scale(.6); pointer-events:none; }
        @media (prefers-reduced-motion: reduce){ .adl-card, .adl-bubble{ transition:opacity .2s ease; } }
      `}</style>
    </div>
  );
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
const ADV_PLATFORM_MS = 12000;
function AdvPlatform() {
  const [active, setActive] = React.useState(0);
  // Which step the mouse is over (index or null). Hovering the active step's
  // content pauses the rail; the image beside it doesn't. Touch taps are ignored
  // so the pause can't get stuck on mobile.
  const [hover, setHover] = React.useState(null);
  const paused = hover === active;
  const hoverProps = (k) => ({
    onPointerEnter: (e) => { if (e.pointerType === 'mouse') setHover(k); },
    onPointerLeave: (e) => { if (e.pointerType === 'mouse') setHover(null); },
  });
  // The rail-fill animation is the timer: advancing on its animationend keeps the
  // bar and the slide change in sync, and pausing the animation pauses both.
  // Under reduced motion the animation is off, so there's no auto-advance.
  const next = () => setActive((a) => (a + 1) % ADV_PLATFORM.length);
  return (
    <section id="adv-platform" className="pf-sec">
      <div className="wrap">
        <h2 className="pf-title" data-reveal>One platform, everything you need to run your program</h2>
        <p className="pf-sub" data-reveal data-reveal-delay="1">Find publishers, launch offers, share your creatives, and track every sale, all in one place.</p>
        <div className="pf-grid" data-reveal data-reveal-delay="1">
          <div className="pf-steps">
            {ADV_PLATFORM.map((s, i) => {
              const on = i === active;
              return (
                <button type="button" className={'pf-step' + (on ? ' on' : '')} key={s.key} onClick={() => setActive(i)} aria-expanded={on} {...hoverProps(i)}>
                  <span className="pf-rail" aria-hidden="true">
                    <span className="pf-rail-track" />
                    {on && <span className="pf-rail-fill" key={active} onAnimationEnd={next} style={{ animationPlayState: paused ? 'paused' : 'running' }} />}
                  </span>
                  <span className="pf-step-body">
                    <span className="pf-step-t">{s.t}</span>
                    <span className="pf-step-dw"><span className="pf-step-d">{s.d}</span></span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="pf-visual">
            {ADV_PLATFORM.map((s, i) => (
              <img key={s.key} className={'pf-img' + (i === active ? ' on' : '')} src={`media/figma/${s.img}`} alt={s.t} loading="lazy" aria-hidden={i !== active} />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .pf-sec{ background:var(--warm-50); padding:clamp(77px,11.11vh,152px) 0 clamp(89px,14.28vh,191px); overflow:hidden; }
        .pf-title{ text-align:center; font-size:clamp(30px,4vw,48px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .pf-sub{ text-align:center; margin-top:14px; font-size:16px; line-height:1.4; color:var(--warm-600); }
        .pf-grid{ margin-top:clamp(40px,6vh,72px); display:grid; grid-template-columns:minmax(0,447px) 1fr; gap:clamp(32px,4vw,64px); align-items:center; }
        .pf-steps{ display:flex; flex-direction:column; }
        .pf-step{ position:relative; display:flex; gap:20px; align-items:stretch; text-align:left; background:none; border:none; cursor:pointer; padding:34px 0; width:100%; }
        .pf-step + .pf-step{ border-top:1px solid var(--warm-200); }
        .pf-rail{ position:relative; width:4px; flex:0 0 auto; align-self:stretch; }
        .pf-rail-track{ position:absolute; inset:0; border-radius:var(--r-full); background:var(--warm-200); opacity:0; transition:opacity .3s ease; }
        .pf-rail-fill{ position:absolute; left:0; top:0; width:4px; border-radius:var(--r-full); background:var(--midnight-light); height:0; }
        .pf-step.on .pf-rail-track{ opacity:1; }
        .pf-step.on .pf-rail-fill{ animation:pfFill ${ADV_PLATFORM_MS}ms linear forwards; }
        @keyframes pfFill{ from{ height:0; } to{ height:100%; } }
        .pf-step-body{ min-width:0; }
        .pf-step-t{ display:block; font-family:var(--font-display); font-weight:800; font-size:21px; letter-spacing:-.02em; color:var(--warm-900); transition:opacity .3s ease; }
        .pf-step-dw{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .4s ease; }
        .pf-step.on .pf-step-dw{ grid-template-rows:1fr; }
        .pf-step-d{ overflow:hidden; margin-top:0; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        .pf-step.on .pf-step-d{ margin-top:14px; }
        .pf-step-d a{ color:var(--midnight-light); font-weight:600; text-decoration:underline; text-underline-offset:2px; }
        /* inactive steps fade back (header only) */
        .pf-step:not(.on){ opacity:.4; } .pf-step:not(.on):hover{ opacity:.7; }
        /* light ember→cool gradient container; the dashboard sits inset top-left and bleeds off the right */
        .pf-visual{ position:relative; aspect-ratio:1152/632; border-radius:var(--r-xl); overflow:hidden;
          background:var(--warm-100); }
        /* dashboard fills the right half flush to the right/bottom edges (bleeds off right); gradient frames the top-left */
        .pf-img{ position:absolute; top:clamp(20px,3.2vw,40px); left:clamp(20px,3.2vw,40px);
          width:calc(100% - clamp(20px,3.2vw,40px)); height:calc(100% - clamp(20px,3.2vw,40px));
          object-fit:cover; object-position:left top; border-radius:16px 0 0 0;
          opacity:0; transition:opacity .5s ease; }
        .pf-img.on{ opacity:1; }
        @media (max-width:900px){
          .pf-grid{ grid-template-columns:1fr; gap:28px; }
          .pf-visual{ order:-1; }
        }
        @media (prefers-reduced-motion: reduce){ .pf-rail-fill{ animation:none; height:100%; } .pf-img{ transition:none; } }
      `}</style>
    </section>
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
