# Phós Optics — phosoptics.com

Marketing site for Phós Optics (optician, Limassol, Cyprus), built by Studio 17.
Studio 17: https://www.studio17.world/

## Stack

- **Next.js 16** (App Router, static generation) + **React 19** — deployed on Vercel
- **Tailwind CSS v3** for styling, tokens in `tailwind.config.ts`
- **next-intl** for i18n (English / Greek / Russian) with per-key English fallback
- **GSAP + Lenis** for the intro, reveals, parallax and smooth scrolling
- **MDX** for journal article bodies

## Commands

```bash
npm install      # install dependencies
npm run dev      # local dev server (http://localhost:3000)
npm run build    # production build
npm run lint     # eslint
npm run typecheck# tsc --noEmit
```

## Project layout

```
src/
  app/[locale]/        # localized pages: home, /brands, /journal, /journal/[slug]
  app/maintenance/     # isolated "under maintenance" page (own design system)
  components/          # layout, home sections, journal, providers, ui
  content/journal/     # article bodies as <slug>/<locale>.mdx
  i18n/                # next-intl routing, navigation, request config
  lib/                 # site config, data (brands, reviews, articles), seo helpers
  messages/            # UI translation catalogs (en complete, el/ru partial)
```

## Editing content

- **UI strings**: `src/messages/{en,el,ru}.json`. English is the source of truth;
  any key missing from `el`/`ru` falls back to English automatically.
- **Articles**: add `src/content/journal/<slug>/<locale>.mdx` and register metadata
  in `src/lib/articles.ts`. A missing locale falls back to the English body.
- **Business details** (phone, hours, address, booking link): `src/lib/site.ts`
  (feeds both the visible site and the schema.org JSON-LD).

The previous static HTML site is archived under `legacy/` for reference and is not deployed.
