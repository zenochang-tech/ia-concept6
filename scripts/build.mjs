// Production build → dist/
//
// The source pages compile their .jsx in the browser (Babel-standalone) and render
// everything with JavaScript, so crawlers that don't run JS see an empty page. This
// build keeps the source exactly as it is and produces a publishable copy where:
//   1. each <script type="text/babel" src="x.jsx"> is compiled ahead of time to x.js
//      (esbuild), and Babel-standalone is dropped;
//   2. React's development builds are swapped for the production builds (self-hosted);
//   3. every page is opened in headless Chrome and its rendered #root is baked into
//      the HTML, so the real headings, copy and links are in the page source.
// Language copies (id/referral-program.html, written by build-i18n.py) go through the same
// steps, and the language list, the shared menu/footer text and each translated page's copy
// are inlined as window.IA_I18N / IA_SHARED / IA_COPY, so the live site never fetches content/*.json.
// Pages are linked without ".html"; the preview server below resolves /about to about.html
// the same way GitHub Pages does.
// In the browser React still mounts as before and replaces the baked markup; until it
// does, the baked copy stays invisible so the page looks exactly as it does today.
//
//   npm run build            → python3 build-i18n.py, python3 build-seo.py, then this script
//   npm run preview          → serve dist/ on http://localhost:8800 (after a build)

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'dist');

// Source-only files that don't belong on the live site.
const SKIP = new Set(['node_modules', 'dist', '.git', '.github', 'scripts', 'content',
  'package.json', 'package-lock.json', 'build-seo.py', 'build-glossary.py', '.gitignore', '.DS_Store']);
const SKIP_RE = /\.bak(-.*)?$|\.orig$|^_backup.*\.md$|^README\.md$/;

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif',
  '.webm': 'video/webm', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };

// Tiny static server for dist/ (used for pre-rendering and `npm run preview`).
function serve(dir, port) {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    else if (!path.extname(p) && fs.existsSync(path.join(dir, p + '.html'))) p += '.html';
    const file = path.join(dir, p);
    if (!file.startsWith(dir) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404); return res.end('Not found');
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((ok) => server.listen(port, '127.0.0.1', () => ok(server)));
}

if (process.argv.includes('--serve')) {
  await serve(OUT, 8800);
  console.log('Serving dist/ on http://localhost:8800');
  await new Promise(() => {});
}

// ---------- 1. Copy the site ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT);
const keep = (src) => { const n = path.basename(src); return n !== '.DS_Store' && !SKIP_RE.test(n); };
for (const name of fs.readdirSync(ROOT)) {
  if (SKIP.has(name) || !keep(name)) continue;
  fs.cpSync(path.join(ROOT, name), path.join(OUT, name), { recursive: true, filter: keep });
}
fs.mkdirSync(path.join(OUT, 'vendor'), { recursive: true });
for (const [pkg, file] of [['react', 'react.production.min.js'], ['react-dom', 'react-dom.production.min.js']]) {
  fs.copyFileSync(path.join(ROOT, 'node_modules', pkg, 'umd', file), path.join(OUT, 'vendor', file));
}

// ---------- 2. Compile .jsx and rewrite the script tags ----------
// Babel-standalone lowered `const` to `var`, so a page script could re-declare a name the
// shared script already defines (e.g. `const { Nav } = window;` next to ia-shared's
// `function Nav`). esbuild keeps `const`, so page scripts (anything not loaded by several
// pages) get their own scope; shared scripts stay global and export via `window`.
const BABEL_TAG = /<script type="text\/babel" src="([^"]+\.jsx)"><\/script>/g;
const I18N = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'i18n.json'), 'utf8'));
const langDirs = I18N.languages.map((l) => l.path).filter((d) => d && fs.existsSync(path.join(OUT, d)));
const rootHtml = fs.readdirSync(OUT).filter((f) => f.endsWith('.html')).sort();
const htmlFiles = [...rootHtml, ...langDirs.flatMap((d) => fs.readdirSync(path.join(OUT, d)).filter((f) => f.endsWith('.html')).sort().map((f) => `${d}/${f}`))];
const uses = new Map();
// Count each script once per English page: a language copy loads the same page script,
// which must still get its own scope.
for (const name of rootHtml) {
  for (const m of fs.readFileSync(path.join(OUT, name), 'utf8').matchAll(BABEL_TAG)) uses.set(m[1], (uses.get(m[1]) || 0) + 1);
}
// window.IA_I18N on every page; on a language copy also window.IA_SHARED (menu/footer text,
// content/shared/<lang>.json); window.IA_COPY (English merged with the page's language) on translated pages.
const readJSON = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const merge = (base, over) => {
  if (Array.isArray(over) || typeof over !== 'object' || over === null) return over === undefined ? base : over;
  const out = { ...(base || {}) };
  for (const k of Object.keys(over)) out[k] = merge(out[k], over[k]);
  return out;
};
const inline = (v) => JSON.stringify(v).replace(/</g, '\\u003c');
function i18nScript(name) {
  const [dir, file] = name.includes('/') ? name.split('/') : ['', name];
  const key = file.replace(/\.html$/, '');
  const lang = I18N.languages.find((l) => l.path === dir) || I18N.languages.find((l) => l.code === I18N.default);
  let js = `window.IA_I18N=${inline(I18N)};`;
  const shared = `content/shared/${lang.code}.json`;
  if (lang.code !== I18N.default && fs.existsSync(path.join(ROOT, shared))) js += `window.IA_SHARED=${inline(readJSON(shared))};`;
  if (I18N.pages[key]) {
    let copy = readJSON(`content/pages/${key}/${I18N.default}.json`);
    if (lang.code !== I18N.default) copy = merge(copy, readJSON(`content/pages/${key}/${lang.code}.json`));
    js += `window.IA_COPY=${inline(copy)};`;
  }
  return `<script>${js}</script>\n`;
}

