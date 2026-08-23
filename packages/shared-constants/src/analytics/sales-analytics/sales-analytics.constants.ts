/**
 * Sales Analytics Constants
 * Configuration for sales performance analytics and tracking
 */

export const SALES_ANALYTICS = {
  // Sales Analytics Types
  TYPES: {
    // Performance Analytics
    PERFORMANCE: 'performance',
    REVENUE: 'revenue',
    PROFIT: 'profit',
    MARGIN: 'margin',
    GROWTH: 'growth',

    // Sales Metrics
    SALES: 'sales',
    ORDERS: 'orders',
    UNITS: 'units',
    AOV: 'aov',

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
    SEASONAL: 'seasonal',
  } as const,

  // Sales Analytics Status
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

  // Sales Analytics Scopes
  SCOPES: {
    INDIVIDUAL: 'individual',
    CHANNEL: 'channel',
    REGION: 'region',
    CATEGORY: 'category',
    BRAND: 'brand',
    VENDOR: 'vendor',
    PRODUCT: 'product',
    ALL_SALES: 'all_sales',
    TOP_SALES: 'top_sales',
    RECENT_SALES: 'recent_sales',
    COMPARATIVE: 'comparative',
  } as const,

  // Sales Analytics Events
  EVENTS: {
    // Sales Transaction Events
    SALE_CREATED: 'sale_created',
    SALE_UPDATED: 'sale_updated',
    SALE_COMPLETED: 'sale_completed',
    SALE_CANCELLED: 'sale_cancelled',
    SALE_REFUNDED: 'sale_refunded',

    // Order Events
    ORDER_PLACED: 'order_placed',
    ORDER_CONFIRMED: 'order_confirmed',
    ORDER_SHIPPED: 'order_shipped',
    ORDER_DELIVERED: 'order_delivered',
    ORDER_RETURNED: 'order_returned',

    // Payment Events
    PAYMENT_RECEIVED: 'payment_received',
    PAYMENT_PROCESSED: 'payment_processed',
    PAYMENT_FAILED: 'payment_failed',
    PAYMENT_REFUNDED: 'payment_refunded',

    // Sales Performance Events
    SALES_TARGET_MET: 'sales_target_met',
    SALES_TARGET_EXCEEDED: 'sales_target_exceeded',
    SALES_TARGET_MISSED: 'sales_target_missed',
    MILESTONE_ACHIEVED: 'milestone_achieved',

    // Sales Channel Events
    CHANNEL_SALE: 'channel_sale',
    ONLINE_SALE: 'online_sale',
    OFFLINE_SALE: 'offline_sale',
    CROSS_CHANNEL: 'cross_channel',

    // Sales Promotional Events
    PROMOTION_APPLIED: 'promotion_applied',
    DISCOUNT_APPLIED: 'discount_applied',
    COUPON_USED: 'coupon_used',
    BULK_DISCOUNT: 'bulk_discount',
    SEASONAL_PROMOTION: 'seasonal_promotion',
  } as const,

  // Sales Analytics Dimensions
  DIMENSIONS: {
    // Sales Order Attributes
    ORDER_ID: 'order_id',
    ORDER_DATE: 'order_date',
    ORDER_STATUS: 'order_status',
    ORDER_TYPE: 'order_type',
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
    PRODUCT_VENDOR: 'product_vendor',

    // Price Attributes
    PRICE: 'price',
    DISCOUNT: 'discount',
    TAX: 'tax',
    SHIPPING: 'shipping',
    TOTAL_AMOUNT: 'total_amount',
    CURRENCY: 'currency',

    // Location Attributes
    COUNTRY: 'country',
    REGION: 'region',
    CITY: 'city',
    STORE: 'store',
    WAREHOUSE: 'warehouse',

    // Time Attributes
    SALE_DATE: 'sale_date',
    SALE_HOUR: 'sale_hour',
    SALE_DAY: 'sale_day',
    SALE_WEEK: 'sale_week',
    SALE_MONTH: 'sale_month',
    SALE_QUARTER: 'sale_quarter',
    SALE_YEAR: 'sale_year',

    // Sales Channel Attributes
    CHANNEL: 'channel',
    SOURCE: 'source',
    MEDIUM: 'medium',
    CAMPAIGN: 'campaign',
    REFERRER: 'referrer',
  } as const,

  // Sales Analytics Metrics
  METRICS: {
    // Sales Count Metrics
    TOTAL_SALES: 'total_sales',
    TOTAL_ORDERS: 'total_orders',
    UNITS_SOLD: 'units_sold',
    ITEMS_SOLD: 'items_sold',
    CUSTOMERS_SERVED: 'customers_served',

    // Sales Revenue Metrics
    TOTAL_REVENUE: 'total_revenue',
    NET_REVENUE: 'net_revenue',
    GROSS_REVENUE: 'gross_revenue',
    AVG_ORDER_VALUE: 'avg_order_value',
    AVG_ITEM_VALUE: 'avg_item_value',

    // Sales Growth Metrics
    SALES_GROWTH: 'sales_growth',
    REVENUE_GROWTH: 'revenue_growth',
    ORDER_GROWTH: 'order_growth',
    UNIT_GROWTH: 'unit_growth',

    // Sales Performance Metrics
    CONVERSION_RATE: 'conversion_rate',
    REPEAT_PURCHASE_RATE: 'repeat_purchase_rate',
    CUSTOMER_RETENTION_RATE: 'customer_retention_rate',
    CHURN_RATE: 'churn_rate',

    // Sales Profit Metrics
    TOTAL_PROFIT: 'total_profit',
    GROSS_PROFIT: 'gross_profit',
    NET_PROFIT: 'net_profit',
    PROFIT_MARGIN: 'profit_margin',
    GROSS_MARGIN: 'gross_margin',
    NET_MARGIN: 'net_margin',

    // Sales Efficiency Metrics
    SALES_PER_DAY: 'sales_per_day',
    SALES_PER_WEEK: 'sales_per_week',
    SALES_PER_MONTH: 'sales_per_month',
    SALES_PER_CUSTOMER: 'sales_per_customer',
    SALES_PER_PRODUCT: 'sales_per_product',

    // Sales Channel Metrics
    CHANNEL_REVENUE: 'channel_revenue',
    CHANNEL_ORDERS: 'channel_orders',
    CHANNEL_CONVERSION: 'channel_conversion',
    ONLINE_SALES: 'online_sales',
    OFFLINE_SALES: 'offline_sales',

    // Sales Comparison Metrics
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    WEEK_OVER_WEEK: 'week_over_week',
    PERIOD_COMPARISON: 'period_comparison',
  } as const,

  // Sales Analytics Segments
  SEGMENTS: {
    // Channel Segments
    ONLINE: 'online',
    OFFLINE: 'offline',
    MOBILE: 'mobile',
    DESKTOP: 'desktop',
    INSTORE: 'instore',

    // Customer Segments
    NEW: 'new',
    RETURNING: 'returning',
    LOYAL: 'loyal',
    VIP: 'vip',
    HIGH_VALUE: 'high_value',

    // Product Segments
    BESTSELLER: 'bestseller',
    HIGH_MARGIN: 'high_margin',
    LOW_MARGIN: 'low_margin',
    DISCOUNTED: 'discounted',
    PREMIUM: 'premium',

    // Region Segments
    URBAN: 'urban',
    RURAL: 'rural',
    DOMESTIC: 'domestic',
    INTERNATIONAL: 'international',

    // Time Segments
    PEAK: 'peak',
    OFF_PEAK: 'off_peak',
    HOLIDAY: 'holiday',
    WEEKEND: 'weekend',
    WEEKDAY: 'weekday',
    SEASONAL: 'seasonal',
  } as const,

  // Sales Analytics Cohorts
  COHORTS: {
    FIRST_PURCHASE: 'first_purchase',
    ACQUISITION_CHANNEL: 'acquisition_channel',
    CUSTOMER_TYPE: 'customer_type',
    PRODUCT_CATEGORY: 'product_category',
    PRICE_RANGE: 'price_range',
    LOCATION: 'location',
  } as const,

  // Sales Analytics Granularity
  GRANULARITY: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,
} as const;

