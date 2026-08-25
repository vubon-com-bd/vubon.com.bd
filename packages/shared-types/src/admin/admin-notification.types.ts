/**
 * Admin Notification Types
 * Type definitions for admin notifications based on shared-constants
 * @module AdminNotificationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin notification
// ============================================================
import {
  // Core Notification Constants
  ADMIN_NOTIFICATION,
  ADMIN_NOTIFICATION_CHANNEL_LABELS,
  ADMIN_NOTIFICATION_CHANNEL_ICONS,
  ADMIN_NOTIFICATION_TYPE_LABELS,
  ADMIN_NOTIFICATION_TYPE_COLORS,
  ADMIN_NOTIFICATION_STATUS_LABELS,
  ADMIN_NOTIFICATION_STATUS_COLORS,
  ADMIN_NOTIFICATION_PRIORITY_LABELS,
  ADMIN_NOTIFICATION_PRIORITY_LEVELS,
  ADMIN_NOTIFICATION_CATEGORY_LABELS,
  ADMIN_NOTIFICATION_DELIVERY_LABELS,
  ADMIN_NOTIFICATION_ACTION_LABELS,
  // Core Notification Types
  AdminNotificationChannel,
  AdminNotificationType,
  AdminNotificationStatus,
  AdminNotificationPriority,
  AdminNotificationCategory,
  AdminNotificationTemplate,
  AdminNotificationDelivery,
  AdminNotificationAction,
  // Core Notification Functions
  getAdminNotificationChannelLabel,
  getAdminNotificationChannelIcon,
  getAdminNotificationTypeLabel,
  getAdminNotificationTypeColor,
  getAdminNotificationStatusLabel,
  getAdminNotificationStatusColor,
  getAdminNotificationPriorityLabel,
  getAdminNotificationPriorityLevel,
  getAdminNotificationCategoryLabel,
  getAdminNotificationDeliveryLabel,
  getAdminNotificationActionLabel,
  isAdminNotificationDelivered,
  isAdminNotificationFailed,
  isAdminNotificationPending,
  isAdminNotificationRead,
  getAdminNotificationTimeout,
  getAdminNotificationTemplateLabel,
} from '@vubon/shared-constants';

// ============================================================
// Admin Notification Extended Types
// ============================================================

/**
 * Admin notification with additional metadata
 */
export interface AdminNotificationExtended extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  type: AdminNotificationType;
  status: AdminNotificationStatus;
  priority: AdminNotificationPriority;
  category: AdminNotificationCategory;
  channel: AdminNotificationChannel;
  template: AdminNotificationTemplate;
  delivery: AdminNotificationDelivery;
  action: AdminNotificationAction;
  title: string;
  body: string;
  isRead: boolean;
  readAt?: Date;
  deliveredAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  actionUrl?: string;
  isDelivered: boolean;
  isFailed: boolean;
  isPending: boolean;
  metadata?: Metadata;
}

/**
 * Admin notification filter
 */
export interface AdminNotificationFilter {
  adminIds?: ID[];
  types?: AdminNotificationType[];
  statuses?: AdminNotificationStatus[];
  priorities?: AdminNotificationPriority[];
  categories?: AdminNotificationCategory[];
  channels?: AdminNotificationChannel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isRead?: boolean;
  isDelivered?: boolean;
  isFailed?: boolean;
  isPending?: boolean;
  searchTerm?: string;
}

/**
 * Admin notification statistics
 */
export interface AdminNotificationStatistics {
  adminId: ID;
  totalNotifications: number;
  readNotifications: number;
  unreadNotifications: number;
  deliveredNotifications: number;
  failedNotifications: number;
  pendingNotifications: number;
  byType: Record<AdminNotificationType, number>;
  byStatus: Record<AdminNotificationStatus, number>;
  byPriority: Record<AdminNotificationPriority, number>;
  byCategory: Record<AdminNotificationCategory, number>;
  byChannel: Record<AdminNotificationChannel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  readRate: number;
  deliveryRate: number;
  failureRate: number;
  mostFrequentType: AdminNotificationType;
  mostFrequentCategory: AdminNotificationCategory;
  mostFrequentChannel: AdminNotificationChannel;
}

/**
 * Admin notification summary
 */
export interface AdminNotificationSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  read: number;
  unread: number;
  delivered: number;
  failed: number;
  pending: number;
  byType: Record<AdminNotificationType, number>;
  byStatus: Record<AdminNotificationStatus, number>;
  byPriority: Record<AdminNotificationPriority, number>;
  byCategory: Record<AdminNotificationCategory, number>;
  byChannel: Record<AdminNotificationChannel, number>;
  notificationTrend: {
    date: Date;
    total: number;
    read: number;
    delivered: number;
  }[];
  topTypes: {
    type: AdminNotificationType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: AdminNotificationCategory;
    count: number;
    label: string;
  }[];
  topChannels: {
    channel: AdminNotificationChannel;
    count: number;
    label: string;
  }[];
}

