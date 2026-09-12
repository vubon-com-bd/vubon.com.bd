import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { CURRENCY } from '../common/currency.constants';

export const LOYALTY_REWARD = {
  TYPES: {
    ...COMMON_TYPES,
    DISCOUNT: 'discount',
    FREE_ITEM: 'free_item',
    FREE_SHIPPING: 'free_shipping',
    BONUS_POINTS: 'bonus_points',
    GIFT_CARD: 'gift_card',
    EARLY_ACCESS: 'early_access',
  },
  CURRENCY: { ...CURRENCY },
  REWARD_VALUES: {
    DISCOUNT: 0.1,
    FREE_ITEM: '1',
    FREE_SHIPPING: 0,
    BONUS_POINTS: 100,
    GIFT_CARD: 50,
  },
  MAX_REWARDS_PER_USER: 10,
  REWARD_EXPIRY_DAYS: 90,
} as const;
