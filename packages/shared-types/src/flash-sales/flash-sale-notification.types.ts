/**
 * Flash Sale Notification Types
 * Type definitions for flash sale notifications based on shared-constants
 * @module FlashSaleNotificationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants flash-sales notification
// ============================================================
import {
  // Notification Core
  FLASH_SALE_NOTIFICATION,
  FlashSaleNotificationType,
  FlashSaleNotificationChannel,
  FlashSaleNotificationPriority,
  FlashSaleNotificationTemplate,
  FlashSaleNotificationTiming,
  FlashSaleNotificationFrequency,
  FlashSaleNotificationAudience,
  flashsalesNotificationGetTypeLabel,
  flashsalesNotificationGetChannelLabel,
  flashsalesNotificationGetPriorityLabel,
  flashsalesNotificationGetTemplateLabel,
  flashsalesNotificationGetTimingLabel,
  flashsalesNotificationGetFrequencyLabel,
  flashsalesNotificationGetAudienceLabel,
  flashsalesNotificationIsValidType,
  flashsalesNotificationIsValidChannel,
  flashsalesNotificationIsValidPriority,
  flashsalesNotificationIsHighPriority,
  flashsalesNotificationIsLowPriority,
  flashsalesNotificationGetDefaultChannel,
  flashsalesNotificationGetDefaultPriority,
  flashsalesNotificationGetMaxRecipients,
  flashsalesNotificationGetMaxRetries,
  flashsalesNotificationGetMaxNotificationsPerDay,
  flashsalesNotificationGetMinSubjectLength,
  flashsalesNotificationGetMaxSubjectLength,
  flashsalesNotificationGetMinBodyLength,
  flashsalesNotificationGetMaxBodyLength,
  // Notification Type
  FLASH_SALE_NOTIFICATION_TYPE,
  FlashSaleNotificationTypeCategory,
  FlashSaleNotificationTypeComplexity,
  FlashSaleNotificationTypeScope,
  FlashSaleNotificationTypeDelivery,
  FlashSaleNotificationTypeLanguage,
  FlashSaleNotificationTypeFormat,
  FlashSaleNotificationTypeAction,
  flashsalesNotificationTypeGetCategoryLabel,
  flashsalesNotificationTypeGetComplexityLabel,
  flashsalesNotificationTypeGetScopeLabel,
  flashsalesNotificationTypeGetDeliveryLabel,
  flashsalesNotificationTypeGetLanguageLabel,
  flashsalesNotificationTypeGetFormatLabel,
  flashsalesNotificationTypeGetActionLabel,
  flashsalesNotificationTypeIsValidCategory,
  flashsalesNotificationTypeIsValidScope,
  flashsalesNotificationTypeIsValidLanguage,
  flashsalesNotificationTypeIsValidFormat,
  flashsalesNotificationTypeIsUrgent,
  flashsalesNotificationTypeIsPromotional,
  // Notification Status
  FLASH_SALE_NOTIFICATION_STATUS,
  FlashSaleNotificationStatusType,
  FlashSaleNotificationStatusCategory,
  FlashSaleNotificationStatusColor,
  FlashSaleNotificationStatusPriority,
  FlashSaleNotificationDeliveryStatus,
  flashsalesNotificationStatusGetLabel,
  flashsalesNotificationStatusGetCategory,
  flashsalesNotificationStatusGetColor,
  flashsalesNotificationStatusGetPriority,
  flashsalesNotificationStatusIsActive,
  flashsalesNotificationStatusIsDelivered,
  flashsalesNotificationStatusIsFailed,
  flashsalesNotificationStatusCanTransitionTo,
  flashsalesNotificationStatusGetAvailableTransitions,
  flashsalesNotificationStatusCanApprove,
  flashsalesNotificationStatusCanReject,
  flashsalesNotificationStatusCanSchedule,
  flashsalesNotificationStatusCanQueue,
  flashsalesNotificationStatusCanProcess,
  flashsalesNotificationStatusCanSend,
  flashsalesNotificationStatusCanRetry,
  flashsalesNotificationStatusCanCancel,
  flashsalesNotificationStatusCanArchive,
  flashsalesNotificationStatusGetDeliveryStatusLabel,
  flashsalesNotificationStatusIsValid,
  flashsalesNotificationStatusIsValidDeliveryStatus,
} from '@vubon/shared-constants';

// ============================================================
// Flash Sale Notification Extended Types
// ============================================================

/**
 * Flash Sale Notification
 */
