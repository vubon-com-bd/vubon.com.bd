/**
 * Analytics Metric Constants
 * Metrics for measuring and tracking analytics data
 */

export const ANALYTICS_METRIC = {
  // Business Metrics
  BUSINESS: {
    // Revenue Metrics
    REVENUE: 'revenue',
    GROSS_REVENUE: 'gross_revenue',
    NET_REVENUE: 'net_revenue',
    RECURRING_REVENUE: 'recurring_revenue',
    AVERAGE_REVENUE: 'average_revenue',

    // Profit Metrics
    PROFIT: 'profit',
    GROSS_PROFIT: 'gross_profit',
    NET_PROFIT: 'net_profit',
    MARGIN: 'margin',
    GROSS_MARGIN: 'gross_margin',
    NET_MARGIN: 'net_margin',

    // Growth Metrics
    GROWTH: 'growth',
    REVENUE_GROWTH: 'revenue_growth',
    USER_GROWTH: 'user_growth',
    MARKET_SHARE: 'market_share',
  } as const,

  // Customer Metrics
  CUSTOMER: {
    // Customer Base
    TOTAL_CUSTOMERS: 'total_customers',
    NEW_CUSTOMERS: 'new_customers',
    ACTIVE_CUSTOMERS: 'active_customers',
    RETURNING_CUSTOMERS: 'returning_customers',
    CHURNED_CUSTOMERS: 'churned_customers',

    // Customer Value
    LTV: 'ltv',
    AOV: 'aov',
    CLV: 'clv',
    CUSTOMER_VALUE: 'customer_value',

    // Customer Acquisition
    CAC: 'cac',
    CPA: 'cpa',
    CPL: 'cpl',

    // Customer Retention
    RETENTION_RATE: 'retention_rate',
    CHURN_RATE: 'churn_rate',
    REPEAT_PURCHASE_RATE: 'repeat_purchase_rate',
  } as const,

  // Sales Metrics
  SALES: {
    // Order Metrics
    TOTAL_ORDERS: 'total_orders',
    COMPLETED_ORDERS: 'completed_orders',
    CANCELLED_ORDERS: 'cancelled_orders',
    RETURNED_ORDERS: 'returned_orders',

    // Sales Volume
    UNITS_SOLD: 'units_sold',
    ITEMS_SOLD: 'items_sold',
    SALES_VOLUME: 'sales_volume',

    // Sales Performance
    CONVERSION_RATE: 'conversion_rate',
    AVERAGE_ORDER_VALUE: 'average_order_value',
    AVERAGE_ITEM_VALUE: 'average_item_value',
    SALES_PER_DAY: 'sales_per_day',
    SALES_PER_CUSTOMER: 'sales_per_customer',
  } as const,

  // Marketing Metrics
  MARKETING: {
    // Campaign Metrics
    IMPRESSIONS: 'impressions',
    CLICKS: 'clicks',
    CTR: 'ctr',
    CONVERSIONS: 'conversions',
    CONVERSION_RATE: 'conversion_rate',

    // ROI Metrics
    ROI: 'roi',
    ROAS: 'roas',
    ROMI: 'romi',

    // Cost Metrics
    CAMPAIGN_COST: 'campaign_cost',
    COST_PER_CLICK: 'cost_per_click',
    COST_PER_IMPRESSION: 'cost_per_impression',
    COST_PER_ACQUISITION: 'cost_per_acquisition',

    // Engagement Metrics
    ENGAGEMENT_RATE: 'engagement_rate',
    BOUNCE_RATE: 'bounce_rate',
    EXIT_RATE: 'exit_rate',
    CLICK_THROUGH_RATE: 'click_through_rate',
  } as const,

  // Product Metrics
  PRODUCT: {
    // Inventory Metrics
    INVENTORY_COUNT: 'inventory_count',
    INVENTORY_VALUE: 'inventory_value',
    TURNOVER_RATE: 'turnover_rate',
    STOCK_OUT_RATE: 'stock_out_rate',

    // Product Performance
    PRODUCT_VIEWS: 'product_views',
    PRODUCT_CLICKS: 'product_clicks',
    PRODUCT_CONVERSIONS: 'product_conversions',
    PRODUCT_REVENUE: 'product_revenue',
    PRODUCT_RATING: 'product_rating',

    // Category Performance
    CATEGORY_REVENUE: 'category_revenue',
    CATEGORY_SALES: 'category_sales',
    CATEGORY_CONVERSION: 'category_conversion',
  } as const,

  // Website Metrics
  WEBSITE: {
    // Traffic Metrics
    SESSIONS: 'sessions',
    USERS: 'users',
    PAGE_VIEWS: 'page_views',
    BOUNCE_RATE: 'bounce_rate',
    AVERAGE_SESSION_DURATION: 'average_session_duration',

    // Engagement Metrics
    PAGES_PER_SESSION: 'pages_per_session',
    SCROLL_DEPTH: 'scroll_depth',
    CLICK_RATE: 'click_rate',
    INTERACTION_RATE: 'interaction_rate',

    // Performance Metrics
    PAGE_LOAD_TIME: 'page_load_time',
    SERVER_RESPONSE_TIME: 'server_response_time',
    TIME_TO_INTERACTIVE: 'time_to_interactive',
    FIRST_CONTENTFUL_PAINT: 'first_contentful_paint',
  } as const,

  // Support Metrics
  SUPPORT: {
    // Ticket Metrics
    TOTAL_TICKETS: 'total_tickets',
    OPEN_TICKETS: 'open_tickets',
    CLOSED_TICKETS: 'closed_tickets',
    ESCALATED_TICKETS: 'escalated_tickets',

    // Resolution Metrics
    AVERAGE_RESOLUTION_TIME: 'average_resolution_time',
    FIRST_RESPONSE_TIME: 'first_response_time',
    RESOLUTION_RATE: 'resolution_rate',
    CSAT: 'csat',
    NPS: 'nps',
  } as const,

  // System Metrics
  SYSTEM: {
    // Performance Metrics
    CPU_USAGE: 'cpu_usage',
    MEMORY_USAGE: 'memory_usage',
    DISK_USAGE: 'disk_usage',
    NETWORK_USAGE: 'network_usage',

    // Availability Metrics
    UPTIME: 'uptime',
    DOWNTIME: 'downtime',
    AVAILABILITY: 'availability',
    RESPONSE_TIME: 'response_time',

    // Error Metrics
    ERROR_COUNT: 'error_count',
    ERROR_RATE: 'error_rate',
    FATAL_ERRORS: 'fatal_errors',
  } as const,

  // Metric Categories
  CATEGORIES: {
    BUSINESS: 'business',
    CUSTOMER: 'customer',
    SALES: 'sales',
    MARKETING: 'marketing',
    PRODUCT: 'product',
    WEBSITE: 'website',
    SUPPORT: 'support',
    SYSTEM: 'system',
  } as const,

  // Metric Types
  TYPES: {
    COUNT: 'count',
    RATE: 'rate',
    PERCENTAGE: 'percentage',
    AVERAGE: 'average',
    TOTAL: 'total',
    DURATION: 'duration',
    CURRENCY: 'currency',
    RATIO: 'ratio',
    INDEX: 'index',
    SCORE: 'score',
  } as const,

  // Metric Aggregations
  AGGREGATIONS: {
    SUM: 'sum',
    AVG: 'avg',
    MIN: 'min',
    MAX: 'max',
    COUNT: 'count',
    DISTINCT: 'distinct',
    PERCENTILE: 'percentile',
    MEDIAN: 'median',
    MODE: 'mode',
    STDDEV: 'stddev',
    VARIANCE: 'variance',
    RATE: 'rate',
    TREND: 'trend',
  } as const,

  // Metric Formatting
  FORMATS: {
    NUMBER: 'number',
    PERCENTAGE: 'percentage',
    CURRENCY: 'currency',
    DURATION: 'duration',
    DECIMAL: 'decimal',
    SCIENTIFIC: 'scientific',
  } as const,

  // Metric Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,
} as const;

