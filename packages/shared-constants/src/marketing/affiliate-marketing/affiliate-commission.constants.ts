/**
 * Affiliate Commission Constants
 * Commission configurations for affiliates
 */

export const MARKETINGAFFILIATE_COMMISSION = {
  // Commission Types
  TYPES: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    TIERED: 'tiered',
    DYNAMIC: 'dynamic',
    PERFORMANCE_BASED: 'performance_based',
    VOLUME_BASED: 'volume_based',
    RECURRING: 'recurring',
    ONE_TIME: 'one_time',
    HYBRID: 'hybrid',
    CUSTOM: 'custom',
  } as const,

  // Commission Structures
  STRUCTURES: {
    FLAT: 'flat',
    TIERED: 'tiered',
    GRADUATED: 'graduated',
    PERFORMANCE: 'performance',
    VOLUME: 'volume',
    CUSTOM: 'custom',
  } as const,

  // Commission Calculation Methods
  CALCULATIONS: {
    PERCENTAGE_OF_SALE: 'percentage_of_sale',
    PERCENTAGE_OF_PROFIT: 'percentage_of_profit',
    FIXED_PER_UNIT: 'fixed_per_unit',
    FIXED_PER_ORDER: 'fixed_per_order',
    TIERED_PERCENTAGE: 'tiered_percentage',
    TIERED_FIXED: 'tiered_fixed',
    PERFORMANCE_BASED: 'performance_based',
    VOLUME_BASED: 'volume_based',
    RECURRING_PERCENTAGE: 'recurring_percentage',
    RECURRING_FIXED: 'recurring_fixed',
    HYBRID: 'hybrid',
    CUSTOM: 'custom',
  } as const,

  // Commission Rates
  RATES: {
    MIN: 1,
    MAX: 100,
    DEFAULT: 10,
    PREMIUM: 20,
    ENTERPRISE: 30,
    TIER_1: 5,
    TIER_2: 10,
    TIER_3: 15,
    TIER_4: 20,
    TIER_5: 25,
  } as const,

  // Commission Tiers
  TIERS: {
    LEVEL_1: { minRevenue: 0, rate: 5 },
    LEVEL_2: { minRevenue: 1000, rate: 10 },
    LEVEL_3: { minRevenue: 5000, rate: 15 },
    LEVEL_4: { minRevenue: 10000, rate: 20 },
    LEVEL_5: { minRevenue: 50000, rate: 25 },
  } as const,

  // Commission Tracking
  TRACKING: {
    COOKIE_BASED: 'cookie_based',
    LINK_BASED: 'link_based',
    CODE_BASED: 'code_based',
    EMAIL_BASED: 'email_based',
    PHONE_BASED: 'phone_based',
    IP_BASED: 'ip_based',
    DEVICE_BASED: 'device_based',
    MULTI_TOUCH: 'multi_touch',
    LAST_CLICK: 'last_click',
    FIRST_CLICK: 'first_click',
  } as const,

  // Commission Attribution Windows
  ATTRIBUTION_WINDOWS: {
    DAYS_1: 1,
    DAYS_7: 7,
    DAYS_14: 14,
    DAYS_30: 30,
    DAYS_45: 45,
    DAYS_60: 60,
    DAYS_90: 90,
    DAYS_180: 180,
    DAYS_365: 365,
    LIFETIME: -1,
  } as const,

  // Commission Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'percentage',
    DEFAULT_RATE: 10,
    DEFAULT_STRUCTURE: 'flat',
    DEFAULT_TRACKING: 'cookie_based',
    DEFAULT_ATTRIBUTION_DAYS: 30,
    DEFAULT_MINIMUM_EARNINGS: 50,
    DEFAULT_HOLD_DAYS: 30,
    DEFAULT_REVERSAL_DAYS: 30,
    DEFAULT_PAYMENT_TERMS: 'net_30',
  } as const,

  // Commission Limits
  LIMITS: {
    MIN_RATE: 1,
    MAX_RATE: 100,
    MIN_FIXED_AMOUNT: 1,
    MAX_FIXED_AMOUNT: 100000,
    MIN_TIER_REVENUE: 0,
    MAX_TIER_REVENUE: 1000000,
    MAX_NUMBER_OF_TIERS: 10,
    MIN_HOLD_DAYS: 1,
    MAX_HOLD_DAYS: 365,
  } as const,
} as const;

