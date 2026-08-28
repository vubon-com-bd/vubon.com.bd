/**
 * Notification Types
 * Type definitions for notification module based on shared-constants
 * @module NotificationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification
// ============================================================
import {
  // Notification Core
  NOTIFICATION,
  NotificationType,
  NotificationCategory,
  NotificationPriority,
  NotificationChannel,
  NotificationStatus,
  NotificationDeliveryStatus,
  NotificationReadStatus,
  NotificationAction,
  NotificationDefault,
  NotificationLimit,
  NotificationError,
  notificationGetTypeLabel,
  notificationGetCategoryLabel,
  notificationGetPriorityLabel,
  notificationGetChannelLabel,
  notificationGetStatusLabel,
  notificationGetDeliveryStatusLabel,
  notificationGetReadStatusLabel,
  notificationGetActionLabel,
  notificationGetErrorLabel,
  notificationIsDelivered,
  notificationIsActive,
  notificationIsFailed,
  notificationCanTransition,
  // Notification Type
  NOTIFICATION_TYPE,
  NotificationCategoryType,
  NotificationSubType,
  NotificationFormat,
  NotificationPurpose,
  NotificationUrgency,
  notificationTypeGetCategoryLabel,
  notificationGetSubTypeLabel,
  notificationGetFormatLabel,
  notificationGetPurposeLabel,
  notificationGetUrgencyLabel,
  notificationIsMarketingCategory,
  notificationIsTransactionalCategory,
  notificationIsOperationalCategory,
  notificationIsSocialCategory,
  notificationIsAlertCategory,
  // Notification Channel
  NOTIFICATION_CHANNEL,
  NotificationChannelType,
  NotificationChannelCategory,
  NotificationChannelProvider,
  NotificationChannelCapability,
  NotificationChannelDefault,
  NotificationChannelLimit,
  notificationChannelGetChannelLabel,
  notificationGetChannelCategory,
  notificationGetChannelProvider,
  notificationIsEmailChannel,
  notificationIsSMSChannel,
  notificationIsPushChannel,
  notificationIsInAppChannel,
  notificationIsSocialChannel,
  notificationIsWebChannel,
  notificationIsMobileChannel,
  notificationGetDefaultChannel,
  // Notification Status
  NOTIFICATION_STATUS,
  NotificationStatusType,
  NotificationStatusColor,
  NotificationStatusCategory,
  NotificationStatusOrder,
  NotificationStatusTransition,
  notificationStatusGetStatusLabel,
  notificationGetStatusColor,
  notificationGetStatusCategory,
  notificationStatusIsDelivered,
  notificationIsEngaged,
  notificationStatusIsFailed,
  notificationIsPending,
  notificationIsRead,
  notificationIsTerminal,
  notificationStatusCanTransition,
  // Notification Priority
  NOTIFICATION_PRIORITY,
  NotificationPriorityLevel,
  NotificationPriorityScore,
  NotificationPriorityColor,
  NotificationPrioritySLATarget,
  NotificationPriorityDefault,
  notificationPriorityGetPriorityLabel,
  notificationGetPriorityScore,
  notificationGetPriorityColor,
  notificationGetPrioritySLATarget,
  notificationIsCriticalPriority,
  notificationIsHighPriority,
  notificationIsLowPriority,
  notificationGetDefaultPriority,
  notificationGetDefaultScore,
  notificationGetPriorityFromScore,
  // Notification Category
  NOTIFICATION_CATEGORY,
  NotificationCategoryTypeFromCategory,
  NotificationCategoryGroup,
  NotificationCategoryIcon,
  NotificationCategoryColor,
  NotificationCategoryDefault,
  notificationCategoryGetCategoryLabel,
  notificationGetCategoryGroup,
  notificationGetCategoryIcon,
  notificationGetCategoryColor,
  notificationCategoryIsMarketingCategory,
  notificationCategoryIsTransactionalCategory,
  notificationIsSystemCategory,
  notificationCategoryIsSocialCategory,
  notificationGetDefaultCategory,
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
  // Notification Read Status
  NOTIFICATION_READ_STATUS,
  NotificationReadStatusType,
  NotificationReadStatusColor,
  NotificationReadStatusIcon,
  NotificationReadStatusOrder,
  NotificationReadStatusTransition,
  NotificationReadStatusDefault,
  notificationReadGetReadStatusLabel,
  notificationGetReadStatusColor,
  notificationGetReadStatusIcon,
  notificationIsReadStatus,
  notificationIsUnreadStatus,
  notificationIsArchivedStatus,
  notificationIsDeletedStatus,
  notificationCanTransitionReadStatus,
  notificationGetDefaultReadStatus,
  // Notification Action
  NOTIFICATION_ACTION,
  NotificationActionType,
  NotificationActionCategory,
  NotificationActionStatus,
  NotificationActionIcon,
  NotificationActionColor,
  NotificationActionDefault,
  notificationActionGetActionLabel,
  notificationGetActionCategory,
  notificationGetActionIcon,
  notificationGetActionColor,
  notificationIsViewAction,
  notificationIsInteractAction,
  notificationIsModifyAction,
  notificationActionIsSocialAction,
  notificationGetDefaultAction,
  // Notification Error
  NOTIFICATION_ERROR,
  NotificationErrorCategory,
  NotificationErrorCode,
  NotificationErrorSeverity,
  NotificationErrorHttpStatus,
  NotificationErrorRetryStrategy,
  NotificationErrorDefault,
  notificationerrorGetCategoryLabel,
  notificationerrorGetCodeLabel,
  notificationerrorGetSeverityLabel,
  notificationerrorGetRetryStrategyLabel,
  notificationerrorIsSystemError,
  notificationerrorIsNetworkError,
  notificationerrorIsAuthError,
  notificationerrorIsDeliveryError,
  notificationerrorIsRetryable,
  notificationerrorGetDefaultRetryAttempts,
  notificationerrorGetDefaultRetryDelay,
  notificationerrorGetDefaultTimeout,
  // Notification Permission
  NOTIFICATION_PERMISSION,
  NotificationPermissionType,
  NotificationPermissionResource,
  NotificationPermissionAction,
  NotificationPermissionLevel,
  NotificationPermissionScope,
  NotificationPermissionStatus,
  NotificationPermissionDefault,
  NotificationPermissionLimit,
  notificationpermissionGetTypeLabel,
  notificationpermissionGetResourceLabel,
  notificationpermissionGetActionLabel,
  notificationpermissionGetLevelLabel,
  notificationpermissionGetScopeLabel,
  notificationpermissionGetStatusLabel,
  notificationpermissionIsAdmin,
  notificationpermissionIsManage,
  notificationpermissionIsWrite,
  notificationpermissionIsRead,
  notificationpermissionIsGranted,
  notificationpermissionIsPending,
  notificationpermissionGetDefaultLevel,
  notificationpermissionGetDefaultResource,
  notificationpermissionGetDefaultAction,
} from '@vubon/shared-constants';

// ============================================================
// Notification Extended Types
// ============================================================

/**
 * Notification
 */
