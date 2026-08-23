/**
 * Coupon Type Constants
 * Type definitions and classifications for coupons
 */

export const COUPON_TYPE = {
  // Coupon Categories
  CATEGORIES: {
    DISCOUNT: 'discount',
    SHIPPING: 'shipping',
    GIFT: 'gift',
    BUNDLE: 'bundle',
    LOYALTY: 'loyalty',
    REFERRAL: 'referral',
    PROMOTIONAL: 'promotional',
    SEASONAL: 'seasonal',
    CUSTOM: 'custom',
  } as const,

  // Coupon Sub-Types
  SUB_TYPES: {
    // Discount
    PERCENTAGE_OFF: 'percentage_off',
    AMOUNT_OFF: 'amount_off',
    BUY_ONE_GET_ONE: 'buy_one_get_one',
    BUY_X_GET_Y: 'buy_x_get_y',
    TIERED_DISCOUNT: 'tiered_discount',
    VOLUME_DISCOUNT: 'volume_discount',

    // Shipping
    FREE_SHIPPING: 'free_shipping',
    DISCOUNTED_SHIPPING: 'discounted_shipping',

    // Gift
    GIFT_CARD: 'gift_card',
    FREE_GIFT: 'free_gift',

    // Bundle
    BUNDLE_DISCOUNT: 'bundle_discount',
    BUNDLE_DEAL: 'bundle_deal',

    // Loyalty
    LOYALTY_POINTS: 'loyalty_points',
    LOYALTY_DISCOUNT: 'loyalty_discount',

    // Referral
    REFERRAL_DISCOUNT: 'referral_discount',
    REFERRAL_BONUS: 'referral_bonus',

    // Promotional
    FLASH_SALE: 'flash_sale',
    HOLIDAY_SPECIAL: 'holiday_special',
    WEEKEND_SPECIAL: 'weekend_special',

    // Seasonal
    SUMMER_SALE: 'summer_sale',
    WINTER_SALE: 'winter_sale',
    SPRING_SALE: 'spring_sale',
    FALL_SALE: 'fall_sale',
  } as const,

  // Coupon Generation Methods
  GENERATION_METHODS: {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    BULK: 'bulk',
    API: 'api',
    CUSTOM: 'custom',
  } as const,

  // Coupon Validation Rules
  VALIDATION_RULES: {
    NO_RESTRICTIONS: 'no_restrictions',
    MINIMUM_ORDER: 'minimum_order',
    FIRST_ORDER_ONLY: 'first_order_only',
    NEW_CUSTOMER_ONLY: 'new_customer_only',
    SPECIFIC_PRODUCTS: 'specific_products',
    SPECIFIC_CATEGORIES: 'specific_categories',
    SPECIFIC_BRANDS: 'specific_brands',
    SPECIFIC_VENDORS: 'specific_vendors',
    GEOGRAPHIC: 'geographic',
    DEVICE: 'device',
    TIME_BASED: 'time_based',
  } as const,

  // Coupon Priority
  PRIORITY: {
    HIGHEST: 100,
    HIGH: 75,
    MEDIUM: 50,
    LOW: 25,
    LOWEST: 0,
  } as const,
} as const;

// Coupon Categories
export type CouponCategoryType =
  (typeof COUPON_TYPE.CATEGORIES)[keyof typeof COUPON_TYPE.CATEGORIES];

// Coupon Sub-Types
export type CouponSubType = (typeof COUPON_TYPE.SUB_TYPES)[keyof typeof COUPON_TYPE.SUB_TYPES];

// Coupon Generation Methods
export type CouponGenerationMethod =
  (typeof COUPON_TYPE.GENERATION_METHODS)[keyof typeof COUPON_TYPE.GENERATION_METHODS];

// Coupon Validation Rules
export type CouponValidationRule =
  (typeof COUPON_TYPE.VALIDATION_RULES)[keyof typeof COUPON_TYPE.VALIDATION_RULES];

// Coupon Priority
export type CouponPriority = (typeof COUPON_TYPE.PRIORITY)[keyof typeof COUPON_TYPE.PRIORITY];

