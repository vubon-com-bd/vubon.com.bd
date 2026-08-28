/**
 * Newsletter Types
 * Type definitions for newsletters based on shared-constants
 * @module NewsletterTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants newsletter
// ============================================================
import {
  // Newsletter Core
  CONTENT_NEWSLETTER,
  ContentNewsletterType,
  ContentNewsletterStatus,
  ContentNewsletterFormat,
  ContentNewsletterTemplate,
  ContentNewsletterFrequency,
  ContentNewsletterSendingDay,
  ContentNewsletterTimezone,
  ContentNewsletterAnalytic,
  ContentNewsletterBounceType,
  contentNewsletterGetTypeLabel,
  contentNewsletterGetStatusLabel,
  contentNewsletterGetFormatLabel,
  contentNewsletterGetTemplateLabel,
  contentNewsletterGetFrequencyLabel,
  contentNewsletterGetSendingDayLabel,
  contentNewsletterGetAnalyticLabel,
  contentNewsletterGetBounceTypeLabel,
  contentNewsletterIsPublished,
  contentNewsletterIsEditable,
  contentNewsletterIsSending,
  contentNewsletterGetDefaultStatus,
  contentNewsletterGetDefaultFormat,
  contentNewsletterGetDefaultTemplate,
  contentNewsletterGetDefaultFrequency,
  contentNewsletterGetDefaultSendingDay,
  contentNewsletterGetDefaultTimezone,
  contentNewsletterGetMaxSubjectLength,
  contentNewsletterGetMaxPreviewLength,
  contentNewsletterGetMaxContentLength,
  contentNewsletterGetMaxRecipients,
  contentNewsletterIsValidType,
  contentNewsletterIsValidStatus,
  contentNewsletterIsValidFormat,
  contentNewsletterIsValidFrequency,
  // Newsletter Status
  CONTENT_NEWSLETTER_STATUS,
  ContentNewsletterStatusType,
  ContentNewsletterStatusCategory,
  ContentNewsletterStatusColor,
  ContentNewsletterStatusPriority,
  ContentNewsletterState,
  ContentNewsletterAction,
  contentNewsletterStatusGetLabel,
  contentNewsletterStatusGetCategory,
  contentNewsletterStatusGetColor,
  contentNewsletterStatusGetPriority,
  contentNewsletterStatusIsPublished,
  contentNewsletterStatusIsEditable,
  contentNewsletterStatusIsSending,
  contentNewsletterStatusIsArchived,
  contentNewsletterStatusCanTransitionTo,
  contentNewsletterStatusGetAvailableTransitions,
  contentNewsletterStatusGetSequence,
  contentNewsletterStatusGetStateLabel,
  contentNewsletterStatusGetActionLabel,
  contentNewsletterStatusIsValid,
  contentNewsletterStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// Newsletter Extended Types
// ============================================================

/**
 * Newsletter
 */
export interface Newsletter extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  title: string;
  slug: Slug;
  subject: string;
  preview: string;
  content: string;
  type: ContentNewsletterType;
  status: ContentNewsletterStatusType;
  format: ContentNewsletterFormat;
  template: ContentNewsletterTemplate;
  frequency: ContentNewsletterFrequency;
  sendingDay: ContentNewsletterSendingDay;
  timezone: ContentNewsletterTimezone;
  isPublished: boolean;
  isEditable: boolean;
  isSending: boolean;
  recipients: number;
  sentAt?: Date;
  scheduledAt?: Date;
  metadata?: Metadata;
}

/**
 * Newsletter Filter
 */
export interface NewsletterFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ContentNewsletterType[];
  statuses?: ContentNewsletterStatusType[];
  formats?: ContentNewsletterFormat[];
  templates?: ContentNewsletterTemplate[];
  frequencies?: ContentNewsletterFrequency[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isEditable?: boolean;
  isSending?: boolean;
  minRecipients?: number;
  maxRecipients?: number;
  searchTerm?: string;
  slug?: string;
}

/**
 * Newsletter Statistics
 */
export interface NewsletterStatistics {
  userId: ID;
  totalNewsletters: number;
  publishedNewsletters: number;
  editableNewsletters: number;
  sendingNewsletters: number;
  byType: Record<ContentNewsletterType, number>;
  byStatus: Record<ContentNewsletterStatusType, number>;
  byFormat: Record<ContentNewsletterFormat, number>;
  byTemplate: Record<ContentNewsletterTemplate, number>;
  byFrequency: Record<ContentNewsletterFrequency, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalRecipients: number;
  averageRecipients: number;
  maxRecipients: number;
  minRecipients: number;
  totalSubjectLength: number;
  averageSubjectLength: number;
  maxSubjectLength: number;
  minSubjectLength: number;
  mostFrequentType: ContentNewsletterType;
  mostFrequentFormat: ContentNewsletterFormat;
  mostFrequentTemplate: ContentNewsletterTemplate;
  mostFrequentStatus: ContentNewsletterStatusType;
}

