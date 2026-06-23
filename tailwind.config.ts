import type { Config } from "tailwindcss";

// Design tokens ported verbatim from the original inline Tailwind config
// (see legacy/index.html) so the visual identity matches the old site exactly.
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "phos-black": "#000000", // Brand Guide: Strict Black
        "phos-charcoal": "#1c1c1c",
        "phos-cream": "#F6F6F3", // Brand Guide: Bone-White
        "phos-sage": "#989E85", // Brand Guide: Grey-Yellow Green (Replaces Gold)
        "phos-blue": "#5588A3", // Brand Guide: Seasonal Blue
        "phos-red": "#94111C", // Brand Guide: Seasonal Red
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"], // Body copy
        display: ["var(--font-outfit)", "sans-serif"], // Headings (Geometric/Modern)
      },
      height: {
        "screen-120": "120vh",
      },
    },
  },
  plugins: [],
};

export default config;
