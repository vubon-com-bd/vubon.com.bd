/**
 * Support Push Constants
 * Configuration for support push notifications
 */

export const SUPPORT_PUSH = {
  // Push Types
  TYPES: {
    WEB: 'web',
    MOBILE: 'mobile',
    DESKTOP: 'desktop',
    EMAIL: 'email',
    IN_APP: 'in_app',
  } as const,

  // Push Statuses
  STATUS: {
    PENDING: 'pending',
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    SCHEDULED: 'scheduled',
  } as const,

  // Push Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Push Categories
  CATEGORIES: {
    TICKET: 'ticket',
    MESSAGE: 'message',
    UPDATE: 'update',
    REMINDER: 'reminder',
    ALERT: 'alert',
    GENERAL: 'general',
  } as const,

  // Push Platforms
  PLATFORMS: {
    WEB: 'web',
    IOS: 'ios',
    ANDROID: 'android',
    DESKTOP: 'desktop',
  } as const,

  // Push Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 50,
    MAX_BODY_LENGTH: 200,
    MAX_BADGE_COUNT: 999,
    MAX_SOUND_SIZE: 30, // KB
    MAX_IMAGE_SIZE: 1024, // KB
  } as const,
} as const;

// Push Types
export type SupportPushType = (typeof SUPPORT_PUSH.TYPES)[keyof typeof SUPPORT_PUSH.TYPES];

// Push Statuses
export type SupportPushStatus = (typeof SUPPORT_PUSH.STATUS)[keyof typeof SUPPORT_PUSH.STATUS];

// Push Priorities
export type SupportPushPriority =
  (typeof SUPPORT_PUSH.PRIORITIES)[keyof typeof SUPPORT_PUSH.PRIORITIES];

// Push Categories
export type SupportPushCategory =
  (typeof SUPPORT_PUSH.CATEGORIES)[keyof typeof SUPPORT_PUSH.CATEGORIES];

// Push Platforms
export type SupportPushPlatform =
  (typeof SUPPORT_PUSH.PLATFORMS)[keyof typeof SUPPORT_PUSH.PLATFORMS];

// Utility Functions
export function supportPushGetTypeLabel(type: SupportPushType): string {
  const labels: Record<SupportPushType, string> = {
    [SUPPORT_PUSH.TYPES.WEB]: 'Web Push',
    [SUPPORT_PUSH.TYPES.MOBILE]: 'Mobile Push',
    [SUPPORT_PUSH.TYPES.DESKTOP]: 'Desktop Push',
    [SUPPORT_PUSH.TYPES.EMAIL]: 'Email Push',
    [SUPPORT_PUSH.TYPES.IN_APP]: 'In-App Push',
  };
  return labels[type] || 'Unknown';
}

export function supportPushGetStatusLabel(status: SupportPushStatus): string {
  const labels: Record<SupportPushStatus, string> = {
    [SUPPORT_PUSH.STATUS.PENDING]: 'Pending',
    [SUPPORT_PUSH.STATUS.SENT]: 'Sent',
    [SUPPORT_PUSH.STATUS.DELIVERED]: 'Delivered',
    [SUPPORT_PUSH.STATUS.READ]: 'Read',
    [SUPPORT_PUSH.STATUS.FAILED]: 'Failed',
    [SUPPORT_PUSH.STATUS.CANCELLED]: 'Cancelled',
    [SUPPORT_PUSH.STATUS.SCHEDULED]: 'Scheduled',
  };
  return labels[status] || 'Unknown';
}

export function supportPushGetPriorityLabel(priority: SupportPushPriority): string {
  const labels: Record<SupportPushPriority, string> = {
    [SUPPORT_PUSH.PRIORITIES.CRITICAL]: 'Critical',
    [SUPPORT_PUSH.PRIORITIES.HIGH]: 'High',
    [SUPPORT_PUSH.PRIORITIES.MEDIUM]: 'Medium',
    [SUPPORT_PUSH.PRIORITIES.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function supportPushGetCategoryLabel(category: SupportPushCategory): string {
  const labels: Record<SupportPushCategory, string> = {
    [SUPPORT_PUSH.CATEGORIES.TICKET]: 'Ticket',
    [SUPPORT_PUSH.CATEGORIES.MESSAGE]: 'Message',
    [SUPPORT_PUSH.CATEGORIES.UPDATE]: 'Update',
    [SUPPORT_PUSH.CATEGORIES.REMINDER]: 'Reminder',
    [SUPPORT_PUSH.CATEGORIES.ALERT]: 'Alert',
    [SUPPORT_PUSH.CATEGORIES.GENERAL]: 'General',
  };
  return labels[category] || 'Unknown';
}

export function supportPushGetPlatformLabel(platform: SupportPushPlatform): string {
  const labels: Record<SupportPushPlatform, string> = {
    [SUPPORT_PUSH.PLATFORMS.WEB]: 'Web',
    [SUPPORT_PUSH.PLATFORMS.IOS]: 'iOS',
    [SUPPORT_PUSH.PLATFORMS.ANDROID]: 'Android',
    [SUPPORT_PUSH.PLATFORMS.DESKTOP]: 'Desktop',
  };
  return labels[platform] || 'Unknown';
}

export function supportPushIsSent(status: SupportPushStatus): boolean {
  return (
    status === SUPPORT_PUSH.STATUS.SENT ||
    status === SUPPORT_PUSH.STATUS.DELIVERED ||
    status === SUPPORT_PUSH.STATUS.READ
  );
}

export function supportPushIsFailed(status: SupportPushStatus): boolean {
  return status === SUPPORT_PUSH.STATUS.FAILED;
}
