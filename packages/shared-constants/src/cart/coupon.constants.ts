/**
 * Coupon Constants
 * Core coupon configuration and settings
 */

export const COUPON = {
  // Coupon Types
  TYPES: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    FREE_SHIPPING: 'free_shipping',
    BUY_X_GET_Y: 'buy_x_get_y',
    TIERED: 'tiered',
    VOLUME: 'volume',
    BUNDLE: 'bundle',
    GIFT: 'gift',
    CUSTOM: 'custom',
  } as const,

  // Coupon Categories
  CATEGORIES: {
    PROMOTIONAL: 'promotional',
    SEASONAL: 'seasonal',
    HOLIDAY: 'holiday',
    FLASH_SALE: 'flash_sale',
    WELCOME: 'welcome',
    LOYALTY: 'loyalty',
    REFERRAL: 'referral',
    BIRTHDAY: 'birthday',
    ANNIVERSARY: 'anniversary',
    CUSTOM: 'custom',
  } as const,

  // Coupon Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    EXPIRED: 'expired',
    USED: 'used',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    DRAFT: 'draft',
  } as const,

  // Coupon Applicability
  APPLICABILITY: {
    ALL_PRODUCTS: 'all_products',
    SELECTED_CATEGORIES: 'selected_categories',
    SELECTED_PRODUCTS: 'selected_products',
    SELECTED_BRANDS: 'selected_brands',
    SELECTED_VENDORS: 'selected_vendors',
    MINIMUM_ORDER: 'minimum_order',
    FIRST_ORDER: 'first_order',
    NEW_CUSTOMERS: 'new_customers',
    EXISTING_CUSTOMERS: 'existing_customers',
    ALL_CUSTOMERS: 'all_customers',
  } as const,

  // Coupon Restrictions
  RESTRICTIONS: {
    MINIMUM_AMOUNT: 'minimum_amount',
    MAXIMUM_AMOUNT: 'maximum_amount',
    MINIMUM_QUANTITY: 'minimum_quantity',
    MAXIMUM_QUANTITY: 'maximum_quantity',
    MAXIMUM_USES: 'maximum_uses',
    MAXIMUM_USES_PER_USER: 'maximum_uses_per_user',
    EXCLUDED_CATEGORIES: 'excluded_categories',
    EXCLUDED_PRODUCTS: 'excluded_products',
    EXCLUDED_BRANDS: 'excluded_brands',
    EXCLUDED_VENDORS: 'excluded_vendors',
    CUSTOMER_SEGMENTS: 'customer_segments',
    GEOGRAPHIC: 'geographic',
    DEVICE: 'device',
  } as const,

  // Coupon Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'percentage',
    DEFAULT_CATEGORY: 'promotional',
    DEFAULT_STATUS: 'active',
    DEFAULT_APPLICABILITY: 'all_products',
    DEFAULT_DISCOUNT: 10,
    DEFAULT_MAX_USES: 100,
    DEFAULT_MAX_USES_PER_USER: 1,
    DEFAULT_MIN_ORDER: 0,
    DEFAULT_MAX_ORDER: 0,
    DEFAULT_VALIDITY_DAYS: 30,
    DEFAULT_CODE_LENGTH: 8,
    DEFAULT_CASE_SENSITIVE: true,
    DEFAULT_STACKABLE: false,
    DEFAULT_COMBINABLE: false,
    MAX_DISCOUNT: 100,
    MAX_USES: 10000,
    MAX_USES_PER_USER: 100,
  } as const,

  // Coupon Limits
  LIMITS: {
    MIN_CODE_LENGTH: 4,
    MAX_CODE_LENGTH: 20,
    MIN_DISCOUNT: 1,
    MAX_DISCOUNT: 100,
    MIN_USES: 1,
    MAX_USES: 10000,
    MIN_USES_PER_USER: 1,
    MAX_USES_PER_USER: 100,
    MAX_COUPONS_PER_USER: 10,
    MAX_ACTIVE_COUPONS: 100,
  } as const,

  // Coupon Errors
  ERRORS: {
    COUPON_NOT_FOUND: 'coupon_not_found',
    COUPON_EXPIRED: 'coupon_expired',
    COUPON_USED: 'coupon_used',
    COUPON_INACTIVE: 'coupon_inactive',
    COUPON_LIMIT_EXCEEDED: 'coupon_limit_exceeded',
    COUPON_USER_LIMIT_EXCEEDED: 'coupon_user_limit_exceeded',
    INVALID_CODE: 'invalid_code',
    INVALID_TYPE: 'invalid_type',
    INVALID_DISCOUNT: 'invalid_discount',
    MIN_ORDER_NOT_MET: 'min_order_not_met',
    MAX_ORDER_EXCEEDED: 'max_order_exceeded',
    APPLICABILITY_FAILED: 'applicability_failed',
    PERMISSION_DENIED: 'permission_denied',
    DUPLICATE_CODE: 'duplicate_code',
    NOT_STACKABLE: 'not_stackable',
    NOT_COMBINABLE: 'not_combinable',
  } as const,
} as const;

