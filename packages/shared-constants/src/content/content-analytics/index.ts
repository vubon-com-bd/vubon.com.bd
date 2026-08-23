/**
 * Content Analytics Constants Index
 * Export all content analytics constants and types for easy importing
 */

// Content Analytics Constants
export {
  CONTENT_ANALYTICS,
  contentAnalyticsGetTypeLabel,
  contentAnalyticsGetMetricLabel,
  contentAnalyticsGetDimensionLabel,
  contentAnalyticsGetTimeframeLabel,
  contentAnalyticsGetAggregationLabel,
  contentAnalyticsGetComparisonTypeLabel,
  contentAnalyticsGetDataSourceLabel,
  contentAnalyticsGetExportFormatLabel,
  contentAnalyticsGetDefaultTimeframe,
  contentAnalyticsGetDefaultAggregation,
  contentAnalyticsGetDefaultLimit,
  contentAnalyticsGetMaxResults,
  contentAnalyticsGetMaxDimensions,
  contentAnalyticsGetMaxMetrics,
  contentAnalyticsIsValidType,
  contentAnalyticsIsValidMetric,
  contentAnalyticsIsValidDimension,
  contentAnalyticsIsValidTimeframe,
  contentAnalyticsIsValidAggregation,
} from './content-analytics.constants';

export type {
  ContentAnalyticsType,
  ContentAnalyticsMetric,
  ContentAnalyticsDimension,
  ContentAnalyticsTimeframe,
  ContentAnalyticsAggregation,
  ContentAnalyticsComparisonType,
  ContentAnalyticsDataSource,
  ContentAnalyticsExportFormat,
} from './content-analytics.constants';

// Content Analytics Type Constants
export {
  CONTENT_ANALYTICS_TYPE,
  contentAnalyticsTypeGetCategoryLabel,
  contentAnalyticsTypeGetSubTypeLabel,
  contentAnalyticsTypeGetScopeLabel,
  contentAnalyticsTypeGetFrequencyLabel,
  contentAnalyticsTypeGetQualityLabel,
  contentAnalyticsTypeGetSourceLabel,
  contentAnalyticsTypeGetConfidenceLabel,
  contentAnalyticsTypeIsValidCategory,
  contentAnalyticsTypeIsValidScope,
  contentAnalyticsTypeIsValidFrequency,
} from './content-analytics-type.constants';

export type {
  ContentAnalyticsTypeCategory,
  ContentAnalyticsTypeSubType,
  ContentAnalyticsTypeScope,
  ContentAnalyticsTypeFrequency,
  ContentAnalyticsTypeQuality,
  ContentAnalyticsTypeSource,
  ContentAnalyticsTypeConfidence,
} from './content-analytics-type.constants';
