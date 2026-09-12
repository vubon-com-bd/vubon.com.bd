import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const CROSS_SELLING = {
  TYPES: {
    ...COMMON_TYPES,
    RELATED: 'related',
    ACCESSORY: 'accessory',
    SERVICE: 'service',
    WARRANTY: 'warranty',
    SUBSCRIPTION: 'subscription',
  },
  CROSS_SELL_SCORE_THRESHOLD: 0.6,
  MAX_CROSS_SELL_ITEMS: 8,
  CROSS_SELL_CATEGORY_MATCH: 0.7,
  ANALYSIS_WINDOW_DAYS: 60,
  UPDATE_INTERVAL_DAYS: 7,
} as const;
