/**
 * Flash Sale Analytics Constants
 * Configuration for flash sale analytics and metrics
 */

export const FLASH_SALE_ANALYTICS = {
  // Analytics Types
  TYPES: {
    PERFORMANCE: 'performance',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    REVENUE: 'revenue',
    INVENTORY: 'inventory',
    CUSTOMER: 'customer',
    PRODUCT: 'product',
    TIME: 'time',
    GEOGRAPHIC: 'geographic',
    COMPARATIVE: 'comparative',
  },

  // Analytics Metrics
  METRICS: {
    // Performance Metrics
    TOTAL_VIEWS: 'total_views',
    UNIQUE_VIEWERS: 'unique_viewers',
    CLICK_THROUGH_RATE: 'click_through_rate',
    BOUNCE_RATE: 'bounce_rate',
    TIME_ON_PAGE: 'time_on_page',

    // Engagement Metrics
    TOTAL_PARTICIPANTS: 'total_participants',
    ACTIVE_PARTICIPANTS: 'active_participants',
    ENGAGEMENT_RATE: 'engagement_rate',
    AVERAGE_SESSION_DURATION: 'average_session_duration',
    INTERACTION_COUNT: 'interaction_count',

    // Conversion Metrics
    TOTAL_ORDERS: 'total_orders',
    CONVERSION_RATE: 'conversion_rate',
    AVERAGE_ORDER_VALUE: 'average_order_value',
    TOTAL_REVENUE: 'total_revenue',
    REVENUE_PER_PARTICIPANT: 'revenue_per_participant',

    // Inventory Metrics
    TOTAL_PRODUCTS: 'total_products',
    SOLD_PRODUCTS: 'sold_products',
    UNSOLD_PRODUCTS: 'unsold_products',
    INVENTORY_TURNOVER: 'inventory_turnover',
    SELL_THROUGH_RATE: 'sell_through_rate',

    // Customer Metrics
    NEW_CUSTOMERS: 'new_customers',
    RETURNING_CUSTOMERS: 'returning_customers',
    CUSTOMER_ACQUISITION_COST: 'customer_acquisition_cost',
    CUSTOMER_LIFETIME_VALUE: 'customer_lifetime_value',
    CUSTOMER_SATISFACTION: 'customer_satisfaction',

    // Product Metrics
    TOP_SELLING_PRODUCTS: 'top_selling_products',
    PRODUCT_PERFORMANCE: 'product_performance',
    PRODUCT_VIEWS: 'product_views',
    PRODUCT_ADD_TO_CART: 'product_add_to_cart',
    PRODUCT_CHECKOUT: 'product_checkout',

    // Time Metrics
    PEAK_HOURS: 'peak_hours',
    TIME_TO_SELL: 'time_to_sell',
    AVERAGE_RESPONSE_TIME: 'average_response_time',
    SALE_DURATION: 'sale_duration',

    // Geographic Metrics
    TOP_REGIONS: 'top_regions',
    TOP_CITIES: 'top_cities',
    INTERNATIONAL_SALES: 'international_sales',
    LOCAL_SALES: 'local_sales',
  },

  // Analytics Periods
  PERIODS: {
    LAST_HOUR: 'last_hour',
    LAST_6_HOURS: 'last_6_hours',
    LAST_12_HOURS: 'last_12_hours',
    LAST_24_HOURS: 'last_24_hours',
    LAST_7_DAYS: 'last_7_days',
    LAST_30_DAYS: 'last_30_days',
    LAST_90_DAYS: 'last_90_days',
    CUSTOM: 'custom',
  },

  // Analytics Intervals
  INTERVALS: {
    MINUTE: 'minute',
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
  },

  // Analytics Aggregations
  AGGREGATIONS: {
    SUM: 'sum',
    AVG: 'avg',
    MIN: 'min',
    MAX: 'max',
    COUNT: 'count',
    DISTINCT: 'distinct',
    MEDIAN: 'median',
    PERCENTILE: 'percentile',
    RATE: 'rate',
    PERCENTAGE: 'percentage',
  },

  // Analytics Dimensions
  DIMENSIONS: {
    TIME: 'time',
    PRODUCT: 'product',
    CATEGORY: 'category',
    CUSTOMER: 'customer',
    LOCATION: 'location',
    DEVICE: 'device',
    CHANNEL: 'channel',
    SEGMENT: 'segment',
    PRICE_RANGE: 'price_range',
  },

  // Analytics Defaults
  DEFAULTS: {
    PERIOD: 'last_24_hours',
    INTERVAL: 'hour',
    AGGREGATION: 'sum',
    DIMENSION: 'time',
    LIMIT: 100,
    OFFSET: 0,
  },

  // Analytics Limits
  LIMITS: {
    MAX_RESULTS: 10000,
    MAX_DIMENSIONS: 10,
    MAX_METRICS: 20,
    MAX_PERIOD: 365,
    MIN_PERIOD: 1,
  },
} as const;

