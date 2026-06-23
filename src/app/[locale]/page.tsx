import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/metadata";
import Hero from "@/components/home/Hero";
import AboutFounder from "@/components/home/AboutFounder";
import Services from "@/components/home/Services";
import BrandMarquee from "@/components/home/BrandMarquee";
import ReviewsCarousel from "@/components/home/ReviewsCarousel";
import JournalList from "@/components/home/JournalList";
import PhilosophyBanner from "@/components/home/PhilosophyBanner";
import ContactCTA from "@/components/home/ContactCTA";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return buildMetadata({
    locale: locale as Locale,
    path: "",
    title: t("title"),
    description: t("description"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <main>
        <Hero />
        <AboutFounder />
        <Services />
        <BrandMarquee />
        <ReviewsCarousel />
        <JournalList />
        <PhilosophyBanner />
        <ContactCTA />
      </main>
    </>
  );
}
