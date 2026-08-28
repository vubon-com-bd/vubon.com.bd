/**
 * Support Email Types
 * Type definitions for support emails based on shared-constants
 * @module SupportEmailTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support support-email
// ============================================================
import {
  // Support Email Core
  SUPPORT_EMAIL,
  SupportEmailType,
  SupportEmailStatus,
  SupportEmailPriority,
  SupportEmailCategory,
  SupportEmailFormat,
  supportEmailGetTypeLabel,
  supportEmailGetStatusLabel,
  supportEmailGetPriorityLabel,
  supportEmailGetCategoryLabel,
  supportEmailGetFormatLabel,
  supportEmailIsSent,
  supportEmailIsFailed,
  // Support Email Type
  SUPPORT_EMAIL_TYPE,
  SupportEmailTypeCategory,
  SupportEmailTypeScope,
  SupportEmailTypeChannel,
  SupportEmailTypeTemplate,
  SupportEmailTypePriority,
  supportEmailTypeGetCategoryLabel,
  supportEmailTypeGetScopeLabel,
  supportEmailTypeGetChannelLabel,
  supportEmailTypeGetTemplateLabel,
  supportEmailTypeGetPriorityLabel,
  // Support Email Status
  SUPPORT_EMAIL_STATUS,
  SupportEmailStatusType,
  SupportEmailStatusCategory,
  SupportEmailStatusColor,
  SupportEmailStatusIcon,
  SupportEmailStatusTransition,
  supportEmailStatusGetLabel,
  supportEmailStatusIsSent,
  supportEmailStatusIsFailed,
  supportEmailStatusIsPending,
  supportEmailStatusGetCategory,
  supportEmailStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Support Email Extended Types
// ============================================================

/**
 * Support email
 */
export interface SupportEmail extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  ticketId?: ID;
  type: SupportEmailType;
  status: SupportEmailStatus;
  priority: SupportEmailPriority;
  category: SupportEmailCategory;
  format: SupportEmailFormat;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  isSent: boolean;
  isFailed: boolean;
  isPending: boolean;
  sentAt?: Date;
  failedAt?: Date;
  errorMessage?: string;
  metadata?: Metadata;
}

/**
 * Support email filter
 */
export interface SupportEmailFilter {
  ids?: ID[];
  userIds?: ID[];
  ticketIds?: ID[];
  types?: SupportEmailType[];
  statuses?: SupportEmailStatus[];
  priorities?: SupportEmailPriority[];
  categories?: SupportEmailCategory[];
  formats?: SupportEmailFormat[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isSent?: boolean;
  isFailed?: boolean;
  isPending?: boolean;
  searchTerm?: string;
  from?: string;
  to?: string;
  subject?: string;
}

/**
 * Support email statistics
 */
export interface SupportEmailStatistics {
  userId: ID;
  totalEmails: number;
  sentEmails: number;
  failedEmails: number;
  pendingEmails: number;
  byType: Record<SupportEmailType, number>;
  byStatus: Record<SupportEmailStatus, number>;
  byPriority: Record<SupportEmailPriority, number>;
  byCategory: Record<SupportEmailCategory, number>;
  byFormat: Record<SupportEmailFormat, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageSendTime: number;
  maxSendTime: number;
  minSendTime: number;
  successRate: number;
  failureRate: number;
  mostFrequentType: SupportEmailType;
  mostFrequentStatus: SupportEmailStatus;
  mostFrequentPriority: SupportEmailPriority;
  mostFrequentCategory: SupportEmailCategory;
}

/**
 * Support email summary
 */
export interface SupportEmailSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalEmails: number;
  sent: number;
  failed: number;
  pending: number;
  byType: Record<SupportEmailType, number>;
  byStatus: Record<SupportEmailStatus, number>;
  byPriority: Record<SupportEmailPriority, number>;
  byCategory: Record<SupportEmailCategory, number>;
  byFormat: Record<SupportEmailFormat, number>;
  emailTrend: {
    date: Date;
    total: number;
    sent: number;
    failed: number;
  }[];
  topTypes: {
    type: SupportEmailType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SupportEmailStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: SupportEmailPriority;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: SupportEmailCategory;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: SupportEmailFormat;
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
 * Support email configuration
 */
export interface SupportEmailConfiguration {
  enabled: boolean;
  defaultType: SupportEmailType;
  defaultStatus: SupportEmailStatus;
  defaultPriority: SupportEmailPriority;
  defaultCategory: SupportEmailCategory;
  defaultFormat: SupportEmailFormat;
  fromEmail: string;
  fromName: string;
  replyTo?: string;
  requireSubject: boolean;
  requireBody: boolean;
  maxRecipients: number;
  maxRetries: number;
  retryDelayMinutes: number;
  timeoutSeconds: number;
  notificationOnSent: boolean;
  notificationOnFailed: boolean;
  notificationOnPending: boolean;
  alertConfig?: SupportEmailAlertConfig;
}

/**
 * Support email alert configuration
 */
export interface SupportEmailAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  highFailureRateAlert: boolean;
  highFailureRateThreshold: number;
  pendingEmailAlert: boolean;
  pendingThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Support email history
 */
export interface SupportEmailHistory extends BaseEntity, Timestamp {
  id: ID;
  emailId: ID;
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
 * Support email validation
 */
export interface SupportEmailValidation {
  isValid: boolean;
  emailId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Support email export
 */
export interface SupportEmailExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'eml' | 'html';
  filter: SupportEmailFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Support email attachment
 */
export interface SupportEmailAttachment extends BaseEntity, Timestamp {
  id: ID;
  emailId: ID;
  userId: ID;
  filename: string;
  fileSize: number;
  mimeType: string;
  url: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Support Email Core
  SUPPORT_EMAIL,
  SupportEmailType,
  SupportEmailStatus,
  SupportEmailPriority,
  SupportEmailCategory,
  SupportEmailFormat,
  supportEmailGetTypeLabel,
  supportEmailGetStatusLabel,
  supportEmailGetPriorityLabel,
  supportEmailGetCategoryLabel,
  supportEmailGetFormatLabel,
  supportEmailIsSent,
  supportEmailIsFailed,
  // Support Email Type
  SUPPORT_EMAIL_TYPE,
  SupportEmailTypeCategory,
  SupportEmailTypeScope,
  SupportEmailTypeChannel,
  SupportEmailTypeTemplate,
  SupportEmailTypePriority,
  supportEmailTypeGetCategoryLabel,
  supportEmailTypeGetScopeLabel,
  supportEmailTypeGetChannelLabel,
  supportEmailTypeGetTemplateLabel,
  supportEmailTypeGetPriorityLabel,
  // Support Email Status
  SUPPORT_EMAIL_STATUS,
  SupportEmailStatusType,
  SupportEmailStatusCategory,
  SupportEmailStatusColor,
  SupportEmailStatusIcon,
  SupportEmailStatusTransition,
  supportEmailStatusGetLabel,
  supportEmailStatusIsSent,
  supportEmailStatusIsFailed,
  supportEmailStatusIsPending,
  supportEmailStatusGetCategory,
  supportEmailStatusCanTransition,
};
