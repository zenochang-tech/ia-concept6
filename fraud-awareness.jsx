/* ============================================================================
   Fraud Awareness — the notice to publishers and partners about people falsely
   claiming to represent Involve Asia. Hero and body reuse the Terms & Conditions
   page components (Glossary-style hex hero + the plain legal text block). Copy is
   verbatim from the live involve.asia/partners/fraud-awareness/ page.
   Loads AFTER ia-shared.jsx (Nav/Footer/BackToTop/hooks).
   ============================================================================ */

/* ---------- Hero (same component as the Terms & Conditions page) ----------- */
function FaHexField() {
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
function FaHero() {
  return (
    <section id="fa-hero" className="gh-sec">
      <div className="gh-honey" aria-hidden="true"><FaHexField /></div>
      <div className="wrap gh-wrap">
        <span className="gh-eyebrow" data-reveal>For Publishers &amp; Partners</span>
        <h1 className="gh-title" data-reveal data-reveal-delay="1">Fraud awareness notice</h1>
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
        .gh-sub{ margin:20px auto 0; max-width:760px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        @media (max-width:600px){ .gh-sec{ text-align:left; } .gh-title, .gh-sub{ margin-left:0; } .gh-hexfield{ left:56%; opacity:1; } }
      `}</style>
    </section>
  );
}

/* ---------- Content data (verbatim from involve.asia/partners/fraud-awareness/) ----- */
const FA_INTRO = [
  `We would like to alert all publishers and partners to reports of suspected fraudulent activity involving individuals or organizations who may be falsely claiming to represent Involve Asia or have authority to act on our behalf.`,
  `While these arrangements are made independently of Involve Asia, we believe it is important to raise awareness so that our community can make informed decisions and avoid potential disputes, payment issues, or financial losses.`,
];

const FA_SECTIONS = [
  { h: 'What to watch out for', lead: 'We have been informed of situations where an individual or organization may:', items: [
    'Claim to be a budget provider, representative, or strategic partner of Involve Asia.',
    'Present Involve Asia’s platform as a tracking tool that they control or manage.',
    'Request publishers to run campaigns or traffic through accounts that they do not own.',
    'Promise payments outside of Involve Asia and arrange settlements directly with publishers.',
    'Suggest they have special authority, access, or approval from Involve Asia.',
    'Use Involve Asia’s name, platform, or reputation to gain trust and credibility.',
  ], after: 'Such arrangements may result in publishers having no direct access to campaign reporting, payment records, or commission payouts through their own Involve Asia account.' },
  { h: 'How to protect yourself', lead: 'We strongly recommend the following best practices:', items: [
    'Work directly with Involve Asia for all campaign, offer, and payment-related matters.',
    'Only run campaigns through publisher accounts that you own and have direct payment access to.',
    'Verify any claims of partnership, representation, or special arrangements involving Involve Asia before proceeding.',
    'Include Involve Asia in discussions whenever our platform, offers, or brand are being referenced.',
    'Exercise caution when payment arrangements are proposed outside of Involve Asia’s standard payment process.',
  ] },
  { h: 'What we don’t authorize', lead: 'To avoid any misunderstanding, we would like to clarify the following:', items: [
    'Involve Asia does not authorize any third party to represent us, commit budgets, negotiate deals, or collect payments on our behalf without explicit written confirmation.',
    'Any partnership, agreement, or payment arrangement made without Involve Asia’s direct involvement is solely between the participating parties.',
    'Involve Asia is not responsible for any disputes, delayed payments, financial losses, or damages arising from such arrangements.',
    'We will not mediate or intervene in disputes where Involve Asia was not involved from the outset.',
  ] },
];

const FA_EMAIL = 'wecare@involve.asia';

function FaContent() {
  return (
    <section id="fa-content" className="tc-sec">
      <div className="wrap tc-wrap">
        <div className="tc-preamble" data-reveal>
          {FA_INTRO.map((t, i) => <p className="tc-p" key={i}>{t}</p>)}
        </div>
        {FA_SECTIONS.map((sec) => (
          <div className="tc-block" key={sec.h} data-reveal>
            <h2 className="tc-h">{sec.h}</h2>
            <p className="tc-p">{sec.lead}</p>
            <ul className="fa-list">
              {sec.items.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
            {sec.after && <p className="tc-p">{sec.after}</p>}
          </div>
        ))}
        <div className="tc-block" data-reveal>
          <h2 className="tc-h">How to verify</h2>
          <p className="tc-p">If you encounter any suspicious activity or would like to verify the legitimacy of an individual, organization, or arrangement involving Involve Asia, please contact us via email at <a className="fa-mail" href={`mailto:${FA_EMAIL}`}>{FA_EMAIL}</a>.</p>
        </div>
      </div>
      <style>{`
        .tc-sec{ background:var(--warm-50); padding:clamp(28px,4vh,52px) 0 clamp(72px,12vh,140px); }
        .wrap.tc-wrap{ max-width:880px; }
        .tc-preamble{ padding-bottom:clamp(20px,3vh,32px); border-bottom:1px solid var(--warm-200); }
        .tc-preamble .tc-p:first-child{ margin-top:0; }
        .tc-block{ margin-top:clamp(38px,5.5vh,60px); }
        .tc-h{ font-family:var(--font-display); font-weight:800; font-size:clamp(19px,2.1vw,25px); line-height:1.2; letter-spacing:-.02em; color:var(--warm-900); padding-bottom:14px; border-bottom:1px solid var(--warm-200); }
        .tc-p{ margin-top:15px; font:400 15.5px/1.72 var(--font-body); color:var(--warm-600); }
        .tc-block .tc-h + .tc-p{ margin-top:18px; }
        .fa-list{ margin:12px 0 0; padding-left:22px; display:flex; flex-direction:column; gap:8px; list-style:disc; }
        .fa-list li{ font:400 15.5px/1.72 var(--font-body); color:var(--warm-600); padding-left:4px; }
        .fa-list li::marker{ color:var(--warm-400); }
        .fa-mail{ font-weight:600; color:var(--warm-900); text-decoration:underline; text-underline-offset:3px; }
        .fa-mail:hover{ color:var(--ember-dark); }
      `}</style>
    </section>
  );
}

function FraudAwarenessApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <FaHero />
        <FaContent />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<FraudAwarenessApp />);