// Analytics Metric Types (Business)
export type AnalyticsBusinessMetric =
  (typeof ANALYTICS_METRIC.BUSINESS)[keyof typeof ANALYTICS_METRIC.BUSINESS];

// Analytics Metric Types (Customer)
export type AnalyticsCustomerMetric =
  (typeof ANALYTICS_METRIC.CUSTOMER)[keyof typeof ANALYTICS_METRIC.CUSTOMER];

// Analytics Metric Types (Sales)
export type AnalyticsSalesMetric =
  (typeof ANALYTICS_METRIC.SALES)[keyof typeof ANALYTICS_METRIC.SALES];

// Analytics Metric Types (Marketing)
export type AnalyticsMarketingMetric =
  (typeof ANALYTICS_METRIC.MARKETING)[keyof typeof ANALYTICS_METRIC.MARKETING];

// Analytics Metric Types (Product)
export type AnalyticsProductMetric =
  (typeof ANALYTICS_METRIC.PRODUCT)[keyof typeof ANALYTICS_METRIC.PRODUCT];

// Analytics Metric Types (Website)
export type AnalyticsWebsiteMetric =
  (typeof ANALYTICS_METRIC.WEBSITE)[keyof typeof ANALYTICS_METRIC.WEBSITE];

// Analytics Metric Types (Support)
export type AnalyticsSupportMetric =
  (typeof ANALYTICS_METRIC.SUPPORT)[keyof typeof ANALYTICS_METRIC.SUPPORT];

