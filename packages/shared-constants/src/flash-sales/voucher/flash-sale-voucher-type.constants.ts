/**
 * Flash Sale Voucher Type Constants
 * Types and classifications of flash sale vouchers
 */

export const FLASH_SALE_VOUCHER_TYPE = {
  // Voucher Categories
  CATEGORIES: {
    GIFT: 'gift',
    PROMO: 'promo',
    DISCOUNT: 'discount',
    FREEBIE: 'freebie',
    SERVICE: 'service',
    PRODUCT: 'product',
    COMBINATION: 'combination',
    CUSTOM: 'custom',
  },

  // Voucher Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    STANDARD: 'standard',
    COMPLEX: 'complex',
    ADVANCED: 'advanced',
  },

  // Voucher Scope
  SCOPE: {
    GLOBAL: 'global',
    CATEGORY: 'category',
    PRODUCT: 'product',
    SERVICE: 'service',
    USER: 'user',
    SEGMENT: 'segment',
  },

  // Voucher Frequency
  FREQUENCY: {
    ONE_TIME: 'one_time',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    ANNUAL: 'annual',
    RECURRING: 'recurring',
  },

  // Voucher Trigger
  TRIGGER: {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    TIME_BASED: 'time_based',
    EVENT_BASED: 'event_based',
    CONDITION_BASED: 'condition_based',
  },

  // Voucher Usage
  USAGE: {
    SINGLE: 'single',
    MULTIPLE: 'multiple',
    PARTIAL: 'partial',
    FULL: 'full',
    CUSTOM: 'custom',
  },

  // Voucher Priority
  PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },
} as const;

// Voucher Categories
export type FlashSaleVoucherTypeCategory =
  (typeof FLASH_SALE_VOUCHER_TYPE.CATEGORIES)[keyof typeof FLASH_SALE_VOUCHER_TYPE.CATEGORIES];

// Voucher Complexity
export type FlashSaleVoucherTypeComplexity =
  (typeof FLASH_SALE_VOUCHER_TYPE.COMPLEXITY)[keyof typeof FLASH_SALE_VOUCHER_TYPE.COMPLEXITY];

// Voucher Scope
export type FlashSaleVoucherTypeScope =
  (typeof FLASH_SALE_VOUCHER_TYPE.SCOPE)[keyof typeof FLASH_SALE_VOUCHER_TYPE.SCOPE];

// Voucher Frequency
export type FlashSaleVoucherTypeFrequency =
  (typeof FLASH_SALE_VOUCHER_TYPE.FREQUENCY)[keyof typeof FLASH_SALE_VOUCHER_TYPE.FREQUENCY];

// Voucher Trigger
export type FlashSaleVoucherTypeTrigger =
  (typeof FLASH_SALE_VOUCHER_TYPE.TRIGGER)[keyof typeof FLASH_SALE_VOUCHER_TYPE.TRIGGER];

// Voucher Usage
export type FlashSaleVoucherTypeUsage =
  (typeof FLASH_SALE_VOUCHER_TYPE.USAGE)[keyof typeof FLASH_SALE_VOUCHER_TYPE.USAGE];

// Voucher Priority
export type FlashSaleVoucherTypePriority =
  (typeof FLASH_SALE_VOUCHER_TYPE.PRIORITY)[keyof typeof FLASH_SALE_VOUCHER_TYPE.PRIORITY];

