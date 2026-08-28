/**
 * FAQ Types
 * Type definitions for FAQs based on shared-constants
 * @module FAQTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants faq
// ============================================================
import {
  // FAQ Core
  CONTENT_FAQ,
  ContentFAQType,
  ContentFAQStatus,
  ContentFAQCategory,
  ContentFAQFormat,
  ContentFAQVisibility,
  ContentFAQHelpfulStatus,
  contentFaqGetTypeLabel,
  contentFaqGetStatusLabel,
  contentFaqGetCategoryLabel,
  contentFaqGetFormatLabel,
  contentFaqGetVisibilityLabel,
  contentFaqGetHelpfulStatusLabel,
  contentFaqIsPublished,
  contentFaqIsEditable,
  contentFaqIsApproved,
  contentFaqGetDefaultStatus,
  contentFaqGetDefaultFormat,
  contentFaqGetDefaultVisibility,
  contentFaqGetDefaultCategory,
  contentFaqGetMaxQuestionLength,
  contentFaqGetMaxAnswerLength,
  contentFaqGetMinAnswerLength,
  contentFaqIsValidType,
  contentFaqIsValidStatus,
  contentFaqIsValidCategory,
  contentFaqIsValidFormat,
  // FAQ Status
  CONTENT_FAQ_STATUS,
  ContentFAQStatusType,
  ContentFAQStatusCategory,
  ContentFAQStatusColor,
  ContentFAQStatusPriority,
  ContentFAQState,
  ContentFAQAction,
  contentFaqStatusGetLabel,
  contentFaqStatusGetCategory,
  contentFaqStatusGetColor,
  contentFaqStatusGetPriority,
  contentFaqStatusIsPublished,
  contentFaqStatusIsEditable,
  contentFaqStatusIsApproved,
  contentFaqStatusIsArchived,
  contentFaqStatusCanTransitionTo,
  contentFaqStatusGetAvailableTransitions,
  contentFaqStatusGetSequence,
  contentFaqStatusGetStateLabel,
  contentFaqStatusGetActionLabel,
  contentFaqStatusIsValid,
  contentFaqStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// FAQ Extended Types
// ============================================================

/**
 * FAQ
 */
export interface FAQ extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  question: string;
  answer: string;
  slug: Slug;
  type: ContentFAQType;
  status: ContentFAQStatusType;
  category: ContentFAQCategory;
  format: ContentFAQFormat;
  visibility: ContentFAQVisibility;
  helpfulStatus: ContentFAQHelpfulStatus;
  helpfulCount: number;
  unhelpfulCount: number;
  isPublished: boolean;
  isEditable: boolean;
  isApproved: boolean;
  publishedAt?: Date;
  approvedAt?: Date;
  metadata?: Metadata;
}

/**
 * FAQ Filter
 */
export interface FAQFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ContentFAQType[];
  statuses?: ContentFAQStatusType[];
  categories?: ContentFAQCategory[];
  formats?: ContentFAQFormat[];
  visibilities?: ContentFAQVisibility[];
  helpfulStatuses?: ContentFAQHelpfulStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isEditable?: boolean;
  isApproved?: boolean;
  minHelpfulCount?: number;
  maxHelpfulCount?: number;
  minUnhelpfulCount?: number;
  maxUnhelpfulCount?: number;
  searchTerm?: string;
  slug?: string;
}

/**
 * FAQ Statistics
 */
export interface FAQStatistics {
  userId: ID;
  totalFAQs: number;
  publishedFAQs: number;
  editableFAQs: number;
  approvedFAQs: number;
  byType: Record<ContentFAQType, number>;
  byStatus: Record<ContentFAQStatusType, number>;
  byCategory: Record<ContentFAQCategory, number>;
  byFormat: Record<ContentFAQFormat, number>;
  byVisibility: Record<ContentFAQVisibility, number>;
  byHelpfulStatus: Record<ContentFAQHelpfulStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalHelpfulCount: number;
  averageHelpfulCount: number;
  maxHelpfulCount: number;
  minHelpfulCount: number;
  totalUnhelpfulCount: number;
  averageUnhelpfulCount: number;
  maxUnhelpfulCount: number;
  minUnhelpfulCount: number;
  totalQuestionLength: number;
  averageQuestionLength: number;
  maxQuestionLength: number;
  minQuestionLength: number;
  totalAnswerLength: number;
  averageAnswerLength: number;
  maxAnswerLength: number;
  minAnswerLength: number;
  mostFrequentType: ContentFAQType;
  mostFrequentCategory: ContentFAQCategory;
  mostFrequentStatus: ContentFAQStatusType;
}