export interface Notification extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: NotificationType;
  category: NotificationCategory;
  priority: NotificationPriority;
  channel: NotificationChannel;
  status: NotificationStatus;
  deliveryStatus: NotificationDeliveryStatus;
  readStatus: NotificationReadStatus;
  action: NotificationAction;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  isDelivered: boolean;
  isActive: boolean;
  isFailed: boolean;
  isRead: boolean;
  isPending: boolean;
  isTerminal: boolean;
  deliveredAt?: Date;
  readAt?: Date;
  metadata?: Metadata;
}

/**
 * Notification Filter
 */
export interface NotificationFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: NotificationType[];
  categories?: NotificationCategory[];
  priorities?: NotificationPriority[];
  channels?: NotificationChannel[];
  statuses?: NotificationStatus[];
  deliveryStatuses?: NotificationDeliveryStatus[];
  readStatuses?: NotificationReadStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isDelivered?: boolean;
  isActive?: boolean;
  isFailed?: boolean;
  isRead?: boolean;
  isPending?: boolean;
  isTerminal?: boolean;
  searchTerm?: string;
}

/**
 * Notification Statistics
 */
export interface NotificationStatistics {
  userId: ID;
  totalNotifications: number;
  deliveredNotifications: number;
  readNotifications: number;
  failedNotifications: number;
  pendingNotifications: number;
  byType: Record<NotificationType, number>;
  byCategory: Record<NotificationCategory, number>;
  byPriority: Record<NotificationPriority, number>;
  byChannel: Record<NotificationChannel, number>;
  byStatus: Record<NotificationStatus, number>;
  byDeliveryStatus: Record<NotificationDeliveryStatus, number>;
  byReadStatus: Record<NotificationReadStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  deliveryRate: number;
  readRate: number;
  engagementRate: number;
  mostFrequentType: NotificationType;
  mostFrequentCategory: NotificationCategory;
  mostFrequentPriority: NotificationPriority;
  mostFrequentChannel: NotificationChannel;
}

