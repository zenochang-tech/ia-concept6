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
          <span className="ph-eyebrow" data-reveal>For App Owners</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Turn your app into a new revenue stream.</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="2">Show relevant offers and cashback to your users, earning that runs inside your app through our API.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="3">
            <a href="/partners/" className="btn btn-primary btn-lg">Start Earning <Arrow /></a>
          </div>
          <span className="ph-free" data-reveal data-reveal-delay="3">Free to join. Start earning today.</span>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo"><img src="media/figma/app-owners-hero.png" alt="An app showing recommended products and content that earn its owner a commission" loading="eager" /></div>
          <div className="ph-static-ui" data-reveal data-reveal-delay="2">
            <div className="ph-glass ph-g-pay-a"><div className="ph-pay"><span>Commission Earned</span><b>+ $816</b></div></div>
          </div>
        </div>
      </div>

      <style>{`
        .ph-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(40px,6vh,84px) 0 clamp(56px,9vh,116px); }
        /* decorative hexagons (Figma Polygon 64–67) — same size as the slider hexagon (492px), faint */
        .ph-hexdeco{ position:absolute; inset:0; z-index:0; pointer-events:none; overflow:hidden; }
        .phd{ position:absolute; width:492px; height:auto; }
        .phd1{ top:-68%; right:-7%; }
        .phd2{ top:6%; right:-26%; }
        .phd3{ left:31%; bottom:-59%; }
        .phd4{ left:-14%; bottom:-54%; }
        @media (max-width:900px){ .ph-hexdeco{ display:none; } }
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
          display:none;  /* colour glow retired in v3.5.2 */ }
        /* soft hex plate behind the photo — rounded pointy-top (r≈38.67), ember → midnight gradient */
        .ph-hexplate{ position:absolute; inset:0; z-index:0; background:var(--warm-100);
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
        @media (max-width:900px){
          .ph-wrap{ grid-template-columns:1fr; gap:36px; }
          .ph-copy{ text-align:center; display:flex; flex-direction:column; align-items:center; }
          .ph-sub{ margin-left:auto; margin-right:auto; }
          .ph-visual{ order:-1; max-width:420px; margin:0 auto; justify-self:center; }
          /* keep the floating UI within the hexagon so the composition stays centred */
          .ph-g-link, .ph-g-sales, .ph-g-conv{ right:0; }
          .ph-g-prod, .ph-g-pay-a, .ph-g-pay-b{ left:0; }
          .ph-g-pay-a{ top:70%; }   /* hero pill moved 15% lower on mobile */
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
        <p className="pl-cap" data-reveal>Explore and promote 4,000+ brands who are looking for publishers like you today.</p>
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
        .au-title{ font-size:clamp(24px,3vw,34px); line-height:1.06; letter-spacing:-.03em; color:var(--warm-900); }
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
          background:#ffffff; box-shadow:0 12px 30px rgba(15,28,46,.06);
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

/* ---------------- "Built for how you actually earn." — auto-advancing platform stepper ----------------
   Same interaction as the advertiser page's "One platform…" section: left tabs auto-advance on a
   timer (a fill bar tracks the dwell), each swaps the dashboard image on the right. Ember accent. */
const PUB_PLATFORM = [
  { key: 'shopping', t: 'Shopping apps', d: 'Show your users relevant products from brands they already trust, and earn a commission whenever they buy through your app.', img: 'app-stepper-shopping.png' },
  { key: 'cashback', t: 'Cashback and rewards apps', d: 'Reward your users with cashback and points on the brands they already buy, and earn a share of every qualifying purchase.', img: 'app-stepper-cashback.png' },
  { key: 'content', t: 'Content and community apps', d: 'Recommend products that fit your content and community, and earn a commission whenever your audience buys through your app.', img: 'app-stepper-content.png' },
];
const PUB_PLATFORM_MS = 12000;
function PubPlatform() {
  const isMobile = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width:900px)').matches;
  const mobileRef = React.useRef(isMobile());
  const secRef = React.useRef(null);
  // Desktop starts on the first card + auto-advances; mobile starts all-closed and opens the
  // first card only when the section scrolls into view (then stays tap-to-open, no auto-advance).
  const [active, setActive] = React.useState(() => (mobileRef.current ? -1 : 0));
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
  // No auto-advance on mobile (the rail is hidden there too).
  const next = () => { if (!mobileRef.current) setActive((a) => (a + 1) % PUB_PLATFORM.length); };
  // Mobile: open the FIRST card once, when the section enters the viewport (entrance animation).
  React.useEffect(() => {
    if (!mobileRef.current) return;
    const el = secRef.current;
    if (!el) return;
    if (prefersReduced() || !('IntersectionObserver' in window)) { setActive(0); return; }
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { setActive((a) => (a < 0 ? 0 : a)); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id="pub-platform" className="pf-sec" ref={secRef}>
      <div className="wrap">
        <div className="pf-grid" data-reveal>
          <div className="pf-left">
          <h2 className="pf-title">Built for any app with an engaged audience.</h2>
          <p className="pf-sub">If your users act on what you show them, you can earn from it. Connect once through our API, and relevant offers and tracking run in the background.</p>
          <div className="pf-steps">
            {PUB_PLATFORM.map((s, i) => {
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
                    <span className="pf-step-fig"><span className="pf-step-fig-in"><img className="pf-step-fig-img" src={`media/figma/${s.img}`} alt={s.t} loading="lazy" /></span></span>
                  </span>
                </button>
              );
            })}
          </div>
          </div>
          <div className="pf-visual">
            {PUB_PLATFORM.map((s, i) => (
              <img key={s.key} className={'pf-img' + (i === active ? ' on' : '')} src={`media/figma/${s.img}`} alt={s.t} loading="lazy" aria-hidden={i !== active} />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .pf-sec{ background:var(--warm-50); padding:clamp(77px,11.11vh,152px) 0 clamp(89px,14.28vh,191px); overflow:hidden; }
        .pf-title{ text-align:left; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .pf-sub{ text-align:left; margin-top:16px; max-width:540px; font-size:16px; line-height:1.4; color:var(--warm-600); }
        .pf-grid{ display:grid; grid-template-columns:minmax(0,1fr) minmax(290px,360px); gap:clamp(32px,5vw,80px); align-items:center; }
        .pf-left{ display:flex; flex-direction:column; }
        .pf-steps{ margin-top:clamp(26px,4vh,44px); display:flex; flex-direction:column; }
        .pf-step{ position:relative; display:flex; gap:20px; align-items:stretch; text-align:left; background:none; border:none; cursor:pointer; padding:34px 0; width:100%; }
        .pf-step + .pf-step{ border-top:1px solid var(--warm-200); }
        .pf-rail{ position:relative; width:4px; flex:0 0 auto; align-self:stretch; }
        .pf-rail-track{ position:absolute; inset:0; border-radius:var(--r-full); background:var(--warm-200); opacity:0; transition:opacity .3s ease; }
        .pf-rail-fill{ position:absolute; left:0; top:0; width:4px; border-radius:var(--r-full); background:var(--ember); height:0; }
        .pf-step.on .pf-rail-track{ opacity:1; }
        .pf-step.on .pf-rail-fill{ animation:pfFill ${PUB_PLATFORM_MS}ms linear forwards; }
        @keyframes pfFill{ from{ height:0; } to{ height:100%; } }
        .pf-step-body{ min-width:0; }
        .pf-step-t{ display:block; font-family:var(--font-display); font-weight:800; font-size:21px; letter-spacing:-.02em; color:var(--warm-900); transition:opacity .3s ease; }
        .pf-step-dw{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .4s ease; }
        .pf-step.on .pf-step-dw{ grid-template-rows:1fr; }
        .pf-step-d{ overflow:hidden; margin-top:0; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        .pf-step.on .pf-step-d{ margin-top:14px; }
        .pf-step-d a{ color:var(--ember); font-weight:600; text-decoration:underline; text-underline-offset:2px; }
        .pf-step:not(.on){ opacity:.4; } .pf-step:not(.on):hover{ opacity:.7; }
        /* contained phone-mockup card; each tab's app screen cross-fades in place */
        .pf-visual{ position:relative; width:100%; max-width:360px; margin:0 auto; aspect-ratio:692/1226; }
        .pf-img{ position:absolute; inset:0; width:100%; height:100%; object-fit:contain;
          opacity:0; transition:opacity .5s ease; filter:drop-shadow(0 24px 46px rgba(15,28,46,.14)); }
        .pf-img.on{ opacity:1; }
        .pf-step-fig{ display:none; }
        @media (max-width:900px){
          .pf-grid{ grid-template-columns:1fr; gap:0; }
          .pf-visual{ display:none; }
          /* each step becomes a white bordered card; tap to open (no auto-advance) */
          .pf-steps{ margin-top:clamp(22px,3vh,32px); gap:12px; }
          .pf-step{ gap:0; padding:6%; background:#fff; border:0.5px solid #D2D2CC; border-radius:var(--r-xl); }
          .pf-step + .pf-step{ border-top:0.5px solid #D2D2CC; }
          .pf-step:not(.on){ opacity:1; }
          .pf-rail{ display:none; }
          .pf-step-fig{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .45s ease; }
          .pf-step.on .pf-step-fig{ grid-template-rows:1fr; }
          .pf-step-fig-in{ overflow:hidden; min-height:0; }
          .pf-step-fig-img{ display:block; width:100%; max-width:230px; height:auto; margin:18px auto 0; filter:drop-shadow(0 16px 30px rgba(15,28,46,.14)); }
        }
        @media (prefers-reduced-motion: reduce){ .pf-rail-fill{ animation:none; height:100%; } .pf-img{ transition:none; } .pf-step-fig{ transition:none; } }
      `}</style>
    </section>
  );
}
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
        .hs-title{ text-align:center; font-size:clamp(24px,3vw,34px); line-height:1.1; letter-spacing:-.03em; color:var(--warm-900); }
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

