/**
 * White Paper Types
 * Type definitions for white papers based on shared-constants
 * @module WhitePaperTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants white-paper
// ============================================================
import {
  // White Paper Core
  CONTENT_WHITE_PAPER,
  ContentWhitePaperType,
  ContentWhitePaperStatus,
  ContentWhitePaperFormat,
  ContentWhitePaperIndustry,
  ContentWhitePaperLevel,
  ContentWhitePaperVisibility,
  ContentWhitePaperSortOption,
  contentWhitePaperGetTypeLabel,
  contentWhitePaperGetStatusLabel,
  contentWhitePaperGetFormatLabel,
  contentWhitePaperGetIndustryLabel,
  contentWhitePaperGetLevelLabel,
  contentWhitePaperGetVisibilityLabel,
  contentWhitePaperGetSortOptionLabel,
  contentWhitePaperIsPublished,
  contentWhitePaperIsEditable,
  contentWhitePaperIsApproved,
  contentWhitePaperGetDefaultStatus,
  contentWhitePaperGetDefaultFormat,
  contentWhitePaperGetDefaultLevel,
  contentWhitePaperGetDefaultVisibility,
  contentWhitePaperGetDefaultSort,
  contentWhitePaperGetMaxTitleLength,
  contentWhitePaperGetMaxDescriptionLength,
  contentWhitePaperGetMaxContentLength,
  contentWhitePaperGetMinContentLength,
  contentWhitePaperGetMaxAuthors,
  contentWhitePaperGetMaxReferences,
  contentWhitePaperIsValidType,
  contentWhitePaperIsValidStatus,
  contentWhitePaperIsValidFormat,
  contentWhitePaperIsValidIndustry,
  contentWhitePaperIsValidLevel,
  // White Paper Status
  CONTENT_WHITE_PAPER_STATUS,
  ContentWhitePaperStatusType,
  ContentWhitePaperStatusCategory,
  ContentWhitePaperStatusColor,
  ContentWhitePaperStatusPriority,
  ContentWhitePaperState,
  ContentWhitePaperAction,
  contentWhitePaperStatusGetLabel,
  contentWhitePaperStatusGetCategory,
  contentWhitePaperStatusGetColor,
  contentWhitePaperStatusGetPriority,
  contentWhitePaperStatusIsPublished,
  contentWhitePaperStatusIsEditable,
  contentWhitePaperStatusIsApproved,
  contentWhitePaperStatusIsArchived,
  contentWhitePaperStatusCanTransitionTo,
  contentWhitePaperStatusGetAvailableTransitions,
  contentWhitePaperStatusGetSequence,
  contentWhitePaperStatusGetStateLabel,
  contentWhitePaperStatusGetActionLabel,
  contentWhitePaperStatusIsValid,
  contentWhitePaperStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// White Paper Extended Types
// ============================================================

/**
 * White Paper Author
 */
export interface WhitePaperAuthor extends BaseEntity, Timestamp {
  id: ID;
  whitePaperId: ID;
  name: string;
  email?: string;
  title?: string;
  affiliation?: string;
  bio?: string;
  order: number;
  isPrimary: boolean;
  metadata?: Metadata;
}

/**
 * White Paper Reference
 */
export interface WhitePaperReference extends BaseEntity, Timestamp {
  id: ID;
  whitePaperId: ID;
  title: string;
  authors?: string;
  year?: number;
  journal?: string;
  publisher?: string;
  url?: string;
  doi?: string;
  order: number;
  metadata?: Metadata;
}

/**
 * White Paper
 */
export interface WhitePaper extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  title: string;
  slug: Slug;
  description: string;
  content: string;
  type: ContentWhitePaperType;
  status: ContentWhitePaperStatusType;
  format: ContentWhitePaperFormat;
  industry: ContentWhitePaperIndustry;
  level: ContentWhitePaperLevel;
  visibility: ContentWhitePaperVisibility;
  sortOption: ContentWhitePaperSortOption;
  authors: WhitePaperAuthor[];
  references: WhitePaperReference[];
  isPublished: boolean;
  isEditable: boolean;
  isApproved: boolean;
  publishedAt?: Date;
  approvedAt?: Date;
  metadata?: Metadata;
}

/**
 * White Paper Filter
 */
export interface WhitePaperFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ContentWhitePaperType[];
  statuses?: ContentWhitePaperStatusType[];
  formats?: ContentWhitePaperFormat[];
  industries?: ContentWhitePaperIndustry[];
  levels?: ContentWhitePaperLevel[];
  visibilities?: ContentWhitePaperVisibility[];
  sortOptions?: ContentWhitePaperSortOption[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isEditable?: boolean;
  isApproved?: boolean;
  minAuthors?: number;
  maxAuthors?: number;
  minReferences?: number;
  maxReferences?: number;
  searchTerm?: string;
  slug?: string;
}

/**
 * White Paper Statistics
 */
export interface WhitePaperStatistics {
  userId: ID;
  totalWhitePapers: number;
  publishedWhitePapers: number;
  editableWhitePapers: number;
  approvedWhitePapers: number;
  byType: Record<ContentWhitePaperType, number>;
  byStatus: Record<ContentWhitePaperStatusType, number>;
  byFormat: Record<ContentWhitePaperFormat, number>;
  byIndustry: Record<ContentWhitePaperIndustry, number>;
  byLevel: Record<ContentWhitePaperLevel, number>;
  byVisibility: Record<ContentWhitePaperVisibility, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalAuthors: number;
  averageAuthors: number;
  maxAuthors: number;
  minAuthors: number;
  totalReferences: number;
  averageReferences: number;
  maxReferences: number;
  minReferences: number;
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
  mostFrequentType: ContentWhitePaperType;
  mostFrequentIndustry: ContentWhitePaperIndustry;
  mostFrequentLevel: ContentWhitePaperLevel;
  mostFrequentStatus: ContentWhitePaperStatusType;
}

