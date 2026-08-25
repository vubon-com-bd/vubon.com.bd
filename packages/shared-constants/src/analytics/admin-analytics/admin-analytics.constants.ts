/**
 * Admin Analytics Constants
 * Core constants for admin analytics
 * @module AdminAnalyticsConstants
 */

/**
 * Admin analytics object
 * Main container for all admin analytics-related constants
 */
export const ADMIN_ANALYTICS = 'ADMIN_ANALYTICS' as const;

/**
 * Admin analytics metric labels
 */
export const ADMIN_ANALYTICS_METRIC_LABELS = {
  TOTAL_USERS: 'Total Users',
  ACTIVE_USERS: 'Active Users',
  NEW_USERS: 'New Users',
  TOTAL_ORDERS: 'Total Orders',
  TOTAL_REVENUE: 'Total Revenue',
  AVERAGE_ORDER_VALUE: 'Average Order Value',
  CONVERSION_RATE: 'Conversion Rate',
  BOUNCE_RATE: 'Bounce Rate',
  PAGE_VIEWS: 'Page Views',
  SESSION_DURATION: 'Session Duration',
  CUSTOMER_SATISFACTION: 'Customer Satisfaction',
  SUPPORT_TICKETS: 'Support Tickets',
  RESPONSE_TIME: 'Response Time',
  RESOLUTION_RATE: 'Resolution Rate',
  INVENTORY_TURNOVER: 'Inventory Turnover',
  STOCK_LEVEL: 'Stock Level',
  SHIPPING_TIME: 'Shipping Time',
  DELIVERY_SUCCESS_RATE: 'Delivery Success Rate',
  CART_ABANDONMENT: 'Cart Abandonment',
  CHECKOUT_COMPLETION: 'Checkout Completion',
} as const;

/**
 * Admin analytics dimension labels
 */
export const ADMIN_ANALYTICS_DIMENSION_LABELS = {
  DATE: 'Date',
  TIME: 'Time',
  DAY: 'Day',
  WEEK: 'Week',
  MONTH: 'Month',
  QUARTER: 'Quarter',
  YEAR: 'Year',
  USER_TYPE: 'User Type',
  USER_ROLE: 'User Role',
  DEPARTMENT: 'Department',
  TEAM: 'Team',
  REGION: 'Region',
  COUNTRY: 'Country',
  CITY: 'City',
  DEVICE_TYPE: 'Device Type',
  BROWSER: 'Browser',
  OS: 'Operating System',
  SOURCE: 'Source',
  MEDIUM: 'Medium',
  CAMPAIGN: 'Campaign',
  PRODUCT_CATEGORY: 'Product Category',
  PRODUCT: 'Product',
  ORDER_STATUS: 'Order Status',
  PAYMENT_METHOD: 'Payment Method',
} as const;

/**
 * Admin analytics aggregation labels
 */
export const ADMIN_ANALYTICS_AGGREGATION_LABELS = {
  SUM: 'Sum',
  AVG: 'Average',
  MIN: 'Minimum',
  MAX: 'Maximum',
  COUNT: 'Count',
  DISTINCT_COUNT: 'Distinct Count',
  MEDIAN: 'Median',
  MODE: 'Mode',
  STD_DEV: 'Standard Deviation',
  VARIANCE: 'Variance',
  PERCENTILE_25: '25th Percentile',
  PERCENTILE_50: '50th Percentile',
  PERCENTILE_75: '75th Percentile',
  PERCENTILE_90: '90th Percentile',
  PERCENTILE_95: '95th Percentile',
  PERCENTILE_99: '99th Percentile',
} as const;

/**
 * Admin analytics period labels
 */
export const ADMIN_ANALYTICS_PERIOD_LABELS = {
  LAST_HOUR: 'Last Hour',
  LAST_24_HOURS: 'Last 24 Hours',
  LAST_7_DAYS: 'Last 7 Days',
  LAST_14_DAYS: 'Last 14 Days',
  LAST_30_DAYS: 'Last 30 Days',
  LAST_60_DAYS: 'Last 60 Days',
  LAST_90_DAYS: 'Last 90 Days',
  LAST_180_DAYS: 'Last 180 Days',
  LAST_365_DAYS: 'Last 365 Days',
  THIS_WEEK: 'This Week',
  THIS_MONTH: 'This Month',
  THIS_QUARTER: 'This Quarter',
  THIS_YEAR: 'This Year',
  CUSTOM: 'Custom',
} as const;

/**
 * Admin analytics status labels
 */
export const ADMIN_ANALYTICS_STATUS_LABELS = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled',
  EXPIRED: 'Expired',
} as const;

/**
 * Admin analytics status colors
 */
export const ADMIN_ANALYTICS_STATUS_COLORS = {
  PENDING: '#FBBF24',
  PROCESSING: '#60A5FA',
  COMPLETED: '#34D399',
  FAILED: '#F87171',
  CANCELLED: '#9CA3AF',
  EXPIRED: '#F59E0B',
} as const;

/**
 * Admin analytics type labels
 */
export const ADMIN_ANALYTICS_TYPE_LABELS = {
  USER: 'User Analytics',
  ORDER: 'Order Analytics',
  REVENUE: 'Revenue Analytics',
  PRODUCT: 'Product Analytics',
  INVENTORY: 'Inventory Analytics',
  SUPPORT: 'Support Analytics',
  MARKETING: 'Marketing Analytics',
  SALES: 'Sales Analytics',
  PERFORMANCE: 'Performance Analytics',
  CUSTOM: 'Custom Analytics',
} as const;

