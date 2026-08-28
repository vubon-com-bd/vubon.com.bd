/**
 * Blog Types
 * Type definitions for blog based on shared-constants
 * @module BlogTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants blog
// ============================================================
import {
  // Blog Core
  CONTENT_BLOG,
  ContentBlogType,
  ContentBlogStatus,
  ContentBlogCategory,
  ContentBlogTag,
  ContentBlogFormat,
  ContentBlogVisibility,
  ContentBlogComments,
  contentBlogGetTypeLabel,
  contentBlogGetStatusLabel,
  contentBlogGetCategoryLabel,
  contentBlogGetTagLabel,
  contentBlogGetFormatLabel,
  contentBlogGetVisibilityLabel,
  contentBlogGetCommentsLabel,
  contentBlogIsPublished,
  contentBlogIsEditable,
  contentBlogCalculateReadingTime,
  contentBlogGetDefaultStatus,
  contentBlogGetDefaultVisibility,
  contentBlogGetDefaultComments,
  contentBlogGetDefaultFormat,
  contentBlogIsValidType,
  contentBlogIsValidStatus,
  contentBlogIsValidCategory,
  contentBlogIsValidTag,
  contentBlogIsValidFormat,
  contentBlogGetMaxTags,
  contentBlogGetMaxCategories,
  contentBlogGetExcerptLength,
  // Blog Status
  CONTENT_BLOG_STATUS,
  ContentBlogStatusType,
  ContentBlogStatusCategory,
  ContentBlogStatusColor,
  ContentBlogStatusPriority,
  ContentBlogState,
  ContentBlogAction,
  contentBlogStatusGetLabel,
  contentBlogStatusGetCategory,
  contentBlogStatusGetColor,
  contentBlogStatusGetPriority,
  contentBlogStatusIsPublished,
  contentBlogStatusIsEditable,
  contentBlogStatusIsArchived,
  contentBlogStatusCanTransitionTo,
  contentBlogStatusGetAvailableTransitions,
  contentBlogStatusGetSequence,
  contentBlogStatusGetStateLabel,
  contentBlogStatusGetActionLabel,
  contentBlogStatusIsValid,
  contentBlogStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// Blog Extended Types
// ============================================================

/**
 * Blog
 */
export interface Blog extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  title: string;
  slug: Slug;
  type: ContentBlogType;
  status: ContentBlogStatusType;
  category: ContentBlogCategory;
  tags: ContentBlogTag[];
  format: ContentBlogFormat;
  visibility: ContentBlogVisibility;
  comments: ContentBlogComments;
  body: string;
  excerpt?: string;
  featuredImage?: string;
  images: string[];
  readingTime?: number;
  isPublished: boolean;
  isEditable: boolean;
  publishedAt?: Date;
  metadata?: Metadata;
}

/**
 * Blog Filter
 */
export interface BlogFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ContentBlogType[];
  statuses?: ContentBlogStatusType[];
  categories?: ContentBlogCategory[];
  tags?: ContentBlogTag[];
  formats?: ContentBlogFormat[];
  visibilities?: ContentBlogVisibility[];
  comments?: ContentBlogComments[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isEditable?: boolean;
  searchTerm?: string;
  slug?: string;
}

/**
 * Blog Statistics
 */
export interface BlogStatistics {
  userId: ID;
  totalBlogs: number;
  publishedBlogs: number;
  editableBlogs: number;
  byType: Record<ContentBlogType, number>;
  byStatus: Record<ContentBlogStatusType, number>;
  byCategory: Record<ContentBlogCategory, number>;
  byFormat: Record<ContentBlogFormat, number>;
  byVisibility: Record<ContentBlogVisibility, number>;
  byComments: Record<ContentBlogComments, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalWords: number;
  averageWords: number;
  maxWords: number;
  minWords: number;
  totalTags: number;
  averageTags: number;
  averageReadingTime: number;
  mostFrequentType: ContentBlogType;
  mostFrequentCategory: ContentBlogCategory;
  mostFrequentStatus: ContentBlogStatusType;
}

