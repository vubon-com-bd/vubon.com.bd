/**
 * AI Vector Index
 * Export all AI vector constants and types for easy importing
 */

// Export all constants from ai-vector.constants
export {
  AI_VECTOR,
  getAiVectorTypeLabel,
  getAiVectorStatusLabel,
  getAiVectorDBTypeLabel,
  getAiVectorIndexTypeLabel,
  getAiVectorDistanceMetricLabel,
  getAiVectorStorageFormatLabel,
  getAiVectorOperationLabel,
  getAiVectorMetricLabel,
  getAiVectorNormalizationLabel,
  isAiVectorActive,
  isAiVectorGenerating,
  isAiVectorFailed,
  getAiVectorDefaultDimension,
  getAiVectorDefaultTopK,
  getAiVectorDefaultBatchSize,
  getAiVectorDefaultDistanceMetric,
  getAiVectorDefaultIndexType,
  getAiVectorIndexTypeCompatibility,
  getAiVectorDistanceMetricForType,
} from './ai-vector.constants';

// Export all types from ai-vector.constants
export type {
  AIVectorType,
  AIVectorStatus,
  AIVectorDBType,
  AIVectorIndexType,
  AIVectorDistanceMetric,
  AIVectorStorageFormat,
  AIVectorOperation,
  AIVectorLimit,
  AIVectorMetric,
  AIVectorNormalization,
  AIVectorDefault,
} from './ai-vector.constants';

// Export all constants from ai-vector-type.constants
export {
  AI_VECTOR_TYPE,
  getAiVectorCategoryLabel,
  getAiVectorSubTypeLabel,
  getAiVectorDimensionTypeLabel,
  getAiVectorPrecisionLabel,
  getAiVectorDensityLabel,
  getAiVectorGenerationMethodLabel,
  getAiVectorDimensionRange,
  getAiVectorPrecisionScore,
} from './ai-vector-type.constants';

// Export all types from ai-vector-type.constants
export type {
  AIVectorCategory,
  AIVectorSubType,
  AIVectorDimensionType,
  AIVectorPrecision,
  AIVectorDensity,
  AIVectorGenerationMethod,
} from './ai-vector-type.constants';

// Export all constants from ai-vector-status.constants
export {
  AI_VECTOR_STATUS_TYPES,
  AI_VECTOR_STATUS,
  getAiVectorStatusLabel as getAiVectorStatusLabelDetailed,
  getAiVectorStatusCategory,
  getAiVectorStatusSeverity,
  getAiVectorStatusColor,
  isAiVectorActiveStatus,
  isAiVectorGenerated,
  isAiVectorCompleted,
  isAiVectorFailedStatus,
  getAiVectorStatusProgress,
} from './ai-vector-status.constants';

// Export all types from ai-vector-status.constants
export type {
  AIVectorStatusType,
  AIVectorStatusCategory,
  AIVectorStatusSeverity,
  AIVectorStatusColor,
} from './ai-vector-status.constants';
