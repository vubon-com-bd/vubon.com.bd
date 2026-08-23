/**
 * Sales Analytics Metric Constants
 * Metrics for measuring sales performance and analytics
 */

export const SALES_ANALYTICS_METRIC = {
  // Sales Count Metrics
  COUNT_METRICS: {
    TOTAL_SALES: 'total_sales',
    TOTAL_ORDERS: 'total_orders',
    UNITS_SOLD: 'units_sold',
    ITEMS_SOLD: 'items_sold',
    ACTIVE_ORDERS: 'active_orders',
    COMPLETED_ORDERS: 'completed_orders',
    CANCELLED_ORDERS: 'cancelled_orders',
    RETURNED_ORDERS: 'returned_orders',
    REFUNDED_ORDERS: 'refunded_orders',
    CUSTOMERS_SERVED: 'customers_served',
    NEW_CUSTOMERS: 'new_customers',
    RETURNING_CUSTOMERS: 'returning_customers',
  } as const,

  // Sales Revenue Metrics
  REVENUE_METRICS: {
    TOTAL_REVENUE: 'total_revenue',
    GROSS_REVENUE: 'gross_revenue',
    NET_REVENUE: 'net_revenue',
    AVG_ORDER_VALUE: 'avg_order_value',
    AVG_ITEM_VALUE: 'avg_item_value',
    MAX_ORDER_VALUE: 'max_order_value',
    MIN_ORDER_VALUE: 'min_order_value',
    MEDIAN_ORDER_VALUE: 'median_order_value',
    REVENUE_PER_DAY: 'revenue_per_day',
    REVENUE_PER_WEEK: 'revenue_per_week',
    REVENUE_PER_MONTH: 'revenue_per_month',
    REVENUE_PER_QUARTER: 'revenue_per_quarter',
    REVENUE_PER_YEAR: 'revenue_per_year',
    REVENUE_PER_CUSTOMER: 'revenue_per_customer',
    REVENUE_PER_PRODUCT: 'revenue_per_product',
  } as const,

  // Sales Profit Metrics
  PROFIT_METRICS: {
    TOTAL_PROFIT: 'total_profit',
    GROSS_PROFIT: 'gross_profit',
    NET_PROFIT: 'net_profit',
    PROFIT_PER_ORDER: 'profit_per_order',
    PROFIT_PER_PRODUCT: 'profit_per_product',
    PROFIT_PER_CUSTOMER: 'profit_per_customer',
    GROSS_MARGIN: 'gross_margin',
    NET_MARGIN: 'net_margin',
    PROFIT_MARGIN: 'profit_margin',
    CONTRIBUTION_MARGIN: 'contribution_margin',
    EBITDA: 'ebitda',
    EBIT: 'ebit',
  } as const,

  // Sales Growth Metrics
  GROWTH_METRICS: {
    SALES_GROWTH: 'sales_growth',
    REVENUE_GROWTH: 'revenue_growth',
    ORDER_GROWTH: 'order_growth',
    UNIT_GROWTH: 'unit_growth',
    PROFIT_GROWTH: 'profit_growth',
    CUSTOMER_GROWTH: 'customer_growth',
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    WEEK_OVER_WEEK: 'week_over_week',
    PERIOD_COMPARISON: 'period_comparison',
    CUMULATIVE_GROWTH: 'cumulative_growth',
    COMPOUND_GROWTH_RATE: 'compound_growth_rate',
  } as const,

  // Sales Conversion Metrics
  CONVERSION_METRICS: {
    CONVERSION_RATE: 'conversion_rate',
    ADD_TO_CART_RATE: 'add_to_cart_rate',
    CHECKOUT_RATE: 'checkout_rate',
    PURCHASE_RATE: 'purchase_rate',
    REPEAT_PURCHASE_RATE: 'repeat_purchase_rate',
    CUSTOMER_RETENTION_RATE: 'customer_retention_rate',
    CHURN_RATE: 'churn_rate',
    ABANDONMENT_RATE: 'abandonment_rate',
    BOUNCE_RATE: 'bounce_rate',
    EXIT_RATE: 'exit_rate',
  } as const,

  // Sales Channel Metrics
  CHANNEL_METRICS: {
    CHANNEL_REVENUE: 'channel_revenue',
    CHANNEL_ORDERS: 'channel_orders',
    CHANNEL_CONVERSION: 'channel_conversion',
    ONLINE_SALES: 'online_sales',
    OFFLINE_SALES: 'offline_sales',
    MOBILE_SALES: 'mobile_sales',
    DESKTOP_SALES: 'desktop_sales',
    INSTORE_SALES: 'instore_sales',
    MARKETPLACE_SALES: 'marketplace_sales',
    SOCIAL_SALES: 'social_sales',
  } as const,

  // Sales Efficiency Metrics
  EFFICIENCY_METRICS: {
    SALES_PER_DAY: 'sales_per_day',
    SALES_PER_WEEK: 'sales_per_week',
    SALES_PER_MONTH: 'sales_per_month',
    SALES_PER_EMPLOYEE: 'sales_per_employee',
    SALES_PER_STORE: 'sales_per_store',
    SALES_PER_SQUARE_FOOT: 'sales_per_square_foot',
    ORDERS_PER_HOUR: 'orders_per_hour',
    ORDERS_PER_DAY: 'orders_per_day',
    FULFILLMENT_TIME: 'fulfillment_time',
    DELIVERY_TIME: 'delivery_time',
  } as const,

  // Sales Quality Metrics
  QUALITY_METRICS: {
    RETURN_RATE: 'return_rate',
    REFUND_RATE: 'refund_rate',
    CANCELLATION_RATE: 'cancellation_rate',
    COMPLAINT_RATE: 'complaint_rate',
    SATISFACTION_SCORE: 'satisfaction_score',
    NPS_SCORE: 'nps_score',
    CSAT_SCORE: 'csat_score',
    CES_SCORE: 'ces_score',
    PRODUCT_QUALITY_SCORE: 'product_quality_score',
    SERVICE_QUALITY_SCORE: 'service_quality_score',
  } as const,

  // Metric Categories
  CATEGORIES: {
    COUNT: 'count',
    REVENUE: 'revenue',
    PROFIT: 'profit',
    GROWTH: 'growth',
    CONVERSION: 'conversion',
    CHANNEL: 'channel',
    EFFICIENCY: 'efficiency',
    QUALITY: 'quality',
  } as const,

  // Metric Types
  TYPES: {
    ABSOLUTE: 'absolute',
    AVERAGE: 'average',
    PERCENTAGE: 'percentage',
    RATIO: 'ratio',
    RATE: 'rate',
    SCORE: 'score',
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

// Sales Analytics Count Metrics
export type SalesAnalyticsCountMetric =
  (typeof SALES_ANALYTICS_METRIC.COUNT_METRICS)[keyof typeof SALES_ANALYTICS_METRIC.COUNT_METRICS];

// Sales Analytics Revenue Metrics
export type SalesAnalyticsRevenueMetric =
  (typeof SALES_ANALYTICS_METRIC.REVENUE_METRICS)[keyof typeof SALES_ANALYTICS_METRIC.REVENUE_METRICS];

// Sales Analytics Profit Metrics
export type SalesAnalyticsProfitMetric =
  (typeof SALES_ANALYTICS_METRIC.PROFIT_METRICS)[keyof typeof SALES_ANALYTICS_METRIC.PROFIT_METRICS];

// Sales Analytics Growth Metrics
export type SalesAnalyticsGrowthMetric =
  (typeof SALES_ANALYTICS_METRIC.GROWTH_METRICS)[keyof typeof SALES_ANALYTICS_METRIC.GROWTH_METRICS];

// Sales Analytics Conversion Metrics
export type SalesAnalyticsConversionMetric =
  (typeof SALES_ANALYTICS_METRIC.CONVERSION_METRICS)[keyof typeof SALES_ANALYTICS_METRIC.CONVERSION_METRICS];

// Sales Analytics Channel Metrics
export type SalesAnalyticsChannelMetric =
  (typeof SALES_ANALYTICS_METRIC.CHANNEL_METRICS)[keyof typeof SALES_ANALYTICS_METRIC.CHANNEL_METRICS];

// Sales Analytics Efficiency Metrics
export type SalesAnalyticsEfficiencyMetric =
  (typeof SALES_ANALYTICS_METRIC.EFFICIENCY_METRICS)[keyof typeof SALES_ANALYTICS_METRIC.EFFICIENCY_METRICS];

// Sales Analytics Quality Metrics
export type SalesAnalyticsQualityMetric =
  (typeof SALES_ANALYTICS_METRIC.QUALITY_METRICS)[keyof typeof SALES_ANALYTICS_METRIC.QUALITY_METRICS];

// Sales Analytics Metric Categories
export type SalesAnalyticsMetricCategory =
  (typeof SALES_ANALYTICS_METRIC.CATEGORIES)[keyof typeof SALES_ANALYTICS_METRIC.CATEGORIES];

// Sales Analytics Metric Types
export type SalesAnalyticsMetricType =
  (typeof SALES_ANALYTICS_METRIC.TYPES)[keyof typeof SALES_ANALYTICS_METRIC.TYPES];

// Sales Analytics Metric Formats
export type SalesAnalyticsMetricFormat =
  (typeof SALES_ANALYTICS_METRIC.FORMATS)[keyof typeof SALES_ANALYTICS_METRIC.FORMATS];

// Sales Analytics Metric Priority
export type SalesAnalyticsMetricPriority =
  (typeof SALES_ANALYTICS_METRIC.PRIORITY)[keyof typeof SALES_ANALYTICS_METRIC.PRIORITY];

// Sales Analytics Metric Labels
export function getSalesAnalyticsMetricLabel(metric: string): string {
  const labels: Record<string, string> = {
    // Count Metrics
    total_sales: 'Total Sales',
    total_orders: 'Total Orders',
    units_sold: 'Units Sold',
    items_sold: 'Items Sold',
    active_orders: 'Active Orders',
    completed_orders: 'Completed Orders',
    cancelled_orders: 'Cancelled Orders',
    returned_orders: 'Returned Orders',
    refunded_orders: 'Refunded Orders',
    customers_served: 'Customers Served',
    new_customers: 'New Customers',
    returning_customers: 'Returning Customers',

    // Revenue Metrics
    total_revenue: 'Total Revenue',
    gross_revenue: 'Gross Revenue',
    net_revenue: 'Net Revenue',
    avg_order_value: 'Average Order Value',
    avg_item_value: 'Average Item Value',
    max_order_value: 'Max Order Value',
    min_order_value: 'Min Order Value',
    median_order_value: 'Median Order Value',
    revenue_per_day: 'Revenue Per Day',
    revenue_per_week: 'Revenue Per Week',
    revenue_per_month: 'Revenue Per Month',
    revenue_per_quarter: 'Revenue Per Quarter',
    revenue_per_year: 'Revenue Per Year',
    revenue_per_customer: 'Revenue Per Customer',
    revenue_per_product: 'Revenue Per Product',

    // Profit Metrics
    total_profit: 'Total Profit',
    gross_profit: 'Gross Profit',
    net_profit: 'Net Profit',
    profit_per_order: 'Profit Per Order',
    profit_per_product: 'Profit Per Product',
    profit_per_customer: 'Profit Per Customer',
    gross_margin: 'Gross Margin',
    net_margin: 'Net Margin',
    profit_margin: 'Profit Margin',
    contribution_margin: 'Contribution Margin',
    ebitda: 'EBITDA',
    ebit: 'EBIT',

    // Growth Metrics
    sales_growth: 'Sales Growth',
    revenue_growth: 'Revenue Growth',
    order_growth: 'Order Growth',
    unit_growth: 'Unit Growth',
    profit_growth: 'Profit Growth',
    customer_growth: 'Customer Growth',
    year_over_year: 'Year Over Year',
    quarter_over_quarter: 'Quarter Over Quarter',
    month_over_month: 'Month Over Month',
    week_over_week: 'Week Over Week',
    period_comparison: 'Period Comparison',
    cumulative_growth: 'Cumulative Growth',
    compound_growth_rate: 'Compound Growth Rate',

    // Conversion Metrics
    conversion_rate: 'Conversion Rate',
    add_to_cart_rate: 'Add to Cart Rate',
    checkout_rate: 'Checkout Rate',
    purchase_rate: 'Purchase Rate',
    repeat_purchase_rate: 'Repeat Purchase Rate',
    customer_retention_rate: 'Customer Retention Rate',
    churn_rate: 'Churn Rate',
    abandonment_rate: 'Abandonment Rate',
    bounce_rate: 'Bounce Rate',
    exit_rate: 'Exit Rate',

    // Channel Metrics
    channel_revenue: 'Channel Revenue',
    channel_orders: 'Channel Orders',
    channel_conversion: 'Channel Conversion',
    online_sales: 'Online Sales',
    offline_sales: 'Offline Sales',
    mobile_sales: 'Mobile Sales',
    desktop_sales: 'Desktop Sales',
    instore_sales: 'In-store Sales',
    marketplace_sales: 'Marketplace Sales',
    social_sales: 'Social Sales',

    // Efficiency Metrics
    sales_per_day: 'Sales Per Day',
    sales_per_week: 'Sales Per Week',
    sales_per_month: 'Sales Per Month',
    sales_per_employee: 'Sales Per Employee',
    sales_per_store: 'Sales Per Store',
    sales_per_square_foot: 'Sales Per Square Foot',
    orders_per_hour: 'Orders Per Hour',
    orders_per_day: 'Orders Per Day',
    fulfillment_time: 'Fulfillment Time',
    delivery_time: 'Delivery Time',

    // Quality Metrics
    return_rate: 'Return Rate',
    refund_rate: 'Refund Rate',
    cancellation_rate: 'Cancellation Rate',
    complaint_rate: 'Complaint Rate',
    satisfaction_score: 'Satisfaction Score',
    nps_score: 'NPS Score',
    csat_score: 'CSAT Score',
    ces_score: 'CES Score',
    product_quality_score: 'Product Quality Score',
    service_quality_score: 'Service Quality Score',
  };

  return (
    labels[metric] || metric.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
}

// Sales Analytics Metric Category Labels
export function getSalesAnalyticsMetricCategoryLabel(
  category: SalesAnalyticsMetricCategory
): string {
  const labels: Record<SalesAnalyticsMetricCategory, string> = {
    [SALES_ANALYTICS_METRIC.CATEGORIES.COUNT]: 'Count',
    [SALES_ANALYTICS_METRIC.CATEGORIES.REVENUE]: 'Revenue',
    [SALES_ANALYTICS_METRIC.CATEGORIES.PROFIT]: 'Profit',
    [SALES_ANALYTICS_METRIC.CATEGORIES.GROWTH]: 'Growth',
    [SALES_ANALYTICS_METRIC.CATEGORIES.CONVERSION]: 'Conversion',
    [SALES_ANALYTICS_METRIC.CATEGORIES.CHANNEL]: 'Channel',
    [SALES_ANALYTICS_METRIC.CATEGORIES.EFFICIENCY]: 'Efficiency',
    [SALES_ANALYTICS_METRIC.CATEGORIES.QUALITY]: 'Quality',
  };
  return labels[category] || 'Unknown';
}

// Sales Analytics Metric Type Labels
export function getSalesAnalyticsMetricTypeLabel(type: SalesAnalyticsMetricType): string {
  const labels: Record<SalesAnalyticsMetricType, string> = {
    [SALES_ANALYTICS_METRIC.TYPES.ABSOLUTE]: 'Absolute',
    [SALES_ANALYTICS_METRIC.TYPES.AVERAGE]: 'Average',
    [SALES_ANALYTICS_METRIC.TYPES.PERCENTAGE]: 'Percentage',
    [SALES_ANALYTICS_METRIC.TYPES.RATIO]: 'Ratio',
    [SALES_ANALYTICS_METRIC.TYPES.RATE]: 'Rate',
    [SALES_ANALYTICS_METRIC.TYPES.SCORE]: 'Score',
  };
  return labels[type] || 'Unknown';
}

// Sales Analytics Metric Format Labels
export function getSalesAnalyticsMetricFormatLabel(format: SalesAnalyticsMetricFormat): string {
  const labels: Record<SalesAnalyticsMetricFormat, string> = {
    [SALES_ANALYTICS_METRIC.FORMATS.NUMBER]: 'Number',
    [SALES_ANALYTICS_METRIC.FORMATS.DECIMAL]: 'Decimal',
    [SALES_ANALYTICS_METRIC.FORMATS.PERCENTAGE]: 'Percentage',
    [SALES_ANALYTICS_METRIC.FORMATS.CURRENCY]: 'Currency',
    [SALES_ANALYTICS_METRIC.FORMATS.DURATION]: 'Duration',
    [SALES_ANALYTICS_METRIC.FORMATS.RATING]: 'Rating',
  };
  return labels[format] || 'Unknown';
}

// Sales Analytics Metric Priority Labels
export function getSalesAnalyticsMetricPriorityLabel(
  priority: SalesAnalyticsMetricPriority
): string {
  const labels: Record<SalesAnalyticsMetricPriority, string> = {
    [SALES_ANALYTICS_METRIC.PRIORITY.CRITICAL]: 'Critical',
    [SALES_ANALYTICS_METRIC.PRIORITY.HIGH]: 'High',
    [SALES_ANALYTICS_METRIC.PRIORITY.MEDIUM]: 'Medium',
    [SALES_ANALYTICS_METRIC.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Get metric category
export function getSalesAnalyticsMetricCategory(metric: string): SalesAnalyticsMetricCategory {
  const countMetrics: string[] = Object.values(SALES_ANALYTICS_METRIC.COUNT_METRICS);
  const revenueMetrics: string[] = Object.values(SALES_ANALYTICS_METRIC.REVENUE_METRICS);
  const profitMetrics: string[] = Object.values(SALES_ANALYTICS_METRIC.PROFIT_METRICS);
  const growthMetrics: string[] = Object.values(SALES_ANALYTICS_METRIC.GROWTH_METRICS);
  const conversionMetrics: string[] = Object.values(SALES_ANALYTICS_METRIC.CONVERSION_METRICS);
  const channelMetrics: string[] = Object.values(SALES_ANALYTICS_METRIC.CHANNEL_METRICS);
  const efficiencyMetrics: string[] = Object.values(SALES_ANALYTICS_METRIC.EFFICIENCY_METRICS);
  const qualityMetrics: string[] = Object.values(SALES_ANALYTICS_METRIC.QUALITY_METRICS);

  if (countMetrics.includes(metric)) return SALES_ANALYTICS_METRIC.CATEGORIES.COUNT;
  if (revenueMetrics.includes(metric)) return SALES_ANALYTICS_METRIC.CATEGORIES.REVENUE;
  if (profitMetrics.includes(metric)) return SALES_ANALYTICS_METRIC.CATEGORIES.PROFIT;
  if (growthMetrics.includes(metric)) return SALES_ANALYTICS_METRIC.CATEGORIES.GROWTH;
  if (conversionMetrics.includes(metric)) return SALES_ANALYTICS_METRIC.CATEGORIES.CONVERSION;
  if (channelMetrics.includes(metric)) return SALES_ANALYTICS_METRIC.CATEGORIES.CHANNEL;
  if (efficiencyMetrics.includes(metric)) return SALES_ANALYTICS_METRIC.CATEGORIES.EFFICIENCY;
  if (qualityMetrics.includes(metric)) return SALES_ANALYTICS_METRIC.CATEGORIES.QUALITY;

  return SALES_ANALYTICS_METRIC.CATEGORIES.COUNT;
}

// Get metric type
export function getSalesAnalyticsMetricType(metric: string): SalesAnalyticsMetricType {
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
  ];

  const averageMetrics: string[] = ['avg', 'average', 'mean', 'median'];

  const scoreMetrics: string[] = ['score', 'nps', 'csat', 'ces', 'rating'];

  const lowerMetric = metric.toLowerCase();

  if (percentageMetrics.some((pm: string) => lowerMetric.includes(pm))) {
    return SALES_ANALYTICS_METRIC.TYPES.PERCENTAGE;
  }

  if (averageMetrics.some((am: string) => lowerMetric.includes(am))) {
    return SALES_ANALYTICS_METRIC.TYPES.AVERAGE;
  }

  if (scoreMetrics.some((sm: string) => lowerMetric.includes(sm))) {
    return SALES_ANALYTICS_METRIC.TYPES.SCORE;
  }

  return SALES_ANALYTICS_METRIC.TYPES.ABSOLUTE;
}

// Get metric format
export function getSalesAnalyticsMetricFormat(metric: string): SalesAnalyticsMetricFormat {
  const currencyMetrics: string[] = [
    'revenue',
    'profit',
    'value',
    'price',
    'cost',
    'margin',
    'sales',
    'order_value',
    'item_value',
  ];

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
  ];

  const ratingMetrics: string[] = ['score', 'nps', 'csat', 'ces', 'rating'];

  const durationMetrics: string[] = ['time', 'duration', 'fulfillment', 'delivery'];

  const lowerMetric = metric.toLowerCase();

  if (currencyMetrics.some((cm: string) => lowerMetric.includes(cm))) {
    return SALES_ANALYTICS_METRIC.FORMATS.CURRENCY;
  }

  if (durationMetrics.some((dm: string) => lowerMetric.includes(dm))) {
    return SALES_ANALYTICS_METRIC.FORMATS.DURATION;
  }

  if (ratingMetrics.some((rm: string) => lowerMetric.includes(rm))) {
    return SALES_ANALYTICS_METRIC.FORMATS.RATING;
  }

  if (percentageMetrics.some((pm: string) => lowerMetric.includes(pm))) {
    return SALES_ANALYTICS_METRIC.FORMATS.PERCENTAGE;
  }

  return SALES_ANALYTICS_METRIC.FORMATS.NUMBER;
}

// Calculate conversion rate
export function calculateSalesAnalyticsConversionRate(purchases: number, views: number): number {
  if (views === 0) return 0;
  return (purchases / views) * 100;
}

// Calculate average order value
export function calculateSalesAnalyticsAverageOrderValue(
  totalRevenue: number,
  totalOrders: number
): number {
  if (totalOrders === 0) return 0;
  return totalRevenue / totalOrders;
}

// Calculate growth rate
export function calculateSalesAnalyticsGrowthRate(
  currentValue: number,
  previousValue: number
): number {
  if (previousValue === 0) return 0;
  return ((currentValue - previousValue) / previousValue) * 100;
}

// Calculate profit margin
export function calculateSalesAnalyticsProfitMargin(profit: number, revenue: number): number {
  if (revenue === 0) return 0;
  return (profit / revenue) * 100;
}

// Calculate customer retention rate
export function calculateSalesAnalyticsRetentionRate(
  retainedCustomers: number,
  totalCustomers: number
): number {
  if (totalCustomers === 0) return 0;
  return (retainedCustomers / totalCustomers) * 100;
}

// Calculate churn rate
export function calculateSalesAnalyticsChurnRate(
  churnedCustomers: number,
  totalCustomers: number
): number {
  if (totalCustomers === 0) return 0;
  return (churnedCustomers / totalCustomers) * 100;
}

// Calculate return rate
export function calculateSalesAnalyticsReturnRate(
  returnedOrders: number,
  totalOrders: number
): number {
  if (totalOrders === 0) return 0;
  return (returnedOrders / totalOrders) * 100;
}

// Calculate NPS
export function calculateSalesAnalyticsNPS(
  promoters: number,
  passives: number,
  detractors: number
): number {
  const total = promoters + passives + detractors;
  if (total === 0) return 0;
  return ((promoters - detractors) / total) * 100;
}
