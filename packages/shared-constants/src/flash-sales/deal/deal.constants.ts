/**
 * Deal Constants
 * Configuration for deals, offers, and discounts
 */

export const DEAL = {
  // Deal Types
  TYPES: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    BOGO: 'bogo',
    BUNDLE: 'bundle',
    FREE_SHIPPING: 'free_shipping',
    GIFT: 'gift',
    UPSELL: 'upsell',
    CROSS_SELL: 'cross_sell',
    VOLUME: 'volume',
    TIERED: 'tiered',
    FLASH: 'flash',
    LIMITED_TIME: 'limited_time',
  },

  // Deal Categories
  CATEGORIES: {
    PRODUCT: 'product',
    CATEGORY: 'category',
    CART: 'cart',
    SHIPPING: 'shipping',
    PAYMENT: 'payment',
    CUSTOMER: 'customer',
    BUNDLE: 'bundle',
  },

  // Deal Channels
  CHANNELS: {
    ALL: 'all',
    WEBSITE: 'website',
    MOBILE: 'mobile',
    STORE: 'store',
    SOCIAL: 'social',
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
  },

  // Deal Defaults
  DEFAULTS: {
    MAX_USES: 1000,
    MAX_USES_PER_USER: 1,
    MIN_ORDER_AMOUNT: 0,
    MAX_DISCOUNT_AMOUNT: 0,
    DURATION_HOURS: 24,
    BUFFER_MINUTES: 30,
  },

  // Deal Limits
  LIMITS: {
    MIN_DISCOUNT: 1,
    MAX_DISCOUNT_PERCENTAGE: 90,
    MAX_FIXED_AMOUNT: 100000,
    MAX_USES: 100000,
    MAX_USES_PER_USER: 10,
    MAX_PRODUCTS: 100,
  },
} as const;

// Deal Types
export type DealType = (typeof DEAL.TYPES)[keyof typeof DEAL.TYPES];

// Deal Categories
export type DealCategory = (typeof DEAL.CATEGORIES)[keyof typeof DEAL.CATEGORIES];

// Deal Channels
export type DealChannel = (typeof DEAL.CHANNELS)[keyof typeof DEAL.CHANNELS];

// Utility Functions
export function flashsalesDealGetTypeLabel(type: DealType): string {
  const labels: Record<DealType, string> = {
    [DEAL.TYPES.PERCENTAGE]: 'Percentage Discount',
    [DEAL.TYPES.FIXED]: 'Fixed Amount Discount',
    [DEAL.TYPES.BOGO]: 'Buy One Get One',
    [DEAL.TYPES.BUNDLE]: 'Bundle Deal',
    [DEAL.TYPES.FREE_SHIPPING]: 'Free Shipping',
    [DEAL.TYPES.GIFT]: 'Gift with Purchase',
    [DEAL.TYPES.UPSELL]: 'Upsell Offer',
    [DEAL.TYPES.CROSS_SELL]: 'Cross-sell Offer',
    [DEAL.TYPES.VOLUME]: 'Volume Discount',
    [DEAL.TYPES.TIERED]: 'Tiered Discount',
    [DEAL.TYPES.FLASH]: 'Flash Deal',
    [DEAL.TYPES.LIMITED_TIME]: 'Limited Time Offer',
  };
  return labels[type] || 'Unknown Type';
}

export function flashsalesDealGetCategoryLabel(category: DealCategory): string {
  const labels: Record<DealCategory, string> = {
    [DEAL.CATEGORIES.PRODUCT]: 'Product Deal',
    [DEAL.CATEGORIES.CATEGORY]: 'Category Deal',
    [DEAL.CATEGORIES.CART]: 'Cart Deal',
    [DEAL.CATEGORIES.SHIPPING]: 'Shipping Deal',
    [DEAL.CATEGORIES.PAYMENT]: 'Payment Deal',
    [DEAL.CATEGORIES.CUSTOMER]: 'Customer Deal',
    [DEAL.CATEGORIES.BUNDLE]: 'Bundle Deal',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesDealGetChannelLabel(channel: DealChannel): string {
  const labels: Record<DealChannel, string> = {
    [DEAL.CHANNELS.ALL]: 'All Channels',
    [DEAL.CHANNELS.WEBSITE]: 'Website',
    [DEAL.CHANNELS.MOBILE]: 'Mobile App',
    [DEAL.CHANNELS.STORE]: 'Physical Store',
    [DEAL.CHANNELS.SOCIAL]: 'Social Media',
    [DEAL.CHANNELS.EMAIL]: 'Email',
    [DEAL.CHANNELS.SMS]: 'SMS',
    [DEAL.CHANNELS.PUSH]: 'Push Notification',
  };
  return labels[channel] || 'Unknown Channel';
}

export function flashsalesDealIsValidType(type: string): type is DealType {
  return Object.values(DEAL.TYPES).includes(type as DealType);
}

export function flashsalesDealIsValidCategory(category: string): category is DealCategory {
  return Object.values(DEAL.CATEGORIES).includes(category as DealCategory);
}

export function flashsalesDealGetDefaultMaxUses(): number {
  return DEAL.DEFAULTS.MAX_USES;
}

export function flashsalesDealGetDefaultMaxUsesPerUser(): number {
  return DEAL.DEFAULTS.MAX_USES_PER_USER;
}

export function flashsalesDealGetMaxDiscountPercentage(): number {
  return DEAL.LIMITS.MAX_DISCOUNT_PERCENTAGE;
}

export function flashsalesDealGetMaxFixedAmount(): number {
  return DEAL.LIMITS.MAX_FIXED_AMOUNT;
}
