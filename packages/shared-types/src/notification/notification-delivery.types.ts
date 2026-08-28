/**
 * Notification Delivery Types
 * Type definitions for notification delivery based on shared-constants
 * @module NotificationDeliveryTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification
// ============================================================
import {
  // Notification Delivery Status
  NOTIFICATION_DELIVERY_STATUS,
  NotificationDeliveryStatusType,
  NotificationDeliveryStatusColor,
  NotificationDeliveryStatusCategory,
  NotificationDeliveryStatusOrder,
  NotificationDeliveryStatusTransition,
  NotificationDeliveryStatusDefault,
  notificationDeliveryGetDeliveryStatusLabel,
  notificationGetDeliveryStatusColor,
  notificationGetDeliveryStatusCategory,
  notificationIsDeliveredStatus,
  notificationIsBouncedStatus,
  notificationDeliveryIsFailedStatus,
  notificationIsEngagedStatus,
  notificationCanTransitionDeliveryStatus,
} from '@vubon/shared-constants';

// ============================================================
// Notification Delivery Extended Types
// ============================================================

/**
 * Notification Delivery
 */
export interface NotificationDelivery extends BaseEntity, Timestamp {
  id: ID;
  notificationId: ID;
  userId: ID;
  channel: string;
  status: NotificationDeliveryStatusType;
  attempts: number;
  maxAttempts: number;
  lastAttemptAt?: Date;
  deliveredAt?: Date;
  bouncedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  isDelivered: boolean;
  isBounced: boolean;
  isFailed: boolean;
  isEngaged: boolean;
  metadata?: Metadata;
}

/**
 * Notification Delivery Attempt
 */
export interface NotificationDeliveryAttempt extends BaseEntity, Timestamp {
  id: ID;
  deliveryId: ID;
  notificationId: ID;
  userId: ID;
  attemptNumber: number;
  channel: string;
  status: NotificationDeliveryStatusType;
  errorMessage?: string;
  metadata?: Metadata;
}

/**
 * Notification Delivery Filter
 */
export interface NotificationDeliveryFilter {
  ids?: ID[];
  notificationIds?: ID[];
  userIds?: ID[];
  channels?: string[];
  statuses?: NotificationDeliveryStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isDelivered?: boolean;
  isBounced?: boolean;
  isFailed?: boolean;
  isEngaged?: boolean;
  minAttempts?: number;
  maxAttempts?: number;
  searchTerm?: string;
}

/**
 * Notification Delivery Statistics
 */
export interface NotificationDeliveryStatistics {
  notificationId: ID;
  totalDeliveries: number;
  deliveredDeliveries: number;
  bouncedDeliveries: number;
  failedDeliveries: number;
  engagedDeliveries: number;
  byChannel: Record<string, number>;
  byStatus: Record<NotificationDeliveryStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageAttempts: number;
  maxAttempts: number;
  minAttempts: number;
  deliveryRate: number;
  bounceRate: number;
  failureRate: number;
  engagementRate: number;
  mostFrequentChannel: string;
  mostFrequentStatus: NotificationDeliveryStatusType;
}

/**
 * Notification Delivery Summary
 */
export interface NotificationDeliverySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalDeliveries: number;
  delivered: number;
  bounced: number;
  failed: number;
  engaged: number;
  byChannel: Record<string, number>;
  byStatus: Record<NotificationDeliveryStatusType, number>;
  deliveryTrend: {
    date: Date;
    total: number;
    delivered: number;
    failed: number;
  }[];
  topChannels: {
    channel: string;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: NotificationDeliveryStatusType;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    deliveryRate: number;
    bounceRate: number;
    failureRate: number;
    engagementRate: number;
    averageAttempts: number;
  };
}

/**
 * Notification Delivery Configuration
 */
export interface NotificationDeliveryConfiguration {
  enabled: boolean;
  maxAttempts: number;
  retryDelaySeconds: number;
  retryStrategy: 'immediate' | 'exponential' | 'fixed' | 'custom';
  deliveryTimeoutSeconds: number;
  enableBounceTracking: boolean;
  enableEngagementTracking: boolean;
  enableDeliveryTracking: boolean;
  notificationOnDelivery: boolean;
  notificationOnBounce: boolean;
  notificationOnFailure: boolean;
  alertConfig?: NotificationDeliveryAlertConfig;
}

/**
 * Notification Delivery Alert Configuration
 */
export interface NotificationDeliveryAlertConfig {
  enabled: boolean;
  deliveryFailureAlert: boolean;
  bounceAlert: boolean;
  highFailureRateAlert: boolean;
  highFailureRateThreshold: number;
  delayedDeliveryAlert: boolean;
  delayedDeliveryThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Notification Delivery History
 */
export interface NotificationDeliveryHistory extends BaseEntity, Timestamp {
  id: ID;
  deliveryId: ID;
  notificationId: ID;
  userId: ID;
  action: 'attempt' | 'deliver' | 'bounce' | 'fail' | 'retry' | 'engage';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Notification Delivery Validation
 */
export interface NotificationDeliveryValidation {
  isValid: boolean;
  deliveryId: ID;
  notificationId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Notification Delivery Export
 */
export interface NotificationDeliveryExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: NotificationDeliveryFilter;
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
  // Notification Delivery Status
  NOTIFICATION_DELIVERY_STATUS,
  NotificationDeliveryStatusType,
  NotificationDeliveryStatusColor,
  NotificationDeliveryStatusCategory,
  NotificationDeliveryStatusOrder,
  NotificationDeliveryStatusTransition,
  NotificationDeliveryStatusDefault,
  notificationDeliveryGetDeliveryStatusLabel,
  notificationGetDeliveryStatusColor,
  notificationGetDeliveryStatusCategory,
  notificationIsDeliveredStatus,
  notificationIsBouncedStatus,
  notificationDeliveryIsFailedStatus,
  notificationIsEngagedStatus,
  notificationCanTransitionDeliveryStatus,
};
