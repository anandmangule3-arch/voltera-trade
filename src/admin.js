import { useState, useRef } from 'react';
import { E, gbp, okm } from './h.js';
import { CATS, SPECFIELDS, OS } from './data.js';
import { parseCSV, toCSV, dl, FIELDS, TPL, sample } from './csv.js';
import { useC, imgOf } from './ui.js';
import { Fd } from './pages.js';

const Kpi = ({ v, l }) => E('div', 'kpi', E('b', null, v), E('span', 'mut', l));
const Tbl = ({ head, rows }) => E('div', 'scroll', E('table', null, E('thead', null, E('tr', null, head.map(h => E('th', { key: h }, h)))), E('tbody', null, rows)));

function Login() {
  const c = useC(), [u, setU] = useState('admin@voltera.demo'), [p, setP] = useState('demo1234'), [er, setEr] = useState('');
  return E('div', 'w sec narrow', E('div', 'panel', E('h1', null, 'Admin login'), E('p', 'note', 'Demo sign-in only. This check runs in the browser and is not secure. The production build uses server-side authentication and roles.'),
    E(Fd, { l: 'Email', v: u, on: setU }), E(Fd, { l: 'Password', v: p, on: setP, t: 'password' }), er && E('p', 'er', er),
    E('button', { className: 'btn', onClick: () => (u.trim() === 'admin@voltera.demo' && p === 'demo1234' ? c.setAuth(true) : setEr('Email or password is incorrect.')) }, 'Sign in')));
}

function Dash() {
  const c = useC(), rev = c.orders.filter(o => o.st !== 'Cancelled').reduce((a, o) => a + o.tot, 0), low = c.products.filter(p => p.st <= 20);
  return E('div', null, E('h1', null, 'Dashboard'),
    E('div', 'kpis', E(Kpi, { v: c.products.length, l: 'Products' }), E(Kpi, { v: c.orders.length, l: 'Orders this session' }), E(Kpi, { v: gbp(rev), l: 'Revenue inc VAT' }), E(Kpi, { v: c.apps.filter(a => a.st === 'Pending').length, l: 'Trade applications pending' }), E(Kpi, { v: low.length, l: 'Low or out of stock' })),
    E('div', 'panel', E('b', null, 'Low stock'), E(Tbl, { head: ['Product', 'SKU', 'Stock'], rows: low.slice(0, 8).map(p => E('tr', { key: p.id }, E('td', null, p.n), E('td', null, p.s), E('td', { className: p.st ? 'wn' : 'er' }, p.st))) })),
    E('div', 'panel', E('b', null, 'Recent orders'), c.orders.length ? E(Tbl, { head: ['Order', 'Customer', 'Total', 'Status'], rows: c.orders.slice(0, 6).map(o => E('tr', { key: o.id }, E('td', null, o.id), E('td', null, o.c.name), E('td', null, gbp(o.tot)), E('td', null, o.st))) }) : E('p', 'mut', 'No orders yet. Place one from the storefront.')));
}

