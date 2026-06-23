import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import type { Article } from "@/lib/articles";

export default async function ArticleCard({ article }: { article: Article }) {
  const t = await getTranslations("journal");

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/journal/${article.slug}`}
        className="hover-trigger flex h-full flex-col"
      >
        <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-sm">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-grow flex-col">
          <span className="mb-2 font-sans text-xs uppercase tracking-widest text-phos-sage">
            {article.category}
          </span>
          <h3 className="mb-3 font-display text-2xl leading-tight transition-colors group-hover:text-phos-sage">
            {article.title}
          </h3>
          <p className="mb-6 line-clamp-3 flex-grow font-sans text-sm leading-relaxed text-gray-500">
            {article.excerpt}
          </p>
          <div className="mt-auto border-t border-gray-200 pt-4">
            <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-phos-black transition-all group-hover:gap-3">
              {t("readStory")} <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