// Analytics Types
export type FlashSaleAnalyticsType =
  (typeof FLASH_SALE_ANALYTICS.TYPES)[keyof typeof FLASH_SALE_ANALYTICS.TYPES];

// Analytics Metrics
export type FlashSaleAnalyticsMetric =
  (typeof FLASH_SALE_ANALYTICS.METRICS)[keyof typeof FLASH_SALE_ANALYTICS.METRICS];

// Analytics Periods
export type FlashSaleAnalyticsPeriod =
  (typeof FLASH_SALE_ANALYTICS.PERIODS)[keyof typeof FLASH_SALE_ANALYTICS.PERIODS];

// Analytics Intervals
export type FlashSaleAnalyticsInterval =
  (typeof FLASH_SALE_ANALYTICS.INTERVALS)[keyof typeof FLASH_SALE_ANALYTICS.INTERVALS];

// Analytics Aggregations
export type FlashSaleAnalyticsAggregation =
  (typeof FLASH_SALE_ANALYTICS.AGGREGATIONS)[keyof typeof FLASH_SALE_ANALYTICS.AGGREGATIONS];

// Analytics Dimensions
export type FlashSaleAnalyticsDimension =
  (typeof FLASH_SALE_ANALYTICS.DIMENSIONS)[keyof typeof FLASH_SALE_ANALYTICS.DIMENSIONS];

// Utility Functions
export function flashsalesAnalyticsGetTypeLabel(type: FlashSaleAnalyticsType): string {
  const labels: Record<FlashSaleAnalyticsType, string> = {
    [FLASH_SALE_ANALYTICS.TYPES.PERFORMANCE]: 'Performance Analytics',
    [FLASH_SALE_ANALYTICS.TYPES.ENGAGEMENT]: 'Engagement Analytics',
    [FLASH_SALE_ANALYTICS.TYPES.CONVERSION]: 'Conversion Analytics',
    [FLASH_SALE_ANALYTICS.TYPES.REVENUE]: 'Revenue Analytics',
    [FLASH_SALE_ANALYTICS.TYPES.INVENTORY]: 'Inventory Analytics',
    [FLASH_SALE_ANALYTICS.TYPES.CUSTOMER]: 'Customer Analytics',
    [FLASH_SALE_ANALYTICS.TYPES.PRODUCT]: 'Product Analytics',
    [FLASH_SALE_ANALYTICS.TYPES.TIME]: 'Time Analytics',
    [FLASH_SALE_ANALYTICS.TYPES.GEOGRAPHIC]: 'Geographic Analytics',
    [FLASH_SALE_ANALYTICS.TYPES.COMPARATIVE]: 'Comparative Analytics',
  };
  return labels[type] || 'Unknown Analytics Type';
}

