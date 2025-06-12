/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: [],
    unoptimized: true
  },
  poweredByHeader: false,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons']
  }
};

export default nextConfig; 