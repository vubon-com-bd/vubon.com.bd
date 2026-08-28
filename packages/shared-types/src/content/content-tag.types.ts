/**
 * Content Tag Types
 * Type definitions for content tags based on shared-constants
 * @module ContentTagTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import ContentTag from content.types
// ============================================================
import type { ContentTag } from './content.types';

// ============================================================
// Import from shared-constants content
// ============================================================
import {
  // Content Tag
  CONTENT_TAG,
  ContentPopularTag,
  ContentTopicTag,
  ContentTypeTag,
  ContentAudienceTag,
  ContentTagColor,
  ContentTagCategory,
  contentTagGetPopularLabel,
  contentTagGetTopicLabel,
  contentTagGetTypeLabel,
  contentTagGetAudienceLabel,
  contentTagGetColor,
  contentTagGetCategory,
  contentTagIsValidPopular,
  contentTagIsValidTopic,
  contentTagIsValidType,
  contentTagIsValidAudience,
} from '@vubon/shared-constants';

// ============================================================
// Content Tag Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Content Tag Filter
 */
export interface ContentTagFilter {
  ids?: ID[];
  categories?: ContentTagCategory[];
  colors?: ContentTagColor[];
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
 * Content Tag Statistics
 */
export interface ContentTagStatistics {
  totalTags: number;
  activeTags: number;
  popularTags: number;
  topicTags: number;
  typeTags: number;
  audienceTags: number;
  byCategory: Record<ContentTagCategory, number>;
  byColor: Record<ContentTagColor, number>;
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
  mostPopularCategory: ContentTagCategory;
  mostPopularColor: ContentTagColor;
}

/**
 * Content Tag Summary
 */
export interface ContentTagSummary {
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
  byCategory: Record<ContentTagCategory, number>;
  byColor: Record<ContentTagColor, number>;
  tagTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topCategories: {
    category: ContentTagCategory;
    count: number;
    label: string;
  }[];
  topColors: {
    color: ContentTagColor;
    count: number;
    label: string;
  }[];
  topTags: {
    tag: ContentTag;
    usage: number;
  }[];
}

/**
 * Content Tag Configuration
 */
export interface ContentTagConfiguration {
  enabled: boolean;
  defaultCategory: ContentTagCategory;
  defaultColor: ContentTagColor;
  maxTagsPerContent: number;
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
  alertConfig?: ContentTagAlertConfig;
}

/**
 * Content Tag Alert Configuration
 */
export interface ContentTagAlertConfig {
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
 * Content Tag History
 */
export interface ContentTagHistory extends BaseEntity, Timestamp {
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
 * Content Tag Validation
 */
export interface ContentTagValidation {
  isValid: boolean;
  tagId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Content Tag Assignment
 */
export interface ContentTagAssignment extends BaseEntity, Timestamp {
  id: ID;
  tagId: ID;
  contentId: ID;
  assignedAt: Date;
  assignedBy?: ID;
  metadata?: Metadata;
}

/**
 * Content Tag Bulk Operation
 */
export interface ContentTagBulkOperation extends BaseEntity, Timestamp {
  id: ID;
  operation: 'assign' | 'unassign' | 'replace' | 'merge' | 'delete';
  tagIds: ID[];
  contentIds: ID[];
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
 * Content Tag Export
 */
export interface ContentTagExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ContentTagFilter;
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
  // Content Tag
  CONTENT_TAG,
  ContentPopularTag,
  ContentTopicTag,
  ContentTypeTag,
  ContentAudienceTag,
  ContentTagColor,
  ContentTagCategory,
  contentTagGetPopularLabel,
  contentTagGetTopicLabel,
  contentTagGetTypeLabel,
  contentTagGetAudienceLabel,
  contentTagGetColor,
  contentTagGetCategory,
  contentTagIsValidPopular,
  contentTagIsValidTopic,
  contentTagIsValidType,
  contentTagIsValidAudience,
};
