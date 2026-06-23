import { getTranslations } from "next-intl/server";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";

export default async function ContactCTA() {
  const t = await getTranslations("contact");

  return (
    <section id="contact" className="relative bg-white px-6 pb-12 pt-24">
      <div className="container mx-auto">
        <div className="relative flex flex-col items-center justify-between gap-12 overflow-hidden rounded-3xl bg-phos-cream p-8 md:flex-row md:p-16">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-phos-sage/20 blur-[80px]" />
          <div className="max-w-xl">
            <h2 className="mb-6 font-display text-4xl font-light md:text-5xl">
              {t("title")}
            </h2>
            <p className="mb-8 font-sans text-gray-600">{t("body")}</p>
            <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-[220px] items-center justify-center rounded-full bg-phos-black px-5 py-3 text-center font-sans text-[11px] uppercase tracking-widest text-white opacity-80 transition-opacity duration-300 hover:opacity-100 md:w-auto md:px-8 md:py-4 md:text-sm"
              >
                {t("book")}
              </a>
              <a
                href={site.phoneHref}
                className="hover-trigger inline-flex w-[220px] items-center justify-center rounded-full border border-phos-black px-5 py-3 text-center font-sans text-[11px] uppercase tracking-widest text-phos-black transition-colors duration-300 hover:bg-black hover:text-white md:w-auto md:px-8 md:py-4 md:text-sm"
              >
                {site.phone}
              </a>
            </div>
          </div>

          <div className="w-full space-y-4 font-sans text-sm md:w-1/3">
            <div className="border-b border-gray-200 pb-4">
              <span className="mb-1 block text-xs uppercase text-gray-400">
                {t("addressLabel")}
              </span>
              <p>
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.locality}, Cyprus
              </p>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-trigger mt-3 inline-flex items-center gap-2 rounded-full bg-phos-black px-4 py-2 text-xs uppercase tracking-widest text-white transition-colors duration-300 hover:bg-phos-sage"
              >
                <MapPin size={16} /> {t("getDirections")}
              </a>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <span className="mb-1 block text-xs uppercase text-gray-400">
                {t("hoursLabel")}
              </span>
              <p>
                {t("hours.weekdays")}
                <br />
                {t("hours.wednesday")}
                <br />
                {t("hours.saturday")}
                <br />
                {t("hours.sunday")}
              </p>
              <p className="mt-2 text-xs text-gray-500">{t("hoursNote")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
