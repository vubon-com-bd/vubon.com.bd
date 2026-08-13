/**
 * @fileoverview Order analytics exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Enums
  OrderAnalyticsMetric,
  OrderAnalyticsMetricType,
  OrderAnalyticsMetricFormat,
  // Constants
  ORDER_ANALYTICS_METRIC_CATEGORY_MAP,
  ORDER_ANALYTICS_METRIC_CONFIG,
  ORDER_DASHBOARD_METRICS,
  ORDER_PERFORMANCE_METRICS,
  ORDER_QUALITY_METRICS,
  ORDER_CUSTOMER_METRICS,
  ORDER_DISTRIBUTION_METRICS,
  // Functions
  getOrderMetricCategory,
  getOrderMetricLabel,
  getOrderMetricDescription,
  getOrderMetricFormat,
  isOrderMetricReversed,
  getOrderMetricsByCategory,
  formatOrderMetricValue,
  getOrderMetricPriority,
  getHighPriorityOrderMetrics,
  getOrderMetricThreshold,
  evaluateOrderMetricPerformance,
} from './order-analytics-metric.constants';

// Re-export from order-analytics-type.constants
export {
  // Enums
  OrderAnalyticsType,
  OrderAnalyticsCategory,
  OrderAnalyticsTypeStatus,
  OrderAnalyticsSubCategory,
  // Constants
  ORDER_ANALYTICS_TYPE_CATEGORY_MAP,
  ORDER_ANALYTICS_TYPE_CONFIG,
  ORDER_ANALYTICS_TYPE_DEFAULT_STATUS,
  ORDER_ANALYTICS_PRIORITY_LEVELS,
  ORDER_ANALYTICS_TYPE_SUB_CATEGORY_MAP,
  // Functions
  getOrderAnalyticsTypeLabel,
  getOrderAnalyticsTypeDescription,
  getOrderAnalyticsTypeCategory,
  getOrderAnalyticsTypesByCategory,
  orderAnalyticsTypeRequiresOrderId,
  isOrderAnalyticsTypeRealtime,
  getOrderAnalyticsTypePriority,
  getOrderAnalyticsTypeStatus,
  setOrderAnalyticsTypeStatus,
  getOrderAnalyticsTypesByPriority,
  getCriticalOrderAnalyticsTypes,
  getOrderAnalyticsTypeSubCategory,
  getOrderAnalyticsTypesBySubCategory,
} from './order-analytics-type.constants';

// Re-export from order-analytics.constants
export {
  // Enums
  OrderStatus,
  OrderEventType,
  // Constants
  DEFAULT_ORDER_PROCESSING_TIMELINE,
  DEFAULT_ORDER_CANCELLATION_POLICY,
  DEFAULT_ORDER_RETURN_POLICY,
  DEFAULT_ORDER_PAYMENT_SETTINGS,
  DEFAULT_ORDER_DELIVERY_TIMELINE,
  DEFAULT_ORDER_TRACKING_SETTINGS,
  DEFAULT_ORDER_COMPLETION_THRESHOLDS,
  DEFAULT_ORDER_VALIDATION_RULES,
  DEFAULT_ORDER_DUPLICATE_CHECK_SETTINGS,
  ORDER_ANALYTICS_CONFIG,
  ORDER_EVENT_CONFIG,
  // Functions
  getOrderStatusLabel,
  getOrderEventLabel,
  isOrderEventCritical,
  getOrderStatusFlow,
  isOrderTerminalStatus,
  canCancelOrder,
  canReturnOrder,
} from './order-analytics.constants';

// Types - Import from order-analytics.constants
export type {
  OrderProcessingTimeline,
  OrderCancellationPolicy,
  OrderReturnPolicy,
  OrderPaymentSettings,
  OrderDeliveryTimeline,
  OrderTrackingSettings,
  OrderCompletionThresholds,
  OrderValidationRules,
  OrderDuplicateCheckSettings,
} from './order-analytics.constants';

// Import OrderAnalyticsTypeConfig from order-analytics-type.constants
export type { OrderAnalyticsTypeConfig } from './order-analytics-type.constants';

// Import OrderAnalyticsMetricConfig from order-analytics-metric.constants
export type { OrderAnalyticsMetricConfig } from './order-analytics-metric.constants';
