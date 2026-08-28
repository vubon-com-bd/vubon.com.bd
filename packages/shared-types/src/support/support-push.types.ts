/**
 * Support Push Types
 * Type definitions for support push notifications based on shared-constants
 * @module SupportPushTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support support-push
// ============================================================
import {
  // Support Push Core
  SUPPORT_PUSH,
  SupportPushType,
  SupportPushStatus,
  SupportPushPriority,
  SupportPushCategory,
  SupportPushPlatform,
  supportPushGetTypeLabel,
  supportPushGetStatusLabel,
  supportPushGetPriorityLabel,
  supportPushGetCategoryLabel,
  supportPushGetPlatformLabel,
  supportPushIsSent,
  supportPushIsFailed,
  // Support Push Type
  SUPPORT_PUSH_TYPE,
  SupportPushTypeCategory,
  SupportPushTypeScope,
  SupportPushTypeChannel,
  SupportPushTypeAction,
  SupportPushTypeSound,
  SupportPushTypeUrgency,
  supportPushTypeGetCategoryLabel,
  supportPushTypeGetScopeLabel,
  supportPushTypeGetChannelLabel,
  supportPushTypeGetActionLabel,
  supportPushTypeGetSoundLabel,
  supportPushTypeGetUrgencyLabel,
} from '@vubon/shared-constants';

// ============================================================
// Support Push Extended Types
// ============================================================

/**
 * Support push notification
 */
export interface SupportPush extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  ticketId?: ID;
  type: SupportPushType;
  status: SupportPushStatus;
  priority: SupportPushPriority;
  category: SupportPushCategory;
  platform: SupportPushPlatform;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  isSent: boolean;
  isFailed: boolean;
  sentAt?: Date;
  failedAt?: Date;
  errorMessage?: string;
  metadata?: Metadata;
}

/**
 * Support push filter
 */
export interface SupportPushFilter {
  ids?: ID[];
  userIds?: ID[];
  ticketIds?: ID[];
  types?: SupportPushType[];
  statuses?: SupportPushStatus[];
  priorities?: SupportPushPriority[];
  categories?: SupportPushCategory[];
  platforms?: SupportPushPlatform[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isSent?: boolean;
  isFailed?: boolean;
  searchTerm?: string;
}

/**
 * Support push statistics
 */
export interface SupportPushStatistics {
  userId: ID;
  totalPushes: number;
  sentPushes: number;
  failedPushes: number;
  byType: Record<SupportPushType, number>;
  byStatus: Record<SupportPushStatus, number>;
  byPriority: Record<SupportPushPriority, number>;
  byCategory: Record<SupportPushCategory, number>;
  byPlatform: Record<SupportPushPlatform, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageSendTime: number;
  maxSendTime: number;
  minSendTime: number;
  successRate: number;
  failureRate: number;
  mostFrequentType: SupportPushType;
  mostFrequentStatus: SupportPushStatus;
  mostFrequentPriority: SupportPushPriority;
  mostFrequentCategory: SupportPushCategory;
  mostFrequentPlatform: SupportPushPlatform;
}

/**
 * Support push summary
 */
export interface SupportPushSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPushes: number;
  sent: number;
  failed: number;
  byType: Record<SupportPushType, number>;
  byStatus: Record<SupportPushStatus, number>;
  byPriority: Record<SupportPushPriority, number>;
  byCategory: Record<SupportPushCategory, number>;
  byPlatform: Record<SupportPushPlatform, number>;
  pushTrend: {
    date: Date;
    total: number;
    sent: number;
    failed: number;
  }[];
  topTypes: {
    type: SupportPushType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SupportPushStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: SupportPushPriority;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: SupportPushCategory;
    count: number;
    label: string;
  }[];
  topPlatforms: {
    platform: SupportPushPlatform;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    successRate: number;
    failureRate: number;
    averageSendTime: number;
  };
}

/**
 * Support push configuration
 */
export interface SupportPushConfiguration {
  enabled: boolean;
  defaultType: SupportPushType;
  defaultStatus: SupportPushStatus;
  defaultPriority: SupportPushPriority;
  defaultCategory: SupportPushCategory;
  defaultPlatform: SupportPushPlatform;
  requireTitle: boolean;
  requireBody: boolean;
  maxRetries: number;
  retryDelayMinutes: number;
  timeoutSeconds: number;
  maxPayloadSize: number;
  notificationOnSent: boolean;
  notificationOnFailed: boolean;
  alertConfig?: SupportPushAlertConfig;
}

/**
 * Support push alert configuration
 */
export interface SupportPushAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  highFailureRateAlert: boolean;
  highFailureRateThreshold: number;
  platformErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Support push history
 */
export interface SupportPushHistory extends BaseEntity, Timestamp {
  id: ID;
  pushId: ID;
  userId: ID;
  action: 'create' | 'update' | 'send' | 'fail' | 'retry' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Support push validation
 */
export interface SupportPushValidation {
  isValid: boolean;
  pushId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Support push export
 */
export interface SupportPushExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SupportPushFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Support push device
 */
export interface SupportPushDevice extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  platform: SupportPushPlatform;
  deviceToken: string;
  deviceName?: string;
  deviceModel?: string;
  osVersion?: string;
  appVersion?: string;
  isActive: boolean;
  lastActiveAt?: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Support Push Core
  SUPPORT_PUSH,
  SupportPushType,
  SupportPushStatus,
  SupportPushPriority,
  SupportPushCategory,
  SupportPushPlatform,
  supportPushGetTypeLabel,
  supportPushGetStatusLabel,
  supportPushGetPriorityLabel,
  supportPushGetCategoryLabel,
  supportPushGetPlatformLabel,
  supportPushIsSent,
  supportPushIsFailed,
  // Support Push Type
  SUPPORT_PUSH_TYPE,
  SupportPushTypeCategory,
  SupportPushTypeScope,
  SupportPushTypeChannel,
  SupportPushTypeAction,
  SupportPushTypeSound,
  SupportPushTypeUrgency,
  supportPushTypeGetCategoryLabel,
  supportPushTypeGetScopeLabel,
  supportPushTypeGetChannelLabel,
  supportPushTypeGetActionLabel,
  supportPushTypeGetSoundLabel,
  supportPushTypeGetUrgencyLabel,
};
