export const TRENDING_TYPE = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  BRANDS: 'brands',
  SEARCHES: 'searches',
  HASHTAGS: 'hashtags',
  VENDORS: 'vendors',
  ARTICLES: 'articles',
} as const;

export const TRENDING_PERIOD = {
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
} as const;

export const TRENDING_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  ARCHIVED: 'archived',
} as const;

export const TRENDING = {
  MAX_ITEMS: 100,
  DEFAULT_ITEMS: 20,
  REFRESH_INTERVAL_MINUTES: 15,
  MIN_VIEWS: 100,
  MIN_PURCHASES: 10,
  TIME_WINDOW_HOURS: 24,
  DECAY_FACTOR: 0.95,
  RETENTION_DAYS: 30,
  PERSONALIZE: false,
} as const;

export type TrendingTypeType = (typeof TRENDING_TYPE)[keyof typeof TRENDING_TYPE];
export type TrendingPeriodType = (typeof TRENDING_PERIOD)[keyof typeof TRENDING_PERIOD];
export type TrendingStatusType = (typeof TRENDING_STATUS)[keyof typeof TRENDING_STATUS];
