export const CouponKeys = {
  byCart: (cartId: string): string => `cart:${cartId}:coupon`,
  validation: (code: string): string => `coupon:validate:${code}`,
};
