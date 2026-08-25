/**
 * AI Embedding Index
 * Export all AI embedding constants and types for easy importing
 */

// Export all constants from ai-embedding.constants
export {
  AI_EMBEDDING_MODELS,
  AI_EMBEDDING_DIMENSIONS,
  AI_EMBEDDING,
  getAiEmbeddingTypeLabel,
  getAiEmbeddingStatusLabel,
  getAiEmbeddingModelLabel,
  getAiEmbeddingProviderLabel,
  getAiEmbeddingFormatLabel,
  getAiEmbeddingMetricLabel,
  getAiEmbeddingNormalizationLabel,
  getAiEmbeddingDimension,
  getAiEmbeddingProvider,
  isAiEmbeddingActive,
  isAiEmbeddingGenerating,
  isAiEmbeddingFailed,
  getAiEmbeddingDefaultModel,
  getAiEmbeddingDefaultBatchSize,
  getAiEmbeddingMaxBatchSize,
  calculateAiEmbeddingCosineSimilarity,
  calculateAiEmbeddingEuclideanDistance,
  calculateAiEmbeddingDotProduct,
} from './ai-embedding.constants';

// Export all types from ai-embedding.constants
export type {
  AIEmbeddingModel,
  AIEmbeddingDimension,
  AIEmbeddingType,
  AIEmbeddingStatus,
  AIEmbeddingProvider,
  AIEmbeddingFormat,
  AIEmbeddingLimit,
  AIEmbeddingMetric,
  AIEmbeddingNormalization,
} from './ai-embedding.constants';

// Export all constants from ai-embedding-types.constants
export {
  AI_EMBEDDING_TYPE,
  getAiEmbeddingCategoryLabel,
  getAiEmbeddingSubTypeLabel,
  getAiEmbeddingDimensionTypeLabel,
  getAiEmbeddingTrainingMethodLabel,
  getAiEmbeddingQualityLabel,
  getAiEmbeddingUsageLabel,
  getAiEmbeddingDimensionRange,
  getAiEmbeddingQualityScore,
} from './ai-embedding-types.constants';

// Export all types from ai-embedding-types.constants
export type {
  AIEmbeddingCategory,
  AIEmbeddingSubType,
  AIEmbeddingDimensionType,
  AIEmbeddingTrainingMethod,
  AIEmbeddingQuality,
  AIEmbeddingUsage,
} from './ai-embedding-types.constants';

// Export all constants from ai-embedding-status.constants
export {
  AI_EMBEDDING_STATUS_TYPES,
  AI_EMBEDDING_STATUS,
  getAiEmbeddingStatusLabel as getAiEmbeddingStatusLabelDetailed,
  getAiEmbeddingStatusCategory,
  getAiEmbeddingStatusSeverity,
  getAiEmbeddingStatusColor,
  isAiEmbeddingActive as isAiEmbeddingActiveStatus,
  isAiEmbeddingGenerated,
  isAiEmbeddingCompleted,
  isAiEmbeddingFailed as isAiEmbeddingFailedStatus,
  getAiEmbeddingStatusProgress,
} from './ai-embedding-status.constants';

// Export all types from ai-embedding-status.constants
export type {
  AIEmbeddingStatusType,
  AIEmbeddingStatusCategory,
  AIEmbeddingStatusSeverity,
  AIEmbeddingStatusColor,
} from './ai-embedding-status.constants';
