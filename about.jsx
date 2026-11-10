/* ============================================================================
   about.jsx — "About" page. Redesigned from the legacy involve.asia/about page,
   rebuilt with our reusable components + page styles. Loaded AFTER ia-shared.jsx
   (Nav/Footer/Arrow/BackToTop/hooks/prefersReduced live on window / global scope).
   ============================================================================ */

/* ---------- Decorative honeycomb (ember→blue gradient) — reused from glossary/hero --- */
let __abHexGradN = 0;
function AboutHexField() {
  const [gid] = React.useState(() => 'abHexGrad' + (++__abHexGradN));
  const { paths, W, H, transform } = window.useHeroDecoArt();
  const pad = 0.12;
  const vb = `${-W * pad} ${-H * pad} ${W * (1 + 2 * pad)} ${H * (1 + 2 * pad)}`;
  return (
    <svg className="ab-hexfield" viewBox={vb} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="var(--warm-100)" transform={transform}>{paths.map((d, i) => <path key={i} className="hx" d={d} />)}</g>
    </svg>
  );
}

/* ---------- Section 1 — Hero -------------------------------------------------- */
const ABOUT_CHIPS = ['Accurate tracking', 'On-time payouts', 'Secure and reliable'];
function AboutHero() {
  return (
    <section id="about-hero" className="ah-sec">
      <div className="ah-honey" aria-hidden="true"><AboutHexField /></div>
      <div className="wrap ah-wrap">
        <span className="ah-eyebrow" data-reveal>About us</span>
        <h1 className="ah-title" data-reveal data-reveal-delay="1">Driving growth across Asia.</h1>
        <p className="ah-sub" data-reveal data-reveal-delay="1">We connect brands and partners through transparent technology, seamless commission payouts, and global opportunities.</p>
        <div className="ah-chips" data-reveal data-reveal-delay="2">
          {ABOUT_CHIPS.map((c) => <span className="ah-chip" key={c}>{c}</span>)}
        </div>
      </div>
      <style>{`
        .ah-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(48px,9vh,104px) 0 clamp(30px,5vh,56px); text-align:center; }
        /* start the field under the transparent nav (74px + 1px border) so its top row isn't cut at the nav line */
        .ah-honey{ position:absolute; left:0; top:-75px; width:100%; height:calc(100% + 75px); z-index:0; pointer-events:none; }
        .ab-hexfield{ position:absolute; inset:0; width:100%; height:100%; opacity:1;
          -webkit-mask-image:radial-gradient(120% 100% at 50% 30%, #000 0%, #000 40%, transparent 76%);
          mask-image:radial-gradient(120% 100% at 50% 30%, #000 0%, #000 40%, transparent 76%); }
        .ah-wrap{ position:relative; z-index:1; }
        .ah-eyebrow{ display:inline-block; font:700 13px/1 var(--font-body); letter-spacing:.14em; text-transform:uppercase; color:var(--ember); }
        .ah-title{ margin:18px auto 0; max-width:880px; font-size:clamp(32px,5vw,60px); line-height:1.04; letter-spacing:-.03em; color:var(--warm-900); }
        .ah-sub{ margin:22px auto 0; max-width:660px; font:400 clamp(16px,1.4vw,19px)/1.55 var(--font-body); color:var(--warm-600); }
        .ah-chips{ margin:30px auto 0; display:flex; flex-wrap:wrap; justify-content:center; gap:12px; }
        .ah-chip{ display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border:1px solid var(--warm-200); border-radius:var(--r-full);
          background:rgba(255,255,255,.6); font:600 14px/1 var(--font-body); color:var(--warm-900); }
        .ah-chip::before{ content:""; width:7px; height:7px; border-radius:50%; background:var(--ember); }
        @media (max-width:600px){ .ah-sec{ text-align:left; } .ah-title,.ah-sub{ margin-left:0; } .ah-chips{ justify-content:flex-start; } .ab-hexfield{ left:56%; opacity:1; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 2 — Stat band (count-up) --------------------------------- */
function CountStat({ prefix = '', value, decimals = 0, suffix = '', comma = false }) {
  const ref = React.useRef(null);
  const fmt = (n) => prefix + (comma ? Math.round(n).toLocaleString() : n.toFixed(decimals)) + suffix;
  const [txt, setTxt] = React.useState(fmt(0));
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    if (prefersReduced()) { setTxt(fmt(value)); return; }
    let raf = 0, done = false, tid = 0;
    const animate = () => {
      const dur = 1600; let start = null;
      const step = (now) => {
        if (start == null) start = now;
        const p = Math.min(1, (now - start) / dur);
        setTxt(fmt(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step); else setTxt(fmt(value));
      };
      raf = requestAnimationFrame(step);
    };
    const go = () => { if (done) return; done = true; animate(); io.disconnect(); if (tid) clearTimeout(tid); };
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) go(); }, { threshold: 0.35 });
    io.observe(el);
    // Fallback: populate if the stat is already within view shortly after mount and the observer hasn't fired.
    tid = setTimeout(() => { const t = el.getBoundingClientRect().top; if (t < window.innerHeight && t > -el.offsetHeight) go(); }, 1200);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); if (tid) clearTimeout(tid); };
  }, []);
  return <b ref={ref}>{txt}</b>;
}
// Figures reconciled with the homepage STAT_BAND (ia-bundle.jsx): $3.2B+ sales,
// 1,000,000+ partners, 500+ brands, $270M+ commissions paid.
const ABOUT_STATS = [
  { el: <CountStat prefix="$" value={3.2} decimals={1} suffix="B+" />, label: 'Sales Generated' },
  { el: <CountStat value={1000000} comma suffix="+" />, label: 'Partners' },
  { el: <CountStat value={500} suffix="+" />, label: 'Brands' },
  { el: <CountStat prefix="$" value={270} suffix="M+" />, label: 'Commissions Paid' },
];
function AboutStats() {
  return (
    <section id="about-stats" className="abs-sec">
      <div className="wrap">
        <div className="abs-grid">
          {ABOUT_STATS.map((s, i) => (
            <div className="abs-stat" key={s.label} data-reveal data-reveal-delay={i + 1}>
              {s.el}
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .abs-sec{ background:var(--warm-50); padding:clamp(8px,2vh,20px) 0 clamp(40px,7vh,80px); }
        .abs-grid{ display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(24px,3vw,44px);
          border-top:1px solid var(--warm-200); border-bottom:1px solid var(--warm-200); padding:clamp(32px,5vh,52px) 0; }
        .abs-stat{ min-width:0; text-align:center; display:flex; flex-direction:column; align-items:center; }
        .abs-stat b{ font-family:var(--font-display); font-weight:800; font-size:clamp(30px,3.6vw,48px); line-height:1; letter-spacing:-.02em; color:var(--warm-900); }
        .abs-stat span{ margin-top:10px; font:400 clamp(14px,1.3vw,17px)/1.25 var(--font-body); color:var(--warm-600); }
        @media (max-width:760px){ .abs-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); gap:clamp(26px,5vh,38px) clamp(18px,5vw,30px); } }
      `}</style>
    </section>
  );
}

