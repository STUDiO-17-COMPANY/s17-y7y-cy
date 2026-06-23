# Trilingual Site Translation — Design

**Date:** 2026-06-23
**Status:** Approved (pending implementation plan)

## Problem

Switching the site language to Greek (`/el`) or Russian (`/ru`) renders everything
in English. The i18n architecture is correct — every component reads from the
catalog via `getTranslations` / `useTranslations`, with no hardcoded text — but the
locale catalogs `src/messages/el.json` and `src/messages/ru.json` are empty (`{}`).
`src/i18n/request.ts` `deepMerge`s each locale over English and falls back to the
English string for any missing/empty key, so empty catalogs render fully in English.

The journal is also cluttered: `src/lib/articles.ts` registers **7 articles**, two of
which are duplicates titled "Why Phos Optics?" (`why-phos-ptics`, structured MDX with
headings + an already-translated `el.mdx`; and `optician-in-limassol-clinical-eye-care`,
the same prose as flat paragraphs, English only). Only one article should be live.

## Goals

1. The site renders correctly in all three languages: English (source), Greek, Russian.
2. The journal exposes exactly **one** article (`why-phos-ptics`, structured version),
   fully translated to Greek and Russian.
3. The mechanism for adding future articles manually (one entry in `articles.ts` + MDX
   files) is left untouched.

## Non-goals

- No runtime/machine-translation library (hurts SEO, performance, brand voice).
- No automated translation script/pipeline (deferred; can be added later if the catalog
  grows and self-service maintenance is wanted).
- No slug rename of `why-phos-ptics` (the typo stays — renaming would break the existing
  `el.mdx` and inbound links for no real gain).

## Approach

UI strings are translated **manually, by the assistant** (approach A) — highest brand
quality, zero infrastructure, exact JSON structure. The catalog is small (~7 KB,
15 sections), so this is fast and the right tradeoff for a marketing site.

## Work items

### 1. Consolidate the journal to one article

- In `src/lib/articles.ts`, reduce the `articles` array to the single
  `why-phos-ptics` entry. Remove the other 6 entries (including the flat duplicate
  `optician-in-limassol-clinical-eye-care`).
- Move the 6 orphaned MDX directories under `src/content/journal/` to `legacy/`
  (non-destructive archive, matching the repo's existing `legacy/` convention).
  Keep `src/content/journal/why-phos-ptics/`.
- `articlesByDate`, the `/journal` index, `sitemap.ts`, SEO metadata and JSON-LD all
  derive from `articles`, so they update automatically.

### 2. Translate UI strings

- Author `src/messages/el.json` and `src/messages/ru.json` mirroring the full key
  structure of `src/messages/en.json` (15 sections: meta, nav, hero, about, services,
  marquee, reviews, journal, notFound, philosophy, contact, footer, brandsPage,
  contactPage, language).
- English (`en.json`) remains the source of truth. `deepMerge` covers any gaps.
- Brand-aware translation: premium optician in Limassol; keep the brand name
  "Phos Optics" / "Phós Optics" untranslated; keep proper nouns intact.

### 3. Translate the article body

- **Greek** (`src/content/journal/why-phos-ptics/el.mdx`): already exists — review it
  against the structured English `en.mdx`, confirm headings/blockquote align, fix any
  drift. (Currently appears complete and good.)
- **Russian** (`src/content/journal/why-phos-ptics/ru.mdx`): create new, mirroring the
  structured English (`## The Story of Light`, `## Why the Name Phos Optics?`,
  `## A Personal Responsibility`, the blockquote, and the Nikolas Pateras sign-off).

### 4. Verify

- `npm run typecheck`
- `npm run lint`
- `npm run dev` → load `/en`, `/el`, `/ru`; confirm nav, hero, sections, footer and the
  journal article all change language; confirm `/journal` lists exactly one article.

## Risks / notes

- Removing 6 articles means their `/journal/<slug>` URLs (and any legacy
  `/Articles/:slug` redirects in `next.config.ts`) will 404. These are recent, low-value
  URLs; leaving them to 404 is acceptable. If inbound links matter, a follow-up can add
  redirects to `/journal` — out of scope here.
- The two duplicate articles share prose; the structured `why-phos-ptics` is the
  survivor by explicit user choice.