export interface FlashSaleNotification extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  type: FlashSaleNotificationType;
  channel: FlashSaleNotificationChannel;
  priority: FlashSaleNotificationPriority;
  template: FlashSaleNotificationTemplate;
  timing: FlashSaleNotificationTiming;
  frequency: FlashSaleNotificationFrequency;
  audience: FlashSaleNotificationAudience;
  status: FlashSaleNotificationStatusType;
  deliveryStatus: FlashSaleNotificationDeliveryStatus;
  subject: string;
  body: string;
  recipients: string[];
  sentAt?: Date;
  deliveredAt?: Date;
  failedAt?: Date;
  retryCount: number;
  isActive: boolean;
  isDelivered: boolean;
  isFailed: boolean;
  isHighPriority: boolean;
  isLowPriority: boolean;
  isUrgent: boolean;
  isPromotional: boolean;
  metadata?: Metadata;
}

/**
 * Flash Sale Notification Filter
 */
export interface FlashSaleNotificationFilter {
  ids?: ID[];
  flashSaleIds?: ID[];
  types?: FlashSaleNotificationType[];
  channels?: FlashSaleNotificationChannel[];
  priorities?: FlashSaleNotificationPriority[];
  templates?: FlashSaleNotificationTemplate[];
  timings?: FlashSaleNotificationTiming[];
  frequencies?: FlashSaleNotificationFrequency[];
  audiences?: FlashSaleNotificationAudience[];
  statuses?: FlashSaleNotificationStatusType[];
  deliveryStatuses?: FlashSaleNotificationDeliveryStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDelivered?: boolean;
  isFailed?: boolean;
  isHighPriority?: boolean;
  isLowPriority?: boolean;
  isUrgent?: boolean;
  isPromotional?: boolean;
  searchTerm?: string;
}

/**
 * Flash Sale Notification Statistics
 */
export interface FlashSaleNotificationStatistics {
  flashSaleId: ID;
  totalNotifications: number;
  activeNotifications: number;
  deliveredNotifications: number;
  failedNotifications: number;
  highPriorityNotifications: number;
  lowPriorityNotifications: number;
  urgentNotifications: number;
  promotionalNotifications: number;
  byType: Record<FlashSaleNotificationType, number>;
  byChannel: Record<FlashSaleNotificationChannel, number>;
  byPriority: Record<FlashSaleNotificationPriority, number>;
  byStatus: Record<FlashSaleNotificationStatusType, number>;
  byDeliveryStatus: Record<FlashSaleNotificationDeliveryStatus, number>;
  byTemplate: Record<FlashSaleNotificationTemplate, number>;
  byTiming: Record<FlashSaleNotificationTiming, number>;
  byFrequency: Record<FlashSaleNotificationFrequency, number>;
  byAudience: Record<FlashSaleNotificationAudience, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageRetryCount: number;
  maxRetryCount: number;
  minRetryCount: number;
  deliveryRate: number;
  failureRate: number;
  mostFrequentType: FlashSaleNotificationType;
  mostFrequentChannel: FlashSaleNotificationChannel;
  mostFrequentPriority: FlashSaleNotificationPriority;
}

/**
 * Flash Sale Notification Summary
 */
