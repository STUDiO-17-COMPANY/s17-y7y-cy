"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CaretDown } from "@phosphor-icons/react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const LABELS: Record<Locale, string> = {
  en: "EN",
  el: "ΕΛ",
  ru: "RU",
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("language");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function switchTo(next: Locale) {
    setOpen(false);
    if (next !== locale) {
      router.replace(pathname, { locale: next });
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("label")}
        onClick={() => setOpen((v) => !v)}
        className="hover-trigger flex items-center gap-1 font-sans text-xs uppercase tracking-widest text-phos-charcoal/80 transition-colors hover:text-phos-sage"
      >
        {LABELS[locale]}
        <CaretDown size={12} weight="bold" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-3 min-w-[8rem] overflow-hidden rounded-xl border border-gray-200/70 bg-white py-1 shadow-lg"
        >
          {routing.locales.map((loc) => (
            <li key={loc} role="option" aria-selected={loc === locale}>
              <button
                type="button"
                onClick={() => switchTo(loc)}
                className={`block w-full px-4 py-2 text-left font-sans text-sm transition-colors hover:bg-phos-cream ${
                  loc === locale ? "text-phos-sage" : "text-phos-charcoal"
                }`}
              >
                {t(loc)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
