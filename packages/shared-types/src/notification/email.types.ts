/**
 * Email Types
 * Type definitions for email notifications based on shared-constants
 * @module EmailTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification email
// ============================================================
import {
  // Email
  NOTIFICATIONEMAIL,
  NotificationEmailType,
  NotificationEmailCategory,
  NotificationEmailPriority,
  NotificationEmailFormat,
  NotificationEmailProvider,
  NotificationEmailSendingMethod,
  NotificationEmailTrackingType,
  NotificationEmailDefault,
  NotificationEmailLimit,
  NotificationEmailError,
  notificationemailGetTypeLabel,
  notificationemailGetCategoryLabel,
  notificationemailGetPriorityLabel,
  notificationemailGetFormatLabel,
  notificationemailGetProviderLabel,
  notificationemailGetSendingMethodLabel,
  notificationemailGetTrackingTypeLabel,
  notificationemailGetErrorLabel,
  notificationemailGetDefaultFromName,
  notificationemailGetDefaultFromEmail,
  notificationemailGetMaxEmailsPerDay,
  notificationemailIsTransactional,
  notificationemailIsMarketing,
  notificationemailIsSystem,
  // Email Status
  NOTIFICATIONEMAIL_STATUS,
  NotificationEmailStatusType,
  NotificationEmailStatusColor,
  NotificationEmailStatusCategory,
  NotificationEmailStatusOrder,
  NotificationEmailStatusTransition,
  notificationemailGetStatusLabel,
  notificationemailGetStatusColor,
  notificationemailGetStatusCategory,
  notificationemailIsDelivered,
  notificationemailIsEngaged,
  notificationemailIsFailed,
  notificationemailIsPending,
  notificationemailCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Email Extended Types
// ============================================================

/**
 * Email Notification
 */
export interface EmailNotification extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: NotificationEmailType;
  category: NotificationEmailCategory;
  priority: NotificationEmailPriority;
  format: NotificationEmailFormat;
  provider: NotificationEmailProvider;
  sendingMethod: NotificationEmailSendingMethod;
  trackingType: NotificationEmailTrackingType;
  status: NotificationEmailStatusType;
  fromName: string;
  fromEmail: string;
  toEmail: string;
  subject: string;
  body: string;
  htmlBody?: string;
  isTransactional: boolean;
  isMarketing: boolean;
  isSystem: boolean;
  isDelivered: boolean;
  isEngaged: boolean;
  isFailed: boolean;
  isPending: boolean;
  deliveredAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata?: Metadata;
}

/**
 * Email Filter
 */
export interface EmailFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: NotificationEmailType[];
  categories?: NotificationEmailCategory[];
  priorities?: NotificationEmailPriority[];
  statuses?: NotificationEmailStatusType[];
  providers?: NotificationEmailProvider[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isTransactional?: boolean;
  isMarketing?: boolean;
  isSystem?: boolean;
  isDelivered?: boolean;
  isEngaged?: boolean;
  isFailed?: boolean;
  isPending?: boolean;
  searchTerm?: string;
  fromEmail?: string;
  toEmail?: string;
  subject?: string;
}

/**
 * Email Statistics
 */
export interface EmailStatistics {
  userId: ID;
  totalEmails: number;
  deliveredEmails: number;
  openedEmails: number;
  clickedEmails: number;
  failedEmails: number;
  pendingEmails: number;
  byType: Record<NotificationEmailType, number>;
  byCategory: Record<NotificationEmailCategory, number>;
  byPriority: Record<NotificationEmailPriority, number>;
  byProvider: Record<NotificationEmailProvider, number>;
  byStatus: Record<NotificationEmailStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  failureRate: number;
  mostFrequentType: NotificationEmailType;
  mostFrequentCategory: NotificationEmailCategory;
  mostFrequentPriority: NotificationEmailPriority;
  mostFrequentProvider: NotificationEmailProvider;
}

/**
 * Email Summary
 */
