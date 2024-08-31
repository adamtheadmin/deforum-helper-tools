/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If you're using absolute URLs in your code, you might need to specify the base path:
  // basePath: '/your-base-path',
}

module.exports = nextConfig
