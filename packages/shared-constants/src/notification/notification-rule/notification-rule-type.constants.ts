/**
 * Notification Rule Type Constants
 * Type definitions and classifications for notification rules
 */

export const NOTIFICATIONRULE_TYPE = {
  // Rule Categories
  CATEGORIES: {
    USER: 'user',
    CONTENT: 'content',
    CHANNEL: 'channel',
    TIME: 'time',
    LOCATION: 'location',
    DEVICE: 'device',
    BEHAVIOR: 'behavior',
    PREFERENCE: 'preference',
    SEGMENT: 'segment',
    ROLE: 'role',
    PERMISSION: 'permission',
    CUSTOM: 'custom',
  } as const,

  // Rule Sub-Types
  SUB_TYPES: {
    // User
    USER_ID: 'user_id',
    USER_TYPE: 'user_type',
    USER_STATUS: 'user_status',
    USER_SEGMENT: 'user_segment',
    USER_ROLE: 'user_role',

    // Content
    CONTENT_TYPE: 'content_type',
    CONTENT_CATEGORY: 'content_category',
    CONTENT_PRIORITY: 'content_priority',
    CONTENT_TAGS: 'content_tags',

    // Channel
    CHANNEL_TYPE: 'channel_type',
    CHANNEL_STATUS: 'channel_status',
    CHANNEL_PREFERENCE: 'channel_preference',

    // Time
    TIME_RANGE: 'time_range',
    DAY_OF_WEEK: 'day_of_week',
    DATE_RANGE: 'date_range',

    // Location
    REGION: 'region',
    COUNTRY: 'country',
    CITY: 'city',
    TIMEZONE: 'timezone',

    // Device
    DEVICE_TYPE: 'device_type',
    OS_TYPE: 'os_type',
    BROWSER_TYPE: 'browser_type',

    // Behavior
    LAST_ACTIVITY: 'last_activity',
    PURCHASE_HISTORY: 'purchase_history',
    ENGAGEMENT_SCORE: 'engagement_score',

    // Preference
    NOTIFICATION_PREFERENCE: 'notification_preference',
    FREQUENCY_PREFERENCE: 'frequency_preference',

    // Segment
    SEGMENT_ID: 'segment_id',
    SEGMENT_TYPE: 'segment_type',

    // Role
    ROLE_ID: 'role_id',
    ROLE_TYPE: 'role_type',

    // Permission
    PERMISSION_ID: 'permission_id',
    PERMISSION_TYPE: 'permission_type',
  } as const,

  // Rule Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,

  // Rule Scope
  SCOPE: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    DEPARTMENT: 'department',
    TEAM: 'team',
    INDIVIDUAL: 'individual',
  } as const,

  // Rule Evaluation Order
  EVALUATION_ORDER: {
    FIRST: 'first',
    PRIORITY: 'priority',
    SEQUENTIAL: 'sequential',
    PARALLEL: 'parallel',
  } as const,
} as const;

// Rule Categories
export type NotificationRuleCategoryType =
  (typeof NOTIFICATIONRULE_TYPE.CATEGORIES)[keyof typeof NOTIFICATIONRULE_TYPE.CATEGORIES];

// Rule Sub-Types
export type NotificationRuleSubType =
  (typeof NOTIFICATIONRULE_TYPE.SUB_TYPES)[keyof typeof NOTIFICATIONRULE_TYPE.SUB_TYPES];

// Rule Complexity
export type NotificationRuleComplexity =
  (typeof NOTIFICATIONRULE_TYPE.COMPLEXITY)[keyof typeof NOTIFICATIONRULE_TYPE.COMPLEXITY];

// Rule Scope
export type NotificationRuleScope =
  (typeof NOTIFICATIONRULE_TYPE.SCOPE)[keyof typeof NOTIFICATIONRULE_TYPE.SCOPE];

// Rule Evaluation Order
export type NotificationRuleEvaluationOrder =
  (typeof NOTIFICATIONRULE_TYPE.EVALUATION_ORDER)[keyof typeof NOTIFICATIONRULE_TYPE.EVALUATION_ORDER];

