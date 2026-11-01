export const COUPON_TYPE = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
  FREE_SHIPPING: 'free_shipping',
  BUY_X_GET_Y: 'buy_x_get_y',
  BUNDLE: 'bundle',
  FIRST_ORDER: 'first_order',
  LOYALTY: 'loyalty',
} as const;

export type CouponTypeType = (typeof COUPON_TYPE)[keyof typeof COUPON_TYPE];