function ProdAdmin() {
  const c = useC(), [s, setS] = useState(''), [add, setAdd] = useState(false), [f, setF] = useState({ n: '', s: '', b: '', c: 'cable', p: '', st: '', d: '', sp: {} }), [er, setEr] = useState('');
  const upd = (id, patch) => c.setProducts(c.products.map(p => (p.id === id ? { ...p, ...patch } : p)));
  const list = c.products.filter(p => !s || (p.n + p.s + p.b).toLowerCase().includes(s.toLowerCase()));
  const save = () => {
    const e = !f.n.trim() ? 'Product name is required.' : !f.s.trim() ? 'SKU is required.' : c.products.some(p => p.s.toLowerCase() === f.s.trim().toLowerCase()) ? 'That SKU already exists.' : !(+f.p > 0) ? 'Price must be above 0.' : '';
    if (e) return setEr(e);
    const cat = CATS.find(x => x.id === f.c);
    c.setProducts([...c.products, { id: Math.max(0, ...c.products.map(p => p.id)) + 1, n: f.n.trim(), b: f.b.trim() || 'Unbranded', c: f.c, kind: cat.kind, p: +f.p, st: Math.max(0, parseInt(f.st) || 0), s: f.s.trim(), d: f.d || 'No description yet.', sp: f.sp, tag: 'n', ean: '', on: true, img: null }]);
    setAdd(false); setEr(''); setF({ n: '', s: '', b: '', c: 'cable', p: '', st: '', d: '', sp: {} });
  };
  const file = (id, e) => { const fl = e.target.files[0]; if (!fl) return; const r = new FileReader(); r.onload = () => upd(id, { img: r.result }); r.readAsDataURL(fl); };
  return E('div', null, E('div', 'sh', E('h1', null, 'Products'), E('button', { className: 'btn', onClick: () => setAdd(!add) }, add ? 'Close' : 'Add product')),
    add && E('div', 'panel', E('div', 'two',
      E('div', null, E(Fd, { l: 'Product name', v: f.n, on: v => setF({ ...f, n: v }) }), E(Fd, { l: 'SKU', v: f.s, on: v => setF({ ...f, s: v }) }), E(Fd, { l: 'Manufacturer', v: f.b, on: v => setF({ ...f, b: v }) }),
        E('label', 'fd', 'Category', E('select', { className: 'in', value: f.c, onChange: e => setF({ ...f, c: e.target.value, sp: {} }) }, CATS.map(x => E('option', { key: x.id, value: x.id }, x.name)))),
        E(Fd, { l: 'Price ex VAT (£)', v: f.p, on: v => setF({ ...f, p: v }), t: 'number' }), E(Fd, { l: 'Stock', v: f.st, on: v => setF({ ...f, st: v }), t: 'number' }),
        E('label', 'fd', 'Description', E('textarea', { className: 'in', rows: 3, value: f.d, onChange: e => setF({ ...f, d: e.target.value }) }))),
      E('div', null, E('b', null, 'Specifications for ' + CATS.find(x => x.id === f.c).name), SPECFIELDS[f.c].map(k => E(Fd, { key: f.c + k, l: k, v: f.sp[k] || '', on: v => setF({ ...f, sp: { ...f.sp, [k]: v } }) })), er && E('p', 'er', er), E('button', { className: 'btn', onClick: save }, 'Save product')))),
    E('input', { className: 'in', placeholder: 'Search by name, SKU or brand', value: s, onChange: e => setS(e.target.value) }),
    E(Tbl, { head: ['Image', 'Product', 'SKU', 'Price ex VAT (£)', 'Stock', 'Live', 'Photo', ''], rows: list.slice(0, 60).map(p => E('tr', { key: p.id },
      E('td', null, E('img', { className: 'thm', src: imgOf(p), alt: '' })), E('td', null, p.n), E('td', null, p.s),
      E('td', null, E('input', { key: p.id + ':' + p.p, className: 'in sm', type: 'number', step: '0.01', min: 0, defaultValue: p.p, onBlur: e => upd(p.id, { p: Math.max(0, +e.target.value || 0) }) })),
      E('td', null, E('input', { key: p.id + ':s' + p.st, className: 'in sm', type: 'number', min: 0, defaultValue: p.st, onBlur: e => upd(p.id, { st: Math.max(0, parseInt(e.target.value) || 0) }) })),
      E('td', null, E('input', { type: 'checkbox', checked: p.on, onChange: e => upd(p.id, { on: e.target.checked }), 'aria-label': 'Live on storefront' })),
      E('td', null, E('input', { type: 'file', accept: 'image/*', onChange: e => file(p.id, e) })),
      E('td', null, E('button', { className: 'lnk', onClick: () => c.setProducts(c.products.filter(x => x.id !== p.id)) }, 'Delete')))) }),
    list.length > 60 && E('p', 'mut', 'Showing 60 of ' + list.length + '. Use search to narrow.'));
}

