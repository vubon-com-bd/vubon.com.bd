/**
 * AI Analytics Constants
 * Configuration for AI analytics and insights systems
 */

export const AI_ANALYTICS = {
  // Analytics Types
  TYPES: {
    DESCRIPTIVE: 'descriptive',
    DIAGNOSTIC: 'diagnostic',
    PREDICTIVE: 'predictive',
    PRESCRIPTIVE: 'prescriptive',
    COGNITIVE: 'cognitive',
    REAL_TIME: 'real_time',
    BATCH: 'batch',
    STREAMING: 'streaming',
    EXPLORATORY: 'exploratory',
    INFERENTIAL: 'inferential',
    CAUSAL: 'causal',
    MECHANISTIC: 'mechanistic',
  } as const,

  // Analytics Status
  STATUSES: {
    PENDING: 'pending',
    INITIALIZING: 'initializing',
    COLLECTING: 'collecting',
    PROCESSING: 'processing',
    ANALYZING: 'analyzing',
    GENERATING: 'generating',
    COMPLETED: 'completed',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    OPTIMIZED: 'optimized',
    CACHED: 'cached',
  } as const,

  // Analytics Categories
  CATEGORIES: {
    USER: 'user',
    PRODUCT: 'product',
    SALES: 'sales',
    ORDER: 'order',
    TRAFFIC: 'traffic',
    MARKETING: 'marketing',
    FINANCIAL: 'financial',
    OPERATIONAL: 'operational',
    CUSTOMER: 'customer',
    VENDOR: 'vendor',
    CHANNEL: 'channel',
    PERFORMANCE: 'performance',
    ENGAGEMENT: 'engagement',
    RETENTION: 'retention',
    ACQUISITION: 'acquisition',
    CONVERSION: 'conversion',
  } as const,

  // Analytics Dimensions
  DIMENSIONS: {
    TIME: 'time',
    DATE: 'date',
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
    LOCATION: 'location',
    CITY: 'city',
    STATE: 'state',
    COUNTRY: 'country',
    DEVICE: 'device',
    PLATFORM: 'platform',
    BROWSER: 'browser',
    OS: 'os',
    CHANNEL: 'channel',
    SOURCE: 'source',
    MEDIUM: 'medium',
    CAMPAIGN: 'campaign',
    CATEGORY: 'category',
    BRAND: 'brand',
    PRODUCT: 'product',
    USER: 'user',
    SEGMENT: 'segment',
  } as const,

  // Analytics Metrics
  METRICS: {
    // User Metrics
    USERS: 'users',
    NEW_USERS: 'new_users',
    ACTIVE_USERS: 'active_users',
    RETURNING_USERS: 'returning_users',
    BOUNCE_RATE: 'bounce_rate',
    SESSION_DURATION: 'session_duration',
    PAGES_PER_SESSION: 'pages_per_session',

    // Product Metrics
    PRODUCT_VIEWS: 'product_views',
    PRODUCT_CLICKS: 'product_clicks',
    ADD_TO_CART: 'add_to_cart',
    REMOVE_FROM_CART: 'remove_from_cart',
    PURCHASES: 'purchases',
    REVENUE: 'revenue',
    PROFIT: 'profit',
    MARGIN: 'margin',

    // Sales Metrics
    TOTAL_SALES: 'total_sales',
    AVERAGE_ORDER_VALUE: 'average_order_value',
    ORDER_COUNT: 'order_count',
    RETURN_RATE: 'return_rate',
    CANCELLATION_RATE: 'cancellation_rate',

    // Engagement Metrics
    ENGAGEMENT_RATE: 'engagement_rate',
    CLICK_THROUGH_RATE: 'click_through_rate',
    CONVERSION_RATE: 'conversion_rate',
    RETENTION_RATE: 'retention_rate',
    CHURN_RATE: 'churn_rate',

    // Financial Metrics
    REVENUE_GROWTH: 'revenue_growth',
    PROFIT_MARGIN: 'profit_margin',
    ROI: 'roi',
    ROAS: 'roas',
    LTV: 'ltv',
    CAC: 'cac',
  } as const,

  // Analytics Aggregations
  AGGREGATIONS: {
    SUM: 'sum',
    AVG: 'avg',
    COUNT: 'count',
    MIN: 'min',
    MAX: 'max',
    MEDIAN: 'median',
    MODE: 'mode',
    STDDEV: 'stddev',
    VARIANCE: 'variance',
    PERCENTILE: 'percentile',
    RATE: 'rate',
    RATIO: 'ratio',
    DISTRIBUTION: 'distribution',
    TREND: 'trend',
  } as const,

  // Analytics Periods
  PERIODS: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
    CUSTOM: 'custom',
  } as const,

  // Analytics Filters
  FILTERS: {
    DATE_RANGE: 'date_range',
    CATEGORY: 'category',
    BRAND: 'brand',
    PRODUCT: 'product',
    USER: 'user',
    LOCATION: 'location',
    DEVICE: 'device',
    CHANNEL: 'channel',
    CAMPAIGN: 'campaign',
    PRICE_RANGE: 'price_range',
    RATING: 'rating',
    STATUS: 'status',
  } as const,

  // Analytics Limits
  LIMITS: {
    DEFAULT: 100,
    MAX: 10000,
    PAGE_SIZE: 50,
    BATCH_SIZE: 1000,
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    MAX_FILTERS: 20,
    MAX_DIMENSIONS: 10,
    MAX_METRICS: 50,
  } as const,

  // Analytics Formats
  FORMATS: {
    JSON: 'json',
    CSV: 'csv',
    EXCEL: 'excel',
    PDF: 'pdf',
    HTML: 'html',
    XML: 'xml',
    PARQUET: 'parquet',
    AVRO: 'avro',
  } as const,

  // Analytics Granularity
  GRANULARITY: {
    SECOND: 'second',
    MINUTE: 'minute',
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
  } as const,
} as const;

