/* ============================================================================
   earnings-estimate.jsx — "Estimate your possible earnings" entry page.
   Focused single-screen hero: a URL input + CTA over a subtle honeycomb, with a
   secondary route link at the bottom. Loaded AFTER ia-shared.jsx
   (Nav/Footer/Arrow/BackToTop/useSmoothScroll/useScrollReveal on global scope).
   Figma 2957-34847.
   ============================================================================ */

/* Subtle grey honeycomb backdrop (lower half). Reuses the shared hex-field SVG,
   filled flat grey and masked to fade toward the top so the copy stays clean. */
function EeHexField() {
  const S = 104, R = S * 0.9, W = 1440, H = 900;              // grid spacing vs draw radius (leaves a thin gap)
  const dx = S * Math.sqrt(3), dy = S * 1.5;
  const hexes = []; let row = 0;
  for (let y = -S; y < H + S; y += dy, row++) {
    const xoff = (row % 2) ? dx / 2 : 0;
    for (let x = -S; x < W + S; x += dx) {
      const cx = x + xoff, cy = y, pts = [];
      for (let k = 0; k < 6; k++) { const a = (Math.PI / 180) * (60 * k - 90); pts.push(`${(cx + R * Math.cos(a)).toFixed(1)},${(cy + R * Math.sin(a)).toFixed(1)}`); }
      hexes.push(pts.join(' '));
    }
  }
  return (
    <svg className="ee-hexfield" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {hexes.map((p, i) => <polygon key={i} points={p} />)}
    </svg>
  );
}

function EarningsHero() {
  return (
    <section className="ee-sec">
      <div className="ee-honey" aria-hidden="true"><EeHexField /></div>
      <div className="wrap ee-wrap">
        <div className="ee-top">
          <h1 className="ee-title" data-reveal>Estimate your possible earnings</h1>
          <p className="ee-sub" data-reveal data-reveal-delay="1">Have a social following, a blog, or a site with traffic? <br />Drop your link and we'll estimate what you could earn, in about a minute.</p>
          <form className="ee-form" data-reveal data-reveal-delay="2" onSubmit={(e) => e.preventDefault()}>
            <input className="ee-input" type="text" inputMode="url" placeholder="Paste your social following, blog, website url here…" aria-label="Your social following, blog, or website URL" />
            <button type="submit" className="btn btn-primary ee-cta">Estimate My Earnings <Arrow /></button>
          </form>
          <p className="ee-micro" data-reveal data-reveal-delay="2">No sign up needed. We only read what's already public, no password.</p>
        </div>
        <p className="ee-alt" data-reveal data-reveal-delay="3">Run paid traffic, an app, or a network instead? <br /><a href="for-publishers.html">See how to earn with Involve here.</a></p>
      </div>
      <style>{`
        .ee-sec{ position:relative; overflow:hidden; background:var(--warm-50); }
        .ee-honey{ position:absolute; left:0; right:0; bottom:0; height:82%; z-index:0; pointer-events:none; }
        .ee-hexfield{ position:absolute; inset:0; width:100%; height:100%; opacity:.15;
          -webkit-mask-image:linear-gradient(180deg, transparent 0%, #000 58%);
          mask-image:linear-gradient(180deg, transparent 0%, #000 58%); }
        .ee-hexfield polygon{ fill:var(--warm-200); }
        .ee-wrap{ position:relative; z-index:1; min-height:calc(100vh - 74px); display:flex; flex-direction:column; align-items:center; text-align:center;
          padding:clamp(56px,12vh,140px) 0 clamp(32px,5vh,56px); }
        .ee-top{ display:flex; flex-direction:column; align-items:center; width:100%; }
        .ee-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(28px,4.4vw,50px); line-height:1.0; letter-spacing:-.03em; color:var(--warm-900); }
        .ee-sub{ margin:clamp(20px,3vh,30px) auto 0; max-width:780px; font:400 clamp(16px,1.4vw,19px)/1.55 var(--font-body); color:var(--warm-600); }
        .ee-form{ display:flex; align-items:center; gap:8px; width:min(720px,100%); margin:clamp(28px,4.5vh,46px) auto 0;
          background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-md); box-shadow:0 12px 34px rgba(15,28,46,.07); padding:7px 7px 7px 6px; }
        .ee-input{ flex:1; min-width:0; border:none; outline:none; background:transparent; font:400 16px/1.4 var(--font-body); color:var(--warm-900); padding:14px 18px; }
        .ee-input::placeholder{ color:var(--warm-400); }
        .ee-cta{ flex:0 0 auto; white-space:nowrap; }
        .ee-micro{ margin-top:clamp(16px,2.2vh,22px); font:400 15px/1.5 var(--font-body); color:var(--warm-900); }
        .ee-alt{ margin-top:auto; padding-top:clamp(36px,7vh,72px); font:400 16px/1.6 var(--font-body); color:var(--warm-600); }
        .ee-alt a{ color:var(--ember); font-weight:700; text-decoration:underline; text-underline-offset:3px; }
        .ee-alt a:hover{ opacity:.85; }
        @media (max-width:600px){
          .ee-wrap{ min-height:calc(100vh - 64px); padding-top:clamp(40px,9vh,80px); }
          .ee-form{ flex-direction:column; gap:10px; border-radius:var(--r-xl); padding:12px; }
          .ee-input{ width:100%; text-align:center; padding:12px 10px; }
          .ee-cta{ width:100%; justify-content:center; }
          .ee-sub br, .ee-alt br{ display:none; }
        }
      `}</style>
    </section>
  );
}

function EarningsApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main><EarningsHero /></main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<EarningsApp />);