/**
 * Notification Summary
 */
export interface NotificationSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  delivered: number;
  read: number;
  failed: number;
  pending: number;
  byType: Record<NotificationType, number>;
  byCategory: Record<NotificationCategory, number>;
  byPriority: Record<NotificationPriority, number>;
  byChannel: Record<NotificationChannel, number>;
  byStatus: Record<NotificationStatus, number>;
  byDeliveryStatus: Record<NotificationDeliveryStatus, number>;
  byReadStatus: Record<NotificationReadStatus, number>;
  notificationTrend: {
    date: Date;
    total: number;
    delivered: number;
    read: number;
  }[];
  topTypes: {
    type: NotificationType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: NotificationCategory;
    count: number;
    label: string;
  }[];
  topChannels: {
    channel: NotificationChannel;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    deliveryRate: number;
    readRate: number;
    engagementRate: number;
  };
}

/**
 * Notification Configuration
 */
export interface NotificationConfiguration {
  enabled: boolean;
  defaultType: NotificationType;
  defaultCategory: NotificationCategory;
  defaultPriority: NotificationPriority;
  defaultChannel: NotificationChannel;
  maxRetries: number;
  retryDelaySeconds: number;
  deliveryTimeoutSeconds: number;
  enableDeliveryTracking: boolean;
  enableReadTracking: boolean;
  enableEngagementTracking: boolean;
  notificationOnDelivery: boolean;
  notificationOnFailure: boolean;
  notificationOnRead: boolean;
  alertConfig?: NotificationAlertConfig;
}

/**
 * Notification Alert Configuration
 */
