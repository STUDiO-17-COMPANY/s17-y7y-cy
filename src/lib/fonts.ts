import {
  Manrope,
  Outfit,
  Plus_Jakarta_Sans,
  Playfair_Display,
} from "next/font/google";

// Body copy — matches the original Google Fonts load (Manrope 300/400/500).
export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-manrope",
  display: "swap",
});

// Headings — geometric/modern display face (Outfit 200–600).
export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

// Maintenance page only — its own, separate design system.
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
