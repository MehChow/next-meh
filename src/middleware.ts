import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authApi from "./services/auth-api";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const publicRoutes = ["/", "/auth"];

  if (publicRoutes.includes(pathname)) {
    console.log("Its public route, you can go now");
    return NextResponse.next();
  }

  console.log("HEY!!! THIS IS PROTECTED!!");
  let accessToken = request.cookies.get("accessToken")?.value;
  const secret = new TextEncoder().encode(process.env.JWT_TOKEN_SECRET);
  if (!process.env.JWT_TOKEN_SECRET) {
    console.error("JWT_TOKEN_SECRET is not set!");
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  let isTokenValid = false;
  if (accessToken) {
    try {
      await jwtVerify(accessToken, secret);
      console.log("ACCESS TOKEN verified!!");
      isTokenValid = true;
    } catch (error: any) {
      console.log("Token verification failed:", error.message);
      // Token is invalid or expired; proceed to refresh
    }
  }

  if (!isTokenValid) {
    console.log("Token is invalid or expired, proceed to refresh");
    const newTokens = await refreshAccessToken(request);
    if (!newTokens?.accessToken || !newTokens?.refreshToken) {
      console.log("Failed to refresh access token, redirecting to login");
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    const response = NextResponse.next();
    response.cookies.set("accessToken", newTokens.accessToken, {
      httpOnly: true,
      secure: false, // Use true in production with HTTPS
      sameSite: "strict",
      // Remember set the expires time ALIGNED with the backend!!
      expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes expiration
    });

    response.cookies.set("refreshToken", newTokens.refreshToken, {
      httpOnly: true,
      secure: false, // Use true in production with HTTPS
      sameSite: "strict",
      // Remember set the expires time ALIGNED with the backend!!
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiration
    });
    return response;
  }
  return NextResponse.next();
}

async function refreshAccessToken(request: NextRequest) {
  try {
    // Step 1: Locate the refreshToken in cookies
    const refreshToken = request.cookies.get("refreshToken")?.value;
    console.log("Refresh token found:", refreshToken);
    if (!refreshToken) {
      console.log("No refresh token found, cannot refresh access token.");
      return undefined;
    }

    // Step 2: Refresh the access token using the found refreshToken
    const response = await authApi.refreshAccessToken(refreshToken);

    if (!response.accessToken) {
      console.log("Failed to get the new access token. LOG THE FK OUT!!");
      return undefined;
    }

    // Step 3: Return the new access token
    console.log("Successfully got the new access token!!!");
    return response;
  } catch (error: any) {
    if (error.response?.status === 400) {
      console.log("Invalid refresh token (400), refresh failed");
    } else {
      console.error("Error refreshing access token:", error.message);
    }
    return undefined;
  }
}

// Configure which routes the middleware applies to
export const config = {
  matcher: ["/dashboard/:path*"], // Only run middleware for /dashboard and its subpaths
};
