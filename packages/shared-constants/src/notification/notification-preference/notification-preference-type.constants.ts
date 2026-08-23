/**
 * Notification Preference Type Constants
 * Type definitions and classifications for notification preferences
 */

export const NOTIFICATIONPREFERENCE_TYPE = {
  // Preference Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    SYSTEM: 'system',
    SOCIAL: 'social',
    ALERT: 'alert',
    UPDATE: 'update',
    PROMOTIONAL: 'promotional',
    SECURITY: 'security',
    EDUCATIONAL: 'educational',
    ENTERTAINMENT: 'entertainment',
    CUSTOM: 'custom',
  } as const,

  // Preference Sub-Types
  SUB_TYPES: {
    // Channel
    CHANNEL_ENABLED: 'channel_enabled',
    CHANNEL_DISABLED: 'channel_disabled',
    CHANNEL_PREFERRED: 'channel_preferred',

    // Frequency
    FREQUENCY_MIN: 'frequency_min',
    FREQUENCY_MAX: 'frequency_max',
    FREQUENCY_CUSTOM: 'frequency_custom',

    // Category
    CATEGORY_ENABLED: 'category_enabled',
    CATEGORY_DISABLED: 'category_disabled',
    CATEGORY_OPT_IN: 'category_opt_in',
    CATEGORY_OPT_OUT: 'category_opt_out',

    // Priority
    PRIORITY_MIN: 'priority_min',
    PRIORITY_MAX: 'priority_max',
    PRIORITY_CUSTOM: 'priority_custom',

    // DND
    DND_ALWAYS: 'dnd_always',
    DND_SCHEDULED: 'dnd_scheduled',
    DND_UNTIL: 'dnd_until',
    DND_EXCEPTIONS: 'dnd_exceptions',

    // Digest
    DIGEST_ENABLED: 'digest_enabled',
    DIGEST_DISABLED: 'digest_disabled',
    DIGEST_FREQUENCY: 'digest_frequency',
  } as const,

  // Preference Scope
  SCOPE: {
    GLOBAL: 'global',
    USER: 'user',
    ROLE: 'role',
    SEGMENT: 'segment',
    DEPARTMENT: 'department',
    TEAM: 'team',
    INDIVIDUAL: 'individual',
  } as const,

  // Preference Override
  OVERRIDE: {
    NONE: 'none',
    USER: 'user',
    ROLE: 'role',
    SEGMENT: 'segment',
    DEPARTMENT: 'department',
    TEAM: 'team',
    ALL: 'all',
  } as const,

  // Preference Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,
} as const;

// Preference Categories
export type NotificationPreferenceCategoryType =
  (typeof NOTIFICATIONPREFERENCE_TYPE.CATEGORIES)[keyof typeof NOTIFICATIONPREFERENCE_TYPE.CATEGORIES];

// Preference Sub-Types
export type NotificationPreferenceSubType =
  (typeof NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES)[keyof typeof NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES];

// Preference Scope
export type NotificationPreferenceScope =
  (typeof NOTIFICATIONPREFERENCE_TYPE.SCOPE)[keyof typeof NOTIFICATIONPREFERENCE_TYPE.SCOPE];

// Preference Override
export type NotificationPreferenceOverride =
  (typeof NOTIFICATIONPREFERENCE_TYPE.OVERRIDE)[keyof typeof NOTIFICATIONPREFERENCE_TYPE.OVERRIDE];

// Preference Complexity
export type NotificationPreferenceComplexity =
  (typeof NOTIFICATIONPREFERENCE_TYPE.COMPLEXITY)[keyof typeof NOTIFICATIONPREFERENCE_TYPE.COMPLEXITY];

