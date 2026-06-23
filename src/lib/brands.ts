// Brand logos and lists. Marquee + service-card logos feed the homepage;
// the curated list + campaign gallery feed the Brands page.
import type { GalleryItem } from "@/components/ui/circular-gallery";

export type BrandLogo = { name: string; src: string };

// Auto-scrolling marquee on the homepage ("Featured Brands").
export const featuredLogos: BrandLogo[] = [
  { name: "Gucci", src: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1777485438/Gucci-Logo-640x400_1_ef4fsg.png" },
  { name: "Fendi", src: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1777485438/fendi-logo-1_1_1_pdqjpt.png" },
  { name: "Celine", src: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1777485437/Celine-logo-640x307_1_vvkyzb.png" },
  { name: "Ermenegildo Zegna", src: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1777485438/Ermenegildo_Zegna_1_yosvf0.png" },
  { name: "Tom Ford", src: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1777485437/TomFord_zk0mjs.png" },
  { name: "Miu Miu", src: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1777485438/MiuMiu_Logo_w7izgy.png" },
  { name: "Prada", src: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1777485438/Prada-Logo-500x281_1_txqv8m.png" },
  { name: "Oakley", src: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1774784767/Oakley_logo_ek6jbp.svg" },
  { name: "Ray-Ban", src: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1777485437/ray-ban-logo_1_kfngkz.png" },
];

// Optical lens partners (service card 2).
export const lensBrands: BrandLogo[] = [
  { name: "Hoya", src: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1778693462/pngegg_1_rtfpga.png" },
  { name: "Essilor", src: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1778693401/Essilor-logo_a5m0mp.png" },
  { name: "Zeiss", src: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1778693276/Zeiss_logo.svg_bxwvwp.png" },
];

// Brand directory for the Brands page — single curated list of brands
// currently stocked in store.
export const curatedBrands = [
  "Chopard", "Charmant", "Minamoto", "Zegna", "Tom Ford", "Miu Miu", "Fendi", "Celine",
  "Givenchy", "Gucci", "Prada", "Epos", "Folc", "Kaleos", "Common Sense", "Nina Ricci",
  "Max Mara", "Pucci", "Escada", "Furla", "Versace", "Jimmy Choo", "Ray-Ban", "Oakley",
  "Head", "Rudy Project", "Police", "Porsche Design", "Carrera", "Lacoste", "David Beckham",
  "Emporio Armani", "Silhouette", "Marc Jacobs", "Elle", "Guess", "Vogue", "Nano Kids",
  "Indii Kids", "Polo",
];

// Big 3D circular campaign gallery on the Brands page. In-store and campaign
// shots served from /public/carousel-images — swap these each month with the
// latest new-arrivals photos (keep them in that folder, ~3:4 portrait crop).
export const brandGallery: GalleryItem[] = [
  {
    common: "Phós Optics",
    binomial: "Limassol Boutique",
    photo: {
      url: "/carousel-images/STOREGENERIC1.jpg",
      text: "Inside the Phós Optics boutique in Limassol",
      pos: "50% 50%",
      by: "Phós Optics",
    },
  },
  {
    common: "Tom Ford",
    binomial: "Eyewear · In Store",
    photo: {
      url: "/carousel-images/tomford.jpg",
      text: "Tom Ford eyewear",
      pos: "50% 40%",
      by: "Phós Optics",
    },
  },
  {
    common: "Ray-Ban",
    binomial: "Sun · New Arrivals",
    photo: {
      url: "/carousel-images/rayban1.jpg",
      text: "Ray-Ban sunglasses",
      pos: "50% 45%",
      by: "Phós Optics",
    },
  },
  {
    common: "Folc",
    binomial: "Eyewear · In Store",
    photo: {
      url: "/carousel-images/folc.jpg",
      text: "Folc eyewear",
      pos: "50% 40%",
      by: "Phós Optics",
    },
  },
  {
    common: "Prada",
    binomial: "Eyewear · SS24",
    photo: {
      url: "/carousel-images/prada.jpg",
      text: "Prada eyewear",
      pos: "50% 35%",
      by: "Phós Optics",
    },
  },
  {
    common: "Kaleos",
    binomial: "Eyewear · SS24",
    photo: {
      url: "/carousel-images/KALEOS-SS24-03-scaled-qpxly6pfr7ksft92a4v8jdm5sz8nvym3u7ajg4q9mo.jpg",
      text: "Kaleos SS24 eyewear",
      pos: "50% 40%",
      by: "Phós Optics",
    },
  },
  {
    common: "Folc",
    binomial: "Lifestyle · New Arrivals",
    photo: {
      url: "/carousel-images/folccouple.jpg",
      text: "Couple wearing Folc eyewear",
      pos: "50% 30%",
      by: "Phós Optics",
    },
  },
  {
    common: "Ray-Ban",
    binomial: "Sun · New Arrivals",
    photo: {
      url: "/carousel-images/raybanreverse.jpg",
      text: "Ray-Ban Reverse sunglasses",
      pos: "50% 45%",
      by: "Phós Optics",
    },
  },
];

// Contact lens partners (service card 3).
export const contactLensBrands: BrandLogo[] = [
  { name: "CooperVision", src: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1777485438/Group_53_acvlge.png" },
  { name: "Johnson & Johnson", src: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1777485438/jnj_1_dztfdk.png" },
  { name: "Acuvue", src: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1777485437/1280px-Acuvue_logo.svg_1_qj8nb6.png" },
  { name: "Bausch + Lomb", src: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1777485437/Bausch_and_Lomb_Logo_2010.svg_1_ic3mzt.png" },
  { name: "Alcon", src: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1777485437/Alcon_Logo_2019.svg_1_kjiw6o.png" },
];
