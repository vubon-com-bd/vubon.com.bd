/**
 * Notification Broadcast Types
 * Type definitions for notification broadcasts based on shared-constants
 * @module NotificationBroadcastTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification broadcast
// ============================================================
import {
  // Notification Broadcast
  NOTIFICATIONBROADCAST,
  NotificationBroadcastType,
  NotificationBroadcastCategory,
  NotificationBroadcastPriority,
  NotificationBroadcastChannel,
  NotificationBroadcastDefault,
  NotificationBroadcastLimit,
  NotificationBroadcastError,
  notificationbroadcastGetTypeLabel,
  notificationbroadcastGetCategoryLabel,
  notificationbroadcastGetPriorityLabel,
  notificationbroadcastGetChannelLabel,
  notificationbroadcastGetErrorLabel,
  notificationbroadcastGetDefaultBatchSize,
  notificationbroadcastIsAllUsers,
  notificationbroadcastIsSegmented,
  notificationbroadcastIsTargeted,
  notificationbroadcastIsMultiChannel,
  // Notification Broadcast Status
  NOTIFICATIONBROADCAST_STATUS,
  NotificationBroadcastStatusType,
  NotificationBroadcastStatusColor,
  NotificationBroadcastStatusCategory,
  NotificationBroadcastStatusOrder,
  NotificationBroadcastStatusTransition,
  notificationbroadcastGetStatusLabel,
  notificationbroadcastGetStatusColor,
  notificationbroadcastGetStatusCategory,
  notificationbroadcastIsActive,
  notificationbroadcastIsCompleted,
  notificationbroadcastIsFailed,
  notificationbroadcastIsEditable,
  notificationbroadcastCanTransition,
  // Notification Broadcast Type
  NOTIFICATIONBROADCAST_TYPE,
  NotificationBroadcastCategoryType,
  NotificationBroadcastSubType,
  NotificationBroadcastComplexity,
  NotificationBroadcastScope,
  NotificationBroadcastPurpose,
  notificationBroadcastTypeGetCategoryLabel,
  notificationbroadcastGetSubTypeLabel,
  notificationbroadcastGetComplexityLabel,
  notificationbroadcastGetScopeLabel,
  notificationbroadcastGetPurposeLabel,
  notificationbroadcastIsMarketingCategory,
  notificationbroadcastIsTransactionalCategory,
  notificationbroadcastIsSystemCategory,
  notificationbroadcastIsAnnouncementCategory,
} from '@vubon/shared-constants';

// ============================================================
// Notification Broadcast Extended Types
// ============================================================

/**
 * Notification Broadcast
 */
export interface NotificationBroadcast extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: NotificationBroadcastType;
  category: NotificationBroadcastCategory;
  priority: NotificationBroadcastPriority;
  channel: NotificationBroadcastChannel;
  status: NotificationBroadcastStatusType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  batchSize: number;
  totalRecipients: number;
  sentCount: number;
  failedCount: number;
  isAllUsers: boolean;
  isSegmented: boolean;
  isTargeted: boolean;
  isMultiChannel: boolean;
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
 * Notification Broadcast Filter
 */
export interface NotificationBroadcastFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: NotificationBroadcastType[];
  categories?: NotificationBroadcastCategory[];
  priorities?: NotificationBroadcastPriority[];
  channels?: NotificationBroadcastChannel[];
  statuses?: NotificationBroadcastStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isAllUsers?: boolean;
  isSegmented?: boolean;
  isTargeted?: boolean;
  isMultiChannel?: boolean;
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isEditable?: boolean;
  searchTerm?: string;
  title?: string;
}

/**
 * Notification Broadcast Statistics
 */
export interface NotificationBroadcastStatistics {
  userId: ID;
  totalBroadcasts: number;
  activeBroadcasts: number;
  completedBroadcasts: number;
  failedBroadcasts: number;
  editableBroadcasts: number;
  byType: Record<NotificationBroadcastType, number>;
  byCategory: Record<NotificationBroadcastCategory, number>;
  byPriority: Record<NotificationBroadcastPriority, number>;
  byChannel: Record<NotificationBroadcastChannel, number>;
  byStatus: Record<NotificationBroadcastStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  allUsersBroadcasts: number;
  segmentedBroadcasts: number;
  targetedBroadcasts: number;
  multiChannelBroadcasts: number;
  totalRecipients: number;
  averageBatchSize: number;
  successRate: number;
  failureRate: number;
  mostFrequentType: NotificationBroadcastType;
  mostFrequentCategory: NotificationBroadcastCategory;
  mostFrequentPriority: NotificationBroadcastPriority;
  mostFrequentChannel: NotificationBroadcastChannel;
  mostFrequentStatus: NotificationBroadcastStatusType;
}

/**
 * Notification Broadcast Summary
 */
