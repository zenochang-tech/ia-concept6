/* ============================================================================
   download-app.jsx — "Download App" page. Single full-height hero built from
   Figma 2618:7102. All copy lives in content/pages/download-app/<lang>.json and
   arrives through useCopy. Loaded AFTER ia-shared.jsx (Nav/Footer/Arrow/BackToTop/
   hooks/useCopy on window / global scope).
   ============================================================================ */

const DlCheck = () => (
  <svg className="dl-check" viewBox="0 0 24 24" width="23" height="23" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="#16a34a" />
    <path d="M6.8 12.4l3.4 3.4L17.4 8.6" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function DownloadHero({ c }) {
  return (
    <section id="dl-hero" className="dl-sec">
      <div className="wrap dl-wrap">
        <div className="dl-copy">
          <h1 className="dl-title" data-reveal>{c.title}</h1>
          <p className="dl-sub" data-reveal data-reveal-delay="1">{c.sub}</p>
          <ul className="dl-feats" data-reveal data-reveal-delay="1">
            {c.features.map((f) => (
              <li className="dl-feat" key={f}><DlCheck /><span>{f}</span></li>
            ))}
          </ul>
          <p className="dl-more" data-reveal data-reveal-delay="2">{c.more}</p>
          <div className="dl-qrcard" data-reveal data-reveal-delay="2">
            <a className="dl-qr-link" href="https://app.involve.asia/v2/download-app" target="_blank" rel="noopener noreferrer" aria-label={c.qrAria}>
              <img className="dl-qr" src="media/figma/app-download-qr.png" alt={c.qrAlt} />
            </a>
            <p className="dl-qr-txt">
              <span className="dl-txt-d">{c.qrText}</span>
              <span className="dl-txt-m">{c.qrTextMobile}</span>
            </p>
            <div className="dl-stores">
              <a className="dl-store" href="#" aria-label={c.googlePlay.aria}>
                <img className="dl-store-ic" src="media/figma/store-googleplay-icon.svg" alt="" />
                <span className="dl-store-txt"><small>{c.googlePlay.small}</small><b>{c.googlePlay.name}</b></span>
              </a>
              <a className="dl-store" href="#" aria-label={c.appStore.aria}>
                <img className="dl-store-ic dl-store-ic-apple" src="media/figma/store-apple-icon.svg" alt="" />
                <span className="dl-store-txt"><small>{c.appStore.small}</small><b>{c.appStore.name}</b></span>
              </a>
            </div>
          </div>
        </div>

        <div className="dl-visual" data-reveal data-reveal-delay="1">
          <img src="media/figma/app-download-phones.png" alt={c.imageAlt} loading="eager" />
        </div>
      </div>

      <style>{`
        .dl-sec{ position:relative; overflow:hidden; background:var(--warm-50); display:flex; align-items:center; padding:clamp(36px,6vh,72px) 0; }
        .dl-wrap{ display:grid; grid-template-columns:minmax(0,1.05fr) minmax(0,1fr); gap:clamp(32px,5vw,72px); align-items:center; width:100%; }
        /* copy */
        .dl-copy{ min-width:0; }
        .dl-title{ font-size:clamp(32px,4.4vw,54px); line-height:1.02; letter-spacing:-.03em; color:var(--warm-900); max-width:12ch; }
        .dl-sub{ margin-top:22px; max-width:520px; font-size:16px; line-height:1.5; color:var(--warm-600); }
        .dl-feats{ list-style:none; margin:clamp(24px,3.5vh,34px) 0 0; padding:0; display:flex; flex-direction:column; gap:14px; }
        .dl-feat{ display:flex; align-items:flex-start; gap:12px; font:400 16px/1.4 var(--font-body); color:var(--warm-900); }
        .dl-check{ flex:0 0 auto; margin-top:1px; }
        .dl-more{ margin-top:20px; font:400 16px/1.4 var(--font-body); color:var(--warm-400); }
        /* QR + stores card */
        .dl-qrcard{ margin-top:clamp(26px,4vh,40px); display:grid; grid-template-columns:auto 1fr; column-gap:clamp(20px,2.5vw,34px); row-gap:14px; align-items:center;
          grid-template-areas:"qr text" "qr stores";
          background:#fff; border-radius:var(--r-xl); padding:clamp(22px,2.4vw,30px); box-shadow:0 12px 34px rgba(15,28,46,.07); max-width:600px; }
        .dl-qr-link{ grid-area:qr; display:block; align-self:center; }
        .dl-qr{ width:clamp(120px,11vw,150px); height:auto; display:block; border-radius:var(--r-lg); }
        .dl-qr-txt{ grid-area:text; align-self:end; font-family:var(--font-display); font-weight:800; font-size:clamp(18px,1.6vw,21px); line-height:1.25; letter-spacing:-.02em; color:var(--warm-900); max-width:220px; }
        .dl-txt-m{ display:none; }
        .dl-stores{ grid-area:stores; align-self:start; display:flex; gap:8px; }
        .dl-store{ display:inline-flex; align-items:center; gap:8px; height:48px; padding:0 12px; background:#000; border:1px solid #a6a6a6; border-radius:var(--r-md); text-decoration:none; }
        .dl-store-ic{ width:auto; height:24px; display:block; }
        .dl-store-ic-apple{ height:22px; }
        .dl-store-txt{ display:flex; flex-direction:column; justify-content:center; color:#fff; line-height:1; }
        .dl-store-txt small{ font-size:8.5px; letter-spacing:.02em; text-transform:uppercase; opacity:.92; }
        .dl-store-txt b{ margin-top:3px; font-weight:600; font-size:16px; letter-spacing:-.01em; }
        /* visual */
        .dl-visual{ min-width:0; display:flex; align-items:center; justify-content:center; }
        .dl-visual img{ width:100%; max-width:560px; height:auto; display:block; filter:drop-shadow(0 34px 64px rgba(15,28,46,.16)); }

        /* min 100vh on desktop (user request); smaller 24px title (max 2 lines) so the QR card fits the viewport */
        @media (min-width:901px){
          .dl-sec{ min-height:100vh; }
          .dl-title{ font-size:24px; line-height:1.25; letter-spacing:-.01em; max-width:24ch; }
        }

        @media (max-width:900px){
          .dl-wrap{ grid-template-columns:1fr; gap:clamp(30px,5vh,44px); }
          .dl-visual{ order:-1; }
          .dl-visual img{ max-width:420px; }
          .dl-title{ max-width:none; }
        }
        @media (max-width:600px){
          /* copy first, then a larger clickable QR, then the store badges in one row */
          .dl-qrcard{ grid-template-columns:1fr; grid-template-areas:"text" "qr" "stores"; row-gap:18px; justify-items:start; }
          .dl-qr-link{ justify-self:center; width:100%; }
          .dl-qr{ width:min(300px,86%); margin:0 auto; }
          .dl-qr-txt{ max-width:none; }
          .dl-txt-d{ display:none; }
          .dl-txt-m{ display:inline; }
          .dl-stores{ align-self:stretch; width:100%; flex-wrap:nowrap; }
          .dl-store{ flex:1 1 0; min-width:0; justify-content:center; padding:0 8px; gap:6px; }
          .dl-store-ic{ height:22px; }
          .dl-store-txt small, .dl-store-txt b{ white-space:nowrap; }
          .dl-store-txt b{ font-size:14px; }
        }
      `}</style>
    </section>
  );
}

function DownloadAppPage() {
  useSmoothScroll();
  useScrollReveal();
  const c = useCopy('download-app');
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main><DownloadHero c={c.hero} /></main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<DownloadAppPage />);
