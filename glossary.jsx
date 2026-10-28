/* ============================================================================
   Glossary page — "Understand affiliate marketing terms without the jargon."
   Figma 2607:2367 (default, max 9 per letter + Show all) / 2607:1652 (full list).
   Uses the shared Nav / Footer / BackToTop / Arrow / hooks from ia-shared.jsx.
   Term links point at the live involve.asia/glossary-term/<slug>/ pages.
   ========================================================================= */
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
// Terms grouped by first letter (from the Figma full list). A & B are wired to the
// exact live URLs in Figma; the slug() below reproduces that pattern for the rest.
const GLOSSARY = {
  A: ['Account Suspension', 'Advertiser', 'Affiliate Account Manager', 'Affiliate Campaigns', 'Affiliate Dashboard', 'Affiliate Disclosure Statement', 'Affiliate Earnings', 'Affiliate Fraud', 'Affiliate ID', 'Affiliate Link', 'Affiliate Network', 'Affiliate Offer', 'Affiliate Platform', 'Affiliate Program', 'Affiliate Storefront', 'Allowed Traffic Sources', 'API (Application Programming Interface)', 'App Install Tracking', 'App Publisher', 'Application Status', 'Attribution Type', 'Attribution Window', 'Audience Country', 'Average Order Value (AOV)'],
  B: ['Base Payout', 'Blogger', 'Bonus Commission', 'Bonus Payout', 'Brand Bidding', 'Brand Safety'],
  C: ['Call-to-Action (CTA)', 'Capping Type', 'Cart Abandonment', 'Cashback Publisher', 'Chargeback', 'Click Fraud', 'Click ID', 'Click-Jacking', 'Click Origin Country', 'Click-Through Rate (CTR)', 'Click to Conversion Time', 'Clicks', 'Commission', 'Commission Capping', 'Commission Model', 'Commission Rate', 'Commission Structure', 'Commission Tier', 'Commission Xtra', 'Commissionable Country', 'Commissionable Product', 'Comparison Publisher', 'Compliance', 'Content Creator', 'Content Publisher', 'Conversion Creation', 'Conversion Flow', 'Conversion Level', 'Conversion Rate (CVR)', 'Cookie Period', 'Cookie Stuffing', 'Cost Per Action (CPA)', 'Cost Per Install (CPI)', 'Cost Per Lead (CPL)', 'Cost Per Sale (CPS)', 'Cost Per Unique Click (CPUC)', 'Coupon/Deals Publisher', 'Cross-Device Tracking', 'Current Earnings'],
  D: ['Data Feed', 'Deal Aggregator', 'Deeplink', 'Deeplink Generator', 'Deeplink History', 'Deduplication', 'Deeplinkable', 'Device Type', 'Direct Order'],
  E: ['Early Withdrawal', 'Earnings Per Click (EPC)', 'Earnings Per Conversion', 'Email Marketing', 'Email Publisher', 'Estimated Earnings', 'Existing Customer Offer', 'Expected User Journey', 'Express Withdrawal'],
  G: ['Geo-Targeting', 'Gross Merchandise Value (GMV)'],
  H: ['Hybrid Commission Model'],
  I: ['Impression', 'Indirect Order', 'Influencer', 'Instant Apply', 'Interstitial', 'Involve App'],
  K: ['KOL (Key Opinion Leader)'],
  L: ['Landing Page', 'Last-Click Attribution', 'Lead Magnet', 'Lifetime Commission', 'Link Cloaking', 'Link Title', 'Loyalty Publisher'],
  M: ['Manual Approval', 'Manual Commission Tracking', 'Marketplace', 'Merchant', 'Minimum Withdrawal Amount', 'Missing Conversions', 'Mobile Deep Linking'],
  N: ['Negative Keyword'],
  O: ['Offer Currency', 'Offer Name', 'Offer Page', 'Offer Region', 'One-Time Commission', 'Onboarding', 'Order ID', 'Organic Search Traffic'],
  P: ['Paid Search Traffic', 'Partner Marketing', 'Payout Currency', 'Performance Marketing', 'Pixel Tracking', 'Postback URL', 'PPC Publisher', 'Price Comparison Publisher', 'Product Catalog', 'Prohibited Promotion Methods', 'Promo Code', 'Promotion Method', 'Property', 'Publisher', 'Publisher Vetting'],
  R: ['Real-Time Commission Tracking', 'Recommended Keyword', 'Recurring Commission', 'Referral Marketing', 'Referral Program', 'Region Lock', 'Reporting Currency', 'Restricted Traffic Sources', 'Return on Ad Spend (ROAS)'],
  S: ['Scoring Information', 'SDK (Software Development Kit)', 'SEM (Search Engine Marketing)', 'SEO (Search Engine Optimization)', 'Server-to-Server (S2S) Tracking', 'Social Media', 'Sponsored Content', 'Sub-Affiliate', 'Sub-ID / Sub Tracking'],
  T: ['Terms & Conditions (T&Cs)', 'Tiered Commission Structure', 'Total Sales', 'Track Type', 'Tracking Cookie', 'Tracking Link'],
  U: ['Upsize Commission', 'User-Generated Content (UGC)', 'UTM Parameters'],
  V: ['Validation', 'Validation Term'],
  W: ['Webhook'],
};
const GLOSSARY_MAX = 9; // default terms shown per letter before "Show all"
const glossarySlug = (t) => t.toLowerCase().replace(/[()]/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
// Locally-generated term pages (from build-glossary.py) link to the real static page;
// terms not yet built fall back to the live involve.asia glossary.
const glossaryIsLocal = (t) => ((typeof window !== 'undefined' && window.__GLOSSARY_LOCAL) || []).includes(glossarySlug(t));
const glossaryHref = (t) => glossaryIsLocal(t) ? `glossary-term/${glossarySlug(t)}/` : `https://involve.asia/glossary-term/${glossarySlug(t)}/`;

/* Decorative honeycomb backdrop — same hex field as the pricing hero (pub-cta-hexfield.svg),
   filled flat with warm-100 (#F4F4F0) to match the About page hero honeycomb. */
let __glGradN = 0;
function GlossaryHexField() {
  const [paths, setPaths] = React.useState([]);
  const [gid] = React.useState(() => 'glHexGrad' + (++__glGradN));
  const W = 1204.11, H = 1189.86;
  const pad = 0.12;
  const vb = `${-W * pad} ${-H * pad} ${W * (1 + 2 * pad)} ${H * (1 + 2 * pad)}`;
  React.useEffect(() => {
    let alive = true;
    fetch('media/figma/pub-cta-hexfield.svg').then((r) => r.text()).then((txt) => {
      if (!alive) return;
      const out = []; const re = /<path\b([^>]*)>/g; let m;
      while ((m = re.exec(txt))) {
        const attrs = m[1], dm = /\bd="([^"]+)"/.exec(attrs), fm = /\bfill="([^"]+)"/.exec(attrs);
        if (dm && fm && fm[1].toUpperCase() === '#FAC9B9') out.push(dm[1]);
      }
      setPaths(out);
    }).catch(() => {});
    return () => { alive = false; };
  }, []);
  return (
    <svg className="gh-hexfield" viewBox={vb} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="gh-hexgrad" gradientUnits="userSpaceOnUse" x1={W * 0.12} y1={H * 0.30} x2={W * 0.92} y2={H * 0.80}>
          <stop offset="0" style={{ stopColor: 'var(--prev-ember)' }} />
          <stop offset="1" style={{ stopColor: 'var(--prev-blue)' }} />
        </linearGradient>
      </defs>
      <g fill="var(--warm-100)">{paths.map((d, i) => <path key={i} className="hx" d={d} />)}</g>
    </svg>
  );
}
function GlossaryHero() {
  return (
    <section id="glossary-hero" className="gh-sec">
      <div className="gh-honey" aria-hidden="true"><GlossaryHexField /></div>
      <div className="wrap gh-wrap">
        <span className="gh-eyebrow" data-reveal>Affiliate Marketing Glossary</span>
        <h1 className="gh-title" data-reveal data-reveal-delay="1">Understand affiliate marketing terms without the jargon.</h1>
        <p className="gh-sub" data-reveal data-reveal-delay="1">Explore beginner-friendly explanations for affiliate marketing concepts, tracking terms, commission models, publisher jargon, attribution methods, and affiliate marketing definitions used across the industry.</p>
      </div>
      <style>{`
        .gh-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(44px,8vh,92px) 0 clamp(16px,2.4vh,30px); text-align:center; }
        .gh-honey{ position:absolute; left:0; top:0; width:100%; height:100%; z-index:0; pointer-events:none; }
        .gh-hexfield{ position:absolute; inset:0; width:100%; height:100%; opacity:1;
          -webkit-mask-image:radial-gradient(120% 100% at 50% 34%, #000 0%, #000 42%, transparent 78%);
          mask-image:radial-gradient(120% 100% at 50% 34%, #000 0%, #000 42%, transparent 78%); }
        .gh-hexfield .hx{ fill-opacity:.9; }
        .gh-wrap{ position:relative; z-index:1; }
        .gh-eyebrow{ display:inline-block; font:700 14px/1 var(--font-body); letter-spacing:.02em; color:var(--warm-900); }
        .gh-title{ margin:16px auto 0; max-width:840px; font-size:clamp(30px,4.8vw,56px); line-height:1.06; letter-spacing:-.03em; color:var(--warm-900); }
        .gh-sub{ margin:20px auto 0; max-width:760px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        @media (max-width:600px){ .gh-sec{ text-align:left; } .gh-title, .gh-sub{ margin-left:0; } .gh-hexfield{ left:56%; opacity:1; } }
      `}</style>
    </section>
  );
}

function GlossaryList() {
  const [open, setOpen] = React.useState({});
  const [stuck, setStuck] = React.useState(false);
  const sentinelRef = React.useRef(null);
  const letters = Object.keys(GLOSSARY);
  // Detect when the index bar pins under the header: a 1px sentinel sits at the bar's
  // natural top; once it crosses above the header line (74px) the bar is stuck.
  React.useEffect(() => {
    const el = sentinelRef.current; if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting),
      { rootMargin: '-75px 0px 0px 0px', threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id="glossary" className="gl-sec">
      <div ref={sentinelRef} className="gl-sticky-sentinel" aria-hidden="true" />
      <div className={'gl-indexbar' + (stuck ? ' is-stuck' : '')}>
        <div className="wrap gl-index-inner">
          <span className="gl-jumpto">Jump to</span>
          <nav className="gl-index" aria-label="Jump to letter">
            {ALPHA.map((L) => GLOSSARY[L]
              ? <a key={L} href={`#g-${L}`} className="gl-ix">{L}</a>
              : <span key={L} className="gl-ix gl-ix-off" aria-hidden="true">{L}</span>)}
          </nav>
        </div>
      </div>
      <div className="wrap">
        <div className="gl-grid">
          {letters.map((L) => {
            const terms = GLOSSARY[L];
            const isOpen = !!open[L];
            const shown = isOpen ? terms : terms.slice(0, GLOSSARY_MAX);
            return (
              <div key={L} id={`g-${L}`} className="gl-col" data-reveal>
                <h2 className="gl-letter">{L}</h2>
                <ul className="gl-terms">
                  {shown.map((t) => (
                    <li key={t}><a href={glossaryHref(t)} {...(glossaryIsLocal(t) ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>{t}</a></li>
                  ))}
                </ul>
                {terms.length > GLOSSARY_MAX && (
                  <button type="button" className={'gl-more' + (isOpen ? ' is-open' : '')} aria-expanded={isOpen}
                    onClick={() => setOpen((o) => ({ ...o, [L]: !o[L] }))}>
                    {isOpen ? 'Show less' : 'Show all'} <Arrow s={14} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        .gl-sec{ background:var(--warm-50); padding:0 0 clamp(48px,8vh,96px); }
        /* the gap above the bar lives on the sentinel so it marks the exact pin point */
        .gl-sticky-sentinel{ height:1px; margin-top:clamp(24px,4vh,44px); }
        /* secondary nav bar — larger by default; shrinks to a mini bar once it pins under the header (74px) */
        .gl-indexbar{ position:sticky; top:74px; z-index:80; margin:0 0 clamp(40px,7vh,72px);
          background:rgba(250,250,248,0); backdrop-filter:saturate(180%) blur(0px); -webkit-backdrop-filter:saturate(180%) blur(0px);
          border-top:1px solid transparent; border-bottom:1px solid transparent;
          transition:background .3s ease, border-color .3s ease, backdrop-filter .3s ease, -webkit-backdrop-filter .3s ease; }
        .gl-indexbar.is-stuck{ background:rgba(250,250,248,.82); backdrop-filter:saturate(180%) blur(12px); -webkit-backdrop-filter:saturate(180%) blur(12px);
          border-top-color:var(--warm-200); border-bottom-color:var(--warm-200); }
        /* inner column: "Jump to" label above the letter row; vertical padding lives here */
        .gl-index-inner{ display:flex; flex-direction:column; align-items:stretch; gap:8px; padding-top:16px; padding-bottom:16px;
          transition:padding .3s ease, gap .3s ease; }
        .gl-jumpto{ text-align:center; font:400 16px/1.3 var(--font-body); color:var(--warm-600); }
        /* the "Jump to" label shows only in the default state — hidden once the bar sticks */
        .gl-indexbar.is-stuck .gl-index-inner{ padding-top:11px; padding-bottom:11px; gap:0; }
        .gl-indexbar.is-stuck .gl-jumpto{ display:none; }
        .gl-index{ display:flex; flex-wrap:wrap; justify-content:center; gap:8px 20px;
          transition:gap .3s ease, opacity .25s ease; }
        /* only the STUCK (sticky) bar dims its letters at rest; hovering the bar restores full opacity (hover-capable devices only) */
        @media (hover:hover){
          .gl-indexbar.is-stuck .gl-index{ opacity:.42; }
          .gl-indexbar.is-stuck:hover .gl-index{ opacity:1; }
        }
        .gl-indexbar.is-stuck .gl-index{ gap:6px 14px; }
        .gl-ix{ font-family:var(--font-body); font-weight:700; font-size:20px; line-height:1; letter-spacing:-.01em; color:var(--midnight); text-decoration:none;
          transition:color .15s ease, font-size .3s cubic-bezier(.4,0,.2,1); }
        .gl-indexbar.is-stuck .gl-ix{ font-size:15px; }
        .gl-ix:hover{ color:var(--ember); }
        .gl-ix-off{ color:var(--warm-400); opacity:.5; }
        @media (prefers-reduced-motion: reduce){ .gl-indexbar, .gl-index, .gl-ix{ transition:color .15s ease; } }
        .gl-grid{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(36px,5.52vh,62px) clamp(32px,4vw,64px); align-items:start; }
        .gl-col{ min-width:0; scroll-margin-top:128px; }
        .gl-letter{ font-family:var(--font-display); font-weight:800; font-size:24px; letter-spacing:-.02em; color:var(--midnight); margin-bottom:10px; }
        .gl-terms{ list-style:none; padding:0; margin:0; }
        .gl-terms a{ display:inline-block; padding:6px 0; font:400 16px/1.4 var(--font-body); color:var(--warm-900); text-decoration:none; transition:color .15s ease; }
        .gl-terms a:hover{ color:var(--ember); }
        .gl-more{ margin-top:12px; display:inline-flex; align-items:center; gap:7px; padding:8px 16px; border:1px solid var(--warm-300); border-radius:var(--r-full); background:#fff; font:600 13px/1 var(--font-body); color:var(--warm-900); cursor:pointer; transition:border-color .15s ease, color .15s ease; }
        .gl-more:hover{ border-color:var(--warm-900); }
        .gl-more svg{ transition:transform .2s ease; }
        .gl-more:hover svg{ transform:translateX(3px); }
        .gl-more.is-open svg{ transform:rotate(180deg); }
        .gl-more.is-open:hover svg{ transform:rotate(180deg) translateX(3px); }
        @media (max-width:900px){ .gl-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); } }
        @media (max-width:600px){
          .gl-grid{ grid-template-columns:1fr; }
          .gl-jumpto{ text-align:left; }
          /* keep the sticky bar to a single scrollable row so it stays "mini" on phones */
          .gl-index{ flex-wrap:nowrap; overflow-x:auto; justify-content:flex-start; gap:18px; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
          .gl-index::-webkit-scrollbar{ display:none; }
        }
      `}</style>
    </section>
  );
}

/* ---------------- "Pick your side and grow with us." dual-audience CTA ----------------
   Copied verbatim from the homepage (ia-bundle.jsx HexFinaleStatic) — the final section
   before the footer. */
function HexFinaleStatic() {
  const HF_HONEY = [
    ['g1', 0, -225], ['g3', 268, -225], ['g1', 536, 0],
    ['g3', 0, 225], ['g2', -268, 225], ['g2', -536, 225],
  ];
  return (
    <section id="cta" className="hf">
      <div className="hf-cta">
        <h2 className="hf-head" data-reveal>Pick your side and grow with us.</h2>
        <div className="hf-scene">
          <div className="hf-honey" aria-hidden="true">
            {HF_HONEY.map(([g, x, y], i) => (
              <img key={i} className="hf-combhex" src={`media/figma/s9-hex-${g}.png`} alt="" style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }} />
            ))}
          </div>
          <span className="hf-kick hf-kick-m" aria-hidden="true">Creators. Affiliates. Technology partners.</span>
          <span className="hf-kick adv hf-kick-m" aria-hidden="true">Brands. Retailers. Enterprises.</span>
          <img className="hf-photohex hf-ph-pub" src="media/figma/s9-hex-pub.webp" alt="A publisher creating content" />
          <img className="hf-photohex hf-ph-adv" src="media/figma/s9-hex-adv.webp" alt="An advertiser growing their brand" />
          <div className="hf-card hf-card-pub">
            <span className="hf-kick">Creators. Affiliates. Technology partners.</span>
            <h3 className="hf-ct">I'm a <br />Publisher</h3>
            <p className="hf-cd">Promote brands you love. <span className="hf-cd-more">Turn your audience or traffic into income.</span></p>
            <a href="/partners/" className="btn btn-primary">Start Earning <Arrow /></a>
          </div>
          <div className="hf-card hf-card-adv hf-right">
            <span className="hf-kick adv">Brands. Retailers. Enterprises.</span>
            <h3 className="hf-ct">I'm an <br />Advertiser</h3>
            <p className="hf-cd">Grow your sales with the right publishers. <span className="hf-cd-more">Pay only for results.</span></p>
            <a href="/advertisers/" className="btn btn-advertiser">Grow My Brand <Arrow /></a>
          </div>
        </div>
      </div>
      <style>{`
        .hf{ background:var(--warm-50); position:relative; overflow:hidden; }
        .hf-cta{ position:relative; padding:clamp(32px,4vh,56px) 0 clamp(48px,7vh,88px); text-align:center; }
        .hf-head{ position:relative; z-index:5; top:clamp(56px,8.5vh,82px); font-size:clamp(24px,3vw,34px); line-height:1.05; letter-spacing:-.01em; margin:clamp(20px,3vh,40px) auto clamp(12px,1.6vh,22px); max-width:none; white-space:nowrap; }
        .hf-scene{ position:relative; width:min(1320px,100%); height:clamp(420px,44vw,520px); margin:0 auto; }
        .hf-honey{ position:absolute; inset:0; z-index:0; pointer-events:none; }
        .hf-combhex{ position:absolute; width:247px; height:auto; transform:translate(-50%,-50%); opacity:.5; }
        .hf-photohex{ position:absolute; left:50%; top:50%; width:247px; height:auto; z-index:2; filter:drop-shadow(0 18px 40px rgba(15,28,46,.16)); }
        .hf-ph-pub{ transform:translate(calc(-50% - 134px), -50%) scaleX(-1); }
        .hf-ph-adv{ transform:translate(calc(-50% + 134px), -50%); }
        .hf-card{ position:absolute; top:50%; transform:translateY(-50%); width:min(280px,23vw); display:flex; flex-direction:column; gap:12px; z-index:4; }
        .hf-card-pub{ left:5%; align-items:flex-start; text-align:left; }
        .hf-card-adv{ right:5%; align-items:flex-end; text-align:right; }
        .hf-kick{ font:500 14px/1.3 var(--font-body); color:var(--ember); opacity:.85; }
        .hf-kick.adv{ color:var(--midnight-light); }
        .hf-kick-m{ display:none; }
        .hf-ct{ font:700 clamp(24px,2.4vw,32px)/1.05 var(--font-body); color:var(--warm-900); letter-spacing:-.01em; }
        .hf-cd{ font:400 16px/1.45 var(--font-body); color:var(--warm-900); opacity:.72; max-width:250px; }
        .hf-card-adv .hf-cd{ margin-left:auto; }
        @media (max-width:900px){
          .hf-cta{ padding:clamp(24px,4vh,44px) 20px clamp(40px,6vh,64px); }
          .hf-head{ white-space:normal; top:0; text-align:left; margin:clamp(16px,3.5vh,30px) 0 clamp(22px,4.5vh,40px); font-size:clamp(22px,6.4vw,30px); }
          .hf-scene{ height:auto; display:grid; grid-template-columns:1fr 1fr; grid-template-rows:auto auto auto;
            column-gap:clamp(14px,4vw,26px); row-gap:clamp(9px,1.8vh,13px); align-items:start; width:100%; max-width:500px; margin:0 auto; }
          .hf-honey{ display:none; }
          .hf-card .hf-kick{ display:none; }
          .hf-cd-more{ display:none; }
          .hf-kick-m{ display:block; font-size:12px; line-height:1.35; opacity:.9; }
          .hf-kick-m:not(.adv){ grid-column:1; grid-row:1; text-align:left; }
          .hf-kick-m.adv{ grid-column:2; grid-row:1; text-align:right; }
          .hf-photohex{ position:relative; left:auto; top:auto; width:100%; max-width:200px; height:auto; filter:none; z-index:2; }
          .hf-ph-pub{ grid-column:1; grid-row:2; transform:scaleX(-1); justify-self:start; }
          .hf-ph-adv{ grid-column:2; grid-row:2; transform:none; margin:0; justify-self:end; }
          .hf-card{ position:relative; top:auto; left:auto; right:auto; transform:none; width:100%; max-width:none; margin-inline:0;
            display:flex; flex-direction:column; gap:8px; margin-top:clamp(6px,1.4vh,12px); }
          .hf-card-pub{ grid-column:1; grid-row:3; align-items:flex-start; text-align:left; }
          .hf-card-adv{ grid-column:2; grid-row:3; align-items:flex-end; text-align:right; }
          .hf-ct{ font-size:clamp(20px,5.4vw,26px); }
          .hf-cd{ font-size:14px; max-width:none; opacity:.72; }
          .hf-card-adv .hf-cd{ margin-left:0; }
          .hf-card .btn{ padding:10px 16px; font-size:13px; gap:7px; margin-top:2px; }
        }
      `}</style>
    </section>
  );
}

function GlossaryApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <GlossaryHero />
        <GlossaryList />
        <HexFinaleStatic />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<GlossaryApp />);
