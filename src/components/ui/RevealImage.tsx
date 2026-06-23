"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Clip-path image reveal: the container unmasks top→bottom while the inner
// image scales from 1.2 back to 1, matching the original `.reveal-image`.
export default function RevealImage({
  src,
  alt,
  width,
  height,
  className,
  imageClassName = "object-cover",
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
        tl.fromTo(
          ref.current,
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power4.out" },
        ).fromTo(
          ref.current?.querySelector("img") ?? null,
          { scale: 1.5 },
          { scale: 1, duration: 1.2, ease: "power4.out" },
          0,
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`reveal-image-container ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={`reveal-image h-full w-full ${imageClassName}`}
      />
    </div>
  );
}
