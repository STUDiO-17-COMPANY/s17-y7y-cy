import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { manrope, outfit } from "@/lib/fonts";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import AnchorScroll from "@/components/providers/AnchorScroll";
import CustomCursor from "@/components/providers/CustomCursor";
import Loader from "@/components/providers/Loader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Studio17Signature from "@/components/layout/Studio17Signature";
import { localBusinessJsonLd, jsonLdString } from "@/lib/jsonld";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${manrope.variable} ${outfit.variable}`}>
      <body className="bg-phos-cream font-sans text-phos-black antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdString(localBusinessJsonLd()),
          }}
        />
        <NextIntlClientProvider>
          <Loader />
          <SmoothScrollProvider>
            <AnchorScroll />
            <CustomCursor />
            <Header />
            {children}
            <Footer />
            <Studio17Signature />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
