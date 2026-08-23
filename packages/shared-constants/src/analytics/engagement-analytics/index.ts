/**
 * Engagement Analytics Constants Index
 * Export all engagement analytics constants and types for easy importing
 */

// Engagement Analytics Main Constants
export {
  ENGAGEMENT_ANALYTICS,
  getEngagementAnalyticsStatusLabel,
  getEngagementAnalyticsEventLabel,
  getEngagementAnalyticsDimensionLabel,
  getEngagementAnalyticsSegmentLabel,
  getEngagementAnalyticsCohortLabel,
  getEngagementAnalyticsGranularityLabel,
  isEngagementAnalyticsActive,
  isEngagementAnalyticsCompleted,
  isEngagementAnalyticsFailed,
  isEngagementAnalyticsUserEvent,
  isEngagementAnalyticsSessionEvent,
  isEngagementAnalyticsContentEvent,
  isEngagementAnalyticsSocialEvent,
} from './engagement-analytics.constants';

export type {
  EngagementAnalyticsType,
  EngagementAnalyticsStatus,
  EngagementAnalyticsScope,
  EngagementAnalyticsEvent,
  EngagementAnalyticsDimension,
  EngagementAnalyticsMetric,
  EngagementAnalyticsSegment,
  EngagementAnalyticsCohort,
  EngagementAnalyticsGranularity,
} from './engagement-analytics.constants';

// Engagement Analytics Type Constants
export {
  ENGAGEMENT_ANALYTICS_TYPE,
  getEngagementAnalyticsAnalysisTypeLabel,
  getEngagementAnalyticsDataTypeLabel,
  getEngagementAnalyticsEngagementLevelLabel,
  getEngagementAnalyticsSessionQualityLabel,
  getEngagementAnalyticsContentTypeLabel,
  getEngagementAnalyticsInteractionTypeLabel,
  getEngagementAnalyticsSocialTypeLabel,
  getEngagementAnalyticsUserStateLabel,
  getEngagementAnalyticsConversionTypeLabel,
  getEngagementAnalyticsFunnelStageLabel,
  isEngagementAnalyticsUserAnalysis,
  isEngagementAnalyticsSessionAnalysis,
  isEngagementAnalyticsContentAnalysis,
  isEngagementAnalyticsComparative,
  isEngagementAnalyticsPredictive,
  getEngagementAnalyticsEngagementLevel,
  getEngagementAnalyticsSessionQuality,
} from './engagement-analytics-type.constants';

export type {
  EngagementAnalyticsAnalysisType,
  EngagementAnalyticsDataType,
  EngagementAnalyticsEngagementLevel,
  EngagementAnalyticsSessionQuality,
  EngagementAnalyticsContentType,
  EngagementAnalyticsInteractionType,
  EngagementAnalyticsSocialType,
  EngagementAnalyticsUserState,
  EngagementAnalyticsConversionType,
  EngagementAnalyticsFunnelStage,
} from './engagement-analytics-type.constants';

// Engagement Analytics Metric Constants
export {
  ENGAGEMENT_ANALYTICS_METRIC,
  getEngagementAnalyticsMetricLabel,
  getEngagementAnalyticsMetricCategoryLabel,
  getEngagementAnalyticsMetricTypeLabel,
  getEngagementAnalyticsMetricFormatLabel,
  getEngagementAnalyticsMetricPriorityLabel,
  getEngagementAnalyticsMetricCategory,
  getEngagementAnalyticsMetricType,
  getEngagementAnalyticsMetricFormat,
  calculateEngagementAnalyticsUserEngagementRate,
  calculateEngagementAnalyticsAvgSessionDuration,
  calculateEngagementAnalyticsViewCompletionRate,
  calculateEngagementAnalyticsInteractionRate,
  calculateEngagementAnalyticsSocialEngagementRate,
  calculateEngagementAnalyticsConversionRate,
  calculateEngagementAnalyticsSessionQualityScore,
  calculateEngagementAnalyticsContentPopularityScore,
} from './engagement-analytics-metric.constants';

export type {
  EngagementAnalyticsUserMetric,
  EngagementAnalyticsSessionMetric,
  EngagementAnalyticsContentMetric,
  EngagementAnalyticsInteractionMetric,
  EngagementAnalyticsSocialMetric,
  EngagementAnalyticsConversionMetric,
  EngagementAnalyticsMilestoneMetric,
  EngagementAnalyticsComparisonMetric,
  EngagementAnalyticsMetricCategory,
  EngagementAnalyticsMetricType,
  EngagementAnalyticsMetricFormat,
  EngagementAnalyticsMetricPriority,
} from './engagement-analytics-metric.constants';
