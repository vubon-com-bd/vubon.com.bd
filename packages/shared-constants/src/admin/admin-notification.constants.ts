/**
 * Admin Notification Constants
 * Notification definitions for admin operations
 */

/**
 * Notification types
 */
export const ADMIN_NOTIFICATION_TYPE = {
  SYSTEM: 'system',
  SECURITY: 'security',
  ADMIN: 'admin',
  USER: 'user',
  ORDER: 'order',
  PAYMENT: 'payment',
  PRODUCT: 'product',
  REPORT: 'report',
  TASK: 'task',
  REMINDER: 'reminder',
  ALERT: 'alert',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export type AdminNotificationType =
  (typeof ADMIN_NOTIFICATION_TYPE)[keyof typeof ADMIN_NOTIFICATION_TYPE];

/**
 * Notification channels
 */
export const ADMIN_NOTIFICATION_CHANNEL = {
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  IN_APP: 'in_app',
  SLACK: 'slack',
  TELEGRAM: 'telegram',
  WHATSAPP: 'whatsapp',
  WEBHOOK: 'webhook',
  DESKTOP: 'desktop',
} as const;

export type AdminNotificationChannel =
  (typeof ADMIN_NOTIFICATION_CHANNEL)[keyof typeof ADMIN_NOTIFICATION_CHANNEL];

/**
 * Notification priority
 */
export const ADMIN_NOTIFICATION_PRIORITY = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
  CRITICAL: 'critical',
} as const;

export type AdminNotificationPriority =
  (typeof ADMIN_NOTIFICATION_PRIORITY)[keyof typeof ADMIN_NOTIFICATION_PRIORITY];

/**
 * Notification status
 */
export const ADMIN_NOTIFICATION_STATUS = {
  PENDING: 'pending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  DISMISSED: 'dismissed',
  FAILED: 'failed',
  SCHEDULED: 'scheduled',
  CANCELLED: 'cancelled',
} as const;

export type AdminNotificationStatus =
  (typeof ADMIN_NOTIFICATION_STATUS)[keyof typeof ADMIN_NOTIFICATION_STATUS];

/**
 * Notification templates
 */
export const ADMIN_NOTIFICATION_TEMPLATE = {
  ADMIN_CREATED: 'admin_created',
  ADMIN_UPDATED: 'admin_updated',
  ADMIN_DELETED: 'admin_deleted',
  ADMIN_SUSPENDED: 'admin_suspended',
  ADMIN_ROLE_CHANGED: 'admin_role_changed',
  ADMIN_PASSWORD_RESET: 'admin_password_reset',
  ADMIN_LOGIN_ALERT: 'admin_login_alert',
  ADMIN_MFA_ENABLED: 'admin_mfa_enabled',
  ADMIN_MFA_DISABLED: 'admin_mfa_disabled',
  USER_CREATED: 'user_created',
  USER_UPDATED: 'user_updated',
  USER_SUSPENDED: 'user_suspended',
  USER_VERIFIED: 'user_verified',
  ORDER_CREATED: 'order_created',
  ORDER_UPDATED: 'order_updated',
  ORDER_CANCELLED: 'order_cancelled',
  PAYMENT_RECEIVED: 'payment_received',
  PAYMENT_REFUNDED: 'payment_refunded',
  REPORT_READY: 'report_ready',
  SYSTEM_MAINTENANCE: 'system_maintenance',
  SYSTEM_BACKUP: 'system_backup',
  SECURITY_ALERT: 'security_alert',
  DAILY_DIGEST: 'daily_digest',
  WEEKLY_DIGEST: 'weekly_digest',
} as const;

export type AdminNotificationTemplate =
  (typeof ADMIN_NOTIFICATION_TEMPLATE)[keyof typeof ADMIN_NOTIFICATION_TEMPLATE];

/**
 * Get notification type label
 */
export function getAdminNotificationTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    [ADMIN_NOTIFICATION_TYPE.SYSTEM]: 'System',
    [ADMIN_NOTIFICATION_TYPE.SECURITY]: 'Security',
    [ADMIN_NOTIFICATION_TYPE.ADMIN]: 'Admin',
    [ADMIN_NOTIFICATION_TYPE.USER]: 'User',
    [ADMIN_NOTIFICATION_TYPE.ORDER]: 'Order',
    [ADMIN_NOTIFICATION_TYPE.PAYMENT]: 'Payment',
    [ADMIN_NOTIFICATION_TYPE.PRODUCT]: 'Product',
    [ADMIN_NOTIFICATION_TYPE.REPORT]: 'Report',
    [ADMIN_NOTIFICATION_TYPE.TASK]: 'Task',
    [ADMIN_NOTIFICATION_TYPE.REMINDER]: 'Reminder',
    [ADMIN_NOTIFICATION_TYPE.ALERT]: 'Alert',
    [ADMIN_NOTIFICATION_TYPE.INFO]: 'Info',
    [ADMIN_NOTIFICATION_TYPE.SUCCESS]: 'Success',
    [ADMIN_NOTIFICATION_TYPE.WARNING]: 'Warning',
    [ADMIN_NOTIFICATION_TYPE.ERROR]: 'Error',
  };
  return labels[type] || type;
}

