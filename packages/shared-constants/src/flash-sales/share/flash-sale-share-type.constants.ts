/**
 * Flash Sale Share Type Constants
 * Types and classifications of flash sale shares
 */

export const FLASH_SALE_SHARE_TYPE = {
  // Share Categories
  CATEGORIES: {
    DIRECT: 'direct',
    INDIRECT: 'indirect',
    REFERRAL: 'referral',
    PROMOTIONAL: 'promotional',
    ORGANIC: 'organic',
    PAID: 'paid',
    INCENTIVIZED: 'incentivized',
  },

  // Share Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    STANDARD: 'standard',
    COMPLEX: 'complex',
    ADVANCED: 'advanced',
  },

  // Share Scope
  SCOPE: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    NETWORK: 'network',
    INDIVIDUAL: 'individual',
  },

  // Share Frequency
  FREQUENCY: {
    ONE_TIME: 'one_time',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    RECURRING: 'recurring',
  },

  // Share Trigger
  TRIGGER: {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    TIME_BASED: 'time_based',
    EVENT_BASED: 'event_based',
    CONDITION_BASED: 'condition_based',
  },

  // Share Priority
  PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Share Engagement
  ENGAGEMENT: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VIRAL: 'viral',
  },
} as const;

// Share Categories
export type FlashSaleShareTypeCategory =
  (typeof FLASH_SALE_SHARE_TYPE.CATEGORIES)[keyof typeof FLASH_SALE_SHARE_TYPE.CATEGORIES];

// Share Complexity
export type FlashSaleShareTypeComplexity =
  (typeof FLASH_SALE_SHARE_TYPE.COMPLEXITY)[keyof typeof FLASH_SALE_SHARE_TYPE.COMPLEXITY];

// Share Scope
export type FlashSaleShareTypeScope =
  (typeof FLASH_SALE_SHARE_TYPE.SCOPE)[keyof typeof FLASH_SALE_SHARE_TYPE.SCOPE];

// Share Frequency
export type FlashSaleShareTypeFrequency =
  (typeof FLASH_SALE_SHARE_TYPE.FREQUENCY)[keyof typeof FLASH_SALE_SHARE_TYPE.FREQUENCY];

// Share Trigger
export type FlashSaleShareTypeTrigger =
  (typeof FLASH_SALE_SHARE_TYPE.TRIGGER)[keyof typeof FLASH_SALE_SHARE_TYPE.TRIGGER];

// Share Priority
export type FlashSaleShareTypePriority =
  (typeof FLASH_SALE_SHARE_TYPE.PRIORITY)[keyof typeof FLASH_SALE_SHARE_TYPE.PRIORITY];

// Share Engagement
export type FlashSaleShareTypeEngagement =
  (typeof FLASH_SALE_SHARE_TYPE.ENGAGEMENT)[keyof typeof FLASH_SALE_SHARE_TYPE.ENGAGEMENT];

