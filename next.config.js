/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other configuration settings ...

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'noorayfatima-lilshop.hf.space',
        port: '', // Hugging Face uses standard HTTPS (no port needed)
        pathname: '/static/**', 
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;