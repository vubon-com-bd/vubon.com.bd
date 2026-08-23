/**
 * Notification Template Type Constants
 * Type definitions and classifications for notification templates
 */

export const NOTIFICATIONTEMPLATE_TYPE = {
  // Template Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    SYSTEM: 'system',
    SECURITY: 'security',
    SOCIAL: 'social',
    EDUCATIONAL: 'educational',
    PROMOTIONAL: 'promotional',
    ALERT: 'alert',
    REMINDER: 'reminder',
    UPDATE: 'update',
    CUSTOM: 'custom',
  } as const,

  // Template Sub-Types
  SUB_TYPES: {
    // Marketing
    NEWSLETTER: 'newsletter',
    CAMPAIGN: 'campaign',
    PROMOTION: 'promotion',
    OFFER: 'offer',
    EVENT: 'event',

    // Transactional
    ORDER: 'order',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    DELIVERY: 'delivery',
    RETURN: 'return',
    REFUND: 'refund',

    // Operational
    SYSTEM_UPDATE: 'system_update',
    MAINTENANCE: 'maintenance',
    BACKUP: 'backup',
    ERROR: 'error',

    // Security
    LOGIN: 'login',
    PASSWORD_CHANGE: 'password_change',
    TWO_FA: 'two_fa',
    SECURITY_ALERT: 'security_alert',

    // Social
    FOLLOW: 'follow',
    LIKE: 'like',
    COMMENT: 'comment',
    SHARE: 'share',
    MENTION: 'mention',

    // Educational
    TUTORIAL: 'tutorial',
    TIPS: 'tips',
    GUIDE: 'guide',

    // Alert
    CRITICAL: 'critical',
    WARNING: 'warning',
    INFO: 'info',

    // Reminder
    APPOINTMENT: 'appointment',
    DEADLINE: 'deadline',
    TASK: 'task',
    FOLLOW_UP: 'follow_up',
  } as const,

  // Template Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,

  // Template Scope
  SCOPE: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    DEPARTMENT: 'department',
    TEAM: 'team',
    INDIVIDUAL: 'individual',
  } as const,

  // Template Purpose
  PURPOSE: {
    INFORM: 'inform',
    ALERT: 'alert',
    REMIND: 'remind',
    ENGAGE: 'engage',
    CONVERT: 'convert',
    RETAIN: 'retain',
    REACTIVATE: 'reactivate',
    EDUCATE: 'educate',
    COMMUNICATE: 'communicate',
  } as const,
} as const;

// Template Categories
export type NotificationTemplateCategoryType =
  (typeof NOTIFICATIONTEMPLATE_TYPE.CATEGORIES)[keyof typeof NOTIFICATIONTEMPLATE_TYPE.CATEGORIES];

// Template Sub-Types
export type NotificationTemplateSubType =
  (typeof NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES)[keyof typeof NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES];

// Template Complexity
export type NotificationTemplateComplexity =
  (typeof NOTIFICATIONTEMPLATE_TYPE.COMPLEXITY)[keyof typeof NOTIFICATIONTEMPLATE_TYPE.COMPLEXITY];

// Template Scope
export type NotificationTemplateScope =
  (typeof NOTIFICATIONTEMPLATE_TYPE.SCOPE)[keyof typeof NOTIFICATIONTEMPLATE_TYPE.SCOPE];

// Template Purpose
export type NotificationTemplatePurpose =
  (typeof NOTIFICATIONTEMPLATE_TYPE.PURPOSE)[keyof typeof NOTIFICATIONTEMPLATE_TYPE.PURPOSE];

