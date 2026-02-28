import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '4ne9fphotqlkpkiu.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'jdbq2irxpigvqa1h.private.blob.vercel-storage.com',
      }
    ]
  }
};

export default nextConfig;
