/**
 * Notification Digest Constants
 * Core notification digest configuration and settings
 */

export const NOTIFICATIONDIGEST = {
  // Digest Types
  TYPES: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    CUSTOM: 'custom',
  } as const,

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
    CUSTOM: 'custom',
  } as const,

  // Digest Formats
  FORMATS: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    PDF: 'pdf',
    HTML: 'html',
    JSON: 'json',
    CUSTOM: 'custom',
  } as const,

  // Digest Priorities
  PRIORITIES: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKGROUND: 'background',
  } as const,

  // Digest Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'daily',
    DEFAULT_CATEGORY: 'summary',
    DEFAULT_FORMAT: 'email',
    DEFAULT_PRIORITY: 'medium',
    DEFAULT_MAX_ITEMS: 50,
    DEFAULT_INCLUDE_UNREAD: true,
    DEFAULT_MARK_READ: false,
    DEFAULT_SEND_TIME: '09:00:00',
    DEFAULT_TIMEZONE: 'Asia/Dhaka',
    MAX_ITEMS_PER_DIGEST: 100,
    MAX_RECIPIENTS: 10000,
    DEFAULT_RETRY_ATTEMPTS: 3,
    DEFAULT_TIMEOUT: 30000,
  } as const,

  // Digest Limits
  LIMITS: {
    MIN_ITEMS: 1,
    MAX_ITEMS: 100,
    MIN_RECIPIENTS: 1,
    MAX_RECIPIENTS: 10000,
    MAX_DIGESTS_PER_USER: 10,
    MAX_SCHEDULED_DIGESTS: 50,
    MIN_INTERVAL_HOURS: 1,
    MAX_INTERVAL_DAYS: 365,
  } as const,

  // Digest Errors
  ERRORS: {
    GENERATION_FAILED: 'generation_failed',
    SEND_FAILED: 'send_failed',
    NO_ITEMS: 'no_items',
    RECIPIENT_LIMIT: 'recipient_limit',
    ITEM_LIMIT: 'item_limit',
    SCHEDULE_FAILED: 'schedule_failed',
    PERMISSION_DENIED: 'permission_denied',
    INVALID_FORMAT: 'invalid_format',
    TIMEOUT: 'timeout',
  } as const,
} as const;

// Digest Types
export type NotificationDigestType =
  (typeof NOTIFICATIONDIGEST.TYPES)[keyof typeof NOTIFICATIONDIGEST.TYPES];

// Digest Categories
export type NotificationDigestCategory =
  (typeof NOTIFICATIONDIGEST.CATEGORIES)[keyof typeof NOTIFICATIONDIGEST.CATEGORIES];

// Digest Formats
export type NotificationDigestFormat =
  (typeof NOTIFICATIONDIGEST.FORMATS)[keyof typeof NOTIFICATIONDIGEST.FORMATS];

// Digest Priorities
export type NotificationDigestPriority =
  (typeof NOTIFICATIONDIGEST.PRIORITIES)[keyof typeof NOTIFICATIONDIGEST.PRIORITIES];

// Digest Defaults
export type NotificationDigestDefault =
  (typeof NOTIFICATIONDIGEST.DEFAULTS)[keyof typeof NOTIFICATIONDIGEST.DEFAULTS];

// Digest Limits
export type NotificationDigestLimit =
  (typeof NOTIFICATIONDIGEST.LIMITS)[keyof typeof NOTIFICATIONDIGEST.LIMITS];

// Digest Errors
export type NotificationDigestError =
  (typeof NOTIFICATIONDIGEST.ERRORS)[keyof typeof NOTIFICATIONDIGEST.ERRORS];

