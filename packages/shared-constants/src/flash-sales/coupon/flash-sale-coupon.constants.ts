/**
 * Flash Sale Coupon Constants
 * Configuration for flash sale coupons and discount codes
 */

export const FLASH_SALE_COUPON = {
  // Coupon Types
  TYPES: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    FREE_SHIPPING: 'free_shipping',
    BOGO: 'bogo',
    BUNDLE: 'bundle',
    TIERED: 'tiered',
    DYNAMIC: 'dynamic',
    CUSTOM: 'custom',
  },

  // Coupon Categories
  CATEGORIES: {
    PROMOTIONAL: 'promotional',
    SEASONAL: 'seasonal',
    HOLIDAY: 'holiday',
    CLEARANCE: 'clearance',
    WELCOME: 'welcome',
    LOYALTY: 'loyalty',
    REFERRAL: 'referral',
    BIRTHDAY: 'birthday',
    ANNIVERSARY: 'anniversary',
    FLASH: 'flash',
    LIMITED: 'limited',
  },

  // Coupon Generation
  GENERATION: {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    BULK: 'bulk',
    RANDOM: 'random',
    SEQUENTIAL: 'sequential',
    CUSTOM: 'custom',
  },

  // Coupon Format
  FORMAT: {
    ALPHANUMERIC: 'alphanumeric',
    NUMERIC: 'numeric',
    ALPHABETIC: 'alphabetic',
    CUSTOM: 'custom',
    UUID: 'uuid',
  },

  // Coupon Application
  APPLICATION: {
    ALL_PRODUCTS: 'all_products',
    SELECTED_PRODUCTS: 'selected_products',
    CATEGORY: 'category',
    BRAND: 'brand',
    COLLECTION: 'collection',
    MINIMUM_ORDER: 'minimum_order',
    FIRST_ORDER: 'first_order',
    CUSTOM: 'custom',
  },

  // Coupon Restrictions
  RESTRICTIONS: {
    MINIMUM_ORDER: 'minimum_order',
    MAXIMUM_ORDER: 'maximum_order',
    MINIMUM_QUANTITY: 'minimum_quantity',
    MAXIMUM_QUANTITY: 'maximum_quantity',
    PER_USER_LIMIT: 'per_user_limit',
    PER_ORDER_LIMIT: 'per_order_limit',
    FIRST_TIME_BUYER: 'first_time_buyer',
    VIP_ONLY: 'vip_only',
    MEMBERS_ONLY: 'members_only',
    SUBSCRIBERS_ONLY: 'subscribers_only',
    EXCLUDED_PRODUCTS: 'excluded_products',
    EXCLUDED_CATEGORIES: 'excluded_categories',
  },

  // Coupon Defaults
  DEFAULTS: {
    DISCOUNT_PERCENTAGE: 10,
    DISCOUNT_AMOUNT: 100,
    MAX_USES: 1000,
    MAX_USES_PER_USER: 1,
    MIN_ORDER_AMOUNT: 0,
    MAX_DISCOUNT_AMOUNT: 0,
    DURATION_DAYS: 30,
    CODE_LENGTH: 8,
    IS_ACTIVE: true,
    IS_STACKABLE: false,
    IS_EXCLUSIVE: false,
  },

  // Coupon Limits
  LIMITS: {
    MIN_DISCOUNT: 1,
    MAX_DISCOUNT_PERCENTAGE: 90,
    MAX_FIXED_AMOUNT: 100000,
    MAX_USES: 100000,
    MAX_USES_PER_USER: 10,
    MAX_CODE_LENGTH: 20,
    MIN_CODE_LENGTH: 4,
    MAX_BULK_GENERATION: 10000,
  },

  // Coupon Validation
  VALIDATION: {
    MIN_CODE_LENGTH: 4,
    MAX_CODE_LENGTH: 20,
    MIN_DISCOUNT: 1,
    MAX_DISCOUNT: 90,
    MIN_ORDER_AMOUNT: 0,
    MAX_ORDER_AMOUNT: 1000000,
    MIN_START_DATE: 'today',
    MAX_DURATION_DAYS: 365,
  },
} as const;

// Coupon Types
export type FlashSaleCouponType =
  (typeof FLASH_SALE_COUPON.TYPES)[keyof typeof FLASH_SALE_COUPON.TYPES];

// Coupon Categories
export type FlashSaleCouponCategory =
  (typeof FLASH_SALE_COUPON.CATEGORIES)[keyof typeof FLASH_SALE_COUPON.CATEGORIES];

// Coupon Generation
export type FlashSaleCouponGeneration =
  (typeof FLASH_SALE_COUPON.GENERATION)[keyof typeof FLASH_SALE_COUPON.GENERATION];

// Coupon Format
export type FlashSaleCouponFormat =
  (typeof FLASH_SALE_COUPON.FORMAT)[keyof typeof FLASH_SALE_COUPON.FORMAT];

