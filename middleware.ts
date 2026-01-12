import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Lang = "en" | "tr";

function detectPreferredLanguage(req: NextRequest): Lang {
  const al = req.headers.get("accept-language") || "";
  // Very small heuristic: prefer TR if it appears early, otherwise EN.
  return /\btr\b/i.test(al) ? "tr" : "en";
}

function isLang(value: string): value is Lang {
  return value === "en" || value === "tr";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const seg = pathname.split("/")[1] || "";

  // Redirect non-localized routes to a localized equivalent.
  if (!isLang(seg)) {
    const lang = detectPreferredLanguage(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  // Make current language available to server components (root layout can't read params).
  const headers = new Headers(req.headers);
  headers.set("x-bgc-lang", seg);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  // Skip Next internals, API routes, and files with extensions.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

