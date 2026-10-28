
/* ===== tweaks-panel.jsx ===== */
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:var(--r-xl);
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:var(--r-md);cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:var(--r-sm);
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:var(--r-md);
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:var(--r-full);background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:var(--r-lg);
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:var(--r-md);
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:var(--r-md);cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:var(--r-full);
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:var(--r-md);background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:var(--r-md);
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:var(--r-md);padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:var(--r-md);overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  React.useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);
      else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  const onDragStart = (e) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) return null;
  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      <div ref={dragRef} className="twk-panel" data-omelette-chrome=""
           style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>{title}</b>
          <button className="twk-x" aria-label="Close tweaks"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={dismiss}>✕</button>
        </div>
        <div className="twk-body">
          {children}
        </div>
      </div>
    </>
  );
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({ label, children }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}

function TweakRow({ label, value, children, inline = false }) {
  return (
    <div className={inline ? 'twk-row twk-row-h' : 'twk-row'}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input type="range" className="twk-slider" min={min} max={max} step={step}
             value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </TweakRow>
  );
}

function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button type="button" className="twk-toggle" data-on={value ? '1' : '0'}
              role="switch" aria-checked={!!value}
              onClick={() => onChange(!value)}><i /></button>
    </div>
  );
}

function TweakRadio({ label, value, options, onChange }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = (o) => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({ 2: 16, 3: 10 }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = (s) => {
      const m = options.find((o) => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return <TweakSelect label={label} value={value} options={options}
                        onChange={(s) => onChange(resolve(s))} />;
  }
  const opts = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
  const idx = Math.max(0, opts.findIndex((o) => o.value === value));
  const n = opts.length;

  const segAt = (clientX) => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor(((clientX - r.left - 2) / inner) * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };

  const onPointerDown = (e) => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (ev) => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <TweakRow label={label}>
      <div ref={trackRef} role="radiogroup" onPointerDown={onPointerDown}
           className={dragging ? 'twk-seg dragging' : 'twk-seg'}>
        <div className="twk-seg-thumb"
             style={{ left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
                      width: `calc((100% - 4px) / ${n})` }} />
        {opts.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={o.value === value}>
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}

function TweakSelect({ label, value, options, onChange }) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </TweakRow>
  );
}

function TweakText({ label, value, placeholder, onChange }) {
  return (
    <TweakRow label={label}>
      <input className="twk-field" type="text" value={value} placeholder={placeholder}
             onChange={(e) => onChange(e.target.value)} />
    </TweakRow>
  );
}

function TweakNumber({ label, value, min, max, step = 1, unit = '', onChange }) {
  const clamp = (n) => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({ x: 0, val: 0 });
  const onScrubStart = (e) => {
    e.preventDefault();
    startRef.current = { x: e.clientX, val: value };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = (ev) => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return (
    <div className="twk-num">
      <span className="twk-num-lbl" onPointerDown={onScrubStart}>{label}</span>
      <input type="number" value={value} min={min} max={max} step={step}
             onChange={(e) => onChange(clamp(Number(e.target.value)))} />
      {unit && <span className="twk-num-unit">{unit}</span>}
    </div>
  );
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}

const __TwkCheck = ({ light }) => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path d="M3 7.2 5.8 10 11 4.2" fill="none" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
          stroke={light ? 'rgba(0,0,0,.78)' : '#fff'} />
  </svg>
);

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({ label, value, options, onChange }) {
  if (!options || !options.length) {
    return (
      <div className="twk-row twk-row-h">
        <div className="twk-lbl"><span>{label}</span></div>
        <input type="color" className="twk-swatch" value={value}
               onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = (o) => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return (
    <TweakRow label={label}>
      <div className="twk-chips" role="radiogroup">
        {options.map((o, i) => {
          const colors = Array.isArray(o) ? o : [o];
          const [hero, ...rest] = colors;
          const sup = rest.slice(0, 4);
          const on = key(o) === cur;
          return (
            <button key={i} type="button" className="twk-chip" role="radio"
                    aria-checked={on} data-on={on ? '1' : '0'}
                    aria-label={colors.join(', ')} title={colors.join(' · ')}
                    style={{ background: hero }}
                    onClick={() => onChange(o)}>
              {sup.length > 0 && (
                <span>
                  {sup.map((c, j) => <i key={j} style={{ background: c }} />)}
                </span>
              )}
              {on && <__TwkCheck light={__twkIsLight(hero)} />}
            </button>
          );
        })}
      </div>
    </TweakRow>
  );
}

function TweakButton({ label, onClick, secondary = false }) {
  return (
    <button type="button" className={secondary ? 'twk-btn secondary' : 'twk-btn'}
            onClick={onClick}>{label}</button>
  );
}

Object.assign(window, {
  useTweaks, TweaksPanel, TweakSection, TweakRow,
  TweakSlider, TweakToggle, TweakRadio, TweakSelect,
  TweakText, TweakNumber, TweakColor, TweakButton,
});


/* ===== ia-hex.jsx ===== */
// ia-hex.jsx — Hexagon brand motif + shared scroll helpers.

// Each gradient hexagon gets its own <linearGradient> id so the flowing ember↔midnight-light
// border animates independently and there's no id clash across instances.
let __hexGradN = 0;

// pointy-top hexagon SVG — REGULAR proportions (equal side lengths): circumradius 48,
// so side vertices sit at x = 50 ± 48·√3/2 = 8.43/91.57 (not 5/95, which drew it too wide).
// `grad` swaps the solid stroke for an animated ember→midnight-light→ember gradient whose
// gradientTransform rotates, so the border colour travels around the hexagon (brand-motion motif).
function Hexagon({ size = 48, fill = 'none', stroke = 'none', sw = 0, strokeOnly = false, grad = false, gradDur = 7, strokeOpacity, style = {}, className = '' }) {
  const pts = '50,2 91.57,26 91.57,74 50,98 8.43,74 8.43,26';
  const [gid] = React.useState(() => 'hexGrad' + (++__hexGradN));
  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return (
    <div className={className} style={{ width: size, height: size, ...style }}>
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: 'block', overflow: 'visible' }}>
        {grad && (
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F05826" />{/* --ember */}
              <stop offset="50%" stopColor="#3D5A80" />{/* --midnight-light */}
              <stop offset="100%" stopColor="#F05826" />
              {!reduce && <animateTransform attributeName="gradientTransform" type="rotate" from="0 0.5 0.5" to="360 0.5 0.5" dur={gradDur + 's'} repeatCount="indefinite" />}
            </linearGradient>
          </defs>
        )}
        <polygon points={pts} fill={strokeOnly ? 'none' : fill} stroke={grad ? `url(#${gid})` : stroke} strokeWidth={sw} strokeOpacity={strokeOpacity} strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// Hex badge: a hexagon tile holding a number/glyph (How-it-works steps).
function HexBadge({ label, tone = 'pub', size = 60 }) {
  const bg = tone === 'adv' ? 'var(--grad-midnight-light)' : tone === 'midnight' ? 'var(--grad-midnight)' : 'var(--grad-ember)';
  return (
    <div className="hex-clip" style={{
      width: size, height: size, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: size * 0.34,
      boxShadow: 'var(--shadow-sm)', flex: '0 0 auto',
    }}>{label}</div>
  );
}

// Centered ambient hexagon "stage" behind the hero headline — the brand signature.
function HexHeroField({ intensity = 3 }) {
  const op = Math.max(0, Math.min(1, intensity / 10));
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* large fluted hexagon, centered */}
      <div className="hex-clip flute hero-hex-breathe" style={{
        position: 'absolute', left: '50%', top: '50%', width: 'min(660px,86vw)', height: 'min(720px,92vw)',
        background: 'var(--warm-100)', opacity: 0.28 + op * 0.34,
      }} />
      {/* concentric outline hexagon — flowing ember↔midnight-light gradient ring (kept subtle) */}
      <div className="hero-hex-spin" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
        <Hexagon size={560} strokeOnly grad gradDur={11} sw={1.6} strokeOpacity={0.4} style={{ transform: 'translate(-50%,-50%)', position: 'absolute' }} />
      </div>
      {/* small accent hexagons — gradient borders, de-synced durations so they shimmer organically */}
      <Hexagon size={58} fill="var(--warm-100)" grad gradDur={7} sw={2} className="hero-hex-a" style={{ position: 'absolute', top: '18%', left: '13%' }} />
      <Hexagon size={40} fill="var(--warm-100)" grad gradDur={8.5} sw={2} className="hero-hex-b" style={{ position: 'absolute', bottom: '16%', right: '15%' }} />
      <Hexagon size={26} fill="none" grad gradDur={6} sw={2} className="hero-hex-a" style={{ position: 'absolute', top: '24%', right: '24%' }} />
      <style>{`
        .hero-hex-breathe{transform:translate(-50%,-50%);animation:hexBreathe 11s ease-in-out infinite;}
        .hero-hex-a{animation:hexFloatA 8s ease-in-out infinite;}
        .hero-hex-b{animation:hexFloatB 10s ease-in-out infinite;}
        .hero-hex-spin{animation:hexSpin 60s linear infinite;}
        @keyframes hexBreathe{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.03)}}
        @keyframes hexFloatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        @keyframes hexFloatB{0%,100%{transform:translateY(0)}50%{transform:translateY(14px)}}
        @keyframes hexSpin{to{transform:translate(-50%,-50%) rotate(360deg)}}
        @media (prefers-reduced-motion: reduce){
          .hero-hex-breathe,.hero-hex-a,.hero-hex-b,.hero-hex-spin{animation:none !important;}
        }
      `}</style>
    </div>
  );
}

// Faint hexagon-tile texture for dark sections.
function HexTexture({ intensity = 3, dark = false }) {
  const op = Math.max(0, Math.min(1, intensity / 10)) * (dark ? 0.55 : 0.4);
  const line = dark ? 'rgba(255,255,255,.06)' : 'rgba(15,28,46,.05)';
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', opacity: op, zIndex: 0,
      backgroundImage:
        `repeating-linear-gradient(60deg, ${line} 0 1px, transparent 1px 34px),` +
        `repeating-linear-gradient(-60deg, ${line} 0 1px, transparent 1px 34px),` +
        `repeating-linear-gradient(0deg, ${line} 0 1px, transparent 1px 30px)`,
      backgroundSize: '40px 60px',
    }} />
  );
}

// Animated honeycomb field — tessellated flat-top hex tiles that stagger-IN
// when scrolled into view (radiating from the headline), then settle into a
// slow, sparse ambient shimmer + gentle drift. The brand hexagon motif as the
// hero of the closing CTA. (matches "Be part of our network" Figma layout)
// Exact hexagon arrangement from the uploaded "Hexagon shape.svg" (Figma).
// [ pathData, perHexOpacity, centerX, centerY ]  — viewBox 0 0 1440 1018.
const HEX_PATHS = [
  ["M954 894L1032.81 939.5V1030.5L954 1076L875.192 1030.5V939.5L954 894Z",1,954,985],
  ["M318.5 894L397.741 939.5V1030.5L318.5 1076L239.259 1030.5V939.5L318.5 894Z",1,318.5,985],
  ["M398 756L477.674 801.5V892.5L398 938L318.326 892.5V801.5L398 756Z",0.88,398,847],
  ["M398 483L477.674 528.5V619.5L398 665L318.326 619.5V528.5L398 483Z",0.48,398,574],
  ["M318.5 620L397.741 665.5V756.5L318.5 802L239.259 756.5V665.5L318.5 620Z",0.64,318.5,711],
  ["M1033.5 757L1112.74 802.25V892.75L1033.5 938L954.259 892.75V802.25L1033.5 757Z",0.88,1033.5,848],
  ["M1033.5 484L1112.74 529.25V619.75L1033.5 665L954.259 619.75V529.25L1033.5 484Z",0.48,1033.5,575],
  ["M954 620L1032.81 665.25V755.75L954 801L875.192 755.75V665.25L954 620Z",0.64,954,711],
  ["M1113 894L1191.81 939.5V1030.5L1113 1076L1034.19 1030.5V939.5L1113 894Z",1,1113,985],
  ["M477 894L555.808 939.5V1030.5L477 1076L398.192 1030.5V939.5L477 894Z",1,477,985],
  ["M556.5 756L635.741 801.5V892.5L556.5 938L477.259 892.5V801.5L556.5 756Z",0.88,556.5,847],
  ["M556.5 483L635.741 528.5V619.5L556.5 665L477.259 619.5V528.5L556.5 483Z",0.48,556.5,574],
  ["M715.5 756L794.741 801.5V892.5L715.5 938L636.259 892.5V801.5L715.5 756Z",0.88,715.5,847],
  ["M715.5 483L794.741 528.5V619.5L715.5 665L636.259 619.5V528.5L715.5 483Z",0.48,715.5,574],
  ["M237.5 210L316.741 255.5V346.5L237.5 392L158.259 346.5V255.5L237.5 210Z",0.24,237.5,301],
  ["M635.5 346L714.741 391.5V482.5L635.5 528L556.259 482.5V391.5L635.5 346Z",0.32,635.5,437],
  ["M477 620L555.808 665.5V756.5L477 802L398.192 756.5V665.5L477 620Z",0.64,477,711],
  ["M1113 619L1191.81 664.5V755.5L1113 801L1034.19 755.5V664.5L1113 619Z",0.64,1113,710],
  ["M1192.5 756L1271.74 801.5V892.5L1192.5 938L1113.26 892.5V801.5L1192.5 756Z",0.88,1192.5,847],
  ["M1192.5 483L1271.74 528.5V619.5L1192.5 665L1113.26 619.5V528.5L1192.5 483Z",0.48,1192.5,574],
  ["M-79 757L-0.191681 802.5V893.5L-79 939L-157.808 893.5V802.5L-79 757Z",1,-79,848],
  ["M1272.5 894L1351.74 939.5V1030.5L1272.5 1076L1193.26 1030.5V939.5L1272.5 894Z",1,1272.5,985],
  ["M0.5 895L79.7413 940.5V1031.5L0.5 1077L-78.7413 1031.5V940.5L0.5 895Z",1,0.5,986],
  ["M636.5 894L715.741 939.5V1030.5L636.5 1076L557.259 1030.5V939.5L636.5 894Z",1,636.5,985],
  ["M636.5 620L715.741 665.5V756.5L636.5 802L557.259 756.5V665.5L636.5 620Z",0.64,636.5,711],
  ["M1272.5 619L1351.74 664.5V755.5L1272.5 801L1193.26 755.5V664.5L1272.5 619Z",0.64,1272.5,710],
  ["M1351.5 756L1430.74 801.5V892.5L1351.5 938L1272.26 892.5V801.5L1351.5 756Z",0.88,1351.5,847],
  ["M80 757L158.808 802.5V893.5L80 939L1.19169 893.5V802.5L80 757Z",0.88,80,848],
  ["M80 484L158.808 529.5V620.5L80 666L1.19169 620.5V529.5L80 484Z",0.48,80,575],
  ["M1431 894L1509.81 939.5V1030.5L1431 1076L1352.19 1030.5V939.5L1431 894Z",1,1431,985],
  ["M159 895L237.808 940.5V1031.5L159 1077L80.1917 1031.5V940.5L159 895Z",1,159,986],
  ["M795.5 894L874.741 939.5V1030.5L795.5 1076L716.259 1030.5V939.5L795.5 894Z",1,795.5,985],
  ["M875 756L954.674 801.5V892.5L875 938L795.326 892.5V801.5L875 756Z",0.88,875,847],
  ["M1431.5 619L1510.74 664.5V755.5L1431.5 801L1352.26 755.5V664.5L1431.5 619Z",0.64,1431.5,710],
  ["M159 620L237.808 665.5V756.5L159 802L80.1917 756.5V665.5L159 620Z",0.64,159,711],
  ["M0 620L78.8083 665.5V756.5L0 802L-78.8083 756.5V665.5L0 620Z",0.64,0,711],
  ["M1510 756L1589.67 801.5V892.5L1510 938L1430.33 892.5V801.5L1510 756Z",0.88,1510,847],
  ["M1510 483L1589.67 528.5V619.5L1510 665L1430.33 619.5V528.5L1510 483Z",0.48,1510,574],
  ["M238 757L317.674 802.5V893.5L238 939L158.326 893.5V802.5L238 757Z",0.88,238,848],
];

function HexField() {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  const cells = React.useMemo(() => {
    const ox = 720, oy = 1010;   // entrance origin — near the CTA headline, bottom-center
    let maxD = 1;
    const ds = HEX_PATHS.map(([d, op, cx, cy]) => {
      const dist = Math.hypot(cx - ox, cy - oy);
      if (dist > maxD) maxD = dist;
      return { d, op, dist, cy };
    });
    return ds.map((c, i) => {
      const s = Math.sin(i * 127.1) * 43758.5453; const rnd = s - Math.floor(s); // deterministic 0..1
      const nd = c.dist / maxD;
      const delay = Math.round(nd * 1300 + rnd * 300);   // bloom up from the headline (slower, wider spread)
      const wave = Math.round(((1076 - c.cy) / 1076) * 2600);  // ambient ripple rises from the bottom
      return {
        d: c.d, op: c.op, delay,
        breathe: true,                                   // gentle ambient pulse across the whole field
        bdur: (9 + rnd * 6).toFixed(2),                  // 9–15s
        bdelay: delay + 1000 + wave + Math.round(rnd * 1400), // starts after entrance, phased into a rising wave
      };
    });
  }, []);

  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setInView(true); return; }
    const io = new IntersectionObserver((ents) => {
      // toggle (not one-shot): blooms in on enter, reverses out when scrolled away
      ents.forEach(e => setInView(e.isIntersecting));
    }, { threshold: 0, rootMargin: '-18% 0px -10% 0px' });   // fire as the network zone enters
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={'hex-field' + (inView ? ' hf-in' : '')} aria-hidden="true">
      <svg className="hf-svg" viewBox="0 0 1440 1018" preserveAspectRatio="xMidYMax meet" fill="none">
        {cells.map((c, i) => (
          <path key={i} className={'hf-hex' + (c.breathe ? ' hf-breathe' : '')} d={c.d}
                style={{ '--op': c.op, '--bdur': c.bdur + 's', transitionDelay: c.delay + 'ms', animationDelay: c.bdelay + 'ms' }} />
        ))}
      </svg>
    </div>
  );
}

// Scroll progress 0..1 of an element passing through the viewport.
function useScrollProgress(ref) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf;
    const calc = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = r.height + vh;
      setP(Math.max(0, Math.min(1, (vh - r.top) / total)));
    };
    calc();
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(calc); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, [ref]);
  return p;
}

Object.assign(window, { Hexagon, HexBadge, HexHeroField, HexTexture, useScrollProgress });




/* ===== ia-nav.jsx ===== */
// Nav (with its NAV / LANGS data), Arrow, BackToTop and prefersReduced come from
// ia-shared.jsx, which index.html loads first — the same copies every other page uses.
const { Nav, Arrow, BackToTop, prefersReduced } = window;


/* ===== ia-sections1.jsx ===== */
// ia-sections1.jsx — Hero (centered), Two-door, Trust marquee, Offers, How-it-works (horizontal pin).


// Step icons (simple line glyphs) inside a brand hexagon tile.
const STEP_ICON = {
  create: <path d="M12 5v14M5 12h14" />,
  automate: <g><path d="M3.5 12a8.5 8.5 0 0 1 14-6.4M20.5 5.5v4h-4" /><path d="M20.5 12a8.5 8.5 0 0 1-14 6.4M3.5 18.5v-4h4" /></g>,
  track: <path d="M4 20V12M10 20V5M16 20v-8M21 20H3" />,
  paid: <g><circle cx="12" cy="12" r="8.5" /><path d="M8.5 12.4l2.4 2.4 4.6-5" /></g>,
};
// Step header: bare line-glyph icon (no hexagon tile) + large grey step number.
function StepHead({ tone, icon, n }) {
  const color = tone === 'adv' ? 'var(--midnight-light)' : 'var(--ember)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}>{STEP_ICON[icon]}</svg>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 64, lineHeight: 1, color: 'var(--warm-300)', letterSpacing: '-.03em' }}>{n}</span>
    </div>
  );
}

/* ---------------- Two-door CTA (reused in Hero + Final CTA) ---------------- */
function TwoDoor({ emphasis = 'equal', onDark = false, size = 'lg', center = false }) {
  const labelColor = onDark ? 'var(--warm-300)' : 'var(--warm-400)';
  const pubFilled = emphasis !== 'adv';
  const advFilled = emphasis !== 'pub';
  const big = size === 'lg';
  const Door = ({ kicker, cls, href, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9, alignItems: center ? 'center' : 'flex-start', minWidth: 0 }}>
      <span style={{ font: '600 12px/1 var(--font-body)', letterSpacing: '.04em', color: labelColor }}>{kicker}</span>
      <a href={href} className={`btn ${cls} ${big ? 'btn-lg' : ''}`}>{children} <Arrow /></a>
    </div>
  );
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: center ? 'center' : 'flex-start' }}>
      <Door kicker="I'm an Advertiser" href="/advertisers/" cls={advFilled ? 'btn-advertiser' : 'btn-outline-adv'}>List Your Brand</Door>
      <Door kicker="I'm a Creator or Publisher" href="/partners/" cls={pubFilled ? 'btn-primary' : 'btn-outline-ember'}>Start Earning</Door>
    </div>
  );
}

/* ---------------- Hero — centered, no unvalidated KPI cards ---------------- */
/* Hero headline — Sohub-style big-text motion. Each word sits in an overflow-hidden
   mask: on ENTER it rises up into the clip (staggered); on LEAVE (scrolling the hero
   away) the whole word slides up + fades, reverse-staggered and scroll-linked.
   Enter animates the inner .hl-word; leave animates the outer .hl-mask — different
   elements, so the two animations never clobber each other. */
