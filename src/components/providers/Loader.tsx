"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Brand intro overlay, shown once per session on whichever page the visitor
// lands on first. The Phós wordmark is pulled into focus — an optician's
// metaphor: light resolving into a sharp image — then an aperture iris closes
// over the overlay to reveal the page beneath.
export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      if (sessionStorage.getItem("phos-loaded")) {
        setDone(true);
        return;
      }

      const finish = () => {
        sessionStorage.setItem("phos-loaded", "1");
        setDone(true);
      };

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduce) {
        gsap
          .timeline({ onComplete: finish })
          .set(".loader-mark", { opacity: 1, filter: "blur(0px)", scale: 1 })
          .to(ref.current, { opacity: 0, duration: 0.5, delay: 0.5 });
        return;
      }

      gsap
        .timeline({ onComplete: finish })
        // Focus pull: the wordmark resolves from a soft blur into sharpness.
        .to(".loader-mark", {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
        })
        // Hold a beat in focus.
        .to({}, { duration: 0.35 })
        // Aperture: the wordmark contracts as the iris closes over the overlay.
        .to(
          ".loader-mark",
          { scale: 0.55, opacity: 0, duration: 0.6, ease: "power2.in" },
          "iris",
        )
        .to(
          ref.current,
          {
            clipPath: "circle(0% at 50% 50%)",
            duration: 0.9,
            ease: "power4.inOut",
          },
          "iris",
        );
    },
    { scope: ref },
  );

  if (done) return null;

  return (
    <div ref={ref} className="loader" aria-hidden>
      <div className="loader-mark">
        <svg
          className="loader-logo"
          viewBox="0 34 113.39 38"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Phós Optics"
        >
          <path d="M17.21,64.91H3.11v5.25h-1.74v-26.8h15.8c5.96,0,10.8,4.84,10.8,10.75s-4.84,10.8-10.75,10.8ZM17.21,45.02H3.11v18.24h14.06c4.96,0,9.02-4.09,9.02-9.14s-4.05-9.1-8.98-9.1Z" />
          <path d="M58.69,70.16h-1.74v-5.25h-22.5v5.25h-1.74v-26.8h1.74v19.89h22.5v-19.89h1.74v26.8Z" />
          <path d="M77.47,42.74c7.73,0,14.02,6.29,14.02,14.02s-6.29,14.02-14.02,14.02-14.02-6.29-14.02-14.02,6.29-14.02,14.02-14.02ZM77.47,69.13c6.74,0,12.24-5.54,12.24-12.37s-5.5-12.37-12.24-12.37-12.24,5.54-12.24,12.37,5.5,12.37,12.24,12.37ZM78.13,40.18h-2.07l2.9-4.51h2.73l-3.56,4.51Z" />
          <path d="M91.7,69.17c3.06-.5,5.79-5.79,7.82-10.01l2.36-4.88c1.86-3.8,5.05-10.59,9.93-11.54l.37,1.74c-4.05.95-6.78,6.37-8.77,10.51l-2.36,4.88c-2.23,4.63-5.09,10.3-8.97,10.92l-.37-1.61Z" />
        </svg>
      </div>
    </div>
  );
}
