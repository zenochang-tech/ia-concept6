/* ============================================================================
   referral-program.jsx — "The Involve Referral Program" page. Rebuilt from the live
   involve.asia/partners/referral-program/ page with the existing publisher-page parts:
   the Express Withdrawal hero (HeroHexGrid + hex photo), its intro
   layout, the shared NumberedSteps / Faq / FinalCta sections, and a design-system
   table for the reward maths. All copy (and the per-country reward, links and
   amounts) lives in content/pages/referral-program/<lang>.json and arrives through
   useCopy — this file only holds the layout. Loaded AFTER ia-shared.jsx + ia-sections.jsx.
   ============================================================================ */

const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, FinalCta, Faq, AppDownload, NumberedSteps, HeroHexGrid, HERO_HEXGRID_CSS, useCopy, rich } = window;

/* ---------- Section 1 — Hero (same layout as the Express Withdrawal hero) ---------- */
function RfHero({ c, link }) {
  return (
    <section id="pub-hero" className="ph-sec">
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <HeroHexGrid />
        <div className="ph-copy">
          <span className="ph-eyebrow" data-reveal>{c.eyebrow}</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">{c.title}</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="1">{c.sub}</p>
          <div className="ph-actions" data-reveal data-reveal-delay="2">
            <a href={link} className="btn btn-primary btn-lg">{c.cta} <Arrow /></a>
            <a href="#rf-what" className="btn btn-secondary btn-lg">{c.more}</a>
          </div>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo"><img src="media/figma/referral-hero-image.png" alt={c.imageAlt} loading="eager" /></div>
        </div>
      </div>

      <style>{`
        .ph-sec{ position:relative; isolation:isolate; overflow:hidden; background:var(--warm-50); padding:clamp(40px,6vh,84px) 0 clamp(56px,9vh,116px); }
        ${HERO_HEXGRID_CSS}
        .ph-basefade{ position:absolute; left:0; right:0; bottom:0; height:clamp(120px,24%,240px); z-index:0; pointer-events:none;
          background:linear-gradient(180deg, rgba(250,250,248,0) 0%, rgba(250,250,248,.65) 55%, var(--warm-50) 100%); }
        .ph-wrap{ position:relative; display:grid; grid-template-columns:1.02fr .98fr; gap:clamp(24px,4vw,60px); align-items:center; }
        .ph-copy{ min-width:0; }
        .ph-eyebrow{ display:inline-block; font:600 13px/1 var(--font-body); letter-spacing:.02em; color:var(--ember-dark);
          background:var(--ember-tint); border-radius:var(--r-full); padding:8px 15px; }
        .ph-title{ margin-top:20px; font-size:clamp(28px,4.4vw,50px); line-height:1.0; letter-spacing:-.03em; color:var(--warm-900); }
        .ph-sub{ margin-top:20px; max-width:520px; font-size:clamp(16px,1.4vw,19px); line-height:1.55; color:var(--warm-600); }
        .ph-actions{ margin-top:30px; display:flex; gap:12px; flex-wrap:wrap; }
        .ph-visual{ position:relative; aspect-ratio:1/1; max-width:520px; width:100%; margin-left:auto; }
        .ph-hexplate{ position:absolute; inset:0; z-index:0; background:var(--warm-150);
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat;
          filter:drop-shadow(0 26px 54px rgba(15,28,46,.10)); }
        .ph-photo{ position:absolute; inset:0; z-index:1;
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; }
        .ph-photo img{ width:100%; height:100%; object-fit:cover; display:block; }
        /* the photo is pre-cut to a hexagon ~4% smaller than the mask; scale it from the top so its edges reach the mask */
        .ph-photo img{ transform:scale(1.04); transform-origin:50% 0; }
        @media (max-width:900px){
          .ph-wrap{ grid-template-columns:1fr; gap:36px; }
          .ph-copy{ text-align:center; display:flex; flex-direction:column; align-items:center; }
          .ph-sub{ margin-left:auto; margin-right:auto; }
          .ph-actions{ justify-content:center; }
          .ph-sec{ padding-top:12px; }
          .ph-visual{ order:-1; width:85%; max-width:357px; margin:0 auto; justify-self:center; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 2 — "What is the Involve Referral Program?" (Express Withdrawal intro layout) ---------- */
function RfWhat({ c }) {
  return (
    <section id="rf-what" className="exw-sec">
      <div className="wrap">
        <div className="exw-top">
          <div className="exw-intro">
            <h2 className="exw-h" data-reveal>{c.title}</h2>
            {c.paras.map((t, i) => <p className="exw-p" data-reveal data-reveal-delay="1" key={i}>{rich(t)}</p>)}
          </div>
          <div className="exw-card" data-reveal data-reveal-delay="1">
            <span className="exw-card-lbl">{c.cardLabel}</span>
            <div className="exw-amt"><span className="exw-cur">{c.currency}</span><span className="exw-num">{c.amount}</span></div>
            <p className="rf-card-note">{c.cardNote}</p>
          </div>
        </div>
      </div>
      <style>{`
        .exw-sec{ background:var(--warm-50); padding:clamp(56px,9vh,110px) 0 clamp(28px,4vh,48px); scroll-margin-top:70px; }
        .exw-top{ display:grid; grid-template-columns:minmax(0,1fr) 300px; gap:clamp(32px,5vw,80px); align-items:start; }
        .exw-h{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .exw-p{ margin-top:20px; max-width:820px; font:400 16px/1.45 var(--font-body); color:var(--warm-600); }
        .exw-p + .exw-p{ margin-top:14px; }
        .exw-card{ align-self:start; background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-lg); padding:24px; box-shadow:var(--shadow-md); }
        .exw-card-lbl{ display:block; font:600 13px/1.32 var(--font-body); color:var(--warm-600); }
        .exw-amt{ margin-top:11px; display:flex; align-items:baseline; gap:4px; font-family:var(--font-body); font-weight:700; color:var(--warm-900); line-height:1.1; letter-spacing:-.01em; }
        .exw-cur{ font-size:28px; }
        .exw-num{ font-size:44px; }
        .rf-card-note{ margin-top:12px; font:400 14px/1.45 var(--font-body); color:var(--warm-600); }
        @media (max-width:900px){ .exw-top{ grid-template-columns:1fr; } .exw-card{ max-width:340px; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 3 — "Here's how much you can earn" (design-system table) ---------- */
function RfEarn({ c }) {
  return (
    <section id="rf-earn" className="rfe-sec">
      <div className="wrap">
        <h2 className="rfe-title" data-reveal>{c.title}</h2>
        <p className="rfe-sub" data-reveal data-reveal-delay="1">{c.sub}</p>
        <div className="rfe-wrap" data-reveal data-reveal-delay="1">
          <table className="rfe-table">
            <caption className="rfe-cap">{c.caption}</caption>
            <thead>
              <tr>{c.cols.map((h) => <th scope="col" key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {c.rows.map(([n, each, total]) => (
                <tr key={n}><td>{n}</td><td>{each}</td><td className="rfe-total">{total}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="rfe-note" data-reveal>{rich(c.note)}</p>
      </div>
      <style>{`
        .rfe-sec{ background:var(--warm-50); padding:clamp(28px,4vh,48px) 0 clamp(40px,7vh,88px); }
        .rfe-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .rfe-sub{ margin-top:16px; max-width:760px; font:400 16px/1.45 var(--font-body); color:var(--warm-600); }
        .rfe-wrap{ margin-top:clamp(24px,3.6vh,36px); max-width:760px; background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-lg); box-shadow:var(--shadow-sm); overflow:hidden; }
        .rfe-table{ width:100%; border-collapse:collapse; font:400 15px/1.4 var(--font-body); color:var(--warm-900); }
        .rfe-cap{ caption-side:top; text-align:left; padding:16px 20px; font:700 16px/1.3 var(--font-body); color:var(--warm-900); border-bottom:1px solid var(--warm-200); }
        .rfe-table th{ background:var(--warm-100); text-align:left; padding:12px 20px; font:600 13px/1.3 var(--font-body); color:var(--warm-600); border-bottom:1px solid var(--warm-200); }
        .rfe-table td{ padding:14px 20px; border-bottom:1px solid var(--warm-200); }
        .rfe-table tbody tr:last-child td{ border-bottom:none; }
        .rfe-total{ font-weight:700; font-variant-numeric:tabular-nums; }
        .rfe-table td{ white-space:nowrap; }
        .rfe-note{ margin-top:18px; font:400 14px/1.5 var(--font-body); color:var(--warm-600); }
        .rfe-note a{ font-weight:600; color:var(--warm-900); text-decoration:underline; text-underline-offset:3px; }
        .rfe-note a:hover{ color:var(--ember-dark); }
        /* cells may wrap on phones: translated labels ("Rp15.000 per orang") run longer than the English */
        @media (max-width:560px){ .rfe-table th, .rfe-table td{ padding-left:14px; padding-right:12px; } .rfe-table{ font-size:14px; } .rfe-table td{ white-space:normal; } }
      `}</style>
    </section>
  );
}

/* ---------- Sections 4–6 — shared NumberedSteps / Faq / FinalCta, fed from the copy ---------- */
const RF_FAQ_CSS = `
        .rf-mail{ font-weight:600; color:var(--warm-900); text-decoration:underline; text-underline-offset:3px; }
        .rf-mail:hover{ color:var(--ember-dark); }`;

function ReferralApp() {
  useSmoothScroll();
  useScrollReveal();
  const c = useCopy('referral-program');
  const faq = c.faq.items.map(([q, a]) => [q, rich(a, 'rf-mail')]);
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <RfHero c={c.hero} link={c.links.refer} />
        <RfWhat c={c.what} />
        <RfEarn c={c.earn} />
        <NumberedSteps id="rf-how" title={c.steps.title} steps={c.steps.items} cols={3} />
        <Faq items={faq} title={c.faq.title} css={RF_FAQ_CSS} />
        <FinalCta title={c.cta.title} href={c.links.refer} label={c.cta.label} />
      </main>
      <Footer />
      <AppDownload />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ReferralApp />);