/* ---------- Section 5 — "See what you could earn." (concept-8) ----------------
   Simple centered CTA band on a light rounded container with soft ember sparkles. */
const PubSparkle = () => (
  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path d="M50 2C53 38 62 47 98 50C62 53 53 62 50 98C47 62 38 53 2 50C38 47 47 38 50 2Z" fill="currentColor" />
  </svg>
);
function PubEarn() {
  return (
    <section id="pub-earn" className="pe-sec">
      <div className="wrap">
        <div className="pe-band" data-reveal>
          <span className="pe-spark pe-spark-tr" aria-hidden="true"><PubSparkle /></span>
          <span className="pe-spark pe-spark-bl" aria-hidden="true"><PubSparkle /></span>
          <h2 className="pe-title">See what you could earn.</h2>
          <p className="pe-sub">Drop your link and we'll estimate your earnings in under a minute. No sign up needed.</p>
          <a href="/partners/" className="btn btn-primary btn-lg pe-cta">Start Earning <Arrow /></a>
        </div>
      </div>
      <style>{`
        .pe-sec{ background:var(--warm-50); padding:clamp(16px,3vh,40px) 0; }
        .pe-band{ position:relative; overflow:hidden; text-align:center; border-radius:clamp(20px,2.6vw,34px);
          padding:clamp(52px,9vh,104px) clamp(24px,5vw,72px); background:#fdfbfa; }
        /* soft ember corner glows */
        .pe-band::before, .pe-band::after{ content:""; position:absolute; width:46%; height:200%; pointer-events:none; }
        .pe-band::before{ top:-70%; right:-6%; background:radial-gradient(closest-side, rgba(240,88,38,.12), transparent 72%); }
        .pe-band::after{ bottom:-70%; left:-6%; background:radial-gradient(closest-side, rgba(240,88,38,.09), transparent 72%); }
        .pe-title{ position:relative; z-index:1; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .pe-sub{ position:relative; z-index:1; margin-top:14px; font-size:clamp(15px,1.4vw,18px); line-height:1.4; color:var(--warm-600); }
        .pe-cta{ position:relative; z-index:1; margin-top:26px; }
        /* ember 4-point sparkles */
        .pe-spark{ position:absolute; z-index:1; color:var(--ember); pointer-events:none; }
        .pe-spark svg{ width:100%; height:100%; display:block; }
        .pe-spark-tr{ top:12%; right:9%; width:clamp(26px,3vw,46px); opacity:.9; }
        .pe-spark-bl{ bottom:16%; left:8%; width:clamp(18px,2.1vw,32px); opacity:.5; }
        @media (max-width:600px){ .pe-spark{ display:none; } }
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
const BE_TILE_BRANDS = ['CapCut', 'UOB', 'TikTok', 'Udemy', 'Shopee', 'PUMA', 'Huawei', 'Xiaomi'];   // pub-be-t1..8.png, in order
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
                  <span className="be-tile" key={n}><img src={`media/figma/pub-be-t${n}.png`} alt={BE_TILE_BRANDS[n - 1]} loading="lazy" /></span>
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
        .be-title{ text-align:center; font-size:clamp(24px,3vw,34px); line-height:1.1; letter-spacing:-.03em; color:var(--warm-900); }
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
          background:var(--warm-100); }
        .tv-title{ text-align:center; font-size:clamp(24px,3vw,34px); line-height:1.1; letter-spacing:-.03em; color:var(--warm-900); }
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
  ['What can the API do?',
    'Generate deeplinks, pull offers and product data, and track sales at item level. Deeplink generation is capped at 1,000 per rolling 30 days.'],
  ['Not sure what to promote in my app?',
    <>Start with the brands your users already shop. See <a href="website.html">Content sites</a> for ideas.</>],
  ['How technical is the integration?',
    'You will need a developer to connect the API. The docs cover every endpoint.'],
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
        .fq-title{ text-align:center; font-size:clamp(22px,2.6vw,30px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
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
        .fq-a a{ color:var(--ember); font-weight:600; text-decoration:underline; text-underline-offset:2px; }
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
        <h2 className="pc-title" data-reveal>Start monetizing your app today.</h2>
        <a href="https://app.involve.asia/v2/create-account" className="btn btn-primary btn-lg pc-btn" data-reveal data-reveal-delay="1">Start Earning <Arrow /></a>
      </div>
      <style>{`
        .pc-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(96px,16vh,200px) 0 clamp(104px,17vh,210px); }
        .pc-hexfield{ position:absolute; left:0; top:50%; transform:translateY(-44%) scaleY(-1); width:100%; height:auto; z-index:0; pointer-events:none; opacity:.6;
          -webkit-mask-image:linear-gradient(180deg, transparent, #000 16%, #000 84%, transparent); mask-image:linear-gradient(180deg, transparent, #000 16%, #000 84%, transparent); }
        .pc-hexfield .hx{ will-change:transform; }
        /* gradient blend into the section above */
        .pc-topfade{ position:absolute; left:0; right:0; top:0; height:clamp(200px,26%,340px); z-index:0; pointer-events:none;
          background:linear-gradient(180deg, var(--warm-50) 0%, rgba(250,250,248,.6) 45%, rgba(250,250,248,0) 100%); }
        .pc-wash{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:760px; height:420px; z-index:0; pointer-events:none;
          background:radial-gradient(ellipse at center, var(--warm-50) 32%, rgba(250,250,248,0) 72%); }
        .pc-inner{ position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; text-align:center; }
        .pc-title{ font-size:clamp(24px,3vw,34px); line-height:1.15; letter-spacing:-.03em; color:var(--warm-900); max-width:900px; }
        .pc-btn{ margin-top:26px; }
        @media (max-width:700px){ .pc-sec{ padding:clamp(60px,9vh,84px) 0 clamp(68px,10vh,96px); } }
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
        @media (max-width:600px){ .adl{ display:none !important; } }
        /* … and the Back-to-Top button is pushed up above it (scoped to this page via body specificity) */
        body .b2t{ bottom:calc(clamp(16px,2.5vw,28px) + 76px); }
        .adl-card, .adl-bubble{ position:absolute; right:0; bottom:0; transition:opacity .3s ease, transform .34s cubic-bezier(.22,1,.36,1); }
        /* expanded card (sized down ~20%) */
        .adl-card{ transform-origin:bottom right; width:min(183px, calc(100vw - 32px));
          background:var(--ember); border-radius:var(--r-lg) var(--r-lg) 0 var(--r-lg);
          box-shadow:0 15px 36px rgba(15,28,46,.24); padding:18px 18px 16px; display:flex; flex-direction:column; align-items:center; text-align:center; }
        .adl-title{ font-family:var(--font-display); font-weight:800; font-size:14.5px; line-height:1.15; color:#fff; }
        .adl-sub{ margin-top:6px; font:400 12px/1.28 var(--font-body); color:rgba(255,255,255,.92); }
        .adl-qr{ margin-top:13px; width:100%; aspect-ratio:1/1; background:#fff; border-radius:var(--r-lg); display:flex; align-items:center; justify-content:center; }
        .adl-qr img{ width:88%; height:88%; object-fit:contain; }
        .adl-dismiss{ margin-top:13px; background:none; border:none; cursor:pointer; font:400 12px/1 var(--font-body); color:#fff; text-decoration:underline; text-underline-offset:2px; }
        .adl-dismiss:hover{ opacity:.85; }
        /* collapsed teardrop bubble (points to the bottom-right corner) */
        .adl-bubble{ width:64px; height:64px; padding:0; border:none; cursor:pointer;
          background:linear-gradient(104.8deg, #F05826 0%, #C43E18 100%); border-radius:50% 50% 0 50%;
          box-shadow:0 10px 22px rgba(240,88,38,.34); display:flex; align-items:center; justify-content:center; }
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
/* ---------- Express Withdrawal §2 — "What is Express Withdrawal?" ---------- */
function ExwCard() {
  const [amount, setAmount] = React.useState(0);
  const [pressed, setPressed] = React.useState(false);
  const [active, setActive] = React.useState(false);   // button turns from grey to gradient once at $481
  // Looping demo: count up to $481, subtle button "click", drop back to $0, repeat.
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setAmount(481); setActive(true); return; }
    let raf = 0; const timers = []; let cancelled = false;
    const TARGET = 481;
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const animateTo = (from, to, dur, done) => {
      const start = performance.now();
      const step = (now) => {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / dur);
        setAmount(Math.round(from + (to - from) * easeOut(t)));
        if (t < 1) raf = requestAnimationFrame(step); else if (done) done();
      };
      raf = requestAnimationFrame(step);
    };
    const wait = (ms, fn) => { timers.push(setTimeout(() => { if (!cancelled) fn(); }, ms)); };
    const loop = () => {
      if (cancelled) return;
      setAmount(0); setPressed(false); setActive(false);        // grey button, $0
      animateTo(0, TARGET, 2400, () => {                        // count up to $481 (button stays grey)
        setActive(true);                                         // reached $481 → gradient (enabled)
        wait(550, () => {
          setPressed(true);                                      // button press
          wait(320, () => {
            setPressed(false);                                   // release
            wait(300, () => {
              setActive(false);                                  // back to grey
              animateTo(TARGET, 0, 600, () => { wait(900, loop); }); // drop to $0, then repeat
            });
          });
        });
      });
    };
    loop();
    return () => { cancelled = true; if (raf) cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, []);
  return (
    <div className="exw-card" data-reveal data-reveal-delay="1">
      <span className="exw-card-lbl">Pending Advertiser Collection</span>
      <div className="exw-amt"><span className="exw-cur">$</span><span className="exw-num">{amount}</span></div>
      <button type="button" className={'exw-btn' + (active ? ' is-active' : '') + (pressed ? ' is-pressed' : '')} tabIndex={-1} aria-hidden="true">Request Express Withdrawal</button>
    </div>
  );
}
const EXW_STEPS = [
  ['Request', 'Apply for Express Withdrawal from your dashboard.'],
  ['Approve', 'We calculate an amount from your pending conversions.'],
  ['Get paid', 'You receive it fast, in your preferred currency, converted at the platform rate.'],
  ['Reconcile', 'It is reconciled automatically once the advertiser validates the sales.'],
];
function ExwWhat() {
  return (
    <section id="exw-what" className="exw-sec">
      <div className="wrap">
        <div className="exw-top">
          <div className="exw-intro">
            <h2 className="exw-h" data-reveal>What is Express Withdrawal?</h2>
            <p className="exw-p" data-reveal data-reveal-delay="1">Express Withdrawal is the fastest way to get paid on the platform. Instead of waiting through the full validation period before you are paid, you can take a portion of your pending earnings up front, so your money can reach you in as little as 5 to 7 working days after your request is approved.</p>
          </div>
          <ExwCard />
        </div>
        <div className="exw-how" data-reveal>
          <p className="exw-how-lbl">How it works</p>
          <div className="exw-steps">
            {EXW_STEPS.map(([t, d]) => (
              <div className="exw-step" key={t}>
                <h3 className="exw-step-t">{t}</h3>
                <p className="exw-step-d">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .exw-sec{ background:var(--warm-50); padding:clamp(56px,9vh,110px) 0; }
        .exw-top{ display:grid; grid-template-columns:minmax(0,1fr) 300px; gap:clamp(32px,5vw,80px); align-items:start; }
        .exw-h{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .exw-p{ margin-top:20px; max-width:820px; font:400 16px/1.45 var(--font-body); color:var(--warm-600); }
        .exw-card{ align-self:start; background:#fff; border-radius:var(--r-lg); padding:24px; box-shadow:0 1.2px 3px rgba(0,0,0,.16), 0 20px 44px rgba(15,28,46,.07); }
        .exw-card-lbl{ display:block; font:600 13px/1.32 var(--font-body); color:rgba(17,17,16,.64); }
        .exw-amt{ margin-top:11px; display:flex; align-items:baseline; font-family:var(--font-body); font-weight:700; color:var(--warm-900); line-height:1.1; letter-spacing:-.01em; font-variant-numeric:tabular-nums; }
        .exw-cur{ font-size:40px; }
        .exw-num{ font-size:44px; }
        /* grey (disabled) until the amount reaches $481, then morphs to the ember gradient */
        .exw-btn{ margin-top:16px; width:100%; display:flex; align-items:center; justify-content:center; gap:8px; padding:16px 18px; border:none; border-radius:var(--r-full); cursor:default; white-space:nowrap;
          background-image:linear-gradient(144deg,#d2d2cc 0%,#c7c7c0 100%); color:#fff; font:600 14.5px/1 var(--font-body); box-shadow:0 4px 10px rgba(15,28,46,.06);
          transition:transform .16s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease, background-image .4s ease, filter .16s ease; }
        .exw-btn.is-active{ background-image:linear-gradient(144deg,#f05826 0%,#c43e18 100%); box-shadow:0 7px 11px rgba(240,88,38,.22); }
        .exw-btn.is-pressed{ transform:scale(.94); box-shadow:0 3px 7px rgba(240,88,38,.26); filter:brightness(.96); }
        .exw-how{ margin-top:clamp(44px,6vh,72px); }
        .exw-how-lbl{ font:500 16px/1.3 var(--font-body); color:var(--ember); }
        .exw-steps{ margin-top:22px; display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(24px,3vw,48px); }
        .exw-step-t{ font:700 16px/1.3 var(--font-body); color:var(--warm-900); }
        .exw-step-d{ margin-top:8px; font:400 16px/1.4 var(--font-body); color:var(--warm-600); }
        @media (max-width:900px){ .exw-top{ grid-template-columns:1fr; } .exw-card{ max-width:340px; } .exw-steps{ grid-template-columns:repeat(2,1fr); row-gap:32px; } }
        @media (max-width:560px){ .exw-steps{ grid-template-columns:1fr; } }
      `}</style>
    </section>
  );
}
/* ---------- Express Withdrawal §3 — "Two ways to get paid" comparison ------ */
const TW_ROWS = [
  ['When you can withdraw', 'After the advertiser validates the sale', 'Before validation, on a portion of your pending earnings'],
  ['Time to get paid', "7 to 10 working days after your request, plus each offer's validation period", 'As little as 5 to 7 working days after approval'],
  ['How much', 'Your full validated earnings', 'A portion of your eligible pending conversions'],
  ['Fee', 'Free up to a specific limit per month', 'A processing fee applies to the amount taken early, shown before you confirm'],
  ['Best for', 'Publishers who can wait for the full cycle', 'Publishers who want their money sooner'],
];
function ExwCompare() {
  return (
    <section id="exw-compare" className="tw-sec">
      <div className="wrap">
        <div className="tw-head" data-reveal>
          <h2 className="tw-title">Two ways to get paid</h2>
          <p className="tw-sub">Both withdrawal methods are open to every publisher. Standard withdrawal is available to anyone who meets the minimum amount. Express Withdrawal is available to any publisher who meets the eligibility criteria, and each request is subject to a quick approval.</p>
        </div>
        <div className="tw-scroll" data-reveal data-reveal-delay="1">
          <div className="tw-table">
            <div className="tw-row tw-hrow">
              <div className="tw-c tw-label-h" aria-hidden="true" />
              <div className="tw-c tw-col tw-col-std">
                <span className="tw-ic tw-ic-std"><img src="media/figma/exw-icon-standard.svg" alt="" /></span>
                <span className="tw-col-t">Standard withdrawal</span>
              </div>
              <div className="tw-c tw-col tw-col-exp">
                <span className="tw-ic tw-ic-exp"><img src="media/figma/exw-icon-express.svg" alt="" /></span>
                <span className="tw-col-t">Express withdrawal</span>
              </div>
            </div>
            {TW_ROWS.map((r, i) => (
              <div className="tw-row" key={i}>
                <div className="tw-c tw-label">{r[0]}</div>
                <div className="tw-c tw-std">{r[1]}</div>
                <div className="tw-c tw-exp">{r[2]}</div>
              </div>
            ))}
            <span className="tw-exp-card" aria-hidden="true" />
          </div>
        </div>
      </div>
      <style>{`
        .tw-sec{ background:var(--warm-50); padding:clamp(56px,9vh,110px) 0; }
        .tw-head{ text-align:center; max-width:1040px; margin:0 auto clamp(30px,4.6vh,52px); }
        .tw-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.02em; color:var(--warm-900); }
        .tw-sub{ margin-top:16px; font:400 16px/1.4 var(--font-body); color:var(--warm-600); }
        .tw-scroll{ overflow-x:auto; scrollbar-width:thin; padding:18px 8px 42px; }
        .tw-table{ --tw-label:260px; position:relative; display:flex; flex-direction:column; min-width:0; max-width:1100px; margin:0 auto; }
        .tw-row{ display:grid; grid-template-columns:var(--tw-label) minmax(0,1fr) minmax(0,1fr); }
        .tw-c{ padding:20px 24px; display:flex; align-items:center; font:400 14px/1.5 var(--font-body); color:var(--warm-900); }
        .tw-row:not(.tw-hrow) .tw-c{ border-top:1px solid #e8e8e5; }
        .tw-label, .tw-label-h{ padding-left:32px; padding-right:32px; }
        .tw-label{ font-weight:500; }
        .tw-std{ background:rgba(255,255,255,.48); }
        /* raised Express column — a single white card spanning the column; the only drop shadow */
        .tw-exp-card{ position:absolute; top:0; right:0; bottom:0; width:calc((100% - var(--tw-label)) / 2); z-index:0;
          background:#fff; border-radius:var(--r-xl); box-shadow:0 14px 30px rgba(15,28,46,.13), 0 3px 9px rgba(15,28,46,.06); pointer-events:none; }
        .tw-exp, .tw-col-exp{ position:relative; z-index:1; background:transparent; }
        /* header cells: icon-box + title stacked, left-aligned */
        .tw-hrow .tw-col{ flex-direction:column; align-items:flex-start; gap:12px; padding-top:32px; padding-bottom:28px; }
        .tw-col-std{ background:rgba(255,255,255,.48); }
        .tw-ic{ display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:var(--r-xl); flex:0 0 auto; }
        .tw-ic img{ width:24px; height:24px; display:block; }
        .tw-ic-std{ background:#e8e8e2; }
        .tw-ic-exp{ background:rgba(240,88,38,.12); }
        .tw-col-t{ font-family:var(--font-display); font-weight:800; font-size:20px; letter-spacing:-.01em; color:var(--warm-900); }
        /* Awin-style mobile: no side-scroll — feature label sits full-width above its two
           plan values, plan header sticks to the top, Express column stays tinted. */
        @media (max-width:820px){
          .tw-scroll{ overflow:visible; padding:0; }
          .tw-table{ min-width:0; border:1px solid #ecece7; border-radius:var(--r-xl); overflow:hidden; }
          .tw-exp-card{ display:none; }
          .tw-row{ grid-template-columns:1fr 1fr; }
          .tw-label{ grid-column:1 / -1; padding:15px 16px 3px; font-weight:700; font-size:14px; color:var(--warm-900); }
          .tw-label-h{ display:none; }
          .tw-hrow{ border-bottom:1px solid #e8e8e5; }
          .tw-hrow .tw-col{ padding:14px 12px; gap:8px; }
          .tw-ic{ width:36px; height:36px; }
          .tw-ic img{ width:20px; height:20px; }
          .tw-col-t{ font-size:14px; }
          .tw-c{ padding:4px 12px 14px; font-size:13px; line-height:1.45; align-items:flex-start; }
          .tw-std, .tw-col-std{ background:#f4f4ef; }
          .tw-exp, .tw-col-exp{ background:rgba(240,88,38,.07); }
          .tw-row:not(.tw-hrow) .tw-c{ border-top:none; }
          .tw-row:not(.tw-hrow){ border-top:1px solid #e8e8e5; }
        }
      `}</style>
    </section>
  );
}
/* ---------- App-owners §3 — "Earn from what your users already do." (3 cards) ---------- */
const EARN_CARDS = [
  ['app-earn-1.png', 'Earn on every sale', 'Recommend products and services your users want, and earn a commission whenever they buy.'],
  ['app-earn-2.png', 'Give cashback, build loyalty', 'Offer cashback and rewards that keep users coming back, set up once and run automatically.'],
  ['app-earn-3.png', 'Native, not intrusive', 'Blend real product recommendations into your app so they feel like part of the experience, not an ad.'],
];
function AppEarn() {
  return (
    <section id="app-earn" className="eu-sec">
      <div className="wrap">
        <h2 className="eu-title" data-reveal>Earn from what your users already do.</h2>
        <div className="eu-grid">
          {EARN_CARDS.map(([img, t, d], i) => (
            <div className="eu-card" key={t} data-reveal data-reveal-delay={i + 1}>
              <div className="eu-visual"><img src={`media/figma/${img}`} alt="" loading="lazy" /></div>
              <h3 className="eu-ct">{t}</h3>
              <p className="eu-cd">{d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .eu-sec{ background:var(--warm-50); padding:clamp(56px,9vh,110px) 0; }
        .eu-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); max-width:820px; margin:0 auto; }
        .eu-grid{ margin-top:clamp(40px,6vh,64px); display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(20px,2.6vw,32px); }
        .eu-card{ min-width:0; }
        .eu-visual{ border-radius:var(--r-xl); overflow:hidden; aspect-ratio:414/260; background:var(--warm-100); }
        .eu-visual img{ width:100%; height:100%; object-fit:cover; display:block; }
        .eu-ct{ margin-top:24px; font-family:var(--font-display); font-weight:800; font-size:21px; letter-spacing:-.01em; color:var(--warm-900); }
        .eu-cd{ margin-top:12px; font:400 16px/1.4 var(--font-body); color:var(--warm-600); }
        @media (max-width:820px){ .eu-grid{ grid-template-columns:1fr; gap:36px; max-width:440px; margin-left:auto; margin-right:auto; } }
      `}</style>
    </section>
  );
}
/* ---------- App-owners §4 — "Automated through our API." (copy + code card) ---------- */
function AppApi() {
  return (
    <section id="app-api" className="aa-sec">
      <div className="wrap">
        <div className="aa-box">
        <div className="aa-grid">
          <div className="aa-left" data-reveal>
            <h2 className="aa-title">Automated through <br />our API.</h2>
            <p className="aa-body">Connect once, and our API keeps your app stocked with the latest offers, generates your links, and tracks every conversion, so earning runs in the background while you focus on your product.</p>
            <a className="aa-link" href="#">
              API overview
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 5.5l6.5 6.5L9 18.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
          <div className="aa-code" data-reveal data-reveal-delay="1">
            <div className="aa-code-bar">
              <span className="aa-dot aa-dot-r" />
              <span className="aa-dot aa-dot-y" />
              <span className="aa-dot aa-dot-g" />
              <span className="aa-file">involve_asia_api_v2.json</span>
            </div>
            <div className="aa-code-body">
              <div className="cl"><span className="c-com">{'// Initialize connection with Involve API'}</span></div>
              <div className="cl"><span className="c-txt">GET </span><span className="c-grn">https://api.involve.asia/v2/offers</span></div>
              <div className="cl"><span className="c-txt">Authorization: Bearer ia_app_key_849204</span></div>
              <div className="aa-hr" />
              <div className="cl"><span className="c-com">{'// JSON Response'}</span></div>
              <div className="cl"><span className="c-cyan">{'{'}</span></div>
              <div className="cl"><span className="c-txt">{'  "status": '}</span><span className="c-yel">"active"</span><span className="c-txt">,</span></div>
              <div className="cl"><span className="c-txt">{'  "cashback_rate_pct": '}</span><span className="c-pur">12.0</span><span className="c-txt">,</span></div>
              <div className="cl"><span className="c-txt">{'  "commission_share": '}</span><span className="c-pur">0.08</span></div>
              <div className="cl"><span className="c-cyan">{'}'}</span></div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <style>{`
        .aa-sec{ background:var(--warm-50); padding:clamp(56px,9vh,110px) 0; }
        .aa-box{ background:#fff; border-radius:var(--r-xl); padding:clamp(28px,3.5vw,56px); box-shadow:0 1px 3px rgba(15,28,46,.04); }
        .aa-grid{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,492px); gap:clamp(36px,5vw,80px); align-items:center; }
        .aa-left{ max-width:580px; }
        .aa-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.14; letter-spacing:-.03em; color:var(--warm-900); }
        .aa-body{ margin-top:22px; font:400 16px/1.42 var(--font-body); color:var(--warm-600); max-width:520px; }
        .aa-link{ margin-top:26px; display:inline-flex; align-items:center; gap:8px; font:700 16px/1 var(--font-body); color:var(--warm-900); text-decoration:none; }
        .aa-link svg{ transition:transform .2s ease; }
        .aa-link:hover svg{ transform:translateX(3px); }
        .aa-code{ background:#1e1e1e; border-radius:var(--r-xl); padding:clamp(20px,2vw,27px); box-shadow:0 12px 13px rgba(0,0,0,.15); }
        .aa-code-bar{ display:flex; align-items:center; gap:7px; }
        .aa-dot{ width:10px; height:10px; border-radius:50%; flex:none; }
        .aa-dot-r{ background:#ff5f56; } .aa-dot-y{ background:#ffbd2e; } .aa-dot-g{ background:#27c93f; }
        .aa-file{ margin-left:8px; font:400 10px/1 var(--font-body); color:#7f7f7f; }
        .aa-code-body{ margin-top:17px; font-family:ui-monospace,"SF Mono",Menlo,Consolas,monospace; font-size:11.9px; line-height:17px; overflow-x:auto; }
        .aa-code-body .cl{ white-space:pre; color:#f8f8f2; }
        .aa-hr{ height:1px; background:rgba(255,255,255,.12); margin:6px 0; }
        .c-com{ color:#75715e; } .c-txt{ color:#f8f8f2; } .c-grn{ color:#a6e22e; } .c-cyan{ color:#66d9ef; } .c-yel{ color:#e6db74; } .c-pur{ color:#ae81ff; }
        @media (max-width:820px){ .aa-grid{ grid-template-columns:minmax(0,1fr); gap:32px; } }
      `}</style>
    </section>
  );
}
/* ---------- App-owners §4b — "How you earn." (3 numbered steps) — Figma 2546:45558 ---------- */
const HIW_STEPS = [
  ['01', 'Connect the API', 'Integrate once, and pull offers, links, and tracking straight into your app.'],
  ['02', 'Surface relevant offers', 'Show cashback and deals your users actually want, inside your own UI.'],
  ['03', 'Earn on every sale', 'When a user buys through your app, the sale is tracked to you.'],
  ['04', 'Get paid', 'Withdraw in your local currency once sales are validated, or sooner with Express Withdrawal.'],
];
function HowItWorks() {
  return (
    <section id="ao-how" className="hiw-sec">
      <div className="wrap">
        <h2 className="hiw-title" data-reveal>How you earn.</h2>
        <div className="hiw-grid">
          {HIW_STEPS.map(([n, t, d], i) => (
            <div className="hiw-step" key={n} data-reveal data-reveal-delay={i + 1}>
              <span className="hiw-num" aria-hidden="true">{n}</span>
              <h3 className="hiw-ct">{t}</h3>
              <p className="hiw-cd">{d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .hiw-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .hiw-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .hiw-grid{ margin-top:clamp(34px,5.5vh,58px); display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(26px,3vw,44px); }
        .hiw-step{ min-width:0; }
        .hiw-num{ display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:50%; background:var(--ember); color:#fff; font-family:var(--font-display); font-weight:800; font-size:17px; letter-spacing:-.01em; }
        .hiw-ct{ margin-top:clamp(20px,3vh,28px); font-family:var(--font-display); font-weight:800; font-size:20px; letter-spacing:-.01em; color:var(--warm-900); }
        .hiw-cd{ margin-top:10px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:340px; }
        @media (max-width:900px){ .hiw-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); gap:clamp(26px,4vw,40px); } }
        @media (max-width:520px){ .hiw-grid{ grid-template-columns:1fr; gap:clamp(24px,4vh,34px); max-width:440px; } }
      `}</style>
    </section>
  );
}
/* ---------- App-owners §4c — "Why app owners build on Involve." (3 icon columns) ---------- */
const WB_ICONS = {
  app: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><line x1="10" y1="18.5" x2="14" y2="18.5" /></svg>,
  brands: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 12l9 5 9-5" /><path d="M3 16.5l9 5 9-5" /></svg>,
  dev: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="8 7.5 3.5 12 8 16.5" /><polyline points="16 7.5 20.5 12 16 16.5" /></svg>,
};
const WHY_BUILD = [
  ['app', 'Your app, your experience.', 'Offers live inside your own UI. You control how they look and where they appear.'],
  ['brands', 'One integration, hundreds of brands.', 'Connect once to access 500+ brands and 4,000+ offers.'],
  ['dev', 'Built for developers.', 'Clear API docs, item-level tracking, and reliable payouts.'],
];
function WhyBuild() {
  return (
    <section id="ao-why" className="wb-sec">
      <div className="wrap">
        <h2 className="wb-title" data-reveal>Why app owners build on Involve.</h2>
        <div className="wb-grid">
          {WHY_BUILD.map(([ic, t, d], i) => (
            <div className="wb-item" key={t} data-reveal data-reveal-delay={i + 1}>
              <span className="wb-ic">{WB_ICONS[ic]}</span>
              <h3 className="wb-ct">{t}</h3>
              <p className="wb-cd">{d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .wb-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .wb-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .wb-grid{ margin-top:clamp(34px,5vh,54px); display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(28px,4vw,56px); }
        .wb-item{ min-width:0; }
        .wb-ic{ display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:var(--r-xl); background:rgba(240,88,38,.12); color:var(--ember); }
        .wb-ic svg{ width:24px; height:24px; display:block; }
        .wb-ct{ margin-top:20px; font-family:var(--font-display); font-weight:800; font-size:20px; letter-spacing:-.01em; color:var(--warm-900); }
        .wb-cd{ margin-top:8px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:340px; }
        @media (max-width:760px){ .wb-grid{ grid-template-columns:1fr; max-width:440px; margin-inline:auto; gap:clamp(24px,4vh,34px); } }
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
        <PubPlatform />
        <HowItWorks />
        <AppEarn />
        <AppApi />
        <WhyBuild />
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
