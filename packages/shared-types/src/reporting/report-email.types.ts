/**
 * Report Email Types
 * Type definitions for report emails based on shared-constants
 * @module ReportEmailTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants reporting report-email
// ============================================================
import {
  // Email Core
  REPORT_EMAIL,
  ReportEmailType,
  ReportEmailPriority,
  ReportEmailFormat,
  ReportEmailDeliveryMethod,
  ReportEmailTemplate,
  ReportEmailHeader,
  ReportEmailAttachmentType,
  ReportEmailRecipientType,
  ReportEmailTracking,
  ReportEmailSecurity,
  reportEmailGetTypeLabel,
  reportEmailGetPriorityLabel,
  reportEmailGetFormatLabel,
  reportEmailGetDeliveryMethodLabel,
  reportEmailGetTemplateLabel,
  reportEmailGetRecipientTypeLabel,
  reportEmailGetTrackingLabel,
  reportEmailGetSecurityLabel,
  reportEmailGetAttachmentTypeLabel,
  reportEmailGetMaxRecipients,
  reportEmailGetMaxAttachments,
  reportEmailGetMaxAttachmentSize,
  reportEmailGetRetryAttempts,
  reportEmailGetRetryDelay,
  reportEmailGetTimeout,
  reportEmailIsValidType,
  reportEmailIsValidPriority,
  reportEmailIsValidFormat,
  reportEmailGetDefaultPriority,
  reportEmailGetDefaultFormat,
  reportEmailGetDefaultTemplate,
  reportEmailGenerateSubject,
  // Email Type
  REPORT_EMAIL_TYPE,
  ReportEmailTypeCategory,
  ReportEmailTypeComplexity,
  ReportEmailTypeScope,
  ReportEmailTypeFrequency,
  ReportEmailTypeAudience,
  ReportEmailTypeImportance,
  ReportEmailTypeSensitivity,
  ReportEmailTypeValidation,
  ReportEmailTypeRetention,
  reportEmailTypeGetCategoryLabel,
  reportEmailTypeGetComplexityLabel,
  reportEmailTypeGetScopeLabel,
  reportEmailTypeGetFrequencyLabel,
  reportEmailTypeGetAudienceLabel,
  reportEmailTypeGetImportanceLabel,
  reportEmailTypeGetSensitivityLabel,
  reportEmailTypeGetValidationLabel,
  reportEmailTypeGetRetentionLabel,
  reportEmailTypeIsValidCategory,
  reportEmailTypeIsValidFrequency,
  reportEmailTypeIsValidAudience,
  // Email Status
  REPORT_EMAIL_STATUS,
  ReportEmailStatusType,
  ReportEmailStatusCategory,
  ReportEmailStatusColor,
  ReportEmailStatusPriority,
  ReportEmailDeliveryStatus,
  ReportEmailProgress,
  ReportEmailErrorType,
  ReportEmailAction,
  reportEmailStatusGetLabel,
  reportEmailStatusGetCategory,
  reportEmailStatusGetColor,
  reportEmailStatusGetPriority,
  reportEmailStatusIsComplete,
  reportEmailStatusIsFailed,
  reportEmailStatusIsInProgress,
  reportEmailStatusCanTransitionTo,
  reportEmailStatusGetAvailableTransitions,
  reportEmailStatusGetProgress,
  reportEmailStatusGetErrorLabel,
  reportEmailStatusGetActionLabel,
  reportEmailStatusIsValid,
  reportEmailStatusIsValidErrorType,
  reportEmailStatusIsValidAction,
} from '@vubon/shared-constants';

// ============================================================
// Report Email Extended Types
// ============================================================

/**
 * Report Email Attachment
 */
export interface ReportEmailAttachment {
  id: string;
  type: ReportEmailAttachmentType;
  filename: string;
  content: string | Buffer;
  size: number;
  metadata?: Metadata;
}

