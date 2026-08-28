/**
 * Notification Template Types
 * Type definitions for notification templates based on shared-constants
 * @module NotificationTemplateTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification template
// ============================================================
import {
  // Notification Template
  NOTIFICATIONTEMPLATE,
  NotificationTemplateType,
  NotificationTemplateCategory,
  NotificationTemplateFormat,
  NotificationTemplateLanguage,
  NotificationTemplateVariableType,
  NotificationTemplateDefault,
  NotificationTemplateLimit,
  NotificationTemplateError,
  notificationtemplateGetTypeLabel,
  notificationtemplateGetCategoryLabel,
  notificationtemplateGetFormatLabel,
  notificationtemplateGetLanguageLabel,
  notificationtemplateGetVariableTypeLabel,
  notificationtemplateGetErrorLabel,
  notificationtemplateGetDefaultVersion,
  notificationtemplateIsEmailType,
  notificationtemplateIsSMSType,
  notificationtemplateIsPushType,
  notificationtemplateIsInAppType,
  // Notification Template Type
  NOTIFICATIONTEMPLATE_TYPE,
  NotificationTemplateCategoryType,
  NotificationTemplateSubType,
  NotificationTemplateComplexity,
  NotificationTemplateScope,
  NotificationTemplatePurpose,
  notificationTemplateTypeGetCategoryLabel,
  notificationtemplateGetSubTypeLabel,
  notificationtemplateGetComplexityLabel,
  notificationtemplateGetScopeLabel,
  notificationtemplateGetPurposeLabel,
  notificationtemplateIsMarketingCategory,
  notificationtemplateIsTransactionalCategory,
  notificationtemplateIsSystemCategory,
  // Notification Template Status
  NOTIFICATIONTEMPLATE_STATUS,
  NotificationTemplateStatusType,
  NotificationTemplateStatusColor,
  NotificationTemplateStatusCategory,
  NotificationTemplateStatusOrder,
  NotificationTemplateStatusTransition,
  notificationtemplateGetStatusLabel,
  notificationtemplateGetStatusColor,
  notificationtemplateGetStatusCategory,
  notificationtemplateIsPublished,
  notificationtemplateIsDraft,
  notificationtemplateIsApproved,
  notificationtemplateIsArchived,
  notificationtemplateCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Notification Template Extended Types
// ============================================================

/**
 * Notification Template Variable
 */
export interface NotificationTemplateVariable {
  name: string;
  type: NotificationTemplateVariableType;
  description?: string;
  defaultValue?: string;
  isRequired: boolean;
  metadata?: Metadata;
}

/**
 * Notification Template
 */
export interface NotificationTemplate extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  description?: string;
  type: NotificationTemplateType;
  category: NotificationTemplateCategory;
  format: NotificationTemplateFormat;
  language: NotificationTemplateLanguage;
  status: NotificationTemplateStatusType;
  subject?: string;
  body: string;
  htmlBody?: string;
  variables: NotificationTemplateVariable[];
  version: string;
  isEmail: boolean;
  isSMS: boolean;
  isPush: boolean;
  isInApp: boolean;
  isPublished: boolean;
  isDraft: boolean;
  isApproved: boolean;
  isArchived: boolean;
  metadata?: Metadata;
}

/**
 * Notification Template Filter
 */
export interface NotificationTemplateFilter {
  ids?: ID[];
  types?: NotificationTemplateType[];
  categories?: NotificationTemplateCategory[];
  formats?: NotificationTemplateFormat[];
  languages?: NotificationTemplateLanguage[];
  statuses?: NotificationTemplateStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isEmail?: boolean;
  isSMS?: boolean;
  isPush?: boolean;
  isInApp?: boolean;
  isPublished?: boolean;
  isDraft?: boolean;
  isApproved?: boolean;
  isArchived?: boolean;
  searchTerm?: string;
  version?: string;
}

/**
 * Notification Template Statistics
 */
export interface NotificationTemplateStatistics {
  totalTemplates: number;
  publishedTemplates: number;
  draftTemplates: number;
  approvedTemplates: number;
  archivedTemplates: number;
  byType: Record<NotificationTemplateType, number>;
  byCategory: Record<NotificationTemplateCategory, number>;
  byFormat: Record<NotificationTemplateFormat, number>;
  byLanguage: Record<NotificationTemplateLanguage, number>;
  byStatus: Record<NotificationTemplateStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  emailTemplates: number;
  smsTemplates: number;
  pushTemplates: number;
  inAppTemplates: number;
  averageVariables: number;
  mostFrequentType: NotificationTemplateType;
  mostFrequentCategory: NotificationTemplateCategory;
  mostFrequentFormat: NotificationTemplateFormat;
  mostFrequentLanguage: NotificationTemplateLanguage;
  mostFrequentStatus: NotificationTemplateStatusType;
}

