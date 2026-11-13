/* ============================================================================
   blog.jsx — "Involve Asia Blog" landing page. Rebuilt from the live involve.asia/blog/
   page in our design system: same audience entry points (Publisher / Advertiser blogs)
   and the same four category sections, in the same order. Posts are PLACEHOLDERS copied
   from the live page (title, link, featured image); at dev time each row is fed by the
   newest posts in its WordPress category. All copy (including the placeholder post titles,
   zipped with the slugs/images below by index) lives in content/pages/blog/<lang>.json and
   arrives through useCopy — this file only holds the layout, links and images. Loads AFTER
   ia-shared.jsx (Nav/Footer/Arrow/BackToTop/hooks live on window / global scope).
   ============================================================================ */

const BLOG_BASE = 'https://involve.asia/blog/';
const BLOG_IMG = 'https://involve.asia/wp-content/uploads/';
const { useCopy } = window;

/* ---------- Hero honeycomb (shared hero art, see useHeroDecoArt in ia-shared.jsx) ---------- */
function BlogHexField() {
  const { paths, W, H, transform } = window.useHeroDecoArt();
  const svgRef = React.useRef(null);
  window.useHexPush(svgRef, paths);
  const pad = 0.12;
  const vb = `${-W * pad} ${-H * pad} ${W * (1 + 2 * pad)} ${H * (1 + 2 * pad)}`;
  return (
    <svg ref={svgRef} className="bh-hexfield" viewBox={vb} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="var(--warm-100)" transform={transform}>{paths.map((d, i) => <path key={i} className="hx" d={d} />)}</g>
    </svg>
  );
}

/* ---------- Section 1 — Hero + the two audience entry points (as on the live page), laid out as the
   homepage "Pick your side" scene: two photo hexagons in the middle, one audience on each side ---------- */