/**
 * Report Email
 */
export interface ReportEmail extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  type: ReportEmailType;
  priority: ReportEmailPriority;
  format: ReportEmailFormat;
  deliveryMethod: ReportEmailDeliveryMethod;
  template: ReportEmailTemplate;
  recipientType: ReportEmailRecipientType;
  tracking: ReportEmailTracking;
  security: ReportEmailSecurity;
  category: ReportEmailTypeCategory;
  complexity: ReportEmailTypeComplexity;
  scope: ReportEmailTypeScope;
  frequency: ReportEmailTypeFrequency;
  audience: ReportEmailTypeAudience;
  importance: ReportEmailTypeImportance;
  sensitivity: ReportEmailTypeSensitivity;
  validation: ReportEmailTypeValidation;
  retention: ReportEmailTypeRetention;
  status: ReportEmailStatusType;
  deliveryStatus: ReportEmailDeliveryStatus;
  progress: ReportEmailProgress;
  errorType: ReportEmailErrorType;
  action: ReportEmailAction;
  subject: string;
  body: string;
  recipients: string[];
  cc: string[];
  bcc: string[];
  attachments: ReportEmailAttachment[];
  isComplete: boolean;
  isFailed: boolean;
  isInProgress: boolean;
  sentAt?: Date;
  deliveredAt?: Date;
  metadata?: Metadata;
}

/**
 * Report Email Filter
 */
