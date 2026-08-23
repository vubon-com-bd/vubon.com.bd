/**
 * Channel Analytics Constants Index
 * Export all channel analytics constants and types for easy importing
 */

// Channel Analytics Main Constants
export {
  CHANNEL_ANALYTICS,
  getChannelAnalyticsStatusLabel,
  getChannelAnalyticsEventLabel,
  getChannelAnalyticsDimensionLabel,
  getChannelAnalyticsSegmentLabel,
  getChannelAnalyticsCohortLabel,
  getChannelAnalyticsGranularityLabel,
  isChannelAnalyticsActive,
  isChannelAnalyticsCompleted,
  isChannelAnalyticsFailed,
  isChannelAnalyticsLifecycleEvent,
  isChannelAnalyticsPerformanceEvent,
  isChannelAnalyticsHealthEvent,
} from './channel-analytics.constants';

export type {
  ChannelAnalyticsType,
  ChannelAnalyticsStatus,
  ChannelAnalyticsScope,
  ChannelAnalyticsEvent,
  ChannelAnalyticsDimension,
  ChannelAnalyticsMetric,
  ChannelAnalyticsSegment,
  ChannelAnalyticsCohort,
  ChannelAnalyticsGranularity,
} from './channel-analytics.constants';

// Channel Analytics Type Constants
export {
  CHANNEL_ANALYTICS_TYPE,
  getChannelAnalyticsAnalysisTypeLabel,
  getChannelAnalyticsDataTypeLabel,
  getChannelAnalyticsChannelTypeLabel,
  getChannelAnalyticsChannelCategoryLabel,
  getChannelAnalyticsChannelStatusLabel,
  getChannelAnalyticsPerformanceLevelLabel,
  getChannelAnalyticsHealthLevelLabel,
  getChannelAnalyticsROICategoryLabel,
  getChannelAnalyticsAttributionModelLabel,
  isChannelAnalyticsPerformanceAnalysis,
  isChannelAnalyticsRevenueAnalysis,
  isChannelAnalyticsComparative,
  isChannelAnalyticsPredictive,
  getChannelAnalyticsPerformanceLevel,
  getChannelAnalyticsHealthLevel,
  getChannelAnalyticsROICategory,
} from './channel-analytics-type.constants';

export type {
  ChannelAnalyticsAnalysisType,
  ChannelAnalyticsDataType,
  ChannelAnalyticsChannelType,
  ChannelAnalyticsChannelCategory,
  ChannelAnalyticsChannelStatus,
  ChannelAnalyticsPerformanceLevel,
  ChannelAnalyticsHealthLevel,
  ChannelAnalyticsROICategory,
  ChannelAnalyticsAttributionModel,
} from './channel-analytics-type.constants';

// Channel Analytics Metric Constants
export {
  CHANNEL_ANALYTICS_METRIC,
  getChannelAnalyticsMetricLabel,
  getChannelAnalyticsMetricCategoryLabel,
  getChannelAnalyticsMetricTypeLabel,
  getChannelAnalyticsMetricFormatLabel,
  getChannelAnalyticsMetricPriorityLabel,
  getChannelAnalyticsMetricCategory,
  getChannelAnalyticsMetricType,
  getChannelAnalyticsMetricFormat,
  calculateChannelAnalyticsEngagementRate,
  calculateChannelAnalyticsCTR,
  calculateChannelAnalyticsConversionRate,
  calculateChannelAnalyticsROI,
  calculateChannelAnalyticsROAS,
  calculateChannelAnalyticsProfitMargin,
  calculateChannelAnalyticsCAC,
  calculateChannelAnalyticsRetentionRate,
  calculateChannelAnalyticsCSAT,
} from './channel-analytics-metric.constants';

export type {
  ChannelAnalyticsCountMetric,
  ChannelAnalyticsReachMetric,
  ChannelAnalyticsEngagementMetric,
  ChannelAnalyticsConversionMetric,
  ChannelAnalyticsRevenueMetric,
  ChannelAnalyticsCostMetric,
  ChannelAnalyticsProfitMetric,
  ChannelAnalyticsROIMetric,
  ChannelAnalyticsCustomerMetric,
  ChannelAnalyticsSatisfactionMetric,
  ChannelAnalyticsComparisonMetric,
  ChannelAnalyticsMetricCategory,
  ChannelAnalyticsMetricType,
  ChannelAnalyticsMetricFormat,
  ChannelAnalyticsMetricPriority,
} from './channel-analytics-metric.constants';