// Sales Analytics Types
export type SalesAnalyticsType = (typeof SALES_ANALYTICS.TYPES)[keyof typeof SALES_ANALYTICS.TYPES];

// Sales Analytics Status
export type SalesAnalyticsStatus =
  (typeof SALES_ANALYTICS.STATUS)[keyof typeof SALES_ANALYTICS.STATUS];

// Sales Analytics Scopes
export type SalesAnalyticsScope =
  (typeof SALES_ANALYTICS.SCOPES)[keyof typeof SALES_ANALYTICS.SCOPES];

// Sales Analytics Events
export type SalesAnalyticsEvent =
  (typeof SALES_ANALYTICS.EVENTS)[keyof typeof SALES_ANALYTICS.EVENTS];

// Sales Analytics Dimensions
export type SalesAnalyticsDimension =
  (typeof SALES_ANALYTICS.DIMENSIONS)[keyof typeof SALES_ANALYTICS.DIMENSIONS];

// Sales Analytics Metrics
export type SalesAnalyticsMetric =
  (typeof SALES_ANALYTICS.METRICS)[keyof typeof SALES_ANALYTICS.METRICS];

// Sales Analytics Segments
export type SalesAnalyticsSegment =
  (typeof SALES_ANALYTICS.SEGMENTS)[keyof typeof SALES_ANALYTICS.SEGMENTS];

