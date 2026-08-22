import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { supabaseResponse, user } = await updateSession(request);

  const isAuthPage =
    pathname.startsWith("/auth/sign-in") || pathname.startsWith("/auth/sign-up");

  const isDashboardPage = pathname.startsWith("/dashboard");

  // User is logged in → don't allow login/signup
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // User is not logged in → protect dashboard
  if (!user && isDashboardPage) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // Public pages and authorized pages
  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - common image files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
