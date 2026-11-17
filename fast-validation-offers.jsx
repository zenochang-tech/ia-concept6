/* ============================================================================
   fast-validation-offers.jsx — "Fast Validation Offers" page (Publisher).
   Rebuilt from the live involve.asia/partners/fast-validation-offers/ page in our
   design system: hero, three reasons, the filterable brand list, final CTA.
   All copy and the brand list live in content/pages/fast-validation-offers/<lang>.json
   and arrive through useCopy. Brand logos stay on the CMS uploads (FVO_IMG), the same
   way the Blog page shows post images. Loaded AFTER ia-shared.jsx and ia-sections.jsx.
   ============================================================================ */

const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, FinalCta, HeroHexGrid, HERO_HEXGRID_CSS, useCopy } = window;

const FVO_IMG = 'https://involve.asia/wp-content/uploads/';
const FVO_FIRST = 12;   // brands shown before "Show all"
const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));

/* ---------- Section 1 — Hero ---------------------------------------------- */
function FvoHero({ c }) {
  return (
    <section id="fvo-hero" className="ph-sec">
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <HeroHexGrid />
        <div className="ph-copy">
          <span className="ph-eyebrow" data-reveal>{c.eyebrow}</span>
          <h1 className="ph-title" data-reveal>{c.title}</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="1">{c.sub}</p>
          <ul className="fvo-pills" data-reveal data-reveal-delay="1">
            {c.pills.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <div className="ph-actions" data-reveal data-reveal-delay="2">
            <a href="#fvo-brands" className="btn btn-primary btn-lg">{c.cta} <Arrow /></a>
          </div>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo"><img src="media/figma/affiliates-hero.png" alt={c.imageAlt} loading="eager" /></div>
          <div className="ph-static-ui" data-reveal data-reveal-delay="2">
            <div className="ph-glass ph-g-pay-a"><div className="ph-pay"><span>{c.badgeLabel}</span><b>{c.badgeValue}</b></div></div>
          </div>
        </div>
      </div>

      <style>{`
        .ph-sec{ position:relative; isolation:isolate; overflow:hidden; background:var(--warm-50); padding:clamp(40px,6vh,84px) 0 clamp(56px,9vh,116px); }
        ${HERO_HEXGRID_CSS}
        .ph-basefade{ position:absolute; left:0; right:0; bottom:0; height:clamp(120px,24%,240px); z-index:0; pointer-events:none;
          background:linear-gradient(180deg, rgba(250,250,248,0) 0%, rgba(250,250,248,.65) 55%, var(--warm-50) 100%); }
        .ph-wrap{ position:relative; display:grid; grid-template-columns:1.02fr .98fr; gap:clamp(24px,4vw,60px); align-items:center; }
        .ph-copy{ min-width:0; }
        .ph-eyebrow{ display:inline-block; font:600 13px/1 var(--font-body); letter-spacing:.02em; color:var(--ember-dark);
          background:var(--ember-tint); border-radius:var(--r-full); padding:8px 15px; }
        .ph-title{ margin-top:20px; font-size:clamp(28px,4.4vw,50px); line-height:1.0; letter-spacing:-.03em; color:var(--warm-900); }
        .ph-sub{ margin-top:20px; max-width:520px; font-size:clamp(16px,1.4vw,19px); line-height:1.55; color:var(--warm-600); }
        .fvo-pills{ list-style:none; margin:22px 0 0; padding:0; display:flex; flex-wrap:wrap; gap:8px; }
        .fvo-pills li{ font:600 13px/1 var(--font-body); color:var(--warm-900); background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-full); padding:9px 14px; }
        .ph-actions{ margin-top:30px; display:flex; gap:12px; flex-wrap:wrap; }
        .ph-visual{ position:relative; aspect-ratio:1/1; max-width:520px; width:100%; margin-left:auto; }
        .ph-hexplate{ position:absolute; inset:0; z-index:0; background:var(--warm-150);
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat;
          filter:drop-shadow(0 26px 54px rgba(15,28,46,.10)); }
        .ph-photo{ position:absolute; inset:0; z-index:1;
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; }
        .ph-photo img{ width:100%; height:100%; object-fit:cover; display:block; }
        .ph-static-ui{ position:absolute; inset:0; z-index:3; pointer-events:none; }
        .ph-glass{ position:absolute; padding:7px; border-radius:var(--r-xl); background:rgba(255,255,255,.30);
          -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px); box-shadow:0 14px 34px rgba(15,28,46,.12); }
        .ph-g-pay-a{ left:-7%; top:55%; }
        .ph-pay{ display:flex; align-items:center; justify-content:space-between; gap:16px; background:#fff; border-radius:var(--r-lg); box-shadow:0 2px 6px rgba(15,28,46,.08); padding:9px 14px; white-space:nowrap; }
        .ph-pay span{ font:500 13px/1 var(--font-body); color:var(--warm-800); }
        .ph-pay b{ font-family:var(--font-display); font-weight:800; font-size:15px; color:var(--warm-900); }
        @media (max-width:900px){
          .ph-wrap{ grid-template-columns:1fr; gap:36px; }
          .ph-copy{ text-align:center; display:flex; flex-direction:column; align-items:center; }
          .ph-sub{ margin-left:auto; margin-right:auto; }
          .fvo-pills{ justify-content:center; }
          .ph-sec{ padding-top:12px; }
          .ph-visual{ order:-1; width:85%; max-width:357px; margin:0 auto; justify-self:center; }
          .ph-glass{ scale:.85; transform-origin:left center; }
          .ph-g-pay-a{ left:0; top:65%; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 2 — Why fast validation (three numbered cards) -------- */
function FvoWhy({ c }) {
  return (
    <section id="fvo-why" className="fw-sec">
      <div className="wrap">
        <div className="fw-head">
          <h2 className="fw-title" data-reveal>{c.title}</h2>
          <p className="fw-sub" data-reveal data-reveal-delay="1">{c.sub}</p>
        </div>
        <ol className="fw-grid">
          {c.items.map((it, i) => (
            <li className="fw-card" key={i} data-reveal data-reveal-delay={String(i + 1)}>
              <span className="fw-n" aria-hidden="true">{i + 1}</span>
              <h3 className="fw-h">{it.title}</h3>
              <p className="fw-p">{it.body}</p>
            </li>
          ))}
        </ol>
        <a className="btn btn-ghost fw-more" href={c.moreHref} target="_blank" rel="noopener noreferrer" data-reveal>{c.more} <Arrow /></a>
      </div>
      <style>{`
        .fw-sec{ background:var(--warm-50); padding:clamp(56px,9vh,104px) 0; }
        .fw-head{ text-align:center; max-width:680px; margin:0 auto; }
        .fw-title{ font-size:clamp(26px,3.4vw,40px); line-height:1.08; letter-spacing:-.03em; color:var(--warm-900); }
        .fw-sub{ margin-top:14px; font-size:17px; line-height:1.55; color:var(--warm-600); }
        .fw-grid{ list-style:none; margin:clamp(32px,5vh,52px) 0 0; padding:0; display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:20px; }
        .fw-card{ background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-lg); box-shadow:var(--shadow-sm); padding:clamp(22px,2.4vw,30px); }
        .fw-n{ display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:var(--r-md); background:var(--ember-tint); color:var(--ember-dark); font:800 16px/1 var(--font-display); }
        .fw-h{ margin-top:18px; font-size:19px; line-height:1.25; letter-spacing:-.01em; color:var(--warm-900); }
        .fw-p{ margin-top:10px; font-size:15px; line-height:1.6; color:var(--warm-600); }
        .fw-more{ display:flex; width:max-content; margin:26px auto 0; color:var(--ember-dark); }
        @media (max-width:860px){ .fw-grid{ grid-template-columns:1fr; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 3 — Fast-validation brands (filterable list) ---------- */
function FvoBrands({ c }) {
  const [country, setCountry] = React.useState('all');
  const [industry, setIndustry] = React.useState('all');
  const [all, setAll] = React.useState(false);
  const matches = c.items.filter((b) => (country === 'all' || b.country === country) && (industry === 'all' || b.industry === industry));
  const shown = all ? matches : matches.slice(0, FVO_FIRST);
  const pick = (set) => (e) => { set(e.target.value); setAll(false); };
  return (
    <section id="fvo-brands" className="fb-sec">
      <div className="wrap">
        <div className="fb-head">
          <h2 className="fb-title" data-reveal>{c.title}</h2>
          <p className="fb-sub" data-reveal data-reveal-delay="1">{c.sub}</p>
        </div>
        <div className="fb-bar" data-reveal>
          <label className="fb-field">
            <span className="fb-lbl">{c.countryLabel}</span>
            <select className="fb-select" value={country} onChange={pick(setCountry)}>
              {c.countries.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </label>
          <label className="fb-field">
            <span className="fb-lbl">{c.industryLabel}</span>
            <select className="fb-select" value={industry} onChange={pick(setIndustry)}>
              {c.industries.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </label>
          <span className="fb-count" aria-live="polite">{fill(c.count, { n: matches.length })}</span>
        </div>
        {shown.length ? (
          <ul className="fb-grid">
            {shown.map((b) => (
              <li className="fb-card" key={b.href}>
                <span className="fb-logo"><img src={FVO_IMG + b.logo} alt={fill(c.logoAlt, { name: b.name })} loading="lazy" /></span>
                <span className="fb-body">
                  <b className="fb-name">{b.name}</b>
                  <span className="fb-days">{fill(c.fast, { days: b.days })}</span>
                </span>
                <a className="fb-view" href={b.href} target="_blank" rel="noopener noreferrer" aria-label={fill(c.viewAria, { name: b.name })}>{c.view} <Arrow s={14} /></a>
              </li>
            ))}
          </ul>
        ) : <p className="fb-empty">{c.empty}</p>}
        {matches.length > shown.length && (
          <button type="button" className="btn btn-secondary fb-all" onClick={() => setAll(true)}>{fill(c.showAll, { n: matches.length })}</button>
        )}
      </div>
      <style>{`
        .fb-sec{ background:var(--warm-100); padding:clamp(56px,9vh,104px) 0; scroll-margin-top:80px; }
        .fb-head{ text-align:center; max-width:680px; margin:0 auto; }
        .fb-title{ font-size:clamp(26px,3.4vw,40px); line-height:1.08; letter-spacing:-.03em; color:var(--warm-900); }
        .fb-sub{ margin-top:14px; font-size:17px; line-height:1.55; color:var(--warm-600); }
        .fb-bar{ margin-top:clamp(28px,4vh,40px); display:flex; flex-wrap:wrap; align-items:flex-end; gap:14px; }
        .fb-field{ display:flex; flex-direction:column; gap:6px; min-width:200px; }
        .fb-lbl{ font:600 13px/1 var(--font-body); color:var(--warm-900); }
        .fb-select{ appearance:none; -webkit-appearance:none; height:44px; padding:0 40px 0 14px; border:1px solid var(--warm-200); border-radius:var(--r-md); background:#fff
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23706F6B' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center;
          font:500 15px/1 var(--font-body); color:var(--warm-900); cursor:pointer; }
        .fb-select:focus-visible{ outline:2px solid var(--ember); outline-offset:2px; border-color:var(--ember); }
        .fb-count{ margin-left:auto; padding-bottom:12px; font:600 14px/1 var(--font-body); color:var(--warm-400); }
        .fb-grid{ list-style:none; margin:20px 0 0; padding:0; display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; }
        .fb-card{ display:grid; grid-template-columns:56px minmax(0,1fr); grid-template-rows:auto auto; column-gap:14px; row-gap:12px; align-items:center;
          background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-lg); box-shadow:var(--shadow-sm); padding:16px; }
        .fb-logo{ width:56px; height:56px; border-radius:var(--r-md); border:1px solid var(--warm-200); background:#fff; display:flex; align-items:center; justify-content:center; overflow:hidden; }
        .fb-logo img{ max-width:84%; max-height:84%; object-fit:contain; display:block; }
        .fb-body{ min-width:0; display:flex; flex-direction:column; gap:6px; }
        .fb-name{ font:700 15px/1.3 var(--font-body); color:var(--warm-900); overflow-wrap:anywhere; }
        .fb-days{ align-self:flex-start; font:600 12px/1 var(--font-body); color:var(--ember-dark); background:var(--ember-tint); border-radius:var(--r-full); padding:6px 10px; }
        .fb-view{ grid-column:1 / -1; display:inline-flex; align-items:center; justify-content:center; gap:6px; height:38px; border:1px solid var(--warm-200); border-radius:var(--r-md);
          font:600 14px/1 var(--font-body); color:var(--warm-900); text-decoration:none; background:var(--warm-50); }
        .fb-view:hover{ background:var(--warm-100); }
        .fb-all{ display:flex; margin:26px auto 0; }
        .fb-empty{ margin-top:28px; text-align:center; font-size:15px; color:var(--warm-600); }
        @media (max-width:1000px){ .fb-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); } }
        @media (max-width:640px){
          .fb-grid{ grid-template-columns:1fr; }
          .fb-field{ flex:1 1 100%; }
          .fb-count{ margin-left:0; padding-bottom:0; }
        }
      `}</style>
    </section>
  );
}

function FastValidationApp() {
  useSmoothScroll();
  useScrollReveal();
  const c = useCopy('fast-validation-offers');
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <FvoHero c={c.hero} />
        <FvoWhy c={c.why} />
        <FvoBrands c={c.brands} />
        <FinalCta title={c.cta.title} href={c.cta.href} label={c.cta.label} />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<FastValidationApp />);
