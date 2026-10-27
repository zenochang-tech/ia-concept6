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
          <span className="ph-eyebrow" data-reveal>For Affiliate Partners</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Turn the site you already run into income.</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="2">From a blog with a few links to a cashback site running at volume. Earn on what your readers and members buy, with the offers, feeds, and tools to match.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="3">
            <a href="/partners/" className="btn btn-primary btn-lg">Start Earning <Arrow /></a>
          </div>
          <span className="ph-free" data-reveal data-reveal-delay="3">Free to join. Start earning today.</span>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo ph-photo-fill"><img src="media/figma/aff-hero-img.png" alt="An affiliate site dashboard shown on a laptop" loading="eager" /></div>
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
  const marqRef = React.useRef(null);
  const [reps, setReps] = React.useState(2);
  // Repeat the logo set until one loop spans at least the visible strip width, so the
  // marquee never shows a blank gap before the next copy scrolls in.
  React.useEffect(() => {
    const track = trackRef.current, marq = marqRef.current;
    if (!track || !marq) return;
    const imgs = Array.prototype.slice.call(track.querySelectorAll('img'));
    const fit = () => {
      if (imgs.some((im) => !im.complete)) return;         // wait until the logos are measurable
      const baseW = track.scrollWidth / (2 * reps);
      if (baseW < 40) return;
      const need = Math.min(8, Math.max(1, Math.ceil((marq.clientWidth + 8) / baseW)));
      if (need !== reps) setReps(need);
    };
    fit();
    imgs.forEach((im) => im.addEventListener('load', fit));
    window.addEventListener('resize', fit);
    const ro = window.ResizeObserver ? new ResizeObserver(fit) : null;
    if (ro) { ro.observe(track); ro.observe(marq); }
    return () => { imgs.forEach((im) => im.removeEventListener('load', fit)); window.removeEventListener('resize', fit); if (ro) ro.disconnect(); };
  }, [reps]);
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
  }, [reps]);
  const oneLoop = [];
  for (let k = 0; k < reps; k++) oneLoop.push(...PUB_LOGOS);
  const dup = [...oneLoop, ...oneLoop];
  return (
    <section id="pub-logos" className="pl-sec">
      <div className="wrap">
        <p className="pl-cap" data-reveal>Explore and promote 4,000+ brands who are looking for publishers like you today.</p>
      </div>
      <div className="pl-marquee" ref={marqRef} data-reveal data-reveal-delay="1">
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
        .au-card{ position:relative; flex:0 0 auto; width:clamp(268px,80vw,320px); height:366px; border-radius:var(--r-xl); overflow:hidden;
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
  { key: 'find', t: 'Find offers to promote', d: 'Browse thousands of brands and pick the offers that fit your audience.', img: 'publisher-feature-01.png' },
  { key: 'links', t: 'Generate your links', d: 'Create a trackable link, coupon, or banner in a couple of clicks, in bulk when you need to.', img: 'publisher-feature-02.png' },
  { key: 'track', t: 'Track your earnings', d: 'Watch your clicks, sales, and commissions update in real time, on web or the app.', img: 'publisher-feature-03.png' },
  { key: 'paid', t: 'Get paid', d: 'Withdraw in your preferred currency once your conversions are validated, or sooner with Express Withdrawal.', img: 'publisher-feature-04.png' },
];
const PUB_PLATFORM_MS = 5000;
function PubPlatform() {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    if (prefersReduced()) return;                 // no auto-advance under reduced motion
    const t = setTimeout(() => setActive((a) => (a + 1) % PUB_PLATFORM.length), PUB_PLATFORM_MS);
    return () => clearTimeout(t);
  }, [active]);
  return (
    <section id="pub-platform" className="pf-sec">
      <div className="wrap">
        <h2 className="pf-title" data-reveal>Built for how you actually earn.</h2>
        <p className="pf-sub" data-reveal data-reveal-delay="1">Find offers, share your links, track every sale, and get paid, all from one dashboard.</p>
        <div className="pf-grid" data-reveal data-reveal-delay="1">
          <div className="pf-steps">
            {PUB_PLATFORM.map((s, i) => {
              const on = i === active;
              return (
                <button type="button" className={'pf-step' + (on ? ' on' : '')} key={s.key} onClick={() => setActive(i)} aria-expanded={on}>
                  <span className="pf-rail" aria-hidden="true">
                    <span className="pf-rail-track" />
                    {on && <span className="pf-rail-fill" key={active} />}
                  </span>
                  <span className="pf-step-body">
                    <span className="pf-step-t">{s.t}</span>
                    <span className="pf-step-dw"><span className="pf-step-d">{s.d}</span></span>
                    <span className="pf-step-fig"><span className="pf-step-fig-in"><img className="pf-step-fig-img" src={`media/figma/${s.img}`} alt="" loading="lazy" /></span></span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="pf-visual">
            {PUB_PLATFORM.map((s, i) => (
              <img key={s.key} className={'pf-img' + (i === active ? ' on' : '')} src={`media/figma/${s.img}`} alt="" loading="lazy" aria-hidden={i !== active} />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .pf-sec{ background:var(--warm-50); padding:clamp(77px,11.11vh,152px) 0 clamp(89px,14.28vh,191px); overflow:hidden; }
        .pf-title{ text-align:center; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .pf-sub{ text-align:center; margin-top:14px; font-size:16px; line-height:1.4; color:var(--warm-600); }
        .pf-grid{ margin-top:clamp(40px,6vh,72px); display:grid; grid-template-columns:minmax(0,412px) 1fr; gap:clamp(32px,4vw,64px); align-items:stretch; }
        .pf-steps{ display:flex; flex-direction:column; }
        .pf-step{ position:relative; display:flex; gap:20px; align-items:stretch; text-align:left; background:none; border:none; cursor:pointer; padding:34px 0; width:100%; }
        .pf-step + .pf-step{ border-top:1px solid var(--warm-200); }
        .pf-rail{ position:relative; width:8px; flex:0 0 auto; align-self:stretch; }
        .pf-rail-track{ position:absolute; inset:0; border-radius:var(--r-full); background:var(--warm-200); opacity:0; transition:opacity .3s ease; }
        .pf-rail-fill{ position:absolute; left:0; top:0; width:8px; border-radius:var(--r-full); background:var(--ember); height:0; }
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
        /* light warm/ember gradient container; the dashboard sits inset top-left and bleeds off the right */
        .pf-visual{ position:relative; align-self:center; width:100%; aspect-ratio:5/3; overflow:hidden;
          border-radius:var(--r-xl);
          background:var(--warm-100); }
        .pf-img{ position:absolute; top:clamp(20px,3.2vw,40px); left:clamp(20px,3.2vw,40px);
          width:calc(100% - clamp(20px,3.2vw,40px)); height:calc(100% - clamp(20px,3.2vw,40px));
          object-fit:cover; object-position:left top; border-radius:16px 0 0 0;
          opacity:0; transition:opacity .5s ease; }
        .pf-img.on{ opacity:1; }
        .pf-step-fig{ display:none; }
        @media (max-width:900px){
          .pf-grid{ grid-template-columns:1fr; gap:0; }
          .pf-visual{ display:none; }
          .pf-step{ gap:0; padding:24px 0; }
          .pf-rail{ display:none; }
          .pf-step-fig{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .45s ease; }
          .pf-step.on .pf-step-fig{ grid-template-rows:1fr; }
          .pf-step-fig-in{ overflow:hidden; min-height:0; }
          .pf-step-fig-img{ display:block; width:100%; height:auto; margin:18px 0 4px; border-radius:var(--r-xl); box-shadow:0 12px 28px rgba(15,28,46,.12); }
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
          <a href="/partners/" className="btn btn-primary btn-lg pe-cta">Estimate my earnings <Arrow /></a>
        </div>
      </div>
      <style>{`
        .pe-sec{ position:relative; z-index:2; background:var(--warm-50); padding:clamp(16px,3vh,40px) 0; }
        .pe-band{ position:relative; overflow:hidden; text-align:center; border-radius:clamp(20px,2.6vw,34px);
          padding:clamp(52px,9vh,104px) clamp(24px,5vw,72px); background:#fdfbfa;
          box-shadow:0 8px 12px rgba(15,28,46,.08); }
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
    quote: 'Such a good overall experience with IA, very friendly & professional.',
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
  ['Will affiliate links change how my site looks?',
    'No. You choose where links go. There are no forced ads or banners.'],
  ['Do old articles still earn?',
    'Yes. Any post with a live link keeps earning on every sale it drives.'],
  ['What kinds of sites qualify?',
    'Blogs, niche sites, news and media, plus cashback, coupon, comparison, loyalty and deal sites.'],
  ['Can I get a product datafeed?',
    'Yes. Pull live product data per advertiser and add your own tracking to the links. Feeds vary by advertiser.'],
  ['Do you support cashback and coupon models?',
    'Yes. Cashback, coupon, comparison, loyalty, and deal sites all run on the platform.'],
  ['Is there an API?',
    <>Yes. Generate deep links and pull conversions and offers programmatically. See the <a href="api-overview.html">Developer API</a>.</>],
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
        <h2 className="pc-title" data-reveal>Grow the site you already run.</h2>
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
/* ---------- Affiliates §2 — "Built for every kind of affiliate site." (3 cards) ---------- */
/* Sub-type feature section — two cards, same layout as the Creator "Made for…" and
   Technology "Built for teams that build." sections (mf-* pattern). */
/* Browser coverflow (Option A): a browser window centred in the tinted square,
   cycling through the affiliate site types (blog / cashback / coupon / comparison),
   with prev/next peeking at 40% opacity. Parallels the creator phone coverflow.
   Placeholder browser chrome until real site mockups (aff-site-1..4.png) land. */
const AFF_SITES = [
  { key: 'blog', label: 'Blog', img: 'aff-site-1.png', tint: 'linear-gradient(135deg,#f1ece6,#e4ddd2)' },
  { key: 'cashback', label: 'Cashback', img: 'aff-site-2.png', tint: 'linear-gradient(135deg,#e8f0ea,#d6e5db)' },
  { key: 'coupon', label: 'Coupon', img: 'aff-site-3.png', tint: 'linear-gradient(135deg,#f4ece7,#ecd9cd)' },
  { key: 'compare', label: 'Comparison', img: 'aff-site-4.png', tint: 'linear-gradient(135deg,#e9ebf3,#d6dcec)' },
];
function AffFlow() {
  const N = AFF_SITES.length;
  const reduced = prefersReduced();
  const [active, setActive] = React.useState(0);
  const refs = React.useRef([]);
  const first = React.useRef(true);
  React.useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setActive((a) => (a + 1) % N), 3200);
    return () => clearInterval(id);
  }, [reduced, N]);
  React.useLayoutEffect(() => {
    const animate = !first.current && !reduced;
    refs.current.forEach((el, i) => {
      if (!el) return;
      const d = (i - active + N) % N;            // 0 centre, 1 right peek, 2 hidden (off-stage right), 3 left peek
      let left, op, scale, z;
      if (d === 0) { left = '50%'; op = '1'; scale = '1'; z = '3'; }
      else if (d === 1) { left = '97%'; op = '0.4'; scale = '0.88'; z = '2'; }
      else if (d === 3) { left = '3%'; op = '0.4'; scale = '0.88'; z = '2'; }
      else { left = '140%'; op = '0'; scale = '0.8'; z = '1'; }
      el.style.transition = (d === 2 && animate) ? 'none' : (animate ? '' : 'none');   // teleport the recycled item off-stage
      el.style.left = left; el.style.opacity = op; el.style.zIndex = z;
      el.style.transform = 'translate(-50%,-50%) scale(' + scale + ')';
    });
    if (first.current) {
      if (refs.current[0]) void refs.current[0].offsetWidth;
      refs.current.forEach((el) => { if (el) el.style.transition = ''; });
      first.current = false;
    }
  }, [active, reduced, N]);
  return (
    <div className="afc" role="group" aria-label="Affiliate site types: blog, cashback, coupon and comparison">
      {AFF_SITES.map((s, i) => (
        <div key={s.key} ref={(el) => (refs.current[i] = el)} className="afc-item" aria-hidden={((i - active + N) % N) !== 0}>
          <div className="afc-win">
            <div className="afc-bar"><span className="afc-dots"><i /><i /><i /></span><span className="afc-url">{s.label} Site</span></div>
            <div className="afc-body">
              {s.img
                ? <img className="afc-shot" src={`media/figma/${s.img}`} alt={`${s.label} affiliate site`} loading="lazy" />
                : <div className="afc-ph" style={{ background: s.tint }}><span className="afc-hero" /><span className="afc-line w1" /><span className="afc-line w2" /><span className="afc-line w3" /></div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
function BuiltKinds() {
  return (
    <section id="aff-kinds" className="mf-sec">
      <div className="wrap">
        <div className="mf-grid">
          <div className="mf-left">
            <h2 className="mf-title" data-reveal>Built for every kind of affiliate site.</h2>
            <p className="mf-sub" data-reveal data-reveal-delay="1">Whatever you run and however big it is, there's a way to earn.</p>
            <div className="mf-points" data-reveal data-reveal-delay="1">
              <div className="mf-point">
                <h3 className="mf-pt">Whatever kind of site you run.</h3>
                <p className="mf-pd">Blogs, news, cashback, coupon, and comparison sites all earn here. If it has content and an audience, you can turn it into income.</p>
              </div>
              <div className="mf-point">
                <h3 className="mf-pt">Light touch, or high volume.</h3>
                <p className="mf-pd">Add a few links to your posts, or run datafeeds and the API at scale. The tools work either way, and grow as you do.</p>
              </div>
            </div>
          </div>
          <div className="mf-visual" data-reveal>
            <AffFlow />
          </div>
        </div>
      </div>
      <style>{`
        .mf-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .mf-grid{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,440px); gap:clamp(32px,5vw,72px); align-items:center; }
        .mf-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); max-width:520px; }
        .mf-sub{ margin-top:14px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:520px; }
        .mf-points{ margin-top:clamp(24px,4vh,40px); display:flex; flex-direction:column; gap:clamp(20px,3vh,30px); }
        .mf-pt{ font-family:var(--font-display); font-weight:800; font-size:19px; letter-spacing:-.01em; color:var(--warm-900); }
        .mf-pd{ margin-top:8px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:520px; }
        .mf-visual{ position:relative; }
        /* ---- browser coverflow (affiliate site types) ---- */
        .afc{ position:relative; width:100%; max-width:476px; margin-inline:auto; aspect-ratio:476/445;
          border-radius:var(--r-xl); overflow:hidden; background:var(--warm-100); }
        .afc-item{ position:absolute; top:50%; left:50%; width:76%; aspect-ratio:4/3;
          transform:translate(-50%,-50%); transform-origin:center;
          transition:left .7s cubic-bezier(.45,0,.15,1), opacity .7s ease, transform .7s cubic-bezier(.45,0,.15,1);
          will-change:left,opacity,transform; }
        .afc-win{ width:100%; height:100%; border-radius:var(--r-xl); overflow:hidden; display:flex; flex-direction:column;
          box-shadow:0 20px 44px rgba(15,28,46,.18); background:#fff; }
        .afc-bar{ display:flex; align-items:center; gap:8px; padding:7px 10px; background:#f3f1ee; border-bottom:1px solid var(--warm-100); flex:0 0 auto; }
        .afc-dots{ display:flex; gap:4px; } .afc-dots i{ width:7px; height:7px; border-radius:50%; background:#d8d3cc; }
        .afc-url{ flex:1; font:500 10px/1 var(--font-body); color:var(--warm-500); background:#fff; border-radius:var(--r-sm); padding:4px 8px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .afc-body{ flex:1; position:relative; overflow:hidden; background:#fff; }
        .afc-shot{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }
        .afc-ph{ position:absolute; inset:0; padding:16px; display:flex; flex-direction:column; gap:8px; }
        .afc-hero{ height:46%; border-radius:var(--r-lg); background:rgba(15,28,46,.07); margin-bottom:4px; }
        .afc-line{ height:7px; border-radius:var(--r-sm); background:rgba(15,28,46,.08); }
        .afc-line.w1{ width:72%; } .afc-line.w2{ width:52%; } .afc-line.w3{ width:62%; }
        @media (prefers-reduced-motion: reduce){ .afc-item{ transition:none; } }
        @media (max-width:860px){ .mf-grid{ grid-template-columns:1fr; gap:32px; } .mf-visual{ order:-1; width:100%; max-width:476px; margin-inline:auto; } }
      `}</style>
    </section>
  );
}
/* ---------- Affiliates §3 — "Why affiliate sites choose Involve." (4 icon columns) ---------- */
const AFF_WHY = [
  { t: 'Links that fit your site.', d: 'Place contextual links yourself, with no forced ads or banners cluttering your pages.',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg> },
  { t: 'Your content keeps earning.', d: 'A review you wrote last year still earns today, every time it drives a sale.',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M8 13h6M8 17h4" /></svg> },
  { t: 'Built for volume.', d: 'Datafeeds and API link generation to run at the scale your site needs.',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="6" rx="7.5" ry="3" /><path d="M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6" /><path d="M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" /></svg> },
  { t: 'Reliable tracking and payouts.', d: 'Every sale is validated, with reporting you can check yourself, plus Express Withdrawal when you want paying sooner.',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 14.5l2 2 4-4" /></svg> },
];
function WhyChoose() {
  return (
    <section id="aff-why" className="wy-sec">
      <div className="wrap">
        <h2 className="wy-title" data-reveal>Why affiliate sites earn with Involve.</h2>
        <div className="wy-grid">
          {AFF_WHY.map((c, i) => (
            <div className="wy-col" key={c.t} data-reveal data-reveal-delay={(i % 3) + 1}>
              <span className="wy-ic" aria-hidden="true">{c.ic}</span>
              <h3 className="wy-ct">{c.t}</h3>
              <p className="wy-cd">{c.d}</p>
            </div>
          ))}
        </div>
        <p className="wy-proof" data-reveal>Content, cashback, coupon, and comparison sites across the region run on Involve Asia.</p>
      </div>
      <style>{`
        .wy-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .wy-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .wy-grid{ margin-top:clamp(34px,5vh,54px); display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(24px,3vw,40px); }
        @media (max-width:960px){ .wy-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); gap:clamp(28px,4vw,40px); } }
        .wy-col{ min-width:0; }
        .wy-ic{ width:48px; height:48px; border-radius:var(--r-xl); background:var(--ember-tint); color:var(--ember); display:flex; align-items:center; justify-content:center; }
        .wy-ic svg{ width:24px; height:24px; }
        .wy-ct{ margin-top:20px; font-family:var(--font-display); font-weight:800; font-size:20px; letter-spacing:-.01em; color:var(--warm-900); }
        .wy-cd{ margin-top:8px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:340px; }
        .wy-proof{ margin-top:clamp(28px,4vh,44px); text-align:center; font:400 15px/1.5 var(--font-body); color:var(--warm-400); }
        @media (max-width:760px){ .wy-grid{ grid-template-columns:1fr; max-width:440px; margin-inline:auto; gap:clamp(24px,4vh,34px); } }
      `}</style>
    </section>
  );
}
/* ---------- Affiliates §4 — "Scale with bulk tools and our API." (copy + code card) ---------- */
function ScaleApi() {
  return (
    <section id="aff-api" className="sa-sec">
      <div className="wrap">
        <div className="sa-grid">
          <div className="sa-left" data-reveal>
            <h2 className="sa-title">Scale with datafeeds <br />and our API.</h2>
            <p className="sa-body">For high-volume affiliates and agencies, generate tracking links and connect Involve to your own systems with our API, so affiliate data and links live inside your own stack.</p>
            <a className="sa-link" href="api-overview.html">
              Developer API
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 5.5l6.5 6.5L9 18.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
          <div className="sa-code" data-reveal data-reveal-delay="1">
            <div className="sa-code-bar">
              <span className="sa-dot sa-dot-r" />
              <span className="sa-dot sa-dot-y" />
              <span className="sa-dot sa-dot-g" />
              <span className="sa-file">involve_asia_api_v2.json</span>
            </div>
            <div className="sa-code-body">
              <div className="cl"><span className="c-com">{'// Initialize connection with Involve API'}</span></div>
              <div className="cl"><span className="c-txt">GET </span><span className="c-grn">https://api.involve.asia/v2/offers</span></div>
              <div className="cl"><span className="c-txt">Authorization: Bearer ia_app_key_849204</span></div>
              <div className="sa-hr" />
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
      <style>{`
        .sa-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .sa-grid{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,492px); gap:clamp(36px,5vw,80px); align-items:center; }
        .sa-left{ max-width:520px; }
        .sa-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.14; letter-spacing:-.03em; color:var(--warm-900); }
        .sa-body{ margin-top:22px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:500px; }
        .sa-link{ margin-top:26px; display:inline-flex; align-items:center; gap:8px; font:700 16px/1 var(--font-body); color:var(--warm-900); text-decoration:none; }
        .sa-link svg{ transition:transform .2s ease; }
        .sa-link:hover svg{ transform:translateX(3px); }
        .sa-code{ background:#1e1e1e; border-radius:var(--r-xl); padding:clamp(20px,2vw,27px); box-shadow:0 24px 50px rgba(15,28,46,.22); }
        .sa-code-bar{ display:flex; align-items:center; gap:7px; }
        .sa-dot{ width:10px; height:10px; border-radius:50%; flex:none; }
        .sa-dot-r{ background:#ff5f56; } .sa-dot-y{ background:#ffbd2e; } .sa-dot-g{ background:#27c93f; }
        .sa-file{ margin-left:8px; font:400 10px/1 var(--font-body); color:#7f7f7f; }
        .sa-code-body{ margin-top:17px; font-family:ui-monospace,"SF Mono",Menlo,Consolas,monospace; font-size:11.9px; line-height:17px; overflow-x:auto; }
        .sa-code-body .cl{ white-space:pre; color:#f8f8f2; }
        .sa-hr{ height:1px; background:rgba(255,255,255,.12); margin:6px 0; }
        .c-com{ color:#75715e; } .c-txt{ color:#f8f8f2; } .c-grn{ color:#a6e22e; } .c-cyan{ color:#66d9ef; } .c-yel{ color:#e6db74; } .c-pur{ color:#ae81ff; }
        @media (max-width:820px){ .sa-grid{ grid-template-columns:minmax(0,1fr); gap:32px; } }
      `}</style>
    </section>
  );
}
/* ---------- Affiliates §4b — "How it works" (3 numbered steps) — Figma 2546:45012 ---------- */
const HIW_STEPS = [
  { t: 'Find offers', d: 'Browse 4,000+ offers across 500+ brands, with the rates and terms up front.', img: 'general-hye-01.png' },
  { t: 'Add links, or pull the datafeed', d: 'Drop trackable links into your content in a couple of clicks, or feed live product data into your site to run at scale.', img: 'affp-hye-02.png' },
  { t: 'Earn on every sale', d: 'When someone buys through your link, the sale is credited to you.', img: 'general-hye-03.png' },
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
    <section id="af-how" className="hiw-sec">
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
/* ---------- Affiliates §4 — "Built to run at any scale." (tab view, reused from the
   Creator Partners tools section — pf-* pattern). Datafeed Manager / API / Creative Hub. ---------- */
const AFF_TOOLS = [
  { key: 'datafeed', t: 'Datafeed Manager', d: 'Feed live product data like prices, offers, and stock straight into your site, and keep it current automatically.', img: 'aff-partner-slide1.png?v=2',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" /><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></svg> },
  { key: 'api', t: 'API', d: 'Pull offers and conversions and generate tracking links programmatically, so affiliate data and links live inside your own systems.', img: 'aff-partner-slide2.png?v=2',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8l-4 4 4 4" /><path d="M16 8l4 4-4 4" /><path d="M13 6l-2 12" /></svg> },
  { key: 'creative', t: 'Creative Hub', d: 'Grab ready-made banners and campaign coupon codes from top brands to promote.', img: 'creator-partner-slide3.png',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg> },
];
const AFF_TOOLS_MS = 12000;
function AffTools() {
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
  const next = () => setActive((a) => (a + 1) % AFF_TOOLS.length);
  return (
    <section id="aff-tools" className="pf-sec">
      <div className="wrap">
        <h2 className="pf-title" data-reveal>Built to run at any scale.</h2>
        <p className="pf-sub" data-reveal data-reveal-delay="1">The tools that grow with your site.</p>
        <div className="pf-grid" data-reveal data-reveal-delay="1">
          <div className="pf-steps">
            {AFF_TOOLS.map((s, i) => {
              const on = i === active;
              return (
                <button type="button" className={'pf-step' + (on ? ' on' : '')} key={s.key} onClick={() => setActive(i)} aria-expanded={on} {...hoverProps(i)}>
                  <span className="pf-rail" aria-hidden="true"><span className="pf-rail-track" />{on && <span className="pf-rail-fill" key={active} onAnimationEnd={next} style={{ animationPlayState: paused ? 'paused' : 'running' }} />}</span>
                  <span className="pf-step-body">
                    <span className="pf-step-t">{s.t}</span>
                    <span className="pf-step-dw"><span className="pf-step-d">{s.d}</span></span>
                    <span className="pf-step-fig"><span className="pf-step-fig-in"><img className="cct-img-m" src={`media/figma/${s.img}`} alt={s.t} loading="lazy" /></span></span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="pf-visual">
            {AFF_TOOLS.map((s, i) => (
              <img key={s.key} className={'pf-img' + (i === active ? ' on' : '')} src={`media/figma/${s.img}`} alt={s.t} loading="lazy" aria-hidden={i !== active} />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .pf-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; overflow:hidden; }
        .pf-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .pf-sub{ text-align:center; margin-top:14px; font-size:16px; line-height:1.4; color:var(--warm-600); }
        .pf-grid{ margin-top:clamp(40px,6vh,72px); display:grid; grid-template-columns:minmax(0,412px) 1fr; gap:clamp(32px,4vw,64px); align-items:stretch; }
        .pf-steps{ display:flex; flex-direction:column; }
        .pf-step{ position:relative; display:flex; gap:20px; align-items:stretch; text-align:left; background:none; border:none; cursor:pointer; padding:30px 0; width:100%; }
        .pf-step + .pf-step{ border-top:1px solid var(--warm-200); }
        .pf-rail{ position:relative; width:4px; flex:0 0 auto; align-self:stretch; }
        .pf-rail-track{ position:absolute; inset:0; border-radius:var(--r-full); background:var(--warm-200); opacity:0; transition:opacity .3s ease; }
        .pf-rail-fill{ position:absolute; left:0; top:0; width:4px; border-radius:var(--r-full); background:var(--ember); height:0; }
        .pf-step.on .pf-rail-track{ opacity:1; }
        .pf-step.on .pf-rail-fill{ animation:affToolsFill ${AFF_TOOLS_MS}ms linear forwards; }
        @keyframes affToolsFill{ from{ height:0; } to{ height:100%; } }
        .pf-step-body{ min-width:0; }
        .pf-step-t{ display:flex; align-items:center; gap:11px; font-family:var(--font-display); font-weight:800; font-size:21px; letter-spacing:-.02em; color:var(--warm-900); }
        .pf-step-dw{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .4s ease; }
        .pf-step.on .pf-step-dw{ grid-template-rows:1fr; }
        .pf-step-d{ overflow:hidden; margin-top:0; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        .pf-step.on .pf-step-d{ margin-top:12px; }
        .pf-step:not(.on){ opacity:.4; } .pf-step:not(.on):hover{ opacity:.7; }
        .pf-visual{ position:relative; align-self:center; width:100%; aspect-ratio:5/3; overflow:hidden;
          border-radius:var(--r-xl);
          background:var(--warm-100); }
        .pf-img{ position:absolute; inset:0; width:100%; height:100%;
          object-fit:contain; object-position:center; opacity:0; transition:opacity .5s ease; }
        .pf-img.on{ opacity:1; }
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
        }
        @media (prefers-reduced-motion: reduce){ .pf-rail-fill{ animation:none; height:100%; } .pf-img{ transition:none; } .pf-step-fig{ transition:none; } }
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
        <BuiltKinds />
        <HowItWorks />
        <AffTools />
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
