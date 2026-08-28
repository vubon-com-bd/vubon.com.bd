/**
 * Knowledge Base Category Types
 * Type definitions for knowledge base categories based on shared-constants
 * @module KnowledgeBaseCategoryTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support knowledge-base
// ============================================================
import {
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
  KnowledgeBaseStatusType,
  KnowledgeBaseStatusCategory,
  KnowledgeBaseStatusColor,
  KnowledgeBaseStatusIcon,
  KnowledgeBaseStatusTransition,
} from '@vubon/shared-constants';

// ============================================================
// Knowledge Base Category Extended Types
// ============================================================

/**
 * Knowledge base category
 */
export interface KnowledgeBaseCategory extends BaseEntity, Timestamp {
  id: ID;
  kbId: ID;
  parentId?: ID;
  type: KnowledgeBaseCategoryType;
  icon: KnowledgeBaseCategoryIcon;
  color: KnowledgeBaseCategoryColor;
  name: string;
  description?: string;
  priority: number;
  articleCount: number;
  metadata?: Metadata;
}

/**
 * Knowledge base category filter
 */
export interface KnowledgeBaseCategoryFilter {
  ids?: ID[];
  kbIds?: ID[];
  parentIds?: ID[];
  types?: KnowledgeBaseCategoryType[];
  icons?: KnowledgeBaseCategoryIcon[];
  colors?: KnowledgeBaseCategoryColor[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minPriority?: number;
  maxPriority?: number;
  minArticleCount?: number;
  maxArticleCount?: number;
  hasParent?: boolean;
  hasChildren?: boolean;
  searchTerm?: string;
}

/**
 * Knowledge base category statistics
 */
export interface KnowledgeBaseCategoryStatistics {
  kbId: ID;
  totalCategories: number;
  rootCategories: number;
  leafCategories: number;
  byType: Record<KnowledgeBaseCategoryType, number>;
  byIcon: Record<KnowledgeBaseCategoryIcon, number>;
  byColor: Record<KnowledgeBaseCategoryColor, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageArticleCount: number;
  maxArticleCount: number;
  minArticleCount: number;
  categoriesWithArticles: number;
  categoriesWithoutArticles: number;
  mostFrequentType: KnowledgeBaseCategoryType;
  mostFrequentIcon: KnowledgeBaseCategoryIcon;
  mostFrequentColor: KnowledgeBaseCategoryColor;
}

/**
 * Knowledge base category summary
 */
export interface KnowledgeBaseCategorySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalCategories: number;
  root: number;
  leaf: number;
  byType: Record<KnowledgeBaseCategoryType, number>;
  byIcon: Record<KnowledgeBaseCategoryIcon, number>;
  byColor: Record<KnowledgeBaseCategoryColor, number>;
  categoryTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: KnowledgeBaseCategoryType;
    count: number;
    label: string;
  }[];
  topIcons: {
    icon: KnowledgeBaseCategoryIcon;
    count: number;
    label: string;
  }[];
  topColors: {
    color: KnowledgeBaseCategoryColor;
    count: number;
    label: string;
  }[];
  depthDistribution: {
    depth: number;
    count: number;
  }[];
}

/**
 * Knowledge base category configuration
 */
export interface KnowledgeBaseCategoryConfiguration {
  enabled: boolean;
  defaultType: KnowledgeBaseCategoryType;
  defaultIcon: KnowledgeBaseCategoryIcon;
  defaultColor: KnowledgeBaseCategoryColor;
  defaultPriority: number;
  maxDepth: number;
  requireName: boolean;
  requireDescription: boolean;
  allowMultipleParents: boolean;
  allowEmptyCategories: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: KnowledgeBaseCategoryAlertConfig;
}

/**
 * Knowledge base category alert configuration
 */
export interface KnowledgeBaseCategoryAlertConfig {
  enabled: boolean;
  emptyCategoryAlert: boolean;
  emptyCategoryThreshold: number;
  duplicateNameAlert: boolean;
  depthLimitAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Knowledge base category history
 */
export interface KnowledgeBaseCategoryHistory extends BaseEntity, Timestamp {
  id: ID;
  categoryId: ID;
  kbId: ID;
  action: 'create' | 'update' | 'move' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Knowledge base category validation
 */
export interface KnowledgeBaseCategoryValidation {
  isValid: boolean;
  categoryId: ID;
  kbId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Knowledge base category export
 */
export interface KnowledgeBaseCategoryExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: KnowledgeBaseCategoryFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Knowledge base category tree
 */
export interface KnowledgeBaseCategoryTree {
  category: KnowledgeBaseCategory;
  children: KnowledgeBaseCategoryTree[];
  depth: number;
  totalNodes: number;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
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
  KnowledgeBaseStatusType,
  KnowledgeBaseStatusCategory,
  KnowledgeBaseStatusColor,
  KnowledgeBaseStatusIcon,
  KnowledgeBaseStatusTransition,
};
