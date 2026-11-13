/* ============================================================================
   get-started.jsx — "Get Started" advertiser lead-form page. All copy lives in
   content/pages/get-started/<lang>.json and arrives through useCopy.
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, LogoMarquee, useCopy } = window;

/* ---------- Section 1 — Hero ---------------------------------------------- */
/* Decorative honeycomb backdrop (shared hero art, see useHeroDecoArt in ia-shared.jsx), rendered faint. */
function PricingHexField() {
  const { paths, W, H, transform } = window.useHeroDecoArt();
  const svgRef = React.useRef(null);
  window.useHexPush(svgRef, paths);
  // pad the viewBox to shrink the whole honeycomb (renders ~1/(1+2*pad) of before), closer to Figma's inset deco
  const pad = 0.14;
  const vb = `${-W * pad} ${-H * pad} ${W * (1 + 2 * pad)} ${H * (1 + 2 * pad)}`;
  return (
    <svg ref={svgRef} className="prh-hexfield" viewBox={vb} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="var(--warm-200)" transform={transform}>{paths.map((d, i) => <path key={i} className="hx" d={d} />)}</g>
    </svg>
  );
}
/* Get Started hero — advertiser lead form (copy + fields from app.involve.asia/v2/affiliate-advertiser).
   Static: onSubmit is preventDefault (no backend wired yet).
   The option VALUES below stay English (form data); their labels come from the copy by index. */
