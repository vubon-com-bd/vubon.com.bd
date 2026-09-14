export const VENDOR_COMMISSION_TYPE = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
  TIERED: 'tiered',
  HYBRID: 'hybrid',
  CATEGORY_BASED: 'category_based',
} as const;

export const VENDOR_COMMISSION = {
  MIN_PERCENT: 1,
  MAX_PERCENT: 50,
  DEFAULT_PERCENT: 15,
  MIN_FIXED: 0,
  MAX_FIXED: 100000,
  DECIMAL_PLACES: 2,
  APPLY_ON_SHIPPING: false,
  APPLY_ON_TAX: false,
  DEDUCT_ON_PAYOUT: true,
} as const;

export type VendorCommissionTypeType =
  (typeof VENDOR_COMMISSION_TYPE)[keyof typeof VENDOR_COMMISSION_TYPE];
