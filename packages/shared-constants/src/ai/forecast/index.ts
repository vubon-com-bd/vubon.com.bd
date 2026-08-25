/**
 * AI Forecast Index
 * Export all AI forecast constants and types for easy importing
 */

// Export all constants from ai-forecast.constants
export {
  AI_FORECAST,
  getAiForecastTypeLabel,
  getAiForecastStatusLabel,
  getAiForecastMethodLabel,
  getAiForecastHorizonLabel,
  getAiForecastFrequencyLabel,
  getAiForecastConfidenceLabel,
  getAiForecastQualityLabel,
  getAiForecastMetricLabel,
  getAiForecastOutputLabel,
  getAiForecastValidationLabel,
  isAiForecastActive,
  isAiForecastProcessing,
  isAiForecastFailed,
  getAiForecastDefaultHorizon,
  getAiForecastMaxHorizon,
  getAiForecastDefaultSamples,
  getAiForecastHorizonDays,
  getAiForecastConfidenceScore,
  getAiForecastQualityScore,
} from './ai-forecast.constants';

// Export all types from ai-forecast.constants
export type {
  AIForecastType,
  AIForecastStatus,
  AIForecastMethod,
  AIForecastHorizon,
  AIForecastFrequency,
  AIForecastConfidence,
  AIForecastQuality,
  AIForecastMetric,
  AIForecastLimit,
  AIForecastFeature,
  AIForecastOutput,
  AIForecastValidation,
} from './ai-forecast.constants';

// Export all constants from ai-forecast-type.constants
export {
  AI_FORECAST_TYPE,
  getAiForecastDomainLabel,
  getAiForecastSubTypeLabel,
  getAiForecastComplexityLabel,
  getAiForecastAccuracyLabel,
  getAiForecastGranularityLabel,
  getAiForecastScopeLabel,
  getAiForecastComplexityScore,
  getAiForecastAccuracyScore,
} from './ai-forecast-type.constants';

// Export all types from ai-forecast-type.constants
export type {
  AIForecastDomain,
  AIForecastSubType,
  AIForecastComplexity,
  AIForecastAccuracy,
  AIForecastGranularity,
  AIForecastScope,
} from './ai-forecast-type.constants';

// Export all constants from ai-forecast-status.constants
export {
  AI_FORECAST_STATUS_TYPES,
  AI_FORECAST_STATUS,
  getAiForecastStatusLabel as getAiForecastStatusLabelDetailed,
  getAiForecastStatusCategory,
  getAiForecastStatusSeverity,
  getAiForecastStatusColor,
  isAiForecastActiveStatus,
  isAiForecastCompleted,
  isAiForecastFailedStatus,
  getAiForecastStatusProgress,
} from './ai-forecast-status.constants';

// Export all types from ai-forecast-status.constants
export type {
  AIForecastStatusType,
  AIForecastStatusCategory,
  AIForecastStatusSeverity,
  AIForecastStatusColor,
} from './ai-forecast-status.constants';
