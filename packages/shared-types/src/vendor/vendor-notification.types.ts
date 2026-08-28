/**
 * Vendor Notification Types
 * Type definitions for vendor notifications based on shared-constants
 * @module VendorNotificationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor notification
// ============================================================
import {
  // Vendor Notification
  VENDOR_NOTIFICATION,
  VendorNotificationType,
  VendorNotificationStatus,
  VendorNotificationPriority,
  VendorNotificationCategory,
  VendorNotificationEvent,
  VendorNotificationChannel,
  VendorNotificationTemplate,
  vendorNotificationGetTypeLabel,
  vendorNotificationGetStatusLabel,
  vendorNotificationGetPriorityLabel,
  vendorNotificationGetCategoryLabel,
  vendorNotificationGetEventLabel,
  vendorNotificationGetChannelLabel,
  vendorNotificationIsDelivered,
  vendorNotificationIsFailed,
  vendorNotificationGetTemplateLabel,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Notification Extended Types
// ============================================================

/**
 * Vendor notification
 */
export interface VendorNotification extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  type: VendorNotificationType;
  status: VendorNotificationStatus;
  priority: VendorNotificationPriority;
  category: VendorNotificationCategory;
  event: VendorNotificationEvent;
  channel: VendorNotificationChannel;
  template: VendorNotificationTemplate;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  isDelivered: boolean;
  isFailed: boolean;
  deliveredAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  readAt?: Date;
  metadata?: Metadata;
}

/**
 * Vendor notification filter
 */
export interface VendorNotificationFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorNotificationType[];
  statuses?: VendorNotificationStatus[];
  priorities?: VendorNotificationPriority[];
  categories?: VendorNotificationCategory[];
  events?: VendorNotificationEvent[];
  channels?: VendorNotificationChannel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isDelivered?: boolean;
  isFailed?: boolean;
  isRead?: boolean;
  searchTerm?: string;
  title?: string;
}

/**
 * Vendor notification statistics
 */
export interface VendorNotificationStatistics {
  vendorId: ID;
  totalNotifications: number;
  deliveredNotifications: number;
  failedNotifications: number;
  readNotifications: number;
  byType: Record<VendorNotificationType, number>;
  byStatus: Record<VendorNotificationStatus, number>;
  byPriority: Record<VendorNotificationPriority, number>;
  byCategory: Record<VendorNotificationCategory, number>;
  byEvent: Record<VendorNotificationEvent, number>;
  byChannel: Record<VendorNotificationChannel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  deliveryRate: number;
  failureRate: number;
  readRate: number;
  mostFrequentType: VendorNotificationType;
  mostFrequentStatus: VendorNotificationStatus;
  mostFrequentPriority: VendorNotificationPriority;
  mostFrequentCategory: VendorNotificationCategory;
  mostFrequentEvent: VendorNotificationEvent;
  mostFrequentChannel: VendorNotificationChannel;
}

/**
 * Vendor notification summary
 */
export interface VendorNotificationSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalNotifications: number;
  delivered: number;
  failed: number;
  read: number;
  byType: Record<VendorNotificationType, number>;
  byStatus: Record<VendorNotificationStatus, number>;
  byPriority: Record<VendorNotificationPriority, number>;
  byCategory: Record<VendorNotificationCategory, number>;
  byEvent: Record<VendorNotificationEvent, number>;
  byChannel: Record<VendorNotificationChannel, number>;
  notificationTrend: {
    date: Date;
    total: number;
    delivered: number;
    failed: number;
  }[];
  topTypes: {
    type: VendorNotificationType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorNotificationStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: VendorNotificationPriority;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: VendorNotificationCategory;
    count: number;
    label: string;
  }[];
  topEvents: {
    event: VendorNotificationEvent;
    count: number;
    label: string;
  }[];
  topChannels: {
    channel: VendorNotificationChannel;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    deliveryRate: number;
    failureRate: number;
    readRate: number;
  };
}

/**
 * Vendor notification configuration
 */
export interface VendorNotificationConfiguration {
  enabled: boolean;
  defaultChannel: VendorNotificationChannel;
  defaultPriority: VendorNotificationPriority;
  defaultType: VendorNotificationType;
  defaultCategory: VendorNotificationCategory;
  deliveryRetries: number;
  retryDelaySeconds: number;
  requireReadReceipt: boolean;
  allowOptOut: boolean;
  maxNotificationsPerDay: number;
  maxNotificationsPerVendor: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: VendorNotificationAlertConfig;
}

/**
 * Vendor notification alert configuration
 */
export interface VendorNotificationAlertConfig {
  enabled: boolean;
  deliveryFailureAlert: boolean;
  highFailureRateAlert: boolean;
  highFailureRateThreshold: number;
  highVolumeAlert: boolean;
  highVolumeThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor notification history
 */
export interface VendorNotificationHistory extends BaseEntity, Timestamp {
  id: ID;
  notificationId: ID;
  vendorId: ID;
  userId: ID;
  action: 'create' | 'update' | 'deliver' | 'fail' | 'read' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor notification validation
 */
export interface VendorNotificationValidation {
  isValid: boolean;
  notificationId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor notification export
 */
export interface VendorNotificationExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorNotificationFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Vendor Notification
  VENDOR_NOTIFICATION,
  VendorNotificationType,
  VendorNotificationStatus,
  VendorNotificationPriority,
  VendorNotificationCategory,
  VendorNotificationEvent,
  VendorNotificationChannel,
  VendorNotificationTemplate,
  vendorNotificationGetTypeLabel,
  vendorNotificationGetStatusLabel,
  vendorNotificationGetPriorityLabel,
  vendorNotificationGetCategoryLabel,
  vendorNotificationGetEventLabel,
  vendorNotificationGetChannelLabel,
  vendorNotificationIsDelivered,
  vendorNotificationIsFailed,
  vendorNotificationGetTemplateLabel,
};
