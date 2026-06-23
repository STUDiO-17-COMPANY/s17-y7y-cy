"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Scroll-triggered fade/slide-up. Mirrors the original `.split-type` reveal.
// Under reduced motion the element simply stays in its natural visible state.
export default function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
