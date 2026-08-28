/**
 * Blog Tag Types
 * Type definitions for blog tags based on shared-constants
 * @module BlogTagTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants blog
// ============================================================
import {
  // Blog Tag
  CONTENT_BLOG_TAG,
  ContentBlogPopularTag,
  ContentBlogTopicTag,
  ContentBlogTypeTag,
  ContentBlogAudienceTag,
  ContentBlogTagColor,
  ContentBlogTagCategory,
  contentBlogTagGetPopularLabel,
  contentBlogTagGetTopicLabel,
  contentBlogTagGetTypeLabel,
  contentBlogTagGetAudienceLabel,
  contentBlogTagGetColor,
  contentBlogTagGetCategory,
  contentBlogTagIsValidPopular,
  contentBlogTagIsValidTopic,
  contentBlogTagIsValidType,
  contentBlogTagIsValidAudience,
} from '@vubon/shared-constants';

// ============================================================
// Blog Tag Extended Types
// ============================================================

/**
 * Blog Tag
 */
export interface BlogTag extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  slug: Slug;
  category: ContentBlogTagCategory;
  color: ContentBlogTagColor;
  isPopular: boolean;
  isTopic: boolean;
  isType: boolean;
  isAudience: boolean;
  count: number;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Blog Tag Filter
 */
export interface BlogTagFilter {
  ids?: ID[];
  categories?: ContentBlogTagCategory[];
  colors?: ContentBlogTagColor[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPopular?: boolean;
  isTopic?: boolean;
  isType?: boolean;
  isAudience?: boolean;
  isActive?: boolean;
  minCount?: number;
  maxCount?: number;
  searchTerm?: string;
  slug?: string;
}

/**
 * Blog Tag Statistics
 */
export interface BlogTagStatistics {
  totalTags: number;
  activeTags: number;
  popularTags: number;
  topicTags: number;
  typeTags: number;
  audienceTags: number;
  byCategory: Record<ContentBlogTagCategory, number>;
  byColor: Record<ContentBlogTagColor, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalUsage: number;
  averageUsage: number;
  maxUsage: number;
  minUsage: number;
  mostUsedTag: {
    id: ID;
    name: string;
    count: number;
  };
  mostPopularCategory: ContentBlogTagCategory;
  mostPopularColor: ContentBlogTagColor;
}

/**
 * Blog Tag Summary
 */
export interface BlogTagSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTags: number;
  active: number;
  popular: number;
  topic: number;
  type: number;
  audience: number;
  byCategory: Record<ContentBlogTagCategory, number>;
  byColor: Record<ContentBlogTagColor, number>;
  tagTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topCategories: {
    category: ContentBlogTagCategory;
    count: number;
    label: string;
  }[];
  topColors: {
    color: ContentBlogTagColor;
    count: number;
    label: string;
  }[];
  topTags: {
    tag: BlogTag;
    usage: number;
  }[];
}

/**
 * Blog Tag Configuration
 */
export interface BlogTagConfiguration {
  enabled: boolean;
  defaultCategory: ContentBlogTagCategory;
  defaultColor: ContentBlogTagColor;
  maxTagsPerBlog: number;
  requireUniqueName: boolean;
  requireUniqueSlug: boolean;
  autoGenerateSlug: boolean;
  allowCustomColors: boolean;
  allowCustomCategories: boolean;
  enablePopularityTracking: boolean;
  popularityThreshold: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: BlogTagAlertConfig;
}

/**
 * Blog Tag Alert Configuration
 */
export interface BlogTagAlertConfig {
  enabled: boolean;
  duplicateNameAlert: boolean;
  duplicateSlugAlert: boolean;
  maxTagAlert: boolean;
  maxTagThreshold: number;
  orphanTagAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Blog Tag History
 */
export interface BlogTagHistory extends BaseEntity, Timestamp {
  id: ID;
  tagId: ID;
  action:
    'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore' | 'merge' | 'split';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Blog Tag Validation
 */
export interface BlogTagValidation {
  isValid: boolean;
  tagId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Blog Tag Assignment
 */
export interface BlogTagAssignment extends BaseEntity, Timestamp {
  id: ID;
  tagId: ID;
  blogId: ID;
  assignedAt: Date;
  assignedBy?: ID;
  metadata?: Metadata;
}

/**
 * Blog Tag Bulk Operation
 */
export interface BlogTagBulkOperation extends BaseEntity, Timestamp {
  id: ID;
  operation: 'assign' | 'unassign' | 'replace' | 'merge' | 'delete';
  tagIds: ID[];
  blogIds: ID[];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  totalItems: number;
  processedItems: number;
  failedItems: number;
  errors?: string[];
  startedAt?: Date;
  completedAt?: Date;
  metadata?: Metadata;
}

/**
 * Blog Tag Export
 */
export interface BlogTagExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: BlogTagFilter;
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
  // Blog Tag
  CONTENT_BLOG_TAG,
  ContentBlogPopularTag,
  ContentBlogTopicTag,
  ContentBlogTypeTag,
  ContentBlogAudienceTag,
  ContentBlogTagColor,
  ContentBlogTagCategory,
  contentBlogTagGetPopularLabel,
  contentBlogTagGetTopicLabel,
  contentBlogTagGetTypeLabel,
  contentBlogTagGetAudienceLabel,
  contentBlogTagGetColor,
  contentBlogTagGetCategory,
  contentBlogTagIsValidPopular,
  contentBlogTagIsValidTopic,
  contentBlogTagIsValidType,
  contentBlogTagIsValidAudience,
};
