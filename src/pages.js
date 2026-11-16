import { useState, useEffect } from 'react';
import { E, gbp, okm } from './h.js';
import { CATS, DM, hay } from './data.js';
import { art } from './images.js';
import { useC, imgOf, Card, Notice } from './ui.js';

const SL = [
  { k: 'cu', t: 'Powering every project.', s: 'From first fix to final installation – trade-quality electrical supplies, delivered across the UK.', a: ['Shop products', '#all'] },
  { k: 'panel', t: 'Solar & renewables, ready to install.', s: 'Panels, inverters and mounting from trusted manufacturers, with trade pricing for approved accounts.', a: ['Shop solar', '#cat-solar'] },
  { k: 'meter', t: 'Test with confidence.', s: 'Professional multimeters, installation testers and tools for every electrician.', a: ['Shop tools', '#cat-tools'] }
];
const Row = ({ title, sub, list, more }) => E('section', 'sec', E('div', 'w', E('div', 'sh', E('div', null, E('h2', null, title), E('p', 'mut', sub)), more && E('a', { href: more, className: 'pill' }, 'View all')), E('div', 'grid', list.map(p => E(Card, { key: p.id, p })))));

export function Home() {
  const c = useC(), [i, setI] = useState(0), [em, setEm] = useState(''), [ok, setOk] = useState(false);
  useEffect(() => { const t = setInterval(() => setI(x => (x + 1) % SL.length), 6500); return () => clearInterval(t); }, []);
  const s = SL[i], on = c.products.filter(p => p.on), tag = t => on.filter(p => p.tag.includes(t)).slice(0, 4);
  return E('div', null,
    E('section', 'hero', E('div', 'w hg',
      E('div', 'ht', E('span', 'eyebrow', 'UK electrical wholesale'), E('h1', null, s.t), E('p', null, s.s),
        E('div', 'row', E('a', { href: s.a[1], className: 'btn blk' }, s.a[0]), E('a', { href: '#trade', className: 'btn ghost' }, 'Open a trade account')),
        E('div', 'dots', SL.map((_, n) => E('button', { key: n, className: n === i ? 'on' : '', onClick: () => setI(n), 'aria-label': 'Slide ' + (n + 1) })))),
      E('div', 'hi', E('img', { src: art(s.k, 0), alt: '' })))),
    E('section', 'sec', E('div', 'w', E('div', 'sh', E('div', null, E('h2', null, 'Shop by category'), E('p', 'mut', 'Nine departments, built from the same catalogue the admin manages.'))),
      E('div', 'cats', CATS.map(x => E('a', { key: x.id, href: '#cat-' + x.id, className: 'cc' },
        E('div', 'ci', E('img', { src: art(x.kind, 0), alt: x.name })),
        E('b', null, x.name), E('span', 'mut', on.filter(p => p.c === x.id).length + ' products'), E('small', 'mut', x.subs.slice(0, 3).join(' · ')), E('span', 'go', 'Shop now')))))),
    E(Row, { title: 'Featured products', sub: 'Hand-picked lines trade customers rely on.', list: tag('f'), more: '#all' }),
    E('section', 'w deals',
      E('a', { href: '#trade', className: 'dl k' }, E('b', null, 'Better prices. Built for trade.'), E('span', null, 'Apply for a trade account and see account pricing.')),
      E('a', { href: '#all', className: 'dl y' }, E('b', null, 'Free UK delivery'), E('span', null, 'On orders over £250 ex VAT.')),
      E('a', { href: '#quote', className: 'dl g' }, E('b', null, 'Bulk project?'), E('span', null, 'Request a quotation for the whole list.'))),
    E(Row, { title: 'Best sellers', sub: 'Most ordered across the trade counter.', list: tag('b') }),
    E(Row, { title: 'New arrivals', sub: 'Recently added to the range.', list: tag('n') }),
    E('section', 'sec g', E('div', 'w', E('h2', null, 'Leading brands'), E('div', 'brands', [...new Set(on.map(p => p.b))].map(b => E('button', { key: b, className: 'bp', onClick: () => { c.setQ(b); c.nav('all'); } }, b))))),
    E('section', 'sec', E('div', 'w why', [['Trade-ready pricing', 'Account pricing and quotations for approved businesses.'], ['Accurate specifications', 'Category-specific technical data on every product.'], ['UK delivery rules', 'Configurable delivery, VAT and click and collect.'], ['One catalogue', 'Admin changes appear on the storefront instantly.']].map(([a, b]) => E('div', { key: a }, E('b', null, a), E('p', 'mut', b))))),
    E('section', 'sec g', E('div', 'w narrow news', E('h2', null, 'Trade offers in your inbox'), ok ? E('p', 'ok', 'Thanks – demo only, nothing is stored.') : E('div', 'row', E('input', { className: 'in', value: em, placeholder: 'Email address', onChange: e => setEm(e.target.value) }), E('button', { className: 'btn', onClick: () => okm(em) && setOk(true) }, 'Subscribe')))));
}

