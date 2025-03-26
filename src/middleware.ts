import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import authService from "./services/authService";

// Handle refreshing the access token
async function refreshAccessToken(request: NextRequest): Promise<string | undefined> {
  try {
    // Step 1: Locate the refreshToken in cookies
    const refreshToken = request.cookies.get("refreshToken")?.value;
    console.log("Refresh token found:", refreshToken);
    if (!refreshToken) {
      console.log("No refresh token found, cannot refresh access token.");
      return undefined;
    }

    // Step 2: Refresh the access token using the found refreshToken
    const { accessToken: newAccessToken } = await authService.refreshAccessToken(refreshToken);
    if (!newAccessToken) {
      console.log("Failed to get the new access token. LOG THE FK OUT!!");
      return undefined;
    }

    // Step 3: Return the new access token
    console.log("Successfully got the new access token!!!");
    return newAccessToken;
  } catch (error) {
    console.log("Error refreshing access token WTF?");
    return undefined;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const publicRoutes = ["/", "/auth"];

  if (publicRoutes.includes(pathname)) {
    console.log("Its public route, you can go now");
    return NextResponse.next();
  }

  // When the user visits a protected route, check if the accessToken exists
  let accessToken = request.cookies.get("accessToken")?.value;
  // Check for the jwt secret existence
  const secret = new TextEncoder().encode(process.env.JWT_TOKEN_SECRET);
  if (!process.env.JWT_TOKEN_SECRET) {
    console.error("JWT_TOKEN_SECRET is not set!");
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Try to verify the accessToken if it exists
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

  // If the token is missing or invalid, try to refresh.
  // Handle refresh access token for page navigating
  if (!isTokenValid) {
    console.log("Access token missing or invalid, attempting to refresh...");
    accessToken = await refreshAccessToken(request);

    if (!accessToken) {
      console.log("Refresh failed, redirecting to /auth");
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    // Set the new accessToken as a cookie
    const response = NextResponse.next();
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: false, // Use true in production with HTTPS
      sameSite: "strict",
      // Remember set the expires time ALIGNED with the backend!!
      expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes expiration
    });
    console.log("New access token generated and set as cookie!!");

    // Verify the new token
    try {
      await jwtVerify(accessToken, secret);
      console.log("New access token verified!! Proceeding to protected route");
      return response;
    } catch (error: any) {
      console.log("New access token verification failed:", error.message);
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes the middleware applies to
export const config = {
  matcher: ["/dashboard/:path*"], // Only run middleware for /dashboard and its subpaths
};