export interface ReportEmailFilter {
  ids?: ID[];
  reportIds?: ID[];
  types?: ReportEmailType[];
  priorities?: ReportEmailPriority[];
  formats?: ReportEmailFormat[];
  deliveryMethods?: ReportEmailDeliveryMethod[];
  templates?: ReportEmailTemplate[];
  recipientTypes?: ReportEmailRecipientType[];
  trackings?: ReportEmailTracking[];
  securities?: ReportEmailSecurity[];
  categories?: ReportEmailTypeCategory[];
  complexities?: ReportEmailTypeComplexity[];
  scopes?: ReportEmailTypeScope[];
  frequencies?: ReportEmailTypeFrequency[];
  audiences?: ReportEmailTypeAudience[];
  importances?: ReportEmailTypeImportance[];
  sensitivities?: ReportEmailTypeSensitivity[];
  validations?: ReportEmailTypeValidation[];
  retentions?: ReportEmailTypeRetention[];
  statuses?: ReportEmailStatusType[];
  deliveryStatuses?: ReportEmailDeliveryStatus[];
  actions?: ReportEmailAction[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isComplete?: boolean;
  isFailed?: boolean;
  isInProgress?: boolean;
  searchTerm?: string;
}

/**
 * Report Email Statistics
 */
export interface ReportEmailStatistics {
  reportId: ID;
  totalEmails: number;
  completeEmails: number;
  failedEmails: number;
  inProgressEmails: number;
  byType: Record<ReportEmailType, number>;
  byPriority: Record<ReportEmailPriority, number>;
  byFormat: Record<ReportEmailFormat, number>;
  byDeliveryMethod: Record<ReportEmailDeliveryMethod, number>;
  byTemplate: Record<ReportEmailTemplate, number>;
  byRecipientType: Record<ReportEmailRecipientType, number>;
  byCategory: Record<ReportEmailTypeCategory, number>;
  byComplexity: Record<ReportEmailTypeComplexity, number>;
  byScope: Record<ReportEmailTypeScope, number>;
  byFrequency: Record<ReportEmailTypeFrequency, number>;
  byAudience: Record<ReportEmailTypeAudience, number>;
  byImportance: Record<ReportEmailTypeImportance, number>;
  bySensitivity: Record<ReportEmailTypeSensitivity, number>;
  byValidation: Record<ReportEmailTypeValidation, number>;
  byRetention: Record<ReportEmailTypeRetention, number>;
  byStatus: Record<ReportEmailStatusType, number>;
  byDeliveryStatus: Record<ReportEmailDeliveryStatus, number>;
  byErrorType: Record<ReportEmailErrorType, number>;
  byAction: Record<ReportEmailAction, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalRecipients: number;
  averageRecipients: number;
  maxRecipients: number;
  minRecipients: number;
  totalAttachments: number;
  averageAttachments: number;
  maxAttachments: number;
  minAttachments: number;
  averageAttachmentSize: number;
  maxAttachmentSize: number;
  minAttachmentSize: number;
  mostFrequentType: ReportEmailType;
  mostFrequentPriority: ReportEmailPriority;
  mostFrequentStatus: ReportEmailStatusType;
}

/**
 * Report Email Summary
 */
export interface ReportEmailSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalEmails: number;
  complete: number;
  failed: number;
  inProgress: number;
  byType: Record<ReportEmailType, number>;
  byPriority: Record<ReportEmailPriority, number>;
  byFormat: Record<ReportEmailFormat, number>;
  byDeliveryMethod: Record<ReportEmailDeliveryMethod, number>;
  byTemplate: Record<ReportEmailTemplate, number>;
  byRecipientType: Record<ReportEmailRecipientType, number>;
  byCategory: Record<ReportEmailTypeCategory, number>;
  byComplexity: Record<ReportEmailTypeComplexity, number>;
  byScope: Record<ReportEmailTypeScope, number>;
  byFrequency: Record<ReportEmailTypeFrequency, number>;
  byAudience: Record<ReportEmailTypeAudience, number>;
  byImportance: Record<ReportEmailTypeImportance, number>;
  bySensitivity: Record<ReportEmailTypeSensitivity, number>;
  byValidation: Record<ReportEmailTypeValidation, number>;
  byRetention: Record<ReportEmailTypeRetention, number>;
  byStatus: Record<ReportEmailStatusType, number>;
  byDeliveryStatus: Record<ReportEmailDeliveryStatus, number>;
  byErrorType: Record<ReportEmailErrorType, number>;
  byAction: Record<ReportEmailAction, number>;
  emailTrend: {
    date: Date;
    total: number;
    complete: number;
    failed: number;
  }[];
  topTypes: {
    type: ReportEmailType;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: ReportEmailPriority;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ReportEmailStatusType;
    count: number;
    label: string;
  }[];
  deliveryMetrics: {
    totalRecipients: number;
    averageRecipients: number;
    maxRecipients: number;
    minRecipients: number;
    successRate: number;
    failureRate: number;
  };
}

/**
 * Report Email Configuration
 */
export interface ReportEmailConfiguration {
  enabled: boolean;
  defaultType: ReportEmailType;
  defaultPriority: ReportEmailPriority;
  defaultFormat: ReportEmailFormat;
  defaultDeliveryMethod: ReportEmailDeliveryMethod;
  defaultTemplate: ReportEmailTemplate;
  defaultRecipientType: ReportEmailRecipientType;
  maxRecipients: number;
  maxAttachments: number;
  maxAttachmentSize: number;
  retryAttempts: number;
  retryDelay: number;
  timeout: number;
  requireApproval: boolean;
  allowCustomization: boolean;
  allowScheduling: boolean;
  autoSend: boolean;
  notificationOnCreate: boolean;
  notificationOnComplete: boolean;
  notificationOnFailed: boolean;
  notificationOnInProgress: boolean;
  alertConfig?: ReportEmailAlertConfig;
}

/**
 * Report Email Alert Configuration
 */
export interface ReportEmailAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  failureThreshold: number;
  sizeLimitAlert: boolean;
  sizeLimitThreshold: number;
  timeoutAlert: boolean;
  timeoutThreshold: number;
  recipientLimitAlert: boolean;
  recipientLimitThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Report Email History
 */