// Utility Functions
export function notificationruleGetCategoryLabel(category: NotificationRuleCategoryType): string {
  const labels: Record<NotificationRuleCategoryType, string> = {
    [NOTIFICATIONRULE_TYPE.CATEGORIES.USER]: 'User',
    [NOTIFICATIONRULE_TYPE.CATEGORIES.CONTENT]: 'Content',
    [NOTIFICATIONRULE_TYPE.CATEGORIES.CHANNEL]: 'Channel',
    [NOTIFICATIONRULE_TYPE.CATEGORIES.TIME]: 'Time',
    [NOTIFICATIONRULE_TYPE.CATEGORIES.LOCATION]: 'Location',
    [NOTIFICATIONRULE_TYPE.CATEGORIES.DEVICE]: 'Device',
    [NOTIFICATIONRULE_TYPE.CATEGORIES.BEHAVIOR]: 'Behavior',
    [NOTIFICATIONRULE_TYPE.CATEGORIES.PREFERENCE]: 'Preference',
    [NOTIFICATIONRULE_TYPE.CATEGORIES.SEGMENT]: 'Segment',
    [NOTIFICATIONRULE_TYPE.CATEGORIES.ROLE]: 'Role',
    [NOTIFICATIONRULE_TYPE.CATEGORIES.PERMISSION]: 'Permission',
    [NOTIFICATIONRULE_TYPE.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationruleGetSubTypeLabel(subType: NotificationRuleSubType): string {
  const labels: Record<NotificationRuleSubType, string> = {
    // User
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.USER_ID]: 'User ID',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.USER_TYPE]: 'User Type',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.USER_STATUS]: 'User Status',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.USER_SEGMENT]: 'User Segment',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.USER_ROLE]: 'User Role',

    // Content
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.CONTENT_TYPE]: 'Content Type',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.CONTENT_CATEGORY]: 'Content Category',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.CONTENT_PRIORITY]: 'Content Priority',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.CONTENT_TAGS]: 'Content Tags',

    // Channel
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.CHANNEL_TYPE]: 'Channel Type',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.CHANNEL_STATUS]: 'Channel Status',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.CHANNEL_PREFERENCE]: 'Channel Preference',

    // Time
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.TIME_RANGE]: 'Time Range',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.DAY_OF_WEEK]: 'Day of Week',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.DATE_RANGE]: 'Date Range',

    // Location
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.REGION]: 'Region',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.COUNTRY]: 'Country',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.CITY]: 'City',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.TIMEZONE]: 'Timezone',

    // Device
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.DEVICE_TYPE]: 'Device Type',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.OS_TYPE]: 'OS Type',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.BROWSER_TYPE]: 'Browser Type',

    // Behavior
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.LAST_ACTIVITY]: 'Last Activity',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.PURCHASE_HISTORY]: 'Purchase History',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.ENGAGEMENT_SCORE]: 'Engagement Score',

    // Preference
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.NOTIFICATION_PREFERENCE]: 'Notification Preference',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.FREQUENCY_PREFERENCE]: 'Frequency Preference',

    // Segment
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.SEGMENT_ID]: 'Segment ID',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.SEGMENT_TYPE]: 'Segment Type',

    // Role
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.ROLE_ID]: 'Role ID',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.ROLE_TYPE]: 'Role Type',

    // Permission
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.PERMISSION_ID]: 'Permission ID',
    [NOTIFICATIONRULE_TYPE.SUB_TYPES.PERMISSION_TYPE]: 'Permission Type',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function notificationruleGetComplexityLabel(complexity: NotificationRuleComplexity): string {
  const labels: Record<NotificationRuleComplexity, string> = {
    [NOTIFICATIONRULE_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [NOTIFICATIONRULE_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [NOTIFICATIONRULE_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [NOTIFICATIONRULE_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function notificationruleGetScopeLabel(scope: NotificationRuleScope): string {
  const labels: Record<NotificationRuleScope, string> = {
    [NOTIFICATIONRULE_TYPE.SCOPE.GLOBAL]: 'Global',
    [NOTIFICATIONRULE_TYPE.SCOPE.REGIONAL]: 'Regional',
    [NOTIFICATIONRULE_TYPE.SCOPE.LOCAL]: 'Local',
    [NOTIFICATIONRULE_TYPE.SCOPE.DEPARTMENT]: 'Department',
    [NOTIFICATIONRULE_TYPE.SCOPE.TEAM]: 'Team',
    [NOTIFICATIONRULE_TYPE.SCOPE.INDIVIDUAL]: 'Individual',
  };
  return labels[scope] || 'Unknown Scope';
}

export function notificationruleGetEvaluationOrderLabel(
  order: NotificationRuleEvaluationOrder
): string {
  const labels: Record<NotificationRuleEvaluationOrder, string> = {
    [NOTIFICATIONRULE_TYPE.EVALUATION_ORDER.FIRST]: 'First',
    [NOTIFICATIONRULE_TYPE.EVALUATION_ORDER.PRIORITY]: 'Priority',
    [NOTIFICATIONRULE_TYPE.EVALUATION_ORDER.SEQUENTIAL]: 'Sequential',
    [NOTIFICATIONRULE_TYPE.EVALUATION_ORDER.PARALLEL]: 'Parallel',
  };
  return labels[order] || 'Unknown Evaluation Order';
}

export function notificationruleIsUserCategory(category: NotificationRuleCategoryType): boolean {
  return category === NOTIFICATIONRULE_TYPE.CATEGORIES.USER;
}

export function notificationruleIsContentCategory(category: NotificationRuleCategoryType): boolean {
  return category === NOTIFICATIONRULE_TYPE.CATEGORIES.CONTENT;
}

export function notificationruleIsChannelCategory(category: NotificationRuleCategoryType): boolean {
  return category === NOTIFICATIONRULE_TYPE.CATEGORIES.CHANNEL;
}

export function notificationruleIsTimeCategory(category: NotificationRuleCategoryType): boolean {
  return category === NOTIFICATIONRULE_TYPE.CATEGORIES.TIME;
}
