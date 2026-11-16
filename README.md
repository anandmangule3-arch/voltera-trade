# Voltera Trade – UK Electrical Wholesale (React front-end demo)

React + Vite storefront and admin demo. **No backend** – all state lives in the browser for the session.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## What is included
- Storefront: Flipkart-style category menu bar, Amazon-style search with live suggestions, Apple-style hero,
  category cards, product cards, filters, product detail with gallery/zoom and dynamic specifications,
  basket, UK checkout (postcode validation, delivery rules, VAT), order confirmation,
  trade account application, quotation request.
- Admin (`#admin`, demo login `admin@voltera.demo` / `demo1234`, client-side only): dashboard, products
  (add with category-specific specification fields, edit price/stock, publish toggle, photo upload),
  orders (status workflow, stock restore on cancel), trade approvals and quotations (discount, convert to order),
  bulk CSV import (map columns, validate, duplicate handling, progress, failed-rows report, history, export).

## Not included (needs a real backend)
Persistence, real authentication, payments (Stripe/PayPal), email, PDFs, carriers, search engine,
Redis/BullMQ import worker for 100,000+ rows. See the master spec for the production architecture.

## Images
Product images are generated vector renders (`src/images.js`), **not photographs**. To use real photos,
upload one per product in Admin → Products, or set `img` on products in `src/data.js` to files in `public/products/`.
Only use photography you have the right to use. Product data, prices, stock and contact details are demo placeholders.

Code style: plain JavaScript using a tiny `E()` helper over `React.createElement` (no JSX transform needed).
