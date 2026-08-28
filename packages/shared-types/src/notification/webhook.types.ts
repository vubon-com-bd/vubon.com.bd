/**
 * Webhook Types
 * Type definitions for webhook notifications based on shared-constants
 * @module WebhookTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification webhook
// ============================================================
import {
  // Webhook
  NOTIFICATIONWEBHOOK,
  NotificationWebhookType,
  NotificationWebhookCategory,
  NotificationWebhookMethod,
  NotificationWebhookFormat,
  NotificationWebhookAuthType,
  NotificationWebhookRetryStrategy,
  NotificationWebhookDefault,
  NotificationWebhookLimit,
  NotificationWebhookError,
  notificationwebhookGetTypeLabel,
  notificationwebhookGetCategoryLabel,
  notificationwebhookGetMethodLabel,
  notificationwebhookGetFormatLabel,
  notificationwebhookGetAuthTypeLabel,
  notificationwebhookGetRetryStrategyLabel,
  notificationwebhookGetErrorLabel,
  notificationwebhookGetDefaultTimeout,
  notificationwebhookGetDefaultRetryAttempts,
  notificationwebhookIsOutgoing,
  notificationwebhookIsIncoming,
  notificationwebhookIsSystemCategory,
  // Webhook Status
  NOTIFICATIONWEBHOOK_STATUS,
  NotificationWebhookStatusType,
  NotificationWebhookStatusColor,
  NotificationWebhookStatusCategory,
  NotificationWebhookStatusOrder,
  NotificationWebhookStatusTransition,
  notificationwebhookGetStatusLabel,
  notificationwebhookGetStatusColor,
  notificationwebhookGetStatusCategory,
  notificationwebhookIsDelivered,
  notificationwebhookIsSent,
  notificationwebhookIsFailed,
  notificationwebhookIsPending,
  notificationwebhookCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Webhook Extended Types
// ============================================================

/**
 * Webhook Notification
 */
export interface WebhookNotification extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: NotificationWebhookType;
  category: NotificationWebhookCategory;
  method: NotificationWebhookMethod;
  format: NotificationWebhookFormat;
  authType: NotificationWebhookAuthType;
  retryStrategy: NotificationWebhookRetryStrategy;
  status: NotificationWebhookStatusType;
  url: string;
  headers?: Record<string, string>;
  payload: Record<string, unknown>;
  timeout: number;
  retryAttempts: number;
  maxRetryAttempts: number;
  isOutgoing: boolean;
  isIncoming: boolean;
  isSystemCategory: boolean;
  isDelivered: boolean;
  isSent: boolean;
  isFailed: boolean;
  isPending: boolean;
  sentAt?: Date;
  deliveredAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  response?: {
    statusCode: number;
    body?: string;
    headers?: Record<string, string>;
  };
  metadata?: Metadata;
}

/**
 * Webhook Filter
 */
export interface WebhookFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: NotificationWebhookType[];
  categories?: NotificationWebhookCategory[];
  statuses?: NotificationWebhookStatusType[];
  methods?: NotificationWebhookMethod[];
  formats?: NotificationWebhookFormat[];
  authTypes?: NotificationWebhookAuthType[];
  retryStrategies?: NotificationWebhookRetryStrategy[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isOutgoing?: boolean;
  isIncoming?: boolean;
  isSystemCategory?: boolean;
  isDelivered?: boolean;
  isSent?: boolean;
  isFailed?: boolean;
  isPending?: boolean;
  searchTerm?: string;
  url?: string;
}

/**
 * Webhook Statistics
 */
export interface WebhookStatistics {
  userId: ID;
  totalWebhooks: number;
  sentWebhooks: number;
  deliveredWebhooks: number;
  failedWebhooks: number;
  pendingWebhooks: number;
  byType: Record<NotificationWebhookType, number>;
  byCategory: Record<NotificationWebhookCategory, number>;
  byStatus: Record<NotificationWebhookStatusType, number>;
  byMethod: Record<NotificationWebhookMethod, number>;
  byFormat: Record<NotificationWebhookFormat, number>;
  byAuthType: Record<NotificationWebhookAuthType, number>;
  byRetryStrategy: Record<NotificationWebhookRetryStrategy, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  deliveryRate: number;
  failureRate: number;
  averageRetryAttempts: number;
  averageResponseTime: number;
  mostFrequentType: NotificationWebhookType;
  mostFrequentCategory: NotificationWebhookCategory;
  mostFrequentMethod: NotificationWebhookMethod;
  mostFrequentFormat: NotificationWebhookFormat;
}

