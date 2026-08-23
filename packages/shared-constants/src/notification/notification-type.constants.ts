/**
 * Notification Type Constants
 * Type definitions and classifications for notifications
 */

export const NOTIFICATION_TYPE = {
  // Notification Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    SYSTEM: 'system',
    ALERT: 'alert',
    REMINDER: 'reminder',
    UPDATE: 'update',
    PROMOTIONAL: 'promotional',
    SECURITY: 'security',
    SOCIAL: 'social',
    EDUCATIONAL: 'educational',
    FEEDBACK: 'feedback',
    SUPPORT: 'support',
    COMMUNITY: 'community',
  } as const,

  // Notification Sub-Types
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

    // System
    HEALTH_CHECK: 'health_check',
    STATUS_CHANGE: 'status_change',
    CONFIG_CHANGE: 'config_change',

    // Alert
    CRITICAL: 'critical',
    WARNING: 'warning',
    INFO: 'info',

    // Reminder
    APPOINTMENT: 'appointment',
    DEADLINE: 'deadline',
    TASK: 'task',
    FOLLOW_UP: 'follow_up',

    // Update
    PRODUCT_UPDATE: 'product_update',
    PRICE_UPDATE: 'price_update',
    FEATURE_UPDATE: 'feature_update',

    // Security
    LOGIN: 'login',
    PASSWORD_CHANGE: 'password_change',
    TWO_FA: 'two_fa',
    SECURITY_ALERT: 'security_alert',
    DEVICE: 'device',

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
  } as const,

  // Notification Formats
  FORMATS: {
    HTML: 'html',
    TEXT: 'text',
    MARKDOWN: 'markdown',
    JSON: 'json',
    XML: 'xml',
    TEMPLATE: 'template',
    RICH_TEXT: 'rich_text',
    PLAIN_TEXT: 'plain_text',
  } as const,

  // Notification Purposes
  PURPOSES: {
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

  // Notification Urgency
  URGENCY: {
    IMMEDIATE: 'immediate',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKGROUND: 'background',
  } as const,
} as const;

// Notification Categories
export type NotificationCategoryType =
  (typeof NOTIFICATION_TYPE.CATEGORIES)[keyof typeof NOTIFICATION_TYPE.CATEGORIES];

// Notification Sub-Types
export type NotificationSubType =
  (typeof NOTIFICATION_TYPE.SUB_TYPES)[keyof typeof NOTIFICATION_TYPE.SUB_TYPES];

// Notification Formats
export type NotificationFormat =
  (typeof NOTIFICATION_TYPE.FORMATS)[keyof typeof NOTIFICATION_TYPE.FORMATS];

// Notification Purposes
export type NotificationPurpose =
  (typeof NOTIFICATION_TYPE.PURPOSES)[keyof typeof NOTIFICATION_TYPE.PURPOSES];

// Notification Urgency
export type NotificationUrgency =
  (typeof NOTIFICATION_TYPE.URGENCY)[keyof typeof NOTIFICATION_TYPE.URGENCY];

