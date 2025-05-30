import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const publicRoutes = ["/", "/auth"];

  // Public routes, no need to check for authentication
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Get both tokens from cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // If both tokens are missing, redirect to login
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/auth?tab=Login", request.url));
  }

  // If at least one token exists, let the axios interceptor handle the rest
  return NextResponse.next();
}

// Configure which routes the middleware applies to
export const config = {
  matcher: ["/dashboard/:path*"], // Only run middleware for /dashboard and its subpaths
};
