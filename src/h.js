import React from 'react';
// E(tag, classNameOrProps, ...children) – tiny createElement helper (no JSX build step needed)
export const E = (t, c, ...k) => React.createElement(t, typeof c === 'string' ? { className: c } : c, ...k);
export const gbp = n => '£' + Number(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const okm = s => /^\S+@\S+\.\S+$/.test(s);
export const now = () => new Date().toLocaleString('en-GB');
