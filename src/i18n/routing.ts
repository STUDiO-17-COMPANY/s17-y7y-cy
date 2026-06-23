import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "el", "ru"],
  defaultLocale: "en",
  // Always prefix the locale (/en, /el, /ru) — keeps hreflang unambiguous.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
