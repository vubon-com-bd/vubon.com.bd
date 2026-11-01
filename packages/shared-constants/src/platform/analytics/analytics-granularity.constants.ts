export const ANALYTICS_GRANULARITY = {
  MINUTE: 'minute',
  FIVE_MINUTES: 'five_minutes',
  FIFTEEN_MINUTES: 'fifteen_minutes',
  THIRTY_MINUTES: 'thirty_minutes',
  HOUR: 'hour',
  SIX_HOURS: 'six_hours',
  TWELVE_HOURS: 'twelve_hours',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YEAR: 'year',
} as const;

export type AnalyticsGranularityType =
  (typeof ANALYTICS_GRANULARITY)[keyof typeof ANALYTICS_GRANULARITY];
