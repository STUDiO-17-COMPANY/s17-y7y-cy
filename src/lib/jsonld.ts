import { site, openingHours } from "./site";
import type { Article } from "./articles";

// schema.org LocalBusiness (Optician + MedicalClinic) — ported from the
// original homepage JSON-LD, driven by the shared site config.
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Optician", "MedicalClinic"],
    name: site.name,
    description:
      "Phós Optics provides contemporary vision care in Limassol, Cyprus, combining clinical optometry with luxury eyewear.",
    image: site.ogImage,
    logo: site.logo,
    "@id": `${site.url}/#localbusiness`,
    url: site.url,
    telephone: site.phone,
    priceRange: site.priceRange,
    founder: { "@type": "Person", name: site.founder },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Clinical Eye Examination" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: "Luxury Eyewear & Sunglasses" },
      },
    ],
    sameAs: [site.social.instagram, site.social.facebook],
  };
}

// schema.org Article for journal posts.
export function articleJsonLd(article: Article, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.heroImage.startsWith("http")
      ? article.heroImage
      : `${site.url}${article.heroImage}`,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Person", name: article.author },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: site.logo },
    },
    mainEntityOfPage: canonicalUrl,
  };
}

// Helper to render JSON-LD as a <script> payload.
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data);
}
