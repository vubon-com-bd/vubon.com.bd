export const SEARCH_INDEX_TYPE = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  BRANDS: 'brands',
  VENDORS: 'vendors',
  USERS: 'users',
  ORDERS: 'orders',
  ARTICLES: 'articles',
  FAQ: 'faq',
  REVIEWS: 'reviews',
} as const;

export const SEARCH_INDEX_STATUS = {
  ACTIVE: 'active',
  BUILDING: 'building',
  REBUILDING: 'rebuilding',
  PAUSED: 'paused',
  ERROR: 'error',
  ARCHIVED: 'archived',
} as const;

export const SEARCH_INDEX = {
  SHARDS: 3,
  REPLICAS: 1,
  REFRESH_INTERVAL_SECONDS: 30,
  MAX_RESULT_WINDOW: 10000,
  BATCH_SIZE: 1000,
  MAX_FIELDS: 200,
  MAX_NESTED_DEPTH: 5,
  AUTO_REBUILD: false,
  REBUILD_SCHEDULE: 'weekly',
  RETENTION_DAYS: 30,
} as const;

export type SearchIndexTypeType = (typeof SEARCH_INDEX_TYPE)[keyof typeof SEARCH_INDEX_TYPE];
export type SearchIndexStatusType = (typeof SEARCH_INDEX_STATUS)[keyof typeof SEARCH_INDEX_STATUS];
