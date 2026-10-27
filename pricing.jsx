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
/* Decorative honeycomb reused from the final CTA (pub-cta-hexfield.svg), rendered faint blue. */
function PricingHexField() {
  const [paths, setPaths] = React.useState([]);
  const W = 1204.11, H = 1189.86;
  // pad the viewBox to shrink the whole honeycomb (renders ~1/(1+2*pad) of before), closer to Figma's inset deco
  const pad = 0.14;
  const vb = `${-W * pad} ${-H * pad} ${W * (1 + 2 * pad)} ${H * (1 + 2 * pad)}`;
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
  return (
    <svg className="prh-hexfield" viewBox={vb} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="var(--warm-200)">{paths.map((d, i) => <path key={i} className="hx" d={d} />)}</g>
    </svg>
  );
}
function PubHero() {
  return (
    <section id="pricing-hero" className="prh-sec">
      {/* honeycomb backdrop (same field as the final CTA) — spans the hero + plan cards */}
      <div className="prh-honey" aria-hidden="true"><PricingHexField /></div>
      <div className="wrap prh-wrap">
        <span className="prh-eyebrow" data-reveal>Affiliate Marketing Pricing for Advertisers</span>
        <h1 className="prh-title" data-reveal data-reveal-delay="1">The plan that fits your growth.</h1>
        <p className="prh-sub" data-reveal data-reveal-delay="2">Whether you are launching your first program or scaling an established one,<br />pick the plan that matches your stage.</p>
      </div>
      <style>{`
        .prh-sec{ position:relative; overflow:visible; background:var(--warm-50); padding:clamp(48px,7vh,100px) 0 clamp(36px,5.5vh,64px); }
        /* honeycomb backdrop spans down behind the plan-cards section (which is transparent) */
        .prh-honey{ position:absolute; left:0; top:0; width:100%; height:clamp(960px,118vh,1280px); z-index:0; pointer-events:none; background:var(--warm-50); }
        .prh-hexfield{ position:absolute; inset:0; width:100%; height:100%; opacity:.105;
          -webkit-mask-image:linear-gradient(180deg, transparent 0%, #000 12%, #000 80%, transparent 100%); mask-image:linear-gradient(180deg, transparent 0%, #000 12%, #000 80%, transparent 100%); }
        .prh-hexfield .hx{ will-change:transform; }
        .prh-wrap{ position:relative; z-index:1; text-align:center; }
        .prh-eyebrow{ display:inline-block; font:600 13px/1 var(--font-body); letter-spacing:.02em; color:var(--midnight-light);
          background:var(--midnight-light-tint); border-radius:var(--r-full); padding:8px 15px; }
        .prh-title{ margin-top:30px; font-size:clamp(28px,4.2vw,50px); line-height:1.08; letter-spacing:-.03em; color:var(--warm-900); }
        .prh-sub{ margin:26px auto 0; max-width:730px; font-size:16px; line-height:1.35; color:var(--warm-600); }
      `}</style>
    </section>
  );
}


