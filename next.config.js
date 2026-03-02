// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other configuration settings ...

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/static/**', // Allows access to images under /static/
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;