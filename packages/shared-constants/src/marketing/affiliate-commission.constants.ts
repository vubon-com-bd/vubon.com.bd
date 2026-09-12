import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { CURRENCY } from '../common/currency.constants';

export const AFFILIATE_COMMISSION = {
  TYPES: {
    ...COMMON_TYPES,
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    TIERED: 'tiered',
    HYBRID: 'hybrid',
  },
  CURRENCY: { ...CURRENCY },
  COMMISSION_TIERS: {
    TIER_1: 0.1,
    TIER_2: 0.12,
    TIER_3: 0.15,
    TIER_4: 0.2,
  },
  MIN_COMMISSION_AMOUNT: 1,
  MAX_COMMISSION_AMOUNT: 100000,
  DEFAULT_COMMISSION_RATE: 0.1,
} as const;
