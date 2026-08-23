/**
 * Flash Sale Type Constants
 * Types and classifications of flash sales
 */

export const FLASH_SALE_TYPE = {
  // Sale Categories
  CATEGORIES: {
    PROMOTIONAL: 'promotional',
    CLEARANCE: 'clearance',
    SEASONAL: 'seasonal',
    HOLIDAY: 'holiday',
    MEMBERSHIP: 'membership',
    LIMITED: 'limited',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    SPECIAL: 'special',
    BOGO: 'bogo',
    BUNDLE: 'bundle',
  } as const,

  // Sale Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    STANDARD: 'standard',
    COMPLEX: 'complex',
    ADVANCED: 'advanced',
  } as const,

  // Sale Scope
  SCOPE: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    CHANNEL: 'channel',
    SEGMENT: 'segment',
    INDIVIDUAL: 'individual',
  } as const,

  // Sale Audience
  AUDIENCE: {
    ALL: 'all',
    NEW: 'new',
    RETURNING: 'returning',
    VIP: 'vip',
    MEMBERS: 'members',
    SUBSCRIBERS: 'subscribers',
    FIRST_TIME: 'first_time',
    HIGH_VALUE: 'high_value',
  } as const,

  // Sale Channel
  CHANNEL: {
    ALL: 'all',
    WEBSITE: 'website',
    MOBILE_APP: 'mobile_app',
    STORE: 'store',
    SOCIAL_MEDIA: 'social_media',
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
  } as const,

  // Sale Trigger
  TRIGGER: {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    EVENT_BASED: 'event_based',
    TIME_BASED: 'time_based',
    CONDITION_BASED: 'condition_based',
  } as const,

  // Sale Engagement
  ENGAGEMENT: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VIRAL: 'viral',
  } as const,

  // Sale Performance
  PERFORMANCE: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    EXCEPTIONAL: 'exceptional',
  } as const,
} as const;

// Sale Categories
export type FlashSaleTypeCategory =
  (typeof FLASH_SALE_TYPE.CATEGORIES)[keyof typeof FLASH_SALE_TYPE.CATEGORIES];

// Sale Complexity
export type FlashSaleTypeComplexity =
  (typeof FLASH_SALE_TYPE.COMPLEXITY)[keyof typeof FLASH_SALE_TYPE.COMPLEXITY];

// Sale Scope
export type FlashSaleTypeScope = (typeof FLASH_SALE_TYPE.SCOPE)[keyof typeof FLASH_SALE_TYPE.SCOPE];

// Sale Audience
export type FlashSaleTypeAudience =
  (typeof FLASH_SALE_TYPE.AUDIENCE)[keyof typeof FLASH_SALE_TYPE.AUDIENCE];

// Sale Channel
export type FlashSaleTypeChannel =
  (typeof FLASH_SALE_TYPE.CHANNEL)[keyof typeof FLASH_SALE_TYPE.CHANNEL];

// Sale Trigger
export type FlashSaleTypeTrigger =
  (typeof FLASH_SALE_TYPE.TRIGGER)[keyof typeof FLASH_SALE_TYPE.TRIGGER];

// Sale Engagement
export type FlashSaleTypeEngagement =
  (typeof FLASH_SALE_TYPE.ENGAGEMENT)[keyof typeof FLASH_SALE_TYPE.ENGAGEMENT];

// Sale Performance
export type FlashSaleTypePerformance =
  (typeof FLASH_SALE_TYPE.PERFORMANCE)[keyof typeof FLASH_SALE_TYPE.PERFORMANCE];

// Utility Functions
export function flashSaleTypeGetCategoryLabel(category: FlashSaleTypeCategory): string {
  const labels: Record<FlashSaleTypeCategory, string> = {
    [FLASH_SALE_TYPE.CATEGORIES.PROMOTIONAL]: 'Promotional Sale',
    [FLASH_SALE_TYPE.CATEGORIES.CLEARANCE]: 'Clearance Sale',
    [FLASH_SALE_TYPE.CATEGORIES.SEASONAL]: 'Seasonal Sale',
    [FLASH_SALE_TYPE.CATEGORIES.HOLIDAY]: 'Holiday Sale',
    [FLASH_SALE_TYPE.CATEGORIES.MEMBERSHIP]: 'Membership Sale',
    [FLASH_SALE_TYPE.CATEGORIES.LIMITED]: 'Limited Edition Sale',
    [FLASH_SALE_TYPE.CATEGORIES.DAILY]: 'Daily Sale',
    [FLASH_SALE_TYPE.CATEGORIES.WEEKLY]: 'Weekly Sale',
    [FLASH_SALE_TYPE.CATEGORIES.MONTHLY]: 'Monthly Sale',
    [FLASH_SALE_TYPE.CATEGORIES.SPECIAL]: 'Special Sale',
    [FLASH_SALE_TYPE.CATEGORIES.BOGO]: 'Buy One Get One Sale',
    [FLASH_SALE_TYPE.CATEGORIES.BUNDLE]: 'Bundle Sale',
  };
  return labels[category] || 'Unknown Category';
}

