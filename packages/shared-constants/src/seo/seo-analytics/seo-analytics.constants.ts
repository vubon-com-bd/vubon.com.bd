/**
 * SEO Analytics Constants
 * Configuration for SEO analytics, tracking, and reporting
 */

export const SEO_ANALYTICS = {
  // Analytics Types
  TYPES: {
    TRAFFIC: 'traffic',
    PERFORMANCE: 'performance',
    CONVERSION: 'conversion',
    ENGAGEMENT: 'engagement',
    TECHNICAL: 'technical',
    SOCIAL: 'social',
    BACKLINK: 'backlink',
    KEYWORD: 'keyword',
    CONTENT: 'content',
    USER_BEHAVIOR: 'user_behavior',
    COMPETITOR: 'competitor',
    REVENUE: 'revenue',
  } as const,

  // Analytics Status
  STATUS: {
    PENDING: 'pending',
    COLLECTING: 'collecting',
    PROCESSING: 'processing',
    ANALYZING: 'analyzing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    UPDATING: 'updating',
    OUTDATED: 'outdated',
    ARCHIVED: 'archived',
  } as const,

  // Analytics Timeframes
  TIMEFRAMES: {
    REALTIME: 'realtime',
    LAST_HOUR: 'last_hour',
    LAST_24_HOURS: 'last_24_hours',
    LAST_7_DAYS: 'last_7_days',
    LAST_14_DAYS: 'last_14_days',
    LAST_28_DAYS: 'last_28_days',
    LAST_30_DAYS: 'last_30_days',
    LAST_90_DAYS: 'last_90_days',
    LAST_6_MONTHS: 'last_6_months',
    LAST_12_MONTHS: 'last_12_months',
    YEAR_TO_DATE: 'year_to_date',
    CUSTOM: 'custom',
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

  // Analytics Dimensions
  DIMENSIONS: {
    DATE: 'date',
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year',
    SOURCE: 'source',
    MEDIUM: 'medium',
    CAMPAIGN: 'campaign',
    CHANNEL: 'channel',
    DEVICE: 'device',
    BROWSER: 'browser',
    OS: 'os',
    COUNTRY: 'country',
    REGION: 'region',
    CITY: 'city',
    PAGE: 'page',
    KEYWORD: 'keyword',
    USER_TYPE: 'user_type',
    SESSION: 'session',
    LANDING_PAGE: 'landing_page',
    EXIT_PAGE: 'exit_page',
    REFERRER: 'referrer',
  } as const,

  // Analytics Sources
  SOURCES: {
    GOOGLE_ANALYTICS: 'google_analytics',
    GOOGLE_SEARCH_CONSOLE: 'google_search_console',
    SEMRUSH: 'semrush',
    AHREFS: 'ahrefs',
    MOZ: 'moz',
    HOTJAR: 'hotjar',
    CRAZY_EGG: 'crazy_egg',
    HEAP: 'heap',
    MIXPANEL: 'mixpanel',
    AMPLITUDE: 'amplitude',
    SEGMENT: 'segment',
    CLARITY: 'clarity',
    PINGDOM: 'pingdom',
    GT_METRIX: 'gt_metrix',
  } as const,

  // Analytics Frequencies
  FREQUENCIES: {
    REALTIME: 'realtime',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Analytics Errors
  ERROR_TYPES: {
    CONNECTION_ERROR: 'connection_error',
    AUTHENTICATION_ERROR: 'authentication_error',
    DATA_ERROR: 'data_error',
    PARSE_ERROR: 'parse_error',
    TIMEOUT: 'timeout',
    RATE_LIMIT: 'rate_limit',
    INVALID_QUERY: 'invalid_query',
    MISSING_DATA: 'missing_data',
    PARTIAL_DATA: 'partial_data',
    PROCESSING_ERROR: 'processing_error',
  } as const,
} as const;

// Analytics Types
export type SEOAnalyticsType = (typeof SEO_ANALYTICS.TYPES)[keyof typeof SEO_ANALYTICS.TYPES];

// Analytics Status
export type SEOAnalyticsStatus = (typeof SEO_ANALYTICS.STATUS)[keyof typeof SEO_ANALYTICS.STATUS];

// Analytics Timeframes
export type SEOAnalyticsTimeframe =
  (typeof SEO_ANALYTICS.TIMEFRAMES)[keyof typeof SEO_ANALYTICS.TIMEFRAMES];

// Analytics Aggregations
export type SEOAnalyticsAggregation =
  (typeof SEO_ANALYTICS.AGGREGATIONS)[keyof typeof SEO_ANALYTICS.AGGREGATIONS];

// Analytics Dimensions
export type SEOAnalyticsDimension =
  (typeof SEO_ANALYTICS.DIMENSIONS)[keyof typeof SEO_ANALYTICS.DIMENSIONS];

// Analytics Sources
export type SEOAnalyticsSource = (typeof SEO_ANALYTICS.SOURCES)[keyof typeof SEO_ANALYTICS.SOURCES];

// Analytics Frequencies
export type SEOAnalyticsFrequency =
  (typeof SEO_ANALYTICS.FREQUENCIES)[keyof typeof SEO_ANALYTICS.FREQUENCIES];

// Analytics Errors
export type SEOAnalyticsErrorType =
  (typeof SEO_ANALYTICS.ERROR_TYPES)[keyof typeof SEO_ANALYTICS.ERROR_TYPES];

// Utility Functions
export function getSEOAnalyticsTypeLabel(type: SEOAnalyticsType): string {
  const labels: Record<SEOAnalyticsType, string> = {
    [SEO_ANALYTICS.TYPES.TRAFFIC]: 'Traffic Analytics',
    [SEO_ANALYTICS.TYPES.PERFORMANCE]: 'Performance Analytics',
    [SEO_ANALYTICS.TYPES.CONVERSION]: 'Conversion Analytics',
    [SEO_ANALYTICS.TYPES.ENGAGEMENT]: 'Engagement Analytics',
    [SEO_ANALYTICS.TYPES.TECHNICAL]: 'Technical Analytics',
    [SEO_ANALYTICS.TYPES.SOCIAL]: 'Social Analytics',
    [SEO_ANALYTICS.TYPES.BACKLINK]: 'Backlink Analytics',
    [SEO_ANALYTICS.TYPES.KEYWORD]: 'Keyword Analytics',
    [SEO_ANALYTICS.TYPES.CONTENT]: 'Content Analytics',
    [SEO_ANALYTICS.TYPES.USER_BEHAVIOR]: 'User Behavior Analytics',
    [SEO_ANALYTICS.TYPES.COMPETITOR]: 'Competitor Analytics',
    [SEO_ANALYTICS.TYPES.REVENUE]: 'Revenue Analytics',
  };
  return labels[type] || 'Unknown Analytics Type';
}

export function getSEOAnalyticsStatusLabel(status: SEOAnalyticsStatus): string {
  const labels: Record<SEOAnalyticsStatus, string> = {
    [SEO_ANALYTICS.STATUS.PENDING]: 'Pending',
    [SEO_ANALYTICS.STATUS.COLLECTING]: 'Collecting Data',
    [SEO_ANALYTICS.STATUS.PROCESSING]: 'Processing Data',
    [SEO_ANALYTICS.STATUS.ANALYZING]: 'Analyzing Data',
    [SEO_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [SEO_ANALYTICS.STATUS.FAILED]: 'Failed',
    [SEO_ANALYTICS.STATUS.UPDATING]: 'Updating',
    [SEO_ANALYTICS.STATUS.OUTDATED]: 'Outdated',
    [SEO_ANALYTICS.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEOAnalyticsTimeframeLabel(timeframe: SEOAnalyticsTimeframe): string {
  const labels: Record<SEOAnalyticsTimeframe, string> = {
    [SEO_ANALYTICS.TIMEFRAMES.REALTIME]: 'Real-time',
    [SEO_ANALYTICS.TIMEFRAMES.LAST_HOUR]: 'Last Hour',
    [SEO_ANALYTICS.TIMEFRAMES.LAST_24_HOURS]: 'Last 24 Hours',
    [SEO_ANALYTICS.TIMEFRAMES.LAST_7_DAYS]: 'Last 7 Days',
    [SEO_ANALYTICS.TIMEFRAMES.LAST_14_DAYS]: 'Last 14 Days',
    [SEO_ANALYTICS.TIMEFRAMES.LAST_28_DAYS]: 'Last 28 Days',
    [SEO_ANALYTICS.TIMEFRAMES.LAST_30_DAYS]: 'Last 30 Days',
    [SEO_ANALYTICS.TIMEFRAMES.LAST_90_DAYS]: 'Last 90 Days',
    [SEO_ANALYTICS.TIMEFRAMES.LAST_6_MONTHS]: 'Last 6 Months',
    [SEO_ANALYTICS.TIMEFRAMES.LAST_12_MONTHS]: 'Last 12 Months',
    [SEO_ANALYTICS.TIMEFRAMES.YEAR_TO_DATE]: 'Year to Date',
    [SEO_ANALYTICS.TIMEFRAMES.CUSTOM]: 'Custom',
  };
  return labels[timeframe] || 'Unknown Timeframe';
}

export function getSEOAnalyticsAggregationLabel(aggregation: SEOAnalyticsAggregation): string {
  const labels: Record<SEOAnalyticsAggregation, string> = {
    [SEO_ANALYTICS.AGGREGATIONS.SUM]: 'Sum',
    [SEO_ANALYTICS.AGGREGATIONS.AVG]: 'Average',
    [SEO_ANALYTICS.AGGREGATIONS.MIN]: 'Minimum',
    [SEO_ANALYTICS.AGGREGATIONS.MAX]: 'Maximum',
    [SEO_ANALYTICS.AGGREGATIONS.COUNT]: 'Count',
    [SEO_ANALYTICS.AGGREGATIONS.UNIQUE]: 'Unique Count',
    [SEO_ANALYTICS.AGGREGATIONS.PERCENTILE]: 'Percentile',
    [SEO_ANALYTICS.AGGREGATIONS.MEDIAN]: 'Median',
    [SEO_ANALYTICS.AGGREGATIONS.MODE]: 'Mode',
    [SEO_ANALYTICS.AGGREGATIONS.STDDEV]: 'Standard Deviation',
    [SEO_ANALYTICS.AGGREGATIONS.VARIANCE]: 'Variance',
  };
  return labels[aggregation] || 'Unknown Aggregation';
}

export function getSEOAnalyticsDimensionLabel(dimension: SEOAnalyticsDimension): string {
  const labels: Record<SEOAnalyticsDimension, string> = {
    [SEO_ANALYTICS.DIMENSIONS.DATE]: 'Date',
    [SEO_ANALYTICS.DIMENSIONS.HOUR]: 'Hour',
    [SEO_ANALYTICS.DIMENSIONS.DAY]: 'Day',
    [SEO_ANALYTICS.DIMENSIONS.WEEK]: 'Week',
    [SEO_ANALYTICS.DIMENSIONS.MONTH]: 'Month',
    [SEO_ANALYTICS.DIMENSIONS.YEAR]: 'Year',
    [SEO_ANALYTICS.DIMENSIONS.SOURCE]: 'Traffic Source',
    [SEO_ANALYTICS.DIMENSIONS.MEDIUM]: 'Traffic Medium',
    [SEO_ANALYTICS.DIMENSIONS.CAMPAIGN]: 'Campaign',
    [SEO_ANALYTICS.DIMENSIONS.CHANNEL]: 'Channel',
    [SEO_ANALYTICS.DIMENSIONS.DEVICE]: 'Device',
    [SEO_ANALYTICS.DIMENSIONS.BROWSER]: 'Browser',
    [SEO_ANALYTICS.DIMENSIONS.OS]: 'Operating System',
    [SEO_ANALYTICS.DIMENSIONS.COUNTRY]: 'Country',
    [SEO_ANALYTICS.DIMENSIONS.REGION]: 'Region',
    [SEO_ANALYTICS.DIMENSIONS.CITY]: 'City',
    [SEO_ANALYTICS.DIMENSIONS.PAGE]: 'Page',
    [SEO_ANALYTICS.DIMENSIONS.KEYWORD]: 'Keyword',
    [SEO_ANALYTICS.DIMENSIONS.USER_TYPE]: 'User Type',
    [SEO_ANALYTICS.DIMENSIONS.SESSION]: 'Session',
    [SEO_ANALYTICS.DIMENSIONS.LANDING_PAGE]: 'Landing Page',
    [SEO_ANALYTICS.DIMENSIONS.EXIT_PAGE]: 'Exit Page',
    [SEO_ANALYTICS.DIMENSIONS.REFERRER]: 'Referrer',
  };
  return labels[dimension] || 'Unknown Dimension';
}

export function getSEOAnalyticsSourceLabel(source: SEOAnalyticsSource): string {
  const labels: Record<SEOAnalyticsSource, string> = {
    [SEO_ANALYTICS.SOURCES.GOOGLE_ANALYTICS]: 'Google Analytics',
    [SEO_ANALYTICS.SOURCES.GOOGLE_SEARCH_CONSOLE]: 'Google Search Console',
    [SEO_ANALYTICS.SOURCES.SEMRUSH]: 'SEMrush',
    [SEO_ANALYTICS.SOURCES.AHREFS]: 'Ahrefs',
    [SEO_ANALYTICS.SOURCES.MOZ]: 'Moz',
    [SEO_ANALYTICS.SOURCES.HOTJAR]: 'Hotjar',
    [SEO_ANALYTICS.SOURCES.CRAZY_EGG]: 'Crazy Egg',
    [SEO_ANALYTICS.SOURCES.HEAP]: 'Heap',
    [SEO_ANALYTICS.SOURCES.MIXPANEL]: 'Mixpanel',
    [SEO_ANALYTICS.SOURCES.AMPLITUDE]: 'Amplitude',
    [SEO_ANALYTICS.SOURCES.SEGMENT]: 'Segment',
    [SEO_ANALYTICS.SOURCES.CLARITY]: 'Clarity',
    [SEO_ANALYTICS.SOURCES.PINGDOM]: 'Pingdom',
    [SEO_ANALYTICS.SOURCES.GT_METRIX]: 'GTmetrix',
  };
  return labels[source] || 'Unknown Source';
}

export function getSEOAnalyticsFrequencyLabel(frequency: SEOAnalyticsFrequency): string {
  const labels: Record<SEOAnalyticsFrequency, string> = {
    [SEO_ANALYTICS.FREQUENCIES.REALTIME]: 'Real-time',
    [SEO_ANALYTICS.FREQUENCIES.HOURLY]: 'Hourly',
    [SEO_ANALYTICS.FREQUENCIES.DAILY]: 'Daily',
    [SEO_ANALYTICS.FREQUENCIES.WEEKLY]: 'Weekly',
    [SEO_ANALYTICS.FREQUENCIES.MONTHLY]: 'Monthly',
    [SEO_ANALYTICS.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [SEO_ANALYTICS.FREQUENCIES.YEARLY]: 'Yearly',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function getSEOAnalyticsErrorLabel(errorType: SEOAnalyticsErrorType): string {
  const labels: Record<SEOAnalyticsErrorType, string> = {
    [SEO_ANALYTICS.ERROR_TYPES.CONNECTION_ERROR]: 'Connection Error',
    [SEO_ANALYTICS.ERROR_TYPES.AUTHENTICATION_ERROR]: 'Authentication Error',
    [SEO_ANALYTICS.ERROR_TYPES.DATA_ERROR]: 'Data Error',
    [SEO_ANALYTICS.ERROR_TYPES.PARSE_ERROR]: 'Parse Error',
    [SEO_ANALYTICS.ERROR_TYPES.TIMEOUT]: 'Timeout',
    [SEO_ANALYTICS.ERROR_TYPES.RATE_LIMIT]: 'Rate Limit Exceeded',
    [SEO_ANALYTICS.ERROR_TYPES.INVALID_QUERY]: 'Invalid Query',
    [SEO_ANALYTICS.ERROR_TYPES.MISSING_DATA]: 'Missing Data',
    [SEO_ANALYTICS.ERROR_TYPES.PARTIAL_DATA]: 'Partial Data',
    [SEO_ANALYTICS.ERROR_TYPES.PROCESSING_ERROR]: 'Processing Error',
  };
  return labels[errorType] || 'Unknown Error';
}

export function getAnalyticsStatusColor(status: SEOAnalyticsStatus): string {
  const colors: Record<SEOAnalyticsStatus, string> = {
    [SEO_ANALYTICS.STATUS.PENDING]: '#9E9E9E',
    [SEO_ANALYTICS.STATUS.COLLECTING]: '#2196F3',
    [SEO_ANALYTICS.STATUS.PROCESSING]: '#FFC107',
    [SEO_ANALYTICS.STATUS.ANALYZING]: '#00BCD4',
    [SEO_ANALYTICS.STATUS.COMPLETED]: '#4CAF50',
    [SEO_ANALYTICS.STATUS.FAILED]: '#F44336',
    [SEO_ANALYTICS.STATUS.UPDATING]: '#FF9800',
    [SEO_ANALYTICS.STATUS.OUTDATED]: '#FF9800',
    [SEO_ANALYTICS.STATUS.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}

export function isSEOAnalyticsComplete(status: SEOAnalyticsStatus): boolean {
  const completeStatuses: SEOAnalyticsStatus[] = [
    SEO_ANALYTICS.STATUS.COMPLETED,
    SEO_ANALYTICS.STATUS.ARCHIVED,
  ];
  return completeStatuses.includes(status);
}

export function isSEOAnalyticsProcessing(status: SEOAnalyticsStatus): boolean {
  const processingStatuses: SEOAnalyticsStatus[] = [
    SEO_ANALYTICS.STATUS.COLLECTING,
    SEO_ANALYTICS.STATUS.PROCESSING,
    SEO_ANALYTICS.STATUS.ANALYZING,
    SEO_ANALYTICS.STATUS.UPDATING,
  ];
  return processingStatuses.includes(status);
}