export function flashsalesAnalyticsGetMetricLabel(metric: FlashSaleAnalyticsMetric): string {
  const labels: Record<FlashSaleAnalyticsMetric, string> = {
    [FLASH_SALE_ANALYTICS.METRICS.TOTAL_VIEWS]: 'Total Views',
    [FLASH_SALE_ANALYTICS.METRICS.UNIQUE_VIEWERS]: 'Unique Viewers',
    [FLASH_SALE_ANALYTICS.METRICS.CLICK_THROUGH_RATE]: 'Click Through Rate',
    [FLASH_SALE_ANALYTICS.METRICS.BOUNCE_RATE]: 'Bounce Rate',
    [FLASH_SALE_ANALYTICS.METRICS.TIME_ON_PAGE]: 'Time on Page',
    [FLASH_SALE_ANALYTICS.METRICS.TOTAL_PARTICIPANTS]: 'Total Participants',
    [FLASH_SALE_ANALYTICS.METRICS.ACTIVE_PARTICIPANTS]: 'Active Participants',
    [FLASH_SALE_ANALYTICS.METRICS.ENGAGEMENT_RATE]: 'Engagement Rate',
    [FLASH_SALE_ANALYTICS.METRICS.AVERAGE_SESSION_DURATION]: 'Average Session Duration',
    [FLASH_SALE_ANALYTICS.METRICS.INTERACTION_COUNT]: 'Interaction Count',
    [FLASH_SALE_ANALYTICS.METRICS.TOTAL_ORDERS]: 'Total Orders',
    [FLASH_SALE_ANALYTICS.METRICS.CONVERSION_RATE]: 'Conversion Rate',
    [FLASH_SALE_ANALYTICS.METRICS.AVERAGE_ORDER_VALUE]: 'Average Order Value',
    [FLASH_SALE_ANALYTICS.METRICS.TOTAL_REVENUE]: 'Total Revenue',
    [FLASH_SALE_ANALYTICS.METRICS.REVENUE_PER_PARTICIPANT]: 'Revenue per Participant',
    [FLASH_SALE_ANALYTICS.METRICS.TOTAL_PRODUCTS]: 'Total Products',
    [FLASH_SALE_ANALYTICS.METRICS.SOLD_PRODUCTS]: 'Sold Products',
    [FLASH_SALE_ANALYTICS.METRICS.UNSOLD_PRODUCTS]: 'Unsold Products',
    [FLASH_SALE_ANALYTICS.METRICS.INVENTORY_TURNOVER]: 'Inventory Turnover',
    [FLASH_SALE_ANALYTICS.METRICS.SELL_THROUGH_RATE]: 'Sell Through Rate',
    [FLASH_SALE_ANALYTICS.METRICS.NEW_CUSTOMERS]: 'New Customers',
    [FLASH_SALE_ANALYTICS.METRICS.RETURNING_CUSTOMERS]: 'Returning Customers',
    [FLASH_SALE_ANALYTICS.METRICS.CUSTOMER_ACQUISITION_COST]: 'Customer Acquisition Cost',
    [FLASH_SALE_ANALYTICS.METRICS.CUSTOMER_LIFETIME_VALUE]: 'Customer Lifetime Value',
    [FLASH_SALE_ANALYTICS.METRICS.CUSTOMER_SATISFACTION]: 'Customer Satisfaction',
    [FLASH_SALE_ANALYTICS.METRICS.TOP_SELLING_PRODUCTS]: 'Top Selling Products',
    [FLASH_SALE_ANALYTICS.METRICS.PRODUCT_PERFORMANCE]: 'Product Performance',
    [FLASH_SALE_ANALYTICS.METRICS.PRODUCT_VIEWS]: 'Product Views',
    [FLASH_SALE_ANALYTICS.METRICS.PRODUCT_ADD_TO_CART]: 'Add to Cart',
    [FLASH_SALE_ANALYTICS.METRICS.PRODUCT_CHECKOUT]: 'Product Checkout',
    [FLASH_SALE_ANALYTICS.METRICS.PEAK_HOURS]: 'Peak Hours',
    [FLASH_SALE_ANALYTICS.METRICS.TIME_TO_SELL]: 'Time to Sell',
    [FLASH_SALE_ANALYTICS.METRICS.AVERAGE_RESPONSE_TIME]: 'Average Response Time',
    [FLASH_SALE_ANALYTICS.METRICS.SALE_DURATION]: 'Sale Duration',
    [FLASH_SALE_ANALYTICS.METRICS.TOP_REGIONS]: 'Top Regions',
    [FLASH_SALE_ANALYTICS.METRICS.TOP_CITIES]: 'Top Cities',
    [FLASH_SALE_ANALYTICS.METRICS.INTERNATIONAL_SALES]: 'International Sales',
    [FLASH_SALE_ANALYTICS.METRICS.LOCAL_SALES]: 'Local Sales',
  };
  return labels[metric] || 'Unknown Metric';
}

