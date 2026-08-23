/**
 * Customer Analytics Constants Index
 * Export all customer analytics constants and types for easy importing
 */

// Customer Analytics Main Constants
export {
  CUSTOMER_ANALYTICS,
  getCustomerAnalyticsStatusLabel,
  getCustomerAnalyticsEventLabel,
  getCustomerAnalyticsDimensionLabel,
  getCustomerAnalyticsSegmentLabel,
  getCustomerAnalyticsCohortLabel,
  getCustomerAnalyticsGranularityLabel,
  isCustomerAnalyticsActive,
  isCustomerAnalyticsCompleted,
  isCustomerAnalyticsFailed,
  isCustomerAnalyticsLifecycleEvent,
  isCustomerAnalyticsBehaviorEvent,
  isCustomerAnalyticsPurchaseEvent,
} from './customer-analytics.constants';

export type {
  CustomerAnalyticsType,
  CustomerAnalyticsStatus,
  CustomerAnalyticsScope,
  CustomerAnalyticsEvent,
  CustomerAnalyticsDimension,
  CustomerAnalyticsMetric,
  CustomerAnalyticsSegment,
  CustomerAnalyticsCohort,
  CustomerAnalyticsGranularity,
} from './customer-analytics.constants';

// Customer Analytics Type Constants
export {
  CUSTOMER_ANALYTICS_TYPE,
  getCustomerAnalyticsAnalysisTypeLabel,
  getCustomerAnalyticsDataTypeLabel,
  getCustomerAnalyticsCustomerStatusLabel,
  getCustomerAnalyticsCustomerTypeLabel,
  getCustomerAnalyticsCustomerTierLabel,
  getCustomerAnalyticsCustomerPersonaLabel,
  getCustomerAnalyticsEngagementLevelLabel,
  getCustomerAnalyticsLoyaltyLevelLabel,
  getCustomerAnalyticsSatisfactionLevelLabel,
  getCustomerAnalyticsNPSCategoryLabel,
  getCustomerAnalyticsLifecycleStageLabel,
  isCustomerAnalyticsBehavioralAnalysis,
  isCustomerAnalyticsValueAnalysis,
  isCustomerAnalyticsRetentionAnalysis,
  isCustomerAnalyticsComparative,
  isCustomerAnalyticsPredictive,
  getCustomerAnalyticsEngagementLevel,
  getCustomerAnalyticsLoyaltyLevel,
  getCustomerAnalyticsSatisfactionLevel,
  getCustomerAnalyticsNPSCategory,
} from './customer-analytics-type.constants';

export type {
  CustomerAnalyticsAnalysisType,
  CustomerAnalyticsDataType,
  CustomerAnalyticsCustomerStatus,
  CustomerAnalyticsCustomerType,
  CustomerAnalyticsCustomerTier,
  CustomerAnalyticsCustomerPersona,
  CustomerAnalyticsEngagementLevel,
  CustomerAnalyticsLoyaltyLevel,
  CustomerAnalyticsSatisfactionLevel,
  CustomerAnalyticsNPSCategory,
  CustomerAnalyticsLifecycleStage,
} from './customer-analytics-type.constants';

// Customer Analytics Metric Constants
export {
  CUSTOMER_ANALYTICS_METRIC,
  getCustomerAnalyticsMetricLabel,
  getCustomerAnalyticsMetricCategoryLabel,
  getCustomerAnalyticsMetricTypeLabel,
  getCustomerAnalyticsMetricFormatLabel,
  getCustomerAnalyticsMetricPriorityLabel,
  getCustomerAnalyticsMetricCategory,
  getCustomerAnalyticsMetricType,
  getCustomerAnalyticsMetricFormat,
  calculateCustomerAnalyticsRetentionRate,
  calculateCustomerAnalyticsChurnRate,
  calculateCustomerAnalyticsLifetimeValue,
  calculateCustomerAnalyticsAverageOrderValue,
  calculateCustomerAnalyticsPurchaseFrequency,
  calculateCustomerAnalyticsRepeatPurchaseRate,
  calculateCustomerAnalyticsNPS,
  calculateCustomerAnalyticsCAC,
} from './customer-analytics-metric.constants';

export type {
  CustomerAnalyticsCountMetric,
  CustomerAnalyticsAcquisitionMetric,
  CustomerAnalyticsRetentionMetric,
  CustomerAnalyticsValueMetric,
  CustomerAnalyticsEngagementMetric,
  CustomerAnalyticsGrowthMetric,
  CustomerAnalyticsComparisonMetric,
  CustomerAnalyticsMetricCategory,
  CustomerAnalyticsMetricType,
  CustomerAnalyticsMetricFormat,
  CustomerAnalyticsMetricPriority,
} from './customer-analytics-metric.constants';
