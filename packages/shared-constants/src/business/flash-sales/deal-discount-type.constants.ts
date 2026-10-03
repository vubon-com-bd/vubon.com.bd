export const DEAL_DISCOUNT_TYPE = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
  BUY_ONE_GET_ONE: 'buy_one_get_one',
  BUY_X_GET_Y: 'buy_x_get_y',
  BUNDLE_PRICE: 'bundle_price',
  TIERED: 'tiered',
  FREE_SHIPPING: 'free_shipping',
  CASHBACK: 'cashback',
} as const;

export type DealDiscountTypeType = (typeof DEAL_DISCOUNT_TYPE)[keyof typeof DEAL_DISCOUNT_TYPE];
