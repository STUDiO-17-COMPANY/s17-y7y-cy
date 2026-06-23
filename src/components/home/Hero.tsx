"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";

const HERO_IMAGE =
  "https://res.cloudinary.com/dwvhqhtts/image/upload/v1775833830/WhatsApp_Image_2026-04-10_at_15.58.01_cpvivf.jpg";

export default function Hero() {
  const t = useTranslations("hero");
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".hero-text", { yPercent: 100 });
        gsap.set(".hero-fade", { opacity: 0 });
        gsap.set(".hero-beam", { scaleX: 0 });

        const tl = gsap.timeline({ delay: 0.3 });
        tl.from(".hero-bg", { scale: 1.4, duration: 2, ease: "power3.out" }, 0)
          .to(
            ".hero-beam",
            { scaleX: 1, duration: 1.1, ease: "power4.out" },
            0.2,
          )
          .to(
            ".hero-text",
            { yPercent: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" },
            0.35,
          )
          .to(
            ".hero-fade",
            { opacity: 1, duration: 1, stagger: 0.12, ease: "power2.out" },
            0.9,
          );

        // Parallax on the background image.
        gsap.to(".hero-bg", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="group relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-16 pt-32 md:min-h-screen"
    >
      <div className="absolute inset-0 z-0">
        <div className="hero-bg absolute inset-0 h-full w-full">
          <Image
            src={HERO_IMAGE}
            alt="Luxury Eyewear"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center] grayscale transition-all duration-[2400ms] ease-in-out group-hover:grayscale-0 md:object-center"
          />
        </div>
        {/* Mobile / base: vertical wash keeps centred text legible while the photo stays visible. */}
        <div className="absolute inset-0 bg-gradient-to-t from-phos-cream/85 via-phos-cream/55 to-phos-cream/40 transition-opacity duration-[2400ms] ease-in-out group-hover:opacity-60 lg:hidden" />
        {/* Desktop: directional wash — opaque under the copy on the left, clearing right to reveal the trial frame. */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-phos-cream via-phos-cream/65 to-transparent transition-all duration-[2400ms] ease-in-out group-hover:from-phos-cream/85 group-hover:via-phos-cream/35 lg:block" />
        {/* Faint top vignette to seat the fixed navigation. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-phos-cream/60 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="mt-10 text-center lg:col-span-6 lg:text-left md:mt-0">
          {/* Signature: a beam of light — Phós (φῶς) means "light". Draws open on load. */}
          <div className="hero-beam mx-auto mb-7 h-[2px] w-16 origin-left rounded-full bg-gradient-to-r from-phos-sage via-phos-sage/70 to-transparent shadow-[0_0_14px_rgba(152,158,133,0.65)] lg:mx-0" />
          <h1 className="font-wide mb-8 font-display text-[2.65rem] font-normal leading-[0.98] text-phos-black md:text-6xl lg:text-[4.5rem] xl:text-[5.25rem]">
            <span className="block overflow-hidden pb-2">
              <span className="hero-text block">{t("line1")}</span>
            </span>
            <span className="-mt-2 block overflow-hidden pb-1">
              <span className="hero-text block">{t("line2")}</span>
            </span>
          </h1>
          <p className="hero-fade mx-auto mb-7 max-w-md font-sans text-base leading-relaxed text-phos-charcoal md:text-lg lg:mx-0">
            {t("intro")}
          </p>
          <p className="hero-fade mb-10 flex items-center justify-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.32em] text-phos-charcoal/85 md:text-sm lg:justify-start">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-phos-sage" />
            {t("location")}
          </p>
          <div className="hero-fade hidden w-full flex-col items-center gap-4 sm:w-auto sm:flex-row lg:flex lg:justify-start">
            <a
              href="#contact"
              className="hover-trigger group/cta inline-flex w-full items-center justify-center gap-3 rounded-full bg-phos-black px-8 py-4 text-center font-sans text-sm uppercase tracking-widest text-white shadow-md transition-all duration-300 hover:bg-phos-sage hover:shadow-lg sm:w-auto md:py-3.5"
            >
              {t("cta")}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover/cta:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="hero-fade absolute bottom-10 left-10 hidden items-center gap-4 lg:flex">
        <div className="h-12 w-[1px] bg-phos-black/20" />
        <span className="font-sans text-xs uppercase tracking-widest text-phos-charcoal/60 [writing-mode:vertical-rl]">
          {t("scroll")}
        </span>
      </div>
    </section>
  );
}
