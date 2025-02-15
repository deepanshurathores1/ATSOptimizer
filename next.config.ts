/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // This will completely disable ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true, // This will allow TypeScript to continue even if there are errors
  },
};
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};


module.exports = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
  
}

export default nextConfig;