/**
 * Admin notification configuration
 */
export interface AdminNotificationConfiguration {
  enabled: boolean;
  defaultChannel: AdminNotificationChannel;
  defaultPriority: AdminNotificationPriority;
  defaultCategory: AdminNotificationCategory;
  defaultTemplate: AdminNotificationTemplate;
  defaultDelivery: AdminNotificationDelivery;
  maxRetries: number;
  retryDelaySeconds: number;
  timeoutSeconds: number;
  requireReadReceipt: boolean;
  allowChannelChange: boolean;
  allowPriorityChange: boolean;
  notificationOnRead: boolean;
  notificationOnDelivered: boolean;
  notificationOnFailed: boolean;
  alertConfig?: AdminNotificationAlertConfig;
}

/**
 * Admin notification alert configuration
 */
export interface AdminNotificationAlertConfig {
  enabled: boolean;
  deliveryFailureAlert: boolean;
  pendingTimeoutAlert: boolean;
  highPriorityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  deliveryFailureThreshold: number;
}

/**
 * Admin notification history
 */
export interface AdminNotificationHistory extends BaseEntity, Timestamp {
  id: ID;
  notificationId: ID;
  adminId: ID;
  action: 'create' | 'send' | 'deliver' | 'fail' | 'read' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * Admin notification template
 */
export interface AdminNotificationTemplateExtended extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  type: AdminNotificationType;
  channel: AdminNotificationChannel;
  priority: AdminNotificationPriority;
  category: AdminNotificationCategory;
  subject: string;
  body: string;
  htmlBody?: string;
  actionUrl?: string;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Admin notification delivery attempt
 */
export interface AdminNotificationDeliveryAttempt extends BaseEntity, Timestamp {
  id: ID;
  notificationId: ID;
  adminId: ID;
  channel: AdminNotificationChannel;
  isSuccess: boolean;
  errorMessage?: string;
  attemptNumber: number;
  deliveredAt?: Date;
  metadata?: Metadata;
}

/**
 * Admin notification batch
 */
export interface AdminNotificationBatch extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  notifications: AdminNotificationExtended[];
  total: number;
  delivered: number;
  failed: number;
  pending: number;
  status: 'processing' | 'completed' | 'failed' | 'partial';
  startedAt: Date;
  completedAt?: Date;
  metadata?: Metadata;
}

/**
 * Admin notification export
 */
export interface AdminNotificationExport extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AdminNotificationFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Admin notification audit
 */
export interface AdminNotificationAudit extends BaseEntity, Timestamp {
  id: ID;
  notificationId: ID;
  adminId: ID;
  action: 'create' | 'send' | 'deliver' | 'fail' | 'read' | 'archive' | 'delete';
  changes: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Constants
  ADMIN_NOTIFICATION,
  ADMIN_NOTIFICATION_CHANNEL_LABELS,
  ADMIN_NOTIFICATION_CHANNEL_ICONS,
  ADMIN_NOTIFICATION_TYPE_LABELS,
  ADMIN_NOTIFICATION_TYPE_COLORS,
  ADMIN_NOTIFICATION_STATUS_LABELS,
  ADMIN_NOTIFICATION_STATUS_COLORS,
  ADMIN_NOTIFICATION_PRIORITY_LABELS,
  ADMIN_NOTIFICATION_PRIORITY_LEVELS,
  ADMIN_NOTIFICATION_CATEGORY_LABELS,
  ADMIN_NOTIFICATION_DELIVERY_LABELS,
  ADMIN_NOTIFICATION_ACTION_LABELS,
  // Core Types
  AdminNotificationChannel,
  AdminNotificationType,
  AdminNotificationStatus,
  AdminNotificationPriority,
  AdminNotificationCategory,
  AdminNotificationTemplate,
  AdminNotificationDelivery,
  AdminNotificationAction,
  // Core Functions
  getAdminNotificationChannelLabel,
  getAdminNotificationChannelIcon,
  getAdminNotificationTypeLabel,
  getAdminNotificationTypeColor,
  getAdminNotificationStatusLabel,
  getAdminNotificationStatusColor,
  getAdminNotificationPriorityLabel,
  getAdminNotificationPriorityLevel,
  getAdminNotificationCategoryLabel,
  getAdminNotificationDeliveryLabel,
  getAdminNotificationActionLabel,
  isAdminNotificationDelivered,
  isAdminNotificationFailed,
  isAdminNotificationPending,
  isAdminNotificationRead,
  getAdminNotificationTimeout,
  getAdminNotificationTemplateLabel,
};
