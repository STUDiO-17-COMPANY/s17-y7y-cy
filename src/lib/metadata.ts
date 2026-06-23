import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "./site";

// Builds canonical + hreflang alternates for a locale-prefixed path.
// `path` is the path *without* the locale prefix, e.g. "" (home),
// "/brands", "/journal/the-phos-experience".
export function buildMetadata({
  locale,
  path,
  title,
  description,
  image = site.ogImage,
  type = "website",
  publishedTime,
  authors,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
}): Metadata {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = `/${l}${path}`;
  languages["x-default"] = `/${routing.defaultLocale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages,
    },
    openGraph: {
      type,
      url: `/${locale}${path}`,
      title,
      description,
      siteName: site.name,
      images: [{ url: image }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
