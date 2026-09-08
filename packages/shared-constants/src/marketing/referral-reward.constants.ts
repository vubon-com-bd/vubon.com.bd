import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { CURRENCY } from '../common/currency.constants';
import { LOYALTY_POINTS } from './loyalty-points.constants';

export const REFERRAL_REWARD = {
  TYPES: {
    ...COMMON_TYPES,
    CASH: 'cash',
    DISCOUNT: 'discount',
    POINTS: 'points',
    GIFT: 'gift',
    BONUS: 'bonus',
  },
  CURRENCY: { ...CURRENCY },
  LOYALTY_POINTS: { ...LOYALTY_POINTS },
  REWARD_AMOUNTS: {
    REFERRER: 100,
    REFERRED: 50,
    BOTH: 150,
  },
  MAX_REFERRAL_REWARDS_PER_USER: 50,
} as const;
