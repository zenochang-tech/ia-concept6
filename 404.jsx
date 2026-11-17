/* ============================================================================
   404.jsx — "Page not found". GitHub Pages serves 404.html for any missing
   address, so 404.html sets <base> to the site root and window.IA_PAGE = 'index'
   (the language switcher then points at each language's homepage). Copy lives in
   content/pages/404/en.json. Loaded AFTER ia-shared.jsx.
   ============================================================================ */

function NotFoundHero({ c }) {
  return (
    <section id="nf-hero" className="nf-sec">
      <svg className="nf-hex" viewBox="0 0 600 680" aria-hidden="true">
        <polygon points="300,20 580,180 580,500 300,660 20,500 20,180" />
        <polygon points="300,120 493,230 493,450 300,560 107,450 107,230" />
      </svg>
      <div className="wrap nf-wrap">
        <p className="nf-eyebrow" data-reveal>{c.eyebrow}</p>
        <p className="nf-code" aria-hidden="true" data-reveal>4<span>0</span>4</p>
        <h1 className="nf-title" data-reveal data-reveal-delay="1">{c.title}</h1>
        <p className="nf-sub" data-reveal data-reveal-delay="1">{c.sub}</p>
        <div className="nf-actions" data-reveal data-reveal-delay="2">
          <a href="./" className="btn btn-primary btn-lg">{c.cta} <Arrow /></a>
        </div>
        <nav className="nf-links" aria-label={c.linksLabel} data-reveal data-reveal-delay="2">
          <span className="nf-links-label">{c.linksLabel}</span>
          <ul>
            {c.links.map(([label, href]) => (
              <li key={href}><a href={href}>{label}</a></li>
            ))}
          </ul>
        </nav>
      </div>

      <style>{`
        .nf-sec{ position:relative; overflow:hidden; background:var(--warm-50); min-height:calc(100vh - 80px); display:flex; align-items:center; padding:clamp(120px,16vh,168px) 0 clamp(64px,10vh,112px); }
        .nf-hex{ position:absolute; right:-140px; top:50%; width:min(620px,62vw); height:auto; transform:translateY(-50%); pointer-events:none; }
        .nf-hex polygon{ fill:none; stroke:var(--midnight-light); stroke-opacity:.14; stroke-width:2; }
        .nf-hex polygon + polygon{ fill:var(--midnight-light); fill-opacity:.04; }
        .nf-wrap{ position:relative; width:100%; text-align:left; }
        .nf-eyebrow{ font:600 13px/1 var(--font-body); letter-spacing:.08em; text-transform:uppercase; color:var(--ember-dark); }
        .nf-code{ margin-top:14px; font-family:var(--font-display); font-weight:800; font-size:clamp(96px,16vw,184px); line-height:.9; letter-spacing:-.05em; color:var(--midnight); }
        .nf-code span{ color:var(--ember); }
        .nf-title{ margin-top:clamp(20px,3vh,28px); max-width:16ch; font-size:clamp(30px,4vw,48px); line-height:1.08; letter-spacing:-.03em; color:var(--warm-900); }
        .nf-sub{ margin-top:16px; max-width:520px; font-size:16px; line-height:1.55; color:var(--warm-600); }
        .nf-actions{ margin-top:clamp(28px,4vh,36px); display:flex; flex-wrap:wrap; gap:12px; }
        .nf-links{ margin-top:clamp(36px,6vh,56px); padding-top:24px; border-top:1px solid var(--warm-200); max-width:560px; }
        .nf-links-label{ display:block; font:600 13px/1 var(--font-body); color:var(--warm-400); }
        .nf-links ul{ list-style:none; margin:14px 0 0; padding:0; display:flex; flex-wrap:wrap; gap:10px 28px; }
        .nf-links a{ font:600 15px/1.4 var(--font-body); color:var(--midnight); text-decoration:none; border-bottom:1px solid var(--warm-200); }
        .nf-links a:hover{ color:var(--midnight-light); border-color:var(--midnight-light); }
        @media (max-width:700px){
          .nf-hex{ right:-220px; width:520px; opacity:.7; }
          .nf-title{ max-width:none; }
          .nf-actions .btn{ width:100%; justify-content:center; }
        }
      `}</style>
    </section>
  );
}

function NotFoundPage() {
  useSmoothScroll();
  useScrollReveal();
  const c = useCopy('404');
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main><NotFoundHero c={c.hero} /></main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<NotFoundPage />);
