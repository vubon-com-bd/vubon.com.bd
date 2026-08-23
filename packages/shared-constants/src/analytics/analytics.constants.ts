/**
 * Analytics Constants
 * Configuration for analytics tracking, metrics, and reporting
 */

export const ANALYTICS = {
  // Analytics Types
  TYPES: {
    USER_ANALYTICS: 'user_analytics',
    PRODUCT_ANALYTICS: 'product_analytics',
    SALES_ANALYTICS: 'sales_analytics',
    ORDER_ANALYTICS: 'order_analytics',
    VENDOR_ANALYTICS: 'vendor_analytics',
    MARKETING_ANALYTICS: 'marketing_analytics',
    TRAFFIC_ANALYTICS: 'traffic_analytics',
    PERFORMANCE_ANALYTICS: 'performance_analytics',
    FINANCIAL_ANALYTICS: 'financial_analytics',
    INVENTORY_ANALYTICS: 'inventory_analytics',
    CUSTOMER_ANALYTICS: 'customer_analytics',
    SUPPORT_ANALYTICS: 'support_analytics',
    CHANNEL_ANALYTICS: 'channel_analytics',
    ACQUISITION_ANALYTICS: 'acquisition_analytics',
    ENGAGEMENT_ANALYTICS: 'engagement_analytics',
    RETENTION_ANALYTICS: 'retention_analytics',
  } as const,

  // Analytics Status
  STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PARTIAL: 'partial',
    CANCELLED: 'cancelled',
  } as const,

  // Analytics Timeframes
  TIMEFRAMES: {
    REALTIME: 'realtime',
    LAST_HOUR: 'last_hour',
    LAST_24_HOURS: 'last_24_hours',
    LAST_7_DAYS: 'last_7_days',
    LAST_30_DAYS: 'last_30_days',
    LAST_90_DAYS: 'last_90_days',
    LAST_12_MONTHS: 'last_12_months',
    CUSTOM: 'custom',
  } as const,

  // Analytics Intervals
  INTERVALS: {
    MINUTE: 'minute',
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
  } as const,

  // Analytics Aggregations
  AGGREGATIONS: {
    SUM: 'sum',
    AVG: 'avg',
    MIN: 'min',
    MAX: 'max',
    COUNT: 'count',
    UNIQUE: 'unique',
    PERCENTILE: 'percentile',
    MEDIAN: 'median',
    MODE: 'mode',
    STDDEV: 'stddev',
    VARIANCE: 'variance',
  } as const,

  // Analytics Comparisons
  COMPARISONS: {
    PREVIOUS_PERIOD: 'previous_period',
    YEAR_OVER_YEAR: 'year_over_year',
    PERIOD_OVER_PERIOD: 'period_over_period',
    CUSTOM: 'custom',
  } as const,

  // Analytics Trends
  TRENDS: {
    UP: 'up',
    DOWN: 'down',
    STABLE: 'stable',
    VOLATILE: 'volatile',
  } as const,

  // Analytics Events
  EVENTS: {
    PAGE_VIEW: 'page_view',
    CLICK: 'click',
    SCROLL: 'scroll',
    IMPRESSION: 'impression',
    CONVERSION: 'conversion',
    CHECKOUT: 'checkout',
    PURCHASE: 'purchase',
    ADD_TO_CART: 'add_to_cart',
    REMOVE_FROM_CART: 'remove_from_cart',
    WISHLIST: 'wishlist',
    SEARCH: 'search',
    FILTER: 'filter',
    SHARE: 'share',
    REVIEW: 'review',
    RATING: 'rating',
    REFERRAL: 'referral',
    SIGNUP: 'signup',
    LOGIN: 'login',
    LOGOUT: 'logout',
    PROFILE_UPDATE: 'profile_update',
    SUBSCRIPTION: 'subscription',
    CANCELLATION: 'cancellation',
  } as const,

  // Analytics Dimensions
  DIMENSIONS: {
    USER_ID: 'user_id',
    SESSION_ID: 'session_id',
    DEVICE_TYPE: 'device_type',
    BROWSER: 'browser',
    OS: 'os',
    COUNTRY: 'country',
    CITY: 'city',
    REGION: 'region',
    SOURCE: 'source',
    MEDIUM: 'medium',
    CAMPAIGN: 'campaign',
    TERM: 'term',
    CONTENT: 'content',
    PAGE_URL: 'page_url',
    REFERRER: 'referrer',
    USER_AGENT: 'user_agent',
    IP_ADDRESS: 'ip_address',
  } as const,

  // Analytics Metrics
  METRICS: {
    REVENUE: 'revenue',
    ORDERS: 'orders',
    UNITS_SOLD: 'units_sold',
    CUSTOMERS: 'customers',
    SESSIONS: 'sessions',
    PAGE_VIEWS: 'page_views',
    BOUNCE_RATE: 'bounce_rate',
    CONVERSION_RATE: 'conversion_rate',
    AOV: 'aov',
    LTV: 'ltv',
    CAC: 'cac',
    ROI: 'roi',
    CTR: 'ctr',
    IMPRESSIONS: 'impressions',
    CLICKS: 'clicks',
    COST: 'cost',
    PROFIT: 'profit',
    MARGIN: 'margin',
  } as const,

  // Analytics Filters
  FILTERS: {
    EQUALS: 'equals',
    NOT_EQUALS: 'not_equals',
    CONTAINS: 'contains',
    NOT_CONTAINS: 'not_contains',
    STARTS_WITH: 'starts_with',
    ENDS_WITH: 'ends_with',
    GREATER_THAN: 'greater_than',
    LESS_THAN: 'less_than',
    BETWEEN: 'between',
    IN: 'in',
    NOT_IN: 'not_in',
    IS_NULL: 'is_null',
    IS_NOT_NULL: 'is_not_null',
  } as const,

  // Analytics Permissions
  PERMISSIONS: {
    VIEW: 'analytics:view',
    CREATE: 'analytics:create',
    EDIT: 'analytics:edit',
    DELETE: 'analytics:delete',
    EXPORT: 'analytics:export',
    SHARE: 'analytics:share',
    ADMIN: 'analytics:admin',
  } as const,

  // Analytics Export Formats
  EXPORT_FORMATS: {
    CSV: 'csv',
    JSON: 'json',
    EXCEL: 'excel',
    PDF: 'pdf',
    PNG: 'png',
    SVG: 'svg',
  } as const,
} as const;

