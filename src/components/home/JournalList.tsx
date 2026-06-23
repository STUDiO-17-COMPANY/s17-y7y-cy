import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import ArticleCard from "@/components/journal/ArticleCard";
import { articlesByDate } from "@/lib/articles";

export default async function JournalList() {
  const t = await getTranslations("journal");

  return (
    <section id="journal" className="relative bg-white px-6 py-24 md:px-12 md:py-32">
      <div className="container mx-auto">
        <div className="mb-16 flex items-end justify-between border-b border-gray-200/60 pb-8">
          <div>
            <span className="mb-3 block font-sans text-xs uppercase tracking-widest text-phos-sage">
              {t("eyebrow")}
            </span>
            <Reveal
              as="h2"
              className="font-display text-4xl font-light text-phos-black md:text-6xl"
            >
              {t("title")}
            </Reveal>
            <p className="mt-4 max-w-md font-sans text-sm text-gray-500">
              {t("intro")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {articlesByDate.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
