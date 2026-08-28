/**
 * Knowledge Base Types
 * Type definitions for knowledge base based on shared-constants
 * @module KnowledgeBaseTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support knowledge-base
// ============================================================
import {
  // Knowledge Base Core
  KNOWLEDGE_BASE,
  KnowledgeBaseType,
  KnowledgeBaseStatus,
  KnowledgeBaseLanguage,
  KnowledgeBaseFormat,
  KnowledgeBaseRole,
  KnowledgeBasePermission,
  knowledgeBaseGetTypeLabel,
  knowledgeBaseGetStatusLabel,
  knowledgeBaseGetFormatLabel,
  knowledgeBaseIsPublished,
  knowledgeBaseIsDraft,
  knowledgeBaseIsArchived,
  knowledgeBaseGetRoleLabel,
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
  // Knowledge Base Category
  KNOWLEDGE_BASE_CATEGORY,
  KnowledgeBaseCategoryType,
  KnowledgeBaseCategoryIcon,
  KnowledgeBaseCategoryColor,
  knowledgeBaseCategoryGetLabel,
  knowledgeBaseCategoryGetIcon,
  knowledgeBaseCategoryGetColor,
  knowledgeBaseCategoryGetPriority,
  // Knowledge Base Status
  KNOWLEDGE_BASE_STATUS,
  KnowledgeBaseStatusType,
  KnowledgeBaseStatusCategory,
  KnowledgeBaseStatusColor,
  KnowledgeBaseStatusIcon,
  KnowledgeBaseStatusTransition,
  knowledgeBaseStatusGetLabel,
  knowledgeBaseStatusIsPublished,
  knowledgeBaseStatusIsDraft,
  knowledgeBaseStatusIsArchived,
  knowledgeBaseStatusGetCategory,
  knowledgeBaseStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Knowledge Base Extended Types
// ============================================================

/**
 * Knowledge base
 */
export interface KnowledgeBase extends BaseEntity, Timestamp {
  id: ID;
  type: KnowledgeBaseType;
  status: KnowledgeBaseStatus;
  language: KnowledgeBaseLanguage;
  format: KnowledgeBaseFormat;
  name: string;
  description?: string;
  isPublished: boolean;
  isDraft: boolean;
  isArchived: boolean;
  articleCount: number;
  categoryCount: number;
  metadata?: Metadata;
}

/**
 * Knowledge base filter
 */
export interface KnowledgeBaseFilter {
  ids?: ID[];
  types?: KnowledgeBaseType[];
  statuses?: KnowledgeBaseStatus[];
  languages?: KnowledgeBaseLanguage[];
  formats?: KnowledgeBaseFormat[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isDraft?: boolean;
  isArchived?: boolean;
  searchTerm?: string;
}

/**
 * Knowledge base statistics
 */
export interface KnowledgeBaseStatistics {
  totalKnowledgeBases: number;
  publishedKnowledgeBases: number;
  draftKnowledgeBases: number;
  archivedKnowledgeBases: number;
  byType: Record<KnowledgeBaseType, number>;
  byStatus: Record<KnowledgeBaseStatus, number>;
  byLanguage: Record<KnowledgeBaseLanguage, number>;
  byFormat: Record<KnowledgeBaseFormat, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalArticles: number;
  totalCategories: number;
  averageArticlesPerKB: number;
  mostFrequentType: KnowledgeBaseType;
  mostFrequentStatus: KnowledgeBaseStatus;
  mostFrequentLanguage: KnowledgeBaseLanguage;
  mostFrequentFormat: KnowledgeBaseFormat;
}

/**
 * Knowledge base summary
 */
export interface KnowledgeBaseSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalKnowledgeBases: number;
  published: number;
  draft: number;
  archived: number;
  byType: Record<KnowledgeBaseType, number>;
  byStatus: Record<KnowledgeBaseStatus, number>;
  byLanguage: Record<KnowledgeBaseLanguage, number>;
  byFormat: Record<KnowledgeBaseFormat, number>;
  kbTrend: {
    date: Date;
    total: number;
    published: number;
    draft: number;
  }[];
  topTypes: {
    type: KnowledgeBaseType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: KnowledgeBaseStatus;
    count: number;
    label: string;
  }[];
  topLanguages: {
    language: KnowledgeBaseLanguage;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: KnowledgeBaseFormat;
    count: number;
    label: string;
  }[];
}

/**
 * Knowledge base configuration
 */
export interface KnowledgeBaseConfiguration {
  enabled: boolean;
  defaultType: KnowledgeBaseType;
  defaultStatus: KnowledgeBaseStatus;
  defaultLanguage: KnowledgeBaseLanguage;
  defaultFormat: KnowledgeBaseFormat;
  requireName: boolean;
  requireDescription: boolean;
  allowMultipleLanguages: boolean;
  autoPublish: boolean;
  requireApproval: boolean;
  notificationOnPublish: boolean;
  notificationOnUpdate: boolean;
  notificationOnDraft: boolean;
  notificationOnArchive: boolean;
  alertConfig?: KnowledgeBaseAlertConfig;
}

/**
 * Knowledge base alert configuration
 */
export interface KnowledgeBaseAlertConfig {
  enabled: boolean;
  staleKBAlert: boolean;
  staleKBThreshold: number;
  lowArticleCountAlert: boolean;
  lowArticleCountThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Knowledge base history
 */
export interface KnowledgeBaseHistory extends BaseEntity, Timestamp {
  id: ID;
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
 * Knowledge base validation
 */
export interface KnowledgeBaseValidation {
  isValid: boolean;
  kbId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Knowledge base export
 */
export interface KnowledgeBaseExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html' | 'markdown';
  filter: KnowledgeBaseFilter;
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
  // Knowledge Base Core
  KNOWLEDGE_BASE,
  KnowledgeBaseType,
  KnowledgeBaseStatus,
  KnowledgeBaseLanguage,
  KnowledgeBaseFormat,
  KnowledgeBaseRole,
  KnowledgeBasePermission,
  knowledgeBaseGetTypeLabel,
  knowledgeBaseGetStatusLabel,
  knowledgeBaseGetFormatLabel,
  knowledgeBaseIsPublished,
  knowledgeBaseIsDraft,
  knowledgeBaseIsArchived,
  knowledgeBaseGetRoleLabel,
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
  // Knowledge Base Category
  KNOWLEDGE_BASE_CATEGORY,
  KnowledgeBaseCategoryType,
  KnowledgeBaseCategoryIcon,
  KnowledgeBaseCategoryColor,
  knowledgeBaseCategoryGetLabel,
  knowledgeBaseCategoryGetIcon,
  knowledgeBaseCategoryGetColor,
  knowledgeBaseCategoryGetPriority,
  // Knowledge Base Status
  KNOWLEDGE_BASE_STATUS,
  KnowledgeBaseStatusType,
  KnowledgeBaseStatusCategory,
  KnowledgeBaseStatusColor,
  KnowledgeBaseStatusIcon,
  KnowledgeBaseStatusTransition,
  knowledgeBaseStatusGetLabel,
  knowledgeBaseStatusIsPublished,
  knowledgeBaseStatusIsDraft,
  knowledgeBaseStatusIsArchived,
  knowledgeBaseStatusGetCategory,
  knowledgeBaseStatusCanTransition,
};