/**
 * Get notification priority label
 */
export function getAdminNotificationPriorityLabel(priority: string): string {
  const labels: Record<string, string> = {
    [ADMIN_NOTIFICATION_PRIORITY.LOW]: 'Low',
    [ADMIN_NOTIFICATION_PRIORITY.NORMAL]: 'Normal',
    [ADMIN_NOTIFICATION_PRIORITY.HIGH]: 'High',
    [ADMIN_NOTIFICATION_PRIORITY.URGENT]: 'Urgent',
    [ADMIN_NOTIFICATION_PRIORITY.CRITICAL]: 'Critical',
  };
  return labels[priority] || priority;
}

/**
 * Get notification status color
 */
export function getAdminNotificationStatusColor(status: string): string {
  const colors: Record<string, string> = {
    [ADMIN_NOTIFICATION_STATUS.PENDING]: 'warning',
    [ADMIN_NOTIFICATION_STATUS.SENT]: 'info',
    [ADMIN_NOTIFICATION_STATUS.DELIVERED]: 'success',
    [ADMIN_NOTIFICATION_STATUS.READ]: 'success',
    [ADMIN_NOTIFICATION_STATUS.DISMISSED]: 'default',
    [ADMIN_NOTIFICATION_STATUS.FAILED]: 'error',
    [ADMIN_NOTIFICATION_STATUS.SCHEDULED]: 'info',
    [ADMIN_NOTIFICATION_STATUS.CANCELLED]: 'default',
  };
  return colors[status] || 'default';
}

/**
 * Get notification status label
 */
export function getAdminNotificationStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    [ADMIN_NOTIFICATION_STATUS.PENDING]: 'Pending',
    [ADMIN_NOTIFICATION_STATUS.SENT]: 'Sent',
    [ADMIN_NOTIFICATION_STATUS.DELIVERED]: 'Delivered',
    [ADMIN_NOTIFICATION_STATUS.READ]: 'Read',
    [ADMIN_NOTIFICATION_STATUS.DISMISSED]: 'Dismissed',
    [ADMIN_NOTIFICATION_STATUS.FAILED]: 'Failed',
    [ADMIN_NOTIFICATION_STATUS.SCHEDULED]: 'Scheduled',
    [ADMIN_NOTIFICATION_STATUS.CANCELLED]: 'Cancelled',
  };
  return labels[status] || status;
}

/**
 * Check if notification is delivered
 */
export function isAdminNotificationDelivered(status: string): boolean {
  const deliveredStatuses: string[] = [
    ADMIN_NOTIFICATION_STATUS.DELIVERED,
    ADMIN_NOTIFICATION_STATUS.READ,
    ADMIN_NOTIFICATION_STATUS.DISMISSED,
  ];
  return deliveredStatuses.includes(status);
}

/**
 * Check if notification needs action
 */
export function adminNotificationNeedsAction(type: string): boolean {
  const actionTypes: string[] = [
    ADMIN_NOTIFICATION_TYPE.SECURITY,
    ADMIN_NOTIFICATION_TYPE.ALERT,
    ADMIN_NOTIFICATION_TYPE.ERROR,
    ADMIN_NOTIFICATION_TYPE.TASK,
    ADMIN_NOTIFICATION_TYPE.REMINDER,
  ];
  return actionTypes.includes(type);
}

/**
 * Get notification priority level
 */
export function getAdminNotificationPriorityLevel(priority: string): number {
  const levels: Record<string, number> = {
    [ADMIN_NOTIFICATION_PRIORITY.LOW]: 0,
    [ADMIN_NOTIFICATION_PRIORITY.NORMAL]: 1,
    [ADMIN_NOTIFICATION_PRIORITY.HIGH]: 2,
    [ADMIN_NOTIFICATION_PRIORITY.URGENT]: 3,
    [ADMIN_NOTIFICATION_PRIORITY.CRITICAL]: 4,
  };
  return levels[priority] || 0;
}

/**
 * Get notification channel label
 */
export function getAdminNotificationChannelLabel(channel: string): string {
  const labels: Record<string, string> = {
    [ADMIN_NOTIFICATION_CHANNEL.EMAIL]: 'Email',
    [ADMIN_NOTIFICATION_CHANNEL.SMS]: 'SMS',
    [ADMIN_NOTIFICATION_CHANNEL.PUSH]: 'Push Notification',
    [ADMIN_NOTIFICATION_CHANNEL.IN_APP]: 'In-App',
    [ADMIN_NOTIFICATION_CHANNEL.SLACK]: 'Slack',
    [ADMIN_NOTIFICATION_CHANNEL.TELEGRAM]: 'Telegram',
    [ADMIN_NOTIFICATION_CHANNEL.WHATSAPP]: 'WhatsApp',
    [ADMIN_NOTIFICATION_CHANNEL.WEBHOOK]: 'Webhook',
    [ADMIN_NOTIFICATION_CHANNEL.DESKTOP]: 'Desktop',
  };
  return labels[channel] || channel;
}

