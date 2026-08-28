/**
 * E-Book Types
 * Type definitions for e-books based on shared-constants
 * @module EBookTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants e-book
// ============================================================
import {
  // E-Book Core
  CONTENT_E_BOOK,
  ContentEBookType,
  ContentEBookStatus,
  ContentEBookFormat,
  ContentEBookGenre,
  ContentEBookLanguage,
  ContentEBookVisibility,
  ContentEBookSortOption,
  contentEBookGetTypeLabel,
  contentEBookGetStatusLabel,
  contentEBookGetFormatLabel,
  contentEBookGetGenreLabel,
  contentEBookGetLanguageLabel,
  contentEBookGetVisibilityLabel,
  contentEBookGetSortOptionLabel,
  contentEBookIsPublished,
  contentEBookIsEditable,
  contentEBookIsApproved,
  contentEBookGetDefaultStatus,
  contentEBookGetDefaultFormat,
  contentEBookGetDefaultVisibility,
  contentEBookGetDefaultSort,
  contentEBookGetMaxTitleLength,
  contentEBookGetMaxDescriptionLength,
  contentEBookGetMaxContentLength,
  contentEBookGetMaxPages,
  contentEBookGetMinPages,
  contentEBookGetMaxAuthors,
  contentEBookIsValidType,
  contentEBookIsValidStatus,
  contentEBookIsValidFormat,
  contentEBookIsValidGenre,
  contentEBookIsValidLanguage,
  // E-Book Status
  CONTENT_E_BOOK_STATUS,
  ContentEBookStatusType,
  ContentEBookStatusCategory,
  ContentEBookStatusColor,
  ContentEBookStatusPriority,
  ContentEBookState,
  ContentEBookAction,
  contentEBookStatusGetLabel,
  contentEBookStatusGetCategory,
  contentEBookStatusGetColor,
  contentEBookStatusGetPriority,
  contentEBookStatusIsPublished,
  contentEBookStatusIsEditable,
  contentEBookStatusIsApproved,
  contentEBookStatusIsArchived,
  contentEBookStatusCanTransitionTo,
  contentEBookStatusGetAvailableTransitions,
  contentEBookStatusGetSequence,
  contentEBookStatusGetStateLabel,
  contentEBookStatusGetActionLabel,
  contentEBookStatusIsValid,
  contentEBookStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// E-Book Extended Types
// ============================================================

/**
 * E-Book Author
 */
export interface EBookAuthor extends BaseEntity, Timestamp {
  id: ID;
  e_bookId: ID;
  name: string;
  email?: string;
  bio?: string;
  order: number;
  isPrimary: boolean;
  metadata?: Metadata;
}

/**
 * E-Book Chapter
 */
export interface EBookChapter extends BaseEntity, Timestamp {
  id: ID;
  e_bookId: ID;
  title: string;
  content: string;
  order: number;
  pageStart?: number;
  pageEnd?: number;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * E-Book
 */
export interface EBook extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  title: string;
  slug: Slug;
  description: string;
  content: string;
  type: ContentEBookType;
  status: ContentEBookStatusType;
  format: ContentEBookFormat;
  genre: ContentEBookGenre;
  language: ContentEBookLanguage;
  visibility: ContentEBookVisibility;
  sortOption: ContentEBookSortOption;
  authors: EBookAuthor[];
  chapters: EBookChapter[];
  pages: number;
  coverImage?: string;
  isPublished: boolean;
  isEditable: boolean;
  isApproved: boolean;
  publishedAt?: Date;
  approvedAt?: Date;
  metadata?: Metadata;
}

/**
 * E-Book Filter
 */
export interface EBookFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ContentEBookType[];
  statuses?: ContentEBookStatusType[];
  formats?: ContentEBookFormat[];
  genres?: ContentEBookGenre[];
  languages?: ContentEBookLanguage[];
  visibilities?: ContentEBookVisibility[];
  sortOptions?: ContentEBookSortOption[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isEditable?: boolean;
  isApproved?: boolean;
  minPages?: number;
  maxPages?: number;
  minAuthors?: number;
  maxAuthors?: number;
  searchTerm?: string;
  slug?: string;
}

/**
 * E-Book Statistics
 */
export interface EBookStatistics {
  userId: ID;
  totalEBooks: number;
  publishedEBooks: number;
  editableEBooks: number;
  approvedEBooks: number;
  byType: Record<ContentEBookType, number>;
  byStatus: Record<ContentEBookStatusType, number>;
  byFormat: Record<ContentEBookFormat, number>;
  byGenre: Record<ContentEBookGenre, number>;
  byLanguage: Record<ContentEBookLanguage, number>;
  byVisibility: Record<ContentEBookVisibility, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalPages: number;
  averagePages: number;
  maxPages: number;
  minPages: number;
  totalAuthors: number;
  averageAuthors: number;
  maxAuthors: number;
  minAuthors: number;
  totalChapters: number;
  averageChapters: number;
  maxChapters: number;
  minChapters: number;
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
  mostFrequentType: ContentEBookType;
  mostFrequentGenre: ContentEBookGenre;
  mostFrequentLanguage: ContentEBookLanguage;
  mostFrequentStatus: ContentEBookStatusType;
}

