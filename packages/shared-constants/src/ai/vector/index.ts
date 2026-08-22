/**
 * AI Vector Constants Index
 * Export all vector constants and types for easy importing
 */

// AI Vector Constants
export {
  AI_VECTOR,
  getVectorTypeLabel,
  getVectorStatusLabel,
  getVectorDBTypeLabel,
  getVectorIndexTypeLabel,
  getVectorDistanceMetricLabel,
  getVectorStorageFormatLabel,
  getVectorOperationLabel,
  getVectorMetricLabel,
  getVectorNormalizationLabel,
  isVectorActive,
  isVectorGenerating,
  isVectorFailed,
  getDefaultDimension,
  getDefaultTopK,
  getDefaultBatchSize,
  getDefaultDistanceMetric,
  getDefaultIndexType,
  getIndexTypeCompatibility,
  getDistanceMetricForType,
} from './ai-vector.constants';

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

// AI Vector Type Constants
export {
  AI_VECTOR_TYPE,
  getVectorCategoryLabel,
  getVectorSubTypeLabel,
  getVectorDimensionTypeLabel,
  getVectorPrecisionLabel,
  getVectorDensityLabel,
  getVectorGenerationMethodLabel,
  getDimensionRange,
  getPrecisionScore,
} from './ai-vector-type.constants';

export type {
  AIVectorCategory,
  AIVectorSubType,
  AIVectorDimensionType,
  AIVectorPrecision,
  AIVectorDensity,
  AIVectorGenerationMethod,
} from './ai-vector-type.constants';

// AI Vector Status Constants
export {
  AI_VECTOR_STATUS,
  AI_VECTOR_STATUS_TYPES,
  getVectorStatusLabel as getVectorStatusLabel2,
  getVectorStatusCategory,
  getVectorStatusSeverity,
  getVectorStatusColor,
  isVectorActive as isVectorActive2,
  isVectorGenerated,
  isVectorCompleted,
  isVectorFailed as isVectorFailed2,
  getVectorStatusProgress,
} from './ai-vector-status.constants';

export type {
  AIVectorStatusType,
  AIVectorStatusCategory,
  AIVectorStatusSeverity,
  AIVectorStatusColor,
} from './ai-vector-status.constants';
