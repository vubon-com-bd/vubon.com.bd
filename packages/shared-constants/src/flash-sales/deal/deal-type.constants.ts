/**
 * Deal Type Constants
 * Types and classifications of deals
 */

export const DEAL_TYPE = {
  // Deal Categories
  CATEGORIES: {
    DISCOUNT: 'discount',
    PROMOTIONAL: 'promotional',
    SEASONAL: 'seasonal',
    CLEARANCE: 'clearance',
    HOLIDAY: 'holiday',
    MEMBERSHIP: 'membership',
    LIMITED: 'limited',
    FLASH: 'flash',
  },

  // Deal Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    STANDARD: 'standard',
    COMPLEX: 'complex',
    ADVANCED: 'advanced',
  },

  // Deal Scope
  SCOPE: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    SEGMENT: 'segment',
    INDIVIDUAL: 'individual',
  },

  // Deal Frequency
  FREQUENCY: {
    ONE_TIME: 'one_time',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    RECURRING: 'recurring',
  },

  // Deal Trigger
  TRIGGER: {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    TIME_BASED: 'time_based',
    EVENT_BASED: 'event_based',
    CONDITION_BASED: 'condition_based',
  },

  // Deal Duration
  DURATION: {
    HOURS_1: '1_hour',
    HOURS_3: '3_hours',
    HOURS_6: '6_hours',
    HOURS_12: '12_hours',
    HOURS_24: '24_hours',
    DAYS_2: '2_days',
    DAYS_3: '3_days',
    DAYS_7: '7_days',
    DAYS_14: '14_days',
    DAYS_30: '30_days',
    CUSTOM: 'custom',
  },
} as const;

// Deal Categories
export type DealTypeCategory = (typeof DEAL_TYPE.CATEGORIES)[keyof typeof DEAL_TYPE.CATEGORIES];

// Deal Complexity
export type DealTypeComplexity = (typeof DEAL_TYPE.COMPLEXITY)[keyof typeof DEAL_TYPE.COMPLEXITY];

// Deal Scope
export type DealTypeScope = (typeof DEAL_TYPE.SCOPE)[keyof typeof DEAL_TYPE.SCOPE];

// Deal Frequency
export type DealTypeFrequency = (typeof DEAL_TYPE.FREQUENCY)[keyof typeof DEAL_TYPE.FREQUENCY];

// Deal Trigger
export type DealTypeTrigger = (typeof DEAL_TYPE.TRIGGER)[keyof typeof DEAL_TYPE.TRIGGER];

// Deal Duration
export type DealTypeDuration = (typeof DEAL_TYPE.DURATION)[keyof typeof DEAL_TYPE.DURATION];

