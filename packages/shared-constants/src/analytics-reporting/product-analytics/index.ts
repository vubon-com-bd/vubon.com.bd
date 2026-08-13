/**
 * @fileoverview Product analytics exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Enums
  ProductAnalyticsMetric,
  ProductAnalyticsMetricType,
  ProductAnalyticsMetricFormat,
  // Constants
  PRODUCT_ANALYTICS_METRIC_CATEGORY_MAP,
  PRODUCT_ANALYTICS_METRIC_CONFIG,
  PRODUCT_DASHBOARD_METRICS,
  PRODUCT_PERFORMANCE_METRICS,
  PRODUCT_FINANCIAL_METRICS,
  PRODUCT_INVENTORY_METRICS,
  PRODUCT_ENGAGEMENT_METRICS,
  PRODUCT_QUALITY_METRICS,
  // Functions
  getProductMetricCategory,
  getProductMetricLabel,
  getProductMetricDescription,
  getProductMetricFormat,
  isProductMetricReversed,
  getProductMetricsByCategory,
  formatProductMetricValue,
  getProductMetricPriority,
  getHighPriorityProductMetrics,
  getProductMetricThreshold,
  evaluateProductMetricPerformance,
} from './product-analytics-metric.constants';

// Re-export from product-analytics-type.constants
export {
  // Enums
  ProductAnalyticsType,
  ProductAnalyticsCategory,
  ProductAnalyticsTypeStatus,
  ProductAnalyticsSubCategory,
  // Constants
  PRODUCT_ANALYTICS_TYPE_CATEGORY_MAP,
  PRODUCT_ANALYTICS_TYPE_CONFIG,
  PRODUCT_ANALYTICS_TYPE_DEFAULT_STATUS,
  PRODUCT_ANALYTICS_PRIORITY_LEVELS,
  PRODUCT_ANALYTICS_TYPE_SUB_CATEGORY_MAP,
  // Functions
  getProductAnalyticsTypeLabel,
  getProductAnalyticsTypeDescription,
  getProductAnalyticsTypeCategory,
  getProductAnalyticsTypesByCategory,
  productAnalyticsTypeRequiresProductId,
  isProductAnalyticsTypeRealtime,
  getProductAnalyticsTypePriority,
  getProductAnalyticsTypeStatus,
  setProductAnalyticsTypeStatus,
  getProductAnalyticsTypesByPriority,
  getCriticalProductAnalyticsTypes,
  getProductAnalyticsTypeSubCategory,
  getProductAnalyticsTypesBySubCategory,
} from './product-analytics-type.constants';

// Re-export from product-analytics.constants
export {
  // Enums
  ProductCategory,
  ProductStatus,
  ProductEventType,
  // Constants
  DEFAULT_PRODUCT_TRACKING_SETTINGS,
  DEFAULT_PRODUCT_VIEW_THRESHOLDS,
  DEFAULT_PRODUCT_COMPARISON_SETTINGS,
  DEFAULT_PRODUCT_RECOMMENDATION_SETTINGS,
  DEFAULT_PRODUCT_REVIEW_TRACKING,
  DEFAULT_PRODUCT_RATING_THRESHOLDS,
  DEFAULT_PRODUCT_INVENTORY_ALERT,
  DEFAULT_PRODUCT_PERFORMANCE_BENCHMARK,
  DEFAULT_PRODUCT_SEASONALITY_TRACKING,
  PRODUCT_CATEGORY_CONFIG,
  PRODUCT_ANALYTICS_CONFIG,
  PRODUCT_EVENT_CONFIG,
  // Functions
  getProductCategoryLabel,
  getProductStatusLabel,
  getProductEventLabel,
  isProductEventCritical,
} from './product-analytics.constants';

// Types - Import from product-analytics.constants
export type {
  ProductTrackingSettings,
  ProductViewThresholds,
  ProductComparisonSettings,
  ProductRecommendationSettings,
  ProductReviewTracking,
  ProductRatingThresholds,
  ProductInventoryAlert,
  ProductPerformanceBenchmark,
  ProductSeasonalityTracking,
} from './product-analytics.constants';

// Import ProductAnalyticsTypeConfig from product-analytics-type.constants
export type { ProductAnalyticsTypeConfig } from './product-analytics-type.constants';

// Import ProductAnalyticsMetricConfig from product-analytics-metric.constants
export type { ProductAnalyticsMetricConfig } from './product-analytics-metric.constants';
