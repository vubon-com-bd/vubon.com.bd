/**
 * Abandoned Cart Constants
 * Abandoned cart configuration and settings
 */

export const ABANDONED_CART = {
  // Abandonment Statuses
  STATUSES: {
    IDENTIFIED: 'identified',
    REMINDED: 'reminded',
    FOLLOWED_UP: 'followed_up',
    RECOVERED: 'recovered',
    LOST: 'lost',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    CONVERTED: 'converted',
  } as const,

  // Reminder Types
  REMINDER_TYPES: {
    FIRST: 'first',
    SECOND: 'second',
    THIRD: 'third',
    FINAL: 'final',
    CUSTOM: 'custom',
  } as const,

  // Recovery Channels
  RECOVERY_CHANNELS: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    WHATSAPP: 'whatsapp',
    ALL: 'all',
  } as const,

  // Recovery Statuses
  RECOVERY_STATUSES: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    FAILED: 'failed',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
  } as const,

  // Abandonment Reasons
  REASONS: {
    HIGH_SHIPPING: 'high_shipping',
    COMPLEX_CHECKOUT: 'complex_checkout',
    PRICE_CONCERN: 'price_concern',
    PAYMENT_ISSUE: 'payment_issue',
    TECHNICAL_ISSUE: 'technical_issue',
    COMPARISON_SHOPPING: 'comparison_shopping',
    NOT_READY: 'not_ready',
    SAVED_FOR_LATER: 'saved_for_later',
    DISTRACTION: 'distraction',
    NO_REASON: 'no_reason',
    CUSTOM: 'custom',
  } as const,

  // Abandonment Defaults
  DEFAULTS: {
    DEFAULT_STATUS: 'identified',
    DEFAULT_REMINDER_TYPE: 'first',
    DEFAULT_RECOVERY_CHANNEL: 'email',
    DEFAULT_RECOVERY_STATUS: 'pending',
    DEFAULT_ABANDONMENT_THRESHOLD: 30, // minutes
    DEFAULT_FIRST_REMINDER: 60, // minutes
    DEFAULT_SECOND_REMINDER: 120, // minutes
    DEFAULT_THIRD_REMINDER: 240, // minutes
    DEFAULT_FINAL_REMINDER: 480, // minutes
    DEFAULT_EXPIRY_DAYS: 7,
    DEFAULT_MAX_REMINDERS: 4,
    DEFAULT_RECOVERY_RATE: 15, // percentage
    DEFAULT_REMINDER_INTERVAL: 3600, // seconds
    MAX_REMINDERS: 10,
    MIN_ABANDONMENT_THRESHOLD: 5, // minutes
    MAX_ABANDONMENT_THRESHOLD: 1440, // minutes
  } as const,

  // Abandonment Limits
  LIMITS: {
    MIN_REMINDERS: 1,
    MAX_REMINDERS: 10,
    MIN_ABANDONMENT_THRESHOLD: 5,
    MAX_ABANDONMENT_THRESHOLD: 1440,
    MIN_REMINDER_INTERVAL: 300,
    MAX_REMINDER_INTERVAL: 86400,
    MAX_RECOVERY_ATTEMPTS: 5,
  } as const,

  // Abandonment Errors
  ERRORS: {
    CART_NOT_FOUND: 'cart_not_found',
    CART_NOT_ABANDONED: 'cart_not_abandoned',
    REMINDER_LIMIT_EXCEEDED: 'reminder_limit_exceeded',
    RECOVERY_FAILED: 'recovery_failed',
    EXPIRED: 'expired',
    ALREADY_RECOVERED: 'already_recovered',
    INVALID_CHANNEL: 'invalid_channel',
    PERMISSION_DENIED: 'permission_denied',
  } as const,
} as const;

// Abandonment Statuses
export type AbandonedCartStatus =
  (typeof ABANDONED_CART.STATUSES)[keyof typeof ABANDONED_CART.STATUSES];