// Analytics Types
export type AIAnalyticsType = (typeof AI_ANALYTICS.TYPES)[keyof typeof AI_ANALYTICS.TYPES];

// Analytics Status
export type AIAnalyticsStatus = (typeof AI_ANALYTICS.STATUSES)[keyof typeof AI_ANALYTICS.STATUSES];

// Analytics Categories
export type AIAnalyticsCategory =
  (typeof AI_ANALYTICS.CATEGORIES)[keyof typeof AI_ANALYTICS.CATEGORIES];

// Analytics Dimensions
export type AIAnalyticsDimension =
  (typeof AI_ANALYTICS.DIMENSIONS)[keyof typeof AI_ANALYTICS.DIMENSIONS];

// Analytics Metrics
export type AIAnalyticsMetric = (typeof AI_ANALYTICS.METRICS)[keyof typeof AI_ANALYTICS.METRICS];

// Analytics Aggregations
export type AIAnalyticsAggregation =
  (typeof AI_ANALYTICS.AGGREGATIONS)[keyof typeof AI_ANALYTICS.AGGREGATIONS];

// Analytics Periods
export type AIAnalyticsPeriod = (typeof AI_ANALYTICS.PERIODS)[keyof typeof AI_ANALYTICS.PERIODS];

// Analytics Filters
export type AIAnalyticsFilter = (typeof AI_ANALYTICS.FILTERS)[keyof typeof AI_ANALYTICS.FILTERS];

// Analytics Limits
export type AIAnalyticsLimit = (typeof AI_ANALYTICS.LIMITS)[keyof typeof AI_ANALYTICS.LIMITS];

// Analytics Formats
export type AIAnalyticsFormat = (typeof AI_ANALYTICS.FORMATS)[keyof typeof AI_ANALYTICS.FORMATS];

// Analytics Granularity
export type AIAnalyticsGranularity =
  (typeof AI_ANALYTICS.GRANULARITY)[keyof typeof AI_ANALYTICS.GRANULARITY];

