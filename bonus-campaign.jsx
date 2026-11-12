/* ============================================================================
   bonus-campaign.jsx — "Bonus Campaign" page. Rebuilt from the live
   involve.asia/publisher/bonus-campaign/ page with the existing publisher-page parts:
   the About page hero (hexagon-ring backdrop + chips), the shared
   NumberedSteps / FinalCta sections, the homepage offer cards (.offer-card, styled in
   the page head) and the Terms & Conditions text block. Copy is from the live page;
   headings in sentence case. Loaded AFTER ia-shared.jsx + ia-sections.jsx.
   ============================================================================ */

const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, FinalCta, AppDownload, NumberedSteps } = window;

const BC_LOGIN = 'https://invl.me/clmpu6y';
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
const BC_CHIPS = ['High commissions', 'Easy targets', 'Bonus payouts'];
function BcHero() {
  return (
    <section id="bc-hero" className="ah-sec">
      <div className="ah-honey" aria-hidden="true"><BcHexField /></div>
      <div className="wrap ah-wrap">
        <span className="ah-eyebrow" data-reveal>Bonus Campaign</span>
        <h1 className="ah-title" data-reveal data-reveal-delay="1">Earn $40 extra with just five conversions</h1>
        <p className="ah-sub" data-reveal data-reveal-delay="1">We’ve partnered with selected advertisers to help you unlock more earnings with minimal effort.</p>
        <div className="ah-chips" data-reveal data-reveal-delay="2">
          {BC_CHIPS.map((c) => <span className="ah-chip" key={c}>{c}</span>)}
        </div>
        <div className="bh-actions" data-reveal data-reveal-delay="2">
          <a href="#bc-offers" className="btn btn-primary btn-lg">View Offers <Arrow /></a>
          <a href={BC_LOGIN} className="btn btn-secondary btn-lg">Log In to Your Dashboard</a>
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

/* ---------- Section 2 — "How to unlock your exclusive bonus" (shared NumberedSteps) ---------- */
const BC_STEPS = [
  ['1', 'Choose your advertisers', 'Pick one or more participating offers below and decide where to focus your efforts.'],
  ['2', 'Drive five conversions per advertiser', 'Promote your link and generate five validated conversions for each advertiser you want to qualify for.'],
  ['3', 'Unlock your $40 bonus', 'Earn a bonus for each advertiser once five conversions are validated.'],
];

/* ---------- Section 3 — Campaign offers (homepage .offer-card) ---------- */
const BC_OFFERS = [
  { brand: 'GOM Lab', logo: 'gomlab.svg', slug: 'gom-lab-affiliate-program', num: '28%', rem: 'commission', desc: 'Video player and utility software' },
  { brand: 'Airwallex', logo: 'airwallex.webp', slug: 'airwallex-affiliate-program', num: 'USD 210', rem: 'commission', desc: 'Global business payments and finance platform' },
  { brand: 'Preply', logo: 'preply.png', slug: 'preply-affiliate-program', up: 'Up to', num: 'USD 70', desc: 'Online language learning marketplace' },
  { brand: 'Ninja WiFi', logo: 'ninja-wifi.webp', slug: 'ninja-wifi-affiliate-program', num: '7%', rem: 'commission', desc: 'Travel WiFi rental for international users' },
  { brand: 'PakaiDulu by DirectD', logo: 'pakaidulu.png', slug: 'pakaidulu-directd-malaysia-affiliate-program', up: 'Up to', num: 'MYR 225', desc: 'Try-before-you-buy gadgets and electronics' },
];
function BcOffers() {
  return (
    <section id="bc-offers" className="bco-sec">
      <div className="wrap">
        <h2 className="bco-title" data-reveal>Bonus campaign offers for May 2026</h2>
        <p className="bco-sub" data-reveal data-reveal-delay="1">Pick one offer to start earning your bonus.</p>
        <div className="offer-grid bco-grid" data-reveal data-reveal-delay="1">
          {BC_OFFERS.map((o) => (
            <a key={o.brand} href={`https://app.involve.asia/publisher/browse/${o.slug}${BC_UTM}`} className="offer-card" aria-label={`${o.brand}, ${o.up ? o.up + ' ' : ''}${o.num}${o.rem ? ' ' + o.rem : ''}. Promote offer`}>
              <div className="offer-card-head">
                <div className="offer-logo"><img src={`media/bonus-campaign/${o.logo}`} alt={`${o.brand} logo`} loading="lazy" /></div>
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
const BC_TERMS = [
  'Campaign runs from 1 May to 31 May 2026 (inclusive). Only conversions with a Conversion Date Created within this period are eligible.',
  'Publishers must generate 5 validated conversions on a single participating brand (Preply, GOM Lab, Ninja WiFi, PakaiDulu by DirectD, or Airwallex) to qualify.',
  'A one-time bonus is awarded per brand upon meeting the requirement, on top of regular commissions.',
  'Each brand can only be qualified once per publisher.',
  'Publishers may qualify across multiple brands by meeting the requirement for each.',
  'Each brand is limited to 5 publisher slots only.',
  'Qualification is on a first-come, first-served basis, determined by the timestamp of the 5th validated conversion.',
  'Once all slots for a brand are filled, that brand will no longer be eligible.',
  'All conversions must be validated before bonus eligibility is confirmed.',
  'Bonus payout will be processed after validation and may take up to 3 months after the campaign period ends.',
  'Bonus will be credited to the publisher’s payment account.',
  'Publishers can track performance via Dashboard > Conversion Report using the Conversion Date Created field.',
  'This campaign is run by Involve Asia and participating brands are not involved in campaign mechanics.',
  <React.Fragment>These terms should be read together with the <a className="bct-link" href="terms-conditions">Involve Asia Terms and Conditions</a>.</React.Fragment>,
];
function BcTerms() {
  return (
    <section id="bc-terms" className="bct-sec">
      <div className="wrap bct-wrap" data-reveal>
        <h2 className="bct-h">Terms and conditions</h2>
        <ul className="bct-list">
          {BC_TERMS.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
        <p className="bct-p">By participating, you acknowledge that you have read and agreed to the applicable terms and conditions. Any invalid, rejected, or fraudulent conversions will not be counted towards the campaign requirement.</p>
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
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <BcHero />
        <NumberedSteps id="bc-how" title="How to unlock your exclusive bonus" sub="Bonus payout limited to the first five publishers for each advertiser." steps={BC_STEPS} cols={3} />
        <BcOffers />
        <BcTerms />
        <FinalCta title="Ready to unlock your bonus?" href="#bc-offers" label="View Offers" />
      </main>
      <Footer />
      <AppDownload />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BonusCampaignApp />);
