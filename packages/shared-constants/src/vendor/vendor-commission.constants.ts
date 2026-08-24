/**
 * Vendor Commission Constants
 * Commission configurations for vendors
 */

export const VENDOR_COMMISSION = {
  // Commission Types
  TYPES: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    HYBRID: 'hybrid',
    TIERED: 'tiered',
  } as const,

  // Commission Categories
  CATEGORIES: {
    STANDARD: 'standard',
    PROMOTIONAL: 'promotional',
    SEASONAL: 'seasonal',
    SPECIAL: 'special',
  } as const,

  // Commission Statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    EXPIRED: 'expired',
    PENDING: 'pending',
  } as const,

  // Commission Colors (for UI)
  COLORS: {
    PERCENTAGE: '#green-500',
    FIXED: '#blue-500',
    HYBRID: '#purple-500',
    TIERED: '#orange-500',
  } as const,

  // Commission Tiers
  TIERS: {
    BASIC: {
      min: 0,
      max: 10000,
      rate: 0.15,
    },
    SILVER: {
      min: 10001,
      max: 50000,
      rate: 0.12,
    },
    GOLD: {
      min: 50001,
      max: 100000,
      rate: 0.1,
    },
    PLATINUM: {
      min: 100001,
      max: 500000,
      rate: 0.08,
    },
    DIAMOND: {
      min: 500001,
      max: Infinity,
      rate: 0.05,
    },
  } as const,

  // Commission Limits
  LIMITS: {
    MIN_RATE: 1,
    MAX_RATE: 50,
    DEFAULT_RATE: 15,
  } as const,

  // Commission Periods
  PERIODS: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,
} as const;

// Commission Types
export type VendorCommissionType =
  (typeof VENDOR_COMMISSION.TYPES)[keyof typeof VENDOR_COMMISSION.TYPES];

// Commission Categories
export type VendorCommissionCategory =
  (typeof VENDOR_COMMISSION.CATEGORIES)[keyof typeof VENDOR_COMMISSION.CATEGORIES];

// Commission Statuses
export type VendorCommissionStatus =
  (typeof VENDOR_COMMISSION.STATUS)[keyof typeof VENDOR_COMMISSION.STATUS];

// Commission Colors
export type VendorCommissionColor =
  (typeof VENDOR_COMMISSION.COLORS)[keyof typeof VENDOR_COMMISSION.COLORS];

// Commission Tiers
export type VendorCommissionTier =
  (typeof VENDOR_COMMISSION.TIERS)[keyof typeof VENDOR_COMMISSION.TIERS];

// Commission Periods
export type VendorCommissionPeriod =
  (typeof VENDOR_COMMISSION.PERIODS)[keyof typeof VENDOR_COMMISSION.PERIODS];

// Utility Functions
export function vendorCommissionGetTypeLabel(type: VendorCommissionType): string {
  const labels: Record<VendorCommissionType, string> = {
    [VENDOR_COMMISSION.TYPES.PERCENTAGE]: 'Percentage',
    [VENDOR_COMMISSION.TYPES.FIXED]: 'Fixed',
    [VENDOR_COMMISSION.TYPES.HYBRID]: 'Hybrid',
    [VENDOR_COMMISSION.TYPES.TIERED]: 'Tiered',
  };
  return labels[type] || 'Unknown';
}

export function vendorCommissionGetCategoryLabel(category: VendorCommissionCategory): string {
  const labels: Record<VendorCommissionCategory, string> = {
    [VENDOR_COMMISSION.CATEGORIES.STANDARD]: 'Standard',
    [VENDOR_COMMISSION.CATEGORIES.PROMOTIONAL]: 'Promotional',
    [VENDOR_COMMISSION.CATEGORIES.SEASONAL]: 'Seasonal',
    [VENDOR_COMMISSION.CATEGORIES.SPECIAL]: 'Special',
  };
  return labels[category] || 'Unknown';
}

export function vendorCommissionGetStatusLabel(status: VendorCommissionStatus): string {
  const labels: Record<VendorCommissionStatus, string> = {
    [VENDOR_COMMISSION.STATUS.ACTIVE]: 'Active',
    [VENDOR_COMMISSION.STATUS.INACTIVE]: 'Inactive',
    [VENDOR_COMMISSION.STATUS.EXPIRED]: 'Expired',
    [VENDOR_COMMISSION.STATUS.PENDING]: 'Pending',
  };
  return labels[status] || 'Unknown';
}

export function vendorCommissionGetColor(type: VendorCommissionType): VendorCommissionColor {
  const colors: Record<VendorCommissionType, VendorCommissionColor> = {
    [VENDOR_COMMISSION.TYPES.PERCENTAGE]: VENDOR_COMMISSION.COLORS.PERCENTAGE,
    [VENDOR_COMMISSION.TYPES.FIXED]: VENDOR_COMMISSION.COLORS.FIXED,
    [VENDOR_COMMISSION.TYPES.HYBRID]: VENDOR_COMMISSION.COLORS.HYBRID,
    [VENDOR_COMMISSION.TYPES.TIERED]: VENDOR_COMMISSION.COLORS.TIERED,
  };
  return colors[type] || '#gray-400';
}

export function vendorCommissionGetRateForAmount(amount: number): number {
  const tiers = VENDOR_COMMISSION.TIERS;

  if (amount <= tiers.BASIC.max) return tiers.BASIC.rate;
  if (amount <= tiers.SILVER.max) return tiers.SILVER.rate;
  if (amount <= tiers.GOLD.max) return tiers.GOLD.rate;
  if (amount <= tiers.PLATINUM.max) return tiers.PLATINUM.rate;
  return tiers.DIAMOND.rate;
}

export function vendorCommissionCalculate(amount: number, rate: number): number {
  return (amount * rate) / 100;
}

export function vendorCommissionIsActive(status: VendorCommissionStatus): boolean {
  return status === VENDOR_COMMISSION.STATUS.ACTIVE;
}

export function vendorCommissionGetPeriodLabel(period: VendorCommissionPeriod): string {
  const labels: Record<VendorCommissionPeriod, string> = {
    [VENDOR_COMMISSION.PERIODS.DAILY]: 'Daily',
    [VENDOR_COMMISSION.PERIODS.WEEKLY]: 'Weekly',
    [VENDOR_COMMISSION.PERIODS.MONTHLY]: 'Monthly',
    [VENDOR_COMMISSION.PERIODS.QUARTERLY]: 'Quarterly',
    [VENDOR_COMMISSION.PERIODS.YEARLY]: 'Yearly',
  };
  return labels[period] || 'Unknown';
}