/**
 * Notification Template Summary
 */
export interface NotificationTemplateSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTemplates: number;
  published: number;
  draft: number;
  approved: number;
  archived: number;
  byType: Record<NotificationTemplateType, number>;
  byCategory: Record<NotificationTemplateCategory, number>;
  byFormat: Record<NotificationTemplateFormat, number>;
  byLanguage: Record<NotificationTemplateLanguage, number>;
  byStatus: Record<NotificationTemplateStatusType, number>;
  templateTrend: {
    date: Date;
    total: number;
    published: number;
    approved: number;
  }[];
  topTypes: {
    type: NotificationTemplateType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: NotificationTemplateCategory;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: NotificationTemplateFormat;
    count: number;
    label: string;
  }[];
  topLanguages: {
    language: NotificationTemplateLanguage;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: NotificationTemplateStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Notification Template Configuration
 */
export interface NotificationTemplateConfiguration {
  enabled: boolean;
  defaultType: NotificationTemplateType;
  defaultCategory: NotificationTemplateCategory;
  defaultFormat: NotificationTemplateFormat;
  defaultLanguage: NotificationTemplateLanguage;
  defaultVersion: string;
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
  alertConfig?: NotificationTemplateAlertConfig;
}

/**
 * Notification Template Alert Configuration
 */
export interface NotificationTemplateAlertConfig {
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
 * Notification Template History
 */
export interface NotificationTemplateHistory extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  action:
    | 'create'
    | 'update'
    | 'publish'
    | 'unpublish'
    | 'approve'
    | 'reject'
    | 'archive'
    | 'restore'
    | 'delete'
    | 'version';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Notification Template Validation
 */
export interface NotificationTemplateValidation {
  isValid: boolean;
  templateId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Notification Template Version
 */
export interface NotificationTemplateVersion extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  version: string;
  subject?: string;
  body: string;
  htmlBody?: string;
  variables: NotificationTemplateVariable[];
  createdBy: ID;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Notification Template Export
 */
export interface NotificationTemplateExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'yaml' | 'xml' | 'html' | 'txt';
  filter: NotificationTemplateFilter;
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
  // Notification Template
  NOTIFICATIONTEMPLATE,
  NotificationTemplateType,
  NotificationTemplateCategory,
  NotificationTemplateFormat,
  NotificationTemplateLanguage,
  NotificationTemplateVariableType,
  NotificationTemplateDefault,
  NotificationTemplateLimit,
  NotificationTemplateError,
  notificationtemplateGetTypeLabel,
  notificationtemplateGetCategoryLabel,
  notificationtemplateGetFormatLabel,
  notificationtemplateGetLanguageLabel,
  notificationtemplateGetVariableTypeLabel,
  notificationtemplateGetErrorLabel,
  notificationtemplateGetDefaultVersion,
  notificationtemplateIsEmailType,
  notificationtemplateIsSMSType,
  notificationtemplateIsPushType,
  notificationtemplateIsInAppType,
  // Notification Template Type
  NOTIFICATIONTEMPLATE_TYPE,
  NotificationTemplateCategoryType,
  NotificationTemplateSubType,
  NotificationTemplateComplexity,
  NotificationTemplateScope,
  NotificationTemplatePurpose,
  notificationTemplateTypeGetCategoryLabel,
  notificationtemplateGetSubTypeLabel,
  notificationtemplateGetComplexityLabel,
  notificationtemplateGetScopeLabel,
  notificationtemplateGetPurposeLabel,
  notificationtemplateIsMarketingCategory,
  notificationtemplateIsTransactionalCategory,
  notificationtemplateIsSystemCategory,
  // Notification Template Status
  NOTIFICATIONTEMPLATE_STATUS,
  NotificationTemplateStatusType,
  NotificationTemplateStatusColor,
  NotificationTemplateStatusCategory,
  NotificationTemplateStatusOrder,
  NotificationTemplateStatusTransition,
  notificationtemplateGetStatusLabel,
  notificationtemplateGetStatusColor,
  notificationtemplateGetStatusCategory,
  notificationtemplateIsPublished,
  notificationtemplateIsDraft,
  notificationtemplateIsApproved,
  notificationtemplateIsArchived,
  notificationtemplateCanTransition,
};
