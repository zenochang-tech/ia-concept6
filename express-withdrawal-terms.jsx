/* ============================================================================
   Express Withdrawal Terms & Conditions — the terms publishers accept when they
   apply for Express Withdrawal. Hero and body reuse the Terms & Conditions page
   components (Glossary-style hex hero + the plain legal text block), like the Fraud
   Awareness page. Legal copy is verbatim from the live
   involve.asia/terms-conditions/express-withdrawal-terms/ page.
   Loads AFTER ia-shared.jsx (Nav/Footer/BackToTop/hooks).
   ============================================================================ */

const EWT_APP = 'https://app.involve.asia/publisher/express-withdrawal';

/* ---------- Hero (same component as the Terms & Conditions page) ----------- */
function EwtHexField() {
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
function EwtHero() {
  return (
    <section id="ewt-hero" className="gh-sec">
      <div className="gh-honey" aria-hidden="true"><EwtHexField /></div>
      <div className="wrap gh-wrap">
        <span className="gh-eyebrow" data-reveal>For Publishers</span>
        <h1 className="gh-title" data-reveal data-reveal-delay="1">Express Withdrawal terms and conditions</h1>
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
const EWT_TERMS = [
  'Publisher hereby accept and agree to the express withdrawal amount from its pending conversions on IA platform will be based on amount computed by IA.',
  'Publisher hereby agree and accept the pay-out amount of the express payment will be subject to a processing fee and the pay-out amount to be received will be net of the processing fee charged.',
  'Publisher hereby accept and agree that all the pending conversions used for computation to arrive at the express withdrawal amount shall be blocked from normal and early withdrawal and remain to be blocked even after the validation. These blocked conversions will be release for normal and early withdrawal when the outstanding express withdrawal amount is fully reimbursed.',
  'Publisher hereby accept and agree that IA reserves the rights to deduct the publisher’s available funds on the balance amount owing should the committed amount is insufficient to repay the outstanding express withdrawal.',
  'Publisher hereby accept and agree that IA reserve the rights to clawback any conversions used for reimbursement should the conversion subsequently changes its status to reject.',
  'Publisher hereby accept and agree, the express withdrawal is an upfront payment and not a settlement for the publishers’ conversions. IA shall be entitled at its absolute discretion to withdraw or terminate the upfront payment and demand the reimbursement of all sums under the upfront payment or vary or amend the terms under express withdrawal, by giving 21 days prior notice to the publishers.',
  'Publisher hereby accept and agree, the exchange rates apply to convert on the express withdrawal amount to publisher’s preferred currency will be based IA platform rates.',
  'Publisher hereby accept and agree, that the acceptance and approval on the express withdrawal application is solely the discretion of IA.',
];

function EwtContent() {
  return (
    <section id="ewt-content" className="tc-sec">
      <div className="wrap tc-wrap">
        <div className="tc-block" data-reveal>
          <p className="tc-p">By executing the application to Involve Asia (IA) express withdrawal, publishers hereby agree to the following terms and conditions:</p>
          <ol className="lt-list">
            {EWT_TERMS.map((t, i) => <li key={i}>{t}</li>)}
          </ol>
          <a href={EWT_APP} className="btn btn-primary btn-lg lt-cta">Go to Express Withdrawal <Arrow /></a>
        </div>
      </div>
      <style>{`
        .tc-sec{ background:var(--warm-50); padding:clamp(28px,4vh,52px) 0 clamp(72px,12vh,140px); }
        .wrap.tc-wrap{ max-width:880px; }
        .tc-p{ font:400 15.5px/1.72 var(--font-body); color:var(--warm-600); }
        .lt-list{ margin:16px 0 0; padding-left:24px; display:flex; flex-direction:column; gap:10px; list-style:decimal; }
        .lt-list li{ font:400 15.5px/1.72 var(--font-body); color:var(--warm-600); padding-left:6px; }
        .lt-list li::marker{ color:var(--warm-900); font-weight:600; }
        .lt-cta{ margin-top:clamp(28px,4vh,40px); }
      `}</style>
    </section>
  );
}

function ExpressTermsApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <EwtHero />
        <EwtContent />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ExpressTermsApp />);