// Utility Functions
export function notificationGetCategoryLabel(category: NotificationCategoryType): string {
  const labels: Record<NotificationCategoryType, string> = {
    [NOTIFICATION_TYPE.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATION_TYPE.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATION_TYPE.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATION_TYPE.CATEGORIES.SYSTEM]: 'System',
    [NOTIFICATION_TYPE.CATEGORIES.ALERT]: 'Alert',
    [NOTIFICATION_TYPE.CATEGORIES.REMINDER]: 'Reminder',
    [NOTIFICATION_TYPE.CATEGORIES.UPDATE]: 'Update',
    [NOTIFICATION_TYPE.CATEGORIES.PROMOTIONAL]: 'Promotional',
    [NOTIFICATION_TYPE.CATEGORIES.SECURITY]: 'Security',
    [NOTIFICATION_TYPE.CATEGORIES.SOCIAL]: 'Social',
    [NOTIFICATION_TYPE.CATEGORIES.EDUCATIONAL]: 'Educational',
    [NOTIFICATION_TYPE.CATEGORIES.FEEDBACK]: 'Feedback',
    [NOTIFICATION_TYPE.CATEGORIES.SUPPORT]: 'Support',
    [NOTIFICATION_TYPE.CATEGORIES.COMMUNITY]: 'Community',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationGetSubTypeLabel(subType: NotificationSubType): string {
  const labels: Record<NotificationSubType, string> = {
    // Marketing
    [NOTIFICATION_TYPE.SUB_TYPES.NEWSLETTER]: 'Newsletter',
    [NOTIFICATION_TYPE.SUB_TYPES.CAMPAIGN]: 'Campaign',
    [NOTIFICATION_TYPE.SUB_TYPES.PROMOTION]: 'Promotion',
    [NOTIFICATION_TYPE.SUB_TYPES.OFFER]: 'Offer',
    [NOTIFICATION_TYPE.SUB_TYPES.EVENT]: 'Event',

    // Transactional
    [NOTIFICATION_TYPE.SUB_TYPES.ORDER]: 'Order',
    [NOTIFICATION_TYPE.SUB_TYPES.PAYMENT]: 'Payment',
    [NOTIFICATION_TYPE.SUB_TYPES.SHIPPING]: 'Shipping',
    [NOTIFICATION_TYPE.SUB_TYPES.DELIVERY]: 'Delivery',
    [NOTIFICATION_TYPE.SUB_TYPES.RETURN]: 'Return',
    [NOTIFICATION_TYPE.SUB_TYPES.REFUND]: 'Refund',

    // Operational
    [NOTIFICATION_TYPE.SUB_TYPES.SYSTEM_UPDATE]: 'System Update',
    [NOTIFICATION_TYPE.SUB_TYPES.MAINTENANCE]: 'Maintenance',
    [NOTIFICATION_TYPE.SUB_TYPES.BACKUP]: 'Backup',
    [NOTIFICATION_TYPE.SUB_TYPES.ERROR]: 'Error',

    // System
    [NOTIFICATION_TYPE.SUB_TYPES.HEALTH_CHECK]: 'Health Check',
    [NOTIFICATION_TYPE.SUB_TYPES.STATUS_CHANGE]: 'Status Change',
    [NOTIFICATION_TYPE.SUB_TYPES.CONFIG_CHANGE]: 'Config Change',

    // Alert
    [NOTIFICATION_TYPE.SUB_TYPES.CRITICAL]: 'Critical Alert',
    [NOTIFICATION_TYPE.SUB_TYPES.WARNING]: 'Warning Alert',
    [NOTIFICATION_TYPE.SUB_TYPES.INFO]: 'Info Alert',

    // Reminder
    [NOTIFICATION_TYPE.SUB_TYPES.APPOINTMENT]: 'Appointment Reminder',
    [NOTIFICATION_TYPE.SUB_TYPES.DEADLINE]: 'Deadline Reminder',
    [NOTIFICATION_TYPE.SUB_TYPES.TASK]: 'Task Reminder',
    [NOTIFICATION_TYPE.SUB_TYPES.FOLLOW_UP]: 'Follow Up Reminder',

    // Update
    [NOTIFICATION_TYPE.SUB_TYPES.PRODUCT_UPDATE]: 'Product Update',
    [NOTIFICATION_TYPE.SUB_TYPES.PRICE_UPDATE]: 'Price Update',
    [NOTIFICATION_TYPE.SUB_TYPES.FEATURE_UPDATE]: 'Feature Update',

    // Security
    [NOTIFICATION_TYPE.SUB_TYPES.LOGIN]: 'Login Notification',
    [NOTIFICATION_TYPE.SUB_TYPES.PASSWORD_CHANGE]: 'Password Change',
    [NOTIFICATION_TYPE.SUB_TYPES.TWO_FA]: '2FA Notification',
    [NOTIFICATION_TYPE.SUB_TYPES.SECURITY_ALERT]: 'Security Alert',
    [NOTIFICATION_TYPE.SUB_TYPES.DEVICE]: 'Device Notification',

    // Social
    [NOTIFICATION_TYPE.SUB_TYPES.FOLLOW]: 'Follow Notification',
    [NOTIFICATION_TYPE.SUB_TYPES.LIKE]: 'Like Notification',
    [NOTIFICATION_TYPE.SUB_TYPES.COMMENT]: 'Comment Notification',
    [NOTIFICATION_TYPE.SUB_TYPES.SHARE]: 'Share Notification',
    [NOTIFICATION_TYPE.SUB_TYPES.MENTION]: 'Mention Notification',

    // Educational
    [NOTIFICATION_TYPE.SUB_TYPES.TUTORIAL]: 'Tutorial',
    [NOTIFICATION_TYPE.SUB_TYPES.TIPS]: 'Tips',
    [NOTIFICATION_TYPE.SUB_TYPES.GUIDE]: 'Guide',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function notificationGetFormatLabel(format: NotificationFormat): string {
  const labels: Record<NotificationFormat, string> = {
    [NOTIFICATION_TYPE.FORMATS.HTML]: 'HTML',
    [NOTIFICATION_TYPE.FORMATS.TEXT]: 'Text',
    [NOTIFICATION_TYPE.FORMATS.MARKDOWN]: 'Markdown',
    [NOTIFICATION_TYPE.FORMATS.JSON]: 'JSON',
    [NOTIFICATION_TYPE.FORMATS.XML]: 'XML',
    [NOTIFICATION_TYPE.FORMATS.TEMPLATE]: 'Template',
    [NOTIFICATION_TYPE.FORMATS.RICH_TEXT]: 'Rich Text',
    [NOTIFICATION_TYPE.FORMATS.PLAIN_TEXT]: 'Plain Text',
  };
  return labels[format] || 'Unknown Format';
}

export function notificationGetPurposeLabel(purpose: NotificationPurpose): string {
  const labels: Record<NotificationPurpose, string> = {
    [NOTIFICATION_TYPE.PURPOSES.INFORM]: 'Inform',
    [NOTIFICATION_TYPE.PURPOSES.ALERT]: 'Alert',
    [NOTIFICATION_TYPE.PURPOSES.REMIND]: 'Remind',
    [NOTIFICATION_TYPE.PURPOSES.ENGAGE]: 'Engage',
    [NOTIFICATION_TYPE.PURPOSES.CONVERT]: 'Convert',
    [NOTIFICATION_TYPE.PURPOSES.RETAIN]: 'Retain',
    [NOTIFICATION_TYPE.PURPOSES.REACTIVATE]: 'Reactivate',
    [NOTIFICATION_TYPE.PURPOSES.EDUCATE]: 'Educate',
    [NOTIFICATION_TYPE.PURPOSES.COMMUNICATE]: 'Communicate',
  };
  return labels[purpose] || 'Unknown Purpose';
}

export function notificationGetUrgencyLabel(urgency: NotificationUrgency): string {
  const labels: Record<NotificationUrgency, string> = {
    [NOTIFICATION_TYPE.URGENCY.IMMEDIATE]: 'Immediate',
    [NOTIFICATION_TYPE.URGENCY.HIGH]: 'High',
    [NOTIFICATION_TYPE.URGENCY.MEDIUM]: 'Medium',
    [NOTIFICATION_TYPE.URGENCY.LOW]: 'Low',
    [NOTIFICATION_TYPE.URGENCY.BACKGROUND]: 'Background',
  };
  return labels[urgency] || 'Unknown Urgency';
}

export function notificationIsMarketingCategory(category: NotificationCategoryType): boolean {
  const marketingCategories: NotificationCategoryType[] = [
    NOTIFICATION_TYPE.CATEGORIES.MARKETING,
    NOTIFICATION_TYPE.CATEGORIES.PROMOTIONAL,
  ];
  return marketingCategories.includes(category);
}

export function notificationIsTransactionalCategory(category: NotificationCategoryType): boolean {
  const transactionalCategories: NotificationCategoryType[] = [
    NOTIFICATION_TYPE.CATEGORIES.TRANSACTIONAL,
    NOTIFICATION_TYPE.CATEGORIES.SECURITY,
  ];
  return transactionalCategories.includes(category);
}

export function notificationIsOperationalCategory(category: NotificationCategoryType): boolean {
  const operationalCategories: NotificationCategoryType[] = [
    NOTIFICATION_TYPE.CATEGORIES.OPERATIONAL,
    NOTIFICATION_TYPE.CATEGORIES.SYSTEM,
  ];
  return operationalCategories.includes(category);
}

export function notificationIsSocialCategory(category: NotificationCategoryType): boolean {
  return category === NOTIFICATION_TYPE.CATEGORIES.SOCIAL;
}

export function notificationIsAlertCategory(category: NotificationCategoryType): boolean {
  return category === NOTIFICATION_TYPE.CATEGORIES.ALERT;
}