/**
 * FAQ Summary
 */
export interface FAQSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  published: number;
  editable: number;
  approved: number;
  byType: Record<ContentFAQType, number>;
  byStatus: Record<ContentFAQStatusType, number>;
  byCategory: Record<ContentFAQCategory, number>;
  byFormat: Record<ContentFAQFormat, number>;
  byVisibility: Record<ContentFAQVisibility, number>;
  byHelpfulStatus: Record<ContentFAQHelpfulStatus, number>;
  faqTrend: {
    date: Date;
    total: number;
    published: number;
    approved: number;
  }[];
  topTypes: {
    type: ContentFAQType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: ContentFAQCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ContentFAQStatusType;
    count: number;
    label: string;
  }[];
  helpfulMetrics: {
    totalHelpful: number;
    totalUnhelpful: number;
    helpfulRatio: number;
    mostHelpfulFAQ: {
      id: ID;
      question: string;
      helpfulCount: number;
    };
  };
}

/**
 * FAQ Configuration
 */
export interface FAQConfiguration {
  enabled: boolean;
  defaultType: ContentFAQType;
  defaultStatus: ContentFAQStatusType;
  defaultCategory: ContentFAQCategory;
  defaultFormat: ContentFAQFormat;
  defaultVisibility: ContentFAQVisibility;
  maxQuestionLength: number;
  maxAnswerLength: number;
  minAnswerLength: number;
  requireApproval: boolean;
  allowVoting: boolean;
  allowComments: boolean;
  allowTags: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnApproval: boolean;
  notificationOnPublish: boolean;
  notificationOnDelete: boolean;
  alertConfig?: FAQAlertConfig;
}

/**
 * FAQ Alert Configuration
 */
export interface FAQAlertConfig {
  enabled: boolean;
  lowHelpfulAlert: boolean;
  lowHelpfulThreshold: number;
  highUnhelpfulAlert: boolean;
  highUnhelpfulThreshold: number;
  spamFAQAlert: boolean;
  pendingApprovalAlert: boolean;
  inappropriateContentAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * FAQ History
 */
export interface FAQHistory extends BaseEntity, Timestamp {
  id: ID;
  faqId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'approve'
    | 'reject'
    | 'publish'
    | 'unpublish'
    | 'archive'
    | 'restore'
    | 'delete'
    | 'vote_helpful'
    | 'vote_unhelpful';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * FAQ Validation
 */
export interface FAQValidation {
  isValid: boolean;
  faqId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * FAQ Export
 */
export interface FAQExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'markdown' | 'xml';
  filter: FAQFilter;
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
  // FAQ Core
  CONTENT_FAQ,
  ContentFAQType,
  ContentFAQStatus,
  ContentFAQCategory,
  ContentFAQFormat,
  ContentFAQVisibility,
  ContentFAQHelpfulStatus,
  contentFaqGetTypeLabel,
  contentFaqGetStatusLabel,
  contentFaqGetCategoryLabel,
  contentFaqGetFormatLabel,
  contentFaqGetVisibilityLabel,
  contentFaqGetHelpfulStatusLabel,
  contentFaqIsPublished,
  contentFaqIsEditable,
  contentFaqIsApproved,
  contentFaqGetDefaultStatus,
  contentFaqGetDefaultFormat,
  contentFaqGetDefaultVisibility,
  contentFaqGetDefaultCategory,
  contentFaqGetMaxQuestionLength,
  contentFaqGetMaxAnswerLength,
  contentFaqGetMinAnswerLength,
  contentFaqIsValidType,
  contentFaqIsValidStatus,
  contentFaqIsValidCategory,
  contentFaqIsValidFormat,
  // FAQ Status
  CONTENT_FAQ_STATUS,
  ContentFAQStatusType,
  ContentFAQStatusCategory,
  ContentFAQStatusColor,
  ContentFAQStatusPriority,
  ContentFAQState,
  ContentFAQAction,
  contentFaqStatusGetLabel,
  contentFaqStatusGetCategory,
  contentFaqStatusGetColor,
  contentFaqStatusGetPriority,
  contentFaqStatusIsPublished,
  contentFaqStatusIsEditable,
  contentFaqStatusIsApproved,
  contentFaqStatusIsArchived,
  contentFaqStatusCanTransitionTo,
  contentFaqStatusGetAvailableTransitions,
  contentFaqStatusGetSequence,
  contentFaqStatusGetStateLabel,
  contentFaqStatusGetActionLabel,
  contentFaqStatusIsValid,
  contentFaqStatusIsValidState,
};
