/**
 * Case Study Types
 * Type definitions for case studies based on shared-constants
 * @module CaseStudyTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants case-study
// ============================================================
import {
  // Case Study Core
  CONTENT_CASE_STUDY,
  ContentCaseStudyType,
  ContentCaseStudyStatus,
  ContentCaseStudyFormat,
  ContentCaseStudyIndustry,
  ContentCaseStudyResult,
  ContentCaseStudyVisibility,
  ContentCaseStudySortOption,
  contentCaseStudyGetTypeLabel,
  contentCaseStudyGetStatusLabel,
  contentCaseStudyGetFormatLabel,
  contentCaseStudyGetIndustryLabel,
  contentCaseStudyGetResultLabel,
  contentCaseStudyGetVisibilityLabel,
  contentCaseStudyGetSortOptionLabel,
  contentCaseStudyIsPublished,
  contentCaseStudyIsEditable,
  contentCaseStudyIsApproved,
  contentCaseStudyGetDefaultStatus,
  contentCaseStudyGetDefaultFormat,
  contentCaseStudyGetDefaultVisibility,
  contentCaseStudyGetDefaultSort,
  contentCaseStudyGetMaxTitleLength,
  contentCaseStudyGetMaxDescriptionLength,
  contentCaseStudyGetMaxContentLength,
  contentCaseStudyGetMinContentLength,
  contentCaseStudyGetMaxImages,
  contentCaseStudyIsValidType,
  contentCaseStudyIsValidStatus,
  contentCaseStudyIsValidFormat,
  contentCaseStudyIsValidIndustry,
  contentCaseStudyIsValidResult,
  // Case Study Status
  CONTENT_CASE_STUDY_STATUS,
  ContentCaseStudyStatusType,
  ContentCaseStudyStatusCategory,
  ContentCaseStudyStatusColor,
  ContentCaseStudyStatusPriority,
  ContentCaseStudyState,
  ContentCaseStudyAction,
  contentCaseStudyStatusGetLabel,
  contentCaseStudyStatusGetCategory,
  contentCaseStudyStatusGetColor,
  contentCaseStudyStatusGetPriority,
  contentCaseStudyStatusIsPublished,
  contentCaseStudyStatusIsEditable,
  contentCaseStudyStatusIsApproved,
  contentCaseStudyStatusIsArchived,
  contentCaseStudyStatusCanTransitionTo,
  contentCaseStudyStatusGetAvailableTransitions,
  contentCaseStudyStatusGetSequence,
  contentCaseStudyStatusGetStateLabel,
  contentCaseStudyStatusGetActionLabel,
  contentCaseStudyStatusIsValid,
  contentCaseStudyStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// Case Study Extended Types
// ============================================================

/**
 * Case Study Image
 */
export interface CaseStudyImage extends BaseEntity, Timestamp {
  id: ID;
  caseStudyId: ID;
  url: string;
  caption?: string;
  alt?: string;
  order: number;
  isFeatured: boolean;
  metadata?: Metadata;
}

/**
 * Case Study
 */
export interface CaseStudy extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  title: string;
  slug: Slug;
  description: string;
  content: string;
  type: ContentCaseStudyType;
  status: ContentCaseStudyStatusType;
  format: ContentCaseStudyFormat;
  industry: ContentCaseStudyIndustry;
  result: ContentCaseStudyResult;
  visibility: ContentCaseStudyVisibility;
  sortOption: ContentCaseStudySortOption;
  images: CaseStudyImage[];
  isPublished: boolean;
  isEditable: boolean;
  isApproved: boolean;
  publishedAt?: Date;
  approvedAt?: Date;
  metadata?: Metadata;
}

/**
 * Case Study Filter
 */
export interface CaseStudyFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ContentCaseStudyType[];
  statuses?: ContentCaseStudyStatusType[];
  formats?: ContentCaseStudyFormat[];
  industries?: ContentCaseStudyIndustry[];
  results?: ContentCaseStudyResult[];
  visibilities?: ContentCaseStudyVisibility[];
  sortOptions?: ContentCaseStudySortOption[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isEditable?: boolean;
  isApproved?: boolean;
  minImages?: number;
  maxImages?: number;
  searchTerm?: string;
  slug?: string;
}

/**
 * Case Study Statistics
 */
export interface CaseStudyStatistics {
  userId: ID;
  totalCaseStudies: number;
  publishedCaseStudies: number;
  editableCaseStudies: number;
  approvedCaseStudies: number;
  byType: Record<ContentCaseStudyType, number>;
  byStatus: Record<ContentCaseStudyStatusType, number>;
  byFormat: Record<ContentCaseStudyFormat, number>;
  byIndustry: Record<ContentCaseStudyIndustry, number>;
  byResult: Record<ContentCaseStudyResult, number>;
  byVisibility: Record<ContentCaseStudyVisibility, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalImages: number;
  averageImages: number;
  maxImages: number;
  minImages: number;
  totalTitleLength: number;
  averageTitleLength: number;
  maxTitleLength: number;
  minTitleLength: number;
  totalDescriptionLength: number;
  averageDescriptionLength: number;
  maxDescriptionLength: number;
  minDescriptionLength: number;
  totalContentLength: number;
  averageContentLength: number;
  maxContentLength: number;
  minContentLength: number;
  mostFrequentType: ContentCaseStudyType;
  mostFrequentIndustry: ContentCaseStudyIndustry;
  mostFrequentResult: ContentCaseStudyResult;
  mostFrequentStatus: ContentCaseStudyStatusType;
}

