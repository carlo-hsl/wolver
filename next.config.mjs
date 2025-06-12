/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  trailingSlash: false,
  distDir: '.next',
  typescript: {
    ignoreBuildErrors: false
  }
};

export default nextConfig; 