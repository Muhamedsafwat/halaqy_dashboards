/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    reactCompiler: false,
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
