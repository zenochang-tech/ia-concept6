/* ============================================================================
   Fraud Awareness — the notice to publishers and partners about people falsely
   claiming to represent Involve Asia. Hero and body reuse the Terms & Conditions
   page components (Glossary-style hex hero + the plain legal text block). Copy is
   verbatim from the live involve.asia/partners/fraud-awareness/ page and lives in
   content/pages/fraud-awareness/<lang>.json (read through useCopy).
   Loads AFTER ia-shared.jsx (Nav/Footer/BackToTop/hooks/useCopy/rich).
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
function FaHero({ c }) {
  return (
    <section id="fa-hero" className="gh-sec">
      <div className="gh-honey" aria-hidden="true"><FaHexField /></div>
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
        .gh-sub{ margin:20px auto 0; max-width:760px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        @media (max-width:600px){ .gh-sec{ text-align:left; } .gh-title, .gh-sub{ margin-left:0; } .gh-hexfield{ left:56%; opacity:1; } }
      `}</style>
    </section>
  );
}

function FaContent({ c }) {
  return (
    <section id="fa-content" className="tc-sec">
      <div className="wrap tc-wrap">
        <div className="tc-preamble" data-reveal>
          {c.intro.map((t, i) => <p className="tc-p" key={i}>{t}</p>)}
        </div>
        {c.sections.map((sec) => (
          <div className="tc-block" key={sec.title} data-reveal>
            <h2 className="tc-h">{sec.title}</h2>
            <p className="tc-p">{sec.lead}</p>
            <ul className="fa-list">
              {sec.items.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
            {sec.after && <p className="tc-p">{sec.after}</p>}
          </div>
        ))}
        <div className="tc-block" data-reveal>
          <h2 className="tc-h">{c.verify.title}</h2>
          <p className="tc-p">{rich(c.verify.text, 'fa-mail')}</p>
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
  const c = useCopy('fraud-awareness');
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <FaHero c={c.hero} />
        <FaContent c={c} />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<FraudAwarenessApp />);
