import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const UPSELLING = {
  TYPES: {
    ...COMMON_TYPES,
    PREMIUM: 'premium',
    DELUXE: 'deluxe',
    PRO: 'pro',
    ENTERPRISE: 'enterprise',
    BUNDLE: 'bundle',
  },
  UPSELL_SCORE_THRESHOLD: 0.7,
  MAX_UPSELL_ITEMS: 5,
  PRICE_INCREASE_FACTOR: 0.3,
  UPSELL_CONVERSION_WINDOW_DAYS: 7,
  UPDATE_INTERVAL_DAYS: 3,
} as const;
