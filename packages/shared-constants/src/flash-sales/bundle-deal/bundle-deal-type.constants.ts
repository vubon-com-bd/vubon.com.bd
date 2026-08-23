/**
 * Bundle Deal Type Constants
 * Types and classifications of bundle deals
 */

export const BUNDLE_DEAL_TYPE = {
  // Bundle Categories
  CATEGORIES: {
    PRODUCT: 'product',
    SERVICE: 'service',
    HYBRID: 'hybrid',
    SUBSCRIPTION: 'subscription',
    GIFT: 'gift',
    PROMOTIONAL: 'promotional',
    CLEARANCE: 'clearance',
    EXCLUSIVE: 'exclusive',
  },

  // Bundle Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    STANDARD: 'standard',
    COMPLEX: 'complex',
    ADVANCED: 'advanced',
  },

  // Bundle Scope
  SCOPE: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    SEGMENT: 'segment',
    INDIVIDUAL: 'individual',
  },

  // Bundle Audience
  AUDIENCE: {
    ALL: 'all',
    NEW: 'new',
    RETURNING: 'returning',
    VIP: 'vip',
    MEMBERS: 'members',
    SUBSCRIBERS: 'subscribers',
    FIRST_TIME: 'first_time',
    HIGH_VALUE: 'high_value',
  },

  // Bundle Frequency
  FREQUENCY: {
    ONE_TIME: 'one_time',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    RECURRING: 'recurring',
  },

  // Bundle Trigger
  TRIGGER: {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    TIME_BASED: 'time_based',
    EVENT_BASED: 'event_based',
    CONDITION_BASED: 'condition_based',
  },

  // Bundle Duration
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

// Bundle Categories
export type BundleDealTypeCategory =
  (typeof BUNDLE_DEAL_TYPE.CATEGORIES)[keyof typeof BUNDLE_DEAL_TYPE.CATEGORIES];

// Bundle Complexity
export type BundleDealTypeComplexity =
  (typeof BUNDLE_DEAL_TYPE.COMPLEXITY)[keyof typeof BUNDLE_DEAL_TYPE.COMPLEXITY];

// Bundle Scope
export type BundleDealTypeScope =
  (typeof BUNDLE_DEAL_TYPE.SCOPE)[keyof typeof BUNDLE_DEAL_TYPE.SCOPE];

// Bundle Audience
export type BundleDealTypeAudience =
  (typeof BUNDLE_DEAL_TYPE.AUDIENCE)[keyof typeof BUNDLE_DEAL_TYPE.AUDIENCE];

// Bundle Frequency
export type BundleDealTypeFrequency =
  (typeof BUNDLE_DEAL_TYPE.FREQUENCY)[keyof typeof BUNDLE_DEAL_TYPE.FREQUENCY];

// Bundle Trigger
export type BundleDealTypeTrigger =
  (typeof BUNDLE_DEAL_TYPE.TRIGGER)[keyof typeof BUNDLE_DEAL_TYPE.TRIGGER];

// Bundle Duration
export type BundleDealTypeDuration =
  (typeof BUNDLE_DEAL_TYPE.DURATION)[keyof typeof BUNDLE_DEAL_TYPE.DURATION];

