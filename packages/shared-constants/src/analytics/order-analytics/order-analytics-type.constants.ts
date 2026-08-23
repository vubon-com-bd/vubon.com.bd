/**
 * Order Analytics Type Constants
 * Types of order analytics data and analysis
 */

export const ORDER_ANALYTICS_TYPE = {
  // Analysis Types
  ANALYSIS_TYPES: {
    // Performance Analysis
    PERFORMANCE: 'performance',
    ORDER_PERFORMANCE: 'order_performance',
    FULFILLMENT_PERFORMANCE: 'fulfillment_performance',
    DELIVERY_PERFORMANCE: 'delivery_performance',

    // Status Analysis
    STATUS_ANALYSIS: 'status_analysis',
    COMPLETION_ANALYSIS: 'completion_analysis',
    CANCELLATION_ANALYSIS: 'cancellation_analysis',
    RETURN_ANALYSIS: 'return_analysis',

    // Time Analysis
    TIME_ANALYSIS: 'time_analysis',
    TIMELINE_ANALYSIS: 'timeline_analysis',
    LEAD_TIME_ANALYSIS: 'lead_time_analysis',

    // Quality Analysis
    QUALITY_ANALYSIS: 'quality_analysis',
    ACCURACY_ANALYSIS: 'accuracy_analysis',
    SATISFACTION_ANALYSIS: 'satisfaction_analysis',

    // Comparative Analysis
    COMPARATIVE: 'comparative',
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    WEEK_OVER_WEEK: 'week_over_week',

    // Predictive Analysis
    PREDICTIVE: 'predictive',
    FORECAST: 'forecast',
    TREND: 'trend',
    PATTERN: 'pattern',
  } as const,

  // Data Types
  DATA_TYPES: {
    ORDER_DATA: 'order_data',
    ORDER_LINE_ITEM: 'order_line_item',
    ORDER_STATUS_DATA: 'order_status_data',
    ORDER_TIMELINE_DATA: 'order_timeline_data',

    FULFILLMENT_DATA: 'fulfillment_data',
    DELIVERY_DATA: 'delivery_data',
    RETURN_DATA: 'return_data',
    REFUND_DATA: 'refund_data',

    CUSTOMER_DATA: 'customer_data',
    PRODUCT_DATA: 'product_data',

    CHANNEL_DATA: 'channel_data',
    REGIONAL_DATA: 'regional_data',

    TIME_SERIES: 'time_series',
    AGGREGATED: 'aggregated',
    RAW: 'raw',
  } as const,

  // Order Status
  ORDER_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    CONFIRMED: 'confirmed',
    PREPARING: 'preparing',
    READY_TO_SHIP: 'ready_to_ship',
    SHIPPED: 'shipped',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    RETURNED: 'returned',
    REFUNDED: 'refunded',
    ON_HOLD: 'on_hold',
    FAILED: 'failed',
  } as const,

  // Order Types
  ORDER_TYPES: {
    STANDARD: 'standard',
    EXPRESS: 'express',
    SAME_DAY: 'same_day',
    NEXT_DAY: 'next_day',
    SCHEDULED: 'scheduled',
    BULK: 'bulk',
    WHOLESALE: 'wholesale',
    RETAIL: 'retail',
    B2B: 'b2b',
    B2C: 'b2c',
    D2C: 'd2c',
    SUBSCRIPTION: 'subscription',
    ONE_TIME: 'one_time',
    RECURRING: 'recurring',
  } as const,

  // Order Priorities
  ORDER_PRIORITIES: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
    CRITICAL: 'critical',
  } as const,

  // Fulfillment Status
  FULFILLMENT_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    PICKING: 'picking',
    PACKING: 'packing',
    READY: 'ready',
    DISPATCHED: 'dispatched',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PARTIALLY_FULFILLED: 'partially_fulfilled',
  } as const,

  // Delivery Status
  DELIVERY_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    DISPATCHED: 'dispatched',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    RETURNED: 'returned',
    PARTIALLY_DELIVERED: 'partially_delivered',
  } as const,

  // Return Status
  RETURN_STATUS: {
    REQUESTED: 'requested',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    RECEIVED: 'received',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
  } as const,

  // Delivery Methods
  DELIVERY_METHODS: {
    STANDARD: 'standard',
    EXPRESS: 'express',
    SAME_DAY: 'same_day',
    NEXT_DAY: 'next_day',
    SCHEDULED: 'scheduled',
    PICKUP: 'pickup',
    DROP_OFF: 'drop_off',
  } as const,

  // Order Channels
  ORDER_CHANNELS: {
    WEBSITE: 'website',
    MOBILE_APP: 'mobile_app',
    SOCIAL_COMMERCE: 'social_commerce',
    MARKETPLACE: 'marketplace',
    EMAIL: 'email',
    RETAIL_STORE: 'retail_store',
    POPUP_STORE: 'popup_store',
    TRADE_SHOW: 'trade_show',
    DIRECT_SALES: 'direct_sales',
    WHOLESALE: 'wholesale',
    DISTRIBUTOR: 'distributor',
    AFFILIATE: 'affiliate',
    REFERRAL: 'referral',
  } as const,

  // Order Performance Levels
  PERFORMANCE_LEVELS: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    BELOW_AVERAGE: 'below_average',
    POOR: 'poor',
    CRITICAL: 'critical',
  } as const,

  // Order Completion Rates
  COMPLETION_RATES: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    VERY_LOW: 'very_low',
  } as const,
} as const;

