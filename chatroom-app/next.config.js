/** @type {import('next').NextConfig} */

const nextConfig = {
  serverRuntimeConfig: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_POCKETBASE_URL: process.env.NEXT_PUBLIC_POCKETBASE_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8090",
      },
    ],
  },
};

module.exports = nextConfig;