// Analytics Types
export type AnalyticsType = (typeof ANALYTICS.TYPES)[keyof typeof ANALYTICS.TYPES];

// Analytics Status
export type AnalyticsStatus = (typeof ANALYTICS.STATUS)[keyof typeof ANALYTICS.STATUS];

// Analytics Timeframes
export type AnalyticsTimeframe = (typeof ANALYTICS.TIMEFRAMES)[keyof typeof ANALYTICS.TIMEFRAMES];

// Analytics Intervals
export type AnalyticsInterval = (typeof ANALYTICS.INTERVALS)[keyof typeof ANALYTICS.INTERVALS];

// Analytics Aggregations
export type AnalyticsAggregation =
  (typeof ANALYTICS.AGGREGATIONS)[keyof typeof ANALYTICS.AGGREGATIONS];

// Analytics Comparisons
export type AnalyticsComparison =
  (typeof ANALYTICS.COMPARISONS)[keyof typeof ANALYTICS.COMPARISONS];

// Analytics Trends
export type AnalyticsTrend = (typeof ANALYTICS.TRENDS)[keyof typeof ANALYTICS.TRENDS];

// Analytics Events
export type AnalyticsEvent = (typeof ANALYTICS.EVENTS)[keyof typeof ANALYTICS.EVENTS];

// Analytics Dimensions
export type AnalyticsDimension = (typeof ANALYTICS.DIMENSIONS)[keyof typeof ANALYTICS.DIMENSIONS];

// Analytics Metrics
export type AnalyticsMetric = (typeof ANALYTICS.METRICS)[keyof typeof ANALYTICS.METRICS];

// Analytics Filters
export type AnalyticsFilter = (typeof ANALYTICS.FILTERS)[keyof typeof ANALYTICS.FILTERS];

// Analytics Permissions
export type AnalyticsPermission =
  (typeof ANALYTICS.PERMISSIONS)[keyof typeof ANALYTICS.PERMISSIONS];

