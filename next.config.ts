import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Configuración para optimización de imágenes
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Dominios permitidos para imágenes externas
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],

    // Calidad de compresión (1-100)
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 año
  },
};

export default nextConfig;