export interface FlashSaleNotificationSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalNotifications: number;
  active: number;
  delivered: number;
  failed: number;
  highPriority: number;
  lowPriority: number;
  urgent: number;
  promotional: number;
  byType: Record<FlashSaleNotificationType, number>;
  byChannel: Record<FlashSaleNotificationChannel, number>;
  byPriority: Record<FlashSaleNotificationPriority, number>;
  byStatus: Record<FlashSaleNotificationStatusType, number>;
  byDeliveryStatus: Record<FlashSaleNotificationDeliveryStatus, number>;
  byTemplate: Record<FlashSaleNotificationTemplate, number>;
  byTiming: Record<FlashSaleNotificationTiming, number>;
  byFrequency: Record<FlashSaleNotificationFrequency, number>;
  byAudience: Record<FlashSaleNotificationAudience, number>;
  notificationTrend: {
    date: Date;
    total: number;
    delivered: number;
    failed: number;
  }[];
  topTypes: {
    type: FlashSaleNotificationType;
    count: number;
    label: string;
  }[];
  topChannels: {
    channel: FlashSaleNotificationChannel;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: FlashSaleNotificationPriority;
    count: number;
    label: string;
  }[];
  deliveryMetrics: {
    deliveryRate: number;
    failureRate: number;
    averageRetryCount: number;
  };
}

/**
 * Flash Sale Notification Configuration
 */
export interface FlashSaleNotificationConfiguration {
  enabled: boolean;
  defaultType: FlashSaleNotificationType;
  defaultChannel: FlashSaleNotificationChannel;
  defaultPriority: FlashSaleNotificationPriority;
  defaultTemplate: FlashSaleNotificationTemplate;
  defaultTiming: FlashSaleNotificationTiming;
  defaultFrequency: FlashSaleNotificationFrequency;
  defaultAudience: FlashSaleNotificationAudience;
  maxRecipients: number;
  maxRetries: number;
  maxNotificationsPerDay: number;
  minSubjectLength: number;
  maxSubjectLength: number;
  minBodyLength: number;
  maxBodyLength: number;
  requireApproval: boolean;
  allowSchedule: boolean;
  allowQueue: boolean;
  autoProcess: boolean;
  autoSend: boolean;
  autoRetry: boolean;
  notificationOnCreate: boolean;
  notificationOnSchedule: boolean;
  notificationOnQueue: boolean;
  notificationOnProcess: boolean;
  notificationOnSend: boolean;
  notificationOnDeliver: boolean;
  notificationOnFail: boolean;
  notificationOnRetry: boolean;
  notificationOnCancel: boolean;
  notificationOnArchive: boolean;
  alertConfig?: FlashSaleNotificationAlertConfig;
}

/**
 * Flash Sale Notification Alert Configuration
 */
