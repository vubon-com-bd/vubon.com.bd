/**
 * Guide Types
 * Type definitions for guides based on shared-constants
 * @module GuideTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants guide
// ============================================================
import {
  // Guide Core
  CONTENT_GUIDE,
  ContentGuideType,
  ContentGuideStatus,
  ContentGuideFormat,
  ContentGuideLevel,
  ContentGuideVisibility,
  ContentGuideSortOption,
  contentGuideGetTypeLabel,
  contentGuideGetStatusLabel,
  contentGuideGetFormatLabel,
  contentGuideGetLevelLabel,
  contentGuideGetVisibilityLabel,
  contentGuideGetSortOptionLabel,
  contentGuideIsPublished,
  contentGuideIsEditable,
  contentGuideIsApproved,
  contentGuideGetDefaultStatus,
  contentGuideGetDefaultFormat,
  contentGuideGetDefaultLevel,
  contentGuideGetDefaultVisibility,
  contentGuideGetDefaultSort,
  contentGuideGetMaxTitleLength,
  contentGuideGetMaxDescriptionLength,
  contentGuideGetMaxContentLength,
  contentGuideGetMaxSteps,
  contentGuideGetMinSteps,
  contentGuideIsValidType,
  contentGuideIsValidStatus,
  contentGuideIsValidFormat,
  contentGuideIsValidLevel,
  // Guide Status
  CONTENT_GUIDE_STATUS,
  ContentGuideStatusType,
  ContentGuideStatusCategory,
  ContentGuideStatusColor,
  ContentGuideStatusPriority,
  ContentGuideState,
  ContentGuideAction,
  contentGuideStatusGetLabel,
  contentGuideStatusGetCategory,
  contentGuideStatusGetColor,
  contentGuideStatusGetPriority,
  contentGuideStatusIsPublished,
  contentGuideStatusIsEditable,
  contentGuideStatusIsApproved,
  contentGuideStatusIsArchived,
  contentGuideStatusCanTransitionTo,
  contentGuideStatusGetAvailableTransitions,
  contentGuideStatusGetSequence,
  contentGuideStatusGetStateLabel,
  contentGuideStatusGetActionLabel,
  contentGuideStatusIsValid,
  contentGuideStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// Guide Extended Types
// ============================================================

/**
 * Guide Step
 */
export interface GuideStep extends BaseEntity, Timestamp {
  id: ID;
  guideId: ID;
  title: string;
  content: string;
  order: number;
  image?: string;
  video?: string;
  code?: string;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Guide
 */
export interface Guide extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  title: string;
  slug: Slug;
  description: string;
  content: string;
  type: ContentGuideType;
  status: ContentGuideStatusType;
  format: ContentGuideFormat;
  level: ContentGuideLevel;
  visibility: ContentGuideVisibility;
  sortOption: ContentGuideSortOption;
  steps: GuideStep[];
  isPublished: boolean;
  isEditable: boolean;
  isApproved: boolean;
  publishedAt?: Date;
  approvedAt?: Date;
  metadata?: Metadata;
}

/**
 * Guide Filter
 */
export interface GuideFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ContentGuideType[];
  statuses?: ContentGuideStatusType[];
  formats?: ContentGuideFormat[];
  levels?: ContentGuideLevel[];
  visibilities?: ContentGuideVisibility[];
  sortOptions?: ContentGuideSortOption[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isEditable?: boolean;
  isApproved?: boolean;
  minSteps?: number;
  maxSteps?: number;
  searchTerm?: string;
  slug?: string;
}

/**
 * Guide Statistics
 */
export interface GuideStatistics {
  userId: ID;
  totalGuides: number;
  publishedGuides: number;
  editableGuides: number;
  approvedGuides: number;
  byType: Record<ContentGuideType, number>;
  byStatus: Record<ContentGuideStatusType, number>;
  byFormat: Record<ContentGuideFormat, number>;
  byLevel: Record<ContentGuideLevel, number>;
  byVisibility: Record<ContentGuideVisibility, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalSteps: number;
  averageSteps: number;
  maxSteps: number;
  minSteps: number;
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
  mostFrequentType: ContentGuideType;
  mostFrequentFormat: ContentGuideFormat;
  mostFrequentLevel: ContentGuideLevel;
  mostFrequentStatus: ContentGuideStatusType;
}

