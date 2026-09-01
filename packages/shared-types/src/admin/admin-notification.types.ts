/**
 * Admin Notification Types
 * Notification definitions for admin operations
 */

import { BaseEntity, ID, Timestamp, Nullable, JsonObject } from '../common/core-primitives.types';

/**
 * Admin notification type
 * Based on ADMIN_NOTIFICATION_TYPE from constants
 */
export type AdminNotificationType =
  | 'system'
  | 'security'
  | 'admin'
  | 'user'
  | 'order'
  | 'payment'
  | 'product'
  | 'report'
  | 'task'
  | 'reminder'
  | 'alert'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

/**
 * Admin notification channel
 * Based on ADMIN_NOTIFICATION_CHANNEL from constants
 */
export type AdminNotificationChannel =
  'email' | 'sms' | 'push' | 'in_app' | 'slack' | 'telegram' | 'whatsapp' | 'webhook' | 'desktop';

/**
 * Admin notification priority
 * Based on ADMIN_NOTIFICATION_PRIORITY from constants
 */
export type AdminNotificationPriority = 'low' | 'normal' | 'high' | 'urgent' | 'critical';

/**
 * Admin notification status
 * Based on ADMIN_NOTIFICATION_STATUS from constants
 */
export type AdminNotificationStatus =
  'pending' | 'sent' | 'delivered' | 'read' | 'dismissed' | 'failed' | 'scheduled' | 'cancelled';

/**
 * Admin notification template
 * Based on ADMIN_NOTIFICATION_TEMPLATE from constants
 */
export type AdminNotificationTemplate =
  | 'admin_created'
  | 'admin_updated'
  | 'admin_deleted'
  | 'admin_suspended'
  | 'admin_role_changed'
  | 'admin_password_reset'
  | 'admin_login_alert'
  | 'admin_mfa_enabled'
  | 'admin_mfa_disabled'
  | 'user_created'
  | 'user_updated'
  | 'user_suspended'
  | 'user_verified'
  | 'order_created'
  | 'order_updated'
  | 'order_cancelled'
  | 'payment_received'
  | 'payment_refunded'
  | 'report_ready'
  | 'system_maintenance'
  | 'system_backup'
  | 'security_alert'
  | 'daily_digest'
  | 'weekly_digest';

/**
 * Admin notification interface
 * Represents a single notification
 */
export interface AdminNotification extends BaseEntity {
  /** Notification ID */
  id: ID;
  /** Admin ID who receives the notification */
  adminId: ID;
  /** Notification type */
  type: AdminNotificationType;
  /** Notification channel */
  channel: AdminNotificationChannel;
  /** Notification priority */
  priority: AdminNotificationPriority;
  /** Notification status */
  status: AdminNotificationStatus;
  /** Template used */
  template: AdminNotificationTemplate;
  /** Subject of notification */
  subject: string;
  /** Body content */
  body: string;
  /** Optional link URL */
  link?: Nullable<string>;
  /** Optional link label */
  linkLabel?: Nullable<string>;
  /** Icon class (for UI) */
  icon?: Nullable<string>;
  /** Color class (for UI) */
  color?: Nullable<string>;
  /** Additional metadata */
  metadata?: Nullable<JsonObject>;
  /** Sent timestamp */
  sentAt?: Nullable<Timestamp>;
  /** Delivered timestamp */
  deliveredAt?: Nullable<Timestamp>;
  /** Read timestamp */
  readAt?: Nullable<Timestamp>;
  /** Dismissed timestamp */
  dismissedAt?: Nullable<Timestamp>;
  /** Failed reason */
  failedReason?: Nullable<string>;
  /** Scheduled timestamp */
  scheduledAt?: Nullable<Timestamp>;
  /** Cancelled timestamp */
  cancelledAt?: Nullable<Timestamp>;
  /** Whether notification is archived */
  isArchived: boolean;
}

/**
 * Notification create data
 */
export interface AdminNotificationCreateData {
  /** Admin ID */
  adminId: ID;
  /** Notification type */
  type: AdminNotificationType;
  /** Notification channel */
  channel: AdminNotificationChannel;
  /** Notification priority */
  priority: AdminNotificationPriority;
  /** Template used */
  template: AdminNotificationTemplate;
  /** Subject of notification */
  subject: string;
  /** Body content */
  body: string;
  /** Optional link URL */
  link?: string;
  /** Optional link label */
  linkLabel?: string;
  /** Icon class */
  icon?: string;
  /** Color class */
  color?: string;
  /** Metadata */
  metadata?: JsonObject;
  /** Scheduled timestamp */
  scheduledAt?: Date;
}

/**
 * Notification update data
 */
