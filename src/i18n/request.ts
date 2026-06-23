import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

type Messages = Record<string, unknown>;

// Recursively overlay `override` on top of `base`. Missing or empty values in
// `override` keep the `base` (English) value, so the UI never renders a blank
// string when a translation key has not been filled in yet.
function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const key of Object.keys(override)) {
    const b = base[key];
    const o = override[key];
    const bothObjects =
      b !== null &&
      o !== null &&
      typeof b === "object" &&
      typeof o === "object" &&
      !Array.isArray(b) &&
      !Array.isArray(o);

    if (bothObjects) {
      out[key] = deepMerge(b as Messages, o as Messages);
    } else if (o !== undefined && o !== null && o !== "") {
      out[key] = o;
    }
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const en = (await import("../messages/en.json")).default as Messages;
  const messages =
    locale === routing.defaultLocale
      ? en
      : deepMerge(
          en,
          (await import(`../messages/${locale}.json`)).default as Messages,
        );

  return { locale, messages };
});
