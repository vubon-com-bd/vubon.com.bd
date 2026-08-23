/**
 * Notification Digest Type Constants
 * Type definitions and classifications for notification digests
 */

export const NOTIFICATIONDIGEST_TYPE = {
  // Digest Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    SYSTEM: 'system',
    SOCIAL: 'social',
    UPDATES: 'updates',
    SUMMARY: 'summary',
    REPORTS: 'reports',
    ANALYTICS: 'analytics',
    INSIGHTS: 'insights',
    CUSTOM: 'custom',
  } as const,

  // Digest Sub-Types
  SUB_TYPES: {
    // Marketing
    CAMPAIGN_SUMMARY: 'campaign_summary',
    CHANNEL_SUMMARY: 'channel_summary',
    PERFORMANCE_SUMMARY: 'performance_summary',

    // Transactional
    ORDER_SUMMARY: 'order_summary',
    PAYMENT_SUMMARY: 'payment_summary',
    TRANSACTION_SUMMARY: 'transaction_summary',

    // Operational
    ACTIVITY_SUMMARY: 'activity_summary',
    TASK_SUMMARY: 'task_summary',
    STATUS_SUMMARY: 'status_summary',

    // System
    HEALTH_SUMMARY: 'health_summary',
    LOG_SUMMARY: 'log_summary',
    METRIC_SUMMARY: 'metric_summary',

    // Social
    INTERACTION_SUMMARY: 'interaction_summary',
    ENGAGEMENT_SUMMARY: 'engagement_summary',
    SOCIAL_SUMMARY: 'social_summary',

    // Updates
    PRODUCT_UPDATES: 'product_updates',
    FEATURE_UPDATES: 'feature_updates',
    CONTENT_UPDATES: 'content_updates',

    // Summary
    DAILY_SUMMARY: 'daily_summary',
    WEEKLY_SUMMARY: 'weekly_summary',
    MONTHLY_SUMMARY: 'monthly_summary',

    // Reports
    PERFORMANCE_REPORT: 'performance_report',
    ANALYTICS_REPORT: 'analytics_report',
    INSIGHTS_REPORT: 'insights_report',
  } as const,

  // Digest Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,

  // Digest Scope
  SCOPE: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    DEPARTMENT: 'department',
    TEAM: 'team',
    INDIVIDUAL: 'individual',
    SEGMENT: 'segment',
  } as const,

  // Digest Purpose
  PURPOSE: {
    INFORM: 'inform',
    SUMMARIZE: 'summarize',
    UPDATE: 'update',
    INSIGHT: 'insight',
    REPORT: 'report',
    ENGAGE: 'engage',
    ALERT: 'alert',
    EDUCATE: 'educate',
  } as const,
} as const;

// Digest Categories
export type NotificationDigestCategoryType =
  (typeof NOTIFICATIONDIGEST_TYPE.CATEGORIES)[keyof typeof NOTIFICATIONDIGEST_TYPE.CATEGORIES];

// Digest Sub-Types
export type NotificationDigestSubType =
  (typeof NOTIFICATIONDIGEST_TYPE.SUB_TYPES)[keyof typeof NOTIFICATIONDIGEST_TYPE.SUB_TYPES];

// Digest Complexity
export type NotificationDigestComplexity =
  (typeof NOTIFICATIONDIGEST_TYPE.COMPLEXITY)[keyof typeof NOTIFICATIONDIGEST_TYPE.COMPLEXITY];

// Digest Scope
export type NotificationDigestScope =
  (typeof NOTIFICATIONDIGEST_TYPE.SCOPE)[keyof typeof NOTIFICATIONDIGEST_TYPE.SCOPE];

// Digest Purpose
export type NotificationDigestPurpose =
  (typeof NOTIFICATIONDIGEST_TYPE.PURPOSE)[keyof typeof NOTIFICATIONDIGEST_TYPE.PURPOSE];