export interface AdminNotificationUpdateData {
  /** Notification status */
  status?: AdminNotificationStatus;
  /** Subject of notification */
  subject?: string;
  /** Body content */
  body?: string;
  /** Optional link URL */
  link?: string;
  /** Optional link label */
  linkLabel?: string;
  /** Icon class */
  icon?: string;
  /** Color class */
  color?: string;
  /** Metadata */
  metadata?: JsonObject;
  /** Failed reason */
  failedReason?: string;
  /** Cancelled timestamp */
  cancelledAt?: Date;
  /** Whether notification is archived */
  isArchived?: boolean;
}

/**
 * Notification filter parameters
 */
export interface AdminNotificationFilterParams {
  /** Filter by admin ID */
  adminId?: ID;
  /** Filter by notification type */
  type?: AdminNotificationType | AdminNotificationType[];
  /** Filter by channel */
  channel?: AdminNotificationChannel | AdminNotificationChannel[];
  /** Filter by priority */
  priority?: AdminNotificationPriority | AdminNotificationPriority[];
  /** Filter by status */
  status?: AdminNotificationStatus | AdminNotificationStatus[];
  /** Filter by template */
  template?: AdminNotificationTemplate | AdminNotificationTemplate[];
  /** Filter by archived status */
  isArchived?: boolean;
  /** Date range filter (created) */
  createdDateRange?: {
    start?: Date;
    end?: Date;
  };
  /** Date range filter (scheduled) */
  scheduledDateRange?: {
    start?: Date;
    end?: Date;
  };
  /** Search term (subject, body) */
  search?: string;
}

/**
 * Notification statistics
 */
export interface AdminNotificationStatistics {
  /** Total notifications */
  totalNotifications: number;
  /** Count by type */
  typeCounts: Record<AdminNotificationType, number>;
  /** Count by channel */
  channelCounts: Record<AdminNotificationChannel, number>;
  /** Count by priority */
  priorityCounts: Record<AdminNotificationPriority, number>;
  /** Count by status */
  statusCounts: Record<AdminNotificationStatus, number>;
  /** Delivered notifications */
  deliveredCount: number;
  /** Read notifications */
  readCount: number;
  /** Failed notifications */
  failedCount: number;
  /** Pending notifications */
  pendingCount: number;
  /** Delivery rate */
  deliveryRate: number;
  /** Read rate */
  readRate: number;
}

/**
 * Notification delivery result
 */
export interface AdminNotificationDeliveryResult {
  /** Whether delivery was successful */
  success: boolean;
  /** Notification if successful */
  notification?: AdminNotification;
  /** Error message if failed */
  errorMessage?: string;
  /** Delivery timestamp */
  deliveredAt?: Date;
}

/**
 * Get notification type label
 */
export function getAdminNotificationTypeLabel(type: AdminNotificationType): string {
  const labels: Record<AdminNotificationType, string> = {
    system: 'System',
    security: 'Security',
    admin: 'Admin',
    user: 'User',
    order: 'Order',
    payment: 'Payment',
    product: 'Product',
    report: 'Report',
    task: 'Task',
    reminder: 'Reminder',
    alert: 'Alert',
    info: 'Info',
    success: 'Success',
    warning: 'Warning',
    error: 'Error',
  };
  return labels[type] || type;
}

/**
 * Get notification priority label
 */
export function getAdminNotificationPriorityLabel(priority: AdminNotificationPriority): string {
  const labels: Record<AdminNotificationPriority, string> = {
    low: 'Low',
    normal: 'Normal',
    high: 'High',
    urgent: 'Urgent',
    critical: 'Critical',
  };
  return labels[priority] || priority;
}

/**
 * Get notification status label
 */
export function getAdminNotificationStatusLabel(status: AdminNotificationStatus): string {
  const labels: Record<AdminNotificationStatus, string> = {
    pending: 'Pending',
    sent: 'Sent',
    delivered: 'Delivered',
    read: 'Read',
    dismissed: 'Dismissed',
    failed: 'Failed',
    scheduled: 'Scheduled',
    cancelled: 'Cancelled',
  };
  return labels[status] || status;
}

/**
 * Get notification status color
 */
export function getAdminNotificationStatusColor(status: AdminNotificationStatus): string {
  const colors: Record<AdminNotificationStatus, string> = {
    pending: 'warning',
    sent: 'info',
    delivered: 'success',
    read: 'success',
    dismissed: 'default',
    failed: 'error',
    scheduled: 'info',
    cancelled: 'default',
  };
  return colors[status] || 'default';
}

/**
 * Get notification channel label
 */
export function getAdminNotificationChannelLabel(channel: AdminNotificationChannel): string {
  const labels: Record<AdminNotificationChannel, string> = {
    email: 'Email',
    sms: 'SMS',
    push: 'Push Notification',
    in_app: 'In-App',
    slack: 'Slack',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    webhook: 'Webhook',
    desktop: 'Desktop',
  };
  return labels[channel] || channel;
}

