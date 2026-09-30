/** @type {import('next').NextConfig} */
const nextConfig = {
  // TASK 1: TECHNICAL SEO (Redirects)
  async redirects() {
    return [
      {
        source: '/old-service-path',
        destination: '/services/web-engineering-platforms',
        permanent: true, // 301 redirect
      },
      {
        // Pre-redesign service page, replaced by the Figma service detail pages
        source: '/services/web-development',
        destination: '/services/web-engineering-platforms',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
    ];
  },
  
  // TASK 4: PERFORMANCE (Image optimization)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig
