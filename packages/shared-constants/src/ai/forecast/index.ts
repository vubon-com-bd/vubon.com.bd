/**
 * AI Forecast Constants Index
 * Export all forecast constants and types for easy importing
 */

// AI Forecast Constants
export {
  AI_FORECAST,
  getForecastTypeLabel,
  getForecastStatusLabel,
  getForecastMethodLabel,
  getForecastHorizonLabel,
  getForecastFrequencyLabel,
  getForecastConfidenceLabel,
  getForecastQualityLabel,
  getForecastMetricLabel,
  getForecastOutputLabel,
  getForecastValidationLabel,
  isForecastActive,
  isForecastProcessing,
  isForecastFailed,
  getDefaultHorizon,
  getMaxHorizon,
  getDefaultSamples,
  getHorizonDays,
  getConfidenceScore,
  getQualityScore,
} from './ai-forecast.constants';

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

// AI Forecast Type Constants
export {
  AI_FORECAST_TYPE,
  getForecastDomainLabel,
  getForecastSubTypeLabel,
  getForecastComplexityLabel,
  getForecastAccuracyLabel,
  getForecastGranularityLabel,
  getForecastScopeLabel,
  getComplexityScore,
  getAccuracyScore,
} from './ai-forecast-type.constants';

export type {
  AIForecastDomain,
  AIForecastSubType,
  AIForecastComplexity,
  AIForecastAccuracy,
  AIForecastGranularity,
  AIForecastScope,
} from './ai-forecast-type.constants';

// AI Forecast Status Constants
export {
  AI_FORECAST_STATUS,
  AI_FORECAST_STATUS_TYPES,
  getForecastStatusLabel as getForecastStatusLabel2,
  getForecastStatusCategory,
  getForecastStatusSeverity,
  getForecastStatusColor,
  isForecastActive as isForecastActive2,
  isForecastCompleted,
  isForecastFailed as isForecastFailed2,
  getForecastStatusProgress,
} from './ai-forecast-status.constants';

export type {
  AIForecastStatusType,
  AIForecastStatusCategory,
  AIForecastStatusSeverity,
  AIForecastStatusColor,
} from './ai-forecast-status.constants';
