import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const RECENTLY_VIEWED = {
  TYPES: {
    ...COMMON_TYPES,
    PRODUCTS: 'products',
    VENDORS: 'vendors',
    CATEGORIES: 'categories',
    CONTENT: 'content',
  },
  MAX_VIEWED_ITEMS: 50,
  VIEW_EXPIRY_DAYS: 30,
  RECENTLY_VIEWED_COOKIE_DAYS: 30,
  MIN_VIEW_DURATION_SECONDS: 3,
  MAX_VIEW_DURATION_SECONDS: 3600,
  BATCH_UPDATE_INTERVAL_MINUTES: 5,
} as const;
