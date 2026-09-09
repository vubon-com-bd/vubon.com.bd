export const sitemapConfig = {
  maxUrlsPerSitemap: 50000,
  maxSitemapSize: 50 * 1024 * 1024, // 50 MB
  updateFrequency: 'daily',
  priority: {
    home: 1.0,
    product: 0.8,
    category: 0.6,
    blog: 0.5,
    page: 0.3,
  },
  excludePaths: ['/admin/*', '/auth/*', '/api/*'],
};
