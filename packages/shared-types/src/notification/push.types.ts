/**
 * Push Types
 * Type definitions for push notifications based on shared-constants
 * @module PushTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification push
// ============================================================
import {
  // Push
  NOTIFICATIONPUSH,
  NotificationPushType,
  NotificationPushCategory,
  NotificationPushPriority,
  NotificationPushPlatform,
  NotificationPushProvider,
  NotificationPushFormat,
  NotificationPushDefault,
  NotificationPushLimit,
  NotificationPushError,
  notificationpushGetTypeLabel,
  notificationpushGetCategoryLabel,
  notificationpushGetPriorityLabel,
  notificationpushGetPlatformLabel,
  notificationpushGetProviderLabel,
  notificationpushGetFormatLabel,
  notificationpushGetErrorLabel,
  notificationpushGetDefaultTTL,
  notificationpushGetMaxPayloadSizeKB,
  notificationpushGetMaxTitleLength,
  notificationpushGetMaxBodyLength,
  notificationpushIsTransactional,
  notificationpushIsMarketing,
  notificationpushIsUrgent,
  notificationpushIsAndroidPlatform,
  notificationpushIsIOSPlatform,
  notificationpushIsWebPlatform,
  // Push Status
  NOTIFICATIONPUSH_STATUS,
  NotificationPushStatusType,
  NotificationPushStatusColor,
  NotificationPushStatusCategory,
  NotificationPushStatusOrder,
  NotificationPushStatusTransition,
  notificationpushGetStatusLabel,
  notificationpushGetStatusColor,
  notificationpushGetStatusCategory,
  notificationpushIsDelivered,
  notificationpushIsEngaged,
  notificationpushIsFailed,
  notificationpushIsPending,
  notificationpushIsSent,
  notificationpushCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Push Extended Types
// ============================================================

/**
 * Push Notification
 */
export interface PushNotification extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: NotificationPushType;
  category: NotificationPushCategory;
  priority: NotificationPushPriority;
  platform: NotificationPushPlatform;
  provider: NotificationPushProvider;
  format: NotificationPushFormat;
  status: NotificationPushStatusType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  ttl: number;
  isTransactional: boolean;
  isMarketing: boolean;
  isUrgent: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  isWeb: boolean;
  isDelivered: boolean;
  isEngaged: boolean;
  isFailed: boolean;
  isPending: boolean;
  isSent: boolean;
  sentAt?: Date;
  deliveredAt?: Date;
  engagedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata?: Metadata;
}

/**
 * Push Filter
 */
export interface PushFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: NotificationPushType[];
  categories?: NotificationPushCategory[];
  priorities?: NotificationPushPriority[];
  statuses?: NotificationPushStatusType[];
  platforms?: NotificationPushPlatform[];
  providers?: NotificationPushProvider[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isTransactional?: boolean;
  isMarketing?: boolean;
  isUrgent?: boolean;
  isDelivered?: boolean;
  isEngaged?: boolean;
  isFailed?: boolean;
  isPending?: boolean;
  isSent?: boolean;
  isAndroid?: boolean;
  isIOS?: boolean;
  isWeb?: boolean;
  searchTerm?: string;
  title?: string;
}

/**
 * Push Statistics
 */
export interface PushStatistics {
  userId: ID;
  totalPush: number;
  sentPush: number;
  deliveredPush: number;
  engagedPush: number;
  failedPush: number;
  pendingPush: number;
  byType: Record<NotificationPushType, number>;
  byCategory: Record<NotificationPushCategory, number>;
  byPriority: Record<NotificationPushPriority, number>;
  byPlatform: Record<NotificationPushPlatform, number>;
  byProvider: Record<NotificationPushProvider, number>;
  byStatus: Record<NotificationPushStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  deliveryRate: number;
  engagementRate: number;
  failureRate: number;
  mostFrequentType: NotificationPushType;
  mostFrequentCategory: NotificationPushCategory;
  mostFrequentPriority: NotificationPushPriority;
  mostFrequentPlatform: NotificationPushPlatform;
  mostFrequentProvider: NotificationPushProvider;
}

/**
 * Push Summary
 */