export function Shop({ cat, wish }) {
  const c = useC(), [br, setBr] = useState([]), [mn, setMn] = useState(''), [mx, setMx] = useState(''), [so, setSo] = useState('rel'), [ins, setIns] = useState(false);
  const base = c.products.filter(p => p.on && (!cat || p.c === cat.id) && (!wish || c.wish.includes(p.id)) && (!c.q || hay(p).includes(c.q.toLowerCase())));
  const brands = [...new Set(base.map(p => p.b))].sort();
  let list = base.filter(p => (!br.length || br.includes(p.b)) && (!mn || p.p >= +mn) && (!mx || p.p <= +mx) && (!ins || p.st > 0));
  if (so === 'lo') list = [...list].sort((a, b) => a.p - b.p); if (so === 'hi') list = [...list].sort((a, b) => b.p - a.p); if (so === 'az') list = [...list].sort((a, b) => a.n.localeCompare(b.n));
  const title = wish ? 'Saved products' : cat ? cat.name : 'All products';
  return E('div', 'w shop',
    E('aside', 'fl',
      E('b', null, 'Categories'), E('a', { href: '#all', className: !cat && !wish ? 'on' : '' }, 'All products'),
      CATS.map(x => E('a', { key: x.id, href: '#cat-' + x.id, className: cat && cat.id === x.id ? 'on' : '' }, x.name)),
      E('b', null, 'Brand'), brands.map(b => E('label', { key: b, className: 'ck' }, E('input', { type: 'checkbox', checked: br.includes(b), onChange: () => setBr(br.includes(b) ? br.filter(x => x !== b) : [...br, b]) }), b)),
      E('b', null, 'Price ex VAT (£)'), E('div', 'row', E('input', { className: 'in', type: 'number', placeholder: 'Min', value: mn, onChange: e => setMn(e.target.value) }), E('input', { className: 'in', type: 'number', placeholder: 'Max', value: mx, onChange: e => setMx(e.target.value) })),
      E('label', 'ck', E('input', { type: 'checkbox', checked: ins, onChange: () => setIns(!ins) }), 'In stock only')),
    E('section', null,
      E('div', 'bc', E('a', { href: '#home' }, 'Home'), ' / ' + title),
      E('div', 'sh', E('div', null, E('h1', null, title), E('p', 'mut', list.length + ' product' + (list.length === 1 ? '' : 's') + (c.q ? ' matching “' + c.q + '”' : '')), c.q && E('button', { className: 'lnk', onClick: () => c.setQ('') }, 'Clear search')),
        E('select', { className: 'in', value: so, onChange: e => setSo(e.target.value), 'aria-label': 'Sort' }, E('option', { value: 'rel' }, 'Relevance'), E('option', { value: 'lo' }, 'Price: low to high'), E('option', { value: 'hi' }, 'Price: high to low'), E('option', { value: 'az' }, 'Name A–Z'))),
      list.length ? E('div', 'grid g3', list.map(p => E(Card, { key: p.id, p }))) : E('p', 'mut', 'No products match. Try a SKU, brand or clear the filters.')));
}