// Commission Types
export type MarketingAffiliateCommissionType =
  (typeof MARKETINGAFFILIATE_COMMISSION.TYPES)[keyof typeof MARKETINGAFFILIATE_COMMISSION.TYPES];

// Commission Structures
export type MarketingAffiliateCommissionStructure =
  (typeof MARKETINGAFFILIATE_COMMISSION.STRUCTURES)[keyof typeof MARKETINGAFFILIATE_COMMISSION.STRUCTURES];

// Commission Calculation Methods
export type MarketingAffiliateCommissionCalculation =
  (typeof MARKETINGAFFILIATE_COMMISSION.CALCULATIONS)[keyof typeof MARKETINGAFFILIATE_COMMISSION.CALCULATIONS];

// Commission Rates
export type MarketingAffiliateCommissionRate =
  (typeof MARKETINGAFFILIATE_COMMISSION.RATES)[keyof typeof MARKETINGAFFILIATE_COMMISSION.RATES];

// Commission Tracking
export type MarketingAffiliateCommissionTracking =
  (typeof MARKETINGAFFILIATE_COMMISSION.TRACKING)[keyof typeof MARKETINGAFFILIATE_COMMISSION.TRACKING];

// Commission Attribution Windows
export type MarketingAffiliateAttributionWindow =
  (typeof MARKETINGAFFILIATE_COMMISSION.ATTRIBUTION_WINDOWS)[keyof typeof MARKETINGAFFILIATE_COMMISSION.ATTRIBUTION_WINDOWS];

// Commission Defaults
export type MarketingAffiliateCommissionDefault =
  (typeof MARKETINGAFFILIATE_COMMISSION.DEFAULTS)[keyof typeof MARKETINGAFFILIATE_COMMISSION.DEFAULTS];

// Commission Limits
export type MarketingAffiliateCommissionLimit =
  (typeof MARKETINGAFFILIATE_COMMISSION.LIMITS)[keyof typeof MARKETINGAFFILIATE_COMMISSION.LIMITS];

// Utility Functions
export function marketingaffiliateGetCommissionTypeLabel(
  commissionType: MarketingAffiliateCommissionType
): string {
  const labels: Record<MarketingAffiliateCommissionType, string> = {
    [MARKETINGAFFILIATE_COMMISSION.TYPES.PERCENTAGE]: 'Percentage',
    [MARKETINGAFFILIATE_COMMISSION.TYPES.FIXED]: 'Fixed',
    [MARKETINGAFFILIATE_COMMISSION.TYPES.TIERED]: 'Tiered',
    [MARKETINGAFFILIATE_COMMISSION.TYPES.DYNAMIC]: 'Dynamic',
    [MARKETINGAFFILIATE_COMMISSION.TYPES.PERFORMANCE_BASED]: 'Performance Based',
    [MARKETINGAFFILIATE_COMMISSION.TYPES.VOLUME_BASED]: 'Volume Based',
    [MARKETINGAFFILIATE_COMMISSION.TYPES.RECURRING]: 'Recurring',
    [MARKETINGAFFILIATE_COMMISSION.TYPES.ONE_TIME]: 'One Time',
    [MARKETINGAFFILIATE_COMMISSION.TYPES.HYBRID]: 'Hybrid',
    [MARKETINGAFFILIATE_COMMISSION.TYPES.CUSTOM]: 'Custom',
  };
  return labels[commissionType] || 'Unknown Commission Type';
}