// Order Analytics Analysis Types
export type OrderAnalyticsAnalysisType =
  (typeof ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES)[keyof typeof ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES];

// Order Analytics Data Types
export type OrderAnalyticsDataType =
  (typeof ORDER_ANALYTICS_TYPE.DATA_TYPES)[keyof typeof ORDER_ANALYTICS_TYPE.DATA_TYPES];

// Order Analytics Order Status
export type OrderAnalyticsOrderStatus =
  (typeof ORDER_ANALYTICS_TYPE.ORDER_STATUS)[keyof typeof ORDER_ANALYTICS_TYPE.ORDER_STATUS];

// Order Analytics Order Types
export type OrderAnalyticsOrderType =
  (typeof ORDER_ANALYTICS_TYPE.ORDER_TYPES)[keyof typeof ORDER_ANALYTICS_TYPE.ORDER_TYPES];

// Order Analytics Order Priorities
export type OrderAnalyticsOrderPriority =
  (typeof ORDER_ANALYTICS_TYPE.ORDER_PRIORITIES)[keyof typeof ORDER_ANALYTICS_TYPE.ORDER_PRIORITIES];

// Order Analytics Fulfillment Status
export type OrderAnalyticsFulfillmentStatus =
  (typeof ORDER_ANALYTICS_TYPE.FULFILLMENT_STATUS)[keyof typeof ORDER_ANALYTICS_TYPE.FULFILLMENT_STATUS];

// Order Analytics Delivery Status
export type OrderAnalyticsDeliveryStatus =
  (typeof ORDER_ANALYTICS_TYPE.DELIVERY_STATUS)[keyof typeof ORDER_ANALYTICS_TYPE.DELIVERY_STATUS];

// Order Analytics Return Status
export type OrderAnalyticsReturnStatus =
  (typeof ORDER_ANALYTICS_TYPE.RETURN_STATUS)[keyof typeof ORDER_ANALYTICS_TYPE.RETURN_STATUS];

// Order Analytics Delivery Methods
export type OrderAnalyticsDeliveryMethod =
  (typeof ORDER_ANALYTICS_TYPE.DELIVERY_METHODS)[keyof typeof ORDER_ANALYTICS_TYPE.DELIVERY_METHODS];

// Order Analytics Order Channels
export type OrderAnalyticsOrderChannel =
  (typeof ORDER_ANALYTICS_TYPE.ORDER_CHANNELS)[keyof typeof ORDER_ANALYTICS_TYPE.ORDER_CHANNELS];