// Utility Functions
export function flashsalesShareTypeGetCategoryLabel(category: FlashSaleShareTypeCategory): string {
  const labels: Record<FlashSaleShareTypeCategory, string> = {
    [FLASH_SALE_SHARE_TYPE.CATEGORIES.DIRECT]: 'Direct Share',
    [FLASH_SALE_SHARE_TYPE.CATEGORIES.INDIRECT]: 'Indirect Share',
    [FLASH_SALE_SHARE_TYPE.CATEGORIES.REFERRAL]: 'Referral Share',
    [FLASH_SALE_SHARE_TYPE.CATEGORIES.PROMOTIONAL]: 'Promotional Share',
    [FLASH_SALE_SHARE_TYPE.CATEGORIES.ORGANIC]: 'Organic Share',
    [FLASH_SALE_SHARE_TYPE.CATEGORIES.PAID]: 'Paid Share',
    [FLASH_SALE_SHARE_TYPE.CATEGORIES.INCENTIVIZED]: 'Incentivized Share',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesShareTypeGetComplexityLabel(
  complexity: FlashSaleShareTypeComplexity
): string {
  const labels: Record<FlashSaleShareTypeComplexity, string> = {
    [FLASH_SALE_SHARE_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [FLASH_SALE_SHARE_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [FLASH_SALE_SHARE_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [FLASH_SALE_SHARE_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function flashsalesShareTypeGetScopeLabel(scope: FlashSaleShareTypeScope): string {
  const labels: Record<FlashSaleShareTypeScope, string> = {
    [FLASH_SALE_SHARE_TYPE.SCOPE.GLOBAL]: 'Global',
    [FLASH_SALE_SHARE_TYPE.SCOPE.REGIONAL]: 'Regional',
    [FLASH_SALE_SHARE_TYPE.SCOPE.LOCAL]: 'Local',
    [FLASH_SALE_SHARE_TYPE.SCOPE.NETWORK]: 'Network',
    [FLASH_SALE_SHARE_TYPE.SCOPE.INDIVIDUAL]: 'Individual',
  };
  return labels[scope] || 'Unknown Scope';
}

export function flashsalesShareTypeGetFrequencyLabel(
  frequency: FlashSaleShareTypeFrequency
): string {
  const labels: Record<FlashSaleShareTypeFrequency, string> = {
    [FLASH_SALE_SHARE_TYPE.FREQUENCY.ONE_TIME]: 'One Time',
    [FLASH_SALE_SHARE_TYPE.FREQUENCY.DAILY]: 'Daily',
    [FLASH_SALE_SHARE_TYPE.FREQUENCY.WEEKLY]: 'Weekly',
    [FLASH_SALE_SHARE_TYPE.FREQUENCY.MONTHLY]: 'Monthly',
    [FLASH_SALE_SHARE_TYPE.FREQUENCY.RECURRING]: 'Recurring',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function flashsalesShareTypeGetTriggerLabel(trigger: FlashSaleShareTypeTrigger): string {
  const labels: Record<FlashSaleShareTypeTrigger, string> = {
    [FLASH_SALE_SHARE_TYPE.TRIGGER.MANUAL]: 'Manual',
    [FLASH_SALE_SHARE_TYPE.TRIGGER.AUTOMATIC]: 'Automatic',
    [FLASH_SALE_SHARE_TYPE.TRIGGER.TIME_BASED]: 'Time Based',
    [FLASH_SALE_SHARE_TYPE.TRIGGER.EVENT_BASED]: 'Event Based',
    [FLASH_SALE_SHARE_TYPE.TRIGGER.CONDITION_BASED]: 'Condition Based',
  };
  return labels[trigger] || 'Unknown Trigger';
}

export function flashsalesShareTypeGetPriorityLabel(priority: FlashSaleShareTypePriority): string {
  const labels: Record<FlashSaleShareTypePriority, string> = {
    [FLASH_SALE_SHARE_TYPE.PRIORITY.LOW]: 'Low',
    [FLASH_SALE_SHARE_TYPE.PRIORITY.MEDIUM]: 'Medium',
    [FLASH_SALE_SHARE_TYPE.PRIORITY.HIGH]: 'High',
    [FLASH_SALE_SHARE_TYPE.PRIORITY.CRITICAL]: 'Critical',
  };
  return labels[priority] || 'Unknown Priority';
}

export function flashsalesShareTypeGetEngagementLabel(
  engagement: FlashSaleShareTypeEngagement
): string {
  const labels: Record<FlashSaleShareTypeEngagement, string> = {
    [FLASH_SALE_SHARE_TYPE.ENGAGEMENT.LOW]: 'Low Engagement',
    [FLASH_SALE_SHARE_TYPE.ENGAGEMENT.MEDIUM]: 'Medium Engagement',
    [FLASH_SALE_SHARE_TYPE.ENGAGEMENT.HIGH]: 'High Engagement',
    [FLASH_SALE_SHARE_TYPE.ENGAGEMENT.VIRAL]: 'Viral Engagement',
  };
  return labels[engagement] || 'Unknown Engagement';
}

export function flashsalesShareTypeIsValidCategory(
  category: string
): category is FlashSaleShareTypeCategory {
  return Object.values(FLASH_SALE_SHARE_TYPE.CATEGORIES).includes(
    category as FlashSaleShareTypeCategory
  );
}

export function flashsalesShareTypeIsValidScope(scope: string): scope is FlashSaleShareTypeScope {
  return Object.values(FLASH_SALE_SHARE_TYPE.SCOPE).includes(scope as FlashSaleShareTypeScope);
}

export function flashsalesShareTypeIsValidTrigger(
  trigger: string
): trigger is FlashSaleShareTypeTrigger {
  return Object.values(FLASH_SALE_SHARE_TYPE.TRIGGER).includes(
    trigger as FlashSaleShareTypeTrigger
  );
}

export function flashsalesShareTypeIsHighPriority(priority: FlashSaleShareTypePriority): boolean {
  const highPriorities: FlashSaleShareTypePriority[] = [
    FLASH_SALE_SHARE_TYPE.PRIORITY.HIGH,
    FLASH_SALE_SHARE_TYPE.PRIORITY.CRITICAL,
  ];
  return highPriorities.includes(priority);
}

export function flashsalesShareTypeIsRecurring(frequency: FlashSaleShareTypeFrequency): boolean {
  const recurringFrequencies: FlashSaleShareTypeFrequency[] = [
    FLASH_SALE_SHARE_TYPE.FREQUENCY.DAILY,
    FLASH_SALE_SHARE_TYPE.FREQUENCY.WEEKLY,
    FLASH_SALE_SHARE_TYPE.FREQUENCY.MONTHLY,
    FLASH_SALE_SHARE_TYPE.FREQUENCY.RECURRING,
  ];
  return recurringFrequencies.includes(frequency);
}

export function flashsalesShareTypeIsViral(engagement: FlashSaleShareTypeEngagement): boolean {
  return engagement === FLASH_SALE_SHARE_TYPE.ENGAGEMENT.VIRAL;
}
