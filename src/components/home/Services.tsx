import { getTranslations } from "next-intl/server";
import { Eye, Sunglasses, CirclesThreePlus } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/ui/Reveal";
import { lensBrands, contactLensBrands, type BrandLogo } from "@/lib/brands";

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-8 gap-y-2 font-sans text-xs uppercase tracking-wide text-phos-charcoal">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-phos-sage" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function LogoGrid({
  label,
  logos,
  columns,
}: {
  label: string;
  logos: BrandLogo[];
  columns: string;
}) {
  return (
    <div className="mt-6 border-t border-gray-200 pt-5">
      <p className="mb-4 text-center font-sans text-[10px] uppercase tracking-[0.35em] text-phos-sage md:text-left">
        {label}
      </p>
      <div className={`grid gap-3 md:gap-4 ${columns}`}>
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="flex h-24 items-center justify-center rounded-2xl border border-gray-100 bg-white px-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <img
              alt={logo.name}
              src={logo.src}
              className="w-full max-h-10 object-contain opacity-75 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:max-h-12"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Services() {
  const t = await getTranslations("services");

  return (
    <section id="services" className="bg-phos-cream px-6 py-12 md:px-12 md:py-24">
      <div className="container mx-auto">
        <div className="mb-16 flex flex-col justify-between gap-4 border-b border-gray-200 pb-8 md:flex-row md:items-end">
          <div>
            <span className="mb-3 block font-sans text-xs uppercase tracking-widest text-phos-sage">
              {t("eyebrow")}
            </span>
            <Reveal
              as="h2"
              className="font-display text-4xl font-light text-phos-black md:text-5xl"
            >
              {t("title")}
            </Reveal>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <p className="hidden max-w-sm text-right font-sans text-sm text-gray-500 md:block">
              {t("tagline")}
            </p>
            <a
              href="#contact"
              className="hover-trigger mx-auto block w-fit rounded-full bg-phos-black px-5 py-2.5 text-center font-sans text-[11px] uppercase tracking-widest text-white shadow-md transition-colors duration-300 hover:bg-phos-sage hover:shadow-lg md:px-6 md:py-3 md:text-xs"
            >
              {t("cta")}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Optical Frames & Lenses */}
          <div className="hover-trigger group -ml-6 rounded-xl p-6 transition-all duration-300 hover:bg-white hover:shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm transition-colors group-hover:border-phos-sage">
              <Sunglasses size={24} className="text-phos-black transition-colors group-hover:text-phos-sage" />
            </div>
            <h3 className="mb-4 font-display text-2xl text-phos-black">{t("frames.title")}</h3>
            <p className="mb-6 font-sans text-sm leading-relaxed text-gray-500">{t("frames.desc")}</p>
            <ul className="min-h-[78px] space-y-2 font-sans text-xs uppercase tracking-wide text-phos-charcoal">
              {(t.raw("frames.features") as string[]).map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-phos-sage" />
                  {item}
                </li>
              ))}
            </ul>
            <LogoGrid label={t("frames.brandsLabel")} logos={lensBrands} columns="grid-cols-3" />
          </div>

          {/* Eye Examination */}
          <div className="hover-trigger group -ml-6 rounded-xl p-6 transition-all duration-300 hover:bg-white hover:shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-colors group-hover:border-phos-sage">
              <Eye size={24} className="text-phos-black transition-colors group-hover:text-phos-sage" />
            </div>
            <h3 className="mb-4 font-display text-2xl text-phos-black">{t("exam.title")}</h3>
            <p className="mb-6 font-sans text-sm leading-relaxed text-gray-500">{t("exam.desc")}</p>
            <FeatureList items={t.raw("exam.features") as string[]} />
          </div>

          {/* Contact Lenses */}
          <div className="hover-trigger group -ml-6 rounded-xl p-6 transition-all duration-300 hover:bg-white hover:shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-colors group-hover:border-phos-sage">
              <CirclesThreePlus size={24} className="text-phos-black transition-colors group-hover:text-phos-sage" />
            </div>
            <h3 className="mb-4 font-display text-2xl text-phos-black">{t("contacts.title")}</h3>
            <p className="mb-6 font-sans text-sm leading-relaxed text-gray-500">{t("contacts.desc")}</p>
            <ul className="min-h-[78px] space-y-2 font-sans text-xs uppercase tracking-wide text-phos-charcoal">
              {(t.raw("contacts.features") as string[]).map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-phos-sage" />
                  {item}
                </li>
              ))}
            </ul>
            <LogoGrid
              label={t("contacts.brandsLabel")}
              logos={contactLensBrands}
              columns="grid-cols-2 md:grid-cols-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
