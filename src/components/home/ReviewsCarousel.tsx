"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Star } from "@phosphor-icons/react";
import { reviews } from "@/lib/reviews";

export default function ReviewsCarousel() {
  const t = useTranslations("reviews");
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(1);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisible(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, reviews.length - visible);
  const clamped = Math.min(index, maxIndex);
  const isMobile = visible === 1;

  const trackStyle = useMemo(
    () =>
      isMobile
        ? undefined
        : { transform: `translateX(-${clamped * (100 / reviews.length)}%)` },
    [clamped, isMobile],
  );

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-phos-cream px-6 py-24 md:px-12 md:py-32"
    >
      <div className="container mx-auto">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-4">
              <div className="h-[1px] w-12 bg-phos-sage" />
              <span className="font-sans text-xs uppercase tracking-widest text-phos-sage">
                {t("eyebrow")}
              </span>
            </div>
            <h2 className="max-w-2xl font-display text-4xl font-light text-phos-black md:text-5xl">
              {t("title")}
            </h2>
          </div>
          <div className="hidden gap-3 md:flex">
            <button
              type="button"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={clamped === 0}
              aria-label={t("prev")}
              className="hover-trigger flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 transition-all hover:border-phos-black hover:bg-phos-black hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
              disabled={clamped >= maxIndex}
              aria-label={t("next")}
              className="hover-trigger flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 transition-all hover:border-phos-black hover:bg-phos-black hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative -mx-4 overflow-hidden px-4 py-4">
          <div
            className={`flex ${
              isMobile
                ? "no-scrollbar snap-x snap-mandatory overflow-x-auto"
                : "transition-transform duration-500 ease-in-out"
            }`}
            style={trackStyle}
          >
            {reviews.map((review, i) => {
              const isOpen = expanded[i];
              return (
                <div
                  key={review.name}
                  className="w-full flex-shrink-0 snap-start px-4 md:w-1/2 lg:w-1/3"
                >
                  <div className="hover-trigger group flex h-full flex-col justify-between rounded-lg bg-white p-8 transition-all duration-500 hover:shadow-xl">
                    <div>
                      <div className="mb-6 flex gap-1 text-phos-sage">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} size={16} weight="fill" />
                        ))}
                      </div>
                      <div className="mb-8 font-display text-xl leading-relaxed text-phos-charcoal">
                        {isOpen && review.full ? review.full : review.short}
                        {review.full && (
                          <button
                            type="button"
                            onClick={() =>
                              setExpanded((e) => ({ ...e, [i]: !e[i] }))
                            }
                            className="mt-3 block font-sans text-xs uppercase tracking-widest text-phos-sage underline decoration-gray-200 underline-offset-4 transition-colors hover:decoration-phos-sage"
                          >
                            {isOpen ? t("readLess") : t("readMore")}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="mt-auto flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-phos-cream font-display font-medium text-phos-sage">
                        {review.initials}
                      </div>
                      <div>
                        <span className="block font-sans text-xs uppercase tracking-widest text-phos-black">
                          {review.name}
                        </span>
                        <span className="font-sans text-[10px] uppercase tracking-wider text-gray-400">
                          {t("source")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