// Utility Functions
export function getAnalyticsTypeLabel(type: AIAnalyticsType): string {
  const labels: Record<AIAnalyticsType, string> = {
    [AI_ANALYTICS.TYPES.DESCRIPTIVE]: 'Descriptive',
    [AI_ANALYTICS.TYPES.DIAGNOSTIC]: 'Diagnostic',
    [AI_ANALYTICS.TYPES.PREDICTIVE]: 'Predictive',
    [AI_ANALYTICS.TYPES.PRESCRIPTIVE]: 'Prescriptive',
    [AI_ANALYTICS.TYPES.COGNITIVE]: 'Cognitive',
    [AI_ANALYTICS.TYPES.REAL_TIME]: 'Real Time',
    [AI_ANALYTICS.TYPES.BATCH]: 'Batch',
    [AI_ANALYTICS.TYPES.STREAMING]: 'Streaming',
    [AI_ANALYTICS.TYPES.EXPLORATORY]: 'Exploratory',
    [AI_ANALYTICS.TYPES.INFERENTIAL]: 'Inferential',
    [AI_ANALYTICS.TYPES.CAUSAL]: 'Causal',
    [AI_ANALYTICS.TYPES.MECHANISTIC]: 'Mechanistic',
  };
  return labels[type] || 'Unknown';
}

export function getAnalyticsStatusLabel(status: AIAnalyticsStatus): string {
  const labels: Record<AIAnalyticsStatus, string> = {
    [AI_ANALYTICS.STATUSES.PENDING]: 'Pending',
    [AI_ANALYTICS.STATUSES.INITIALIZING]: 'Initializing',
    [AI_ANALYTICS.STATUSES.COLLECTING]: 'Collecting',
    [AI_ANALYTICS.STATUSES.PROCESSING]: 'Processing',
    [AI_ANALYTICS.STATUSES.ANALYZING]: 'Analyzing',
    [AI_ANALYTICS.STATUSES.GENERATING]: 'Generating',
    [AI_ANALYTICS.STATUSES.COMPLETED]: 'Completed',
    [AI_ANALYTICS.STATUSES.DELIVERED]: 'Delivered',
    [AI_ANALYTICS.STATUSES.FAILED]: 'Failed',
    [AI_ANALYTICS.STATUSES.EXPIRED]: 'Expired',
    [AI_ANALYTICS.STATUSES.ARCHIVED]: 'Archived',
    [AI_ANALYTICS.STATUSES.OPTIMIZED]: 'Optimized',
    [AI_ANALYTICS.STATUSES.CACHED]: 'Cached',
  };
  return labels[status] || 'Unknown';
}

export function getAnalyticsCategoryLabel(category: AIAnalyticsCategory): string {
  const labels: Record<AIAnalyticsCategory, string> = {
    [AI_ANALYTICS.CATEGORIES.USER]: 'User',
    [AI_ANALYTICS.CATEGORIES.PRODUCT]: 'Product',
    [AI_ANALYTICS.CATEGORIES.SALES]: 'Sales',
    [AI_ANALYTICS.CATEGORIES.ORDER]: 'Order',
    [AI_ANALYTICS.CATEGORIES.TRAFFIC]: 'Traffic',
    [AI_ANALYTICS.CATEGORIES.MARKETING]: 'Marketing',
    [AI_ANALYTICS.CATEGORIES.FINANCIAL]: 'Financial',
    [AI_ANALYTICS.CATEGORIES.OPERATIONAL]: 'Operational',
    [AI_ANALYTICS.CATEGORIES.CUSTOMER]: 'Customer',
    [AI_ANALYTICS.CATEGORIES.VENDOR]: 'Vendor',
    [AI_ANALYTICS.CATEGORIES.CHANNEL]: 'Channel',
    [AI_ANALYTICS.CATEGORIES.PERFORMANCE]: 'Performance',
    [AI_ANALYTICS.CATEGORIES.ENGAGEMENT]: 'Engagement',
    [AI_ANALYTICS.CATEGORIES.RETENTION]: 'Retention',
    [AI_ANALYTICS.CATEGORIES.ACQUISITION]: 'Acquisition',
    [AI_ANALYTICS.CATEGORIES.CONVERSION]: 'Conversion',
  };
  return labels[category] || 'Unknown';
}

