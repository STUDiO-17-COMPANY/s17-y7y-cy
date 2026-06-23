import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  Phone,
  EnvelopeSimple,
  CalendarCheck,
  InstagramLogo,
  FacebookLogo,
  MapPin,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/metadata";
import Reveal from "@/components/ui/Reveal";
import LocationMap from "@/components/ui/LocationMap";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

// Accurate schedule keys, ordered. Times live in i18n; the source of truth for
// the underlying business hours is `openingHours` in src/lib/site.ts.
const scheduleKeys = ["main", "wednesday", "saturday", "sunday"] as const;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  // Reuse copy that already exists for the homepage contact section.
  const tc = await getTranslations("contact");

  return (
    <main className="pt-32">
      {/* Page header — mirrors the brands/journal header pattern. */}
      <section className="px-6 pb-8 pt-12 md:pb-16">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 border-b border-gray-200/50 pb-8 md:flex-row md:items-end">
            <div>
              <span className="mb-4 block font-sans text-xs uppercase tracking-widest text-phos-sage">
                {t("eyebrow")}
              </span>
              <Reveal
                as="h1"
                className="font-display text-5xl font-light leading-tight text-phos-black md:text-7xl"
              >
                {t("title")}
              </Reveal>
            </div>
            <p className="max-w-md font-sans text-sm leading-relaxed text-phos-charcoal/80 md:text-base">
              {t("intro")}
            </p>
          </div>
        </div>
      </section>

      {/* Body — direct lines (left) and visit details (right). */}
      <section className="px-6 pb-20">
        <div className="container mx-auto grid max-w-7xl gap-x-16 gap-y-16 md:grid-cols-2">
          {/* Direct lines */}
          <div>
            <div className="mb-8 flex items-center gap-4">
              <div className="h-[1px] w-12 bg-phos-sage" />
              <span className="font-sans text-xs uppercase tracking-widest text-phos-sage">
                {t("channelsLabel")}
              </span>
            </div>

            <div className="border-b border-gray-200">
              <ContactRow
                href={site.phoneHref}
                icon={<Phone size={22} weight="light" />}
                label={t("callLabel")}
                value={site.phone}
                note={t("callNote")}
              />
              <ContactRow
                href={site.bookingUrl}
                external
                icon={<CalendarCheck size={22} weight="light" />}
                label={t("bookLabel")}
                value={t("bookValue")}
                note={t("bookNote")}
              />
              <ContactRow
                href={`mailto:${site.email}`}
                icon={<EnvelopeSimple size={22} weight="light" />}
                label={t("emailLabel")}
                value={site.email}
                note={t("emailNote")}
              />
            </div>

            {/* Follow */}
            <div className="mt-8">
              <span className="mb-4 block font-sans text-xs uppercase tracking-widest text-gray-400">
                {t("followLabel")}
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-trigger inline-flex items-center gap-2 rounded-full border border-phos-black px-5 py-2 font-sans text-xs uppercase tracking-widest text-phos-black transition-colors duration-300 hover:bg-phos-black hover:text-white"
                >
                  <InstagramLogo size={16} weight="light" /> {t("instagram")}
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-trigger inline-flex items-center gap-2 rounded-full border border-phos-black px-5 py-2 font-sans text-xs uppercase tracking-widest text-phos-black transition-colors duration-300 hover:bg-phos-black hover:text-white"
                >
                  <FacebookLogo size={16} weight="light" /> {t("facebook")}
                </a>
              </div>
            </div>
          </div>

          {/* Visit the studio */}
          <div className="rounded-3xl border border-gray-200/70 bg-white p-8 shadow-sm md:p-12">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-[1px] w-12 bg-phos-sage" />
              <span className="font-sans text-xs uppercase tracking-widest text-phos-sage">
                {t("visitLabel")}
              </span>
            </div>

            <p className="font-display text-2xl font-light leading-snug text-phos-black">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.locality}, Cyprus
            </p>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-trigger mt-5 inline-flex items-center gap-2 rounded-full bg-phos-black px-5 py-2.5 font-sans text-xs uppercase tracking-widest text-white transition-colors duration-300 hover:bg-phos-sage"
            >
              <MapPin size={16} weight="light" /> {tc("getDirections")}
            </a>

            {/* Signature: a precise, optician's-schedule table. */}
            <div className="mt-10">
              <span className="mb-2 block font-sans text-xs uppercase tracking-widest text-gray-400">
                {t("scheduleLabel")}
              </span>
              {scheduleKeys.map((key) => (
                <div
                  key={key}
                  className="flex items-baseline justify-between gap-4 border-t border-phos-black/10 py-3"
                >
                  <span className="font-sans text-sm text-phos-black">
                    {t(`schedule.${key}.days`)}
                  </span>
                  <span className="font-display text-sm tabular-nums text-phos-charcoal/70">
                    {t(`schedule.${key}.time`)}
                  </span>
                </div>
              ))}
              <p className="mt-4 font-sans text-xs leading-relaxed text-gray-500">
                {tc("hoursNote")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-7xl">
          <LocationMap openMapsLabel={tc("openMaps")} />
        </div>
      </section>
    </main>
  );
}

// Editorial contact line: label, value and a sliding arrow micro-interaction.
function ContactRow({
  href,
  icon,
  label,
  value,
  note,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  note: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="hover-trigger group flex items-center justify-between gap-6 border-t border-gray-200 py-6 transition-colors duration-300 hover:border-phos-black"
    >
      <span className="flex items-start gap-4">
        <span className="mt-1 text-phos-sage">{icon}</span>
        <span className="flex flex-col">
          <span className="font-sans text-xs uppercase tracking-widest text-gray-400">
            {label}
          </span>
          <span className="mt-1 font-display text-xl font-light text-phos-black md:text-2xl">
            {value}
          </span>
          <span className="mt-1 font-sans text-xs text-gray-500">{note}</span>
        </span>
      </span>
      <ArrowUpRight
        size={24}
        weight="light"
        className="shrink-0 text-phos-charcoal/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-phos-black"
      />
    </a>
  );
}