/**
 * Webhook Summary
 */
export interface WebhookSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalWebhooks: number;
  sent: number;
  delivered: number;
  failed: number;
  pending: number;
  byType: Record<NotificationWebhookType, number>;
  byCategory: Record<NotificationWebhookCategory, number>;
  byStatus: Record<NotificationWebhookStatusType, number>;
  byMethod: Record<NotificationWebhookMethod, number>;
  byFormat: Record<NotificationWebhookFormat, number>;
  byAuthType: Record<NotificationWebhookAuthType, number>;
  byRetryStrategy: Record<NotificationWebhookRetryStrategy, number>;
  webhookTrend: {
    date: Date;
    total: number;
    sent: number;
    delivered: number;
  }[];
  topTypes: {
    type: NotificationWebhookType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: NotificationWebhookCategory;
    count: number;
    label: string;
  }[];
  topMethods: {
    method: NotificationWebhookMethod;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    deliveryRate: number;
    failureRate: number;
    averageRetryAttempts: number;
    averageResponseTime: number;
  };
}

/**
 * Webhook Configuration
 */
export interface WebhookConfiguration {
  enabled: boolean;
  defaultType: NotificationWebhookType;
  defaultCategory: NotificationWebhookCategory;
  defaultMethod: NotificationWebhookMethod;
  defaultFormat: NotificationWebhookFormat;
  defaultAuthType: NotificationWebhookAuthType;
  defaultRetryStrategy: NotificationWebhookRetryStrategy;
  defaultTimeout: number;
  defaultRetryAttempts: number;
  maxRetryAttempts: number;
  retryDelaySeconds: number;
  maxPayloadSizeKB: number;
  enableDeliveryTracking: boolean;
  enableResponseTracking: boolean;
  notificationOnSent: boolean;
  notificationOnDelivery: boolean;
  notificationOnFailure: boolean;
  alertConfig?: WebhookAlertConfig;
}

/**
 * Webhook Alert Configuration
 */
export interface WebhookAlertConfig {
  enabled: boolean;
  deliveryFailureAlert: boolean;
  highFailureRateAlert: boolean;
  highFailureRateThreshold: number;
  timeoutAlert: boolean;
  authFailureAlert: boolean;
  responseErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Webhook History
 */
export interface WebhookHistory extends BaseEntity, Timestamp {
  id: ID;
  webhookId: ID;
  userId: ID;
  action: 'create' | 'send' | 'deliver' | 'fail' | 'retry' | 'timeout';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Webhook Validation
 */
export interface WebhookValidation {
  isValid: boolean;
  webhookId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Webhook Export
 */
export interface WebhookExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: WebhookFilter;
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
  // Webhook
  NOTIFICATIONWEBHOOK,
  NotificationWebhookType,
  NotificationWebhookCategory,
  NotificationWebhookMethod,
  NotificationWebhookFormat,
  NotificationWebhookAuthType,
  NotificationWebhookRetryStrategy,
  NotificationWebhookDefault,
  NotificationWebhookLimit,
  NotificationWebhookError,
  notificationwebhookGetTypeLabel,
  notificationwebhookGetCategoryLabel,
  notificationwebhookGetMethodLabel,
  notificationwebhookGetFormatLabel,
  notificationwebhookGetAuthTypeLabel,
  notificationwebhookGetRetryStrategyLabel,
  notificationwebhookGetErrorLabel,
  notificationwebhookGetDefaultTimeout,
  notificationwebhookGetDefaultRetryAttempts,
  notificationwebhookIsOutgoing,
  notificationwebhookIsIncoming,
  notificationwebhookIsSystemCategory,
  // Webhook Status
  NOTIFICATIONWEBHOOK_STATUS,
  NotificationWebhookStatusType,
  NotificationWebhookStatusColor,
  NotificationWebhookStatusCategory,
  NotificationWebhookStatusOrder,
  NotificationWebhookStatusTransition,
  notificationwebhookGetStatusLabel,
  notificationwebhookGetStatusColor,
  notificationwebhookGetStatusCategory,
  notificationwebhookIsDelivered,
  notificationwebhookIsSent,
  notificationwebhookIsFailed,
  notificationwebhookIsPending,
  notificationwebhookCanTransition,
};
