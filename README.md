# Veloura — Intimately Yours

A responsive storefront built with Next.js 16 App Router, React 19, TypeScript and Tailwind CSS 4. Original local SVG garment illustrations keep the website independent of image and font services.

## Development

Requires Node.js 20.9+ (validated on Node 24) and npm. Use the existing checkout; a separate worktree is not needed.

```bash
npm install
npm run dev
```

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

Use `npm ci` for a frozen lockfile installation. `.npmrc` uses writable `/workspace/.npm-cache` in this cloud environment; override with `npm --cache /your/cache install` elsewhere.

## Features

- Editorial homepage, eight-product catalog, collections, live search and sorting.
- Pre-rendered product pages, size/colour selection, fit guide, care details, and related products.
- Persistent variant-aware shopping bag, quantity limits, removal, shipping calculation, wishlist and cross-tab synchronization.
- Accessible modal search, navigation and bag; responsive layouts, focus handling and reduced motion support.
- Brand story, three journal articles, help, privacy, terms, error and 404 pages.
- Server-validated Stripe hosted checkout, trusted catalog prices and verified payment status.
- SEO metadata, social artwork, sitemap, robots rules, favicon and standard security headers.

## Merchant configuration

The storefront runs without secrets. Payment is explicitly disabled until `STRIPE_SECRET_KEY`, `SITE_URL`, and `STORE_COUNTRIES` are configured. Copy `.env.example` to `.env.local` or use secure deployment settings. Never commit real keys.

- `NEXT_PUBLIC_SITE_URL`: public canonical URL for metadata and sitemap.
- `SITE_URL`: trusted origin for checkout return URLs; `http://localhost:3000` locally, your HTTPS domain in production.
- `STRIPE_SECRET_KEY`: server-only key. Begin with Stripe test mode.
- `STORE_COUNTRIES`: comma-separated supported ISO country codes, such as `US,CA`.

Test successful, canceled and failed payments before enabling real purchases. Card, billing and shipping information are collected by Stripe. The success page verifies the payment server-side rather than trusting a return URL.

**Before commercial launch:** replace the sample catalog/artwork with verified merchandise, supply the merchant legal identity and customer support contact, confirm shipping and return terms, configure applicable taxes and implement inventory and fulfillment. This static catalog does not reserve stock. There is no order database, automated fulfillment, newsletter service or webhook processing. Production fulfillment should use an authenticated, idempotent Stripe webhook and durable order storage; do not fulfill based on the success page.

## Architecture and tests

`src/lib/catalog.ts` is the trusted catalog. `src/lib/cart.ts` validates variants and calculates totals. Browser shopping preferences are stored under `veloura-shop-v1`; personal/payment information is never stored there. `src/app/api/checkout/route.ts` recalculates prices server-side. All artwork is in `public/images`.

```bash
npx playwright install chromium
npx playwright test
```

In this cloud environment, Chromium is already installed. Run `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npx playwright test` to use it without downloading another browser.

Playwright starts a production server after `npm run build`. Unit tests verify cart validation, variant merging, limits and shipping. Browser tests cover collections, search, product selection, persistence, wishlist, checkout availability and mobile layouts.

The production dependency audit is clean. The full audit currently reports a development-only `braces` advisory inherited through the latest Next.js ESLint configuration; there is no patched release available. Do not downgrade Next.js or use `npm audit fix --force` to work around it.
