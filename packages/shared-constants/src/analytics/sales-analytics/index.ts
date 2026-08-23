/**
 * Sales Analytics Constants Index
 * Export all sales analytics constants and types for easy importing
 */

// Sales Analytics Main Constants
export {
  SALES_ANALYTICS,
  getSalesAnalyticsStatusLabel,
  getSalesAnalyticsEventLabel,
  getSalesAnalyticsDimensionLabel,
  getSalesAnalyticsSegmentLabel,
  getSalesAnalyticsCohortLabel,
  getSalesAnalyticsGranularityLabel,
  isSalesAnalyticsActive,
  isSalesAnalyticsCompleted,
  isSalesAnalyticsFailed,
  isSalesAnalyticsTransactionEvent,
  isSalesAnalyticsOrderEvent,
  isSalesAnalyticsPaymentEvent,
  isSalesAnalyticsPromotionEvent,
} from './sales-analytics.constants';

export type {
  SalesAnalyticsType,
  SalesAnalyticsStatus,
  SalesAnalyticsScope,
  SalesAnalyticsEvent,
  SalesAnalyticsDimension,
  SalesAnalyticsMetric,
  SalesAnalyticsSegment,
  SalesAnalyticsCohort,
  SalesAnalyticsGranularity,
} from './sales-analytics.constants';

// Sales Analytics Type Constants
export {
  SALES_ANALYTICS_TYPE,
  getSalesAnalyticsAnalysisTypeLabel,
  getSalesAnalyticsDataTypeLabel,
  getSalesAnalyticsChannelLabel,
  getSalesAnalyticsOrderStatusLabel,
  getSalesAnalyticsPaymentStatusLabel,
  getSalesAnalyticsSalesTypeLabel,
  getSalesAnalyticsPerformanceLevelLabel,
  getSalesAnalyticsGrowthRateLabel,
  getSalesAnalyticsPeriodLabel,
  isSalesAnalyticsPerformanceAnalysis,
  isSalesAnalyticsComparative,
  isSalesAnalyticsPredictive,
  getSalesAnalyticsPerformanceLevel,
  getSalesAnalyticsGrowthRate,
} from './sales-analytics-type.constants';

export type {
  SalesAnalyticsAnalysisType,
  SalesAnalyticsDataType,
  SalesAnalyticsChannel,
  SalesAnalyticsOrderStatus,
  SalesAnalyticsPaymentStatus,
  SalesAnalyticsSalesType,
  SalesAnalyticsPerformanceLevel,
  SalesAnalyticsGrowthRate,
  SalesAnalyticsPeriod,
} from './sales-analytics-type.constants';

// Sales Analytics Metric Constants
export {
  SALES_ANALYTICS_METRIC,
  getSalesAnalyticsMetricLabel,
  getSalesAnalyticsMetricCategoryLabel,
  getSalesAnalyticsMetricTypeLabel,
  getSalesAnalyticsMetricFormatLabel,
  getSalesAnalyticsMetricPriorityLabel,
  getSalesAnalyticsMetricCategory,
  getSalesAnalyticsMetricType,
  getSalesAnalyticsMetricFormat,
  calculateSalesAnalyticsConversionRate,
  calculateSalesAnalyticsAverageOrderValue,
  calculateSalesAnalyticsGrowthRate,
  calculateSalesAnalyticsProfitMargin,
  calculateSalesAnalyticsRetentionRate,
  calculateSalesAnalyticsChurnRate,
  calculateSalesAnalyticsReturnRate,
  calculateSalesAnalyticsNPS,
} from './sales-analytics-metric.constants';

export type {
  SalesAnalyticsCountMetric,
  SalesAnalyticsRevenueMetric,
  SalesAnalyticsProfitMetric,
  SalesAnalyticsGrowthMetric,
  SalesAnalyticsConversionMetric,
  SalesAnalyticsChannelMetric,
  SalesAnalyticsEfficiencyMetric,
  SalesAnalyticsQualityMetric,
  SalesAnalyticsMetricCategory,
  SalesAnalyticsMetricType,
  SalesAnalyticsMetricFormat,
  SalesAnalyticsMetricPriority,
} from './sales-analytics-metric.constants';
