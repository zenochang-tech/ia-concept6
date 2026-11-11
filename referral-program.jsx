/* ============================================================================
   referral-program.jsx — "The Involve Referral Programme" page. Rebuilt from the live
   involve.asia/partners/referral-program/ page with the existing publisher-page parts:
   the Express Withdrawal hero (HeroHexGrid + hex photo + floating pill), its intro
   layout, the shared NumberedSteps / Faq / FinalCta sections, and a design-system
   table for the reward maths. Copy is from the live page; headings in sentence case.
   Loaded AFTER ia-shared.jsx + ia-sections.jsx.
   ============================================================================ */

const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal, FinalCta, Faq, AppDownload, NumberedSteps, HeroHexGrid, HERO_HEXGRID_CSS } = window;

// Every "Refer your friends" CTA on the live page goes to this short link (dashboard sign-in).
const RF_LINK = 'https://invl.me/clmpu6y';
const RF_TERMS = 'https://involve.asia/terms-conditions/referral-my/';

/* ---------- Section 1 — Hero (same layout as the Express Withdrawal hero) ---------- */
function RfHero() {
  return (
    <section id="pub-hero" className="ph-sec">
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <HeroHexGrid />
        <div className="ph-copy">
          <span className="ph-eyebrow" data-reveal>Referral Programme</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">The Involve Referral Programme</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="1">Invite your friends to join as an Involve Publisher and earn RM5 for every referral. The more you refer, the more you earn. Simple and hassle-free.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="2">
            <a href={RF_LINK} className="btn btn-primary btn-lg">Refer Your Friends Now <Arrow /></a>
            <a href="#rf-what" className="btn btn-secondary btn-lg">Learn More</a>
          </div>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo"><img src="media/figma/referral-hero-image.png" alt="Two friends looking at a phone together" loading="eager" /></div>
          <div className="ph-static-ui" data-reveal data-reveal-delay="2">
            <div className="ph-glass ph-g-pay-a"><div className="ph-pay"><span>Referral Reward</span><b>+ RM5</b></div></div>
          </div>
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
        .ph-glass{ position:absolute; padding:7px; border-radius:var(--r-xl); background:rgba(255,255,255,.30);
          -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px); box-shadow:0 14px 34px rgba(15,28,46,.12); }
        .ph-g-pay-a{ left:-7%; top:55%; }
        .ph-static-ui{ position:absolute; inset:0; z-index:3; pointer-events:none; }
        .ph-pay{ display:flex; align-items:center; justify-content:space-between; gap:16px; background:#fff; border-radius:var(--r-lg); box-shadow:0 2px 6px rgba(15,28,46,.08); padding:9px 14px; white-space:nowrap; }
        .ph-pay span{ font:500 13px/1 var(--font-body); color:var(--warm-800); }
        .ph-pay b{ font-family:var(--font-display); font-weight:800; font-size:15px; color:var(--warm-900); }
        @media (max-width:900px){
          .ph-wrap{ grid-template-columns:1fr; gap:36px; }
          .ph-copy{ text-align:center; display:flex; flex-direction:column; align-items:center; }
          .ph-sub{ margin-left:auto; margin-right:auto; }
          .ph-actions{ justify-content:center; }
          .ph-sec{ padding-top:12px; }
          .ph-visual{ order:-1; width:85%; max-width:357px; margin:0 auto; justify-self:center; }
          .ph-glass{ scale:.85; margin-inline:-8.8%; transform-origin:left center; }
          .ph-g-pay-a{ left:0; top:65%; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 2 — "What is the Involve Referral Programme?" (Express Withdrawal intro layout) ---------- */
function RfWhat() {
  return (
    <section id="rf-what" className="exw-sec">
      <div className="wrap">
        <div className="exw-top">
          <div className="exw-intro">
            <h2 className="exw-h" data-reveal>What is the Involve Referral Programme?</h2>
            <p className="exw-p" data-reveal data-reveal-delay="1">The Involve Asia Referral Programme lets you earn rewards by inviting new partners to join our platform. Share your unique link with friends, family, or anyone who wants to earn commissions from top brands.</p>
            <p className="exw-p" data-reveal data-reveal-delay="1">When they sign up through your link and complete at least 1 sale within 14 days, you earn a referral reward. Your reward details are shown below.</p>
          </div>
          <div className="exw-card" data-reveal data-reveal-delay="1">
            <span className="exw-card-lbl">Your Sign-Up Reward</span>
            <div className="exw-amt"><span className="exw-cur">RM</span><span className="exw-num">5</span></div>
            <p className="rf-card-note">For you and your friend, once they make their first sale within 14 days.</p>
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
const RF_EARN = [[10, 'RM50'], [20, 'RM100'], [100, 'RM500']];
function RfEarn() {
  return (
    <section id="rf-earn" className="rfe-sec">
      <div className="wrap">
        <h2 className="rfe-title" data-reveal>Here's how much you can earn</h2>
        <p className="rfe-sub" data-reveal data-reveal-delay="1">Each new sign-up must have at least 1 sale conversion (CPS) within 14 days of their account approval. Both of you will earn RM5 as a Sign-Up Reward.</p>
        <div className="rfe-wrap" data-reveal data-reveal-delay="1">
          <table className="rfe-table">
            <caption className="rfe-cap">Sign-Up Rewards</caption>
            <thead>
              <tr><th scope="col">New Sign-Ups</th><th scope="col">Your Sign-Up Reward</th><th scope="col">Your Earnings</th></tr>
            </thead>
            <tbody>
              {RF_EARN.map(([n, total]) => (
                <tr key={n}><td>{n} sign-ups</td><td>RM5 each</td><td className="rfe-total">{total}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="rfe-note" data-reveal>Scroll down to our <a href="#pub-faq">FAQs</a> for tips to promote and earn from the Referral Programme. Read the full <a href={RF_TERMS}>Terms &amp; Conditions</a>.</p>
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
        @media (max-width:560px){ .rfe-table th, .rfe-table td{ padding-left:14px; padding-right:12px; } .rfe-table{ font-size:14px; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 4 — "Here's how it works" (shared NumberedSteps) ---------- */
const RF_STEPS = [
  ['1', 'Get your unique referral link', 'Log in to your Publisher dashboard and search for the Involve Asia Publisher Referral Programme.'],
  ['2', 'Promote it on your social media', 'Copy your unique link and share it online.'],
  ['3', 'Sit back and track your rewards', 'Track your referral rewards using the Conversion Report.'],
];

/* ---------- Section 5 — FAQs (shared Faq) ---------- */
const RF_FAQ = [
  ['Who can join the Involve Referral Programme?', 'The Involve Referral Programme is open to all registered Publishers with Involve Asia.'],
  ['Who can I refer to join Involve Asia?', 'Anyone who has never registered as an Involve Asia Publisher before.'],
  ['What is the cookie duration for this Programme?', '7 days.'],
  ['How do I track my referral performance?', <React.Fragment>You can track your referral performance on your Publisher Dashboard, under Reports &gt; Conversion Report.</React.Fragment>],
  ['How much can I earn through this Programme?', 'You earn RM5 once your referral completes 1 sale conversion within 14 days of account approval.'],
  ['When will my Reward Payout be paid?', 'Referral rewards are paid monthly.'],
  ['What is the approval and denial process for this Programme?', <React.Fragment>
    Your referral reward is approved when your referee completes 1 sale conversion within 14 days of account approval.<br /><br />
    <b>Approve:</b> Reward is granted once the referee gets 1 sale conversion within 14 days.<br />
    <b>Deny:</b> No reward is given if no sale occurs within 14 days.<br /><br />
    We'll review every referral to make sure it meets the programme requirements. If a referral doesn't qualify, the commission won't be approved.
  </React.Fragment>],
  ['Does Involve Asia provide visual assets for this Programme?', 'Yes. You can download ready-made visuals and banners from the Involve Asia Publisher Dashboard.'],
  ['Have more questions?', <React.Fragment>If you require further information, feel free to contact your Account Manager or email us at <a className="rf-mail" href="mailto:wecare@involve.asia">wecare@involve.asia</a>.</React.Fragment>],
];
const RF_FAQ_CSS = `
        .rf-mail{ font-weight:600; color:var(--warm-900); text-decoration:underline; text-underline-offset:3px; }
        .rf-mail:hover{ color:var(--ember-dark); }`;

function ReferralApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <RfHero />
        <RfWhat />
        <RfEarn />
        <NumberedSteps id="rf-how" title="Here's how it works" steps={RF_STEPS} cols={3} />
        <Faq items={RF_FAQ} title="Referral Programme FAQs" css={RF_FAQ_CSS} />
        <FinalCta title="Time to earn!" href={RF_LINK} label="Refer Your Friends Now" />
      </main>
      <Footer />
      <AppDownload />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ReferralApp />);
