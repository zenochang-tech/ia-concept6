/* ============================================================================
   Referral Program Terms & Conditions (Malaysia). Hero and body reuse the Terms &
   Conditions page components (Glossary-style hex hero + the plain legal text block),
   like the Fraud Awareness page. Legal copy is verbatim from the live
   involve.asia/terms-conditions/referral-my/ page, with "Programme" spelled
   "Program" to match the rest of the site.
   Loads AFTER ia-shared.jsx (Nav/Footer/BackToTop/hooks).
   ============================================================================ */

const RFT_PROMOTE = 'https://app.involve.asia/publisher/browse/involve-asia-publisher-referral-program-cpa-affiliate-program?promote=1&linksource=LP-ReferralProgram2023';

/* ---------- Hero (same component as the Terms & Conditions page) ----------- */
function RftHexField() {
  const { paths, W, H, transform } = window.useHeroDecoArt();
  const svgRef = React.useRef(null);
  window.useHexPush(svgRef, paths);
  const pad = 0.12;
  const vb = `${-W * pad} ${-H * pad} ${W * (1 + 2 * pad)} ${H * (1 + 2 * pad)}`;
  return (
    <svg ref={svgRef} className="gh-hexfield" viewBox={vb} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="var(--warm-100)" transform={transform}>{paths.map((d, i) => <path key={i} className="hx" d={d} />)}</g>
    </svg>
  );
}
function RftHero() {
  return (
    <section id="rft-hero" className="gh-sec">
      <div className="gh-honey" aria-hidden="true"><RftHexField /></div>
      <div className="wrap gh-wrap">
        <span className="gh-eyebrow" data-reveal>For Publishers</span>
        <h1 className="gh-title" data-reveal data-reveal-delay="1">Referral Program terms and conditions</h1>
      </div>
      <style>{`
        .gh-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(44px,8vh,92px) 0 clamp(16px,2.4vh,30px); text-align:center; }
        /* start the field under the transparent nav (74px + 1px border) so its top row isn't cut at the nav line */
        .gh-honey{ position:absolute; left:0; top:-75px; width:100%; height:calc(100% + 75px); z-index:0; pointer-events:none; }
        .gh-hexfield{ position:absolute; inset:0; width:100%; height:100%; opacity:1;
          -webkit-mask-image:radial-gradient(120% 100% at 50% 34%, #000 0%, #000 42%, transparent 78%);
          mask-image:radial-gradient(120% 100% at 50% 34%, #000 0%, #000 42%, transparent 78%); }
        .gh-wrap{ position:relative; z-index:1; }
        .gh-eyebrow{ display:inline-block; font:700 14px/1 var(--font-body); letter-spacing:.02em; color:var(--warm-900); }
        .gh-title{ margin:16px auto 0; max-width:840px; font-size:clamp(30px,4.8vw,56px); line-height:1.06; letter-spacing:-.03em; color:var(--warm-900); }
        @media (max-width:600px){ .gh-sec{ text-align:left; } .gh-title{ margin-left:0; } .gh-hexfield{ left:56%; opacity:1; } }
      `}</style>
    </section>
  );
}