// Sales Analytics Cohorts
export type SalesAnalyticsCohort =
  (typeof SALES_ANALYTICS.COHORTS)[keyof typeof SALES_ANALYTICS.COHORTS];

// Sales Analytics Granularity
export type SalesAnalyticsGranularity =
  (typeof SALES_ANALYTICS.GRANULARITY)[keyof typeof SALES_ANALYTICS.GRANULARITY];

// Sales Analytics Status Labels
export function getSalesAnalyticsStatusLabel(status: SalesAnalyticsStatus): string {
  const labels: Record<SalesAnalyticsStatus, string> = {
    [SALES_ANALYTICS.STATUS.TRACKING]: 'Tracking',
    [SALES_ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [SALES_ANALYTICS.STATUS.ANALYZING]: 'Analyzing',
    [SALES_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [SALES_ANALYTICS.STATUS.FAILED]: 'Failed',
    [SALES_ANALYTICS.STATUS.PAUSED]: 'Paused',
    [SALES_ANALYTICS.STATUS.STOPPED]: 'Stopped',
    [SALES_ANALYTICS.STATUS.UPDATING]: 'Updating',
    [SALES_ANALYTICS.STATUS.REFRESHING]: 'Refreshing',
  };
  return labels[status] || 'Unknown';
}

// Sales Analytics Event Labels
export function getSalesAnalyticsEventLabel(event: SalesAnalyticsEvent): string {
  const labels: Record<SalesAnalyticsEvent, string> = {
    [SALES_ANALYTICS.EVENTS.SALE_CREATED]: 'Sale Created',
    [SALES_ANALYTICS.EVENTS.SALE_UPDATED]: 'Sale Updated',
    [SALES_ANALYTICS.EVENTS.SALE_COMPLETED]: 'Sale Completed',
    [SALES_ANALYTICS.EVENTS.SALE_CANCELLED]: 'Sale Cancelled',
    [SALES_ANALYTICS.EVENTS.SALE_REFUNDED]: 'Sale Refunded',
    [SALES_ANALYTICS.EVENTS.ORDER_PLACED]: 'Order Placed',
    [SALES_ANALYTICS.EVENTS.ORDER_CONFIRMED]: 'Order Confirmed',
    [SALES_ANALYTICS.EVENTS.ORDER_SHIPPED]: 'Order Shipped',
    [SALES_ANALYTICS.EVENTS.ORDER_DELIVERED]: 'Order Delivered',
    [SALES_ANALYTICS.EVENTS.ORDER_RETURNED]: 'Order Returned',
    [SALES_ANALYTICS.EVENTS.PAYMENT_RECEIVED]: 'Payment Received',
    [SALES_ANALYTICS.EVENTS.PAYMENT_PROCESSED]: 'Payment Processed',
    [SALES_ANALYTICS.EVENTS.PAYMENT_FAILED]: 'Payment Failed',
    [SALES_ANALYTICS.EVENTS.PAYMENT_REFUNDED]: 'Payment Refunded',
    [SALES_ANALYTICS.EVENTS.SALES_TARGET_MET]: 'Sales Target Met',
    [SALES_ANALYTICS.EVENTS.SALES_TARGET_EXCEEDED]: 'Sales Target Exceeded',
    [SALES_ANALYTICS.EVENTS.SALES_TARGET_MISSED]: 'Sales Target Missed',
    [SALES_ANALYTICS.EVENTS.MILESTONE_ACHIEVED]: 'Milestone Achieved',
    [SALES_ANALYTICS.EVENTS.CHANNEL_SALE]: 'Channel Sale',
    [SALES_ANALYTICS.EVENTS.ONLINE_SALE]: 'Online Sale',
    [SALES_ANALYTICS.EVENTS.OFFLINE_SALE]: 'Offline Sale',
    [SALES_ANALYTICS.EVENTS.CROSS_CHANNEL]: 'Cross Channel',
    [SALES_ANALYTICS.EVENTS.PROMOTION_APPLIED]: 'Promotion Applied',
    [SALES_ANALYTICS.EVENTS.DISCOUNT_APPLIED]: 'Discount Applied',
    [SALES_ANALYTICS.EVENTS.COUPON_USED]: 'Coupon Used',
    [SALES_ANALYTICS.EVENTS.BULK_DISCOUNT]: 'Bulk Discount',
    [SALES_ANALYTICS.EVENTS.SEASONAL_PROMOTION]: 'Seasonal Promotion',
  };
  return labels[event] || 'Unknown';
}

// Sales Analytics Dimension Labels
export function getSalesAnalyticsDimensionLabel(dimension: SalesAnalyticsDimension): string {
  const labels: Record<SalesAnalyticsDimension, string> = {
    [SALES_ANALYTICS.DIMENSIONS.ORDER_ID]: 'Order ID',
    [SALES_ANALYTICS.DIMENSIONS.ORDER_DATE]: 'Order Date',
    [SALES_ANALYTICS.DIMENSIONS.ORDER_STATUS]: 'Order Status',
    [SALES_ANALYTICS.DIMENSIONS.ORDER_TYPE]: 'Order Type',
    [SALES_ANALYTICS.DIMENSIONS.ORDER_CHANNEL]: 'Order Channel',
    [SALES_ANALYTICS.DIMENSIONS.CUSTOMER_ID]: 'Customer ID',
    [SALES_ANALYTICS.DIMENSIONS.CUSTOMER_NAME]: 'Customer Name',
    [SALES_ANALYTICS.DIMENSIONS.CUSTOMER_TYPE]: 'Customer Type',
    [SALES_ANALYTICS.DIMENSIONS.CUSTOMER_SEGMENT]: 'Customer Segment',
    [SALES_ANALYTICS.DIMENSIONS.CUSTOMER_LOCATION]: 'Customer Location',
    [SALES_ANALYTICS.DIMENSIONS.PRODUCT_ID]: 'Product ID',
    [SALES_ANALYTICS.DIMENSIONS.PRODUCT_NAME]: 'Product Name',
    [SALES_ANALYTICS.DIMENSIONS.PRODUCT_SKU]: 'Product SKU',
    [SALES_ANALYTICS.DIMENSIONS.PRODUCT_CATEGORY]: 'Product Category',
    [SALES_ANALYTICS.DIMENSIONS.PRODUCT_BRAND]: 'Product Brand',
    [SALES_ANALYTICS.DIMENSIONS.PRODUCT_VENDOR]: 'Product Vendor',
    [SALES_ANALYTICS.DIMENSIONS.PRICE]: 'Price',
    [SALES_ANALYTICS.DIMENSIONS.DISCOUNT]: 'Discount',
    [SALES_ANALYTICS.DIMENSIONS.TAX]: 'Tax',
    [SALES_ANALYTICS.DIMENSIONS.SHIPPING]: 'Shipping',
    [SALES_ANALYTICS.DIMENSIONS.TOTAL_AMOUNT]: 'Total Amount',
    [SALES_ANALYTICS.DIMENSIONS.CURRENCY]: 'Currency',
    [SALES_ANALYTICS.DIMENSIONS.COUNTRY]: 'Country',
    [SALES_ANALYTICS.DIMENSIONS.REGION]: 'Region',
    [SALES_ANALYTICS.DIMENSIONS.CITY]: 'City',
    [SALES_ANALYTICS.DIMENSIONS.STORE]: 'Store',
    [SALES_ANALYTICS.DIMENSIONS.WAREHOUSE]: 'Warehouse',
    [SALES_ANALYTICS.DIMENSIONS.SALE_DATE]: 'Sale Date',
    [SALES_ANALYTICS.DIMENSIONS.SALE_HOUR]: 'Sale Hour',
    [SALES_ANALYTICS.DIMENSIONS.SALE_DAY]: 'Sale Day',
    [SALES_ANALYTICS.DIMENSIONS.SALE_WEEK]: 'Sale Week',
    [SALES_ANALYTICS.DIMENSIONS.SALE_MONTH]: 'Sale Month',
    [SALES_ANALYTICS.DIMENSIONS.SALE_QUARTER]: 'Sale Quarter',
    [SALES_ANALYTICS.DIMENSIONS.SALE_YEAR]: 'Sale Year',
    [SALES_ANALYTICS.DIMENSIONS.CHANNEL]: 'Channel',
    [SALES_ANALYTICS.DIMENSIONS.SOURCE]: 'Source',
    [SALES_ANALYTICS.DIMENSIONS.MEDIUM]: 'Medium',
    [SALES_ANALYTICS.DIMENSIONS.CAMPAIGN]: 'Campaign',
    [SALES_ANALYTICS.DIMENSIONS.REFERRER]: 'Referrer',
  };
  return labels[dimension] || 'Unknown';
}

// Sales Analytics Segment Labels
export function getSalesAnalyticsSegmentLabel(segment: SalesAnalyticsSegment): string {
  const labels: Record<SalesAnalyticsSegment, string> = {
    [SALES_ANALYTICS.SEGMENTS.ONLINE]: 'Online',
    [SALES_ANALYTICS.SEGMENTS.OFFLINE]: 'Offline',
    [SALES_ANALYTICS.SEGMENTS.MOBILE]: 'Mobile',
    [SALES_ANALYTICS.SEGMENTS.DESKTOP]: 'Desktop',
    [SALES_ANALYTICS.SEGMENTS.INSTORE]: 'In-store',
    [SALES_ANALYTICS.SEGMENTS.NEW]: 'New',
    [SALES_ANALYTICS.SEGMENTS.RETURNING]: 'Returning',
    [SALES_ANALYTICS.SEGMENTS.LOYAL]: 'Loyal',
    [SALES_ANALYTICS.SEGMENTS.VIP]: 'VIP',
    [SALES_ANALYTICS.SEGMENTS.HIGH_VALUE]: 'High Value',
    [SALES_ANALYTICS.SEGMENTS.BESTSELLER]: 'Bestseller',
    [SALES_ANALYTICS.SEGMENTS.HIGH_MARGIN]: 'High Margin',
    [SALES_ANALYTICS.SEGMENTS.LOW_MARGIN]: 'Low Margin',
    [SALES_ANALYTICS.SEGMENTS.DISCOUNTED]: 'Discounted',
    [SALES_ANALYTICS.SEGMENTS.PREMIUM]: 'Premium',
    [SALES_ANALYTICS.SEGMENTS.URBAN]: 'Urban',
    [SALES_ANALYTICS.SEGMENTS.RURAL]: 'Rural',
    [SALES_ANALYTICS.SEGMENTS.DOMESTIC]: 'Domestic',
    [SALES_ANALYTICS.SEGMENTS.INTERNATIONAL]: 'International',
    [SALES_ANALYTICS.SEGMENTS.PEAK]: 'Peak',
    [SALES_ANALYTICS.SEGMENTS.OFF_PEAK]: 'Off Peak',
    [SALES_ANALYTICS.SEGMENTS.HOLIDAY]: 'Holiday',
    [SALES_ANALYTICS.SEGMENTS.WEEKEND]: 'Weekend',
    [SALES_ANALYTICS.SEGMENTS.WEEKDAY]: 'Weekday',
    [SALES_ANALYTICS.SEGMENTS.SEASONAL]: 'Seasonal',
  };
  return labels[segment] || 'Unknown';
}

// Sales Analytics Cohort Labels
export function getSalesAnalyticsCohortLabel(cohort: SalesAnalyticsCohort): string {
  const labels: Record<SalesAnalyticsCohort, string> = {
    [SALES_ANALYTICS.COHORTS.FIRST_PURCHASE]: 'First Purchase',
    [SALES_ANALYTICS.COHORTS.ACQUISITION_CHANNEL]: 'Acquisition Channel',
    [SALES_ANALYTICS.COHORTS.CUSTOMER_TYPE]: 'Customer Type',
    [SALES_ANALYTICS.COHORTS.PRODUCT_CATEGORY]: 'Product Category',
    [SALES_ANALYTICS.COHORTS.PRICE_RANGE]: 'Price Range',
    [SALES_ANALYTICS.COHORTS.LOCATION]: 'Location',
  };
  return labels[cohort] || 'Unknown';
}

// Sales Analytics Granularity Labels
export function getSalesAnalyticsGranularityLabel(granularity: SalesAnalyticsGranularity): string {
  const labels: Record<SalesAnalyticsGranularity, string> = {
    [SALES_ANALYTICS.GRANULARITY.HOURLY]: 'Hourly',
    [SALES_ANALYTICS.GRANULARITY.DAILY]: 'Daily',
    [SALES_ANALYTICS.GRANULARITY.WEEKLY]: 'Weekly',
    [SALES_ANALYTICS.GRANULARITY.MONTHLY]: 'Monthly',
    [SALES_ANALYTICS.GRANULARITY.QUARTERLY]: 'Quarterly',
    [SALES_ANALYTICS.GRANULARITY.YEARLY]: 'Yearly',
  };
  return labels[granularity] || 'Unknown';
}

// Check if sales analytics is active
export function isSalesAnalyticsActive(status: SalesAnalyticsStatus): boolean {
  const activeStatuses: SalesAnalyticsStatus[] = [
    SALES_ANALYTICS.STATUS.TRACKING,
    SALES_ANALYTICS.STATUS.PROCESSING,
    SALES_ANALYTICS.STATUS.ANALYZING,
    SALES_ANALYTICS.STATUS.UPDATING,
    SALES_ANALYTICS.STATUS.REFRESHING,
  ];
  return activeStatuses.includes(status);
}

// Check if sales analytics is completed
export function isSalesAnalyticsCompleted(status: SalesAnalyticsStatus): boolean {
  return status === SALES_ANALYTICS.STATUS.COMPLETED;
}

// Check if sales analytics has failed
export function isSalesAnalyticsFailed(status: SalesAnalyticsStatus): boolean {
  return status === SALES_ANALYTICS.STATUS.FAILED;
}

// Check if event is sale transaction event
export function isSalesAnalyticsTransactionEvent(event: SalesAnalyticsEvent): boolean {
  const transactionEvents: SalesAnalyticsEvent[] = [
    SALES_ANALYTICS.EVENTS.SALE_CREATED,
    SALES_ANALYTICS.EVENTS.SALE_UPDATED,
    SALES_ANALYTICS.EVENTS.SALE_COMPLETED,
    SALES_ANALYTICS.EVENTS.SALE_CANCELLED,
    SALES_ANALYTICS.EVENTS.SALE_REFUNDED,
  ];
  return transactionEvents.includes(event);
}

// Check if event is order event
export function isSalesAnalyticsOrderEvent(event: SalesAnalyticsEvent): boolean {
  const orderEvents: SalesAnalyticsEvent[] = [
    SALES_ANALYTICS.EVENTS.ORDER_PLACED,
    SALES_ANALYTICS.EVENTS.ORDER_CONFIRMED,
    SALES_ANALYTICS.EVENTS.ORDER_SHIPPED,
    SALES_ANALYTICS.EVENTS.ORDER_DELIVERED,
    SALES_ANALYTICS.EVENTS.ORDER_RETURNED,
  ];
  return orderEvents.includes(event);
}

// Check if event is payment event
export function isSalesAnalyticsPaymentEvent(event: SalesAnalyticsEvent): boolean {
  const paymentEvents: SalesAnalyticsEvent[] = [
    SALES_ANALYTICS.EVENTS.PAYMENT_RECEIVED,
    SALES_ANALYTICS.EVENTS.PAYMENT_PROCESSED,
    SALES_ANALYTICS.EVENTS.PAYMENT_FAILED,
    SALES_ANALYTICS.EVENTS.PAYMENT_REFUNDED,
  ];
  return paymentEvents.includes(event);
}

// Check if event is promotion event
export function isSalesAnalyticsPromotionEvent(event: SalesAnalyticsEvent): boolean {
  const promotionEvents: SalesAnalyticsEvent[] = [
    SALES_ANALYTICS.EVENTS.PROMOTION_APPLIED,
    SALES_ANALYTICS.EVENTS.DISCOUNT_APPLIED,
    SALES_ANALYTICS.EVENTS.COUPON_USED,
    SALES_ANALYTICS.EVENTS.BULK_DISCOUNT,
    SALES_ANALYTICS.EVENTS.SEASONAL_PROMOTION,
  ];
  return promotionEvents.includes(event);
}
