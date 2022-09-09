/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.jb-dev-couturier.fr', 'cdn.sanity.io'],
  },
};

module.exports = nextConfig
