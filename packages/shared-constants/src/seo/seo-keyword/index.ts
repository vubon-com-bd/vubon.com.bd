/**
 * SEO Keyword Constants Index
 * Export all SEO keyword constants and types for easy importing
 */

// SEO Keyword Main Constants
export {
  SEO_KEYWORD,
  getSEOKeywordTypeLabel,
  getSEOKeywordStatusLabel,
  getSEOKeywordDifficultyLabel,
  getSEOKeywordIntentLabel,
  getSEOKeywordCompetitionLabel,
  getSEOKeywordGroupLabel,
  getSEOKeywordSourceLabel,
  getSEOKeywordLengthCategory,
  getSEOKeywordDifficultyScore,
  getSEOKeywordPriority,
  isKeywordActive,
  isKeywordSuccessful,
  getKeywordStatusColor,
} from './seo-keyword.constants';

export type {
  SEOKeywordType,
  SEOKeywordStatus,
  SEOKeywordDifficulty,
  SEOKeywordIntent,
  SEOKeywordVolumeRange,
  SEOKeywordCompetition,
  SEOKeywordPriorityScore,
  SEOKeywordGroup,
  SEOKeywordMatchType,
  SEOKeywordSource,
  SEOKeywordLengthCategory,
  SEOKeywordValueMetric,
  SEOKeywordPerformanceMetric,
} from './seo-keyword.constants';

// SEO Keyword Type Constants
export {
  SEO_KEYWORD_TYPE,
  getSEOKeywordCategoryLabel,
  getSEOKeywordFormatLabel,
  getSEOKeywordModifierLabel,
  getSEOKeywordIntentTypeLabel,
  getSEOKeywordFunnelStageLabel,
  getSEOKeywordSeasonalityLabel,
  getSEOKeywordGeoScopeLabel,
} from './seo-keyword-type.constants';

export type {
  SEOKeywordTypeCategory,
  SEOKeywordTypeFormat,
  SEOKeywordTypeModifier,
  SEOKeywordTypeIntent,
  SEOKeywordTypeScore,
  SEOKeywordTypeFunnelStage,
  SEOKeywordTypeSeasonality,
  SEOKeywordTypeGeoScope,
} from './seo-keyword-type.constants';

// SEO Keyword Status Constants
export {
  SEO_KEYWORD_STATUS,
  getSEOKeywordLifecycleLabel,
  getSEOKeywordPriorityLabel,
  getSEOKeywordProgressLabel,
  getSEOKeywordQualityLabel,
  getSEOKeywordRankingLabel,
  getSEOKeywordStatusCategory,
  getSEOKeywordStatusColor,
  isKeywordActive as isSEOKeywordActive,
  isKeywordCompleted,
  getProgressPercentage,
} from './seo-keyword-status.constants';

export type {
  SEOKeywordLifecycleStatus,
  SEOKeywordPriorityStatus,
  SEOKeywordProgressStatus,
  SEOKeywordQualityStatus,
  SEOKeywordRankingStatus,
  SEOKeywordCategoryStatus,
} from './seo-keyword-status.constants';

// SEO Keyword Difficulty Constants
export {
  SEO_KEYWORD_DIFFICULTY,
  getDifficultyLevel,
  getDifficultyLabel,
  getDifficultyColor,
  calculateDifficulty,
  getDifficultyRecommendation,
  getEaseOfRanking,
  getDifficultyCategory,
} from './seo-keyword-difficulty.constants';

export type {
  SEOKeywordDifficultyLevel,
  SEOKeywordDifficultyRange,
  SEOKeywordDifficultyLabel,
  SEOKeywordDifficultyColor,
  SEOKeywordDifficultyFactor,
} from './seo-keyword-difficulty.constants';

// SEO Keyword Intent Constants
export {
  SEO_KEYWORD_INTENT,
  getIntentTypeLabel,
  getIntentSubTypeLabel,
  getIntentScore,
  getIntentColor,
  detectIntent,
  getIntentRecommendation,
  getFunnelStage,
} from './seo-keyword-intent.constants';

export type {
  SEOKeywordIntentType,
  SEOKeywordIntentSubType,
  SEOKeywordIntentSignal,
  SEOKeywordIntentScore,
  SEOKeywordIntentColor,
} from './seo-keyword-intent.constants';
