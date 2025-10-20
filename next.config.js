/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent Node-only modules from being bundled into the client
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        undici: false,
        'node-fetch': false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