export function flashsalesAnalyticsGetPeriodLabel(period: FlashSaleAnalyticsPeriod): string {
  const labels: Record<FlashSaleAnalyticsPeriod, string> = {
    [FLASH_SALE_ANALYTICS.PERIODS.LAST_HOUR]: 'Last Hour',
    [FLASH_SALE_ANALYTICS.PERIODS.LAST_6_HOURS]: 'Last 6 Hours',
    [FLASH_SALE_ANALYTICS.PERIODS.LAST_12_HOURS]: 'Last 12 Hours',
    [FLASH_SALE_ANALYTICS.PERIODS.LAST_24_HOURS]: 'Last 24 Hours',
    [FLASH_SALE_ANALYTICS.PERIODS.LAST_7_DAYS]: 'Last 7 Days',
    [FLASH_SALE_ANALYTICS.PERIODS.LAST_30_DAYS]: 'Last 30 Days',
    [FLASH_SALE_ANALYTICS.PERIODS.LAST_90_DAYS]: 'Last 90 Days',
    [FLASH_SALE_ANALYTICS.PERIODS.CUSTOM]: 'Custom Period',
  };
  return labels[period] || 'Unknown Period';
}

export function flashsalesAnalyticsGetIntervalLabel(interval: FlashSaleAnalyticsInterval): string {
  const labels: Record<FlashSaleAnalyticsInterval, string> = {
    [FLASH_SALE_ANALYTICS.INTERVALS.MINUTE]: 'Minute',
    [FLASH_SALE_ANALYTICS.INTERVALS.HOUR]: 'Hour',
    [FLASH_SALE_ANALYTICS.INTERVALS.DAY]: 'Day',
    [FLASH_SALE_ANALYTICS.INTERVALS.WEEK]: 'Week',
    [FLASH_SALE_ANALYTICS.INTERVALS.MONTH]: 'Month',
    [FLASH_SALE_ANALYTICS.INTERVALS.QUARTER]: 'Quarter',
  };
  return labels[interval] || 'Unknown Interval';
}

export function flashsalesAnalyticsGetAggregationLabel(
  aggregation: FlashSaleAnalyticsAggregation
): string {
  const labels: Record<FlashSaleAnalyticsAggregation, string> = {
    [FLASH_SALE_ANALYTICS.AGGREGATIONS.SUM]: 'Sum',
    [FLASH_SALE_ANALYTICS.AGGREGATIONS.AVG]: 'Average',
    [FLASH_SALE_ANALYTICS.AGGREGATIONS.MIN]: 'Minimum',
    [FLASH_SALE_ANALYTICS.AGGREGATIONS.MAX]: 'Maximum',
    [FLASH_SALE_ANALYTICS.AGGREGATIONS.COUNT]: 'Count',
    [FLASH_SALE_ANALYTICS.AGGREGATIONS.DISTINCT]: 'Distinct Count',
    [FLASH_SALE_ANALYTICS.AGGREGATIONS.MEDIAN]: 'Median',
    [FLASH_SALE_ANALYTICS.AGGREGATIONS.PERCENTILE]: 'Percentile',
    [FLASH_SALE_ANALYTICS.AGGREGATIONS.RATE]: 'Rate',
    [FLASH_SALE_ANALYTICS.AGGREGATIONS.PERCENTAGE]: 'Percentage',
  };
  return labels[aggregation] || 'Unknown Aggregation';
}