// Coupon Application
export type FlashSaleCouponApplication =
  (typeof FLASH_SALE_COUPON.APPLICATION)[keyof typeof FLASH_SALE_COUPON.APPLICATION];

// Coupon Restrictions
export type FlashSaleCouponRestriction =
  (typeof FLASH_SALE_COUPON.RESTRICTIONS)[keyof typeof FLASH_SALE_COUPON.RESTRICTIONS];

// Utility Functions
export function flashsalesCouponGetTypeLabel(type: FlashSaleCouponType): string {
  const labels: Record<FlashSaleCouponType, string> = {
    [FLASH_SALE_COUPON.TYPES.PERCENTAGE]: 'Percentage Discount',
    [FLASH_SALE_COUPON.TYPES.FIXED]: 'Fixed Amount Discount',
    [FLASH_SALE_COUPON.TYPES.FREE_SHIPPING]: 'Free Shipping',
    [FLASH_SALE_COUPON.TYPES.BOGO]: 'Buy One Get One',
    [FLASH_SALE_COUPON.TYPES.BUNDLE]: 'Bundle Discount',
    [FLASH_SALE_COUPON.TYPES.TIERED]: 'Tiered Discount',
    [FLASH_SALE_COUPON.TYPES.DYNAMIC]: 'Dynamic Discount',
    [FLASH_SALE_COUPON.TYPES.CUSTOM]: 'Custom Coupon',
  };
  return labels[type] || 'Unknown Coupon Type';
}

