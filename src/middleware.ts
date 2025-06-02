import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PUBLIC_ROUTES } from "@/constant/Routes";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public routes, no need to check for authentication
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Get both tokens from cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // If both tokens are missing, redirect to login
  if (!accessToken && !refreshToken) {
    const returnUrl = encodeURIComponent(request.url);
    return NextResponse.redirect(
      new URL(`/auth?tab=Login&returnUrl=${returnUrl}`, request.url)
    );
  }

  // If at least one token exists, let the axios interceptor handle the rest
  return NextResponse.next();
}

// Configure which routes the middleware applies to
export const config = {
  matcher: ["/dashboard/:path*"], // Only run middleware for /dashboard and its subpaths
};
