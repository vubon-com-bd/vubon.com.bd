export const ANALYTICS_COMPARISON = {
  PREVIOUS_PERIOD: 'previous_period',
  PREVIOUS_MONTH: 'previous_month',
  PREVIOUS_QUARTER: 'previous_quarter',
  PREVIOUS_YEAR: 'previous_year',
  SAME_PERIOD_LAST_YEAR: 'same_period_last_year',
  CUSTOM: 'custom',
  NONE: 'none',
} as const;

export const ANALYTICS_CHANGE_TYPE = {
  INCREASE: 'increase',
  DECREASE: 'decrease',
  NO_CHANGE: 'no_change',
  NEW: 'new',
} as const;

export const ANALYTICS_COMPARISON_LIMIT = {
  MAX_PERIODS: 5,
  MAX_DATE_RANGE_DAYS: 730,
  DECIMAL_PLACES: 2,
} as const;

export type AnalyticsComparisonType =
  (typeof ANALYTICS_COMPARISON)[keyof typeof ANALYTICS_COMPARISON];
export type AnalyticsChangeTypeType =
  (typeof ANALYTICS_CHANGE_TYPE)[keyof typeof ANALYTICS_CHANGE_TYPE];