export function getAnalyticsMetricLabel(metric: AIAnalyticsMetric): string {
  const labels: Record<AIAnalyticsMetric, string> = {
    // User Metrics
    [AI_ANALYTICS.METRICS.USERS]: 'Users',
    [AI_ANALYTICS.METRICS.NEW_USERS]: 'New Users',
    [AI_ANALYTICS.METRICS.ACTIVE_USERS]: 'Active Users',
    [AI_ANALYTICS.METRICS.RETURNING_USERS]: 'Returning Users',
    [AI_ANALYTICS.METRICS.BOUNCE_RATE]: 'Bounce Rate',
    [AI_ANALYTICS.METRICS.SESSION_DURATION]: 'Session Duration',
    [AI_ANALYTICS.METRICS.PAGES_PER_SESSION]: 'Pages per Session',
    // Product Metrics
    [AI_ANALYTICS.METRICS.PRODUCT_VIEWS]: 'Product Views',
    [AI_ANALYTICS.METRICS.PRODUCT_CLICKS]: 'Product Clicks',
    [AI_ANALYTICS.METRICS.ADD_TO_CART]: 'Add to Cart',
    [AI_ANALYTICS.METRICS.REMOVE_FROM_CART]: 'Remove from Cart',
    [AI_ANALYTICS.METRICS.PURCHASES]: 'Purchases',
    [AI_ANALYTICS.METRICS.REVENUE]: 'Revenue',
    [AI_ANALYTICS.METRICS.PROFIT]: 'Profit',
    [AI_ANALYTICS.METRICS.MARGIN]: 'Margin',
    // Sales Metrics
    [AI_ANALYTICS.METRICS.TOTAL_SALES]: 'Total Sales',
    [AI_ANALYTICS.METRICS.AVERAGE_ORDER_VALUE]: 'Average Order Value',
    [AI_ANALYTICS.METRICS.ORDER_COUNT]: 'Order Count',
    [AI_ANALYTICS.METRICS.RETURN_RATE]: 'Return Rate',
    [AI_ANALYTICS.METRICS.CANCELLATION_RATE]: 'Cancellation Rate',
    // Engagement Metrics
    [AI_ANALYTICS.METRICS.ENGAGEMENT_RATE]: 'Engagement Rate',
    [AI_ANALYTICS.METRICS.CLICK_THROUGH_RATE]: 'Click Through Rate',
    [AI_ANALYTICS.METRICS.CONVERSION_RATE]: 'Conversion Rate',
    [AI_ANALYTICS.METRICS.RETENTION_RATE]: 'Retention Rate',
    [AI_ANALYTICS.METRICS.CHURN_RATE]: 'Churn Rate',
    // Financial Metrics
    [AI_ANALYTICS.METRICS.REVENUE_GROWTH]: 'Revenue Growth',
    [AI_ANALYTICS.METRICS.PROFIT_MARGIN]: 'Profit Margin',
    [AI_ANALYTICS.METRICS.ROI]: 'ROI',
    [AI_ANALYTICS.METRICS.ROAS]: 'ROAS',
    [AI_ANALYTICS.METRICS.LTV]: 'Lifetime Value',
    [AI_ANALYTICS.METRICS.CAC]: 'Customer Acquisition Cost',
  };
  return labels[metric] || 'Unknown';
}

export function getAnalyticsAggregationLabel(aggregation: AIAnalyticsAggregation): string {
  const labels: Record<AIAnalyticsAggregation, string> = {
    [AI_ANALYTICS.AGGREGATIONS.SUM]: 'Sum',
    [AI_ANALYTICS.AGGREGATIONS.AVG]: 'Average',
    [AI_ANALYTICS.AGGREGATIONS.COUNT]: 'Count',
    [AI_ANALYTICS.AGGREGATIONS.MIN]: 'Minimum',
    [AI_ANALYTICS.AGGREGATIONS.MAX]: 'Maximum',
    [AI_ANALYTICS.AGGREGATIONS.MEDIAN]: 'Median',
    [AI_ANALYTICS.AGGREGATIONS.MODE]: 'Mode',
    [AI_ANALYTICS.AGGREGATIONS.STDDEV]: 'Standard Deviation',
    [AI_ANALYTICS.AGGREGATIONS.VARIANCE]: 'Variance',
    [AI_ANALYTICS.AGGREGATIONS.PERCENTILE]: 'Percentile',
    [AI_ANALYTICS.AGGREGATIONS.RATE]: 'Rate',
    [AI_ANALYTICS.AGGREGATIONS.RATIO]: 'Ratio',
    [AI_ANALYTICS.AGGREGATIONS.DISTRIBUTION]: 'Distribution',
    [AI_ANALYTICS.AGGREGATIONS.TREND]: 'Trend',
  };
  return labels[aggregation] || 'Unknown';
}

