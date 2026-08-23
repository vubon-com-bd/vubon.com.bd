/**
 * Promotion Constants
 * Core promotion configuration and settings
 */

export const MARKETINGPROMOTION = {
  // Promotion Types
  TYPES: {
    DISCOUNT: 'discount',
    COUPON: 'coupon',
    VOUCHER: 'voucher',
    BUNDLE: 'bundle',
    BOGO: 'bogo',
    FREE_SHIPPING: 'free_shipping',
    GIFT_WITH_PURCHASE: 'gift_with_purchase',
    LOYALTY: 'loyalty',
    REFERRAL: 'referral',
    CASHBACK: 'cashback',
    POINTS: 'points',
    SAMPLE: 'sample',
    TRIAL: 'trial',
    SUBSCRIPTION: 'subscription',
    SEASONAL: 'seasonal',
    FLASH_SALE: 'flash_sale',
    EARLY_BIRD: 'early_bird',
    EXCLUSIVE: 'exclusive',
    LIMITED_TIME: 'limited_time',
    LIMITED_QUANTITY: 'limited_quantity',
  } as const,

  // Promotion Scopes
  SCOPES: {
    GLOBAL: 'global',
    CATEGORY: 'category',
    PRODUCT: 'product',
    BRAND: 'brand',
    VENDOR: 'vendor',
    CUSTOMER_SEGMENT: 'customer_segment',
    REGION: 'region',
    CHANNEL: 'channel',
    DEVICE: 'device',
  } as const,

  // Promotion Channels
  CHANNELS: {
    WEBSITE: 'website',
    APP: 'app',
    EMAIL: 'email',
    SMS: 'sms',
    SOCIAL_MEDIA: 'social_media',
    AFFILIATE: 'affiliate',
    IN_STORE: 'in_store',
    MARKETPLACE: 'marketplace',
    ALL: 'all',
  } as const,

  // Promotion Priorities
  PRIORITIES: {
    CRITICAL: 100,
    HIGH: 75,
    MEDIUM: 50,
    LOW: 25,
    BACKGROUND: 0,
  } as const,

  // Promotion Durations
  DURATIONS: {
    HOURS_1: '1h',
    HOURS_6: '6h',
    HOURS_12: '12h',
    HOURS_24: '24h',
    DAYS_3: '3d',
    DAYS_7: '7d',
    DAYS_14: '14d',
    DAYS_30: '30d',
    DAYS_60: '60d',
    DAYS_90: '90d',
    CUSTOM: 'custom',
  } as const,

  // Promotion Redemption Limits
  REDEMPTION_LIMITS: {
    UNLIMITED: 'unlimited',
    ONE_TIME: 'one_time',
    LIMITED: 'limited',
    PER_USER: 'per_user',
    PER_ORDER: 'per_order',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
  } as const,

  // Promotion Defaults
  DEFAULTS: {
    DEFAULT_DURATION_DAYS: 7,
    MIN_DURATION_HOURS: 1,
    MAX_DURATION_DAYS: 365,
    DEFAULT_PRIORITY: 50,
    DEFAULT_REDEMPTION_LIMIT: 'unlimited',
    DEFAULT_USAGE_LIMIT: 1000,
    DEFAULT_PER_USER_LIMIT: 1,
    DEFAULT_MIN_ORDER_AMOUNT: 0,
    DEFAULT_MAX_DISCOUNT_AMOUNT: 0,
  } as const,

  // Promotion Limits
  LIMITS: {
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_TERMS_LENGTH: 2000,
    MAX_PROMOTIONS_PER_USER: 10,
    MAX_PROMOTIONS_PER_ORDER: 5,
    MAX_CODE_LENGTH: 20,
    MIN_CODE_LENGTH: 4,
  } as const,
} as const;

// Promotion Types
export type MarketingPromotionType =
  (typeof MARKETINGPROMOTION.TYPES)[keyof typeof MARKETINGPROMOTION.TYPES];

// Promotion Scopes
export type MarketingPromotionScope =
  (typeof MARKETINGPROMOTION.SCOPES)[keyof typeof MARKETINGPROMOTION.SCOPES];

// Promotion Channels
export type MarketingPromotionChannel =
  (typeof MARKETINGPROMOTION.CHANNELS)[keyof typeof MARKETINGPROMOTION.CHANNELS];

// Promotion Priorities
export type MarketingPromotionPriority =
  (typeof MARKETINGPROMOTION.PRIORITIES)[keyof typeof MARKETINGPROMOTION.PRIORITIES];

// Promotion Durations
export type MarketingPromotionDuration =
  (typeof MARKETINGPROMOTION.DURATIONS)[keyof typeof MARKETINGPROMOTION.DURATIONS];