/**
 * Get notification template label
 */
export function getAdminNotificationTemplateLabel(template: AdminNotificationTemplate): string {
  const labels: Record<AdminNotificationTemplate, string> = {
    admin_created: 'Admin Created',
    admin_updated: 'Admin Updated',
    admin_deleted: 'Admin Deleted',
    admin_suspended: 'Admin Suspended',
    admin_role_changed: 'Admin Role Changed',
    admin_password_reset: 'Admin Password Reset',
    admin_login_alert: 'Admin Login Alert',
    admin_mfa_enabled: 'Admin MFA Enabled',
    admin_mfa_disabled: 'Admin MFA Disabled',
    user_created: 'User Created',
    user_updated: 'User Updated',
    user_suspended: 'User Suspended',
    user_verified: 'User Verified',
    order_created: 'Order Created',
    order_updated: 'Order Updated',
    order_cancelled: 'Order Cancelled',
    payment_received: 'Payment Received',
    payment_refunded: 'Payment Refunded',
    report_ready: 'Report Ready',
    system_maintenance: 'System Maintenance',
    system_backup: 'System Backup',
    security_alert: 'Security Alert',
    daily_digest: 'Daily Digest',
    weekly_digest: 'Weekly Digest',
  };
  return labels[template] || template;
}

/**
 * Check if notification needs action
 */
export function adminNotificationNeedsAction(type: AdminNotificationType): boolean {
  const actionTypes: AdminNotificationType[] = ['security', 'alert', 'error', 'task', 'reminder'];
  return actionTypes.includes(type);
}

/**
 * Check if notification is delivered
 */
export function isAdminNotificationDelivered(status: AdminNotificationStatus): boolean {
  const deliveredStatuses: AdminNotificationStatus[] = ['delivered', 'read', 'dismissed'];
  return deliveredStatuses.includes(status);
}

/**
 * Get notification priority level (number)
 */
export function getAdminNotificationPriorityLevel(priority: AdminNotificationPriority): number {
  const levels: Record<AdminNotificationPriority, number> = {
    low: 0,
    normal: 1,
    high: 2,
    urgent: 3,
    critical: 4,
  };
  return levels[priority] || 0;
}

/**
 * Create notification statistics from array
 */
export function createAdminNotificationStatistics(
  notifications: AdminNotification[]
): AdminNotificationStatistics {
  const stats: AdminNotificationStatistics = {
    totalNotifications: notifications.length,
    typeCounts: {
      system: 0,
      security: 0,
      admin: 0,
      user: 0,
      order: 0,
      payment: 0,
      product: 0,
      report: 0,
      task: 0,
      reminder: 0,
      alert: 0,
      info: 0,
      success: 0,
      warning: 0,
      error: 0,
    },
    channelCounts: {
      email: 0,
      sms: 0,
      push: 0,
      in_app: 0,
      slack: 0,
      telegram: 0,
      whatsapp: 0,
      webhook: 0,
      desktop: 0,
    },
    priorityCounts: {
      low: 0,
      normal: 0,
      high: 0,
      urgent: 0,
      critical: 0,
    },
    statusCounts: {
      pending: 0,
      sent: 0,
      delivered: 0,
      read: 0,
      dismissed: 0,
      failed: 0,
      scheduled: 0,
      cancelled: 0,
    },
    deliveredCount: 0,
    readCount: 0,
    failedCount: 0,
    pendingCount: 0,
    deliveryRate: 0,
    readRate: 0,
  };

  notifications.forEach((notification) => {
    stats.typeCounts[notification.type] = (stats.typeCounts[notification.type] || 0) + 1;
    stats.channelCounts[notification.channel] =
      (stats.channelCounts[notification.channel] || 0) + 1;
    stats.priorityCounts[notification.priority] =
      (stats.priorityCounts[notification.priority] || 0) + 1;
    stats.statusCounts[notification.status] = (stats.statusCounts[notification.status] || 0) + 1;

    if (isAdminNotificationDelivered(notification.status)) {
      stats.deliveredCount++;
    }
    if (notification.status === 'read') {
      stats.readCount++;
    }
    if (notification.status === 'failed') {
      stats.failedCount++;
    }
    if (notification.status === 'pending' || notification.status === 'scheduled') {
      stats.pendingCount++;
    }
  });

  const sentNotifications = stats.totalNotifications - stats.pendingCount - stats.failedCount;
  stats.deliveryRate = sentNotifications > 0 ? (stats.deliveredCount / sentNotifications) * 100 : 0;
  stats.readRate = stats.deliveredCount > 0 ? (stats.readCount / stats.deliveredCount) * 100 : 0;

  return stats;
}
