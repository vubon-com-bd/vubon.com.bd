/**
 * Flash Sale Coupon Type Constants
 * Types and classifications of flash sale coupons
 */

export const FLASH_SALE_COUPON_TYPE = {
  // Coupon Categories
  CATEGORIES: {
    DISCOUNT: 'discount',
    FREEBIE: 'freebie',
    SHIPPING: 'shipping',
    BUNDLE: 'bundle',
    GIFT: 'gift',
    VOUCHER: 'voucher',
    PROMO: 'promo',
    CUSTOM: 'custom',
  },

  // Coupon Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    STANDARD: 'standard',
    COMPLEX: 'complex',
    ADVANCED: 'advanced',
  },

  // Coupon Scope
  SCOPE: {
    GLOBAL: 'global',
    CATEGORY: 'category',
    PRODUCT: 'product',
    USER: 'user',
    SEGMENT: 'segment',
    REGIONAL: 'regional',
  },

  // Coupon Frequency
  FREQUENCY: {
    ONE_TIME: 'one_time',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    RECURRING: 'recurring',
  },

  // Coupon Trigger
  TRIGGER: {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    TIME_BASED: 'time_based',
    EVENT_BASED: 'event_based',
    CONDITION_BASED: 'condition_based',
  },

  // Coupon Priority
  PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Coupon Stacking
  STACKING: {
    NONE: 'none',
    LIMITED: 'limited',
    UNLIMITED: 'unlimited',
    CUSTOM: 'custom',
  },
} as const;

// Coupon Categories
export type FlashSaleCouponTypeCategory =
  (typeof FLASH_SALE_COUPON_TYPE.CATEGORIES)[keyof typeof FLASH_SALE_COUPON_TYPE.CATEGORIES];

// Coupon Complexity
export type FlashSaleCouponTypeComplexity =
  (typeof FLASH_SALE_COUPON_TYPE.COMPLEXITY)[keyof typeof FLASH_SALE_COUPON_TYPE.COMPLEXITY];

// Coupon Scope
export type FlashSaleCouponTypeScope =
  (typeof FLASH_SALE_COUPON_TYPE.SCOPE)[keyof typeof FLASH_SALE_COUPON_TYPE.SCOPE];

// Coupon Frequency
export type FlashSaleCouponTypeFrequency =
  (typeof FLASH_SALE_COUPON_TYPE.FREQUENCY)[keyof typeof FLASH_SALE_COUPON_TYPE.FREQUENCY];

// Coupon Trigger
export type FlashSaleCouponTypeTrigger =
  (typeof FLASH_SALE_COUPON_TYPE.TRIGGER)[keyof typeof FLASH_SALE_COUPON_TYPE.TRIGGER];

// Coupon Priority
export type FlashSaleCouponTypePriority =
  (typeof FLASH_SALE_COUPON_TYPE.PRIORITY)[keyof typeof FLASH_SALE_COUPON_TYPE.PRIORITY];

// Coupon Stacking
export type FlashSaleCouponTypeStacking =
  (typeof FLASH_SALE_COUPON_TYPE.STACKING)[keyof typeof FLASH_SALE_COUPON_TYPE.STACKING];

