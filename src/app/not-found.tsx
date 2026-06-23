import Link from "next/link";
import { manrope, outfit } from "@/lib/fonts";

// Global fallback 404 for non-localized paths. Self-contained (own <html>/<body>)
// because the root layout is a pass-through with no chrome.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${manrope.variable} ${outfit.variable}`}>
      <body className="bg-phos-cream font-sans text-phos-black antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <span className="mb-4 font-display text-7xl font-light text-phos-sage md:text-8xl">
            404
          </span>
          <h1 className="mb-4 font-display text-3xl font-light text-phos-black md:text-4xl">
            Page not found
          </h1>
          <p className="mb-10 max-w-md font-sans text-phos-charcoal/70">
            The page you are looking for has moved or no longer exists.
          </p>
          <Link
            href="/"
            className="rounded-full bg-phos-black px-8 py-4 font-sans text-sm uppercase tracking-widest text-white transition-colors duration-300 hover:bg-phos-sage"
          >
            Back to home
          </Link>
        </main>
      </body>
    </html>
  );
}
