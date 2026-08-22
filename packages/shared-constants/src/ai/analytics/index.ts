/**
 * AI Analytics Constants Index
 * Export all analytics constants and types for easy importing
 */

// AI Analytics Constants
export {
  AI_ANALYTICS,
  getAnalyticsTypeLabel,
  getAnalyticsStatusLabel,
  getAnalyticsCategoryLabel,
  getAnalyticsMetricLabel,
  getAnalyticsAggregationLabel,
  getAnalyticsPeriodLabel,
  getAnalyticsFormatLabel,
  getAnalyticsGranularityLabel,
  isAnalyticsActive,
  isAnalyticsComplete,
  isAnalyticsFailed,
  getDefaultAnalyticsLimit,
  getMaxAnalyticsLimit,
} from './ai-analytics.constants';

export type {
  AIAnalyticsType,
  AIAnalyticsStatus,
  AIAnalyticsCategory,
  AIAnalyticsDimension,
  AIAnalyticsMetric,
  AIAnalyticsAggregation,
  AIAnalyticsPeriod,
  AIAnalyticsFilter,
  AIAnalyticsLimit,
  AIAnalyticsFormat,
  AIAnalyticsGranularity,
} from './ai-analytics.constants';

// AI Analytics Type Constants
export {
  AI_ANALYTICS_TYPE,
  getAnalyticsAnalysisTypeLabel,
  getAnalyticsDataTypeLabel,
  getAnalyticsMethodLabel,
  getAnalyticsDataSourceLabel,
  getAnalyticsScopeLabel,
  getAnalyticsLevelLabel,
} from './ai-analytics-type.constants';

export type {
  AIAnalyticsAnalysisType,
  AIAnalyticsDataType,
  AIAnalyticsMethod,
  AIAnalyticsDataSource,
  AIAnalyticsScope,
  AIAnalyticsLevel,
} from './ai-analytics-type.constants';

// AI Analytics Metric Constants
export {
  AI_ANALYTICS_METRIC,
  getMetricCategoryLabel,
  getMetricTypeLabel,
  getMetricPriorityLabel,
  getMetricFormula,
  getMetricColor,
  getMetricStatus,
  getMetricColorByStatus,
} from './ai-analytics-metric.constants';

export type {
  AIAnalyticsMetricCategory,
  AIAnalyticsMetricType,
  AIAnalyticsMetricPriority,
  AIAnalyticsMetricFormula,
  AIAnalyticsMetricThreshold,
  AIAnalyticsMetricColor,
} from './ai-analytics-metric.constants';

// AI Analytics Status Constants
export {
  AI_ANALYTICS_STATUS,
  AI_ANALYTICS_STATUS_TYPES,
  getAnalyticsStatusLabel as getAnalyticsStatusLabel2,
  getAnalyticsStatusCategory,
  getAnalyticsStatusSeverity,
  getAnalyticsStatusColor,
  isAnalyticsActive as isAnalyticsActive2,
  isAnalyticsDelivered,
  isAnalyticsComplete as isAnalyticsComplete2,
  isAnalyticsFailed as isAnalyticsFailed2,
} from './ai-analytics-status.constants';

export type {
  AIAnalyticsStatusType,
  AIAnalyticsStatusCategory,
  AIAnalyticsStatusSeverity,
  AIAnalyticsStatusColor,
} from './ai-analytics-status.constants';
