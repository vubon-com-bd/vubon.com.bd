/**
 * AI Analytics Constants Index
 * Export all AI-specific analytics constants and types
 */

// AI Analytics Constants
export {
  AI_ANALYTICS,
  getAIAnalyticsTypeLabel,
  getAIAnalyticsStatusLabel,
  getAIAnalyticsCategoryLabel,
  getAIAnalyticsMetricLabel,
  getAIAnalyticsAggregationLabel,
  getAIAnalyticsPeriodLabel,
  getAIAnalyticsFormatLabel,
  getAIAnalyticsGranularityLabel,
  isAIAnalyticsActive,
  isAIAnalyticsComplete,
  isAIAnalyticsFailed,
  getAIDefaultAnalyticsLimit,
  getAIMaxAnalyticsLimit,
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
  getAIAnalyticsAnalysisTypeLabel,
  getAIAnalyticsDataTypeLabel,
  getAIAnalyticsMethodLabel,
  getAIAnalyticsDataSourceLabel,
  getAIAnalyticsScopeLabel,
  getAIAnalyticsLevelLabel,
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
  getAIMetricCategoryLabel,
  getAIMetricTypeLabel,
  getAIMetricPriorityLabel,
  getAIMetricFormula,
  getAIMetricColor,
  getAIMetricStatus,
  getAIMetricColorByStatus,
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
  getAIAnalyticsStatusLabel as getAIAnalyticsStatusLabel2,
  getAIAnalyticsStatusCategory,
  getAIAnalyticsStatusSeverity,
  getAIAnalyticsStatusColor,
  isAIAnalyticsActive as isAIAnalyticsActive2,
  isAIAnalyticsDelivered,
  isAIAnalyticsComplete as isAIAnalyticsComplete2,
  isAIAnalyticsFailed as isAIAnalyticsFailed2,
} from './ai-analytics-status.constants';

export type {
  AIAnalyticsStatusType,
  AIAnalyticsStatusCategory,
  AIAnalyticsStatusSeverity,
  AIAnalyticsStatusColor,
} from './ai-analytics-status.constants';
