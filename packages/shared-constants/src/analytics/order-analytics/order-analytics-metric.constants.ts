/**
 * Order Analytics Metric Constants
 * Metrics for measuring order performance and analytics
 */

export const ORDER_ANALYTICS_METRIC = {
  // Order Count Metrics
  COUNT_METRICS: {
    TOTAL_ORDERS: 'total_orders',
    ACTIVE_ORDERS: 'active_orders',
    PENDING_ORDERS: 'pending_orders',
    PROCESSING_ORDERS: 'processing_orders',
    CONFIRMED_ORDERS: 'confirmed_orders',
    SHIPPED_ORDERS: 'shipped_orders',
    DELIVERED_ORDERS: 'delivered_orders',
    COMPLETED_ORDERS: 'completed_orders',
    CANCELLED_ORDERS: 'cancelled_orders',
    RETURNED_ORDERS: 'returned_orders',
    REFUNDED_ORDERS: 'refunded_orders',
    ON_HOLD_ORDERS: 'on_hold_orders',
    FAILED_ORDERS: 'failed_orders',
  } as const,

  // Order Value Metrics
  VALUE_METRICS: {
    TOTAL_ORDER_VALUE: 'total_order_value',
    GROSS_ORDER_VALUE: 'gross_order_value',
    NET_ORDER_VALUE: 'net_order_value',
    AVG_ORDER_VALUE: 'avg_order_value',
    MAX_ORDER_VALUE: 'max_order_value',
    MIN_ORDER_VALUE: 'min_order_value',
    MEDIAN_ORDER_VALUE: 'median_order_value',
    AVG_ITEMS_PER_ORDER: 'avg_items_per_order',
    TOTAL_ITEMS_ORDERED: 'total_items_ordered',
  } as const,

  // Order Volume Metrics
  VOLUME_METRICS: {
    ORDERS_PER_DAY: 'orders_per_day',
    ORDERS_PER_WEEK: 'orders_per_week',
    ORDERS_PER_MONTH: 'orders_per_month',
    ORDERS_PER_QUARTER: 'orders_per_quarter',
    ORDERS_PER_YEAR: 'orders_per_year',
    ORDERS_PER_HOUR: 'orders_per_hour',
    ORDERS_PER_PEAK_HOUR: 'orders_per_peak_hour',
    ORDERS_PER_CUSTOMER: 'orders_per_customer',
    ORDERS_PER_PRODUCT: 'orders_per_product',
  } as const,

  // Order Time Metrics
  TIME_METRICS: {
    AVG_ORDER_CREATION_TIME: 'avg_order_creation_time',
    AVG_CONFIRMATION_TIME: 'avg_confirmation_time',
    AVG_PROCESSING_TIME: 'avg_processing_time',
    AVG_PICKING_TIME: 'avg_picking_time',
    AVG_PACKING_TIME: 'avg_packing_time',
    AVG_FULFILLMENT_TIME: 'avg_fulfillment_time',
    AVG_SHIPPING_TIME: 'avg_shipping_time',
    AVG_DELIVERY_TIME: 'avg_delivery_time',
    AVG_TOTAL_ORDER_TIME: 'avg_total_order_time',
    AVG_RETURN_PROCESSING_TIME: 'avg_return_processing_time',
    AVG_REFUND_TIME: 'avg_refund_time',

    // On-time Metrics
    ON_TIME_DELIVERY_RATE: 'on_time_delivery_rate',
    EARLY_DELIVERY_RATE: 'early_delivery_rate',
    LATE_DELIVERY_RATE: 'late_delivery_rate',
    LEAD_TIME: 'lead_time',
    ORDER_CYCLE_TIME: 'order_cycle_time',
  } as const,

  // Order Quality Metrics
  QUALITY_METRICS: {
    ORDER_ACCURACY_RATE: 'order_accuracy_rate',
    COMPLETION_RATE: 'completion_rate',
    SUCCESS_RATE: 'success_rate',
    FAILURE_RATE: 'failure_rate',
    ACCURACY_SCORE: 'accuracy_score',
    SATISFACTION_SCORE: 'satisfaction_score',
    QUALITY_SCORE: 'quality_score',

    // Return and Cancellation Metrics
    RETURN_RATE: 'return_rate',
    CANCELLATION_RATE: 'cancellation_rate',
    REFUND_RATE: 'refund_rate',
    COMPLAINT_RATE: 'complaint_rate',

    // Delivery Metrics
    DELIVERY_SUCCESS_RATE: 'delivery_success_rate',
    DELIVERY_FAILURE_RATE: 'delivery_failure_rate',
    DELIVERY_ATTEMPT_RATE: 'delivery_attempt_rate',
    DAMAGE_RATE: 'damage_rate',
    LOSS_RATE: 'loss_rate',
  } as const,

  // Order Channel Metrics
  CHANNEL_METRICS: {
    CHANNEL_ORDERS: 'channel_orders',
    CHANNEL_VALUE: 'channel_value',
    CHANNEL_CONVERSION: 'channel_conversion',
    ONLINE_ORDERS: 'online_orders',
    OFFLINE_ORDERS: 'offline_orders',
    MOBILE_ORDERS: 'mobile_orders',
    DESKTOP_ORDERS: 'desktop_orders',
    INSTORE_ORDERS: 'instore_orders',
    MARKETPLACE_ORDERS: 'marketplace_orders',
    SOCIAL_ORDERS: 'social_orders',
    CHANNEL_GROWTH: 'channel_growth',
    CHANNEL_SHARE: 'channel_share',
  } as const,

  // Order Comparison Metrics
  COMPARISON_METRICS: {
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    WEEK_OVER_WEEK: 'week_over_week',
    PERIOD_COMPARISON: 'period_comparison',
    SEASONAL_COMPARISON: 'seasonal_comparison',
    REGIONAL_COMPARISON: 'regional_comparison',
    CHANNEL_COMPARISON: 'channel_comparison',
  } as const,

  // Metric Categories
  CATEGORIES: {
    COUNT: 'count',
    VALUE: 'value',
    VOLUME: 'volume',
    TIME: 'time',
    QUALITY: 'quality',
    CHANNEL: 'channel',
    COMPARISON: 'comparison',
  } as const,

  // Metric Types
  TYPES: {
    ABSOLUTE: 'absolute',
    AVERAGE: 'average',
    PERCENTAGE: 'percentage',
    RATIO: 'ratio',
    RATE: 'rate',
    SCORE: 'score',
    DURATION: 'duration',
  } as const,

  // Metric Formats
  FORMATS: {
    NUMBER: 'number',
    DECIMAL: 'decimal',
    PERCENTAGE: 'percentage',
    CURRENCY: 'currency',
    DURATION: 'duration',
    RATING: 'rating',
  } as const,

  // Metric Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,
} as const;

