export const POPULAR_TYPE = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  BRANDS: 'brands',
  VENDORS: 'vendors',
  SEARCHES: 'searches',
  ARTICLES: 'articles',
} as const;

export const POPULAR_PERIOD = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
  ALL_TIME: 'all_time',
} as const;

export const POPULAR_METRIC = {
  VIEWS: 'views',
  PURCHASES: 'purchases',
  RATINGS: 'ratings',
  REVIEWS: 'reviews',
  SHARES: 'shares',
  WISHLIST_ADDS: 'wishlist_adds',
  WEIGHTED: 'weighted',
} as const;

export const POPULAR = {
  MAX_ITEMS: 100,
  DEFAULT_ITEMS: 20,
  REFRESH_INTERVAL_HOURS: 6,
  MIN_VIEWS: 100,
  MIN_PURCHASES: 5,
  MIN_RATING: 3.0,
  WEIGHT_VIEWS: 0.2,
  WEIGHT_PURCHASES: 0.5,
  WEIGHT_RATINGS: 0.15,
  WEIGHT_SHARES: 0.15,
  RETENTION_DAYS: 90,
} as const;

export type PopularTypeType = (typeof POPULAR_TYPE)[keyof typeof POPULAR_TYPE];
export type PopularPeriodType = (typeof POPULAR_PERIOD)[keyof typeof POPULAR_PERIOD];
export type PopularMetricType = (typeof POPULAR_METRIC)[keyof typeof POPULAR_METRIC];