/**
 * Guide Summary
 */
export interface GuideSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  published: number;
  editable: number;
  approved: number;
  byType: Record<ContentGuideType, number>;
  byStatus: Record<ContentGuideStatusType, number>;
  byFormat: Record<ContentGuideFormat, number>;
  byLevel: Record<ContentGuideLevel, number>;
  byVisibility: Record<ContentGuideVisibility, number>;
  guideTrend: {
    date: Date;
    total: number;
    published: number;
    approved: number;
  }[];
  topTypes: {
    type: ContentGuideType;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: ContentGuideFormat;
    count: number;
    label: string;
  }[];
  topLevels: {
    level: ContentGuideLevel;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ContentGuideStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Guide Configuration
 */
export interface GuideConfiguration {
  enabled: boolean;
  defaultType: ContentGuideType;
  defaultStatus: ContentGuideStatusType;
  defaultFormat: ContentGuideFormat;
  defaultLevel: ContentGuideLevel;
  defaultVisibility: ContentGuideVisibility;
  defaultSort: ContentGuideSortOption;
  maxTitleLength: number;
  maxDescriptionLength: number;
  maxContentLength: number;
  maxSteps: number;
  minSteps: number;
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
  alertConfig?: GuideAlertConfig;
}

/**
 * Guide Alert Configuration
 */
export interface GuideAlertConfig {
  enabled: boolean;
  incompleteGuideAlert: boolean;
  pendingApprovalAlert: boolean;
  inappropriateContentAlert: boolean;
  lowQualityAlert: boolean;
  lowQualityThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Guide History
 */
export interface GuideHistory extends BaseEntity, Timestamp {
  id: ID;
  guideId: ID;
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
    | 'add_step'
    | 'remove_step'
    | 'reorder_steps';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Guide Validation
 */
export interface GuideValidation {
  isValid: boolean;
  guideId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Guide Export
 */
export interface GuideExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'markdown' | 'xml' | 'docx';
  filter: GuideFilter;
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
  // Guide Core
  CONTENT_GUIDE,
  ContentGuideType,
  ContentGuideStatus,
  ContentGuideFormat,
  ContentGuideLevel,
  ContentGuideVisibility,
  ContentGuideSortOption,
  contentGuideGetTypeLabel,
  contentGuideGetStatusLabel,
  contentGuideGetFormatLabel,
  contentGuideGetLevelLabel,
  contentGuideGetVisibilityLabel,
  contentGuideGetSortOptionLabel,
  contentGuideIsPublished,
  contentGuideIsEditable,
  contentGuideIsApproved,
  contentGuideGetDefaultStatus,
  contentGuideGetDefaultFormat,
  contentGuideGetDefaultLevel,
  contentGuideGetDefaultVisibility,
  contentGuideGetDefaultSort,
  contentGuideGetMaxTitleLength,
  contentGuideGetMaxDescriptionLength,
  contentGuideGetMaxContentLength,
  contentGuideGetMaxSteps,
  contentGuideGetMinSteps,
  contentGuideIsValidType,
  contentGuideIsValidStatus,
  contentGuideIsValidFormat,
  contentGuideIsValidLevel,
  // Guide Status
  CONTENT_GUIDE_STATUS,
  ContentGuideStatusType,
  ContentGuideStatusCategory,
  ContentGuideStatusColor,
  ContentGuideStatusPriority,
  ContentGuideState,
  ContentGuideAction,
  contentGuideStatusGetLabel,
  contentGuideStatusGetCategory,
  contentGuideStatusGetColor,
  contentGuideStatusGetPriority,
  contentGuideStatusIsPublished,
  contentGuideStatusIsEditable,
  contentGuideStatusIsApproved,
  contentGuideStatusIsArchived,
  contentGuideStatusCanTransitionTo,
  contentGuideStatusGetAvailableTransitions,
  contentGuideStatusGetSequence,
  contentGuideStatusGetStateLabel,
  contentGuideStatusGetActionLabel,
  contentGuideStatusIsValid,
  contentGuideStatusIsValidState,
};
