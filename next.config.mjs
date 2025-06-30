/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false, // Enable image optimization
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'page1.genspark.site',
      },
      {
        protocol: 'https',
        hostname: 'cdn1.genspark.ai',
      }
    ],
  },
  output: 'export',
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 200000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            maxSize: 200000,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            maxSize: 150000,
          },
        },
      };
    }
    return config;
  },
}

export default nextConfig;
