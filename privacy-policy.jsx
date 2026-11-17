/* ============================================================================
   Privacy Notice — reproduces the live app.involve.asia/publisher/privacypolicy
   copy in our design system. Same hero and body styles as the Terms &
   Conditions page. All copy lives in content/pages/privacy-policy/<lang>.json
   (sections → numbered clauses → (a) / bullet sub-lists) and arrives through
   useCopy. Loads AFTER ia-shared.jsx (Nav/Footer/BackToTop/hooks/rich).
   ============================================================================ */

/* ---------- Hero (same component as the Glossary and Terms pages) ---------- */
let __ppGradN = 0;
function PpHexField() {
  const [gid] = React.useState(() => 'ppHexGrad' + (++__ppGradN));
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
function PpHero({ c }) {
  return (
    <section id="pp-hero" className="gh-sec">
      <div className="gh-honey" aria-hidden="true"><PpHexField /></div>
      <div className="wrap gh-wrap">
        <span className="gh-eyebrow" data-reveal>{c.eyebrow}</span>
        <h1 className="gh-title" data-reveal data-reveal-delay="1">{c.title}</h1>
        <p className="gh-sub" data-reveal data-reveal-delay="1">{c.sub}</p>
        <p className="pp-updated" data-reveal data-reveal-delay="1">{c.updated}</p>
      </div>
      <style>{`
        .gh-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(44px,8vh,92px) 0 clamp(16px,2.4vh,30px); text-align:center; }
        .gh-honey{ position:absolute; left:0; top:-75px; width:100%; height:calc(100% + 75px); z-index:0; pointer-events:none; }
        .gh-hexfield{ position:absolute; inset:0; width:100%; height:100%; opacity:1;
          -webkit-mask-image:radial-gradient(120% 100% at 50% 34%, #000 0%, #000 42%, transparent 78%);
          mask-image:radial-gradient(120% 100% at 50% 34%, #000 0%, #000 42%, transparent 78%); }
        .gh-wrap{ position:relative; z-index:1; }
        .gh-eyebrow{ display:inline-block; font:700 14px/1 var(--font-body); letter-spacing:.02em; color:var(--warm-900); }
        .gh-title{ margin:16px auto 0; max-width:840px; font-size:clamp(30px,4.8vw,56px); line-height:1.06; letter-spacing:-.03em; color:var(--warm-900); }
        .gh-sub{ margin:20px auto 0; max-width:760px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        .pp-updated{ margin-top:12px; font:600 13px/1.4 var(--font-body); color:var(--warm-400); }
        @media (max-width:600px){ .gh-sec{ text-align:left; } .gh-title, .gh-sub{ margin-left:0; } .gh-hexfield{ left:56%; opacity:1; } }
      `}</style>
    </section>
  );
}

/* ---------- Renderers ------------------------------------------------------ */
const ppAlpha = (i) => '(' + String.fromCharCode(97 + i) + ')';

function PpList({ list }) {
  if (list.kind === 'bullet') {
    return <ul className="pp-bullets">{list.items.map((it, i) => <li key={i}>{rich(it.t, 'pp-link')}</li>)}</ul>;
  }
  return (
    <ol className="pp-alpha">
      {list.items.map((it, i) => (
        <li key={i}><span className="pp-n">{ppAlpha(i)}</span><span>{rich(it.t, 'pp-link')}</span></li>
      ))}
    </ol>
  );
}

function PpClause({ n, item }) {
  return (
    <div className="pp-clause">
      <span className="pp-n">{n}</span>
      <div className="pp-cbody">
        <p className="pp-p">{rich(item.t, 'pp-link')}</p>
        {(item.sub || []).map((s, i) => (s.after
          ? <p className="pp-p" key={i}>{rich(s.after, 'pp-link')}</p>
          : <PpList list={s} key={i} />))}
      </div>
    </div>
  );
}

function PpContent({ sections }) {
  return (
    <section id="pp-content" className="pp-sec">
      <div className="wrap pp-wrap">
        {sections.map((sec, si) => (
          <div className="pp-block" key={si} data-reveal>
            <h2 className="pp-h">{si + 1}. {sec.title}</h2>
            {sec.body.map((b, i) => <p className="pp-p" key={i}>{rich(b, 'pp-link')}</p>)}
            {(sec.clauses || []).map((c, ci) => <PpClause key={ci} n={`${si + 1}.${ci + 1}`} item={c} />)}
          </div>
        ))}
      </div>
      <style>{`
        .pp-sec{ background:var(--warm-50); padding:clamp(28px,4vh,52px) 0 clamp(72px,12vh,140px); }
        .wrap.pp-wrap{ max-width:880px; }
        .pp-block{ margin-top:clamp(38px,5.5vh,60px); }
        .pp-block:first-child{ margin-top:0; }
        .pp-h{ font-family:var(--font-display); font-weight:800; font-size:clamp(19px,2.1vw,25px); line-height:1.2; letter-spacing:-.02em; color:var(--warm-900); padding-bottom:14px; border-bottom:1px solid var(--warm-200); }
        .pp-p{ margin-top:15px; font:400 15.5px/1.72 var(--font-body); color:var(--warm-600); overflow-wrap:anywhere; }
        .pp-p b{ color:var(--warm-900); }
        .pp-block .pp-h + .pp-p, .pp-block .pp-h + .pp-clause{ margin-top:18px; }
        .pp-clause{ display:grid; grid-template-columns:44px minmax(0,1fr); margin-top:15px; }
        .pp-clause > .pp-n{ font:700 15.5px/1.72 var(--font-body); color:var(--warm-900); }
        .pp-cbody > .pp-p:first-child{ margin-top:0; }
        .pp-alpha, .pp-bullets{ margin:10px 0 0; padding:0; list-style:none; display:flex; flex-direction:column; gap:8px; font:400 15.5px/1.72 var(--font-body); color:var(--warm-600); }
        .pp-alpha li{ display:grid; grid-template-columns:34px minmax(0,1fr); overflow-wrap:anywhere; }
        .pp-alpha .pp-n{ color:var(--warm-900); font-weight:600; }
        .pp-bullets li{ position:relative; padding-left:22px; }
        .pp-bullets li::before{ content:""; position:absolute; left:6px; top:.72em; width:6px; height:6px; border-radius:var(--r-full); background:var(--warm-400); }
        .pp-link{ color:var(--midnight-light); font-weight:600; text-decoration:underline; text-underline-offset:2px; }
        .pp-link:hover{ color:var(--midnight); }
        @media (max-width:600px){ .pp-clause{ grid-template-columns:36px minmax(0,1fr); } .pp-alpha li{ grid-template-columns:28px minmax(0,1fr); } }
      `}</style>
    </section>
  );
}

function PrivacyApp() {
  useSmoothScroll();
  useScrollReveal();
  const c = useCopy('privacy-policy');
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <PpHero c={c.hero} />
        <PpContent sections={c.sections} />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PrivacyApp />);
