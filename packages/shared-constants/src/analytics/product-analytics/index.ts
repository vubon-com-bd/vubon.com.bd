/**
 * Product Analytics Constants Index
 * Export all product analytics constants and types for easy importing
 */

// Product Analytics Main Constants
export {
  PRODUCT_ANALYTICS,
  getProductAnalyticsStatusLabel,
  getProductAnalyticsEventLabel,
  getProductAnalyticsDimensionLabel,
  getProductAnalyticsSegmentLabel,
  getProductAnalyticsCohortLabel,
  getProductAnalyticsGranularityLabel,
  isProductAnalyticsActive,
  isProductAnalyticsCompleted,
  isProductAnalyticsFailed,
  isProductAnalyticsLifecycleEvent,
  isProductAnalyticsViewEvent,
  isProductAnalyticsCartEvent,
  isProductAnalyticsPurchaseEvent,
} from './product-analytics.constants';

export type {
  ProductAnalyticsType,
  ProductAnalyticsStatus,
  ProductAnalyticsScope,
  ProductAnalyticsEvent,
  ProductAnalyticsDimension,
  ProductAnalyticsMetric,
  ProductAnalyticsSegment,
  ProductAnalyticsCohort,
  ProductAnalyticsGranularity,
} from './product-analytics.constants';

// Product Analytics Type Constants
export {
  PRODUCT_ANALYTICS_TYPE,
  getProductAnalyticsAnalysisTypeLabel,
  getProductAnalyticsDataTypeLabel,
  getProductAnalyticsProductCategoryLabel,
  getProductAnalyticsProductStatusLabel,
  getProductAnalyticsProductTypeLabel,
  getProductAnalyticsStockStatusLabel,
  getProductAnalyticsPricingTypeLabel,
  getProductAnalyticsPerformanceLevelLabel,
  getProductAnalyticsReviewTypeLabel,
  isProductAnalyticsPerformanceAnalysis,
  isProductAnalyticsCategoryAnalysis,
  isProductAnalyticsInventoryAnalysis,
  isProductAnalyticsPredictive,
  getProductAnalyticsPerformanceLevel,
} from './product-analytics-type.constants';

export type {
  ProductAnalyticsAnalysisType,
  ProductAnalyticsDataType,
  ProductAnalyticsProductCategory,
  ProductAnalyticsProductStatus,
  ProductAnalyticsProductType,
  ProductAnalyticsStockStatus,
  ProductAnalyticsPricingType,
  ProductAnalyticsPerformanceLevel,
  ProductAnalyticsReviewType,
} from './product-analytics-type.constants';

// Product Analytics Metric Constants
export {
  PRODUCT_ANALYTICS_METRIC,
  getProductAnalyticsMetricLabel,
  getProductAnalyticsMetricCategoryLabel,
  getProductAnalyticsMetricTypeLabel,
  getProductAnalyticsMetricFormatLabel,
  getProductAnalyticsMetricPriorityLabel,
  getProductAnalyticsMetricCategory,
  getProductAnalyticsMetricType,
  getProductAnalyticsMetricFormat,
  calculateProductAnalyticsConversionRate,
  calculateProductAnalyticsReturnRate,
  calculateProductAnalyticsProfitMargin,
  calculateProductAnalyticsTurnoverRate,
} from './product-analytics-metric.constants';

export type {
  ProductAnalyticsCountMetric,
  ProductAnalyticsViewMetric,
  ProductAnalyticsEngagementMetric,
  ProductAnalyticsSalesMetric,
  ProductAnalyticsRevenueMetric,
  ProductAnalyticsProfitMetric,
  ProductAnalyticsInventoryMetric,
  ProductAnalyticsPerformanceMetric,
  ProductAnalyticsReviewMetric,
  ProductAnalyticsMetricCategory,
  ProductAnalyticsMetricType,
  ProductAnalyticsMetricFormat,
  ProductAnalyticsMetricPriority,
} from './product-analytics-metric.constants';