// Two explicit lines (matches the Figma hero copy). Each line wraps as a unit so the
// break lands after "Earnings"; words are still individually masked for the reveal.
const HERO_LINES = [['Scale', 'Your', 'Online', 'Earnings'], ['Through', 'Affiliate', 'Marketing']];
function HeroHeadline({ dark }) {
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    const gsap = window.gsap;
    if (!ref.current || !gsap) return;
    const words = ref.current.querySelectorAll('.hl-word');
    const masks = ref.current.querySelectorAll('.hl-mask');
    if (prefersReduced()) { gsap.set(words, { yPercent: 0, autoAlpha: 1 }); return; }
    const ST = window.ScrollTrigger;
    const heroEl = ref.current.closest('#hero');   // real element — a scoped '#hero' selector wouldn't resolve inside the h1
    const ctx = gsap.context(() => {
      // ENTER — words rise into their masks, staggered
      gsap.set(words, { yPercent: 120, autoAlpha: 0 });
      gsap.to(words, { yPercent: 0, autoAlpha: 1, duration: 0.95, ease: 'power4.out', stagger: 0.085, delay: 0.4 });
      // LEAVE — as the hero scrolls away, words slide up + fade (reverse stagger).
      // Desktop only: on the mobile split layout the headline no longer sits at the
      // hero's top, so this scroll-linked mask animation mis-measures and can leave
      // the words hidden. The enter animation above already reveals them everywhere.
      if (ST && heroEl && window.matchMedia('(min-width: 861px)').matches) {
        gsap.registerPlugin(ST);
        gsap.fromTo(masks, { yPercent: 0, autoAlpha: 1 }, {
          yPercent: -120, autoAlpha: 0, ease: 'none', stagger: { each: 0.03, from: 'end' }, immediateRender: false,
          scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom 42%', scrub: 0.5 },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <h1 ref={ref} className="hero-h1" style={{ fontSize: 'clamp(36px,5.6vw,72px)', lineHeight: 1.04, margin: 0, color: dark ? '#fff' : 'var(--warm-900)' }}>
      {HERO_LINES.map((line, li) => (
        <span className="hl-line" key={li}>
          {line.map((w, i) => <span className="hl-mask" key={i}><span className="hl-word">{w}</span></span>)}
        </span>
      ))}
      <style>{`
        .hero-h1{display:flex;flex-direction:column;align-items:flex-start;row-gap:.05em;}
        .hero-h1 .hl-line{display:flex;flex-wrap:wrap;column-gap:.26em;}
        .hero-h1 .hl-mask{display:inline-block;overflow:hidden;padding-bottom:.12em;margin-bottom:-.12em;}
        .hero-h1 .hl-word{display:inline-block;will-change:transform,opacity;}
        @media (max-width:860px){.hero-h1{align-items:center;} .hero-h1 .hl-line{justify-content:center;}}
        @media (prefers-reduced-motion: reduce){.hero-h1 .hl-word,.hero-h1 .hl-mask{transform:none!important;opacity:1!important;visibility:visible!important;}}
      `}</style>
    </h1>
  );
}

/* Concept 5 hero — "One affiliate marketing platform". Exact Figma copy + assets:
   dual Publisher/Advertiser value-prop flanking a cutout figure, with floating
   payout cards + a total-sales card. Static layout (Phase 1); the spiral/float
   entrance motion is layered in a later phase. */
const HERO_PAYOUTS = [
  { brand: 'GrabTransport (MY)', amt: '48.00', dot: '#14cf55' },
  { brand: 'Shopee', amt: '16.00', dot: '#f05826' },
  { brand: 'Nike', amt: '22.00', dot: '#111110' },
  { brand: 'Sephora', amt: '60.00', dot: '#d1373b' },
  { brand: 'Agoda', amt: '27.40', dot: '#5b4de0' },
  { brand: 'Lazada', amt: '18.90', dot: '#0f146e' },
  { brand: 'Watsons (MY)', amt: '31.20', dot: '#00a3a1' },
  { brand: 'AirAsia', amt: '54.60', dot: '#e6002d' },
];

// Live "Total Sales" counter — every 4 or 6s it climbs by a random 2-, 3- or 4-digit
// amount and rolls up to the new figure. Own component so its ticks re-render only the
// number, never the hero or the payout stack.
function HeroSales() {
  const START = 15612881;
  const [sales, setSales] = React.useState(START);
  React.useEffect(() => {
    const gsap = window.gsap;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cur = START, timer, tween;
    const bump = () => {
      const digits = 2 + Math.floor(Math.random() * 3);                 // 2, 3 or 4 digits
      const min = Math.pow(10, digits - 1), max = Math.pow(10, digits) - 1;
      const inc = min + Math.floor(Math.random() * (max - min + 1));
      const from = cur, target = cur + inc;
      cur = target;
      if (gsap && !reduce) {
        const o = { v: from };
        tween = gsap.to(o, { v: target, duration: 0.9, ease: 'power1.out', onUpdate: () => setSales(Math.round(o.v)) });
      } else {
        setSales(target);
      }
      timer = setTimeout(bump, Math.random() < 0.5 ? 4000 : 6000);       // next tick in 4 or 6s
    };
    timer = setTimeout(bump, Math.random() < 0.5 ? 4000 : 6000);
    return () => { clearTimeout(timer); if (tween) tween.kill(); };
  }, []);
  return <span className="hs-num">{'$' + sales.toLocaleString('en-US')}</span>;
}

// Interactive honeycomb field behind the hero figures. Loads the EXACT Figma honeycomb
// (media/figma/hero-hexgrid.svg, node 1694:22220), splits its single "Union" path into
// individual hexagons, and each hex is PUSHED radially away from the cursor — the hexes
// physically move out and leave a gap that follows the mouse (Ramp-style). Each hex is also
// scaled to 0.9 (10% smaller). Only hexes near the cursor get transform writes per frame;
// reduced-motion leaves the field static.
function HeroHexField() {
  const svgRef = React.useRef(null);
  const [paths, setPaths] = React.useState([]);
  const W = 690.282, H = 664.1;
  React.useEffect(() => {
    let alive = true;
    fetch('media/figma/hero-hexgrid.svg').then((r) => r.text()).then((txt) => {
      if (!alive) return;
      const m = txt.match(/id="Union"\s+d="([^"]+)"/);
      if (!m) return;
      const subs = m[1].split(/[Zz]/).map((s) => s.trim()).filter(Boolean).map((s) => s + 'Z');
      setPaths(subs);
    }).catch(() => {});
    return () => { alive = false; };
  }, []);
  React.useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg || !paths.length) return;
    const hexes = Array.from(svg.querySelectorAll('.hx')).map((el) => {
      const b = el.getBBox();
      const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
      const base = `translate(${cx.toFixed(2)} ${cy.toFixed(2)}) scale(0.81) translate(${(-cx).toFixed(2)} ${(-cy).toFixed(2)})`;
      el.setAttribute('transform', base);
      return { el, cx, cy, base, dx: 0, dy: 0 };
    });
    if (prefersReduced()) return;
    const sec = svg.closest('.hero2-sec') || svg.parentElement;
    // Radial push, softened toward the edge (MAXPUSH·f², f = 1 − dist/R). Gentle strength.
    const R = 140, MAXPUSH = 24;                            // influence radius + max displacement (viewBox units)
    let mx = -9999, my = -9999, active = false, raf = 0;
    const frame = () => {
      let moving = false;
      for (const h of hexes) {
        let tx = 0, ty = 0;
        if (active) {
          const ddx = h.cx - mx, ddy = h.cy - my, dist = Math.hypot(ddx, ddy);
          if (dist < R && dist > 0.01) { const f = 1 - dist / R, push = MAXPUSH * f * f, inv = push / dist; tx = ddx * inv; ty = ddy * inv; }
        }
        h.dx += (tx - h.dx) * 0.2; h.dy += (ty - h.dy) * 0.2;
        if (Math.abs(h.dx) > 0.06 || Math.abs(h.dy) > 0.06) {
          h.el.setAttribute('transform', `translate(${h.dx.toFixed(2)} ${h.dy.toFixed(2)}) ${h.base}`);
          moving = true;
        } else if (h.dx !== 0 || h.dy !== 0) { h.dx = 0; h.dy = 0; h.el.setAttribute('transform', h.base); }
      }
      if (active || moving) raf = requestAnimationFrame(frame); else raf = 0;
    };
    const onMove = (e) => {
      const r = svg.getBoundingClientRect();
      mx = (e.clientX - r.left) * (W / r.width);
      my = (e.clientY - r.top) * (H / r.height);
      active = true;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onLeave = () => { active = false; if (!raf) raf = requestAnimationFrame(frame); };
    sec.addEventListener('mousemove', onMove);
    sec.addEventListener('mouseleave', onLeave);
    return () => { sec.removeEventListener('mousemove', onMove); sec.removeEventListener('mouseleave', onLeave); if (raf) cancelAnimationFrame(raf); };
  }, [paths]);
  return (
    <svg ref={svgRef} className="hexfield" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {/* Previous palette: html.palette-prev fills the hexes with this ember→blue gradient */}
      <defs>
        <linearGradient id="hexGrad" gradientUnits="userSpaceOnUse" x1={W * 0.12} y1={H * 0.32} x2={W * 0.92} y2={H * 0.78}>
          <stop offset="0" style={{ stopColor: 'var(--prev-ember)' }} />
          <stop offset="1" style={{ stopColor: 'var(--prev-blue)' }} />
        </linearGradient>
      </defs>
      <g className="hexfield-g" fill="var(--warm-100)">
        {paths.map((d, i) => <path key={i} className="hx" d={d} />)}
      </g>
    </svg>
  );
}

function Hero({ dark = false, hex = 3, emphasis = 'equal' }) {
  const payIdx = React.useRef(0);
  const [pay, setPay] = React.useState(HERO_PAYOUTS[0]);
  const [payVis, setPayVis] = React.useState(true);

  // Single payout notification sitting in front of the creator. On a randomized cadence
  // (3, 4, 5 or 6s) it fades out, swaps to a different random brand/amount, and fades back
  // in the SAME spot — subtle, minimal. Driven by CSS opacity/transform transitions (see
  // .pcard) + setTimeout, so it stays reliable regardless of rAF; reduced-motion just swaps
  // the text with no fade.
  React.useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nextIdx = () => { let n = payIdx.current; while (n === payIdx.current) n = Math.floor(Math.random() * HERO_PAYOUTS.length); payIdx.current = n; return n; };
    const nextDelay = () => (3 + Math.floor(Math.random() * 4)) * 1000;       // 3, 4, 5 or 6s
    let tCycle, tSwap;
    const cycle = () => {
      const n = nextIdx();
      if (reduce) { setPay(HERO_PAYOUTS[n]); tCycle = setTimeout(cycle, nextDelay()); return; }
      setPayVis(false);                                                       // fade out
      tSwap = setTimeout(() => { setPay(HERO_PAYOUTS[n]); setPayVis(true); }, 360); // swap + fade in
      tCycle = setTimeout(cycle, nextDelay());
    };
    tCycle = setTimeout(cycle, nextDelay());
    return () => { clearTimeout(tCycle); clearTimeout(tSwap); };
  }, []);

  return (
    <section id="hero" className="hero2-sec" style={{ background: 'var(--warm-50)', color: 'var(--warm-900)', position: 'relative', overflow: 'hidden', paddingTop: 'clamp(48px,6vh,76px)', paddingBottom: 0 }}>
      {/* corner colour glows (Previous palette only) + interactive honeycomb */}
      <div className="hero2-glow" aria-hidden="true" />
      <HeroHexField />
      <div className="wrap hero2" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero2-grid">
          <div className="hero2-copy">
            <h1 className="hero2-title" data-reveal>The affiliate platform that keeps everyone moving, faster.</h1>
            <p className="hero2-sub" data-reveal data-reveal-delay="1">Brands grow with the right publishers, and publishers earn from the brands they love. Daily validation and faster payouts mean less waiting, for everyone.</p>
            <div className="hero2-ctas" data-reveal data-reveal-delay="2">
              <div className="hero2-cta">
                <span className="hero2-kicker">For <i>Publishers</i></span>
                <a href="/partners/" className="btn btn-primary btn-lg">Start Earning <Arrow /></a>
              </div>
              <div className="hero2-cta">
                <span className="hero2-kicker adv">For <i>Advertisers</i></span>
                <a href="/advertisers/" className="btn btn-advertiser btn-lg">Grow My Brand <Arrow /></a>
              </div>
            </div>
          </div>

          <div className="hero2-figure" data-reveal data-reveal-delay="1">
            <img src="media/figma/hero-figures-2026.png" alt="A creator and a brand partner growing together on Involve Asia" loading="eager" />
            {/* single payout notification, top-left of the figure — swaps brand/amount on a random cadence */}
            <div className="hero2-payouts" aria-hidden="true">
              <div className={'pcard' + (payVis ? '' : ' is-swapping')}>
                <span className="pcard-status">Payout Completed</span>
                <span className="pcard-brand">{pay.brand}</span>
                <span className="pcard-amt">+ $<strong>{pay.amt}</strong></span>
              </div>
            </div>
            {/* total-sales card */}
            <div className="hero2-sales" aria-hidden="true">
              <span className="hs-label">Sales Driven</span>
              <span className="hs-sub">last 30 days</span>
              <HeroSales />
            </div>
          </div>
        </div>
        {/* bottom fade — layered ABOVE the right-side figure but BEHIND the left copy/CTAs */}
        <div className="hero2-basefade" aria-hidden="true" />
      </div>
      <style>{`
        .hero2{ text-align:left; }
        .hero2-grid{ display:grid; grid-template-columns:minmax(0,1.32fr) minmax(360px,1fr); align-items:center; gap:clamp(24px,4vw,64px); }
        .hero2-copy{ min-width:0; position:relative; z-index:3; }
        .hero2-title{ font-size:clamp(28px,3.7vw,46px); line-height:1.07; letter-spacing:-.03em; max-width:640px; }
        .hero2-sub{ margin:18px 0 0; max-width:560px; font-size:clamp(16px,1.4vw,18px); line-height:1.55; color:var(--warm-600); }
        .hero2-ctas{ display:flex; flex-wrap:wrap; gap:clamp(16px,1.8vw,26px); margin-top:clamp(26px,3.4vh,38px); }
        .hero2-cta{ display:flex; flex-direction:column; align-items:flex-start; gap:9px; }
        .hero2-kicker{ font:400 14px/1 var(--font-body); color:var(--warm-600); }
        .hero2-kicker i{ font-style:normal; font-weight:700; color:var(--ember); }
        .hero2-kicker.adv i{ color:var(--midnight-light); }
        /* right figure stage — image + its floating cards. !important so the [data-reveal].in
           rule can't reset a transform on reveal. */
        .hero2-figure{ position:relative; align-self:center; z-index:1; }
        .hero2-figure img{ display:block; width:100%; max-width:460px; height:auto; object-fit:contain; margin-left:auto; position:relative; z-index:1; }
        /* inside the content wrap now, so break out to full viewport width; layered above the figure (z1), below the copy (z3) */
        .hero2-basefade{ position:absolute; left:50%; width:100vw; transform:translateX(-50%); bottom:0; height:clamp(200px,34%,360px); z-index:2; pointer-events:none;
          background:linear-gradient(to bottom, rgba(250,250,248,0) 0%, rgba(250,250,248,0) 34%, rgba(250,250,248,.6) 66%, rgba(250,250,248,.95) 86%, var(--warm-50) 100%); }
        /* interactive honeycomb field behind the figures (now the right column) — exact Figma hexes, cursor-repelled */
        .hexfield{ position:absolute; left:76%; top:46%; transform:translate(-50%,-50%); width:min(448px,40%); height:auto; z-index:0; pointer-events:none; }
        .hexfield .hx{ will-change:transform; }
        /* soft ember (bottom-left) + blue (bottom-right) glows — shown only with html.palette-prev */
        .hero2-glow{ display:none; position:absolute; inset:0; z-index:0; pointer-events:none;
          background:
            radial-gradient(44% 48% at 10% 94%, color-mix(in srgb, var(--prev-ember) 15%, transparent), transparent 70%),
            radial-gradient(48% 52% at 92% 90%, color-mix(in srgb, var(--prev-blue) 20%, transparent), transparent 70%); }
        @media (max-width:980px){ .hexfield{ left:50%; width:min(540px,94%); top:auto; bottom:1%; transform:translateX(-50%); } }
        /* single payout notification — top-left of the figure */
        /* desktop: sits BEHIND the hero figure (img z-index:1) so it tucks behind the people; mobile brings it to the front */
        .hero2-payouts{ position:absolute; z-index:0; top:6%; left:-6%; width:min(230px,60%); }
        .pcard{ background:rgba(255,255,255,.88); border-radius:var(--r-lg); box-shadow:var(--shadow-lg); padding:13px 16px; display:flex; flex-direction:column; gap:2px; max-width:200px; will-change:transform,opacity; transition:opacity .34s ease, transform .34s ease; }
        .pcard.is-swapping{ opacity:0; transform:translateY(5px); }
        @media (prefers-reduced-motion: reduce){ .pcard{ transition:none; } }
        /* fonts matched to the advertiser "Sales Driven" card (.hs-label / .hs-sub / .hs-num) */
        .pcard-status{ font:600 11px/1.3 var(--font-body); color:var(--warm-900); }
        .pcard-brand{ font:400 10px/1 var(--font-body); color:var(--warm-400); white-space:nowrap; }
        .pcard-amt{ margin-top:3px; font-family:var(--font-display); font-weight:800; font-size:21px; letter-spacing:-.02em; color:var(--warm-900); white-space:nowrap; }
        .pcard-amt strong{ font-weight:800; font-size:21px; }
        /* total-sales card */
        .hero2-sales{ position:absolute; z-index:3; right:-6%; top:62%; background:rgba(255,255,255,.88); border-radius:var(--r-xl); box-shadow:var(--shadow-lg); padding:13px 16px; display:flex; flex-direction:column; gap:2px; max-width:210px; }
        .hs-label{ font:600 11px/1.3 var(--font-body); color:var(--warm-900); }
        .hs-sub{ font:400 10px/1 var(--font-body); color:var(--warm-400); font-style:normal; }
        .hs-num{ font-family:var(--font-display); font-weight:800; font-size:21px; letter-spacing:-.02em; color:var(--warm-900); margin-top:3px; }
        @media (max-width:980px){
          .hero2{ text-align:center; }
          .hero2-grid{ grid-template-columns:1fr; gap:clamp(16px,4vw,32px); }
          .hero2-copy{ display:flex; flex-direction:column; align-items:center; }
          .hero2-title{ max-width:none; }
          .hero2-sub{ margin-left:auto; margin-right:auto; }
          .hero2-ctas{ justify-content:center; }
          .hero2-figure{ order:2; max-width:460px; margin:0 auto; }
          .hero2-figure img{ margin:0 auto; }
          .hero2-payouts{ width:min(220px,52%); left:0; top:4%; z-index:4; }
          .hero2-sales{ right:0; top:60%; }
        }
        @media (max-width:560px){
          /* left-align the hero header + description on phones */
          .hero2{ text-align:left; }
          .hero2-copy{ align-items:flex-start; }
          .hero2-sub{ margin-left:0; margin-right:0; }
          /* both CTAs in one row — 2 columns, label above each button */
          .hero2-ctas{ display:grid; grid-template-columns:1fr 1fr; gap:10px 12px; width:100%; max-width:420px; margin-left:auto; margin-right:auto; }
          .hero2-cta{ align-items:flex-start; text-align:left; gap:8px; min-width:0; }
          .hero2-kicker{ font-size:13px; }
          .hero2-cta .btn{ width:100%; justify-content:center; padding:13px 12px; font-size:14px; white-space:nowrap; }
          .hero2-cta .btn svg{ flex:0 0 auto; }
          /* floating cards stay on the hero image (Figma: payout lower-left, total-sales right) —
             smaller size + fonts; payout moved up 10% (66%→56%); kept to the left half / right half
             so the two cards never overlap */
          .hero2-payouts{ display:block; left:0; top:56%; bottom:auto; width:min(156px,43%); }
          .hero2-sales{ display:flex; right:0; top:42%; max-width:146px; padding:9px 11px; text-align:left; align-items:flex-start; }
          .hs-label{ font-size:9.5px; }
          .hs-sub{ font-size:8.5px; }
          .hs-num{ font-size:15px; }
          /* payout card → smaller; fonts matched to the advertiser card's mobile sizes */
          .hero2-payouts .pcard{ padding:9px 11px; gap:1px; }
          .hero2-payouts .pcard-status{ font-size:9.5px; }
          .hero2-payouts .pcard-brand{ font-size:8.5px; }
          .hero2-payouts .pcard-amt{ font-size:15px; }
          .hero2-payouts .pcard-amt strong{ font-size:15px; }
        }
      `}</style>
    </section>
  );
}

