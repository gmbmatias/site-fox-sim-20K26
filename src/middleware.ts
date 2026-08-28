import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore Next.js internals, static files, ads.txt, robots.txt, sitemap.xml, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname === "/ads.txt" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/icon" ||
    pathname === "/opengraph-image" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with a valid locale
  const pathnameLocale = LOCALES.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale) {
    return NextResponse.next();
  }

  // If root "/" -> redirect to default locale "/pt-br"
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(url, 308);
  }

  // For any non-locale URL (e.g. /estudos, /artigos/como-interpretar-metar), 308 redirect to /pt-br/...
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, ads.txt, etc.
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
