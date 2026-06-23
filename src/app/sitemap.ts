import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { articles } from "@/lib/articles";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/brands",
    "/journal",
    "/contact",
    ...articles.map((a) => `/journal/${a.slug}`),
  ];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${site.url}/${l}${path}`]),
        ),
      },
    })),
  );
}
