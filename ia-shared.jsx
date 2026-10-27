/* ============================================================================
   ia-shared.jsx — SHARED UI for all pages (single source).
   Loaded as the FIRST babel script on every page, BEFORE the page's own bundle.
   Exposes: Nav, Footer, Arrow, HexCursor, BackToTop, prefersReduced,
            useSmoothScroll(), useScrollReveal().
   NOTE: the homepage (ia-bundle.jsx) still carries its own copies for now;
   migrating it to load this file is a planned follow-up.
   ============================================================================ */

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Nav mega-menu — clean Stripe-style columns: each column has a non-clickable title (head)
// with a thin #E8E8E2 divider under it, then its links. Column titles are suggestions —
// rename freely. No feature image card.
const NAV = [
  { label: 'For Publishers', href: 'for-publishers.html', tone: 'pub',
    feat: { head: '500+ brands, ready to promote', desc: 'Find the ones your audience already loves, and start earning.', cta: 'Browse brands', href: 'https://app.involve.asia/directory', img: 'media/webp/sub-card-publisher.webp', scrim: 'linear-gradient(26.17deg, rgba(196, 62, 24, 0.32) 19.76%, rgba(196, 62, 24, 0.1024) 55.25%)' },
    columns: [
      { head: 'Explore', links: [
        ['Publisher overview', 'for-publishers.html'],
        ['Brand Directory', 'https://app.involve.asia/directory'],
        ['Success Stories', 'https://involve.asia/blog/category/partners/success-stories-partners/'],
      ]},
      { head: "Who it's for", links: [
        ['Creator partners', 'content-creators.html'],
        ['Affiliate Partners', 'affiliates.html'],
        ['Technology Partners', 'technology-partners.html'],
      ]},
      { head: 'Features', links: [
        ['Express Withdrawal', 'express-withdrawal.html'],
        ['Developer API', 'api-overview.html'],
        ['Data Feed', 'datafeed.html'],
      ]},
    ]},
  { label: 'For Advertisers', href: 'for-advertisers.html', tone: 'adv',
    feat: { head: 'Simple, scalable pricing', desc: 'Volume-based plans that grow with your program.', cta: 'See pricing', href: 'pricing.html', img: 'media/webp/sub-card-advertiser.webp', scrim: 'linear-gradient(26.17deg, rgba(61, 90, 128, 0.32) 19.76%, rgba(61, 90, 128, 0.1024) 55.25%)' },
    columns: [
      { head: 'Explore', links: [
        ['Advertiser overview', 'for-advertisers.html'],
        ['Pricing', 'pricing.html'],
        ['Case Study', 'https://involve.asia/blog/category/advertisers/success-stories/'],
      ]},
      { head: 'Features', links: [
        ['Automation', 'automation.html'],
        ['Partner Discovery', 'partner-discovery.html'],
        ['How We Track', 'how-we-track.html'],
      ]},
    ]},
  { label: 'Resources', href: 'https://involve.asia/blog/',
    feat: { head: 'The Involve blog', desc: 'Guides, trends, and affiliate marketing insights.', cta: 'Read the blog', href: 'https://involve.asia/blog/', img: 'media/webp/sub-card-resources.webp', scrim: 'linear-gradient(26.17deg, rgba(3, 3, 3, 0.32) 19.76%, rgba(2, 2, 2, 0.1024) 55.25%)' },
    columns: [
      { head: 'Learn', links: [
        ['Blog', 'https://involve.asia/blog/'],
        ['Glossary', 'glossary.html'],
      ]},
      { head: 'Support', links: [
        ['Help Centre', 'https://helpcentre.involve.asia/'],
        ['Download App', 'download-app.html'],
        ['API Docs', 'https://api.involve.asia/docs/'],
      ]},
    ]},
  { label: 'Company', href: 'about.html',
    feat: { head: 'About Involve Asia', desc: '12 years connecting brands and partners across Asia.', cta: 'Our story', href: 'about.html', img: 'media/webp/sub-card-company.webp', scrim: 'linear-gradient(26.17deg, rgba(3, 3, 3, 0.32) 19.76%, rgba(2, 2, 2, 0.1024) 55.25%)' },
    columns: [
      { head: 'Company', links: [
        ['About Us', 'about.html'],
        ['Careers', 'https://career.involve.asia/'],
      ]},
    ]},
];

