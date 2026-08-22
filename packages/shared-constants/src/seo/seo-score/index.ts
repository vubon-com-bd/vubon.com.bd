/**
 * SEO Score Constants Index
 * Export all SEO score constants and types for easy importing
 */

// SEO Score Main Constants
export {
  SEO_SCORE,
  getSEOScoreTypeLabel,
  getSEOScoreStatusLabel,
  getSEOScoreLabel,
  getSEOScoreColor,
  getSEOScoreRange,
  getSEOScoreWeightLabel,
  getSEOScoreFactorLabel,
  getSEOScoreTrendLabel,
  getSEOScoreComparisonLabel,
  getSEOScoreConfidenceLabel,
  calculateWeightedScore,
  getScoreCategory,
  isScoreGood,
  isScoreExcellent,
  isScoreOutstanding,
} from './seo-score.constants';

export type {
  SEOScoreType,
  SEOScoreStatus,
  SEOScoreRange,
  SEOScoreLabel,
  SEOScoreColor,
  SEOScoreWeightCategory,
  SEOScoreFactor,
  SEOScoreMetric,
  SEOScoreComparisonType,
  SEOScoreTrend,
  SEOScoreConfidence,
} from './seo-score.constants';

// SEO Score Type Constants
export {
  SEO_SCORE_TYPE,
  getSEOScoreCategoryTypeLabel,
  getSEOScoreMethodologyLabel,
  getSEOScoreGranularityLabel,
  getSEOScoreContextLabel,
  getSEOScoreFormatLabel,
  getSEOScorePerspectiveLabel,
  getSEOScoreDimensionLabel,
} from './seo-score-type.constants';

export type {
  SEOScoreTypeCategory,
  SEOScoreTypeMethodology,
  SEOScoreTypeGranularity,
  SEOScoreTypeContext,
  SEOScoreTypeFormat,
  SEOScoreTypePerspective,
  SEOScoreTypeDimension,
} from './seo-score-type.constants';

// SEO Score Status Constants
export {
  SEO_SCORE_STATUS,
  getSEOScoreLifecycleLabel,
  getSEOScoreQualityStatusLabel,
  getSEOScoreAccuracyLabel,
  getSEOScoreReliabilityLabel,
  getSEOScoreFreshnessLabel,
  getSEOScoreValidationLabel,
  getSEOScoreStatusCategory,
  getSEOScoreStatusColor,
  isScoreCompleted,
  isScoreValid,
  isScoreOutdated,
} from './seo-score-status.constants';

export type {
  SEOScoreLifecycleStatus,
  SEOScoreQualityStatus,
  SEOScoreAccuracyStatus,
  SEOScoreReliabilityStatus,
  SEOScoreFreshnessStatus,
  SEOScoreValidationStatus,
  SEOScoreStatusCategory,
} from './seo-score-status.constants';