export interface EmailSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalEmails: number;
  delivered: number;
  opened: number;
  clicked: number;
  failed: number;
  pending: number;
  byType: Record<NotificationEmailType, number>;
  byCategory: Record<NotificationEmailCategory, number>;
  byPriority: Record<NotificationEmailPriority, number>;
  byProvider: Record<NotificationEmailProvider, number>;
  byStatus: Record<NotificationEmailStatusType, number>;
  emailTrend: {
    date: Date;
    total: number;
    delivered: number;
    opened: number;
  }[];
  topTypes: {
    type: NotificationEmailType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: NotificationEmailCategory;
    count: number;
    label: string;
  }[];
  topProviders: {
    provider: NotificationEmailProvider;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    bounceRate: number;
    failureRate: number;
  };
}

/**
 * Email Configuration
 */
export interface EmailConfiguration {
  enabled: boolean;
  defaultType: NotificationEmailType;
  defaultCategory: NotificationEmailCategory;
  defaultPriority: NotificationEmailPriority;
  defaultFormat: NotificationEmailFormat;
  defaultProvider: NotificationEmailProvider;
  defaultSendingMethod: NotificationEmailSendingMethod;
  defaultTrackingType: NotificationEmailTrackingType;
  defaultFromName: string;
  defaultFromEmail: string;
  maxEmailsPerDay: number;
  maxRetries: number;
  retryDelaySeconds: number;
  enableTracking: boolean;
  enableOpenTracking: boolean;
  enableClickTracking: boolean;
  enableBounceTracking: boolean;
  notificationOnDelivery: boolean;
  notificationOnOpen: boolean;
  notificationOnClick: boolean;
  notificationOnFailure: boolean;
  alertConfig?: EmailAlertConfig;
}

/**
 * Email Alert Configuration
 */
export interface EmailAlertConfig {
  enabled: boolean;
  deliveryFailureAlert: boolean;
  bounceAlert: boolean;
  highBounceRateAlert: boolean;
  highBounceRateThreshold: number;
  highFailureRateAlert: boolean;
  highFailureRateThreshold: number;
  lowOpenRateAlert: boolean;
  lowOpenRateThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Email History
 */
export interface EmailHistory extends BaseEntity, Timestamp {
  id: ID;
  emailId: ID;
  userId: ID;
  action: 'create' | 'send' | 'deliver' | 'open' | 'click' | 'bounce' | 'fail' | 'retry';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Email Validation
 */
export interface EmailValidation {
  isValid: boolean;
  emailId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Email Export
 */
export interface EmailExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: EmailFilter;
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
  // Email
  NOTIFICATIONEMAIL,
  NotificationEmailType,
  NotificationEmailCategory,
  NotificationEmailPriority,
  NotificationEmailFormat,
  NotificationEmailProvider,
  NotificationEmailSendingMethod,
  NotificationEmailTrackingType,
  NotificationEmailDefault,
  NotificationEmailLimit,
  NotificationEmailError,
  notificationemailGetTypeLabel,
  notificationemailGetCategoryLabel,
  notificationemailGetPriorityLabel,
  notificationemailGetFormatLabel,
  notificationemailGetProviderLabel,
  notificationemailGetSendingMethodLabel,
  notificationemailGetTrackingTypeLabel,
  notificationemailGetErrorLabel,
  notificationemailGetDefaultFromName,
  notificationemailGetDefaultFromEmail,
  notificationemailGetMaxEmailsPerDay,
  notificationemailIsTransactional,
  notificationemailIsMarketing,
  notificationemailIsSystem,
  // Email Status
  NOTIFICATIONEMAIL_STATUS,
  NotificationEmailStatusType,
  NotificationEmailStatusColor,
  NotificationEmailStatusCategory,
  NotificationEmailStatusOrder,
  NotificationEmailStatusTransition,
  notificationemailGetStatusLabel,
  notificationemailGetStatusColor,
  notificationemailGetStatusCategory,
  notificationemailIsDelivered,
  notificationemailIsEngaged,
  notificationemailIsFailed,
  notificationemailIsPending,
  notificationemailCanTransition,
};
