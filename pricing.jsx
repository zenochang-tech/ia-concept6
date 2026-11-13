/* ============================================================================
   pricing.jsx — "Pricing" page (advertiser plans).
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass. All copy lives in
   content/pages/pricing/<lang>.json and arrives through useCopy — this file only
   holds the layout, links and icons.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, FinalCta, Faq, LogoMarquee, useCopy, rich } = window;

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
function PubHero({ c }) {
  return (
    <section id="pricing-hero" className="prh-sec">
      {/* honeycomb backdrop (same field as the final CTA) — spans the hero + plan cards */}
      <div className="prh-honey" aria-hidden="true"><PricingHexField /></div>
      <div className="wrap prh-wrap">
        <span className="prh-eyebrow" data-reveal>{c.eyebrow}</span>
        <h1 className="prh-title" data-reveal data-reveal-delay="1">{c.title}</h1>
        <p className="prh-sub" data-reveal data-reveal-delay="2">{rich(c.sub)}</p>
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
// text (name/desc/price/unit/priceNote/plus/feats/cta) comes from c.items, zipped by index;
// `plan` is the English plan name sent to get-started
const PRICING_PLANS = [
  { key: 'startup', plan: 'Startup', href: '/advertisers/' },
  { key: 'growth', plan: 'Growth', href: '/advertisers/', recommended: true },
  { key: 'enterprise', plan: 'Enterprise', href: '/advertisers/' },
];
function PlanCheck() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>);
}
function PricingPlans({ c }) {
  const plans = PRICING_PLANS.map((x, i) => ({ ...x, ...c.items[i] }));
  return (
    <section id="pricing-plans" className="pp-sec">
      <div className="wrap">
        <div className="pp-grid" data-reveal>
          {plans.map((p) => (
            <div className={'pp-card' + (p.recommended ? ' pp-rec' : '')} key={p.key}>
              {p.recommended && <span className="pp-badge">{c.recommended}</span>}
              <h3 className="pp-name">{p.name}</h3>
              <p className="pp-desc">{p.desc}</p>
              <div className="pp-price"><span className="pp-amt">{p.price}</span>{p.unit && <span className="pp-unit">{p.unit}</span>}</div>
              {p.priceNote && <p className="pp-pricenote">{p.priceNote}</p>}
              <span className="pp-divider" aria-hidden="true" />
              {p.plus && <p className="pp-plus">{p.plus}</p>}
              <ul className="pp-feats">
                {p.feats.map((f, i) => (<li key={i}><span className="pp-chk" aria-hidden="true"><PlanCheck /></span>{f}</li>))}
              </ul>
              <a href={`get-started?plan=${encodeURIComponent(p.plan)}`} className="btn btn-advertiser btn-lg pp-cta">{p.cta} <Arrow /></a>
            </div>
          ))}
        </div>
        <p className="pp-terms" data-reveal>{c.terms}</p>
      </div>
      <style>{`
        .pp-sec{ position:relative; background:transparent; padding:clamp(44px,7vh,80px) 0 clamp(56px,9vh,112px); }
        .pp-terms{ text-align:center; margin-top:clamp(24px,3.4vh,36px); font:400 14px/1.5 var(--font-body); color:var(--warm-600); }
        .pp-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:24px; align-items:stretch; max-width:1120px; margin:0 auto; }
        .pp-card{ position:relative; display:flex; flex-direction:column; background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-xl);
          padding:34px 30px; box-shadow:0 14px 34px rgba(15,28,46,.05); }
        .pp-rec{ margin-top:-24px; padding-top:52px; border-color:transparent; box-shadow:0 30px 68px rgba(15,28,46,.16); z-index:2; }
        /* left-aligned with the card content (card padding is 30px) */
        .pp-badge{ position:absolute; top:18px; left:30px; background:var(--midnight); color:#fff;
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
// rows come from c.rows — cell value: true = check, false = dash, string = text
function PricingCompare({ c }) {
  const cell = (v) => v === true
    ? <span className="cmp-chk" aria-label={c.included}><PlanCheck /></span>
    : v === false ? <span className="cmp-dash" aria-label={c.notIncluded}>×</span> : v;
  const [st, gr, en] = c.plans;
  return (
    <section id="pricing-compare" className="cmp-sec">
      <div className="wrap">
        <div className="cmp-head" data-reveal>
          <span className="cmp-eyebrow">{c.eyebrow}</span>
          <h2 className="cmp-title">{c.title}</h2>
          <p className="cmp-sub">{c.sub}</p>
        </div>
        <div className="cmp-scroll" data-reveal data-reveal-delay="1">
          <div className="cmp-table">
            <div className="cmp-row cmp-hrow">
              <div className="cmp-c cmp-label-h">{c.labelHead}</div>
              <div className="cmp-c cmp-plan">
                <span className="cmp-plan-name">{st.name}</span>
                <span className="cmp-plan-price">{st.price}<small>{st.unit}</small></span>
                <a href="/advertisers/" className="btn btn-secondary cmp-cta">{st.cta}</a>
              </div>
              <div className="cmp-c cmp-plan cmp-rec">
                <span className="cmp-recbadge">{c.recommended}</span>
                <span className="cmp-plan-name">{gr.name}</span>
                <span className="cmp-plan-price">{gr.price}<small>{gr.unit}</small></span>
                <a href="/advertisers/" className="btn btn-advertiser cmp-cta">{gr.cta}</a>
              </div>
              <div className="cmp-c cmp-plan">
                <span className="cmp-plan-name">{en.name}</span>
                <span className="cmp-plan-price cmp-custom">{en.price}</span>
                <a href="/advertisers/" className="btn btn-secondary cmp-cta">{en.cta}</a>
              </div>
            </div>
            {c.rows.map((r, i) => (
              <div className="cmp-row" key={i}>
                <div className="cmp-c cmp-label">{r[0]}</div>
                <div className="cmp-c">{cell(r[1])}</div>
                <div className={'cmp-c cmp-rec' + (i === c.rows.length - 1 ? ' cmp-rec-last' : '')}>{i === c.rows.length - 1 ? <b>{cell(r[2])}</b> : cell(r[2])}</div>
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
          font:400 15px/1.45 var(--font-body); color:var(--warm-800); border-top:1px solid var(--warm-200); }
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
          .cmp-row:not(.cmp-hrow){ border-top:1px solid var(--warm-200); }
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 1e — "Every plan comes with the essentials" ----------- */
// icon per card; title/desc come from c.items, zipped by index
const PR_ESSENTIALS = ['users', 'activity', 'shield', 'chat'];
function EssIcon({ name }) {
  const p = {
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  }[name];
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
}
function PricingEssentials({ c }) {
  return (
    <section id="pricing-essentials" className="ess-sec">
      <div className="wrap">
        <h2 className="ess-title" data-reveal>{c.title}</h2>
        <div className="ess-grid" data-reveal data-reveal-delay="1">
          {c.items.map((e, i) => (
            <div className="ess-card" key={PR_ESSENTIALS[i]}>
              <span className="ess-ic" aria-hidden="true"><EssIcon name={PR_ESSENTIALS[i]} /></span>
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
function PricingHow({ c }) {
  return (
    <section id="pricing-how" className="how-sec">
      <div className="wrap">
        <h2 className="how-title" data-reveal>{c.title}</h2>
        <div className="how-grid" data-reveal data-reveal-delay="1">
          <div className="how-col">
            <span className="how-num">1</span>
            <h3 className="how-ct">{c.plan.title}</h3>
            <p className="how-cd">{c.plan.d}</p>
            <span className="how-divider" aria-hidden="true" />
            <ul className="how-notes">
              {c.plan.notes.map((t, i) => (
                <li key={i}><span className="how-arr" aria-hidden="true"><HowArrow /></span>{t}</li>
              ))}
            </ul>
          </div>
          <div className="how-col">
            <span className="how-num">2</span>
            <h3 className="how-ct">{c.pay.title}</h3>
            <p className="how-cd">{c.pay.d}</p>
            <span className="how-divider" aria-hidden="true" />
            <div className="how-callout">{c.pay.callout}</div>
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
function PubLogos({ c }) {
  return <LogoMarquee caption={c.caption} />;
}

/* ---------- Section 8 — "Questions, answered." (FAQ accordion) ------------
   Pricing FAQ; questions and answers come from c.items. */
const PUB_FAQ_CSS = `
        .fq-a a{ color:var(--midnight-light); font-weight:600; text-decoration:underline; text-underline-offset:2px; }
      `;
function PubFAQ({ c }) {
  return <Faq items={c.items} title={c.title} css={PUB_FAQ_CSS} />;
}

/* ---------- Final CTA (shared FinalCta, ia-sections.jsx) ----------------- */
const PUB_CTA_CSS = `
        .pc-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(96px,16vh,200px) 0 clamp(104px,17vh,210px); }
        .pc-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.15; letter-spacing:-.03em; color:var(--warm-900); max-width:900px; }
        .pc-sub{ margin-top:14px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:620px; }
        @media (max-width:700px){ .pc-sec{ padding:clamp(60px,9vh,84px) 0 clamp(68px,10vh,96px); } }
      `;
function PubCTA({ c }) {
  return <FinalCta title={c.title} sub={c.sub} href="/advertisers/" tone="advertiser" label={c.label} css={PUB_CTA_CSS} />;
}

function PricingApp() {
  useSmoothScroll();
  useScrollReveal();
  const c = useCopy('pricing');
  return (
    <React.Fragment>
      <Nav getStartedTone="midnight" />
      <main>
        <PubHero c={c.hero} />
        <PricingPlans c={c.plans} />
        <PricingCompare c={c.compare} />
        {/* <PricingAudit /> hidden per request */}
        <PricingEssentials c={c.essentials} />
        <PricingHow c={c.how} />
        <PubFAQ c={c.faq} />
        {/* pricing sections added section-by-section; advertiser-only sections retired */}
        <PubLogos c={c.logos} />
        <PubCTA c={c.cta} />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PricingApp />);
