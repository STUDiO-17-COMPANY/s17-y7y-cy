import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run on every path except API routes, Next internals, the isolated
  // /maintenance page, and anything that looks like a file (has a dot).
  matcher: ["/((?!api|_next|_vercel|maintenance|.*\\..*).*)"],
};
