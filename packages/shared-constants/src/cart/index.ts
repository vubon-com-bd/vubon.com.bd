/**
 * কার্ট কনস্ট্যান্ট এবং টাইপ রফতানি
 */

// কার্ট বেসিক কনফিগারেশন
export {
  CART_STATUS,
  CART_EXPIRY_DAYS,
  MAX_CART_ITEMS,
  MIN_CART_AMOUNT,
  MAX_CART_AMOUNT,
  CART_LOCK_TIMEOUT,
  DEFAULT_CURRENCY,
  ALLOWED_CURRENCIES,
} from './cart.constants';

export type { CartStatus, CartAllowedCurrency } from './cart.constants';

// কার্ট স্ট্যাটাস
export {
  CART_STATUS_LIST,
  CART_STATUS_TRANSITIONS,
  CART_STATUS_COLORS,
  CART_STATUS_LABELS,
  ACTIVE_CART_STATUSES,
  TERMINAL_CART_STATUSES,
} from './cart-status.constants';

export type { CartStatusList } from './cart-status.constants';

// কার্ট আইটেম
export {
  MIN_QUANTITY,
  MAX_QUANTITY,
  DEFAULT_QUANTITY,
  QUANTITY_STEP,
  MAX_ITEM_WEIGHT,
  MAX_ITEM_DIMENSIONS,
  ITEM_STATUS,
  ITEM_TYPE,
} from './cart-item.constants';

export type { MaxItemDimensions, ItemStatus, ItemType } from './cart-item.constants';

// কুপন
export {
  COUPON_CODE_LENGTH,
  COUPON_CODE_PREFIX,
  MAX_COUPONS_PER_CART,
  COUPON_EXPIRY_DAYS,
  MIN_ORDER_AMOUNT,
  MAX_DISCOUNT_AMOUNT,
  COUPON_STATUS,
  COUPON_APPLICATION_LIMIT,
} from './coupon.constants';

export type { CouponCodeLength, CouponStatus } from './coupon.constants';

// কুপন টাইপ
export {
  COUPON_TYPE,
  COUPON_TYPE_LABELS,
  COUPON_SCOPE,
  COUPON_APPLICABLE_TO,
  COUPON_GENERATION_TYPE,
} from './coupon-type.constants';

export type {
  CouponType,
  CouponScope,
  CouponApplicableTo,
  CouponGenerationType,
} from './coupon-type.constants';

// ডিসকাউন্ট টাইপ
export {
  DISCOUNT_TYPE,
  DISCOUNT_TYPE_LABELS,
  DISCOUNT_TYPE_FORMATS,
  PERCENTAGE_RANGE,
  MAX_PERCENTAGE_DISCOUNT,
  BOGO_MIN_QUANTITY,
} from './coupon-discount-type.constants';

export type { DiscountType, PercentageRange } from './coupon-discount-type.constants';

// কুপন রেস্ট্রিকশন
export {
  RESTRICTION_TYPE,
  USER_RESTRICTION_TYPE,
  PRODUCT_RESTRICTION_TYPE,
  DAY_RESTRICTION,
  TIME_RESTRICTION,
} from './coupon-restriction.constants';

export type {
  RestrictionType,
  UserRestrictionType,
  ProductRestrictionType,
  DayRestriction,
  TimeRestriction,
} from './coupon-restriction.constants';

// প্রমোশন
export {
  PROMOTION_TYPE,
  PROMOTION_PRIORITY,
  PROMOTION_STATUS,
  BUNDLE_DISCOUNT_TYPE,
  LOYALTY_POINTS_MULTIPLIER,
  MIN_POINTS_TO_REDEEM,
} from './cart-promotion.constants';

export type {
  PromotionType,
  PromotionPriority,
  PromotionStatus,
  BundleDiscountType,
  LoyaltyPointsMultiplier,
} from './cart-promotion.constants';

// পরিত্যক্ত কার্ট
export {
  ABANDONED_AFTER_HOURS,
  RECOVERY_EMAIL_DELAY,
  MAX_RECOVERY_ATTEMPTS,
  RECOVERY_SUCCESS_RATE,
  ABANDONED_CART_STATUS,
  RECOVERY_EMAIL_TEMPLATES,
  CLEANUP_AFTER_DAYS,
} from './abandoned-cart.constants';

export type {
  AbandonedCartStatus,
  RecoveryEmailTemplate,
  RecoveryEmailDelay,
} from './abandoned-cart.constants';

// কার্ট সেটিংস
export {
  DEFAULT_SETTINGS,
  SHIPPING_SETTINGS,
  TAX_SETTINGS,
  PAYMENT_SETTINGS,
  NOTIFICATION_SETTINGS,
  SECURITY_SETTINGS,
  CHECKOUT_SETTINGS,
} from './cart-settings.constants';

export type {
  DefaultSettings,
  ShippingSettings,
  TaxSettings,
  PaymentSettings,
  NotificationSettings,
  SecuritySettings,
  CheckoutSettings,
} from './cart-settings.constants';

// শিপিং
export {
  SHIPPING_METHODS,
  SHIPPING_STATUS,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST_BY_WEIGHT,
  SHIPPING_COST_BY_DISTANCE,
  MAX_WEIGHT_PER_PACKAGE,
  SHIPPING_ZONES,
  ESTIMATED_DELIVERY_DAYS,
} from './shipping.constants';

export type {
  ShippingMethod,
  ShippingStatus,
  ShippingCostByWeight,
  ShippingCostByDistance,
  ShippingZone,
  EstimatedDeliveryDays,
} from './shipping.constants';

// ট্যাক্স
export {
  TAX_TYPES,
  DEFAULT_TAX_RATE,
  TAX_CATEGORIES,
  VAT_EXEMPT_PRODUCTS,
  TAX_CALCULATION_METHOD,
  TAX_ROUNDING,
  TAX_BY_REGION,
} from './tax.constants';

export type {
  TaxType,
  TaxCategory,
  VatExemptProduct,
  TaxCalculationMethod,
  TaxRounding,
  TaxByRegion,
  TaxRegion,
} from './tax.constants';

// এরর
export {
  ERROR_CODES,
  ERROR_MESSAGES,
  VALIDATION_ERRORS,
  BUSINESS_ERRORS,
  SYSTEM_ERRORS,
  HTTP_ERROR_MAPPING,
} from './cart-error.constants';

export type { ErrorCode } from './cart-error.constants';