export function flashsalesCouponGetCategoryLabel(category: FlashSaleCouponCategory): string {
  const labels: Record<FlashSaleCouponCategory, string> = {
    [FLASH_SALE_COUPON.CATEGORIES.PROMOTIONAL]: 'Promotional Coupon',
    [FLASH_SALE_COUPON.CATEGORIES.SEASONAL]: 'Seasonal Coupon',
    [FLASH_SALE_COUPON.CATEGORIES.HOLIDAY]: 'Holiday Coupon',
    [FLASH_SALE_COUPON.CATEGORIES.CLEARANCE]: 'Clearance Coupon',
    [FLASH_SALE_COUPON.CATEGORIES.WELCOME]: 'Welcome Coupon',
    [FLASH_SALE_COUPON.CATEGORIES.LOYALTY]: 'Loyalty Coupon',
    [FLASH_SALE_COUPON.CATEGORIES.REFERRAL]: 'Referral Coupon',
    [FLASH_SALE_COUPON.CATEGORIES.BIRTHDAY]: 'Birthday Coupon',
    [FLASH_SALE_COUPON.CATEGORIES.ANNIVERSARY]: 'Anniversary Coupon',
    [FLASH_SALE_COUPON.CATEGORIES.FLASH]: 'Flash Coupon',
    [FLASH_SALE_COUPON.CATEGORIES.LIMITED]: 'Limited Edition Coupon',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesCouponGetGenerationLabel(generation: FlashSaleCouponGeneration): string {
  const labels: Record<FlashSaleCouponGeneration, string> = {
    [FLASH_SALE_COUPON.GENERATION.MANUAL]: 'Manual Generation',
    [FLASH_SALE_COUPON.GENERATION.AUTOMATIC]: 'Automatic Generation',
    [FLASH_SALE_COUPON.GENERATION.BULK]: 'Bulk Generation',
    [FLASH_SALE_COUPON.GENERATION.RANDOM]: 'Random Generation',
    [FLASH_SALE_COUPON.GENERATION.SEQUENTIAL]: 'Sequential Generation',
    [FLASH_SALE_COUPON.GENERATION.CUSTOM]: 'Custom Generation',
  };
  return labels[generation] || 'Unknown Generation';
}

export function flashsalesCouponGetFormatLabel(format: FlashSaleCouponFormat): string {
  const labels: Record<FlashSaleCouponFormat, string> = {
    [FLASH_SALE_COUPON.FORMAT.ALPHANUMERIC]: 'Alphanumeric',
    [FLASH_SALE_COUPON.FORMAT.NUMERIC]: 'Numeric',
    [FLASH_SALE_COUPON.FORMAT.ALPHABETIC]: 'Alphabetic',
    [FLASH_SALE_COUPON.FORMAT.CUSTOM]: 'Custom Format',
    [FLASH_SALE_COUPON.FORMAT.UUID]: 'UUID Format',
  };
  return labels[format] || 'Unknown Format';
}

export function flashsalesCouponGetApplicationLabel(
  application: FlashSaleCouponApplication
): string {
  const labels: Record<FlashSaleCouponApplication, string> = {
    [FLASH_SALE_COUPON.APPLICATION.ALL_PRODUCTS]: 'All Products',
    [FLASH_SALE_COUPON.APPLICATION.SELECTED_PRODUCTS]: 'Selected Products',
    [FLASH_SALE_COUPON.APPLICATION.CATEGORY]: 'Category Based',
    [FLASH_SALE_COUPON.APPLICATION.BRAND]: 'Brand Based',
    [FLASH_SALE_COUPON.APPLICATION.COLLECTION]: 'Collection Based',
    [FLASH_SALE_COUPON.APPLICATION.MINIMUM_ORDER]: 'Minimum Order',
    [FLASH_SALE_COUPON.APPLICATION.FIRST_ORDER]: 'First Order',
    [FLASH_SALE_COUPON.APPLICATION.CUSTOM]: 'Custom Application',
  };
  return labels[application] || 'Unknown Application';
}

export function flashsalesCouponGetRestrictionLabel(
  restriction: FlashSaleCouponRestriction
): string {
  const labels: Record<FlashSaleCouponRestriction, string> = {
    [FLASH_SALE_COUPON.RESTRICTIONS.MINIMUM_ORDER]: 'Minimum Order',
    [FLASH_SALE_COUPON.RESTRICTIONS.MAXIMUM_ORDER]: 'Maximum Order',
    [FLASH_SALE_COUPON.RESTRICTIONS.MINIMUM_QUANTITY]: 'Minimum Quantity',
    [FLASH_SALE_COUPON.RESTRICTIONS.MAXIMUM_QUANTITY]: 'Maximum Quantity',
    [FLASH_SALE_COUPON.RESTRICTIONS.PER_USER_LIMIT]: 'Per User Limit',
    [FLASH_SALE_COUPON.RESTRICTIONS.PER_ORDER_LIMIT]: 'Per Order Limit',
    [FLASH_SALE_COUPON.RESTRICTIONS.FIRST_TIME_BUYER]: 'First Time Buyer',
    [FLASH_SALE_COUPON.RESTRICTIONS.VIP_ONLY]: 'VIP Only',
    [FLASH_SALE_COUPON.RESTRICTIONS.MEMBERS_ONLY]: 'Members Only',
    [FLASH_SALE_COUPON.RESTRICTIONS.SUBSCRIBERS_ONLY]: 'Subscribers Only',
    [FLASH_SALE_COUPON.RESTRICTIONS.EXCLUDED_PRODUCTS]: 'Excluded Products',
    [FLASH_SALE_COUPON.RESTRICTIONS.EXCLUDED_CATEGORIES]: 'Excluded Categories',
  };
  return labels[restriction] || 'Unknown Restriction';
}

export function flashsalesCouponIsValidType(type: string): type is FlashSaleCouponType {
  return Object.values(FLASH_SALE_COUPON.TYPES).includes(type as FlashSaleCouponType);
}

export function flashsalesCouponIsValidCategory(
  category: string
): category is FlashSaleCouponCategory {
  return Object.values(FLASH_SALE_COUPON.CATEGORIES).includes(category as FlashSaleCouponCategory);
}

export function flashsalesCouponIsValidFormat(format: string): format is FlashSaleCouponFormat {
  return Object.values(FLASH_SALE_COUPON.FORMAT).includes(format as FlashSaleCouponFormat);
}

export function flashsalesCouponGetDefaultDiscountPercentage(): number {
  return FLASH_SALE_COUPON.DEFAULTS.DISCOUNT_PERCENTAGE;
}

export function flashsalesCouponGetDefaultMaxUses(): number {
  return FLASH_SALE_COUPON.DEFAULTS.MAX_USES;
}

export function flashsalesCouponGetDefaultMaxUsesPerUser(): number {
  return FLASH_SALE_COUPON.DEFAULTS.MAX_USES_PER_USER;
}

export function flashsalesCouponGetDefaultDurationDays(): number {
  return FLASH_SALE_COUPON.DEFAULTS.DURATION_DAYS;
}

export function flashsalesCouponGetDefaultCodeLength(): number {
  return FLASH_SALE_COUPON.DEFAULTS.CODE_LENGTH;
}

export function flashsalesCouponGetMaxDiscountPercentage(): number {
  return FLASH_SALE_COUPON.LIMITS.MAX_DISCOUNT_PERCENTAGE;
}

export function flashsalesCouponGetMaxFixedAmount(): number {
  return FLASH_SALE_COUPON.LIMITS.MAX_FIXED_AMOUNT;
}

export function flashsalesCouponGetMaxUses(): number {
  return FLASH_SALE_COUPON.LIMITS.MAX_USES;
}

export function flashsalesCouponGetMaxCodeLength(): number {
  return FLASH_SALE_COUPON.LIMITS.MAX_CODE_LENGTH;
}

export function flashsalesCouponGetMinCodeLength(): number {
  return FLASH_SALE_COUPON.LIMITS.MIN_CODE_LENGTH;
}

export function flashsalesCouponGetMaxBulkGeneration(): number {
  return FLASH_SALE_COUPON.LIMITS.MAX_BULK_GENERATION;
}

export function flashsalesCouponGenerateRandomCode(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
