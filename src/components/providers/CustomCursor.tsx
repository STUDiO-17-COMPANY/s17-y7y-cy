"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

// Trailing dot that follows the pointer and expands over interactive elements.
// Only runs on fine pointers (desktop) — never on touch devices.
export default function CustomCursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.appendChild(dot);

    const xTo = gsap.quickTo(dot, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.3, ease: "power3" });
    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("mousemove", move);

    const triggers = Array.from(
      document.querySelectorAll<HTMLElement>("a, button, .hover-trigger"),
    );
    const enter = () => document.body.classList.add("hover-active");
    const leave = () => document.body.classList.remove("hover-active");
    triggers.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      triggers.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      document.body.classList.remove("hover-active");
      dot.remove();
    };
  }, []);

  return null;
}