// Reminder Types
export type AbandonedCartReminderType =
  (typeof ABANDONED_CART.REMINDER_TYPES)[keyof typeof ABANDONED_CART.REMINDER_TYPES];

// Recovery Channels
export type AbandonedCartRecoveryChannel =
  (typeof ABANDONED_CART.RECOVERY_CHANNELS)[keyof typeof ABANDONED_CART.RECOVERY_CHANNELS];

// Recovery Statuses
export type AbandonedCartRecoveryStatus =
  (typeof ABANDONED_CART.RECOVERY_STATUSES)[keyof typeof ABANDONED_CART.RECOVERY_STATUSES];

// Abandonment Reasons
export type AbandonedCartReason =
  (typeof ABANDONED_CART.REASONS)[keyof typeof ABANDONED_CART.REASONS];

// Abandonment Defaults
export type AbandonedCartDefault =
  (typeof ABANDONED_CART.DEFAULTS)[keyof typeof ABANDONED_CART.DEFAULTS];

// Abandonment Limits
export type AbandonedCartLimit = (typeof ABANDONED_CART.LIMITS)[keyof typeof ABANDONED_CART.LIMITS];

// Abandonment Errors
export type AbandonedCartError = (typeof ABANDONED_CART.ERRORS)[keyof typeof ABANDONED_CART.ERRORS];

// Utility Functions
export function abandonedcartGetStatusLabel(status: AbandonedCartStatus): string {
  const labels: Record<AbandonedCartStatus, string> = {
    [ABANDONED_CART.STATUSES.IDENTIFIED]: 'Identified',
    [ABANDONED_CART.STATUSES.REMINDED]: 'Reminded',
    [ABANDONED_CART.STATUSES.FOLLOWED_UP]: 'Followed Up',
    [ABANDONED_CART.STATUSES.RECOVERED]: 'Recovered',
    [ABANDONED_CART.STATUSES.LOST]: 'Lost',
    [ABANDONED_CART.STATUSES.EXPIRED]: 'Expired',
    [ABANDONED_CART.STATUSES.ARCHIVED]: 'Archived',
    [ABANDONED_CART.STATUSES.CONVERTED]: 'Converted',
  };
  return labels[status] || 'Unknown Status';
}

export function abandonedcartGetReminderTypeLabel(type: AbandonedCartReminderType): string {
  const labels: Record<AbandonedCartReminderType, string> = {
    [ABANDONED_CART.REMINDER_TYPES.FIRST]: 'First Reminder',
    [ABANDONED_CART.REMINDER_TYPES.SECOND]: 'Second Reminder',
    [ABANDONED_CART.REMINDER_TYPES.THIRD]: 'Third Reminder',
    [ABANDONED_CART.REMINDER_TYPES.FINAL]: 'Final Reminder',
    [ABANDONED_CART.REMINDER_TYPES.CUSTOM]: 'Custom Reminder',
  };
  return labels[type] || 'Unknown Reminder Type';
}

export function abandonedcartGetRecoveryChannelLabel(
  channel: AbandonedCartRecoveryChannel
): string {
  const labels: Record<AbandonedCartRecoveryChannel, string> = {
    [ABANDONED_CART.RECOVERY_CHANNELS.EMAIL]: 'Email',
    [ABANDONED_CART.RECOVERY_CHANNELS.SMS]: 'SMS',
    [ABANDONED_CART.RECOVERY_CHANNELS.PUSH]: 'Push',
    [ABANDONED_CART.RECOVERY_CHANNELS.IN_APP]: 'In-App',
    [ABANDONED_CART.RECOVERY_CHANNELS.WHATSAPP]: 'WhatsApp',
    [ABANDONED_CART.RECOVERY_CHANNELS.ALL]: 'All Channels',
  };
  return labels[channel] || 'Unknown Channel';
}

