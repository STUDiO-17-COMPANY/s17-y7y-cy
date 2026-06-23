import { getTranslations } from "next-intl/server";
import { featuredLogos } from "@/lib/brands";

export default async function BrandMarquee() {
  const t = await getTranslations("marquee");

  return (
    <section className="overflow-hidden bg-phos-cream px-6 py-20 md:px-12 md:py-28">
      <div className="container mx-auto">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-3 block font-sans text-xs uppercase tracking-widest text-phos-sage">
              {t("eyebrow")}
            </span>
            <h2 className="font-display text-4xl font-light leading-tight text-phos-black md:text-5xl">
              {t("title")}
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm text-gray-500 md:text-right">
            {t("desc")}
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-phos-cream to-transparent md:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-phos-cream to-transparent md:w-40" />
          <div className="overflow-hidden">
            <div className="brand-marquee flex w-max items-center gap-14 md:gap-20">
              {[0, 1].map((dup) => (
                <div
                  key={dup}
                  aria-hidden={dup === 1}
                  className="flex items-center gap-14 pr-14 md:gap-20"
                >
                  {featuredLogos.map((logo) => (
                    <img
                      key={`${dup}-${logo.name}`}
                      alt={dup === 1 ? "" : logo.name}
                      src={logo.src}
                      className="brand-logo"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
