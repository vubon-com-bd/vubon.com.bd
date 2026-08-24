/**
 * Vendor Tier Constants
 * Tier definitions for vendors
 */

// Tier Types
export const VENDOR_TIER_TYPES = {
  BASIC: 'basic',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum',
  DIAMOND: 'diamond',
} as const;

export type VendorTierType = (typeof VENDOR_TIER_TYPES)[keyof typeof VENDOR_TIER_TYPES];

// Tier Levels (numeric)
export const VENDOR_TIER_LEVELS = {
  BASIC: 1,
  SILVER: 2,
  GOLD: 3,
  PLATINUM: 4,
  DIAMOND: 5,
} as const;

export type VendorTierLevel = (typeof VENDOR_TIER_LEVELS)[keyof typeof VENDOR_TIER_LEVELS];

// Tier Requirements
export const VENDOR_TIER_REQUIREMENTS = {
  BASIC: {
    minOrders: 0,
    minRevenue: 0,
    minRating: 0,
  },
  SILVER: {
    minOrders: 100,
    minRevenue: 50000,
    minRating: 3.5,
  },
  GOLD: {
    minOrders: 500,
    minRevenue: 200000,
    minRating: 4.0,
  },
  PLATINUM: {
    minOrders: 1000,
    minRevenue: 500000,
    minRating: 4.5,
  },
  DIAMOND: {
    minOrders: 5000,
    minRevenue: 1000000,
    minRating: 4.8,
  },
};

export type VendorTierRequirements =
  (typeof VENDOR_TIER_REQUIREMENTS)[keyof typeof VENDOR_TIER_REQUIREMENTS];

// Tier Colors (for UI)
export const VENDOR_TIER_COLORS = {
  BASIC: '#gray-500',
  SILVER: '#silver-500',
  GOLD: '#gold-500',
  PLATINUM: '#platinum-500',
  DIAMOND: '#diamond-500',
} as const;

export type VendorTierColor = (typeof VENDOR_TIER_COLORS)[keyof typeof VENDOR_TIER_COLORS];

// Tier Icons (for UI)
export const VENDOR_TIER_ICONS = {
  BASIC: '🔵',
  SILVER: '⚪',
  GOLD: '🟡',
  PLATINUM: '🔘',
  DIAMOND: '💎',
} as const;

export type VendorTierIcon = (typeof VENDOR_TIER_ICONS)[keyof typeof VENDOR_TIER_ICONS];

// Tier Benefits
export const VENDOR_TIER_BENEFITS = {
  BASIC: ['Basic Commission: 20%', 'Standard Support', 'Basic Analytics'],
  SILVER: ['Commission: 15%', 'Priority Support', 'Advanced Analytics'],
  GOLD: ['Commission: 12%', 'Priority Support', 'Advanced Analytics', 'Promotion Tools'],
  PLATINUM: ['Commission: 10%', 'Dedicated Manager', 'Premium Analytics', 'Promotion Tools'],
  DIAMOND: [
    'Commission: 8%',
    'Dedicated Manager',
    'Premium Analytics',
    'Promotion Tools',
    'Revenue Sharing',
  ],
};

// Utility Functions
export function vendorTierGetLabel(tier: VendorTierType): string {
  const labels: Record<VendorTierType, string> = {
    [VENDOR_TIER_TYPES.BASIC]: 'Basic',
    [VENDOR_TIER_TYPES.SILVER]: 'Silver',
    [VENDOR_TIER_TYPES.GOLD]: 'Gold',
    [VENDOR_TIER_TYPES.PLATINUM]: 'Platinum',
    [VENDOR_TIER_TYPES.DIAMOND]: 'Diamond',
  };
  return labels[tier] || 'Unknown';
}

export function vendorTierGetLevel(tier: VendorTierType): number {
  const levels: Record<VendorTierType, number> = {
    [VENDOR_TIER_TYPES.BASIC]: VENDOR_TIER_LEVELS.BASIC,
    [VENDOR_TIER_TYPES.SILVER]: VENDOR_TIER_LEVELS.SILVER,
    [VENDOR_TIER_TYPES.GOLD]: VENDOR_TIER_LEVELS.GOLD,
    [VENDOR_TIER_TYPES.PLATINUM]: VENDOR_TIER_LEVELS.PLATINUM,
    [VENDOR_TIER_TYPES.DIAMOND]: VENDOR_TIER_LEVELS.DIAMOND,
  };
  return levels[tier] || 1;
}

