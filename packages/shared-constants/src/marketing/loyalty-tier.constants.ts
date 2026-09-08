import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const LOYALTY_TIER = {
  TYPES: {
    ...COMMON_TYPES,
    BASIC: 'basic',
    SILVER: 'silver',
    GOLD: 'gold',
    PLATINUM: 'platinum',
    DIAMOND: 'diamond',
  },
  TIER_REQUIREMENTS: {
    BASIC: 0,
    SILVER: 1000,
    GOLD: 5000,
    PLATINUM: 10000,
    DIAMOND: 25000,
  },
  TIER_BENEFITS: {
    BASIC: ['standard_discount'],
    SILVER: ['standard_discount', 'free_shipping'],
    GOLD: ['standard_discount', 'free_shipping', 'priority_support'],
    PLATINUM: ['standard_discount', 'free_shipping', 'priority_support', 'exclusive_offers'],
    DIAMOND: [
      'standard_discount',
      'free_shipping',
      'priority_support',
      'exclusive_offers',
      'vip_access',
    ],
  },
  TIER_DISCOUNTS: {
    BASIC: 0,
    SILVER: 5,
    GOLD: 10,
    PLATINUM: 15,
    DIAMOND: 20,
  },
} as const;