// Utility Functions
export function notificationpreferenceGetCategoryLabel(
  category: NotificationPreferenceCategoryType
): string {
  const labels: Record<NotificationPreferenceCategoryType, string> = {
    [NOTIFICATIONPREFERENCE_TYPE.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATIONPREFERENCE_TYPE.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONPREFERENCE_TYPE.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONPREFERENCE_TYPE.CATEGORIES.SYSTEM]: 'System',
    [NOTIFICATIONPREFERENCE_TYPE.CATEGORIES.SOCIAL]: 'Social',
    [NOTIFICATIONPREFERENCE_TYPE.CATEGORIES.ALERT]: 'Alert',
    [NOTIFICATIONPREFERENCE_TYPE.CATEGORIES.UPDATE]: 'Update',
    [NOTIFICATIONPREFERENCE_TYPE.CATEGORIES.PROMOTIONAL]: 'Promotional',
    [NOTIFICATIONPREFERENCE_TYPE.CATEGORIES.SECURITY]: 'Security',
    [NOTIFICATIONPREFERENCE_TYPE.CATEGORIES.EDUCATIONAL]: 'Educational',
    [NOTIFICATIONPREFERENCE_TYPE.CATEGORIES.ENTERTAINMENT]: 'Entertainment',
    [NOTIFICATIONPREFERENCE_TYPE.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationpreferenceGetSubTypeLabel(
  subType: NotificationPreferenceSubType
): string {
  const labels: Record<NotificationPreferenceSubType, string> = {
    // Channel
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.CHANNEL_ENABLED]: 'Channel Enabled',
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.CHANNEL_DISABLED]: 'Channel Disabled',
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.CHANNEL_PREFERRED]: 'Channel Preferred',

    // Frequency
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.FREQUENCY_MIN]: 'Frequency Min',
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.FREQUENCY_MAX]: 'Frequency Max',
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.FREQUENCY_CUSTOM]: 'Frequency Custom',

    // Category
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.CATEGORY_ENABLED]: 'Category Enabled',
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.CATEGORY_DISABLED]: 'Category Disabled',
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.CATEGORY_OPT_IN]: 'Category Opt-In',
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.CATEGORY_OPT_OUT]: 'Category Opt-Out',

    // Priority
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.PRIORITY_MIN]: 'Priority Min',
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.PRIORITY_MAX]: 'Priority Max',
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.PRIORITY_CUSTOM]: 'Priority Custom',

    // DND
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.DND_ALWAYS]: 'DND Always',
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.DND_SCHEDULED]: 'DND Scheduled',
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.DND_UNTIL]: 'DND Until',
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.DND_EXCEPTIONS]: 'DND Exceptions',

    // Digest
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.DIGEST_ENABLED]: 'Digest Enabled',
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.DIGEST_DISABLED]: 'Digest Disabled',
    [NOTIFICATIONPREFERENCE_TYPE.SUB_TYPES.DIGEST_FREQUENCY]: 'Digest Frequency',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function notificationpreferenceGetScopeLabel(scope: NotificationPreferenceScope): string {
  const labels: Record<NotificationPreferenceScope, string> = {
    [NOTIFICATIONPREFERENCE_TYPE.SCOPE.GLOBAL]: 'Global',
    [NOTIFICATIONPREFERENCE_TYPE.SCOPE.USER]: 'User',
    [NOTIFICATIONPREFERENCE_TYPE.SCOPE.ROLE]: 'Role',
    [NOTIFICATIONPREFERENCE_TYPE.SCOPE.SEGMENT]: 'Segment',
    [NOTIFICATIONPREFERENCE_TYPE.SCOPE.DEPARTMENT]: 'Department',
    [NOTIFICATIONPREFERENCE_TYPE.SCOPE.TEAM]: 'Team',
    [NOTIFICATIONPREFERENCE_TYPE.SCOPE.INDIVIDUAL]: 'Individual',
  };
  return labels[scope] || 'Unknown Scope';
}

export function notificationpreferenceGetOverrideLabel(
  override: NotificationPreferenceOverride
): string {
  const labels: Record<NotificationPreferenceOverride, string> = {
    [NOTIFICATIONPREFERENCE_TYPE.OVERRIDE.NONE]: 'None',
    [NOTIFICATIONPREFERENCE_TYPE.OVERRIDE.USER]: 'User',
    [NOTIFICATIONPREFERENCE_TYPE.OVERRIDE.ROLE]: 'Role',
    [NOTIFICATIONPREFERENCE_TYPE.OVERRIDE.SEGMENT]: 'Segment',
    [NOTIFICATIONPREFERENCE_TYPE.OVERRIDE.DEPARTMENT]: 'Department',
    [NOTIFICATIONPREFERENCE_TYPE.OVERRIDE.TEAM]: 'Team',
    [NOTIFICATIONPREFERENCE_TYPE.OVERRIDE.ALL]: 'All',
  };
  return labels[override] || 'Unknown Override';
}

export function notificationpreferenceGetComplexityLabel(
  complexity: NotificationPreferenceComplexity
): string {
  const labels: Record<NotificationPreferenceComplexity, string> = {
    [NOTIFICATIONPREFERENCE_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [NOTIFICATIONPREFERENCE_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [NOTIFICATIONPREFERENCE_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [NOTIFICATIONPREFERENCE_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function notificationpreferenceIsMarketingCategory(
  category: NotificationPreferenceCategoryType
): boolean {
  return category === NOTIFICATIONPREFERENCE_TYPE.CATEGORIES.MARKETING;
}

export function notificationpreferenceIsTransactionalCategory(
  category: NotificationPreferenceCategoryType
): boolean {
  return category === NOTIFICATIONPREFERENCE_TYPE.CATEGORIES.TRANSACTIONAL;
}

export function notificationpreferenceIsSystemCategory(
  category: NotificationPreferenceCategoryType
): boolean {
  const systemCategories: NotificationPreferenceCategoryType[] = [
    NOTIFICATIONPREFERENCE_TYPE.CATEGORIES.SYSTEM,
    NOTIFICATIONPREFERENCE_TYPE.CATEGORIES.OPERATIONAL,
  ];
  return systemCategories.includes(category);
}

export function notificationpreferenceIsSecurityCategory(
  category: NotificationPreferenceCategoryType
): boolean {
  return category === NOTIFICATIONPREFERENCE_TYPE.CATEGORIES.SECURITY;
}