export interface ReportEmailHistory extends BaseEntity, Timestamp {
  id: ID;
  emailId: ID;
  reportId: ID;
  action:
    'create' | 'update' | 'send' | 'complete' | 'fail' | 'retry' | 'cancel' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Report Email Validation
 */
export interface ReportEmailValidation {
  isValid: boolean;
  emailId: ID;
  reportId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Report Email Delivery
 */
export interface ReportEmailDelivery extends BaseEntity, Timestamp {
  id: ID;
  emailId: ID;
  reportId: ID;
  recipient: string;
  sentAt: Date;
  deliveredAt?: Date;
  status: ReportEmailDeliveryStatus;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Email Core
  REPORT_EMAIL,
  ReportEmailType,
  ReportEmailPriority,
  ReportEmailFormat,
  ReportEmailDeliveryMethod,
  ReportEmailTemplate,
  ReportEmailHeader,
  ReportEmailAttachmentType,
  ReportEmailRecipientType,
  ReportEmailTracking,
  ReportEmailSecurity,
  reportEmailGetTypeLabel,
  reportEmailGetPriorityLabel,
  reportEmailGetFormatLabel,
  reportEmailGetDeliveryMethodLabel,
  reportEmailGetTemplateLabel,
  reportEmailGetRecipientTypeLabel,
  reportEmailGetTrackingLabel,
  reportEmailGetSecurityLabel,
  reportEmailGetAttachmentTypeLabel,
  reportEmailGetMaxRecipients,
  reportEmailGetMaxAttachments,
  reportEmailGetMaxAttachmentSize,
  reportEmailGetRetryAttempts,
  reportEmailGetRetryDelay,
  reportEmailGetTimeout,
  reportEmailIsValidType,
  reportEmailIsValidPriority,
  reportEmailIsValidFormat,
  reportEmailGetDefaultPriority,
  reportEmailGetDefaultFormat,
  reportEmailGetDefaultTemplate,
  reportEmailGenerateSubject,
  // Email Type
  REPORT_EMAIL_TYPE,
  ReportEmailTypeCategory,
  ReportEmailTypeComplexity,
  ReportEmailTypeScope,
  ReportEmailTypeFrequency,
  ReportEmailTypeAudience,
  ReportEmailTypeImportance,
  ReportEmailTypeSensitivity,
  ReportEmailTypeValidation,
  ReportEmailTypeRetention,
  reportEmailTypeGetCategoryLabel,
  reportEmailTypeGetComplexityLabel,
  reportEmailTypeGetScopeLabel,
  reportEmailTypeGetFrequencyLabel,
  reportEmailTypeGetAudienceLabel,
  reportEmailTypeGetImportanceLabel,
  reportEmailTypeGetSensitivityLabel,
  reportEmailTypeGetValidationLabel,
  reportEmailTypeGetRetentionLabel,
  reportEmailTypeIsValidCategory,
  reportEmailTypeIsValidFrequency,
  reportEmailTypeIsValidAudience,
  // Email Status
  REPORT_EMAIL_STATUS,
  ReportEmailStatusType,
  ReportEmailStatusCategory,
  ReportEmailStatusColor,
  ReportEmailStatusPriority,
  ReportEmailDeliveryStatus,
  ReportEmailProgress,
  ReportEmailErrorType,
  ReportEmailAction,
  reportEmailStatusGetLabel,
  reportEmailStatusGetCategory,
  reportEmailStatusGetColor,
  reportEmailStatusGetPriority,
  reportEmailStatusIsComplete,
  reportEmailStatusIsFailed,
  reportEmailStatusIsInProgress,
  reportEmailStatusCanTransitionTo,
  reportEmailStatusGetAvailableTransitions,
  reportEmailStatusGetProgress,
  reportEmailStatusGetErrorLabel,
  reportEmailStatusGetActionLabel,
  reportEmailStatusIsValid,
  reportEmailStatusIsValidErrorType,
  reportEmailStatusIsValidAction,
};
