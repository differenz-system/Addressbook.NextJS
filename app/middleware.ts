import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth_user");

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/contacts");

  if (isProtectedRoute && !authCookie) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/contacts/:path*"],
};