// Utility Functions
export function notificationdigestGetTypeLabel(type: NotificationDigestType): string {
  const labels: Record<NotificationDigestType, string> = {
    [NOTIFICATIONDIGEST.TYPES.DAILY]: 'Daily',
    [NOTIFICATIONDIGEST.TYPES.WEEKLY]: 'Weekly',
    [NOTIFICATIONDIGEST.TYPES.BI_WEEKLY]: 'Bi-Weekly',
    [NOTIFICATIONDIGEST.TYPES.MONTHLY]: 'Monthly',
    [NOTIFICATIONDIGEST.TYPES.QUARTERLY]: 'Quarterly',
    [NOTIFICATIONDIGEST.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Digest Type';
}

export function notificationdigestGetCategoryLabel(category: NotificationDigestCategory): string {
  const labels: Record<NotificationDigestCategory, string> = {
    [NOTIFICATIONDIGEST.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATIONDIGEST.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONDIGEST.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONDIGEST.CATEGORIES.SYSTEM]: 'System',
    [NOTIFICATIONDIGEST.CATEGORIES.SOCIAL]: 'Social',
    [NOTIFICATIONDIGEST.CATEGORIES.UPDATES]: 'Updates',
    [NOTIFICATIONDIGEST.CATEGORIES.SUMMARY]: 'Summary',
    [NOTIFICATIONDIGEST.CATEGORIES.REPORTS]: 'Reports',
    [NOTIFICATIONDIGEST.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationdigestGetFormatLabel(format: NotificationDigestFormat): string {
  const labels: Record<NotificationDigestFormat, string> = {
    [NOTIFICATIONDIGEST.FORMATS.EMAIL]: 'Email',
    [NOTIFICATIONDIGEST.FORMATS.SMS]: 'SMS',
    [NOTIFICATIONDIGEST.FORMATS.PUSH]: 'Push',
    [NOTIFICATIONDIGEST.FORMATS.IN_APP]: 'In-App',
    [NOTIFICATIONDIGEST.FORMATS.PDF]: 'PDF',
    [NOTIFICATIONDIGEST.FORMATS.HTML]: 'HTML',
    [NOTIFICATIONDIGEST.FORMATS.JSON]: 'JSON',
    [NOTIFICATIONDIGEST.FORMATS.CUSTOM]: 'Custom',
  };
  return labels[format] || 'Unknown Format';
}

export function notificationdigestGetPriorityLabel(priority: NotificationDigestPriority): string {
  const labels: Record<NotificationDigestPriority, string> = {
    [NOTIFICATIONDIGEST.PRIORITIES.HIGH]: 'High',
    [NOTIFICATIONDIGEST.PRIORITIES.MEDIUM]: 'Medium',
    [NOTIFICATIONDIGEST.PRIORITIES.LOW]: 'Low',
    [NOTIFICATIONDIGEST.PRIORITIES.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown Priority';
}

export function notificationdigestGetErrorLabel(error: NotificationDigestError): string {
  const labels: Record<NotificationDigestError, string> = {
    [NOTIFICATIONDIGEST.ERRORS.GENERATION_FAILED]: 'Generation Failed',
    [NOTIFICATIONDIGEST.ERRORS.SEND_FAILED]: 'Send Failed',
    [NOTIFICATIONDIGEST.ERRORS.NO_ITEMS]: 'No Items',
    [NOTIFICATIONDIGEST.ERRORS.RECIPIENT_LIMIT]: 'Recipient Limit Exceeded',
    [NOTIFICATIONDIGEST.ERRORS.ITEM_LIMIT]: 'Item Limit Exceeded',
    [NOTIFICATIONDIGEST.ERRORS.SCHEDULE_FAILED]: 'Schedule Failed',
    [NOTIFICATIONDIGEST.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
    [NOTIFICATIONDIGEST.ERRORS.INVALID_FORMAT]: 'Invalid Format',
    [NOTIFICATIONDIGEST.ERRORS.TIMEOUT]: 'Timeout',
  };
  return labels[error] || 'Unknown Error';
}

export function notificationdigestGetDefaultMaxItems(): number {
  return NOTIFICATIONDIGEST.DEFAULTS.DEFAULT_MAX_ITEMS;
}

export function notificationdigestGetDefaultSendTime(): string {
  return NOTIFICATIONDIGEST.DEFAULTS.DEFAULT_SEND_TIME;
}

export function notificationdigestIsDaily(type: NotificationDigestType): boolean {
  return type === NOTIFICATIONDIGEST.TYPES.DAILY;
}

export function notificationdigestIsWeekly(type: NotificationDigestType): boolean {
  return type === NOTIFICATIONDIGEST.TYPES.WEEKLY;
}

export function notificationdigestIsMonthly(type: NotificationDigestType): boolean {
  return type === NOTIFICATIONDIGEST.TYPES.MONTHLY;
}

export function notificationdigestIsEmailFormat(format: NotificationDigestFormat): boolean {
  return format === NOTIFICATIONDIGEST.FORMATS.EMAIL;
}

export function notificationdigestIsPDFFormat(format: NotificationDigestFormat): boolean {
  return format === NOTIFICATIONDIGEST.FORMATS.PDF;
}
