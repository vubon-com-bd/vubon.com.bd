/**
 * Notification Digest Types
 * Type definitions for notification digests based on shared-constants
 * @module NotificationDigestTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification digest
// ============================================================
import {
  // Notification Digest
  NOTIFICATIONDIGEST,
  NotificationDigestType,
  NotificationDigestCategory,
  NotificationDigestFormat,
  NotificationDigestPriority,
  NotificationDigestDefault,
  NotificationDigestLimit,
  NotificationDigestError,
  notificationdigestGetTypeLabel,
  notificationdigestGetCategoryLabel,
  notificationdigestGetFormatLabel,
  notificationdigestGetPriorityLabel,
  notificationdigestGetErrorLabel,
  notificationdigestGetDefaultMaxItems,
  notificationdigestGetDefaultSendTime,
  notificationdigestIsDaily,
  notificationdigestIsWeekly,
  notificationdigestIsMonthly,
  notificationdigestIsEmailFormat,
  notificationdigestIsPDFFormat,
  // Notification Digest Type
  NOTIFICATIONDIGEST_TYPE,
  NotificationDigestCategoryType,
  NotificationDigestSubType,
  NotificationDigestComplexity,
  NotificationDigestScope,
  NotificationDigestPurpose,
  notificationDigestTypeGetCategoryLabel,
  notificationdigestGetSubTypeLabel,
  notificationdigestGetComplexityLabel,
  notificationdigestGetScopeLabel,
  notificationdigestGetPurposeLabel,
  notificationdigestIsMarketingCategory,
  notificationdigestIsTransactionalCategory,
  notificationdigestIsSystemCategory,
  notificationdigestIsSummaryCategory,
  notificationdigestIsReportsCategory,
  // Notification Digest Status
  NOTIFICATIONDIGEST_STATUS,
  NotificationDigestStatusType,
  NotificationDigestStatusColor,
  NotificationDigestStatusCategory,
  NotificationDigestStatusOrder,
  NotificationDigestStatusTransition,
  notificationdigestGetStatusLabel,
  notificationdigestGetStatusColor,
  notificationdigestGetStatusCategory,
  notificationdigestIsActive,
  notificationdigestIsCompleted,
  notificationdigestIsFailed,
  notificationdigestIsEditable,
  notificationdigestCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Notification Digest Extended Types
// ============================================================

/**
 * Notification Digest Item
 */
export interface NotificationDigestItem {
  id: ID;
  notificationId: ID;
  title: string;
  body: string;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Notification Digest
 */
export interface NotificationDigest extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: NotificationDigestType;
  category: NotificationDigestCategory;
  format: NotificationDigestFormat;
  priority: NotificationDigestPriority;
  status: NotificationDigestStatusType;
  title: string;
  description?: string;
  items: NotificationDigestItem[];
  maxItems: number;
  sendTime: string;
  isDaily: boolean;
  isWeekly: boolean;
  isMonthly: boolean;
  isEmailFormat: boolean;
  isPDFFormat: boolean;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isEditable: boolean;
  scheduledAt?: Date;
  sentAt?: Date;
  completedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata?: Metadata;
}

/**
 * Notification Digest Filter
 */
export interface NotificationDigestFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: NotificationDigestType[];
  categories?: NotificationDigestCategory[];
  formats?: NotificationDigestFormat[];
  priorities?: NotificationDigestPriority[];
  statuses?: NotificationDigestStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isDaily?: boolean;
  isWeekly?: boolean;
  isMonthly?: boolean;
  isEmailFormat?: boolean;
  isPDFFormat?: boolean;
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isEditable?: boolean;
  searchTerm?: string;
  title?: string;
}

/**
 * Notification Digest Statistics
 */
export interface NotificationDigestStatistics {
  userId: ID;
  totalDigests: number;
  activeDigests: number;
  completedDigests: number;
  failedDigests: number;
  editableDigests: number;
  byType: Record<NotificationDigestType, number>;
  byCategory: Record<NotificationDigestCategory, number>;
  byFormat: Record<NotificationDigestFormat, number>;
  byPriority: Record<NotificationDigestPriority, number>;
  byStatus: Record<NotificationDigestStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  dailyDigests: number;
  weeklyDigests: number;
  monthlyDigests: number;
  emailDigests: number;
  pdfDigests: number;
  totalItems: number;
  averageItems: number;
  maxItems: number;
  minItems: number;
  successRate: number;
  failureRate: number;
  mostFrequentType: NotificationDigestType;
  mostFrequentCategory: NotificationDigestCategory;
  mostFrequentFormat: NotificationDigestFormat;
  mostFrequentPriority: NotificationDigestPriority;
  mostFrequentStatus: NotificationDigestStatusType;
}