function OrdAdmin() {
  const c = useC();
  return E('div', null, E('h1', null, 'Orders'), c.orders.length ? E(Tbl, { head: ['Order', 'Date', 'Customer', 'Items', 'Total inc VAT', 'Payment', 'Status'], rows: c.orders.map(o => E('tr', { key: o.id },
    E('td', null, o.id, o.note && E('div', 'mut', o.note)), E('td', null, o.at), E('td', null, o.c.name, E('div', 'mut', o.c.email)), E('td', null, o.lines.map(l => E('div', { key: l.id }, l.s + ' ×' + l.q))), E('td', null, gbp(o.tot)), E('td', null, o.pay),
    E('td', null, E('select', { className: 'in', value: o.st, onChange: e => c.setOrderStatus(o.id, e.target.value) }, OS.map(s => E('option', { key: s }, s)))))) }) : E('p', 'mut', 'No orders yet. Add products to the basket and check out on the storefront.'));
}

function CqAdmin() {
  const c = useC(), qv = k => k.lines.reduce((a, l) => a + l.p * l.q, 0) * (1 - k.disc / 100);
  return E('div', null, E('h1', null, 'Trade applications'),
    c.apps.length ? E(Tbl, { head: ['ID', 'Company', 'Reg no.', 'Contact', 'Status', ''], rows: c.apps.map(t => E('tr', { key: t.id }, E('td', null, t.id), E('td', null, t.co), E('td', null, t.rg), E('td', null, t.ct, E('div', 'mut', t.em)), E('td', null, t.st), E('td', null, E('button', { className: 'pill', onClick: () => c.setApps(c.apps.map(x => (x.id === t.id ? { ...x, st: 'Approved' } : x))) }, 'Approve'), ' ', E('button', { className: 'pill', onClick: () => c.setApps(c.apps.map(x => (x.id === t.id ? { ...x, st: 'Rejected' } : x))) }, 'Reject')))) }) : E('p', 'mut', 'No applications yet. Submit one from Trade accounts.'),
    E('h1', { style: { marginTop: 32 } }, 'Quotations'),
    c.quotes.length ? E(Tbl, { head: ['ID', 'Customer', 'Project', 'Discount %', 'Quoted ex VAT', 'Status', ''], rows: c.quotes.map(k => E('tr', { key: k.id },
      E('td', null, k.id), E('td', null, k.c.name, E('div', 'mut', k.c.email)), E('td', null, k.proj),
      E('td', null, E('input', { key: k.id + k.disc, className: 'in sm', type: 'number', min: 0, max: 60, defaultValue: k.disc, onBlur: e => c.setQuotes(c.quotes.map(x => (x.id === k.id ? { ...x, disc: Math.min(60, Math.max(0, +e.target.value || 0)) } : x))) })),
      E('td', null, gbp(qv(k))), E('td', null, E('select', { className: 'in', value: k.st, onChange: e => c.setQuotes(c.quotes.map(x => (x.id === k.id ? { ...x, st: e.target.value } : x))) }, ['Requested', 'Sent', 'Accepted', 'Declined'].map(s => E('option', { key: s }, s)))),
      E('td', null, k.conv ? 'Order ' + k.conv : k.st === 'Accepted' ? E('button', { className: 'pill', onClick: () => { const o = c.placeOrder(k.lines.map(l => ({ ...l, p: l.p * (1 - k.disc / 100) })), k.c, 'From quotation ' + k.id); c.setQuotes(c.quotes.map(x => (x.id === k.id ? { ...x, conv: o.id } : x))); } }, 'Convert to order') : null))) }) : E('p', 'mut', 'No quotation requests yet. Request one from the basket.'));
}

function CsvBox({ name, text, label }) {
  const [open, setOpen] = useState(false);
  return E('span', null, E('button', { className: 'pill', onClick: () => setOpen(!open) }, open ? 'Hide ' + label : label), ' ', open && E('span', null, E('button', { className: 'pill', onClick: () => dl(name, text) }, 'Download file'), E('textarea', { className: 'in csv', readOnly: true, rows: 6, value: text, onFocus: e => e.target.select() })));
}