/**
 * Admin analytics source labels
 */
export const ADMIN_ANALYTICS_SOURCE_LABELS = {
  DATABASE: 'Database',
  API: 'API',
  THIRD_PARTY: 'Third Party',
  MANUAL: 'Manual',
  SYSTEM: 'System',
  IMPORT: 'Import',
} as const;

/**
 * Admin analytics category labels
 */
export const ADMIN_ANALYTICS_CATEGORY_LABELS = {
  BUSINESS: 'Business',
  OPERATIONAL: 'Operational',
  FINANCIAL: 'Financial',
  CUSTOMER: 'Customer',
  PRODUCT: 'Product',
  MARKETING: 'Marketing',
  SUPPORT: 'Support',
  HUMAN_RESOURCES: 'Human Resources',
  IT: 'IT & Infrastructure',
  SECURITY: 'Security',
} as const;

// ============================================================
// Types
// ============================================================

/**
 * Admin analytics metric type
 */
export type AdminAnalyticsMetric = keyof typeof ADMIN_ANALYTICS_METRIC_LABELS;

/**
 * Admin analytics dimension type
 */
export type AdminAnalyticsDimension = keyof typeof ADMIN_ANALYTICS_DIMENSION_LABELS;

/**
 * Admin analytics aggregation type
 */
export type AdminAnalyticsAggregation = keyof typeof ADMIN_ANALYTICS_AGGREGATION_LABELS;

/**
 * Admin analytics period type
 */
export type AdminAnalyticsPeriod = keyof typeof ADMIN_ANALYTICS_PERIOD_LABELS;

/**
 * Admin analytics status type
 */
export type AdminAnalyticsStatus = keyof typeof ADMIN_ANALYTICS_STATUS_LABELS;

/**
 * Admin analytics type type
 */
export type AdminAnalyticsType = keyof typeof ADMIN_ANALYTICS_TYPE_LABELS;

/**
 * Admin analytics source type
 */
export type AdminAnalyticsSource = keyof typeof ADMIN_ANALYTICS_SOURCE_LABELS;

/**
 * Admin analytics category type
 */
export type AdminAnalyticsCategory = keyof typeof ADMIN_ANALYTICS_CATEGORY_LABELS;

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get metric label
 */
export const getAdminAnalyticsMetricLabel = (metric: AdminAnalyticsMetric): string =>
  ADMIN_ANALYTICS_METRIC_LABELS[metric] || metric;

/**
 * Get dimension label
 */
export const getAdminAnalyticsDimensionLabel = (dimension: AdminAnalyticsDimension): string =>
  ADMIN_ANALYTICS_DIMENSION_LABELS[dimension] || dimension;

/**
 * Get aggregation label
 */
export const getAdminAnalyticsAggregationLabel = (aggregation: AdminAnalyticsAggregation): string =>
  ADMIN_ANALYTICS_AGGREGATION_LABELS[aggregation] || aggregation;

/**
 * Get period label
 */
export const getAdminAnalyticsPeriodLabel = (period: AdminAnalyticsPeriod): string =>
  ADMIN_ANALYTICS_PERIOD_LABELS[period] || period;

/**
 * Get status label
 */
export const getAdminAnalyticsStatusLabel = (status: AdminAnalyticsStatus): string =>
  ADMIN_ANALYTICS_STATUS_LABELS[status] || status;

/**
 * Get status color
 */
export const getAdminAnalyticsStatusColor = (status: AdminAnalyticsStatus): string =>
  ADMIN_ANALYTICS_STATUS_COLORS[status] || '#6B7280';

/**
 * Get type label
 */
export const getAdminAnalyticsTypeLabel = (type: AdminAnalyticsType): string =>
  ADMIN_ANALYTICS_TYPE_LABELS[type] || type;

/**
 * Get source label
 */
export const getAdminAnalyticsSourceLabel = (source: AdminAnalyticsSource): string =>
  ADMIN_ANALYTICS_SOURCE_LABELS[source] || source;

/**
 * Get category label
 */
export const getAdminAnalyticsCategoryLabel = (category: AdminAnalyticsCategory): string =>
  ADMIN_ANALYTICS_CATEGORY_LABELS[category] || category;

/**
 * Check if analytics is completed
 */
export const isAnalyticsCompleted = (status: AdminAnalyticsStatus): boolean =>
  status === 'COMPLETED';

/**
 * Check if analytics is processing
 */
export const isAnalyticsProcessing = (status: AdminAnalyticsStatus): boolean =>
  status === 'PROCESSING';

/**
 * Check if analytics is failed
 */
export const isAnalyticsFailed = (status: AdminAnalyticsStatus): boolean => status === 'FAILED';

/**
 * Check if analytics is pending
 */
export const isAnalyticsPending = (status: AdminAnalyticsStatus): boolean => status === 'PENDING';

/**
 * Get analytics timeout in seconds
 */
export const getAdminAnalyticsTimeout = (): number => 300; // 5 minutes

/**
 * Get analytics retention in days
 */
export const getAdminAnalyticsRetention = (): number => 90; // 90 days
