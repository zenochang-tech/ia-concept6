/* ============================================================================
   membership-program.jsx — "The Involve Membership Program" page. Rebuilt from the
   live involve.asia/partners/membership-program/ page with the existing publisher-page
   parts: the Express Withdrawal hero (HeroHexGrid + hex photo), the
   shared IconColumns / FinalCta sections, and the Pricing page's compare-table layout
   for the four membership levels. Copy is from the live page; headings in sentence case.
   All copy lives in content/pages/membership-program/<lang>.json and arrives through
   useCopy. Loaded AFTER ia-shared.jsx + ia-sections.jsx.
   ============================================================================ */

const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, FinalCta, AppDownload, IconColumns, HeroHexGrid, HERO_HEXGRID_CSS, useCopy } = window;

// The live page's only CTA ("Sign Up") goes to publisher registration.
const MB_SIGNUP = 'https://app.involve.asia/v2/create-account';

/* ---------- Section 1 — Hero (same layout as the Express Withdrawal hero) ---------- */
function MbHero({ c }) {
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
            <a href={MB_SIGNUP} className="btn btn-primary btn-lg">{c.cta} <Arrow /></a>
            <a href="#mb-benefits" className="btn btn-secondary btn-lg">{c.more}</a>
          </div>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo"><img src="media/figma/membership-card-hero-image.png" alt={c.imageAlt} loading="eager" /></div>
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

/* ---------- Section 2 — "Your Involve membership benefits" (shared IconColumns, 4 across) ---------- */
const mbIcon = (children) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;
// icons by index; the title/text pairs come from c.benefits.items
const MB_BENEFITS_ICONS = [
  mbIcon(<><path d="M19 5 5 19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></>),
  mbIcon(<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />),
  mbIcon(<><path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" /><path d="M3 21v-5h5" /><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" /><path d="M21 3v5h-5" /></>),
  mbIcon(<><circle cx="12" cy="8" r="6" /><path d="M15.5 13.2 17 22l-5-3-5 3 1.5-8.8" /></>),
];
const mbItems = (texts, icons) => texts.map(([t, d], i) => ({ t, d, ic: icons[i] }));
const MB_BENEFITS_CSS = `
        #mb-benefits .wy-grid{ grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(24px,3vw,40px); }
        @media (max-width:1024px){ #mb-benefits .wy-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); } }`;

/* ---------- Section 3 — "Involve membership levels" (Pricing compare-table layout) ---------- */
// c.rows cell value: false = not included, string = text
function MbLevels({ c }) {
  const cell = (v) => v === false ? <span className="mbl-dash" aria-label={c.notIncluded}>×</span> : v;
  return (
    <section id="mb-levels" className="mbl-sec">
      <div className="wrap">
        <div className="mbl-head" data-reveal>
          <h2 className="mbl-title">{c.title}</h2>
          <p className="mbl-sub">{c.sub}</p>
        </div>
        <div className="mbl-table" data-reveal data-reveal-delay="1">
          <div className="mbl-row mbl-hrow">
            <div className="mbl-c mbl-label-h">{c.labelHead}</div>
            {c.levels.map((l, i) => (
              <div className="mbl-c mbl-lvl" key={l}>
                <span className="mbl-step">{c.levelLabel.replace('{n}', i + 1)}</span>
                <span className="mbl-name">{l}</span>
              </div>
            ))}
          </div>
          {c.rows.map((r) => (
            <div className="mbl-row" key={r[0]}>
              <div className="mbl-c mbl-label">{r[0]}</div>
              {r.slice(1).map((v, i) => <div className="mbl-c mbl-val" key={i}>{cell(v)}</div>)}
            </div>
          ))}
        </div>
        <p className="mbl-note" data-reveal>{c.note}</p>
      </div>
      <style>{`
        .mbl-sec{ background:var(--warm-50); padding:clamp(56px,9vh,110px) 0; }
        .mbl-head{ text-align:center; max-width:720px; margin:0 auto clamp(30px,4.6vh,52px); }
        .mbl-title{ font-size:clamp(24px,3vw,34px); line-height:1.1; letter-spacing:-.02em; color:var(--warm-900); }
        .mbl-sub{ margin-top:12px; font-size:16px; line-height:1.4; color:var(--warm-600); }
        .mbl-table{ display:flex; flex-direction:column; max-width:1080px; margin:0 auto;
          background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-xl); overflow:hidden; }
        .mbl-row{ display:grid; grid-template-columns:minmax(220px,1.6fr) repeat(4,minmax(110px,1fr)); }
        .mbl-c{ padding:16px 18px; display:flex; align-items:center; justify-content:center; text-align:center;
          font:400 15px/1.45 var(--font-body); color:var(--warm-800); border-top:1px solid var(--warm-200); }
        .mbl-label{ justify-content:flex-start; text-align:left; color:var(--warm-900); }
        .mbl-val{ font-weight:600; color:var(--warm-900); font-variant-numeric:tabular-nums; }
        .mbl-hrow .mbl-c{ border-top:none; padding-top:26px; padding-bottom:20px; }
        .mbl-label-h{ justify-content:flex-start !important; text-align:left; font:700 12px/1 var(--font-body); letter-spacing:.06em; text-transform:uppercase; color:var(--warm-500); }
        .mbl-lvl{ flex-direction:column; gap:6px; }
        .mbl-step{ font:600 12px/1 var(--font-body); color:var(--ember-dark); }
        .mbl-name{ font-family:var(--font-display); font-weight:800; font-size:20px; letter-spacing:-.01em; color:var(--warm-900); }
        .mbl-dash{ color:var(--warm-400); font-weight:400; font-size:18px; line-height:1; }
        .mbl-note{ margin-top:18px; text-align:center; font:400 14px/1.5 var(--font-body); color:var(--warm-600); }
        /* Pricing-table mobile: benefit label sits full-width above the four level values */
        @media (max-width:820px){
          .mbl-row{ grid-template-columns:repeat(4,1fr); }
          .mbl-label{ grid-column:1 / -1; padding:14px 16px 4px; font:700 14px/1.35 var(--font-body); }
          .mbl-label-h{ display:none; }
          .mbl-hrow .mbl-c{ padding-top:18px; padding-bottom:14px; }
          .mbl-lvl{ gap:4px; }
          .mbl-step{ font-size:11px; }
          .mbl-name{ font-size:15px; }
          .mbl-c{ padding:8px 6px 14px; font-size:13px; line-height:1.35; }
          .mbl-row:not(.mbl-hrow) .mbl-c{ border-top:none; }
          .mbl-row:not(.mbl-hrow){ border-top:1px solid var(--warm-200); }
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 4 — "How does the program work?" (shared IconColumns, 2 across) ---------- */
const MB_HOW_ICONS = [
  mbIcon(<><circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18" /><path d="M7 6h1v4" /><path d="m16.71 13.88.7.71-2.82 2.82" /></>),
  mbIcon(<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />),
];
const MB_HOW_CSS = `
        #mb-how .wy-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); max-width:760px; margin-inline:auto; }`;

function MembershipApp() {
  useSmoothScroll();
  useScrollReveal();
  const c = useCopy('membership-program');
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <MbHero c={c.hero} />
        <IconColumns id="mb-benefits" title={c.benefits.title} items={mbItems(c.benefits.items, MB_BENEFITS_ICONS)} css={MB_BENEFITS_CSS} />
        <MbLevels c={c.levels} />
        <IconColumns id="mb-how" title={c.how.title} sub={c.how.sub} items={mbItems(c.how.items, MB_HOW_ICONS)} css={MB_HOW_CSS} />
        <FinalCta title={c.cta.title} href={MB_SIGNUP} label={c.cta.label} />
      </main>
      <Footer />
      <AppDownload />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<MembershipApp />);
