import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

export default async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white px-6 pb-12 pt-10">
      <div className="container mx-auto">
        <Link href="/" className="hover-trigger block">
          <img alt="Phós Optics Logo" className="site-logo" src={site.logo} />
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className="font-sans text-xs text-gray-400">
            © {year} {site.name}. {t("rights")}
          </p>
          <div className="flex gap-6 font-sans text-sm underline decoration-gray-300 underline-offset-4">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-trigger transition-colors hover:text-phos-sage"
            >
              Instagram
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-trigger transition-colors hover:text-phos-sage"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
