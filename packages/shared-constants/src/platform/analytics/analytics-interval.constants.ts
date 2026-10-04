export const ANALYTICS_INTERVAL = {
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

export const ANALYTICS_INTERVAL_SECONDS = {
  minute: 60,
  five_minutes: 300,
  fifteen_minutes: 900,
  thirty_minutes: 1800,
  hour: 3600,
  six_hours: 21600,
  twelve_hours: 43200,
  day: 86400,
  week: 604800,
  month: 2592000,
  quarter: 7776000,
  year: 31536000,
} as const;

export type AnalyticsIntervalType = (typeof ANALYTICS_INTERVAL)[keyof typeof ANALYTICS_INTERVAL];