export interface NotificationBroadcastSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalBroadcasts: number;
  active: number;
  completed: number;
  failed: number;
  editable: number;
  byType: Record<NotificationBroadcastType, number>;
  byCategory: Record<NotificationBroadcastCategory, number>;
  byPriority: Record<NotificationBroadcastPriority, number>;
  byChannel: Record<NotificationBroadcastChannel, number>;
  byStatus: Record<NotificationBroadcastStatusType, number>;
  broadcastTrend: {
    date: Date;
    total: number;
    active: number;
    completed: number;
  }[];
  topTypes: {
    type: NotificationBroadcastType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: NotificationBroadcastCategory;
    count: number;
    label: string;
  }[];
  topChannels: {
    channel: NotificationBroadcastChannel;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: NotificationBroadcastStatusType;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    successRate: number;
    failureRate: number;
    totalRecipients: number;
    averageBatchSize: number;
  };
}

/**
 * Notification Broadcast Configuration
 */
export interface NotificationBroadcastConfiguration {
  enabled: boolean;
  defaultType: NotificationBroadcastType;
  defaultCategory: NotificationBroadcastCategory;
  defaultPriority: NotificationBroadcastPriority;
  defaultChannel: NotificationBroadcastChannel;
  defaultBatchSize: number;
  maxBroadcastsPerUser: number;
  maxRecipientsPerBroadcast: number;
  allowAllUsers: boolean;
  allowSegmented: boolean;
  allowTargeted: boolean;
  allowMultiChannel: boolean;
  allowScheduling: boolean;
  requireApproval: boolean;
  requireTitle: boolean;
  requireBody: boolean;
  notificationOnCreate: boolean;
  notificationOnSend: boolean;
  notificationOnComplete: boolean;
  notificationOnFailure: boolean;
  alertConfig?: NotificationBroadcastAlertConfig;
}

/**
 * Notification Broadcast Alert Configuration
 */
export interface NotificationBroadcastAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  highFailureRateAlert: boolean;
  highFailureRateThreshold: number;
  delayedBroadcastAlert: boolean;
  delayedBroadcastThreshold: number;
  largeBroadcastAlert: boolean;
  largeBroadcastThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Notification Broadcast History
 */
export interface NotificationBroadcastHistory extends BaseEntity, Timestamp {
  id: ID;
  broadcastId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'send'
    | 'pause'
    | 'resume'
    | 'complete'
    | 'fail'
    | 'cancel'
    | 'delete'
    | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Notification Broadcast Validation
 */
export interface NotificationBroadcastValidation {
  isValid: boolean;
  broadcastId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Notification Broadcast Export
 */
export interface NotificationBroadcastExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: NotificationBroadcastFilter;
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
  // Notification Broadcast
  NOTIFICATIONBROADCAST,
  NotificationBroadcastType,
  NotificationBroadcastCategory,
  NotificationBroadcastPriority,
  NotificationBroadcastChannel,
  NotificationBroadcastDefault,
  NotificationBroadcastLimit,
  NotificationBroadcastError,
  notificationbroadcastGetTypeLabel,
  notificationbroadcastGetCategoryLabel,
  notificationbroadcastGetPriorityLabel,
  notificationbroadcastGetChannelLabel,
  notificationbroadcastGetErrorLabel,
  notificationbroadcastGetDefaultBatchSize,
  notificationbroadcastIsAllUsers,
  notificationbroadcastIsSegmented,
  notificationbroadcastIsTargeted,
  notificationbroadcastIsMultiChannel,
  // Notification Broadcast Status
  NOTIFICATIONBROADCAST_STATUS,
  NotificationBroadcastStatusType,
  NotificationBroadcastStatusColor,
  NotificationBroadcastStatusCategory,
  NotificationBroadcastStatusOrder,
  NotificationBroadcastStatusTransition,
  notificationbroadcastGetStatusLabel,
  notificationbroadcastGetStatusColor,
  notificationbroadcastGetStatusCategory,
  notificationbroadcastIsActive,
  notificationbroadcastIsCompleted,
  notificationbroadcastIsFailed,
  notificationbroadcastIsEditable,
  notificationbroadcastCanTransition,
  // Notification Broadcast Type
  NOTIFICATIONBROADCAST_TYPE,
  NotificationBroadcastCategoryType,
  NotificationBroadcastSubType,
  NotificationBroadcastComplexity,
  NotificationBroadcastScope,
  NotificationBroadcastPurpose,
  notificationBroadcastTypeGetCategoryLabel,
  notificationbroadcastGetSubTypeLabel,
  notificationbroadcastGetComplexityLabel,
  notificationbroadcastGetScopeLabel,
  notificationbroadcastGetPurposeLabel,
  notificationbroadcastIsMarketingCategory,
  notificationbroadcastIsTransactionalCategory,
  notificationbroadcastIsSystemCategory,
  notificationbroadcastIsAnnouncementCategory,
};
