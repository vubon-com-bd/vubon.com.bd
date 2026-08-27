/**
 * AI Search Types
 * Type definitions for AI search based on shared-constants
 * @module AISearchTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai search
// ============================================================
import {
  // Search
  AI_SEARCH,
  AISearchType,
  AISearchStatus,
  AISearchStrategy,
  AISearchFilter,
  AISearchSort,
  AISearchLimit,
  AISearchMetric,
  AISearchLanguage,
  AISearchContext,
  AISearchMode,
  getAiSearchTypeLabel,
  getAiSearchStatusLabel,
  getAiSearchStrategyLabel,
  getAiSearchSortLabel,
  getAiSearchMetricLabel,
  getAiSearchModeLabel,
  isAiSearchActive,
  isAiSearchComplete,
  isAiSearchFailed,
  getAiSearchDefaultLimit,
  getAiSearchMaxLimit,
  // Search Type
  AI_SEARCH_TYPE,
  AISearchCategory,
  AISearchSubType,
  AISearchSource,
  AISearchModeType,
  AISearchOperator,
  AISearchScope,
  getAiSearchCategoryLabel,
  getAiSearchSubTypeLabel,
  getAiSearchSourceLabel,
  getAiSearchModeTypeLabel,
  getAiSearchOperatorLabel,
  getAiSearchScopeLabel,
  // Search Strategy
  AI_SEARCH_STRATEGY,
  AISearchStrategyCategory,
  AISearchStrategyType,
  AISearchStrategyApproach,
  AISearchStrategyGoal,
  AISearchStrategyTradeOff,
  AISearchStrategyExecution,
  AISearchStrategyEvaluation,
  getAiSearchStrategyCategoryLabel,
  getAiSearchStrategyTypeLabel,
  getAiSearchStrategyApproachLabel,
  getAiSearchStrategyGoalLabel,
  getAiSearchStrategyTradeOffLabel,
  getAiSearchStrategyExecutionLabel,
  getAiSearchStrategyEvaluationLabel,
  getAiSearchStrategyPriorityWeight,
  getAiSearchRecommendedStrategyForGoal,
  // Search Status
  AI_SEARCH_STATUS_TYPES,
  AI_SEARCH_STATUS,
  AISearchStatusType,
  AISearchStatusCategory,
  AISearchStatusSeverity,
  AISearchStatusColor,
  getAiSearchStatusLabelDetailed,
  getAiSearchStatusCategory,
  getAiSearchStatusSeverity,
  getAiSearchStatusColor,
  isAiSearchActiveStatus,
  isAiSearchCompleted,
  isAiSearchFailedStatus,
  getAiSearchStatusProgress,
} from '@vubon/shared-constants';

// ============================================================
// AI Search Extended Types (রিনেম করা হয়েছে কনফ্লিক্ট এড়াতে)
// ============================================================

/**
 * AI Search Filter Item (একক ফিল্টার)
 */
export interface AISearchFilterItem {
  field: string;
  operator:
    | 'eq'
    | 'ne'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'in'
    | 'nin'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
    | 'between'
    | 'regex';
  value: unknown;
  metadata?: Metadata;
}

/**
 * AI Search Sort Item (একক সর্ট)
 */
export interface AISearchSortItem {
  field: string;
  order: 'asc' | 'desc';
  metadata?: Metadata;
}

/**
 * AI Search
 */
export interface AISearch extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  query: string;
  type: AISearchType;
  status: AISearchStatus;
  strategy: AISearchStrategy;
  mode: AISearchMode;
  language: AISearchLanguage;
  context: AISearchContext;
  filters: AISearchFilterItem[];
  sort: AISearchSortItem[];
  limit: AISearchLimit;
  offset: number;
  total: number;
  isActive: boolean;
  isComplete: boolean;
  isFailed: boolean;
  metadata?: Metadata;
}

/**
 * AI Search Result
 */
export interface AISearchResult<T = unknown> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  took: number;
  timedOut: boolean;
  metadata?: Metadata;
}

/**
 * AI Search Filter Options
 */
