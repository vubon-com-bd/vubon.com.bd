export const robotsConfig = {
  defaultUserAgent: '*',
  allow: ['/'],
  disallow: ['/admin/*', '/auth/*', '/api/*', '/_next/*'],
  crawlDelay: 1,
  sitemap: '/sitemap.xml',
} as const;
