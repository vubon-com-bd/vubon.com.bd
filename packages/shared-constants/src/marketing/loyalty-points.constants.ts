import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const LOYALTY_POINTS = {
  TYPES: {
    ...COMMON_TYPES,
    EARNED: 'earned',
    SPENT: 'spent',
    EXPIRED: 'expired',
    ADJUSTED: 'adjusted',
    BONUS: 'bonus',
    REFERRAL: 'referral',
  },
  POINTS_MULTIPLIERS: {
    STANDARD: 1,
    SILVER: 1.5,
    GOLD: 2,
    PLATINUM: 3,
    DIAMOND: 4,
  },
  MIN_POINTS_FOR_REDEMPTION: 100,
  MAX_POINTS_PER_TRANSACTION: 10000,
} as const;
