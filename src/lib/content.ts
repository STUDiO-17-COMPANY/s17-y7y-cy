import fs from "node:fs/promises";
import path from "node:path";
import { routing } from "@/i18n/routing";

const CONTENT_DIR = path.join(process.cwd(), "src/content/journal");

// Reads the MDX body for an article in the requested locale, falling back to
// English when a translation is not available — so a partially translated
// journal never renders an empty article.
export async function getArticleBody(
  slug: string,
  locale: string,
): Promise<string | null> {
  const candidates = [locale, routing.defaultLocale];
  for (const loc of candidates) {
    try {
      return await fs.readFile(
        path.join(CONTENT_DIR, slug, `${loc}.mdx`),
        "utf8",
      );
    } catch {
      // try next candidate
    }
  }
  return null;
}