const compiled = new Map();   // x.jsx -> x.js
async function compile(jsx) {
  if (compiled.has(jsx)) return compiled.get(jsx);
  let code = fs.readFileSync(path.join(ROOT, jsx), 'utf8');
  if (uses.get(jsx) === 1) code = `(() => {\n${code}\n})();`;
  const { code: out } = await esbuild.transform(code, {
    loader: 'jsx', jsxFactory: 'React.createElement', jsxFragment: 'React.Fragment',
    target: 'es2019', minify: true, legalComments: 'none',
  });
  const js = jsx.replace(/\.jsx$/, '.js');
  fs.writeFileSync(path.join(OUT, js), out);
  fs.rmSync(path.join(OUT, jsx), { force: true });
  compiled.set(jsx, js);
  return js;
}

const pages = [];
for (const name of htmlFiles) {
  const file = path.join(OUT, name);
  let html = fs.readFileSync(file, 'utf8');
  const jsx = [...html.matchAll(BABEL_TAG)];
  if (!jsx.length) continue;
  for (const m of jsx) html = html.replace(m[0], `<script src="${await compile(m[1])}"></script>`);
  html = html
    .replace(/<script src="https:\/\/unpkg\.com\/@babel\/standalone@[^"]+"[^>]*><\/script>\n?/, '')
    .replace(/<script src="https:\/\/unpkg\.com\/react@[^"]+"[^>]*><\/script>/, '<script src="vendor/react.production.min.js"></script>')
    .replace(/<script src="https:\/\/unpkg\.com\/react-dom@[^"]+"[^>]*><\/script>/, '<script src="vendor/react-dom.production.min.js"></script>')
    .replace('<!-- React + Babel (pinned) -->', '<!-- React (production, self-hosted) — page scripts are pre-compiled by scripts/build.mjs -->');
  if (/text\/babel|babel\.min\.js|\.development\.js/.test(html)) throw new Error(`${name}: leftover dev/Babel script`);
  html = html.replace('</head>', i18nScript(name) + '</head>');
  fs.writeFileSync(file, html);
  pages.push(name);
}
console.log(`compiled ${compiled.size} scripts for ${pages.length} pages`);

// ---------- 3. Pre-render ----------
// Hide the baked copy while JS runs (React swaps it for the live, animated version);
// without JS — or for a crawler reading the source — it is plain visible HTML.
const HEAD_HOOK = '<script>document.documentElement.classList.add("prerender-js")</script>\n'
  + '<style>.prerender-js #root[data-prerendered]{visibility:hidden}</style>\n';
const BODY_HOOK = '<script>(function(){var r=document.getElementById("root");if(!r)return;'
  + 'var show=function(){r.removeAttribute("data-prerendered")};'
  + 'new MutationObserver(function(m,o){o.disconnect();requestAnimationFrame(show)}).observe(r,{childList:true});'
  + 'setTimeout(show,4000)})()</script>\n';

const { default: puppeteer } = await import('puppeteer');
const server = await serve(OUT, 0);
const base = `http://127.0.0.1:${server.address().port}/`;
const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  args: ['--no-sandbox'],
});
const failures = [];
try {
  for (const name of pages) {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1440, height: 900 });
    // Reduced motion: components render their settled, final state (no mid-animation markup).
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    let markup = '';
    try {
      await page.goto(base + name, { waitUntil: 'networkidle0', timeout: 90000 });
      await page.waitForFunction(() => document.getElementById('root')?.childElementCount > 0, { timeout: 20000 });
      await new Promise((r) => setTimeout(r, 400));
      markup = await page.$eval('#root', (el) => el.innerHTML);
    } catch (e) {
      errors.push(e.message);
    }
    await page.close();
    if (errors.length) { failures.push(`${name}: ${errors.join(' | ').slice(0, 300)}`); continue; }
    // Don't let baked <video>s start downloading/playing before React's own copy mounts.
    markup = markup.replace(/<video\b([^>]*)>/g, (m, a) => '<video' + a.replace(/\sautoplay(="[^"]*")?/g, '').replace(/\spreload="[^"]*"/g, '') + ' preload="none">');
    const file = path.join(OUT, name);
    let html = fs.readFileSync(file, 'utf8');
    if (!html.includes('<div id="root"></div>')) { failures.push(`${name}: no empty #root`); continue; }
    // The watcher goes right after #root — before any page script — so it is always
    // listening before React's first commit (which can land between two script tags).
    html = html
      .replace('<head>\n', '<head>\n' + HEAD_HOOK)
      .replace('<div id="root"></div>', `<div id="root" data-prerendered>${markup}</div>\n${BODY_HOOK.trimEnd()}`);
    fs.writeFileSync(file, html);
    console.log(`rendered  ${name}  (${Math.round(markup.length / 1024)} KB of HTML)`);
  }
} finally {
  await browser.close();
  server.close();
}
if (failures.length) {
  console.error('\nPre-render failed:\n  ' + failures.join('\n  '));
  process.exit(1);
}
console.log(`\ndist/ ready — ${pages.length} pages pre-rendered`);
