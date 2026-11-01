export const PRODUCT_DEAL_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SCHEDULED: 'scheduled',
  SOLD_OUT: 'sold_out',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
} as const;

export const PRODUCT_DEAL = {
  MAX_PRODUCTS: 1000,
  MIN_DISCOUNT_PERCENT: 1,
  MAX_DISCOUNT_PERCENT: 90,
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 100,
  PER_USER_LIMIT: 10,
  ALLOW_COMBO: true,
} as const;

export type ProductDealStatusType = (typeof PRODUCT_DEAL_STATUS)[keyof typeof PRODUCT_DEAL_STATUS];
