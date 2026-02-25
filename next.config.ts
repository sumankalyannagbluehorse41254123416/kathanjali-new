import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    domains: ["ik.imagekit.io"], // <-- ADD THIS
  },
};

export default nextConfig;
