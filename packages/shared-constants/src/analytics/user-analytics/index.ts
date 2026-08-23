/**
 * User Analytics Constants Index
 * Export all user analytics constants and types for easy importing
 */

// User Analytics Main Constants
export {
  USER_ANALYTICS,
  getUserAnalyticsStatusLabel,
  getUserAnalyticsEventLabel,
  getUserAnalyticsDimensionLabel,
  getUserAnalyticsSegmentLabel,
  getUserAnalyticsCohortLabel,
  getUserAnalyticsGranularityLabel,
  isUserAnalyticsActive,
  isUserAnalyticsCompleted,
  isUserAnalyticsFailed,
  isUserAnalyticsLifecycleEvent,
  isUserAnalyticsEngagementEvent,
} from './user-analytics.constants';

export type {
  UserAnalyticsType,
  UserAnalyticsStatus,
  UserAnalyticsScope,
  UserAnalyticsEvent,
  UserAnalyticsDimension,
  UserAnalyticsMetric,
  UserAnalyticsSegment,
  UserAnalyticsCohort,
  UserAnalyticsGranularity,
} from './user-analytics.constants';

// User Analytics Type Constants
export {
  USER_ANALYTICS_TYPE,
  getUserAnalyticsAnalysisTypeLabel,
  getUserAnalyticsDataTypeLabel,
  getUserAnalyticsUserTypeLabel,
  getUserAnalyticsEngagementLevelLabel,
  getUserAnalyticsLifecycleStageLabel,
  getUserAnalyticsSatisfactionLevelLabel,
  getUserAnalyticsTrustLevelLabel,
  getUserAnalyticsPrivacyLevelLabel,
  isUserAnalyticsDescriptive,
  isUserAnalyticsPredictive,
  getUserAnalyticsEngagementLevel,
  getUserAnalyticsSatisfactionLevel,
  getUserAnalyticsLifecycleStage,
} from './user-analytics-type.constants';

export type {
  UserAnalyticsAnalysisType,
  UserAnalyticsDataType,
  UserAnalyticsUserType,
  UserAnalyticsEngagementLevel,
  UserAnalyticsLifecycleStage,
  UserAnalyticsSatisfactionLevel,
  UserAnalyticsTrustLevel,
  UserAnalyticsPrivacyLevel,
} from './user-analytics-type.constants';

// User Analytics Metric Constants
export {
  USER_ANALYTICS_METRIC,
  getUserAnalyticsMetricLabel,
  getUserAnalyticsMetricCategoryLabel,
  getUserAnalyticsMetricTypeLabel,
  getUserAnalyticsMetricFormatLabel,
  getUserAnalyticsMetricCategory,
  getUserAnalyticsMetricType,
  getUserAnalyticsMetricFormat,
  calculateUserAnalyticsRetentionRate,
  calculateUserAnalyticsChurnRate,
  calculateUserAnalyticsEngagementRate,
  calculateUserAnalyticsNPS,
} from './user-analytics-metric.constants';

export type {
  UserAnalyticsCountMetric,
  UserAnalyticsRateMetric,
  UserAnalyticsDurationMetric,
  UserAnalyticsValueMetric,
  UserAnalyticsEngagementMetric,
  UserAnalyticsRetentionMetric,
  UserAnalyticsSatisfactionMetric,
  UserAnalyticsMetricCategory,
  UserAnalyticsMetricType,
  UserAnalyticsMetricFormat,
} from './user-analytics-metric.constants';