const GS_COUNTRIES = ['Malaysia', 'Singapore', 'Indonesia', 'Thailand', 'Philippines', 'Vietnam', 'Taiwan', 'Hong Kong', 'Other'];
const GS_INDUSTRIES = ['E-commerce & Retail', 'Fashion & Apparel', 'Beauty & Personal Care', 'Electronics', 'Travel & Hospitality', 'Financial Services', 'Food & Beverage', 'Health & Wellness', 'Gaming', 'Other'];
const GS_BUDGETS = ['Under $1,000', '$1,000 – $5,000', '$5,000 – $20,000', '$20,000 – $50,000', '$50,000+'];
function PubHero({ c, f }) {
  // Plan carried from the Pricing page via ?plan= (validated against known plans; nothing else from the URL is used).
  const VALID_PLANS = ['Startup', 'Growth', 'Enterprise'];
  const rawPlan = (typeof window !== 'undefined') ? new URLSearchParams(window.location.search).get('plan') : null;
  const plan = VALID_PLANS.includes(rawPlan) ? rawPlan : null;
  const heading = plan ? c.titlePlan.replace('{plan}', plan) : c.title;
  const interestedPlan = plan || 'Not specified';
  return (
    <section id="get-started-hero" className="prh-sec gs-sec">
      <div className="prh-honey" aria-hidden="true"><PricingHexField /></div>
      <div className="wrap gs-wrap">
        <div className="gs-copy">
          <span className="prh-eyebrow" data-reveal>{c.eyebrow}</span>
          <h1 className="gs-title" data-reveal data-reveal-delay="1">{heading}</h1>
          <p className="gs-sub" data-reveal data-reveal-delay="2">{c.sub}</p>
          <div className="gs-stats" data-reveal data-reveal-delay="2">
            {c.stats.map(([n, l]) => <div className="gs-stat" key={l}><b>{n}</b><span>{l}</span></div>)}
          </div>
        </div>
        <form className="gs-form" data-reveal data-reveal-delay="1" onSubmit={(e) => e.preventDefault()}>
          {plan && <div className="gs-chip">{f.selected}<b>{f.selectedPlan.replace('{plan}', plan)}</b> <a href="pricing" className="gs-chip-change">{f.change}</a></div>}
          <input type="hidden" name="interestedPlan" value={interestedPlan} />
          <h2 className="gs-form-title">{f.title}</h2>
          <fieldset className="gs-fieldset">
            <legend className="gs-legend">{f.business}</legend>
            <label className="gs-field"><span className="gs-lbl">{f.website}</span>
              <input className="gs-input" type="url" name="websiteUrl" placeholder={f.websitePh} /></label>
            <div className="gs-2col">
              <label className="gs-field"><span className="gs-lbl">{f.country}</span>
                <select className="gs-input gs-select" name="country" defaultValue=""><option value="" disabled>{f.countryPh}</option>{GS_COUNTRIES.map((v, i) => <option key={v} value={v}>{f.countries[i]}</option>)}</select></label>
              <label className="gs-field"><span className="gs-lbl">{f.industry}</span>
                <select className="gs-input gs-select" name="industry" defaultValue=""><option value="" disabled>{f.industryPh}</option>{GS_INDUSTRIES.map((v, i) => <option key={v} value={v}>{f.industries[i]}</option>)}</select></label>
            </div>
            <div className="gs-2col">
              <label className="gs-field"><span className="gs-lbl">{f.aov}</span>
                <span className="gs-usd-wrap"><span className="gs-usd">{f.aovCurrency}</span><input className="gs-input gs-input-usd" type="number" name="aov" placeholder={f.aovPh} min="0" /></span></label>
              <label className="gs-field"><span className="gs-lbl">{f.budget}</span>
                <select className="gs-input gs-select" name="budget" defaultValue=""><option value="" disabled>{f.budgetPh}</option>{GS_BUDGETS.map((v, i) => <option key={v} value={v}>{f.budgets[i]}</option>)}</select></label>
            </div>
          </fieldset>
          <fieldset className="gs-fieldset">
            <legend className="gs-legend">{f.contact}</legend>
            <label className="gs-field"><span className="gs-lbl">{f.name}</span>
              <input className="gs-input" type="text" name="name" placeholder={f.namePh} /></label>
            <div className="gs-2col">
              <label className="gs-field"><span className="gs-lbl">{f.phone}</span>
                <input className="gs-input" type="tel" name="phone" placeholder={f.phonePh} /></label>
              <label className="gs-field"><span className="gs-lbl">{f.email}</span>
                <input className="gs-input" type="email" name="businessEmail" placeholder={f.emailPh} /></label>
            </div>
          </fieldset>
          <button type="submit" className="btn btn-advertiser btn-lg gs-submit">{f.submit} <Arrow /></button>
          <p className="gs-formnote">{f.note}</p>
        </form>
      </div>
      <style>{`
        .prh-sec{ position:relative; overflow:visible; background:var(--warm-50); padding:clamp(40px,6vh,84px) 0 clamp(44px,7vh,80px); }
        .prh-honey{ position:absolute; left:0; top:0; width:100%; height:100%; z-index:0; pointer-events:none; background:var(--warm-50); }
        .prh-hexfield{ position:absolute; inset:0; width:100%; height:100%; opacity:.105;
          -webkit-mask-image:linear-gradient(180deg, transparent 0%, #000 12%, #000 80%, transparent 100%); mask-image:linear-gradient(180deg, transparent 0%, #000 12%, #000 80%, transparent 100%); }
        .prh-hexfield .hx{ will-change:transform; }
        .prh-eyebrow{ display:inline-block; font:600 13px/1 var(--font-body); letter-spacing:.02em; color:var(--midnight-light);
          background:var(--midnight-light-tint); border-radius:var(--r-full); padding:8px 15px; }
        .gs-wrap{ position:relative; z-index:1; display:grid; grid-template-columns:1fr minmax(0,520px); gap:clamp(32px,5vw,72px); align-items:start; }
        .gs-copy{ position:sticky; top:100px; }
        .gs-title{ margin-top:24px; font-size:clamp(28px,3.6vw,44px); line-height:1.08; letter-spacing:-.03em; color:var(--warm-900); max-width:520px; }
        .gs-sub{ margin-top:20px; max-width:460px; font-size:clamp(16px,1.3vw,18px); line-height:1.55; color:var(--warm-600); }
        .gs-stats{ margin-top:clamp(28px,4vh,40px); display:flex; gap:clamp(20px,3vw,40px); flex-wrap:wrap; }
        .gs-stat b{ display:block; font-family:var(--font-display); font-weight:800; font-size:clamp(22px,2.4vw,30px); letter-spacing:-.02em; color:var(--midnight-light); }
        .gs-stat span{ display:block; margin-top:4px; font:400 13px/1.4 var(--font-body); color:var(--warm-600); }
        .gs-form{ background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-lg); box-shadow:0 24px 60px rgba(15,28,46,.10); padding:clamp(24px,3vw,34px); }
        .gs-chip{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:18px; padding:9px 14px; border-radius:var(--r-md); background:var(--midnight-light-tint); font:400 13px/1.4 var(--font-body); color:var(--warm-700); }
        .gs-chip b{ font-weight:700; color:var(--midnight-light); }
        .gs-chip-change{ margin-left:auto; color:var(--midnight-light); font-weight:700; text-decoration:underline; text-underline-offset:2px; }
        .gs-chip-change:hover{ opacity:.82; }
        .gs-form-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(20px,2vw,24px); letter-spacing:-.02em; color:var(--warm-900); }
        .gs-fieldset{ border:none; margin:0; padding:0; margin-top:22px; display:flex; flex-direction:column; gap:14px; }
        .gs-legend{ font:700 12px/1 var(--font-body); letter-spacing:.04em; text-transform:uppercase; color:var(--midnight-light); padding:0; margin-bottom:2px; }
        .gs-2col{ display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .gs-field{ display:flex; flex-direction:column; gap:6px; min-width:0; }
        .gs-lbl{ font:600 13px/1.3 var(--font-body); color:var(--warm-800); }
        .gs-input{ width:100%; border:1px solid var(--warm-200); border-radius:var(--r-sm); background:#fff; font:400 15px/1.3 var(--font-body); color:var(--warm-900); padding:11px 13px; outline:none; transition:border-color .15s, box-shadow .15s; }
        .gs-input::placeholder{ color:var(--warm-400); }
        .gs-input:focus{ border-color:var(--midnight-light); box-shadow:0 0 0 3px var(--midnight-light-tint); }
        .gs-select{ appearance:none; -webkit-appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%233D5A80' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 13px center; padding-right:34px; cursor:pointer; }
        .gs-usd-wrap{ position:relative; display:flex; align-items:center; }
        .gs-usd{ position:absolute; left:13px; font:600 13px/1 var(--font-body); color:var(--warm-400); pointer-events:none; }
        .gs-input-usd{ padding-left:46px; }
        .gs-submit{ width:100%; margin-top:22px; }
        .gs-formnote{ margin-top:12px; text-align:center; font:400 13px/1.5 var(--font-body); color:var(--warm-400); }
        @media (max-width:900px){
          .gs-wrap{ grid-template-columns:1fr; gap:32px; }
          .gs-copy{ position:static; }
          .gs-title, .gs-sub{ max-width:none; }
        }
        @media (max-width:480px){ .gs-2col{ grid-template-columns:1fr; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 2 — Logo strip ---------------------------------------- */
function PubLogos({ c }) {
  return <LogoMarquee caption={c.caption} />;
}

function PricingApp() {
  useSmoothScroll();
  useScrollReveal();
  const c = useCopy('get-started');
  return (
    <React.Fragment>
      <Nav getStartedTone="midnight" />
      <main>
        <PubHero c={c.hero} f={c.form} />
        <PubLogos c={c.logos} />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PricingApp />);