/**
 * Newsletter Summary
 */
export interface NewsletterSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  published: number;
  editable: number;
  sending: number;
  byType: Record<ContentNewsletterType, number>;
  byStatus: Record<ContentNewsletterStatusType, number>;
  byFormat: Record<ContentNewsletterFormat, number>;
  byTemplate: Record<ContentNewsletterTemplate, number>;
  byFrequency: Record<ContentNewsletterFrequency, number>;
  newsletterTrend: {
    date: Date;
    total: number;
    published: number;
    sending: number;
  }[];
  topTypes: {
    type: ContentNewsletterType;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: ContentNewsletterFormat;
    count: number;
    label: string;
  }[];
  topTemplates: {
    template: ContentNewsletterTemplate;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ContentNewsletterStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Newsletter Configuration
 */
export interface NewsletterConfiguration {
  enabled: boolean;
  defaultType: ContentNewsletterType;
  defaultStatus: ContentNewsletterStatusType;
  defaultFormat: ContentNewsletterFormat;
  defaultTemplate: ContentNewsletterTemplate;
  defaultFrequency: ContentNewsletterFrequency;
  defaultSendingDay: ContentNewsletterSendingDay;
  defaultTimezone: ContentNewsletterTimezone;
  maxSubjectLength: number;
  maxPreviewLength: number;
  maxContentLength: number;
  maxRecipients: number;
  allowScheduling: boolean;
  allowDrafts: boolean;
  allowTemplates: boolean;
  notificationOnPublish: boolean;
  notificationOnSend: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: NewsletterAlertConfig;
}

/**
 * Newsletter Alert Configuration
 */
export interface NewsletterAlertConfig {
  enabled: boolean;
  sendFailureAlert: boolean;
  highRecipientAlert: boolean;
  highRecipientThreshold: number;
  pendingApprovalAlert: boolean;
  scheduledFailureAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Newsletter History
 */
export interface NewsletterHistory extends BaseEntity, Timestamp {
  id: ID;
  newsletterId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'publish'
    | 'unpublish'
    | 'send'
    | 'schedule'
    | 'archive'
    | 'restore'
    | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Newsletter Validation
 */
export interface NewsletterValidation {
  isValid: boolean;
  newsletterId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Newsletter Export
 */
export interface NewsletterExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'markdown' | 'xml';
  filter: NewsletterFilter;
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
  // Newsletter Core
  CONTENT_NEWSLETTER,
  ContentNewsletterType,
  ContentNewsletterStatus,
  ContentNewsletterFormat,
  ContentNewsletterTemplate,
  ContentNewsletterFrequency,
  ContentNewsletterSendingDay,
  ContentNewsletterTimezone,
  ContentNewsletterAnalytic,
  ContentNewsletterBounceType,
  contentNewsletterGetTypeLabel,
  contentNewsletterGetStatusLabel,
  contentNewsletterGetFormatLabel,
  contentNewsletterGetTemplateLabel,
  contentNewsletterGetFrequencyLabel,
  contentNewsletterGetSendingDayLabel,
  contentNewsletterGetAnalyticLabel,
  contentNewsletterGetBounceTypeLabel,
  contentNewsletterIsPublished,
  contentNewsletterIsEditable,
  contentNewsletterIsSending,
  contentNewsletterGetDefaultStatus,
  contentNewsletterGetDefaultFormat,
  contentNewsletterGetDefaultTemplate,
  contentNewsletterGetDefaultFrequency,
  contentNewsletterGetDefaultSendingDay,
  contentNewsletterGetDefaultTimezone,
  contentNewsletterGetMaxSubjectLength,
  contentNewsletterGetMaxPreviewLength,
  contentNewsletterGetMaxContentLength,
  contentNewsletterGetMaxRecipients,
  contentNewsletterIsValidType,
  contentNewsletterIsValidStatus,
  contentNewsletterIsValidFormat,
  contentNewsletterIsValidFrequency,
  // Newsletter Status
  CONTENT_NEWSLETTER_STATUS,
  ContentNewsletterStatusType,
  ContentNewsletterStatusCategory,
  ContentNewsletterStatusColor,
  ContentNewsletterStatusPriority,
  ContentNewsletterState,
  ContentNewsletterAction,
  contentNewsletterStatusGetLabel,
  contentNewsletterStatusGetCategory,
  contentNewsletterStatusGetColor,
  contentNewsletterStatusGetPriority,
  contentNewsletterStatusIsPublished,
  contentNewsletterStatusIsEditable,
  contentNewsletterStatusIsSending,
  contentNewsletterStatusIsArchived,
  contentNewsletterStatusCanTransitionTo,
  contentNewsletterStatusGetAvailableTransitions,
  contentNewsletterStatusGetSequence,
  contentNewsletterStatusGetStateLabel,
  contentNewsletterStatusGetActionLabel,
  contentNewsletterStatusIsValid,
  contentNewsletterStatusIsValidState,
};
