export const COMPLEMENTARY_TYPE = {
  ACCESSORY: 'accessory',
  ADD_ON: 'add_on',
  RELATED: 'related',
  COMPATIBLE: 'compatible',
  ESSENTIAL: 'essential',
  UPGRADE: 'upgrade',
} as const;

export const COMPLEMENTARY = {
  MAX_ITEMS: 20,
  DEFAULT_ITEMS: 6,
  MIN_AFFINITY: 0.15,
  LOOKBACK_DAYS: 180,
  REFRESH_INTERVAL_HOURS: 24,
  INCLUDE_OUT_OF_STOCK: false,
  DIVERSITY_ENABLED: true,
  EXCLUDE_SAME_CATEGORY: true,
  RETENTION_DAYS: 90,
} as const;

export type ComplementaryTypeType = (typeof COMPLEMENTARY_TYPE)[keyof typeof COMPLEMENTARY_TYPE];
