/**
 * Knowledge Base Article Types
 * Type definitions for knowledge base articles based on shared-constants
 * @module KnowledgeBaseArticleTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support knowledge-base
// ============================================================
import {
  // Knowledge Base Article
  KNOWLEDGE_BASE_ARTICLE,
  KnowledgeBaseArticleType,
  KnowledgeBaseArticleStatus,
  KnowledgeBaseArticlePriority,
  KnowledgeBaseArticleFormat,
  KnowledgeBaseArticleDifficulty,
  KnowledgeBaseArticleViewType,
  knowledgeBaseArticleGetTypeLabel,
  knowledgeBaseArticleGetStatusLabel,
  knowledgeBaseArticleGetPriorityLabel,
  knowledgeBaseArticleGetDifficultyLabel,
  knowledgeBaseArticleIsPublished,
  knowledgeBaseArticleIsDraft,
  knowledgeBaseArticleIsArchived,
  // Knowledge Base Status
  KnowledgeBaseStatusType,
  KnowledgeBaseStatusCategory,
  KnowledgeBaseStatusColor,
  KnowledgeBaseStatusIcon,
  KnowledgeBaseStatusTransition,
} from '@vubon/shared-constants';

// ============================================================
// Knowledge Base Article Extended Types
// ============================================================

/**
 * Knowledge base article
 */
export interface KnowledgeBaseArticle extends BaseEntity, Timestamp {
  id: ID;
  kbId: ID;
  categoryId: ID;
  type: KnowledgeBaseArticleType;
  status: KnowledgeBaseArticleStatus;
  priority: KnowledgeBaseArticlePriority;
  format: KnowledgeBaseArticleFormat;
  difficulty: KnowledgeBaseArticleDifficulty;
  viewType: KnowledgeBaseArticleViewType;
  title: string;
  content: string;
  excerpt?: string;
  isPublished: boolean;
  isDraft: boolean;
  isArchived: boolean;
  viewCount: number;
  helpfulCount: number;
  unhelpfulCount: number;
  metadata?: Metadata;
}

/**
 * Knowledge base article filter
 */
export interface KnowledgeBaseArticleFilter {
  ids?: ID[];
  kbIds?: ID[];
  categoryIds?: ID[];
  types?: KnowledgeBaseArticleType[];
  statuses?: KnowledgeBaseArticleStatus[];
  priorities?: KnowledgeBaseArticlePriority[];
  formats?: KnowledgeBaseArticleFormat[];
  difficulties?: KnowledgeBaseArticleDifficulty[];
  viewTypes?: KnowledgeBaseArticleViewType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isDraft?: boolean;
  isArchived?: boolean;
  searchTerm?: string;
  title?: string;
}

/**
 * Knowledge base article statistics
 */
export interface KnowledgeBaseArticleStatistics {
  kbId: ID;
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  archivedArticles: number;
  byType: Record<KnowledgeBaseArticleType, number>;
  byStatus: Record<KnowledgeBaseArticleStatus, number>;
  byPriority: Record<KnowledgeBaseArticlePriority, number>;
  byFormat: Record<KnowledgeBaseArticleFormat, number>;
  byDifficulty: Record<KnowledgeBaseArticleDifficulty, number>;
  byViewType: Record<KnowledgeBaseArticleViewType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageViewCount: number;
  maxViewCount: number;
  minViewCount: number;
  averageHelpfulCount: number;
  maxHelpfulCount: number;
  minHelpfulCount: number;
  helpfulRate: number;
  unhelpfulRate: number;
  mostFrequentType: KnowledgeBaseArticleType;
  mostFrequentStatus: KnowledgeBaseArticleStatus;
  mostFrequentPriority: KnowledgeBaseArticlePriority;
  mostFrequentDifficulty: KnowledgeBaseArticleDifficulty;
}

/**
 * Knowledge base article summary
 */
export interface KnowledgeBaseArticleSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalArticles: number;
  published: number;
  draft: number;
  archived: number;
  byType: Record<KnowledgeBaseArticleType, number>;
  byStatus: Record<KnowledgeBaseArticleStatus, number>;
  byPriority: Record<KnowledgeBaseArticlePriority, number>;
  byFormat: Record<KnowledgeBaseArticleFormat, number>;
  byDifficulty: Record<KnowledgeBaseArticleDifficulty, number>;
  byViewType: Record<KnowledgeBaseArticleViewType, number>;
  articleTrend: {
    date: Date;
    total: number;
    published: number;
    draft: number;
  }[];
  topTypes: {
    type: KnowledgeBaseArticleType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: KnowledgeBaseArticleStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: KnowledgeBaseArticlePriority;
    count: number;
    label: string;
  }[];
  topDifficulties: {
    difficulty: KnowledgeBaseArticleDifficulty;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageViewCount: number;
    helpfulRate: number;
    unhelpfulRate: number;
  };
}

/**
 * Knowledge base article configuration
 */
export interface KnowledgeBaseArticleConfiguration {
  enabled: boolean;
  defaultType: KnowledgeBaseArticleType;
  defaultStatus: KnowledgeBaseArticleStatus;
  defaultPriority: KnowledgeBaseArticlePriority;
  defaultFormat: KnowledgeBaseArticleFormat;
  defaultDifficulty: KnowledgeBaseArticleDifficulty;
  defaultViewType: KnowledgeBaseArticleViewType;
  requireCategory: boolean;
  requireTitle: boolean;
  requireContent: boolean;
  autoPublish: boolean;
  requireApproval: boolean;
  allowMultipleFormats: boolean;
  notificationOnPublish: boolean;
  notificationOnUpdate: boolean;
  notificationOnDraft: boolean;
  notificationOnArchive: boolean;
  alertConfig?: KnowledgeBaseArticleAlertConfig;
}

/**
 * Knowledge base article alert configuration
 */
export interface KnowledgeBaseArticleAlertConfig {
  enabled: boolean;
  lowHelpfulRateAlert: boolean;
  lowHelpfulRateThreshold: number;
  highUnhelpfulRateAlert: boolean;
  highUnhelpfulRateThreshold: number;
  staleArticleAlert: boolean;
  staleArticleThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Knowledge base article history
 */
export interface KnowledgeBaseArticleHistory extends BaseEntity, Timestamp {
  id: ID;
  articleId: ID;
  kbId: ID;
  action:
    'create' | 'update' | 'publish' | 'unpublish' | 'draft' | 'archive' | 'restore' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Knowledge base article validation
 */
export interface KnowledgeBaseArticleValidation {
  isValid: boolean;
  articleId: ID;
  kbId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Knowledge base article export
 */
export interface KnowledgeBaseArticleExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html' | 'markdown';
  filter: KnowledgeBaseArticleFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Knowledge base article feedback
 */
export interface KnowledgeBaseArticleFeedback extends BaseEntity, Timestamp {
  id: ID;
  articleId: ID;
  userId: ID;
  isHelpful: boolean;
  comment?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Knowledge Base Article
  KNOWLEDGE_BASE_ARTICLE,
  KnowledgeBaseArticleType,
  KnowledgeBaseArticleStatus,
  KnowledgeBaseArticlePriority,
  KnowledgeBaseArticleFormat,
  KnowledgeBaseArticleDifficulty,
  KnowledgeBaseArticleViewType,
  knowledgeBaseArticleGetTypeLabel,
  knowledgeBaseArticleGetStatusLabel,
  knowledgeBaseArticleGetPriorityLabel,
  knowledgeBaseArticleGetDifficultyLabel,
  knowledgeBaseArticleIsPublished,
  knowledgeBaseArticleIsDraft,
  knowledgeBaseArticleIsArchived,
  // Knowledge Base Status
  KnowledgeBaseStatusType,
  KnowledgeBaseStatusCategory,
  KnowledgeBaseStatusColor,
  KnowledgeBaseStatusIcon,
  KnowledgeBaseStatusTransition,
};
