/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose'],
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ['firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig
