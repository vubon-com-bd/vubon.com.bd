/**
 * Notification Broadcast Type Constants
 * Type definitions and classifications for notification broadcasts
 */

export const NOTIFICATIONBROADCAST_TYPE = {
  // Broadcast Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    SYSTEM: 'system',
    ANNOUNCEMENT: 'announcement',
    ALERT: 'alert',
    UPDATE: 'update',
    PROMOTIONAL: 'promotional',
    EDUCATIONAL: 'educational',
    SOCIAL: 'social',
    CUSTOM: 'custom',
  } as const,

  // Broadcast Sub-Types
  SUB_TYPES: {
    // Marketing
    CAMPAIGN: 'campaign',
    PROMOTION: 'promotion',
    OFFER: 'offer',
    EVENT: 'event',
    NEWSLETTER: 'newsletter',

    // Transactional
    ORDER: 'order',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    DELIVERY: 'delivery',

    // Operational
    MAINTENANCE: 'maintenance',
    SYSTEM_UPDATE: 'system_update',
    STATUS: 'status',

    // System
    HEALTH_CHECK: 'health_check',
    CONFIG_CHANGE: 'config_change',

    // Announcement
    COMPANY_NEWS: 'company_news',
    POLICY_CHANGE: 'policy_change',
    NEW_FEATURE: 'new_feature',

    // Alert
    CRITICAL: 'critical',
    WARNING: 'warning',
    INFO: 'info',

    // Update
    PRODUCT_UPDATE: 'product_update',
    PRICE_UPDATE: 'price_update',
  } as const,

  // Broadcast Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,

  // Broadcast Scope
  SCOPE: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    DEPARTMENT: 'department',
    TEAM: 'team',
    SEGMENT: 'segment',
    CUSTOM: 'custom',
  } as const,

  // Broadcast Purpose
  PURPOSE: {
    INFORM: 'inform',
    ALERT: 'alert',
    PROMOTE: 'promote',
    EDUCATE: 'educate',
    ENGAGE: 'engage',
    UPDATE: 'update',
    ANNOUNCE: 'announce',
    WARN: 'warn',
    CELEBRATE: 'celebrate',
  } as const,
} as const;

// Broadcast Categories
export type NotificationBroadcastCategoryType =
  (typeof NOTIFICATIONBROADCAST_TYPE.CATEGORIES)[keyof typeof NOTIFICATIONBROADCAST_TYPE.CATEGORIES];

// Broadcast Sub-Types
export type NotificationBroadcastSubType =
  (typeof NOTIFICATIONBROADCAST_TYPE.SUB_TYPES)[keyof typeof NOTIFICATIONBROADCAST_TYPE.SUB_TYPES];

// Broadcast Complexity
export type NotificationBroadcastComplexity =
  (typeof NOTIFICATIONBROADCAST_TYPE.COMPLEXITY)[keyof typeof NOTIFICATIONBROADCAST_TYPE.COMPLEXITY];

// Broadcast Scope
export type NotificationBroadcastScope =
  (typeof NOTIFICATIONBROADCAST_TYPE.SCOPE)[keyof typeof NOTIFICATIONBROADCAST_TYPE.SCOPE];

// Broadcast Purpose
export type NotificationBroadcastPurpose =
  (typeof NOTIFICATIONBROADCAST_TYPE.PURPOSE)[keyof typeof NOTIFICATIONBROADCAST_TYPE.PURPOSE];

// Utility Functions
export function notificationbroadcastGetCategoryLabel(
  category: NotificationBroadcastCategoryType
): string {
  const labels: Record<NotificationBroadcastCategoryType, string> = {
    [NOTIFICATIONBROADCAST_TYPE.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATIONBROADCAST_TYPE.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONBROADCAST_TYPE.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONBROADCAST_TYPE.CATEGORIES.SYSTEM]: 'System',
    [NOTIFICATIONBROADCAST_TYPE.CATEGORIES.ANNOUNCEMENT]: 'Announcement',
    [NOTIFICATIONBROADCAST_TYPE.CATEGORIES.ALERT]: 'Alert',
    [NOTIFICATIONBROADCAST_TYPE.CATEGORIES.UPDATE]: 'Update',
    [NOTIFICATIONBROADCAST_TYPE.CATEGORIES.PROMOTIONAL]: 'Promotional',
    [NOTIFICATIONBROADCAST_TYPE.CATEGORIES.EDUCATIONAL]: 'Educational',
    [NOTIFICATIONBROADCAST_TYPE.CATEGORIES.SOCIAL]: 'Social',
    [NOTIFICATIONBROADCAST_TYPE.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationbroadcastGetSubTypeLabel(
  subType: NotificationBroadcastSubType
): string {
  const labels: Record<NotificationBroadcastSubType, string> = {
    // Marketing
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.CAMPAIGN]: 'Campaign',
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.PROMOTION]: 'Promotion',
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.OFFER]: 'Offer',
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.EVENT]: 'Event',
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.NEWSLETTER]: 'Newsletter',

    // Transactional
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.ORDER]: 'Order',
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.PAYMENT]: 'Payment',
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.SHIPPING]: 'Shipping',
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.DELIVERY]: 'Delivery',

    // Operational
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.MAINTENANCE]: 'Maintenance',
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.SYSTEM_UPDATE]: 'System Update',
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.STATUS]: 'Status',

    // System
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.HEALTH_CHECK]: 'Health Check',
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.CONFIG_CHANGE]: 'Config Change',

    // Announcement
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.COMPANY_NEWS]: 'Company News',
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.POLICY_CHANGE]: 'Policy Change',
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.NEW_FEATURE]: 'New Feature',

    // Alert
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.CRITICAL]: 'Critical Alert',
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.WARNING]: 'Warning Alert',
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.INFO]: 'Info Alert',

    // Update
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.PRODUCT_UPDATE]: 'Product Update',
    [NOTIFICATIONBROADCAST_TYPE.SUB_TYPES.PRICE_UPDATE]: 'Price Update',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function notificationbroadcastGetComplexityLabel(
  complexity: NotificationBroadcastComplexity
): string {
  const labels: Record<NotificationBroadcastComplexity, string> = {
    [NOTIFICATIONBROADCAST_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [NOTIFICATIONBROADCAST_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [NOTIFICATIONBROADCAST_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [NOTIFICATIONBROADCAST_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function notificationbroadcastGetScopeLabel(scope: NotificationBroadcastScope): string {
  const labels: Record<NotificationBroadcastScope, string> = {
    [NOTIFICATIONBROADCAST_TYPE.SCOPE.GLOBAL]: 'Global',
    [NOTIFICATIONBROADCAST_TYPE.SCOPE.REGIONAL]: 'Regional',
    [NOTIFICATIONBROADCAST_TYPE.SCOPE.LOCAL]: 'Local',
    [NOTIFICATIONBROADCAST_TYPE.SCOPE.DEPARTMENT]: 'Department',
    [NOTIFICATIONBROADCAST_TYPE.SCOPE.TEAM]: 'Team',
    [NOTIFICATIONBROADCAST_TYPE.SCOPE.SEGMENT]: 'Segment',
    [NOTIFICATIONBROADCAST_TYPE.SCOPE.CUSTOM]: 'Custom',
  };
  return labels[scope] || 'Unknown Scope';
}

export function notificationbroadcastGetPurposeLabel(
  purpose: NotificationBroadcastPurpose
): string {
  const labels: Record<NotificationBroadcastPurpose, string> = {
    [NOTIFICATIONBROADCAST_TYPE.PURPOSE.INFORM]: 'Inform',
    [NOTIFICATIONBROADCAST_TYPE.PURPOSE.ALERT]: 'Alert',
    [NOTIFICATIONBROADCAST_TYPE.PURPOSE.PROMOTE]: 'Promote',
    [NOTIFICATIONBROADCAST_TYPE.PURPOSE.EDUCATE]: 'Educate',
    [NOTIFICATIONBROADCAST_TYPE.PURPOSE.ENGAGE]: 'Engage',
    [NOTIFICATIONBROADCAST_TYPE.PURPOSE.UPDATE]: 'Update',
    [NOTIFICATIONBROADCAST_TYPE.PURPOSE.ANNOUNCE]: 'Announce',
    [NOTIFICATIONBROADCAST_TYPE.PURPOSE.WARN]: 'Warn',
    [NOTIFICATIONBROADCAST_TYPE.PURPOSE.CELEBRATE]: 'Celebrate',
  };
  return labels[purpose] || 'Unknown Purpose';
}

export function notificationbroadcastIsMarketingCategory(
  category: NotificationBroadcastCategoryType
): boolean {
  const marketingCategories: NotificationBroadcastCategoryType[] = [
    NOTIFICATIONBROADCAST_TYPE.CATEGORIES.MARKETING,
    NOTIFICATIONBROADCAST_TYPE.CATEGORIES.PROMOTIONAL,
  ];
  return marketingCategories.includes(category);
}

export function notificationbroadcastIsTransactionalCategory(
  category: NotificationBroadcastCategoryType
): boolean {
  return category === NOTIFICATIONBROADCAST_TYPE.CATEGORIES.TRANSACTIONAL;
}

export function notificationbroadcastIsSystemCategory(
  category: NotificationBroadcastCategoryType
): boolean {
  const systemCategories: NotificationBroadcastCategoryType[] = [
    NOTIFICATIONBROADCAST_TYPE.CATEGORIES.SYSTEM,
    NOTIFICATIONBROADCAST_TYPE.CATEGORIES.OPERATIONAL,
  ];
  return systemCategories.includes(category);
}

export function notificationbroadcastIsAnnouncementCategory(
  category: NotificationBroadcastCategoryType
): boolean {
  return category === NOTIFICATIONBROADCAST_TYPE.CATEGORIES.ANNOUNCEMENT;
}