export function marketingaffiliateGetCommissionStructureLabel(
  structure: MarketingAffiliateCommissionStructure
): string {
  const labels: Record<MarketingAffiliateCommissionStructure, string> = {
    [MARKETINGAFFILIATE_COMMISSION.STRUCTURES.FLAT]: 'Flat',
    [MARKETINGAFFILIATE_COMMISSION.STRUCTURES.TIERED]: 'Tiered',
    [MARKETINGAFFILIATE_COMMISSION.STRUCTURES.GRADUATED]: 'Graduated',
    [MARKETINGAFFILIATE_COMMISSION.STRUCTURES.PERFORMANCE]: 'Performance',
    [MARKETINGAFFILIATE_COMMISSION.STRUCTURES.VOLUME]: 'Volume',
    [MARKETINGAFFILIATE_COMMISSION.STRUCTURES.CUSTOM]: 'Custom',
  };
  return labels[structure] || 'Unknown Structure';
}

export function marketingaffiliateGetCommissionCalculationLabel(
  calculation: MarketingAffiliateCommissionCalculation
): string {
  const labels: Record<MarketingAffiliateCommissionCalculation, string> = {
    [MARKETINGAFFILIATE_COMMISSION.CALCULATIONS.PERCENTAGE_OF_SALE]: 'Percentage of Sale',
    [MARKETINGAFFILIATE_COMMISSION.CALCULATIONS.PERCENTAGE_OF_PROFIT]: 'Percentage of Profit',
    [MARKETINGAFFILIATE_COMMISSION.CALCULATIONS.FIXED_PER_UNIT]: 'Fixed Per Unit',
    [MARKETINGAFFILIATE_COMMISSION.CALCULATIONS.FIXED_PER_ORDER]: 'Fixed Per Order',
    [MARKETINGAFFILIATE_COMMISSION.CALCULATIONS.TIERED_PERCENTAGE]: 'Tiered Percentage',
    [MARKETINGAFFILIATE_COMMISSION.CALCULATIONS.TIERED_FIXED]: 'Tiered Fixed',
    [MARKETINGAFFILIATE_COMMISSION.CALCULATIONS.PERFORMANCE_BASED]: 'Performance Based',
    [MARKETINGAFFILIATE_COMMISSION.CALCULATIONS.VOLUME_BASED]: 'Volume Based',
    [MARKETINGAFFILIATE_COMMISSION.CALCULATIONS.RECURRING_PERCENTAGE]: 'Recurring Percentage',
    [MARKETINGAFFILIATE_COMMISSION.CALCULATIONS.RECURRING_FIXED]: 'Recurring Fixed',
    [MARKETINGAFFILIATE_COMMISSION.CALCULATIONS.HYBRID]: 'Hybrid',
    [MARKETINGAFFILIATE_COMMISSION.CALCULATIONS.CUSTOM]: 'Custom',
  };
  return labels[calculation] || 'Unknown Calculation';
}

export function marketingaffiliateGetCommissionTrackingLabel(
  tracking: MarketingAffiliateCommissionTracking
): string {
  const labels: Record<MarketingAffiliateCommissionTracking, string> = {
    [MARKETINGAFFILIATE_COMMISSION.TRACKING.COOKIE_BASED]: 'Cookie Based',
    [MARKETINGAFFILIATE_COMMISSION.TRACKING.LINK_BASED]: 'Link Based',
    [MARKETINGAFFILIATE_COMMISSION.TRACKING.CODE_BASED]: 'Code Based',
    [MARKETINGAFFILIATE_COMMISSION.TRACKING.EMAIL_BASED]: 'Email Based',
    [MARKETINGAFFILIATE_COMMISSION.TRACKING.PHONE_BASED]: 'Phone Based',
    [MARKETINGAFFILIATE_COMMISSION.TRACKING.IP_BASED]: 'IP Based',
    [MARKETINGAFFILIATE_COMMISSION.TRACKING.DEVICE_BASED]: 'Device Based',
    [MARKETINGAFFILIATE_COMMISSION.TRACKING.MULTI_TOUCH]: 'Multi-Touch',
    [MARKETINGAFFILIATE_COMMISSION.TRACKING.LAST_CLICK]: 'Last Click',
    [MARKETINGAFFILIATE_COMMISSION.TRACKING.FIRST_CLICK]: 'First Click',
  };
  return labels[tracking] || 'Unknown Tracking Method';
}

