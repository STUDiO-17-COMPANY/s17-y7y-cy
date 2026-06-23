"use client";

import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { site } from "@/lib/site";

// Dark, brand-tuned location map (MapLibre GL + Carto dark-matter vector tiles —
// no API key required). Mouse-wheel zoom is disabled so the wheel keeps scrolling
// the page; drag-pan and the zoom buttons stay available. The marker is styled in
// globals.css (.phos-map-marker).
export default function LocationMap({ openMapsLabel }: { openMapsLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let map: import("maplibre-gl").Map | undefined;

    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;

      map = new maplibregl.Map({
        container: ref.current!,
        style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
        center: [site.geo.lng, site.geo.lat],
        zoom: 14,
        attributionControl: { compact: true },
        dragRotate: false,
        scrollZoom: false,
      });

      map.addControl(
        new maplibregl.NavigationControl({ showCompass: false }),
        "bottom-right",
      );

      map.on("load", () => {
        if (!map) return;
        // Push the stock dark-matter base toward the Phós palette.
        const safe = (fn: () => void) => {
          try {
            fn();
          } catch {
            /* layer id absent in this style version — ignore */
          }
        };
        safe(() => map!.setPaintProperty("background", "background-color", "#141414"));
        safe(() => map!.setPaintProperty("water", "fill-color", "#0c0c0c"));

        const el = document.createElement("div");
        el.className = "phos-map-marker";
        el.title = site.address.street;
        new maplibregl.Marker({ element: el })
          .setLngLat([site.geo.lng, site.geo.lat])
          .addTo(map);
      });
    })();

    return () => map?.remove();
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
      <div ref={ref} className="h-[360px] w-full bg-phos-charcoal" />
      <a
        href={site.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover-trigger absolute right-4 top-4 z-10 rounded-full bg-phos-black/90 px-5 py-2.5 font-sans text-xs uppercase tracking-widest text-white backdrop-blur transition-colors duration-300 hover:bg-phos-sage"
      >
        {openMapsLabel}
      </a>
    </div>
  );
}