// Order Analytics Performance Levels
export type OrderAnalyticsPerformanceLevel =
  (typeof ORDER_ANALYTICS_TYPE.PERFORMANCE_LEVELS)[keyof typeof ORDER_ANALYTICS_TYPE.PERFORMANCE_LEVELS];

// Order Analytics Completion Rates
export type OrderAnalyticsCompletionRate =
  (typeof ORDER_ANALYTICS_TYPE.COMPLETION_RATES)[keyof typeof ORDER_ANALYTICS_TYPE.COMPLETION_RATES];

// Order Analytics Analysis Type Labels
export function getOrderAnalyticsAnalysisTypeLabel(type: OrderAnalyticsAnalysisType): string {
  const labels: Record<OrderAnalyticsAnalysisType, string> = {
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.PERFORMANCE]: 'Performance Analysis',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.ORDER_PERFORMANCE]: 'Order Performance',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.FULFILLMENT_PERFORMANCE]: 'Fulfillment Performance',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.DELIVERY_PERFORMANCE]: 'Delivery Performance',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.STATUS_ANALYSIS]: 'Status Analysis',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPLETION_ANALYSIS]: 'Completion Analysis',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.CANCELLATION_ANALYSIS]: 'Cancellation Analysis',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.RETURN_ANALYSIS]: 'Return Analysis',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.TIME_ANALYSIS]: 'Time Analysis',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.TIMELINE_ANALYSIS]: 'Timeline Analysis',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.LEAD_TIME_ANALYSIS]: 'Lead Time Analysis',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.QUALITY_ANALYSIS]: 'Quality Analysis',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.ACCURACY_ANALYSIS]: 'Accuracy Analysis',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.SATISFACTION_ANALYSIS]: 'Satisfaction Analysis',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE]: 'Comparative Analysis',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR]: 'Year Over Year',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER]: 'Quarter Over Quarter',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH]: 'Month Over Month',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.WEEK_OVER_WEEK]: 'Week Over Week',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE]: 'Predictive Analysis',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST]: 'Forecast',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND]: 'Trend Analysis',
    [ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.PATTERN]: 'Pattern Analysis',
  };
  return labels[type] || 'Unknown';
}

// Order Analytics Data Type Labels
export function getOrderAnalyticsDataTypeLabel(type: OrderAnalyticsDataType): string {
  const labels: Record<OrderAnalyticsDataType, string> = {
    [ORDER_ANALYTICS_TYPE.DATA_TYPES.ORDER_DATA]: 'Order Data',
    [ORDER_ANALYTICS_TYPE.DATA_TYPES.ORDER_LINE_ITEM]: 'Order Line Item',
    [ORDER_ANALYTICS_TYPE.DATA_TYPES.ORDER_STATUS_DATA]: 'Order Status Data',
    [ORDER_ANALYTICS_TYPE.DATA_TYPES.ORDER_TIMELINE_DATA]: 'Order Timeline Data',
    [ORDER_ANALYTICS_TYPE.DATA_TYPES.FULFILLMENT_DATA]: 'Fulfillment Data',
    [ORDER_ANALYTICS_TYPE.DATA_TYPES.DELIVERY_DATA]: 'Delivery Data',
    [ORDER_ANALYTICS_TYPE.DATA_TYPES.RETURN_DATA]: 'Return Data',
    [ORDER_ANALYTICS_TYPE.DATA_TYPES.REFUND_DATA]: 'Refund Data',
    [ORDER_ANALYTICS_TYPE.DATA_TYPES.CUSTOMER_DATA]: 'Customer Data',
    [ORDER_ANALYTICS_TYPE.DATA_TYPES.PRODUCT_DATA]: 'Product Data',
    [ORDER_ANALYTICS_TYPE.DATA_TYPES.CHANNEL_DATA]: 'Channel Data',
    [ORDER_ANALYTICS_TYPE.DATA_TYPES.REGIONAL_DATA]: 'Regional Data',
    [ORDER_ANALYTICS_TYPE.DATA_TYPES.TIME_SERIES]: 'Time Series',
    [ORDER_ANALYTICS_TYPE.DATA_TYPES.AGGREGATED]: 'Aggregated',
    [ORDER_ANALYTICS_TYPE.DATA_TYPES.RAW]: 'Raw',
  };
  return labels[type] || 'Unknown';
}

