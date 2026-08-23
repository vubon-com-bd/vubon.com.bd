/**
 * Order Analytics Constants
 * Configuration for order performance analytics and tracking
 */

export const ORDER_ANALYTICS = {
  // Order Analytics Types
  TYPES: {
    // Performance Analytics
    PERFORMANCE: 'performance',
    FULFILLMENT: 'fulfillment',
    DELIVERY: 'delivery',
    QUALITY: 'quality',
    SATISFACTION: 'satisfaction',

    // Order Metrics
    ORDERS: 'orders',
    STATUS: 'status',
    TIMELINE: 'timeline',
    COMPLETION: 'completion',

    // Channel Analytics
    CHANNEL: 'channel',
    ONLINE: 'online',
    OFFLINE: 'offline',
    MULTI_CHANNEL: 'multi_channel',

    // Regional Analytics
    REGIONAL: 'regional',
    NATIONAL: 'national',
    INTERNATIONAL: 'international',
    LOCAL: 'local',

    // Time Analytics
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Order Analytics Status
  STATUS: {
    TRACKING: 'tracking',
    PROCESSING: 'processing',
    ANALYZING: 'analyzing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PAUSED: 'paused',
    STOPPED: 'stopped',
    UPDATING: 'updating',
    REFRESHING: 'refreshing',
  } as const,

  // Order Analytics Scopes
  SCOPES: {
    INDIVIDUAL: 'individual',
    CHANNEL: 'channel',
    REGION: 'region',
    CATEGORY: 'category',
    PRODUCT: 'product',
    CUSTOMER: 'customer',
    ALL_ORDERS: 'all_orders',
    RECENT_ORDERS: 'recent_orders',
    PENDING_ORDERS: 'pending_orders',
    COMPLETED_ORDERS: 'completed_orders',
    CANCELLED_ORDERS: 'cancelled_orders',
    RETURNED_ORDERS: 'returned_orders',
    COMPARATIVE: 'comparative',
  } as const,

  // Order Analytics Events
  EVENTS: {
    // Order Lifecycle Events
    ORDER_CREATED: 'order_created',
    ORDER_UPDATED: 'order_updated',
    ORDER_CONFIRMED: 'order_confirmed',
    ORDER_PROCESSING: 'order_processing',
    ORDER_SHIPPED: 'order_shipped',
    ORDER_DELIVERED: 'order_delivered',
    ORDER_COMPLETED: 'order_completed',
    ORDER_CANCELLED: 'order_cancelled',
    ORDER_RETURNED: 'order_returned',
    ORDER_REFUNDED: 'order_refunded',

    // Order Status Events
    STATUS_CHANGED: 'status_changed',
    PRIORITY_CHANGED: 'priority_changed',
    ESCALATED: 'escalated',
    DEESCALATED: 'deescalated',

    // Order Fulfillment Events
    FULFILLMENT_STARTED: 'fulfillment_started',
    FULFILLMENT_COMPLETED: 'fulfillment_completed',
    PICKING_STARTED: 'picking_started',
    PICKING_COMPLETED: 'picking_completed',
    PACKING_STARTED: 'packing_started',
    PACKING_COMPLETED: 'packing_completed',

    // Order Delivery Events
    DISPATCHED: 'dispatched',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERY_ATTEMPTED: 'delivery_attempted',
    DELIVERY_FAILED: 'delivery_failed',
    DELIVERY_SUCCESS: 'delivery_success',

    // Order Customer Events
    CUSTOMER_NOTIFIED: 'customer_notified',
    CUSTOMER_CONFIRMED: 'customer_confirmed',
    CUSTOMER_REVIEWED: 'customer_reviewed',
    CUSTOMER_COMPLAINED: 'customer_complained',

    // Order Quality Events
    QUALITY_CHECK: 'quality_check',
    QUALITY_PASSED: 'quality_passed',
    QUALITY_FAILED: 'quality_failed',
    INSPECTION: 'inspection',

    // Order Return Events
    RETURN_REQUESTED: 'return_requested',
    RETURN_APPROVED: 'return_approved',
    RETURN_REJECTED: 'return_rejected',
    RETURN_RECEIVED: 'return_received',
    REFUND_PROCESSED: 'refund_processed',
  } as const,

  // Order Analytics Dimensions
  DIMENSIONS: {
    // Order Attributes
    ORDER_ID: 'order_id',
    ORDER_DATE: 'order_date',
    ORDER_STATUS: 'order_status',
    ORDER_TYPE: 'order_type',
    ORDER_PRIORITY: 'order_priority',
    ORDER_CHANNEL: 'order_channel',

    // Customer Attributes
    CUSTOMER_ID: 'customer_id',
    CUSTOMER_NAME: 'customer_name',
    CUSTOMER_TYPE: 'customer_type',
    CUSTOMER_SEGMENT: 'customer_segment',
    CUSTOMER_LOCATION: 'customer_location',

    // Product Attributes
    PRODUCT_ID: 'product_id',
    PRODUCT_NAME: 'product_name',
    PRODUCT_SKU: 'product_sku',
    PRODUCT_CATEGORY: 'product_category',
    PRODUCT_BRAND: 'product_brand',

    // Price Attributes
    SUBTOTAL: 'subtotal',
    DISCOUNT: 'discount',
    TAX: 'tax',
    SHIPPING_COST: 'shipping_cost',
    TOTAL_AMOUNT: 'total_amount',
    CURRENCY: 'currency',

    // Location Attributes
    COUNTRY: 'country',
    REGION: 'region',
    CITY: 'city',
    STORE: 'store',
    WAREHOUSE: 'warehouse',
    DELIVERY_ADDRESS: 'delivery_address',

    // Time Attributes
    ORDER_DATE_TIME: 'order_date_time',
    ORDER_HOUR: 'order_hour',
    ORDER_DAY: 'order_day',
    ORDER_WEEK: 'order_week',
    ORDER_MONTH: 'order_month',
    ORDER_QUARTER: 'order_quarter',
    ORDER_YEAR: 'order_year',

    // Fulfillment Attributes
    FULFILLMENT_TIME: 'fulfillment_time',
    PICKING_TIME: 'picking_time',
    PACKING_TIME: 'packing_time',
    SHIPPING_METHOD: 'shipping_method',
    DELIVERY_TIME: 'delivery_time',
    DELIVERY_STATUS: 'delivery_status',
  } as const,

  // Order Analytics Metrics
  METRICS: {
    // Order Count Metrics
    TOTAL_ORDERS: 'total_orders',
    ACTIVE_ORDERS: 'active_orders',
    PENDING_ORDERS: 'pending_orders',
    PROCESSING_ORDERS: 'processing_orders',
    COMPLETED_ORDERS: 'completed_orders',
    CANCELLED_ORDERS: 'cancelled_orders',
    RETURNED_ORDERS: 'returned_orders',
    REFUNDED_ORDERS: 'refunded_orders',

    // Order Value Metrics
    TOTAL_ORDER_VALUE: 'total_order_value',
    AVG_ORDER_VALUE: 'avg_order_value',
    MAX_ORDER_VALUE: 'max_order_value',
    MIN_ORDER_VALUE: 'min_order_value',
    MEDIAN_ORDER_VALUE: 'median_order_value',

    // Order Volume Metrics
    ORDERS_PER_DAY: 'orders_per_day',
    ORDERS_PER_WEEK: 'orders_per_week',
    ORDERS_PER_MONTH: 'orders_per_month',
    ORDERS_PER_QUARTER: 'orders_per_quarter',
    ORDERS_PER_YEAR: 'orders_per_year',

    // Order Time Metrics
    AVG_FULFILLMENT_TIME: 'avg_fulfillment_time',
    AVG_PICKING_TIME: 'avg_picking_time',
    AVG_PACKING_TIME: 'avg_packing_time',
    AVG_SHIPPING_TIME: 'avg_shipping_time',
    AVG_DELIVERY_TIME: 'avg_delivery_time',
    AVG_TOTAL_TIME: 'avg_total_time',

    // Order Quality Metrics
    ON_TIME_DELIVERY_RATE: 'on_time_delivery_rate',
    ACCURACY_RATE: 'accuracy_rate',
    COMPLETION_RATE: 'completion_rate',
    SUCCESS_RATE: 'success_rate',

    // Order Channel Metrics
    CHANNEL_ORDERS: 'channel_orders',
    CHANNEL_VALUE: 'channel_value',
    ONLINE_ORDERS: 'online_orders',
    OFFLINE_ORDERS: 'offline_orders',
    MOBILE_ORDERS: 'mobile_orders',
    DESKTOP_ORDERS: 'desktop_orders',

    // Order Comparison Metrics
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    WEEK_OVER_WEEK: 'week_over_week',
    PERIOD_COMPARISON: 'period_comparison',
  } as const,

  // Order Analytics Segments
  SEGMENTS: {
    // Status Segments
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    RETURNED: 'returned',

    // Channel Segments
    ONLINE: 'online',
    OFFLINE: 'offline',
    MOBILE: 'mobile',
    DESKTOP: 'desktop',

    // Customer Segments
    NEW: 'new',
    RETURNING: 'returning',
    LOYAL: 'loyal',
    VIP: 'vip',

    // Time Segments
    PEAK: 'peak',
    OFF_PEAK: 'off_peak',
    HOLIDAY: 'holiday',
    WEEKEND: 'weekend',
    WEEKDAY: 'weekday',

    // Delivery Segments
    ON_TIME: 'on_time',
    LATE: 'late',
    EARLY: 'early',
    FAILED: 'failed',
  } as const,

  // Order Analytics Cohorts
  COHORTS: {
    ORDER_DATE: 'order_date',
    ORDER_WEEK: 'order_week',
    ORDER_MONTH: 'order_month',
    CUSTOMER_TYPE: 'customer_type',
    CHANNEL: 'channel',
    LOCATION: 'location',
    PRODUCT_CATEGORY: 'product_category',
  } as const,

  // Order Analytics Granularity
  GRANULARITY: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,
} as const;

// Order Analytics Types
export type OrderAnalyticsType = (typeof ORDER_ANALYTICS.TYPES)[keyof typeof ORDER_ANALYTICS.TYPES];

// Order Analytics Status
export type OrderAnalyticsStatus =
  (typeof ORDER_ANALYTICS.STATUS)[keyof typeof ORDER_ANALYTICS.STATUS];

// Order Analytics Scopes
export type OrderAnalyticsScope =
  (typeof ORDER_ANALYTICS.SCOPES)[keyof typeof ORDER_ANALYTICS.SCOPES];

// Order Analytics Events
export type OrderAnalyticsEvent =
  (typeof ORDER_ANALYTICS.EVENTS)[keyof typeof ORDER_ANALYTICS.EVENTS];

// Order Analytics Dimensions
export type OrderAnalyticsDimension =
  (typeof ORDER_ANALYTICS.DIMENSIONS)[keyof typeof ORDER_ANALYTICS.DIMENSIONS];

// Order Analytics Metrics
export type OrderAnalyticsMetric =
  (typeof ORDER_ANALYTICS.METRICS)[keyof typeof ORDER_ANALYTICS.METRICS];

// Order Analytics Segments
export type OrderAnalyticsSegment =
  (typeof ORDER_ANALYTICS.SEGMENTS)[keyof typeof ORDER_ANALYTICS.SEGMENTS];

// Order Analytics Cohorts
export type OrderAnalyticsCohort =
  (typeof ORDER_ANALYTICS.COHORTS)[keyof typeof ORDER_ANALYTICS.COHORTS];

// Order Analytics Granularity
export type OrderAnalyticsGranularity =
  (typeof ORDER_ANALYTICS.GRANULARITY)[keyof typeof ORDER_ANALYTICS.GRANULARITY];

// Order Analytics Status Labels
export function getOrderAnalyticsStatusLabel(status: OrderAnalyticsStatus): string {
  const labels: Record<OrderAnalyticsStatus, string> = {
    [ORDER_ANALYTICS.STATUS.TRACKING]: 'Tracking',
    [ORDER_ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [ORDER_ANALYTICS.STATUS.ANALYZING]: 'Analyzing',
    [ORDER_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [ORDER_ANALYTICS.STATUS.FAILED]: 'Failed',
    [ORDER_ANALYTICS.STATUS.PAUSED]: 'Paused',
    [ORDER_ANALYTICS.STATUS.STOPPED]: 'Stopped',
    [ORDER_ANALYTICS.STATUS.UPDATING]: 'Updating',
    [ORDER_ANALYTICS.STATUS.REFRESHING]: 'Refreshing',
  };
  return labels[status] || 'Unknown';
}

// Order Analytics Event Labels
export function getOrderAnalyticsEventLabel(event: OrderAnalyticsEvent): string {
  const labels: Record<OrderAnalyticsEvent, string> = {
    [ORDER_ANALYTICS.EVENTS.ORDER_CREATED]: 'Order Created',
    [ORDER_ANALYTICS.EVENTS.ORDER_UPDATED]: 'Order Updated',
    [ORDER_ANALYTICS.EVENTS.ORDER_CONFIRMED]: 'Order Confirmed',
    [ORDER_ANALYTICS.EVENTS.ORDER_PROCESSING]: 'Order Processing',
    [ORDER_ANALYTICS.EVENTS.ORDER_SHIPPED]: 'Order Shipped',
    [ORDER_ANALYTICS.EVENTS.ORDER_DELIVERED]: 'Order Delivered',
    [ORDER_ANALYTICS.EVENTS.ORDER_COMPLETED]: 'Order Completed',
    [ORDER_ANALYTICS.EVENTS.ORDER_CANCELLED]: 'Order Cancelled',
    [ORDER_ANALYTICS.EVENTS.ORDER_RETURNED]: 'Order Returned',
    [ORDER_ANALYTICS.EVENTS.ORDER_REFUNDED]: 'Order Refunded',
    [ORDER_ANALYTICS.EVENTS.STATUS_CHANGED]: 'Status Changed',
    [ORDER_ANALYTICS.EVENTS.PRIORITY_CHANGED]: 'Priority Changed',
    [ORDER_ANALYTICS.EVENTS.ESCALATED]: 'Escalated',
    [ORDER_ANALYTICS.EVENTS.DEESCALATED]: 'De-escalated',
    [ORDER_ANALYTICS.EVENTS.FULFILLMENT_STARTED]: 'Fulfillment Started',
    [ORDER_ANALYTICS.EVENTS.FULFILLMENT_COMPLETED]: 'Fulfillment Completed',
    [ORDER_ANALYTICS.EVENTS.PICKING_STARTED]: 'Picking Started',
    [ORDER_ANALYTICS.EVENTS.PICKING_COMPLETED]: 'Picking Completed',
    [ORDER_ANALYTICS.EVENTS.PACKING_STARTED]: 'Packing Started',
    [ORDER_ANALYTICS.EVENTS.PACKING_COMPLETED]: 'Packing Completed',
    [ORDER_ANALYTICS.EVENTS.DISPATCHED]: 'Dispatched',
    [ORDER_ANALYTICS.EVENTS.IN_TRANSIT]: 'In Transit',
    [ORDER_ANALYTICS.EVENTS.OUT_FOR_DELIVERY]: 'Out for Delivery',
    [ORDER_ANALYTICS.EVENTS.DELIVERY_ATTEMPTED]: 'Delivery Attempted',
    [ORDER_ANALYTICS.EVENTS.DELIVERY_FAILED]: 'Delivery Failed',
    [ORDER_ANALYTICS.EVENTS.DELIVERY_SUCCESS]: 'Delivery Success',
    [ORDER_ANALYTICS.EVENTS.CUSTOMER_NOTIFIED]: 'Customer Notified',
    [ORDER_ANALYTICS.EVENTS.CUSTOMER_CONFIRMED]: 'Customer Confirmed',
    [ORDER_ANALYTICS.EVENTS.CUSTOMER_REVIEWED]: 'Customer Reviewed',
    [ORDER_ANALYTICS.EVENTS.CUSTOMER_COMPLAINED]: 'Customer Complained',
    [ORDER_ANALYTICS.EVENTS.QUALITY_CHECK]: 'Quality Check',
    [ORDER_ANALYTICS.EVENTS.QUALITY_PASSED]: 'Quality Passed',
    [ORDER_ANALYTICS.EVENTS.QUALITY_FAILED]: 'Quality Failed',
    [ORDER_ANALYTICS.EVENTS.INSPECTION]: 'Inspection',
    [ORDER_ANALYTICS.EVENTS.RETURN_REQUESTED]: 'Return Requested',
    [ORDER_ANALYTICS.EVENTS.RETURN_APPROVED]: 'Return Approved',
    [ORDER_ANALYTICS.EVENTS.RETURN_REJECTED]: 'Return Rejected',
    [ORDER_ANALYTICS.EVENTS.RETURN_RECEIVED]: 'Return Received',
    [ORDER_ANALYTICS.EVENTS.REFUND_PROCESSED]: 'Refund Processed',
  };
  return labels[event] || 'Unknown';
}

// Order Analytics Dimension Labels
export function getOrderAnalyticsDimensionLabel(dimension: OrderAnalyticsDimension): string {
  const labels: Record<OrderAnalyticsDimension, string> = {
    [ORDER_ANALYTICS.DIMENSIONS.ORDER_ID]: 'Order ID',
    [ORDER_ANALYTICS.DIMENSIONS.ORDER_DATE]: 'Order Date',
    [ORDER_ANALYTICS.DIMENSIONS.ORDER_STATUS]: 'Order Status',
    [ORDER_ANALYTICS.DIMENSIONS.ORDER_TYPE]: 'Order Type',
    [ORDER_ANALYTICS.DIMENSIONS.ORDER_PRIORITY]: 'Order Priority',
    [ORDER_ANALYTICS.DIMENSIONS.ORDER_CHANNEL]: 'Order Channel',
    [ORDER_ANALYTICS.DIMENSIONS.CUSTOMER_ID]: 'Customer ID',
    [ORDER_ANALYTICS.DIMENSIONS.CUSTOMER_NAME]: 'Customer Name',
    [ORDER_ANALYTICS.DIMENSIONS.CUSTOMER_TYPE]: 'Customer Type',
    [ORDER_ANALYTICS.DIMENSIONS.CUSTOMER_SEGMENT]: 'Customer Segment',
    [ORDER_ANALYTICS.DIMENSIONS.CUSTOMER_LOCATION]: 'Customer Location',
    [ORDER_ANALYTICS.DIMENSIONS.PRODUCT_ID]: 'Product ID',
    [ORDER_ANALYTICS.DIMENSIONS.PRODUCT_NAME]: 'Product Name',
    [ORDER_ANALYTICS.DIMENSIONS.PRODUCT_SKU]: 'Product SKU',
    [ORDER_ANALYTICS.DIMENSIONS.PRODUCT_CATEGORY]: 'Product Category',
    [ORDER_ANALYTICS.DIMENSIONS.PRODUCT_BRAND]: 'Product Brand',
    [ORDER_ANALYTICS.DIMENSIONS.SUBTOTAL]: 'Subtotal',
    [ORDER_ANALYTICS.DIMENSIONS.DISCOUNT]: 'Discount',
    [ORDER_ANALYTICS.DIMENSIONS.TAX]: 'Tax',
    [ORDER_ANALYTICS.DIMENSIONS.SHIPPING_COST]: 'Shipping Cost',
    [ORDER_ANALYTICS.DIMENSIONS.TOTAL_AMOUNT]: 'Total Amount',
    [ORDER_ANALYTICS.DIMENSIONS.CURRENCY]: 'Currency',
    [ORDER_ANALYTICS.DIMENSIONS.COUNTRY]: 'Country',
    [ORDER_ANALYTICS.DIMENSIONS.REGION]: 'Region',
    [ORDER_ANALYTICS.DIMENSIONS.CITY]: 'City',
    [ORDER_ANALYTICS.DIMENSIONS.STORE]: 'Store',
    [ORDER_ANALYTICS.DIMENSIONS.WAREHOUSE]: 'Warehouse',
    [ORDER_ANALYTICS.DIMENSIONS.DELIVERY_ADDRESS]: 'Delivery Address',
    [ORDER_ANALYTICS.DIMENSIONS.ORDER_DATE_TIME]: 'Order Date & Time',
    [ORDER_ANALYTICS.DIMENSIONS.ORDER_HOUR]: 'Order Hour',
    [ORDER_ANALYTICS.DIMENSIONS.ORDER_DAY]: 'Order Day',
    [ORDER_ANALYTICS.DIMENSIONS.ORDER_WEEK]: 'Order Week',
    [ORDER_ANALYTICS.DIMENSIONS.ORDER_MONTH]: 'Order Month',
    [ORDER_ANALYTICS.DIMENSIONS.ORDER_QUARTER]: 'Order Quarter',
    [ORDER_ANALYTICS.DIMENSIONS.ORDER_YEAR]: 'Order Year',
    [ORDER_ANALYTICS.DIMENSIONS.FULFILLMENT_TIME]: 'Fulfillment Time',
    [ORDER_ANALYTICS.DIMENSIONS.PICKING_TIME]: 'Picking Time',
    [ORDER_ANALYTICS.DIMENSIONS.PACKING_TIME]: 'Packing Time',
    [ORDER_ANALYTICS.DIMENSIONS.SHIPPING_METHOD]: 'Shipping Method',
    [ORDER_ANALYTICS.DIMENSIONS.DELIVERY_TIME]: 'Delivery Time',
    [ORDER_ANALYTICS.DIMENSIONS.DELIVERY_STATUS]: 'Delivery Status',
  };
  return labels[dimension] || 'Unknown';
}

// Order Analytics Segment Labels
export function getOrderAnalyticsSegmentLabel(segment: OrderAnalyticsSegment): string {
  const labels: Record<OrderAnalyticsSegment, string> = {
    [ORDER_ANALYTICS.SEGMENTS.PENDING]: 'Pending',
    [ORDER_ANALYTICS.SEGMENTS.PROCESSING]: 'Processing',
    [ORDER_ANALYTICS.SEGMENTS.SHIPPED]: 'Shipped',
    [ORDER_ANALYTICS.SEGMENTS.DELIVERED]: 'Delivered',
    [ORDER_ANALYTICS.SEGMENTS.COMPLETED]: 'Completed',
    [ORDER_ANALYTICS.SEGMENTS.CANCELLED]: 'Cancelled',
    [ORDER_ANALYTICS.SEGMENTS.RETURNED]: 'Returned',
    [ORDER_ANALYTICS.SEGMENTS.ONLINE]: 'Online',
    [ORDER_ANALYTICS.SEGMENTS.OFFLINE]: 'Offline',
    [ORDER_ANALYTICS.SEGMENTS.MOBILE]: 'Mobile',
    [ORDER_ANALYTICS.SEGMENTS.DESKTOP]: 'Desktop',
    [ORDER_ANALYTICS.SEGMENTS.NEW]: 'New',
    [ORDER_ANALYTICS.SEGMENTS.RETURNING]: 'Returning',
    [ORDER_ANALYTICS.SEGMENTS.LOYAL]: 'Loyal',
    [ORDER_ANALYTICS.SEGMENTS.VIP]: 'VIP',
    [ORDER_ANALYTICS.SEGMENTS.PEAK]: 'Peak',
    [ORDER_ANALYTICS.SEGMENTS.OFF_PEAK]: 'Off Peak',
    [ORDER_ANALYTICS.SEGMENTS.HOLIDAY]: 'Holiday',
    [ORDER_ANALYTICS.SEGMENTS.WEEKEND]: 'Weekend',
    [ORDER_ANALYTICS.SEGMENTS.WEEKDAY]: 'Weekday',
    [ORDER_ANALYTICS.SEGMENTS.ON_TIME]: 'On Time',
    [ORDER_ANALYTICS.SEGMENTS.LATE]: 'Late',
    [ORDER_ANALYTICS.SEGMENTS.EARLY]: 'Early',
    [ORDER_ANALYTICS.SEGMENTS.FAILED]: 'Failed',
  };
  return labels[segment] || 'Unknown';
}

// Order Analytics Cohort Labels
export function getOrderAnalyticsCohortLabel(cohort: OrderAnalyticsCohort): string {
  const labels: Record<OrderAnalyticsCohort, string> = {
    [ORDER_ANALYTICS.COHORTS.ORDER_DATE]: 'Order Date',
    [ORDER_ANALYTICS.COHORTS.ORDER_WEEK]: 'Order Week',
    [ORDER_ANALYTICS.COHORTS.ORDER_MONTH]: 'Order Month',
    [ORDER_ANALYTICS.COHORTS.CUSTOMER_TYPE]: 'Customer Type',
    [ORDER_ANALYTICS.COHORTS.CHANNEL]: 'Channel',
    [ORDER_ANALYTICS.COHORTS.LOCATION]: 'Location',
    [ORDER_ANALYTICS.COHORTS.PRODUCT_CATEGORY]: 'Product Category',
  };
  return labels[cohort] || 'Unknown';
}

// Order Analytics Granularity Labels
export function getOrderAnalyticsGranularityLabel(granularity: OrderAnalyticsGranularity): string {
  const labels: Record<OrderAnalyticsGranularity, string> = {
    [ORDER_ANALYTICS.GRANULARITY.HOURLY]: 'Hourly',
    [ORDER_ANALYTICS.GRANULARITY.DAILY]: 'Daily',
    [ORDER_ANALYTICS.GRANULARITY.WEEKLY]: 'Weekly',
    [ORDER_ANALYTICS.GRANULARITY.MONTHLY]: 'Monthly',
    [ORDER_ANALYTICS.GRANULARITY.QUARTERLY]: 'Quarterly',
    [ORDER_ANALYTICS.GRANULARITY.YEARLY]: 'Yearly',
  };
  return labels[granularity] || 'Unknown';
}

// Check if order analytics is active
export function isOrderAnalyticsActive(status: OrderAnalyticsStatus): boolean {
  const activeStatuses: OrderAnalyticsStatus[] = [
    ORDER_ANALYTICS.STATUS.TRACKING,
    ORDER_ANALYTICS.STATUS.PROCESSING,
    ORDER_ANALYTICS.STATUS.ANALYZING,
    ORDER_ANALYTICS.STATUS.UPDATING,
    ORDER_ANALYTICS.STATUS.REFRESHING,
  ];
  return activeStatuses.includes(status);
}

// Check if order analytics is completed
export function isOrderAnalyticsCompleted(status: OrderAnalyticsStatus): boolean {
  return status === ORDER_ANALYTICS.STATUS.COMPLETED;
}

// Check if order analytics has failed
export function isOrderAnalyticsFailed(status: OrderAnalyticsStatus): boolean {
  return status === ORDER_ANALYTICS.STATUS.FAILED;
}

// Check if event is order lifecycle event
export function isOrderAnalyticsLifecycleEvent(event: OrderAnalyticsEvent): boolean {
  const lifecycleEvents: OrderAnalyticsEvent[] = [
    ORDER_ANALYTICS.EVENTS.ORDER_CREATED,
    ORDER_ANALYTICS.EVENTS.ORDER_UPDATED,
    ORDER_ANALYTICS.EVENTS.ORDER_CONFIRMED,
    ORDER_ANALYTICS.EVENTS.ORDER_PROCESSING,
    ORDER_ANALYTICS.EVENTS.ORDER_SHIPPED,
    ORDER_ANALYTICS.EVENTS.ORDER_DELIVERED,
    ORDER_ANALYTICS.EVENTS.ORDER_COMPLETED,
    ORDER_ANALYTICS.EVENTS.ORDER_CANCELLED,
    ORDER_ANALYTICS.EVENTS.ORDER_RETURNED,
    ORDER_ANALYTICS.EVENTS.ORDER_REFUNDED,
  ];
  return lifecycleEvents.includes(event);
}

// Check if event is fulfillment event
export function isOrderAnalyticsFulfillmentEvent(event: OrderAnalyticsEvent): boolean {
  const fulfillmentEvents: OrderAnalyticsEvent[] = [
    ORDER_ANALYTICS.EVENTS.FULFILLMENT_STARTED,
    ORDER_ANALYTICS.EVENTS.FULFILLMENT_COMPLETED,
    ORDER_ANALYTICS.EVENTS.PICKING_STARTED,
    ORDER_ANALYTICS.EVENTS.PICKING_COMPLETED,
    ORDER_ANALYTICS.EVENTS.PACKING_STARTED,
    ORDER_ANALYTICS.EVENTS.PACKING_COMPLETED,
  ];
  return fulfillmentEvents.includes(event);
}

// Check if event is delivery event
export function isOrderAnalyticsDeliveryEvent(event: OrderAnalyticsEvent): boolean {
  const deliveryEvents: OrderAnalyticsEvent[] = [
    ORDER_ANALYTICS.EVENTS.DISPATCHED,
    ORDER_ANALYTICS.EVENTS.IN_TRANSIT,
    ORDER_ANALYTICS.EVENTS.OUT_FOR_DELIVERY,
    ORDER_ANALYTICS.EVENTS.DELIVERY_ATTEMPTED,
    ORDER_ANALYTICS.EVENTS.DELIVERY_FAILED,
    ORDER_ANALYTICS.EVENTS.DELIVERY_SUCCESS,
  ];
  return deliveryEvents.includes(event);
}

// Check if event is return event
export function isOrderAnalyticsReturnEvent(event: OrderAnalyticsEvent): boolean {
  const returnEvents: OrderAnalyticsEvent[] = [
    ORDER_ANALYTICS.EVENTS.RETURN_REQUESTED,
    ORDER_ANALYTICS.EVENTS.RETURN_APPROVED,
    ORDER_ANALYTICS.EVENTS.RETURN_REJECTED,
    ORDER_ANALYTICS.EVENTS.RETURN_RECEIVED,
    ORDER_ANALYTICS.EVENTS.REFUND_PROCESSED,
  ];
  return returnEvents.includes(event);
}
