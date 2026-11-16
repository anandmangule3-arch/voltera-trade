import { useState, useEffect, useRef } from 'react';
import { E, now } from './h.js';
import { SEED, CATS } from './data.js';
import { Ctx, Header, Footer, Notice } from './ui.js';
import { Home, Shop, Item, Basket, Checkout, Order, Trade, Quote } from './pages.js';
import { Admin } from './admin.js';
import { DM } from './data.js';

export default function App() {
  const [route, setRoute] = useState((typeof location !== 'undefined' && location.hash.slice(1)) || 'home');
  useEffect(() => { const f = () => { setRoute(location.hash.slice(1) || 'home'); window.scrollTo(0, 0); }; window.addEventListener('hashchange', f); return () => window.removeEventListener('hashchange', f); }, []);
  const [products, setProducts] = useState(SEED), [basket, setBasket] = useState([]), [wish, setWish] = useState([]), [inc, setInc] = useState(false), [q, setQ] = useState('');
  const [orders, setOrders] = useState([]), [apps, setApps] = useState([]), [quotes, setQuotes] = useState([]), [auth, setAuth] = useState(false), [dm, setDm] = useState('std'), [hist, setHist] = useState([]);
  const pref = useRef(products); pref.current = products;
  const tradeOK = apps.some(a => a.st === 'Approved'), tp = p => (tradeOK ? p * .92 : p), pr = p => tp(p) * (inc ? 1.2 : 1);
  const ship = s => (dm === 'col' ? 0 : dm === 'std' && s >= 250 ? 0 : DM[dm][1]);
  const find = l => products.find(x => x.id === l.id || x.s === l.s);
  const ctx = {
    route, nav: r => { window.location.hash = r; }, products, setProducts, basket, setBasket, wish, inc, setInc, q, setQ, orders, apps, setApps, quotes, setQuotes, auth, setAuth, dm, setDm, hist, setHist, pref, tradeOK, tp, pr, ship,
    toggleWish: id => setWish(w => (w.includes(id) ? w.filter(x => x !== id) : [...w, id])),
    add: (p, n = 1) => setBasket(b => (b.find(l => l.id === p.id) ? b.map(l => (l.id === p.id ? { ...l, q: l.q + n } : l)) : [...b, { id: p.id, n: p.n, s: p.s, p: tp(p.p), q: n }])),
    placeOrder: (lines, cu, note) => {
      const s = lines.reduce((a, l) => a + l.p * l.q, 0), d = ship(s), o = { id: 'VT-' + (1001 + orders.length), at: now(), lines: lines.map(l => ({ ...l })), c: cu, sub: s, d, tot: (s + d) * 1.2, st: 'Pending', pay: 'Bank transfer – awaiting payment', note };
      setProducts(ps => ps.map(p => { const l = lines.find(x => x.id === p.id); return l ? { ...p, st: Math.max(0, p.st - l.q) } : p; })); setOrders(os => [o, ...os]); return o;
    },
    setOrderStatus: (id, st) => {
      const o = orders.find(x => x.id === id);
      if (st === 'Cancelled' && o.st !== 'Cancelled') setProducts(ps => ps.map(p => { const l = o.lines.find(x => x.id === p.id); return l ? { ...p, st: p.st + l.q } : p; }));
      setOrders(os => os.map(x => (x.id === id ? { ...x, st } : x)));
    },
    addApp: f => setApps(a => [{ id: 'T-' + (101 + a.length), at: now(), ...f, st: 'Pending' }, ...a]),
    addQuote: (lines, f) => { const id = 'Q-' + (1001 + quotes.length); setQuotes(qs => [{ id, at: now(), lines: lines.map(l => ({ ...l })), c: { name: f.n, email: f.e }, proj: f.pj, st: 'Requested', disc: 0 }, ...qs]); return id; }
  };
  const i = route.indexOf('-'), k = i < 0 ? route : route.slice(0, i), a = i < 0 ? '' : route.slice(i + 1);
  const page = k === 'home' ? E(Home) : k === 'cat' ? E(Shop, { key: a, cat: CATS.find(x => x.id === a) }) : k === 'all' ? E(Shop, { key: 'all' }) : k === 'wishlist' ? E(Shop, { wish: true }) : k === 'item' ? E(Item, { key: a, id: a }) : k === 'basket' ? E(Basket)
    : k === 'checkout' ? E(Checkout) : k === 'order' ? E(Order, { id: a }) : k === 'trade' ? E(Trade) : k === 'quote' ? E(Quote) : k === 'admin' ? E(Admin) : E(Home);
  return E(Ctx.Provider, { value: ctx }, E(Header), E('main', null, page), E(Footer));
}