export interface PushSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPush: number;
  sent: number;
  delivered: number;
  engaged: number;
  failed: number;
  pending: number;
  byType: Record<NotificationPushType, number>;
  byCategory: Record<NotificationPushCategory, number>;
  byPriority: Record<NotificationPushPriority, number>;
  byPlatform: Record<NotificationPushPlatform, number>;
  byProvider: Record<NotificationPushProvider, number>;
  byStatus: Record<NotificationPushStatusType, number>;
  pushTrend: {
    date: Date;
    total: number;
    sent: number;
    delivered: number;
  }[];
  topTypes: {
    type: NotificationPushType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: NotificationPushCategory;
    count: number;
    label: string;
  }[];
  topPlatforms: {
    platform: NotificationPushPlatform;
    count: number;
    label: string;
  }[];
  topProviders: {
    provider: NotificationPushProvider;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    deliveryRate: number;
    engagementRate: number;
    failureRate: number;
  };
}

/**
 * Push Configuration
 */
export interface PushConfiguration {
  enabled: boolean;
  defaultType: NotificationPushType;
  defaultCategory: NotificationPushCategory;
  defaultPriority: NotificationPushPriority;
  defaultPlatform: NotificationPushPlatform;
  defaultProvider: NotificationPushProvider;
  defaultFormat: NotificationPushFormat;
  defaultTTL: number;
  maxPayloadSizeKB: number;
  maxTitleLength: number;
  maxBodyLength: number;
  maxRetries: number;
  retryDelaySeconds: number;
  enableDeliveryTracking: boolean;
  enableEngagementTracking: boolean;
  notificationOnSent: boolean;
  notificationOnDelivery: boolean;
  notificationOnEngagement: boolean;
  notificationOnFailure: boolean;
  alertConfig?: PushAlertConfig;
}

/**
 * Push Alert Configuration
 */
export interface PushAlertConfig {
  enabled: boolean;
  deliveryFailureAlert: boolean;
  highFailureRateAlert: boolean;
  highFailureRateThreshold: number;
  lowEngagementRateAlert: boolean;
  lowEngagementRateThreshold: number;
  platformFailureAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Push History
 */
export interface PushHistory extends BaseEntity, Timestamp {
  id: ID;
  pushId: ID;
  userId: ID;
  action: 'create' | 'send' | 'deliver' | 'engage' | 'fail' | 'retry';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Push Validation
 */
export interface PushValidation {
  isValid: boolean;
  pushId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Push Export
 */
export interface PushExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: PushFilter;
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
  // Push
  NOTIFICATIONPUSH,
  NotificationPushType,
  NotificationPushCategory,
  NotificationPushPriority,
  NotificationPushPlatform,
  NotificationPushProvider,
  NotificationPushFormat,
  NotificationPushDefault,
  NotificationPushLimit,
  NotificationPushError,
  notificationpushGetTypeLabel,
  notificationpushGetCategoryLabel,
  notificationpushGetPriorityLabel,
  notificationpushGetPlatformLabel,
  notificationpushGetProviderLabel,
  notificationpushGetFormatLabel,
  notificationpushGetErrorLabel,
  notificationpushGetDefaultTTL,
  notificationpushGetMaxPayloadSizeKB,
  notificationpushGetMaxTitleLength,
  notificationpushGetMaxBodyLength,
  notificationpushIsTransactional,
  notificationpushIsMarketing,
  notificationpushIsUrgent,
  notificationpushIsAndroidPlatform,
  notificationpushIsIOSPlatform,
  notificationpushIsWebPlatform,
  // Push Status
  NOTIFICATIONPUSH_STATUS,
  NotificationPushStatusType,
  NotificationPushStatusColor,
  NotificationPushStatusCategory,
  NotificationPushStatusOrder,
  NotificationPushStatusTransition,
  notificationpushGetStatusLabel,
  notificationpushGetStatusColor,
  notificationpushGetStatusCategory,
  notificationpushIsDelivered,
  notificationpushIsEngaged,
  notificationpushIsFailed,
  notificationpushIsPending,
  notificationpushIsSent,
  notificationpushCanTransition,
};
