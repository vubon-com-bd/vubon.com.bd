/**
 * Sitemap Configuration
 * সাইটম্যাপ কনফিগারেশন
 */
export interface SitemapConfig {
  enabled: boolean;
  baseUrl: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  excludePaths: string[];
  includePaths: {
    path: string;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
  }[];
  generateImages: boolean;
  generateVideos: boolean;
  maxUrls: number;
  compression: boolean;
}

export const createSitemapConfig = (): SitemapConfig => ({
  enabled: true,
  baseUrl: process.env.BASE_URL || 'https://vubon.com.bd',
  changefreq: 'daily',
  priority: 0.8,
  excludePaths: ['/admin/*', '/dashboard/*', '/profile/*', '/api/*', '/auth/*'],
  includePaths: [
    { path: '/', priority: 1.0, changefreq: 'daily' },
    { path: '/products/*', priority: 0.8, changefreq: 'daily' },
    { path: '/categories/*', priority: 0.7, changefreq: 'weekly' },
    { path: '/blog/*', priority: 0.6, changefreq: 'weekly' },
  ],
  generateImages: true,
  generateVideos: false,
  maxUrls: 50000,
  compression: true,
});