// Utility Functions
export function flashsalesDealTypeGetCategoryLabel(category: DealTypeCategory): string {
  const labels: Record<DealTypeCategory, string> = {
    [DEAL_TYPE.CATEGORIES.DISCOUNT]: 'Discount Deal',
    [DEAL_TYPE.CATEGORIES.PROMOTIONAL]: 'Promotional Deal',
    [DEAL_TYPE.CATEGORIES.SEASONAL]: 'Seasonal Deal',
    [DEAL_TYPE.CATEGORIES.CLEARANCE]: 'Clearance Deal',
    [DEAL_TYPE.CATEGORIES.HOLIDAY]: 'Holiday Deal',
    [DEAL_TYPE.CATEGORIES.MEMBERSHIP]: 'Membership Deal',
    [DEAL_TYPE.CATEGORIES.LIMITED]: 'Limited Edition Deal',
    [DEAL_TYPE.CATEGORIES.FLASH]: 'Flash Deal',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesDealTypeGetComplexityLabel(complexity: DealTypeComplexity): string {
  const labels: Record<DealTypeComplexity, string> = {
    [DEAL_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [DEAL_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [DEAL_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [DEAL_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function flashsalesDealTypeGetScopeLabel(scope: DealTypeScope): string {
  const labels: Record<DealTypeScope, string> = {
    [DEAL_TYPE.SCOPE.GLOBAL]: 'Global',
    [DEAL_TYPE.SCOPE.REGIONAL]: 'Regional',
    [DEAL_TYPE.SCOPE.LOCAL]: 'Local',
    [DEAL_TYPE.SCOPE.SEGMENT]: 'Segment',
    [DEAL_TYPE.SCOPE.INDIVIDUAL]: 'Individual',
  };
  return labels[scope] || 'Unknown Scope';
}

export function flashsalesDealTypeGetFrequencyLabel(frequency: DealTypeFrequency): string {
  const labels: Record<DealTypeFrequency, string> = {
    [DEAL_TYPE.FREQUENCY.ONE_TIME]: 'One Time',
    [DEAL_TYPE.FREQUENCY.DAILY]: 'Daily',
    [DEAL_TYPE.FREQUENCY.WEEKLY]: 'Weekly',
    [DEAL_TYPE.FREQUENCY.MONTHLY]: 'Monthly',
    [DEAL_TYPE.FREQUENCY.QUARTERLY]: 'Quarterly',
    [DEAL_TYPE.FREQUENCY.RECURRING]: 'Recurring',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function flashsalesDealTypeGetTriggerLabel(trigger: DealTypeTrigger): string {
  const labels: Record<DealTypeTrigger, string> = {
    [DEAL_TYPE.TRIGGER.MANUAL]: 'Manual',
    [DEAL_TYPE.TRIGGER.AUTOMATIC]: 'Automatic',
    [DEAL_TYPE.TRIGGER.TIME_BASED]: 'Time Based',
    [DEAL_TYPE.TRIGGER.EVENT_BASED]: 'Event Based',
    [DEAL_TYPE.TRIGGER.CONDITION_BASED]: 'Condition Based',
  };
  return labels[trigger] || 'Unknown Trigger';
}

export function flashsalesDealTypeGetDurationLabel(duration: DealTypeDuration): string {
  const labels: Record<DealTypeDuration, string> = {
    [DEAL_TYPE.DURATION.HOURS_1]: '1 Hour',
    [DEAL_TYPE.DURATION.HOURS_3]: '3 Hours',
    [DEAL_TYPE.DURATION.HOURS_6]: '6 Hours',
    [DEAL_TYPE.DURATION.HOURS_12]: '12 Hours',
    [DEAL_TYPE.DURATION.HOURS_24]: '24 Hours',
    [DEAL_TYPE.DURATION.DAYS_2]: '2 Days',
    [DEAL_TYPE.DURATION.DAYS_3]: '3 Days',
    [DEAL_TYPE.DURATION.DAYS_7]: '7 Days',
    [DEAL_TYPE.DURATION.DAYS_14]: '14 Days',
    [DEAL_TYPE.DURATION.DAYS_30]: '30 Days',
    [DEAL_TYPE.DURATION.CUSTOM]: 'Custom',
  };
  return labels[duration] || 'Unknown Duration';
}

export function flashsalesDealTypeGetDurationHours(duration: DealTypeDuration): number {
  const hours: Record<DealTypeDuration, number> = {
    [DEAL_TYPE.DURATION.HOURS_1]: 1,
    [DEAL_TYPE.DURATION.HOURS_3]: 3,
    [DEAL_TYPE.DURATION.HOURS_6]: 6,
    [DEAL_TYPE.DURATION.HOURS_12]: 12,
    [DEAL_TYPE.DURATION.HOURS_24]: 24,
    [DEAL_TYPE.DURATION.DAYS_2]: 48,
    [DEAL_TYPE.DURATION.DAYS_3]: 72,
    [DEAL_TYPE.DURATION.DAYS_7]: 168,
    [DEAL_TYPE.DURATION.DAYS_14]: 336,
    [DEAL_TYPE.DURATION.DAYS_30]: 720,
    [DEAL_TYPE.DURATION.CUSTOM]: 0,
  };
  return hours[duration] || 0;
}

export function flashsalesDealTypeIsValidCategory(category: string): category is DealTypeCategory {
  return Object.values(DEAL_TYPE.CATEGORIES).includes(category as DealTypeCategory);
}

export function flashsalesDealTypeIsValidScope(scope: string): scope is DealTypeScope {
  return Object.values(DEAL_TYPE.SCOPE).includes(scope as DealTypeScope);
}
