/**
 * Support SMS Types
 * Type definitions for support SMS based on shared-constants
 * @module SupportSMSTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support support-sms
// ============================================================
import {
  // Support SMS Core
  SUPPORT_SMS,
  SupportSMSType,
  SupportSMSStatus,
  SupportSMSPriority,
  SupportSMSCategory,
  SupportSMSProvider,
  supportSMSGetTypeLabel,
  supportSMSGetStatusLabel,
  supportSMSGetPriorityLabel,
  supportSMSGetCategoryLabel,
  supportSMSIsSent,
  supportSMSIsFailed,
  supportSMSGetProviderLabel,
  // Support SMS Type
  SUPPORT_SMS_TYPE,
  SupportSMSTypeCategory,
  SupportSMSTypeScope,
  SupportSMSTypeChannel,
  SupportSMSTypeTemplate,
  SupportSMSTypePriority,
  supportSMSTypeGetCategoryLabel,
  supportSMSTypeGetScopeLabel,
  supportSMSTypeGetChannelLabel,
  supportSMSTypeGetTemplateLabel,
  supportSMSTypeGetPriorityLabel,
} from '@vubon/shared-constants';

// ============================================================
// Support SMS Extended Types
// ============================================================

/**
 * Support SMS
 */
export interface SupportSMS extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  ticketId?: ID;
  type: SupportSMSType;
  status: SupportSMSStatus;
  priority: SupportSMSPriority;
  category: SupportSMSCategory;
  provider: SupportSMSProvider;
  from: string;
  to: string;
  body: string;
  isSent: boolean;
  isFailed: boolean;
  sentAt?: Date;
  failedAt?: Date;
  errorMessage?: string;
  metadata?: Metadata;
}

/**
 * Support SMS filter
 */
export interface SupportSMSFilter {
  ids?: ID[];
  userIds?: ID[];
  ticketIds?: ID[];
  types?: SupportSMSType[];
  statuses?: SupportSMSStatus[];
  priorities?: SupportSMSPriority[];
  categories?: SupportSMSCategory[];
  providers?: SupportSMSProvider[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isSent?: boolean;
  isFailed?: boolean;
  searchTerm?: string;
  from?: string;
  to?: string;
}

/**
 * Support SMS statistics
 */
export interface SupportSMSStatistics {
  userId: ID;
  totalSMS: number;
  sentSMS: number;
  failedSMS: number;
  byType: Record<SupportSMSType, number>;
  byStatus: Record<SupportSMSStatus, number>;
  byPriority: Record<SupportSMSPriority, number>;
  byCategory: Record<SupportSMSCategory, number>;
  byProvider: Record<SupportSMSProvider, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageSendTime: number;
  maxSendTime: number;
  minSendTime: number;
  successRate: number;
  failureRate: number;
  mostFrequentType: SupportSMSType;
  mostFrequentStatus: SupportSMSStatus;
  mostFrequentPriority: SupportSMSPriority;
  mostFrequentCategory: SupportSMSCategory;
  mostFrequentProvider: SupportSMSProvider;
}

/**
 * Support SMS summary
 */
export interface SupportSMSSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSMS: number;
  sent: number;
  failed: number;
  byType: Record<SupportSMSType, number>;
  byStatus: Record<SupportSMSStatus, number>;
  byPriority: Record<SupportSMSPriority, number>;
  byCategory: Record<SupportSMSCategory, number>;
  byProvider: Record<SupportSMSProvider, number>;
  smsTrend: {
    date: Date;
    total: number;
    sent: number;
    failed: number;
  }[];
  topTypes: {
    type: SupportSMSType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SupportSMSStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: SupportSMSPriority;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: SupportSMSCategory;
    count: number;
    label: string;
  }[];
  topProviders: {
    provider: SupportSMSProvider;
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
 * Support SMS configuration
 */
export interface SupportSMSConfiguration {
  enabled: boolean;
  defaultType: SupportSMSType;
  defaultStatus: SupportSMSStatus;
  defaultPriority: SupportSMSPriority;
  defaultCategory: SupportSMSCategory;
  defaultProvider: SupportSMSProvider;
  fromNumber: string;
  requireBody: boolean;
  maxRetries: number;
  retryDelayMinutes: number;
  timeoutSeconds: number;
  maxMessageLength: number;
  notificationOnSent: boolean;
  notificationOnFailed: boolean;
  alertConfig?: SupportSMSAlertConfig;
}

/**
 * Support SMS alert configuration
 */
export interface SupportSMSAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  highFailureRateAlert: boolean;
  highFailureRateThreshold: number;
  providerErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Support SMS history
 */
export interface SupportSMSHistory extends BaseEntity, Timestamp {
  id: ID;
  smsId: ID;
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
 * Support SMS validation
 */
export interface SupportSMSValidation {
  isValid: boolean;
  smsId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Support SMS export
 */
export interface SupportSMSExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SupportSMSFilter;
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
  // Support SMS Core
  SUPPORT_SMS,
  SupportSMSType,
  SupportSMSStatus,
  SupportSMSPriority,
  SupportSMSCategory,
  SupportSMSProvider,
  supportSMSGetTypeLabel,
  supportSMSGetStatusLabel,
  supportSMSGetPriorityLabel,
  supportSMSGetCategoryLabel,
  supportSMSIsSent,
  supportSMSIsFailed,
  supportSMSGetProviderLabel,
  // Support SMS Type
  SUPPORT_SMS_TYPE,
  SupportSMSTypeCategory,
  SupportSMSTypeScope,
  SupportSMSTypeChannel,
  SupportSMSTypeTemplate,
  SupportSMSTypePriority,
  supportSMSTypeGetCategoryLabel,
  supportSMSTypeGetScopeLabel,
  supportSMSTypeGetChannelLabel,
  supportSMSTypeGetTemplateLabel,
  supportSMSTypeGetPriorityLabel,
};
