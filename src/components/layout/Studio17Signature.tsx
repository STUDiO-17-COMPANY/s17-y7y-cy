import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";

// Agency signature bar at the very bottom of every page. Distinct from the
// client footer. (The old site left a "Client Brand Name" placeholder here.)
export default async function Studio17Signature() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-50 w-full border-t border-white/10 bg-[#0A0A0A] py-6 md:py-8">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-12">
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-slate-500 md:justify-start">
          <span>
            © {year} {site.name}.
          </span>
          <span className="hidden text-slate-700 md:inline">|</span>
          <a href="#" className="transition-colors hover:text-white">
            {t("privacy")}
          </a>
          <span className="hidden text-slate-700 md:inline">|</span>
          <a href="#" className="transition-colors hover:text-white">
            {t("terms")}
          </a>
        </div>

        <a
          href="https://www.studio17.world"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-full border border-white/10 bg-white/5 py-1.5 pl-5 pr-1.5 shadow-lg transition-all duration-300 hover:bg-white/10"
        >
          <span className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-400 transition-colors group-hover:text-slate-300 sm:block md:text-xs">
            {t("builtForGrowth")}
          </span>
          <div className="flex items-center gap-2 rounded-full border border-white/5 bg-[#111111] px-4 py-2 shadow-inner">
            <div className="flex select-none items-baseline">
              <span className="text-base font-extrabold tracking-[-0.05em] text-white">
                Studio
              </span>
              <span className="ml-1 text-base font-extrabold tracking-[-0.12em] text-white">
                17
              </span>
            </div>
            <ArrowUpRight
              size={16}
              weight="bold"
              className="ml-1 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
        </a>
      </div>
    </footer>
  );
}