// Promotion Redemption Limits
export type MarketingPromotionRedemptionLimit =
  (typeof MARKETINGPROMOTION.REDEMPTION_LIMITS)[keyof typeof MARKETINGPROMOTION.REDEMPTION_LIMITS];

// Promotion Defaults
export type MarketingPromotionDefault =
  (typeof MARKETINGPROMOTION.DEFAULTS)[keyof typeof MARKETINGPROMOTION.DEFAULTS];

// Promotion Limits
export type MarketingPromotionLimit =
  (typeof MARKETINGPROMOTION.LIMITS)[keyof typeof MARKETINGPROMOTION.LIMITS];

// Utility Functions
export function marketingpromotionGetTypeLabel(type: MarketingPromotionType): string {
  const labels: Record<MarketingPromotionType, string> = {
    [MARKETINGPROMOTION.TYPES.DISCOUNT]: 'Discount',
    [MARKETINGPROMOTION.TYPES.COUPON]: 'Coupon',
    [MARKETINGPROMOTION.TYPES.VOUCHER]: 'Voucher',
    [MARKETINGPROMOTION.TYPES.BUNDLE]: 'Bundle',
    [MARKETINGPROMOTION.TYPES.BOGO]: 'Buy One Get One',
    [MARKETINGPROMOTION.TYPES.FREE_SHIPPING]: 'Free Shipping',
    [MARKETINGPROMOTION.TYPES.GIFT_WITH_PURCHASE]: 'Gift with Purchase',
    [MARKETINGPROMOTION.TYPES.LOYALTY]: 'Loyalty',
    [MARKETINGPROMOTION.TYPES.REFERRAL]: 'Referral',
    [MARKETINGPROMOTION.TYPES.CASHBACK]: 'Cashback',
    [MARKETINGPROMOTION.TYPES.POINTS]: 'Points',
    [MARKETINGPROMOTION.TYPES.SAMPLE]: 'Sample',
    [MARKETINGPROMOTION.TYPES.TRIAL]: 'Trial',
    [MARKETINGPROMOTION.TYPES.SUBSCRIPTION]: 'Subscription',
    [MARKETINGPROMOTION.TYPES.SEASONAL]: 'Seasonal',
    [MARKETINGPROMOTION.TYPES.FLASH_SALE]: 'Flash Sale',
    [MARKETINGPROMOTION.TYPES.EARLY_BIRD]: 'Early Bird',
    [MARKETINGPROMOTION.TYPES.EXCLUSIVE]: 'Exclusive',
    [MARKETINGPROMOTION.TYPES.LIMITED_TIME]: 'Limited Time',
    [MARKETINGPROMOTION.TYPES.LIMITED_QUANTITY]: 'Limited Quantity',
  };
  return labels[type] || 'Unknown Promotion Type';
}

export function marketingpromotionGetScopeLabel(scope: MarketingPromotionScope): string {
  const labels: Record<MarketingPromotionScope, string> = {
    [MARKETINGPROMOTION.SCOPES.GLOBAL]: 'Global',
    [MARKETINGPROMOTION.SCOPES.CATEGORY]: 'Category',
    [MARKETINGPROMOTION.SCOPES.PRODUCT]: 'Product',
    [MARKETINGPROMOTION.SCOPES.BRAND]: 'Brand',
    [MARKETINGPROMOTION.SCOPES.VENDOR]: 'Vendor',
    [MARKETINGPROMOTION.SCOPES.CUSTOMER_SEGMENT]: 'Customer Segment',
    [MARKETINGPROMOTION.SCOPES.REGION]: 'Region',
    [MARKETINGPROMOTION.SCOPES.CHANNEL]: 'Channel',
    [MARKETINGPROMOTION.SCOPES.DEVICE]: 'Device',
  };
  return labels[scope] || 'Unknown Scope';
}

export function marketingpromotionGetChannelLabel(channel: MarketingPromotionChannel): string {
  const labels: Record<MarketingPromotionChannel, string> = {
    [MARKETINGPROMOTION.CHANNELS.WEBSITE]: 'Website',
    [MARKETINGPROMOTION.CHANNELS.APP]: 'App',
    [MARKETINGPROMOTION.CHANNELS.EMAIL]: 'Email',
    [MARKETINGPROMOTION.CHANNELS.SMS]: 'SMS',
    [MARKETINGPROMOTION.CHANNELS.SOCIAL_MEDIA]: 'Social Media',
    [MARKETINGPROMOTION.CHANNELS.AFFILIATE]: 'Affiliate',
    [MARKETINGPROMOTION.CHANNELS.IN_STORE]: 'In-Store',
    [MARKETINGPROMOTION.CHANNELS.MARKETPLACE]: 'Marketplace',
    [MARKETINGPROMOTION.CHANNELS.ALL]: 'All Channels',
  };
  return labels[channel] || 'Unknown Channel';
}