// Utility Functions
export function coupontypeGetCategoryLabel(category: CouponCategoryType): string {
  const labels: Record<CouponCategoryType, string> = {
    [COUPON_TYPE.CATEGORIES.DISCOUNT]: 'Discount',
    [COUPON_TYPE.CATEGORIES.SHIPPING]: 'Shipping',
    [COUPON_TYPE.CATEGORIES.GIFT]: 'Gift',
    [COUPON_TYPE.CATEGORIES.BUNDLE]: 'Bundle',
    [COUPON_TYPE.CATEGORIES.LOYALTY]: 'Loyalty',
    [COUPON_TYPE.CATEGORIES.REFERRAL]: 'Referral',
    [COUPON_TYPE.CATEGORIES.PROMOTIONAL]: 'Promotional',
    [COUPON_TYPE.CATEGORIES.SEASONAL]: 'Seasonal',
    [COUPON_TYPE.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function coupontypeGetSubTypeLabel(subType: CouponSubType): string {
  const labels: Record<CouponSubType, string> = {
    [COUPON_TYPE.SUB_TYPES.PERCENTAGE_OFF]: 'Percentage Off',
    [COUPON_TYPE.SUB_TYPES.AMOUNT_OFF]: 'Amount Off',
    [COUPON_TYPE.SUB_TYPES.BUY_ONE_GET_ONE]: 'Buy One Get One',
    [COUPON_TYPE.SUB_TYPES.BUY_X_GET_Y]: 'Buy X Get Y',
    [COUPON_TYPE.SUB_TYPES.TIERED_DISCOUNT]: 'Tiered Discount',
    [COUPON_TYPE.SUB_TYPES.VOLUME_DISCOUNT]: 'Volume Discount',
    [COUPON_TYPE.SUB_TYPES.FREE_SHIPPING]: 'Free Shipping',
    [COUPON_TYPE.SUB_TYPES.DISCOUNTED_SHIPPING]: 'Discounted Shipping',
    [COUPON_TYPE.SUB_TYPES.GIFT_CARD]: 'Gift Card',
    [COUPON_TYPE.SUB_TYPES.FREE_GIFT]: 'Free Gift',
    [COUPON_TYPE.SUB_TYPES.BUNDLE_DISCOUNT]: 'Bundle Discount',
    [COUPON_TYPE.SUB_TYPES.BUNDLE_DEAL]: 'Bundle Deal',
    [COUPON_TYPE.SUB_TYPES.LOYALTY_POINTS]: 'Loyalty Points',
    [COUPON_TYPE.SUB_TYPES.LOYALTY_DISCOUNT]: 'Loyalty Discount',
    [COUPON_TYPE.SUB_TYPES.REFERRAL_DISCOUNT]: 'Referral Discount',
    [COUPON_TYPE.SUB_TYPES.REFERRAL_BONUS]: 'Referral Bonus',
    [COUPON_TYPE.SUB_TYPES.FLASH_SALE]: 'Flash Sale',
    [COUPON_TYPE.SUB_TYPES.HOLIDAY_SPECIAL]: 'Holiday Special',
    [COUPON_TYPE.SUB_TYPES.WEEKEND_SPECIAL]: 'Weekend Special',
    [COUPON_TYPE.SUB_TYPES.SUMMER_SALE]: 'Summer Sale',
    [COUPON_TYPE.SUB_TYPES.WINTER_SALE]: 'Winter Sale',
    [COUPON_TYPE.SUB_TYPES.SPRING_SALE]: 'Spring Sale',
    [COUPON_TYPE.SUB_TYPES.FALL_SALE]: 'Fall Sale',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function coupontypeGetGenerationMethodLabel(method: CouponGenerationMethod): string {
  const labels: Record<CouponGenerationMethod, string> = {
    [COUPON_TYPE.GENERATION_METHODS.MANUAL]: 'Manual',
    [COUPON_TYPE.GENERATION_METHODS.AUTOMATIC]: 'Automatic',
    [COUPON_TYPE.GENERATION_METHODS.BULK]: 'Bulk',
    [COUPON_TYPE.GENERATION_METHODS.API]: 'API',
    [COUPON_TYPE.GENERATION_METHODS.CUSTOM]: 'Custom',
  };
  return labels[method] || 'Unknown Method';
}

export function coupontypeGetValidationRuleLabel(rule: CouponValidationRule): string {
  const labels: Record<CouponValidationRule, string> = {
    [COUPON_TYPE.VALIDATION_RULES.NO_RESTRICTIONS]: 'No Restrictions',
    [COUPON_TYPE.VALIDATION_RULES.MINIMUM_ORDER]: 'Minimum Order',
    [COUPON_TYPE.VALIDATION_RULES.FIRST_ORDER_ONLY]: 'First Order Only',
    [COUPON_TYPE.VALIDATION_RULES.NEW_CUSTOMER_ONLY]: 'New Customer Only',
    [COUPON_TYPE.VALIDATION_RULES.SPECIFIC_PRODUCTS]: 'Specific Products',
    [COUPON_TYPE.VALIDATION_RULES.SPECIFIC_CATEGORIES]: 'Specific Categories',
    [COUPON_TYPE.VALIDATION_RULES.SPECIFIC_BRANDS]: 'Specific Brands',
    [COUPON_TYPE.VALIDATION_RULES.SPECIFIC_VENDORS]: 'Specific Vendors',
    [COUPON_TYPE.VALIDATION_RULES.GEOGRAPHIC]: 'Geographic',
    [COUPON_TYPE.VALIDATION_RULES.DEVICE]: 'Device',
    [COUPON_TYPE.VALIDATION_RULES.TIME_BASED]: 'Time Based',
  };
  return labels[rule] || 'Unknown Rule';
}

export function coupontypeIsDiscountCategory(category: CouponCategoryType): boolean {
  const discountCategories: CouponCategoryType[] = [
    COUPON_TYPE.CATEGORIES.DISCOUNT,
    COUPON_TYPE.CATEGORIES.PROMOTIONAL,
    COUPON_TYPE.CATEGORIES.SEASONAL,
  ];
  return discountCategories.includes(category);
}

export function coupontypeIsShippingCategory(category: CouponCategoryType): boolean {
  return category === COUPON_TYPE.CATEGORIES.SHIPPING;
}

export function coupontypeIsGiftCategory(category: CouponCategoryType): boolean {
  return category === COUPON_TYPE.CATEGORIES.GIFT;
}

export function coupontypeIsLoyaltyCategory(category: CouponCategoryType): boolean {
  return category === COUPON_TYPE.CATEGORIES.LOYALTY;
}
