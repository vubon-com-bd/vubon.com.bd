export const SEO_SITEMAP_TYPE = {
  XML: 'xml',
  HTML: 'html',
  TXT: 'txt',
  NEWS: 'news',
  IMAGE: 'image',
  VIDEO: 'video',
} as const;

export const SEO_SITEMAP = {
  MAX_URLS_PER_FILE: 50000,
  MAX_FILE_SIZE_MB: 50,
  AUTO_GENERATE: true,
  INCLUDE_IMAGES: true,
  INCLUDE_VIDEOS: true,
  PING_SEARCH_ENGINES: true,
  CHANGEFREQ_DEFAULT: 'weekly',
  PRIORITY_DEFAULT: 0.5,
  PRIORITY_MIN: 0.0,
  PRIORITY_MAX: 1.0,
  RETENTION_DAYS: 30,
} as const;

export const SEO_SITEMAP_CHANGEFREQ = {
  ALWAYS: 'always',
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  NEVER: 'never',
} as const;

export type SeoSitemapTypeType = (typeof SEO_SITEMAP_TYPE)[keyof typeof SEO_SITEMAP_TYPE];
