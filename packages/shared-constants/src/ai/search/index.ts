/**
 * AI Search Constants Index
 * Export all search constants and types for easy importing
 */

// AI Search Constants
export {
  AI_SEARCH,
  getSearchTypeLabel,
  getSearchStatusLabel,
  getSearchStrategyLabel,
  getSearchSortLabel,
  getSearchMetricLabel,
  getSearchModeLabel,
  isSearchActive,
  isSearchComplete,
  isSearchFailed,
  getDefaultSearchLimit,
  getMaxSearchLimit,
} from './ai-search.constants';

export type {
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
} from './ai-search.constants';

// AI Search Type Constants
export {
  AI_SEARCH_TYPE,
  getSearchCategoryLabel,
  getSearchSubTypeLabel,
  getSearchSourceLabel,
  getSearchModeTypeLabel,
  getSearchOperatorLabel,
  getSearchScopeLabel,
} from './ai-search-type.constants';

export type {
  AISearchCategory,
  AISearchSubType,
  AISearchSource,
  AISearchModeType,
  AISearchOperator,
  AISearchScope,
} from './ai-search-type.constants';

// AI Search Status Constants
export {
  AI_SEARCH_STATUS,
  AI_SEARCH_STATUS_TYPES,
  getSearchStatusLabel as getSearchStatusLabel2,
  getSearchStatusCategory,
  getSearchStatusSeverity,
  getSearchStatusColor,
  isSearchActive as isSearchActive2,
  isSearchDelivered,
  isSearchComplete as isSearchComplete2,
  isSearchFailed as isSearchFailed2,
} from './ai-search-status.constants';

export type {
  AISearchStatusType,
  AISearchStatusCategory,
  AISearchStatusSeverity,
  AISearchStatusColor,
} from './ai-search-status.constants';

// AI Search Strategy Constants
export {
  AI_SEARCH_STRATEGY,
  getSearchStrategyTypeLabel,
  getSearchStrategyApproachLabel,
  getSearchStrategyGoalLabel,
  getSearchStrategyExecutionLabel,
  getSearchStrategyEvaluationLabel,
  getRecommendedStrategyForGoal,
} from './ai-search-strategy.constants';

export type {
  AISearchStrategyType,
  AISearchStrategyApproach,
  AISearchStrategyGoal,
  AISearchStrategyOptimization,
  AISearchStrategyExecution,
  AISearchStrategyEvaluation,
} from './ai-search-strategy.constants';
