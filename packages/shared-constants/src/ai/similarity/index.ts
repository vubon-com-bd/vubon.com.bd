/**
 * AI Similarity Constants Index
 * Export all similarity constants and types for easy importing
 */

// AI Similarity Constants
export {
  AI_SIMILARITY,
  getSimilarityTypeLabel,
  getSimilarityStatusLabel,
  getSimilarityCategoryLabel,
  getSimilarityAlgorithmLabel,
  getSimilarityThresholdLabel,
  getSimilarityFormatLabel,
  getSimilarityNormalizationLabel,
  isSimilarityActive,
  isSimilarityCalculating,
  isSimilarityFailed,
  getDefaultThreshold,
  getDefaultTopK,
  getMaxTopK,
  normalizeScore,
  denormalizeScore,
  getSimilarityRange,
  getAlgorithmForType,
} from './ai-similarity.constants';

export type {
  AISimilarityType,
  AISimilarityStatus,
  AISimilarityCategory,
  AISimilarityAlgorithm,
  AISimilarityThreshold,
  AISimilarityRange,
  AISimilarityLimit,
  AISimilarityMetric,
  AISimilarityFormat,
  AISimilarityNormalization,
} from './ai-similarity.constants';

// AI Similarity Type Constants
export {
  AI_SIMILARITY_TYPE,
  getSimilarityDomainLabel,
  getSimilaritySubTypeLabel,
  getSimilarityLevelLabel,
  getSimilarityConfidenceLabel,
  getSimilarityPrecisionLabel,
  getSimilarityUseCaseLabel,
  getLevelThreshold,
  getConfidenceScore,
} from './ai-similarity-type.constants';

export type {
  AISimilarityDomain,
  AISimilaritySubType,
  AISimilarityLevel,
  AISimilarityConfidence,
  AISimilarityPrecision,
  AISimilarityUseCase,
} from './ai-similarity-type.constants';

// AI Similarity Status Constants
export {
  AI_SIMILARITY_STATUS,
  AI_SIMILARITY_STATUS_TYPES,
  getSimilarityStatusLabel as getSimilarityStatusLabel2,
  getSimilarityStatusCategory,
  getSimilarityStatusSeverity,
  getSimilarityStatusColor,
  isSimilarityActive as isSimilarityActive2,
  isSimilarityCompleted,
  isSimilarityFailed as isSimilarityFailed2,
  getSimilarityStatusProgress,
} from './ai-similarity-status.constants';

export type {
  AISimilarityStatusType,
  AISimilarityStatusCategory,
  AISimilarityStatusSeverity,
  AISimilarityStatusColor,
} from './ai-similarity-status.constants';