// Analytics Metric Types (System)
export type AnalyticsSystemMetric =
  (typeof ANALYTICS_METRIC.SYSTEM)[keyof typeof ANALYTICS_METRIC.SYSTEM];

// Analytics Metric Categories
export type AnalyticsMetricCategory =
  (typeof ANALYTICS_METRIC.CATEGORIES)[keyof typeof ANALYTICS_METRIC.CATEGORIES];

// Analytics Metric Types
export type AnalyticsMetricType =
  (typeof ANALYTICS_METRIC.TYPES)[keyof typeof ANALYTICS_METRIC.TYPES];

// Analytics Metric Aggregations
export type AnalyticsMetricAggregation =
  (typeof ANALYTICS_METRIC.AGGREGATIONS)[keyof typeof ANALYTICS_METRIC.AGGREGATIONS];

// Analytics Metric Formats
export type AnalyticsMetricFormat =
  (typeof ANALYTICS_METRIC.FORMATS)[keyof typeof ANALYTICS_METRIC.FORMATS];

// Analytics Metric Priority
export type AnalyticsMetricPriority =
  (typeof ANALYTICS_METRIC.PRIORITY)[keyof typeof ANALYTICS_METRIC.PRIORITY];

// Analytics Metric Label
export function getAnalyticsMetricLabel(metric: string): string {
  const labels: Record<string, string> = {
    // Business Metrics
    revenue: 'Revenue',
    gross_revenue: 'Gross Revenue',
    net_revenue: 'Net Revenue',
    recurring_revenue: 'Recurring Revenue',
    average_revenue: 'Average Revenue',
    profit: 'Profit',
    gross_profit: 'Gross Profit',
    net_profit: 'Net Profit',
    margin: 'Margin',
    gross_margin: 'Gross Margin',
    net_margin: 'Net Margin',
    growth: 'Growth',
    revenue_growth: 'Revenue Growth',
    user_growth: 'User Growth',
    market_share: 'Market Share',

    // Customer Metrics
    total_customers: 'Total Customers',
    new_customers: 'New Customers',
    active_customers: 'Active Customers',
    returning_customers: 'Returning Customers',
    churned_customers: 'Churned Customers',
    ltv: 'LTV',
    aov: 'AOV',
    clv: 'CLV',
    customer_value: 'Customer Value',
    cac: 'CAC',
    cpa: 'CPA',
    cpl: 'CPL',
    retention_rate: 'Retention Rate',
    churn_rate: 'Churn Rate',
    repeat_purchase_rate: 'Repeat Purchase Rate',

    // Sales Metrics
    total_orders: 'Total Orders',
    completed_orders: 'Completed Orders',
    cancelled_orders: 'Cancelled Orders',
    returned_orders: 'Returned Orders',
    units_sold: 'Units Sold',
    items_sold: 'Items Sold',
    sales_volume: 'Sales Volume',
    conversion_rate: 'Conversion Rate',
    average_order_value: 'Average Order Value',
    average_item_value: 'Average Item Value',
    sales_per_day: 'Sales Per Day',
    sales_per_customer: 'Sales Per Customer',

    // Marketing Metrics
    impressions: 'Impressions',
    clicks: 'Clicks',
    ctr: 'CTR',
    conversions: 'Conversions',
    roi: 'ROI',
    roas: 'ROAS',
    romi: 'ROMI',
    campaign_cost: 'Campaign Cost',
    cost_per_click: 'Cost Per Click',
    cost_per_impression: 'Cost Per Impression',
    cost_per_acquisition: 'Cost Per Acquisition',
    engagement_rate: 'Engagement Rate',
    bounce_rate: 'Bounce Rate',
    exit_rate: 'Exit Rate',
    click_through_rate: 'Click-through Rate',

    // Product Metrics
    inventory_count: 'Inventory Count',
    inventory_value: 'Inventory Value',
    turnover_rate: 'Turnover Rate',
    stock_out_rate: 'Stock-out Rate',
    product_views: 'Product Views',
    product_clicks: 'Product Clicks',
    product_conversions: 'Product Conversions',
    product_revenue: 'Product Revenue',
    product_rating: 'Product Rating',
    category_revenue: 'Category Revenue',
    category_sales: 'Category Sales',
    category_conversion: 'Category Conversion',

    // Website Metrics
    sessions: 'Sessions',
    users: 'Users',
    page_views: 'Page Views',
    average_session_duration: 'Average Session Duration',
    pages_per_session: 'Pages Per Session',
    scroll_depth: 'Scroll Depth',
    click_rate: 'Click Rate',
    interaction_rate: 'Interaction Rate',
    page_load_time: 'Page Load Time',
    server_response_time: 'Server Response Time',
    time_to_interactive: 'Time to Interactive',
    first_contentful_paint: 'First Contentful Paint',

    // Support Metrics
    total_tickets: 'Total Tickets',
    open_tickets: 'Open Tickets',
    closed_tickets: 'Closed Tickets',
    escalated_tickets: 'Escalated Tickets',
    average_resolution_time: 'Average Resolution Time',
    first_response_time: 'First Response Time',
    resolution_rate: 'Resolution Rate',
    csat: 'CSAT',
    nps: 'NPS',

    // System Metrics
    cpu_usage: 'CPU Usage',
    memory_usage: 'Memory Usage',
    disk_usage: 'Disk Usage',
    network_usage: 'Network Usage',
    uptime: 'Uptime',
    downtime: 'Downtime',
    availability: 'Availability',
    response_time: 'Response Time',
    error_count: 'Error Count',
    error_rate: 'Error Rate',
    fatal_errors: 'Fatal Errors',
  };

  return (
    labels[metric] || metric.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
}

// Analytics Metric Category Labels
export function getAnalyticsMetricCategoryLabel(category: AnalyticsMetricCategory): string {
  const labels: Record<AnalyticsMetricCategory, string> = {
    [ANALYTICS_METRIC.CATEGORIES.BUSINESS]: 'Business',
    [ANALYTICS_METRIC.CATEGORIES.CUSTOMER]: 'Customer',
    [ANALYTICS_METRIC.CATEGORIES.SALES]: 'Sales',
    [ANALYTICS_METRIC.CATEGORIES.MARKETING]: 'Marketing',
    [ANALYTICS_METRIC.CATEGORIES.PRODUCT]: 'Product',
    [ANALYTICS_METRIC.CATEGORIES.WEBSITE]: 'Website',
    [ANALYTICS_METRIC.CATEGORIES.SUPPORT]: 'Support',
    [ANALYTICS_METRIC.CATEGORIES.SYSTEM]: 'System',
  };
  return labels[category] || 'Unknown';
}

// Analytics Metric Type Labels
export function getAnalyticsMetricTypeLabel(type: AnalyticsMetricType): string {
  const labels: Record<AnalyticsMetricType, string> = {
    [ANALYTICS_METRIC.TYPES.COUNT]: 'Count',
    [ANALYTICS_METRIC.TYPES.RATE]: 'Rate',
    [ANALYTICS_METRIC.TYPES.PERCENTAGE]: 'Percentage',
    [ANALYTICS_METRIC.TYPES.AVERAGE]: 'Average',
    [ANALYTICS_METRIC.TYPES.TOTAL]: 'Total',
    [ANALYTICS_METRIC.TYPES.DURATION]: 'Duration',
    [ANALYTICS_METRIC.TYPES.CURRENCY]: 'Currency',
    [ANALYTICS_METRIC.TYPES.RATIO]: 'Ratio',
    [ANALYTICS_METRIC.TYPES.INDEX]: 'Index',
    [ANALYTICS_METRIC.TYPES.SCORE]: 'Score',
  };
  return labels[type] || 'Unknown';
}

// Analytics Metric Format Labels
export function getAnalyticsMetricFormatLabel(format: AnalyticsMetricFormat): string {
  const labels: Record<AnalyticsMetricFormat, string> = {
    [ANALYTICS_METRIC.FORMATS.NUMBER]: 'Number',
    [ANALYTICS_METRIC.FORMATS.PERCENTAGE]: 'Percentage',
    [ANALYTICS_METRIC.FORMATS.CURRENCY]: 'Currency',
    [ANALYTICS_METRIC.FORMATS.DURATION]: 'Duration',
    [ANALYTICS_METRIC.FORMATS.DECIMAL]: 'Decimal',
    [ANALYTICS_METRIC.FORMATS.SCIENTIFIC]: 'Scientific',
  };
  return labels[format] || 'Unknown';
}

// Analytics Metric Priority Labels
export function getAnalyticsMetricPriorityLabel(priority: AnalyticsMetricPriority): string {
  const labels: Record<AnalyticsMetricPriority, string> = {
    [ANALYTICS_METRIC.PRIORITY.CRITICAL]: 'Critical',
    [ANALYTICS_METRIC.PRIORITY.HIGH]: 'High',
    [ANALYTICS_METRIC.PRIORITY.MEDIUM]: 'Medium',
    [ANALYTICS_METRIC.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Get metric category
export function getAnalyticsMetricCategory(metric: string): AnalyticsMetricCategory {
  const businessMetrics: readonly string[] = Object.values(ANALYTICS_METRIC.BUSINESS);
  const customerMetrics: readonly string[] = Object.values(ANALYTICS_METRIC.CUSTOMER);
  const salesMetrics: readonly string[] = Object.values(ANALYTICS_METRIC.SALES);
  const marketingMetrics: readonly string[] = Object.values(ANALYTICS_METRIC.MARKETING);
  const productMetrics: readonly string[] = Object.values(ANALYTICS_METRIC.PRODUCT);
  const websiteMetrics: readonly string[] = Object.values(ANALYTICS_METRIC.WEBSITE);
  const supportMetrics: readonly string[] = Object.values(ANALYTICS_METRIC.SUPPORT);
  const systemMetrics: readonly string[] = Object.values(ANALYTICS_METRIC.SYSTEM);

  if (businessMetrics.includes(metric)) return ANALYTICS_METRIC.CATEGORIES.BUSINESS;
  if (customerMetrics.includes(metric)) return ANALYTICS_METRIC.CATEGORIES.CUSTOMER;
  if (salesMetrics.includes(metric)) return ANALYTICS_METRIC.CATEGORIES.SALES;
  if (marketingMetrics.includes(metric)) return ANALYTICS_METRIC.CATEGORIES.MARKETING;
  if (productMetrics.includes(metric)) return ANALYTICS_METRIC.CATEGORIES.PRODUCT;
  if (websiteMetrics.includes(metric)) return ANALYTICS_METRIC.CATEGORIES.WEBSITE;
  if (supportMetrics.includes(metric)) return ANALYTICS_METRIC.CATEGORIES.SUPPORT;
  if (systemMetrics.includes(metric)) return ANALYTICS_METRIC.CATEGORIES.SYSTEM;

  return ANALYTICS_METRIC.CATEGORIES.BUSINESS;
}