function Import() {
  const c = useC(), [st, setSt] = useState({ step: 1, file: '', hdr: [], rows: [], map: {}, mode: 'skip', fb: '', v: null, run: null, err: '' }), M = p => setSt(s => ({ ...s, ...p })), [hover, setHover] = useState(false), fi = useRef(null);
  const load = (text, name) => {
    const r = parseCSV(text); if (r.length < 2) return M({ err: 'The file has no data rows. Check it is a comma-separated CSV with a header row.' });
    const hdr = r[0].map(h => h.trim()), n = s => s.toLowerCase().replace(/[^a-z0-9]/g, ''), map = {};
    FIELDS.forEach(([k]) => { const i = hdr.findIndex(h => n(h) === n(k)); map[k] = i >= 0 ? String(i) : ''; });
    M({ step: 2, file: name, hdr, rows: r.slice(1), map, err: '' });
  };
  const read = f => { if (!f) return; const r = new FileReader(); r.onload = () => load(r.result, f.name); r.readAsText(f); };
  const validate = () => {
    const seen = new Set(), ok = [], err = [];
    st.rows.forEach((r, i) => {
      const g = k => (st.map[k] !== '' && st.map[k] !== undefined ? (r[+st.map[k]] || '').trim() : ''), e = [];
      const o = { line: i + 2, n: g('product_name'), s: g('sku'), b: g('manufacturer'), cn: g('category'), p: g('price_ex_vat'), st: g('stock_quantity'), ean: g('ean'), d: g('description') };
      const cat = CATS.find(x => x.name.toLowerCase() === o.cn.toLowerCase() || x.id === o.cn.toLowerCase()) || CATS.find(x => x.id === st.fb); o.cat = cat;
      if (!o.n) e.push('Product name is missing'); if (!o.s) e.push('SKU is missing'); else if (seen.has(o.s.toLowerCase())) e.push('Duplicate SKU inside this file');
      if (!cat) e.push(o.cn ? 'Category not found: ' + o.cn : 'Category is missing'); if (!/^\d+(\.\d+)?$/.test(o.p) || +o.p <= 0) e.push('Price must be a number above 0'); if (o.st !== '' && !/^\d+$/.test(o.st)) e.push('Stock must be a whole number, 0 or more');
      if (e.length) err.push({ ...o, msg: e.join('; '), raw: r }); else { seen.add(o.s.toLowerCase()); ok.push(o); }
    });
    M({ v: { ok, err }, step: 3 });
  };
  const run = () => {
    const { ok, err } = st.v, total = st.rows.length, t0 = Date.now(); let i = 0, okc = 0, upd = 0, skip = 0; M({ step: 4, run: { total, done: err.length, okc, upd, skip, fail: err.length, fin: false } });
    (function tick() {
      const end = Math.min(i + 25, ok.length), cur = [...c.pref.current]; let nid = Math.max(0, ...cur.map(p => p.id)) + 1;
      for (; i < end; i++) {
        const o = ok[i], ix = cur.findIndex(p => p.s.toLowerCase() === o.s.toLowerCase());
        if (ix >= 0) { if (st.mode === 'skip') skip++; else { cur[ix] = { ...cur[ix], p: +o.p, st: o.st !== '' ? +o.st : cur[ix].st }; upd++; } }
        else { cur.push({ id: nid++, n: o.n, b: o.b || 'Unbranded', c: o.cat.id, kind: o.cat.kind, p: +o.p, st: +(o.st || 0), s: o.s, d: o.d || 'Imported via bulk CSV (demo).', sp: {}, tag: '', ean: o.ean, on: true, img: null }); okc++; }
      }
      c.pref.current = cur; c.setProducts(cur);
      const done = err.length + i, fin = i >= ok.length; M({ run: { total, done, okc, upd, skip, fail: err.length, fin } });
      if (!fin) setTimeout(tick, 70); else c.setHist(h => [{ file: st.file, at: new Date().toLocaleString('en-GB'), total, ok: okc + upd, fail: err.length, sec: ((Date.now() - t0) / 1000).toFixed(1) }, ...h]);
    })();
  };
  const reset = () => setSt({ step: 1, file: '', hdr: [], rows: [], map: {}, mode: 'skip', fb: '', v: null, run: null, err: '' });
  const exportCsv = toCSV([FIELDS.map(f => f[0]), ...c.products.map(p => [p.n, p.s, p.b, CATS.find(x => x.id === p.c).name, p.p, p.st, p.ean, p.d])]);
  let body;
  if (st.step === 1) body = E('div', null, E('div', { className: 'drop' + (hover ? ' hv' : ''), onClick: () => fi.current.click(), onDragOver: e => { e.preventDefault(); setHover(true); }, onDragLeave: () => setHover(false), onDrop: e => { e.preventDefault(); setHover(false); read(e.dataTransfer.files[0]); } },
    E('b', null, 'Drop a CSV file here'), E('p', 'mut', 'or choose a file. Parsed in your browser; nothing is uploaded.'), E('input', { ref: fi, type: 'file', accept: '.csv,text/csv', hidden: true, onChange: e => read(e.target.files[0]) }), E('button', { className: 'btn', onClick: e => { e.stopPropagation(); fi.current.click(); } }, 'Choose CSV file')),
    st.err && E('p', 'er', st.err), E('p', null, E(CsvBox, { name: 'voltera-import-template.csv', text: TPL, label: 'CSV template' }), ' ', E('button', { className: 'pill', onClick: () => load(sample(), 'sample-products.csv') }, 'Load 120-row sample file'), ' ', E(CsvBox, { name: 'voltera-catalogue-export.csv', text: exportCsv, label: 'Export catalogue' })));
  if (st.step === 2) body = E('div', null, E('p', null, E('b', null, st.file), ' · ' + st.rows.length + ' rows · ' + st.hdr.length + ' columns'),
    E(Tbl, { head: ['System field', 'CSV column', 'First row'], rows: FIELDS.map(([k, l, rq]) => E('tr', { key: k }, E('td', null, l + (rq ? ' *' : '')), E('td', null, E('select', { className: 'in', value: st.map[k], onChange: e => M({ map: { ...st.map, [k]: e.target.value } }) }, E('option', { value: '' }, '– not mapped –'), st.hdr.map((h, i) => E('option', { key: i, value: String(i) }, h)))), E('td', 'mut', st.map[k] !== '' ? st.rows[0][+st.map[k]] : ''))) }),
    E('p', null, 'Unknown categories: ', E('select', { className: 'in', value: st.fb, onChange: e => M({ fb: e.target.value }) }, E('option', { value: '' }, 'Reject the row'), CATS.map(x => E('option', { key: x.id, value: x.id }, 'Assign to ' + x.name)))),
    E('p', null, E('button', { className: 'btn', disabled: !FIELDS.filter(f => f[2]).every(f => st.map[f[0]] !== ''), onClick: validate }, 'Validate data'), ' ', E('button', { className: 'pill', onClick: reset }, 'Start over')));
  if (st.step === 3) { const v = st.v, nd = v.ok.filter(o => c.products.some(p => p.s.toLowerCase() === o.s.toLowerCase())).length;
    body = E('div', null, E('div', 'kpis', E(Kpi, { v: st.rows.length, l: 'Rows' }), E(Kpi, { v: v.ok.length, l: 'Valid' }), E(Kpi, { v: v.err.length, l: 'Errors' }), E(Kpi, { v: nd, l: 'Existing SKUs' })),
      E('p', null, 'Existing SKUs: ', E('select', { className: 'in', value: st.mode, onChange: e => M({ mode: e.target.value }) }, E('option', { value: 'skip' }, 'Skip duplicates'), E('option', { value: 'upd' }, 'Update price and stock'))),
      v.err.length > 0 && E(Tbl, { head: ['Row', 'SKU', 'Problem'], rows: v.err.slice(0, 8).map(x => E('tr', { key: x.line }, E('td', null, x.line), E('td', null, x.s), E('td', 'er', x.msg))) }), v.err.length > 8 && E('p', 'mut', 'Showing 8 of ' + v.err.length + '. Full list is in the failed-rows report after import.'),
      E('p', null, E('button', { className: 'btn', disabled: !v.ok.length, onClick: run }, 'Start import (' + v.ok.length + ' rows)'), ' ', E('button', { className: 'pill', onClick: () => M({ step: 2 }) }, 'Back to mapping'))); }
  if (st.step === 4) { const r = st.run, failCsv = toCSV([[...st.hdr, 'error'], ...st.v.err.map(x => [...x.raw, x.msg])]);
    body = E('div', null, E('p', null, E('b', null, r.fin ? 'Import complete' : 'Importing…'), ' ' + st.file), E('div', 'prog', E('i', { style: { width: (r.done / r.total * 100) + '%' } })),
      E('div', 'kpis', E(Kpi, { v: r.total, l: 'Total' }), E(Kpi, { v: r.done, l: 'Processed' }), E(Kpi, { v: r.okc + r.upd, l: 'Successful' }), E(Kpi, { v: r.fail, l: 'Failed' }), E(Kpi, { v: r.skip, l: 'Skipped' }), E(Kpi, { v: r.total - r.done, l: 'Remaining' })),
      r.fin && E('p', null, E('a', { href: '#all', className: 'btn', onClick: () => c.setQ('') }, 'View imported products'), ' ', r.fail > 0 && E(CsvBox, { name: 'failed-rows.csv', text: failCsv, label: 'Failed-rows report' }), ' ', E('button', { className: 'pill', onClick: reset }, 'Import another file'))); }
  const S = ['Upload', 'Map columns', 'Validate', 'Import & report'];
  return E('div', null, E('h1', null, 'Bulk product import'), E('p', 'mut', 'Parsing, mapping, validation and import run in the browser against the demo catalogue. Production uses a Redis/BullMQ worker for 100,000+ rows.'),
    E('div', 'steps', S.map((x, i) => E('div', { key: x, className: i + 1 === st.step ? 'on' : i + 1 < st.step ? 'dn' : '' }, (i + 1 < st.step ? '✓ ' : '') + x))), E('div', 'panel', body),
    E('div', 'panel', E('b', null, 'Import history (this session)'), c.hist.length ? E(Tbl, { head: ['File', 'Date', 'Total', 'Successful', 'Failed', 'Time'], rows: c.hist.map((h, i) => E('tr', { key: i }, E('td', null, h.file), E('td', null, h.at), E('td', null, h.total), E('td', null, h.ok), E('td', null, h.fail), E('td', null, h.sec + 's'))) }) : E('p', 'mut', 'No imports yet.')));
}

export function Admin() {
  const c = useC(), [tab, setTab] = useState('dash');
  if (!c.auth) return E(Login);
  const tabs = [['dash', 'Dashboard'], ['prod', 'Products'], ['ord', 'Orders (' + c.orders.length + ')'], ['cq', 'Trade & quotes (' + (c.apps.length + c.quotes.length) + ')'], ['imp', 'Bulk import']];
  return E('div', 'adm', E('aside', 'as', E('b', null, 'Admin'), tabs.map(([k, l]) => E('button', { key: k, className: tab === k ? 'on' : '', onClick: () => setTab(k) }, l)), E('button', { onClick: () => { c.setAuth(false); c.nav('home'); } }, 'Log out')),
    E('div', 'am', tab === 'dash' ? E(Dash) : tab === 'prod' ? E(ProdAdmin) : tab === 'ord' ? E(OrdAdmin) : tab === 'cq' ? E(CqAdmin) : E(Import)));
}