export function marketingaffiliateGetAttributionWindowLabel(
  window: MarketingAffiliateAttributionWindow
): string {
  const labels: Record<MarketingAffiliateAttributionWindow, string> = {
    [MARKETINGAFFILIATE_COMMISSION.ATTRIBUTION_WINDOWS.DAYS_1]: '1 Day',
    [MARKETINGAFFILIATE_COMMISSION.ATTRIBUTION_WINDOWS.DAYS_7]: '7 Days',
    [MARKETINGAFFILIATE_COMMISSION.ATTRIBUTION_WINDOWS.DAYS_14]: '14 Days',
    [MARKETINGAFFILIATE_COMMISSION.ATTRIBUTION_WINDOWS.DAYS_30]: '30 Days',
    [MARKETINGAFFILIATE_COMMISSION.ATTRIBUTION_WINDOWS.DAYS_45]: '45 Days',
    [MARKETINGAFFILIATE_COMMISSION.ATTRIBUTION_WINDOWS.DAYS_60]: '60 Days',
    [MARKETINGAFFILIATE_COMMISSION.ATTRIBUTION_WINDOWS.DAYS_90]: '90 Days',
    [MARKETINGAFFILIATE_COMMISSION.ATTRIBUTION_WINDOWS.DAYS_180]: '180 Days',
    [MARKETINGAFFILIATE_COMMISSION.ATTRIBUTION_WINDOWS.DAYS_365]: '365 Days',
    [MARKETINGAFFILIATE_COMMISSION.ATTRIBUTION_WINDOWS.LIFETIME]: 'Lifetime',
  };
  return labels[window] || 'Unknown Attribution Window';
}

export function marketingaffiliateIsPercentageCommission(
  commissionType: MarketingAffiliateCommissionType
): boolean {
  return commissionType === MARKETINGAFFILIATE_COMMISSION.TYPES.PERCENTAGE;
}

export function marketingaffiliateIsFixedCommission(
  commissionType: MarketingAffiliateCommissionType
): boolean {
  return commissionType === MARKETINGAFFILIATE_COMMISSION.TYPES.FIXED;
}

export function marketingaffiliateIsTieredCommission(
  commissionType: MarketingAffiliateCommissionType
): boolean {
  return commissionType === MARKETINGAFFILIATE_COMMISSION.TYPES.TIERED;
}

export function marketingaffiliateIsRecurringCommission(
  commissionType: MarketingAffiliateCommissionType
): boolean {
  return commissionType === MARKETINGAFFILIATE_COMMISSION.TYPES.RECURRING;
}

export function marketingaffiliateGetDefaultCommissionRate(): number {
  return MARKETINGAFFILIATE_COMMISSION.DEFAULTS.DEFAULT_RATE;
}

export function marketingaffiliateGetDefaultAttributionDays(): number {
  return MARKETINGAFFILIATE_COMMISSION.DEFAULTS.DEFAULT_ATTRIBUTION_DAYS;
}

export function marketingaffiliateGetDefaultMinimumEarnings(): number {
  return MARKETINGAFFILIATE_COMMISSION.DEFAULTS.DEFAULT_MINIMUM_EARNINGS;
}

export function marketingaffiliateCalculateCommission(
  saleAmount: number,
  rate: number,
  commissionType: MarketingAffiliateCommissionType
): number {
  if (commissionType === MARKETINGAFFILIATE_COMMISSION.TYPES.PERCENTAGE) {
    return (saleAmount * rate) / 100;
  }
  if (commissionType === MARKETINGAFFILIATE_COMMISSION.TYPES.FIXED) {
    return rate;
  }
  return 0;
}