export function abandonedcartGetRecoveryStatusLabel(status: AbandonedCartRecoveryStatus): string {
  const labels: Record<AbandonedCartRecoveryStatus, string> = {
    [ABANDONED_CART.RECOVERY_STATUSES.PENDING]: 'Pending',
    [ABANDONED_CART.RECOVERY_STATUSES.IN_PROGRESS]: 'In Progress',
    [ABANDONED_CART.RECOVERY_STATUSES.COMPLETED]: 'Completed',
    [ABANDONED_CART.RECOVERY_STATUSES.FAILED]: 'Failed',
    [ABANDONED_CART.RECOVERY_STATUSES.EXPIRED]: 'Expired',
    [ABANDONED_CART.RECOVERY_STATUSES.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown Status';
}

export function abandonedcartGetReasonLabel(reason: AbandonedCartReason): string {
  const labels: Record<AbandonedCartReason, string> = {
    [ABANDONED_CART.REASONS.HIGH_SHIPPING]: 'High Shipping Cost',
    [ABANDONED_CART.REASONS.COMPLEX_CHECKOUT]: 'Complex Checkout Process',
    [ABANDONED_CART.REASONS.PRICE_CONCERN]: 'Price Concern',
    [ABANDONED_CART.REASONS.PAYMENT_ISSUE]: 'Payment Issue',
    [ABANDONED_CART.REASONS.TECHNICAL_ISSUE]: 'Technical Issue',
    [ABANDONED_CART.REASONS.COMPARISON_SHOPPING]: 'Comparison Shopping',
    [ABANDONED_CART.REASONS.NOT_READY]: 'Not Ready to Buy',
    [ABANDONED_CART.REASONS.SAVED_FOR_LATER]: 'Saved for Later',
    [ABANDONED_CART.REASONS.DISTRACTION]: 'Distraction',
    [ABANDONED_CART.REASONS.NO_REASON]: 'No Specific Reason',
    [ABANDONED_CART.REASONS.CUSTOM]: 'Custom Reason',
  };
  return labels[reason] || 'Unknown Reason';
}

export function abandonedcartGetErrorLabel(error: AbandonedCartError): string {
  const labels: Record<AbandonedCartError, string> = {
    [ABANDONED_CART.ERRORS.CART_NOT_FOUND]: 'Cart Not Found',
    [ABANDONED_CART.ERRORS.CART_NOT_ABANDONED]: 'Cart Not Abandoned',
    [ABANDONED_CART.ERRORS.REMINDER_LIMIT_EXCEEDED]: 'Reminder Limit Exceeded',
    [ABANDONED_CART.ERRORS.RECOVERY_FAILED]: 'Recovery Failed',
    [ABANDONED_CART.ERRORS.EXPIRED]: 'Expired',
    [ABANDONED_CART.ERRORS.ALREADY_RECOVERED]: 'Already Recovered',
    [ABANDONED_CART.ERRORS.INVALID_CHANNEL]: 'Invalid Channel',
    [ABANDONED_CART.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
  };
  return labels[error] || 'Unknown Error';
}

export function abandonedcartIsRecovered(status: AbandonedCartStatus): boolean {
  const recoveredStatuses: AbandonedCartStatus[] = [
    ABANDONED_CART.STATUSES.RECOVERED,
    ABANDONED_CART.STATUSES.CONVERTED,
  ];
  return recoveredStatuses.includes(status);
}

export function abandonedcartIsActive(status: AbandonedCartStatus): boolean {
  const activeStatuses: AbandonedCartStatus[] = [
    ABANDONED_CART.STATUSES.IDENTIFIED,
    ABANDONED_CART.STATUSES.REMINDED,
    ABANDONED_CART.STATUSES.FOLLOWED_UP,
  ];
  return activeStatuses.includes(status);
}

export function abandonedcartGetDefaultAbandonmentThreshold(): number {
  return ABANDONED_CART.DEFAULTS.DEFAULT_ABANDONMENT_THRESHOLD;
}

export function abandonedcartGetDefaultFirstReminder(): number {
  return ABANDONED_CART.DEFAULTS.DEFAULT_FIRST_REMINDER;
}

export function abandonedcartGetDefaultMaxReminders(): number {
  return ABANDONED_CART.DEFAULTS.DEFAULT_MAX_REMINDERS;
}
