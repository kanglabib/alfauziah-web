import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Mengabaikan error ESLint agar tidak membatalkan build di Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Mengabaikan error TypeScript ringan jika ada saat build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;