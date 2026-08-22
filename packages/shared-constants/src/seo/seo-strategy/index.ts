/**
 * SEO Strategy Constants Index
 * Export all SEO strategy constants and types for easy importing
 */

// SEO Strategy Constants
export {
  SEO_STRATEGY,
  getSEOStrategyTypeLabel,
  getSEOStrategyStatusLabel,
  getSEOStrategyPriorityLabel,
  getSEOStrategyGoalLabel,
  getSEOStrategyKPILabel,
  getSEOStrategyTimelineLabel,
  getSEOStrategyBudgetLabel,
  getSEOStrategyResourceLabel,
  getSEOStrategyPhaseLabel,
  isSEOStrategyActive,
  isSEOStrategyComplete,
} from './seo-strategy.constants';

export type {
  SEOStrategyType,
  SEOStrategyStatus,
  SEOStrategyPriority,
  SEOStrategyGoal,
  SEOStrategyKPI,
  SEOStrategyTimeline,
  SEOStrategyBudgetRange,
  SEOStrategyResource,
  SEOStrategyFrequency,
  SEOStrategyMetric,
  SEOStrategyRisk,
  SEOStrategyPhase,
} from './seo-strategy.constants';

// SEO Strategy Type Constants
export {
  SEO_STRATEGY_TYPE,
  getSEOStrategyCategoryLabel,
  getSEOStrategySubTypeLabel,
  getSEOStrategyApproachLabel,
  getSEOStrategyFocusLabel,
  getSEOStrategyComplexityLabel,
  getSEOStrategyMaturityLabel,
  isWhiteHatApproach,
  isBlackHatApproach,
  getApproachRiskLevel,
} from './seo-strategy-type.constants';

export type {
  SEOStrategyTypeCategory,
  SEOStrategyTypeSubType,
  SEOStrategyTypeApproach,
  SEOStrategyTypeFocus,
  SEOStrategyTypeComplexity,
  SEOStrategyTypeMaturity,
} from './seo-strategy-type.constants';

// SEO Strategy Status Constants
export {
  SEO_STRATEGY_STATUS,
  getSEOStrategyLifecycleLabel,
  getSEOStrategyExecutionLabel,
  getSEOStrategyHealthLabel,
  getSEOStrategyProgressLabel,
  getSEOStrategyQualityLabel,
  getSEOStrategyStatusRiskLabel,
  getSEOStrategyStatusCategory,
  getSEOStrategyStatusColorCode,
  isStrategyActive,
  isStrategyComplete,
  getProgressPercentage,
} from './seo-strategy-status.constants';

export type {
  SEOStrategyLifecycleStatus,
  SEOStrategyExecutionStatus,
  SEOStrategyHealthStatus,
  SEOStrategyProgressStatus,
  SEOStrategyQualityStatus,
  SEOStrategyRiskStatus,
  SEOStrategyStatusCategory,
} from './seo-strategy-status.constants';
