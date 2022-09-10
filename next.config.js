/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
    ignoreBuildErrors:true,

  },
  
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'www.jb-dev-couturier.fr',
      'cdn.sanity.io',
      'lh3.googleusercontent.com',
    ],
  },
};

module.exports = nextConfig