/* ---------------- Trust strip — two air-style rows, opposite directions ---------------- */
// Advertiser logos (media/advertiser logos for showcase/). [name, file]
const LOGO_DIR = 'media/advertiser logos for showcase/';
const LOGOS = [
  // row 1
  ['Shopee', 'shopee@3x.webp'], ['Lazada', 'lazada@3x.webp'], ['Zalora', 'zalora@3x.webp'], ['Shein', 'shein@3x.webp'],
  ['Nike', 'nike@3x.webp'], ['Apple', 'apple@3x.webp'], ['Klook', 'klook@3x.webp'], ['Maybank', 'maybank@3x.webp'],
  // row 2
  ['Watsons', 'watsons@3x.webp'], ['AliExpress', 'aliexpress@3x.webp'], ['TikTok Shop', 'tiktok-shop@3x.webp'], ['Razer', 'razer@3x.webp'],
  ['Traveloka', 'traveloka@3x.webp'], ['Trip.com', 'tripcom@3x.webp'], ['UOB', 'uob@3x.webp'], ['Lego', 'lego@3x.webp'],
  // row 3
  ['AirAsia', 'airasia@3x.webp'], ['Malaysia Airlines', 'malaysia-airlines@3x.webp'], ['Cathay Pacific', 'cathay-pacific@3x.webp'], ['Huawei', 'huawei@3x.webp'],
  ['Udemy', 'udemy@3x.webp'], ['BaskBear', 'baskbear@3x.webp'], ['Pet Wonderland', 'pet wonderland@3x.webp'], ['CIMB', 'cimb@3x.webp'],
];
const LOGO_ROWS = 1;
function TrustStrip() {
  const secRef = React.useRef(null);
  const tracksRef = React.useRef([]);
  const [reps, setReps] = React.useState(1);
  // Repeat each row until one loop spans the visible width, so no blank gap appears mid-scroll.
  React.useEffect(() => {
    const track = tracksRef.current.filter(Boolean)[0];
    if (!track) return;
    const marq = track.parentElement;
    const imgs = Array.prototype.slice.call(track.querySelectorAll('img'));
    const fit = () => {
      if (imgs.some((im) => !im.complete)) return;         // wait until the logos are measurable
      const baseW = track.scrollWidth / (2 * reps);
      if (baseW < 40) return;
      const need = Math.min(6, Math.max(1, Math.ceil((marq.clientWidth + 8) / baseW)));
      if (need !== reps) setReps(need);
    };
    fit();
    imgs.forEach((im) => im.addEventListener('load', fit));
    window.addEventListener('resize', fit);
    const ro = window.ResizeObserver ? new ResizeObserver(fit) : null;
    if (ro) { ro.observe(track); ro.observe(marq); }
    return () => { imgs.forEach((im) => im.removeEventListener('load', fit)); window.removeEventListener('resize', fit); if (ro) ro.disconnect(); };
  }, [reps]);
  React.useEffect(() => {
    const tracks = tracksRef.current.filter(Boolean);
    if (tracks.length < LOGO_ROWS) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Seamless because each row's content is duplicated: wrapping the offset into
    // (-half, 0] repeats invisibly. Rows alternate direction; auto-advance is slow.
    const norm = (o, half) => { if (!half) return 0; o %= half; if (o > 0) o -= half; return o; };
    const SPEED = 26;   // px/sec — subtle, not busy
    const states = tracks.map((el, i) => ({
      el, offset: 0, half: el.scrollWidth / 2 || 1, dir: i % 2 === 0 ? -1 : 1, dragging: false, startX: 0, startOffset: 0,
    }));
    const draw = (s) => { s.el.style.transform = `translate3d(${s.offset.toFixed(1)}px,0,0)`; };

    // ---- draggable: grab any row to scroll it (mouse + touch via touch-action:pan-y) ----
    const cleanups = states.map((s) => {
      const row = s.el.parentElement;   // the .marquee container
      const onDown = (e) => { s.dragging = true; s.startX = e.clientX; s.startOffset = s.offset; row.classList.add('grabbing'); try { row.setPointerCapture(e.pointerId); } catch (_) {} };
      const onMove = (e) => { if (!s.dragging) return; s.offset = norm(s.startOffset + (e.clientX - s.startX), s.half); draw(s); };
      const onUp = (e) => { if (!s.dragging) return; s.dragging = false; row.classList.remove('grabbing'); try { row.releasePointerCapture(e.pointerId); } catch (_) {} };
      row.addEventListener('pointerdown', onDown);
      row.addEventListener('pointermove', onMove);
      row.addEventListener('pointerup', onUp);
      row.addEventListener('pointercancel', onUp);
      row.addEventListener('lostpointercapture', onUp);
      return () => { row.removeEventListener('pointerdown', onDown); row.removeEventListener('pointermove', onMove); row.removeEventListener('pointerup', onUp); row.removeEventListener('pointercancel', onUp); row.removeEventListener('lostpointercapture', onUp); };
    });

    // ---- auto-advance (skipped under reduced-motion: static, drag-only) ----
    let raf = 0, last = null;
    const onResize = () => states.forEach((s) => { s.half = s.el.scrollWidth / 2 || 1; });
    if (reduce) {
      states.forEach(draw);
    } else {
      const tick = (now) => {
        if (last == null) last = now;
        const dt = Math.min(0.05, (now - last) / 1000); last = now;
        states.forEach((s) => { if (!s.dragging) s.offset = norm(s.offset + s.dir * SPEED * dt, s.half); draw(s); });
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      window.addEventListener('resize', onResize);
    }
    return () => { if (raf) cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); cleanups.forEach((fn) => fn()); };
  }, [reps]);
  const per = Math.ceil(LOGOS.length / LOGO_ROWS);
  const rows = Array.from({ length: LOGO_ROWS }, (_, i) => LOGOS.slice(i * per, i * per + per));
  return (
    <section ref={secRef} id="trust" className="trust-handoff" style={{ background: 'var(--warm-50)', padding: 'clamp(32px,4vh,52px) 0 96px', marginTop: 0, position: 'relative', zIndex: 2, willChange: 'transform, opacity', transformOrigin: 'center top' }}>
      <p data-reveal style={{ textAlign: 'center', font: '600 12px/1 var(--font-body)', color: 'var(--warm-400)', marginBottom: 36 }}>
        Trusted by brands you already know
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
        {rows.map((row, ri) => {
          const oneLoop = [];
          for (let k = 0; k < reps; k++) oneLoop.push(...row);
          const dup = [...oneLoop, ...oneLoop];
          return (
            <div className="marquee" key={ri}>
              <div ref={(el) => { tracksRef.current[ri] = el; }} className="marquee-track">
                {dup.map(([name, file], i) => <img key={i} className="trust-logo" src={encodeURI(LOGO_DIR + file)} alt={`${name} logo`} draggable="false" />)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- Section 3 — "keeps everyone moving, faster." ----------------
   Radial ring of live stat cards + avatars surrounding the headline. Static rest
   state (Phase 1); card positions map to the Figma composition (1160×1080 stage,
   1em≈16px via container units). The spiral entrance motion is layered later. */
function KeepsMoving() {
  const stageRef = React.useRef(null);

  React.useEffect(() => {
    const gsap = window.gsap, ST = window.ScrollTrigger;
    const stage = stageRef.current;
    if (!stage || !gsap || !ST) return;                                  // no GSAP → static ring
    if (window.matchMedia('(max-width:900px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ST);
    const els = [...stage.querySelectorAll('.km-card, .km-ava')];        // the 9 floating cards + avatars
    const title = stage.querySelector('.km-title'), sub = stage.querySelector('.km-sub');
    const CX = 50, CY = 52;                                              // ring centre (matches .km-ring / .km-copy)
    const polar = els.map((el) => {                                      // each card's final spot, in polar form from centre
      const x = parseFloat(el.style.left), y = parseFloat(el.style.top);
      return { r: Math.hypot(x - CX, y - CY), a: Math.atan2(y - CY, x - CX) };
    });
    const SPIN = Math.PI * 1.15;                                         // angle each card unwinds through → spiral path
    const ctx = gsap.context(() => {
      // pre-entrance: everything piled tight at the centre (tiny, faint); headline hidden.
      // NB: no self-rotation — these are sticker/coin cards, so their drop-shadow must always
      // fall straight down; rotating the box would swing the shadow off to the side mid-flight.
      els.forEach((el) => {
        el.style.left = CX + '%'; el.style.top = CY + '%';
        gsap.set(el, { xPercent: -50, yPercent: -50, transformOrigin: '50% 50%', scale: 0.3, autoAlpha: 0 });
      });
      gsap.set([title, sub], { autoAlpha: 0, y: 18 });
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: stage, start: 'top 60%', once: true },  // fire once when the stage is 60% into view
      });
      els.forEach((el, i) => {
        const P = polar[i], s = { p: 0 };
        tl.to(s, {
          p: 1, duration: 1.25,
          onUpdate: () => {                                              // drive position along the spiral each frame
            const p = s.p, r = P.r * p, ang = P.a + SPIN * (1 - p);
            el.style.left = (CX + r * Math.cos(ang)) + '%';
            el.style.top = (CY + r * Math.sin(ang)) + '%';
            gsap.set(el, { scale: 0.3 + 0.7 * p, autoAlpha: Math.min(1, p * 1.8) });
          },
        }, i * 0.07);                                                    // staggered launch out of the pile
      });
      tl.to([title, sub], { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.14 }, 0.75); // headline resolves as cards clear
    }, stage);
    return () => ctx.revert();
  }, []);

  return (
    <section id="moving" className="km-sec">
      <div className="km-stage" ref={stageRef}>
        <div className="km-inner">
          {/* concentric rings (Figma "background circle" — 4 layered gradient ellipses) */}
          <span className="km-ring r1" aria-hidden="true"><img src="media/figma/s3-ring-1.svg" alt="" /></span>
          <span className="km-ring r2" aria-hidden="true"><img src="media/figma/s3-ring-2.svg" alt="" /></span>
          <span className="km-ring r3" aria-hidden="true"><img src="media/figma/s3-ring-3.svg" alt="" /></span>
          <span className="km-ring r4" aria-hidden="true"><img src="media/figma/s3-ring-4.svg" alt="" /></span>
          {/* floating cards + avatars (decorative) */}
          <div className="km-card km-verified" style={{ left: '66.3%', top: '9.1%' }} aria-hidden="true">
            <img src="media/figma/s3-verified.svg" alt="" />Verified
          </div>
          <div className="km-card km-tip" style={{ left: '42.6%', top: '19.5%' }} aria-hidden="true">
            <img className="km-ico" src="media/figma/s3-tiktok.png" alt="" /><span className="km-amt">+$24</span>
          </div>
          <div className="km-card km-coupon" style={{ left: '17.2%', top: '20.7%' }} aria-hidden="true">
            <img src="media/figma/s3-coupon.png" alt="" />
          </div>
          <div className="km-ava" style={{ left: '72.2%', top: '27.8%', width: '5.75em', height: '5.75em' }} aria-hidden="true">
            <img src="media/figma/s3-avatar-1.png" alt="" />
          </div>
          <div className="km-card km-stat" style={{ left: '92.9%', top: '40.3%' }} aria-hidden="true">
            <span className="km-lbl">Total clicks</span><span className="km-big">21,086</span>
          </div>
          <div className="km-card km-pill km-campaign" style={{ left: '26.1%', top: '76.3%' }} aria-hidden="true">
            <img className="km-ico" src="media/figma/s3-bell.png" alt="" />New Campaign Live
          </div>
          <div className="km-ava" style={{ left: '58.4%', top: '86.5%', width: '3.88em', height: '3.88em' }} aria-hidden="true">
            <img src="media/figma/s3-avatar-2.png" alt="" />
          </div>
          <div className="km-card km-stat" style={{ left: '81.1%', top: '86.3%' }} aria-hidden="true">
            <span className="km-lbl">Conversion Rate</span><span className="km-big km-green">+38.1<small>%</small></span>
          </div>
          <div className="km-ava" style={{ left: '32.4%', top: '95.8%', width: '5.31em', height: '5.31em' }} aria-hidden="true">
            <img src="media/figma/s3-avatar-3.png" alt="" />
          </div>
          {/* headline + subcopy (center) */}
          <div className="km-copy">
            <h2 className="km-title">The affiliate platform that<br />keeps everyone moving, faster.</h2>
            <p className="km-sub">We confirm earnings every day, so creators get paid faster and brands see results sooner. Less waiting, more growing, all in one place.</p>
          </div>
        </div>
      </div>
      <style>{`
        .km-sec{ background:var(--warm-50); position:relative; overflow:hidden; padding:clamp(32px,5vh,72px) 0; }
        .km-stage{ position:relative; width:min(1160px,94vw); aspect-ratio:1160/1080; margin:0 auto; container-type:inline-size; }
        .km-inner{ position:absolute; inset:0; font-size:1.379cqw; }
        /* rings — Figma layered gradient ellipses (two normal + two soft-light) */
        .km-ring{ position:absolute; left:50%; top:52%; transform:translate(-50%,-50%); aspect-ratio:1; opacity:.64; }
        .km-ring img{ width:100%; height:100%; display:block; }
        .km-ring.r1{ width:95.6%; }
        .km-ring.r2{ width:89.8%; mix-blend-mode:soft-light; }
        .km-ring.r3{ width:65.3%; }
        .km-ring.r4{ width:65.3%; mix-blend-mode:soft-light; }
        /* cards */
        .km-card{ position:absolute; transform:translate(-50%,-50%); display:inline-flex; align-items:center; gap:.55em; background:#fff; border:1px solid var(--warm-100);
          border-radius:1.43em; box-shadow:0 .36em .5em rgba(15,28,46,.08); padding:.75em 1.05em; white-space:nowrap;
          font-family:var(--font-body); font-weight:700; color:var(--warm-900); font-size:1em; }
        .km-card img{ display:block; }
        .km-ico{ width:2.25em; height:2.25em; object-fit:contain; border-radius:.5em; }
        .km-amt{ font-size:1.5em; letter-spacing:-.02em; }
        .km-verified{ background:#d1fae5; color:#047857; border:none; border-radius:3em; padding:.6em 1.15em; font-size:1.15em; }
        .km-verified img{ width:2em; height:2em; }
        .km-coupon{ padding:1em; border-radius:1.4em; }
        .km-coupon img{ width:4.4em; height:3.55em; object-fit:contain; }
        .km-stat{ flex-direction:column; align-items:flex-start; gap:.05em; }
        .km-lbl{ font-size:1em; font-weight:700; }
        .km-big{ font-size:1.5em; letter-spacing:-.02em; }
        .km-big small{ font-size:.66em; }
        .km-green{ color:#047857; }
        .km-pill{ border-radius:3em; }
        .km-campaign{ font-size:1.15em; padding:.65em 1.15em; }
        .km-campaign .km-ico{ width:2.1em; height:2.1em; border-radius:0; }
        /* avatars are pre-rendered "coin" PNGs (photo + white ring + drop-shadow baked in on a
           transparent canvas) — render them as-is; DON'T clip to a circle or add another shadow. */
        .km-ava{ position:absolute; transform:translate(-50%,-50%); }
        .km-ava img{ width:100%; height:100%; object-fit:contain; display:block; }
        /* center copy */
        .km-copy{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:min(860px,74%); text-align:center; z-index:4; }
        .km-title{ font-size:clamp(24px,3vw,34px); line-height:1.14; letter-spacing:-.028em; color:var(--warm-900); }
        .km-sub{ margin-top:18px; font-size:clamp(15px,1.45vw,21px); line-height:1.5; color:var(--warm-600); }
        @media (max-width:900px){
          .km-stage{ aspect-ratio:auto; width:auto; }
          .km-inner{ position:static; }
          .km-ring, .km-card, .km-ava{ display:none; }
          .km-copy{ position:static; transform:none; width:auto; max-width:600px; margin:0 auto; padding:0 20px; }
        }
      `}</style>
    </section>
  );
}

/* ---------------- Section 4 — "See what's live right now." ----------------
   Live Brand Directory: category filter rail + grid of photo-background brand
   cards (scrim + brand mark + commission chip + publisher count). Static (Phase 1). */
const LIVE_CATS = ['All', 'Marketplace', 'Fashion', 'Travel', 'Digital Services', 'Electronics', 'Health & Beauty'];
// comm rates are PLACEHOLDERS — wire to the live directory data at dev time (varied, not a flat rate).
const LIVE_BRANDS = [
  { name: 'Shopee', comm: '4.0', pub: '6,302' },
  { name: 'Uniqlo', comm: '5.0', pub: '2,214', boxed: true },
  { name: 'TikTok', comm: '3.5', pub: '8,190' },
  { name: 'Huawei', comm: '6.0', pub: '1,224' },
  { name: 'Watsons', comm: '4.5', pub: '3,901' },
  { name: 'Puma', comm: '2.1', pub: '1,466' },
];
function LiveDirectory() {
  const slug = (n) => n.toLowerCase();
  const [cat, setCat] = React.useState(0);  // active category (instant swap, no motion)
  // Mockup: each category maps to a randomized-but-stable subset of the brand
  // list, seeded by the category index so a given category always shows the
  // same set (and the numbers shift so the grid visibly re-filters on click).
  const displayed = React.useMemo(() => {
    if (cat === 0) return LIVE_BRANDS;
    let seed = (cat + 1) * 747796405;
    const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    const arr = LIVE_BRANDS.slice();
    for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = arr[i]; arr[i] = arr[j]; arr[j] = t; }
    const count = 3 + Math.floor(rnd() * 4); // 3..6
    return arr.slice(0, count).map((b) => ({
      ...b,
      comm: (2 + rnd() * 6).toFixed(1),
      pub: (500 + Math.floor(rnd() * 8500)).toLocaleString(),
    }));
  }, [cat]);
  return (
    <section id="offers" className="lb-sec sec-pad">
      <div className="wrap">
        <div className="lb-layout" data-reveal>
          <div className="lb-aside">
            <span className="lb-eyebrow"><i />Live Brand Directory</span>
            <h2 className="lb-title">See what's live right now.</h2>
            <p className="lb-sub">Real brands, ready to promote. See what each one pays and how many publishers are already on board.</p>
            <div className="lb-rail">
              {LIVE_CATS.map((c, i) => (
                <button key={c} type="button" className={'lb-cat' + (i === cat ? ' on' : '')} aria-pressed={i === cat} onClick={() => setCat(i)}>{c}</button>
              ))}
            </div>
            <a href="/advertisers/" className="lb-explore">Explore all offers <Arrow /></a>
          </div>
          <div className="lb-grid" key={cat}>
            {displayed.map((b, i) => (
              <a key={b.name} href="/advertisers/" className="lb-card">
                <img className="lb-bg" src={`media/figma/s4-bg-${slug(b.name)}.png`} alt="" loading="lazy" />
                <span className="lb-scrim" aria-hidden="true" />
                {i < 3 && <span className="lb-badge">New</span>}
                <span className="lb-logowrap">
                  <span className="lb-logotile">
                    <img className={b.boxed ? 'lb-logo-fill' : 'lb-logo-contain'} src={`media/figma/s4-logo2-${slug(b.name)}.png`} alt={`${b.name} logo`} />
                  </span>
                </span>
                <span className="lb-info">
                  <span className="lb-name">{b.name}</span>
                  <span className="lb-comm"><small>Up to</small><b>{b.comm}% commission</b></span>
                  <span className="lb-pub">{b.pub} publishers promoting this</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .lb-sec{ background:var(--warm-50); padding:clamp(44px,5.4vh,68px) 0 !important; }
        .lb-layout{ display:grid; grid-template-columns:minmax(280px,330px) 1fr; gap:clamp(28px,3vw,52px); align-items:start; }
        .lb-aside{ display:flex; flex-direction:column; align-items:flex-start; }
        .lb-eyebrow{ display:inline-flex; align-items:center; gap:8px; font:600 14px/1 var(--font-body); color:var(--warm-900); }
        .lb-eyebrow i{ width:10px; height:10px; border-radius:50%; background:#10b981; opacity:.72; flex:0 0 auto; }
        .lb-title{ font-size:clamp(24px,3vw,34px); line-height:1.05; letter-spacing:-.01em; margin-top:14px; }
        .lb-sub{ margin-top:12px; max-width:none; font-size:16px; line-height:1.5; color:var(--warm-600); }
        .lb-rail{ display:flex; flex-direction:column; gap:8px; margin-top:22px; align-items:flex-start; }
        .lb-explore{ margin-top:22px; align-self:flex-start; display:inline-flex; align-items:center; gap:8px;
          font:600 15px/1 var(--font-body); color:var(--warm-900); text-decoration:none; cursor:pointer; }
        .lb-explore svg{ transition:transform .2s ease; }
        .lb-explore:hover svg{ transform:translateX(3px); }
        .lb-cat{ text-align:left; border:1px solid var(--warm-900); background:#fff; color:var(--warm-900); border-radius:var(--r-full);
          padding:9px 17px; font:600 15px/1 var(--font-body); cursor:pointer; opacity:.32; width:max-content; max-width:100%;
          transition:opacity .15s, background .15s, color .15s; white-space:nowrap; }
        .lb-cat:hover{ opacity:.72; }
        .lb-cat.on{ background:var(--warm-900); color:#fff; opacity:1; }
        .lb-grid{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:16px; }
        .lb-card{ position:relative; min-width:0; aspect-ratio:298/334; border-radius:var(--r-lg); overflow:hidden; display:flex; flex-direction:column;
          text-decoration:none; transition:transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s; }
        .lb-card:hover{ box-shadow:var(--shadow-lg); }
        .lb-bg{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:blur(6.4px); transform:scale(1.06); }
        .lb-scrim{ position:absolute; inset:0; background:rgba(0,0,0,.48); }
        /* "New" corner badge (green, tl+br rounded) */
        .lb-badge{ position:absolute; top:0; left:0; z-index:3; background:#047857; color:#fff; font:700 13px/1 var(--font-body);
          padding:6px 11px; border-radius:8px 0 8px 0; }
        /* white rounded logo tile, centred in the upper area */
        .lb-logowrap{ position:relative; z-index:2; flex:1; display:flex; align-items:center; justify-content:center; padding-top:16px; }
        .lb-logotile{ width:clamp(80px,34%,101px); aspect-ratio:1; border-radius:var(--r-xl); background:#fff; overflow:hidden;
          display:flex; align-items:center; justify-content:center; }
        .lb-logo-contain{ width:70%; height:70%; object-fit:contain; }
        .lb-logo-fill{ width:100%; height:100%; object-fit:cover; }
        /* bottom-left info block */
        .lb-info{ position:relative; z-index:2; margin-top:auto; padding:0 22px 22px; display:flex; flex-direction:column; align-items:flex-start; text-align:left; }
        .lb-name{ font-family:var(--font-display); font-weight:800; font-size:16px; letter-spacing:-.01em; color:#fff; }
        .lb-comm{ margin-top:12px; display:flex; flex-direction:column; }
        .lb-comm small{ font:400 14px/1.26 var(--font-body); color:#fff; }
        .lb-comm b{ font:600 16px/1.26 var(--font-body); color:#fff; }
        .lb-pub{ margin-top:12px; font:400 12px/1.23 var(--font-body); color:rgba(255,255,255,.72); }
        @media (max-width:1000px){
          .lb-layout{ grid-template-columns:minmax(0,1fr); gap:22px; }
          .lb-aside{ align-items:stretch; min-width:0; }
          .lb-rail{ flex-direction:row; flex-wrap:nowrap; overflow-x:auto; gap:8px; padding-bottom:6px; scrollbar-width:none; }
          .lb-rail::-webkit-scrollbar{ display:none; }
          .lb-cat{ flex:0 0 auto; }
          .lb-explore{ align-self:flex-start; }
          .lb-grid{ grid-template-columns:repeat(3,minmax(0,1fr)); }
        }
        @media (max-width:720px){ .lb-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); } }
        /* phones — 2 rows that scroll horizontally: 2 full columns + a partial 3rd peek,
           swipe left/right to explore. Cards shrink so the chip + arrow fit the narrow card. */
        @media (max-width:520px){
          .lb-grid{ display:grid; grid-auto-flow:column; grid-template-columns:none; grid-template-rows:repeat(2,auto);
            grid-auto-columns:clamp(120px,37vw,150px); gap:12px; overflow-x:auto; overscroll-behavior-x:contain;
            scroll-snap-type:x proximity; -webkit-overflow-scrolling:touch; scrollbar-width:none;
            /* full-bleed to the screen edges: break out of the 20px page gutter, then re-add it as
               inner padding so the first card lines up with the heading and the peek crops at the true edge */
            margin-left:-20px; margin-right:-20px; padding:0 20px 4px; scroll-padding-left:20px; }
          .lb-grid::-webkit-scrollbar{ display:none; }
          .lb-card{ aspect-ratio:170/216; border-radius:var(--r-lg); scroll-snap-align:start; }
          .lb-badge{ font-size:10px; padding:4px 8px; }
          .lb-logowrap{ padding-top:12px; }
          .lb-logotile{ width:clamp(52px,36%,62px); border-radius:var(--r-xl); }
          .lb-info{ padding:0 12px 12px; }
          .lb-name{ font-size:13px; }
          .lb-comm{ margin-top:7px; }
          .lb-comm small{ font-size:10.5px; }
          .lb-comm b{ font-size:13px; }
          .lb-pub{ margin-top:7px; font-size:10.5px; }
        }
      `}</style>
    </section>
  );
}

/* ---------------- Offers (Advertisers & Campaigns) ---------------- */
// Eight categories — matches the live involve.asia advertiser directory.
// Up to 12 brands each (3 per row × 4 rows). LINE-style: a left rail keeps one
// category in focus at a time while signalling the full breadth on offer.
const OFFER_CATS = ['Marketplace','Fashion','Travel','Finance','Health & Beauty','Electronics','Services','Internal'];
const OFFERS_BY_CAT = {
  'Marketplace': [
    { brand: 'Shopee', comm: 'Up to 8% commission' }, { brand: 'Lazada', comm: 'Up to 9% commission' },
    { brand: 'Amazon', comm: 'Up to 7% commission' }, { brand: 'AliExpress', comm: 'Up to 6.5% commission' },
    { brand: 'Taobao', comm: 'Up to 5% commission' }, { brand: 'Tokopedia', comm: 'Up to 4.5% commission' },
    { brand: 'Qoo10', comm: 'Up to 6% commission' }, { brand: 'Blibli', comm: 'Up to 4% commission' },
    { brand: 'Temu', comm: 'Up to 10% commission' }, { brand: 'Carousell', comm: 'Up to 5% commission' },
    { brand: 'IKEA', comm: 'Up to 7% commission' }, { brand: 'Decathlon', comm: 'Up to 6% commission' },
  ],
  'Fashion': [
    { brand: 'Zalora', comm: 'Up to 12% commission' }, { brand: 'Shein', comm: 'Up to 14% commission' },
    { brand: 'Uniqlo', comm: 'Up to 8% commission' }, { brand: 'H&M', comm: 'Up to 9% commission' },
    { brand: 'Nike', comm: 'Up to 11% commission' }, { brand: 'Adidas', comm: 'Up to 10% commission' },
    { brand: 'Charles & Keith', comm: 'Up to 13% commission' }, { brand: 'Pomelo', comm: 'Up to 12% commission' },
    { brand: 'Love Bonito', comm: 'Up to 10% commission' }, { brand: 'Cotton On', comm: 'Up to 9% commission' },
    { brand: 'Pedro', comm: 'Up to 11% commission' }, { brand: 'ASOS', comm: 'Up to 8% commission' },
  ],
  'Travel': [
    { brand: 'Klook', comm: 'Up to 5% commission' }, { brand: 'Agoda', comm: 'Up to 6% commission' },
    { brand: 'Trip.com', comm: 'Up to 6% commission' }, { brand: 'Traveloka', comm: 'Up to 5.5% commission' },
    { brand: 'Tiket.com', comm: 'Up to 4.5% commission' }, { brand: 'AirAsia', comm: 'Up to 3% commission' },
    { brand: 'Expedia', comm: 'Up to 6% commission' }, { brand: 'Booking.com', comm: 'Up to 5% commission' },
    { brand: 'Cathay Pacific', comm: 'Up to 2.5% commission' }, { brand: 'KKday', comm: 'Up to 7% commission' },
    { brand: 'Pelago', comm: 'Up to 8% commission' }, { brand: 'Trivago', comm: 'Up to 4% commission' },
  ],
  'Finance': [
    { brand: 'Maybank', comm: 'Up to RM120 / lead' }, { brand: 'CIMB', comm: 'Up to RM100 / lead' },
    { brand: 'UOB', comm: 'Up to RM150 / lead' }, { brand: 'Trust Bank', comm: 'Up to SGD30 / signup' },
    { brand: "Touch 'n Go", comm: 'Up to RM15 / signup' }, { brand: 'Wise', comm: 'Up to USD40 / referral' },
    { brand: 'StashAway', comm: 'Up to USD50 / funded' }, { brand: 'Luno', comm: 'Up to USD25 / signup' },
    { brand: 'Funding Societies', comm: 'Up to USD60 / lead' }, { brand: 'Aspire', comm: 'Up to USD80 / account' },
    { brand: 'Tonik', comm: 'Up to USD20 / signup' }, { brand: 'Revolut', comm: 'Up to USD45 / referral' },
  ],
  'Health & Beauty': [
    { brand: 'Sephora', comm: 'Up to 10% commission' }, { brand: 'Watsons', comm: 'Up to 11% commission' },
    { brand: 'Guardian', comm: 'Up to 9% commission' }, { brand: 'Sociolla', comm: 'Up to 12% commission' },
    { brand: 'Innisfree', comm: 'Up to 13% commission' }, { brand: 'The Body Shop', comm: 'Up to 12% commission' },
    { brand: 'iHerb', comm: 'Up to 10% commission' }, { brand: 'Althea', comm: 'Up to 14% commission' },
    { brand: 'Hada Labo', comm: 'Up to 11% commission' }, { brand: 'Shiseido', comm: 'Up to 9% commission' },
    { brand: "L'Oréal", comm: 'Up to 10% commission' }, { brand: 'SaSa', comm: 'Up to 12% commission' },
  ],
  'Electronics': [
    { brand: 'Samsung', comm: 'Up to 5% commission' }, { brand: 'Xiaomi', comm: 'Up to 6% commission' },
    { brand: 'ASUS', comm: 'Up to 4% commission' }, { brand: 'Lenovo', comm: 'Up to 4.5% commission' },
    { brand: 'Dell', comm: 'Up to 3.5% commission' }, { brand: 'HP', comm: 'Up to 4% commission' },
    { brand: 'Logitech', comm: 'Up to 7% commission' }, { brand: 'Anker', comm: 'Up to 8% commission' },
    { brand: 'ExpressVPN', comm: 'Up to USD36 / signup' }, { brand: 'Kaspersky', comm: 'Up to 14% commission' },
    { brand: 'Razer', comm: 'Up to 6% commission' }, { brand: 'JBL', comm: 'Up to 7% commission' },
  ],
  'Services': [
    { brand: 'GrabFood', comm: 'Up to RM12 / order' }, { brand: 'foodpanda', comm: 'Up to RM10 / order' },
    { brand: 'Netflix', comm: 'Up to USD8 / signup' }, { brand: 'Spotify', comm: 'Up to USD6 / signup' },
    { brand: 'Coursera', comm: 'Up to 20% commission' }, { brand: 'Udemy', comm: 'Up to 7% commission' },
    { brand: 'Canva', comm: 'Up to USD18 / Pro signup' }, { brand: 'Adobe', comm: 'Up to 8% commission' },
    { brand: 'Shopify', comm: 'Up to USD58 / referral' }, { brand: 'NordVPN', comm: 'Up to 40% commission' },
    { brand: 'Lingoda', comm: 'Up to EUR38 / signup' }, { brand: 'Photobook', comm: 'Up to 15% commission' },
  ],
  'Internal': [
    { brand: 'Involve Rewards', comm: 'Bonus payouts' }, { brand: 'Refer & Earn', comm: 'Up to USD25 / referral' },
    { brand: 'Creator Academy', comm: 'Featured program' }, { brand: 'Brand Spotlight', comm: 'Boosted rates' },
    { brand: 'Seasonal Campaign', comm: 'Limited-time bonus' }, { brand: 'New Advertiser Drop', comm: 'Early-access rates' },
    { brand: 'Express Withdrawal', comm: 'Partner perk' }, { brand: 'Mobile App', comm: 'On-the-go tracking' },
    { brand: 'Loyalty Bonus', comm: 'Tiered rewards' }, { brand: 'Partner Perks', comm: 'Member offers' },
  ],
};
// Real brand logos we have on hand (media/advertiser logos for showcase/). Cards with
// a match show the logo; the rest fall back to a clean monogram tile. Brief Change 6.
const BRAND_LOGOS = {
  'Shopee': 'shopee@3x.webp', 'Lazada': 'lazada@3x.webp', 'AliExpress': 'aliexpress@3x.webp',
  'Zalora': 'zalora@3x.webp', 'Shein': 'shein@3x.webp', 'Nike': 'nike@3x.webp', 'Apple': 'apple@3x.webp',
  'Klook': 'klook@3x.webp', 'Trip.com': 'tripcom@3x.webp', 'Traveloka': 'traveloka@3x.webp',
  'AirAsia': 'airasia@3x.webp', 'Cathay Pacific': 'cathay-pacific@3x.webp', 'Malaysia Airlines': 'malaysia-airlines@3x.webp',
  'Maybank': 'maybank@3x.webp', 'CIMB': 'cimb@3x.webp', 'UOB': 'uob@3x.webp', 'Watsons': 'watsons@3x.webp',
  'Razer': 'razer@3x.webp', 'Huawei': 'huawei@3x.webp', 'Udemy': 'udemy@3x.webp', 'TikTok Shop': 'tiktok-shop@3x.webp', 'Lego': 'lego@3x.webp',
};
function OffersSection() {
  const [cat, setCat] = React.useState('Marketplace');
  // Larger cards show fewer brands at once (brief Change 6): show a curated highlight
  // of 6, leading with brands we have real logos for. "View all" carries the full scale.
  const list = OFFERS_BY_CAT[cat] || [];
  const shown = [...list].sort((a, b) => (BRAND_LOGOS[b.brand] ? 1 : 0) - (BRAND_LOGOS[a.brand] ? 1 : 0)).slice(0, 9);
  // "Up to 8% commission" -> { up:'Up to', num:'8%', rem:'commission' } so the number reads as the Ember co-hero.
  const parseComm = (comm) => {
    let up = '', rest = comm;
    if (comm.startsWith('Up to ')) { up = 'Up to'; rest = comm.slice(6); }
    const sp = rest.indexOf(' ');
    return { up, num: sp === -1 ? rest : rest.slice(0, sp), rem: sp === -1 ? '' : rest.slice(sp + 1) };
  };
  return (
    <section id="offers" data-reveal className="sec-pad" style={{ marginInline: 'clamp(16px,4vw,56px)', borderRadius: 'clamp(20px,3vw,40px)', overflow: 'hidden' }}>
      <div className="wrap">
        <div className="sec-head" data-reveal style={{ marginInline: 'auto', textAlign: 'center' }}>
          <h2>Advertisers and campaigns to promote</h2>
          <p style={{ marginInline: 'auto' }}>We have 4,000+ advertisers on our platform that partners can earn from. Here is a highlight across categories, pick one to explore.</p>
        </div>
        <div className="offers-layout" data-reveal>
          <div className="offer-rail" role="tablist" aria-label="Filter offers by category">
            {OFFER_CATS.map(c => (
              <button key={c} role="tab" aria-selected={cat === c} className="offer-rail-tab" onClick={() => setCat(c)}>
                {c}
                <span className="chev" aria-hidden="true"><Arrow /></span>
              </button>
            ))}
          </div>
          <div key={cat} className="offer-grid" role="tabpanel" aria-label={cat}>
            {shown.map((o, i) => {
              const file = BRAND_LOGOS[o.brand];
              const c = parseComm(o.comm);
              return (
                <a key={o.brand} href="https://app.involve.asia/directory" className="offer-card" style={{ animationDelay: (i * 0.04) + 's' }} aria-label={`${o.brand}, ${o.comm}. View offer`}>
                  <div className="offer-card-head">
                    <div className="offer-logo">
                      {file ? <img src={encodeURI(LOGO_DIR + file)} alt={`${o.brand} logo`} loading="lazy" /> : <span aria-hidden="true">{o.brand[0].toUpperCase()}</span>}
                    </div>
                    <span className="offer-arrow" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M17 7H8.5M17 7v8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </div>
                  <div className="offer-foot">
                    <div className="offer-brand">{o.brand}</div>
                    <div className="offer-comm">
                      {c.up && <span className="offer-up">{c.up}</span>}
                      <div className="offer-rate"><span className="offer-num">{c.num}</span>{c.rem ? ' ' + c.rem : ''}</div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <div data-reveal style={{ textAlign: 'center', marginTop: 44 }}>
          <a href="https://app.involve.asia/directory" className="btn btn-secondary btn-lg">View all 4,000+ advertisers <Arrow /></a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 5 — "Simple enough to start today." ----------------
   Four steps (Match → Go live → Track → Grow and get paid). Each row: masked photo
   with floating live-UI cards (left) + step copy and a testimonial (right).
   Static (Phase 1); overlay cards rebuilt in CSS for crispness. */
const START_STEPS = [
  { n: 'Step 1', title: 'Match', img: 'home-start-img-01.png', overlay: 'match',
    desc: 'We match you with the right brands, or the right publishers. No cold outreach.',
    quote: '“Found 40 brands to promote in a day, the filter and category makes the process much easier.”',
    name: 'John Doe', role: 'Publisher · Food Blogger', avatar: 's5-avatar-1.png' },
  { n: 'Step 2', title: 'Go live', img: 'home-start-img-02.png', overlay: 'golive',
    desc: 'Then you go live, your way. Share a link, drop a coupon, add a banner, or launch a full campaign.',
    quote: '“Involve Asia did a great job in guiding us on what info needed and launched our campaign in an afternoon.”',
    name: 'Brand Name', role: 'Advertiser · Brand Category', avatar: 's5-avatar-3.png' },
  { n: 'Step 3', title: 'Track', img: 'home-start-img-03.png', overlay: 'track',
    desc: 'Watch every click, sale, and payout in one dashboard.',
    quote: '“Found 40 brands to promote in a day, the filter and category makes the process much easier.”',
    name: 'Jane Doe', role: 'Publisher · Lifestyle Content Creator', avatar: 's5-avatar-2.png' },
  { n: 'Step 4', title: 'Grow and get paid', img: 'home-start-img-04.png', overlay: 'payout',
    desc: "Publishers get paid for every sale they drive. Brands grow from those sales, and only pay when they're real and verified.",
    quote: '“The data provided is clear which makes the validation process easier, and we only pay when it actually converts.”',
    name: 'Brand Name', role: 'Advertiser · Brand Category', avatar: 's5-avatar-3.png' },
];
function StartOverlay({ type }) {
  if (type === 'match') return (
    <div className="st-ov st-ov-center" aria-hidden="true">
      <div className="st-glass st-match-g">
        <span className="st-ov-lbl">Recommended</span>
        <div className="st-picks">
          {[['JD Sports', '3.5', '#0F1C2E', 'JD-ft-img.png'], ['PUMA', '2.1', '#1A2E47', 'PUMA-ft-img.png']].map(([b, c, bg, logo]) => (
            <div className="st-pick" key={b}>
              <span className="st-pick-th" style={{ background: bg }}><img src={`media/figma/${logo}`} alt={`${b} logo`} /></span>
              <span className="st-pick-t"><b className="st-pick-name">{b}</b><span className="st-pick-comm"><small>Up to</small>{c}% commission</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  if (type === 'golive') return (
    <div className="st-ov st-ov-center" aria-hidden="true">
      <div className="st-glass st-pill-g"><div className="st-deeplink"><span className="st-link-ic">🔗</span>invl.me/yourDeepLink</div></div>
    </div>
  );
  if (type === 'track') return (
    <div className="st-ov st-ov-center" aria-hidden="true">
      <div className="st-glass st-pill-g"><div className="st-stat"><span className="st-stat-lbl"><em className="st-stat-ic">↗</em> Conversion Rate</span><span className="st-stat-row"><b>12<small>%</small></b><em>↑21%</em></span></div></div>
    </div>
  );
  if (type === 'payout') return (
    <div className="st-ov st-ov-center" aria-hidden="true">
      <div className="st-glass st-pill-g"><div className="st-payout"><span className="st-payout-l">Payout Received</span><span className="st-payout-n">+ $48</span></div></div>
    </div>
  );
  return null;
}
/* Static fallback (reduced-motion / mobile / no-GSAP): the original vertical step list. */
function StartStatic() {
  return (
    <section id="how" className="st-sec sec-pad">
      <div className="wrap">
        <div className="st-head" data-reveal>
          <h2 className="st-title">Simple enough to start today.</h2>
          <p className="st-sub">Whether you're here to earn or to grow, you're four steps from your first payout.</p>
        </div>
        <div className="st-steps">
          {START_STEPS.map((s) => (
            <div className="st-step" key={s.n} data-reveal>
              <div className="st-figure">
                <img className="st-photo" src={`media/figma/${s.img}`} alt={`${s.title} step`} loading="lazy" />
                <StartOverlay type={s.overlay} />
              </div>
              <div className="st-body">
                <span className="st-n">{s.n}</span>
                <h3 className="st-h">{s.title}</h3>
                <p className="st-desc">{s.desc}</p>
                <p className="st-quote">{s.quote}</p>
                <div className="st-person">
                  <img src={`media/figma/${s.avatar}`} alt="" />
                  <span className="st-person-t"><b>{s.name}</b><span>{s.role}</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Animated (desktop): Klarna-style pinned deck. Section pins; each step's image card
   slides up from below and stacks over the previous (which peeks at the top). The right
   column shows ONE step's text at a time — the whole block cross-fades to the next as
   you scroll. Scrubbed to the scroll position. */
function StartAnimated() {
  const stageRef = React.useRef(null);
  const cardsRef = React.useRef([]);
  const textsRef = React.useRef([]);

  React.useEffect(() => {
    const gsap = window.gsap, ST = window.ScrollTrigger;
    const stage = stageRef.current;
    if (!stage || !gsap || !ST) return;
    gsap.registerPlugin(ST);
    const cards = cardsRef.current.filter(Boolean);
    const texts = textsRef.current.filter(Boolean);
    const ctx = gsap.context(() => {
      // the floating UI cards overlaid on each photo (glass stat/product/payout cards + the match box)
      const uis = cards.map((c) => [...c.querySelectorAll('.st-glass, .st-ov-match')]);
      cards.forEach((c, i) => gsap.set(c, { autoAlpha: i === 0 ? 1 : 0, zIndex: i + 1 }));
      texts.forEach((t, i) => gsap.set(t, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 26, zIndex: i + 1 }));
      uis.forEach((arr) => gsap.set(arr, { autoAlpha: 0, y: 16 }));      // UI starts hidden; enters per step
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: { trigger: stage, pin: stage, start: 'top top', end: '+=3400', scrub: 0.5, anticipatePin: 1 },
      });
      tl.to(uis[0], { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.09 }, 0.15); // step 1 UI enters as the pin engages
      const HOLD = 0.5, TR = 0.6;
      let at = 0.6;                                                     // let step 1 read as the pin engages
      for (let i = 0; i < cards.length - 1; i++) {
        tl.to(cards[i], { autoAlpha: 0, duration: TR }, at);           // current card fades fully out…
        tl.to(cards[i + 1], { autoAlpha: 1, duration: TR }, at);       // …next fades in at the SAME position
        tl.to(texts[i], { autoAlpha: 0, y: -26, duration: 0.42 }, at); // current text fades out…
        tl.to(texts[i + 1], { autoAlpha: 1, y: 0, duration: 0.5 }, at + 0.12); // …next text fades in
        tl.to(uis[i + 1], { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.09 }, at + 0.28); // …UI cards rise in after the photo settles
        at += TR + HOLD;
      }
      tl.to({}, { duration: 0.5 });                                    // tail hold on the last step
    }, stage);
    return () => ctx.revert();
  }, []);

  return (
    <section id="how" className="st2-sec">
      <div className="st2-stage" ref={stageRef}>
        <div className="wrap">
          <div className="st2-head">
            <h2 className="st-title">Simple enough to start today.</h2>
            <p className="st-sub">Whether you're here to earn or to grow, you're four steps from your first payout.</p>
          </div>
          <div className="st2-cols">
            <div className="st2-stack">
              {START_STEPS.map((s, i) => (
                <div className="st2-card" key={s.n} ref={(el) => (cardsRef.current[i] = el)}>
                  <img className="st-photo" src={`media/figma/${s.img}`} alt={`${s.title} step`} loading="lazy" />
                  <StartOverlay type={s.overlay} />
                </div>
              ))}
            </div>
            <div className="st2-textwrap">
              {START_STEPS.map((s, i) => (
                <div className="st2-text" key={s.n} ref={(el) => (textsRef.current[i] = el)} aria-hidden={i !== 0}>
                  <span className="st-n">{s.n}</span>
                  <h3 className="st-h">{s.title}</h3>
                  <p className="st-desc">{s.desc}</p>
                  <p className="st-quote">{s.quote}</p>
                  <div className="st-person">
                    <img src={`media/figma/${s.avatar}`} alt="" />
                    <span className="st-person-t"><b>{s.name}</b><span>{s.role}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StartToday() {
  return (
    <section id="how" className="st-sec sec-pad">
      <div className="wrap">
        <div className="st-head" data-reveal>
          <h2 className="st-title">Simple enough to start today.</h2>
          <p className="st-sub">Whether you're here to earn or to grow, you're four steps from your first payout.</p>
        </div>
        <div className="st-grid">
          {START_STEPS.map((s, i) => (
            <div className="st-col" key={s.title} data-reveal data-reveal-delay={i + 1}>
              <div className="st-figure">
                <img className="st-photo" src={`media/figma/${s.img}`} alt={`${s.title} step`} loading="lazy" />
                <StartOverlay type={s.overlay} />
              </div>
              <h3 className="st-h">{s.title}</h3>
              <p className="st-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .st-sec{ background:var(--warm-50); position:relative; overflow:hidden; }
        .st-head{ text-align:center; max-width:900px; margin:0 auto; }
        .st-title{ font-size:clamp(24px,3vw,34px); line-height:1.03; letter-spacing:-.01em; }
        .st-sub{ margin-top:14px; color:var(--warm-600); font-size:16px; }
        /* 4-across step grid (concept-8) */
        .st-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(18px,1.8vw,30px); margin:clamp(36px,5vh,60px) auto 0; }
        .st-col{ display:flex; flex-direction:column; }
        .st-figure{ position:relative; border-radius:var(--r-xl); overflow:hidden; aspect-ratio:1; background:var(--warm-200); }
        .st-photo{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .st-ov{ position:absolute; }
        .st-ov-center{ inset:0; display:flex; align-items:center; justify-content:center; padding:14px; z-index:2; }
        .st-ov b, .st-ov small, .st-ov span, .st-ov em{ font-family:var(--font-body); }
        /* frosted glass frame wrapping each single UI card (Figma) */
        .st-glass{ background:rgba(255,255,255,.46); -webkit-backdrop-filter:blur(9px); backdrop-filter:blur(9px); border-radius:var(--r-xl); padding:8px; box-shadow:0 10px 28px rgba(15,28,46,.16); }
        .st-match-g{ width:88%; max-width:224px; }
        .st-pill-g{ max-width:100%; }
        /* match overlay */
        .st-ov-lbl{ display:block; color:#fff; font-size:13px; font-weight:600; margin:2px 4px 8px; text-shadow:0 1px 8px rgba(0,0,0,.4); }
        /* subtle staggered entrance for each card's floating UI, once the card reveals */
        .st-col .st-ov-center > *{ opacity:0; transform:translateY(12px) scale(.98); transition:opacity .55s cubic-bezier(.4,0,.2,1), transform .55s cubic-bezier(.4,0,.2,1); }
        .st-col.in .st-ov-center > *{ opacity:1; transform:none; transition-delay:.28s; }
        @media (prefers-reduced-motion: reduce){ .st-col .st-ov-center > *{ opacity:1; transform:none; transition:none; } }
        .st-picks{ display:flex; flex-direction:column; gap:7px; }
        .st-pick{ display:flex; align-items:center; gap:9px; background:#fff; border-radius:var(--r-xl); padding:8px 10px; }
        .st-pick-th{ width:40px; height:40px; border-radius:var(--r-md); flex:0 0 auto; display:flex; align-items:center; justify-content:center; overflow:hidden; }
        .st-pick-th img{ width:74%; height:74%; object-fit:contain; }
        .st-pick-name{ display:block; font:400 13px/1.25 var(--font-body); color:var(--warm-900); }
        .st-pick-comm{ display:block; margin-top:3px; font:700 14px/1.15 var(--font-body); color:var(--warm-900); }
        .st-pick-comm small{ display:block; font:600 10px/1.2 var(--font-body); color:var(--warm-600); }
        /* go live — deeplink pill */
        .st-deeplink{ display:inline-flex; align-items:center; gap:8px; background:#fff; border-radius:var(--r-xl); padding:10px 15px; font-size:14px; font-weight:600; color:var(--warm-900); white-space:nowrap; }
        .st-link-ic{ font-size:13px; }
        /* track — conversion-rate card */
        .st-stat{ background:#fff; border-radius:var(--r-xl); padding:9px 13px; display:flex; flex-direction:column; gap:4px; }
        .st-stat-lbl{ display:flex; align-items:center; gap:5px; font-size:13px; font-weight:600; color:var(--warm-900); white-space:nowrap; }
        .st-stat-ic{ font-style:normal; color:var(--warm-900); }
        .st-stat-row{ display:flex; align-items:baseline; gap:8px; }
        .st-stat-row b{ font-size:21px; font-weight:700; color:var(--warm-900); }
        .st-stat-row b small{ font-size:14px; }
        .st-stat-row em{ font-style:normal; font-size:12px; font-weight:700; color:#047857; background:#d1fae5; border-radius:var(--r-md); padding:2px 6px; }
        /* payout pill */
        .st-payout{ display:inline-flex; align-items:center; gap:14px; background:#fff; border-radius:var(--r-xl); padding:11px 17px; white-space:nowrap; }
        .st-payout-l{ font-size:14px; font-weight:600; color:var(--warm-900); }
        .st-payout-n{ font-size:20px; font-weight:700; color:var(--warm-900); }
        /* body */
        .st-h{ font-size:clamp(19px,1.5vw,23px); line-height:1.2; letter-spacing:-.01em; margin-top:18px; }
        .st-desc{ margin-top:9px; color:var(--warm-600); font-size:16px; line-height:1.5; }
        @media (max-width:900px){ .st-grid{ grid-template-columns:repeat(2,1fr); gap:26px; } }
        @media (max-width:520px){ .st-grid{ grid-template-columns:1fr; } .st-figure{ max-width:380px; } }
      `}</style>
    </section>
  );
}

/* ---------------- Section 6 — "Real human support, at every step." ----------------
   Wide rounded photo banner: giant translucent 95% stat (left) + headline, copy and
   a glass-boxed testimonial (right). MOTION (Figma 1110:30219 / 1216:43136): when the
   banner falls into the viewport centre it auto-plays ONCE — a chat pill types (three
   bouncing dots) then morphs into "How can we help today?", holds, and exits as the
   photo blur-reveals; then title+copy fade in, and the 95% figure + testimonial land
   last. Sizes use container units so the composition scales with the banner width.
   Reduced-motion / mobile fall back to the static final composition. */
function SupportBanner() {
  const secRef = React.useRef(null);

  // Chat-pill motion (concept-8): typing dots → morph wider → reveal "How can we help today?",
  // then STOP (no exit / no photo blur). Fires once when the section enters the viewport.
  // Static fallback (no GSAP / reduced motion): CSS resting state already shows the final bubbles.
  React.useEffect(() => {
    const gsap = window.gsap, ST = window.ScrollTrigger;
    const root = secRef.current;
    if (!root || !gsap || !ST || prefersReduced()) return;
    gsap.registerPlugin(ST);
    const q = (s) => root.querySelector(s);
    const pill = q('.sup-pill'), dots = q('.sup-pill-dots'), ans = q('.sup-pill-answer'), hello = q('.sup-hello');
    const natW = Math.round(pill.getBoundingClientRect().width);           // measure resting width (answer shown)
    const ctx = gsap.context(() => {
      gsap.set(pill, { width: 52, autoAlpha: 0 });                         // dot pill, hidden until after "Hello."
      gsap.set(dots, { autoAlpha: 1 });
      gsap.set(ans, { autoAlpha: 0 });
      gsap.set(hello, { autoAlpha: 0, y: 6, scale: 0.9 });
      pill.classList.remove('is-typing');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 72%', once: true },
        defaults: { ease: 'power2.out' },
      });
      tl.to(hello, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4 }, 0.15); // 1 "Hello." comes out FIRST
      tl.to(pill, { autoAlpha: 1, duration: 0.3 }, 0.95);                  // 2 then the dot pill appears…
      tl.call(() => pill.classList.add('is-typing'), null, 1.05);          //   …dots do ONE bounce round
      tl.to(pill, { width: natW, duration: 0.5, ease: 'power3.out' }, 2.0);           // 3 morph wider…
      tl.to(pill, { scaleY: 1.06, duration: 0.13, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 2.0);
      tl.to(dots, { autoAlpha: 0, duration: 0.2, onStart: () => pill.classList.remove('is-typing') }, 2.05);
      tl.to(ans, { autoAlpha: 1, duration: 0.35 }, 2.4);                   // 4 …reveal "How can we help today?" — STOP here
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="support" className="sup-sec sec-pad" ref={secRef}>
      <div className="wrap sup-grid">
        <div className="sup-left">
          <h2 className="sup-title" data-reveal>Real human support, at every step.</h2>
          <p className="sup-desc" data-reveal data-reveal-delay="1">Not bots, not dead-end FAQs. Real people who know the platform and are ready to help, whether you're a creator setting up your first link or a brand launching your biggest campaign.</p>
          <div className="sup-badge" data-reveal data-reveal-delay="2">
            <p className="sup-badge-lbl">95% of users rate our support as excellent.</p>
            <div className="sup-quote-card">
              <p className="sup-quote">“It's easy to reach customer service, and they fix things quickly.”</p>
              <p className="sup-verified">Verified Publisher</p>
            </div>
          </div>
        </div>
        <div className="sup-figure" data-reveal data-reveal-delay="1">
          <span className="sup-glow" aria-hidden="true" />
          <div className="sup-photo"><img src="media/figma/s6-support-2026.png" alt="An Involve Asia support specialist" loading="lazy" /></div>
          <div className="sup-hello" aria-hidden="true">Hello.</div>
          <div className="sup-pill" aria-hidden="true">
            <span className="sup-pill-dots"><i /><i /><i /></span>
            <span className="sup-pill-answer">How can we help today?</span>
          </div>
        </div>
      </div>
      <style>{`
        .sup-sec{ background:var(--warm-50); overflow:hidden; }
        .sup-grid{ display:grid; grid-template-columns:minmax(0,1.28fr) minmax(320px,438px); gap:clamp(32px,5vw,80px); align-items:center; }
        .sup-title{ color:var(--warm-900); font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.01em; }
        .sup-desc{ margin-top:16px; color:var(--warm-600); font-size:16px; line-height:1.5; max-width:560px; }
        .sup-badge{ margin-top:26px; }
        .sup-badge-lbl{ font:600 15px/1.4 var(--font-body); color:var(--warm-900); }
        .sup-quote-card{ margin-top:12px; background:#fff; border-radius:var(--r-lg); padding:16px 18px; box-shadow:0 10px 30px rgba(15,28,46,.06); max-width:540px; }
        .sup-quote{ font-style:normal; color:var(--warm-600); font-size:16px; line-height:1.5; }
        .sup-verified{ margin-top:6px; color:var(--ember); font-weight:700; font-size:14px; }
        /* hexagon portrait + chat bubbles */
        .sup-figure{ position:relative; width:100%; max-width:438px; margin-left:auto; aspect-ratio:379/427; }
        .sup-glow{ position:absolute; inset:-12% -10%; z-index:0; background:radial-gradient(52% 46% at 44% 66%, rgba(240,88,38,.16), rgba(240,88,38,0) 70%); }
        /* hexagon fill (behind the cut-out portrait) + the same hexagon mask so bg & photo clip together */
        .sup-photo{ position:absolute; inset:0; z-index:1; overflow:hidden;
          background:radial-gradient(60% 44% at 42% 78%, rgba(240,88,38,.18), rgba(240,88,38,0) 62%), linear-gradient(180deg,#ECECE6 0%,#F4F4F0 100%);
          -webkit-mask:url(media/figma/s6-hex-mask.svg) center/100% 100% no-repeat; mask:url(media/figma/s6-hex-mask.svg) center/100% 100% no-repeat; }
        .sup-photo img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center bottom; display:block; }
        .sup-hello, .sup-pill{ position:absolute; z-index:3; background:#fff; border-radius:var(--r-full); box-shadow:0 12px 30px rgba(15,28,46,.18); font-family:var(--font-body); color:var(--warm-900); }
        .sup-hello{ right:6%; top:36%; padding:9px 18px; font-weight:700; font-size:15px; }
        .sup-pill{ left:6%; top:48%; height:42px; display:flex; align-items:center; justify-content:center; padding:0 16px; overflow:hidden; transform-origin:left center; }
        .sup-pill-answer{ white-space:nowrap; font-weight:700; font-size:14px; letter-spacing:-.01em; }
        .sup-pill-dots{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center; gap:6px; opacity:0; }
        .sup-pill-dots i{ width:8px; height:8px; border-radius:50%; background:var(--warm-900); }
        .sup-pill.is-typing .sup-pill-dots i{ animation:supDot 0.84s ease-in-out 1 both; }
        .sup-pill.is-typing .sup-pill-dots i:nth-child(2){ animation-delay:.104s; }
        .sup-pill.is-typing .sup-pill-dots i:nth-child(3){ animation-delay:.208s; }
        @keyframes supDot{ 0%,62%,100%{ transform:translateY(0); } 30%{ transform:translateY(-46%); } }
        @media (max-width:860px){
          .sup-grid{ grid-template-columns:1fr; gap:40px; }
          .sup-desc, .sup-quote-card{ max-width:none; }
          /* image above the header when stacked */
          .sup-figure{ margin:0 auto; order:-1; }
          .sup-left{ order:0; }
        }
      `}</style>
    </section>
  );
}

/* ---------------- Section 7 — "Real results. Real growth." ----------------
   Dual-audience success-story slider. Publisher stories anchored left, Advertiser
   anchored right; upcoming cards peek toward the centre. Arrows advance BOTH stacks
   at once — the left stack slides left, the right stack slides right. */
const PUB_STORIES = [
  { photo: 's7-pub.png', big: '3', unit: ' properties', head: 'Bought from her affiliate earnings', tag: 'Facebook creator, Philippines', desc: 'How a mother of four built a new life from Facebook content with Involve.' },
  { photo: 's7-pub-travel.png', big: '$220K', unit: '+', head: 'In sales driven for one travel brand, Q4 2023', tag: 'Affiliate network, AI content', desc: 'How Flickstree scaled travel sales through Involve.' },
  { photo: 's7-pub-food.png', big: '$250', unit: ' earned', head: 'From just 10.5k followers, part-time', tag: 'Travel and food creator', desc: "Proof you don't need to be big to earn with Involve." },
];
const ADV_STORIES = [
  { photo: 's7-adv.png', big: '796', unit: '%', head: 'Increase in sales', tag: 'E-commerce', desc: 'How Big Bang Sales scaled through affiliate partnerships.' },
  { photo: 's7-adv-telco.png', big: '4.3', unit: 'x', head: 'Increase in sales', tag: 'Telco', desc: 'How Involve partners drove growth for TIME Internet.' },
  { photo: 's7-adv-health.png', big: '$160K', unit: '', head: 'In sales · 4,912 conversions', tag: 'Health & Wellness', desc: 'How a global health and wellness brand launched a CPS programme on Involve.' },
];
function RRChevron({ dir }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      {dir === 'l' ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}
/* Mobile stacked deck for the active tab: front card + two cards peeking behind it
   (3 total), swipe/arrows to advance. `tabKey` re-keys the front card so it re-animates
   both on tab switch and on advance. */
function MobileDeck({ stories, idx, onPrev, onNext, tabKey }) {
  const m = (n, k) => ((n % k) + k) % k;
  const N = stories.length;
  const front = stories[m(idx, N)];
  const p1 = stories[m(idx + 1, N)];
  const p2 = stories[m(idx + 2, N)];
  // horizontal swipe → prev/next (ignore mostly-vertical drags so the page can still scroll)
  const touch = React.useRef(null);
  const onTouchStart = (e) => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY, done: false }; };
  const onTouchMove = (e) => {
    const s = touch.current; if (!s || s.done) return;
    const t = e.touches[0], dx = t.clientX - s.x, dy = t.clientY - s.y;
    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy)) { s.done = true; (dx < 0 ? onNext : onPrev)(); }
  };
  const onTouchEnd = () => { touch.current = null; };
  return (
    <div className="rr-mstk" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div className="rr-mc rr-mc-2" aria-hidden="true"><StoryCard s={p2} /><span className="rr-mc-dim" /></div>
      <div className="rr-mc rr-mc-1" aria-hidden="true"><StoryCard s={p1} /><span className="rr-mc-dim" /></div>
      <div className="rr-mc rr-mc-0" key={tabKey + '·' + idx}><StoryCard s={front} /></div>
    </div>
  );
}
function StoryCard({ s }) {
  const photo = !!s.photo;
  return (
    <div className={'rr-card' + (photo ? ' rr-card-photo' : '')}>
      {photo && <img className="rr-card-bg" src={`media/figma/${s.photo}`} alt="" />}
      {photo && <span className="rr-card-scrim" aria-hidden="true" />}
      <div className="rr-inner">
        <div className="rr-top">
          <div className="rr-big">{s.big}<small>{s.unit}</small></div>
          <div className="rr-headline">{s.head}</div>
        </div>
        <div className="rr-foot">
          <div className="rr-tag">{s.tag}</div>
          <div className="rr-desc">{s.desc}</div>
        </div>
      </div>
    </div>
  );
}
function rrSlot(r, side) {
  const sgn = side === 'l' ? -1 : 1;
  let tx, sc, op, z;
  if (r === 0) { tx = 36; sc = 1; op = 1; z = 4; }
  else if (r === 1) { tx = 24; sc = 0.78; op = 1; z = 3; }
  else if (r === 2) { tx = 17; sc = 0.64; op = 0.26; z = 2; }
  else if (r < 0) { tx = 64; sc = 0.95; op = 0; z = 1; }
  else { tx = 13; sc = 0.5; op = 0; z = 1; }
  return { transform: `translate(-50%,-50%) translateX(${sgn * tx}cqw) scale(${sc})`, opacity: op, zIndex: z };
}
function SuccessSlider() {
  // Two unbounded indices, one per deck. Desktop moves both together (arrows / card-click);
  // mobile drives each independently. Slot positions are circular, so both loop forever.
  const [pi, setPi] = React.useState(0);
  const [ai, setAi] = React.useState(0);
  const [mtab, setMtab] = React.useState(0);   // mobile tabs: 0 = publishers, 1 = advertisers
  const stageRef = React.useRef(null);
  const prevPiRef = React.useRef(0);
  const prevAiRef = React.useRef(0);
  const initedRef = React.useRef(false);
  const mod = (n, m) => ((n % m) + m) % m;
  // GSAP owns positioning on desktop (reads each card's LIVE position → smooth from any state,
  // reliably re-triggers every step). Fallback (no GSAP / reduced-motion / mobile) uses inline slots.
  const useGsap = React.useState(() =>
    typeof window !== 'undefined' && !!window.gsap &&
    window.matchMedia('(min-width:821px)').matches && !prefersReduced()
  )[0];
  const advanceBoth = (delta) => { setPi((v) => v + delta); setAi((v) => v + delta); };  // desktop: both decks move together
  const mPrev = () => (mtab === 0 ? setPi((v) => v - 1) : setAi((v) => v - 1));            // mobile: advance the active tab's deck
  const mNext = () => (mtab === 0 ? setPi((v) => v + 1) : setAi((v) => v + 1));
  const pickCard = (d, N, st) => {
    if (d === 0) { window.location.href = st.href || '/success-stories/'; return; }
    if (d <= N - d) advanceBoth(d); else advanceBoth(-(N - d));   // shorter single ±1 step to the front
  };

  React.useLayoutEffect(() => {
    if (!useGsap) return;
    const gsap = window.gsap, stage = stageRef.current;
    if (!stage) return;
    const layout = (animate) => {
      const W = stage.getBoundingClientRect().width || 1;
      const u = W / 100;                                  // 1cqw in px
      const props = (d, side) => {
        const s = side === 'l' ? -1 : 1;
        if (d === 0) return { x: s * 36 * u, scale: 1, opacity: 1, zIndex: 4 };
        if (d === 1) return { x: s * 24 * u, scale: 0.78, opacity: 1, zIndex: 3 };
        return { x: s * 17 * u, scale: 0.64, opacity: 0.26, zIndex: 2 };
      };
      const exitX = (side) => (side === 'l' ? -1 : 1) * 62 * u;
      [['l', PUB_STORIES, pi, prevPiRef], ['r', ADV_STORIES, ai, prevAiRef]].forEach(([side, arr, cur, prevRef]) => {
        const N = arr.length;
        arr.forEach((_, idx) => {
          const el = stage.querySelector(`[data-rr="${side}${idx}"]`);
          if (!el) return;
          const d = mod(idx - cur, N), pd = mod(idx - prevRef.current, N);
          const t = props(d, side);
          if (!animate) { gsap.set(el, { xPercent: -50, yPercent: -50, x: t.x, scale: t.scale, opacity: t.opacity, zIndex: t.zIndex }); return; }
          gsap.killTweensOf(el);
          if (pd === 0 && d === N - 1) {                  // leaving (next): front → out → back
            gsap.timeline()
              .to(el, { x: exitX(side), scale: 1.04, opacity: 0, zIndex: 6, duration: 0.3, ease: 'power2.in' })
              .set(el, { x: t.x, scale: t.scale, zIndex: t.zIndex })
              .to(el, { opacity: t.opacity, duration: 0.28, ease: 'power2.out' });
          } else if (pd === N - 1 && d === 0) {           // arriving (prev): fade where it is → jump to exit → slide in
            gsap.timeline()
              .to(el, { opacity: 0, duration: 0.16, ease: 'power1.in' })
              .set(el, { x: exitX(side), scale: 1.04, zIndex: 6 })
              .to(el, { x: t.x, scale: t.scale, opacity: 1, duration: 0.44, ease: 'power3.out' });
          } else {                                        // normal move
            gsap.to(el, { x: t.x, scale: t.scale, opacity: t.opacity, zIndex: t.zIndex, duration: 0.55, ease: 'power2.inOut' });
          }
        });
      });
      prevPiRef.current = pi; prevAiRef.current = ai;
    };
    layout(initedRef.current);        // first run = instant place; after = animate
    initedRef.current = true;
    const onResize = () => { gsap.killTweensOf(stage.querySelectorAll('[data-rr]')); layout(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [pi, ai, useGsap]);
  return (
    <section id="results" className="rr-sec sec-pad">
      <div className="wrap">
        <div className="rr-head" data-reveal>
          <div>
            <h2 className="rr-title">Real results. Real growth.</h2>
            <p className="rr-sub">From the people and brands growing with Involve.</p>
          </div>
          <div className="rr-controls">
            <a href="/success-stories/" className="rr-seeall">See all success stories <Arrow /></a>
            <div className="rr-arrows">
              <button type="button" className="rr-arrow" onClick={() => advanceBoth(-1)} aria-label="Previous stories"><RRChevron dir="l" /></button>
              <button type="button" className="rr-arrow rr-next" onClick={() => advanceBoth(1)} aria-label="Next stories"><RRChevron dir="r" /></button>
            </div>
          </div>
        </div>
        {/* desktop: side labels above the shared deck */}
        <div className="rr-labels" data-reveal>
          <span className="rr-label">For <i>Publishers</i></span>
          <span className="rr-label adv">For <i>Advertisers</i></span>
        </div>
        <div className="rr-stage" data-reveal ref={stageRef}>
          {PUB_STORIES.map((st, idx) => {
            const N = PUB_STORIES.length, d = mod(idx - pi, N);                                 // circular slot 0..N-1
            const style = useGsap ? { cursor: 'pointer' } : { ...rrSlot(d, 'l'), cursor: 'pointer' };
            return <div className={'rr-slotpos' + (d === 0 ? ' rr-featured' : '')} data-rr={'l' + idx}
              style={style} key={'p' + idx} onClick={() => pickCard(d, N, st)}><StoryCard s={st} /></div>;
          })}
          {ADV_STORIES.map((st, idx) => {
            const N = ADV_STORIES.length, d = mod(idx - ai, N);
            const style = useGsap ? { cursor: 'pointer' } : { ...rrSlot(d, 'r'), cursor: 'pointer' };
            return <div className={'rr-slotpos' + (d === 0 ? ' rr-featured' : '')} data-rr={'r' + idx}
              style={style} key={'a' + idx} onClick={() => pickCard(d, N, st)}><StoryCard s={st} /></div>;
          })}
        </div>
        {/* mobile: Publisher / Advertiser tabs (+ arrows), then a stacked deck (front + 2 peeking) */}
        <div className="rr-mobile">
          <div className="rr-mtabrow">
            <div className="rr-tabs" role="tablist" aria-label="Success stories audience">
              <button type="button" role="tab" aria-selected={mtab === 0} className={'rr-tab' + (mtab === 0 ? ' on' : '')} onClick={() => setMtab(0)}>Publisher</button>
              <button type="button" role="tab" aria-selected={mtab === 1} className={'rr-tab' + (mtab === 1 ? ' on' : '')} onClick={() => setMtab(1)}>Advertiser</button>
            </div>
            <div className="rr-arrows rr-marrows2">
              <button type="button" className="rr-arrow" onClick={mPrev} aria-label="Previous story"><RRChevron dir="l" /></button>
              <button type="button" className="rr-arrow" onClick={mNext} aria-label="Next story"><RRChevron dir="r" /></button>
            </div>
          </div>
          <MobileDeck stories={mtab === 0 ? PUB_STORIES : ADV_STORIES} idx={mtab === 0 ? pi : ai} onPrev={mPrev} onNext={mNext} tabKey={mtab} />
          <a href="/success-stories/" className="rr-seeall rr-seeall-m">See all success stories <Arrow /></a>
        </div>
      </div>
      <style>{`
        .rr-sec{ background:var(--warm-50); overflow:hidden; }
        .rr-head{ display:flex; align-items:flex-start; justify-content:space-between; gap:24px; flex-wrap:wrap; }
        .rr-title{ font-size:clamp(24px,3vw,34px); line-height:1.02; letter-spacing:-.02em; }
        .rr-sub{ margin-top:12px; color:var(--warm-600); font-size:16px; }
        .rr-controls{ display:flex; flex-direction:column; align-items:flex-end; gap:16px; }
        /* text-link CTA, matching the brand directory's "Explore all offers" (.lb-explore) */
        .rr-seeall{ display:inline-flex; align-items:center; gap:8px; flex:0 0 auto;
          font:600 15px/1 var(--font-body); color:var(--warm-900); text-decoration:none; cursor:pointer; }
        .rr-seeall svg{ transition:transform .2s ease; }
        .rr-seeall:hover svg{ transform:translateX(3px); }
        .rr-seeall-m{ display:none; }
        .rr-arrows{ display:flex; gap:12px; }
        .rr-arrow{ width:40px; height:40px; border-radius:50%; border:1.5px solid var(--warm-300); background:#fff; color:var(--warm-400); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .15s, color .15s, border-color .15s; }
        .rr-arrow:not(:disabled){ background:var(--midnight); color:#fff; border-color:var(--midnight); }
        .rr-arrow:not(:disabled):hover{ opacity:.88; }
        .rr-arrow:disabled{ cursor:default; }
        .rr-labels{ display:flex; justify-content:space-between; margin-top:clamp(24px,3vh,36px); }
        .rr-label{ font:600 15px/1 var(--font-body); color:var(--warm-900); }
        .rr-label i{ font-style:normal; color:var(--ember); }
        .rr-label.adv i{ color:var(--midnight-light); }
        .rr-mobile{ display:none; }
        .rr-stage{ position:relative; height:40cqw; max-height:460px; min-height:340px; margin-top:clamp(12px,1.6vh,18px); container-type:inline-size; }
        /* Positioning is GSAP-driven on desktop (see SuccessSlider); NO CSS transition here —
           it would fight GSAP's per-frame transform writes. Fallback path sets inline slots. */
        .rr-slotpos{ position:absolute; left:50%; top:50%; width:30cqw; height:38cqw; max-width:362px; max-height:456px; will-change:transform, opacity; }
        .rr-card{ position:relative; width:100%; height:100%; border-radius:var(--r-lg); overflow:hidden; box-shadow:0 10px 24px rgba(15,28,46,.14); font-size:1.35cqw; background:#fff; transition:filter .4s ease; }
        /* Front card (featured) stays sharp; the 2nd/3rd queue cards blur back. */
        .rr-slotpos:not(.rr-featured) .rr-card{ filter:blur(4px); }
        .rr-card-bg{ position:absolute; inset:0; width:100%; height:100%; object-fit:fill; }
        .rr-card-scrim{ position:absolute; inset:0; background:linear-gradient(150deg, rgba(15,28,46,.36) 4%, rgba(15,28,46,.12) 55%, rgba(15,28,46,.5) 100%); }
        .rr-inner{ position:relative; z-index:1; height:100%; display:flex; flex-direction:column; justify-content:space-between; padding:1.5em; transition:opacity .4s ease; }
        .rr-slotpos:not(.rr-featured) .rr-inner{ opacity:0; }
        .rr-big{ font-family:var(--font-display); font-weight:800; font-size:2.9em; line-height:1.02; letter-spacing:-.02em; color:var(--warm-900); }
        .rr-big small{ font-size:1em; letter-spacing:-.02em; }
        .rr-headline{ margin-top:.3em; font:700 1.36em/1.15 var(--font-body); color:var(--warm-600); }
        .rr-tag{ font:700 1.05em/1.2 var(--font-body); color:var(--warm-900); }
        .rr-desc{ margin-top:.5em; font:500 1.05em/1.35 var(--font-body); color:var(--warm-600); }
        .rr-card-photo{ color:#fff; }
        .rr-card-photo .rr-big, .rr-card-photo .rr-headline, .rr-card-photo .rr-tag, .rr-card-photo .rr-desc{ color:#fff; }
        /* mobile: Publisher / Advertiser segmented tabs + arrows in one row, then a stacked deck */
        .rr-mtabrow{ display:flex; align-items:center; justify-content:space-between; gap:16px; margin-top:22px; }
        .rr-tabs{ display:inline-flex; gap:4px; background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-full); padding:4px; }
        .rr-tab{ border:none; background:none; cursor:pointer; padding:10px 18px; border-radius:var(--r-full); font:700 14px/1 var(--font-body); color:var(--warm-900); white-space:nowrap; transition:background .2s ease, color .2s ease; }
        .rr-tab.on{ background:var(--midnight); color:#fff; }
        .rr-marrows2{ gap:10px; flex:0 0 auto; }
        .rr-marrows2 .rr-arrow{ width:38px; height:38px; }
        .rr-mstk{ position:relative; margin-top:22px; aspect-ratio:362/380; touch-action:pan-y; }
        .rr-mc{ position:absolute; top:0; border-radius:var(--r-xl); overflow:hidden; }
        .rr-mc .rr-card{ font-size:15px; }
        .rr-mc .rr-big{ font-size:2.3em; }
        .rr-mc-0{ left:0; width:78%; height:100%; z-index:3; animation:rrSlideIn .45s cubic-bezier(.22,.61,.36,1) both; }
        .rr-mc-1{ right:8%; top:4%; width:70%; height:92%; z-index:2; }
        .rr-mc-2{ right:0; top:8%; width:64%; height:84%; z-index:1; }
        .rr-mc-dim{ position:absolute; inset:0; z-index:5; background:rgba(250,250,248,.34); }
        @keyframes rrSlideIn{ from{ opacity:0; transform:translateX(6%); } to{ opacity:1; transform:none; } }
        @media (prefers-reduced-motion:reduce){ .rr-mc-0{ animation:none; } }
        @media (max-width:820px){
          .rr-controls{ display:none; }
          .rr-labels{ display:none; }
          .rr-stage{ display:none; }
          .rr-mobile{ display:block; }
          /* show the See-all link under the card slider on mobile */
          .rr-seeall-m{ display:inline-flex; margin-top:clamp(20px,3.2vh,30px); }
        }
      `}</style>
    </section>
  );
}

/* ---------------- From the Involve blog — placeholder cards (auto-featured from WordPress) ----------------
   Header + "Read the blog" link + Publisher/Advertiser tabs, then the 3 MOST-RECENT posts for the active
   audience. Cards are PLACEHOLDERS: at dev time the homepage auto-surfaces the newest posts from the CMS
   (per audience, most recent first). Each card = category tag + title + read time + "Read more".
   Mobile mirrors the "Real results" section: tabs above the scroller, "Read the blog" CTA below it. */
const BLOG_PUB = [
  { tone: 'pub', tag: 'For Publishers', title: 'How to promote affiliate links on TikTok', read: '5 min read', href: '/blog/' },
  { tone: 'pub', tag: 'For Publishers', title: 'Express Withdrawal, explained', read: '4 min read', href: '/blog/' },
  { tone: 'pub', tag: 'For Publishers', title: 'What is EPC in affiliate marketing?', read: '5 min read', href: '/blog/' },
];
const BLOG_ADV = [
  { tone: 'adv', tag: 'For Advertisers', title: 'How to launch your first affiliate program', read: '6 min read', href: '/blog/' },
  { tone: 'adv', tag: 'For Advertisers', title: 'Choosing the right commission structure', read: '6 min read', href: '/blog/' },
  { tone: 'adv', tag: 'For Advertisers', title: 'Measuring ROI across your publisher network', read: '7 min read', href: '/blog/' },
];
function BlogSection() {
  const [btab, setBtab] = React.useState(0); // 0 = Publisher, 1 = Advertiser
  const posts = btab === 0 ? BLOG_PUB : BLOG_ADV;
  return (
    <section id="blog" className="bg-sec sec-pad">
      <div className="wrap">
        <div className="bg-head" data-reveal>
          <div className="bg-headtext">
            <h2 className="bg-title">From the Involve blog.</h2>
            <p className="bg-sub">Fresh tips, playbooks, and insights, whichever side you're on.</p>
          </div>
          <div className="bg-controls">
            <a href="/blog/" className="bg-readall">Read the blog <Arrow /></a>
            <div className="bg-tabs" role="tablist" aria-label="Blog audience">
              <button type="button" role="tab" aria-selected={btab === 0} className={'bg-tab' + (btab === 0 ? ' on' : '')} onClick={() => setBtab(0)}>Publisher</button>
              <button type="button" role="tab" aria-selected={btab === 1} className={'bg-tab' + (btab === 1 ? ' on' : '')} onClick={() => setBtab(1)}>Advertiser</button>
            </div>
          </div>
        </div>
        <div className="bg-grid" key={btab}>
          {posts.map((p, i) => (
            <a key={i} href={p.href} className="bg-card">
              <span className={'bg-card-tag ' + p.tone}>{p.tag}</span>
              <h3 className="bg-card-title">{p.title}</h3>
              <span className="bg-card-meta">
                <span className="bg-card-time">{p.read}</span>
                <span className="bg-card-more">Read more <Arrow s={15} /></span>
              </span>
            </a>
          ))}
        </div>
        <a href="/blog/" className="bg-readall-m">Read the blog <Arrow /></a>
      </div>
      <style>{`
        .bg-sec{ background:var(--warm-50); }
        .bg-head{ display:flex; align-items:flex-start; justify-content:space-between; gap:16px 32px; flex-wrap:wrap; }
        .bg-title{ font-size:clamp(24px,3vw,34px); line-height:1.04; letter-spacing:-.02em; }
        .bg-sub{ margin-top:12px; color:var(--warm-600); font-size:16px; line-height:1.4; max-width:560px; }
        .bg-controls{ display:flex; flex-direction:column; align-items:flex-end; gap:14px; padding-top:4px; }
        .bg-readall{ display:inline-flex; align-items:center; gap:8px; font:600 15px/1 var(--font-body); color:var(--warm-900); text-decoration:none; cursor:pointer; }
        .bg-readall svg{ transition:transform .2s ease; }
        .bg-readall:hover svg{ transform:translateX(3px); }
        .bg-tabs{ display:inline-flex; gap:4px; background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-full); padding:4px; }
        .bg-tab{ border:none; background:none; cursor:pointer; padding:8px 18px; border-radius:var(--r-full); font:600 13px/1 var(--font-body); color:var(--warm-900); white-space:nowrap; transition:background .18s ease, color .18s ease; }
        .bg-tab.on{ background:var(--midnight); color:#fff; }
        .bg-readall-m{ display:none; align-items:center; gap:8px; font:600 14px/1 var(--font-body); color:var(--warm-900); text-decoration:none; }
        .bg-readall-m svg{ transition:transform .2s ease; }
        .bg-readall-m:hover svg{ transform:translateX(3px); }
        .bg-grid{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:16px; margin-top:clamp(28px,3.6vh,44px); }
        .bg-card{ position:relative; min-width:0; aspect-ratio:304/202; border:1px solid #d2d2cc; border-radius:var(--r-lg); background:#fff; overflow:hidden;
          display:flex; flex-direction:column; gap:12px; padding:clamp(16px,1.4vw,22px); text-decoration:none;
          transition:transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s ease, border-color .22s ease; }
        .bg-card:hover{ box-shadow:var(--shadow-lg); border-color:#c4c4bd; }
        .bg-card-tag{ align-self:flex-start; display:inline-flex; padding:5px 11px; border-radius:var(--r-full); font:700 11px/1 var(--font-body); letter-spacing:.01em; }
        .bg-card-tag.pub{ background:rgba(240,88,38,.10); color:var(--ember); }
        .bg-card-tag.adv{ background:rgba(61,90,128,.13); color:var(--midnight-light); }
        .bg-card-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(16px,1.25vw,19px); line-height:1.3; letter-spacing:-.01em; color:var(--warm-900);
          display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
        .bg-card-meta{ margin-top:auto; display:flex; align-items:center; justify-content:space-between; gap:10px; }
        .bg-card-time{ font:400 13px/1 var(--font-body); color:var(--warm-400); }
        .bg-card-more{ display:inline-flex; align-items:center; gap:6px; font:600 13px/1 var(--font-body); color:var(--warm-900); white-space:nowrap; }
        .bg-card-more svg{ transition:transform .2s ease; }
        .bg-card:hover .bg-card-more svg{ transform:translateX(3px); }
        @media (max-width:1000px){ .bg-grid{ grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; } }
        @media (max-width:560px){
          .bg-head{ gap:14px; }
          /* mobile (like "Real results"): tabs go above the scroller, "Read the blog" goes below it */
          .bg-controls{ flex-direction:row; align-items:center; justify-content:flex-start; width:100%; padding-top:0; margin-top:4px; }
          .bg-controls .bg-readall{ display:none; }
          .bg-tab{ padding:10px 18px; font-size:14px; }
          .bg-readall-m{ display:inline-flex; margin-top:clamp(18px,3vh,26px); }
          /* single-row horizontal scroller: 2 full + partial peek, full-bleed to the screen edges */
          .bg-grid{ display:grid; grid-auto-flow:column; grid-template-columns:none; grid-template-rows:auto;
            grid-auto-columns:clamp(126px,39vw,156px); gap:14px; overflow-x:auto; overscroll-behavior-x:contain;
            scroll-snap-type:x proximity; -webkit-overflow-scrolling:touch; scrollbar-width:none;
            margin-left:-20px; margin-right:-20px; padding:0 20px 4px; scroll-padding-left:20px; }
          .bg-grid::-webkit-scrollbar{ display:none; }
          .bg-card{ scroll-snap-align:start; aspect-ratio:auto; min-height:170px; gap:9px; }
          .bg-card-title{ -webkit-line-clamp:3; font-size:15px; }
          .bg-card-meta{ flex-direction:column; align-items:flex-start; gap:6px; }
        }
      `}</style>
    </section>
  );
}

/* ---------------- Stat band (concept-8) — standalone section ----------------
   Centered caption + a 4-up row of headline stats that count up when scrolled into view. */
const STAT_BAND = [
  { to: 1000000, fmt: (v) => Math.round(v).toLocaleString() + '+', label: 'publishers' },
  { to: 270, fmt: (v) => '$' + Math.round(v) + 'M+', label: 'commissions paid' }, // confirmed: $270M+
  { to: 3.2, fmt: (v) => '$' + v.toFixed(1) + 'B+', label: 'sales generated' },
  { to: 500, fmt: (v) => Math.round(v) + '+', label: 'brands' },
];
function StatCount({ to, fmt }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced() || !('IntersectionObserver' in window)) { el.textContent = fmt(to); return; }
    let raf = 0, started = false, tid = 0;
    const run = () => {
      const dur = 1500, t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        el.textContent = fmt(to * (1 - Math.pow(1 - p, 3)));               // easeOutCubic
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const start = () => { if (started) return; started = true; run(); io.disconnect(); if (tid) clearTimeout(tid); };
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) start(); }, { threshold: 0.45 });
    io.observe(el);
    // Fallback: if the band is already within the viewport shortly after mount (e.g. above
    // the fold on a tall screen) and the observer hasn't fired, run anyway so it never sticks at 0.
    tid = setTimeout(() => { const t = el.getBoundingClientRect().top; if (t < window.innerHeight && t > -el.offsetHeight) start(); }, 1200);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); if (tid) clearTimeout(tid); };
  }, [to, fmt]);
  return <span ref={ref} className="sb-num">{fmt(0)}</span>;
}
function StatBand() {
  return (
    <section id="impact" className="sb-sec">
      <div className="wrap">
        <p className="sb-cap" data-reveal>This is what growing together looks like, since 2014.</p>
        <div className="sb-row">
          {STAT_BAND.map((s, i) => (
            <div className="sb-item" key={s.label} data-reveal data-reveal-delay={i + 1}>
              <StatCount to={s.to} fmt={s.fmt} />
              <span className="sb-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .sb-sec{ background:var(--warm-50); padding:clamp(48px,7vh,84px) 0; }
        .sb-cap{ text-align:center; color:var(--warm-600); font-size:16px; }
        .sb-row{ display:grid; grid-template-columns:repeat(4,1fr); gap:24px; margin-top:clamp(28px,4vh,48px); }
        .sb-item{ display:flex; flex-direction:column; align-items:center; text-align:center; gap:8px; }
        .sb-num{ font-family:var(--font-display); font-weight:800; font-size:clamp(30px,3.6vw,48px); line-height:1; letter-spacing:-.02em; color:var(--warm-900); }
        .sb-lbl{ color:var(--warm-600); font-size:15px; }
        @media (max-width:680px){ .sb-row{ grid-template-columns:repeat(2,1fr); gap:34px 24px; } }
      `}</style>
    </section>
  );
}

/* Wrapper: pinned scroll choreography on desktop w/ GSAP; static composed fallback otherwise. */
function HexFinale(props) {
  // concept-8: simplified — the pinned scroll-scrubbed morph is retired; render the static
  // "Pick your side" (the stat band is now its own section, <StatBand/>). HexFinaleAnimated
  // is kept below (unused) for reference/revival.
  return <HexFinaleStatic {...props} />;
}
/* Pinned, scroll-scrubbed hexagon finale: connected mark → stats count up → drift →
   split → flip → photo-fill → honeycomb + "Pick your side" + cards bloom. */
// honeycomb greys tessellated around the two photo hexes — [asset, xpx, ypx] offsets from the hex centre (w≈190,h≈214)
// spaced honeycomb around the photo hexes (gaps between every tile), Figma arrangement — [asset, xpx, ypx]
const HFA_HONEY = [['g1', 0, -225], ['g3', 268, -225], ['g1', 536, 0], ['g3', 0, 225], ['g2', -268, 225], ['g2', -536, 225]];
// Figma's rounded pointy-top hexagon path; non-scaling stroke keeps the outline the
// same weight at every hex size, and the bezier corners match the photo hexes' rounding.
const HexOut = ({ id }) => (
  <svg className="hfa-out" viewBox="24 3 320 363" preserveAspectRatio="none" fill="none" aria-hidden="true">
    <path d="M171.782 14.1611C179.522 9.68742 189.062 9.68738 196.803 14.1611L325.405 88.4932C333.134 92.9606 337.895 101.211 337.895 110.138V258.862C337.894 267.789 333.134 276.039 325.405 280.507L196.803 354.839C189.062 359.313 179.522 359.313 171.782 354.839L43.1797 280.507C35.4507 276.039 30.6905 267.789 30.6904 258.862V110.138C30.6905 101.211 35.4507 92.9606 43.1797 88.4932L171.782 14.1611Z"
      stroke={`url(#${id})`} strokeWidth="16.8" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    <defs><linearGradient id={id} x1="337" y1="30" x2="30" y2="345" gradientUnits="userSpaceOnUse">
      <stop offset="0.5" stopColor="#111110" /><stop offset="1" stopColor="#D2D2CC" /></linearGradient></defs>
  </svg>
);
function HexFinaleAnimated({ emphasis = 'equal', hex = 3 }) {
  const wrapRef = React.useRef(null), stageRef = React.useRef(null);
  const aRef = React.useRef(null), bRef = React.useRef(null);
  const aOut = React.useRef(null), bOut = React.useRef(null), aPh = React.useRef(null), bPh = React.useRef(null);
  const statsRef = React.useRef(null), combRef = React.useRef(null), headRef = React.useRef(null);
  const cLRef = React.useRef(null), cRRef = React.useRef(null);
  const n0 = React.useRef(null), n1 = React.useRef(null), n2 = React.useRef(null), n3 = React.useRef(null);
  React.useEffect(() => {
    const gsap = window.gsap, ST = window.ScrollTrigger;
    if (!gsap || !ST) return;
    gsap.registerPlugin(ST);
    const ctx = gsap.context(() => {
      const A = aRef.current, B = bRef.current;
      const stats = statsRef.current, comb = combRef.current, head = headRef.current, cL = cLRef.current, cR = cRRef.current;
      const combHexes = comb.children;
      const blurb = stats.querySelector('.hfa-blurb'), since = stats.querySelector('.hfa-since');
      const numStats = stats.querySelectorAll('.hfa-stat');
      // start as the connected mark: A big centred, B small upper-right — both OUTLINE (photo hidden)
      gsap.set([A, B], { left: '50%', top: '50%', xPercent: -50, yPercent: -50, rotationY: 0, force3D: true });
      gsap.set(A, { width: 230, height: 259, x: 0, y: 0 });
      gsap.set(B, { width: 108, height: 122, x: 108, y: -68 });
      gsap.set([aPh.current, bPh.current], { autoAlpha: 0 });
      gsap.set([blurb, since], { autoAlpha: 0 });
      gsap.set(numStats, { autoAlpha: 0 });
      gsap.set(combHexes, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.85 });
      gsap.set(head, { autoAlpha: 0, y: 40, xPercent: -50 });
      gsap.set([cL, cR], { autoAlpha: 0, y: 40, yPercent: -50 });
      const c = { a: 0, b: 0, cc: 0, d: 0 };
      const setNums = () => {
        if (n0.current) n0.current.textContent = Math.round(c.a).toLocaleString() + '+';
        if (n1.current) n1.current.textContent = '$' + Math.round(c.b) + 'M+';
        if (n2.current) n2.current.textContent = '$' + c.cc.toFixed(1) + 'B+';
        if (n3.current) n3.current.textContent = Math.round(c.d).toLocaleString() + '+';
      };
      setNums();
      // Count up in REAL TIME (not scrubbed) the moment the numbers appear, so it auto-runs
      // to the final figures without the user inch-scrolling to drive it. Fires once.
      let counted = false;
      const countUp = () => {
        if (counted) return; counted = true;
        gsap.to(c, { a: 1000000, b: 270, cc: 3.2, d: 4000, duration: 1.0, ease: 'power2.out', onUpdate: setNums });
      };
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      tl.from([A, B], { autoAlpha: 0, y: '+=50', duration: 0.5 }, 0);                                  // 1 connected mark in
      tl.to([blurb, since], { autoAlpha: 1, duration: 0.45 }, 0.55);                                   // 2 context lines FIRST
      tl.to(numStats, { autoAlpha: 1, duration: 0.3, stagger: 0.06 }, 1.05);                           // 3 numbers jump in
      tl.call(countUp, null, 1.1);                                                                     //   → auto count-up (real time)
      tl.to([blurb, since, ...numStats], { autoAlpha: 0, y: -24, duration: 0.5 }, 2.25);               // 4 all out
      // 5 MORPH: the two mark hexes grow/shrink to equal, split to final spots, flip, outline→photo
      tl.to(A, { width: 247, height: 278, x: -134, y: 0, duration: 0.85 }, 2.55);
      tl.to(B, { width: 247, height: 278, x: 134, y: 0, duration: 0.85 }, 2.55);
      tl.to([A, B], { rotationY: 360, duration: 0.95 }, 2.7);
      tl.to([aOut.current, bOut.current], { autoAlpha: 0, duration: 0.4 }, 3.15);                       //   outline out
      tl.to([aPh.current, bPh.current], { autoAlpha: 1, duration: 0.4 }, 3.15);                         //   photo in (fill)
      tl.to(combHexes, { autoAlpha: 0.6, scale: 1, duration: 0.7, stagger: 0.05 }, 3.5);              // 6 honeycomb comb
      tl.to(head, { autoAlpha: 1, y: 0, duration: 0.5 }, 3.55);
      tl.to([cL, cR], { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12 }, 3.75);
      tl.to({}, { duration: 1.6 });                                                                    // 7 HOLD on the final CTA so users dwell before the footer
      ST.create({
        trigger: wrapRef.current, pin: stageRef.current, start: 'top top', end: '+=3315',
        scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true, animation: tl,
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={wrapRef} id="cta" className="hfa">
      <div ref={stageRef} className="hfa-stage">
        <div className="hfa-scene">
        <div ref={combRef} className="hfa-comb" aria-hidden="true">
          {HFA_HONEY.map(([g, x, y], i) => <img key={i} className="hfa-combhex" src={`media/figma/s9-hex-${g}.png`} alt="" style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }} />)}
        </div>
        <div ref={aRef} className="hfa-hex"><span ref={aOut} className="hfa-outwrap"><HexOut id="hgA" /></span><img ref={aPh} className="hfa-photo" src="media/figma/s9-hex-pub.webp" alt="A publisher creating content" style={{ transform: 'scaleX(-1)' }} /></div>
        <div ref={bRef} className="hfa-hex"><span ref={bOut} className="hfa-outwrap"><HexOut id="hgB" /></span><img ref={bPh} className="hfa-photo" src="media/figma/s9-hex-adv.webp" alt="An advertiser growing their brand" /></div>
        <div ref={statsRef} className="hfa-stats" aria-hidden="true">
          <div className="hfa-stat s1"><span className="hfa-num" ref={n0}>1,000,000+</span><span className="hfa-lbl">publishers</span></div>
          <p className="hfa-blurb">Behind every number,<br />a creator earning and a brand growing.</p>
          <div className="hfa-stat s2"><span className="hfa-num" ref={n1}>$270M+</span><span className="hfa-lbl">Commissions paid</span></div>
          <div className="hfa-stat s3"><span className="hfa-num" ref={n2}>$3.2B+</span><span className="hfa-lbl">Sales Generated</span></div>
          <div className="hfa-stat s4"><span className="hfa-num" ref={n3}>4,000+</span><span className="hfa-lbl">advertisers</span></div>
          <div className="hfa-since"><span>Since </span><strong>2014</strong></div>
        </div>
        <h2 ref={headRef} className="hfa-head">Pick your side and grow with us.</h2>
        <div ref={cLRef} className="hfa-card hfa-card-l">
          <span className="hfa-kick">Creators. Affiliates. Technology partners.</span>
          <h3 className="hfa-ct">I'm a<br />Publisher</h3>
          <p className="hfa-cd">Promote brands you love. Turn your audience or traffic into income.</p>
          <a href="/partners/" className="btn btn-primary">Start Earning <Arrow /></a>
        </div>
        <div ref={cRRef} className="hfa-card hfa-card-r">
          <span className="hfa-kick adv">Brands. Retailers. Enterprises.</span>
          <h3 className="hfa-ct">I'm an<br />Advertiser</h3>
          <p className="hfa-cd">Grow your sales with the right publishers. Pay only for results.</p>
          <a href="/advertisers/" className="btn btn-advertiser">Grow My Brand <Arrow /></a>
        </div>
        </div>
      </div>
      <style>{`
        .hfa{ background:var(--warm-50); position:relative; padding-bottom:clamp(72px,12vh,160px); }
        .hfa-stage{ position:relative; height:100vh; overflow:hidden; }
        /* shift the whole composition down (clear of the nav) and scale slightly so the bottom hexes still fit */
        .hfa-scene{ position:absolute; inset:0; transform-origin:50% 50%; transform:translateY(7%) scale(0.9); }
        .hfa-hex{ position:absolute; z-index:5; }
        .hfa-outwrap, .hfa-photo{ position:absolute; inset:0; width:100%; height:100%; }
        .hfa-out{ width:100%; height:100%; display:block; overflow:visible; }
        .hfa-photo{ object-fit:fill; }
        /* stats */
        .hfa-stats{ position:absolute; inset:0; pointer-events:none; }
        .hfa-num{ display:block; font-family:var(--font-body); font-weight:800; color:var(--warm-900); line-height:1; letter-spacing:-.02em; }
        .hfa-lbl{ display:block; margin-top:6px; font:500 20px/1.2 var(--font-body); color:var(--warm-900); }
        .hfa-stat{ position:absolute; transform:translateY(-50%); }
        .hfa-stat .hfa-num{ font-size:72px; }
        .hfa-stat.s2 .hfa-num, .hfa-stat.s3 .hfa-num{ font-size:52px; }
        .hfa-stat.s1{ left:3%; top:24%; } .hfa-stat.s2{ left:3%; top:50%; }
        .hfa-stat.s3{ right:3%; top:50%; text-align:right; } .hfa-stat.s4{ right:3%; top:76%; text-align:right; }
        .hfa-blurb{ position:absolute; right:3%; top:24%; transform:translateY(-50%); text-align:right; font:800 20px/1.4 var(--font-display); color:var(--warm-900); }
        .hfa-since{ position:absolute; left:3%; top:76%; transform:translateY(-50%); font:700 30px/1 var(--font-body); color:var(--warm-900); }
        .hfa-since strong{ color:var(--ember); }
        /* honeycomb (Figma grey hex tiles) */
        .hfa-comb{ position:absolute; inset:0; z-index:0; pointer-events:none; }
        .hfa-combhex{ position:absolute; width:247px; height:auto; }
        /* headline + cards */
        .hfa-head{ position:absolute; left:50%; top:15%; width:auto; max-width:96vw; white-space:nowrap; text-align:center; z-index:4;
          font-size:clamp(26px,3.4vw,50px); line-height:1.05; letter-spacing:-.01em; }
        .hfa-card{ position:absolute; top:50%; width:min(300px,24vw); display:flex; flex-direction:column; gap:12px; z-index:4; }
        .hfa-card-l{ left:5%; align-items:flex-start; text-align:left; }
        .hfa-card-r{ right:5%; align-items:flex-end; text-align:right; }
        .hfa-kick{ font:500 14px/1.3 var(--font-body); color:var(--ember); opacity:.78; }
        .hfa-kick.adv{ color:var(--midnight-light); }
        .hfa-ct{ font:700 clamp(24px,2.4vw,32px)/1.05 var(--font-body); color:var(--warm-900); letter-spacing:-.01em; }
        .hfa-cd{ font:400 16px/1.45 var(--font-body); color:var(--warm-900); opacity:.72; }
      `}</style>
    </section>
  );
}

/* ---------------- Section 8 + 9 — Stat band + "Pick your side" hexagon finale ----------------
   Stat band (1M / $270M / $15B / 4,000, Since 2014) around a connected-hex mark,
   flowing into the hexagon CTA. Pass 1: composed layout, live counters, reveals.
   Pass 2 (below, in effect): scroll-scrubbed split → flip → fill choreography. */
const HEX_CLIP = 'polygon(50% 2%, 91.57% 26%, 91.57% 74%, 50% 98%, 8.43% 74%, 8.43% 26%)';
function useCounter(ref, to, fmt) {
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const gsap = window.gsap;
    const set = (v) => { el.textContent = fmt(v); };
    if (!gsap || prefersReduced()) { set(to); return; }
    const obj = { v: 0 };
    const st = window.ScrollTrigger;
    const tween = gsap.to(obj, { v: to, duration: 1.6, ease: 'power2.out', paused: true, onUpdate: () => set(obj.v) });
    set(0);
    let trig;
    if (st) { trig = st.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => tween.play() }); }
    else { tween.play(); }
    return () => { tween.kill(); trig && trig.kill(); };
  }, []);
}
function StatBig({ to, fmt, size }) {
  const ref = React.useRef(null);
  useCounter(ref, to, fmt);
  return <span className="hf-num" ref={ref} style={{ fontSize: size }}>{fmt(0)}</span>;
}
function HexFinaleStatic({ emphasis = 'equal', hex = 3 }) {
  // Honeycomb decoration around the two photo hexes — EXACT placement copied from the previous
  // (backup) animated finale's HFA_HONEY: [asset, xpx, ypx] centre offsets, 247px hex tiles.
  const HF_HONEY = [
    ['g1', 0, -225], ['g3', 268, -225], ['g1', 536, 0],
    ['g3', 0, 225], ['g2', -268, 225], ['g2', -536, 225],
  ];
  return (
    <section id="cta" className="hf">
      {/* ---- Hexagon "Pick your side" CTA ---- */}
      <div className="hf-cta">
        <h2 className="hf-head" data-reveal>Pick your side and grow with us.</h2>
        <div className="hf-scene">
          <div className="hf-honey" aria-hidden="true">
            {HF_HONEY.map(([g, x, y], i) => (
              <img key={i} className="hf-combhex" src={`media/figma/s9-hex-${g}.png`} alt="" style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }} />
            ))}
          </div>
          {/* mobile-only kickers, placed ABOVE the photos (the desktop kickers stay inside the cards) */}
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
        /* stat band */
        .hf-stats{ position:relative; display:grid; grid-template-columns:1fr auto 1fr; grid-template-rows:auto auto auto; align-items:center; gap:24px 40px; padding:clamp(56px,9vh,120px) 0 clamp(40px,6vh,72px); }
        .hf-num{ font-family:var(--font-body); font-weight:800; color:var(--warm-900); line-height:1; letter-spacing:-.02em; display:block; }
        .hf-lbl{ display:block; margin-top:6px; font:500 22px/1.2 var(--font-body); color:var(--warm-900); }
        .hf-stat.hf-right{ text-align:right; }
        .hf-s1{ grid-column:1; grid-row:1; }
        .hf-blurb{ grid-column:3; grid-row:1; text-align:right; align-self:start; font:800 22px/1.4 var(--font-display); color:var(--warm-900); }
        .hf-s2{ grid-column:1; grid-row:2; }
        .hf-mark{ grid-column:2; grid-row:2; position:relative; width:230px; height:230px; }
        .hf-s3{ grid-column:3; grid-row:2; }
        .hf-s4{ grid-column:3; grid-row:3; }
        .hf-since{ grid-column:1; grid-row:3; font:700 32px/1 var(--font-body); color:var(--warm-900); }
        .hf-since strong{ color:var(--ember); }
        /* "Pick your side" hex CTA */
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
        .hf-kick-m{ display:none; } /* mobile-only duplicate kicker; shown ≤900px */
        .hf-ct{ font:700 clamp(24px,2.4vw,32px)/1.05 var(--font-body); color:var(--warm-900); letter-spacing:-.01em; }
        .hf-cd{ font:400 16px/1.45 var(--font-body); color:var(--warm-900); opacity:.72; max-width:250px; }
        .hf-card-adv .hf-cd{ margin-left:auto; }
        @media (max-width:900px){
          .hf-cta{ padding:clamp(24px,4vh,44px) 20px clamp(40px,6vh,64px); }
          .hf-head{ white-space:normal; top:0; text-align:left; margin:clamp(16px,3.5vh,30px) 0 clamp(22px,4.5vh,40px); font-size:clamp(22px,6.4vw,30px); }
          /* two columns, each stacked: kicker → photo → heading → desc → CTA.
             publisher (col1) left-aligned, advertiser (col2) right-aligned. */
          .hf-scene{ height:auto; display:grid; grid-template-columns:1fr 1fr; grid-template-rows:auto auto auto;
            column-gap:clamp(14px,4vw,26px); row-gap:clamp(9px,1.8vh,13px); align-items:start; width:100%; max-width:500px; margin:0 auto; }
          .hf-honey{ display:none; }
          .hf-card .hf-kick{ display:none; }          /* hide the in-card (desktop) kicker on mobile */
          .hf-cd-more{ display:none; }                /* shorter mobile description */
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

/* ---------------- How it works — Concept 3 design: alternating step rows ----------------
   Ported from Concept 3's "#how" section: centred head, four alternating text|video rows —
   oversized warm-300 step numeral, display title, short copy, and the step's looping clip
   in a rounded, warm-100 bordered box. Uses Concept 3's real step videos (media/video/). */
const STEPS = [
  { n: '01', t: 'Create',   d: 'List your brand or sign up as a publisher in minutes. Live the same day.',   video: 'media/video/create%20step%20video.mov' },
  { n: '02', t: 'Automate', d: 'We match the right partners to the right campaigns. No manual outreach.',    video: 'media/video/automate%20step%20video.mov' },
  { n: '03', t: 'Track',    d: 'Clicks, conversions, and commissions update in real-time, transparently.',   video: 'media/video/track%20step%20video.mov' },
  { n: '04', t: 'Get Paid', d: 'Brands pay for results. Partners get fast, local-currency payouts.',         video: 'media/video/payment%20step%20video.mov' },
];
function HowItWorks({ hex = 3 }) {
  const secRef = React.useRef(null);
  // Concept 3 autoplays all four clips; this keeps the identical look while only letting
  // clips decode when on screen. rAF-throttled scroll check (same proven pattern as the
  // rest of the bundle) rather than IntersectionObserver — the repeated ticks also
  // self-heal the pending-play/pause AbortError race under smooth (Lenis) scrolling.
  React.useEffect(() => {
    const vids = Array.from(secRef.current.querySelectorAll('video'));
    if (!vids.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      vids.forEach((v) => {
        const r = v.getBoundingClientRect();
        const inView = r.top < vh + 80 && r.bottom > -80;
        if (inView) { if (v.paused) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } }
        else if (!v.paused) v.pause();
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={secRef} id="how" style={{ background: 'var(--surface)', paddingTop: 'clamp(56px,8vw,110px)', paddingBottom: 'clamp(72px,13vh,168px)' }}>{/* rides the global surface (= warm-50 until the stats transition begins) so there's no hard seam where the darkening starts */}
      <div className="wrap">
        <div className="how-head" data-reveal>
          <h2>Involve scales &amp; automates your partnerships</h2>
          <p>Stop reaching out to partners one by one, manually. Involve runs the busywork so both sides can focus on growth.</p>
        </div>
        {STEPS.map((s, i) => (
          <div key={s.t} className={'how-step' + (i % 2 ? ' rev' : '')} data-reveal>
            <div className="how-step-body">
              <div className="how-num" aria-hidden="true">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
            <div className="how-media"><video src={s.video} muted loop playsInline preload="metadata"></video></div>
          </div>
        ))}
      </div>
      <style>{`
        /* ---- Concept 3 "#how" design: centred head + alternating text|video rows ---- */
        .how-head{text-align:center; max-width:960px; margin:0 auto clamp(24px,4vh,44px);}
        .how-head h2{font-family:var(--font-display); font-weight:800; line-height:1.06; letter-spacing:-.02em;
          font-size:clamp(28px,3.6vw,44px); margin:0; color:var(--warm-900);}
        .how-head p{margin:12px auto 0; font-size:clamp(14px,1.05vw,16px); color:var(--warm-400); line-height:1.6; max-width:60ch;}
        @media (min-width:861px){ .how-head h2{white-space:nowrap;} }
        .how-step{display:grid; grid-template-columns:1fr 1fr; gap:clamp(28px,6vw,88px); align-items:center;
          padding:clamp(34px,5vw,60px) 0;}
        .how-step.rev .how-step-body{order:2;}
        .how-num{font-family:var(--font-display); font-weight:800; font-size:clamp(54px,7.2vw,96px); line-height:.8;
          color:var(--warm-300); margin-bottom:12px;}
        .how-step h3{font-family:var(--font-display); font-weight:800; line-height:1.06; letter-spacing:-.02em;
          font-size:clamp(30px,3.9vw,46px); margin:32px 0 56px; color:var(--warm-900);}
        .how-step p{color:var(--warm-400); max-width:38ch; font-size:15px; margin:0;}
        .how-media{border-radius:var(--r-xl); background:var(--warm-100); border:1px solid var(--warm-200); overflow:hidden; position:relative;}
        .how-media video{display:block; width:100%; height:auto;}
        @media (max-width:860px){
          .how-step{grid-template-columns:1fr; gap:20px;}
          .how-step.rev .how-step-body{order:0;}
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { TwoDoor, Hero, TrustStrip, OffersSection, HowItWorks });


/* ===== ia-sections2.jsx ===== */
// ia-sections2.jsx — Stats (count-up, never 0), Blog slider, Final CTA, Footer.

/* ---------------- Stats ----------------
   Count-up never starts at 0 (brief §2.4). Starts at ~60% of the real value
   and is reduced-motion aware. Real anchors: 1,000,000+ partners, 4,000+ brands. */
function useCountUp(target, run, startFrac = 0.6) {
  // Baseline is the REAL value (brief §2.4) — never a partial seed. We only drop to
  // the lower start value at the moment the in-view animation actually begins.
  const [v, setV] = React.useState(target);
  React.useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setV(target); return; }
    const from = Math.round(target * startFrac), dur = 1100, t0 = performance.now();
    setV(from);
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(from + (target - from) * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, startFrac]);
  return v;
}

// Stats per brief Change 2, in order: 1,000,000+ / 4,000+ / 12 years / 15 Billion+.
// Each carries the sticky image that swaps in as it becomes the active stat.
// NOTE: the "15 Billion+" revenue figure is pending finance confirmation (it must
// represent advertiser sales generated, not Involve's own revenue) — open item.
const STATS = [
  { value: 1000000, tone: 'pub', fmt: (n) => Intl.NumberFormat('en').format(n) + '+', kicker: 'The network', label: 'Creators and publishers', sub: 'Creators, content sites, affiliate marketers, coupon and loyalty sites, all in one place.', imgLabel: 'community',
    img: 'media/webp/800000%20globalpartners.webp', alt: 'Creators and publishers across the network' },
  { value: 4000, tone: 'adv', fmt: (n) => Intl.NumberFormat('en').format(n) + '+', kicker: 'The brands', label: 'Brands and advertisers', sub: 'From marketplaces to travel, finance and beauty, across every major category.', imgLabel: 'retail',
    img: 'media/webp/4000%20brand%20images.webp', alt: 'Brands and advertisers on the platform' },
  { value: 12, tone: 'pub', fmt: (n) => n + ' years', kicker: 'The track record', label: 'Pioneering the network', sub: 'Trusted since 2014, scaling partnerships that quietly run themselves for both sides.', imgLabel: 'growth',
    img: 'media/webp/sub-card-company.webp', alt: 'Twelve years pioneering the network' },
  { value: 15, tone: 'adv', fmt: (n) => n + ' Billion+', kicker: 'The impact', label: 'Revenue driven for advertisers', sub: 'Sales generated for advertisers through partnerships across the network.', imgLabel: 'revenue',
    img: 'media/webp/market-region-image-recolor.webp', alt: 'Revenue driven for advertisers' },
];

// Sticky brand-recognition shape (hexagon-clipped) that holds in the viewport while
// the stat numbers scroll past. The active stat's image crossfades in (brief Change 2,
// air.inc register). Desktop only — hidden on mobile / reduced-motion where each stat
// shows its own inline image instead.
function StatsHexImage({ stats, active }) {
  return (
    <div className="stats-hex-sticky" aria-hidden="true">
      <div className="stats-hex-clip">
        {stats.map((s, i) => (
          <img key={i} src={s.img} alt="" loading="lazy" width="900" height="900"
            className={'stats-hex-img' + (i === active ? ' on' : '')} />
        ))}
      </div>
    </div>
  );
}

/* Rolling odometer number (dashcreative-style): each digit is a reel of 0–9 that
   spins one full turn and lands on its value, cascading left→right. Static / no-JS /
   reduced-motion fallback rests on the REAL number (brief §2.4: never resting on 0). */
function RollingNumber({ value, fmt, run }) {
  const rootRef = React.useRef(null);
  const text = String(fmt(value));
  const restY = (el) => -(10 + +el.getAttribute('data-d')) * 5;   // yPercent that shows the target digit
  // Rest each reel on its real digit up-front (correct before the roll & under
  // reduced motion). GSAP owns yPercent end-to-end — NO inline transform, or its
  // yPercent stacks on top and the strip overshoots into the blank gap past the digits.
  React.useLayoutEffect(() => {
    if (!rootRef.current || !window.gsap) return;
    rootRef.current.querySelectorAll('.reel-inner').forEach((el) => window.gsap.set(el, { yPercent: restY(el) }));
  }, [text]);
  React.useEffect(() => {
    if (!run || !rootRef.current) return;
    const gsap = window.gsap;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!gsap || reduce) return;                       // stays on the real value
    rootRef.current.querySelectorAll('.reel-inner').forEach((el, i) => {
      gsap.fromTo(el, { yPercent: 0 }, { yPercent: restY(el), duration: 0.95 + i * 0.13, ease: 'power3.out' });
    });
  }, [run, text]);
  return (
    <span ref={rootRef} className="rolling-num" aria-label={text}>
      {text.split('').map((ch, i) => {
        if (ch >= '0' && ch <= '9') {
          const d = +ch;
          return (
            <span className="reel" key={i} aria-hidden="true">
              <span className="reel-inner" data-d={d}>
                {Array.from({ length: 20 }, (_, k) => <span className="reel-d" key={k}>{k % 10}</span>)}
              </span>
            </span>
          );
        }
        return <span className="reel-sep" key={i} aria-hidden="true">{ch === ' ' ? ' ' : ch}</span>;
      })}
    </span>
  );
}

// One stat in the scrolling column. Dims when not the active stat; carries an inline
// hexagon image used only on mobile / reduced-motion (where the sticky image is off).
function StatItem({ s, i, active, itemRef, gate = true }) {
  const accent = s.tone === 'adv' ? 'var(--stat-adv)' : 'var(--ember-light)';   // adv accent tracks the surface (readable bright + dark)
  const on = i === active;
  return (
    <div ref={itemRef} className={'stat-item' + (on ? ' on' : '')}>
      <div className="stat-item-inner" data-reveal>{/* fade-and-rise entrance (no skew/rotate), per motion spec */}
        <div className="stat-kicker">
          <span style={{ width: 22, height: 2, background: accent, display: 'inline-block' }} />{s.kicker}
        </div>
        {/* mobile / reduced-motion only: each stat shows its own image (no sticky column) */}
        <div className="stat-inline-img" aria-hidden="true">
          <div className="stats-hex-clip"><img src={s.img} alt="" loading="lazy" width="900" height="900" className="stats-hex-img on" /></div>
        </div>
        <div className="stat-num"><RollingNumber value={s.value} fmt={s.fmt} run={gate && active >= i} /></div>{/* gate: count-up waits for the honeycomb wipe to fully cover (settled Midnight) */}
        <div className="stat-label" style={{ color: accent }}>{s.label}</div>
        <p className="stat-sub">{s.sub}</p>
      </div>
    </div>
  );
}

/* ---------- animated logo video backdrop (viewport-pinned through section + parallax) ---------- */
function StatsVideoBg() {
  const layerRef = React.useRef(null);
  const pinRef = React.useRef(null);
  const vidRef = React.useRef(null);
  React.useEffect(() => {
    const v = vidRef.current; if (!v) return;
    const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    tryPlay();
    v.addEventListener('canplay', tryPlay, { once: true });
    return () => v.removeEventListener('canplay', tryPlay);
  }, []);
  React.useEffect(() => {
    const layer = layerRef.current, pin = pinRef.current, vid = vidRef.current;
    if (!layer || !pin) return;
    const section = layer.parentElement;
    const reduce = prefersReduced();
    const baseOpacity = parseFloat(getComputedStyle(vid).opacity) || 0.3;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const update = () => {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Keep a 100vh band pinned to the viewport while the section spans it,
      // parked at the section's top/bottom otherwise — all via position:absolute
      // so NO stacking context is created and mix-blend-mode keeps blending with
      // the midnight background + hex texture behind it.
      const t = Math.max(0, Math.min(r.height - vh, -r.top));
      pin.style.top = t + 'px';
      if (!vid) return;
      // gentle parallax drift over the section's travel
      const prog = clamp((vh - r.top) / (r.height + vh), 0, 1);
      const parallax = reduce ? 0 : (prog - 0.5) * 120;
      const ss = (x) => x * x * (3 - 2 * x);                  // smoothstep ease
      // Enter fade is keyed to the video's ACTUAL centre in the viewport (not the
      // section's top edge) — so it fades IN as the video rises into view, mirroring
      // the exit fade. Exit keeps its original section-bottom keying.
      const vidCenter = r.top + t + vh / 2;                  // video centre, in viewport coords
      const enterT = clamp((vh - vidCenter) / (vh * 0.5), 0, 1); // 0 at/below the bottom edge → 1 once centred
      const exitT  = clamp(r.bottom / (vh * 1.5), 0, 1);     // starts fading ~1.5 screens from the bottom → 0 as it rises out (more gradual/visible)
      const fade = reduce ? 1 : ss(Math.min(enterT, exitT));
      const entrance = reduce ? 0 : -(1 - enterT) * 64;       // starts ~64px up, drops into place
      vid.style.opacity = (baseOpacity * fade).toFixed(3);
      vid.style.transform = `translate3d(0, ${(parallax + entrance).toFixed(1)}px, 0)`;
    };
    update();
    const onScroll = () => update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  return (
    <div ref={layerRef} className="stats-video-layer" aria-hidden="true">
      <div ref={pinRef} className="stats-video-pin">
        <video ref={vidRef} className="stats-video" autoPlay muted loop playsInline preload="auto"
          src={(window.__resources && window.__resources.heroVideo) || "uploads/website-core-animation.webm"}></video>
      </div>
    </div>
  );
}

/* ---------------- Hexagon honeycomb wipe (steps → stats → brand-motion motif) ----------------
   Signature transition for this boundary only: a honeycomb of brand hexagons rises from the
   bottom of the viewport and fills it with Midnight (enter); on the way out of stats the
   Midnight mass departs UPWARD (vertically flipped exit — light rises from the bottom,
   mirroring the entrance; per design revision this supersedes the original "same timeline
   reversed" spec line). While the enter wipe's top 25% is still filling, the stats section
   itself slides up from the bottom edge over the covered area (scoped -18vh margin — real
   scroll, no transform hand-off). Full-viewport background wipe on a pinned, scrub-locked
   stage. The Midnight layer is ONE svg <rect> masked by the honeycomb — only mask geometry
   animates (transform/opacity tweens; no painted per-hex nodes, no layout properties).
   Sits below the fold → no LCP impact.
   ORIENTATION: spec draft said "flat-top", but the confirmed brand geometry is POINTY-TOP
   everywhere — the logomark (NM_HEX), the Hexagon component, and the Figma honeycomb asset
   (HEX_PATHS: top vertex at centre-x, vertical side edges). Built pointy-top to match the
   mark; adjust the angle offset in the path builder to flip.
   FALLBACKS: reduced-motion, mobile/touch and no-GSAP skip the wipe entirely and keep the
   existing continuous surface cross-fade (which already snaps under reduced motion). */
const HEXW_MID = '#0F1C2E';   // locked Midnight (--midnight)
const hexWipeEnabled = () =>
  typeof window !== 'undefined' && !!(window.gsap && window.ScrollTrigger) &&
  !window.matchMedia('(max-width: 860px)').matches &&
  !window.matchMedia('(pointer: coarse)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function HexWipe({ reverse = false }) {
  const on = React.useState(hexWipeEnabled)[0];
  const stageRef = React.useRef(null);
  const clipRef = React.useRef(null);
  const gid = 'hexwipe-' + (reverse ? 'out' : 'in');
  const [dims, setDims] = React.useState(() => (typeof window !== 'undefined' ? { w: window.innerWidth, h: window.innerHeight } : { w: 1440, h: 900 }));
  // Rebuild geometry on real resizes only (debounced; ignores tiny/URL-bar shifts) —
  // clip coords are in px (userSpaceOnUse), so they must track the viewport.
  React.useEffect(() => {
    if (!on) return;
    let t;
    const f = () => {
      clearTimeout(t);
      t = setTimeout(() => setDims((d) => (Math.abs(innerWidth - d.w) > 40 || Math.abs(innerHeight - d.h) > 120 ? { w: innerWidth, h: innerHeight } : d)), 250);
    };
    window.addEventListener('resize', f);
    return () => { window.removeEventListener('resize', f); clearTimeout(t); };
  }, [on]);

  // Pointy-top tessellation over-bleeding all four viewport edges, so at every scroll
  // position the screen is fully covered, cleanly mid-transition, or fully clear —
  // never a sliver of the wrong colour at a seam or frame edge.
  const grid = React.useMemo(() => {
    const { w, h } = dims;
    const a = Math.max(56, Math.min(130, w / 12));           // circumradius → hex width = √3·a (storyboard scale)
    const stepX = Math.sqrt(3) * a, stepY = 1.5 * a;
    const rows = Math.ceil(h / stepY) + 3, cols = Math.ceil(w / stepX) + 3;
    const cells = [];
    for (let r = -1; r < rows; r++)
      for (let c = -1; c < cols; c++)
        cells.push({ cx: c * stepX + ((((r % 2) + 2) % 2) ? stepX / 2 : 0), cy: r * stepY, r, c });
    // One pointy-top hexagon path centred at 0,0 — overscaled 2% so settled tiles overlap a
    // hair and antialiasing can never open hairline seams between them.
    const s = a * 1.02, pts = [];
    for (let i = 0; i < 6; i++) { const ang = (Math.PI / 3) * i - Math.PI / 6; pts.push((Math.cos(ang) * s).toFixed(2) + ' ' + (Math.sin(ang) * s).toFixed(2)); }
    return { a, cells, d: 'M' + pts.join('L') + 'Z', maxRow: rows - 1 };
  }, [dims]);

  React.useEffect(() => {
    if (!on) return;
    const gsap = window.gsap, ST = window.ScrollTrigger;
    gsap.registerPlugin(ST);
    const { a, cells, maxRow } = grid;
    const nodes = Array.from(clipRef.current.children);
    const RISE = a * 3;   // ≈ two rows of travel — enough to read as a rise, small enough to stay crisp
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power1.out' } });
    cells.forEach((cell, i) => {
      // Deterministic raggedness (no Math.random → stable across rebuilds).
      const j = ((((cell.c * 7 + cell.r * 13) % 9) + 9) % 9) / 9;
      const floater = ((((cell.c * 3 + cell.r * 5) % 11) + 11) % 11) === 0;
      const rowT = (maxRow - cell.r) / (maxRow + 1);   // 0 = bottom row → bottom always leads
      if (!reverse) {
        // ENTER — hexes rise from below and settle. Jitter pulls starts EARLY only — peaks
        // and detached floaters ahead of the wave, never late, so the covered mass can't
        // open an interior hole. Rise + fade-in on a mask: position eases OUT, opacity
        // eases IN (opaque only at settle) → no white hairline can flash at tile seams.
        const start = Math.max(0, rowT * 0.68 - j * 0.3 - (floater ? 0.22 : 0));
        tl.fromTo(nodes[i], { x: cell.cx, y: cell.cy + RISE }, { x: cell.cx, y: cell.cy, duration: 0.24, ease: 'power1.out' }, start)
          .fromTo(nodes[i], { opacity: 0 }, { opacity: 1, duration: 0.24, ease: 'power2.in' }, start);
      } else {
        // EXIT — vertically flipped: the Midnight mass leaves UPWARD. Bottom rows depart
        // first (light rises from the bottom, mirroring the entrance) and hexes fly up
        // out of the viewport. Jitter/floaters push departures LATE only (lingering
        // stragglers above the receding edge — never early), so the mass can't open
        // interior light holes. Translucent in flight, mirroring the entrance.
        const start = rowT * 0.68 + j * 0.3 + (floater ? 0.22 : 0);
        tl.fromTo(nodes[i], { x: cell.cx, y: cell.cy }, { x: cell.cx, y: cell.cy - RISE, duration: 0.24, ease: 'power1.in' }, start)
          .fromTo(nodes[i], { opacity: 1 }, { opacity: 0, duration: 0.24, ease: 'power2.out' }, start);
      }
    });
    tl.progress(0);   // enter rests clear; exit timeline runs covered → clear, so 0 = fully Midnight
    const PIN = Math.round(dims.h * (reverse ? 0.65 : 0.72));       // enter reduced 20% (was 0.9)
    // Enter only: the scrub LEADS the pin — the wave starts rising from the viewport bottom
    // while the steps section still fills the top 75% of the screen (no dead approach), and
    // completes at the pin end as before. Pin and scrub are separate triggers so the stage
    // still pins cleanly at 'top top'.
    const LEAD = reverse ? 0 : Math.round(dims.h * 0.75);
    const stPin = ST.create({
      trigger: stageRef.current, pin: true, pinSpacing: true,
      start: 'top top', end: '+=' + PIN, anticipatePin: 1, invalidateOnRefresh: true,
    });
    const st = ST.create({
      trigger: stageRef.current, start: LEAD ? 'top 75%' : 'top top', end: '+=' + (LEAD + PIN),
      invalidateOnRefresh: true,
      onUpdate(self) {
        const p = self.progress;
        tl.progress(p);
        // Nav chrome hand-off — one shared class, last-writer wins: the enter stage turns it
        // ON near full coverage (top edge covered last); the exit stage turns it OFF once the
        // upward departure clears the top strip (top rows leave last → ~p 0.8).
        document.body.classList.toggle('hexwipe-dark', reverse ? p < 0.8 : p > 0.93);
        if (!reverse) window.dispatchEvent(new CustomEvent('ia:hexwipe', { detail: { progress: p } }));
      },
    });
    (window.__hexWipes = window.__hexWipes || []).push({ gid, tl, st, stPin });   // verification/debug handle
    return () => {
      stPin.kill(); st.kill(); tl.kill();
      window.__hexWipes = (window.__hexWipes || []).filter((x) => x.tl !== tl);
      document.body.classList.remove('hexwipe-dark');
    };
  }, [on, grid, reverse, gid]);

  if (!on) return null;
  const { w, h } = dims;
  return (
    <div ref={stageRef} className={'hexwipe-stage ' + (reverse ? 'hexwipe-exit' : 'hexwipe-enter')} aria-hidden="true">
      <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, display: 'block' }}>
        <defs>
          {/* mask (not clip) so in-flight hexes can be translucent — kills white hairline
              slivers at tile seams mid-transition; unpainted mask area = hidden */}
          <mask id={gid} maskUnits="userSpaceOnUse" ref={clipRef}>
            {grid.cells.map((c, i) => <path key={i} d={grid.d} fill="#fff" opacity="0" transform={`translate(${c.cx} ${c.cy + grid.a * 3})`} />)}
          </mask>
        </defs>
        <rect x="0" y="0" width={w} height={h} fill={HEXW_MID} mask={`url(#${gid})`} />
      </svg>
    </div>
  );
}

function StatsSection({ hex = 3 }) {
  const [active, setActive] = React.useState(0);
  // Count-up gate (wipe mode): numbers may only start once Midnight has fully covered the
  // viewport (wipe progress ≥ 0.9) — never over a half-covered screen. Latched true once
  // reached. Fallback modes (no wipe) are ungated, as before.
  const [covered, setCovered] = React.useState(() => !hexWipeEnabled());
  React.useEffect(() => {
    if (covered) return;
    const f = (e) => { if (e.detail && e.detail.progress >= 0.9) setCovered(true); };
    window.addEventListener('ia:hexwipe', f);
    return () => window.removeEventListener('ia:hexwipe', f);
  }, [covered]);
  const itemRefs = React.useRef([]);
  React.useEffect(() => {
    const reduce = prefersReduced();
    if (reduce) return;                              // static: CSS lights every stat, no scrub
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best = 0, bestD = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs((r.top + r.height / 2) - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      setActive(best);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="stats" className="stats-sec" style={{ background: 'transparent', color: 'var(--ink)' }}>
      <HexTexture intensity={hex} dark />
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="sec-head" data-reveal style={{ maxWidth: 680, paddingTop: 'clamp(72px,12vh,128px)' }}>
          <h2 style={{ color: 'var(--ink)' }}>Join a network that's already delivering</h2>
          <p style={{ color: 'var(--ink-soft)' }}>The numbers behind partnerships that run themselves, for advertisers acquiring customers and publishers earning more.</p>
        </div>
        <div className="stats-scroller">
          <StatsHexImage stats={STATS} active={active} />
          <div className="stats-list">
            {STATS.map((s, i) => (
              <StatItem key={s.label} s={s} i={i} active={active} gate={covered} itemRef={(el) => { itemRefs.current[i] = el; }} />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .stats-sec{padding-bottom:clamp(64px,10vh,128px);}
        .stat-num{font-family:var(--font-display);font-weight:800;font-size:clamp(54px,9vw,120px);line-height:.95;letter-spacing:-.03em;margin-top:10px;color:var(--ink);}
        /* rolling odometer digits */
        .rolling-num{display:inline-flex;align-items:flex-end;line-height:1;}
        .rolling-num .reel{display:inline-block;height:1em;overflow:hidden;vertical-align:bottom;}
        .rolling-num .reel-inner{display:flex;flex-direction:column;will-change:transform;}
        .rolling-num .reel-d{display:block;height:1em;line-height:1;text-align:center;font-variant-numeric:tabular-nums;}
        .rolling-num .reel-sep{display:inline-block;}

        /* ---- air.inc-style scroll-focused stats (brief Change 2) ----
           Left: a sticky hexagon-clipped image that holds centred in the viewport,
           swapping to the active stat. Right: the stat numbers scroll past, the
           active one lit, the rest dimmed. */
        .stats-scroller{display:grid; grid-template-columns:0.92fr 1fr; gap:clamp(32px,6vw,96px); align-items:start; margin-top:clamp(24px,5vh,56px);}
        .stats-hex-sticky{position:sticky; top:calc(50vh - min(28vh,270px)); height:min(56vh,540px); display:flex; align-items:center; justify-content:center;}
        .stats-hex-clip{position:relative; width:min(52vh,460px); aspect-ratio:1 / 1.12;
          clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);
          -webkit-clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);
          background:var(--midnight-light); box-shadow:var(--shadow-lg);}
        .stats-hex-img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0; transform:scale(1.05);
          transition:opacity .6s ease, transform 1s ease; will-change:opacity,transform;}
        .stats-hex-img.on{opacity:1; transform:scale(1);}
        .stats-list{display:block;}
        .stat-item{min-height:clamp(360px,72vh,640px); display:flex; flex-direction:column; justify-content:center;
          opacity:.3; transition:opacity .5s ease;}
        .stat-item.on{opacity:1;}
        .stat-kicker{display:inline-flex; align-items:center; gap:9px; font:600 12px/1 var(--font-body); letter-spacing:.12em; text-transform:uppercase; color:var(--ink-soft);}
        .stat-label{font-family:var(--font-display); font-weight:800; font-size:clamp(18px,2vw,24px); margin-top:8px;}
        .stat-sub{margin-top:16px; font-size:17px; line-height:1.6; color:var(--ink-soft); max-width:440px;}
        .stat-inline-img{display:none;}
        /* Mobile + reduced-motion: drop the sticky column; each stat shows its own
           image inline, stats stack normally with no scroll-scrub (brief Change 2). */
        @media (max-width: 860px){
          .stats-scroller{grid-template-columns:1fr; gap:0;}
          .stats-hex-sticky{display:none;}
          .stat-item{min-height:0; opacity:1; padding:36px 0; border-top:1px solid rgba(255,255,255,.08);}
          .stat-item:first-child{border-top:none;}
          .stat-inline-img{display:block; margin:4px 0 18px;}
          .stat-inline-img .stats-hex-clip{width:min(64vw,300px); aspect-ratio:1 / 1.12;}
          .stat-inline-img .stats-hex-img{position:absolute;}
        }
        @media (prefers-reduced-motion: reduce){
          .stats-scroller{grid-template-columns:1fr; gap:0;}
          .stats-hex-sticky{display:none;}
          .stat-item{min-height:0; opacity:1; padding:36px 0; border-top:1px solid rgba(255,255,255,.08);}
          .stat-item:first-child{border-top:none;}
          .stat-inline-img{display:block; margin:4px 0 18px;}
          .stat-inline-img .stats-hex-clip{width:min(64vw,300px); aspect-ratio:1 / 1.12;}
        }
      `}</style>
    </section>
  );
}

/* ---------------- Case studies — "Real results, measured" (fanned-arc carousel) ----------------
   NEW section (not from Concept 1/3): five case-study cards in a static fanned arc — centre
   card upright, larger and ACTIVE (background photo + overlaid text); side cards tilt
   progressively outward, sit lower, and are text-only. STAGE 1: static arc + active/default
   states only — glass overlay, entrance, auto-slide and drag come in later stages.
   Images are real bundled brand photos standing in until final industry shots land. */
const CASES = [
  { stat: '796', unit: '%', line: 'Increase in sales', tag: 'E-commerce', d: 'How Big Bang Sales scaled through affiliate partnerships.', img: 'media/case%20study/ecommerce.png' },
  { stat: '723', unit: 'k MYR', line: 'In sales · 4,912 conversions', tag: 'Health & Wellness', d: 'How a global health and wellness brand launched a CPS programme on Involve.', img: 'media/case%20study/health%20and%20wellness.png' },
  { stat: '29', unit: 'x', line: 'Sales growth in 6 months', tag: 'Retail', d: "How Lotus's drove results through campaign optimisation.", img: 'media/case%20study/retail.png' },
  { stat: '52', unit: '%', line: 'More personal-loan sign-ups', tag: 'Finance', d: 'How RinggitPlus grew applications with affiliate marketing.', img: 'media/case%20study/finance.png' },
  { stat: '4.3', unit: 'x', line: 'Increase in sales', tag: 'Telco', d: 'How Involve partners drove growth for TIME Internet.', img: 'media/case%20study/telco.png' },
];

// Arc slots relative to the active card: {x-shift px, y-drop px, rotation °, scale, z}.
// Spacing tuned so all five read within a desktop viewport (outer cards' stats stay
// on-screen), matching the reference fan.
const CASE_SLOTS = {
  '-2': { x: -540, y: 150, r: -24, s: 0.94, z: 1 },
  '-1': { x: -280, y: 46,  r: -12, s: 1, z: 2 },
  '0':  { x: 0,    y: 0,   r: 0,   s: 1.1, z: 3 },
  '1':  { x: 280,  y: 46,  r: 12,  s: 1, z: 2 },
  '2':  { x: 540,  y: 150, r: 24,  s: 0.94, z: 1 },
};

function CaseStudies() {
  const N = CASES.length;
  const mod = (n) => ((n % N) + N) % N;
  const relOf = (i, a) => { const d = mod(i - a); return d > 2 ? d - N : d; };   // -2..2 slot relative to active

  const [active, setActive] = React.useState(0);
  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [entered, setEntered] = React.useState(reduce);   // reduced-motion: no fade-in-up, show immediately
  const stageRef = React.useRef(null);
  const prevActive = React.useRef(0);
  const hoverRef = React.useRef(false), dragRef = React.useRef(false), pauseUntil = React.useRef(0);
  const go = React.useCallback((dir) => setActive((a) => mod(a + dir)), []);

  // Entrance: fire once when the arc first scrolls into view.
  React.useEffect(() => {
    if (entered || !stageRef.current) return;
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setEntered(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(stageRef.current);
    return () => io.disconnect();
  }, [entered]);

  // Auto-slide every 4s; skip while hovered / dragging / within the post-interaction idle window.
  React.useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (hoverRef.current || dragRef.current || performance.now() < pauseUntil.current) return;
      go(1);
    }, 4000);
    return () => clearInterval(id);
  }, [reduce, go]);

  // Pointer/touch drag — one step per horizontal swipe; resume auto-slide after a short idle.
  React.useEffect(() => {
    const el = stageRef.current; if (!el) return;
    let sx = 0, moved = false;
    const down = (e) => { dragRef.current = true; moved = false; sx = e.clientX; try { el.setPointerCapture(e.pointerId); } catch (_) {} };
    const move = (e) => { if (dragRef.current && Math.abs(e.clientX - sx) > 8) moved = true; };
    const up = (e) => {
      if (!dragRef.current) return; dragRef.current = false;
      const dx = e.clientX - sx;
      if (dx <= -50) go(1); else if (dx >= 50) go(-1);
      pauseUntil.current = performance.now() + 3200;   // idle before auto-slide resumes
      try { el.releasePointerCapture(e.pointerId); } catch (_) {}
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    return () => { el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); };
  }, [go]);

  React.useEffect(() => { prevActive.current = active; });   // remember last active for wrap detection

  return (
    <section id="cases" style={{ background: 'var(--surface)', padding: 'clamp(64px,9vh,120px) 0 clamp(72px,10vh,132px)', position: 'relative', overflow: 'hidden' }}>
      <div className="wrap">
        <div className="cases-head" data-reveal>
          <h2>Real results, measured</h2>
          <p>See how brands across every industry grow with affiliate marketing on Involve.<br />The numbers are real.</p>
        </div>
      </div>
      <div ref={stageRef} className={'cases-stage' + (entered ? ' in' : '')} role="group" aria-label="Case studies" aria-roledescription="carousel"
        onMouseEnter={() => { hoverRef.current = true; }} onMouseLeave={() => { hoverRef.current = false; }}>
        {CASES.map((c, i) => {
          const rel = relOf(i, active);
          const isActive = rel === 0;
          // Wrap teleport: when a card jumps from one far edge to the other (Δrel = ±4),
          // kill its slide transition for that frame so it repositions instantly instead of
          // flying across the screen; it animates normally on every other step.
          const wrapped = Math.abs(rel - relOf(i, prevActive.current)) > 2;
          return (
            <div key={c.tag} className="case-pos" data-rel={rel} style={wrapped ? { transition: 'none' } : undefined}>
              <article className={'case-card' + (isActive ? ' is-active' : '')} style={{ '--d': i }} aria-current={isActive || undefined} aria-hidden={Math.abs(rel) > 1 || undefined}>
                <div className="case-photo" aria-hidden="true">
                  <img src={c.img} alt="" loading="lazy" draggable="false" />
                  <span className="case-shade" />
                  <span className="case-glass" />{/* frosted edge highlight — full CSS glass tuning is stage 2 */}
                </div>
                <span className="case-arrow" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg></span>
                <div className="case-top">
                  <div className="case-stat"><span className="n">{c.stat}</span><span className="u">{c.unit}</span></div>
                  <div className="case-line">{c.line}</div>
                </div>
                <div className="case-bottom">
                  <div className="case-tag">{c.tag}</div>
                  <p className="case-desc">{c.d}</p>
                </div>
              </article>
            </div>
          );
        })}
      </div>
      <style>{`
        .cases-head{text-align:center; max-width:760px; margin:0 auto clamp(40px,6vh,72px);}
        .cases-head h2{font-family:var(--font-display); font-weight:800; line-height:1.06; letter-spacing:-.02em;
          font-size:clamp(30px,3.8vw,46px); margin:0; color:var(--warm-900);}
        .cases-head p{margin:14px auto 0; font-size:clamp(14px,1.05vw,16px); color:var(--warm-400); line-height:1.6;}
        /* fanned arc — a STATIC resting state (transforms below); only the slide (transform)
           and entrance (opacity/translateY) animate. Draggable: pan-y lets vertical scroll
           pass while we own horizontal swipes. */
        .cases-stage{position:relative; height:520px; touch-action:pan-y;}
        /* .case-pos owns the fan slot + slide; .case-card owns the entrance + visuals, so the
           static tilt is never animated (only opacity/translateY on entry). */
        .case-pos{position:absolute; left:50%; top:0; width:300px; height:372px; transform-origin:center 130%;
          transition:transform .58s cubic-bezier(.22,1,.36,1); will-change:transform;}
        .case-pos[data-rel="0"]{transform:translate(-50%,6px) scale(1.08); z-index:3; transform-origin:center center;}
        .case-pos[data-rel="-1"]{transform:translate(calc(-50% - 280px),52px) rotate(-12deg); z-index:2;}
        .case-pos[data-rel="1"]{transform:translate(calc(-50% + 280px),52px) rotate(12deg); z-index:2;}
        .case-pos[data-rel="-2"]{transform:translate(calc(-50% - 540px),150px) rotate(-24deg) scale(.94); z-index:1;}
        .case-pos[data-rel="2"]{transform:translate(calc(-50% + 540px),150px) rotate(24deg) scale(.94); z-index:1;}
        .case-card{position:relative; width:100%; height:100%; box-sizing:border-box;
          background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-xl); box-shadow:var(--shadow-lg);
          padding:26px 24px; display:flex; flex-direction:column; justify-content:space-between; overflow:hidden;
          opacity:0; transform:translateY(16px); transition:opacity .5s ease, transform .5s cubic-bezier(.22,1,.36,1);
          transition-delay:calc(var(--d,0) * 80ms);}   /* staggered fade-in-up */
        .cases-stage.in .case-card{opacity:1; transform:none;}
        /* THE NUMBERS LEAD: dark, confident stat on text-only cards (never light grey) */
        .case-stat{display:flex; align-items:baseline; gap:6px; color:var(--warm-900); transition:color .45s ease;}
        .case-stat .n{font-family:var(--font-display); font-weight:800; font-size:56px; line-height:1; letter-spacing:-.03em;}
        .case-stat .u{font-family:var(--font-display); font-weight:800; font-size:20px;}
        .case-line{margin-top:8px; font:600 15px/1.4 var(--font-body); color:var(--warm-900); transition:color .45s ease;}
        .case-tag{font:700 12px/1 var(--font-body); color:var(--warm-900); margin-bottom:9px; transition:color .45s ease;}
        .case-desc{margin:0; font-size:13.5px; line-height:1.5; color:var(--warm-600); transition:color .45s ease;}
        /* PHOTO ONLY ON THE ACTIVE CARD: rendered on every card but cross-faded — opacity 0
           on non-active (card stays plain-white / text-only), opacity 1 only when active. */
        .case-photo{position:absolute; inset:0; z-index:0; opacity:0; transition:opacity .5s ease; pointer-events:none;}
        .case-card.is-active .case-photo{opacity:1;}
        .case-photo img{width:100%; height:100%; object-fit:none; display:block; -webkit-user-drag:none;}
        /* lighter tint than before so the photo still reads as a real photo (trust proof)
           while white text keeps contrast top & bottom. */
        .case-shade{position:absolute; inset:0; background:linear-gradient(180deg, rgba(15,28,46,.46) 0%, rgba(15,28,46,.12) 40%, rgba(15,28,46,.20) 62%, rgba(15,28,46,.66) 100%);}
        .case-glass{position:absolute; inset:0; border-radius:var(--r-xl); box-shadow:inset 0 1px 0 rgba(255,255,255,.22);}
        .case-card.is-active{border:none; box-shadow:var(--shadow-xl);}
        .case-card.is-active .case-top, .case-card.is-active .case-bottom{position:relative; z-index:1;}
        .case-card.is-active .case-stat, .case-card.is-active .case-line, .case-card.is-active .case-tag{color:#fff;}
        .case-card.is-active .case-desc{color:rgba(255,255,255,.94);}
        .case-arrow{position:absolute; top:20px; right:20px; z-index:1; color:#fff; opacity:0; transition:opacity .5s ease;}
        .case-card.is-active .case-arrow{opacity:1;}
        /* Mobile: single centred card + ~30% peek of prev/next so the swipe affordance reads. */
        @media (max-width:860px){
          .cases-stage{height:clamp(400px,92vw,470px);}
          .case-pos{width:min(300px,66vw); height:calc(min(300px,66vw) * 1.24);}
          .case-pos[data-rel="0"]{transform:translate(-50%,0) scale(1); transform-origin:center;}
          .case-pos[data-rel="-1"]{transform:translate(calc(-50% - 95%),0) scale(.9) rotate(0deg);}
          .case-pos[data-rel="1"]{transform:translate(calc(-50% + 95%),0) scale(.9) rotate(0deg);}
          .case-pos[data-rel="-2"], .case-pos[data-rel="2"]{opacity:0; pointer-events:none;}
        }
        @media (prefers-reduced-motion: reduce){
          .case-pos, .case-card, .case-photo, .case-arrow, .case-stat, .case-line, .case-tag, .case-desc{transition:none !important;}
          .case-card{opacity:1 !important; transform:none !important;}
        }
      `}</style>
    </section>
  );
}

/* ---------------- Final CTA (Midnight anchor + two-door) ---------------- */
function FinalCTA({ emphasis = 'equal', hex = 3 }) {
  // Bright CTA: the surface has eased back to warm after the stats section, so the
  // brand motif + text are dark-on-light (bright mode). Logomark fades + scales in.
  return (
    <section id="cta" style={{ background: 'transparent', color: 'var(--warm-900)', padding: '156px 0 124px', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
      <HexField />
      <div className="wrap" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 760, marginInline: 'auto' }}>
        <div data-reveal className="cta-mark" aria-hidden="true">
          <Hexagon size={62} strokeOnly grad gradDur={8} sw={2.4} style={{ position: 'absolute', left: 5, top: 8, opacity: 0.85 }} />
          <Hexagon size={34} fill="var(--midnight)" style={{ position: 'absolute', right: 3, top: 0, opacity: 0.92 }} />
        </div>
        <h2 data-reveal style={{ fontSize: 'clamp(30px,4vw,46px)', color: 'var(--midnight)' }}>Be part of our network</h2>
        <p data-reveal data-reveal-delay="1" style={{ marginTop: 18, fontSize: 19, color: 'var(--warm-600)', maxWidth: 600, marginInline: 'auto' }}>
          Whether you're a brand looking to grow or a creator ready to earn, Involve connects you to the partnerships that scale.
        </p>
        <div data-reveal data-reveal-delay="2" style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
          <TwoDoor emphasis={emphasis} center />
        </div>
      </div>
      <style>{`
        .cta-mark{position:relative; width:82px; height:84px; margin:0 auto 22px;
          opacity:0; transform:translateY(16px) scale(.9);
          transition:opacity .7s ease, transform .7s cubic-bezier(.22,1,.36,1);}
        .cta-mark.in{opacity:1; transform:none;}
        @media (prefers-reduced-motion: reduce){ .cta-mark{transition:none;} }
      `}</style>
    </section>
  );
}

/* ---------------- Network morph CTA (pinned, scroll-scrubbed) ----------------
   The Involve logomark (two overlapped dark hexagons) splits — large hex goes
   left → Brand, small hex grows + goes right → Creator — flips, then morphs from
   hexagon into the two-door pill CTA while the honeycomb blooms behind. The two
   morphing elements ARE the real <a> CTAs, so they stay clickable throughout.
   Colour only appears once the hexes are apart, so Midnight + Ember never touch.
   GSAP + ScrollTrigger (loaded globally). Desktop only; small screens / no-GSAP /
   reduced-motion fall back to the static <FinalCTA>. (Degrade pass comes later.) */
const NM_HEX = 'polygon(50% 2%, 91.57% 26%, 91.57% 74%, 50% 98%, 8.43% 74%, 8.43% 26%)';  // regular hexagon: x = 50 ± 48·√3/2
const NM_PILL = 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%, 0% 0%)';

// The hexagon split-morph (brand-motion motif) on the BRIGHT CTA surface: the surface
// eases back to warm after the stats section, so the resting logomark is dark on light
// and door/gradient colours are the originals. Motion reduced + pin shortened so the
// final CTA arrives with less scroll.
const ENABLE_MORPH = true;

function NetworkMorphCTA({ emphasis = 'equal', hex = 3 }) {
  const useMorph = React.useState(() =>
    ENABLE_MORPH &&
    typeof window !== 'undefined' && !!window.gsap && !!window.ScrollTrigger &&
    !window.matchMedia('(max-width: 860px)').matches && !prefersReduced()
  )[0];

  const wrapRef = React.useRef(null);
  const stageRef = React.useRef(null);
  const aRef = React.useRef(null), bRef = React.useRef(null);
  const aFill = React.useRef(null), bFill = React.useRef(null);
  const aGrad = React.useRef(null), bGrad = React.useRef(null);
  const aImg = React.useRef(null), bImg = React.useRef(null);
  const aH = React.useRef(null), bH = React.useRef(null);
  const aTxt = React.useRef(null), bTxt = React.useRef(null);
  const headRef = React.useRef(null), labA = React.useRef(null), labB = React.useRef(null);
  const fieldRef = React.useRef(null);

  React.useEffect(() => {
    if (!useMorph) return;
    const gsap = window.gsap, ST = window.ScrollTrigger;
    gsap.registerPlugin(ST);
    const ctx = gsap.context(() => {
      const OFF = 112;                          // half-gap between the two doors at rest
      const raised = -window.innerHeight * 0.15; // lift the mark higher above centre during morph
      const ASIZE = 240, BSIZE = 120;            // start sizes (large hex / small hex)
      const MID = '#0F1C2E';   // resting hex RIM colour — dark (bright-mode motif: dark logomark on the light CTA surface)

      gsap.set([aRef.current, bRef.current], { clipPath: NM_HEX, borderRadius: 18, backgroundColor: MID, force3D: true });
      // Logomark start: two OUTLINE hexes (dark rim from the door bg, page-colour
      // interior via .nm-fill). Large hex centred; small hex sits upper-right per the
      // brand mark — translate(31%,-98%) of its own box (re-tuned after the hexagons
      // were narrowed to regular proportions; was 39% with the wider shape).
      gsap.set(aRef.current, { xPercent: -50, yPercent: -50, x: 0, y: raised, width: ASIZE, height: ASIZE, zIndex: 5 });
      gsap.set(bRef.current, { xPercent: 31, yPercent: -98, x: 0, y: raised, width: BSIZE, height: BSIZE, zIndex: 6 });
      gsap.set([aGrad.current, bGrad.current], { autoAlpha: 0 });   // hero-CTA gradients, faded in on fill
      gsap.set([aImg.current, bImg.current], { autoAlpha: 0 });     // image backdrops, shown during hex/spin only
      gsap.set([aFill.current, bFill.current], { autoAlpha: 1 });   // page-colour interiors → outline look
      gsap.set([aH.current, bH.current], { autoAlpha: 0 });         // "Advertiser"/"Publisher" hex labels
      gsap.set([aTxt.current, bTxt.current], { autoAlpha: 0 });
      gsap.set([headRef.current, labA.current, labB.current, fieldRef.current], { autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'none' }, paused: true });
      // Pin and scrub are SPLIT triggers: the pin holds the stage from 'top top'; the scrub
      // leads the pin by only LEAD px (starts at 'top <lead>%') so the logomark entrance
      // begins once the hexagons are actually in view — NOT a full viewport early (which ran
      // the motion before the mark appeared). Small lead keeps the entry from feeling abrupt.
      // Progress driven raw in onUpdate (scrub-locked; no scrub smoothing, matches the wipe).
      const LEAD = Math.round(window.innerHeight * 0.35);
      ST.create({
        trigger: wrapRef.current, pin: stageRef.current, pinSpacing: true,
        start: 'top top', end: '+=1100', anticipatePin: 1, invalidateOnRefresh: true,
      });
      ST.create({
        trigger: wrapRef.current, start: 'top 35%', end: '+=' + (LEAD + 1100),
        invalidateOnRefresh: true,
        // The doors are only the real, clickable CTAs once they've fully morphed.
        // Until then (and on scrub-back) they're inert; `is-live` gates pointer
        // events, the hero drop-shadow, and the hover effect.
        onUpdate: (self) => {
          tl.progress(self.progress);
          const live = self.progress > 0.92;
          [aRef.current, bRef.current].forEach((el) => {
            if (el && el.classList.contains('is-live') !== live) {
              el.classList.toggle('is-live', live);
              if (!live) { el.classList.remove('nm-hovered'); gsap.set(el, { scale: 1 }); }   // not hoverable until live
            }
          });
        },
      });
      tl // 0 · entrance: the logomark fades in and drifts DOWN as we enter the
        //     frame — the hand-off from the stats video, which has faded out by now
        .from([aRef.current, bRef.current], { autoAlpha: 0, y: '-=70', duration: 0.6, ease: 'power1.out' }, 0)
        // 1 · split: large hex → left; small hex centres, grows to match, → right
        .to(aRef.current, { x: -OFF, duration: 1 }, 0.6)
        .to(bRef.current, { xPercent: -50, yPercent: -50, x: OFF, width: ASIZE, height: ASIZE, duration: 1 }, 0.6)
        // 1b · fill with the hero-CTA gradients + image backdrops (only once apart)
        .to([aGrad.current, bGrad.current], { autoAlpha: 1, duration: 0.5 }, 1.15)
        .to([aImg.current, bImg.current], { autoAlpha: 1, duration: 0.5 }, 1.15)
        .to([aFill.current, bFill.current], { autoAlpha: 0, duration: 0.5 }, 1.15)
        // 1c · "Advertiser"/"Publisher" labels appear on the hexes
        .to([aH.current, bH.current], { autoAlpha: 1, duration: 0.3 }, 1.3)
        // 2 · spin — fade the hex labels out as the flip begins
        .to([aH.current, bH.current], { autoAlpha: 0, duration: 0.3 }, 1.65)
        .to([aRef.current, bRef.current], { rotationY: 360, duration: 0.6, ease: 'power2.inOut' }, 1.7)   // exactly ONE round, eased so it reads as a single deliberate turn (not a continuous spin)
        // 3 · silky hex → pill: clip eases to a rectangle, then we DROP the clip
        // (a rectangular clip-path would override border-radius and keep sharp
        // corners) so border-radius can round it into a proper hero-style pill.
        .to([aRef.current, bRef.current], { clipPath: NM_PILL, duration: 0.45, ease: 'power2.inOut' }, 2.7)
        .to([aImg.current, bImg.current], { autoAlpha: 0, duration: 0.5 }, 2.7)   // image fades out → clean gradient CTA pill
        .set([aRef.current, bRef.current], { clipPath: 'none' }, 3.15)
        .to([aRef.current, bRef.current], { width: 200, height: 58, duration: 1.2, ease: 'power2.inOut' }, 2.7)
        .to([aRef.current, bRef.current], { borderRadius: 9999, duration: 0.75, ease: 'power2.out' }, 3.15)
        .to([aRef.current, bRef.current], { y: 0, duration: 1.2, ease: 'power1.inOut' }, 2.7)
        // 4 · settle: CTA text, honeycomb, headline, audience labels
        // (drop-shadow + clickability handled by the `is-live` class via onUpdate)
        .to([aTxt.current, bTxt.current], { autoAlpha: 1, duration: 0.4 }, 3.2)
        .to(fieldRef.current, { autoAlpha: 1, duration: 0.8 }, 3.2)
        .to(headRef.current, { autoAlpha: 1, duration: 0.7 }, 3.6)
        .to([labA.current, labB.current], { autoAlpha: 1, duration: 0.6 }, 3.9);
    }, wrapRef);

    // Hover (matches hero buttons): scale 1.02 via GSAP — must be GSAP, not CSS,
    // since the doors' transform is GSAP-owned. Only fires when `is-live` lets
    // pointer events through. (Ember's shadow-drop on hover is handled in CSS.)
    // Hover like the hero: scale 1.02 via GSAP (the standalone CSS `scale`
    // property isn't honoured alongside the GSAP-managed transform). The class
    // also drives the ember shadow-drop in CSS. At rest the scrub timeline is
    // idle, so the scale tween sticks.
    const hov = (el, on) => { if (!el) return; el.classList.toggle('nm-hovered', on); gsap.to(el, { scale: on ? 1.02 : 1, duration: 0.18, ease: 'power2.out' }); };
    const onAEnter = () => hov(aRef.current, true), onALeave = () => hov(aRef.current, false);
    const onBEnter = () => hov(bRef.current, true), onBLeave = () => hov(bRef.current, false);
    aRef.current.addEventListener('mouseenter', onAEnter); aRef.current.addEventListener('mouseleave', onALeave);
    bRef.current.addEventListener('mouseenter', onBEnter); bRef.current.addEventListener('mouseleave', onBLeave);

    // Recompute start/end once async content above (images, fonts) settles —
    // otherwise the pin is measured against a too-short page and lands wrong.
    const refresh = () => ST.refresh();
    window.addEventListener('resize', refresh);
    window.addEventListener('load', refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    const timers = [setTimeout(refresh, 400), setTimeout(refresh, 1200)];
    const aEl = aRef.current, bEl = bRef.current;
    return () => {
      window.removeEventListener('resize', refresh);
      window.removeEventListener('load', refresh);
      timers.forEach(clearTimeout);
      if (aEl) { aEl.removeEventListener('mouseenter', onAEnter); aEl.removeEventListener('mouseleave', onALeave); }
      if (bEl) { bEl.removeEventListener('mouseenter', onBEnter); bEl.removeEventListener('mouseleave', onBLeave); }
      ctx.revert();
    };
  }, [useMorph]);

  if (!useMorph) return <FinalCTA emphasis={emphasis} hex={hex} />;

  return (
    <section ref={wrapRef} id="cta" className="nm-wrap" aria-label="Be part of our network">{/* ref was missing — the old combined trigger fell back to the pin element, but the split scrub trigger needs the real wrap */}
      <div ref={stageRef} className="nm-stage">
        <div ref={fieldRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}><HexField /></div>
        <div ref={headRef} className="nm-head">
          <h2>Be part of our network</h2>
          <p>Whether you're a brand looking to grow or a creator ready to earn, Involve connects you to the partnerships that scale.</p>
        </div>
        <span ref={labA} className="nm-label" style={{ '--x': '-112px' }}>I'm an Advertiser</span>
        <span ref={labB} className="nm-label" style={{ '--x': '112px' }}>I'm a Creator or Publisher</span>
        <a ref={aRef} className="nm-door nm-adv" href="/advertisers/" aria-label="List Your Brand — for advertisers">
          <span className="nm-rim" aria-hidden="true"></span>
          <span ref={aGrad} className="nm-grad nm-grad-adv" aria-hidden="true"></span>
          <span ref={aImg} className="nm-img" aria-hidden="true"
            style={{ backgroundImage: `linear-gradient(rgba(15,28,46,.34),rgba(15,28,46,.34)), url(media/webp/hexagon-brand-image.webp)` }}></span>
          <span ref={aFill} className="nm-fill" aria-hidden="true"></span>
          <span ref={aH} className="nm-htext" aria-hidden="true">Advertiser</span>
          <span ref={aTxt} className="nm-dt">List Your Brand <Arrow /></span>
        </a>
        <a ref={bRef} className="nm-door nm-pub" href="/partners/" aria-label="Start Earning — for creators and publishers">
          <span className="nm-rim" aria-hidden="true"></span>
          <span ref={bGrad} className="nm-grad nm-grad-pub" aria-hidden="true"></span>
          <span ref={bImg} className="nm-img" aria-hidden="true"
            style={{ backgroundImage: `linear-gradient(rgba(15,28,46,.34),rgba(15,28,46,.34)), url(media/webp/hexagon-shape-publisher-background.webp)` }}></span>
          <span ref={bFill} className="nm-fill" aria-hidden="true"></span>
          <span ref={bH} className="nm-htext" aria-hidden="true">Publisher</span>
          <span ref={bTxt} className="nm-dt">Start Earning <Arrow /></span>
        </a>
      </div>
    </section>
  );
}

/* ---------------- Footer (Midnight — shared anchor) ---------------- */
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
      <div className="wrap">
        <div aria-hidden="true" style={{ height: 1, background: 'var(--midnight-mid)', marginBottom: 56 }}></div>
        <div className="foot-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(3, 1fr)', gap: 32, paddingBottom: 48 }}>
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

Object.assign(window, { StatsSection, CaseStudies, FinalCTA, Footer });


/* ===== ia-app.jsx ===== */
// ia-app.jsx — Root: assembles sections, smooth scroll (Lenis), scroll-reveal, Tweaks.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "emphasis": "equal",
  "heroDark": false,
  "hex": 3,
  "smooth": true
}/*EDITMODE-END*/;

const EMPH_LABELS = { 'Equal': 'equal', 'Publisher': 'pub', 'Advertiser': 'adv' };
const EMPH_REV = { equal: 'Equal', pub: 'Publisher', adv: 'Advertiser' };

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const { emphasis, hex } = t;

  React.useEffect(() => { document.documentElement.style.setProperty('--hex', hex); }, [hex]);

  // ---- Lenis inertia smooth-scroll (off under reduced-motion or tweak) ----
  React.useEffect(() => {
    if (!t.smooth || prefersReduced() || !window.Lenis) return;
    const lenis = new window.Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.4 });
    window.__lenis = lenis;   // handle for programmatic scroll (dev/testing)
    const gsap = window.gsap, ST = window.ScrollTrigger;
    let raf = null, tick = null;
    if (gsap && ST) {
      // Canonical Lenis ⇄ ScrollTrigger integration: one clock. Driving Lenis
      // from GSAP's ticker (instead of a separate rAF) lets ScrollTrigger.refresh()
      // measure trigger positions reliably — a separate rAF made Lenis fight ST's
      // measure-time scroll-to-0, which mis-placed the pinned morph section.
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
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -80, duration: 1.1 }); }
    };
    document.addEventListener('click', onClick);
    return () => {
      if (tick && gsap) gsap.ticker.remove(tick);
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, [t.smooth]);

  // ---- Scroll-reveal: fade/translate-up as elements enter view ----
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'));
    if (prefersReduced()) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver((ents) => {
      ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);

  // ---- Scrubbed hero → trust-strip handoff (scroll-linked, eased, lagging) ----
  React.useEffect(() => {
    const hero = document.getElementById('hero');
    const content = document.querySelector('.hero-handoff');
    const trust = document.querySelector('.trust-handoff');
    const video = document.querySelector('.hero-video');
    if (!hero || !content || !trust) return;
    if (prefersReduced()) return;

    // Rest opacity comes from CSS so the Safari @supports fallback (lower, blend-free) flows through.
    const baseVidOpacity = video ? (parseFloat(getComputedStyle(video).opacity) || 0.32) : 0.32;

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const smoothstep = (t) => t * t * (3 - 2 * t);   // eased, not linear
    let cur = 0, target = 0;                          // hero exit progress
    let curE = 0, targetE = 0;                         // trust strip viewport-enter progress
    let raf = null, running = false;

    const computeTargets = () => {
      const scrolled = window.scrollY || window.pageYOffset || 0;
      const span = Math.max(1, hero.offsetHeight * 0.8);   // hero resolves over ~80% of its height
      target = clamp(scrolled / span, 0, 1);
      const r = trust.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      targetE = (vh - r.top) / (vh * 0.85);                // 0 as it touches the bottom edge, grows as it rises
    };

    const applyHero = (p) => {
      // Hero content drifts up and fades as it leaves.
      content.style.transform = `translate3d(0, ${(-p * 64).toFixed(2)}px, 0)`;
      content.style.opacity = (1 - p).toFixed(3);
      // Background video drifts DOWN and fades out — gone by the time the trust strip arrives.
      if (video) {
        const vp = clamp(p * 1.15, 0, 1);
        video.style.transform = `translate3d(0, ${(vp * 150).toFixed(1)}px, 0)`;
        video.style.opacity = (baseVidOpacity * (1 - vp)).toFixed(3);   // rest at CSS base (.32 Chrome / .14 Safari), fade to 0 on scroll
      }
    };
    const applyTrust = (e) => {
      // Rises from below, zooms slightly PAST normal as it arrives, then eases back to 1.0 on further scroll.
      const rise = clamp(e / 0.7, 0, 1);                   // arrival: rise + fade + initial grow
      const settle = clamp((e - 0.7) / 0.6, 0, 1);         // afterwards: zoom overshoot relaxes to normal
      const scale = 0.96 + smoothstep(rise) * 0.085 - smoothstep(settle) * 0.045;  // 0.96 → ~1.045 peak → 1.0
      const y = (1 - smoothstep(rise)) * 72;
      const op = smoothstep(clamp(e / 0.5, 0, 1));
      trust.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
      trust.style.opacity = op.toFixed(3);
    };

    const tick = () => {
      cur += (target - cur) * 0.12;                  // inertia: lags the scroll, feels weighted
      curE += (targetE - curE) * 0.12;
      if (Math.abs(target - cur) < 0.0006 && Math.abs(targetE - curE) < 0.0006) {
        cur = target; curE = targetE; running = false;
      }
      applyHero(smoothstep(clamp(cur, 0, 1)));
      applyTrust(curE);
      if (running) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!running) { running = true; raf = requestAnimationFrame(tick); } };
    const onScroll = () => { computeTargets(); kick(); };

    computeTargets();
    cur = target; curE = targetE;                    // no entrance jump on load
    applyHero(smoothstep(clamp(cur, 0, 1)));
    applyTrust(curE);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      content.style.transform = ''; content.style.opacity = '';
      trust.style.transform = ''; trust.style.opacity = '';
      if (video) { video.style.transform = ''; video.style.opacity = ''; }
    };
  }, []);

  // ---- Continuous warm-50 → Midnight surface transition (brief Change 3) ----
  // One scroll-tied interpolation drives a few root custom properties; CSS does the
  // rest (no per-frame JS over many elements). Starts as the stats section rises into
  // view and holds Midnight all the way down through the final CTA into the footer.
  // Text/elements invert in lockstep via --ink / --ink-soft; --darkp (0..1) drives the
  // nav logo + chrome crossfade. prefers-reduced-motion snaps instead of easing.
  React.useEffect(() => {
    // Desktop uses the honeycomb wipe for this boundary (stats owns a real Midnight bg
    // there); this continuous lerp remains ONLY as the mobile cross-fade / reduced-motion
    // snap fallback, per the motion spec.
    if (hexWipeEnabled()) return;
    const root = document.documentElement;
    const WARM = [248, 250, 250], MID = [15, 28, 46];        // --warm-50 (#F8FAFA) → --midnight
    const INK0 = [17, 17, 16], INK1 = [248, 250, 250];        // --warm-900 → --warm-50 (#F8FAFA)
    const SOFT0 = [75, 75, 70], SOFT1 = [210, 210, 204];      // --warm-600 → --warm-300
    const ADV0 = [61, 90, 128], ADV1 = [146, 175, 214];       // stat 'adv' accent: --midnight-light → #92AFD6 (readable on bright + dark)
    const lerp = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
    const rgb = (a) => `rgb(${a[0]}, ${a[1]}, ${a[2]})`;
    const ease = (t) => t * t * (3 - 2 * t);   // smoothstep — gentle in/out, no abrupt edges
    const reduce = prefersReduced();
    let last = -1;
    const apply = (p) => {
      root.style.setProperty('--surface', rgb(lerp(WARM, MID, p)));
      root.style.setProperty('--ink', rgb(lerp(INK0, INK1, p)));
      root.style.setProperty('--ink-soft', rgb(lerp(SOFT0, SOFT1, p)));
      root.style.setProperty('--stat-adv', rgb(lerp(ADV0, ADV1, p)));
      root.style.setProperty('--darkp', p.toFixed(3));
    };
    const compute = () => {
      const s = document.getElementById('stats');
      if (!s) { if (last !== 0) { last = 0; apply(0); } return; }
      const r = s.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Dark ONLY while the stats section holds the viewport (the "Mercury moment"),
      // then ease back to bright so the CTA below returns to light. The section stays
      // BRIGHT (matching the sections above) as it enters from the bottom, and only
      // transitions to Midnight once its top is scrolled well up into view — so the
      // darkening reads as "you've arrived at this section", not a premature dark band.
      const pIn = Math.max(0, Math.min(1, (vh * 0.6 - r.top) / (vh * 0.5)));    // enter → dark (held bright until scrolled in)
      const pOut = Math.max(0, Math.min(1, r.bottom / (vh * 1.0)));             // leave → bright
      const p = Math.min(pIn, pOut);
      const pe = reduce ? (p > 0.5 ? 1 : 0) : ease(p);
      if (Math.abs(pe - last) < 0.0015) return;   // skip redundant repaints
      last = pe;
      apply(pe);
    };
    compute();
    // Drive off the Lenis smooth-scroll clock when present, so the colour scrubs in
    // lockstep with the inertia scroll (buttery, no lag). Fall back to window scroll
    // (covers smooth-off / reduced-motion).
    const lenis = window.__lenis;
    if (lenis && lenis.on) lenis.on('scroll', compute);
    let raf = 0;
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; compute(); }); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (lenis && lenis.off) lenis.off('scroll', compute);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const gsTone = emphasis === 'pub' ? 'pub' : emphasis === 'adv' ? 'adv' : 'midnight';

  // Honeycomb-wipe mode (desktop + motion OK): the html class scopes the stats section's
  // Midnight background + inverted text vars; fallback modes keep the surface-lerp look.
  const wipeOn = React.useState(() => hexWipeEnabled())[0];
  React.useEffect(() => {
    document.documentElement.classList.toggle('hexwipe-on', wipeOn);
    return () => document.documentElement.classList.remove('hexwipe-on');
  }, [wipeOn]);

  return (
    <React.Fragment>
      <div className="app-surface" aria-hidden="true" />
      <Nav getStartedTone={gsTone} homeHref="#hero" />
      <main>
        <Hero dark={t.heroDark} hex={hex} emphasis={emphasis} />
        <TrustStrip />
        {/* concept-8: "keeps everyone moving, faster." tagline promoted into the hero — section removed (component kept below for revival) */}
        {/* <KeepsMoving /> */}
        <LiveDirectory />
        <StartToday />
        <SupportBanner />
        <SuccessSlider />
        <StatBand />
        <BlogSection />
        <HexFinale emphasis={emphasis} hex={hex} />
      </main>
      <Footer />
      <BackToTop />

      <TweaksPanel>
        <TweakSection label="Audience emphasis" />
        <TweakRadio label="Primary CTA" value={EMPH_REV[emphasis]} options={['Equal', 'Publisher', 'Advertiser']}
          onChange={(v) => setTweak('emphasis', EMPH_LABELS[v])} />
        <div style={{ font: '400 12px/1.5 var(--font-body)', color: 'var(--warm-400)', padding: '2px 2px 6px' }}>
          Equal = two distinct doors. Publisher fills Ember; Advertiser fills Midnight-Light.
        </div>

        <TweakSection label="Motion" />
        <TweakToggle label="Smooth scroll" value={t.smooth} onChange={(v) => setTweak('smooth', v)} />

        <TweakSection label="Hero" />
        <TweakToggle label="Midnight hero" value={t.heroDark} onChange={(v) => setTweak('heroDark', v)} />

        <TweakSection label="Hexagon motif" />
        <TweakSlider label="Intensity" value={t.hex} min={0} max={10} step={1} onChange={(v) => setTweak('hex', v)} />
      </TweaksPanel>

      <style>{`
        /* Continuous Midnight surface (Change 3). Defaults = warm top of page; the
           scroll handler interpolates these toward Midnight as the stats section enters. */
        :root{--surface:var(--warm-50); --ink:var(--warm-900); --ink-soft:var(--warm-600); --stat-adv:#3D5A80; --darkp:0;}
        .app-surface{position:fixed; inset:0; z-index:-1; background:var(--surface); pointer-events:none;}
        /* Honeycomb-wipe mode: stats is a true Midnight section behind the wipe; its text
           vars flip locally (heading/numbers white, subtext warm-300, adv accent light).
           Overlap: the wave scrubs over 75vh (lead) + 72vh (pin) = 147vh; 75% coverage lands
           36.75vh before the pin ends → margin-top:-36vh makes the section start sliding up
           from the bottom edge right at ~75% coverage, over the already-Midnight lower
           viewport (z-index above the pinned stage); it lands naturally at pin release.
           Keep this in sync with LEAD/PIN in HexWipe. */
        html.hexwipe-on #stats{background:var(--midnight) !important; --ink:var(--warm-50); --ink-soft:var(--warm-300); --stat-adv:#92AFD6;
          margin-top:-36vh; position:relative; z-index:2;}
        .hexwipe-stage{position:relative; height:100vh; overflow:hidden;}
        /* Enter stage rides up over the steps section's bottom padding — the wipe begins
           while that section is still on screen, trimming dead approach scroll. */
        .hexwipe-enter{margin-top:-12vh;}
        /* The case-studies section now sits directly after the exit wipe, so IT slides up
           over the exit stage's cleared lower viewport while the Midnight mass is still
           departing above (enters at exit progress ≈ 0.54). #cases has an opaque
           var(--surface) bg so it cleanly occludes the receding hexes. */
        html.hexwipe-on #cases{margin-top:-30vh; position:relative; z-index:2;}
        @media (max-width: 1024px){
          .offer-grid{grid-template-columns:repeat(3,1fr) !important;}
        }
        @media (max-width: 940px){
          .steps-grid{grid-template-columns:repeat(2,1fr) !important; gap:32px 20px !important;}
          .stats-grid{grid-template-columns:repeat(2,1fr) !important; gap:40px 20px !important;}
          .foot-grid{grid-template-columns:1fr 1fr !important;}
          .sec-pad{padding:72px 0 !important;}
        }
        @media (max-width: 760px){
          .offer-grid{grid-template-columns:repeat(2,1fr) !important;}
        }
        @media (max-width: 520px){
          .wrap{padding:0 20px !important;}
          .offer-grid{grid-template-columns:1fr !important;}
          .stats-grid{grid-template-columns:1fr !important;}
          .foot-grid{grid-template-columns:1fr !important;}
        }
      `}</style>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

