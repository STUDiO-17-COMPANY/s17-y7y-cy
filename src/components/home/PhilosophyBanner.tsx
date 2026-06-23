import { getTranslations } from "next-intl/server";

export default async function PhilosophyBanner() {
  const t = await getTranslations("philosophy");

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden bg-phos-sage px-6 py-32 text-phos-black"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/noise.png')",
        }}
      />
      <div className="container relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="mb-12 font-display text-4xl font-light leading-tight md:text-7xl">
          <span className="text-white">{t("title")}</span>
          <span className="mt-2 block text-sm font-normal text-white/90 md:text-base">
            {t("subtitle")}
          </span>
        </h2>
        <p className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-white/90 md:text-xl">
          {t("body")}
        </p>
      </div>
    </section>
  );
}