export interface NotificationAlertConfig {
  enabled: boolean;
  deliveryFailureAlert: boolean;
  pendingTimeoutAlert: boolean;
  highPriorityAlert: boolean;
  deliveryRateDropAlert: boolean;
  deliveryRateThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Notification History
 */
export interface NotificationHistory extends BaseEntity, Timestamp {
  id: ID;
  notificationId: ID;
  userId: ID;
  action: 'create' | 'send' | 'deliver' | 'fail' | 'read' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Notification Validation
 */
export interface NotificationValidation {
  isValid: boolean;
  notificationId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Notification Export
 */
export interface NotificationExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: NotificationFilter;
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
  // Notification Core
  NOTIFICATION,
  NotificationType,
  NotificationCategory,
  NotificationPriority,
  NotificationChannel,
  NotificationStatus,
  NotificationDeliveryStatus,
  NotificationReadStatus,
  NotificationAction,
  NotificationDefault,
  NotificationLimit,
  NotificationError,
  notificationGetTypeLabel,
  notificationGetCategoryLabel,
  notificationGetPriorityLabel,
  notificationGetChannelLabel,
  notificationGetStatusLabel,
  notificationGetDeliveryStatusLabel,
  notificationGetReadStatusLabel,
  notificationGetActionLabel,
  notificationGetErrorLabel,
  notificationIsDelivered,
  notificationIsActive,
  notificationIsFailed,
  notificationCanTransition,
  // Notification Type
  NOTIFICATION_TYPE,
  NotificationCategoryType,
  NotificationSubType,
  NotificationFormat,
  NotificationPurpose,
  NotificationUrgency,
  notificationTypeGetCategoryLabel,
  notificationGetSubTypeLabel,
  notificationGetFormatLabel,
  notificationGetPurposeLabel,
  notificationGetUrgencyLabel,
  notificationIsMarketingCategory,
  notificationIsTransactionalCategory,
  notificationIsOperationalCategory,
  notificationIsSocialCategory,
  notificationIsAlertCategory,
  // Notification Channel
  NOTIFICATION_CHANNEL,
  NotificationChannelType,
  NotificationChannelCategory,
  NotificationChannelProvider,
  NotificationChannelCapability,
  NotificationChannelDefault,
  NotificationChannelLimit,
  notificationChannelGetChannelLabel,
  notificationGetChannelCategory,
  notificationGetChannelProvider,
  notificationIsEmailChannel,
  notificationIsSMSChannel,
  notificationIsPushChannel,
  notificationIsInAppChannel,
  notificationIsSocialChannel,
  notificationIsWebChannel,
  notificationIsMobileChannel,
  notificationGetDefaultChannel,
  // Notification Status
  NOTIFICATION_STATUS,
  NotificationStatusType,
  NotificationStatusColor,
  NotificationStatusCategory,
  NotificationStatusOrder,
  NotificationStatusTransition,
  notificationStatusGetStatusLabel,
  notificationGetStatusColor,
  notificationGetStatusCategory,
  notificationStatusIsDelivered,
  notificationIsEngaged,
  notificationStatusIsFailed,
  notificationIsPending,
  notificationIsRead,
  notificationIsTerminal,
  notificationStatusCanTransition,
  // Notification Priority
  NOTIFICATION_PRIORITY,
  NotificationPriorityLevel,
  NotificationPriorityScore,
  NotificationPriorityColor,
  NotificationPrioritySLATarget,
  NotificationPriorityDefault,
  notificationPriorityGetPriorityLabel,
  notificationGetPriorityScore,
  notificationGetPriorityColor,
  notificationGetPrioritySLATarget,
  notificationIsCriticalPriority,
  notificationIsHighPriority,
  notificationIsLowPriority,
  notificationGetDefaultPriority,
  notificationGetDefaultScore,
  notificationGetPriorityFromScore,
  // Notification Category
  NOTIFICATION_CATEGORY,
  NotificationCategoryTypeFromCategory,
  NotificationCategoryGroup,
  NotificationCategoryIcon,
  NotificationCategoryColor,
  NotificationCategoryDefault,
  notificationCategoryGetCategoryLabel,
  notificationGetCategoryGroup,
  notificationGetCategoryIcon,
  notificationGetCategoryColor,
  notificationCategoryIsMarketingCategory,
  notificationCategoryIsTransactionalCategory,
  notificationIsSystemCategory,
  notificationCategoryIsSocialCategory,
  notificationGetDefaultCategory,
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
  // Notification Read Status
  NOTIFICATION_READ_STATUS,
  NotificationReadStatusType,
  NotificationReadStatusColor,
  NotificationReadStatusIcon,
  NotificationReadStatusOrder,
  NotificationReadStatusTransition,
  NotificationReadStatusDefault,
  notificationReadGetReadStatusLabel,
  notificationGetReadStatusColor,
  notificationGetReadStatusIcon,
  notificationIsReadStatus,
  notificationIsUnreadStatus,
  notificationIsArchivedStatus,
  notificationIsDeletedStatus,
  notificationCanTransitionReadStatus,
  notificationGetDefaultReadStatus,
  // Notification Action
  NOTIFICATION_ACTION,
  NotificationActionType,
  NotificationActionCategory,
  NotificationActionStatus,
  NotificationActionIcon,
  NotificationActionColor,
  NotificationActionDefault,
  notificationActionGetActionLabel,
  notificationGetActionCategory,
  notificationGetActionIcon,
  notificationGetActionColor,
  notificationIsViewAction,
  notificationIsInteractAction,
  notificationIsModifyAction,
  notificationActionIsSocialAction,
  notificationGetDefaultAction,
  // Notification Error
  NOTIFICATION_ERROR,
  NotificationErrorCategory,
  NotificationErrorCode,
  NotificationErrorSeverity,
  NotificationErrorHttpStatus,
  NotificationErrorRetryStrategy,
  NotificationErrorDefault,
  notificationerrorGetCategoryLabel,
  notificationerrorGetCodeLabel,
  notificationerrorGetSeverityLabel,
  notificationerrorGetRetryStrategyLabel,
  notificationerrorIsSystemError,
  notificationerrorIsNetworkError,
  notificationerrorIsAuthError,
  notificationerrorIsDeliveryError,
  notificationerrorIsRetryable,
  notificationerrorGetDefaultRetryAttempts,
  notificationerrorGetDefaultRetryDelay,
  notificationerrorGetDefaultTimeout,
  // Notification Permission
  NOTIFICATION_PERMISSION,
  NotificationPermissionType,
  NotificationPermissionResource,
  NotificationPermissionAction,
  NotificationPermissionLevel,
  NotificationPermissionScope,
  NotificationPermissionStatus,
  NotificationPermissionDefault,
  NotificationPermissionLimit,
  notificationpermissionGetTypeLabel,
  notificationpermissionGetResourceLabel,
  notificationpermissionGetActionLabel,
  notificationpermissionGetLevelLabel,
  notificationpermissionGetScopeLabel,
  notificationpermissionGetStatusLabel,
  notificationpermissionIsAdmin,
  notificationpermissionIsManage,
  notificationpermissionIsWrite,
  notificationpermissionIsRead,
  notificationpermissionIsGranted,
  notificationpermissionIsPending,
  notificationpermissionGetDefaultLevel,
  notificationpermissionGetDefaultResource,
  notificationpermissionGetDefaultAction,
};