// Utility Functions
export function notificationdigestGetCategoryLabel(
  category: NotificationDigestCategoryType
): string {
  const labels: Record<NotificationDigestCategoryType, string> = {
    [NOTIFICATIONDIGEST_TYPE.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATIONDIGEST_TYPE.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONDIGEST_TYPE.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONDIGEST_TYPE.CATEGORIES.SYSTEM]: 'System',
    [NOTIFICATIONDIGEST_TYPE.CATEGORIES.SOCIAL]: 'Social',
    [NOTIFICATIONDIGEST_TYPE.CATEGORIES.UPDATES]: 'Updates',
    [NOTIFICATIONDIGEST_TYPE.CATEGORIES.SUMMARY]: 'Summary',
    [NOTIFICATIONDIGEST_TYPE.CATEGORIES.REPORTS]: 'Reports',
    [NOTIFICATIONDIGEST_TYPE.CATEGORIES.ANALYTICS]: 'Analytics',
    [NOTIFICATIONDIGEST_TYPE.CATEGORIES.INSIGHTS]: 'Insights',
    [NOTIFICATIONDIGEST_TYPE.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationdigestGetSubTypeLabel(subType: NotificationDigestSubType): string {
  const labels: Record<NotificationDigestSubType, string> = {
    // Marketing
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.CAMPAIGN_SUMMARY]: 'Campaign Summary',
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.CHANNEL_SUMMARY]: 'Channel Summary',
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.PERFORMANCE_SUMMARY]: 'Performance Summary',

    // Transactional
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.ORDER_SUMMARY]: 'Order Summary',
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.PAYMENT_SUMMARY]: 'Payment Summary',
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.TRANSACTION_SUMMARY]: 'Transaction Summary',

    // Operational
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.ACTIVITY_SUMMARY]: 'Activity Summary',
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.TASK_SUMMARY]: 'Task Summary',
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.STATUS_SUMMARY]: 'Status Summary',

    // System
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.HEALTH_SUMMARY]: 'Health Summary',
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.LOG_SUMMARY]: 'Log Summary',
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.METRIC_SUMMARY]: 'Metric Summary',

    // Social
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.INTERACTION_SUMMARY]: 'Interaction Summary',
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.ENGAGEMENT_SUMMARY]: 'Engagement Summary',
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.SOCIAL_SUMMARY]: 'Social Summary',

    // Updates
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.PRODUCT_UPDATES]: 'Product Updates',
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.FEATURE_UPDATES]: 'Feature Updates',
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.CONTENT_UPDATES]: 'Content Updates',

    // Summary
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.DAILY_SUMMARY]: 'Daily Summary',
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.WEEKLY_SUMMARY]: 'Weekly Summary',
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.MONTHLY_SUMMARY]: 'Monthly Summary',

    // Reports
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.PERFORMANCE_REPORT]: 'Performance Report',
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.ANALYTICS_REPORT]: 'Analytics Report',
    [NOTIFICATIONDIGEST_TYPE.SUB_TYPES.INSIGHTS_REPORT]: 'Insights Report',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function notificationdigestGetComplexityLabel(
  complexity: NotificationDigestComplexity
): string {
  const labels: Record<NotificationDigestComplexity, string> = {
    [NOTIFICATIONDIGEST_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [NOTIFICATIONDIGEST_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [NOTIFICATIONDIGEST_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [NOTIFICATIONDIGEST_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function notificationdigestGetScopeLabel(scope: NotificationDigestScope): string {
  const labels: Record<NotificationDigestScope, string> = {
    [NOTIFICATIONDIGEST_TYPE.SCOPE.GLOBAL]: 'Global',
    [NOTIFICATIONDIGEST_TYPE.SCOPE.REGIONAL]: 'Regional',
    [NOTIFICATIONDIGEST_TYPE.SCOPE.LOCAL]: 'Local',
    [NOTIFICATIONDIGEST_TYPE.SCOPE.DEPARTMENT]: 'Department',
    [NOTIFICATIONDIGEST_TYPE.SCOPE.TEAM]: 'Team',
    [NOTIFICATIONDIGEST_TYPE.SCOPE.INDIVIDUAL]: 'Individual',
    [NOTIFICATIONDIGEST_TYPE.SCOPE.SEGMENT]: 'Segment',
  };
  return labels[scope] || 'Unknown Scope';
}

export function notificationdigestGetPurposeLabel(purpose: NotificationDigestPurpose): string {
  const labels: Record<NotificationDigestPurpose, string> = {
    [NOTIFICATIONDIGEST_TYPE.PURPOSE.INFORM]: 'Inform',
    [NOTIFICATIONDIGEST_TYPE.PURPOSE.SUMMARIZE]: 'Summarize',
    [NOTIFICATIONDIGEST_TYPE.PURPOSE.UPDATE]: 'Update',
    [NOTIFICATIONDIGEST_TYPE.PURPOSE.INSIGHT]: 'Insight',
    [NOTIFICATIONDIGEST_TYPE.PURPOSE.REPORT]: 'Report',
    [NOTIFICATIONDIGEST_TYPE.PURPOSE.ENGAGE]: 'Engage',
    [NOTIFICATIONDIGEST_TYPE.PURPOSE.ALERT]: 'Alert',
    [NOTIFICATIONDIGEST_TYPE.PURPOSE.EDUCATE]: 'Educate',
  };
  return labels[purpose] || 'Unknown Purpose';
}

export function notificationdigestIsMarketingCategory(
  category: NotificationDigestCategoryType
): boolean {
  return category === NOTIFICATIONDIGEST_TYPE.CATEGORIES.MARKETING;
}

export function notificationdigestIsTransactionalCategory(
  category: NotificationDigestCategoryType
): boolean {
  return category === NOTIFICATIONDIGEST_TYPE.CATEGORIES.TRANSACTIONAL;
}

export function notificationdigestIsSystemCategory(
  category: NotificationDigestCategoryType
): boolean {
  const systemCategories: NotificationDigestCategoryType[] = [
    NOTIFICATIONDIGEST_TYPE.CATEGORIES.SYSTEM,
    NOTIFICATIONDIGEST_TYPE.CATEGORIES.OPERATIONAL,
  ];
  return systemCategories.includes(category);
}

export function notificationdigestIsSummaryCategory(
  category: NotificationDigestCategoryType
): boolean {
  return category === NOTIFICATIONDIGEST_TYPE.CATEGORIES.SUMMARY;
}

export function notificationdigestIsReportsCategory(
  category: NotificationDigestCategoryType
): boolean {
  return category === NOTIFICATIONDIGEST_TYPE.CATEGORIES.REPORTS;
}
