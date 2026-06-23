import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";

// Pass-through root layout. The real <html>/<body> are rendered by the
// per-locale layout (so `lang` matches the active locale) and by the
// isolated /maintenance layout.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  icons: {
    icon: site.favicon,
    apple: site.favicon,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