export function getAnalyticsPeriodLabel(period: AIAnalyticsPeriod): string {
  const labels: Record<AIAnalyticsPeriod, string> = {
    [AI_ANALYTICS.PERIODS.HOURLY]: 'Hourly',
    [AI_ANALYTICS.PERIODS.DAILY]: 'Daily',
    [AI_ANALYTICS.PERIODS.WEEKLY]: 'Weekly',
    [AI_ANALYTICS.PERIODS.MONTHLY]: 'Monthly',
    [AI_ANALYTICS.PERIODS.QUARTERLY]: 'Quarterly',
    [AI_ANALYTICS.PERIODS.YEARLY]: 'Yearly',
    [AI_ANALYTICS.PERIODS.CUSTOM]: 'Custom',
  };
  return labels[period] || 'Unknown';
}

export function getAnalyticsFormatLabel(format: AIAnalyticsFormat): string {
  const labels: Record<AIAnalyticsFormat, string> = {
    [AI_ANALYTICS.FORMATS.JSON]: 'JSON',
    [AI_ANALYTICS.FORMATS.CSV]: 'CSV',
    [AI_ANALYTICS.FORMATS.EXCEL]: 'Excel',
    [AI_ANALYTICS.FORMATS.PDF]: 'PDF',
    [AI_ANALYTICS.FORMATS.HTML]: 'HTML',
    [AI_ANALYTICS.FORMATS.XML]: 'XML',
    [AI_ANALYTICS.FORMATS.PARQUET]: 'Parquet',
    [AI_ANALYTICS.FORMATS.AVRO]: 'Avro',
  };
  return labels[format] || 'Unknown';
}

export function getAnalyticsGranularityLabel(granularity: AIAnalyticsGranularity): string {
  const labels: Record<AIAnalyticsGranularity, string> = {
    [AI_ANALYTICS.GRANULARITY.SECOND]: 'Second',
    [AI_ANALYTICS.GRANULARITY.MINUTE]: 'Minute',
    [AI_ANALYTICS.GRANULARITY.HOUR]: 'Hour',
    [AI_ANALYTICS.GRANULARITY.DAY]: 'Day',
    [AI_ANALYTICS.GRANULARITY.WEEK]: 'Week',
    [AI_ANALYTICS.GRANULARITY.MONTH]: 'Month',
    [AI_ANALYTICS.GRANULARITY.QUARTER]: 'Quarter',
    [AI_ANALYTICS.GRANULARITY.YEAR]: 'Year',
  };
  return labels[granularity] || 'Unknown';
}

export function isAnalyticsActive(status: AIAnalyticsStatus): boolean {
  const activeStatuses: AIAnalyticsStatus[] = [
    AI_ANALYTICS.STATUSES.PENDING,
    AI_ANALYTICS.STATUSES.INITIALIZING,
    AI_ANALYTICS.STATUSES.COLLECTING,
    AI_ANALYTICS.STATUSES.PROCESSING,
    AI_ANALYTICS.STATUSES.ANALYZING,
    AI_ANALYTICS.STATUSES.GENERATING,
    AI_ANALYTICS.STATUSES.OPTIMIZED,
  ];
  return activeStatuses.includes(status);
}

export function isAnalyticsComplete(status: AIAnalyticsStatus): boolean {
  const completeStatuses: AIAnalyticsStatus[] = [
    AI_ANALYTICS.STATUSES.COMPLETED,
    AI_ANALYTICS.STATUSES.DELIVERED,
    AI_ANALYTICS.STATUSES.CACHED,
    AI_ANALYTICS.STATUSES.ARCHIVED,
  ];
  return completeStatuses.includes(status);
}

export function isAnalyticsFailed(status: AIAnalyticsStatus): boolean {
  return status === AI_ANALYTICS.STATUSES.FAILED;
}

export function getDefaultAnalyticsLimit(): number {
  return AI_ANALYTICS.LIMITS.DEFAULT;
}

export function getMaxAnalyticsLimit(): number {
  return AI_ANALYTICS.LIMITS.MAX;
}
