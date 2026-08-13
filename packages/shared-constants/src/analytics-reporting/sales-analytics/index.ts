/**
 * @fileoverview Sales analytics exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Enums
  SalesAnalyticsMetric,
  SalesAnalyticsMetricType,
  SalesAnalyticsMetricFormat,
  // Constants
  SALES_ANALYTICS_METRIC_CATEGORY_MAP,
  SALES_ANALYTICS_METRIC_CONFIG,
  SALES_DASHBOARD_METRICS,
  SALES_PERFORMANCE_METRICS,
  SALES_GROWTH_METRICS,
  SALES_PRODUCTIVITY_METRICS,
  // Functions
  getSalesMetricCategory,
  getSalesMetricLabel,
  getSalesMetricDescription,
  getSalesMetricFormat,
  isSalesMetricReversed,
  getSalesMetricsByCategory,
  formatSalesMetricValue,
  getSalesMetricPriority,
  getHighPrioritySalesMetrics,
  getSalesMetricThreshold,
  evaluateSalesMetricPerformance,
} from './sales-analytics-metric.constants';

// Re-export from sales-analytics-type.constants
export {
  // Enums
  SalesAnalyticsType,
  SalesAnalyticsCategory,
  SalesAnalyticsTypeStatus,
  SalesAnalyticsSubCategory,
  // Constants
  SALES_ANALYTICS_TYPE_CATEGORY_MAP,
  SALES_ANALYTICS_TYPE_CONFIG,
  SALES_ANALYTICS_TYPE_DEFAULT_STATUS,
  SALES_ANALYTICS_PRIORITY_LEVELS,
  SALES_ANALYTICS_TYPE_SUB_CATEGORY_MAP,
  // Functions
  getSalesAnalyticsTypeLabel,
  getSalesAnalyticsTypeDescription,
  getSalesAnalyticsTypeCategory,
  getSalesAnalyticsTypesByCategory,
  salesAnalyticsTypeRequiresOrderId,
  isSalesAnalyticsTypeRealtime,
  getSalesAnalyticsTypePriority,
  getSalesAnalyticsTypeStatus,
  setSalesAnalyticsTypeStatus,
  getSalesAnalyticsTypesByPriority,
  getCriticalSalesAnalyticsTypes,
  getSalesAnalyticsTypeSubCategory,
  getSalesAnalyticsTypesBySubCategory,
} from './sales-analytics-type.constants';

// Re-export from sales-analytics.constants
export {
  // Enums
  SalesTrackingPeriod,
  SalesChannelPriority,
  SalesChannel,
  SalesEventType,
  SalesStatus,
  // Constants
  DEFAULT_SALES_TARGET_SETTINGS,
  DEFAULT_SALES_COMMISSION_SETTINGS,
  DEFAULT_SALES_TAX_CONFIG,
  DEFAULT_SALES_DISCOUNT_SETTINGS,
  DEFAULT_SALES_FORECASTING_PARAMS,
  DEFAULT_SALES_SEASONALITY_FACTORS,
  DEFAULT_SALES_REPORTING_THRESHOLDS,
  SALES_CHANNEL_CONFIG,
  SALES_ANALYTICS_CONFIG,
  SALES_EVENT_CONFIG,
  // Functions
  getSalesChannelLabel,
  getSalesChannelPriority,
  getSalesChannelCommission,
  getSalesChannelColor,
  getSalesStatusLabel,
  getSalesEventLabel,
  isSalesEventCritical,
} from './sales-analytics.constants';

// Types - Import from sales-analytics.constants
export type {
  SalesTargetSettings,
  SalesCommissionSettings,
  SalesTaxConfig,
  SalesDiscountSettings,
  SalesForecastingParams,
  SalesSeasonalityFactors,
  SalesTerritoryMapping,
  SalesReportingThresholds,
} from './sales-analytics.constants';

// Import SalesAnalyticsTypeConfig from sales-analytics-type.constants
export type { SalesAnalyticsTypeConfig } from './sales-analytics-type.constants';

// Import SalesAnalyticsMetricConfig from sales-analytics-metric.constants
export type { SalesAnalyticsMetricConfig } from './sales-analytics-metric.constants';
