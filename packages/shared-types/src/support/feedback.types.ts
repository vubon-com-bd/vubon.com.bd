/**
 * Feedback Types
 * Type definitions for support feedback based on shared-constants
 * @module FeedbackTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support feedback
// ============================================================
import {
  // Feedback Core
  SUPPORT_FEEDBACK,
  SupportFeedbackType,
  SupportFeedbackStatus,
  SupportFeedbackPriority,
  SupportFeedbackChannel,
  supportFeedbackGetTypeLabel,
  supportFeedbackGetStatusLabel,
  supportFeedbackGetPriorityLabel,
  supportFeedbackGetChannelLabel,
  supportFeedbackIsResolved,
  supportFeedbackIsPending,
  supportFeedbackIsPositive,
  supportFeedbackIsNegative,
  // Feedback Type
  SUPPORT_FEEDBACK_TYPE,
  SupportFeedbackTypeType,
  SupportFeedbackTypeCategory,
  SupportFeedbackTypeIcon,
  SupportFeedbackTypeColor,
  supportFeedbackTypeGetLabel,
  supportFeedbackTypeGetIcon,
  supportFeedbackTypeGetColor,
  supportFeedbackTypeGetPriority,
  supportFeedbackTypeGetCategory,
  // Feedback Status
  SUPPORT_FEEDBACK_STATUS,
  SupportFeedbackStatusType,
  SupportFeedbackStatusCategory,
  SupportFeedbackStatusColor,
  SupportFeedbackStatusIcon,
  SupportFeedbackStatusTransition,
  supportFeedbackStatusGetLabel,
  supportFeedbackStatusIsResolved,
  supportFeedbackStatusIsPending,
  supportFeedbackStatusIsActive,
  supportFeedbackStatusGetCategory,
  supportFeedbackStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Feedback Extended Types
// ============================================================

/**
 * Feedback
 */
export interface Feedback extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: SupportFeedbackType;
  status: SupportFeedbackStatus;
  priority: SupportFeedbackPriority;
  channel: SupportFeedbackChannel;
  title: string;
  description: string;
  rating: number;
  isResolved: boolean;
  isPending: boolean;
  isPositive: boolean;
  isNegative: boolean;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Feedback filter
 */
export interface FeedbackFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: SupportFeedbackType[];
  statuses?: SupportFeedbackStatus[];
  priorities?: SupportFeedbackPriority[];
  channels?: SupportFeedbackChannel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minRating?: number;
  maxRating?: number;
  isResolved?: boolean;
  isPending?: boolean;
  isPositive?: boolean;
  isNegative?: boolean;
  isActive?: boolean;
  searchTerm?: string;
}

/**
 * Feedback statistics
 */
export interface FeedbackStatistics {
  userId: ID;
  totalFeedbacks: number;
  resolvedFeedbacks: number;
  pendingFeedbacks: number;
  positiveFeedbacks: number;
  negativeFeedbacks: number;
  activeFeedbacks: number;
  byType: Record<SupportFeedbackType, number>;
  byStatus: Record<SupportFeedbackStatus, number>;
  byPriority: Record<SupportFeedbackPriority, number>;
  byChannel: Record<SupportFeedbackChannel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageRating: number;
  maxRating: number;
  minRating: number;
  resolutionRate: number;
  positiveRate: number;
  negativeRate: number;
  mostFrequentType: SupportFeedbackType;
  mostFrequentStatus: SupportFeedbackStatus;
  mostFrequentPriority: SupportFeedbackPriority;
  mostFrequentChannel: SupportFeedbackChannel;
}

/**
 * Feedback summary
 */
export interface FeedbackSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalFeedbacks: number;
  resolved: number;
  pending: number;
  positive: number;
  negative: number;
  active: number;
  byType: Record<SupportFeedbackType, number>;
  byStatus: Record<SupportFeedbackStatus, number>;
  byPriority: Record<SupportFeedbackPriority, number>;
  byChannel: Record<SupportFeedbackChannel, number>;
  feedbackTrend: {
    date: Date;
    total: number;
    resolved: number;
    pending: number;
  }[];
  topTypes: {
    type: SupportFeedbackType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SupportFeedbackStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: SupportFeedbackPriority;
    count: number;
    label: string;
  }[];
  topChannels: {
    channel: SupportFeedbackChannel;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageRating: number;
    resolutionRate: number;
    positiveRate: number;
    negativeRate: number;
  };
}

/**
 * Feedback configuration
 */
export interface FeedbackConfiguration {
  enabled: boolean;
  defaultType: SupportFeedbackType;
  defaultStatus: SupportFeedbackStatus;
  defaultPriority: SupportFeedbackPriority;
  defaultChannel: SupportFeedbackChannel;
  requireTitle: boolean;
  requireDescription: boolean;
  requireRating: boolean;
  allowAnonymous: boolean;
  autoResolve: boolean;
  resolveAfterDays: number;
  notificationOnCreate: boolean;
  notificationOnResolve: boolean;
  notificationOnUpdate: boolean;
  alertConfig?: FeedbackAlertConfig;
}

/**
 * Feedback alert configuration
 */
export interface FeedbackAlertConfig {
  enabled: boolean;
  negativeFeedbackAlert: boolean;
  lowRatingAlert: boolean;
  lowRatingThreshold: number;
  pendingFeedbackAlert: boolean;
  pendingFeedbackThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Feedback history
 */
export interface FeedbackHistory extends BaseEntity, Timestamp {
  id: ID;
  feedbackId: ID;
  userId: ID;
  action: 'create' | 'update' | 'resolve' | 'unresolve' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Feedback validation
 */
export interface FeedbackValidation {
  isValid: boolean;
  feedbackId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Feedback export
 */
export interface FeedbackExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: FeedbackFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Feedback response
 */
export interface FeedbackResponse extends BaseEntity, Timestamp {
  id: ID;
  feedbackId: ID;
  userId: ID;
  response: string;
  isPublic: boolean;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Feedback Core
  SUPPORT_FEEDBACK,
  SupportFeedbackType,
  SupportFeedbackStatus,
  SupportFeedbackPriority,
  SupportFeedbackChannel,
  supportFeedbackGetTypeLabel,
  supportFeedbackGetStatusLabel,
  supportFeedbackGetPriorityLabel,
  supportFeedbackGetChannelLabel,
  supportFeedbackIsResolved,
  supportFeedbackIsPending,
  supportFeedbackIsPositive,
  supportFeedbackIsNegative,
  // Feedback Type
  SUPPORT_FEEDBACK_TYPE,
  SupportFeedbackTypeType,
  SupportFeedbackTypeCategory,
  SupportFeedbackTypeIcon,
  SupportFeedbackTypeColor,
  supportFeedbackTypeGetLabel,
  supportFeedbackTypeGetIcon,
  supportFeedbackTypeGetColor,
  supportFeedbackTypeGetPriority,
  supportFeedbackTypeGetCategory,
  // Feedback Status
  SUPPORT_FEEDBACK_STATUS,
  SupportFeedbackStatusType,
  SupportFeedbackStatusCategory,
  SupportFeedbackStatusColor,
  SupportFeedbackStatusIcon,
  SupportFeedbackStatusTransition,
  supportFeedbackStatusGetLabel,
  supportFeedbackStatusIsResolved,
  supportFeedbackStatusIsPending,
  supportFeedbackStatusIsActive,
  supportFeedbackStatusGetCategory,
  supportFeedbackStatusCanTransition,
};