/**
 * Case Study Summary
 */
export interface CaseStudySummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  published: number;
  editable: number;
  approved: number;
  byType: Record<ContentCaseStudyType, number>;
  byStatus: Record<ContentCaseStudyStatusType, number>;
  byFormat: Record<ContentCaseStudyFormat, number>;
  byIndustry: Record<ContentCaseStudyIndustry, number>;
  byResult: Record<ContentCaseStudyResult, number>;
  byVisibility: Record<ContentCaseStudyVisibility, number>;
  caseStudyTrend: {
    date: Date;
    total: number;
    published: number;
    approved: number;
  }[];
  topTypes: {
    type: ContentCaseStudyType;
    count: number;
    label: string;
  }[];
  topIndustries: {
    industry: ContentCaseStudyIndustry;
    count: number;
    label: string;
  }[];
  topResults: {
    result: ContentCaseStudyResult;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ContentCaseStudyStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Case Study Configuration
 */
export interface CaseStudyConfiguration {
  enabled: boolean;
  defaultType: ContentCaseStudyType;
  defaultStatus: ContentCaseStudyStatusType;
  defaultFormat: ContentCaseStudyFormat;
  defaultVisibility: ContentCaseStudyVisibility;
  defaultSort: ContentCaseStudySortOption;
  maxTitleLength: number;
  maxDescriptionLength: number;
  maxContentLength: number;
  minContentLength: number;
  maxImages: number;
  requireApproval: boolean;
  allowComments: boolean;
  allowDownloads: boolean;
  allowPrinting: boolean;
  allowSharing: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnApproval: boolean;
  notificationOnPublish: boolean;
  notificationOnDelete: boolean;
  alertConfig?: CaseStudyAlertConfig;
}

/**
 * Case Study Alert Configuration
 */
export interface CaseStudyAlertConfig {
  enabled: boolean;
  incompleteCaseStudyAlert: boolean;
  pendingApprovalAlert: boolean;
  inappropriateContentAlert: boolean;
  lowQualityAlert: boolean;
  lowQualityThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Case Study History
 */
export interface CaseStudyHistory extends BaseEntity, Timestamp {
  id: ID;
  caseStudyId: ID;
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
    | 'add_image'
    | 'remove_image'
    | 'reorder_images';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Case Study Validation
 */
export interface CaseStudyValidation {
  isValid: boolean;
  caseStudyId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Case Study Export
 */
export interface CaseStudyExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'markdown' | 'xml' | 'docx';
  filter: CaseStudyFilter;
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
  // Case Study Core
  CONTENT_CASE_STUDY,
  ContentCaseStudyType,
  ContentCaseStudyStatus,
  ContentCaseStudyFormat,
  ContentCaseStudyIndustry,
  ContentCaseStudyResult,
  ContentCaseStudyVisibility,
  ContentCaseStudySortOption,
  contentCaseStudyGetTypeLabel,
  contentCaseStudyGetStatusLabel,
  contentCaseStudyGetFormatLabel,
  contentCaseStudyGetIndustryLabel,
  contentCaseStudyGetResultLabel,
  contentCaseStudyGetVisibilityLabel,
  contentCaseStudyGetSortOptionLabel,
  contentCaseStudyIsPublished,
  contentCaseStudyIsEditable,
  contentCaseStudyIsApproved,
  contentCaseStudyGetDefaultStatus,
  contentCaseStudyGetDefaultFormat,
  contentCaseStudyGetDefaultVisibility,
  contentCaseStudyGetDefaultSort,
  contentCaseStudyGetMaxTitleLength,
  contentCaseStudyGetMaxDescriptionLength,
  contentCaseStudyGetMaxContentLength,
  contentCaseStudyGetMinContentLength,
  contentCaseStudyGetMaxImages,
  contentCaseStudyIsValidType,
  contentCaseStudyIsValidStatus,
  contentCaseStudyIsValidFormat,
  contentCaseStudyIsValidIndustry,
  contentCaseStudyIsValidResult,
  // Case Study Status
  CONTENT_CASE_STUDY_STATUS,
  ContentCaseStudyStatusType,
  ContentCaseStudyStatusCategory,
  ContentCaseStudyStatusColor,
  ContentCaseStudyStatusPriority,
  ContentCaseStudyState,
  ContentCaseStudyAction,
  contentCaseStudyStatusGetLabel,
  contentCaseStudyStatusGetCategory,
  contentCaseStudyStatusGetColor,
  contentCaseStudyStatusGetPriority,
  contentCaseStudyStatusIsPublished,
  contentCaseStudyStatusIsEditable,
  contentCaseStudyStatusIsApproved,
  contentCaseStudyStatusIsArchived,
  contentCaseStudyStatusCanTransitionTo,
  contentCaseStudyStatusGetAvailableTransitions,
  contentCaseStudyStatusGetSequence,
  contentCaseStudyStatusGetStateLabel,
  contentCaseStudyStatusGetActionLabel,
  contentCaseStudyStatusIsValid,
  contentCaseStudyStatusIsValidState,
};
