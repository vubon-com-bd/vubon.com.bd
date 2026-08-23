/**
 * Promotion Type Constants
 * Types and classifications of promotions
 */

export const MARKETINGPROMOTION_TYPE = {
  // Promotion Categories
  CATEGORIES: {
    PRICE_BASED: 'price_based',
    PRODUCT_BASED: 'product_based',
    CUSTOMER_BASED: 'customer_based',
    ORDER_BASED: 'order_based',
    TIME_BASED: 'time_based',
    CHANNEL_BASED: 'channel_based',
  } as const,

  // Discount Types
  DISCOUNT_TYPES: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    BUY_X_GET_Y: 'buy_x_get_y',
    TIERED: 'tiered',
    VOLUME: 'volume',
    BUNDLE: 'bundle',
    DYNAMIC: 'dynamic',
  } as const,

  // Promotion Triggers
  TRIGGERS: {
    AUTOMATIC: 'automatic',
    CODE: 'code',
    LINK: 'link',
    EMAIL: 'email',
    SMS: 'sms',
    QR_CODE: 'qr_code',
    SOCIAL: 'social',
    REFERRAL: 'referral',
    CART: 'cart',
    CHECKOUT: 'checkout',
  } as const,

  // Promotion Frequency
  FREQUENCIES: {
    ONE_TIME: 'one_time',
    REPEATING: 'repeating',
    SEASONAL: 'seasonal',
    RECURRING: 'recurring',
    CUSTOM: 'custom',
  } as const,

  // Promotion Mechanics
  MECHANICS: {
    AUTOMATIC_APPLY: 'automatic_apply',
    CODE_REQUIRED: 'code_required',
    QUALIFICATION_BASED: 'qualification_based',
    TIERED_REACH: 'tiered_reach',
    GAMIFIED: 'gamified',
    SOCIAL_SHARE: 'social_share',
  } as const,
} as const;

// Promotion Categories
export type MarketingPromotionCategory =
  (typeof MARKETINGPROMOTION_TYPE.CATEGORIES)[keyof typeof MARKETINGPROMOTION_TYPE.CATEGORIES];

// Discount Types
export type MarketingPromotionDiscountType =
  (typeof MARKETINGPROMOTION_TYPE.DISCOUNT_TYPES)[keyof typeof MARKETINGPROMOTION_TYPE.DISCOUNT_TYPES];

// Promotion Triggers
export type MarketingPromotionTrigger =
  (typeof MARKETINGPROMOTION_TYPE.TRIGGERS)[keyof typeof MARKETINGPROMOTION_TYPE.TRIGGERS];

// Promotion Frequencies
export type MarketingPromotionFrequency =
  (typeof MARKETINGPROMOTION_TYPE.FREQUENCIES)[keyof typeof MARKETINGPROMOTION_TYPE.FREQUENCIES];

// Promotion Mechanics
export type MarketingPromotionMechanic =
  (typeof MARKETINGPROMOTION_TYPE.MECHANICS)[keyof typeof MARKETINGPROMOTION_TYPE.MECHANICS];

