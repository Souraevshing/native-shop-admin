import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivityPosition: "bottom-right",
    appIsrStatus: true,
    buildActivity: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stkzkwbtvbulwkxmegui.supabase.co",
        pathname: "/storage/v1/object/public/app-images/**",
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
    turbo: {
      resolveExtensions: [
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
        ".json",
        ".mjs",
        ".cjs",
        ".wasm",
        ".css",
        ".scss",
        ".sass",
        ".less",
        ".md",
        ".mdx",
        ".svg",
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".webp",
        ".avif",
        ".webm",
        ".mp4",
        ".mp3",
        ".wav",
      ],
      minify: true,
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
