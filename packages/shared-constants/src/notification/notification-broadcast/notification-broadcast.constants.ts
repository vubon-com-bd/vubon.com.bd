/**
 * Notification Broadcast Constants
 * Core notification broadcast configuration and settings
 */

export const NOTIFICATIONBROADCAST = {
  // Broadcast Types
  TYPES: {
    ALL_USERS: 'all_users',
    SEGMENTED: 'segmented',
    TARGETED: 'targeted',
    REGIONAL: 'regional',
    DEPARTMENTAL: 'departmental',
    ROLE_BASED: 'role_based',
    CUSTOM: 'custom',
  } as const,

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
    CUSTOM: 'custom',
  } as const,

  // Broadcast Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BULK: 'bulk',
  } as const,

  // Broadcast Channels
  CHANNELS: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    ALL: 'all',
    MULTI: 'multi',
  } as const,

  // Broadcast Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'all_users',
    DEFAULT_CATEGORY: 'marketing',
    DEFAULT_PRIORITY: 'medium',
    DEFAULT_CHANNEL: 'email',
    DEFAULT_BATCH_SIZE: 1000,
    DEFAULT_INTERVAL_MS: 1000,
    MAX_RECIPIENTS: 1000000,
    MAX_BATCH_SIZE: 10000,
    DEFAULT_RETRY_ATTEMPTS: 3,
    DEFAULT_TIMEOUT: 30000,
  } as const,

  // Broadcast Limits
  LIMITS: {
    MIN_RECIPIENTS: 1,
    MAX_RECIPIENTS: 1000000,
    MIN_BATCH_SIZE: 1,
    MAX_BATCH_SIZE: 10000,
    MIN_INTERVAL_MS: 100,
    MAX_INTERVAL_MS: 60000,
    MAX_CONCURRENT_BROADCASTS: 5,
    MAX_SCHEDULED_BROADCASTS: 50,
  } as const,

  // Broadcast Errors
  ERRORS: {
    SCHEDULE_FAILED: 'schedule_failed',
    SEND_FAILED: 'send_failed',
    RATE_LIMIT: 'rate_limit',
    PERMISSION_DENIED: 'permission_denied',
    INVALID_SEGMENT: 'invalid_segment',
    INVALID_RECIPIENTS: 'invalid_recipients',
    TIMEOUT: 'timeout',
    NETWORK_ERROR: 'network_error',
    RESOURCE_EXHAUSTED: 'resource_exhausted',
  } as const,
} as const;

// Broadcast Types
export type NotificationBroadcastType =
  (typeof NOTIFICATIONBROADCAST.TYPES)[keyof typeof NOTIFICATIONBROADCAST.TYPES];

// Broadcast Categories
export type NotificationBroadcastCategory =
  (typeof NOTIFICATIONBROADCAST.CATEGORIES)[keyof typeof NOTIFICATIONBROADCAST.CATEGORIES];

// Broadcast Priorities
export type NotificationBroadcastPriority =
  (typeof NOTIFICATIONBROADCAST.PRIORITIES)[keyof typeof NOTIFICATIONBROADCAST.PRIORITIES];

// Broadcast Channels
export type NotificationBroadcastChannel =
  (typeof NOTIFICATIONBROADCAST.CHANNELS)[keyof typeof NOTIFICATIONBROADCAST.CHANNELS];

// Broadcast Defaults
export type NotificationBroadcastDefault =
  (typeof NOTIFICATIONBROADCAST.DEFAULTS)[keyof typeof NOTIFICATIONBROADCAST.DEFAULTS];

// Broadcast Limits
export type NotificationBroadcastLimit =
  (typeof NOTIFICATIONBROADCAST.LIMITS)[keyof typeof NOTIFICATIONBROADCAST.LIMITS];

// Broadcast Errors
export type NotificationBroadcastError =
  (typeof NOTIFICATIONBROADCAST.ERRORS)[keyof typeof NOTIFICATIONBROADCAST.ERRORS];