const LANGS = [
  { code: 'EN', label: 'English' },
  { code: 'TH', label: 'ไทย' },
  { code: 'VN', label: 'Tiếng Việt' },
  { code: 'ID', label: 'Bahasa Indonesia' },
  { code: 'MS', label: 'Bahasa Melayu' },
  { code: 'PH', label: 'Filipino' },
];

function Caret({ open }) {
  return <svg width="11" height="11" viewBox="0 0 12 12" style={{ marginLeft: 3, transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none' }}><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

// Column-menu link (new grouped dropdowns). A page that isn't live yet is marked
// `soon` — rendered non-clickable with a grey "(coming soon)" tag.
function MegaLink({ link }) {
  const [t, href, soon] = link;
  if (soon) return <span className="mega4-link mega4-soon"><b>{t}</b><em>(coming soon)</em></span>;
  return <a href={href} role="menuitem" className="mega4-link"><b>{t}</b></a>;
}


function Nav({ getStartedTone = 'midnight', homeHref = 'index.html' }) {
  const [open, setOpen] = React.useState(null);
  const [lang, setLang] = React.useState('EN');
  const [langOpen, setLangOpen] = React.useState(false);
  const [mobile, setMobile] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [onDark, setOnDark] = React.useState(false);   // dark Midnight surface under the nav (Change 3)
  const navRef = React.useRef(null);
  const closeT = React.useRef(null);
  React.useEffect(() => {
    const f = () => {
      setScrolled(window.scrollY > 20);
      const s = document.getElementById('stats');
      const r = s && s.getBoundingClientRect();
      // Dark chrome while the dark stats section spans the nav line, OR while a honeycomb
      // wipe has (nearly) covered the viewport — the wipe stages flag this via a body class
      // so the logo/links crossfade in step with the Midnight coverage at the top edge.
      setOnDark((!!r && r.top <= 74 && r.bottom > 74) || document.body.className.indexOf('hexwipe-dark') !== -1);
      setOpen(null);   // close the mega on scroll (matches Concept 3)
    };
    f(); window.addEventListener('scroll', f, { passive: true });
    window.addEventListener('resize', f);
    return () => { window.removeEventListener('scroll', f); window.removeEventListener('resize', f); };
  }, []);
  // Entrance: nav drops in + fades on load (same fade-up language as the page).
  React.useLayoutEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !navRef.current || prefersReduced()) return;
    // clearProps: 'transform' so no residual matrix() is left on the header — a transform
    // would make it a containing block / backdrop root and break the mega's blur in some browsers.
    const tw = gsap.from(navRef.current, { y: -20, autoAlpha: 0, duration: 0.7, ease: 'power3.out', clearProps: 'transform' });
    return () => tw.kill();
  }, []);
  // Hover-intent open/close (140ms grace, as in Concept 3) so travelling from a link
  // down into the mega panel doesn't dismiss it.
  const openMega = (i) => { clearTimeout(closeT.current); setOpen(i); };
  const scheduleClose = () => { clearTimeout(closeT.current); closeT.current = setTimeout(() => setOpen(null), 140); };
  const R = (k, fb) => (window.__resources && window.__resources[k]) || fb;
  // v3.5.2: one primary per viewport (the hero owns it) and zero Ember on Advertiser pages,
  // so the nav CTA is always secondary. getStartedTone is kept for the call sites.
  const gsClass = 'btn-secondary';
  // Design-system chrome: the sticky nav is solid Midnight (not a blurred glass) once
  // scrolled, over a dark section, or with the mobile menu open. Transparent only at the top.
  const dark = onDark || scrolled || mobile;

  return (
    <React.Fragment>
    <header ref={navRef} className={`hdr4${dark ? ' nav-on-dark' : ''}${scrolled ? ' solid' : ''}`} style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: dark ? 'var(--midnight)' : 'transparent',
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
      boxShadow: 'none',
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.10)' : 'transparent'}`,
      transition: 'background .3s, border-color .3s, box-shadow .3s',
    }} onMouseLeave={scheduleClose}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', height: dark ? 62 : 74, gap: 24, position: 'relative', transition: 'height .3s' }}>
        <a href={homeHref} aria-label="Involve Asia home" style={{ display: 'flex', alignItems: 'center', flex: '0 0 auto', zIndex: 2, position: 'relative' }}>
          <img src={R('logoMidnight', "https://ia-design-system.vercel.app/assets/logo/wordmark-midnight.png")} alt="Involve Asia" width="132" height="28" style={{ height: 28, width: 'auto', transition: 'opacity .35s ease', opacity: dark ? 0 : 1 }} />
          <img src={R('logoWhite', "https://ia-design-system.vercel.app/assets/logo/wordmark-white.png")} alt="" aria-hidden="true" width="132" height="28" style={{ height: 28, width: 'auto', position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', transition: 'opacity .35s ease', opacity: dark ? 1 : 0 }} />
        </a>

        {/* Left-aligned primary nav (Concept 3) */}
        <nav className="nav-desk" style={{ display: 'flex', alignItems: 'center', gap: 28, marginLeft: 22, marginRight: 'auto' }} aria-label="Primary">
          {NAV.map((n, i) => (
            <a key={n.label} href={n.href} aria-expanded={open === i} aria-haspopup="true"
              className={open === i ? 'is-open' : ''}
              onMouseEnter={() => openMega(i)}
              style={{ display: 'inline-flex', alignItems: 'center', font: '500 14px/1 var(--font-body)',
                color: open === i ? 'var(--warm-900)' : 'var(--warm-600)', padding: '8px 0', transition: 'color .15s' }}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: 18, zIndex: 2 }}>
          {/* Language dropdown */}
          <div style={{ position: 'relative' }} onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
            <button aria-label="Change language" aria-expanded={langOpen} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--warm-600)', font: '600 13px/1 var(--font-body)', padding: '8px 2px' }}>
              {lang}<Caret open={langOpen} />
            </button>
            {langOpen && (
              <div role="menu" className="lang-menu" style={{ position: 'absolute', top: '100%', right: 0, marginTop: 4, minWidth: 200, background: '#fff', border: '1px solid var(--warm-200)', borderRadius: 'var(--r-md)', boxShadow: 'var(--shadow-xl)', padding: 6 }}>
                {LANGS.map(l => (
                  <button key={l.code} role="menuitem" onClick={() => { setLang(l.code); setLangOpen(false); }} className="nav-item" style={{
                    width: '100%', textAlign: 'left', background: l.code === lang ? 'var(--warm-100)' : 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '10px 12px', borderRadius: 10, font: '500 14px/1.2 var(--font-body)', color: 'var(--warm-900)' }}>
                    <span>{l.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: l.code === lang ? 'var(--ember)' : 'var(--warm-400)' }}>{l.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <a href="https://app.involve.asia/v2/login" className="nav-login" style={{ font: '600 14px/1 var(--font-body)', color: 'var(--warm-900)', padding: '8px 4px' }}>Login</a>
          <a href="https://app.involve.asia/v2/create-account" className={`btn ${gsClass}`} style={{ padding: '11px 22px', fontSize: 14 }}>Get Started <span className="arw">→</span></a>
        </div>
        <button className="nav-burger" aria-label="Open menu" aria-expanded={mobile} onClick={() => setMobile(v => !v)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--midnight)', marginLeft: 'auto', zIndex: 2 }}>
          <svg width="26" height="26" viewBox="0 0 24 24"><path d={mobile ? 'M5 5l14 14M19 5L5 19' : 'M4 7h16M4 12h16M4 17h16'} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* Mobile panel */}
      {mobile && (
        <div className="nav-mobile" style={{ borderTop: '1px solid var(--warm-200)', background: 'var(--warm-50)', padding: '12px 0 24px', maxHeight: 'calc(100vh - 74px)', overflowY: 'auto' }}>
          <div className="wrap">
            {NAV.map((n) => (
              <details key={n.label} style={{ borderBottom: '1px solid var(--warm-200)' }}>
                <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 4px', fontWeight: 600, fontSize: 16, cursor: 'pointer', listStyle: 'none' }}>{n.label}<Caret /></summary>
                <div style={{ padding: '0 4px 12px' }}>
                  {n.columns
                    ? n.columns.map((col, ci) => (
                        <div key={ci} style={{ marginTop: ci ? 22 : 6 }}>
                          {col.top && <a href={col.top[1]} style={{ display: 'block', padding: '10px 12px', color: 'var(--warm-600)', fontSize: 15 }}>{col.top[0]}</a>}
                          {col.head && <div style={{ margin: '0 12px 10px', padding: '2px 0 9px', borderBottom: '1px solid var(--warm-200)', font: '700 12px/1 var(--font-body)', color: 'var(--warm-400)' }}>{col.head}</div>}
                          {col.links.map(([t, href, soon]) => soon
                            ? <span key={t} style={{ display: 'block', padding: '10px 12px', color: 'var(--warm-400)', fontSize: 15 }}>{t} <em style={{ fontStyle: 'normal', fontSize: 13 }}>(coming soon)</em></span>
                            : <a key={t} href={href} style={{ display: 'block', padding: '10px 12px', color: 'var(--warm-600)', fontSize: 15 }}>{t}</a>)}
                        </div>
                      ))
                    : n.items.map((it) => <a key={it.t} href={it.href} style={{ display: 'block', padding: '10px 12px', color: 'var(--warm-600)', fontSize: 15 }}>{it.t}</a>)}
                </div>
              </details>
            ))}
            <details style={{ borderBottom: '1px solid var(--warm-200)' }}>
              <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 4px', fontWeight: 600, fontSize: 16, cursor: 'pointer', listStyle: 'none' }}>Language: {lang}<Caret /></summary>
              <div style={{ padding: '0 4px 12px' }}>
                {LANGS.map(l => (
                  <button key={l.code} onClick={(e) => { setLang(l.code); const d = e.currentTarget.closest('details'); if (d) d.open = false; }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', textAlign: 'left', background: l.code === lang ? 'var(--warm-100)' : 'none', border: 'none', padding: '11px 12px', color: l.code === lang ? 'var(--warm-900)' : 'var(--warm-600)', font: '600 15px/1 var(--font-body)', cursor: 'pointer', borderRadius: 8 }}>
                    <span>{l.label}</span>
                    <span style={{ fontSize: 13, color: 'var(--warm-400)' }}>{l.code}</span>
                  </button>
                ))}
              </div>
            </details>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
              <a href="https://app.involve.asia/v2/login" className="btn btn-secondary btn-block">Login</a>
              <a href="https://app.involve.asia/v2/create-account" className={`btn ${gsClass} btn-block`}>Get Started</a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .lang-menu{transform-origin:top right; animation:navPanel .18s cubic-bezier(.22,1,.36,1) both;}
        /* The sticky nav is transparent over the hero, so let the hero's decoration (hexagons,
           floating cards) run up behind it instead of being cut off at the nav line. Sides and
           bottom stay clipped (overflow-x:clip also keeps horizontal scroll away). */
        main > section:first-child{ overflow:visible !important; overflow-x:clip !important; clip-path:inset(-100vh 0 0 0); }
        main > section:first-child .ph-hexdeco{ overflow:visible; }
        @keyframes navPanel{from{opacity:0;transform:translateY(-8px) scale(.985)}to{opacity:1;transform:none}}
        .nav-item:hover{background:var(--warm-100);}
        .nav-desk a{color:var(--warm-600);}
        .nav-desk a:hover, .nav-desk a.is-open{color:var(--warm-900);}
        .nav-login:hover{color:var(--ember);}
        .nav-on-dark .nav-login:hover{color:var(--ember-light);}
        .btn .arw{display:inline-block;margin-left:6px;}
        /* Mega items — Concept 3 look with real descriptions */
        .mega4-item b{display:block;font-family:var(--font-body);font-weight:700;font-size:15px;color:var(--warm-900);transition:color .2s cubic-bezier(.4,0,.2,1);}
        .mega4-item .d{display:block;font-size:13px;color:var(--warm-400);margin-top:6px;line-height:1.45;}
        .mega4-item:hover b{color:var(--ember);}
        /* grouped column dropdowns (Advertisers / Publishers) */
        .mega4-col{width:200px;}
        .mega4-head{display:block;font:700 12px/1 var(--font-body);color:var(--warm-400);margin-bottom:11px;}
        .mega4-divider{display:block;height:1px;background:#E8E8E2;margin:0 0 12px;}
        .mega4-link{display:block;padding:8px 0;}
        .mega4-link b{font-family:var(--font-body);font-weight:700;font-size:15px;color:var(--warm-900);transition:color .2s cubic-bezier(.4,0,.2,1);}
        a.mega4-link:hover b{color:var(--ember);}
        .mega4-soon{cursor:default;}
        .mega4-soon b{color:var(--warm-400);}
        .mega4-soon em{font-style:normal;font-size:12px;color:var(--warm-400);margin-left:7px;}
        /* right-side feature card in the mega panel: image + dark scrim overlay, whole card clickable */
        .mega4-feat{ position:relative; display:block; margin-left:auto; flex:0 0 clamp(260px,24vw,320px); height:clamp(224px,23vh,254px); border-radius:var(--r-xl); overflow:hidden; text-decoration:none; box-shadow:0 12px 30px rgba(15,28,46,.14); }
        .mega4-feat img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; will-change:transform; transition:transform .5s cubic-bezier(.22,1,.36,1); }
        .mega4-feat-scrim{ display:none; }
        .mega4-feat-body{ position:absolute; left:0; right:0; bottom:0; z-index:1; display:flex; flex-direction:column; gap:7px; padding:22px; }
        .mega4-feat-head{ font-family:var(--font-display); font-weight:800; font-size:19px; line-height:1.15; letter-spacing:-.01em; color:#fff; }
        .mega4-feat-desc{ font:400 13.5px/1.45 var(--font-body); color:rgba(255,255,255,.86); }
        .mega4-feat-cta{ display:inline-flex; align-items:center; gap:7px; margin-top:5px; font:700 13.5px/1 var(--font-body); color:#fff; }
        .mega4-feat-cta svg{ transition:transform .2s ease; }
        /* Nav over the dark Midnight surface: links + icons go light, in lockstep with the white logo. */
        .nav-on-dark .nav-desk a{color:rgba(255,255,255,.82) !important;}
        .nav-on-dark .nav-desk a:hover, .nav-on-dark .nav-desk a.is-open{color:#fff !important;}
        .nav-on-dark .nav-right button, .nav-on-dark .nav-login{color:rgba(255,255,255,.82) !important;}
        .nav-on-dark .nav-burger{color:#fff !important;}
        .nav-desk a, .nav-right button, .nav-login{transition:color .3s ease, background .15s;}
        @media (prefers-reduced-motion: reduce){ .mega4, .mega4-overlay, .lang-menu{transition:none; animation:none;} }
        @media (max-width: 1040px){
          .nav-desk{display:none !important;}
          .nav-right{display:none !important;}
          .nav-burger{display:inline-flex !important;}
          .mega4{display:none !important;}
        }
      `}</style>
    </header>

    {/* Frosted full-page blur overlay behind the mega (Concept 3). Rendered as a SIBLING
        of the header — NOT nested inside it — so the header's stacking context / transform
        can't clip the backdrop, and the blur reliably applies to the page content. */}
    <div className="mega4-overlay" onClick={() => { setOpen(null); setMobile(false); }} style={{
      position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(248,250,250,.35)',
      backdropFilter: 'blur(9px)', WebkitBackdropFilter: 'blur(9px)',
      opacity: (open !== null || mobile) ? 1 : 0, visibility: (open !== null || mobile) ? 'visible' : 'hidden',
      transition: 'opacity .35s cubic-bezier(.4,0,.2,1), visibility .35s cubic-bezier(.4,0,.2,1)',
    }} />

    {/* Full-width mega panel, drops from the top (Concept 3) */}
    <div className="mega4" role="region" onMouseEnter={() => clearTimeout(closeT.current)} onMouseLeave={scheduleClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 95, background: 'var(--warm-50)',
      boxShadow: '0 24px 40px rgba(15,28,46,.10)', borderBottom: '1px solid var(--warm-200)',
      padding: '92px 0 44px',
      opacity: open !== null ? 1 : 0, visibility: open !== null ? 'visible' : 'hidden',
      transform: open !== null ? 'translateY(0)' : 'translateY(-16px)',
      transition: 'opacity .35s cubic-bezier(.4,0,.2,1), transform .4s cubic-bezier(.4,0,.2,1), visibility .35s cubic-bezier(.4,0,.2,1)',
    }}>
      {NAV.map((n, i) => open === i && (
        <div key={n.label} className="wrap" role="menu">
          <div className="mega4-cols" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px clamp(44px,5vw,72px)', alignItems: 'flex-start' }}>
            {n.columns.map((col, ci) => (
              <div key={ci} className="mega4-col">
                <span className="mega4-head">{col.head}</span>
                <span className="mega4-divider" aria-hidden="true" />
                {col.links.map(l => <MegaLink key={l[0]} link={l} />)}
              </div>
            ))}
            {n.feat && (
              <a className="mega4-feat" href={n.feat.href} role="menuitem">
                <img src={n.feat.img} alt="" loading="lazy" />
                <span className="mega4-feat-scrim" aria-hidden="true" style={{ background: n.feat.scrim }} />
                <span className="mega4-feat-body">
                  <span className="mega4-feat-head">{n.feat.head}</span>
                  <span className="mega4-feat-desc">{n.feat.desc}</span>
                  <span className="mega4-feat-cta">{n.feat.cta} <Arrow s={15} /></span>
                </span>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
    </React.Fragment>
  );
}

function Arrow({ s = 16 }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

const FOOT = [
  { h: 'For Publishers', links: [['Overview','/partners/overview'],['All Brands Directory','https://app.involve.asia/directory'],['Express Withdrawal','/partners/express-withdrawal/'],['Developer API','/partners/api-overview/'],['Data Feed','datafeed.html']] },
  { h: 'For Advertisers', links: [['Overview','/advertisers/'],['How We Track','/advertisers/how-we-track/'],['Partner Discovery','/advertisers/partner-discovery/'],['Automation','/advertisers/automation/'],['Case Studies','/advertisers/case-studies/']] },
  { h: 'Involve', links: [['About Us','/about/'],['Careers','https://career.involve.asia/'],['Blog','https://involve.asia/blog/'],['Support','https://helpcentre.involve.asia/'],['Terms & Conditions','terms-conditions.html'],['Privacy Policy','https://app.involve.asia/publisher/privacypolicy']] },
];
const SOCIAL = [['Facebook','https://www.facebook.com/involveasia'],['Twitter','https://twitter.com/InvolveAsia'],['Instagram','https://www.instagram.com/involveasia/'],['LinkedIn','https://www.linkedin.com/company/involve-asia/']];
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: 'var(--midnight)', color: 'var(--warm-300)', paddingTop: 64 }}>
      <style>{`
        .foot-grid{ display:grid; grid-template-columns:1.4fr repeat(3,1fr); gap:32px; padding-bottom:48px; }
        @media (max-width:900px){ .foot-grid{ grid-template-columns:repeat(3,1fr) !important; gap:32px 24px !important; } .foot-grid > :first-child{ grid-column:1 / -1; } }
        @media (max-width:560px){ .foot-grid{ grid-template-columns:1fr 1fr !important; gap:30px 20px !important; } }
      `}</style>
      <div className="wrap">
        <div aria-hidden="true" style={{ height: 1, background: 'var(--midnight-mid)', marginBottom: 56 }}></div>
        <div className="foot-grid">
          <div style={{ maxWidth: 280 }}>
            <img src={(window.__resources && window.__resources.logoWhite) || "https://ia-design-system.vercel.app/assets/logo/wordmark-white.png"} alt="Involve Asia" width="140" height="30" style={{ height: 30, width: 'auto' }} />
            <p style={{ marginTop: 16, fontSize: 14, color: 'var(--warm-300)', lineHeight: 1.6 }}>
              The affiliate marketing platform connecting advertisers with creators and publishers across Asia.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {SOCIAL.map(([n, u]) => (
                <a key={n} href={u} aria-label={`Involve Asia on ${n}`} style={{ width: 38, height: 38, borderRadius: 'var(--r-lg)', background: 'var(--midnight-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warm-300)', fontSize: 12, fontWeight: 600, transition: 'background .15s' }}
                   onMouseEnter={e => e.currentTarget.style.background = 'var(--midnight-soft)'}
                   onMouseLeave={e => e.currentTarget.style.background = 'var(--midnight-mid)'}>{n[0]}</a>
              ))}
            </div>
          </div>
          {FOOT.map(col => (
            <div key={col.h}>
              <h4 style={{ fontSize: 13, color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 700 }}>{col.h}</h4>
              <ul style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {col.links.map(([t, u]) => (
                  <li key={t}><a href={u} style={{ fontSize: 14, color: 'var(--warm-300)', transition: 'color .15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--warm-300)'}>{t}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--midnight-mid)', padding: '24px 0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <p style={{ fontSize: 13, color: 'var(--warm-300)' }}>© 2014–{year} Involve Asia Technologies Sdn Bhd · 201201032669 (1017157-V)</p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button aria-label="Change language — English" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--midnight-mid)', border: 'none', borderRadius: 'var(--r-md)', padding: '8px 14px', color: 'var(--warm-300)', font: '500 13px/1 var(--font-body)', cursor: 'pointer' }}>🌐 English</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Hexagon cursor follower ----------------
   A small #D2D2CC hexagon trails the real cursor with an eased lag (GSAP quickTo).
   Over any clickable element it rotates 90°, enlarges and dims. Extras for polish:
   fades in on first move / out when the pointer leaves the window, a subtle click
   pulse, and it's disabled on touch + reduced-motion (and never blocks clicks). The
   native cursor stays visible — the hexagon is a trailing accent, not a replacement. */
const CURSOR_CLICKABLE = 'a,button,[role="button"],input,textarea,select,label,summary,.nm-door,.offer-card,.offer-rail-tab,[data-cursor="link"]';
function HexCursor() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current, gsap = window.gsap;
    if (!el || !gsap) return;
    if (!window.matchMedia('(pointer: fine)').matches || prefersReduced()) return;  // skip on touch / reduced-motion
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    const xTo = gsap.quickTo(el, 'x', { duration: 0.36, ease: 'power3' });   // snappier lag
    const yTo = gsap.quickTo(el, 'y', { duration: 0.36, ease: 'power3' });
    const poly = el.querySelector('polygon');
    let shown = false, isHover = false;
    const base = () => (isHover ? 0.45 : 0.9);
    const onMove = (e) => {
      xTo(e.clientX); yTo(e.clientY);
      if (!shown) { shown = true; gsap.to(el, { opacity: base(), duration: 0.3 }); }
      const over = !!(e.target.closest && e.target.closest(CURSOR_CLICKABLE));
      if (over !== isHover) {
        isHover = over;
        gsap.to(el, { rotation: over ? 180 : 0, scale: over ? 1.7 : 1, opacity: base(), duration: 0.32, ease: 'power3' });
        // over a clickable: a light fill → soft adaptive highlight, kept low so text behind stays readable
        gsap.to(poly, { fillOpacity: over ? 0.22 : 0, duration: 0.32, ease: 'power3' });
      }
    };
    const onLeaveWin = () => gsap.to(el, { opacity: 0, duration: 0.25 });
    const onEnterWin = () => { if (shown) gsap.to(el, { opacity: base(), duration: 0.25 }); };
    const onDown = () => gsap.to(el, { scale: isHover ? 1.45 : 0.7, duration: 0.12 });
    const onUp = () => gsap.to(el, { scale: isHover ? 1.7 : 1, duration: 0.2, ease: 'power2' });
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeaveWin);
    document.addEventListener('mouseenter', onEnterWin);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeaveWin);
      document.removeEventListener('mouseenter', onEnterWin);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);
  return (
    <div ref={ref} className="hex-cursor" aria-hidden="true">
      <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ display: 'block', overflow: 'visible' }}>
        <polygon points="50,5 88.97,27.5 88.97,72.5 50,95 11.03,72.5 11.03,27.5" fill="#D2D2CC" fillOpacity="0" stroke="#D2D2CC" strokeWidth="7" strokeLinejoin="round" />
      </svg>
      <style>{`
        /* hexagon cursor; mix-blend EXCLUSION auto-contrasts against light & dark backdrops
           but with softer, less harsh tones than difference. Fills in on hover (see JS). */
        .hex-cursor{position:fixed; left:0; top:0; z-index:9990; width:26px; height:29px; pointer-events:none;
          mix-blend-mode:exclusion; will-change:transform,opacity;}
        @media (pointer: coarse){ .hex-cursor{display:none;} }
        @media (prefers-reduced-motion: reduce){ .hex-cursor{display:none;} }
      `}</style>
    </div>
  );
}

/* Back-to-top sticky CTA (Figma 1542:59021) — a translucent-grey halo with a white inner
   circle and a muted up-chevron, fixed bottom-right. Shows ONLY when the user is (a) past
   the hero AND (b) scrolling up; hides on scroll-down or back in the hero. Subtle fade +
   rise on enter/exit. Reads scroll from Lenis (falls back to window scroll). */
function BackToTop() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const hero = document.getElementById('hero');
    let last = -1;
    // Poll the scroll position (Lenis owns scrolling, so native 'scroll' events don't fire,
    // and Lenis may init after this mounts) — reading lenis.scroll each tick is timing-proof.
    const id = setInterval(() => {
      const l = window.__lenis;
      const y = (l && typeof l.scroll === 'number') ? l.scroll : (window.scrollY || window.pageYOffset || 0);
      if (last < 0) { last = y; return; }
      const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
      const pastHero = y > heroBottom - 120;
      if (y > last + 3) setShow(false);                  // scrolling down → hide
      else if (y < last - 3 && pastHero) setShow(true);  // scrolling up, past hero → show
      else if (!pastHero) setShow(false);                // back in the hero → hide
      last = y;
    }, 100);
    return () => clearInterval(id);
  }, []);
  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 0.9 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <React.Fragment>
      <button type="button" className={'b2t' + (show ? ' b2t-in' : '')} onClick={toTop} aria-label="Back to top" tabIndex={show ? 0 : -1}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 15l6-6 6 6" /></svg>
      </button>
      <style>{`
        .b2t{ position:fixed; right:clamp(16px,2.5vw,28px); bottom:clamp(16px,2.5vw,28px); z-index:90;
          width:64px; height:64px; padding:0; border:none; background:rgba(222,222,222,.32); border-radius:50%;
          display:flex; align-items:center; justify-content:center; cursor:pointer;
          opacity:0; transform:translateY(14px) scale(.92); pointer-events:none; visibility:hidden;
          transition:opacity .38s ease, transform .42s cubic-bezier(.22,1,.36,1), visibility 0s linear .42s; }
        .b2t::before{ content:""; position:absolute; width:46px; height:46px; background:#fff; border:1px solid var(--warm-100); border-radius:50%; box-shadow:0 6px 18px rgba(15,28,46,.10); }
        .b2t svg{ position:relative; z-index:1; width:17px; height:17px; color:#a7a7a1; transition:color .2s ease; }
        .b2t:hover svg{ color:var(--warm-600); }
        .b2t:hover::before{ box-shadow:0 8px 22px rgba(15,28,46,.16); }
        .b2t.b2t-in{ opacity:1; transform:translateY(0) scale(1); pointer-events:auto; visibility:visible;
          transition:opacity .4s ease, transform .5s cubic-bezier(.22,1,.36,1); }
        @media (prefers-reduced-motion:reduce){
          .b2t{ transform:none; transition:opacity .2s linear, visibility 0s linear .2s; }
          .b2t.b2t-in{ transform:none; transition:opacity .2s linear; }
        }
      `}</style>
    </React.Fragment>
  );
}


/* Lenis inertia smooth-scroll + smooth in-page anchor scrolling (off under reduced-motion). */
function useSmoothScroll() {
  React.useEffect(() => {
    if (prefersReduced() || !window.Lenis) return;
    const lenis = new window.Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.4 });
    window.__lenis = lenis;
    const gsap = window.gsap, ST = window.ScrollTrigger;
    let raf = null, tick = null;
    if (gsap && ST) {
      lenis.on('scroll', ST.update);
      tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    } else {
      const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        // Honour the target's own scroll-margin-top (e.g. pages with a sticky sub-bar
        // set a larger one); fall back to the default 80px header offset.
        const smt = parseFloat(getComputedStyle(el).scrollMarginTop) || 80;
        lenis.scrollTo(el, { offset: -smt, duration: 1.1 });
      }
    };
    document.addEventListener('click', onClick);
    return () => {
      if (tick && gsap) gsap.ticker.remove(tick);
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);
}

/* Scroll-reveal: add `.in` to [data-reveal] as they enter view (reduced-motion shows all). */
function useScrollReveal() {
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'));
    if (prefersReduced()) { els.forEach(e => e.classList.add('in')); return; }
    // On mobile, reveal the hero immediately on page load (its fade-in plays on load,
    // not on scroll into view) — the rest of the page still reveals as it enters view.
    const heroEls = window.matchMedia('(max-width:900px)').matches
      ? Array.from(document.querySelectorAll('#pub-hero [data-reveal]')) : [];
    const heroSet = new Set(heroEls);
    heroEls.forEach(e => e.classList.add('in'));
    const io = new IntersectionObserver((ents) => {
      ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    els.forEach(e => { if (!heroSet.has(e)) io.observe(e); });
    return () => io.disconnect();
  }, []);
}

Object.assign(window, { prefersReduced, Nav, Arrow, Footer, HexCursor, BackToTop, useSmoothScroll, useScrollReveal });