/**
 * White Paper Summary
 */
export interface WhitePaperSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  published: number;
  editable: number;
  approved: number;
  byType: Record<ContentWhitePaperType, number>;
  byStatus: Record<ContentWhitePaperStatusType, number>;
  byFormat: Record<ContentWhitePaperFormat, number>;
  byIndustry: Record<ContentWhitePaperIndustry, number>;
  byLevel: Record<ContentWhitePaperLevel, number>;
  byVisibility: Record<ContentWhitePaperVisibility, number>;
  whitePaperTrend: {
    date: Date;
    total: number;
    published: number;
    approved: number;
  }[];
  topTypes: {
    type: ContentWhitePaperType;
    count: number;
    label: string;
  }[];
  topIndustries: {
    industry: ContentWhitePaperIndustry;
    count: number;
    label: string;
  }[];
  topLevels: {
    level: ContentWhitePaperLevel;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ContentWhitePaperStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * White Paper Configuration
 */
export interface WhitePaperConfiguration {
  enabled: boolean;
  defaultType: ContentWhitePaperType;
  defaultStatus: ContentWhitePaperStatusType;
  defaultFormat: ContentWhitePaperFormat;
  defaultLevel: ContentWhitePaperLevel;
  defaultVisibility: ContentWhitePaperVisibility;
  defaultSort: ContentWhitePaperSortOption;
  maxTitleLength: number;
  maxDescriptionLength: number;
  maxContentLength: number;
  minContentLength: number;
  maxAuthors: number;
  maxReferences: number;
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
  alertConfig?: WhitePaperAlertConfig;
}

/**
 * White Paper Alert Configuration
 */
export interface WhitePaperAlertConfig {
  enabled: boolean;
  incompleteWhitePaperAlert: boolean;
  pendingApprovalAlert: boolean;
  inappropriateContentAlert: boolean;
  lowQualityAlert: boolean;
  lowQualityThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * White Paper History
 */
export interface WhitePaperHistory extends BaseEntity, Timestamp {
  id: ID;
  whitePaperId: ID;
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
    | 'add_author'
    | 'remove_author'
    | 'reorder_authors'
    | 'add_reference'
    | 'remove_reference'
    | 'reorder_references';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * White Paper Validation
 */
export interface WhitePaperValidation {
  isValid: boolean;
  whitePaperId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * White Paper Export
 */
export interface WhitePaperExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'markdown' | 'xml' | 'docx';
  filter: WhitePaperFilter;
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
  // White Paper Core
  CONTENT_WHITE_PAPER,
  ContentWhitePaperType,
  ContentWhitePaperStatus,
  ContentWhitePaperFormat,
  ContentWhitePaperIndustry,
  ContentWhitePaperLevel,
  ContentWhitePaperVisibility,
  ContentWhitePaperSortOption,
  contentWhitePaperGetTypeLabel,
  contentWhitePaperGetStatusLabel,
  contentWhitePaperGetFormatLabel,
  contentWhitePaperGetIndustryLabel,
  contentWhitePaperGetLevelLabel,
  contentWhitePaperGetVisibilityLabel,
  contentWhitePaperGetSortOptionLabel,
  contentWhitePaperIsPublished,
  contentWhitePaperIsEditable,
  contentWhitePaperIsApproved,
  contentWhitePaperGetDefaultStatus,
  contentWhitePaperGetDefaultFormat,
  contentWhitePaperGetDefaultLevel,
  contentWhitePaperGetDefaultVisibility,
  contentWhitePaperGetDefaultSort,
  contentWhitePaperGetMaxTitleLength,
  contentWhitePaperGetMaxDescriptionLength,
  contentWhitePaperGetMaxContentLength,
  contentWhitePaperGetMinContentLength,
  contentWhitePaperGetMaxAuthors,
  contentWhitePaperGetMaxReferences,
  contentWhitePaperIsValidType,
  contentWhitePaperIsValidStatus,
  contentWhitePaperIsValidFormat,
  contentWhitePaperIsValidIndustry,
  contentWhitePaperIsValidLevel,
  // White Paper Status
  CONTENT_WHITE_PAPER_STATUS,
  ContentWhitePaperStatusType,
  ContentWhitePaperStatusCategory,
  ContentWhitePaperStatusColor,
  ContentWhitePaperStatusPriority,
  ContentWhitePaperState,
  ContentWhitePaperAction,
  contentWhitePaperStatusGetLabel,
  contentWhitePaperStatusGetCategory,
  contentWhitePaperStatusGetColor,
  contentWhitePaperStatusGetPriority,
  contentWhitePaperStatusIsPublished,
  contentWhitePaperStatusIsEditable,
  contentWhitePaperStatusIsApproved,
  contentWhitePaperStatusIsArchived,
  contentWhitePaperStatusCanTransitionTo,
  contentWhitePaperStatusGetAvailableTransitions,
  contentWhitePaperStatusGetSequence,
  contentWhitePaperStatusGetStateLabel,
  contentWhitePaperStatusGetActionLabel,
  contentWhitePaperStatusIsValid,
  contentWhitePaperStatusIsValidState,
};
