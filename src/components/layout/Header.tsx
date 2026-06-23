"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useLenis } from "lenis/react";
import { List, X } from "@phosphor-icons/react";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems, type NavItem } from "@/lib/nav";
import { site } from "@/lib/site";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lenis = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);

  // Logo click: when already on home, smooth-scroll to the top instead of a
  // no-op same-route navigation. On inner pages the Link handles the route.
  function handleLogoClick(e: React.MouseEvent) {
    setMenuOpen(false);
    if (isHome) {
      e.preventDefault();
      lenis?.scrollTo(0);
    }
  }

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Resolve an anchor item to a hash (on home) or a home-prefixed hash (inner).
  function hrefFor(item: NavItem): string {
    if (item.type === "route") return item.target;
    return isHome ? item.target : `/${item.target}`;
  }

  return (
    <>
      {/* Mobile sticky call-and-book button */}
      <div className="pointer-events-none fixed bottom-0 left-0 z-40 w-full bg-gradient-to-t from-phos-cream via-phos-cream/90 to-transparent p-4 lg:hidden">
        <a
          href={isHome ? "#contact" : `/#contact`}
          className="pointer-events-auto block w-full rounded-full bg-phos-black py-4 text-center font-display text-sm uppercase tracking-widest text-white shadow-xl transition-colors hover:bg-phos-sage"
        >
          {t("book")}
        </a>
      </div>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`mobile-menu-overlay fixed inset-0 z-[60] flex flex-col items-center justify-center bg-phos-cream px-6 ${
          menuOpen ? "is-open" : ""
        }`}
      >
        <button
          type="button"
          aria-label={t("closeMenu")}
          onClick={() => setMenuOpen(false)}
          className="absolute right-4 top-4 z-50 flex h-16 w-16 items-center justify-center rounded-full transition-opacity hover:opacity-50 active:bg-gray-100"
        >
          <X size={36} className="text-phos-black" />
        </button>
        <nav className="flex flex-col gap-8 text-center">
          {navItems.map((item) =>
            item.type === "route" ? (
              <Link
                key={item.key}
                href={item.target}
                onClick={() => setMenuOpen(false)}
                className="font-display text-4xl font-light text-phos-black transition-colors hover:text-phos-sage"
              >
                {t(item.key)}
              </Link>
            ) : (
              <a
                key={item.key}
                href={hrefFor(item)}
                onClick={() => setMenuOpen(false)}
                className="font-display text-4xl font-light text-phos-black transition-colors hover:text-phos-sage"
              >
                {t(item.key)}
              </a>
            ),
          )}
          <a
            href={isHome ? "#contact" : "/#contact"}
            onClick={() => setMenuOpen(false)}
            className="mt-4 rounded-full bg-phos-black px-8 py-4 font-sans text-sm uppercase tracking-widest text-white"
          >
            {t("bookExam")}
          </a>
        </nav>
      </div>

      {/* Fixed navbar */}
      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-gray-200/50 bg-phos-cream/95 px-6 py-3 text-phos-black backdrop-blur-md">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="hover-trigger z-50 block"
        >
          <img alt="Phós Optics Logo" className="site-logo" src={site.logo} />
        </Link>

        <div className="hidden items-center gap-12 font-sans text-sm font-medium uppercase tracking-widest text-phos-charcoal/80 lg:flex">
          {navItems.map((item) =>
            item.type === "route" ? (
              <Link
                key={item.key}
                href={item.target}
                className="hover-trigger px-3 transition-colors hover:text-phos-sage"
              >
                {t(item.key)}
              </Link>
            ) : (
              <a
                key={item.key}
                href={hrefFor(item)}
                className="hover-trigger px-3 transition-colors hover:text-phos-sage"
              >
                {t(item.key)}
              </a>
            ),
          )}
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <LanguageSwitcher />
          <a
            href={isHome ? "#contact" : "/#contact"}
            className="hover-trigger rounded-full border border-phos-black px-6 py-2 font-sans text-xs uppercase tracking-widest transition-all hover:bg-phos-black hover:text-white"
          >
            {t("book")}
          </a>
        </div>

        <button
          type="button"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          aria-label={t("openMenu")}
          onClick={() => setMenuOpen(true)}
          className="hover-trigger z-50 -mr-4 p-4 lg:hidden"
        >
          <List size={24} className="text-phos-black" />
        </button>
      </nav>
    </>
  );
}