/* ---------- Section 1b — Plan cards (Startup / Growth / Enterprise) -------- */
const PRICING_PLANS = [
  { key: 'startup', name: 'Startup', desc: 'For brands launching their first affiliate program.',
    price: '$99', unit: '/mo', cta: 'Get started', href: '/advertisers/',
    feats: ['Track up to 100,000 clicks a month', '1 offer setup', 'Single-tier commission', 'Access to the publisher marketplace', 'Dashboard access', 'Helpdesk support'] },
  { key: 'growth', name: 'Growth', desc: 'For brands ready to make affiliates a core growth channel.',
    price: '$499', unit: '/mo', cta: 'Get started', href: '/advertisers/', recommended: true,
    plus: 'Everything in Startup, plus:',
    feats: ['Track up to 1,000,000 clicks a month', 'Up to 3 offer setups', 'Multi-tier commission', 'Up to 3 recruitment campaigns a month', 'Publisher introductions', 'A dedicated account manager', 'Quarterly performance review'] },
  { key: 'enterprise', name: 'Enterprise', desc: 'For large brands with high volumes or custom requirements.',
    price: 'Custom', priceNote: 'Volume-based pricing.', cta: 'Talk to us', href: '/advertisers/',
    plus: 'Everything in Growth, plus:',
    feats: ['A dedicated account manager and priority support', 'Custom volumes, offers, and reporting built around your goals.'] },
];
function PlanCheck() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>);
}
function PricingPlans() {
  return (
    <section id="pricing-plans" className="pp-sec">
      <div className="wrap">
        <div className="pp-grid" data-reveal>
          {PRICING_PLANS.map((p) => (
            <div className={'pp-card' + (p.recommended ? ' pp-rec' : '')} key={p.key}>
              {p.recommended && <span className="pp-badge">Recommended</span>}
              <h3 className="pp-name">{p.name}</h3>
              <p className="pp-desc">{p.desc}</p>
              <div className="pp-price"><span className="pp-amt">{p.price}</span>{p.unit && <span className="pp-unit">{p.unit}</span>}</div>
              {p.priceNote && <p className="pp-pricenote">{p.priceNote}</p>}
              <span className="pp-divider" aria-hidden="true" />
              {p.plus && <p className="pp-plus">{p.plus}</p>}
              <ul className="pp-feats">
                {p.feats.map((f, i) => (<li key={i}><span className="pp-chk" aria-hidden="true"><PlanCheck /></span>{f}</li>))}
              </ul>
              <a href={`get-started.html?plan=${encodeURIComponent(p.name)}`} className="btn btn-advertiser btn-lg pp-cta">{p.cta} <Arrow /></a>
            </div>
          ))}
        </div>
        <p className="pp-terms" data-reveal>All plans include a one-time $1,000 setup and launch fee and a 3-month minimum term.</p>
      </div>
      <style>{`
        .pp-sec{ position:relative; background:transparent; padding:clamp(44px,7vh,80px) 0 clamp(56px,9vh,112px); }
        .pp-terms{ text-align:center; margin-top:clamp(24px,3.4vh,36px); font:400 14px/1.5 var(--font-body); color:var(--warm-600); }
        .pp-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:24px; align-items:stretch; max-width:1120px; margin:0 auto; }
        .pp-card{ position:relative; display:flex; flex-direction:column; background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-xl);
          padding:34px 30px; box-shadow:0 14px 34px rgba(15,28,46,.05); }
        .pp-rec{ margin-top:-24px; padding-top:52px; border-color:transparent; box-shadow:0 30px 68px rgba(15,28,46,.16); z-index:2; }
        .pp-badge{ position:absolute; top:18px; left:50%; transform:translateX(-50%); background:var(--midnight); color:#fff;
          font:700 12px/1 var(--font-body); letter-spacing:.03em; text-transform:uppercase; padding:8px 16px; border-radius:var(--r-full); white-space:nowrap; }
        .pp-name{ font-family:var(--font-display); font-weight:800; font-size:24px; letter-spacing:-.01em; color:var(--warm-900); }
        .pp-desc{ margin-top:8px; font:400 14px/1.45 var(--font-body); color:var(--warm-600); min-height:41px; }
        .pp-price{ margin-top:20px; display:flex; align-items:baseline; gap:6px; }
        .pp-amt{ font-family:var(--font-display); font-weight:800; font-size:48px; line-height:1; letter-spacing:-.02em; color:var(--midnight-light); }
        .pp-unit{ font:500 16px/1 var(--font-body); color:#9a938c; }
        .pp-pricenote{ margin-top:8px; font:400 14px/1.4 var(--font-body); color:var(--warm-600); }
        .pp-divider{ display:block; height:1px; background:var(--warm-200); margin:22px 0; }
        .pp-plus{ font:700 12px/1.3 var(--font-body); letter-spacing:.03em; text-transform:uppercase; color:var(--midnight-light); margin-bottom:14px; }
        .pp-feats{ display:flex; flex-direction:column; gap:12px; margin-bottom:26px; }
        .pp-feats li{ display:flex; align-items:flex-start; gap:11px; font:400 15px/1.4 var(--font-body); color:var(--warm-800); }
        .pp-chk{ flex:0 0 auto; width:20px; height:20px; margin-top:1px; color:var(--midnight-light); }
        .pp-chk svg{ width:100%; height:100%; display:block; }
        .pp-cta{ margin-top:26px; width:100%; }
        .pp-rec .pp-cta{ margin-top:26px; }
        .pp-card > .pp-cta{ margin-top:auto; }
        @media (max-width:900px){
          .pp-grid{ grid-template-columns:1fr; gap:20px; max-width:460px; }
          .pp-rec{ margin-top:0; padding-top:52px; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 1c — "Compare our partnership levels" table ----------- */
// cell value: true = check, false = dash, string = text
const CMP_ROWS = [
  ['Monthly price', '$99', '$499', 'Custom'],
  ['Clicks tracked a month', 'Up to 100,000', 'Up to 1,000,000', 'Custom'],
  ['Offer setups', '1', 'Up to 3', 'Custom'],
  ['Commission structure', 'Single-tier', 'Multi-tier', 'Multi-tier'],
  ['Recruitment campaigns a month', false, 'Up to 3', 'Custom'],
  ['Publisher introductions', false, true, true],
  ['Dedicated account manager', false, true, true],
  ['Priority support', false, false, true],
  ['Quarterly performance review', false, true, true],
  ['Custom offers and reporting', false, false, true],
  ['Publisher marketplace access', true, true, true],
  ['Verified conversions and fraud protection', true, true, true],
  ['Setup and launch fee', '$1,000 one-time', '$1,000 one-time', '$1,000 one-time'],
  ['Minimum term', '3 months', '3 months', '3 months'],
  ['Support', 'Helpdesk', 'Dedicated manager', 'Dedicated manager and priority'],
];
function PricingCompare() {
  const cell = (v) => v === true
    ? <span className="cmp-chk" aria-label="Included"><PlanCheck /></span>
    : v === false ? <span className="cmp-dash" aria-label="Not included">×</span> : v;
  return (
    <section id="pricing-compare" className="cmp-sec">
      <div className="wrap">
        <div className="cmp-head" data-reveal>
          <span className="cmp-eyebrow">Pricing Plans</span>
          <h2 className="cmp-title">Compare our partnership levels</h2>
          <p className="cmp-sub">Simple, transparent pricing engineered to scale your affiliate channel.</p>
        </div>
        <div className="cmp-scroll" data-reveal data-reveal-delay="1">
          <div className="cmp-table">
            <div className="cmp-row cmp-hrow">
              <div className="cmp-c cmp-label-h">Platform features</div>
              <div className="cmp-c cmp-plan">
                <span className="cmp-plan-name">Startup</span>
                <span className="cmp-plan-price">$99<small>/mo</small></span>
                <a href="/advertisers/" className="btn btn-secondary cmp-cta">Get started</a>
              </div>
              <div className="cmp-c cmp-plan cmp-rec">
                <span className="cmp-recbadge">Recommended</span>
                <span className="cmp-plan-name">Growth</span>
                <span className="cmp-plan-price">$499<small>/mo</small></span>
                <a href="/advertisers/" className="btn btn-advertiser cmp-cta">Get started</a>
              </div>
              <div className="cmp-c cmp-plan">
                <span className="cmp-plan-name">Enterprise</span>
                <span className="cmp-plan-price cmp-custom">Custom</span>
                <a href="/advertisers/" className="btn btn-secondary cmp-cta">Talk to sales</a>
              </div>
            </div>
            {CMP_ROWS.map((r, i) => (
              <div className="cmp-row" key={i}>
                <div className="cmp-c cmp-label">{r[0]}</div>
                <div className="cmp-c">{cell(r[1])}</div>
                <div className={'cmp-c cmp-rec' + (i === CMP_ROWS.length - 1 ? ' cmp-rec-last' : '')}>{i === CMP_ROWS.length - 1 ? <b>{cell(r[2])}</b> : cell(r[2])}</div>
                <div className="cmp-c">{cell(r[3])}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .cmp-sec{ background:var(--warm-50); padding:clamp(56px,9vh,110px) 0; }
        .cmp-head{ text-align:center; max-width:720px; margin:0 auto clamp(30px,4.6vh,52px); }
        .cmp-eyebrow{ display:inline-block; font:700 12px/1 var(--font-body); letter-spacing:.08em; text-transform:uppercase; color:var(--midnight-light); background:var(--midnight-light-tint); border-radius:var(--r-full); padding:7px 14px; }
        .cmp-title{ margin-top:16px; font-size:clamp(24px,3vw,34px); line-height:1.1; letter-spacing:-.02em; color:var(--warm-900); }
        .cmp-sub{ margin-top:12px; font-size:16px; line-height:1.4; color:var(--warm-600); }
        .cmp-scroll{ overflow-x:auto; scrollbar-width:thin; }
        .cmp-table{ display:flex; flex-direction:column; min-width:0; max-width:1080px; margin:0 auto;
          background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-xl); overflow:hidden; }
        .cmp-row{ display:grid; grid-template-columns:minmax(220px,1.6fr) repeat(3,minmax(140px,1fr)); }
        .cmp-c{ padding:15px 18px; display:flex; align-items:center; justify-content:center; text-align:center;
          font:400 15px/1.45 var(--font-body); color:var(--warm-800); border-top:1px solid var(--warm-100); }
        .cmp-label{ justify-content:flex-start; text-align:left; color:var(--warm-900); }
        /* recommended (Growth) column tint + top accent */
        .cmp-rec{ background:rgba(61,90,128,.05); }
        .cmp-hrow .cmp-rec{ box-shadow:inset 0 4px 0 var(--midnight); }
        .cmp-rec-last{ border-bottom-left-radius:0; }
        /* header row */
        .cmp-hrow .cmp-c{ border-top:none; align-items:flex-end; padding-top:30px; padding-bottom:22px; }
        .cmp-label-h{ justify-content:flex-start !important; text-align:left; font:700 12px/1 var(--font-body); letter-spacing:.06em; text-transform:uppercase; color:#9a938c; }
        .cmp-plan{ flex-direction:column; align-items:center !important; justify-content:flex-start !important; gap:6px; position:relative; padding-top:30px !important; }
        .cmp-recbadge{ display:inline-block; background:var(--midnight); color:#fff; font:700 11px/1 var(--font-body); letter-spacing:.03em; text-transform:uppercase; padding:6px 12px; border-radius:var(--r-full); margin-bottom:2px; }
        .cmp-plan-name{ font-family:var(--font-display); font-weight:800; font-size:20px; letter-spacing:-.01em; color:var(--warm-900); }
        .cmp-plan-price{ font-family:var(--font-display); font-weight:800; font-size:26px; line-height:1; letter-spacing:-.02em; color:var(--midnight-light); }
        .cmp-plan-price.cmp-custom{ font-size:24px; }
        .cmp-plan-price small{ font:500 13px/1 var(--font-body); color:#9a938c; margin-left:3px; }
        .cmp-cta{ margin-top:10px; width:100%; max-width:190px; }
        .cmp-chk{ display:inline-flex; width:20px; height:20px; color:var(--midnight-light); }
        .cmp-chk svg{ width:100%; height:100%; display:block; }
        .cmp-dash{ color:#c4beb6; }
        /* Awin-style mobile: no side-scroll — feature label sits full-width above the three
           plan values; Growth column stays tinted; plan CTAs (on the cards above) are hidden. */
        @media (max-width:820px){
          .cmp-scroll{ overflow:visible; }
          .cmp-table{ min-width:0; }
          .cmp-row{ grid-template-columns:repeat(3,1fr); }
          .cmp-label{ grid-column:1 / -1; justify-content:flex-start; text-align:left; padding:14px 16px 4px; font:700 14px/1.35 var(--font-body); color:var(--warm-900); }
          .cmp-label-h{ display:none; }
          .cmp-cta{ display:none; }
          .cmp-hrow .cmp-c{ padding-top:18px; padding-bottom:16px; align-items:center; }
          .cmp-plan{ padding-top:18px !important; gap:3px; }
          .cmp-plan-name{ font-size:14px; }
          .cmp-plan-price{ font-size:18px; }
          .cmp-plan-price.cmp-custom{ font-size:15px; }
          .cmp-plan-price small{ font-size:11px; }
          .cmp-recbadge{ font-size:10.5px; padding:4px 8px; margin-bottom:1px; }
          .cmp-c{ padding:9px 8px; font-size:12px; line-height:1.35; }
          .cmp-row:not(.cmp-hrow) .cmp-c{ border-top:none; }
          .cmp-row:not(.cmp-hrow){ border-top:1px solid var(--warm-100); }
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 1d — "Get a free growth audit" dark band -------------- */
function PricingAudit() {
  return (
    <section id="pricing-audit" className="pa-sec">
      <div className="wrap">
        <div className="pa-band" data-reveal>
          <img className="pa-bg" src="media/figma/pricing-audit-bg.png" alt="" aria-hidden="true" />
          <span className="pa-spark" aria-hidden="true"><img src="media/figma/pricing-audit-spark.svg" alt="" /></span>
          <div className="pa-copy">
            <h2 className="pa-title">Not sure which plan fits? Get a free growth audit.</h2>
            <p className="pa-sub">Drop your website and we'll show your reach, the plan that fits, and publishers ready to promote you.</p>
          </div>
          <a href="/advertisers/" className="btn btn-advertiser btn-lg pa-cta">Get my free audit <Arrow /></a>
        </div>
      </div>
      <style>{`
        .pa-sec{ background:var(--warm-50); padding:clamp(10px,2vh,28px) 0; }
        .pa-band{ position:relative; overflow:hidden; display:flex; align-items:center; gap:clamp(18px,2.6vw,36px);
          border:1px solid #e8e8e2; border-radius:var(--r-xl); padding:clamp(28px,3.2vw,40px) clamp(28px,4vw,56px); }
        .pa-bg{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:0; pointer-events:none; }
        .pa-spark{ position:relative; z-index:1; flex:0 0 auto; width:clamp(34px,3.4vw,52px); }
        .pa-spark img{ width:100%; height:100%; display:block; }
        .pa-copy{ position:relative; z-index:1; flex:1 1 auto; min-width:0; }
        .pa-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(19px,1.9vw,24px); line-height:1.2; letter-spacing:-.01em; color:#fff; }
        .pa-sub{ margin-top:7px; font:400 15px/1.45 var(--font-body); color:rgba(255,255,255,.72); max-width:640px; }
        .pa-cta{ position:relative; z-index:1; flex:0 0 auto; }
        @media (max-width:760px){
          .pa-band{ flex-direction:column; align-items:flex-start; gap:18px; }
          .pa-cta{ align-self:stretch; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 1e — "Every plan comes with the essentials" ----------- */
const PR_ESSENTIALS = [
  { icon: 'users', title: '1,000,000+ publishers', desc: 'Access to over 1,000,000 publishers across retail, travel, beauty, finance, and more.' },
  { icon: 'activity', title: 'Precision tracking', desc: 'Real tracking, down to every click and conversion, in one dashboard.' },
  { icon: 'shield', title: 'Conversion verification', desc: 'Every conversion verified before you pay.' },
  { icon: 'chat', title: 'Dedicated human support', desc: 'Real human support, from day one.' },
];
function EssIcon({ name }) {
  const p = {
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  }[name];
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
}
function PricingEssentials() {
  return (
    <section id="pricing-essentials" className="ess-sec">
      <div className="wrap">
        <h2 className="ess-title" data-reveal>Every plan comes with the essentials.</h2>
        <div className="ess-grid" data-reveal data-reveal-delay="1">
          {PR_ESSENTIALS.map((e) => (
            <div className="ess-card" key={e.title}>
              <span className="ess-ic" aria-hidden="true"><EssIcon name={e.icon} /></span>
              <h3 className="ess-ct">{e.title}</h3>
              <p className="ess-cd">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .ess-sec{ background:var(--warm-50); padding:clamp(48px,8vh,100px) 0; }
        .ess-title{ text-align:center; font-size:clamp(24px,3vw,34px); line-height:1.1; letter-spacing:-.02em; color:var(--warm-900); }
        .ess-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:20px; max-width:1120px; margin:clamp(36px,5vh,56px) auto 0; }
        .ess-card{ background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-lg); padding:26px 24px; box-shadow:0 10px 26px rgba(15,28,46,.04); }
        .ess-ic{ display:inline-flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:var(--r-xl); background:var(--midnight-light-tint); color:var(--midnight-light); }
        .ess-ic svg{ width:20px; height:20px; display:block; }
        .ess-ct{ margin-top:18px; font-family:var(--font-display); font-weight:800; font-size:17px; line-height:1.25; letter-spacing:-.01em; color:var(--warm-900); }
        .ess-cd{ margin-top:10px; font:400 14px/1.5 var(--font-body); color:var(--warm-600); }
        @media (max-width:900px){ .ess-grid{ grid-template-columns:repeat(2,1fr); } }
        @media (max-width:520px){ .ess-grid{ grid-template-columns:1fr; max-width:400px; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 1f — "How pricing works, in two clear parts" ---------- */
function HowArrow() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>);
}
function PricingHow() {
  return (
    <section id="pricing-how" className="how-sec">
      <div className="wrap">
        <h2 className="how-title" data-reveal>How pricing works, in two clear parts.</h2>
        <div className="how-grid" data-reveal data-reveal-delay="1">
          <div className="how-col">
            <span className="how-num">1</span>
            <h3 className="how-ct">Your platform plan.</h3>
            <p className="how-cd">A monthly fee (Startup $99, Growth $499, or custom for Enterprise), a one-time $1,000 setup and launch fee, and a 3 month minimum term. This is what you pay Involve to run your program.</p>
            <span className="how-divider" aria-hidden="true" />
            <ul className="how-notes">
              <li><span className="how-arr" aria-hidden="true"><HowArrow /></span>The setup fee covers our team building and launching your program with you, so it goes live set up the right way, not on your own.</li>
              <li><span className="how-arr" aria-hidden="true"><HowArrow /></span>The 3 month minimum gives a new program enough runway to recruit publishers and gather data before you decide what is next.</li>
            </ul>
          </div>
          <div className="how-col">
            <span className="how-num">2</span>
            <h3 className="how-ct">What you pay publishers.</h3>
            <p className="how-cd">A commission you set on each offer, paid only when a publisher drives a real, verified sale. This is the pay-for-results part, so this spend always maps to revenue.</p>
            <span className="how-divider" aria-hidden="true" />
            <div className="how-callout">Affiliate marketing is pure performance. You are completely in control of the commission rates and only pay after validation.</div>
          </div>
        </div>
      </div>
      <style>{`
        .how-sec{ background:var(--warm-50); padding:clamp(48px,8vh,100px) 0; }
        .how-title{ text-align:center; font-size:clamp(24px,3vw,34px); line-height:1.1; letter-spacing:-.02em; color:var(--warm-900); }
        .how-grid{ display:grid; grid-template-columns:1fr 1fr; gap:clamp(40px,6vw,88px); max-width:1080px; margin:clamp(40px,6vh,64px) auto 0; }
        .how-num{ display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:50%; background:var(--midnight); color:#fff; font:700 14px/1 var(--font-body); }
        .how-ct{ margin-top:16px; font-family:var(--font-display); font-weight:800; font-size:22px; letter-spacing:-.01em; color:var(--warm-900); }
        .how-cd{ margin-top:12px; font:400 15px/1.55 var(--font-body); color:var(--warm-600); }
        .how-divider{ display:block; height:1px; background:var(--warm-200); margin:22px 0; }
        .how-notes{ display:flex; flex-direction:column; gap:16px; }
        .how-notes li{ display:flex; align-items:flex-start; gap:12px; font:400 14px/1.5 var(--font-body); color:var(--warm-600); }
        .how-arr{ flex:0 0 auto; width:15px; height:15px; margin-top:3px; color:var(--midnight-light); }
        .how-arr svg{ width:100%; height:100%; display:block; }
        .how-callout{ background:var(--midnight-light-tint); border-radius:var(--r-xl); padding:18px 20px; font:600 14px/1.55 var(--font-body); color:var(--midnight-light); }
        @media (max-width:820px){ .how-grid{ grid-template-columns:1fr; gap:40px; } }
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
        <p className="pl-cap" data-reveal>Trusted by brands your customers already know, across retail, travel, beauty, and finance.</p>
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
        .pe-title{ font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
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
          background:linear-gradient(156deg, rgba(61,90,128,.16) 37%, rgba(106,156,223,.16) 85%), #fff; }
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
   Pricing FAQ. Bracketed answers are client placeholders to confirm before launch. */
const PUB_FAQ = [
  ['What do I actually pay publishers?',
    'You set the commission for each offer. Publishers earn it only when they drive a real sale, so your spend maps to revenue.'],
  ['What is the $1,000 setup fee for?',
    'It covers building and launching your program with our team, so it is set up correctly and live quickly.'],
  ['Why a 3 month minimum?',
    'Affiliate programs need runway to recruit publishers and gather data. Three months is enough to see real results.'],
  ['What happens after the three-month minimum?',
    'Your plan continues on a rolling basis, and you can upgrade, downgrade, or cancel it as your program evolves.'],
  ["What happens if I exceed my plan's tracking limit?",
    'If your traffic grows beyond your plan, you can move up to one that fits, and our team will help you make the switch.'],
  ['Can I change plans later?',
    'Yes. Move from Startup to Growth, or up to Enterprise, as your program scales.'],
  ['Which plan should I pick?',
    'Most brands making affiliates a core channel choose Growth. Start with Startup to launch and test, and talk to us for Enterprise volumes. Or get a free growth audit.'],
  ['How are results tracked?',
    'Every click and conversion is tracked to the publisher who drove it, and verified before payout.'],
];
function PubFAQ() {
  const [open, setOpen] = React.useState(() => new Set([0]));
  const toggle = (i) => setOpen((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  return (
    <section id="pub-faq" className="fq-sec">
      <div className="wrap">
        <h2 className="fq-title" data-reveal>Pricing questions, answered.</h2>
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
        <h2 className="pc-title" data-reveal>Not sure where to start? We'll help.</h2>
        <p className="pc-sub" data-reveal data-reveal-delay="1">Book a quick call and our team will map out the fastest way to grow your brand with Involve.</p>
        <a href="/advertisers/" className="btn btn-advertiser btn-lg pc-btn" data-reveal data-reveal-delay="2">Talk to us <Arrow /></a>
      </div>
      <style>{`
        .pc-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(96px,16vh,200px) 0 clamp(104px,17vh,210px); }
        .pc-hexfield{ position:absolute; left:0; top:50%; transform:translateY(-44%) scaleY(-1); width:100%; height:auto; z-index:0; pointer-events:none; opacity:.6;
          -webkit-mask-image:linear-gradient(180deg, transparent, #000 16%, #000 84%, transparent); mask-image:linear-gradient(180deg, transparent, #000 16%, #000 84%, transparent); }
        .pc-hexfield .hx{ will-change:transform; }
        .pc-topfade{ position:absolute; left:0; right:0; top:0; height:clamp(200px,26%,340px); z-index:0; pointer-events:none;
          background:linear-gradient(180deg, var(--warm-50) 0%, rgba(250,250,248,.6) 45%, rgba(250,250,248,0) 100%); }
        .pc-wash{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:760px; height:420px; z-index:0; pointer-events:none;
          background:radial-gradient(ellipse at center, var(--warm-50) 32%, rgba(250,250,248,0) 72%); }
        .pc-inner{ position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; text-align:center; }
        .pc-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.15; letter-spacing:-.03em; color:var(--warm-900); max-width:900px; }
        .pc-sub{ margin-top:14px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:620px; }
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
        .ag-title{ text-align:center; font-size:clamp(24px,3vw,34px); line-height:1.1; letter-spacing:-.03em; color:var(--warm-900); }
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
const ADV_PLATFORM_MS = 5000;
function AdvPlatform() {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    if (prefersReduced()) return;                 // no auto-advance under reduced motion
    const t = setTimeout(() => setActive((a) => (a + 1) % ADV_PLATFORM.length), ADV_PLATFORM_MS);
    return () => clearTimeout(t);
  }, [active]);
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
                <button type="button" className={'pf-step' + (on ? ' on' : '')} key={s.key} onClick={() => setActive(i)} aria-expanded={on}>
                  <span className="pf-rail" aria-hidden="true">
                    <span className="pf-rail-track" />
                    {on && <span className="pf-rail-fill" key={active} />}
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
              <img key={s.key} className={'pf-img' + (i === active ? ' on' : '')} src={`media/figma/${s.img}`} alt="" loading="lazy" aria-hidden={i !== active} />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .pf-sec{ background:var(--warm-50); padding:clamp(77px,11.11vh,152px) 0 clamp(89px,14.28vh,191px); overflow:hidden; }
        .pf-title{ text-align:center; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .pf-sub{ text-align:center; margin-top:14px; font-size:16px; line-height:1.4; color:var(--warm-600); }
        .pf-grid{ margin-top:clamp(40px,6vh,72px); display:grid; grid-template-columns:minmax(0,447px) 1fr; gap:clamp(32px,4vw,64px); align-items:center; }
        .pf-steps{ display:flex; flex-direction:column; }
        .pf-step{ position:relative; display:flex; gap:20px; align-items:stretch; text-align:left; background:none; border:none; cursor:pointer; padding:34px 0; width:100%; }
        .pf-step + .pf-step{ border-top:1px solid var(--warm-200); }
        .pf-rail{ position:relative; width:8px; flex:0 0 auto; align-self:stretch; }
        .pf-rail-track{ position:absolute; inset:0; border-radius:var(--r-full); background:var(--warm-200); opacity:0; transition:opacity .3s ease; }
        .pf-rail-fill{ position:absolute; left:0; top:0; width:8px; border-radius:var(--r-full); background:var(--midnight-light); height:0; }
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
        .rl-title{ font-size:clamp(24px,3vw,34px); line-height:1.14; letter-spacing:-.02em; color:var(--warm-900); }
        .rl-desc{ margin-top:20px; max-width:620px; font:400 16px/1.35 var(--font-body); color:var(--warm-600); }
        .rl-list{ margin-top:28px; display:flex; flex-direction:column; gap:16px; }
        .rl-list li{ display:flex; align-items:center; gap:12px; font:500 16px/1.3 var(--font-body); color:var(--warm-900); }
        .rl-check{ flex:0 0 auto; width:20px; height:20px; color:var(--success); display:inline-flex; align-items:center; justify-content:center; }
        .rl-check svg{ width:20px; height:20px; }
        /* mobile/narrow: the viz would sit on top of the copy — hide it entirely */
        @media (max-width:820px){ .rl-viz{ display:none; } }
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
        .rs-title{ font-size:clamp(24px,3vw,34px); line-height:1.06; letter-spacing:-.03em; color:var(--warm-900); }
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
function PricingApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="midnight" />
      <main>
        <PubHero />
        <PricingPlans />
        <PricingCompare />
        {/* <PricingAudit /> hidden per request */}
        <PricingEssentials />
        <PricingHow />
        <PubFAQ />
        {/* pricing sections added section-by-section; advertiser-only sections retired */}
        <PubLogos />
        <PubCTA />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PricingApp />);
