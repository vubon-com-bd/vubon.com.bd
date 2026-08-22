/**
 * AI Embedding Constants Index
 * Export all embedding constants and types for easy importing
 */

// AI Embedding Constants
export {
  AI_EMBEDDING,
  AI_EMBEDDING_MODELS,
  AI_EMBEDDING_DIMENSIONS,
  getEmbeddingTypeLabel,
  getEmbeddingStatusLabel,
  getEmbeddingModelLabel,
  getEmbeddingProviderLabel,
  getEmbeddingFormatLabel,
  getEmbeddingMetricLabel,
  getEmbeddingNormalizationLabel,
  getEmbeddingDimension,
  getEmbeddingProvider,
  isEmbeddingActive,
  isEmbeddingGenerating,
  isEmbeddingFailed,
  getDefaultEmbeddingModel,
  getDefaultBatchSize,
  getMaxBatchSize,
  calculateCosineSimilarity,
  calculateEuclideanDistance,
  calculateDotProduct,
} from './ai-embedding.constants';

export type {
  AIEmbeddingType,
  AIEmbeddingStatus,
  AIEmbeddingModel,
  AIEmbeddingDimension,
  AIEmbeddingProvider,
  AIEmbeddingFormat,
  AIEmbeddingLimit,
  AIEmbeddingMetric,
  AIEmbeddingNormalization,
} from './ai-embedding.constants';

// AI Embedding Types Constants
export {
  AI_EMBEDDING_TYPE,
  getEmbeddingCategoryLabel,
  getEmbeddingSubTypeLabel,
  getEmbeddingDimensionTypeLabel,
  getEmbeddingTrainingMethodLabel,
  getEmbeddingQualityLabel,
  getEmbeddingUsageLabel,
  getDimensionRange,
  getQualityScore,
} from './ai-embedding-types.constants';

export type {
  AIEmbeddingCategory,
  AIEmbeddingSubType,
  AIEmbeddingDimensionType,
  AIEmbeddingTrainingMethod,
  AIEmbeddingQuality,
  AIEmbeddingUsage,
} from './ai-embedding-types.constants';

// AI Embedding Status Constants
export {
  AI_EMBEDDING_STATUS,
  AI_EMBEDDING_STATUS_TYPES,
  getEmbeddingStatusLabel as getEmbeddingStatusLabel2,
  getEmbeddingStatusCategory,
  getEmbeddingStatusSeverity,
  getEmbeddingStatusColor,
  isEmbeddingActive as isEmbeddingActive2,
  isEmbeddingGenerated,
  isEmbeddingCompleted,
  isEmbeddingFailed as isEmbeddingFailed2,
  getEmbeddingStatusProgress,
} from './ai-embedding-status.constants';

export type {
  AIEmbeddingStatusType,
  AIEmbeddingStatusCategory,
  AIEmbeddingStatusSeverity,
  AIEmbeddingStatusColor,
} from './ai-embedding-status.constants';