export function marketingpromotionGetDurationLabel(duration: MarketingPromotionDuration): string {
  const labels: Record<MarketingPromotionDuration, string> = {
    [MARKETINGPROMOTION.DURATIONS.HOURS_1]: '1 Hour',
    [MARKETINGPROMOTION.DURATIONS.HOURS_6]: '6 Hours',
    [MARKETINGPROMOTION.DURATIONS.HOURS_12]: '12 Hours',
    [MARKETINGPROMOTION.DURATIONS.HOURS_24]: '24 Hours',
    [MARKETINGPROMOTION.DURATIONS.DAYS_3]: '3 Days',
    [MARKETINGPROMOTION.DURATIONS.DAYS_7]: '7 Days',
    [MARKETINGPROMOTION.DURATIONS.DAYS_14]: '14 Days',
    [MARKETINGPROMOTION.DURATIONS.DAYS_30]: '30 Days',
    [MARKETINGPROMOTION.DURATIONS.DAYS_60]: '60 Days',
    [MARKETINGPROMOTION.DURATIONS.DAYS_90]: '90 Days',
    [MARKETINGPROMOTION.DURATIONS.CUSTOM]: 'Custom Duration',
  };
  return labels[duration] || 'Unknown Duration';
}

export function marketingpromotionGetRedemptionLimitLabel(
  limit: MarketingPromotionRedemptionLimit
): string {
  const labels: Record<MarketingPromotionRedemptionLimit, string> = {
    [MARKETINGPROMOTION.REDEMPTION_LIMITS.UNLIMITED]: 'Unlimited',
    [MARKETINGPROMOTION.REDEMPTION_LIMITS.ONE_TIME]: 'One Time',
    [MARKETINGPROMOTION.REDEMPTION_LIMITS.LIMITED]: 'Limited',
    [MARKETINGPROMOTION.REDEMPTION_LIMITS.PER_USER]: 'Per User',
    [MARKETINGPROMOTION.REDEMPTION_LIMITS.PER_ORDER]: 'Per Order',
    [MARKETINGPROMOTION.REDEMPTION_LIMITS.DAILY]: 'Daily',
    [MARKETINGPROMOTION.REDEMPTION_LIMITS.WEEKLY]: 'Weekly',
    [MARKETINGPROMOTION.REDEMPTION_LIMITS.MONTHLY]: 'Monthly',
  };
  return labels[limit] || 'Unknown Limit';
}

export function marketingpromotionGetPriorityLabel(priority: number): string {
  if (priority >= MARKETINGPROMOTION.PRIORITIES.CRITICAL) return 'Critical';
  if (priority >= MARKETINGPROMOTION.PRIORITIES.HIGH) return 'High';
  if (priority >= MARKETINGPROMOTION.PRIORITIES.MEDIUM) return 'Medium';
  if (priority >= MARKETINGPROMOTION.PRIORITIES.LOW) return 'Low';
  return 'Background';
}

export function marketingpromotionIsStackable(type: MarketingPromotionType): boolean {
  const stackableTypes: MarketingPromotionType[] = [
    MARKETINGPROMOTION.TYPES.COUPON,
    MARKETINGPROMOTION.TYPES.VOUCHER,
    MARKETINGPROMOTION.TYPES.POINTS,
    MARKETINGPROMOTION.TYPES.CASHBACK,
  ];
  return stackableTypes.includes(type);
}

export function marketingpromotionIsLimited(type: MarketingPromotionType): boolean {
  const limitedTypes: MarketingPromotionType[] = [
    MARKETINGPROMOTION.TYPES.FLASH_SALE,
    MARKETINGPROMOTION.TYPES.EARLY_BIRD,
    MARKETINGPROMOTION.TYPES.LIMITED_TIME,
    MARKETINGPROMOTION.TYPES.LIMITED_QUANTITY,
    MARKETINGPROMOTION.TYPES.EXCLUSIVE,
  ];
  return limitedTypes.includes(type);
}

export function marketingpromotionGetDefaultDuration(): number {
  return MARKETINGPROMOTION.DEFAULTS.DEFAULT_DURATION_DAYS;
}

export function marketingpromotionGetDefaultPriority(): number {
  return MARKETINGPROMOTION.DEFAULTS.DEFAULT_PRIORITY;
}

export function marketingpromotionGetDefaultUsageLimit(): number {
  return MARKETINGPROMOTION.DEFAULTS.DEFAULT_USAGE_LIMIT;
}
