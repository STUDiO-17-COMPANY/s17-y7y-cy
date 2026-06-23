import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { articles, getArticle } from "@/lib/articles";
import { getArticleBody } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { mdxComponents } from "@/components/journal/mdxComponents";
import ShareTags from "@/components/journal/ShareTags";
import { articleJsonLd, jsonLdString } from "@/lib/jsonld";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    articles.map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    locale: locale as Locale,
    path: `/journal/${slug}`,
    title: article.seoTitle,
    description: article.description,
    image: article.heroImage,
    type: "article",
    publishedTime: article.date,
    authors: [article.author],
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = getArticle(slug);
  if (!article) notFound();

  const body = await getArticleBody(slug, locale);
  if (!body) notFound();

  const t = await getTranslations("journal");
  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(article.date));

  const canonicalUrl = `${site.url}/${locale}/journal/${slug}`;

  return (
    <main className="pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(articleJsonLd(article, canonicalUrl)),
        }}
      />
      <article>
        {/* Hero */}
        <header className="mx-auto max-w-3xl px-6 pb-10 pt-8">
          <Link
            href="/journal"
            className="hover-trigger mb-8 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-phos-charcoal/70 transition-colors hover:text-phos-sage"
          >
            <ArrowLeft size={14} /> {t("backToJournal")}
          </Link>
          <span className="mb-4 block font-sans text-xs uppercase tracking-widest text-phos-sage">
            {article.category}
          </span>
          <h1 className="font-display text-4xl font-light leading-tight text-phos-black md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-6 font-sans text-sm text-phos-charcoal/60">
            {t("by")} {article.author} • {formattedDate}
          </p>
        </header>

        {/* Hero image */}
        <div className="mx-auto mb-12 aspect-[16/9] max-w-5xl overflow-hidden md:mb-16">
          <Image
            src={article.heroImage}
            alt={article.title}
            width={1600}
            height={900}
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Body */}
        <div className="mx-auto max-w-3xl px-6 pb-12">
          <MDXRemote source={body} components={mdxComponents} />
        </div>

        {/* Tags + share */}
        <ShareTags
          tags={[article.category]}
          url={canonicalUrl}
          title={article.title}
        />
      </article>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-phos-sage px-8 py-16 text-center md:px-16">
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/20 blur-[80px]" />
            <h2 className="relative z-10 mb-6 font-display text-3xl font-light text-white md:text-4xl">
              {t("title")}
            </h2>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-trigger relative z-10 inline-block rounded-full bg-phos-black px-8 py-4 font-sans text-sm uppercase tracking-widest text-white transition-colors duration-300 hover:bg-white hover:text-phos-black"
            >
              {(await getTranslations("contact"))("book")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
