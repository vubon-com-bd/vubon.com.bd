/**
 * AI Insight Index
 * Export all AI insight constants and types for easy importing
 */

// Export all constants from ai-insight.constants
export {
  AI_INSIGHT,
  getAiInsightTypeLabel,
  getAiInsightStatusLabel,
  getAiInsightCategoryLabel,
  getAiInsightMethodLabel,
  getAiInsightPriorityLabel,
  getAiInsightConfidenceLabel,
  getAiInsightImpactLabel,
  getAiInsightQualityLabel,
  getAiInsightSourceLabel,
  getAiInsightFormatLabel,
  getAiInsightMetricLabel,
  isAiInsightActive,
  isAiInsightProcessing,
  isAiInsightFailed,
  getAiInsightPriorityScore,
  getAiInsightConfidenceScore,
  getAiInsightQualityScore,
  getAiInsightImpactScore,
} from './ai-insight.constants';

// Export all types from ai-insight.constants
export type {
  AIInsightType,
  AIInsightStatus,
  AIInsightCategory,
  AIInsightMethod,
  AIInsightPriority,
  AIInsightConfidence,
  AIInsightImpact,
  AIInsightQuality,
  AIInsightSource,
  AIInsightLimit,
  AIInsightFormat,
  AIInsightMetric,
} from './ai-insight.constants';

// Export all constants from ai-insight-type.constants
export {
  AI_INSIGHT_TYPE,
  getAiInsightDomainLabel,
  getAiInsightSubTypeLabel,
  getAiInsightComplexityLabel,
  getAiInsightMaturityLabel,
  getAiInsightScopeLabel,
  getAiInsightHorizonLabel,
  getAiInsightComplexityScore,
  getAiInsightMaturityScore,
} from './ai-insight-type.constants';

// Export all types from ai-insight-type.constants
export type {
  AIInsightDomain,
  AIInsightSubType,
  AIInsightComplexity,
  AIInsightMaturity,
  AIInsightScope,
  AIInsightHorizon,
} from './ai-insight-type.constants';

// Export all constants from ai-insight-status.constants
export {
  AI_INSIGHT_STATUS_TYPES,
  AI_INSIGHT_STATUS,
  getAiInsightStatusLabel as getAiInsightStatusLabelDetailed,
  getAiInsightStatusCategory,
  getAiInsightStatusSeverity,
  getAiInsightStatusColor,
  isAiInsightActiveStatus,
  isAiInsightCompleted,
  isAiInsightFailedStatus,
  getAiInsightStatusProgress,
} from './ai-insight-status.constants';

// Export all types from ai-insight-status.constants
export type {
  AIInsightStatusType,
  AIInsightStatusCategory,
  AIInsightStatusSeverity,
  AIInsightStatusColor,
} from './ai-insight-status.constants';

// Export all constants from ai-insight-priority.constants
export {
  AI_INSIGHT_PRIORITY_FACTORS,
  getAiInsightPriorityFactorLabel,
  getAiInsightPriorityBoostLabel,
  getAiInsightPriorityPenaltyLabel,
  getAiInsightPriorityDecayLabel,
  getAiInsightPriorityThresholds,
  getAiInsightDefaultFactorWeights,
  getAiInsightDecayFactor,
} from './ai-insight-priority.constants';

// Export all types from ai-insight-priority.constants
export type {
  AIInsightPriorityFactor,
  AIInsightPriorityWeight,
  AIInsightPriorityThreshold,
  AIInsightPriorityBoost,
  AIInsightPriorityPenalty,
  AIInsightPriorityDecay,
} from './ai-insight-priority.constants';
