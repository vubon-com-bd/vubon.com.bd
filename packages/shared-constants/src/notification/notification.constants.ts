/**
 * Notification Constants
 * Core notification configuration and settings
 */

export const NOTIFICATION = {
  // Notification Types
  TYPES: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    WEBHOOK: 'webhook',
    SLACK: 'slack',
    TEAMS: 'teams',
    DISCORD: 'discord',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    CUSTOM: 'custom',
  } as const,

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
  } as const,

  // Notification Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKGROUND: 'background',
  } as const,

  // Notification Channels
  CHANNELS: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    WEBHOOK: 'webhook',
    SLACK: 'slack',
    TEAMS: 'teams',
    DISCORD: 'discord',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    BROWSER: 'browser',
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
    ALL: 'all',
  } as const,

  // Notification Statuses
  STATUSES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    SENT: 'sent',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    QUEUED: 'queued',
    SCHEDULED: 'scheduled',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
    DRAFT: 'draft',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    READ: 'read',
    UNREAD: 'unread',
  } as const,

  // Notification Delivery Statuses
  DELIVERY_STATUSES: {
    PENDING: 'pending',
    QUEUED: 'queued',
    SENT: 'sent',
    DELIVERED: 'delivered',
    BOUNCED: 'bounced',
    FAILED: 'failed',
    REJECTED: 'rejected',
    DEFERRED: 'deferred',
    OPENED: 'opened',
    CLICKED: 'clicked',
    UNSUBSCRIBED: 'unsubscribed',
    SPAM: 'spam',
    COMPLAINED: 'complained',
  } as const,

  // Notification Read Statuses
  READ_STATUSES: {
    UNREAD: 'unread',
    READ: 'read',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
  } as const,

  // Notification Actions
  ACTIONS: {
    VIEW: 'view',
    CLICK: 'click',
    DISMISS: 'dismiss',
    SNOOZE: 'snooze',
    REPLY: 'reply',
    FORWARD: 'forward',
    DELETE: 'delete',
    ARCHIVE: 'archive',
    MARK_READ: 'mark_read',
    MARK_UNREAD: 'mark_unread',
    FOLLOW: 'follow',
    UNFOLLOW: 'unfollow',
    LIKE: 'like',
    SHARE: 'share',
    SAVE: 'save',
    REPORT: 'report',
    BLOCK: 'block',
    UNSUBSCRIBE: 'unsubscribe',
    RESUBSCRIBE: 'resubscribe',
    CUSTOM: 'custom',
  } as const,

  // Notification Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'email',
    DEFAULT_CATEGORY: 'marketing',
    DEFAULT_PRIORITY: 'medium',
    DEFAULT_CHANNEL: 'email',
    DEFAULT_STATUS: 'pending',
    DEFAULT_DELIVERY_STATUS: 'pending',
    DEFAULT_READ_STATUS: 'unread',
    DEFAULT_RETRY_ATTEMPTS: 3,
    DEFAULT_RETRY_DELAY: 300000, // 5 minutes
    DEFAULT_TIMEOUT: 30000, // 30 seconds
    DEFAULT_BATCH_SIZE: 100,
    MAX_RETRY_ATTEMPTS: 5,
    MAX_CONCURRENT_DELIVERIES: 10,
    DEFAULT_PAGE_SIZE: 50,
    MAX_PAGE_SIZE: 500,
    DEFAULT_DATA_RETENTION_DAYS: 365,
    DEFAULT_SCHEDULE_TIMEZONE: 'Asia/Dhaka',
    DEFAULT_SCHEDULE_FREQUENCY: 'daily',
  } as const,

  // Notification Limits
  LIMITS: {
    MIN_TITLE_LENGTH: 3,
    MAX_TITLE_LENGTH: 100,
    MAX_BODY_LENGTH: 5000,
    MAX_SUBJECT_LENGTH: 200,
    MAX_RECIPIENTS: 10000,
    MAX_ATTACHMENTS: 10,
    MAX_ATTACHMENT_SIZE_MB: 10,
    MAX_TAGS_PER_NOTIFICATION: 20,
    MAX_METADATA_SIZE_KB: 100,
    MAX_SCHEDULES_PER_NOTIFICATION: 10,
    MAX_TEMPLATES_PER_NOTIFICATION: 5,
  } as const,

  // Notification Errors
  ERRORS: {
    DELIVERY_FAILED: 'delivery_failed',
    RATE_LIMIT: 'rate_limit',
    PERMISSION_DENIED: 'permission_denied',
    INVALID_RECIPIENT: 'invalid_recipient',
    INVALID_TEMPLATE: 'invalid_template',
    INVALID_CHANNEL: 'invalid_channel',
    TIMEOUT: 'timeout',
    AUTHENTICATION_ERROR: 'authentication_error',
    NETWORK_ERROR: 'network_error',
    RESOURCE_EXHAUSTED: 'resource_exhausted',
    CONFIGURATION_ERROR: 'configuration_error',
    VALIDATION_ERROR: 'validation_error',
  } as const,
} as const;

