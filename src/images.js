// Product renders (vector, generated). Replace with real photography: upload per product in Admin,
// or set product.img to a URL / file in /public/products.
const R = (x, y, w, h, r, f, s) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}"${s ? ` stroke="${s}" stroke-width="1"` : ''}/>`;
const C = (x, y, r, f) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"/>`;
const T = (x, y, s, f, t) => `<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${s}" font-weight="700" text-anchor="middle" fill="${f}">${t}</text>`;
const G = (id, a, b) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const DEFS = `<defs>${G('m', '#fafbfc', '#b6bcc7')}${G('y', '#ffe866', '#eeb400')}${G('k', '#4a4e57', '#16171b')}${G('w', '#ffffff', '#dce0e6')}${G('g', '#e3f1ff', '#6f9fd0')}${G('s', '#27466e', '#0e1d33')}<radialGradient id="b0" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e4e7ec"/></radialGradient><radialGradient id="b1" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#fffbe0"/><stop offset="1" stop-color="#ffe56a"/></radialGradient><radialGradient id="b2" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#3a3d44"/><stop offset="1" stop-color="#141518"/></radialGradient></defs>`;
const S = {
  cable: () => `<g fill="none" stroke-linecap="round"><ellipse cx="100" cy="82" rx="62" ry="36" stroke="url(#m)" stroke-width="18"/><ellipse cx="100" cy="82" rx="36" ry="19" stroke="url(#m)" stroke-width="13"/><path d="M162 84q18 22-12 40" stroke="url(#m)" stroke-width="11"/><ellipse cx="100" cy="76" rx="62" ry="36" stroke="#fff" stroke-width="3" opacity=".7"/></g><ellipse cx="100" cy="82" rx="10" ry="5" fill="#e9ecf0"/>`,
  camera: () => `<ellipse cx="100" cy="104" rx="56" ry="14" fill="url(#m)"/><path d="M52 102a48 48 0 0 1 96 0z" fill="url(#w)" stroke="#cfd4db"/>${C(100, 84, 20, 'url(#k)')}${C(100, 84, 12, 'url(#g)')}${C(96, 80, 3, '#fff')}`,
  data: () => R(14, 46, 172, 58, 4, 'url(#k)') + Array.from({ length: 24 }, (_, i) => R(24 + (i % 12) * 13.5, 54 + Math.floor(i / 12) * 24, 10, 13, 1.5, '#8a8f99')).join('') + C(20, 75, 2.5, '#777') + C(180, 75, 2.5, '#777'),
  fan: () => R(40, 15, 120, 120, 10, 'url(#w)', '#cfd4db') + C(100, 75, 46, '#e4e7ec') + C(100, 75, 40, '#c9ced6') + [0, 1, 2, 3].map(i => `<ellipse cx="100" cy="59" rx="9" ry="22" fill="url(#m)" transform="rotate(${i * 90} 100 75)"/>`).join('') + C(100, 75, 7, 'url(#k)'),
  heater: () => R(24, 28, 152, 96, 6, 'url(#w)', '#cfd4db') + Array.from({ length: 12 }, (_, i) => R(36 + i * 11.5, 40, 5, 60, 2, '#cdd2da')).join('') + R(36, 106, 40, 8, 2, 'url(#k)') + C(150, 110, 5, 'url(#y)'),
  bulb: () => C(100, 58, 36, 'url(#w)') + C(100, 58, 17, '#ffe27a') + R(84, 88, 32, 10, 2, '#c9ced6') + R(84, 98, 32, 30, 4, 'url(#m)', '#b6bcc7') + [0, 1, 2].map(i => `<path d="M84 ${104 + i * 8}h32" stroke="#a7adb8"/>`).join(''),
  downlight: () => C(100, 75, 56, 'url(#m)') + C(100, 75, 46, 'url(#w)') + C(100, 75, 32, '#fff1a8') + C(100, 75, 16, '#ffd93d'),
  cu: () => R(36, 12, 128, 118, 6, 'url(#k)') + R(46, 22, 108, 98, 3, 'url(#w)') + [0, 1, 2, 3, 4].map(i => R(52 + i * 20, 30, 16, 40, 2, '#fff', '#b8bdc6') + R(55 + i * 20, 34, 10, 15, 2, '#171717') + R(52 + i * 20, 76, 16, 34, 2, '#fff', '#b8bdc6') + R(55 + i * 20, 80, 10, 12, 2, 'url(#y)')).join(''),
  mcb: () => R(76, 12, 48, 116, 6, 'url(#w)', '#b8bdc6') + R(86, 34, 28, 40, 3, 'url(#k)') + R(91, 40, 18, 14, 2, 'url(#y)') + T(100, 98, 12, '#333', 'B32') + R(86, 108, 28, 6, 2, '#c9ced6'),
  isolator: () => R(50, 16, 100, 114, 7, 'url(#m)', '#9aa0aa') + R(86, 46, 28, 54, 4, 'url(#k)') + R(91, 54, 18, 30, 2, 'url(#y)') + [[60, 26], [140, 26], [60, 120], [140, 120]].map(([x, y]) => C(x, y, 3, '#8a8f99')).join(''),
  socket: () => R(46, 16, 108, 108, 8, 'url(#w)', '#c9cdd4') + [0, 1].map(i => R(60, 30 + i * 46, 80, 38, 5, '#f0f1f4', '#d3d6dc') + C(80, 49 + i * 46, 3.5, '#555') + C(120, 49 + i * 46, 3.5, '#555') + C(100, 40 + i * 46, 3.5, '#555')).join(''),
  connector: () => R(24, 56, 152, 50, 9, 'url(#w)', '#c9cdd4') + [0, 1, 2].map(i => R(40 + i * 46, 40, 32, 20, 4, '#ff8a1f') + R(44 + i * 46, 66, 24, 26, 3, '#cfd3da')).join(''),
  panel: () => `<path d="M38 124 66 24H170L146 124Z" fill="url(#s)" stroke="url(#m)" stroke-width="4"/>` + [1, 2, 3, 4].map(i => `<path d="M${66 - i * 7 + 0} ${24 + i * 25}H${170 - i * 6}" stroke="#9fb6d6" stroke-opacity=".5"/>`).join('') + [1, 2, 3].map(i => `<path d="M${66 + i * 26} 24 ${38 + i * 27} 124" stroke="#9fb6d6" stroke-opacity=".5"/>`).join(''),
  inverter: () => R(44, 14, 112, 116, 9, 'url(#w)', '#c9cdd4') + R(58, 28, 84, 36, 4, 'url(#k)') + T(100, 52, 15, '#6df2a0', '5.0 kW') + C(68, 86, 5, '#2bd67b') + R(58, 100, 84, 6, 2, '#d6d9df') + R(58, 112, 84, 6, 2, '#d6d9df'),
  meter: () => R(58, 8, 84, 130, 13, 'url(#y)') + R(68, 18, 64, 34, 5, 'url(#k)') + T(100, 42, 18, '#6df2a0', '230.4') + C(100, 88, 22, 'url(#k)') + C(100, 88, 4, '#ffd500') + [76, 100, 124].map(x => C(x, 124, 5, '#222')).join(''),
  tester: () => R(30, 26, 140, 96, 10, 'url(#k)') + R(30, 26, 140, 20, 10, 'url(#y)') + R(44, 54, 70, 40, 4, '#16221d') + T(79, 80, 15, '#6df2a0', '0.82 MΩ') + C(138, 66, 11, '#3c4048') + C(138, 98, 11, '#3c4048') + [0, 1, 2, 3].map(i => R(44 + i * 18, 102, 14, 10, 2, '#5a5f69')).join(''),
  drill: () => `<path d="M30 46h100l22 16v26h-24l-8 38H92l8-38H30z" fill="url(#y)"/>` + R(152, 56, 22, 18, 3, 'url(#k)') + R(174, 60, 14, 10, 2, '#9aa0aa') + R(88, 92, 32, 38, 6, 'url(#k)') + R(40, 52, 40, 8, 3, '#171717')
};
export function art(kind, v = 0) {
  const g = (S[kind] || S.meter)();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">${DEFS}<rect width="200" height="150" fill="url(#b${v % 3})"/><ellipse cx="100" cy="138" rx="${v === 2 ? 60 : 56}" ry="5" fill="rgba(0,0,0,${v === 2 ? .5 : .13})"/><g transform="${v === 1 ? 'translate(100 75) scale(.88) translate(-100 -75)' : v === 2 ? 'translate(100 75) scale(1.08) translate(-100 -75)' : ''}">${g}</g></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}
