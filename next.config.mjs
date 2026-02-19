/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/free-consultation',
        destination: '/free-consultation/index.html',
      },
    ]
  },
};

export default nextConfig;