// Order Analytics Count Metrics
export type OrderAnalyticsCountMetric =
  (typeof ORDER_ANALYTICS_METRIC.COUNT_METRICS)[keyof typeof ORDER_ANALYTICS_METRIC.COUNT_METRICS];

// Order Analytics Value Metrics
export type OrderAnalyticsValueMetric =
  (typeof ORDER_ANALYTICS_METRIC.VALUE_METRICS)[keyof typeof ORDER_ANALYTICS_METRIC.VALUE_METRICS];

// Order Analytics Volume Metrics
export type OrderAnalyticsVolumeMetric =
  (typeof ORDER_ANALYTICS_METRIC.VOLUME_METRICS)[keyof typeof ORDER_ANALYTICS_METRIC.VOLUME_METRICS];

// Order Analytics Time Metrics
export type OrderAnalyticsTimeMetric =
  (typeof ORDER_ANALYTICS_METRIC.TIME_METRICS)[keyof typeof ORDER_ANALYTICS_METRIC.TIME_METRICS];

// Order Analytics Quality Metrics
export type OrderAnalyticsQualityMetric =
  (typeof ORDER_ANALYTICS_METRIC.QUALITY_METRICS)[keyof typeof ORDER_ANALYTICS_METRIC.QUALITY_METRICS];

// Order Analytics Channel Metrics
export type OrderAnalyticsChannelMetric =
  (typeof ORDER_ANALYTICS_METRIC.CHANNEL_METRICS)[keyof typeof ORDER_ANALYTICS_METRIC.CHANNEL_METRICS];

