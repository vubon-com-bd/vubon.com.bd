/**
 * Email Template Types
 * Type definitions for email templates based on shared-constants
 * @module EmailTemplateTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification email
// ============================================================
import {
  // Email Template
  NOTIFICATIONEMAIL_TEMPLATE,
  NotificationEmailTemplateType,
  NotificationEmailTemplateCategory,
  NotificationEmailTemplateFormat,
  NotificationEmailTemplateStatus,
  NotificationEmailTemplateVariableType,
  NotificationEmailTemplateDefault,
  NotificationEmailTemplateLimit,
  notificationemailGetTemplateTypeLabel,
  notificationemailGetTemplateCategoryLabel,
  notificationemailGetTemplateFormatLabel,
  notificationemailGetTemplateStatusLabel,
  notificationemailGetTemplateVariableTypeLabel,
  notificationemailIsPublished,
  notificationemailIsDraft,
  notificationemailIsApproved,
  notificationemailGetDefaultTemplateType,
  notificationemailGetDefaultTemplateFormat,
  notificationemailGetDefaultLanguage,
} from '@vubon/shared-constants';

// ============================================================
// Email Template Extended Types
// ============================================================

/**
 * Email Template
 */
export interface EmailTemplate extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  description?: string;
  type: NotificationEmailTemplateType;
  category: NotificationEmailTemplateCategory;
  format: NotificationEmailTemplateFormat;
  status: NotificationEmailTemplateStatus;
  subject: string;
  body: string;
  htmlBody?: string;
  variables: EmailTemplateVariable[];
  language: string;
  isPublished: boolean;
  isDraft: boolean;
  isApproved: boolean;
  version: string;
  metadata?: Metadata;
}

/**
 * Email Template Variable
 */
export interface EmailTemplateVariable {
  name: string;
  type: NotificationEmailTemplateVariableType;
  description?: string;
  defaultValue?: string;
  isRequired: boolean;
  metadata?: Metadata;
}

/**
 * Email Template Filter
 */
export interface EmailTemplateFilter {
  ids?: ID[];
  types?: NotificationEmailTemplateType[];
  categories?: NotificationEmailTemplateCategory[];
  formats?: NotificationEmailTemplateFormat[];
  statuses?: NotificationEmailTemplateStatus[];
  languages?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isDraft?: boolean;
  isApproved?: boolean;
  searchTerm?: string;
  version?: string;
}

/**
 * Email Template Statistics
 */
export interface EmailTemplateStatistics {
  totalTemplates: number;
  publishedTemplates: number;
  draftTemplates: number;
  approvedTemplates: number;
  byType: Record<NotificationEmailTemplateType, number>;
  byCategory: Record<NotificationEmailTemplateCategory, number>;
  byFormat: Record<NotificationEmailTemplateFormat, number>;
  byStatus: Record<NotificationEmailTemplateStatus, number>;
  byLanguage: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageVariables: number;
  mostFrequentType: NotificationEmailTemplateType;
  mostFrequentCategory: NotificationEmailTemplateCategory;
  mostFrequentFormat: NotificationEmailTemplateFormat;
  mostFrequentLanguage: string;
}

/**
 * Email Template Summary
 */
export interface EmailTemplateSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTemplates: number;
  published: number;
  draft: number;
  approved: number;
  byType: Record<NotificationEmailTemplateType, number>;
  byCategory: Record<NotificationEmailTemplateCategory, number>;
  byFormat: Record<NotificationEmailTemplateFormat, number>;
  byStatus: Record<NotificationEmailTemplateStatus, number>;
  byLanguage: Record<string, number>;
  templateTrend: {
    date: Date;
    total: number;
    published: number;
  }[];
  topTypes: {
    type: NotificationEmailTemplateType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: NotificationEmailTemplateCategory;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: NotificationEmailTemplateFormat;
    count: number;
    label: string;
  }[];
}

/**
 * Email Template Configuration
 */
export interface EmailTemplateConfiguration {
  enabled: boolean;
  defaultType: NotificationEmailTemplateType;
  defaultCategory: NotificationEmailTemplateCategory;
  defaultFormat: NotificationEmailTemplateFormat;
  defaultLanguage: string;
  maxTemplates: number;
  requireApproval: boolean;
  requireDescription: boolean;
  requireVariables: boolean;
  enableVersioning: boolean;
  maxVersions: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnPublish: boolean;
  notificationOnApproval: boolean;
  alertConfig?: EmailTemplateAlertConfig;
}

/**
 * Email Template Alert Configuration
 */
export interface EmailTemplateAlertConfig {
  enabled: boolean;
  duplicateNameAlert: boolean;
  invalidTemplateAlert: boolean;
  maxLimitAlert: boolean;
  unpublishedTemplateAlert: boolean;
  unapprovedTemplateAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Email Template History
 */
export interface EmailTemplateHistory extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  action:
    | 'create'
    | 'update'
    | 'publish'
    | 'unpublish'
    | 'approve'
    | 'reject'
    | 'delete'
    | 'restore'
    | 'version';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Email Template Validation
 */
export interface EmailTemplateValidation {
  isValid: boolean;
  templateId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Email Template Version
 */
export interface EmailTemplateVersion extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  version: string;
  subject: string;
  body: string;
  htmlBody?: string;
  variables: EmailTemplateVariable[];
  createdBy: ID;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Email Template Export
 */
export interface EmailTemplateExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'yaml' | 'xml' | 'html' | 'txt';
  filter: EmailTemplateFilter;
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
  // Email Template
  NOTIFICATIONEMAIL_TEMPLATE,
  NotificationEmailTemplateType,
  NotificationEmailTemplateCategory,
  NotificationEmailTemplateFormat,
  NotificationEmailTemplateStatus,
  NotificationEmailTemplateVariableType,
  NotificationEmailTemplateDefault,
  NotificationEmailTemplateLimit,
  notificationemailGetTemplateTypeLabel,
  notificationemailGetTemplateCategoryLabel,
  notificationemailGetTemplateFormatLabel,
  notificationemailGetTemplateStatusLabel,
  notificationemailGetTemplateVariableTypeLabel,
  notificationemailIsPublished,
  notificationemailIsDraft,
  notificationemailIsApproved,
  notificationemailGetDefaultTemplateType,
  notificationemailGetDefaultTemplateFormat,
  notificationemailGetDefaultLanguage,
};
