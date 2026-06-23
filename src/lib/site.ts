// Single source of truth for business data. Used by the footer, contact
// section, metadata builders and the schema.org JSON-LD so they never drift.

export const site = {
  url: "https://www.phosoptics.com",
  name: "Phós Optics",
  founder: "Nikolas Pateras",
  email: "info@phosoptics.com",
  phone: "+357 25 320004",
  phoneHref: "tel:+35725320004",
  priceRange: "$$$",

  // Google Calendar appointment scheduler (real booking link).
  bookingUrl:
    "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2--S6Ez8iM-IdpbneDWD_q4WnZE4tRM-h4fvqLiwu_ZwTJ-M6L4fNQavVPYdjhh7Nt4V5capf3",

  address: {
    street: "Kolonakiou 60, Agios Athanasios",
    locality: "Limassol",
    postalCode: "4103",
    country: "CY",
  },
  geo: { lat: 34.7032, lng: 33.056 },

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Kolonakiou+60,+Agios+Athanasios+4103,+Limassol,+Cyprus",
  mapsEmbed:
    "https://www.google.com/maps?q=Kolonakiou+60,+Agios+Athanasios+4103,+Limassol,+Cyprus&output=embed",

  social: {
    instagram: "https://www.instagram.com/phos.optics/",
    facebook: "https://www.facebook.com/phos.optics/",
  },

  // Hosted assets (Cloudinary).
  logo: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1770807357/LOGOPHOS_a2sbkp.svg",
  favicon:
    "https://res.cloudinary.com/dnxoz9alm/image/upload/v1776513031/Frame_111_vogsyo.png",
  ogImage:
    "https://res.cloudinary.com/dnxoz9alm/image/upload/v1776512672/PhosOpticsOGBackgroundImage_hspum1.png",
} as const;

// Opening hours — drives both the visible schedule and JSON-LD.
// days: schema.org DayOfWeek names; used to build openingHoursSpecification.
export const openingHours = [
  { days: ["Monday", "Tuesday", "Thursday", "Friday"], opens: "09:30", closes: "19:00" },
  { days: ["Wednesday"], opens: "09:00", closes: "14:00" },
  { days: ["Saturday"], opens: "09:30", closes: "17:30" },
] as const;