// text (kick/title/d/cta) comes from c.doors, zipped by index
const BLOG_DOORS = [
  { tone: 'pub', href: 'https://involve.asia/publisher-blog/' },
  { tone: 'adv', href: 'https://involve.asia/advertiser-blog/' },
];
function BlogHero({ c }) {
  const doors = BLOG_DOORS.map((x, i) => ({ ...x, ...c.doors[i] }));
  return (
    <section id="blog-hero" className="bh-sec">
      <div className="bh-honey" aria-hidden="true"><BlogHexField /></div>
      <div className="wrap bh-wrap">
        <h1 className="bh-title" data-reveal>{c.title}</h1>
        <p className="bh-sub" data-reveal data-reveal-delay="1">{c.sub}</p>
      </div>
      <div className="hf-scene bh-scene">
        <span className="hf-kick hf-kick-m" aria-hidden="true">{doors[0].kick}</span>
        <span className="hf-kick adv hf-kick-m" aria-hidden="true">{doors[1].kick}</span>
        <img className="hf-photohex hf-ph-pub" src="media/figma/publisher-blog-image.png" alt={c.pubImageAlt} style={{ '--i': 0 }} />
        <img className="hf-photohex hf-ph-adv" src="media/figma/advertiser-blog-image.png" alt={c.advImageAlt} style={{ '--i': 1 }} />
        {doors.map((x) => (
          <div key={x.tone} className={`hf-card hf-card-${x.tone}`}>
            <span className={'hf-kick' + (x.tone === 'adv' ? ' adv' : '')}>{x.kick}</span>
            <h2 className="hf-ct">{x.title}</h2>
            <p className="hf-cd">{x.d}</p>
            <a href={x.href} className={`btn ${x.tone === 'adv' ? 'btn-advertiser' : 'btn-primary'}`}>{x.cta} <Arrow /></a>
          </div>
        ))}
      </div>
      <style>{HF_CSS + `
        .bh-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(44px,8vh,92px) 0 clamp(36px,5.5vh,64px); text-align:center; }
        /* start the field under the transparent nav (74px + 1px border) so its top row isn't cut at the nav line */
        /* sized like the About hero's field (not this taller hero) so the rings sit in the same place
           and at the same size as on About; heights fitted to About's hero at each width */
        .bh-honey{ position:absolute; left:0; top:-75px; width:100%; height:calc(358px + 6.27vw); z-index:0; pointer-events:none; }
        @media (max-width:900px){ .bh-honey{ height:calc(559px - 16vw); } }
        @media (max-width:600px){ .bh-honey{ height:calc(760px - 50vw); } .bh-honey .bh-hexfield{ left:56%; } }
        .bh-hexfield{ position:absolute; inset:0; width:100%; height:100%;
          -webkit-mask-image:radial-gradient(120% 100% at 50% 30%, #000 0%, #000 40%, transparent 76%);
          mask-image:radial-gradient(120% 100% at 50% 30%, #000 0%, #000 40%, transparent 76%); }
        .bh-wrap{ position:relative; z-index:1; }
        .bh-title{ margin:0 auto; max-width:840px; font-size:clamp(30px,4.8vw,56px); line-height:1.06; letter-spacing:-.03em; color:var(--warm-900); }
        .bh-sub{ margin:20px auto 0; max-width:700px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        /* two-hexagon scene (the homepage "Pick your side" layout): no honeycomb here — the hero rings sit behind */
        .bh-scene{ z-index:1; margin-top:clamp(-8px,-1vh,0px); height:clamp(380px,34vw,430px); }
        .bh-scene .hf-ct{ font-size:clamp(22px,2vw,28px); line-height:1.15; }
        .bh-scene .hf-cd{ max-width:260px; }
        /* the blog photos are square, so crop them to the same rounded hexagon the homepage hexes use;
           shown as supplied (the homepage mirrors its publisher photo, these don't need it) */
        .bh-scene .hf-photohex{ aspect-ratio:640/720; object-fit:cover;
          -webkit-mask:url('media/figma/s9-hex-g1.png') center/100% 100% no-repeat; mask:url('media/figma/s9-hex-g1.png') center/100% 100% no-repeat; }
        .bh-scene .hf-ph-pub{ transform:translate(calc(-50% + var(--hx-x0)), -50%); }
        /* narrow desktops: smaller hexagons so the side copy never runs into them */
        @media (min-width:901px) and (max-width:1180px){ .bh-scene{ --hx-w:200px; --hx-g:16px; } }
        @media (max-width:900px){
          .bh-scene{ box-sizing:border-box; height:auto; margin-top:clamp(24px,4vh,36px); padding:0 20px; }
          .bh-scene .hf-ct{ font-size:clamp(17px,4.6vw,22px); line-height:1.2; }
          .bh-scene > *{ min-width:0; }
          /* half-width columns: let the long button labels wrap instead of pushing the grid wider */
          .bh-scene .hf-card .btn{ white-space:normal; line-height:1.25; }
          .bh-scene .hf-card-adv .btn{ text-align:right; }
          /* both cards fill the row so their buttons line up along the bottom */
          .bh-scene .hf-card{ align-self:stretch; }
          .bh-scene .hf-ph-pub{ transform:none; }
          .bh-scene .hf-card .btn{ margin-top:auto; }
        }
        @media (max-width:700px){
          .bh-sec{ text-align:left; } .bh-title, .bh-sub{ margin-left:0; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Category bar — jumps to the four sections below ---------- */
function BlogCatBar({ cats, c }) {
  const [on, setOn] = React.useState(cats[0].id);
  React.useEffect(() => {
    const els = cats.map((c) => document.getElementById(c.id)).filter(Boolean);
    const io = new IntersectionObserver((ents) => {
      const vis = ents.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) setOn(vis[0].target.id);
    }, { rootMargin: '-140px 0px -55% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  // keep the active category visible when the bar scrolls sideways (mobile)
  const wrapRef = React.useRef(null);
  React.useEffect(() => {
    const wrap = wrapRef.current, link = wrap && wrap.querySelector('.bc-link.on');
    if (!link || wrap.scrollWidth <= wrap.clientWidth) return;
    wrap.scrollTo({ left: link.offsetLeft - (wrap.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' });
  }, [on]);
  return (
    <nav className="bc-bar" aria-label={c.ariaLabel}>
      <div className="wrap bc-wrap" ref={wrapRef}>
        {cats.map((x) => (
          <a key={x.id} href={`#${x.id}`} className={'bc-link' + (on === x.id ? ' on' : '')} aria-current={on === x.id ? 'true' : undefined}>{x.label}</a>
        ))}
      </div>
      <style>{`
        .bc-bar{ position:sticky; top:63px; z-index:20; background:rgba(250,250,248,.94); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); border-bottom:1px solid var(--warm-200); }
        .bc-wrap{ position:relative; display:flex; justify-content:center; gap:4px; overflow-x:auto; scrollbar-width:none; }
        .bc-wrap::-webkit-scrollbar{ display:none; }
        .bc-link{ flex:none; position:relative; padding:16px 14px; font:600 14px/1 var(--font-body); color:var(--warm-600); text-decoration:none; white-space:nowrap; transition:color .15s ease; }
        .bc-link:hover{ color:var(--warm-900); }
        .bc-link.on{ color:var(--warm-900); }
        .bc-link.on::after{ content:""; position:absolute; left:14px; right:14px; bottom:-1px; height:2px; background:var(--warm-900); }
        @media (max-width:700px){ .bc-wrap{ justify-content:flex-start; padding:0 8px; } .bc-link{ padding:14px 12px; font-size:13px; } }
      `}</style>
    </nav>
  );
}

