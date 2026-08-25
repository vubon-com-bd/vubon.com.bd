/**
 * AI Search Index
 * Export all AI search constants and types for easy importing
 */

// Export all constants from ai-search.constants
export {
  AI_SEARCH,
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
} from './ai-search.constants';

// Export all types from ai-search.constants
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

// Export all constants from ai-search-type.constants
export {
  AI_SEARCH_TYPE,
  getAiSearchCategoryLabel,
  getAiSearchSubTypeLabel,
  getAiSearchSourceLabel,
  getAiSearchModeTypeLabel,
  getAiSearchOperatorLabel,
  getAiSearchScopeLabel,
} from './ai-search-type.constants';

// Export all types from ai-search-type.constants
export type {
  AISearchCategory,
  AISearchSubType,
  AISearchSource,
  AISearchModeType,
  AISearchOperator,
  AISearchScope,
} from './ai-search-type.constants';

// Export all constants from ai-search-strategy.constants
export {
  AI_SEARCH_STRATEGY,
  getAiSearchStrategyCategoryLabel,
  getAiSearchStrategyTypeLabel,
  getAiSearchStrategyApproachLabel,
  getAiSearchStrategyGoalLabel,
  getAiSearchStrategyTradeOffLabel,
  getAiSearchStrategyExecutionLabel,
  getAiSearchStrategyEvaluationLabel,
  getAiSearchStrategyPriorityWeight,
  getAiSearchRecommendedStrategyForGoal,
} from './ai-search-strategy.constants';

// Export all types from ai-search-strategy.constants
export type {
  AISearchStrategyCategory,
  AISearchStrategyType,
  AISearchStrategyApproach,
  AISearchStrategyGoal,
  AISearchStrategyTradeOff,
  AISearchStrategyExecution,
  AISearchStrategyEvaluation,
} from './ai-search-strategy.constants';

// Export all constants from ai-search-status.constants
export {
  AI_SEARCH_STATUS_TYPES,
  AI_SEARCH_STATUS,
  getAiSearchStatusLabel as getAiSearchStatusLabelDetailed,
  getAiSearchStatusCategory,
  getAiSearchStatusSeverity,
  getAiSearchStatusColor,
  isAiSearchActiveStatus,
  isAiSearchCompleted,
  isAiSearchFailedStatus,
  getAiSearchStatusProgress,
} from './ai-search-status.constants';

// Export all types from ai-search-status.constants
export type {
  AISearchStatusType,
  AISearchStatusCategory,
  AISearchStatusSeverity,
  AISearchStatusColor,
} from './ai-search-status.constants';
