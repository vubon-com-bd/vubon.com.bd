/**
 * Tier Config
 * টায়ার কনফিগারেশন
 */

import { VENDOR_TIERS } from '@vubon/shared-constants';

export interface TierConfig {
  enabled: boolean;
  tiers: Record<string, string>;
  upgradeThreshold: {
    gold: { orders: number; revenue: number };
    platinum: { orders: number; revenue: number };
    diamond: { orders: number; revenue: number };
    enterprise: { orders: number; revenue: number };
  };
  benefits: Record<string, string[]>;
  defaults: {
    tier: string;
  };
}

export const tierConfig: TierConfig = {
  enabled: true,
  tiers: {
    basic: VENDOR_TIERS.BASIC,
    silver: VENDOR_TIERS.SILVER,
    gold: VENDOR_TIERS.GOLD,
    platinum: VENDOR_TIERS.PLATINUM,
    diamond: VENDOR_TIERS.DIAMOND,
    enterprise: VENDOR_TIERS.ENTERPRISE,
  },

  upgradeThreshold: {
    gold: { orders: 100, revenue: 100000 },
    platinum: { orders: 500, revenue: 500000 },
    diamond: { orders: 1000, revenue: 1000000 },
    enterprise: { orders: 2000, revenue: 2000000 },
  },

  benefits: {
    basic: ['Basic listing', 'Order management'],
    silver: ['Basic listing', 'Order management', 'Basic analytics'],
    gold: ['Basic listing', 'Order management', 'Advanced analytics', 'Promotion tools'],
    platinum: [
      'Basic listing',
      'Order management',
      'Advanced analytics',
      'Promotion tools',
      'Dedicated support',
    ],
    diamond: [
      'Basic listing',
      'Order management',
      'Advanced analytics',
      'Promotion tools',
      'Dedicated support',
      'Custom branding',
    ],
    enterprise: [
      'Basic listing',
      'Order management',
      'Advanced analytics',
      'Promotion tools',
      'Dedicated support',
      'Custom branding',
      'API access',
    ],
  },

  defaults: {
    tier: 'basic',
  },
} as const;

export type TierConfigType = typeof tierConfig;
