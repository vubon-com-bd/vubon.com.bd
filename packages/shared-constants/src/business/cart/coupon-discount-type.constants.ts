export const COUPON_DISCOUNT_TYPE = {
  CART_PERCENTAGE: 'cart_percentage',
  CART_FIXED: 'cart_fixed',
  PRODUCT_PERCENTAGE: 'product_percentage',
  PRODUCT_FIXED: 'product_fixed',
  CATEGORY_PERCENTAGE: 'category_percentage',
  CATEGORY_FIXED: 'category_fixed',
  SHIPPING_FREE: 'shipping_free',
  SHIPPING_PERCENTAGE: 'shipping_percentage',
} as const;

export const COUPON_APPLIES_TO = {
  ALL: 'all',
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  BRANDS: 'brands',
  COLLECTIONS: 'collections',
  CUSTOMERS: 'customers',
} as const;

export type CouponDiscountTypeType =
  (typeof COUPON_DISCOUNT_TYPE)[keyof typeof COUPON_DISCOUNT_TYPE];
export type CouponAppliesToType = (typeof COUPON_APPLIES_TO)[keyof typeof COUPON_APPLIES_TO];
