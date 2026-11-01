export const ANALYTICS_COHORT_PERIOD = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YEAR: 'year',
} as const;

export type AnalyticsCohortPeriodType =
  (typeof ANALYTICS_COHORT_PERIOD)[keyof typeof ANALYTICS_COHORT_PERIOD];