// Utility Functions
export function flashsalesBundleDealTypeGetCategoryLabel(category: BundleDealTypeCategory): string {
  const labels: Record<BundleDealTypeCategory, string> = {
    [BUNDLE_DEAL_TYPE.CATEGORIES.PRODUCT]: 'Product Bundle',
    [BUNDLE_DEAL_TYPE.CATEGORIES.SERVICE]: 'Service Bundle',
    [BUNDLE_DEAL_TYPE.CATEGORIES.HYBRID]: 'Hybrid Bundle',
    [BUNDLE_DEAL_TYPE.CATEGORIES.SUBSCRIPTION]: 'Subscription Bundle',
    [BUNDLE_DEAL_TYPE.CATEGORIES.GIFT]: 'Gift Bundle',
    [BUNDLE_DEAL_TYPE.CATEGORIES.PROMOTIONAL]: 'Promotional Bundle',
    [BUNDLE_DEAL_TYPE.CATEGORIES.CLEARANCE]: 'Clearance Bundle',
    [BUNDLE_DEAL_TYPE.CATEGORIES.EXCLUSIVE]: 'Exclusive Bundle',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesBundleDealTypeGetComplexityLabel(
  complexity: BundleDealTypeComplexity
): string {
  const labels: Record<BundleDealTypeComplexity, string> = {
    [BUNDLE_DEAL_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [BUNDLE_DEAL_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [BUNDLE_DEAL_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [BUNDLE_DEAL_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function flashsalesBundleDealTypeGetScopeLabel(scope: BundleDealTypeScope): string {
  const labels: Record<BundleDealTypeScope, string> = {
    [BUNDLE_DEAL_TYPE.SCOPE.GLOBAL]: 'Global',
    [BUNDLE_DEAL_TYPE.SCOPE.REGIONAL]: 'Regional',
    [BUNDLE_DEAL_TYPE.SCOPE.LOCAL]: 'Local',
    [BUNDLE_DEAL_TYPE.SCOPE.SEGMENT]: 'Segment',
    [BUNDLE_DEAL_TYPE.SCOPE.INDIVIDUAL]: 'Individual',
  };
  return labels[scope] || 'Unknown Scope';
}

export function flashsalesBundleDealTypeGetAudienceLabel(audience: BundleDealTypeAudience): string {
  const labels: Record<BundleDealTypeAudience, string> = {
    [BUNDLE_DEAL_TYPE.AUDIENCE.ALL]: 'All Customers',
    [BUNDLE_DEAL_TYPE.AUDIENCE.NEW]: 'New Customers',
    [BUNDLE_DEAL_TYPE.AUDIENCE.RETURNING]: 'Returning Customers',
    [BUNDLE_DEAL_TYPE.AUDIENCE.VIP]: 'VIP Customers',
    [BUNDLE_DEAL_TYPE.AUDIENCE.MEMBERS]: 'Members',
    [BUNDLE_DEAL_TYPE.AUDIENCE.SUBSCRIBERS]: 'Subscribers',
    [BUNDLE_DEAL_TYPE.AUDIENCE.FIRST_TIME]: 'First Time Buyers',
    [BUNDLE_DEAL_TYPE.AUDIENCE.HIGH_VALUE]: 'High Value Customers',
  };
  return labels[audience] || 'Unknown Audience';
}

export function flashsalesBundleDealTypeGetFrequencyLabel(
  frequency: BundleDealTypeFrequency
): string {
  const labels: Record<BundleDealTypeFrequency, string> = {
    [BUNDLE_DEAL_TYPE.FREQUENCY.ONE_TIME]: 'One Time',
    [BUNDLE_DEAL_TYPE.FREQUENCY.DAILY]: 'Daily',
    [BUNDLE_DEAL_TYPE.FREQUENCY.WEEKLY]: 'Weekly',
    [BUNDLE_DEAL_TYPE.FREQUENCY.MONTHLY]: 'Monthly',
    [BUNDLE_DEAL_TYPE.FREQUENCY.QUARTERLY]: 'Quarterly',
    [BUNDLE_DEAL_TYPE.FREQUENCY.RECURRING]: 'Recurring',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function flashsalesBundleDealTypeGetTriggerLabel(trigger: BundleDealTypeTrigger): string {
  const labels: Record<BundleDealTypeTrigger, string> = {
    [BUNDLE_DEAL_TYPE.TRIGGER.MANUAL]: 'Manual',
    [BUNDLE_DEAL_TYPE.TRIGGER.AUTOMATIC]: 'Automatic',
    [BUNDLE_DEAL_TYPE.TRIGGER.TIME_BASED]: 'Time Based',
    [BUNDLE_DEAL_TYPE.TRIGGER.EVENT_BASED]: 'Event Based',
    [BUNDLE_DEAL_TYPE.TRIGGER.CONDITION_BASED]: 'Condition Based',
  };
  return labels[trigger] || 'Unknown Trigger';
}

export function flashsalesBundleDealTypeGetDurationLabel(duration: BundleDealTypeDuration): string {
  const labels: Record<BundleDealTypeDuration, string> = {
    [BUNDLE_DEAL_TYPE.DURATION.HOURS_1]: '1 Hour',
    [BUNDLE_DEAL_TYPE.DURATION.HOURS_3]: '3 Hours',
    [BUNDLE_DEAL_TYPE.DURATION.HOURS_6]: '6 Hours',
    [BUNDLE_DEAL_TYPE.DURATION.HOURS_12]: '12 Hours',
    [BUNDLE_DEAL_TYPE.DURATION.HOURS_24]: '24 Hours',
    [BUNDLE_DEAL_TYPE.DURATION.DAYS_2]: '2 Days',
    [BUNDLE_DEAL_TYPE.DURATION.DAYS_3]: '3 Days',
    [BUNDLE_DEAL_TYPE.DURATION.DAYS_7]: '7 Days',
    [BUNDLE_DEAL_TYPE.DURATION.DAYS_14]: '14 Days',
    [BUNDLE_DEAL_TYPE.DURATION.DAYS_30]: '30 Days',
    [BUNDLE_DEAL_TYPE.DURATION.CUSTOM]: 'Custom',
  };
  return labels[duration] || 'Unknown Duration';
}

export function flashsalesBundleDealTypeGetDurationHours(duration: BundleDealTypeDuration): number {
  const hours: Record<BundleDealTypeDuration, number> = {
    [BUNDLE_DEAL_TYPE.DURATION.HOURS_1]: 1,
    [BUNDLE_DEAL_TYPE.DURATION.HOURS_3]: 3,
    [BUNDLE_DEAL_TYPE.DURATION.HOURS_6]: 6,
    [BUNDLE_DEAL_TYPE.DURATION.HOURS_12]: 12,
    [BUNDLE_DEAL_TYPE.DURATION.HOURS_24]: 24,
    [BUNDLE_DEAL_TYPE.DURATION.DAYS_2]: 48,
    [BUNDLE_DEAL_TYPE.DURATION.DAYS_3]: 72,
    [BUNDLE_DEAL_TYPE.DURATION.DAYS_7]: 168,
    [BUNDLE_DEAL_TYPE.DURATION.DAYS_14]: 336,
    [BUNDLE_DEAL_TYPE.DURATION.DAYS_30]: 720,
    [BUNDLE_DEAL_TYPE.DURATION.CUSTOM]: 0,
  };
  return hours[duration] || 0;
}

export function flashsalesBundleDealTypeIsValidCategory(
  category: string
): category is BundleDealTypeCategory {
  return Object.values(BUNDLE_DEAL_TYPE.CATEGORIES).includes(category as BundleDealTypeCategory);
}

export function flashsalesBundleDealTypeIsValidAudience(
  audience: string
): audience is BundleDealTypeAudience {
  return Object.values(BUNDLE_DEAL_TYPE.AUDIENCE).includes(audience as BundleDealTypeAudience);
}
