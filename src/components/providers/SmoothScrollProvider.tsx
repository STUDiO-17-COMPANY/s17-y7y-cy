"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Drives Lenis from the GSAP ticker (instead of a raw rAF loop) and keeps
// ScrollTrigger in sync with the smooth-scroll position. This is what makes
// scrubbed/parallax animations stay frame-perfect under smooth scrolling.
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        duration: 1.2,
        smoothWheel: true,
        // Exponential ease ported from the original Lenis config.
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}