// Utility Functions
export function notificationtemplateGetCategoryLabel(
  category: NotificationTemplateCategoryType
): string {
  const labels: Record<NotificationTemplateCategoryType, string> = {
    [NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.SYSTEM]: 'System',
    [NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.SECURITY]: 'Security',
    [NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.SOCIAL]: 'Social',
    [NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.EDUCATIONAL]: 'Educational',
    [NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.PROMOTIONAL]: 'Promotional',
    [NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.ALERT]: 'Alert',
    [NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.REMINDER]: 'Reminder',
    [NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.UPDATE]: 'Update',
    [NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationtemplateGetSubTypeLabel(subType: NotificationTemplateSubType): string {
  const labels: Record<NotificationTemplateSubType, string> = {
    // Marketing
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.NEWSLETTER]: 'Newsletter',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.CAMPAIGN]: 'Campaign',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.PROMOTION]: 'Promotion',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.OFFER]: 'Offer',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.EVENT]: 'Event',

    // Transactional
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.ORDER]: 'Order',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.PAYMENT]: 'Payment',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.SHIPPING]: 'Shipping',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.DELIVERY]: 'Delivery',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.RETURN]: 'Return',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.REFUND]: 'Refund',

    // Operational
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.SYSTEM_UPDATE]: 'System Update',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.MAINTENANCE]: 'Maintenance',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.BACKUP]: 'Backup',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.ERROR]: 'Error',

    // Security
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.LOGIN]: 'Login',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.PASSWORD_CHANGE]: 'Password Change',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.TWO_FA]: '2FA',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.SECURITY_ALERT]: 'Security Alert',

    // Social
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.FOLLOW]: 'Follow',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.LIKE]: 'Like',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.COMMENT]: 'Comment',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.SHARE]: 'Share',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.MENTION]: 'Mention',

    // Educational
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.TUTORIAL]: 'Tutorial',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.TIPS]: 'Tips',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.GUIDE]: 'Guide',

    // Alert
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.CRITICAL]: 'Critical Alert',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.WARNING]: 'Warning Alert',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.INFO]: 'Info Alert',

    // Reminder
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.APPOINTMENT]: 'Appointment',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.DEADLINE]: 'Deadline',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.TASK]: 'Task',
    [NOTIFICATIONTEMPLATE_TYPE.SUB_TYPES.FOLLOW_UP]: 'Follow Up',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function notificationtemplateGetComplexityLabel(
  complexity: NotificationTemplateComplexity
): string {
  const labels: Record<NotificationTemplateComplexity, string> = {
    [NOTIFICATIONTEMPLATE_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [NOTIFICATIONTEMPLATE_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [NOTIFICATIONTEMPLATE_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [NOTIFICATIONTEMPLATE_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function notificationtemplateGetScopeLabel(scope: NotificationTemplateScope): string {
  const labels: Record<NotificationTemplateScope, string> = {
    [NOTIFICATIONTEMPLATE_TYPE.SCOPE.GLOBAL]: 'Global',
    [NOTIFICATIONTEMPLATE_TYPE.SCOPE.REGIONAL]: 'Regional',
    [NOTIFICATIONTEMPLATE_TYPE.SCOPE.LOCAL]: 'Local',
    [NOTIFICATIONTEMPLATE_TYPE.SCOPE.DEPARTMENT]: 'Department',
    [NOTIFICATIONTEMPLATE_TYPE.SCOPE.TEAM]: 'Team',
    [NOTIFICATIONTEMPLATE_TYPE.SCOPE.INDIVIDUAL]: 'Individual',
  };
  return labels[scope] || 'Unknown Scope';
}

export function notificationtemplateGetPurposeLabel(purpose: NotificationTemplatePurpose): string {
  const labels: Record<NotificationTemplatePurpose, string> = {
    [NOTIFICATIONTEMPLATE_TYPE.PURPOSE.INFORM]: 'Inform',
    [NOTIFICATIONTEMPLATE_TYPE.PURPOSE.ALERT]: 'Alert',
    [NOTIFICATIONTEMPLATE_TYPE.PURPOSE.REMIND]: 'Remind',
    [NOTIFICATIONTEMPLATE_TYPE.PURPOSE.ENGAGE]: 'Engage',
    [NOTIFICATIONTEMPLATE_TYPE.PURPOSE.CONVERT]: 'Convert',
    [NOTIFICATIONTEMPLATE_TYPE.PURPOSE.RETAIN]: 'Retain',
    [NOTIFICATIONTEMPLATE_TYPE.PURPOSE.REACTIVATE]: 'Reactivate',
    [NOTIFICATIONTEMPLATE_TYPE.PURPOSE.EDUCATE]: 'Educate',
    [NOTIFICATIONTEMPLATE_TYPE.PURPOSE.COMMUNICATE]: 'Communicate',
  };
  return labels[purpose] || 'Unknown Purpose';
}

export function notificationtemplateIsMarketingCategory(
  category: NotificationTemplateCategoryType
): boolean {
  const marketingCategories: NotificationTemplateCategoryType[] = [
    NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.MARKETING,
    NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.PROMOTIONAL,
  ];
  return marketingCategories.includes(category);
}

export function notificationtemplateIsTransactionalCategory(
  category: NotificationTemplateCategoryType
): boolean {
  const transactionalCategories: NotificationTemplateCategoryType[] = [
    NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.TRANSACTIONAL,
    NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.SECURITY,
  ];
  return transactionalCategories.includes(category);
}

export function notificationtemplateIsSystemCategory(
  category: NotificationTemplateCategoryType
): boolean {
  const systemCategories: NotificationTemplateCategoryType[] = [
    NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.SYSTEM,
    NOTIFICATIONTEMPLATE_TYPE.CATEGORIES.OPERATIONAL,
  ];
  return systemCategories.includes(category);
}
