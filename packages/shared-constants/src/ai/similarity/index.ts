/**
 * AI Similarity Index
 * Export all AI similarity constants and types for easy importing
 */

// Export all constants from ai-similarity.constants
export {
  AI_SIMILARITY,
  getAiSimilarityTypeLabel,
  getAiSimilarityStatusLabel,
  getAiSimilarityCategoryLabel,
  getAiSimilarityAlgorithmLabel,
  getAiSimilarityThresholdLabel,
  getAiSimilarityFormatLabel,
  getAiSimilarityNormalizationLabel,
  isAiSimilarityActive,
  isAiSimilarityCalculating,
  isAiSimilarityFailed,
  getAiSimilarityDefaultThreshold,
  getAiSimilarityDefaultTopK,
  getAiSimilarityMaxTopK,
  normalizeAiSimilarityScore,
  denormalizeAiSimilarityScore,
  getAiSimilarityRange,
  getAiSimilarityAlgorithmForType,
} from './ai-similarity.constants';

// Export all types from ai-similarity.constants
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

// Export all constants from ai-similarity-type.constants
export {
  AI_SIMILARITY_TYPE,
  getAiSimilarityDomainLabel,
  getAiSimilaritySubTypeLabel,
  getAiSimilarityLevelLabel,
  getAiSimilarityConfidenceLabel,
  getAiSimilarityPrecisionLabel,
  getAiSimilarityUseCaseLabel,
  getAiSimilarityLevelThreshold,
  getAiSimilarityConfidenceScore,
} from './ai-similarity-type.constants';

// Export all types from ai-similarity-type.constants
export type {
  AISimilarityDomain,
  AISimilaritySubType,
  AISimilarityLevel,
  AISimilarityConfidence,
  AISimilarityPrecision,
  AISimilarityUseCase,
} from './ai-similarity-type.constants';

// Export all constants from ai-similarity-status.constants
export {
  AI_SIMILARITY_STATUS_TYPES,
  AI_SIMILARITY_STATUS,
  getAiSimilarityStatusLabel as getAiSimilarityStatusLabelDetailed,
  getAiSimilarityStatusCategory,
  getAiSimilarityStatusSeverity,
  getAiSimilarityStatusColor,
  isAiSimilarityActiveStatus,
  isAiSimilarityCompleted,
  isAiSimilarityFailedStatus,
  getAiSimilarityStatusProgress,
} from './ai-similarity-status.constants';

// Export all types from ai-similarity-status.constants
export type {
  AISimilarityStatusType,
  AISimilarityStatusCategory,
  AISimilarityStatusSeverity,
  AISimilarityStatusColor,
} from './ai-similarity-status.constants';
