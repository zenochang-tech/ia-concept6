/* ============================================================================
   stablecoin-payout.jsx — "USDT withdrawal" page. Rebuilt from the live
   involve.asia/publisher/stablecoin-payout/ page with the existing publisher-page
   parts: the Express Withdrawal hero (HeroHexGrid + hex photo), the
   shared NumberedSteps / FinalCta sections, a top-down stepper built from the
   NumberedSteps number circles, Pricing-style essentials cards for "Good to know",
   and a warning callout. Copy is from the live page; headings in
   sentence case. Loaded AFTER ia-shared.jsx + ia-sections.jsx.
   ============================================================================ */

const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, FinalCta, AppDownload, NumberedSteps, HeroHexGrid, HERO_HEXGRID_CSS } = window;

// Every CTA on the live page goes to the dashboard's Payment Settings.
const SP_SETUP = 'https://app.involve.asia/v2/settings/payment';

function SpCheck() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>);
}

/* ---------- Section 1 — Hero (same layout as the Express Withdrawal hero) ---------- */
const SP_CHIPS = ['2-Minute Setup', 'Switch Anytime', 'No Bank Delays'];
function SpHero() {
  return (
    <section id="pub-hero" className="ph-sec">
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <HeroHexGrid />
        <div className="ph-copy">
          <span className="ph-eyebrow" data-reveal>New Payout Option</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Get paid your way with USDT withdrawal</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="1">Withdraw your USD affiliate earnings in USDT instead of Bank Transfer or PayPal. Available now on Involve Asia.</p>
          <ul className="ph-chips" data-reveal data-reveal-delay="1">
            {SP_CHIPS.map((c) => <li key={c}><span className="ph-chip-ic" aria-hidden="true"><SpCheck /></span>{c}</li>)}
          </ul>
          <div className="ph-actions" data-reveal data-reveal-delay="2">
            <a href={SP_SETUP} className="btn btn-primary btn-lg">Set Up USDT Withdrawal <Arrow /></a>
            <a href="#sp-why" className="btn btn-secondary btn-lg">Learn More</a>
          </div>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo"><img src="media/figma/stablecoin-hero-image.png" alt="USDT coins" loading="eager" /></div>
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
        .ph-chips{ margin-top:20px; display:flex; flex-wrap:wrap; gap:10px 20px; }
        .ph-chips li{ display:inline-flex; align-items:center; gap:8px; font:600 14px/1.3 var(--font-body); color:var(--warm-800); }
        .ph-chip-ic{ display:inline-flex; width:18px; height:18px; color:var(--ember); }
        .ph-chip-ic svg{ width:100%; height:100%; display:block; }
        .ph-actions{ margin-top:30px; display:flex; gap:12px; flex-wrap:wrap; }
        .ph-visual{ position:relative; aspect-ratio:1/1; max-width:520px; width:100%; margin-left:auto; }
        .ph-hexplate{ position:absolute; inset:0; z-index:0; background:var(--warm-150);
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat;
          filter:drop-shadow(0 26px 54px rgba(15,28,46,.10)); }
        .ph-photo{ position:absolute; inset:0; z-index:1;
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; }
        .ph-photo img{ width:100%; height:100%; object-fit:cover; display:block; }
        @media (max-width:900px){
          .ph-wrap{ grid-template-columns:1fr; gap:36px; }
          .ph-copy{ text-align:center; display:flex; flex-direction:column; align-items:center; }
          .ph-sub{ margin-left:auto; margin-right:auto; }
          .ph-chips, .ph-actions{ justify-content:center; }
          .ph-sec{ padding-top:12px; }
          .ph-visual{ order:-1; width:85%; max-width:357px; margin:0 auto; justify-self:center; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 2 — "Why USDT" (shared NumberedSteps) ---------- */
const SP_WHY = [
  ['1', 'No more bank delays', 'Blockchain settlement is near-instant once you claim, unlike multi-day bank transfer windows.'],
  ['2', 'Fiat or digital, your call', 'USD withdrawals now support both traditional transfer and USDT, an efficient, seamless payment experience built for cross-border publishers.'],
  ['3', 'Your choice, anytime', 'Switch between Bank Transfer, PayPal, or USDT whenever it suits you, with no long-term commitment.'],
];

/* ---------- Section 3 — "How setup works" (top-down stepper, NumberedSteps number circles) ---------- */
const SP_SETUP_STEPS = [
  ['1', 'Open Payment Settings', 'Go to Settings > Payment > Payment Details, then select Edit.'],
  ['2', 'Add your address and payout type', 'Enter your address, then set Payout Type to Stablecoins. Your payout currency is fixed to USD automatically.'],
  ['3', 'Complete your account details', 'Enter your Name, Account Type, Nationality, Contact Number, and the Recipient Email Address where you’ll receive your payout claim link.'],
  ['4', 'Send a test email (optional)', 'Confirm your recipient email is correct and active before your first real payout link is sent there.'],
  ['5', 'Save', 'That’s it. Future eligible payouts will be ready to claim in USDT.'],
];
function SpSetup() {
  return (
    <section id="sp-setup" className="vs-sec">
      <div className="wrap vs-grid">
        <div className="vs-head" data-reveal>
          <h2 className="vs-title">How setup works</h2>
          <p className="vs-sub">Five steps in Payment Settings. It takes about 2 minutes.</p>
        </div>
        <ol className="vs-list">
          {SP_SETUP_STEPS.map(([n, t, d], i) => (
            <li className="vs-step" key={n} data-reveal data-reveal-delay={Math.min(i + 1, 3)}>
              <span className="vs-num" aria-hidden="true">{n}</span>
              <div className="vs-body">
                <h3 className="vs-ct">{t}</h3>
                <p className="vs-cd">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <style>{`
        .vs-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .vs-grid{ display:grid; grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr); gap:clamp(32px,5vw,80px); align-items:start; }
        .vs-head{ position:sticky; top:110px; }
        .vs-title{ font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .vs-sub{ margin-top:12px; max-width:420px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        .vs-list{ list-style:none; margin:0; padding:0; }
        .vs-step{ position:relative; display:grid; grid-template-columns:48px minmax(0,1fr); gap:20px; padding-bottom:clamp(28px,4vh,40px); }
        .vs-step:last-child{ padding-bottom:0; }
        /* connector: runs from under this circle to the next one */
        .vs-step:not(:last-child)::before{ content:""; position:absolute; left:23px; top:56px; bottom:8px; width:2px; background:var(--warm-200); }
        .vs-num{ display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:50%; background:var(--ember); color:#fff; font-family:var(--font-display); font-weight:800; font-size:17px; letter-spacing:-.01em; }
        .vs-body{ padding-top:10px; }
        .vs-ct{ font-family:var(--font-display); font-weight:800; font-size:20px; line-height:1.25; letter-spacing:-.01em; color:var(--warm-900); }
        .vs-cd{ margin-top:8px; max-width:520px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        @media (max-width:900px){ .vs-grid{ grid-template-columns:1fr; } .vs-head{ position:static; } }
        @media (max-width:520px){ .vs-step{ grid-template-columns:40px minmax(0,1fr); gap:16px; } .vs-num{ width:40px; height:40px; font-size:15px; } .vs-step:not(:last-child)::before{ left:19px; top:48px; } .vs-body{ padding-top:7px; } .vs-ct{ font-size:18px; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 4 — "Good to know" (five white cards in one row) ---------- */
const SP_KNOW = [
  ['No wallet needed yet', 'You’ll enter your wallet address securely each time you claim a payout, not during setup.'],
  ['1% processing fee', 'Deducted automatically from your gross payout and itemized on your Involve withdrawal invoice.'],
  ['Backed by a regulated partner', 'Payouts are processed via Triple A, licensed by the Monetary Authority of Singapore.'],
  ['One-time ID check', 'First payouts above USD 1,500 may require a quick identity check, per standard regulations.'],
  ['Switch back anytime', 'You can change back to Bank Transfer or PayPal anytime in Payment Settings.'],
];
function SpKnow() {
  return (
    <section id="sp-know" className="gk-sec">
      <div className="wrap">
        <h2 className="gk-title" data-reveal>Good to know</h2>
        <p className="gk-sub" data-reveal data-reveal-delay="1">A few things worth knowing before you set up USDT withdrawal.</p>
        <div className="gk-grid" data-reveal data-reveal-delay="1">
          {SP_KNOW.map(([t, d]) => (
            <div className="gk-card" key={t}>
              <h3 className="gk-ct">{t}</h3>
              <p className="gk-cd">{d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .gk-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0 clamp(20px,3vh,36px); }
        .gk-title{ font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .gk-sub{ margin-top:12px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        .gk-grid{ margin-top:clamp(28px,4vh,44px); display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:16px; }
        .gk-card{ background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-lg); padding:24px 20px; box-shadow:var(--shadow-sm); }
        .gk-ct{ font-family:var(--font-display); font-weight:800; font-size:17px; line-height:1.25; letter-spacing:-.01em; color:var(--warm-900); }
        .gk-cd{ margin-top:8px; font:400 14px/1.5 var(--font-body); color:var(--warm-600); }
        @media (max-width:1100px){ .gk-grid{ grid-template-columns:repeat(3,minmax(0,1fr)); } }
        @media (max-width:760px){ .gk-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); } }
        @media (max-width:480px){ .gk-grid{ grid-template-columns:1fr; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 5 — "Double-check before you continue" (design-system warning banner, two columns) ---------- */
const SP_WARN = [
  ['Make sure your email address is correct.', 'Your USDT payout claim link is sent only to the email you set during setup. An incorrect or outdated address can mean permanent, unrecoverable loss of your funds.'],
  ['Double-check your wallet address and network every time you claim a payout.', 'Blockchain transactions can’t be reversed once submitted, not by you and not by us.'],
];
function SpWarn() {
  return (
    <section id="sp-warn" className="dw-sec">
      <div className="wrap">
        <div className="dw-card" role="note" data-reveal>
          <h2 className="dw-t"><span className="dw-ic" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
          </span>Double-check before you continue</h2>
          <div className="dw-cols">
            {SP_WARN.map(([b, t]) => <p className="dw-p" key={b}><b>{b}</b>{t}</p>)}
          </div>
        </div>
      </div>
      <style>{`
        /* Design-system Notifications banner (warning): 4px status-colour left border on the
           status-light fill, --r-md corners, no outline or shadow, Inter 600 title, warm-700 body.
           The status-light/-dark tokens aren't in this page's :root yet. */
        .dw-sec{ --warning-light:#FEF3C7; --warning-dark:#B45309; background:var(--warm-50); padding:clamp(20px,3vh,36px) 0 clamp(40px,7vh,88px); }
        .dw-card{ background:var(--warning-light); border-left:4px solid var(--warning); border-radius:var(--r-md); padding:clamp(20px,2.6vw,28px) clamp(20px,3vw,32px); }
        .dw-t{ display:flex; align-items:center; gap:10px; font:600 18px/1.3 var(--font-body); letter-spacing:0; color:var(--warm-900); }
        .dw-ic{ flex:0 0 auto; display:inline-flex; width:22px; height:22px; color:var(--warning-dark); }
        .dw-ic svg{ width:100%; height:100%; display:block; }
        .dw-cols{ margin-top:16px; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:clamp(20px,4vw,56px); }
        .dw-p{ font:400 15px/1.55 var(--font-body); color:var(--warm-700); }
        .dw-p b{ display:block; margin-bottom:4px; font-weight:600; color:var(--warm-900); }
        @media (max-width:760px){ .dw-cols{ grid-template-columns:1fr; } }
      `}</style>
    </section>
  );
}

function StablecoinApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <SpHero />
        <NumberedSteps id="sp-why" title="More control over how you get paid" sub="Three reasons publishers are adding USDT to their payout options." steps={SP_WHY} cols={3} />
        <SpSetup />
        <SpKnow />
        <SpWarn />
        <FinalCta title="Ready to get paid in USDT?" href={SP_SETUP} label="Set Up USDT Withdrawal" />
      </main>
      <Footer />
      <AppDownload />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<StablecoinApp />);