// Utility Functions
export function notificationbroadcastGetTypeLabel(type: NotificationBroadcastType): string {
  const labels: Record<NotificationBroadcastType, string> = {
    [NOTIFICATIONBROADCAST.TYPES.ALL_USERS]: 'All Users',
    [NOTIFICATIONBROADCAST.TYPES.SEGMENTED]: 'Segmented',
    [NOTIFICATIONBROADCAST.TYPES.TARGETED]: 'Targeted',
    [NOTIFICATIONBROADCAST.TYPES.REGIONAL]: 'Regional',
    [NOTIFICATIONBROADCAST.TYPES.DEPARTMENTAL]: 'Departmental',
    [NOTIFICATIONBROADCAST.TYPES.ROLE_BASED]: 'Role Based',
    [NOTIFICATIONBROADCAST.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Broadcast Type';
}

export function notificationbroadcastGetCategoryLabel(
  category: NotificationBroadcastCategory
): string {
  const labels: Record<NotificationBroadcastCategory, string> = {
    [NOTIFICATIONBROADCAST.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATIONBROADCAST.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONBROADCAST.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONBROADCAST.CATEGORIES.SYSTEM]: 'System',
    [NOTIFICATIONBROADCAST.CATEGORIES.ANNOUNCEMENT]: 'Announcement',
    [NOTIFICATIONBROADCAST.CATEGORIES.ALERT]: 'Alert',
    [NOTIFICATIONBROADCAST.CATEGORIES.UPDATE]: 'Update',
    [NOTIFICATIONBROADCAST.CATEGORIES.PROMOTIONAL]: 'Promotional',
    [NOTIFICATIONBROADCAST.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationbroadcastGetPriorityLabel(
  priority: NotificationBroadcastPriority
): string {
  const labels: Record<NotificationBroadcastPriority, string> = {
    [NOTIFICATIONBROADCAST.PRIORITIES.CRITICAL]: 'Critical',
    [NOTIFICATIONBROADCAST.PRIORITIES.HIGH]: 'High',
    [NOTIFICATIONBROADCAST.PRIORITIES.MEDIUM]: 'Medium',
    [NOTIFICATIONBROADCAST.PRIORITIES.LOW]: 'Low',
    [NOTIFICATIONBROADCAST.PRIORITIES.BULK]: 'Bulk',
  };
  return labels[priority] || 'Unknown Priority';
}

export function notificationbroadcastGetChannelLabel(
  channel: NotificationBroadcastChannel
): string {
  const labels: Record<NotificationBroadcastChannel, string> = {
    [NOTIFICATIONBROADCAST.CHANNELS.EMAIL]: 'Email',
    [NOTIFICATIONBROADCAST.CHANNELS.SMS]: 'SMS',
    [NOTIFICATIONBROADCAST.CHANNELS.PUSH]: 'Push',
    [NOTIFICATIONBROADCAST.CHANNELS.IN_APP]: 'In-App',
    [NOTIFICATIONBROADCAST.CHANNELS.ALL]: 'All Channels',
    [NOTIFICATIONBROADCAST.CHANNELS.MULTI]: 'Multi Channel',
  };
  return labels[channel] || 'Unknown Channel';
}

export function notificationbroadcastGetErrorLabel(error: NotificationBroadcastError): string {
  const labels: Record<NotificationBroadcastError, string> = {
    [NOTIFICATIONBROADCAST.ERRORS.SCHEDULE_FAILED]: 'Schedule Failed',
    [NOTIFICATIONBROADCAST.ERRORS.SEND_FAILED]: 'Send Failed',
    [NOTIFICATIONBROADCAST.ERRORS.RATE_LIMIT]: 'Rate Limit Exceeded',
    [NOTIFICATIONBROADCAST.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
    [NOTIFICATIONBROADCAST.ERRORS.INVALID_SEGMENT]: 'Invalid Segment',
    [NOTIFICATIONBROADCAST.ERRORS.INVALID_RECIPIENTS]: 'Invalid Recipients',
    [NOTIFICATIONBROADCAST.ERRORS.TIMEOUT]: 'Timeout',
    [NOTIFICATIONBROADCAST.ERRORS.NETWORK_ERROR]: 'Network Error',
    [NOTIFICATIONBROADCAST.ERRORS.RESOURCE_EXHAUSTED]: 'Resource Exhausted',
  };
  return labels[error] || 'Unknown Error';
}

export function notificationbroadcastGetDefaultBatchSize(): number {
  return NOTIFICATIONBROADCAST.DEFAULTS.DEFAULT_BATCH_SIZE;
}

export function notificationbroadcastIsAllUsers(type: NotificationBroadcastType): boolean {
  return type === NOTIFICATIONBROADCAST.TYPES.ALL_USERS;
}

export function notificationbroadcastIsSegmented(type: NotificationBroadcastType): boolean {
  return type === NOTIFICATIONBROADCAST.TYPES.SEGMENTED;
}

export function notificationbroadcastIsTargeted(type: NotificationBroadcastType): boolean {
  return type === NOTIFICATIONBROADCAST.TYPES.TARGETED;
}

export function notificationbroadcastIsMultiChannel(
  channel: NotificationBroadcastChannel
): boolean {
  const multiChannels: NotificationBroadcastChannel[] = [
    NOTIFICATIONBROADCAST.CHANNELS.ALL,
    NOTIFICATIONBROADCAST.CHANNELS.MULTI,
  ];
  return multiChannels.includes(channel);
}