/**
 * E-Book Summary
 */
export interface EBookSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  published: number;
  editable: number;
  approved: number;
  byType: Record<ContentEBookType, number>;
  byStatus: Record<ContentEBookStatusType, number>;
  byFormat: Record<ContentEBookFormat, number>;
  byGenre: Record<ContentEBookGenre, number>;
  byLanguage: Record<ContentEBookLanguage, number>;
  byVisibility: Record<ContentEBookVisibility, number>;
  eBookTrend: {
    date: Date;
    total: number;
    published: number;
    approved: number;
  }[];
  topTypes: {
    type: ContentEBookType;
    count: number;
    label: string;
  }[];
  topGenres: {
    genre: ContentEBookGenre;
    count: number;
    label: string;
  }[];
  topLanguages: {
    language: ContentEBookLanguage;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ContentEBookStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * E-Book Configuration
 */
export interface EBookConfiguration {
  enabled: boolean;
  defaultType: ContentEBookType;
  defaultStatus: ContentEBookStatusType;
  defaultFormat: ContentEBookFormat;
  defaultVisibility: ContentEBookVisibility;
  defaultSort: ContentEBookSortOption;
  maxTitleLength: number;
  maxDescriptionLength: number;
  maxContentLength: number;
  maxPages: number;
  minPages: number;
  maxAuthors: number;
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
  alertConfig?: EBookAlertConfig;
}

/**
 * E-Book Alert Configuration
 */
export interface EBookAlertConfig {
  enabled: boolean;
  incompleteEBookAlert: boolean;
  pendingApprovalAlert: boolean;
  inappropriateContentAlert: boolean;
  lowQualityAlert: boolean;
  lowQualityThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * E-Book History
 */
export interface EBookHistory extends BaseEntity, Timestamp {
  id: ID;
  e_bookId: ID;
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
    | 'add_chapter'
    | 'remove_chapter'
    | 'reorder_chapters';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * E-Book Validation
 */
export interface EBookValidation {
  isValid: boolean;
  e_bookId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * E-Book Export
 */
export interface EBookExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'markdown' | 'xml' | 'epub' | 'mobi' | 'docx';
  filter: EBookFilter;
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
  // E-Book Core
  CONTENT_E_BOOK,
  ContentEBookType,
  ContentEBookStatus,
  ContentEBookFormat,
  ContentEBookGenre,
  ContentEBookLanguage,
  ContentEBookVisibility,
  ContentEBookSortOption,
  contentEBookGetTypeLabel,
  contentEBookGetStatusLabel,
  contentEBookGetFormatLabel,
  contentEBookGetGenreLabel,
  contentEBookGetLanguageLabel,
  contentEBookGetVisibilityLabel,
  contentEBookGetSortOptionLabel,
  contentEBookIsPublished,
  contentEBookIsEditable,
  contentEBookIsApproved,
  contentEBookGetDefaultStatus,
  contentEBookGetDefaultFormat,
  contentEBookGetDefaultVisibility,
  contentEBookGetDefaultSort,
  contentEBookGetMaxTitleLength,
  contentEBookGetMaxDescriptionLength,
  contentEBookGetMaxContentLength,
  contentEBookGetMaxPages,
  contentEBookGetMinPages,
  contentEBookGetMaxAuthors,
  contentEBookIsValidType,
  contentEBookIsValidStatus,
  contentEBookIsValidFormat,
  contentEBookIsValidGenre,
  contentEBookIsValidLanguage,
  // E-Book Status
  CONTENT_E_BOOK_STATUS,
  ContentEBookStatusType,
  ContentEBookStatusCategory,
  ContentEBookStatusColor,
  ContentEBookStatusPriority,
  ContentEBookState,
  ContentEBookAction,
  contentEBookStatusGetLabel,
  contentEBookStatusGetCategory,
  contentEBookStatusGetColor,
  contentEBookStatusGetPriority,
  contentEBookStatusIsPublished,
  contentEBookStatusIsEditable,
  contentEBookStatusIsApproved,
  contentEBookStatusIsArchived,
  contentEBookStatusCanTransitionTo,
  contentEBookStatusGetAvailableTransitions,
  contentEBookStatusGetSequence,
  contentEBookStatusGetStateLabel,
  contentEBookStatusGetActionLabel,
  contentEBookStatusIsValid,
  contentEBookStatusIsValidState,
};
