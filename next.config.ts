import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5216/api/:path*", // Backend URL
      },
    ];
  },
};

export default nextConfig;
