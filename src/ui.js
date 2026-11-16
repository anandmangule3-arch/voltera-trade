import { createContext, useContext, useState, useEffect } from 'react';
import { E, gbp } from './h.js';
import { CATS } from './data.js';
import { art } from './images.js';
export const Ctx = createContext(null);
export const useC = () => useContext(Ctx);
export const imgOf = (p, v = 0) => (v === 0 && p.img ? p.img : art(p.kind, v));

function Menu() {
  return E('nav', 'menu', E('div', 'w mi', CATS.map(x => E('div', { className: 'mc', key: x.id },
    E('a', { href: '#cat-' + x.id, className: 'mt' }, E('img', { src: art(x.kind, 0), alt: '' }), E('span', null, x.name)),
    E('div', 'mm', E('b', null, x.name), x.subs.map(s => E('a', { key: s, href: '#cat-' + x.id }, s)))))));
}

export function Header() {
  const c = useC();
  const [t, setT] = useState(''), [sc, setSc] = useState(''), [open, setOpen] = useState(false);
  const sug = t.length > 1 ? c.products.filter(p => p.on && (p.n + ' ' + p.b + ' ' + p.s + ' ' + p.ean).toLowerCase().includes(t.toLowerCase())).slice(0, 6) : [];
  const go = e => { e.preventDefault(); c.setQ(t); setOpen(false); c.nav(sc ? 'cat-' + sc : 'all'); };
  return E('header', 'hd',
    E('div', 'ann', E('div', 'w', E('span', null, 'Free UK delivery over £250 ex VAT'), E('span', null, 'Trade accounts · Support: 0000 000 0000 (demo)'))),
    E('div', 'w hb',
      E('a', { href: '#home', className: 'logo' }, 'Voltera', E('i', null, 'Trade')),
      E('form', { className: 'sf', onSubmit: go },
        E('select', { value: sc, onChange: e => setSc(e.target.value), 'aria-label': 'Category' }, E('option', { value: '' }, 'All'), CATS.map(x => E('option', { key: x.id, value: x.id }, x.name))),
        E('input', { value: t, onChange: e => { setT(e.target.value); setOpen(true); }, onBlur: () => setTimeout(() => setOpen(false), 180), placeholder: 'Search products, brands, manufacturers or product codes...', 'aria-label': 'Search products' }),
        E('button', { className: 'sb' }, 'Search'),
        open && sug.length > 0 && E('ul', 'sg', sug.map(p => E('li', { key: p.id }, E('a', { href: '#item-' + p.id }, E('img', { src: imgOf(p), alt: '' }), E('span', null, p.n), E('b', null, gbp(c.pr(p.p)))))))),
      E('div', 'ha',
        E('button', { className: 'pill', onClick: () => c.setInc(!c.inc) }, c.inc ? 'Inc VAT' : 'Ex VAT'),
        E('a', { href: '#wishlist', className: 'pill' }, 'Saved (' + c.wish.length + ')'),
        E('a', { href: '#admin', className: 'pill' }, c.auth ? 'Admin panel' : 'Admin login'),
        E('a', { href: '#basket', className: 'pill y' }, 'Basket (' + c.basket.reduce((a, l) => a + l.q, 0) + ')'))),
    E(Menu));
}

export function Card({ p }) {
  const c = useC();
  return E('article', 'pc',
    E('a', { href: '#item-' + p.id, className: 'pi' }, E('img', { src: imgOf(p), alt: p.n, loading: 'lazy' })),
    E('div', 'pb',
      E('span', 'br', p.b),
      E('a', { href: '#item-' + p.id, className: 'pt' }, p.n),
      E('span', { className: 'st ' + (p.st > 20 ? 'ok' : p.st > 0 ? 'wn' : 'er') }, p.st > 20 ? 'In stock' : p.st > 0 ? 'Low stock' : 'Out of stock'),
      E('div', 'pp', gbp(c.pr(p.p)), E('small', null, c.inc ? ' inc VAT' : ' ex VAT')),
      E('div', 'pa',
        E('button', { className: 'btn', disabled: !p.st, onClick: () => c.add(p) }, 'Add to basket'),
        E('button', { className: 'lnk', onClick: () => c.toggleWish(p.id) }, c.wish.includes(p.id) ? 'Saved' : 'Save'))));
}

export function Footer() {
  return E('footer', 'ft', E('div', 'w fg',
    E('div', null, E('div', 'logo', 'Voltera', E('i', null, 'Trade')), E('p', 'mut', 'Demo storefront. Products, prices, stock and contact details are placeholders until verified data is supplied.')),
    E('div', null, E('b', null, 'Shop'), CATS.slice(0, 6).map(x => E('a', { key: x.id, href: '#cat-' + x.id }, x.name))),
    E('div', null, E('b', null, 'Trade'), E('a', { href: '#trade' }, 'Open a trade account'), E('a', { href: '#quote' }, 'Request a quotation'), E('a', { href: '#admin' }, 'Admin login')),
    E('div', null, E('b', null, 'Customer service'), E('span', null, 'Delivery information'), E('span', null, 'Returns and refunds'), E('span', null, 'Privacy policy (to be supplied)'))));
}

export function Notice({ t, children }) {
  return E('div', 'w sec narrow', E('h1', null, t), E('p', 'mut', children), E('a', { href: '#all', className: 'btn' }, 'Browse products'));
}