export function flashSaleTypeGetComplexityLabel(complexity: FlashSaleTypeComplexity): string {
  const labels: Record<FlashSaleTypeComplexity, string> = {
    [FLASH_SALE_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [FLASH_SALE_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [FLASH_SALE_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [FLASH_SALE_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function flashSaleTypeGetScopeLabel(scope: FlashSaleTypeScope): string {
  const labels: Record<FlashSaleTypeScope, string> = {
    [FLASH_SALE_TYPE.SCOPE.GLOBAL]: 'Global',
    [FLASH_SALE_TYPE.SCOPE.REGIONAL]: 'Regional',
    [FLASH_SALE_TYPE.SCOPE.LOCAL]: 'Local',
    [FLASH_SALE_TYPE.SCOPE.CHANNEL]: 'Channel',
    [FLASH_SALE_TYPE.SCOPE.SEGMENT]: 'Segment',
    [FLASH_SALE_TYPE.SCOPE.INDIVIDUAL]: 'Individual',
  };
  return labels[scope] || 'Unknown Scope';
}

export function flashSaleTypeGetAudienceLabel(audience: FlashSaleTypeAudience): string {
  const labels: Record<FlashSaleTypeAudience, string> = {
    [FLASH_SALE_TYPE.AUDIENCE.ALL]: 'All Customers',
    [FLASH_SALE_TYPE.AUDIENCE.NEW]: 'New Customers',
    [FLASH_SALE_TYPE.AUDIENCE.RETURNING]: 'Returning Customers',
    [FLASH_SALE_TYPE.AUDIENCE.VIP]: 'VIP Customers',
    [FLASH_SALE_TYPE.AUDIENCE.MEMBERS]: 'Members',
    [FLASH_SALE_TYPE.AUDIENCE.SUBSCRIBERS]: 'Subscribers',
    [FLASH_SALE_TYPE.AUDIENCE.FIRST_TIME]: 'First Time Buyers',
    [FLASH_SALE_TYPE.AUDIENCE.HIGH_VALUE]: 'High Value Customers',
  };
  return labels[audience] || 'Unknown Audience';
}

export function flashSaleTypeGetChannelLabel(channel: FlashSaleTypeChannel): string {
  const labels: Record<FlashSaleTypeChannel, string> = {
    [FLASH_SALE_TYPE.CHANNEL.ALL]: 'All Channels',
    [FLASH_SALE_TYPE.CHANNEL.WEBSITE]: 'Website',
    [FLASH_SALE_TYPE.CHANNEL.MOBILE_APP]: 'Mobile App',
    [FLASH_SALE_TYPE.CHANNEL.STORE]: 'Physical Store',
    [FLASH_SALE_TYPE.CHANNEL.SOCIAL_MEDIA]: 'Social Media',
    [FLASH_SALE_TYPE.CHANNEL.EMAIL]: 'Email',
    [FLASH_SALE_TYPE.CHANNEL.SMS]: 'SMS',
    [FLASH_SALE_TYPE.CHANNEL.PUSH]: 'Push Notification',
  };
  return labels[channel] || 'Unknown Channel';
}

export function flashSaleTypeGetTriggerLabel(trigger: FlashSaleTypeTrigger): string {
  const labels: Record<FlashSaleTypeTrigger, string> = {
    [FLASH_SALE_TYPE.TRIGGER.MANUAL]: 'Manual',
    [FLASH_SALE_TYPE.TRIGGER.AUTOMATIC]: 'Automatic',
    [FLASH_SALE_TYPE.TRIGGER.EVENT_BASED]: 'Event Based',
    [FLASH_SALE_TYPE.TRIGGER.TIME_BASED]: 'Time Based',
    [FLASH_SALE_TYPE.TRIGGER.CONDITION_BASED]: 'Condition Based',
  };
  return labels[trigger] || 'Unknown Trigger';
}

export function flashSaleTypeGetEngagementLabel(engagement: FlashSaleTypeEngagement): string {
  const labels: Record<FlashSaleTypeEngagement, string> = {
    [FLASH_SALE_TYPE.ENGAGEMENT.LOW]: 'Low Engagement',
    [FLASH_SALE_TYPE.ENGAGEMENT.MEDIUM]: 'Medium Engagement',
    [FLASH_SALE_TYPE.ENGAGEMENT.HIGH]: 'High Engagement',
    [FLASH_SALE_TYPE.ENGAGEMENT.VIRAL]: 'Viral Engagement',
  };
  return labels[engagement] || 'Unknown Engagement';
}

export function flashSaleTypeGetPerformanceLabel(performance: FlashSaleTypePerformance): string {
  const labels: Record<FlashSaleTypePerformance, string> = {
    [FLASH_SALE_TYPE.PERFORMANCE.LOW]: 'Low Performance',
    [FLASH_SALE_TYPE.PERFORMANCE.MEDIUM]: 'Medium Performance',
    [FLASH_SALE_TYPE.PERFORMANCE.HIGH]: 'High Performance',
    [FLASH_SALE_TYPE.PERFORMANCE.EXCEPTIONAL]: 'Exceptional Performance',
  };
  return labels[performance] || 'Unknown Performance';
}

export function flashSaleTypeIsValidCategory(category: string): category is FlashSaleTypeCategory {
  return Object.values(FLASH_SALE_TYPE.CATEGORIES).includes(category as FlashSaleTypeCategory);
}

export function flashSaleTypeIsValidAudience(audience: string): audience is FlashSaleTypeAudience {
  return Object.values(FLASH_SALE_TYPE.AUDIENCE).includes(audience as FlashSaleTypeAudience);
}
