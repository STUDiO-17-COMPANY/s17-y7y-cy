"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Localized 404 rendered inside the locale chrome (Header/Footer). Triggered by
// notFound() — e.g. an unknown article slug.
export default function LocaleNotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-32 text-center">
      <span className="mb-4 font-display text-7xl font-light text-phos-sage md:text-8xl">
        404
      </span>
      <h1 className="mb-4 font-display text-3xl font-light text-phos-black md:text-4xl">
        {t("title")}
      </h1>
      <p className="mb-10 max-w-md font-sans text-phos-charcoal/70">
        {t("body")}
      </p>
      <Link
        href="/"
        className="hover-trigger rounded-full bg-phos-black px-8 py-4 font-sans text-sm uppercase tracking-widest text-white transition-colors duration-300 hover:bg-phos-sage"
      >
        {t("cta")}
      </Link>
    </main>
  );
}
