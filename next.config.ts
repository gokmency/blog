import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Avoid Turbopack picking a wrong root when multiple lockfiles exist on the machine.
    root: __dirname,
  },
};

export default nextConfig;