// Order Analytics Comparison Metrics
export type OrderAnalyticsComparisonMetric =
  (typeof ORDER_ANALYTICS_METRIC.COMPARISON_METRICS)[keyof typeof ORDER_ANALYTICS_METRIC.COMPARISON_METRICS];

// Order Analytics Metric Categories
export type OrderAnalyticsMetricCategory =
  (typeof ORDER_ANALYTICS_METRIC.CATEGORIES)[keyof typeof ORDER_ANALYTICS_METRIC.CATEGORIES];

// Order Analytics Metric Types
export type OrderAnalyticsMetricType =
  (typeof ORDER_ANALYTICS_METRIC.TYPES)[keyof typeof ORDER_ANALYTICS_METRIC.TYPES];

// Order Analytics Metric Formats
export type OrderAnalyticsMetricFormat =
  (typeof ORDER_ANALYTICS_METRIC.FORMATS)[keyof typeof ORDER_ANALYTICS_METRIC.FORMATS];

// Order Analytics Metric Priority
export type OrderAnalyticsMetricPriority =
  (typeof ORDER_ANALYTICS_METRIC.PRIORITY)[keyof typeof ORDER_ANALYTICS_METRIC.PRIORITY];

// Order Analytics Metric Labels
export function getOrderAnalyticsMetricLabel(metric: string): string {
  const labels: Record<string, string> = {
    // Count Metrics
    total_orders: 'Total Orders',
    active_orders: 'Active Orders',
    pending_orders: 'Pending Orders',
    processing_orders: 'Processing Orders',
    confirmed_orders: 'Confirmed Orders',
    shipped_orders: 'Shipped Orders',
    delivered_orders: 'Delivered Orders',
    completed_orders: 'Completed Orders',
    cancelled_orders: 'Cancelled Orders',
    returned_orders: 'Returned Orders',
    refunded_orders: 'Refunded Orders',
    on_hold_orders: 'On Hold Orders',
    failed_orders: 'Failed Orders',

    // Value Metrics
    total_order_value: 'Total Order Value',
    gross_order_value: 'Gross Order Value',
    net_order_value: 'Net Order Value',
    avg_order_value: 'Average Order Value',
    max_order_value: 'Max Order Value',
    min_order_value: 'Min Order Value',
    median_order_value: 'Median Order Value',
    avg_items_per_order: 'Avg Items Per Order',
    total_items_ordered: 'Total Items Ordered',

    // Volume Metrics
    orders_per_day: 'Orders Per Day',
    orders_per_week: 'Orders Per Week',
    orders_per_month: 'Orders Per Month',
    orders_per_quarter: 'Orders Per Quarter',
    orders_per_year: 'Orders Per Year',
    orders_per_hour: 'Orders Per Hour',
    orders_per_peak_hour: 'Orders Per Peak Hour',
    orders_per_customer: 'Orders Per Customer',
    orders_per_product: 'Orders Per Product',

    // Time Metrics
    avg_order_creation_time: 'Avg Order Creation Time',
    avg_confirmation_time: 'Avg Confirmation Time',
    avg_processing_time: 'Avg Processing Time',
    avg_picking_time: 'Avg Picking Time',
    avg_packing_time: 'Avg Packing Time',
    avg_fulfillment_time: 'Avg Fulfillment Time',
    avg_shipping_time: 'Avg Shipping Time',
    avg_delivery_time: 'Avg Delivery Time',
    avg_total_order_time: 'Avg Total Order Time',
    avg_return_processing_time: 'Avg Return Processing Time',
    avg_refund_time: 'Avg Refund Time',
    on_time_delivery_rate: 'On-time Delivery Rate',
    early_delivery_rate: 'Early Delivery Rate',
    late_delivery_rate: 'Late Delivery Rate',
    lead_time: 'Lead Time',
    order_cycle_time: 'Order Cycle Time',

    // Quality Metrics
    order_accuracy_rate: 'Order Accuracy Rate',
    completion_rate: 'Completion Rate',
    success_rate: 'Success Rate',
    failure_rate: 'Failure Rate',
    accuracy_score: 'Accuracy Score',
    satisfaction_score: 'Satisfaction Score',
    quality_score: 'Quality Score',
    return_rate: 'Return Rate',
    cancellation_rate: 'Cancellation Rate',
    refund_rate: 'Refund Rate',
    complaint_rate: 'Complaint Rate',
    delivery_success_rate: 'Delivery Success Rate',
    delivery_failure_rate: 'Delivery Failure Rate',
    delivery_attempt_rate: 'Delivery Attempt Rate',
    damage_rate: 'Damage Rate',
    loss_rate: 'Loss Rate',

    // Channel Metrics
    channel_orders: 'Channel Orders',
    channel_value: 'Channel Value',
    channel_conversion: 'Channel Conversion',
    online_orders: 'Online Orders',
    offline_orders: 'Offline Orders',
    mobile_orders: 'Mobile Orders',
    desktop_orders: 'Desktop Orders',
    instore_orders: 'In-store Orders',
    marketplace_orders: 'Marketplace Orders',
    social_orders: 'Social Orders',
    channel_growth: 'Channel Growth',
    channel_share: 'Channel Share',

    // Comparison Metrics
    year_over_year: 'Year Over Year',
    quarter_over_quarter: 'Quarter Over Quarter',
    month_over_month: 'Month Over Month',
    week_over_week: 'Week Over Week',
    period_comparison: 'Period Comparison',
    seasonal_comparison: 'Seasonal Comparison',
    regional_comparison: 'Regional Comparison',
    channel_comparison: 'Channel Comparison',
  };

  return (
    labels[metric] || metric.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
}

// Order Analytics Metric Category Labels
export function getOrderAnalyticsMetricCategoryLabel(
  category: OrderAnalyticsMetricCategory
): string {
  const labels: Record<OrderAnalyticsMetricCategory, string> = {
    [ORDER_ANALYTICS_METRIC.CATEGORIES.COUNT]: 'Count',
    [ORDER_ANALYTICS_METRIC.CATEGORIES.VALUE]: 'Value',
    [ORDER_ANALYTICS_METRIC.CATEGORIES.VOLUME]: 'Volume',
    [ORDER_ANALYTICS_METRIC.CATEGORIES.TIME]: 'Time',
    [ORDER_ANALYTICS_METRIC.CATEGORIES.QUALITY]: 'Quality',
    [ORDER_ANALYTICS_METRIC.CATEGORIES.CHANNEL]: 'Channel',
    [ORDER_ANALYTICS_METRIC.CATEGORIES.COMPARISON]: 'Comparison',
  };
  return labels[category] || 'Unknown';
}

// Order Analytics Metric Type Labels
export function getOrderAnalyticsMetricTypeLabel(type: OrderAnalyticsMetricType): string {
  const labels: Record<OrderAnalyticsMetricType, string> = {
    [ORDER_ANALYTICS_METRIC.TYPES.ABSOLUTE]: 'Absolute',
    [ORDER_ANALYTICS_METRIC.TYPES.AVERAGE]: 'Average',
    [ORDER_ANALYTICS_METRIC.TYPES.PERCENTAGE]: 'Percentage',
    [ORDER_ANALYTICS_METRIC.TYPES.RATIO]: 'Ratio',
    [ORDER_ANALYTICS_METRIC.TYPES.RATE]: 'Rate',
    [ORDER_ANALYTICS_METRIC.TYPES.SCORE]: 'Score',
    [ORDER_ANALYTICS_METRIC.TYPES.DURATION]: 'Duration',
  };
  return labels[type] || 'Unknown';
}

// Order Analytics Metric Format Labels
export function getOrderAnalyticsMetricFormatLabel(format: OrderAnalyticsMetricFormat): string {
  const labels: Record<OrderAnalyticsMetricFormat, string> = {
    [ORDER_ANALYTICS_METRIC.FORMATS.NUMBER]: 'Number',
    [ORDER_ANALYTICS_METRIC.FORMATS.DECIMAL]: 'Decimal',
    [ORDER_ANALYTICS_METRIC.FORMATS.PERCENTAGE]: 'Percentage',
    [ORDER_ANALYTICS_METRIC.FORMATS.CURRENCY]: 'Currency',
    [ORDER_ANALYTICS_METRIC.FORMATS.DURATION]: 'Duration',
    [ORDER_ANALYTICS_METRIC.FORMATS.RATING]: 'Rating',
  };
  return labels[format] || 'Unknown';
}

// Order Analytics Metric Priority Labels
export function getOrderAnalyticsMetricPriorityLabel(
  priority: OrderAnalyticsMetricPriority
): string {
  const labels: Record<OrderAnalyticsMetricPriority, string> = {
    [ORDER_ANALYTICS_METRIC.PRIORITY.CRITICAL]: 'Critical',
    [ORDER_ANALYTICS_METRIC.PRIORITY.HIGH]: 'High',
    [ORDER_ANALYTICS_METRIC.PRIORITY.MEDIUM]: 'Medium',
    [ORDER_ANALYTICS_METRIC.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Get metric category
export function getOrderAnalyticsMetricCategory(metric: string): OrderAnalyticsMetricCategory {
  const countMetrics: readonly string[] = Object.values(ORDER_ANALYTICS_METRIC.COUNT_METRICS);
  const valueMetrics: readonly string[] = Object.values(ORDER_ANALYTICS_METRIC.VALUE_METRICS);
  const volumeMetrics: readonly string[] = Object.values(ORDER_ANALYTICS_METRIC.VOLUME_METRICS);
  const timeMetrics: readonly string[] = Object.values(ORDER_ANALYTICS_METRIC.TIME_METRICS);
  const qualityMetrics: readonly string[] = Object.values(ORDER_ANALYTICS_METRIC.QUALITY_METRICS);
  const channelMetrics: readonly string[] = Object.values(ORDER_ANALYTICS_METRIC.CHANNEL_METRICS);
  const comparisonMetrics: readonly string[] = Object.values(
    ORDER_ANALYTICS_METRIC.COMPARISON_METRICS
  );

  if (countMetrics.includes(metric as OrderAnalyticsCountMetric))
    return ORDER_ANALYTICS_METRIC.CATEGORIES.COUNT;
  if (valueMetrics.includes(metric as OrderAnalyticsValueMetric))
    return ORDER_ANALYTICS_METRIC.CATEGORIES.VALUE;
  if (volumeMetrics.includes(metric as OrderAnalyticsVolumeMetric))
    return ORDER_ANALYTICS_METRIC.CATEGORIES.VOLUME;
  if (timeMetrics.includes(metric as OrderAnalyticsTimeMetric))
    return ORDER_ANALYTICS_METRIC.CATEGORIES.TIME;
  if (qualityMetrics.includes(metric as OrderAnalyticsQualityMetric))
    return ORDER_ANALYTICS_METRIC.CATEGORIES.QUALITY;
  if (channelMetrics.includes(metric as OrderAnalyticsChannelMetric))
    return ORDER_ANALYTICS_METRIC.CATEGORIES.CHANNEL;
  if (comparisonMetrics.includes(metric as OrderAnalyticsComparisonMetric))
    return ORDER_ANALYTICS_METRIC.CATEGORIES.COMPARISON;

  return ORDER_ANALYTICS_METRIC.CATEGORIES.COUNT;
}

// Get metric type
export function getOrderAnalyticsMetricType(metric: string): OrderAnalyticsMetricType {
  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'margin',
    'growth',
    'conversion',
    'retention',
    'churn',
    'abandonment',
    'bounce',
    'exit',
    'return',
    'refund',
    'cancellation',
    'complaint',
    'accuracy',
    'completion',
    'success',
    'failure',
  ];

  const averageMetrics: string[] = ['avg', 'average', 'mean', 'median'];

  const durationMetrics: string[] = [
    'time',
    'duration',
    'fulfillment',
    'delivery',
    'lead',
    'cycle',
    'processing',
    'picking',
    'packing',
    'shipping',
  ];

  const scoreMetrics: string[] = ['score', 'nps', 'csat', 'ces', 'rating'];

  const lowerMetric = metric.toLowerCase();

  if (durationMetrics.some((dm: string) => lowerMetric.includes(dm))) {
    return ORDER_ANALYTICS_METRIC.TYPES.DURATION;
  }

  if (percentageMetrics.some((pm: string) => lowerMetric.includes(pm))) {
    return ORDER_ANALYTICS_METRIC.TYPES.PERCENTAGE;
  }

  if (averageMetrics.some((am: string) => lowerMetric.includes(am))) {
    return ORDER_ANALYTICS_METRIC.TYPES.AVERAGE;
  }

  if (scoreMetrics.some((sm: string) => lowerMetric.includes(sm))) {
    return ORDER_ANALYTICS_METRIC.TYPES.SCORE;
  }

  return ORDER_ANALYTICS_METRIC.TYPES.ABSOLUTE;
}

// Get metric format
export function getOrderAnalyticsMetricFormat(metric: string): OrderAnalyticsMetricFormat {
  const currencyMetrics: string[] = ['value', 'amount', 'price', 'cost', 'revenue'];

  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'margin',
    'growth',
    'conversion',
    'retention',
    'churn',
    'return',
    'refund',
    'cancellation',
    'accuracy',
    'completion',
    'success',
    'failure',
  ];

  const durationMetrics: string[] = [
    'time',
    'duration',
    'fulfillment',
    'delivery',
    'lead',
    'cycle',
    'processing',
    'picking',
    'packing',
    'shipping',
  ];

  const ratingMetrics: string[] = ['score', 'nps', 'csat', 'ces', 'rating'];

  const lowerMetric = metric.toLowerCase();

  if (currencyMetrics.some((cm: string) => lowerMetric.includes(cm))) {
    return ORDER_ANALYTICS_METRIC.FORMATS.CURRENCY;
  }

  if (durationMetrics.some((dm: string) => lowerMetric.includes(dm))) {
    return ORDER_ANALYTICS_METRIC.FORMATS.DURATION;
  }

  if (ratingMetrics.some((rm: string) => lowerMetric.includes(rm))) {
    return ORDER_ANALYTICS_METRIC.FORMATS.RATING;
  }

  if (percentageMetrics.some((pm: string) => lowerMetric.includes(pm))) {
    return ORDER_ANALYTICS_METRIC.FORMATS.PERCENTAGE;
  }

  return ORDER_ANALYTICS_METRIC.FORMATS.NUMBER;
}

// Calculate average order value
export function calculateOrderAnalyticsAverageOrderValue(
  totalValue: number,
  totalOrders: number
): number {
  if (totalOrders === 0) return 0;
  return totalValue / totalOrders;
}

// Calculate completion rate
export function calculateOrderAnalyticsCompletionRate(
  completedOrders: number,
  totalOrders: number
): number {
  if (totalOrders === 0) return 0;
  return (completedOrders / totalOrders) * 100;
}

// Calculate on-time delivery rate
export function calculateOrderAnalyticsOnTimeDeliveryRate(
  onTimeDeliveries: number,
  totalDeliveries: number
): number {
  if (totalDeliveries === 0) return 0;
  return (onTimeDeliveries / totalDeliveries) * 100;
}

// Calculate return rate
export function calculateOrderAnalyticsReturnRate(
  returnedOrders: number,
  totalOrders: number
): number {
  if (totalOrders === 0) return 0;
  return (returnedOrders / totalOrders) * 100;
}

// Calculate cancellation rate
export function calculateOrderAnalyticsCancellationRate(
  cancelledOrders: number,
  totalOrders: number
): number {
  if (totalOrders === 0) return 0;
  return (cancelledOrders / totalOrders) * 100;
}

// Calculate success rate
export function calculateOrderAnalyticsSuccessRate(
  successfulOrders: number,
  totalOrders: number
): number {
  if (totalOrders === 0) return 0;
  return (successfulOrders / totalOrders) * 100;
}

// Calculate average time
export function calculateOrderAnalyticsAverageTime(totalTime: number, count: number): number {
  if (count === 0) return 0;
  return totalTime / count;
}

// Calculate accuracy rate
export function calculateOrderAnalyticsAccuracyRate(
  accurateOrders: number,
  totalOrders: number
): number {
  if (totalOrders === 0) return 0;
  return (accurateOrders / totalOrders) * 100;
}

// Calculate satisfaction score
export function calculateOrderAnalyticsSatisfactionScore(
  totalScore: number,
  totalResponses: number
): number {
  if (totalResponses === 0) return 0;
  return totalScore / totalResponses;
}
