/**
 * AI Recommendation Constants Index
 * Export all recommendation constants and types for easy importing
 */

// AI Recommendation Constants
export {
  AI_RECOMMENDATION,
  getRecommendationPriorityLabel as getRecPriorityLabel,
  getRecommendationStatusLabel as getRecStatusLabel,
  getRecommendationScopeLabel,
  getRecommendationMetricLabel,
  getRecommendationAlgorithmFamily,
  isRecommendationDelivered as isRecDelivered,
  isRecommendationActive as isRecActive,
  getDefaultRecommendationCount,
} from './ai-recommendation.constants';

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

// AI Recommendation Type Constants
export {
  AI_RECOMMENDATION_TYPE,
  getRecommendationTypeLabel,
  getRecommendationCategoryLabel,
  getRecommendationSourceLabel,
  getRecommendationPurposeLabel,
  getDefaultCountByPurpose,
} from './ai-recommendation-type.constants';

export type {
  AIRecommendationTypeType,
  AIRecommendationCategory,
  AIRecommendationSubType,
  AIRecommendationSource,
  AIRecommendationPurpose,
} from './ai-recommendation-type.constants';

// AI Recommendation Strategy Constants
export {
  AI_RECOMMENDATION_STRATEGY,
  getStrategyTypeLabel,
  getStrategyGoalLabel,
  getExecutionModeLabel,
  getEvaluationMethodLabel,
  getStrategyPriorityWeight,
  getRecommendedStrategyForGoal,
} from './ai-recommendation-strategy.constants';

export type {
  AIRecommendationStrategyType,
  AIRecommendationStrategyApproach,
  AIRecommendationStrategyGoal,
  AIRecommendationStrategyTradeOff,
  AIRecommendationExecutionMode,
  AIRecommendationEvaluationMethod,
} from './ai-recommendation-strategy.constants';

// AI Recommendation Status Constants
export {
  AI_RECOMMENDATION_STATUS,
  AI_RECOMMENDATION_STATUS_TYPES,
  getRecommendationStatusLabel as getRecStatusLabel2,
  getRecommendationStatusCategory,
  getRecommendationStatusSeverity,
  getRecommendationStatusColor,
  isRecommendationActive as isRecActive2,
  isRecommendationDelivered as isRecDelivered2,
  isRecommendationConverted,
  isRecommendationFailed,
  isRecommendationComplete,
} from './ai-recommendation-status.constants';

export type {
  AIRecommendationStatusType,
  AIRecommendationStatusCategory,
  AIRecommendationStatusSeverity,
  AIRecommendationStatusColor,
} from './ai-recommendation-status.constants';

// AI Recommendation Scope Constants
export {
  AI_RECOMMENDATION_SCOPE,
  getScopeLevelLabel,
  getScopeContextLabel,
  getScopeTypeLabel,
  getScopeRuleLabel,
  getScopePriorityValue,
  getScopeWeight,
  getDefaultRecommendationCountByScope,
} from './ai-recommendation-scope.constants';

export type {
  AIRecommendationScopeLevel,
  AIRecommendationScopeContext,
  AIRecommendationScopeType,
  AIRecommendationScopeRule,
  AIRecommendationScopePriority,
  AIRecommendationScopeWeight,
} from './ai-recommendation-scope.constants';

// AI Recommendation Priority Constants
export {
  AI_RECOMMENDATION_PRIORITY,
  AI_RECOMMENDATION_PRIORITY_FACTORS,
  getPriorityLevelLabel,
  getPriorityScore,
  getPriorityLevel,
  calculatePriorityScore,
  applyPriorityBoost,
  applyPriorityPenalty,
  getPriorityBoostLabel,
  getPriorityPenaltyLabel,
  getDecayFactor,
  getDefaultFactorWeights,
  getDefaultThresholds,
} from './ai-recommendation-priority.constants';

export type {
  AIRecommendationPriorityLevel,
  AIRecommendationPriorityScore,
  AIRecommendationPriorityFactor,
  AIRecommendationPriorityWeight,
  AIRecommendationPriorityThreshold,
  AIRecommendationPriorityDecay,
  AIRecommendationPriorityBoost,
  AIRecommendationPriorityPenalty,
} from './ai-recommendation-priority.constants';