// Notification Types
export type NotificationType = (typeof NOTIFICATION.TYPES)[keyof typeof NOTIFICATION.TYPES];

// Notification Categories
export type NotificationCategory =
  (typeof NOTIFICATION.CATEGORIES)[keyof typeof NOTIFICATION.CATEGORIES];

// Notification Priorities
export type NotificationPriority =
  (typeof NOTIFICATION.PRIORITIES)[keyof typeof NOTIFICATION.PRIORITIES];

// Notification Channels
export type NotificationChannel =
  (typeof NOTIFICATION.CHANNELS)[keyof typeof NOTIFICATION.CHANNELS];

// Notification Statuses
export type NotificationStatus = (typeof NOTIFICATION.STATUSES)[keyof typeof NOTIFICATION.STATUSES];

// Notification Delivery Statuses
export type NotificationDeliveryStatus =
  (typeof NOTIFICATION.DELIVERY_STATUSES)[keyof typeof NOTIFICATION.DELIVERY_STATUSES];

// Notification Read Statuses
export type NotificationReadStatus =
  (typeof NOTIFICATION.READ_STATUSES)[keyof typeof NOTIFICATION.READ_STATUSES];

// Notification Actions
export type NotificationAction = (typeof NOTIFICATION.ACTIONS)[keyof typeof NOTIFICATION.ACTIONS];

// Notification Defaults
export type NotificationDefault =
  (typeof NOTIFICATION.DEFAULTS)[keyof typeof NOTIFICATION.DEFAULTS];

// Notification Limits
export type NotificationLimit = (typeof NOTIFICATION.LIMITS)[keyof typeof NOTIFICATION.LIMITS];

// Notification Errors
export type NotificationError = (typeof NOTIFICATION.ERRORS)[keyof typeof NOTIFICATION.ERRORS];

