// All product data below is DEMO data. Replace with verified catalogue data / your API.
export const CATS = [
  { id: 'cable', name: 'Cable & Wiring', kind: 'cable', subs: ['Twin & Earth', 'Armoured SWA', 'Flexible cable', 'Fire-resistant cable', 'Solar cable'] },
  { id: 'cctv', name: 'CCTV, Fire & Security', kind: 'camera', subs: ['IP cameras', 'NVR & DVR', 'Smoke detectors', 'Fire alarm panels', 'Door entry'] },
  { id: 'data', name: 'Data & Cable Management', kind: 'data', subs: ['Cat6 cable', 'Patch leads', 'Network switches', 'Trunking', 'Cable tray'] },
  { id: 'hv', name: 'Heating & Ventilation', kind: 'fan', subs: ['Extractor fans', 'Panel heaters', 'Air curtains', 'Electric showers'] },
  { id: 'lamps', name: 'Lamps & Lighting', kind: 'bulb', subs: ['LED bulbs', 'Downlights', 'LED panels', 'Floodlights', 'Emergency lighting'] },
  { id: 'protect', name: 'Circuit Protection', kind: 'cu', subs: ['Consumer units', 'MCBs', 'RCBOs', 'Surge protection', 'Isolators'] },
  { id: 'wiring', name: 'Wiring Accessories', kind: 'socket', subs: ['Sockets', 'Switches', 'Dimmers', 'Back boxes', 'Weatherproof'] },
  { id: 'solar', name: 'Solar & Renewables', kind: 'panel', subs: ['Solar panels', 'Inverters', 'Batteries', 'EV chargers', 'Mounting'] },
  { id: 'tools', name: 'Electrical Tools & Accessories', kind: 'meter', subs: ['Multimeters', 'Test equipment', 'Hand tools', 'Power tools'] }
];
// Category-specific specification fields (drives the Add Product form)
export const SPECFIELDS = {
  cable: ['Cable type', 'Cores', 'Cross-sectional area', 'Conductor', 'Voltage rating'],
  cctv: ['Resolution', 'Camera type', 'Lens', 'Night vision', 'IP rating'],
  data: ['Category', 'Length / ports', 'Shielding'],
  hv: ['Power', 'Size', 'IP rating'],
  lamps: ['Wattage', 'Lumens', 'Colour temperature', 'Voltage'],
  protect: ['Poles', 'Rated current', 'Breaking capacity', 'Trip curve'],
  wiring: ['Gangs', 'Rating', 'Finish'],
  solar: ['Power', 'Efficiency', 'Technology'],
  tools: ['Category rating', 'Power source', 'Functions']
};
const mk = (id, n, b, c, kind, p, st, s, d, sp, tag = '') => ({ id, n, b, c, kind, p, st, s, d, sp, tag, ean: '5000' + String(100000000 + id * 7919), on: true, img: null });
export const SEED = [
  mk(1, 'Twin & Earth Cable 6242Y 2.5 mm² – 100 m', 'Prysmian', 'cable', 'cable', 98.5, 420, 'DEMO-TE25-100', 'Flat twin and earth PVC cable for fixed wiring in domestic and commercial installations.', { 'Cable type': '6242Y twin & earth', 'Cores': '2 + CPC', 'Cross-sectional area': '2.5 mm²', 'Conductor': 'Copper', 'Voltage rating': '300/500 V' }, 'fb'),
  mk(2, 'SWA Armoured Cable 3 Core 2.5 mm² – 50 m', 'Nexans', 'cable', 'cable', 142, 64, 'DEMO-SWA3C25', 'Steel wire armoured power cable for underground and outdoor runs.', { 'Cable type': 'SWA, LSZH sheath', 'Cores': '3', 'Cross-sectional area': '2.5 mm²', 'Conductor': 'Copper', 'Voltage rating': '600/1000 V' }, 'n'),
  mk(3, '4 MP IP Dome Camera, PoE', 'Bosch', 'cctv', 'camera', 119, 38, 'DEMO-CAM4MP', 'Vandal-resistant dome camera with infrared night vision for commercial sites.', { 'Resolution': '4 MP', 'Camera type': 'Dome, PoE', 'Lens': '2.8 mm fixed', 'Night vision': '30 m IR', 'IP rating': 'IP67' }, 'f'),
  mk(4, '8 MP Bullet Camera, PoE', 'Bosch', 'cctv', 'camera', 149, 22, 'DEMO-CAM8MP', 'High-resolution outdoor bullet camera with wide dynamic range.', { 'Resolution': '8 MP', 'Camera type': 'Bullet, PoE', 'Lens': '4 mm fixed', 'Night vision': '40 m IR', 'IP rating': 'IP67' }, 'n'),
  mk(5, 'Cat6 UTP Cable – 305 m Box', 'Nexans', 'data', 'data', 112, 150, 'DEMO-CAT6-305', 'Solid-core Cat6 UTP cable for structured cabling and patch panels.', { 'Category': 'Cat6', 'Length / ports': '305 m', 'Shielding': 'UTP' }, 'b'),
  mk(6, '24-Port Cat6 Patch Panel, 1U', 'Legrand', 'data', 'data', 46.5, 40, 'DEMO-PP24', 'Rack-mounted 24-port Cat6 patch panel with cable management bar.', { 'Category': 'Cat6', 'Length / ports': '24 ports, 1U', 'Shielding': 'UTP' }),
  mk(7, 'Bathroom Extractor Fan 100 mm, Timer', 'Xpelair', 'hv', 'fan', 38.9, 210, 'DEMO-FAN100', 'Quiet axial extractor fan with overrun timer for bathrooms and toilets.', { 'Power': '15 W', 'Size': '100 mm', 'IP rating': 'IPX4' }, 'fb'),
  mk(8, '2 kW Wall Panel Heater, IP24', 'Dimplex', 'hv', 'heater', 64.5, 75, 'DEMO-PH2K', 'Slim wall-mounted panel heater with adjustable thermostat.', { 'Power': '2 kW', 'Size': '800 × 450 mm', 'IP rating': 'IP24' }),
  mk(9, 'LED GU10 5 W Lamp – Pack of 10', 'Philips', 'lamps', 'bulb', 17.9, 640, 'DEMO-GU10-10', 'Energy-efficient LED GU10 lamps in a trade pack.', { 'Wattage': '5 W', 'Lumens': '400 lm', 'Colour temperature': '3000 K', 'Voltage': '230 V' }, 'b'),
  mk(10, 'Fire-Rated LED Downlight 8 W, IP65', 'Signify', 'lamps', 'downlight', 6.25, 2400, 'DEMO-DL8', 'Dimmable fire-rated LED downlight suitable for bathrooms and soffits.', { 'Wattage': '8 W', 'Lumens': '650 lm', 'Colour temperature': '3000 K / 4000 K', 'Voltage': '230 V' }, 'f'),
  mk(11, '10-Way Consumer Unit, Dual RCD', 'Hager', 'protect', 'cu', 142.9, 36, 'DEMO-CU10', 'Metal consumer unit with dual RCD protection and space for 10 modules.', { 'Poles': '1P+N', 'Rated current': '100 A main switch', 'Breaking capacity': '10 kA', 'Trip curve': 'n/a' }, 'fb'),
  mk(12, 'Type B MCB 32 A, Single Pole', 'Schneider Electric', 'protect', 'mcb', 8.45, 900, 'DEMO-MCB32B', 'Miniature circuit breaker for overload and short-circuit protection of final circuits.', { 'Poles': '1', 'Rated current': '32 A', 'Breaking capacity': '6 kA', 'Trip curve': 'B' }, 'b'),
  mk(13, 'RCBO 32 A 30 mA, Type A', 'ABB', 'protect', 'mcb', 34.6, 140, 'DEMO-RCBO32', 'Combined RCD and MCB providing earth-fault, overload and short-circuit protection.', { 'Poles': '1P+N', 'Rated current': '32 A', 'Breaking capacity': '6 kA', 'Trip curve': 'B' }, 'n'),
  mk(14, '63 A Triple Pole Isolator', 'Eaton', 'protect', 'isolator', 41.2, 58, 'DEMO-ISO63', 'Enclosed rotary isolator for main and sub-main switching.', { 'Poles': '3', 'Rated current': '63 A', 'Breaking capacity': 'n/a', 'Trip curve': 'n/a' }),
  mk(15, 'Double Switched Socket 13 A, White', 'MK Electric', 'wiring', 'socket', 6.8, 1200, 'DEMO-SOC2W', 'Twin 13 A switched socket outlet for flush mounting.', { 'Gangs': '2', 'Rating': '13 A', 'Finish': 'White' }, 'b'),
  mk(16, 'Lever Connectors 3-Way – Pack of 50', 'WAGO', 'wiring', 'connector', 21.9, 310, 'DEMO-221-413', 'Compact splicing connectors for solid, stranded and fine-stranded conductors.', { 'Gangs': '3-way', 'Rating': '32 A / 450 V', 'Finish': 'Transparent' }),
  mk(17, 'Hybrid Solar Inverter 5 kW', 'Growatt', 'solar', 'inverter', 1290, 9, 'DEMO-INV5', 'Single-phase hybrid inverter for solar and battery storage installations.', { 'Power': '5 kW', 'Efficiency': '97.6 %', 'Technology': 'Hybrid, 2 MPPT' }, 'f'),
  mk(18, 'Monocrystalline Solar Panel 450 W', 'JA Solar', 'solar', 'panel', 96, 180, 'DEMO-PV450', 'High-efficiency monocrystalline PV module for residential roofs.', { 'Power': '450 W', 'Efficiency': '21.0 %', 'Technology': 'Mono PERC' }, 'n'),
  mk(19, 'Compact True-RMS Digital Multimeter', 'Fluke', 'tools', 'meter', 229, 22, 'DEMO-DMM117', 'Electrician’s multimeter with non-contact voltage detection and True-RMS.', { 'Category rating': 'CAT III 600 V', 'Power source': 'Battery', 'Functions': 'V, A, Ω, NCV, LoZ' }, 'fb'),
  mk(20, 'Multifunction Installation Tester', 'Megger', 'tools', 'tester', 1149, 5, 'DEMO-MFT', 'Multifunction tester for insulation, continuity, loop and RCD testing.', { 'Category rating': 'CAT IV 300 V', 'Power source': 'Rechargeable', 'Functions': 'Insulation, continuity, loop, RCD' }),
  mk(21, '18 V Brushless Combi Drill', 'DeWalt', 'tools', 'drill', 149, 17, 'DEMO-DCD', 'Compact brushless hammer drill driver for site use. Battery and charger sold separately.', { 'Category rating': 'Hammer drill', 'Power source': '18 V battery', 'Functions': 'Drill, hammer, drive' }, 'b')
];
export const hay = p => [p.n, p.b, p.s, p.ean, p.d, ...Object.values(p.sp || {})].join(' ').toLowerCase();
export const DM = { std: ['Standard delivery (2–4 working days)', 6.95], nxt: ['Next working day (order by 3 pm, in-stock items only)', 12.95], col: ['Click & collect', 0] };
export const OS = ['Pending', 'Confirmed', 'Processing', 'Packed', 'Dispatched', 'Delivered', 'Cancelled'];