/* ---------- Sections 2–5 — the live page's four categories, same order and "See All" targets ---------- */
// slug + featured image per post; the category label/tag/title and the post titles come from
// c.cats (same order), zipped by index in BlogApp
const BLOG_CATS = [
  { id: 'programs', tone: 'pub',
    all: BLOG_BASE + 'category/partners/featured-offers/', posts: [
      ['chagee-affiliate-program', '2026/09/Wordpress-blog-post-11-768x512.jpg'],
      ['coursera-affiliate-program', '2026/09/Wordpress-blog-post-5-768x512.jpg'],
      ['skylum-affiliate-program', '2026/09/Wordpress-blog-post-4-768x512.jpg'],
      ['lancome-affiliate-program', '2026/09/Wordpress-blog-post-2-768x512.jpg'],
      ['miravia-affiliate-program', '2026/10/Wordpress-blog-post-768x512.jpg'],
      ['emergent-ai-affiliate-program', '2026/10/Wordpress-blog-post-14-768x512.jpg'],
      ['trevo-affiliate-program', '2026/09/Wordpress-blog-post-10-768x512.jpg'],
      ['shopee-brazil-affiliate-program', '2026/09/Wordpress-blog-post-9-768x512.jpg'],
    ] },
  { id: 'guides', tone: 'pub',
    all: BLOG_BASE + 'category/partners/getting-started-publishers/', posts: [
      ['what-are-affiliate-commissions', '2026/04/What-Are-Affiliate-Commissions-768x512.png'],
      ['what-are-affiliate-programs', '2026/04/What-Are-Affiliate-Programs-768x512.png'],
      ['what-are-affiliate-earnings', '2026/04/What-Are-Affiliate-Earnings-Beginner-Guide-with-Involve-Asia-768x512.png'],
      ['what-is-an-affiliate-creator', '2026/04/What-Is-an-Affiliate-Creator-Beginner-Guide-with-Involve-Asia-768x512.png'],
      ['affiliate-marketing-payment-methods', '2026/09/Wordpress-blog-post-13-768x512.png'],
      ['what-is-epc-in-affiliate-marketing', '2026/05/what-is-epc-in-affiliate-marketing-768x512.jpg'],
      ['what-are-affiliate-marketers', '2026/05/affiliate-marketers-768x512.jpg'],
      ['what-are-affiliate-networks', '2026/04/What-Are-Affiliate-Networks-Beginner-Guide-with-Involve-Asia-768x512.png'],
    ] },
  { id: 'publisher-stories', tone: 'pub',
    all: BLOG_BASE + 'category/partners/success-stories-partners/', posts: [
      ['good-foodie-monetise-content-through-involve', '2023/04/Featured-Image-Good-Foodie-768x512.png'],
      ['raiz-invest-bridging-the-gap', '2022/12/Raiz-Invest-EN-Feature-Image-768x512.png'],
      ['supermom-career-woman-mother', '2022/11/Supermom-Feature-Image-768x512.jpg'],
      ['weng-honn-educating-making-money-online', '2021/12/20210527-Feature-Image-Success-Story-Weng-Honn-min-768x512.jpg'],
      ['partner-success-story-getplus', '2024/08/Featured-Image-Partner-Success-Story-GetPluss-Affiliate-Marketing-Success-768x512.png'],
      ['partner-success-story-terence-ooi', '2024/06/Terence-Ooi-Feature-Image-768x512.webp'],
      ['partner-success-story-jourimanzky', '2024/06/Featured-Image-Jourimanzkys-Success-Story-768x512.png'],
      ['partner-success-story-flickstree', '2024/01/Featured-Image-Partner-Success-Story-Flickstree-1-768x512.png'],
      ['media-terkini', '2023/08/Success-Story-MediaTerkini-768x512.jpg'],
      ['my-weekend-plan-make-everyday-feel-like-saturday', '2023/05/MyWeekendPlan_FI-D03-768x512.png'],
    ] },
  { id: 'advertiser-stories', tone: 'adv',
    all: BLOG_BASE + 'category/advertisers/success-stories/', posts: [
      ['involve-social-partners-time-internet', '2024/01/TIME-Internet-MY-Case-Study-Feature-Image-768x512.png'],
      ['lotuss-sales-optimisation', '2024/02/Lotuss-Case-Study-Feature-Image-768x512.png'],
      ['big-bang-sales', '2024/02/Big-Bang-Sales-Feature-Image-768x512.png'],
      ['influencers-engagement-easybook-instagram', '2024/01/Easybook-Case-Study-Feature-Image-V2-768x512.png'],
      ['how-gaming-brands-boost-revenue-with-affiliate-marketing', '2026/07/How-Gaming-Brands-Boost-Revenue-With-Affiliate-Marketing-in-2026-768x512.png'],
      ['health-affiliate-program-case-study', '2026/05/Wordpress-blog-post-1-768x512.jpg'],
      ['digital-service-affiliate-programs-case-study', '2026/05/how-digital-service-brands-grow-with-affiliate-marketing-768x512.jpg'],
      ['philippine-finance-brands-grow-with-affiliate-marketing', '2025/11/How-Philippine-Finance-Affiliate-Programs-Grow-With-Involve-Asia-768x512.png'],
      ['philippine-fashion-brands-grow-with-affiliate-marketing', '2025/11/How-Philippine-Fashion-Brands-Are-Growing-With-Affiliate-Marketing-on-Involve-Asia-768x512.png'],
      ['ringgitplus-garnered-increase-signups-personal-loans', '2024/03/RinggitPlus-Personal-Loans-Feature-Image-768x512.png'],
    ] },
];

