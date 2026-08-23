/**
 * Support Analytics Constants Index
 * Export all support analytics constants and types for easy importing
 */

// Support Analytics Main Constants
export {
  SUPPORT_ANALYTICS,
  getSupportAnalyticsStatusLabel,
  getSupportAnalyticsEventLabel,
  getSupportAnalyticsDimensionLabel,
  getSupportAnalyticsSegmentLabel,
  getSupportAnalyticsCohortLabel,
  getSupportAnalyticsGranularityLabel,
  isSupportAnalyticsActive,
  isSupportAnalyticsCompleted,
  isSupportAnalyticsFailed,
  isSupportAnalyticsTicketEvent,
  isSupportAnalyticsAgentEvent,
  isSupportAnalyticsSatisfactionEvent,
} from './support-analytics.constants';

export type {
  SupportAnalyticsType,
  SupportAnalyticsStatus,
  SupportAnalyticsScope,
  SupportAnalyticsEvent,
  SupportAnalyticsDimension,
  SupportAnalyticsMetric,
  SupportAnalyticsSegment,
  SupportAnalyticsCohort,
  SupportAnalyticsGranularity,
} from './support-analytics.constants';

// Support Analytics Type Constants
export {
  SUPPORT_ANALYTICS_TYPE,
  getSupportAnalyticsAnalysisTypeLabel,
  getSupportAnalyticsDataTypeLabel,
  getSupportAnalyticsTicketStatusLabel,
  getSupportAnalyticsTicketPriorityLabel,
  getSupportAnalyticsTicketTypeLabel,
  getSupportAnalyticsTicketCategoryLabel,
  getSupportAnalyticsSupportChannelLabel,
  getSupportAnalyticsAgentRoleLabel,
  getSupportAnalyticsResolutionTypeLabel,
  getSupportAnalyticsSatisfactionLevelLabel,
  getSupportAnalyticsQualityLevelLabel,
  isSupportAnalyticsTicketAnalysis,
  isSupportAnalyticsAgentAnalysis,
  isSupportAnalyticsComparative,
  isSupportAnalyticsPredictive,
  getSupportAnalyticsQualityLevel,
  getSupportAnalyticsSatisfactionLevel,
} from './support-analytics-type.constants';

export type {
  SupportAnalyticsAnalysisType,
  SupportAnalyticsDataType,
  SupportAnalyticsTicketStatus,
  SupportAnalyticsTicketPriority,
  SupportAnalyticsTicketType,
  SupportAnalyticsTicketCategory,
  SupportAnalyticsSupportChannel,
  SupportAnalyticsAgentRole,
  SupportAnalyticsResolutionType,
  SupportAnalyticsSatisfactionLevel,
  SupportAnalyticsQualityLevel,
} from './support-analytics-type.constants';

// Support Analytics Metric Constants
export {
  SUPPORT_ANALYTICS_METRIC,
  getSupportAnalyticsMetricLabel,
  getSupportAnalyticsMetricCategoryLabel,
  getSupportAnalyticsMetricTypeLabel,
  getSupportAnalyticsMetricFormatLabel,
  getSupportAnalyticsMetricPriorityLabel,
  getSupportAnalyticsMetricCategory,
  getSupportAnalyticsMetricType,
  getSupportAnalyticsMetricFormat,
  calculateSupportAnalyticsAvgResponseTime,
  calculateSupportAnalyticsResolutionRate,
  calculateSupportAnalyticsFirstContactResolution,
  calculateSupportAnalyticsCSAT,
  calculateSupportAnalyticsNPS,
  calculateSupportAnalyticsCES,
  calculateSupportAnalyticsAgentProductivity,
  calculateSupportAnalyticsAgentEfficiency,
} from './support-analytics-metric.constants';

export type {
  SupportAnalyticsCountMetric,
  SupportAnalyticsVolumeMetric,
  SupportAnalyticsResponseTimeMetric,
  SupportAnalyticsResolutionTimeMetric,
  SupportAnalyticsAgentMetric,
  SupportAnalyticsQualityMetric,
  SupportAnalyticsSatisfactionMetric,
  SupportAnalyticsComparisonMetric,
  SupportAnalyticsMetricCategory,
  SupportAnalyticsMetricType,
  SupportAnalyticsMetricFormat,
  SupportAnalyticsMetricPriority,
} from './support-analytics-metric.constants';
