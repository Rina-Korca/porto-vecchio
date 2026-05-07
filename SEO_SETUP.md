# SEO Setup

This project uses Next.js App Router SEO primitives:

- Global metadata: `app/layout.tsx`
- Shared SEO config and JSON-LD helpers: `lib/seo.ts`
- Sitemap: `app/sitemap.ts` at `/sitemap.xml`
- Robots: `app/robots.ts` at `/robots.txt`
- Web app manifest: `app/manifest.ts` at `/manifest.webmanifest`
- Google Analytics loader: `components/google-analytics.tsx`

## Real Domain

The site URL currently falls back to the placeholder:

```env
https://example.com
```

Set the real production domain in your hosting environment:

```env
NEXT_PUBLIC_SITE_URL=https://www.your-domain.example
```

`SITE_URL` is also supported as a server-side fallback. This value is used for canonical URLs, sitemap URLs, robots sitemap location, and JSON-LD IDs.

## Google Analytics 4

The configured Measurement ID is:

```env
G-JSFWX3FT71
```

It is set as the fallback in `lib/seo.ts`. You can override it in your production environment with one of these variables:

```env
NEXT_PUBLIC_GA_ID=G-JSFWX3FT71
```

or:

```env
GOOGLE_ANALYTICS_ID=G-JSFWX3FT71
```

Google Analytics is injected globally in `app/layout.tsx` through `components/google-analytics.tsx` and only renders when `NODE_ENV` is `production`.

Before enabling the real ID, confirm your cookie consent and privacy policy requirements for your deployment region.

## Google Search Console Verification

The placeholder verification code is:

```env
PASTE_VERIFICATION_CODE_HERE
```

Replace it either directly in `lib/seo.ts` or, preferably, set an environment variable:

```env
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-verification-code
```

or:

```env
GOOGLE_SITE_VERIFICATION=your-google-verification-code
```

Next.js renders this as:

```html
<meta name="google-site-verification" content="your-google-verification-code" />
```

## Submit Sitemap

After deploying with the real domain:

1. Open Google Search Console.
2. Select the property for the live domain.
3. Go to `Sitemaps`.
4. Submit:

```text
https://www.your-domain.example/sitemap.xml
```

## Verify Locally

Use the existing project commands:

```bash
pnpm lint
pnpm build
```

To inspect generated SEO files during development, run:

```bash
pnpm dev
```

Then open:

- `http://localhost:3000/sitemap.xml`
- `http://localhost:3000/robots.txt`
- `http://localhost:3000/manifest.webmanifest`

Production-only Google Analytics will not render during `pnpm dev`.
