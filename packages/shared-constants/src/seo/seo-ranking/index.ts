/**
 * SEO Ranking Constants Index
 * Export all SEO ranking constants and types for easy importing
 */

// SEO Ranking Main Constants
export {
  SEO_RANKING,
  getSEORankingTypeLabel,
  getSEORankingStatusLabel,
  getSEORankingPositionLabel,
  getSEORankingPositionCategory,
  getSEORankingDifficultyLabel,
  getSEORankingVelocityLabel,
  getSEORankingScoreLabel,
  getSEORankingScoreColor,
  getSEORankingSourceLabel,
  getSEORankingFrequencyLabel,
  getRankingStatusColor,
  isRankingImproving,
  isRankingDeclining,
  getPositionChange,
} from './seo-ranking.constants';

export type {
  SEORankingType,
  SEORankingStatus,
  SEORankingPosition,
  SEORankingPositionCategory,
  SEORankingScoreRange,
  SEORankingFactor,
  SEORankingDifficulty,
  SEORankingVelocity,
  SEORankingMetric,
  SEORankingSource,
  SEORankingFrequency,
} from './seo-ranking.constants';

// SEO Ranking Type Constants
export {
  SEO_RANKING_TYPE,
  getSEORankingCategoryLabel,
  getSEORankingSubTypeLabel,
  getSEORankingSERPFeatureLabel,
  getSEORankingDeviceLabel,
  getSEORankingAlgorithmLabel,
  getSEORankingQualityLabel,
  getSEORankingStabilityLabel,
} from './seo-ranking-type.constants';

export type {
  SEORankingTypeCategory,
  SEORankingTypeSubType,
  SEORankingTypeSERPFeature,
  SEORankingTypeDevice,
  SEORankingTypeAlgorithm,
  SEORankingTypeQuality,
  SEORankingTypeStability,
} from './seo-ranking-type.constants';

// SEO Ranking Status Constants
export {
  SEO_RANKING_STATUS,
  getSEORankingLifecycleLabel,
  getSEORankingHealthLabel,
  getSEORankingPerformanceLabel,
  getSEORankingRiskLabel,
  getSEORankingVisibilityLabel,
  getSEORankingTrackingLabel,
  getSEORankingStatusCategory,
  getSEORankingStatusColor,
  isSEORankingImproving,
  isSEORankingDeclining,
  isSEORankingStable,
  isSEORankingActive,
} from './seo-ranking-status.constants';

export type {
  SEORankingLifecycleStatus,
  SEORankingHealthStatus,
  SEORankingPerformanceStatus,
  SEORankingRiskStatus,
  SEORankingVisibilityStatus,
  SEORankingTrackingStatus,
  SEORankingStatusCategory,
} from './seo-ranking-status.constants';
