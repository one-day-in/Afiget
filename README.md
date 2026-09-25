# Афиget' — bakery menu

A small static React + TypeScript + Vite website for a home bakery in Ho Chi Minh City. Customers browse the menu, save a cart in their browser, review the product total, and send an **order request** through Web3Forms. Order requests are delivered directly to the owner's verified email. The owner confirms availability, preparation, and delivery directly with the customer. There is no payment, account, admin panel, database, or custom backend.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000/`. Run `npm run build` for a TypeScript check and production build, and `npm run preview` to inspect that build locally.

## Update the menu

All categories and products are in [`src/data/products.ts`](src/data/products.ts). **Current prices are placeholders** and must be confirmed before launch. Prices are integer VND. For example, change `price: 45000` to `price: 50000`, then commit and push. Weight prices use the product's `unit` (`100g` or `kg`); `minimumAmount` and `amountStep` are grams. Quantity products use pieces or portions.

To add a product, copy one product object, give it a unique `id`, set its category, RU/EN name and description, integer price, amount rules, status, and image file name. To remove a product, delete its object. Existing carts are reconciled with the current catalog when the page loads: removed or unavailable products disappear, and current prices are used.

Put real food photos in [`public/products/`](public/products/) and update the product's `image` file name. The first three products have local JPG photos; other products currently share local SVG placeholders. Optimized WebP photos are welcome. Images are served locally with the site and need no image host.

## Web3Forms and Order Delivery

Order requests are delivered to the owner's verified email through [Web3Forms](https://web3forms.com/).

The client-side integration uses Web3Forms' submit endpoint (`https://api.web3forms.com/submit`) with a public access key. No backend, server functions, or environment variables are required.

When an order request is placed, the site sends:
- Customer name and contact information (Telegram, Zalo, WhatsApp, Phone, Email, etc.)
- Preferred language (RU/EN)
- Formatted product total
- An automatically generated itemized order summary with product names, portions/weights, and item subtotals
- Customer comments/notes
- Subject line with the order total
- Silent botcheck spam protection

A successful response clears the cart and displays a confirmation screen. If a submission fails, the cart and contact details are preserved so the customer can retry without losing their order.

## Deploy to GitHub Pages

The workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on pushes to `main`: `npm ci` → `npm run build` → deploy `dist/`. It reads the GitHub Pages base path automatically, so product photos and assets work under `https://USERNAME.github.io/REPOSITORY/` as well as a root Pages site.

In the GitHub repository, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**, then push to `main`. Later menu or photo updates are simply edit → commit → push. The site has one public route, so refreshing it needs no routing fallback.