export function flashsalesAnalyticsGetDimensionLabel(
  dimension: FlashSaleAnalyticsDimension
): string {
  const labels: Record<FlashSaleAnalyticsDimension, string> = {
    [FLASH_SALE_ANALYTICS.DIMENSIONS.TIME]: 'Time',
    [FLASH_SALE_ANALYTICS.DIMENSIONS.PRODUCT]: 'Product',
    [FLASH_SALE_ANALYTICS.DIMENSIONS.CATEGORY]: 'Category',
    [FLASH_SALE_ANALYTICS.DIMENSIONS.CUSTOMER]: 'Customer',
    [FLASH_SALE_ANALYTICS.DIMENSIONS.LOCATION]: 'Location',
    [FLASH_SALE_ANALYTICS.DIMENSIONS.DEVICE]: 'Device',
    [FLASH_SALE_ANALYTICS.DIMENSIONS.CHANNEL]: 'Channel',
    [FLASH_SALE_ANALYTICS.DIMENSIONS.SEGMENT]: 'Segment',
    [FLASH_SALE_ANALYTICS.DIMENSIONS.PRICE_RANGE]: 'Price Range',
  };
  return labels[dimension] || 'Unknown Dimension';
}

export function flashsalesAnalyticsIsValidType(type: string): type is FlashSaleAnalyticsType {
  return Object.values(FLASH_SALE_ANALYTICS.TYPES).includes(type as FlashSaleAnalyticsType);
}

export function flashsalesAnalyticsIsValidMetric(
  metric: string
): metric is FlashSaleAnalyticsMetric {
  return Object.values(FLASH_SALE_ANALYTICS.METRICS).includes(metric as FlashSaleAnalyticsMetric);
}

export function flashsalesAnalyticsIsValidPeriod(
  period: string
): period is FlashSaleAnalyticsPeriod {
  return Object.values(FLASH_SALE_ANALYTICS.PERIODS).includes(period as FlashSaleAnalyticsPeriod);
}

export function flashsalesAnalyticsGetDefaultPeriod(): FlashSaleAnalyticsPeriod {
  return FLASH_SALE_ANALYTICS.DEFAULTS.PERIOD as FlashSaleAnalyticsPeriod;
}

export function flashsalesAnalyticsGetDefaultInterval(): FlashSaleAnalyticsInterval {
  return FLASH_SALE_ANALYTICS.DEFAULTS.INTERVAL as FlashSaleAnalyticsInterval;
}

export function flashsalesAnalyticsGetDefaultAggregation(): FlashSaleAnalyticsAggregation {
  return FLASH_SALE_ANALYTICS.DEFAULTS.AGGREGATION as FlashSaleAnalyticsAggregation;
}

export function flashsalesAnalyticsGetMaxResults(): number {
  return FLASH_SALE_ANALYTICS.LIMITS.MAX_RESULTS;
}

export function flashsalesAnalyticsGetPeriodInDays(period: FlashSaleAnalyticsPeriod): number {
  const days: Record<FlashSaleAnalyticsPeriod, number> = {
    [FLASH_SALE_ANALYTICS.PERIODS.LAST_HOUR]: 0.0417,
    [FLASH_SALE_ANALYTICS.PERIODS.LAST_6_HOURS]: 0.25,
    [FLASH_SALE_ANALYTICS.PERIODS.LAST_12_HOURS]: 0.5,
    [FLASH_SALE_ANALYTICS.PERIODS.LAST_24_HOURS]: 1,
    [FLASH_SALE_ANALYTICS.PERIODS.LAST_7_DAYS]: 7,
    [FLASH_SALE_ANALYTICS.PERIODS.LAST_30_DAYS]: 30,
    [FLASH_SALE_ANALYTICS.PERIODS.LAST_90_DAYS]: 90,
    [FLASH_SALE_ANALYTICS.PERIODS.CUSTOM]: 0,
  };
  return days[period] || 0;
}
