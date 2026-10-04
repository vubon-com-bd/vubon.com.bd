export const SEO_STRATEGY = {
  WHITE_HAT: 'white_hat',
  BLACK_HAT: 'black_hat',
  GREY_HAT: 'grey_hat',
  CONTENT_MARKETING: 'content_marketing',
  LINK_BUILDING: 'link_building',
  KEYWORD_RESEARCH: 'keyword_research',
  TECHNICAL_AUDIT: 'technical_audit',
  LOCAL_SEO: 'local_seo',
} as const;

export const SEO_CRAWL_FREQUENCY = {
  ALWAYS: 'always',
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  NEVER: 'never',
} as const;

export type SeoStrategyType = (typeof SEO_STRATEGY)[keyof typeof SEO_STRATEGY];
export type SeoCrawlFrequencyType = (typeof SEO_CRAWL_FREQUENCY)[keyof typeof SEO_CRAWL_FREQUENCY];
