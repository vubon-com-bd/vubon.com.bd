/**
 * AI Recommendation Index
 * Export all AI recommendation constants and types for easy importing
 */

// Export all constants from ai-recommendation.constants
export {
  AI_RECOMMENDATION,
  getAiRecommendationPriorityLabel,
  getAiRecommendationStatusLabel,
  getAiRecommendationScopeLabel,
  getAiRecommendationMetricLabel,
  getAiRecommendationAlgorithmFamily,
  isAiRecommendationDelivered,
  isAiRecommendationActive,
  getAiRecommendationDefaultCount,
} from './ai-recommendation.constants';

// Export all types from ai-recommendation.constants
export type {
  AIRecommendationType,
  AIRecommendationStrategy,
  AIRecommendationScope,
  AIRecommendationPriority,
  AIRecommendationStatus,
  AIRecommendationFeedbackType,
  AIRecommendationScoreType,
  AIRecommendationFilter,
  AIRecommendationAlgorithm,
  AIRecommendationMetric,
  AIRecommendationLimit,
  AIRecommendationTimeframe,
  AIRecommendationModel,
} from './ai-recommendation.constants';

// Export all constants from ai-recommendation-type.constants
export {
  AI_RECOMMENDATION_TYPE,
  getAiRecommendationTypeLabel,
  getAiRecommendationCategoryLabel,
  getAiRecommendationSourceLabel,
  getAiRecommendationPurposeLabel,
  getAiRecommendationDefaultCountByPurpose,
} from './ai-recommendation-type.constants';

// Export all types from ai-recommendation-type.constants
export type {
  AIRecommendationTypeType,
  AIRecommendationCategory,
  AIRecommendationSubType,
  AIRecommendationSource,
  AIRecommendationPurpose,
} from './ai-recommendation-type.constants';

// Export all constants from ai-recommendation-strategy.constants
export {
  AI_RECOMMENDATION_STRATEGY,
  getAiRecommendationStrategyTypeLabel,
  getAiRecommendationStrategyGoalLabel,
  getAiRecommendationExecutionModeLabel,
  getAiRecommendationEvaluationMethodLabel,
  getAiRecommendationStrategyPriorityWeight,
  getAiRecommendationRecommendedStrategyForGoal,
} from './ai-recommendation-strategy.constants';

// Export all types from ai-recommendation-strategy.constants
export type {
  AIRecommendationStrategyType,
  AIRecommendationStrategyApproach,
  AIRecommendationStrategyGoal,
  AIRecommendationStrategyTradeOff,
  AIRecommendationExecutionMode,
  AIRecommendationEvaluationMethod,
} from './ai-recommendation-strategy.constants';

// Export all constants from ai-recommendation-status.constants
export {
  AI_RECOMMENDATION_STATUS_TYPES,
  AI_RECOMMENDATION_STATUS,
  getAiRecommendationStatusLabel as getAiRecommendationStatusLabelDetailed,
  getAiRecommendationStatusCategory,
  getAiRecommendationStatusSeverity,
  getAiRecommendationStatusColor,
  isAiRecommendationActiveStatus,
  isAiRecommendationDeliveredStatus,
  isAiRecommendationFailedStatus,
  isAiRecommendationCompleted,
  getAiRecommendationStatusProgress,
} from './ai-recommendation-status.constants';

// Export all types from ai-recommendation-status.constants
export type {
  AIRecommendationStatusType,
  AIRecommendationStatusCategory,
  AIRecommendationStatusSeverity,
  AIRecommendationStatusColor,
} from './ai-recommendation-status.constants';

// Export all constants from ai-recommendation-scope.constants
export {
  AI_RECOMMENDATION_SCOPE,
  getAiRecommendationScopeLevelLabel,
  getAiRecommendationScopeContextLabel,
  getAiRecommendationScopeTypeLabel,
  getAiRecommendationScopeRuleLabel,
  getAiRecommendationScopePriorityValue,
  getAiRecommendationScopeWeight,
  getAiRecommendationDefaultCountByScopeType,
} from './ai-recommendation-scope.constants';

// Export all types from ai-recommendation-scope.constants
export type {
  AIRecommendationScopeLevel,
  AIRecommendationScopeContext,
  AIRecommendationScopeType,
  AIRecommendationScopeRule,
  AIRecommendationScopePriority,
  AIRecommendationScopeWeight,
} from './ai-recommendation-scope.constants';

// Export all constants from ai-recommendation-priority.constants
export {
  AI_RECOMMENDATION_PRIORITY_FACTORS,
  AI_RECOMMENDATION_PRIORITY,
  getAiRecommendationPriorityLevelLabel,
  getAiRecommendationPriorityScore,
  getAiRecommendationPriorityLevel,
  calculateAiRecommendationPriorityScore,
  applyAiRecommendationPriorityBoost,
  applyAiRecommendationPriorityPenalty,
  getAiRecommendationPriorityBoostLabel,
  getAiRecommendationPriorityPenaltyLabel,
  getAiRecommendationDecayFactor,
  getAiRecommendationDefaultFactorWeights,
  getAiRecommendationDefaultThresholds,
} from './ai-recommendation-priority.constants';

// Export all types from ai-recommendation-priority.constants
export type {
  AIRecommendationPriorityFactor,
  AIRecommendationPriorityLevel,
  AIRecommendationPriorityScore,
  AIRecommendationPriorityWeight,
  AIRecommendationPriorityThreshold,
  AIRecommendationPriorityDecay,
  AIRecommendationPriorityBoost,
  AIRecommendationPriorityPenalty,
} from './ai-recommendation-priority.constants';
