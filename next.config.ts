import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Remote image hosts used by the site (Cloudinary accounts + Unsplash).
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    // Preserve old static URLs so existing inbound links never 404.
    return [
      { source: "/LandingPage", destination: "/en/brands", permanent: true },
      { source: "/LandingPage/Brands", destination: "/en/brands", permanent: true },
      { source: "/Articles/:slug", destination: "/en/journal/:slug", permanent: true },
      { source: "/why-phos-optics-gr", destination: "/el/journal/why-phos-ptics", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