/**
 * Blog Summary
 */
export interface BlogSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  published: number;
  editable: number;
  byType: Record<ContentBlogType, number>;
  byStatus: Record<ContentBlogStatusType, number>;
  byCategory: Record<ContentBlogCategory, number>;
  byFormat: Record<ContentBlogFormat, number>;
  byVisibility: Record<ContentBlogVisibility, number>;
  byComments: Record<ContentBlogComments, number>;
  blogTrend: {
    date: Date;
    total: number;
    published: number;
  }[];
  topTypes: {
    type: ContentBlogType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: ContentBlogCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ContentBlogStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Blog Configuration
 */
export interface BlogConfiguration {
  enabled: boolean;
  defaultType: ContentBlogType;
  defaultStatus: ContentBlogStatusType;
  defaultCategory: ContentBlogCategory;
  defaultFormat: ContentBlogFormat;
  defaultVisibility: ContentBlogVisibility;
  defaultComments: ContentBlogComments;
  maxTags: number;
  maxCategories: number;
  excerptLength: number;
  allowComments: boolean;
  allowDownloads: boolean;
  allowPrinting: boolean;
  notificationOnPublish: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: BlogAlertConfig;
}

/**
 * Blog Alert Configuration
 */
export interface BlogAlertConfig {
  enabled: boolean;
  duplicateSlugAlert: boolean;
  inappropriateContentAlert: boolean;
  pendingApprovalAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Blog History
 */
export interface BlogHistory extends BaseEntity, Timestamp {
  id: ID;
  blogId: ID;
  userId: ID;
  action: 'create' | 'update' | 'publish' | 'unpublish' | 'archive' | 'restore' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Blog Validation
 */
export interface BlogValidation {
  isValid: boolean;
  blogId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Blog Export
 */
export interface BlogExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'markdown' | 'xml';
  filter: BlogFilter;
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
  // Blog Core
  CONTENT_BLOG,
  ContentBlogType,
  ContentBlogStatus,
  ContentBlogCategory,
  ContentBlogTag,
  ContentBlogFormat,
  ContentBlogVisibility,
  ContentBlogComments,
  contentBlogGetTypeLabel,
  contentBlogGetStatusLabel,
  contentBlogGetCategoryLabel,
  contentBlogGetTagLabel,
  contentBlogGetFormatLabel,
  contentBlogGetVisibilityLabel,
  contentBlogGetCommentsLabel,
  contentBlogIsPublished,
  contentBlogIsEditable,
  contentBlogCalculateReadingTime,
  contentBlogGetDefaultStatus,
  contentBlogGetDefaultVisibility,
  contentBlogGetDefaultComments,
  contentBlogGetDefaultFormat,
  contentBlogIsValidType,
  contentBlogIsValidStatus,
  contentBlogIsValidCategory,
  contentBlogIsValidTag,
  contentBlogIsValidFormat,
  contentBlogGetMaxTags,
  contentBlogGetMaxCategories,
  contentBlogGetExcerptLength,
  // Blog Status
  CONTENT_BLOG_STATUS,
  ContentBlogStatusType,
  ContentBlogStatusCategory,
  ContentBlogStatusColor,
  ContentBlogStatusPriority,
  ContentBlogState,
  ContentBlogAction,
  contentBlogStatusGetLabel,
  contentBlogStatusGetCategory,
  contentBlogStatusGetColor,
  contentBlogStatusGetPriority,
  contentBlogStatusIsPublished,
  contentBlogStatusIsEditable,
  contentBlogStatusIsArchived,
  contentBlogStatusCanTransitionTo,
  contentBlogStatusGetAvailableTransitions,
  contentBlogStatusGetSequence,
  contentBlogStatusGetStateLabel,
  contentBlogStatusGetActionLabel,
  contentBlogStatusIsValid,
  contentBlogStatusIsValidState,
};