// Coupon Types
export type CouponType = (typeof COUPON.TYPES)[keyof typeof COUPON.TYPES];

// Coupon Categories
export type CouponCategory = (typeof COUPON.CATEGORIES)[keyof typeof COUPON.CATEGORIES];

// Coupon Statuses
export type CouponStatus = (typeof COUPON.STATUSES)[keyof typeof COUPON.STATUSES];

// Coupon Applicability
export type CouponApplicability = (typeof COUPON.APPLICABILITY)[keyof typeof COUPON.APPLICABILITY];

// Coupon Restrictions
export type CouponRestriction = (typeof COUPON.RESTRICTIONS)[keyof typeof COUPON.RESTRICTIONS];

// Coupon Defaults
export type CouponDefault = (typeof COUPON.DEFAULTS)[keyof typeof COUPON.DEFAULTS];

// Coupon Limits
export type CouponLimit = (typeof COUPON.LIMITS)[keyof typeof COUPON.LIMITS];

// Coupon Errors
export type CouponError = (typeof COUPON.ERRORS)[keyof typeof COUPON.ERRORS];

// Utility Functions
export function couponGetTypeLabel(type: CouponType): string {
  const labels: Record<CouponType, string> = {
    [COUPON.TYPES.PERCENTAGE]: 'Percentage',
    [COUPON.TYPES.FIXED]: 'Fixed Amount',
    [COUPON.TYPES.FREE_SHIPPING]: 'Free Shipping',
    [COUPON.TYPES.BUY_X_GET_Y]: 'Buy X Get Y',
    [COUPON.TYPES.TIERED]: 'Tiered',
    [COUPON.TYPES.VOLUME]: 'Volume',
    [COUPON.TYPES.BUNDLE]: 'Bundle',
    [COUPON.TYPES.GIFT]: 'Gift',
    [COUPON.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Coupon Type';
}

export function couponGetCategoryLabel(category: CouponCategory): string {
  const labels: Record<CouponCategory, string> = {
    [COUPON.CATEGORIES.PROMOTIONAL]: 'Promotional',
    [COUPON.CATEGORIES.SEASONAL]: 'Seasonal',
    [COUPON.CATEGORIES.HOLIDAY]: 'Holiday',
    [COUPON.CATEGORIES.FLASH_SALE]: 'Flash Sale',
    [COUPON.CATEGORIES.WELCOME]: 'Welcome',
    [COUPON.CATEGORIES.LOYALTY]: 'Loyalty',
    [COUPON.CATEGORIES.REFERRAL]: 'Referral',
    [COUPON.CATEGORIES.BIRTHDAY]: 'Birthday',
    [COUPON.CATEGORIES.ANNIVERSARY]: 'Anniversary',
    [COUPON.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function couponGetStatusLabel(status: CouponStatus): string {
  const labels: Record<CouponStatus, string> = {
    [COUPON.STATUSES.ACTIVE]: 'Active',
    [COUPON.STATUSES.INACTIVE]: 'Inactive',
    [COUPON.STATUSES.EXPIRED]: 'Expired',
    [COUPON.STATUSES.USED]: 'Used',
    [COUPON.STATUSES.CANCELLED]: 'Cancelled',
    [COUPON.STATUSES.ARCHIVED]: 'Archived',
    [COUPON.STATUSES.PENDING]: 'Pending',
    [COUPON.STATUSES.APPROVED]: 'Approved',
    [COUPON.STATUSES.REJECTED]: 'Rejected',
    [COUPON.STATUSES.DRAFT]: 'Draft',
  };
  return labels[status] || 'Unknown Status';
}

export function couponGetApplicabilityLabel(applicability: CouponApplicability): string {
  const labels: Record<CouponApplicability, string> = {
    [COUPON.APPLICABILITY.ALL_PRODUCTS]: 'All Products',
    [COUPON.APPLICABILITY.SELECTED_CATEGORIES]: 'Selected Categories',
    [COUPON.APPLICABILITY.SELECTED_PRODUCTS]: 'Selected Products',
    [COUPON.APPLICABILITY.SELECTED_BRANDS]: 'Selected Brands',
    [COUPON.APPLICABILITY.SELECTED_VENDORS]: 'Selected Vendors',
    [COUPON.APPLICABILITY.MINIMUM_ORDER]: 'Minimum Order',
    [COUPON.APPLICABILITY.FIRST_ORDER]: 'First Order',
    [COUPON.APPLICABILITY.NEW_CUSTOMERS]: 'New Customers',
    [COUPON.APPLICABILITY.EXISTING_CUSTOMERS]: 'Existing Customers',
    [COUPON.APPLICABILITY.ALL_CUSTOMERS]: 'All Customers',
  };
  return labels[applicability] || 'Unknown Applicability';
}

export function couponGetRestrictionLabel(restriction: CouponRestriction): string {
  const labels: Record<CouponRestriction, string> = {
    [COUPON.RESTRICTIONS.MINIMUM_AMOUNT]: 'Minimum Amount',
    [COUPON.RESTRICTIONS.MAXIMUM_AMOUNT]: 'Maximum Amount',
    [COUPON.RESTRICTIONS.MINIMUM_QUANTITY]: 'Minimum Quantity',
    [COUPON.RESTRICTIONS.MAXIMUM_QUANTITY]: 'Maximum Quantity',
    [COUPON.RESTRICTIONS.MAXIMUM_USES]: 'Maximum Uses',
    [COUPON.RESTRICTIONS.MAXIMUM_USES_PER_USER]: 'Maximum Uses Per User',
    [COUPON.RESTRICTIONS.EXCLUDED_CATEGORIES]: 'Excluded Categories',
    [COUPON.RESTRICTIONS.EXCLUDED_PRODUCTS]: 'Excluded Products',
    [COUPON.RESTRICTIONS.EXCLUDED_BRANDS]: 'Excluded Brands',
    [COUPON.RESTRICTIONS.EXCLUDED_VENDORS]: 'Excluded Vendors',
    [COUPON.RESTRICTIONS.CUSTOMER_SEGMENTS]: 'Customer Segments',
    [COUPON.RESTRICTIONS.GEOGRAPHIC]: 'Geographic',
    [COUPON.RESTRICTIONS.DEVICE]: 'Device',
  };
  return labels[restriction] || 'Unknown Restriction';
}

export function couponGetErrorLabel(error: CouponError): string {
  const labels: Record<CouponError, string> = {
    [COUPON.ERRORS.COUPON_NOT_FOUND]: 'Coupon Not Found',
    [COUPON.ERRORS.COUPON_EXPIRED]: 'Coupon Expired',
    [COUPON.ERRORS.COUPON_USED]: 'Coupon Already Used',
    [COUPON.ERRORS.COUPON_INACTIVE]: 'Coupon Inactive',
    [COUPON.ERRORS.COUPON_LIMIT_EXCEEDED]: 'Coupon Limit Exceeded',
    [COUPON.ERRORS.COUPON_USER_LIMIT_EXCEEDED]: 'Coupon User Limit Exceeded',
    [COUPON.ERRORS.INVALID_CODE]: 'Invalid Code',
    [COUPON.ERRORS.INVALID_TYPE]: 'Invalid Type',
    [COUPON.ERRORS.INVALID_DISCOUNT]: 'Invalid Discount',
    [COUPON.ERRORS.MIN_ORDER_NOT_MET]: 'Minimum Order Not Met',
    [COUPON.ERRORS.MAX_ORDER_EXCEEDED]: 'Maximum Order Exceeded',
    [COUPON.ERRORS.APPLICABILITY_FAILED]: 'Applicability Failed',
    [COUPON.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
    [COUPON.ERRORS.DUPLICATE_CODE]: 'Duplicate Code',
    [COUPON.ERRORS.NOT_STACKABLE]: 'Not Stackable',
    [COUPON.ERRORS.NOT_COMBINABLE]: 'Not Combinable',
  };
  return labels[error] || 'Unknown Error';
}

export function couponIsActive(status: CouponStatus): boolean {
  const activeStatuses: CouponStatus[] = [COUPON.STATUSES.ACTIVE, COUPON.STATUSES.APPROVED];
  return activeStatuses.includes(status);
}

export function couponIsValid(status: CouponStatus): boolean {
  const validStatuses: CouponStatus[] = [
    COUPON.STATUSES.ACTIVE,
    COUPON.STATUSES.APPROVED,
    COUPON.STATUSES.PENDING,
  ];
  return validStatuses.includes(status);
}

export function couponGetDefaultDiscount(): number {
  return COUPON.DEFAULTS.DEFAULT_DISCOUNT;
}

export function couponGetDefaultValidityDays(): number {
  return COUPON.DEFAULTS.DEFAULT_VALIDITY_DAYS;
}

export function couponGetMaxDiscount(): number {
  return COUPON.DEFAULTS.MAX_DISCOUNT;
}

export function couponIsPercentageType(type: CouponType): boolean {
  return type === COUPON.TYPES.PERCENTAGE;
}

export function couponIsFixedType(type: CouponType): boolean {
  return type === COUPON.TYPES.FIXED;
}

export function couponIsFreeShippingType(type: CouponType): boolean {
  return type === COUPON.TYPES.FREE_SHIPPING;
}
