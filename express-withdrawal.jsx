/* ============================================================================
   publishers.jsx — "For Publishers" overview page.
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, FinalCta, Faq, AppDownload, HeroHexDeco, HERO_HEXDECO_CSS } = window;

/* ---------- Section 1 — Hero ---------------------------------------------- */
function PubHero() {
  return (
    <section id="pub-hero" className="ph-sec">
      <HeroHexDeco />
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <div className="ph-copy">
          <h1 className="ph-title" data-reveal>Get paid faster, with Express Withdrawal.</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="1">Withdraw a portion of your earnings before your conversions are even validated, in as little as 5 to 7 working days after approval. Your money, sooner.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="2">
            <a href="/partners/" className="btn btn-primary btn-lg">Start Earning <Arrow /></a>
          </div>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo"><img src="media/figma/express-hero.png" alt="A publisher checking their Involve app payouts on their phone" loading="eager" /></div>
          <div className="ph-static-ui" data-reveal data-reveal-delay="2">
            <div className="ph-glass ph-g-pay-a"><div className="ph-pay"><span>Payout Received</span><b>+ $48</b></div></div>
          </div>
        </div>
      </div>

      <style>{`
        .ph-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(40px,6vh,84px) 0 clamp(56px,9vh,116px); }
        ${HERO_HEXDECO_CSS}
        /* gradient blend from the hero into the logo strip below */
        .ph-basefade{ position:absolute; left:0; right:0; bottom:0; height:clamp(120px,24%,240px); z-index:0; pointer-events:none;
          background:linear-gradient(180deg, rgba(250,250,248,0) 0%, rgba(250,250,248,.65) 55%, var(--warm-50) 100%); }
        .ph-wrap{ position:relative; z-index:1; display:grid; grid-template-columns:1.02fr .98fr; gap:clamp(24px,4vw,60px); align-items:center; }
        /* copy */
        .ph-copy{ min-width:0; }
        .ph-eyebrow{ display:inline-block; font:600 13px/1 var(--font-body); letter-spacing:.02em; color:var(--ember);
          background:rgba(240,88,38,.10); border-radius:var(--r-full); padding:8px 15px; }
        .ph-title{ margin-top:20px; font-size:clamp(28px,4.4vw,50px); line-height:1.0; letter-spacing:-.03em; color:var(--warm-900); }
        .ph-sub{ margin-top:20px; max-width:520px; font-size:clamp(16px,1.4vw,19px); line-height:1.55; color:var(--warm-600); }
        .ph-actions{ margin-top:30px; display:flex; gap:12px; flex-wrap:wrap; }
        .ph-free{ display:block; margin-top:16px; font:500 14px/1 var(--font-body); color:var(--warm-400); }
        /* visual */
        /* match the advertiser hero: 1/1 container, 520px; the hexagon mask uses contain so the
           pointy-top hex keeps its 437:492 shape (centred) inside the square, same footprint as the advertiser */
        .ph-visual{ position:relative; aspect-ratio:1/1; max-width:520px; width:100%; margin-left:auto; }
        .ph-hexglow{ position:absolute; inset:2% 2% 2% 2%; z-index:0; pointer-events:none;
          display:none;  /* glow retired in v3.5.2 */ }
        /* soft hex plate behind the photo — rounded pointy-top (r≈38.67), ember → midnight gradient */
        .ph-hexplate{ position:absolute; inset:0; z-index:0; background:var(--warm-100);
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat;
          filter:drop-shadow(0 26px 54px rgba(15,28,46,.10)); }
        /* ---- fade slider: each slide (photo + its UI) cross-fades in/out ---- */
        .ph-slide{ position:absolute; inset:0; z-index:1; opacity:0; transition:opacity .85s cubic-bezier(.4,0,.2,1); }
        .ph-slide.is-active{ opacity:1; z-index:2; }
        @media (prefers-reduced-motion: reduce){ .ph-slide{ transition:none; } }
        .ph-photo{ position:absolute; inset:0; z-index:1;
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; }
        .ph-photo img{ width:100%; height:100%; object-fit:cover; display:block; }
        /* slides 1 & 3 are mirrored horizontally (no zoom) */
        .ph-photo img.ph-flip{ transform:scaleX(-1); }
        /* per-slide UI: subtle rise + fade in, synced with the slide */
        .ph-slide-ui{ position:absolute; inset:0; z-index:3; pointer-events:none; }
        .ph-slide-ui > *{ opacity:0; transform:translateY(12px); transition:opacity .7s cubic-bezier(.4,0,.2,1), transform .7s cubic-bezier(.4,0,.2,1); }
        .ph-slide.is-active .ph-slide-ui > *{ opacity:1; transform:translateY(0); transition-delay:.18s; }
        /* frosted glass box behind every UI element (matches Figma) */
        .ph-glass{ position:absolute; padding:7px; border-radius:var(--r-xl); background:rgba(255,255,255,.30);
          -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px); box-shadow:0 14px 34px rgba(15,28,46,.12); }
        .ph-g-link{ border-radius:var(--r-full); padding:6px; top:22%; right:-6%; }
        .ph-g-prod{ left:-3%; bottom:12%; width:26%; max-width:120px; }
        .ph-g-sales{ right:-3%; bottom:8%; }
        .ph-g-conv{ right:-7%; top:15%; }
        .ph-g-pay-a{ left:-7%; top:55%; }
        .ph-g-pay-b{ left:-8%; top:26%; }
        .ph-slide.is-active .ph-slide-ui > .ph-g-pay-b{ opacity:.62; }   /* second payout sits behind, fainter */
        /* single-image hero: static floating pill (above the photo, no slider fade) */
        .ph-static-ui{ position:absolute; inset:0; z-index:3; pointer-events:none; }
        /* inner white cards / pills */
        .ph-link{ display:inline-flex; align-items:center; gap:9px; background:#fff; border-radius:var(--r-full); padding:9px 16px 9px 9px;
          box-shadow:0 2px 6px rgba(15,28,46,.08); font:600 14px/1 var(--font-body); color:var(--warm-900); white-space:nowrap; }
        .ph-link-ic{ display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:var(--r-full);
          background:var(--warm-100); color:var(--warm-700); flex:0 0 auto; }
        .ph-prod-lbl{ display:block; font:500 11px/1.3 var(--font-body); color:#fff; text-shadow:0 3px 8px rgba(0,0,0,.35); margin:1px 2px 7px; }
        .ph-prod-img{ width:100%; aspect-ratio:1/1; object-fit:cover; border-radius:var(--r-lg); display:block; }
        .ph-stat{ background:#fff; border-radius:var(--r-xl); box-shadow:0 2px 6px rgba(15,28,46,.08); padding:12px 15px; display:flex; flex-direction:column; gap:4px; }
        .ph-stat-lbl{ display:inline-flex; align-items:center; gap:6px; font:600 12px/1.2 var(--font-body); color:var(--warm-900); }
        .ph-stat-cur{ display:inline-flex; align-items:center; justify-content:center; width:16px; height:16px; border-radius:var(--r-sm); background:var(--warm-100); font:700 10px/1 var(--font-body); color:var(--warm-800); }
        .ph-stat-row{ display:flex; align-items:baseline; gap:8px; }
        .ph-stat-row b{ font-family:var(--font-display); font-weight:800; font-size:22px; letter-spacing:-.02em; color:var(--warm-900); }
        .ph-stat-row b small{ font-size:.6em; font-weight:800; }
        .ph-stat-row em{ font-style:normal; font-weight:700; font-size:11px; color:#047857; background:#dcfce7; border-radius:var(--r-md); padding:2px 6px; }
        .ph-pay{ display:flex; align-items:center; justify-content:space-between; gap:16px; background:#fff; border-radius:var(--r-lg); box-shadow:0 2px 6px rgba(15,28,46,.08); padding:9px 14px; white-space:nowrap; }
        .ph-pay span{ font:500 13px/1 var(--font-body); color:var(--warm-800); }
        .ph-pay b{ font-family:var(--font-display); font-weight:800; font-size:15px; color:var(--warm-900); }
        .ph-g-pay-b .ph-pay{ padding:9px 14px; }
        @media (max-width:900px){
          .ph-wrap{ grid-template-columns:1fr; gap:36px; }
          .ph-copy{ text-align:center; display:flex; flex-direction:column; align-items:center; }
          .ph-sub{ margin-left:auto; margin-right:auto; }
          .ph-visual{ order:-1; max-width:420px; margin:0 auto; justify-self:center; }
          /* keep the floating UI within the hexagon so the composition stays centred */
          .ph-g-link, .ph-g-sales, .ph-g-conv{ right:0; }
          .ph-g-prod, .ph-g-pay-a, .ph-g-pay-b{ left:0; }
          .ph-g-pay-a{ top:65%; }   /* payout pill moved 10% lower on mobile */
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 8 — "Questions, answered." (FAQ accordion) ------------
   Copy supplied by the client. Two answers carry links (beginner guide, Express
   Withdrawal) — hrefs are placeholders pending the real URLs. Example figures
   (4.2% commission, 10 working days) are illustrative — confirm before launch. */
const PUB_FAQ = [
  ['How fast will I get paid?',
    "In as little as 5 to 7 working days after your request is approved. Standard withdrawal takes 7 to 10 working days after your request, plus each offer's validation period."],
  ['Am I eligible?',
    'You need at least MYR 200 in pending validation and conversions from at least one offer older than 5 days. Requests are then subject to approval.'],
  ['How much can I withdraw early?',
    'A portion of your eligible pending conversions. The exact amount is calculated for you and shown before you confirm, and it may be lower than the amount you request.'],
  ['Is there a fee?',
    'Yes, a processing fee applies to the amount you take early, shown up front before you confirm. The fee is reduced by your membership tier: Silver 0%, Gold 10%, Platinum 15%, Black 20%.'],
  ['What if a conversion is later rejected?',
    'The amount is reconciled against your future or available earnings, and we explain this clearly in the terms.'],
];
function PubFAQ() {
  return <Faq items={PUB_FAQ} />;
}

/* ---------- Final CTA (shared FinalCta, ia-sections.jsx) ----------------- */
function PubCTA() {
  return <FinalCta title="Get your earnings sooner." />;
}

/* ---------- Express Withdrawal §2 — "What is Express Withdrawal?" ---------- */
function ExwCard() {
  const [amount, setAmount] = React.useState(0);
  const [pressed, setPressed] = React.useState(false);
  const [active, setActive] = React.useState(false);   // button turns from grey to gradient once at $481
  // Looping demo: count up to $481, subtle button "click", drop back to $0, repeat.
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setAmount(481); setActive(true); return; }
    let raf = 0; const timers = []; let cancelled = false;
    const TARGET = 481;
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const animateTo = (from, to, dur, done) => {
      const start = performance.now();
      const step = (now) => {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / dur);
        setAmount(Math.round(from + (to - from) * easeOut(t)));
        if (t < 1) raf = requestAnimationFrame(step); else if (done) done();
      };
      raf = requestAnimationFrame(step);
    };
    const wait = (ms, fn) => { timers.push(setTimeout(() => { if (!cancelled) fn(); }, ms)); };
    const loop = () => {
      if (cancelled) return;
      setAmount(0); setPressed(false); setActive(false);        // grey button, $0
      animateTo(0, TARGET, 2400, () => {                        // count up to $481 (button stays grey)
        setActive(true);                                         // reached $481 → gradient (enabled)
        wait(550, () => {
          setPressed(true);                                      // button press
          wait(320, () => {
            setPressed(false);                                   // release
            wait(300, () => {
              setActive(false);                                  // back to grey
              animateTo(TARGET, 0, 600, () => { wait(900, loop); }); // drop to $0, then repeat
            });
          });
        });
      });
    };
    loop();
    return () => { cancelled = true; if (raf) cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, []);
  return (
    <div className="exw-card" data-reveal data-reveal-delay="1">
      <span className="exw-card-lbl">Pending Advertiser Collection</span>
      <div className="exw-amt"><span className="exw-cur">$</span><span className="exw-num">{amount}</span></div>
      <button type="button" className={'exw-btn' + (active ? ' is-active' : '') + (pressed ? ' is-pressed' : '')} tabIndex={-1} aria-hidden="true">Request Express Withdrawal</button>
    </div>
  );
}
const EXW_STEPS = [
  ['Request', 'Apply for Express Withdrawal from your dashboard.'],
  ['Approve', 'We review and approve your request, then calculate the amount from your pending conversions.'],
  ['Get paid', 'You receive it fast, in your preferred currency, converted at the platform rate.'],
  ['Reconcile', 'It is reconciled automatically once the advertiser validates the sales.'],
];
function ExwWhat() {
  return (
    <section id="exw-what" className="exw-sec">
      <div className="wrap">
        <div className="exw-top">
          <div className="exw-intro">
            <h2 className="exw-h" data-reveal>What is Express Withdrawal?</h2>
            <p className="exw-p" data-reveal data-reveal-delay="1">Express Withdrawal is the fastest way to get paid on the platform. Instead of waiting through the full validation period before you are paid, you can take a portion of your pending earnings up front, so your money can reach you in as little as 5 to 7 working days after your request is approved.</p>
          </div>
          <ExwCard />
        </div>
        <div className="exw-how" data-reveal>
          <p className="exw-how-lbl">How it works</p>
          <div className="exw-steps">
            {EXW_STEPS.map(([t, d]) => (
              <div className="exw-step" key={t}>
                <h3 className="exw-step-t">{t}</h3>
                <p className="exw-step-d">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .exw-sec{ background:var(--warm-50); padding:clamp(56px,9vh,110px) 0; }
        .exw-top{ display:grid; grid-template-columns:minmax(0,1fr) 300px; gap:clamp(32px,5vw,80px); align-items:start; }
        .exw-h{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .exw-p{ margin-top:20px; max-width:820px; font:400 16px/1.45 var(--font-body); color:var(--warm-600); }
        .exw-card{ align-self:start; background:#fff; border-radius:var(--r-lg); padding:24px; box-shadow:0 1.2px 3px rgba(0,0,0,.16), 0 20px 44px rgba(15,28,46,.07); }
        .exw-card-lbl{ display:block; font:600 13px/1.32 var(--font-body); color:rgba(17,17,16,.64); }
        .exw-amt{ margin-top:11px; display:flex; align-items:baseline; font-family:var(--font-body); font-weight:700; color:var(--warm-900); line-height:1.1; letter-spacing:-.01em; font-variant-numeric:tabular-nums; }
        .exw-cur{ font-size:40px; }
        .exw-num{ font-size:44px; }
        /* grey (disabled) until the amount reaches $481, then morphs to the ember gradient */
        .exw-btn{ margin-top:16px; width:100%; display:flex; align-items:center; justify-content:center; gap:8px; padding:16px 18px; border:none; border-radius:var(--r-full); cursor:default; white-space:nowrap;
          background-image:linear-gradient(144deg,#d2d2cc 0%,#c7c7c0 100%); color:#fff; font:600 14.5px/1 var(--font-body); box-shadow:0 4px 10px rgba(15,28,46,.06);
          transition:transform .16s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease, background-image .4s ease, filter .16s ease; }
        .exw-btn.is-active{ background-image:linear-gradient(144deg,#f05826 0%,#c43e18 100%); box-shadow:0 7px 11px rgba(240,88,38,.22); }
        .exw-btn.is-pressed{ transform:scale(.94); box-shadow:0 3px 7px rgba(240,88,38,.26); filter:brightness(.96); }
        .exw-how{ margin-top:clamp(44px,6vh,72px); }
        .exw-how-lbl{ font:500 16px/1.3 var(--font-body); color:var(--ember); }
        .exw-steps{ margin-top:22px; display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(24px,3vw,48px); }
        .exw-step-t{ font:700 16px/1.3 var(--font-body); color:var(--warm-900); }
        .exw-step-d{ margin-top:8px; font:400 16px/1.4 var(--font-body); color:var(--warm-600); }
        @media (max-width:900px){ .exw-top{ grid-template-columns:1fr; } .exw-card{ max-width:340px; } .exw-steps{ grid-template-columns:repeat(2,1fr); row-gap:32px; } }
        @media (max-width:560px){ .exw-steps{ grid-template-columns:1fr; } }
      `}</style>
    </section>
  );
}
/* ---------- Express Withdrawal §3 — "Two ways to get paid" comparison ------ */
const TW_ROWS = [
  ['When you can withdraw', 'After the advertiser validates the sale', 'Before validation, on a portion of your pending earnings'],
  ['Time to get paid', "7 to 10 working days after your request, plus each offer's validation period", 'As little as 5 to 7 working days after approval'],
  ['How much', 'Your full validated earnings', 'A portion of your eligible pending conversions'],
  ['Fee', 'Free up to a specific limit per month', 'A processing fee applies to the amount taken early, shown before you confirm'],
  ['Best for', 'Publishers who can wait for the full cycle', 'Publishers who want their money sooner'],
];
function ExwCompare() {
  return (
    <section id="exw-compare" className="tw-sec">
      <div className="wrap">
        <div className="tw-head" data-reveal>
          <h2 className="tw-title">Two ways to get paid</h2>
          <p className="tw-sub">Both withdrawal methods are open to every publisher. Standard withdrawal is available to anyone who meets the minimum amount. Express Withdrawal is available to any publisher who meets the eligibility criteria, and each request is subject to a quick approval.</p>
        </div>
        <div className="tw-scroll" data-reveal data-reveal-delay="1">
          <div className="tw-table">
            <div className="tw-row tw-hrow">
              <div className="tw-c tw-label-h" aria-hidden="true" />
              <div className="tw-c tw-col tw-col-std">
                <span className="tw-ic tw-ic-std"><img src="media/figma/exw-icon-standard.svg" alt="" /></span>
                <span className="tw-col-t">Standard withdrawal</span>
              </div>
              <div className="tw-c tw-col tw-col-exp">
                <span className="tw-ic tw-ic-exp"><img src="media/figma/exw-icon-express.svg" alt="" /></span>
                <span className="tw-col-t">Express withdrawal</span>
              </div>
            </div>
            {TW_ROWS.map((r, i) => (
              <div className="tw-row" key={i}>
                <div className="tw-c tw-label">{r[0]}</div>
                <div className="tw-c tw-std">{r[1]}</div>
                <div className="tw-c tw-exp">{r[2]}</div>
              </div>
            ))}
            <span className="tw-exp-card" aria-hidden="true" />
          </div>
        </div>
      </div>
      <style>{`
        .tw-sec{ background:var(--warm-50); padding:clamp(56px,9vh,110px) 0; }
        .tw-head{ text-align:center; max-width:1040px; margin:0 auto clamp(30px,4.6vh,52px); }
        .tw-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.02em; color:var(--warm-900); }
        .tw-sub{ margin-top:16px; font:400 16px/1.4 var(--font-body); color:var(--warm-600); }
        .tw-scroll{ overflow-x:auto; scrollbar-width:thin; padding:18px 8px 42px; }
        .tw-table{ --tw-label:260px; position:relative; display:flex; flex-direction:column; min-width:0; max-width:1100px; margin:0 auto; }
        .tw-row{ display:grid; grid-template-columns:var(--tw-label) minmax(0,1fr) minmax(0,1fr); }
        .tw-c{ padding:20px 24px; display:flex; align-items:center; font:400 14px/1.5 var(--font-body); color:var(--warm-900); }
        .tw-row:not(.tw-hrow) .tw-c{ border-top:1px solid #e8e8e5; }
        .tw-label, .tw-label-h{ padding-left:32px; padding-right:32px; }
        .tw-label{ font-weight:500; }
        .tw-std{ background:rgba(255,255,255,.48); }
        /* raised Express column — a single white card spanning the column; the only drop shadow */
        .tw-exp-card{ position:absolute; top:0; right:0; bottom:0; width:calc((100% - var(--tw-label)) / 2); z-index:0;
          background:#fff; border-radius:var(--r-xl); box-shadow:0 14px 30px rgba(15,28,46,.13), 0 3px 9px rgba(15,28,46,.06); pointer-events:none; }
        .tw-exp, .tw-col-exp{ position:relative; z-index:1; background:transparent; }
        /* header cells: icon-box + title stacked, left-aligned */
        .tw-hrow .tw-col{ flex-direction:column; align-items:flex-start; gap:12px; padding-top:32px; padding-bottom:28px; }
        .tw-col-std{ background:rgba(255,255,255,.48); }
        .tw-ic{ display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:var(--r-xl); flex:0 0 auto; }
        .tw-ic img{ width:24px; height:24px; display:block; }
        .tw-ic-std{ background:#e8e8e2; }
        .tw-ic-exp{ background:rgba(240,88,38,.12); }
        .tw-col-t{ font-family:var(--font-display); font-weight:800; font-size:20px; letter-spacing:-.01em; color:var(--warm-900); }
        /* Awin-style mobile: no side-scroll — feature label sits full-width above its two
           plan values, plan header sticks to the top, Express column stays tinted. */
        @media (max-width:820px){
          .tw-scroll{ overflow:visible; padding:0; }
          .tw-table{ min-width:0; border:1px solid #ecece7; border-radius:var(--r-xl); overflow:hidden; }
          .tw-exp-card{ display:none; }
          .tw-row{ grid-template-columns:1fr 1fr; }
          .tw-label{ grid-column:1 / -1; padding:15px 16px 3px; font-weight:700; font-size:14px; color:var(--warm-900); }
          .tw-label-h{ display:none; }
          .tw-hrow{ border-bottom:1px solid #e8e8e5; }
          .tw-hrow .tw-col{ padding:14px 12px; gap:8px; }
          .tw-ic{ width:36px; height:36px; }
          .tw-ic img{ width:20px; height:20px; }
          .tw-col-t{ font-size:14px; }
          .tw-c{ padding:4px 12px 14px; font-size:13px; line-height:1.45; align-items:flex-start; }
          .tw-std, .tw-col-std{ background:#f4f4ef; }
          .tw-exp, .tw-col-exp{ background:rgba(240,88,38,.07); }
          .tw-row:not(.tw-hrow) .tw-c{ border-top:none; }
          .tw-row:not(.tw-hrow){ border-top:1px solid #e8e8e5; }
        }
      `}</style>
    </section>
  );
}
function PublisherApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <PubHero />
        <ExwWhat />
        <ExwCompare />
        <PubFAQ />
        <PubCTA />
      </main>
      <Footer />
      <AppDownload />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PublisherApp />);
