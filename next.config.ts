import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Demo/placeholder images
      { protocol: 'https', hostname: 'picsum.photos' },
      // TikTok (multiple CDN domains)
      { protocol: 'https', hostname: '*.tiktokcdn.com' },
      { protocol: 'https', hostname: '*.tiktokcdn-eu.com' },
      { protocol: 'https', hostname: '*.tiktokcdn-us.com' },
      // YouTube
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: '*.youtube.com' },
      // Xiaohongshu (XHS uses both http and https, multiple CDN subdomains)
      { protocol: 'https', hostname: '*.xiaohongshu.com' },
      { protocol: 'https', hostname: '*.xhscdn.com' },
      { protocol: 'http', hostname: '*.xhscdn.com' },
      { protocol: 'https', hostname: 'sns-webpic-qc.xhscdn.com' },
      { protocol: 'http', hostname: 'sns-webpic-qc.xhscdn.com' },
      { protocol: 'https', hostname: 'sns-avatar-qc.xhscdn.com' },
      { protocol: 'http', hostname: 'sns-avatar-qc.xhscdn.com' },
      { protocol: 'https', hostname: 'ci.xiaohongshu.com' },
    ],
  },
};

export default nextConfig;