// Utility Functions
export function notificationGetTypeLabel(type: NotificationType): string {
  const labels: Record<NotificationType, string> = {
    [NOTIFICATION.TYPES.EMAIL]: 'Email',
    [NOTIFICATION.TYPES.SMS]: 'SMS',
    [NOTIFICATION.TYPES.PUSH]: 'Push Notification',
    [NOTIFICATION.TYPES.IN_APP]: 'In-App Notification',
    [NOTIFICATION.TYPES.WEBHOOK]: 'Webhook',
    [NOTIFICATION.TYPES.SLACK]: 'Slack',
    [NOTIFICATION.TYPES.TEAMS]: 'Microsoft Teams',
    [NOTIFICATION.TYPES.DISCORD]: 'Discord',
    [NOTIFICATION.TYPES.WHATSAPP]: 'WhatsApp',
    [NOTIFICATION.TYPES.TELEGRAM]: 'Telegram',
    [NOTIFICATION.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Notification Type';
}

export function notificationGetCategoryLabel(category: NotificationCategory): string {
  const labels: Record<NotificationCategory, string> = {
    [NOTIFICATION.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATION.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATION.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATION.CATEGORIES.SYSTEM]: 'System',
    [NOTIFICATION.CATEGORIES.ALERT]: 'Alert',
    [NOTIFICATION.CATEGORIES.REMINDER]: 'Reminder',
    [NOTIFICATION.CATEGORIES.UPDATE]: 'Update',
    [NOTIFICATION.CATEGORIES.PROMOTIONAL]: 'Promotional',
    [NOTIFICATION.CATEGORIES.SECURITY]: 'Security',
    [NOTIFICATION.CATEGORIES.SOCIAL]: 'Social',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationGetPriorityLabel(priority: NotificationPriority): string {
  const labels: Record<NotificationPriority, string> = {
    [NOTIFICATION.PRIORITIES.CRITICAL]: 'Critical',
    [NOTIFICATION.PRIORITIES.HIGH]: 'High',
    [NOTIFICATION.PRIORITIES.MEDIUM]: 'Medium',
    [NOTIFICATION.PRIORITIES.LOW]: 'Low',
    [NOTIFICATION.PRIORITIES.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown Priority';
}

export function notificationGetChannelLabel(channel: NotificationChannel): string {
  const labels: Record<NotificationChannel, string> = {
    [NOTIFICATION.CHANNELS.EMAIL]: 'Email',
    [NOTIFICATION.CHANNELS.SMS]: 'SMS',
    [NOTIFICATION.CHANNELS.PUSH]: 'Push',
    [NOTIFICATION.CHANNELS.IN_APP]: 'In-App',
    [NOTIFICATION.CHANNELS.WEBHOOK]: 'Webhook',
    [NOTIFICATION.CHANNELS.SLACK]: 'Slack',
    [NOTIFICATION.CHANNELS.TEAMS]: 'Microsoft Teams',
    [NOTIFICATION.CHANNELS.DISCORD]: 'Discord',
    [NOTIFICATION.CHANNELS.WHATSAPP]: 'WhatsApp',
    [NOTIFICATION.CHANNELS.TELEGRAM]: 'Telegram',
    [NOTIFICATION.CHANNELS.BROWSER]: 'Browser',
    [NOTIFICATION.CHANNELS.DESKTOP]: 'Desktop',
    [NOTIFICATION.CHANNELS.MOBILE]: 'Mobile',
    [NOTIFICATION.CHANNELS.ALL]: 'All Channels',
  };
  return labels[channel] || 'Unknown Channel';
}

export function notificationGetStatusLabel(status: NotificationStatus): string {
  const labels: Record<NotificationStatus, string> = {
    [NOTIFICATION.STATUSES.PENDING]: 'Pending',
    [NOTIFICATION.STATUSES.PROCESSING]: 'Processing',
    [NOTIFICATION.STATUSES.SENT]: 'Sent',
    [NOTIFICATION.STATUSES.DELIVERED]: 'Delivered',
    [NOTIFICATION.STATUSES.FAILED]: 'Failed',
    [NOTIFICATION.STATUSES.QUEUED]: 'Queued',
    [NOTIFICATION.STATUSES.SCHEDULED]: 'Scheduled',
    [NOTIFICATION.STATUSES.CANCELLED]: 'Cancelled',
    [NOTIFICATION.STATUSES.ARCHIVED]: 'Archived',
    [NOTIFICATION.STATUSES.DRAFT]: 'Draft',
    [NOTIFICATION.STATUSES.APPROVED]: 'Approved',
    [NOTIFICATION.STATUSES.REJECTED]: 'Rejected',
    [NOTIFICATION.STATUSES.READ]: 'Read',
    [NOTIFICATION.STATUSES.UNREAD]: 'Unread',
  };
  return labels[status] || 'Unknown Status';
}

export function notificationGetDeliveryStatusLabel(status: NotificationDeliveryStatus): string {
  const labels: Record<NotificationDeliveryStatus, string> = {
    [NOTIFICATION.DELIVERY_STATUSES.PENDING]: 'Pending',
    [NOTIFICATION.DELIVERY_STATUSES.QUEUED]: 'Queued',
    [NOTIFICATION.DELIVERY_STATUSES.SENT]: 'Sent',
    [NOTIFICATION.DELIVERY_STATUSES.DELIVERED]: 'Delivered',
    [NOTIFICATION.DELIVERY_STATUSES.BOUNCED]: 'Bounced',
    [NOTIFICATION.DELIVERY_STATUSES.FAILED]: 'Failed',
    [NOTIFICATION.DELIVERY_STATUSES.REJECTED]: 'Rejected',
    [NOTIFICATION.DELIVERY_STATUSES.DEFERRED]: 'Deferred',
    [NOTIFICATION.DELIVERY_STATUSES.OPENED]: 'Opened',
    [NOTIFICATION.DELIVERY_STATUSES.CLICKED]: 'Clicked',
    [NOTIFICATION.DELIVERY_STATUSES.UNSUBSCRIBED]: 'Unsubscribed',
    [NOTIFICATION.DELIVERY_STATUSES.SPAM]: 'Spam',
    [NOTIFICATION.DELIVERY_STATUSES.COMPLAINED]: 'Complained',
  };
  return labels[status] || 'Unknown Delivery Status';
}

export function notificationGetReadStatusLabel(status: NotificationReadStatus): string {
  const labels: Record<NotificationReadStatus, string> = {
    [NOTIFICATION.READ_STATUSES.UNREAD]: 'Unread',
    [NOTIFICATION.READ_STATUSES.READ]: 'Read',
    [NOTIFICATION.READ_STATUSES.ARCHIVED]: 'Archived',
    [NOTIFICATION.READ_STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Read Status';
}

export function notificationGetActionLabel(action: NotificationAction): string {
  const labels: Record<NotificationAction, string> = {
    [NOTIFICATION.ACTIONS.VIEW]: 'View',
    [NOTIFICATION.ACTIONS.CLICK]: 'Click',
    [NOTIFICATION.ACTIONS.DISMISS]: 'Dismiss',
    [NOTIFICATION.ACTIONS.SNOOZE]: 'Snooze',
    [NOTIFICATION.ACTIONS.REPLY]: 'Reply',
    [NOTIFICATION.ACTIONS.FORWARD]: 'Forward',
    [NOTIFICATION.ACTIONS.DELETE]: 'Delete',
    [NOTIFICATION.ACTIONS.ARCHIVE]: 'Archive',
    [NOTIFICATION.ACTIONS.MARK_READ]: 'Mark as Read',
    [NOTIFICATION.ACTIONS.MARK_UNREAD]: 'Mark as Unread',
    [NOTIFICATION.ACTIONS.FOLLOW]: 'Follow',
    [NOTIFICATION.ACTIONS.UNFOLLOW]: 'Unfollow',
    [NOTIFICATION.ACTIONS.LIKE]: 'Like',
    [NOTIFICATION.ACTIONS.SHARE]: 'Share',
    [NOTIFICATION.ACTIONS.SAVE]: 'Save',
    [NOTIFICATION.ACTIONS.REPORT]: 'Report',
    [NOTIFICATION.ACTIONS.BLOCK]: 'Block',
    [NOTIFICATION.ACTIONS.UNSUBSCRIBE]: 'Unsubscribe',
    [NOTIFICATION.ACTIONS.RESUBSCRIBE]: 'Resubscribe',
    [NOTIFICATION.ACTIONS.CUSTOM]: 'Custom',
  };
  return labels[action] || 'Unknown Action';
}

export function notificationGetErrorLabel(error: NotificationError): string {
  const labels: Record<NotificationError, string> = {
    [NOTIFICATION.ERRORS.DELIVERY_FAILED]: 'Delivery Failed',
    [NOTIFICATION.ERRORS.RATE_LIMIT]: 'Rate Limit Exceeded',
    [NOTIFICATION.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
    [NOTIFICATION.ERRORS.INVALID_RECIPIENT]: 'Invalid Recipient',
    [NOTIFICATION.ERRORS.INVALID_TEMPLATE]: 'Invalid Template',
    [NOTIFICATION.ERRORS.INVALID_CHANNEL]: 'Invalid Channel',
    [NOTIFICATION.ERRORS.TIMEOUT]: 'Timeout',
    [NOTIFICATION.ERRORS.AUTHENTICATION_ERROR]: 'Authentication Error',
    [NOTIFICATION.ERRORS.NETWORK_ERROR]: 'Network Error',
    [NOTIFICATION.ERRORS.RESOURCE_EXHAUSTED]: 'Resource Exhausted',
    [NOTIFICATION.ERRORS.CONFIGURATION_ERROR]: 'Configuration Error',
    [NOTIFICATION.ERRORS.VALIDATION_ERROR]: 'Validation Error',
  };
  return labels[error] || 'Unknown Error';
}

export function notificationIsDelivered(status: NotificationStatus): boolean {
  const deliveredStatuses: NotificationStatus[] = [
    NOTIFICATION.STATUSES.DELIVERED,
    NOTIFICATION.STATUSES.SENT,
    NOTIFICATION.STATUSES.READ,
  ];
  return deliveredStatuses.includes(status);
}

export function notificationIsActive(status: NotificationStatus): boolean {
  const activeStatuses: NotificationStatus[] = [
    NOTIFICATION.STATUSES.PENDING,
    NOTIFICATION.STATUSES.PROCESSING,
    NOTIFICATION.STATUSES.QUEUED,
    NOTIFICATION.STATUSES.SCHEDULED,
  ];
  return activeStatuses.includes(status);
}

export function notificationIsFailed(status: NotificationStatus): boolean {
  const failedStatuses: NotificationStatus[] = [
    NOTIFICATION.STATUSES.FAILED,
    NOTIFICATION.STATUSES.REJECTED,
    NOTIFICATION.STATUSES.CANCELLED,
  ];
  return failedStatuses.includes(status);
}

export function notificationCanTransition(
  currentStatus: NotificationStatus,
  targetStatus: NotificationStatus
): boolean {
  const validTransitions: Record<NotificationStatus, NotificationStatus[]> = {
    [NOTIFICATION.STATUSES.DRAFT]: [
      NOTIFICATION.STATUSES.PENDING,
      NOTIFICATION.STATUSES.APPROVED,
      NOTIFICATION.STATUSES.CANCELLED,
    ],
    [NOTIFICATION.STATUSES.PENDING]: [
      NOTIFICATION.STATUSES.PROCESSING,
      NOTIFICATION.STATUSES.APPROVED,
      NOTIFICATION.STATUSES.REJECTED,
      NOTIFICATION.STATUSES.CANCELLED,
    ],
    [NOTIFICATION.STATUSES.APPROVED]: [
      NOTIFICATION.STATUSES.QUEUED,
      NOTIFICATION.STATUSES.SCHEDULED,
      NOTIFICATION.STATUSES.CANCELLED,
    ],
    [NOTIFICATION.STATUSES.REJECTED]: [NOTIFICATION.STATUSES.DRAFT, NOTIFICATION.STATUSES.ARCHIVED],
    [NOTIFICATION.STATUSES.QUEUED]: [
      NOTIFICATION.STATUSES.PROCESSING,
      NOTIFICATION.STATUSES.CANCELLED,
    ],
    [NOTIFICATION.STATUSES.SCHEDULED]: [
      NOTIFICATION.STATUSES.QUEUED,
      NOTIFICATION.STATUSES.CANCELLED,
    ],
    [NOTIFICATION.STATUSES.PROCESSING]: [
      NOTIFICATION.STATUSES.SENT,
      NOTIFICATION.STATUSES.FAILED,
      NOTIFICATION.STATUSES.CANCELLED,
    ],
    [NOTIFICATION.STATUSES.SENT]: [NOTIFICATION.STATUSES.DELIVERED, NOTIFICATION.STATUSES.FAILED],
    [NOTIFICATION.STATUSES.DELIVERED]: [NOTIFICATION.STATUSES.READ, NOTIFICATION.STATUSES.ARCHIVED],
    [NOTIFICATION.STATUSES.FAILED]: [NOTIFICATION.STATUSES.DRAFT, NOTIFICATION.STATUSES.ARCHIVED],
    [NOTIFICATION.STATUSES.READ]: [NOTIFICATION.STATUSES.ARCHIVED, NOTIFICATION.STATUSES.UNREAD],
    [NOTIFICATION.STATUSES.UNREAD]: [NOTIFICATION.STATUSES.READ, NOTIFICATION.STATUSES.ARCHIVED],
    [NOTIFICATION.STATUSES.CANCELLED]: [NOTIFICATION.STATUSES.ARCHIVED],
    [NOTIFICATION.STATUSES.ARCHIVED]: [],
  };

  return validTransitions[currentStatus]?.includes(targetStatus) || false;
}
