export const SEARCH_ANALYTICS_METRIC = {
  TOTAL_SEARCHES: 'total_searches',
  UNIQUE_QUERIES: 'unique_queries',
  ZERO_RESULT_QUERIES: 'zero_result_queries',
  AVG_RESULTS: 'avg_results',
  AVG_RESPONSE_TIME: 'avg_response_time',
  CLICK_THROUGH_RATE: 'click_through_rate',
  CONVERSION_RATE: 'conversion_rate',
  TOP_QUERIES: 'top_queries',
  TOP_CLICKED: 'top_clicked',
  SEARCH_ABANDONMENT: 'search_abandonment',
} as const;

export const SEARCH_ANALYTICS_PERIOD = {
  TODAY: 'today',
  LAST_7_DAYS: 'last_7_days',
  LAST_30_DAYS: 'last_30_days',
  LAST_90_DAYS: 'last_90_days',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  THIS_YEAR: 'this_year',
  CUSTOM: 'custom',
} as const;

export const SEARCH_ANALYTICS = {
  RETENTION_DAYS: 365,
  REFRESH_INTERVAL_SECONDS: 300,
  TRACK_ZERO_RESULTS: true,
  TRACK_CLICKS: true,
  TRACK_CONVERSIONS: true,
  TRACK_RESPONSE_TIME: true,
  ANONYMIZE_QUERIES: true,
  MAX_TOP_QUERIES: 100,
} as const;

export type SearchAnalyticsMetricType =
  (typeof SEARCH_ANALYTICS_METRIC)[keyof typeof SEARCH_ANALYTICS_METRIC];
export type SearchAnalyticsPeriodType =
  (typeof SEARCH_ANALYTICS_PERIOD)[keyof typeof SEARCH_ANALYTICS_PERIOD];