/* ---------- Section 3 — Our Story (2-col) ------------------------------------ */
const ABOUT_MILESTONES = [
  ['2014', 'Founded in Kuala Lumpur', 'Involve Asia starts with one goal: connect brands with the partners who can genuinely grow them.'],
  ['Growth', 'Across Southeast Asia', 'Expands into six markets, building local teams that understand each one.'],
  ['Partnerships', 'Trusted by leading platforms', 'Becomes a go-to partner for brands like Shopee, Lazada and TikTok Shop.'],
  ['Recognition', 'Awarded and certified', 'Earns B Corp certification and a place on the Deloitte Technology Fast 500.'],
];
function AboutStory() {
  return (
    <section id="about-story" className="ast-sec">
      <div className="wrap">
        <div className="ast-wrap">
          <div className="ast-head" data-reveal>
            <span className="ast-eyebrow">Our story</span>
            <h2 className="ast-title">Built for Southeast Asia from day one.</h2>
          </div>
          <div className="ast-body" data-reveal data-reveal-delay="1">
            <p>We started in 2014 with one goal: connect brands with the people who can genuinely grow them, and make the results something both sides can trust. Today, more than 500 brands and over a million partners grow together on Involve Asia, from cashback sites to creators. Every sale is tracked and validated before anyone is paid.</p>
          </div>
        </div>
        <ol className="ast-timeline">
          {ABOUT_MILESTONES.map(([yr, t, d], i) => (
            <li className="ast-ms" key={t} data-reveal data-reveal-delay={i + 1}>
              <span className="ast-ms-dot" aria-hidden="true" />
              <span className="ast-ms-yr">{yr}</span>
              <h3 className="ast-ms-t">{t}</h3>
              <p className="ast-ms-d">{d}</p>
            </li>
          ))}
        </ol>
      </div>
      <style>{`
        .ast-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .ast-wrap{ display:grid; grid-template-columns:1fr 1.1fr; gap:clamp(28px,5vw,72px); align-items:start; }
        .ast-eyebrow{ display:inline-block; font:700 13px/1 var(--font-body); letter-spacing:.14em; text-transform:uppercase; color:var(--ember); }
        .ast-title{ margin-top:16px; font-family:var(--font-display); font-weight:800; font-size:clamp(26px,3.4vw,42px); line-height:1.1; letter-spacing:-.03em; color:var(--warm-900); }
        .ast-body p{ font:400 clamp(16px,1.3vw,18px)/1.65 var(--font-body); color:var(--warm-600); }
        .ast-body p + p{ margin-top:20px; }
        /* milestone timeline */
        .ast-timeline{ list-style:none; margin:clamp(38px,6vh,64px) 0 0; padding:0; display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(20px,3vw,40px); }
        .ast-ms{ position:relative; padding-top:26px; }
        .ast-ms::before{ content:""; position:absolute; top:6px; left:0; right:0; height:2px; background:var(--warm-200); }
        .ast-ms:first-child::before{ left:6px; border-radius:2px 0 0 2px; }
        .ast-ms:last-child::before{ right:calc(100% - 12px); }
        .ast-ms-dot{ position:absolute; top:1px; left:0; width:12px; height:12px; border-radius:50%; background:var(--ember); box-shadow:0 0 0 4px var(--warm-50); }
        .ast-ms-yr{ display:inline-block; font:700 12px/1 var(--font-body); letter-spacing:.1em; text-transform:uppercase; color:var(--ember); }
        .ast-ms-t{ margin-top:10px; font-family:var(--font-display); font-weight:800; font-size:16px; letter-spacing:-.01em; color:var(--warm-900); }
        .ast-ms-d{ margin-top:8px; font:400 14px/1.5 var(--font-body); color:var(--warm-600); }
        @media (max-width:820px){ .ast-wrap{ grid-template-columns:1fr; gap:24px; } .ast-timeline{ grid-template-columns:1fr 1fr; row-gap:clamp(26px,4vh,34px); } .ast-ms::before{ display:none; } .ast-ms{ padding-top:22px; } }
        @media (max-width:480px){ .ast-timeline{ grid-template-columns:1fr; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 3b — Office sign (container-width photo before "Our expertise") ---------- */
function AboutSign() {
  return (
    <section id="about-sign" className="asn-sec" aria-label="Involve Asia office">
      <div className="wrap">
        <img className="asn-img" src="media/figma/IA_company-sign.png" alt="The Involve Asia logo sign on a black wall in our office" loading="lazy" data-reveal />
      </div>
      <style>{`
        .asn-sec{ background:var(--warm-50); }
        /* photo radius matches the other About photos (culture, careers); on phones a taller crop keeps the logo readable */
        .asn-img{ display:block; width:100%; aspect-ratio:1264/561; object-fit:cover; object-position:35% 50%; border-radius:var(--r-xl); }
        @media (max-width:560px){ .asn-img{ aspect-ratio:16/10; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 4 — What we do (3 numbered steps, .hiw-*) ---------------- */
const ABOUT_EXPERTISE = [
  ['01', 'Performance partnership', 'We connect brands with publishers, and you pay only for real results, with full tracking and transparency.'],
  ['02', 'Seamless technology', 'Our platform handles campaign setup, tracking, and payouts, with accurate reporting you can check yourself.'],
  ['03', 'Cross-market expertise', 'Our local teams know each market, so brands and partners get support that fits where they operate.'],
];
function AboutExpertise() {
  return (
    <section id="about-expertise" className="hiw-sec">
      <div className="wrap">
        <span className="hiw-eyebrow" data-reveal>Our expertise</span>
        <h2 className="hiw-title" data-reveal>What we do.</h2>
        <p className="hiw-sub" data-reveal>We connect brands with the publishers who can grow them, and give both sides the tracking and payouts to trust the results.</p>
        <div className="hiw-grid">
          {ABOUT_EXPERTISE.map(([n, t, d], i) => (
            <div className="hiw-step" key={n} data-reveal data-reveal-delay={i + 1}>
              <span className="hiw-num" aria-hidden="true">{n}</span>
              <h3 className="hiw-ct">{t}</h3>
              <p className="hiw-cd">{d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .hiw-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .hiw-eyebrow{ display:inline-block; font:700 13px/1 var(--font-body); letter-spacing:.14em; text-transform:uppercase; color:var(--ember); }
        .hiw-title{ margin-top:16px; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .hiw-sub{ margin-top:12px; max-width:560px; font:400 clamp(16px,1.3vw,18px)/1.5 var(--font-body); color:var(--warm-600); }
        .hiw-grid{ margin-top:clamp(34px,5.5vh,58px); display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(28px,4vw,56px); }
        .hiw-step{ min-width:0; }
        .hiw-num{ display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:50%; background:var(--ember); color:#fff; font-family:var(--font-display); font-weight:800; font-size:17px; letter-spacing:-.01em; }
        .hiw-ct{ margin-top:clamp(20px,3vh,28px); font-family:var(--font-display); font-weight:800; font-size:20px; letter-spacing:-.01em; color:var(--warm-900); }
        .hiw-cd{ margin-top:10px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:340px; }
        @media (max-width:760px){ .hiw-grid{ grid-template-columns:1fr; gap:48px; max-width:440px; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 5 — Mission · Vision · Values ---------------------------- */
const ABOUT_VALUES = [
  ['01', 'Partners first', 'We win when our partners grow.'],
  ['02', 'Clarity and trust', 'You see the real numbers, validated before anyone is paid.'],
  ['03', 'Always improving', 'We challenge limits and celebrate progress.'],
];
function AboutMission() {
  return (
    <section id="about-mission" className="am-sec">
      <div className="wrap">
        <span className="am-eyebrow" data-reveal>Why we exist</span>
        <h2 className="am-title" data-reveal>Mission, vision & values.</h2>
        <div className="am-mv">
          <div className="am-card am-mission" data-reveal data-reveal-delay="1">
            <span className="am-kick">Mission</span>
            <p>Empower brands and partners to grow through transparent technology and performance-driven marketing.</p>
          </div>
          <div className="am-card am-vision" data-reveal data-reveal-delay="2">
            <span className="am-kick">Vision</span>
            <p>Build the affiliate marketing platform Southeast Asia trusts, where every conversion creates shared success.</p>
          </div>
        </div>
        <div className="am-values">
          {ABOUT_VALUES.map(([n, t, d], i) => (
            <div className="am-value" key={n} data-reveal data-reveal-delay={i + 1}>
              <span className="am-vnum">{n}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .am-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .am-eyebrow{ display:inline-block; font:700 13px/1 var(--font-body); letter-spacing:.14em; text-transform:uppercase; color:var(--ember); }
        .am-title{ margin-top:16px; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .am-mv{ margin-top:clamp(28px,4vh,44px); display:grid; grid-template-columns:1fr 1fr; gap:clamp(20px,2.5vw,28px); }
        .am-card{ border-radius:var(--r-xl); padding:clamp(26px,3vw,38px); background:#fff; }
        .am-kick{ display:inline-block; font:700 12px/1 var(--font-body); letter-spacing:.12em; text-transform:uppercase; color:var(--warm-800); }
        .am-card p{ margin-top:14px; font:500 clamp(17px,1.6vw,21px)/1.5 var(--font-body); letter-spacing:-.01em; color:var(--warm-900); }
        .am-values{ margin-top:clamp(24px,3.5vh,40px); display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(20px,3vw,40px); }
        .am-value{ display:flex; gap:16px; align-items:flex-start; min-width:0; }
        .am-vnum{ flex:0 0 auto; font-family:var(--font-display); font-weight:800; font-size:20px; color:var(--ember); }
        .am-value h3{ font-family:var(--font-display); font-weight:800; font-size:18px; letter-spacing:-.01em; color:var(--warm-900); }
        .am-value p{ margin-top:6px; font:400 15px/1.5 var(--font-body); color:var(--warm-600); }
        @media (max-width:760px){ .am-mv{ grid-template-columns:1fr; } .am-values{ grid-template-columns:1fr; gap:20px; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 6 — Awards & Recognition -------------------------------- */
const ABOUT_AWARDS = [
  { head: 'Industry Awards', items: [
    ["Shopee's Best Partner of the Year", 'Innovation & growth at scale', 'about-award-shopee.png'],
    ["TikTok Shop's Top Affiliate Link Star", 'Creator-led excellence', 'about-award-tiktokshop.png'],
    ["Lazada's Affiliate of the Year", 'Outstanding partner results', 'about-award-lazada.png'],
    ["Malaysia's Affiliate Marketing Pioneer", 'Industry leadership', 'about-award-malaysia-pioneer.png'],
  ] },
  { head: 'Technology Recognition', items: [
    ['Certified B Corporation®', 'Social & environmental standards', 'about-award-bcorp.png'],
    ['Deloitte Technology Fast 500', 'Asia Pacific tech growth award', 'about-award-deloitte.png'],
    ['MSC Status', 'National tech & innovation recognition', 'about-award-msc.png'],
  ] },
];
function AboutAwards() {
  return (
    <section id="about-awards" className="aw-sec">
      <div className="wrap">
        <span className="aw-eyebrow" data-reveal>Proof of performance</span>
        <h2 className="aw-title" data-reveal>Awards & recognition.</h2>
        <p className="aw-sub" data-reveal>From startup recognition to industry awards, we're proud of our journey, and the partners who made it possible.</p>
        <div className="aw-cols">
          {ABOUT_AWARDS.map((col, ci) => (
            <div className="aw-col" key={col.head} data-reveal data-reveal-delay={ci + 1}>
              <h3 className="aw-head">{col.head}</h3>
              <div className="aw-grid">
                {col.items.map(([t, d, img]) => (
                  <div className="aw-item" key={t}>
                    <div className="aw-ph"><img src={`media/figma/${img}`} alt={t} loading="lazy" /></div>
                    <b>{t}</b><em>{d}</em>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .aw-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .aw-eyebrow{ display:inline-block; font:700 13px/1 var(--font-body); letter-spacing:.14em; text-transform:uppercase; color:var(--ember); }
        .aw-title{ margin-top:16px; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .aw-sub{ margin-top:12px; max-width:600px; font:400 clamp(16px,1.3vw,18px)/1.5 var(--font-body); color:var(--warm-600); }
        .aw-cols{ margin-top:clamp(30px,5vh,52px); display:grid; grid-template-columns:1fr 1fr; gap:clamp(28px,4vw,56px); align-items:start; }
        .aw-head{ font:700 13px/1 var(--font-body); letter-spacing:.1em; text-transform:uppercase; color:var(--warm-400); padding-bottom:16px; margin-bottom:clamp(20px,3vh,28px); border-bottom:1px solid var(--warm-200); }
        .aw-grid{ display:grid; grid-template-columns:1fr 1fr; gap:clamp(18px,2vw,24px); }
        .aw-item{ min-width:0; }
        .aw-ph{ display:flex; align-items:center; justify-content:center; aspect-ratio:16/10; border:1px solid var(--warm-200); border-radius:var(--r-xl);
          background:#fff; padding:clamp(14px,2vw,24px); overflow:hidden; }
        .aw-ph img{ max-width:100%; max-height:100%; object-fit:contain; display:block; }
        .aw-item b{ display:block; margin-top:14px; font-family:var(--font-display); font-weight:800; font-size:15px; letter-spacing:-.01em; color:var(--warm-900); }
        .aw-item em{ display:block; margin-top:4px; font-style:normal; font:400 13px/1.4 var(--font-body); color:var(--warm-600); }
        @media (max-width:760px){ .aw-cols{ grid-template-columns:1fr; gap:56px; } }
        @media (max-width:420px){ .aw-grid{ grid-template-columns:1fr; row-gap:32px; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 7 — Regional presence -----------------------------------
   HQ (Malaysia) as the large item on the left; the other five markets sit on the
   right in a 3-column grid with flag + name only (their descriptions aren't validated). */
const ABOUT_HQ = { cc: 'my', name: 'Malaysia', tag: 'Headquarters', desc: 'Kuala Lumpur, where it all began. Our HQ is home to the core marketing, partnerships, and tech teams driving growth across the region.' };
// [country code (flag file), name]
const ABOUT_REGIONS = [['id', 'Indonesia'], ['sg', 'Singapore'], ['ph', 'Philippines'], ['th', 'Thailand'], ['vn', 'Vietnam']];
function AboutRegions() {
  return (
    <section id="about-regions" className="ar-sec">
      <div className="wrap">
        <span className="ar-eyebrow" data-reveal>Regional presence</span>
        <h2 className="ar-title" data-reveal>Where you can find us.</h2>
        <p className="ar-sub" data-reveal>We operate across six Southeast Asian markets, connecting local brands, creators, and communities through affiliate marketing.</p>
        <div className="ar-grid">
          <div className="ar-hq" data-reveal data-reveal-delay="1">
            <img className="ar-flag" src={`media/figma/${ABOUT_HQ.cc}-flag-icon.svg`} alt="" width="56" height="56" />
            <div className="ar-cardhead">
              <h3>{ABOUT_HQ.name}</h3>
              <span className="ar-tag">{ABOUT_HQ.tag}</span>
            </div>
            <p>{ABOUT_HQ.desc}</p>
          </div>
          <div className="ar-others">
            {ABOUT_REGIONS.map(([cc, name], i) => (
              <div className="ar-card" key={name} data-reveal data-reveal-delay={(i % 3) + 1}>
                <img className="ar-flag" src={`media/figma/${cc}-flag-icon.svg`} alt="" width="40" height="40" />
                <h3>{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .ar-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .ar-eyebrow{ display:inline-block; font:700 13px/1 var(--font-body); letter-spacing:.14em; text-transform:uppercase; color:var(--ember); }
        .ar-title{ margin-top:16px; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .ar-sub{ margin-top:12px; max-width:600px; font:400 clamp(16px,1.3vw,18px)/1.5 var(--font-body); color:var(--warm-600); }
        .ar-grid{ margin-top:clamp(30px,5vh,52px); display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.6fr); gap:clamp(32px,5vw,72px); align-items:start; }
        /* open layout: no card boxes; a hairline separates HQ from the other markets */
        .ar-hq{ min-width:0; }
        .ar-hq .ar-flag{ width:56px; height:56px; margin-bottom:20px; }
        .ar-cardhead{ display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
        .ar-hq h3{ font-family:var(--font-display); font-weight:800; font-size:clamp(22px,2.2vw,26px); letter-spacing:-.02em; color:var(--warm-900); }
        .ar-tag{ font:700 10px/1 var(--font-body); letter-spacing:.08em; text-transform:uppercase; color:var(--ember); background:rgba(240,88,38,.12); border-radius:var(--r-full); padding:5px 9px; }
        .ar-hq p{ margin-top:12px; max-width:420px; font:400 15px/1.55 var(--font-body); color:var(--warm-600); }
        .ar-others{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(32px,5vh,48px) clamp(18px,2vw,24px);
          border-left:1px solid var(--warm-200); padding-left:clamp(32px,5vw,72px); }
        .ar-card{ min-width:0; }
        .ar-flag{ display:block; width:40px; height:40px; margin-bottom:16px; }
        .ar-card h3{ font-family:var(--font-display); font-weight:800; font-size:19px; letter-spacing:-.01em; color:var(--warm-900); }
        @media (max-width:820px){
          .ar-grid{ grid-template-columns:1fr; }
          .ar-others{ border-left:0; padding-left:0; border-top:1px solid var(--warm-200); padding-top:clamp(28px,5vh,40px); }
        }
        @media (max-width:420px){ .ar-card h3{ font-size:16px; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 8 — Life at Involve Asia (culture photo gallery) ---------
   Images to be supplied — rendered as placeholders for now. */
const ABOUT_CULTURE = ['about-culture-1.png', 'about-culture-2.png', 'about-culture-3.png', 'about-culture-4.png', 'about-culture-5.png'];
function AboutCulture() {
  return (
    <section id="about-culture" className="cul-sec">
      <div className="wrap">
        <span className="cul-eyebrow" data-reveal>Life at Involve Asia</span>
        <h2 className="cul-title" data-reveal>Moments that define our culture.</h2>
        <p className="cul-sub" data-reveal>Our culture is built on collaboration, curiosity, and growth. We celebrate milestones and make space for ideas that move us forward.</p>
        <div className="cul-grid" data-reveal data-reveal-delay="1">
          {ABOUT_CULTURE.map((f, i) => (
            <div className={'cul-item' + (i === 0 ? ' cul-big' : '')} key={f}>
              <img src={`media/figma/${f}`} alt="Life at Involve Asia" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .cul-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .cul-eyebrow{ display:inline-block; font:700 13px/1 var(--font-body); letter-spacing:.14em; text-transform:uppercase; color:var(--ember); }
        .cul-title{ margin-top:16px; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .cul-sub{ margin-top:12px; max-width:600px; font:400 clamp(16px,1.3vw,18px)/1.5 var(--font-body); color:var(--warm-600); }
        .cul-grid{ margin-top:clamp(30px,5vh,52px); display:grid; grid-template-columns:repeat(4,1fr); grid-auto-rows:clamp(130px,15.5vw,182px); gap:clamp(10px,1.2vw,16px); }
        .cul-item{ border-radius:var(--r-xl); overflow:hidden; background:var(--warm-150); }
        .cul-item img{ width:100%; height:100%; object-fit:cover; display:block; }
        .cul-big{ grid-column:span 2; grid-row:span 2; }
        @media (max-width:820px){ .cul-grid{ grid-template-columns:repeat(2,1fr); } .cul-big{ grid-column:span 2; grid-row:span 1; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 9 — Join our team (reuses the app-owners "Automated through
   our API." component: white box, 2-col copy + image) -------------------------- */
function AboutCareers() {
  return (
    <section id="about-careers" className="ac-sec">
      <div className="wrap">
        <div className="ac-box">
          <div className="ac-grid">
            <div className="ac-left" data-reveal>
              <h2 className="ac-title">Build the future of affiliate marketing with us.</h2>
              <p className="ac-body">Join a team of creators, marketers, and data experts solving real problems across Southeast Asia. Let's grow brands, and your career, together.</p>
              <a className="ac-link" href="https://careers.involve.asia/">
                View Open Roles
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 5.5l6.5 6.5L9 18.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
            <div className="ac-photo" data-reveal data-reveal-delay="1">
              <img src="media/figma/about-team.png" alt="The Involve Asia team" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .ac-sec{ background:var(--warm-50); padding:clamp(24px,4vh,52px) 0 clamp(40px,7vh,88px); }
        .ac-box{ background:#fff; border-radius:var(--r-xl); padding:clamp(28px,3.5vw,56px); box-shadow:0 1px 3px rgba(15,28,46,.04); }
        .ac-grid{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,492px); gap:clamp(36px,5vw,80px); align-items:center; }
        .ac-left{ max-width:580px; }
        .ac-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.14; letter-spacing:-.03em; color:var(--warm-900); }
        .ac-body{ margin-top:22px; font:400 16px/1.42 var(--font-body); color:var(--warm-600); max-width:520px; }
        .ac-link{ margin-top:26px; display:inline-flex; align-items:center; gap:8px; font:700 16px/1 var(--font-body); color:var(--warm-900); text-decoration:none; }
        .ac-link svg{ transition:transform .2s ease; }
        .ac-link:hover svg{ transform:translateX(3px); }
        /* right-side image (placeholder until supplied) */
        .ac-photo{ aspect-ratio:4/3; border-radius:var(--r-xl); overflow:hidden;
          background:var(--warm-150); box-shadow:0 12px 30px rgba(15,28,46,.06); }
        .ac-photo img{ width:100%; height:100%; object-fit:cover; display:block; }
        @media (max-width:820px){ .ac-grid{ grid-template-columns:minmax(0,1fr); gap:32px; } }
      `}</style>
    </section>
  );
}

/* ---------- Final section — "Pick your side" dual-audience CTA (reused) ------- */
function HexFinaleStatic() {
  // [column, row] on the .hf-scene grid (publisher photo = col 0 row 0; odd rows shift half a column)
  const HF_HONEY = [[0, -1], [1, -1], [-2, 1], [-1, 1], [0, 1], [2, 1]];
  return (
    <section id="cta" className="hf">
      <div className="hf-cta">
        <h2 className="hf-head" data-reveal>Pick your side and grow with us.</h2>
        <div className="hf-scene">
          <div className="hf-honey" aria-hidden="true">
            {HF_HONEY.map(([c, r], i) => (
              <span key={i} className="hf-combhex" style={{ '--c': c + (r % 2 ? 0.5 : 0), '--r': r, '--i': i + 2 }} />
            ))}
          </div>
          <span className="hf-kick hf-kick-m" aria-hidden="true">Creators. Affiliates. Technology Partners.</span>
          <span className="hf-kick adv hf-kick-m" aria-hidden="true">Brands. Retailers. Enterprises.</span>
          <img className="hf-photohex hf-ph-pub" src="media/figma/s9-hex-pub.webp" alt="A publisher creating content" style={{ '--i': 0 }} />
          <img className="hf-photohex hf-ph-adv" src="media/figma/s9-hex-adv.webp" alt="An advertiser growing their brand" style={{ '--i': 1 }} />
          <div className="hf-card hf-card-pub">
            <span className="hf-kick">Creators. Affiliates. Technology Partners.</span>
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
        /* top padding grows as .hf-scene shrinks (its height is clamp(420px,44vw,520px)) so the top
           honeycomb row, which sits a fixed distance above the scene centre, is never cut by the section edge */
        .hf-cta{ position:relative; padding:calc(clamp(32px,4vh,56px) + (520px - clamp(420px,44vw,520px)) / 2 + 16px) 0 clamp(48px,7vh,88px); text-align:center; }
        .hf-head{ position:relative; z-index:5; top:clamp(56px,8.5vh,82px); font-size:clamp(24px,3vw,34px); line-height:1.05; letter-spacing:-.01em; margin:clamp(20px,3vh,40px) auto clamp(12px,1.6vh,22px); max-width:none; white-space:nowrap; }
        .hf-scene{ position:relative; width:min(1320px,100%); height:clamp(420px,44vw,520px); margin:0 auto;
          /* one pointy-top honeycomb for photos + decoration. W = flat-to-flat width (the PNG/WebP
             hexes have no padding), g = photo gap. Column step D = W + g, row step D·√3/2; odd rows
             shift half a column. Origin (col 0, row 0) = publisher photo, advertiser = col 1. */
          --hx-w:247px; --hx-g:21px; --hx-D:calc(var(--hx-w) + var(--hx-g)); --hx-x0:calc(var(--hx-D) / -2); }
        .hf-honey{ position:absolute; inset:0; z-index:0; pointer-events:none; }
        /* decorative tiles: flat warm-100, shaped by the rounded-hex PNG used as a mask */
        .hf-combhex{ position:absolute; width:var(--hx-w); aspect-ratio:640/720; transform:translate(-50%,-50%); background:var(--warm-100);
          -webkit-mask:url('media/figma/s9-hex-g1.png') center/100% 100% no-repeat; mask:url('media/figma/s9-hex-g1.png') center/100% 100% no-repeat;
          left:calc(50% + var(--hx-x0) + var(--c) * var(--hx-D)); top:calc(50% + var(--r) * var(--hx-D) * 0.8660254); }
        /* reveal: ia-shared.jsx sets html.hx-js (JS only) and toggles .is-in as the scene enters/leaves
           the viewport; hexes fade in one by one (--i), and out in reverse order */
        .hx-js .hf-scene .hf-photohex, .hx-js .hf-scene .hf-combhex{ opacity:0; transition:opacity .5s ease; transition-delay:calc((7 - var(--i)) * 60ms); }
        .hx-js .hf-scene.is-in .hf-photohex, .hx-js .hf-scene.is-in .hf-combhex{ opacity:1; transition-delay:calc(var(--i) * 110ms); }
        @media (prefers-reduced-motion: reduce){ .hx-js .hf-scene .hf-photohex, .hx-js .hf-scene .hf-combhex{ transition:none; } }
        .hf-photohex{ position:absolute; left:50%; top:50%; width:var(--hx-w); height:auto; z-index:2; filter:drop-shadow(0 18px 40px rgba(15,28,46,.16)); }
        .hf-ph-pub{ transform:translate(calc(-50% + var(--hx-x0)), -50%) scaleX(-1); }
        .hf-ph-adv{ transform:translate(calc(-50% + var(--hx-x0) + var(--hx-D)), -50%); }
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

function AboutApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <AboutHero />
        <AboutStats />
        <AboutStory />
        <AboutSign />
        <AboutExpertise />
        <AboutMission />
        <AboutAwards />
        <AboutRegions />
        <AboutCulture />
        <AboutCareers />
        <HexFinaleStatic />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AboutApp />);
