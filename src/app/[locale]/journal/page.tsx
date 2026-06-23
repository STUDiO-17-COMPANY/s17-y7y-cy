import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/metadata";
import ArticleCard from "@/components/journal/ArticleCard";
import { articlesByDate } from "@/lib/articles";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.journal" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/journal",
    title: t("title"),
    description: t("description"),
  });
}

export default async function JournalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("journal");

  return (
    <main className="pt-32">
      <section className="px-6 pb-8 pt-12 md:px-12 md:pb-16">
        <div className="container mx-auto">
          <div className="border-b border-gray-200/60 pb-8">
            <span className="mb-3 block font-sans text-xs uppercase tracking-widest text-phos-sage">
              {t("eyebrow")}
            </span>
            <h1 className="font-wide font-display text-5xl font-light leading-tight text-phos-black md:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-phos-charcoal/80 md:text-base">
              {t("intro")}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12 md:pb-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {articlesByDate.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
