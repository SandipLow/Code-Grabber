/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', '**'],  // If you need to allow specific domains
  },
}

module.exports = nextConfig
