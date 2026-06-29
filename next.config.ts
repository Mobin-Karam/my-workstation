import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.0.101"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