export function vendorTierGetColor(tier: VendorTierType): VendorTierColor {
  const colors: Record<VendorTierType, VendorTierColor> = {
    [VENDOR_TIER_TYPES.BASIC]: VENDOR_TIER_COLORS.BASIC,
    [VENDOR_TIER_TYPES.SILVER]: VENDOR_TIER_COLORS.SILVER,
    [VENDOR_TIER_TYPES.GOLD]: VENDOR_TIER_COLORS.GOLD,
    [VENDOR_TIER_TYPES.PLATINUM]: VENDOR_TIER_COLORS.PLATINUM,
    [VENDOR_TIER_TYPES.DIAMOND]: VENDOR_TIER_COLORS.DIAMOND,
  };
  return colors[tier] || '#gray-400';
}

export function vendorTierGetIcon(tier: VendorTierType): VendorTierIcon {
  const icons: Record<VendorTierType, VendorTierIcon> = {
    [VENDOR_TIER_TYPES.BASIC]: VENDOR_TIER_ICONS.BASIC,
    [VENDOR_TIER_TYPES.SILVER]: VENDOR_TIER_ICONS.SILVER,
    [VENDOR_TIER_TYPES.GOLD]: VENDOR_TIER_ICONS.GOLD,
    [VENDOR_TIER_TYPES.PLATINUM]: VENDOR_TIER_ICONS.PLATINUM,
    [VENDOR_TIER_TYPES.DIAMOND]: VENDOR_TIER_ICONS.DIAMOND,
  };
  return icons[tier] || '🔵';
}

export function vendorTierGetRequirements(tier: VendorTierType): VendorTierRequirements {
  const requirements: Record<VendorTierType, VendorTierRequirements> = {
    [VENDOR_TIER_TYPES.BASIC]: VENDOR_TIER_REQUIREMENTS.BASIC,
    [VENDOR_TIER_TYPES.SILVER]: VENDOR_TIER_REQUIREMENTS.SILVER,
    [VENDOR_TIER_TYPES.GOLD]: VENDOR_TIER_REQUIREMENTS.GOLD,
    [VENDOR_TIER_TYPES.PLATINUM]: VENDOR_TIER_REQUIREMENTS.PLATINUM,
    [VENDOR_TIER_TYPES.DIAMOND]: VENDOR_TIER_REQUIREMENTS.DIAMOND,
  };
  return requirements[tier] || VENDOR_TIER_REQUIREMENTS.BASIC;
}

export function vendorTierGetBenefits(tier: VendorTierType): string[] {
  const benefits: Record<VendorTierType, string[]> = {
    [VENDOR_TIER_TYPES.BASIC]: VENDOR_TIER_BENEFITS.BASIC,
    [VENDOR_TIER_TYPES.SILVER]: VENDOR_TIER_BENEFITS.SILVER,
    [VENDOR_TIER_TYPES.GOLD]: VENDOR_TIER_BENEFITS.GOLD,
    [VENDOR_TIER_TYPES.PLATINUM]: VENDOR_TIER_BENEFITS.PLATINUM,
    [VENDOR_TIER_TYPES.DIAMOND]: VENDOR_TIER_BENEFITS.DIAMOND,
  };
  return benefits[tier] || [];
}

export function vendorTierGetCommissionRate(tier: VendorTierType): number {
  const rates: Record<VendorTierType, number> = {
    [VENDOR_TIER_TYPES.BASIC]: 20,
    [VENDOR_TIER_TYPES.SILVER]: 15,
    [VENDOR_TIER_TYPES.GOLD]: 12,
    [VENDOR_TIER_TYPES.PLATINUM]: 10,
    [VENDOR_TIER_TYPES.DIAMOND]: 8,
  };
  return rates[tier] || 20;
}
