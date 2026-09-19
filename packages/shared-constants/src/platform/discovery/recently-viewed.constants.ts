export const RECENTLY_VIEWED_TYPE = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  BRANDS: 'brands',
  VENDORS: 'vendors',
  ARTICLES: 'articles',
  SEARCHES: 'searches',
} as const;

export const RECENTLY_VIEWED = {
  MAX_ITEMS_PER_USER: 100,
  DEFAULT_DISPLAY: 10,
  RETENTION_DAYS: 90,
  DEDUPLICATE: true,
  TRACK_DEVICE: true,
  SYNC_CROSS_DEVICE: true,
  ANONYMIZE_AFTER_DAYS: 90,
  PERSIST_GUEST: true,
  GUEST_RETENTION_DAYS: 30,
} as const;

export type RecentlyViewedTypeType =
  (typeof RECENTLY_VIEWED_TYPE)[keyof typeof RECENTLY_VIEWED_TYPE];