export function Item({ id }) {
  const c = useC(), p = c.products.find(x => x.id === +id), [v, setV] = useState(0), [qty, setQty] = useState(1), [z, setZ] = useState('50% 50%');
  if (!p) return E(Notice, { t: 'Product not found' }, 'This product is not in the catalogue.');
  const cat = CATS.find(x => x.id === p.c), rel = c.products.filter(x => x.on && x.c === p.c && x.id !== p.id).slice(0, 4), ex = c.tp(p.p);
  return E('div', 'w',
    E('div', 'bc', E('a', { href: '#home' }, 'Home'), ' / ', E('a', { href: '#cat-' + p.c }, cat.name), ' / ' + p.n),
    E('div', 'pd',
      E('div', 'gal', E('div', { className: 'zoom', onMouseMove: e => { const r = e.currentTarget.getBoundingClientRect(); setZ(((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%'); } }, E('img', { src: imgOf(p, v), alt: p.n, style: { transformOrigin: z } })),
        E('div', 'th', [0, 1, 2].map(n => E('button', { key: n, className: n === v ? 'on' : '', onClick: () => setV(n), 'aria-label': 'View ' + (n + 1) }, E('img', { src: imgOf(p, n), alt: '' }))))),
      E('div', 'inf', E('span', 'br', p.b), E('h1', null, p.n),
        E('div', 'big', gbp(c.pr(p.p)), E('small', null, c.inc ? ' inc VAT' : ' ex VAT')), E('p', 'mut', gbp(ex) + ' ex VAT · ' + gbp(ex * 1.2) + ' inc VAT (20%)'),
        E('p', null, p.d),
        E('dl', 'meta', E('dt', null, 'SKU'), E('dd', null, p.s), E('dt', null, 'EAN'), E('dd', null, p.ean), E('dt', null, 'Availability'), E('dd', { className: p.st > 20 ? 'ok' : p.st > 0 ? 'wn' : 'er' }, p.st > 20 ? 'In stock' : p.st > 0 ? 'Only ' + p.st + ' left' : 'Out of stock'),
          E('dt', null, 'Trade price'), E('dd', null, c.tradeOK ? 'Trade pricing applied (8% off, demo)' : E('a', { href: '#trade', className: 'ul' }, 'Apply for a trade account'))),
        E('div', 'buy', E('input', { className: 'in', type: 'number', min: 1, value: qty, onChange: e => setQty(Math.max(1, parseInt(e.target.value) || 1)), 'aria-label': 'Quantity' }),
          E('button', { className: 'btn', disabled: !p.st, onClick: () => c.add(p, qty) }, 'Add to basket'), E('button', { className: 'btn ghost', onClick: () => c.toggleWish(p.id) }, c.wish.includes(p.id) ? 'Saved' : 'Save'), E('a', { href: '#quote', className: 'btn ghost', onClick: () => c.add(p, qty) }, 'Request a quotation')))),
    E('section', 'sec narrow0', E('h2', null, 'Technical specifications'), E('table', 'spec', E('tbody', null, Object.entries(p.sp).concat([['Manufacturer', p.b], ['SKU', p.s], ['EAN', p.ean]]).map(([k, x]) => E('tr', { key: k }, E('th', null, k), E('td', null, x)))))),
    rel.length > 0 && E('section', 'sec', E('h2', null, 'Related products'), E('div', 'grid', rel.map(x => E(Card, { key: x.id, p: x })))));
}

const Lines = ({ lines }) => E('div', 'scroll', E('table', null, E('tbody', null, lines.map((l, i) => E('tr', { key: i }, E('td', null, l.n, E('br'), E('small', 'mut', l.s)), E('td', null, '×' + l.q), E('td', null, gbp(l.p * l.q)))))));
export const Fd = ({ l, v, on, t }) => E('label', 'fd', l, E('input', { className: 'in', type: t || 'text', value: v, onChange: e => on(e.target.value) }));

export function Basket() {
  const c = useC(), s = c.basket.reduce((a, l) => a + l.p * l.q, 0);
  if (!c.basket.length) return E(Notice, { t: 'Your basket is empty' }, 'Add products to continue.');
  return E('div', 'w sec', E('h1', null, 'Basket'), E('div', 'scroll', E('table', null, E('thead', null, E('tr', null, ['Product', 'SKU', 'Qty', 'Unit ex VAT', 'Line ex VAT', ''].map(h => E('th', { key: h }, h)))),
    E('tbody', null, c.basket.map(l => E('tr', { key: l.id }, E('td', null, l.n), E('td', null, l.s), E('td', null, E('input', { className: 'in sm', type: 'number', min: 1, value: l.q, onChange: e => c.setBasket(c.basket.map(x => x.id === l.id ? { ...x, q: Math.max(1, parseInt(e.target.value) || 1) } : x)) })), E('td', null, gbp(l.p)), E('td', null, gbp(l.p * l.q)), E('td', null, E('button', { className: 'lnk', onClick: () => c.setBasket(c.basket.filter(x => x.id !== l.id)) }, 'Remove'))))))),
    E('p', 'tr', 'Subtotal ' + gbp(s) + ' · VAT (20%) ' + gbp(s * .2) + ' · ', E('b', null, 'Total ' + gbp(s * 1.2))),
    E('p', 'tr', E('a', { href: '#quote', className: 'btn ghost' }, 'Request a quotation'), ' ', E('a', { href: '#checkout', className: 'btn' }, 'Proceed to checkout')));
}

export function Checkout() {
  const c = useC(), [f, setF] = useState({ name: '', email: '', phone: '', a1: '', city: '', pc: '' }), [er, setEr] = useState(''), set = k => v => setF({ ...f, [k]: v });
  if (!c.basket.length) return E(Notice, { t: 'Checkout' }, 'Your basket is empty.');
  const s = c.basket.reduce((a, l) => a + l.p * l.q, 0), d = c.ship(s);
  const place = () => {
    const pc = f.pc.trim().toUpperCase();
    const e = !f.name.trim() ? 'Enter your full name.' : !okm(f.email.trim()) ? 'Enter a valid email address.' : f.phone.replace(/\D/g, '').length < 10 ? 'Enter a UK telephone number.' : !f.a1.trim() || !f.city.trim() ? 'Enter your delivery address.' : !/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/.test(pc) ? 'Enter a valid UK postcode, for example SW1A 1AA.' : '';
    if (e) return setEr(e);
    const o = c.placeOrder(c.basket, { ...f, pc }); c.setBasket([]); c.nav('order-' + o.id);
  };
  return E('div', 'w sec', E('h1', null, 'Checkout'), E('p', 'note', 'Demo: no payment is taken. The order is created as pending bank transfer and stock is reserved.'),
    E('div', 'two', E('div', null, E(Fd, { l: 'Full name', v: f.name, on: set('name') }), E(Fd, { l: 'Email', v: f.email, on: set('email') }), E(Fd, { l: 'Telephone', v: f.phone, on: set('phone') }), E(Fd, { l: 'Delivery address line 1', v: f.a1, on: set('a1') }), E(Fd, { l: 'Town / city', v: f.city, on: set('city') }), E(Fd, { l: 'Postcode', v: f.pc, on: set('pc') }),
      E('label', 'fd', 'Delivery method', E('select', { className: 'in', value: c.dm, onChange: e => c.setDm(e.target.value) }, Object.entries(DM).map(([k, x]) => E('option', { key: k, value: k }, x[0] + (k === 'std' ? ' – £6.95, free over £250 ex VAT' : k === 'nxt' ? ' – £12.95' : ' – free'))))),
      er && E('p', 'er', er), E('button', { className: 'btn', onClick: place }, 'Place order')),
      E('div', null, E('b', null, 'Order summary'), E(Lines, { lines: c.basket }), E('table', null, E('tbody', null, E('tr', null, E('td', null, 'Subtotal ex VAT'), E('td', null, gbp(s))), E('tr', null, E('td', null, 'Delivery'), E('td', null, d ? gbp(d) : 'Free')), E('tr', null, E('td', null, 'VAT (20%)'), E('td', null, gbp((s + d) * .2))), E('tr', null, E('th', null, 'Total'), E('th', null, gbp((s + d) * 1.2))))))));
}

export function Order({ id }) {
  const c = useC(), o = c.orders.find(x => x.id === id);
  if (!o) return E(Notice, { t: 'Order not found' }, 'This order is not in the current session.');
  return E('div', 'w sec narrow', E('h1', null, 'Thank you – order ' + o.id + ' received'), E('p', 'mut', 'Status: ' + o.st + '. ' + o.pay + '. In the full build, payment instructions are emailed to ' + o.c.email + '.'), E(Lines, { lines: o.lines }), E('p', 'tr', E('b', null, 'Total inc VAT ' + gbp(o.tot))), E('a', { href: '#home', className: 'btn' }, 'Continue shopping'));
}

export function Trade() {
  const c = useC(), [f, setF] = useState({ co: '', rg: '', vat: '', ct: '', em: '', ph: '', bt: 'Electrical contractor' }), [er, setEr] = useState(''), [done, setDone] = useState(false), set = k => v => setF({ ...f, [k]: v });
  if (done) return E(Notice, { t: 'Application received' }, 'An administrator reviews trade applications. Once approved, trade pricing applies (Admin login → Trade & quotes).');
  const sub = () => { if (!f.co.trim() || !/^[A-Za-z0-9]{8}$/.test(f.rg.trim()) || !f.ct.trim() || !okm(f.em.trim())) return setEr('Enter company name, an 8-character company registration number, contact name and a valid email.'); c.addApp(f); setDone(true); };
  return E('div', 'w sec narrow', E('h1', null, 'Open a trade account'), E('p', 'mut', 'Approved accounts see trade pricing and can request quotations. Business customers are not assumed VAT exempt.'),
    E(Fd, { l: 'Company name', v: f.co, on: set('co') }), E(Fd, { l: 'Company registration number', v: f.rg, on: set('rg') }), E(Fd, { l: 'VAT number (optional)', v: f.vat, on: set('vat') }), E(Fd, { l: 'Contact name', v: f.ct, on: set('ct') }), E(Fd, { l: 'Email', v: f.em, on: set('em') }), E(Fd, { l: 'Telephone', v: f.ph, on: set('ph') }),
    E('label', 'fd', 'Business type', E('select', { className: 'in', value: f.bt, onChange: e => set('bt')(e.target.value) }, ['Electrical contractor', 'Commercial installer', 'Industrial facility', 'Solar installer', 'Maintenance company'].map(x => E('option', { key: x }, x)))),
    er && E('p', 'er', er), E('button', { className: 'btn', onClick: sub }, 'Submit application'));
}

export function Quote() {
  const c = useC(), [f, setF] = useState({ n: '', e: '', pj: '' }), [er, setEr] = useState(''), [ref, setRef] = useState(''), set = k => v => setF({ ...f, [k]: v });
  if (ref) return E(Notice, { t: 'Quotation requested' }, 'Reference ' + ref + '. Sales reviews it in the admin area (Trade & quotes).');
  if (!c.basket.length) return E(Notice, { t: 'Request a quotation' }, 'Add the products you need to your basket first, then request a quotation for the whole list.');
  const sub = () => { if (!f.n.trim() || !okm(f.e.trim())) return setEr('Enter your name and a valid email address.'); setRef(c.addQuote(c.basket, f)); };
  return E('div', 'w sec narrow', E('h1', null, 'Request a quotation'), E(Lines, { lines: c.basket }), E(Fd, { l: 'Name', v: f.n, on: set('n') }), E(Fd, { l: 'Email', v: f.e, on: set('e') }),
    E('label', 'fd', 'Project details', E('textarea', { className: 'in', rows: 4, value: f.pj, onChange: e => set('pj')(e.target.value) })), er && E('p', 'er', er), E('button', { className: 'btn', onClick: sub }, 'Submit request'));
}