export interface AISearchFilterOptions {
  ids?: ID[];
  userIds?: ID[];
  types?: AISearchType[];
  statuses?: AISearchStatus[];
  strategies?: AISearchStrategy[];
  modes?: AISearchMode[];
  languages?: AISearchLanguage[];
  categories?: AISearchCategory[];
  scopes?: AISearchScope[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isComplete?: boolean;
  isFailed?: boolean;
  searchTerm?: string;
  query?: string;
}

/**
 * AI Search Statistics
 */
export interface AISearchStatistics {
  userId: ID;
  totalSearches: number;
  activeSearches: number;
  completedSearches: number;
  failedSearches: number;
  byType: Record<AISearchType, number>;
  byStatus: Record<AISearchStatus, number>;
  byStrategy: Record<AISearchStrategy, number>;
  byMode: Record<AISearchMode, number>;
  byLanguage: Record<AISearchLanguage, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageResults: number;
  maxResults: number;
  minResults: number;
  averageSearchTime: number;
  maxSearchTime: number;
  minSearchTime: number;
  mostFrequentType: AISearchType;
  mostFrequentStatus: AISearchStatus;
  mostFrequentStrategy: AISearchStrategy;
  mostFrequentMode: AISearchMode;
}

/**
 * AI Search Summary
 */
export interface AISearchSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSearches: number;
  active: number;
  completed: number;
  failed: number;
  byType: Record<AISearchType, number>;
  byStatus: Record<AISearchStatus, number>;
  byStrategy: Record<AISearchStrategy, number>;
  byMode: Record<AISearchMode, number>;
  byLanguage: Record<AISearchLanguage, number>;
  searchTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topTypes: {
    type: AISearchType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: AISearchStatus;
    count: number;
    label: string;
  }[];
  topStrategies: {
    strategy: AISearchStrategy;
    count: number;
    label: string;
  }[];
  topModes: {
    mode: AISearchMode;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageResults: number;
    averageSearchTime: number;
    successRate: number;
    failureRate: number;
  };
}

/**
 * AI Search Configuration
 */
export interface AISearchConfiguration {
  enabled: boolean;
  defaultType: AISearchType;
  defaultStrategy: AISearchStrategy;
  defaultMode: AISearchMode;
  defaultLanguage: AISearchLanguage;
  defaultLimit: number;
  maxLimit: number;
  defaultSort: AISearchSortItem[];
  enableCache: boolean;
  cacheTTLSeconds: number;
  enableLogging: boolean;
  notificationOnComplete: boolean;
  notificationOnFailure: boolean;
  alertConfig?: AISearchAlertConfig;
}

/**
 * AI Search Alert Configuration
 */
export interface AISearchAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  timeoutAlert: boolean;
  timeoutThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * AI Search History
 */
export interface AISearchHistory extends BaseEntity, Timestamp {
  id: ID;
  searchId: ID;
  userId: ID;
  action: 'create' | 'update' | 'complete' | 'fail' | 'retry' | 'cancel';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * AI Search Validation
 */
export interface AISearchValidation {
  isValid: boolean;
  searchId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Search Export
 */
export interface AISearchExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AISearchFilterOptions;
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
  // Search
  AI_SEARCH,
  AISearchType,
  AISearchStatus,
  AISearchStrategy,
  AISearchFilter,
  AISearchSort,
  AISearchLimit,
  AISearchMetric,
  AISearchLanguage,
  AISearchContext,
  AISearchMode,
  getAiSearchTypeLabel,
  getAiSearchStatusLabel,
  getAiSearchStrategyLabel,
  getAiSearchSortLabel,
  getAiSearchMetricLabel,
  getAiSearchModeLabel,
  isAiSearchActive,
  isAiSearchComplete,
  isAiSearchFailed,
  getAiSearchDefaultLimit,
  getAiSearchMaxLimit,
  // Search Type
  AI_SEARCH_TYPE,
  AISearchCategory,
  AISearchSubType,
  AISearchSource,
  AISearchModeType,
  AISearchOperator,
  AISearchScope,
  getAiSearchCategoryLabel,
  getAiSearchSubTypeLabel,
  getAiSearchSourceLabel,
  getAiSearchModeTypeLabel,
  getAiSearchOperatorLabel,
  getAiSearchScopeLabel,
  // Search Strategy
  AI_SEARCH_STRATEGY,
  AISearchStrategyCategory,
  AISearchStrategyType,
  AISearchStrategyApproach,
  AISearchStrategyGoal,
  AISearchStrategyTradeOff,
  AISearchStrategyExecution,
  AISearchStrategyEvaluation,
  getAiSearchStrategyCategoryLabel,
  getAiSearchStrategyTypeLabel,
  getAiSearchStrategyApproachLabel,
  getAiSearchStrategyGoalLabel,
  getAiSearchStrategyTradeOffLabel,
  getAiSearchStrategyExecutionLabel,
  getAiSearchStrategyEvaluationLabel,
  getAiSearchStrategyPriorityWeight,
  getAiSearchRecommendedStrategyForGoal,
  // Search Status
  AI_SEARCH_STATUS_TYPES,
  AI_SEARCH_STATUS,
  AISearchStatusType,
  AISearchStatusCategory,
  AISearchStatusSeverity,
  AISearchStatusColor,
  getAiSearchStatusLabelDetailed,
  getAiSearchStatusCategory,
  getAiSearchStatusSeverity,
  getAiSearchStatusColor,
  isAiSearchActiveStatus,
  isAiSearchCompleted,
  isAiSearchFailedStatus,
  getAiSearchStatusProgress,
};