export interface FlashSaleNotificationAlertConfig {
  enabled: boolean;
  highFailureRateAlert: boolean;
  highFailureRateThreshold: number;
  deliveryDelayAlert: boolean;
  deliveryDelayThreshold: number;
  priorityAlert: boolean;
  urgentAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Flash Sale Notification History
 */
export interface FlashSaleNotificationHistory extends BaseEntity, Timestamp {
  id: ID;
  notificationId: ID;
  flashSaleId: ID;
  action:
    | 'create'
    | 'update'
    | 'approve'
    | 'reject'
    | 'schedule'
    | 'queue'
    | 'process'
    | 'send'
    | 'deliver'
    | 'fail'
    | 'retry'
    | 'cancel'
    | 'archive'
    | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Flash Sale Notification Validation
 */
export interface FlashSaleNotificationValidation {
  isValid: boolean;
  notificationId: ID;
  flashSaleId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Flash Sale Notification Export
 */
export interface FlashSaleNotificationExport extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: FlashSaleNotificationFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Flash Sale Notification Recipient
 */
export interface FlashSaleNotificationRecipient extends BaseEntity, Timestamp {
  id: ID;
  notificationId: ID;
  flashSaleId: ID;
  userId: ID;
  email?: string;
  phone?: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed' | 'read' | 'clicked';
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  clickedAt?: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Notification Core
  FLASH_SALE_NOTIFICATION,
  FlashSaleNotificationType,
  FlashSaleNotificationChannel,
  FlashSaleNotificationPriority,
  FlashSaleNotificationTemplate,
  FlashSaleNotificationTiming,
  FlashSaleNotificationFrequency,
  FlashSaleNotificationAudience,
  flashsalesNotificationGetTypeLabel,
  flashsalesNotificationGetChannelLabel,
  flashsalesNotificationGetPriorityLabel,
  flashsalesNotificationGetTemplateLabel,
  flashsalesNotificationGetTimingLabel,
  flashsalesNotificationGetFrequencyLabel,
  flashsalesNotificationGetAudienceLabel,
  flashsalesNotificationIsValidType,
  flashsalesNotificationIsValidChannel,
  flashsalesNotificationIsValidPriority,
  flashsalesNotificationIsHighPriority,
  flashsalesNotificationIsLowPriority,
  flashsalesNotificationGetDefaultChannel,
  flashsalesNotificationGetDefaultPriority,
  flashsalesNotificationGetMaxRecipients,
  flashsalesNotificationGetMaxRetries,
  flashsalesNotificationGetMaxNotificationsPerDay,
  flashsalesNotificationGetMinSubjectLength,
  flashsalesNotificationGetMaxSubjectLength,
  flashsalesNotificationGetMinBodyLength,
  flashsalesNotificationGetMaxBodyLength,
  // Notification Type
  FLASH_SALE_NOTIFICATION_TYPE,
  FlashSaleNotificationTypeCategory,
  FlashSaleNotificationTypeComplexity,
  FlashSaleNotificationTypeScope,
  FlashSaleNotificationTypeDelivery,
  FlashSaleNotificationTypeLanguage,
  FlashSaleNotificationTypeFormat,
  FlashSaleNotificationTypeAction,
  flashsalesNotificationTypeGetCategoryLabel,
  flashsalesNotificationTypeGetComplexityLabel,
  flashsalesNotificationTypeGetScopeLabel,
  flashsalesNotificationTypeGetDeliveryLabel,
  flashsalesNotificationTypeGetLanguageLabel,
  flashsalesNotificationTypeGetFormatLabel,
  flashsalesNotificationTypeGetActionLabel,
  flashsalesNotificationTypeIsValidCategory,
  flashsalesNotificationTypeIsValidScope,
  flashsalesNotificationTypeIsValidLanguage,
  flashsalesNotificationTypeIsValidFormat,
  flashsalesNotificationTypeIsUrgent,
  flashsalesNotificationTypeIsPromotional,
  // Notification Status
  FLASH_SALE_NOTIFICATION_STATUS,
  FlashSaleNotificationStatusType,
  FlashSaleNotificationStatusCategory,
  FlashSaleNotificationStatusColor,
  FlashSaleNotificationStatusPriority,
  FlashSaleNotificationDeliveryStatus,
  flashsalesNotificationStatusGetLabel,
  flashsalesNotificationStatusGetCategory,
  flashsalesNotificationStatusGetColor,
  flashsalesNotificationStatusGetPriority,
  flashsalesNotificationStatusIsActive,
  flashsalesNotificationStatusIsDelivered,
  flashsalesNotificationStatusIsFailed,
  flashsalesNotificationStatusCanTransitionTo,
  flashsalesNotificationStatusGetAvailableTransitions,
  flashsalesNotificationStatusCanApprove,
  flashsalesNotificationStatusCanReject,
  flashsalesNotificationStatusCanSchedule,
  flashsalesNotificationStatusCanQueue,
  flashsalesNotificationStatusCanProcess,
  flashsalesNotificationStatusCanSend,
  flashsalesNotificationStatusCanRetry,
  flashsalesNotificationStatusCanCancel,
  flashsalesNotificationStatusCanArchive,
  flashsalesNotificationStatusGetDeliveryStatusLabel,
  flashsalesNotificationStatusIsValid,
  flashsalesNotificationStatusIsValidDeliveryStatus,
};