/* ---------- Content (verbatim from the live page) ---------- */
// item = text, or [text, sub-items] for the lettered sub-lists (a., b., …)
const RFT_LINK = (href, label) => <a className="lt-link" href={href}>{label}</a>;
const RFT_TERMS = [
  <React.Fragment>The Referral Program (<b>“Offer”</b>) is open to all Partners on Involve Asia’s Network.</React.Fragment>,
  <React.Fragment>This Offer allows the <b>Referrer</b> (person who refers) to get bonus(es) when the <b>Referee</b>(s) (person who is referred to) signs up on Involve Asia (“<b>The Company</b>”) with the Referrer’s unique link and starts receiving conversion with The Company thereafter.</React.Fragment>,
  <React.Fragment>Once the Referrer’s unique link is used by the Referee to sign up, the Referrer and Referee both are eligible to earn <b>MYR5 each</b> upon Referee’s first successful sale conversion <b>(CPS offers, excluding Involve Asia’s internal Offers, only) within 14 days</b> of their account approval.</React.Fragment>,
  ['This Offer is only valid once the Referee(s):', [
    'Verifies their email address;',
    'Have an approved Involve Asia account;',
    'Have at least one (1) approved Property;',
    <React.Fragment>Have at least one (1) sale conversion <b>(CPS offers, excluding Involve Asia’s internal Offers, only)</b> within 14 days of account approval</React.Fragment>,
  ]],
  <React.Fragment>Only CPS conversions (<b>excluding Involve Asia’s internal Offers</b>) by the Referee will be counted towards this Offer.</React.Fragment>,
  [<React.Fragment>The <b>full list of bonus</b> you may get from this Offer is listed in the website landing pages below:</React.Fragment>, [
    RFT_LINK('referral-program.html', 'Malaysia'),
    RFT_LINK('https://involve.asia/id/partners/referral-programme-id/', 'Indonesia'),
    RFT_LINK('https://involve.asia/th/partners/referral-programme-th/', 'Thailand'),
    RFT_LINK('https://involve.asia/partners/referral-program-ph/', 'Philippines'),
    RFT_LINK('https://involve.asia/vn/partners/referral-programme-vn/', 'Vietnam'),
  ]],
  'Any countries that are not included in Term No. 6 will follow Malaysian Ringgit (RM/MYR) payout rates.',
  ['This Offer’s general information', [
    'Cookies period: 7 days',
    'Validation period: 15 days',
    'Payment term: 30 days',
  ]],
  'Bonuses that are eligible to receive upon approved conversions by the Referee(s) will be paid out and uploaded by the 20th week of every month.',
  'The bonuses received from this Offer are not applicable for Express Withdrawal.',
  'Any other referral links or promotions generated outside of this Offer will not be applicable for this Offer.',
  'The Company has the right to clawback any conversions which are found to be invalid or rejected.',
  'The Company can, at its own discretion, disqualify conversions as they see fit.',
  'The Company shall be entitled to withhold any benefits under the services rendered, with notice to the users if the user is found to have breached any of The Company’s Terms and Conditions.',
];

function RftContent() {
  return (
    <section id="rft-content" className="tc-sec">
      <div className="wrap tc-wrap">
        <div className="tc-block" data-reveal>
          <ol className="lt-list">
            {RFT_TERMS.map((t, i) => Array.isArray(t)
              ? <li key={i}>{t[0]}<ol className="lt-sub">{t[1].map((s, j) => <li key={j}>{s}</li>)}</ol></li>
              : <li key={i}>{t}</li>)}
          </ol>
          <p className="lt-updated">T&amp;Cs are updated as of 4th September 2023</p>
          <a href={RFT_PROMOTE} className="btn btn-primary btn-lg lt-cta">Promote Now <Arrow /></a>
        </div>
      </div>
      <style>{`
        .tc-sec{ background:var(--warm-50); padding:clamp(28px,4vh,52px) 0 clamp(72px,12vh,140px); }
        .wrap.tc-wrap{ max-width:880px; }
        .lt-list{ margin:0; padding-left:24px; display:flex; flex-direction:column; gap:10px; list-style:decimal; }
        .lt-list li{ font:400 15.5px/1.72 var(--font-body); color:var(--warm-600); padding-left:6px; }
        .lt-list li::marker{ color:var(--warm-900); font-weight:600; }
        .lt-list b{ font-weight:600; color:var(--warm-900); }
        .lt-sub{ margin:6px 0 0; padding-left:22px; display:flex; flex-direction:column; gap:4px; list-style:lower-alpha; }
        .lt-sub li::marker{ font-weight:400; color:var(--warm-600); }
        .lt-link{ font-weight:600; color:var(--warm-900); text-decoration:underline; text-underline-offset:3px; }
        .lt-link:hover{ color:var(--ember-dark); }
        .lt-updated{ margin-top:clamp(22px,3vh,32px); font:400 14px/1.5 var(--font-body); color:var(--warm-500); }
        .lt-cta{ margin-top:clamp(22px,3vh,32px); }
      `}</style>
    </section>
  );
}

function ReferralTermsApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <RftHero />
        <RftContent />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ReferralTermsApp />);