// Utility Functions
export function flashsalesCouponTypeGetCategoryLabel(
  category: FlashSaleCouponTypeCategory
): string {
  const labels: Record<FlashSaleCouponTypeCategory, string> = {
    [FLASH_SALE_COUPON_TYPE.CATEGORIES.DISCOUNT]: 'Discount Coupon',
    [FLASH_SALE_COUPON_TYPE.CATEGORIES.FREEBIE]: 'Freebie Coupon',
    [FLASH_SALE_COUPON_TYPE.CATEGORIES.SHIPPING]: 'Shipping Coupon',
    [FLASH_SALE_COUPON_TYPE.CATEGORIES.BUNDLE]: 'Bundle Coupon',
    [FLASH_SALE_COUPON_TYPE.CATEGORIES.GIFT]: 'Gift Coupon',
    [FLASH_SALE_COUPON_TYPE.CATEGORIES.VOUCHER]: 'Voucher',
    [FLASH_SALE_COUPON_TYPE.CATEGORIES.PROMO]: 'Promo Code',
    [FLASH_SALE_COUPON_TYPE.CATEGORIES.CUSTOM]: 'Custom Coupon',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesCouponTypeGetComplexityLabel(
  complexity: FlashSaleCouponTypeComplexity
): string {
  const labels: Record<FlashSaleCouponTypeComplexity, string> = {
    [FLASH_SALE_COUPON_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [FLASH_SALE_COUPON_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [FLASH_SALE_COUPON_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [FLASH_SALE_COUPON_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function flashsalesCouponTypeGetScopeLabel(scope: FlashSaleCouponTypeScope): string {
  const labels: Record<FlashSaleCouponTypeScope, string> = {
    [FLASH_SALE_COUPON_TYPE.SCOPE.GLOBAL]: 'Global',
    [FLASH_SALE_COUPON_TYPE.SCOPE.CATEGORY]: 'Category',
    [FLASH_SALE_COUPON_TYPE.SCOPE.PRODUCT]: 'Product',
    [FLASH_SALE_COUPON_TYPE.SCOPE.USER]: 'User',
    [FLASH_SALE_COUPON_TYPE.SCOPE.SEGMENT]: 'Segment',
    [FLASH_SALE_COUPON_TYPE.SCOPE.REGIONAL]: 'Regional',
  };
  return labels[scope] || 'Unknown Scope';
}

export function flashsalesCouponTypeGetFrequencyLabel(
  frequency: FlashSaleCouponTypeFrequency
): string {
  const labels: Record<FlashSaleCouponTypeFrequency, string> = {
    [FLASH_SALE_COUPON_TYPE.FREQUENCY.ONE_TIME]: 'One Time',
    [FLASH_SALE_COUPON_TYPE.FREQUENCY.DAILY]: 'Daily',
    [FLASH_SALE_COUPON_TYPE.FREQUENCY.WEEKLY]: 'Weekly',
    [FLASH_SALE_COUPON_TYPE.FREQUENCY.MONTHLY]: 'Monthly',
    [FLASH_SALE_COUPON_TYPE.FREQUENCY.QUARTERLY]: 'Quarterly',
    [FLASH_SALE_COUPON_TYPE.FREQUENCY.RECURRING]: 'Recurring',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function flashsalesCouponTypeGetTriggerLabel(trigger: FlashSaleCouponTypeTrigger): string {
  const labels: Record<FlashSaleCouponTypeTrigger, string> = {
    [FLASH_SALE_COUPON_TYPE.TRIGGER.MANUAL]: 'Manual',
    [FLASH_SALE_COUPON_TYPE.TRIGGER.AUTOMATIC]: 'Automatic',
    [FLASH_SALE_COUPON_TYPE.TRIGGER.TIME_BASED]: 'Time Based',
    [FLASH_SALE_COUPON_TYPE.TRIGGER.EVENT_BASED]: 'Event Based',
    [FLASH_SALE_COUPON_TYPE.TRIGGER.CONDITION_BASED]: 'Condition Based',
  };
  return labels[trigger] || 'Unknown Trigger';
}

export function flashsalesCouponTypeGetPriorityLabel(
  priority: FlashSaleCouponTypePriority
): string {
  const labels: Record<FlashSaleCouponTypePriority, string> = {
    [FLASH_SALE_COUPON_TYPE.PRIORITY.LOW]: 'Low',
    [FLASH_SALE_COUPON_TYPE.PRIORITY.MEDIUM]: 'Medium',
    [FLASH_SALE_COUPON_TYPE.PRIORITY.HIGH]: 'High',
    [FLASH_SALE_COUPON_TYPE.PRIORITY.CRITICAL]: 'Critical',
  };
  return labels[priority] || 'Unknown Priority';
}

export function flashsalesCouponTypeGetStackingLabel(
  stacking: FlashSaleCouponTypeStacking
): string {
  const labels: Record<FlashSaleCouponTypeStacking, string> = {
    [FLASH_SALE_COUPON_TYPE.STACKING.NONE]: 'No Stacking',
    [FLASH_SALE_COUPON_TYPE.STACKING.LIMITED]: 'Limited Stacking',
    [FLASH_SALE_COUPON_TYPE.STACKING.UNLIMITED]: 'Unlimited Stacking',
    [FLASH_SALE_COUPON_TYPE.STACKING.CUSTOM]: 'Custom Stacking',
  };
  return labels[stacking] || 'Unknown Stacking';
}

export function flashsalesCouponTypeIsValidCategory(
  category: string
): category is FlashSaleCouponTypeCategory {
  return Object.values(FLASH_SALE_COUPON_TYPE.CATEGORIES).includes(
    category as FlashSaleCouponTypeCategory
  );
}

export function flashsalesCouponTypeIsValidScope(scope: string): scope is FlashSaleCouponTypeScope {
  return Object.values(FLASH_SALE_COUPON_TYPE.SCOPE).includes(scope as FlashSaleCouponTypeScope);
}

export function flashsalesCouponTypeIsValidTrigger(
  trigger: string
): trigger is FlashSaleCouponTypeTrigger {
  return Object.values(FLASH_SALE_COUPON_TYPE.TRIGGER).includes(
    trigger as FlashSaleCouponTypeTrigger
  );
}

export function flashsalesCouponTypeIsStackable(stacking: FlashSaleCouponTypeStacking): boolean {
  const stackableTypes: FlashSaleCouponTypeStacking[] = [
    FLASH_SALE_COUPON_TYPE.STACKING.LIMITED,
    FLASH_SALE_COUPON_TYPE.STACKING.UNLIMITED,
    FLASH_SALE_COUPON_TYPE.STACKING.CUSTOM,
  ];
  return stackableTypes.includes(stacking);
}

export function flashsalesCouponTypeIsExclusive(stacking: FlashSaleCouponTypeStacking): boolean {
  return stacking === FLASH_SALE_COUPON_TYPE.STACKING.NONE;
}

export function flashsalesCouponTypeIsHighPriority(priority: FlashSaleCouponTypePriority): boolean {
  const highPriorities: FlashSaleCouponTypePriority[] = [
    FLASH_SALE_COUPON_TYPE.PRIORITY.HIGH,
    FLASH_SALE_COUPON_TYPE.PRIORITY.CRITICAL,
  ];
  return highPriorities.includes(priority);
}
