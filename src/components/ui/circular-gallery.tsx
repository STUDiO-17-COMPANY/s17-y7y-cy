"use client";

import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

// Define the type for a single gallery item
export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

// Define the props for the CircularGallery component
interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center (used as the maximum; the
   *  effective radius shrinks on narrow viewports to keep the ring on-screen). */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling. */
  autoRotateSpeed?: number;
  /** Height of the pinned scroll track, in viewport heights. Larger = the user
   *  scrolls longer (and the ring stays centred longer) to complete a full turn
   *  and see every item. */
  pinHeight?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.02, pinHeight = 300, ...props }, ref) => {
    // Rotation is split in two so they never fight each other: `scrollAngle`
    // tracks the section's scroll progress (deterministic), `idleAngle` is the
    // gentle drift that only accumulates while the user is paused. The ring
    // shows `scrollAngle + idleAngle`, so resuming scroll never snaps.
    const [scrollAngle, setScrollAngle] = useState(0);
    const [idleAngle, setIdleAngle] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    // Below `lg` the scroll-pinned 3D ring is replaced by a plain finger-swipe
    // carousel, so the scroll/auto-rotate effects only run on desktop.
    const [isDesktop, setIsDesktop] = useState(false);
    // Ring radius and card size both shrink on narrow viewports so the gallery
    // stays on-screen and readable on mobile.
    const [dims, setDims] = useState({ radius, card: 300 });
    const sectionRef = useRef<HTMLElement | null>(null);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
      const update = () => {
        const w = window.innerWidth;
        setIsDesktop(w >= 1024);
        setDims({
          radius: Math.min(radius, w * 0.42),
          card: Math.min(300, Math.max(170, w * 0.58)),
        });
      };
      update();
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }, [radius]);

    const cardW = dims.card;
    const cardH = dims.card * (4 / 3);

    // Map the section's own scroll-through (not the whole page) to a full turn,
    // so all items are seen exactly while the ring is pinned in view.
    useEffect(() => {
      if (!isDesktop) return;
      const handleScroll = () => {
        const el = sectionRef.current;
        if (!el) return;

        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // While the tall section is pinned, rect.top runs from 0 down to
        // -(height - viewport). Normalise that to 0..1 and spread over 360deg.
        const rect = el.getBoundingClientRect();
        const track = rect.height - window.innerHeight;
        const progress = track > 0 ? Math.min(Math.max(-rect.top / track, 0), 1) : 0;
        setScrollAngle(progress * 360);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [isDesktop]);

    // Effect for auto-rotation when not scrolling (skipped if the user prefers reduced motion)
    useEffect(() => {
      if (!isDesktop) return;
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const autoRotate = () => {
        if (!isScrolling) {
          setIdleAngle(prev => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, autoRotateSpeed, isDesktop]);

    const rotation = scrollAngle + idleAngle;
    const anglePerItem = 360 / items.length;

    return (
      <>
      {/* Mobile / tablet: a plain finger-swipe carousel — no scroll-pinned 3D
          animation, the user just drags horizontally to see more photos. */}
      <div
        role="region"
        aria-label="Brand campaign gallery"
        className={cn("py-8 lg:hidden", className)}
      >
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <div
              key={item.photo.url}
              role="group"
              aria-label={item.common}
              className="aspect-[3/4] w-[78%] max-w-[320px] flex-shrink-0 snap-center overflow-hidden rounded-lg border border-white/10 bg-phos-charcoal/40 shadow-xl"
            >
              <img
                src={item.photo.url}
                alt={item.photo.text}
                className="h-full w-full object-cover"
                style={{ objectPosition: item.photo.pos || 'center' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: the scroll-driven 3D circular gallery. */}
      <section
        ref={(node) => {
          sectionRef.current = node;
          if (typeof ref === 'function') ref(node as HTMLDivElement | null);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node as HTMLDivElement | null;
        }}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative hidden w-full lg:block", className)}
        style={{ height: `${pinHeight}vh` }}
        {...props}
      >
        <div
          className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
          style={{ perspective: '2000px' }}
        >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.3, 1 - (normalizedAngle / 180));

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                className="absolute"
                style={{
                  width: `${cardW}px`,
                  height: `${cardH}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${dims.radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: `${-cardW / 2}px`,
                  marginTop: `${-cardH / 2}px`,
                  opacity: opacity,
                  transition: 'opacity 0.3s linear'
                }}
              >
                <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden group border border-white/10 bg-phos-charcoal/40 backdrop-blur-md">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </section>
      </>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
