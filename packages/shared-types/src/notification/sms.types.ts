/**
 * SMS Types
 * Type definitions for SMS notifications based on shared-constants
 * @module SMSTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification sms
// ============================================================
import {
  // SMS
  NOTIFICATIONSMS,
  NotificationSMSType,
  NotificationSMSCategory,
  NotificationSMSPriority,
  NotificationSMSProvider,
  NotificationSMSSendingMethod,
  NotificationSMSCharacterSet,
  NotificationSMSDefault,
  NotificationSMSLimit,
  NotificationSMSError,
  notificationsmsGetTypeLabel,
  notificationsmsGetCategoryLabel,
  notificationsmsGetPriorityLabel,
  notificationsmsGetProviderLabel,
  notificationsmsGetSendingMethodLabel,
  notificationsmsGetCharacterSetLabel,
  notificationsmsGetErrorLabel,
  notificationsmsGetDefaultSenderId,
  notificationsmsGetDefaultCountryCode,
  notificationsmsGetMaxSMSSegments,
  notificationsmsGetMaxGSMCharacters,
  notificationsmsGetMaxUnicodeCharacters,
  notificationsmsIsTransactional,
  notificationsmsIsMarketing,
  notificationsmsIsUrgent,
  notificationsmsCalculateSegments,
  // SMS Status
  NOTIFICATIONSMS_STATUS,
  NotificationSMSStatusType,
  NotificationSMSStatusColor,
  NotificationSMSStatusCategory,
  NotificationSMSStatusOrder,
  NotificationSMSStatusTransition,
  notificationsmsGetStatusLabel,
  notificationsmsGetStatusColor,
  notificationsmsGetStatusCategory,
  notificationsmsIsDelivered,
  notificationsmsIsSent,
  notificationsmsIsFailed,
  notificationsmsIsPending,
  notificationsmsCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// SMS Extended Types
// ============================================================

/**
 * SMS Notification
 */
export interface SMSNotification extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: NotificationSMSType;
  category: NotificationSMSCategory;
  priority: NotificationSMSPriority;
  provider: NotificationSMSProvider;
  sendingMethod: NotificationSMSSendingMethod;
  characterSet: NotificationSMSCharacterSet;
  status: NotificationSMSStatusType;
  senderId: string;
  countryCode: string;
  phoneNumber: string;
  message: string;
  segments: number;
  isTransactional: boolean;
  isMarketing: boolean;
  isUrgent: boolean;
  isDelivered: boolean;
  isSent: boolean;
  isFailed: boolean;
  isPending: boolean;
  sentAt?: Date;
  deliveredAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata?: Metadata;
}

/**
 * SMS Filter
 */
export interface SMSFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: NotificationSMSType[];
  categories?: NotificationSMSCategory[];
  priorities?: NotificationSMSPriority[];
  statuses?: NotificationSMSStatusType[];
  providers?: NotificationSMSProvider[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isTransactional?: boolean;
  isMarketing?: boolean;
  isUrgent?: boolean;
  isDelivered?: boolean;
  isSent?: boolean;
  isFailed?: boolean;
  isPending?: boolean;
  searchTerm?: string;
  senderId?: string;
  phoneNumber?: string;
}

/**
 * SMS Statistics
 */
export interface SMSStatistics {
  userId: ID;
  totalSMS: number;
  sentSMS: number;
  deliveredSMS: number;
  failedSMS: number;
  pendingSMS: number;
  byType: Record<NotificationSMSType, number>;
  byCategory: Record<NotificationSMSCategory, number>;
  byPriority: Record<NotificationSMSPriority, number>;
  byProvider: Record<NotificationSMSProvider, number>;
  byStatus: Record<NotificationSMSStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalSegments: number;
  averageSegments: number;
  maxSegments: number;
  minSegments: number;
  deliveryRate: number;
  failureRate: number;
  mostFrequentType: NotificationSMSType;
  mostFrequentCategory: NotificationSMSCategory;
  mostFrequentPriority: NotificationSMSPriority;
  mostFrequentProvider: NotificationSMSProvider;
}

/**
 * SMS Summary
 */
