import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/metadata";
import Reveal from "@/components/ui/Reveal";
import { CircularGallery } from "@/components/ui/circular-gallery";
import { curatedBrands, brandGallery } from "@/lib/brands";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.brands" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/brands",
    title: t("title"),
    description: t("description"),
  });
}

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("brandsPage");

  return (
    <main className="pt-32">
      {/* Page header */}
      <section className="px-6 pb-8 pt-12 md:pb-16">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 border-b border-gray-200/50 pb-8 md:flex-row md:items-end">
            <Reveal
              as="h1"
              className="font-wide font-display text-5xl font-light leading-tight text-phos-black md:text-7xl"
            >
              {t("title")}
            </Reveal>
            <p className="max-w-md font-sans text-sm leading-relaxed text-phos-charcoal/80 md:text-base">
              {t("intro")}
            </p>
          </div>
        </div>
      </section>

      {/* Campaign gallery (new arrivals — updated monthly). The component owns
          its own tall, pinned scroll track so the ring stays centred and the
          user has plenty of scroll distance to see every item. */}
      <CircularGallery items={brandGallery} radius={520} pinHeight={300} className="bg-phos-cream" />

      {/* Curated Selection */}
      <section className="bg-phos-cream px-6 py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-phos-sage" />
            <span className="font-sans text-xs uppercase tracking-widest text-phos-sage">
              {t("tier2")}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 font-sans text-base text-phos-black md:grid-cols-4 md:text-lg lg:grid-cols-5">
            {curatedBrands.map((brand) => (
              <span key={brand} className="cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-phos-cream px-6 py-24">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-display text-4xl font-light text-phos-black md:text-5xl">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mb-10 max-w-xl font-sans text-gray-600">
            {t("ctaBody")}
          </p>
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-trigger inline-block rounded-full bg-phos-black px-8 py-4 font-sans text-sm uppercase tracking-widest text-white shadow-sm transition-colors duration-300 hover:bg-phos-sage"
          >
            {t("cta")}
          </a>
        </div>
      </section>
    </main>
  );
}
