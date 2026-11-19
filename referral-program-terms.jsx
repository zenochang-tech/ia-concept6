/* ============================================================================
   Referral Program Terms & Conditions (Malaysia). Hero and body reuse the Terms &
   Conditions page components (Glossary-style hex hero + the plain legal text block),
   like the Fraud Awareness page. The legal copy lives in
   content/pages/referral-program-terms/<lang>.json: English is verbatim from the live
   involve.asia/terms-conditions/referral-my/ page (also used by the Thai and
   Indonesian Referral pages), Vietnamese from …/referral-program-vn/.
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
function RftHero({ c }) {
  return (
    <section id="rft-hero" className="gh-sec">
      <div className="gh-honey" aria-hidden="true"><RftHexField /></div>
      <div className="wrap gh-wrap">
        <span className="gh-eyebrow" data-reveal>{c.eyebrow}</span>
        <h1 className="gh-title" data-reveal data-reveal-delay="1">{c.title}</h1>
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

/* ---------- Content ---------- */
// item = text, or { t, sub } for the lettered sub-lists (a., b., …); text may use **bold** and [label](link)
function RftContent({ c }) {
  return (
    <section id="rft-content" className="tc-sec">
      <div className="wrap tc-wrap">
        <div className="tc-block" data-reveal>
          <ol className="lt-list">
            {c.items.map((t, i) => typeof t === 'object'
              ? <li key={i}>{rich(t.t, 'lt-link')}<ol className="lt-sub">{t.sub.map((s, j) => <li key={j}>{rich(s, 'lt-link')}</li>)}</ol></li>
              : <li key={i}>{rich(t, 'lt-link')}</li>)}
          </ol>
          {c.updated && <p className="lt-updated">{c.updated}</p>}
          <a href={RFT_PROMOTE} className="btn btn-primary btn-lg lt-cta">{c.cta} <Arrow /></a>
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
  const c = useCopy('referral-program-terms');
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <RftHero c={c.hero} />
        <RftContent c={c} />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ReferralTermsApp />);
