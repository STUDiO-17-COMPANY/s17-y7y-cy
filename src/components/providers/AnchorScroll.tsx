"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

// Intercepts same-page hash links and uses Lenis for the smooth scroll,
// mirroring the original site's anchor behaviour.
export default function AnchorScroll() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}