// Analytics Export Formats
export type AnalyticsExportFormat =
  (typeof ANALYTICS.EXPORT_FORMATS)[keyof typeof ANALYTICS.EXPORT_FORMATS];

// Analytics Status Labels
export function getAnalyticsStatusLabel(status: AnalyticsStatus): string {
  const labels: Record<AnalyticsStatus, string> = {
    [ANALYTICS.STATUS.PENDING]: 'Pending',
    [ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [ANALYTICS.STATUS.FAILED]: 'Failed',
    [ANALYTICS.STATUS.PARTIAL]: 'Partial',
    [ANALYTICS.STATUS.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown';
}

// Analytics Timeframe Labels
export function getAnalyticsTimeframeLabel(timeframe: AnalyticsTimeframe): string {
  const labels: Record<AnalyticsTimeframe, string> = {
    [ANALYTICS.TIMEFRAMES.REALTIME]: 'Real-time',
    [ANALYTICS.TIMEFRAMES.LAST_HOUR]: 'Last Hour',
    [ANALYTICS.TIMEFRAMES.LAST_24_HOURS]: 'Last 24 Hours',
    [ANALYTICS.TIMEFRAMES.LAST_7_DAYS]: 'Last 7 Days',
    [ANALYTICS.TIMEFRAMES.LAST_30_DAYS]: 'Last 30 Days',
    [ANALYTICS.TIMEFRAMES.LAST_90_DAYS]: 'Last 90 Days',
    [ANALYTICS.TIMEFRAMES.LAST_12_MONTHS]: 'Last 12 Months',
    [ANALYTICS.TIMEFRAMES.CUSTOM]: 'Custom',
  };
  return labels[timeframe] || 'Unknown';
}

// Analytics Interval Labels
export function getAnalyticsIntervalLabel(interval: AnalyticsInterval): string {
  const labels: Record<AnalyticsInterval, string> = {
    [ANALYTICS.INTERVALS.MINUTE]: 'Minute',
    [ANALYTICS.INTERVALS.HOUR]: 'Hour',
    [ANALYTICS.INTERVALS.DAY]: 'Day',
    [ANALYTICS.INTERVALS.WEEK]: 'Week',
    [ANALYTICS.INTERVALS.MONTH]: 'Month',
    [ANALYTICS.INTERVALS.QUARTER]: 'Quarter',
    [ANALYTICS.INTERVALS.YEAR]: 'Year',
  };
  return labels[interval] || 'Unknown';
}

// Analytics Trend Labels
export function getAnalyticsTrendLabel(trend: AnalyticsTrend): string {
  const labels: Record<AnalyticsTrend, string> = {
    [ANALYTICS.TRENDS.UP]: 'Upward',
    [ANALYTICS.TRENDS.DOWN]: 'Downward',
    [ANALYTICS.TRENDS.STABLE]: 'Stable',
    [ANALYTICS.TRENDS.VOLATILE]: 'Volatile',
  };
  return labels[trend] || 'Unknown';
}

// Analytics Event Labels
export function getAnalyticsEventLabel(event: AnalyticsEvent): string {
  const labels: Record<AnalyticsEvent, string> = {
    [ANALYTICS.EVENTS.PAGE_VIEW]: 'Page View',
    [ANALYTICS.EVENTS.CLICK]: 'Click',
    [ANALYTICS.EVENTS.SCROLL]: 'Scroll',
    [ANALYTICS.EVENTS.IMPRESSION]: 'Impression',
    [ANALYTICS.EVENTS.CONVERSION]: 'Conversion',
    [ANALYTICS.EVENTS.CHECKOUT]: 'Checkout',
    [ANALYTICS.EVENTS.PURCHASE]: 'Purchase',
    [ANALYTICS.EVENTS.ADD_TO_CART]: 'Add to Cart',
    [ANALYTICS.EVENTS.REMOVE_FROM_CART]: 'Remove from Cart',
    [ANALYTICS.EVENTS.WISHLIST]: 'Wishlist',
    [ANALYTICS.EVENTS.SEARCH]: 'Search',
    [ANALYTICS.EVENTS.FILTER]: 'Filter',
    [ANALYTICS.EVENTS.SHARE]: 'Share',
    [ANALYTICS.EVENTS.REVIEW]: 'Review',
    [ANALYTICS.EVENTS.RATING]: 'Rating',
    [ANALYTICS.EVENTS.REFERRAL]: 'Referral',
    [ANALYTICS.EVENTS.SIGNUP]: 'Signup',
    [ANALYTICS.EVENTS.LOGIN]: 'Login',
    [ANALYTICS.EVENTS.LOGOUT]: 'Logout',
    [ANALYTICS.EVENTS.PROFILE_UPDATE]: 'Profile Update',
    [ANALYTICS.EVENTS.SUBSCRIPTION]: 'Subscription',
    [ANALYTICS.EVENTS.CANCELLATION]: 'Cancellation',
  };
  return labels[event] || 'Unknown';
}

// Analytics Metric Labels
export function getAnalyticsMetricLabel(metric: AnalyticsMetric): string {
  const labels: Record<AnalyticsMetric, string> = {
    [ANALYTICS.METRICS.REVENUE]: 'Revenue',
    [ANALYTICS.METRICS.ORDERS]: 'Orders',
    [ANALYTICS.METRICS.UNITS_SOLD]: 'Units Sold',
    [ANALYTICS.METRICS.CUSTOMERS]: 'Customers',
    [ANALYTICS.METRICS.SESSIONS]: 'Sessions',
    [ANALYTICS.METRICS.PAGE_VIEWS]: 'Page Views',
    [ANALYTICS.METRICS.BOUNCE_RATE]: 'Bounce Rate',
    [ANALYTICS.METRICS.CONVERSION_RATE]: 'Conversion Rate',
    [ANALYTICS.METRICS.AOV]: 'Average Order Value',
    [ANALYTICS.METRICS.LTV]: 'Customer Lifetime Value',
    [ANALYTICS.METRICS.CAC]: 'Customer Acquisition Cost',
    [ANALYTICS.METRICS.ROI]: 'Return on Investment',
    [ANALYTICS.METRICS.CTR]: 'Click-through Rate',
    [ANALYTICS.METRICS.IMPRESSIONS]: 'Impressions',
    [ANALYTICS.METRICS.CLICKS]: 'Clicks',
    [ANALYTICS.METRICS.COST]: 'Cost',
    [ANALYTICS.METRICS.PROFIT]: 'Profit',
    [ANALYTICS.METRICS.MARGIN]: 'Margin',
  };
  return labels[metric] || 'Unknown';
}

// Analytics Permission Labels
export function getAnalyticsPermissionLabel(permission: AnalyticsPermission): string {
  const labels: Record<AnalyticsPermission, string> = {
    [ANALYTICS.PERMISSIONS.VIEW]: 'View',
    [ANALYTICS.PERMISSIONS.CREATE]: 'Create',
    [ANALYTICS.PERMISSIONS.EDIT]: 'Edit',
    [ANALYTICS.PERMISSIONS.DELETE]: 'Delete',
    [ANALYTICS.PERMISSIONS.EXPORT]: 'Export',
    [ANALYTICS.PERMISSIONS.SHARE]: 'Share',
    [ANALYTICS.PERMISSIONS.ADMIN]: 'Admin',
  };
  return labels[permission] || 'Unknown';
}

// Check if analytics is completed
export function isAnalyticsCompleted(status: AnalyticsStatus): boolean {
  return status === ANALYTICS.STATUS.COMPLETED;
}

// Check if analytics is processing
export function isAnalyticsProcessing(status: AnalyticsStatus): boolean {
  return status === ANALYTICS.STATUS.PROCESSING || status === ANALYTICS.STATUS.PENDING;
}

// Check if analytics has failed
export function isAnalyticsFailed(status: AnalyticsStatus): boolean {
  return status === ANALYTICS.STATUS.FAILED;
}

// Check if analytics is in final state
export function isAnalyticsFinal(status: AnalyticsStatus): boolean {
  const finalStates: AnalyticsStatus[] = [
    ANALYTICS.STATUS.COMPLETED,
    ANALYTICS.STATUS.FAILED,
    ANALYTICS.STATUS.CANCELLED,
  ];
  return finalStates.includes(status);
}
