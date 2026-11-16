import { CATS } from './data.js';
export function parseCSV(t) {
  const r = []; let row = [], f = '', q = false; t = t.replace(/^\uFEFF/, '');
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(f); f = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && t[i + 1] === '\n') i++; row.push(f); r.push(row); row = []; f = ''; }
    else f += c;
  }
  if (f || row.length) { row.push(f); r.push(row); }
  return r.filter(x => x.some(y => y.trim()));
}
export const toCSV = rows => rows.map(r => r.map(c => { c = String(c == null ? '' : c); return /[",\n]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c; }).join(',')).join('\r\n');
export function dl(name, text) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv' }));
  a.download = name; document.body.appendChild(a); a.click(); a.remove();
}
export const FIELDS = [['product_name', 'Product name', 1], ['sku', 'SKU', 1], ['manufacturer', 'Manufacturer', 0], ['category', 'Category', 1], ['price_ex_vat', 'Price ex VAT (£)', 1], ['stock_quantity', 'Stock quantity', 0], ['ean', 'EAN', 0], ['description', 'Description', 0]];
export const TPL = toCSV([FIELDS.map(f => f[0]), ['Twin & Earth Cable 1.5 mm² – 100 m', 'EXAMPLE-001', 'Prysmian', 'Cable & Wiring', '64.90', '120', '5000123456789', 'Example description']]);
export function sample() {
  const rows = [FIELDS.map(f => f[0])], br = ['Hager', 'ABB', 'Eaton', 'Legrand', 'Crabtree', 'Click Scolmore'];
  for (let i = 1; i <= 120; i++) {
    let sku = 'BULK-' + String(i).padStart(4, '0'), pr = (5 + i * 1.7).toFixed(2), st = String(i * 3 % 200), cat = CATS[i % CATS.length].name;
    if (i === 15) pr = ''; if (i === 31) st = '-4'; if (i === 47) sku = 'BULK-0001'; if (i === 60) sku = 'DEMO-MCB32B'; if (i === 75) cat = 'Unknown category';
    rows.push(['Sample product ' + i, sku, br[i % 6], cat, pr, st, '', 'Sample row from demo file']);
  }
  return toCSV(rows);
}
