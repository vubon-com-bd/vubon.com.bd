/**
 * Vendor Analytics Constants Index
 * Export all vendor analytics constants and types for easy importing
 */

// Vendor Analytics Main Constants
export {
  VENDOR_ANALYTICS,
  getVendorAnalyticsStatusLabel,
  getVendorAnalyticsEventLabel,
  getVendorAnalyticsDimensionLabel,
  getVendorAnalyticsSegmentLabel,
  getVendorAnalyticsCohortLabel,
  getVendorAnalyticsGranularityLabel,
  isVendorAnalyticsActive,
  isVendorAnalyticsCompleted,
  isVendorAnalyticsFailed,
  isVendorAnalyticsLifecycleEvent,
  isVendorAnalyticsFinancialEvent,
  isVendorAnalyticsQualityEvent,
  isVendorAnalyticsComplianceEvent,
} from './vendor-analytics.constants';

export type {
  VendorAnalyticsType,
  VendorAnalyticsStatus,
  VendorAnalyticsScope,
  VendorAnalyticsEvent,
  VendorAnalyticsDimension,
  VendorAnalyticsMetric,
  VendorAnalyticsSegment,
  VendorAnalyticsCohort,
  VendorAnalyticsGranularity,
} from './vendor-analytics.constants';

// Vendor Analytics Type Constants
export {
  VENDOR_ANALYTICS_TYPE,
  getVendorAnalyticsAnalysisTypeLabel,
  getVendorAnalyticsDataTypeLabel,
  getVendorAnalyticsVendorStatusLabel,
  getVendorAnalyticsVendorTypeLabel,
  getVendorAnalyticsVendorTierLabel,
  getVendorAnalyticsPerformanceLevelLabel,
  getVendorAnalyticsComplianceLevelLabel,
  getVendorAnalyticsRiskLevelLabel,
  getVendorAnalyticsSatisfactionLevelLabel,
  getVendorAnalyticsRelationshipStatusLabel,
  isVendorAnalyticsPerformanceAnalysis,
  isVendorAnalyticsComparative,
  isVendorAnalyticsPredictive,
  getVendorAnalyticsPerformanceLevel,
  getVendorAnalyticsComplianceLevel,
  getVendorAnalyticsRiskLevel,
} from './vendor-analytics-type.constants';

export type {
  VendorAnalyticsAnalysisType,
  VendorAnalyticsDataType,
  VendorAnalyticsVendorStatus,
  VendorAnalyticsVendorType,
  VendorAnalyticsVendorTier,
  VendorAnalyticsPerformanceLevel,
  VendorAnalyticsComplianceLevel,
  VendorAnalyticsRiskLevel,
  VendorAnalyticsSatisfactionLevel,
  VendorAnalyticsRelationshipStatus,
} from './vendor-analytics-type.constants';

// Vendor Analytics Metric Constants
export {
  VENDOR_ANALYTICS_METRIC,
  getVendorAnalyticsMetricLabel,
  getVendorAnalyticsMetricCategoryLabel,
  getVendorAnalyticsMetricTypeLabel,
  getVendorAnalyticsMetricFormatLabel,
  getVendorAnalyticsMetricPriorityLabel,
  getVendorAnalyticsMetricCategory,
  getVendorAnalyticsMetricType,
  getVendorAnalyticsMetricFormat,
  calculateVendorAnalyticsRetentionRate,
  calculateVendorAnalyticsChurnRate,
  calculateVendorAnalyticsConversionRate,
  calculateVendorAnalyticsComplianceRate,
  calculateVendorAnalyticsQualityScore,
  calculateVendorAnalyticsFulfillmentRate,
} from './vendor-analytics-metric.constants';

export type {
  VendorAnalyticsCountMetric,
  VendorAnalyticsRevenueMetric,
  VendorAnalyticsSalesMetric,
  VendorAnalyticsProfitMetric,
  VendorAnalyticsCommissionMetric,
  VendorAnalyticsQualityMetric,
  VendorAnalyticsComplianceMetric,
  VendorAnalyticsPerformanceMetric,
  VendorAnalyticsRelationshipMetric,
  VendorAnalyticsComparisonMetric,
  VendorAnalyticsMetricCategory,
  VendorAnalyticsMetricType,
  VendorAnalyticsMetricFormat,
  VendorAnalyticsMetricPriority,
} from './vendor-analytics-metric.constants';