export interface SMSSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSMS: number;
  sent: number;
  delivered: number;
  failed: number;
  pending: number;
  byType: Record<NotificationSMSType, number>;
  byCategory: Record<NotificationSMSCategory, number>;
  byPriority: Record<NotificationSMSPriority, number>;
  byProvider: Record<NotificationSMSProvider, number>;
  byStatus: Record<NotificationSMSStatusType, number>;
  smsTrend: {
    date: Date;
    total: number;
    sent: number;
    delivered: number;
  }[];
  topTypes: {
    type: NotificationSMSType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: NotificationSMSCategory;
    count: number;
    label: string;
  }[];
  topProviders: {
    provider: NotificationSMSProvider;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    deliveryRate: number;
    failureRate: number;
    totalSegments: number;
    averageSegments: number;
  };
}

/**
 * SMS Configuration
 */
export interface SMSConfiguration {
  enabled: boolean;
  defaultType: NotificationSMSType;
  defaultCategory: NotificationSMSCategory;
  defaultPriority: NotificationSMSPriority;
  defaultProvider: NotificationSMSProvider;
  defaultSendingMethod: NotificationSMSSendingMethod;
  defaultCharacterSet: NotificationSMSCharacterSet;
  defaultSenderId: string;
  defaultCountryCode: string;
  maxSMSSegments: number;
  maxGSMCharacters: number;
  maxUnicodeCharacters: number;
  maxRetries: number;
  retryDelaySeconds: number;
  enableDeliveryTracking: boolean;
  enableSegmentCalculation: boolean;
  notificationOnSent: boolean;
  notificationOnDelivery: boolean;
  notificationOnFailure: boolean;
  alertConfig?: SMSAlertConfig;
}

/**
 * SMS Alert Configuration
 */
export interface SMSAlertConfig {
  enabled: boolean;
  deliveryFailureAlert: boolean;
  highFailureRateAlert: boolean;
  highFailureRateThreshold: number;
  lowDeliveryRateAlert: boolean;
  lowDeliveryRateThreshold: number;
  segmentLimitAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * SMS History
 */
export interface SMSHistory extends BaseEntity, Timestamp {
  id: ID;
  smsId: ID;
  userId: ID;
  action: 'create' | 'send' | 'deliver' | 'fail' | 'retry';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * SMS Validation
 */
export interface SMSValidation {
  isValid: boolean;
  smsId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * SMS Export
 */
export interface SMSExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SMSFilter;
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
  // SMS
  NOTIFICATIONSMS,
  NotificationSMSType,
  NotificationSMSCategory,
  NotificationSMSPriority,
  NotificationSMSProvider,
  NotificationSMSSendingMethod,
  NotificationSMSCharacterSet,
  NotificationSMSDefault,
  NotificationSMSLimit,
  NotificationSMSError,
  notificationsmsGetTypeLabel,
  notificationsmsGetCategoryLabel,
  notificationsmsGetPriorityLabel,
  notificationsmsGetProviderLabel,
  notificationsmsGetSendingMethodLabel,
  notificationsmsGetCharacterSetLabel,
  notificationsmsGetErrorLabel,
  notificationsmsGetDefaultSenderId,
  notificationsmsGetDefaultCountryCode,
  notificationsmsGetMaxSMSSegments,
  notificationsmsGetMaxGSMCharacters,
  notificationsmsGetMaxUnicodeCharacters,
  notificationsmsIsTransactional,
  notificationsmsIsMarketing,
  notificationsmsIsUrgent,
  notificationsmsCalculateSegments,
  // SMS Status
  NOTIFICATIONSMS_STATUS,
  NotificationSMSStatusType,
  NotificationSMSStatusColor,
  NotificationSMSStatusCategory,
  NotificationSMSStatusOrder,
  NotificationSMSStatusTransition,
  notificationsmsGetStatusLabel,
  notificationsmsGetStatusColor,
  notificationsmsGetStatusCategory,
  notificationsmsIsDelivered,
  notificationsmsIsSent,
  notificationsmsIsFailed,
  notificationsmsIsPending,
  notificationsmsCanTransition,
};
