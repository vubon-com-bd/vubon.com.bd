import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { CURRENCY } from '../../common/currency.constants';
import { VENDOR_TIER } from './vendor-tier.constants';
import { VENDOR_FEATURE } from './vendor-feature.constants';

export const VENDOR_SUBSCRIPTION_PLAN = {
  TYPES: {
    ...COMMON_TYPES,
    ...VENDOR_TIER,
    BASIC: 'basic',
    SILVER: 'silver',
    GOLD: 'gold',
    PLATINUM: 'platinum',
    DIAMOND: 'diamond',
    ENTERPRISE: 'enterprise',
  },
  CURRENCY: { ...CURRENCY },
  VENDOR_TIER: { ...VENDOR_TIER },
  VENDOR_FEATURE: { ...VENDOR_FEATURE },
  PLAN_PRICING: {
    BASIC: 0,
    SILVER: 29.99,
    GOLD: 49.99,
    PLATINUM: 99.99,
    DIAMOND: 199.99,
    ENTERPRISE: 499.99,
  },
  PLAN_FEATURES: {
    BASIC: ['store_front', 'basic_analytics', 'product_upload:100'],
    SILVER: ['store_front', 'advanced_analytics', 'product_upload:500', 'priority_support'],
    GOLD: [
      'store_front',
      'premium_analytics',
      'product_upload:1000',
      'priority_support',
      'marketing_tools',
    ],
    PLATINUM: [
      'store_front',
      'premium_analytics',
      'product_upload:5000',
      'priority_support',
      'marketing_tools',
      'api_access',
    ],
    DIAMOND: [
      'store_front',
      'enterprise_analytics',
      'product_upload:10000',
      'dedicated_support',
      'marketing_tools',
      'api_access',
      'custom_branding',
    ],
    ENTERPRISE: [
      'store_front',
      'enterprise_analytics',
      'product_upload:unlimited',
      'dedicated_support',
      'marketing_tools',
      'api_access',
      'custom_branding',
      'white_label',
    ],
  },
  MAX_STAFF_PER_PLAN: {
    BASIC: 1,
    SILVER: 2,
    GOLD: 5,
    PLATINUM: 10,
    DIAMOND: 20,
    ENTERPRISE: 50,
  },
} as const;
