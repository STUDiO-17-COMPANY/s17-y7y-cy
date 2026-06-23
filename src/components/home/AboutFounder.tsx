import { getTranslations } from "next-intl/server";
import RevealImage from "@/components/ui/RevealImage";
import Reveal from "@/components/ui/Reveal";

export default async function AboutFounder() {
  const t = await getTranslations("about");

  return (
    <section id="about" className="relative bg-white px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 md:grid-cols-2">
        <RevealImage
          src="https://res.cloudinary.com/dnxoz9alm/image/upload/v1774784828/Frame_97_hmqkap.png"
          alt="Clinical Phoropter"
          width={800}
          height={1000}
          sizes="(min-width: 768px) 50vw, 100vw"
          imageClassName="object-contain object-center grayscale transition-all duration-700 ease-out hover:grayscale-0"
          className="order-2 aspect-[4/5] bg-phos-cream md:order-1 md:aspect-square"
        />
        <div className="order-1 space-y-8 md:order-2">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-phos-sage" />
            <span className="font-sans text-xs uppercase tracking-widest text-phos-sage">
              {t("eyebrow")}
            </span>
          </div>
          <Reveal
            as="h2"
            className="font-display text-4xl font-light leading-tight text-phos-black md:text-6xl"
          >
            {t("title")}
          </Reveal>
          <p className="max-w-md font-sans text-lg leading-relaxed text-phos-charcoal/80">
            {t("body")}
            <br />
            <br />
            <span className="italic">{t("quote")}</span>{" "}
            <span className="not-italic">{t("quoteAuthor")}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