/**
 * Notification Digest Summary
 */
export interface NotificationDigestSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalDigests: number;
  active: number;
  completed: number;
  failed: number;
  editable: number;
  byType: Record<NotificationDigestType, number>;
  byCategory: Record<NotificationDigestCategory, number>;
  byFormat: Record<NotificationDigestFormat, number>;
  byPriority: Record<NotificationDigestPriority, number>;
  byStatus: Record<NotificationDigestStatusType, number>;
  digestTrend: {
    date: Date;
    total: number;
    active: number;
    completed: number;
  }[];
  topTypes: {
    type: NotificationDigestType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: NotificationDigestCategory;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: NotificationDigestFormat;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: NotificationDigestStatusType;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    successRate: number;
    failureRate: number;
    totalItems: number;
    averageItems: number;
  };
}

/**
 * Notification Digest Configuration
 */
export interface NotificationDigestConfiguration {
  enabled: boolean;
  defaultType: NotificationDigestType;
  defaultCategory: NotificationDigestCategory;
  defaultFormat: NotificationDigestFormat;
  defaultPriority: NotificationDigestPriority;
  defaultMaxItems: number;
  defaultSendTime: string;
  maxDigestsPerUser: number;
  allowDaily: boolean;
  allowWeekly: boolean;
  allowMonthly: boolean;
  allowEmailFormat: boolean;
  allowPDFFormat: boolean;
  allowCustomItems: boolean;
  allowCustomSendTime: boolean;
  requireTitle: boolean;
  requireDescription: boolean;
  notificationOnCreate: boolean;
  notificationOnSend: boolean;
  notificationOnComplete: boolean;
  notificationOnFailure: boolean;
  alertConfig?: NotificationDigestAlertConfig;
}

/**
 * Notification Digest Alert Configuration
 */
export interface NotificationDigestAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  highFailureRateAlert: boolean;
  highFailureRateThreshold: number;
  delayedDigestAlert: boolean;
  delayedDigestThreshold: number;
  largeDigestAlert: boolean;
  largeDigestThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Notification Digest History
 */
export interface NotificationDigestHistory extends BaseEntity, Timestamp {
  id: ID;
  digestId: ID;
  userId: ID;
  action: 'create' | 'update' | 'send' | 'complete' | 'fail' | 'cancel' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Notification Digest Validation
 */
export interface NotificationDigestValidation {
  isValid: boolean;
  digestId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Notification Digest Export
 */
export interface NotificationDigestExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html' | 'txt';
  filter: NotificationDigestFilter;
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
  // Notification Digest
  NOTIFICATIONDIGEST,
  NotificationDigestType,
  NotificationDigestCategory,
  NotificationDigestFormat,
  NotificationDigestPriority,
  NotificationDigestDefault,
  NotificationDigestLimit,
  NotificationDigestError,
  notificationdigestGetTypeLabel,
  notificationdigestGetCategoryLabel,
  notificationdigestGetFormatLabel,
  notificationdigestGetPriorityLabel,
  notificationdigestGetErrorLabel,
  notificationdigestGetDefaultMaxItems,
  notificationdigestGetDefaultSendTime,
  notificationdigestIsDaily,
  notificationdigestIsWeekly,
  notificationdigestIsMonthly,
  notificationdigestIsEmailFormat,
  notificationdigestIsPDFFormat,
  // Notification Digest Type
  NOTIFICATIONDIGEST_TYPE,
  NotificationDigestCategoryType,
  NotificationDigestSubType,
  NotificationDigestComplexity,
  NotificationDigestScope,
  NotificationDigestPurpose,
  notificationDigestTypeGetCategoryLabel,
  notificationdigestGetSubTypeLabel,
  notificationdigestGetComplexityLabel,
  notificationdigestGetScopeLabel,
  notificationdigestGetPurposeLabel,
  notificationdigestIsMarketingCategory,
  notificationdigestIsTransactionalCategory,
  notificationdigestIsSystemCategory,
  notificationdigestIsSummaryCategory,
  notificationdigestIsReportsCategory,
  // Notification Digest Status
  NOTIFICATIONDIGEST_STATUS,
  NotificationDigestStatusType,
  NotificationDigestStatusColor,
  NotificationDigestStatusCategory,
  NotificationDigestStatusOrder,
  NotificationDigestStatusTransition,
  notificationdigestGetStatusLabel,
  notificationdigestGetStatusColor,
  notificationdigestGetStatusCategory,
  notificationdigestIsActive,
  notificationdigestIsCompleted,
  notificationdigestIsFailed,
  notificationdigestIsEditable,
  notificationdigestCanTransition,
};