// Order Analytics Order Status Labels
export function getOrderAnalyticsOrderStatusLabel(status: OrderAnalyticsOrderStatus): string {
  const labels: Record<OrderAnalyticsOrderStatus, string> = {
    [ORDER_ANALYTICS_TYPE.ORDER_STATUS.PENDING]: 'Pending',
    [ORDER_ANALYTICS_TYPE.ORDER_STATUS.PROCESSING]: 'Processing',
    [ORDER_ANALYTICS_TYPE.ORDER_STATUS.CONFIRMED]: 'Confirmed',
    [ORDER_ANALYTICS_TYPE.ORDER_STATUS.PREPARING]: 'Preparing',
    [ORDER_ANALYTICS_TYPE.ORDER_STATUS.READY_TO_SHIP]: 'Ready to Ship',
    [ORDER_ANALYTICS_TYPE.ORDER_STATUS.SHIPPED]: 'Shipped',
    [ORDER_ANALYTICS_TYPE.ORDER_STATUS.IN_TRANSIT]: 'In Transit',
    [ORDER_ANALYTICS_TYPE.ORDER_STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
    [ORDER_ANALYTICS_TYPE.ORDER_STATUS.DELIVERED]: 'Delivered',
    [ORDER_ANALYTICS_TYPE.ORDER_STATUS.COMPLETED]: 'Completed',
    [ORDER_ANALYTICS_TYPE.ORDER_STATUS.CANCELLED]: 'Cancelled',
    [ORDER_ANALYTICS_TYPE.ORDER_STATUS.RETURNED]: 'Returned',
    [ORDER_ANALYTICS_TYPE.ORDER_STATUS.REFUNDED]: 'Refunded',
    [ORDER_ANALYTICS_TYPE.ORDER_STATUS.ON_HOLD]: 'On Hold',
    [ORDER_ANALYTICS_TYPE.ORDER_STATUS.FAILED]: 'Failed',
  };
  return labels[status] || 'Unknown';
}

// Order Analytics Order Type Labels
export function getOrderAnalyticsOrderTypeLabel(type: OrderAnalyticsOrderType): string {
  const labels: Record<OrderAnalyticsOrderType, string> = {
    [ORDER_ANALYTICS_TYPE.ORDER_TYPES.STANDARD]: 'Standard',
    [ORDER_ANALYTICS_TYPE.ORDER_TYPES.EXPRESS]: 'Express',
    [ORDER_ANALYTICS_TYPE.ORDER_TYPES.SAME_DAY]: 'Same Day',
    [ORDER_ANALYTICS_TYPE.ORDER_TYPES.NEXT_DAY]: 'Next Day',
    [ORDER_ANALYTICS_TYPE.ORDER_TYPES.SCHEDULED]: 'Scheduled',
    [ORDER_ANALYTICS_TYPE.ORDER_TYPES.BULK]: 'Bulk',
    [ORDER_ANALYTICS_TYPE.ORDER_TYPES.WHOLESALE]: 'Wholesale',
    [ORDER_ANALYTICS_TYPE.ORDER_TYPES.RETAIL]: 'Retail',
    [ORDER_ANALYTICS_TYPE.ORDER_TYPES.B2B]: 'B2B',
    [ORDER_ANALYTICS_TYPE.ORDER_TYPES.B2C]: 'B2C',
    [ORDER_ANALYTICS_TYPE.ORDER_TYPES.D2C]: 'D2C',
    [ORDER_ANALYTICS_TYPE.ORDER_TYPES.SUBSCRIPTION]: 'Subscription',
    [ORDER_ANALYTICS_TYPE.ORDER_TYPES.ONE_TIME]: 'One-time',
    [ORDER_ANALYTICS_TYPE.ORDER_TYPES.RECURRING]: 'Recurring',
  };
  return labels[type] || 'Unknown';
}

// Order Analytics Order Priority Labels
export function getOrderAnalyticsOrderPriorityLabel(priority: OrderAnalyticsOrderPriority): string {
  const labels: Record<OrderAnalyticsOrderPriority, string> = {
    [ORDER_ANALYTICS_TYPE.ORDER_PRIORITIES.LOW]: 'Low',
    [ORDER_ANALYTICS_TYPE.ORDER_PRIORITIES.MEDIUM]: 'Medium',
    [ORDER_ANALYTICS_TYPE.ORDER_PRIORITIES.HIGH]: 'High',
    [ORDER_ANALYTICS_TYPE.ORDER_PRIORITIES.URGENT]: 'Urgent',
    [ORDER_ANALYTICS_TYPE.ORDER_PRIORITIES.CRITICAL]: 'Critical',
  };
  return labels[priority] || 'Unknown';
}

// Order Analytics Fulfillment Status Labels
export function getOrderAnalyticsFulfillmentStatusLabel(
  status: OrderAnalyticsFulfillmentStatus
): string {
  const labels: Record<OrderAnalyticsFulfillmentStatus, string> = {
    [ORDER_ANALYTICS_TYPE.FULFILLMENT_STATUS.PENDING]: 'Pending',
    [ORDER_ANALYTICS_TYPE.FULFILLMENT_STATUS.PROCESSING]: 'Processing',
    [ORDER_ANALYTICS_TYPE.FULFILLMENT_STATUS.PICKING]: 'Picking',
    [ORDER_ANALYTICS_TYPE.FULFILLMENT_STATUS.PACKING]: 'Packing',
    [ORDER_ANALYTICS_TYPE.FULFILLMENT_STATUS.READY]: 'Ready',
    [ORDER_ANALYTICS_TYPE.FULFILLMENT_STATUS.DISPATCHED]: 'Dispatched',
    [ORDER_ANALYTICS_TYPE.FULFILLMENT_STATUS.COMPLETED]: 'Completed',
    [ORDER_ANALYTICS_TYPE.FULFILLMENT_STATUS.FAILED]: 'Failed',
    [ORDER_ANALYTICS_TYPE.FULFILLMENT_STATUS.PARTIALLY_FULFILLED]: 'Partially Fulfilled',
  };
  return labels[status] || 'Unknown';
}

// Order Analytics Delivery Status Labels
export function getOrderAnalyticsDeliveryStatusLabel(status: OrderAnalyticsDeliveryStatus): string {
  const labels: Record<OrderAnalyticsDeliveryStatus, string> = {
    [ORDER_ANALYTICS_TYPE.DELIVERY_STATUS.PENDING]: 'Pending',
    [ORDER_ANALYTICS_TYPE.DELIVERY_STATUS.PROCESSING]: 'Processing',
    [ORDER_ANALYTICS_TYPE.DELIVERY_STATUS.DISPATCHED]: 'Dispatched',
    [ORDER_ANALYTICS_TYPE.DELIVERY_STATUS.IN_TRANSIT]: 'In Transit',
    [ORDER_ANALYTICS_TYPE.DELIVERY_STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
    [ORDER_ANALYTICS_TYPE.DELIVERY_STATUS.DELIVERED]: 'Delivered',
    [ORDER_ANALYTICS_TYPE.DELIVERY_STATUS.FAILED]: 'Failed',
    [ORDER_ANALYTICS_TYPE.DELIVERY_STATUS.RETURNED]: 'Returned',
    [ORDER_ANALYTICS_TYPE.DELIVERY_STATUS.PARTIALLY_DELIVERED]: 'Partially Delivered',
  };
  return labels[status] || 'Unknown';
}

// Order Analytics Return Status Labels
export function getOrderAnalyticsReturnStatusLabel(status: OrderAnalyticsReturnStatus): string {
  const labels: Record<OrderAnalyticsReturnStatus, string> = {
    [ORDER_ANALYTICS_TYPE.RETURN_STATUS.REQUESTED]: 'Requested',
    [ORDER_ANALYTICS_TYPE.RETURN_STATUS.APPROVED]: 'Approved',
    [ORDER_ANALYTICS_TYPE.RETURN_STATUS.REJECTED]: 'Rejected',
    [ORDER_ANALYTICS_TYPE.RETURN_STATUS.PROCESSING]: 'Processing',
    [ORDER_ANALYTICS_TYPE.RETURN_STATUS.SHIPPED]: 'Shipped',
    [ORDER_ANALYTICS_TYPE.RETURN_STATUS.RECEIVED]: 'Received',
    [ORDER_ANALYTICS_TYPE.RETURN_STATUS.COMPLETED]: 'Completed',
    [ORDER_ANALYTICS_TYPE.RETURN_STATUS.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown';
}

// Order Analytics Delivery Method Labels
export function getOrderAnalyticsDeliveryMethodLabel(method: OrderAnalyticsDeliveryMethod): string {
  const labels: Record<OrderAnalyticsDeliveryMethod, string> = {
    [ORDER_ANALYTICS_TYPE.DELIVERY_METHODS.STANDARD]: 'Standard',
    [ORDER_ANALYTICS_TYPE.DELIVERY_METHODS.EXPRESS]: 'Express',
    [ORDER_ANALYTICS_TYPE.DELIVERY_METHODS.SAME_DAY]: 'Same Day',
    [ORDER_ANALYTICS_TYPE.DELIVERY_METHODS.NEXT_DAY]: 'Next Day',
    [ORDER_ANALYTICS_TYPE.DELIVERY_METHODS.SCHEDULED]: 'Scheduled',
    [ORDER_ANALYTICS_TYPE.DELIVERY_METHODS.PICKUP]: 'Pickup',
    [ORDER_ANALYTICS_TYPE.DELIVERY_METHODS.DROP_OFF]: 'Drop Off',
  };
  return labels[method] || 'Unknown';
}

// Order Analytics Order Channel Labels
export function getOrderAnalyticsOrderChannelLabel(channel: OrderAnalyticsOrderChannel): string {
  const labels: Record<OrderAnalyticsOrderChannel, string> = {
    [ORDER_ANALYTICS_TYPE.ORDER_CHANNELS.WEBSITE]: 'Website',
    [ORDER_ANALYTICS_TYPE.ORDER_CHANNELS.MOBILE_APP]: 'Mobile App',
    [ORDER_ANALYTICS_TYPE.ORDER_CHANNELS.SOCIAL_COMMERCE]: 'Social Commerce',
    [ORDER_ANALYTICS_TYPE.ORDER_CHANNELS.MARKETPLACE]: 'Marketplace',
    [ORDER_ANALYTICS_TYPE.ORDER_CHANNELS.EMAIL]: 'Email',
    [ORDER_ANALYTICS_TYPE.ORDER_CHANNELS.RETAIL_STORE]: 'Retail Store',
    [ORDER_ANALYTICS_TYPE.ORDER_CHANNELS.POPUP_STORE]: 'Popup Store',
    [ORDER_ANALYTICS_TYPE.ORDER_CHANNELS.TRADE_SHOW]: 'Trade Show',
    [ORDER_ANALYTICS_TYPE.ORDER_CHANNELS.DIRECT_SALES]: 'Direct Sales',
    [ORDER_ANALYTICS_TYPE.ORDER_CHANNELS.WHOLESALE]: 'Wholesale',
    [ORDER_ANALYTICS_TYPE.ORDER_CHANNELS.DISTRIBUTOR]: 'Distributor',
    [ORDER_ANALYTICS_TYPE.ORDER_CHANNELS.AFFILIATE]: 'Affiliate',
    [ORDER_ANALYTICS_TYPE.ORDER_CHANNELS.REFERRAL]: 'Referral',
  };
  return labels[channel] || 'Unknown';
}

// Order Analytics Performance Level Labels
export function getOrderAnalyticsPerformanceLevelLabel(
  level: OrderAnalyticsPerformanceLevel
): string {
  const labels: Record<OrderAnalyticsPerformanceLevel, string> = {
    [ORDER_ANALYTICS_TYPE.PERFORMANCE_LEVELS.EXCELLENT]: 'Excellent',
    [ORDER_ANALYTICS_TYPE.PERFORMANCE_LEVELS.GOOD]: 'Good',
    [ORDER_ANALYTICS_TYPE.PERFORMANCE_LEVELS.AVERAGE]: 'Average',
    [ORDER_ANALYTICS_TYPE.PERFORMANCE_LEVELS.BELOW_AVERAGE]: 'Below Average',
    [ORDER_ANALYTICS_TYPE.PERFORMANCE_LEVELS.POOR]: 'Poor',
    [ORDER_ANALYTICS_TYPE.PERFORMANCE_LEVELS.CRITICAL]: 'Critical',
  };
  return labels[level] || 'Unknown';
}

// Order Analytics Completion Rate Labels
export function getOrderAnalyticsCompletionRateLabel(rate: OrderAnalyticsCompletionRate): string {
  const labels: Record<OrderAnalyticsCompletionRate, string> = {
    [ORDER_ANALYTICS_TYPE.COMPLETION_RATES.HIGH]: 'High',
    [ORDER_ANALYTICS_TYPE.COMPLETION_RATES.MEDIUM]: 'Medium',
    [ORDER_ANALYTICS_TYPE.COMPLETION_RATES.LOW]: 'Low',
    [ORDER_ANALYTICS_TYPE.COMPLETION_RATES.VERY_LOW]: 'Very Low',
  };
  return labels[rate] || 'Unknown';
}

// Check if analysis is performance analysis
export function isOrderAnalyticsPerformanceAnalysis(type: OrderAnalyticsAnalysisType): boolean {
  const performanceTypes: OrderAnalyticsAnalysisType[] = [
    ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.PERFORMANCE,
    ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.ORDER_PERFORMANCE,
    ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.FULFILLMENT_PERFORMANCE,
    ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.DELIVERY_PERFORMANCE,
  ];
  return performanceTypes.includes(type);
}

// Check if analysis is comparative
export function isOrderAnalyticsComparative(type: OrderAnalyticsAnalysisType): boolean {
  const comparativeTypes: OrderAnalyticsAnalysisType[] = [
    ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE,
    ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR,
    ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER,
    ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH,
    ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.WEEK_OVER_WEEK,
  ];
  return comparativeTypes.includes(type);
}

// Check if analysis is predictive
export function isOrderAnalyticsPredictive(type: OrderAnalyticsAnalysisType): boolean {
  const predictiveTypes: OrderAnalyticsAnalysisType[] = [
    ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE,
    ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST,
    ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND,
    ORDER_ANALYTICS_TYPE.ANALYSIS_TYPES.PATTERN,
  ];
  return predictiveTypes.includes(type);
}

// Get performance level from score
export function getOrderAnalyticsPerformanceLevel(score: number): OrderAnalyticsPerformanceLevel {
  if (score >= 90) return ORDER_ANALYTICS_TYPE.PERFORMANCE_LEVELS.EXCELLENT;
  if (score >= 70) return ORDER_ANALYTICS_TYPE.PERFORMANCE_LEVELS.GOOD;
  if (score >= 50) return ORDER_ANALYTICS_TYPE.PERFORMANCE_LEVELS.AVERAGE;
  if (score >= 30) return ORDER_ANALYTICS_TYPE.PERFORMANCE_LEVELS.BELOW_AVERAGE;
  if (score >= 10) return ORDER_ANALYTICS_TYPE.PERFORMANCE_LEVELS.POOR;
  return ORDER_ANALYTICS_TYPE.PERFORMANCE_LEVELS.CRITICAL;
}

// Get completion rate from percentage
export function getOrderAnalyticsCompletionRate(percentage: number): OrderAnalyticsCompletionRate {
  if (percentage > 80) return ORDER_ANALYTICS_TYPE.COMPLETION_RATES.HIGH;
  if (percentage > 60) return ORDER_ANALYTICS_TYPE.COMPLETION_RATES.MEDIUM;
  if (percentage > 40) return ORDER_ANALYTICS_TYPE.COMPLETION_RATES.LOW;
  return ORDER_ANALYTICS_TYPE.COMPLETION_RATES.VERY_LOW;
}
