export const FREQUENTLY_BOUGHT_TYPE = {
  TOGETHER: 'together',
  AFTER_VIEWING: 'after_viewing',
  AFTER_PURCHASE: 'after_purchase',
  SAME_SESSION: 'same_session',
} as const;

export const FREQUENTLY_BOUGHT = {
  MAX_ITEMS: 10,
  DEFAULT_ITEMS: 5,
  MIN_CO_OCCURRENCES: 3,
  MIN_CONFIDENCE: 0.1,
  MIN_LIFT: 1.0,
  LOOKBACK_DAYS: 90,
  REFRESH_INTERVAL_HOURS: 24,
  INCLUDE_OUT_OF_STOCK: false,
  RETENTION_DAYS: 90,
} as const;

export type FrequentlyBoughtTypeType =
  (typeof FREQUENTLY_BOUGHT_TYPE)[keyof typeof FREQUENTLY_BOUGHT_TYPE];