// Utility Functions
export function marketingpromotionGetCategoryLabel(category: MarketingPromotionCategory): string {
  const labels: Record<MarketingPromotionCategory, string> = {
    [MARKETINGPROMOTION_TYPE.CATEGORIES.PRICE_BASED]: 'Price Based',
    [MARKETINGPROMOTION_TYPE.CATEGORIES.PRODUCT_BASED]: 'Product Based',
    [MARKETINGPROMOTION_TYPE.CATEGORIES.CUSTOMER_BASED]: 'Customer Based',
    [MARKETINGPROMOTION_TYPE.CATEGORIES.ORDER_BASED]: 'Order Based',
    [MARKETINGPROMOTION_TYPE.CATEGORIES.TIME_BASED]: 'Time Based',
    [MARKETINGPROMOTION_TYPE.CATEGORIES.CHANNEL_BASED]: 'Channel Based',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingpromotionGetDiscountTypeLabel(
  discountType: MarketingPromotionDiscountType
): string {
  const labels: Record<MarketingPromotionDiscountType, string> = {
    [MARKETINGPROMOTION_TYPE.DISCOUNT_TYPES.PERCENTAGE]: 'Percentage Discount',
    [MARKETINGPROMOTION_TYPE.DISCOUNT_TYPES.FIXED]: 'Fixed Amount Discount',
    [MARKETINGPROMOTION_TYPE.DISCOUNT_TYPES.BUY_X_GET_Y]: 'Buy X Get Y',
    [MARKETINGPROMOTION_TYPE.DISCOUNT_TYPES.TIERED]: 'Tiered Discount',
    [MARKETINGPROMOTION_TYPE.DISCOUNT_TYPES.VOLUME]: 'Volume Discount',
    [MARKETINGPROMOTION_TYPE.DISCOUNT_TYPES.BUNDLE]: 'Bundle Discount',
    [MARKETINGPROMOTION_TYPE.DISCOUNT_TYPES.DYNAMIC]: 'Dynamic Discount',
  };
  return labels[discountType] || 'Unknown Discount Type';
}

export function marketingpromotionGetTriggerLabel(trigger: MarketingPromotionTrigger): string {
  const labels: Record<MarketingPromotionTrigger, string> = {
    [MARKETINGPROMOTION_TYPE.TRIGGERS.AUTOMATIC]: 'Automatic',
    [MARKETINGPROMOTION_TYPE.TRIGGERS.CODE]: 'Promo Code',
    [MARKETINGPROMOTION_TYPE.TRIGGERS.LINK]: 'Link',
    [MARKETINGPROMOTION_TYPE.TRIGGERS.EMAIL]: 'Email',
    [MARKETINGPROMOTION_TYPE.TRIGGERS.SMS]: 'SMS',
    [MARKETINGPROMOTION_TYPE.TRIGGERS.QR_CODE]: 'QR Code',
    [MARKETINGPROMOTION_TYPE.TRIGGERS.SOCIAL]: 'Social Media',
    [MARKETINGPROMOTION_TYPE.TRIGGERS.REFERRAL]: 'Referral',
    [MARKETINGPROMOTION_TYPE.TRIGGERS.CART]: 'Cart',
    [MARKETINGPROMOTION_TYPE.TRIGGERS.CHECKOUT]: 'Checkout',
  };
  return labels[trigger] || 'Unknown Trigger';
}

export function marketingpromotionGetFrequencyLabel(
  frequency: MarketingPromotionFrequency
): string {
  const labels: Record<MarketingPromotionFrequency, string> = {
    [MARKETINGPROMOTION_TYPE.FREQUENCIES.ONE_TIME]: 'One Time',
    [MARKETINGPROMOTION_TYPE.FREQUENCIES.REPEATING]: 'Repeating',
    [MARKETINGPROMOTION_TYPE.FREQUENCIES.SEASONAL]: 'Seasonal',
    [MARKETINGPROMOTION_TYPE.FREQUENCIES.RECURRING]: 'Recurring',
    [MARKETINGPROMOTION_TYPE.FREQUENCIES.CUSTOM]: 'Custom',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function marketingpromotionGetMechanicLabel(mechanic: MarketingPromotionMechanic): string {
  const labels: Record<MarketingPromotionMechanic, string> = {
    [MARKETINGPROMOTION_TYPE.MECHANICS.AUTOMATIC_APPLY]: 'Automatic Apply',
    [MARKETINGPROMOTION_TYPE.MECHANICS.CODE_REQUIRED]: 'Code Required',
    [MARKETINGPROMOTION_TYPE.MECHANICS.QUALIFICATION_BASED]: 'Qualification Based',
    [MARKETINGPROMOTION_TYPE.MECHANICS.TIERED_REACH]: 'Tiered Reach',
    [MARKETINGPROMOTION_TYPE.MECHANICS.GAMIFIED]: 'Gamified',
    [MARKETINGPROMOTION_TYPE.MECHANICS.SOCIAL_SHARE]: 'Social Share',
  };
  return labels[mechanic] || 'Unknown Mechanic';
}

export function marketingpromotionIsPriceBased(category: MarketingPromotionCategory): boolean {
  return category === MARKETINGPROMOTION_TYPE.CATEGORIES.PRICE_BASED;
}

export function marketingpromotionIsProductBased(category: MarketingPromotionCategory): boolean {
  return category === MARKETINGPROMOTION_TYPE.CATEGORIES.PRODUCT_BASED;
}