/**
 * Get notification template label
 */
export function getAdminNotificationTemplateLabel(template: string): string {
  const labels: Record<string, string> = {
    [ADMIN_NOTIFICATION_TEMPLATE.ADMIN_CREATED]: 'Admin Created',
    [ADMIN_NOTIFICATION_TEMPLATE.ADMIN_UPDATED]: 'Admin Updated',
    [ADMIN_NOTIFICATION_TEMPLATE.ADMIN_DELETED]: 'Admin Deleted',
    [ADMIN_NOTIFICATION_TEMPLATE.ADMIN_SUSPENDED]: 'Admin Suspended',
    [ADMIN_NOTIFICATION_TEMPLATE.ADMIN_ROLE_CHANGED]: 'Admin Role Changed',
    [ADMIN_NOTIFICATION_TEMPLATE.ADMIN_PASSWORD_RESET]: 'Admin Password Reset',
    [ADMIN_NOTIFICATION_TEMPLATE.ADMIN_LOGIN_ALERT]: 'Admin Login Alert',
    [ADMIN_NOTIFICATION_TEMPLATE.ADMIN_MFA_ENABLED]: 'Admin MFA Enabled',
    [ADMIN_NOTIFICATION_TEMPLATE.ADMIN_MFA_DISABLED]: 'Admin MFA Disabled',
    [ADMIN_NOTIFICATION_TEMPLATE.USER_CREATED]: 'User Created',
    [ADMIN_NOTIFICATION_TEMPLATE.USER_UPDATED]: 'User Updated',
    [ADMIN_NOTIFICATION_TEMPLATE.USER_SUSPENDED]: 'User Suspended',
    [ADMIN_NOTIFICATION_TEMPLATE.USER_VERIFIED]: 'User Verified',
    [ADMIN_NOTIFICATION_TEMPLATE.ORDER_CREATED]: 'Order Created',
    [ADMIN_NOTIFICATION_TEMPLATE.ORDER_UPDATED]: 'Order Updated',
    [ADMIN_NOTIFICATION_TEMPLATE.ORDER_CANCELLED]: 'Order Cancelled',
    [ADMIN_NOTIFICATION_TEMPLATE.PAYMENT_RECEIVED]: 'Payment Received',
    [ADMIN_NOTIFICATION_TEMPLATE.PAYMENT_REFUNDED]: 'Payment Refunded',
    [ADMIN_NOTIFICATION_TEMPLATE.REPORT_READY]: 'Report Ready',
    [ADMIN_NOTIFICATION_TEMPLATE.SYSTEM_MAINTENANCE]: 'System Maintenance',
    [ADMIN_NOTIFICATION_TEMPLATE.SYSTEM_BACKUP]: 'System Backup',
    [ADMIN_NOTIFICATION_TEMPLATE.SECURITY_ALERT]: 'Security Alert',
    [ADMIN_NOTIFICATION_TEMPLATE.DAILY_DIGEST]: 'Daily Digest',
    [ADMIN_NOTIFICATION_TEMPLATE.WEEKLY_DIGEST]: 'Weekly Digest',
  };
  return labels[template] || template;
}

/**
 * Get notification options for dropdown
 */
export function getAdminNotificationTypeOptions(): Array<{
  value: AdminNotificationType;
  label: string;
}> {
  return (Object.values(ADMIN_NOTIFICATION_TYPE) as AdminNotificationType[]).map((type) => ({
    value: type,
    label: getAdminNotificationTypeLabel(type),
  }));
}

/**
 * Get notification priority options for dropdown
 */
export function getAdminNotificationPriorityOptions(): Array<{
  value: AdminNotificationPriority;
  label: string;
}> {
  return (Object.values(ADMIN_NOTIFICATION_PRIORITY) as AdminNotificationPriority[]).map(
    (priority) => ({
      value: priority,
      label: getAdminNotificationPriorityLabel(priority),
    })
  );
}

/**
 * Get notification channel options for dropdown
 */
export function getAdminNotificationChannelOptions(): Array<{
  value: AdminNotificationChannel;
  label: string;
}> {
  return (Object.values(ADMIN_NOTIFICATION_CHANNEL) as AdminNotificationChannel[]).map(
    (channel) => ({
      value: channel,
      label: getAdminNotificationChannelLabel(channel),
    })
  );
}

/**
 * Get notification status options for dropdown
 */
export function getAdminNotificationStatusOptions(): Array<{
  value: AdminNotificationStatus;
  label: string;
  color: string;
}> {
  return (Object.values(ADMIN_NOTIFICATION_STATUS) as AdminNotificationStatus[]).map((status) => ({
    value: status,
    label: getAdminNotificationStatusLabel(status),
    color: getAdminNotificationStatusColor(status),
  }));
}
