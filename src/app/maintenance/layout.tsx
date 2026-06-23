import type { Metadata } from "next";
import { plusJakarta, playfair } from "@/lib/fonts";

const DESCRIPTION =
  "This website is currently under development or scheduled technical maintenance. We will be back online very soon.";

export const metadata: Metadata = {
  title: "Website Under Maintenance",
  description: DESCRIPTION,
  icons: {
    icon: "https://res.cloudinary.com/dnxoz9alm/image/upload/v1770803115/FavIcon_gtzgb7.png",
  },
  openGraph: {
    title: "Website Under Maintenance",
    description: DESCRIPTION,
    type: "website",
    images: [
      "https://res.cloudinary.com/dnxoz9alm/image/upload/v1772523612/Post_10_-_4_atlsb8.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Under Maintenance",
    description: DESCRIPTION,
    images: [
      "https://res.cloudinary.com/dnxoz9alm/image/upload/v1772523612/Post_10_-_4_atlsb8.png",
    ],
  },
};

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <body
        style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
        className="relative flex h-screen w-screen flex-col overflow-hidden bg-white text-[#0F172A] antialiased selection:bg-[#2563EB] selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