const BlogChevron = ({ dir }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir < 0 ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
  </svg>
);
function BlogRow({ cat, alt, c }) {
  const rowRef = React.useRef(null);
  const [edge, setEdge] = React.useState({ start: true, end: false });
  const sync = React.useCallback(() => {
    const el = rowRef.current; if (!el) return;
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4 });
  }, []);
  React.useEffect(() => {
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [sync]);
  const page = (dir) => { const el = rowRef.current; if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' }); };
  return (
    <section id={cat.id} className={'br-sec' + (alt ? ' br-alt' : '') + ` br-${cat.tone}`}>
      <div className="wrap">
        <div className="br-head" data-reveal>
          <div className="br-headtxt">
            <span className="br-tag">{cat.tag}</span>
            <h2 className="br-title">{cat.title}</h2>
          </div>
          <div className="br-ctrl">
            <a href={cat.all} className="br-all">{c.seeAll} <Arrow s={15} /></a>
            <button type="button" className="br-nav" aria-label={c.prev.replace('{label}', cat.label.toLowerCase())} onClick={() => page(-1)} disabled={edge.start}><BlogChevron dir={-1} /></button>
            <button type="button" className="br-nav" aria-label={c.next.replace('{label}', cat.label.toLowerCase())} onClick={() => page(1)} disabled={edge.end}><BlogChevron dir={1} /></button>
          </div>
        </div>
        <div className="br-row" ref={rowRef} onScroll={sync}>
          {cat.posts.map(([t, slug, img]) => (
            <a key={slug} href={`${BLOG_BASE}${slug}/`} className="br-card">
              <span className="br-img"><img src={BLOG_IMG + img} alt="" loading="lazy" /></span>
              <span className="br-body">
                <span className="br-cat">{cat.label}</span>
                <span className="br-t">{t}</span>
                <span className="br-more">{c.readMore} <Arrow s={14} /></span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
const BLOG_ROW_CSS = `
        .br-sec{ background:var(--warm-50); padding:clamp(48px,8vh,88px) 0; scroll-margin-top:112px; }
        .br-sec.br-alt{ background:var(--warm-100); }
        .br-head{ display:flex; align-items:flex-end; justify-content:space-between; gap:16px 32px; flex-wrap:wrap; }
        .br-tag{ display:inline-block; font:600 12px/1 var(--font-body); padding:6px 10px; border-radius:var(--r-full); }
        .br-pub .br-tag{ background:var(--ember-tint); color:var(--ember-dark); }
        .br-adv .br-tag{ background:var(--midnight-light-tint); color:var(--midnight-light); }
        .br-title{ margin-top:12px; font-size:clamp(24px,3vw,34px); line-height:1.1; letter-spacing:-.02em; color:var(--warm-900); max-width:640px; }
        .br-ctrl{ display:flex; align-items:center; gap:8px; }
        .br-all{ display:inline-flex; align-items:center; gap:6px; margin-right:8px; font:600 14px/1 var(--font-body); color:var(--warm-900); text-decoration:none; }
        .br-all svg{ transition:transform .2s ease; }
        .br-all:hover svg{ transform:translateX(3px); }
        .br-nav{ width:40px; height:40px; display:inline-flex; align-items:center; justify-content:center; border:1px solid var(--warm-200); border-radius:var(--r-md);
          background:#fff; color:var(--warm-900); cursor:pointer; transition:background .15s ease, border-color .15s ease, color .15s ease; }
        .br-nav:hover:not(:disabled){ background:var(--warm-100); border-color:var(--warm-300); }
        .br-nav:disabled{ color:var(--warm-300); cursor:default; }
        .br-row{ margin-top:clamp(24px,3.4vh,36px); display:grid; grid-auto-flow:column; grid-auto-columns:calc((100% - 3 * 16px) / 4); gap:16px;
          overflow-x:auto; scroll-snap-type:x mandatory; overscroll-behavior-x:contain; scrollbar-width:none; padding:2px 2px 8px; margin-left:-2px; margin-right:-2px; }
        .br-row::-webkit-scrollbar{ display:none; }
        .br-card{ scroll-snap-align:start; display:flex; flex-direction:column; min-width:0; background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-lg);
          overflow:hidden; box-shadow:var(--shadow-sm); text-decoration:none; transition:box-shadow .2s ease, border-color .2s ease; }
        .br-card:hover{ box-shadow:var(--shadow-card-hover); border-color:var(--warm-300); }
        .br-img{ display:block; aspect-ratio:3 / 2; background:var(--warm-150); overflow:hidden; }
        .br-img img{ display:block; width:100%; height:100%; object-fit:cover; }
        .br-body{ flex:1; display:flex; flex-direction:column; padding:16px 18px 18px; }
        .br-cat{ font:600 12px/1.2 var(--font-body); }
        .br-pub .br-cat{ color:var(--ember-dark); }
        .br-adv .br-cat{ color:var(--midnight-light); }
        .br-t{ margin-top:8px; font:600 16px/1.4 var(--font-body); color:var(--warm-900);
          display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
        .br-more{ margin-top:auto; padding-top:16px; display:inline-flex; align-items:center; gap:6px; font:600 13px/1 var(--font-body); color:var(--warm-900); }
        .br-more svg{ transition:transform .2s ease; }
        .br-card:hover .br-more svg{ transform:translateX(3px); }
        @media (max-width:1000px){ .br-row{ grid-auto-columns:calc((100% - 2 * 16px) / 3); } }
        @media (max-width:700px){
          .br-head{ align-items:flex-start; }
          .br-nav{ display:none; }
          .br-ctrl{ order:2; }
          /* full-bleed swipe row: 1 card + a peek of the next */
          .br-row{ grid-auto-columns:78%; gap:12px; margin-left:-20px; margin-right:-20px; padding:2px 20px 8px; scroll-padding-left:20px; scroll-snap-type:x proximity; }
          .br-t{ font-size:15px; }
        }`;
function BlogSections({ cats, c }) {
  return (
    <React.Fragment>
      {cats.map((x, i) => <BlogRow key={x.id} cat={x} alt={i % 2 === 1} c={c} />)}
      <style>{BLOG_ROW_CSS}</style>
    </React.Fragment>
  );
}


/* Shared by the finale below and the blog hero's two-hexagon scene. */
const HF_CSS = `
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
      `;

/* ---------------- "Pick your side and grow with us." dual-audience CTA ----------------
   Copied verbatim from the homepage (ia-bundle.jsx HexFinaleStatic, via glossary.jsx) — the final section
   before the footer. */
function HexFinaleStatic({ c }) {
  // [column, row] on the .hf-scene grid (publisher photo = col 0 row 0; odd rows shift half a column)
  const HF_HONEY = [[0, -1], [1, -1], [-2, 1], [-1, 1], [0, 1], [2, 1]];
  return (
    <section id="cta" className="hf">
      <div className="hf-cta">
        <h2 className="hf-head" data-reveal>{c.title}</h2>
        <div className="hf-scene">
          <div className="hf-honey" aria-hidden="true">
            {HF_HONEY.map(([c, r], i) => (
              <span key={i} className="hf-combhex" style={{ '--c': c + (r % 2 ? 0.5 : 0), '--r': r, '--i': i + 2 }} />
            ))}
          </div>
          <span className="hf-kick hf-kick-m" aria-hidden="true">{c.pub.kick}</span>
          <span className="hf-kick adv hf-kick-m" aria-hidden="true">{c.adv.kick}</span>
          <img className="hf-photohex hf-ph-pub" src="media/figma/s9-hex-pub.webp" alt={c.pubImageAlt} style={{ '--i': 0 }} />
          <img className="hf-photohex hf-ph-adv" src="media/figma/s9-hex-adv.webp" alt={c.advImageAlt} style={{ '--i': 1 }} />
          <div className="hf-card hf-card-pub">
            <span className="hf-kick">{c.pub.kick}</span>
            <h3 className="hf-ct">{c.pub.titleA}<br />{c.pub.titleB}</h3>
            <p className="hf-cd">{c.pub.d}<span className="hf-cd-more">{c.pub.dMore}</span></p>
            <a href="/partners/" className="btn btn-primary">{c.pub.cta} <Arrow /></a>
          </div>
          <div className="hf-card hf-card-adv hf-right">
            <span className="hf-kick adv">{c.adv.kick}</span>
            <h3 className="hf-ct">{c.adv.titleA}<br />{c.adv.titleB}</h3>
            <p className="hf-cd">{c.adv.d}<span className="hf-cd-more">{c.adv.dMore}</span></p>
            <a href="/advertisers/" className="btn btn-advertiser">{c.adv.cta} <Arrow /></a>
          </div>
        </div>
      </div>
      <style>{HF_CSS}</style>
    </section>
  );
}

function BlogApp() {
  useSmoothScroll();
  useScrollReveal();
  const c = useCopy('blog');
  const cats = BLOG_CATS.map((x, i) => ({ ...x, ...c.cats[i], posts: x.posts.map(([slug, img], j) => [c.cats[i].posts[j], slug, img]) }));
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <BlogHero c={c.hero} />
        {/* the category bar is sticky only while the four category sections are on screen */}
        <div className="bl-cats">
          <BlogCatBar cats={cats} c={c.catBar} />
          <BlogSections cats={cats} c={c.row} />
        </div>
        {/* "Pick your side and grow with us." is hidden for now (its two hexagons moved into the hero);
            add <HexFinaleStatic c={c.finale} /> back here to bring it back */}
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BlogApp />);