// Utility Functions
export function flashsalesVoucherTypeGetCategoryLabel(
  category: FlashSaleVoucherTypeCategory
): string {
  const labels: Record<FlashSaleVoucherTypeCategory, string> = {
    [FLASH_SALE_VOUCHER_TYPE.CATEGORIES.GIFT]: 'Gift Voucher',
    [FLASH_SALE_VOUCHER_TYPE.CATEGORIES.PROMO]: 'Promo Voucher',
    [FLASH_SALE_VOUCHER_TYPE.CATEGORIES.DISCOUNT]: 'Discount Voucher',
    [FLASH_SALE_VOUCHER_TYPE.CATEGORIES.FREEBIE]: 'Freebie Voucher',
    [FLASH_SALE_VOUCHER_TYPE.CATEGORIES.SERVICE]: 'Service Voucher',
    [FLASH_SALE_VOUCHER_TYPE.CATEGORIES.PRODUCT]: 'Product Voucher',
    [FLASH_SALE_VOUCHER_TYPE.CATEGORIES.COMBINATION]: 'Combination Voucher',
    [FLASH_SALE_VOUCHER_TYPE.CATEGORIES.CUSTOM]: 'Custom Voucher',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesVoucherTypeGetComplexityLabel(
  complexity: FlashSaleVoucherTypeComplexity
): string {
  const labels: Record<FlashSaleVoucherTypeComplexity, string> = {
    [FLASH_SALE_VOUCHER_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [FLASH_SALE_VOUCHER_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [FLASH_SALE_VOUCHER_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [FLASH_SALE_VOUCHER_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function flashsalesVoucherTypeGetScopeLabel(scope: FlashSaleVoucherTypeScope): string {
  const labels: Record<FlashSaleVoucherTypeScope, string> = {
    [FLASH_SALE_VOUCHER_TYPE.SCOPE.GLOBAL]: 'Global',
    [FLASH_SALE_VOUCHER_TYPE.SCOPE.CATEGORY]: 'Category',
    [FLASH_SALE_VOUCHER_TYPE.SCOPE.PRODUCT]: 'Product',
    [FLASH_SALE_VOUCHER_TYPE.SCOPE.SERVICE]: 'Service',
    [FLASH_SALE_VOUCHER_TYPE.SCOPE.USER]: 'User',
    [FLASH_SALE_VOUCHER_TYPE.SCOPE.SEGMENT]: 'Segment',
  };
  return labels[scope] || 'Unknown Scope';
}

export function flashsalesVoucherTypeGetFrequencyLabel(
  frequency: FlashSaleVoucherTypeFrequency
): string {
  const labels: Record<FlashSaleVoucherTypeFrequency, string> = {
    [FLASH_SALE_VOUCHER_TYPE.FREQUENCY.ONE_TIME]: 'One Time',
    [FLASH_SALE_VOUCHER_TYPE.FREQUENCY.DAILY]: 'Daily',
    [FLASH_SALE_VOUCHER_TYPE.FREQUENCY.WEEKLY]: 'Weekly',
    [FLASH_SALE_VOUCHER_TYPE.FREQUENCY.MONTHLY]: 'Monthly',
    [FLASH_SALE_VOUCHER_TYPE.FREQUENCY.QUARTERLY]: 'Quarterly',
    [FLASH_SALE_VOUCHER_TYPE.FREQUENCY.ANNUAL]: 'Annual',
    [FLASH_SALE_VOUCHER_TYPE.FREQUENCY.RECURRING]: 'Recurring',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function flashsalesVoucherTypeGetTriggerLabel(trigger: FlashSaleVoucherTypeTrigger): string {
  const labels: Record<FlashSaleVoucherTypeTrigger, string> = {
    [FLASH_SALE_VOUCHER_TYPE.TRIGGER.MANUAL]: 'Manual',
    [FLASH_SALE_VOUCHER_TYPE.TRIGGER.AUTOMATIC]: 'Automatic',
    [FLASH_SALE_VOUCHER_TYPE.TRIGGER.TIME_BASED]: 'Time Based',
    [FLASH_SALE_VOUCHER_TYPE.TRIGGER.EVENT_BASED]: 'Event Based',
    [FLASH_SALE_VOUCHER_TYPE.TRIGGER.CONDITION_BASED]: 'Condition Based',
  };
  return labels[trigger] || 'Unknown Trigger';
}

export function flashsalesVoucherTypeGetUsageLabel(usage: FlashSaleVoucherTypeUsage): string {
  const labels: Record<FlashSaleVoucherTypeUsage, string> = {
    [FLASH_SALE_VOUCHER_TYPE.USAGE.SINGLE]: 'Single Use',
    [FLASH_SALE_VOUCHER_TYPE.USAGE.MULTIPLE]: 'Multiple Use',
    [FLASH_SALE_VOUCHER_TYPE.USAGE.PARTIAL]: 'Partial Use',
    [FLASH_SALE_VOUCHER_TYPE.USAGE.FULL]: 'Full Use',
    [FLASH_SALE_VOUCHER_TYPE.USAGE.CUSTOM]: 'Custom Usage',
  };
  return labels[usage] || 'Unknown Usage';
}

export function flashsalesVoucherTypeGetPriorityLabel(
  priority: FlashSaleVoucherTypePriority
): string {
  const labels: Record<FlashSaleVoucherTypePriority, string> = {
    [FLASH_SALE_VOUCHER_TYPE.PRIORITY.LOW]: 'Low',
    [FLASH_SALE_VOUCHER_TYPE.PRIORITY.MEDIUM]: 'Medium',
    [FLASH_SALE_VOUCHER_TYPE.PRIORITY.HIGH]: 'High',
    [FLASH_SALE_VOUCHER_TYPE.PRIORITY.CRITICAL]: 'Critical',
  };
  return labels[priority] || 'Unknown Priority';
}

export function flashsalesVoucherTypeIsValidCategory(
  category: string
): category is FlashSaleVoucherTypeCategory {
  return Object.values(FLASH_SALE_VOUCHER_TYPE.CATEGORIES).includes(
    category as FlashSaleVoucherTypeCategory
  );
}

export function flashsalesVoucherTypeIsValidScope(
  scope: string
): scope is FlashSaleVoucherTypeScope {
  return Object.values(FLASH_SALE_VOUCHER_TYPE.SCOPE).includes(scope as FlashSaleVoucherTypeScope);
}

export function flashsalesVoucherTypeIsValidTrigger(
  trigger: string
): trigger is FlashSaleVoucherTypeTrigger {
  return Object.values(FLASH_SALE_VOUCHER_TYPE.TRIGGER).includes(
    trigger as FlashSaleVoucherTypeTrigger
  );
}

export function flashsalesVoucherTypeIsRecurring(
  frequency: FlashSaleVoucherTypeFrequency
): boolean {
  const recurringFrequencies: FlashSaleVoucherTypeFrequency[] = [
    FLASH_SALE_VOUCHER_TYPE.FREQUENCY.DAILY,
    FLASH_SALE_VOUCHER_TYPE.FREQUENCY.WEEKLY,
    FLASH_SALE_VOUCHER_TYPE.FREQUENCY.MONTHLY,
    FLASH_SALE_VOUCHER_TYPE.FREQUENCY.QUARTERLY,
    FLASH_SALE_VOUCHER_TYPE.FREQUENCY.ANNUAL,
    FLASH_SALE_VOUCHER_TYPE.FREQUENCY.RECURRING,
  ];
  return recurringFrequencies.includes(frequency);
}

export function flashsalesVoucherTypeIsOneTime(frequency: FlashSaleVoucherTypeFrequency): boolean {
  const oneTimeFrequencies: FlashSaleVoucherTypeFrequency[] = [
    FLASH_SALE_VOUCHER_TYPE.FREQUENCY.ONE_TIME,
  ];
  return oneTimeFrequencies.includes(frequency);
}

export function flashsalesVoucherTypeIsHighPriority(
  priority: FlashSaleVoucherTypePriority
): boolean {
  const highPriorities: FlashSaleVoucherTypePriority[] = [
    FLASH_SALE_VOUCHER_TYPE.PRIORITY.HIGH,
    FLASH_SALE_VOUCHER_TYPE.PRIORITY.CRITICAL,
  ];
  return highPriorities.includes(priority);
}
