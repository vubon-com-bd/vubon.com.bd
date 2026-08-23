/**
 * Traffic Analytics Constants Index
 * Export all traffic analytics constants and types for easy importing
 */

// Traffic Analytics Main Constants
export {
  TRAFFIC_ANALYTICS,
  getTrafficAnalyticsStatusLabel,
  getTrafficAnalyticsEventLabel,
  getTrafficAnalyticsDimensionLabel,
  getTrafficAnalyticsSegmentLabel,
  getTrafficAnalyticsCohortLabel,
  getTrafficAnalyticsGranularityLabel,
  isTrafficAnalyticsActive,
  isTrafficAnalyticsCompleted,
  isTrafficAnalyticsFailed,
  isTrafficAnalyticsPageEvent,
  isTrafficAnalyticsVisitorEvent,
  isTrafficAnalyticsSessionEvent,
  isTrafficAnalyticsSourceEvent,
} from './traffic-analytics.constants';

export type {
  TrafficAnalyticsType,
  TrafficAnalyticsStatus,
  TrafficAnalyticsScope,
  TrafficAnalyticsEvent,
  TrafficAnalyticsDimension,
  TrafficAnalyticsMetric,
  TrafficAnalyticsSegment,
  TrafficAnalyticsCohort,
  TrafficAnalyticsGranularity,
} from './traffic-analytics.constants';

// Traffic Analytics Type Constants
export {
  TRAFFIC_ANALYTICS_TYPE,
  getTrafficAnalyticsAnalysisTypeLabel,
  getTrafficAnalyticsDataTypeLabel,
  getTrafficAnalyticsSourceTypeLabel,
  getTrafficAnalyticsDeviceTypeLabel,
  getTrafficAnalyticsBrowserTypeLabel,
  getTrafficAnalyticsOSTypeLabel,
  getTrafficAnalyticsVisitorTypeLabel,
  getTrafficAnalyticsSessionQualityLabel,
  getTrafficAnalyticsEngagementLevelLabel,
  getTrafficAnalyticsBounceTypeLabel,
  getTrafficAnalyticsConversionTypeLabel,
  getTrafficAnalyticsFunnelTypeLabel,
  isTrafficAnalyticsSourceAnalysis,
  isTrafficAnalyticsVisitorAnalysis,
  isTrafficAnalyticsDeviceAnalysis,
  isTrafficAnalyticsPredictive,
  getTrafficAnalyticsEngagementLevel,
  getTrafficAnalyticsSessionQuality,
} from './traffic-analytics-type.constants';

export type {
  TrafficAnalyticsAnalysisType,
  TrafficAnalyticsDataType,
  TrafficAnalyticsSourceType,
  TrafficAnalyticsDeviceType,
  TrafficAnalyticsBrowserType,
  TrafficAnalyticsOSType,
  TrafficAnalyticsVisitorType,
  TrafficAnalyticsSessionQuality,
  TrafficAnalyticsEngagementLevel,
  TrafficAnalyticsBounceType,
  TrafficAnalyticsConversionType,
  TrafficAnalyticsFunnelType,
} from './traffic-analytics-type.constants';

// Traffic Analytics Metric Constants
export {
  TRAFFIC_ANALYTICS_METRIC,
  getTrafficAnalyticsMetricLabel,
  getTrafficAnalyticsMetricCategoryLabel,
  getTrafficAnalyticsMetricTypeLabel,
  getTrafficAnalyticsMetricFormatLabel,
  getTrafficAnalyticsMetricPriorityLabel,
  getTrafficAnalyticsMetricCategory,
  getTrafficAnalyticsMetricType,
  getTrafficAnalyticsMetricFormat,
  calculateTrafficAnalyticsBounceRate,
  calculateTrafficAnalyticsExitRate,
  calculateTrafficAnalyticsConversionRate,
  calculateTrafficAnalyticsVisitorGrowth,
  calculateTrafficAnalyticsEngagementRate,
  calculateTrafficAnalyticsAvgSessionDuration,
  calculateTrafficAnalyticsPageViewsPerSession,
  calculateTrafficAnalyticsTrafficDiversity,
} from './traffic-analytics-metric.constants';

export type {
  TrafficAnalyticsVisitorMetric,
  TrafficAnalyticsSessionMetric,
  TrafficAnalyticsPageViewMetric,
  TrafficAnalyticsBounceMetric,
  TrafficAnalyticsSourceMetric,
  TrafficAnalyticsDeviceMetric,
  TrafficAnalyticsBrowserMetric,
  TrafficAnalyticsLocationMetric,
  TrafficAnalyticsTimeMetric,
  TrafficAnalyticsPerformanceMetric,
  TrafficAnalyticsConversionMetric,
  TrafficAnalyticsComparisonMetric,
  TrafficAnalyticsMetricCategory,
  TrafficAnalyticsMetricType,
  TrafficAnalyticsMetricFormat,
  TrafficAnalyticsMetricPriority,
} from './traffic-analytics-metric.constants';
