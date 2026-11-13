/* ============================================================================
   bonus-campaign.jsx — "Bonus Campaign" page. Rebuilt from the live
   involve.asia/publisher/bonus-campaign/ page with the existing publisher-page parts:
   the About page hero (hexagon-ring backdrop + chips), the shared
   NumberedSteps / FinalCta sections, the homepage offer cards (.offer-card, styled in
   the page head) and the Terms & Conditions text block. Copy is from the live page;
   headings in sentence case. All copy (and the dashboard log-in link) lives in
   content/pages/bonus-campaign/<lang>.json and arrives through useCopy. Loaded AFTER ia-shared.jsx + ia-sections.jsx.
   ============================================================================ */

const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, FinalCta, AppDownload, NumberedSteps, useCopy, rich } = window;

const BC_UTM = '?utm_source=LandingPage&utm_medium=BonusCampaign2026&utm_campaign=LP-BC-2026';

/* ---------- Section 1 — Hero (same layout as the About page hero) ---------- */
function BcHexField() {
  const { paths, W, H, transform } = window.useHeroDecoArt();
  const svgRef = React.useRef(null);
  window.useHexPush(svgRef, paths);
  const pad = 0.12;
  const vb = `${-W * pad} ${-H * pad} ${W * (1 + 2 * pad)} ${H * (1 + 2 * pad)}`;
  return (
    <svg ref={svgRef} className="ab-hexfield" viewBox={vb} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="var(--warm-100)" transform={transform}>{paths.map((d, i) => <path key={i} className="hx" d={d} />)}</g>
    </svg>
  );
}
function BcHero({ c, login }) {
  return (
    <section id="bc-hero" className="ah-sec">
      <div className="ah-honey" aria-hidden="true"><BcHexField /></div>
      <div className="wrap ah-wrap">
        <span className="ah-eyebrow" data-reveal>{c.eyebrow}</span>
        <h1 className="ah-title" data-reveal data-reveal-delay="1">{c.title}</h1>
        <p className="ah-sub" data-reveal data-reveal-delay="1">{c.sub}</p>
        <div className="ah-chips" data-reveal data-reveal-delay="2">
          {c.chips.map((t) => <span className="ah-chip" key={t}>{t}</span>)}
        </div>
        <div className="bh-actions" data-reveal data-reveal-delay="2">
          <a href="#bc-offers" className="btn btn-primary btn-lg">{c.cta} <Arrow /></a>
          <a href={login} className="btn btn-secondary btn-lg">{c.login}</a>
        </div>
      </div>
      <style>{`
        .ah-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(48px,9vh,104px) 0 clamp(30px,5vh,56px); text-align:center; }
        /* start the field under the transparent nav (74px + 1px border) so its top row isn't cut at the nav line */
        .ah-honey{ position:absolute; left:0; top:-75px; width:100%; height:calc(100% + 75px); z-index:0; pointer-events:none; }
        .ab-hexfield{ position:absolute; inset:0; width:100%; height:100%; opacity:1;
          -webkit-mask-image:radial-gradient(120% 100% at 50% 30%, #000 0%, #000 40%, transparent 76%);
          mask-image:radial-gradient(120% 100% at 50% 30%, #000 0%, #000 40%, transparent 76%); }
        .ah-wrap{ position:relative; z-index:1; }
        .ah-eyebrow{ display:inline-block; font:700 13px/1 var(--font-body); letter-spacing:.14em; text-transform:uppercase; color:var(--ember); }
        .ah-title{ margin:18px auto 0; max-width:880px; font-size:clamp(32px,5vw,60px); line-height:1.04; letter-spacing:-.03em; color:var(--warm-900); }
        .ah-sub{ margin:22px auto 0; max-width:660px; font:400 clamp(16px,1.4vw,19px)/1.55 var(--font-body); color:var(--warm-600); }
        .ah-chips{ margin:30px auto 0; display:flex; flex-wrap:wrap; justify-content:center; gap:12px; }
        .ah-chip{ display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border:1px solid var(--warm-200); border-radius:var(--r-full);
          background:rgba(255,255,255,.6); font:600 14px/1 var(--font-body); color:var(--warm-900); }
        .ah-chip::before{ content:""; width:7px; height:7px; border-radius:50%; background:var(--ember); }
        .bh-actions{ margin-top:32px; display:flex; flex-wrap:wrap; justify-content:center; gap:12px; }
        @media (max-width:600px){ .ah-sec{ text-align:left; } .ah-title,.ah-sub{ margin-left:0; } .ah-chips, .bh-actions{ justify-content:flex-start; } .ab-hexfield{ left:56%; opacity:1; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 2 — "How to unlock your exclusive bonus" (shared NumberedSteps, fed from c.steps) ---------- */

/* ---------- Section 3 — Campaign offers (homepage .offer-card) ---------- */
// brand/logo/slug here; the rate and description text (num, up, rem, desc) come from c.offers.items by index
const BC_OFFERS = [
  { brand: 'GOM Lab', logo: 'gomlab.svg', slug: 'gom-lab-affiliate-program' },
  { brand: 'Airwallex', logo: 'airwallex.webp', slug: 'airwallex-affiliate-program' },
  { brand: 'Preply', logo: 'preply.png', slug: 'preply-affiliate-program' },
  { brand: 'Ninja WiFi', logo: 'ninja-wifi.webp', slug: 'ninja-wifi-affiliate-program' },
  { brand: 'PakaiDulu by DirectD', logo: 'pakaidulu.png', slug: 'pakaidulu-directd-malaysia-affiliate-program' },
];
function BcOffers({ c }) {
  const offers = BC_OFFERS.map((o, i) => ({ ...o, ...c.items[i] }));
  return (
    <section id="bc-offers" className="bco-sec">
      <div className="wrap">
        <h2 className="bco-title" data-reveal>{c.title}</h2>
        <p className="bco-sub" data-reveal data-reveal-delay="1">{c.sub}</p>
        <div className="offer-grid bco-grid" data-reveal data-reveal-delay="1">
          {offers.map((o) => (
            <a key={o.brand} href={`https://app.involve.asia/publisher/browse/${o.slug}${BC_UTM}`} className="offer-card" aria-label={c.aria.replace('{brand}', o.brand).replace('{rate}', `${o.up ? o.up + ' ' : ''}${o.num}${o.rem ? ' ' + o.rem : ''}`)}>
              <div className="offer-card-head">
                <div className="offer-logo"><img src={`media/bonus-campaign/${o.logo}`} alt={c.logoAlt.replace('{brand}', o.brand)} loading="lazy" /></div>
                <span className="offer-arrow" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M17 7H8.5M17 7v8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
              <div className="offer-foot">
                <div className="offer-brand">{o.brand}</div>
                <p className="bco-desc">{o.desc}</p>
                <div className="offer-comm">
                  {o.up && <span className="offer-up">{o.up}</span>}
                  <div className="offer-rate"><span className="offer-num">{o.num}</span>{o.rem ? ' ' + o.rem : ''}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        .bco-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; scroll-margin-top:70px; }
        .bco-title{ font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .bco-sub{ margin-top:12px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        .bco-grid{ margin-top:clamp(28px,4vh,44px); }
        .bco-desc{ margin-top:6px; font:400 14px/1.45 var(--font-body); color:var(--warm-600); }
      `}</style>
    </section>
  );
}

/* ---------- Section 4 — Terms & Conditions (Terms page text block) ---------- */
function BcTerms({ c }) {
  return (
    <section id="bc-terms" className="bct-sec">
      <div className="wrap bct-wrap" data-reveal>
        <h2 className="bct-h">{c.title}</h2>
        <ul className="bct-list">
          {c.items.map((t, i) => <li key={i}>{rich(t, 'bct-link')}</li>)}
        </ul>
        <p className="bct-p">{c.outro}</p>
      </div>
      <style>{`
        .bct-sec{ background:var(--warm-50); padding:clamp(28px,4vh,52px) 0 clamp(40px,7vh,88px); }
        .wrap.bct-wrap{ max-width:880px; }
        .bct-h{ font-family:var(--font-display); font-weight:800; font-size:clamp(19px,2.1vw,25px); line-height:1.2; letter-spacing:-.02em; color:var(--warm-900); padding-bottom:14px; border-bottom:1px solid var(--warm-200); }
        .bct-list{ margin:18px 0 0; padding-left:22px; display:flex; flex-direction:column; gap:8px; list-style:disc; }
        .bct-list li{ font:400 15.5px/1.72 var(--font-body); color:var(--warm-600); padding-left:4px; }
        .bct-list li::marker{ color:var(--warm-400); }
        .bct-p{ margin-top:18px; font:400 15.5px/1.72 var(--font-body); color:var(--warm-600); }
        .bct-link{ font-weight:600; color:var(--warm-900); text-decoration:underline; text-underline-offset:3px; }
        .bct-link:hover{ color:var(--ember-dark); }
      `}</style>
    </section>
  );
}

function BonusCampaignApp() {
  useSmoothScroll();
  useScrollReveal();
  const c = useCopy('bonus-campaign');
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <BcHero c={c.hero} login={c.links.login} />
        <NumberedSteps id="bc-how" title={c.steps.title} sub={c.steps.sub} steps={c.steps.items} cols={3} />
        <BcOffers c={c.offers} />
        <BcTerms c={c.terms} />
        <FinalCta title={c.cta.title} href="#bc-offers" label={c.cta.label} />
      </main>
      <Footer />
      <AppDownload />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BonusCampaignApp />);
