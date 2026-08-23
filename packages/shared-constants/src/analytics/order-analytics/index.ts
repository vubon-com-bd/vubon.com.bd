/**
 * Order Analytics Constants Index
 * Export all order analytics constants and types for easy importing
 */

// Order Analytics Main Constants
export {
  ORDER_ANALYTICS,
  getOrderAnalyticsStatusLabel,
  getOrderAnalyticsEventLabel,
  getOrderAnalyticsDimensionLabel,
  getOrderAnalyticsSegmentLabel,
  getOrderAnalyticsCohortLabel,
  getOrderAnalyticsGranularityLabel,
  isOrderAnalyticsActive,
  isOrderAnalyticsCompleted,
  isOrderAnalyticsFailed,
  isOrderAnalyticsLifecycleEvent,
  isOrderAnalyticsFulfillmentEvent,
  isOrderAnalyticsDeliveryEvent,
  isOrderAnalyticsReturnEvent,
} from './order-analytics.constants';

export type {
  OrderAnalyticsType,
  OrderAnalyticsStatus,
  OrderAnalyticsScope,
  OrderAnalyticsEvent,
  OrderAnalyticsDimension,
  OrderAnalyticsMetric,
  OrderAnalyticsSegment,
  OrderAnalyticsCohort,
  OrderAnalyticsGranularity,
} from './order-analytics.constants';

// Order Analytics Type Constants
export {
  ORDER_ANALYTICS_TYPE,
  getOrderAnalyticsAnalysisTypeLabel,
  getOrderAnalyticsDataTypeLabel,
  getOrderAnalyticsOrderStatusLabel,
  getOrderAnalyticsOrderTypeLabel,
  getOrderAnalyticsOrderPriorityLabel,
  getOrderAnalyticsFulfillmentStatusLabel,
  getOrderAnalyticsDeliveryStatusLabel,
  getOrderAnalyticsReturnStatusLabel,
  getOrderAnalyticsDeliveryMethodLabel,
  getOrderAnalyticsOrderChannelLabel,
  getOrderAnalyticsPerformanceLevelLabel,
  getOrderAnalyticsCompletionRateLabel,
  isOrderAnalyticsPerformanceAnalysis,
  isOrderAnalyticsComparative,
  isOrderAnalyticsPredictive,
  getOrderAnalyticsPerformanceLevel,
  getOrderAnalyticsCompletionRate,
} from './order-analytics-type.constants';

export type {
  OrderAnalyticsAnalysisType,
  OrderAnalyticsDataType,
  OrderAnalyticsOrderStatus,
  OrderAnalyticsOrderType,
  OrderAnalyticsOrderPriority,
  OrderAnalyticsFulfillmentStatus,
  OrderAnalyticsDeliveryStatus,
  OrderAnalyticsReturnStatus,
  OrderAnalyticsDeliveryMethod,
  OrderAnalyticsOrderChannel,
  OrderAnalyticsPerformanceLevel,
  OrderAnalyticsCompletionRate,
} from './order-analytics-type.constants';

// Order Analytics Metric Constants
export {
  ORDER_ANALYTICS_METRIC,
  getOrderAnalyticsMetricLabel,
  getOrderAnalyticsMetricCategoryLabel,
  getOrderAnalyticsMetricTypeLabel,
  getOrderAnalyticsMetricFormatLabel,
  getOrderAnalyticsMetricPriorityLabel,
  getOrderAnalyticsMetricCategory,
  getOrderAnalyticsMetricType,
  getOrderAnalyticsMetricFormat,
  calculateOrderAnalyticsAverageOrderValue,
  calculateOrderAnalyticsCompletionRate,
  calculateOrderAnalyticsOnTimeDeliveryRate,
  calculateOrderAnalyticsReturnRate,
  calculateOrderAnalyticsCancellationRate,
  calculateOrderAnalyticsSuccessRate,
  calculateOrderAnalyticsAverageTime,
  calculateOrderAnalyticsAccuracyRate,
  calculateOrderAnalyticsSatisfactionScore,
} from './order-analytics-metric.constants';

export type {
  OrderAnalyticsCountMetric,
  OrderAnalyticsValueMetric,
  OrderAnalyticsVolumeMetric,
  OrderAnalyticsTimeMetric,
  OrderAnalyticsQualityMetric,
  OrderAnalyticsChannelMetric,
  OrderAnalyticsComparisonMetric,
  OrderAnalyticsMetricCategory,
  OrderAnalyticsMetricType,
  OrderAnalyticsMetricFormat,
  OrderAnalyticsMetricPriority,
} from './order-analytics-metric.constants';
