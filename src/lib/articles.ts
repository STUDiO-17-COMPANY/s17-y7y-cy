// Journal article registry. Metadata lives here (typed, drives the journal
// index, routing, SEO and JSON-LD); the localized body lives in MDX files
// under src/content/journal/<slug>/<locale>.mdx.
export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  category: string;
  date: string; // ISO date
  author: string;
  heroImage: string;
};

const AUTHOR = "Nikolas Pateras";

export const articles: Article[] = [
  {
    slug: "why-phos-ptics",
    title: "Why Phos Optics?",
    seoTitle: "Why Phos Optics? | Phós Optics Journal",
    description:
      "Discover the philosophy behind Phos Optics, where light, science, history, and personal dedication meet in the care of your vision.",
    excerpt:
      "One of the questions I am often asked in the store is: “Why Phos Optics?” The answer may not be as simple as it seems, but it is certainly worth sharing.",
    category: "Vision & Care",
    date: "2026-05-13",
    author: AUTHOR,
    heroImage: "/carousel-images/STOREGENERIC1.jpg",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

// Newest first.
export const articlesByDate = [...articles].sort((a, b) =>
  b.date.localeCompare(a.date),
);
