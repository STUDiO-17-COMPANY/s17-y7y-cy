# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Marketing site for **Phós Optics** (optician, Limassol, Cyprus), built by Studio 17.
Read `README.md` first — it covers the stack and content-editing workflow. This file
records the non-obvious architecture and gotchas.

## Commands

```bash
npm run dev        # local dev server (http://localhost:3000)
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit  (run this; build won't catch all type errors)
```

There is no test suite. Verify changes with `npm run typecheck` + `npm run lint` and the dev server.

## Architecture notes (the things you can't grep for)

- **Middleware lives in `src/proxy.ts`, not `middleware.ts`.** Next.js 16 renamed the
  convention. It runs `next-intl`'s middleware; the matcher deliberately excludes `/maintenance`
  and anything with a dot (files).

- **i18n is per-key fallback, not per-file.** `src/i18n/request.ts` `deepMerge`s each locale's
  catalog over the full English catalog, so any missing/empty key in `el`/`ru` renders the
  English string. English (`src/messages/en.json`) is always the source of truth — add new keys
  there first. Locales: `en` (default), `el`, `ru`; the prefix is always present (`/en`, `/el`).

- **Adding a journal article needs two edits.** Metadata (typed, drives the index, routing, SEO
  and JSON-LD) goes in `src/lib/articles.ts`; the body goes in
  `src/content/journal/<slug>/<locale>.mdx`. `getArticleBody` (`src/lib/content.ts`) reads the
  MDX from disk at build time and falls back to the English body if a locale file is missing.

- **`src/lib/site.ts` is the single source of truth for business data** (phone, hours, address,
  booking link, hosted asset URLs). It feeds the footer, contact section, metadata builders and
  the schema.org JSON-LD simultaneously — change it there, never inline.

- **Always import GSAP from `src/lib/gsap.ts`**, never from `gsap` directly. That module registers
  `ScrollTrigger`/`useGSAP` once, client-only. Animation/scroll behaviour is wired through the
  client providers in `src/app/[locale]/layout.tsx` (`SmoothScrollProvider`, `AnchorScroll`,
  `CustomCursor`).

- **Static rendering depends on two calls** in `src/app/[locale]/layout.tsx`:
  `generateStaticParams` (one entry per locale) and `setRequestLocale(locale)`. Keep both when
  touching the layout or pages, or locale pages stop being statically generated.

- **`/maintenance` is an isolated page with its own design system** (`src/app/maintenance/`),
  excluded from the locale routing and the proxy matcher. Don't share components with it.

- **Legacy URLs are preserved via redirects** in `next.config.ts` (e.g. `/Articles/:slug` →
  `/en/journal/:slug`). When renaming routes, add a redirect rather than breaking inbound links.

- **`legacy/` is the archived static HTML site — not deployed.** Reference only.

## Conventions

- Path alias `@/*` → `src/*`.
- Design tokens (`phos-*` colours, `font-sans`/`font-display`) are in `tailwind.config.ts`,
  ported verbatim from the original site to match the brand exactly. Use the tokens, not hex.
- `<img>` is intentionally allowed for external brand/logo assets (the `no-img-element` rule is
  off); content photos use `next/image` via the `RevealImage` component. Remote image hosts must
  be whitelisted in `next.config.ts` `images.remotePatterns` (currently Cloudinary + Unsplash).
