/**
 * Analytics Interval Constants
 * Time intervals for data aggregation and reporting
 */

export const ANALYTICS_INTERVAL = {
  // Time Intervals
  INTERVALS: {
    // Seconds
    SECOND: 'second',
    SECONDS_5: '5_seconds',
    SECONDS_15: '15_seconds',
    SECONDS_30: '30_seconds',

    // Minutes
    MINUTE: 'minute',
    MINUTES_5: '5_minutes',
    MINUTES_10: '10_minutes',
    MINUTES_15: '15_minutes',
    MINUTES_30: '30_minutes',

    // Hours
    HOUR: 'hour',
    HOURS_2: '2_hours',
    HOURS_4: '4_hours',
    HOURS_6: '6_hours',
    HOURS_12: '12_hours',

    // Days
    DAY: 'day',
    DAYS_2: '2_days',
    DAYS_7: '7_days',

    // Weeks
    WEEK: 'week',
    WEEKS_2: '2_weeks',
    WEEKS_4: '4_weeks',

    // Months
    MONTH: 'month',
    MONTHS_2: '2_months',
    MONTHS_3: '3_months',
    MONTHS_6: '6_months',

    // Quarters
    QUARTER: 'quarter',

    // Years
    YEAR: 'year',
  } as const,

  // Interval Categories
  CATEGORIES: {
    MICRO: 'micro', // < 1 minute
    SHORT: 'short', // 1-15 minutes
    MEDIUM: 'medium', // 30 minutes - 2 hours
    LONG: 'long', // 4-12 hours
    DAILY: 'daily', // 1-7 days
    WEEKLY: 'weekly', // 1-4 weeks
    MONTHLY: 'monthly', // 1-6 months
    YEARLY: 'yearly', // 1 year +
  } as const,

  // Interval Units
  UNITS: {
    SECOND: 'second',
    MINUTE: 'minute',
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
  } as const,

  // Interval Formats
  FORMATS: {
    TIMESTAMP: 'timestamp',
    DATE: 'date',
    DATE_TIME: 'date_time',
    TIME: 'time',
    RELATIVE: 'relative',
  } as const,

  // Interval Grouping Types
  GROUPING_TYPES: {
    FIXED: 'fixed',
    ROLLING: 'rolling',
    CUSTOM: 'custom',
  } as const,
} as const;

// Analytics Interval Types
export type AnalyticsIntervalType =
  (typeof ANALYTICS_INTERVAL.INTERVALS)[keyof typeof ANALYTICS_INTERVAL.INTERVALS];

// Analytics Interval Categories
export type AnalyticsIntervalCategory =
  (typeof ANALYTICS_INTERVAL.CATEGORIES)[keyof typeof ANALYTICS_INTERVAL.CATEGORIES];

// Analytics Interval Units
export type AnalyticsIntervalUnit =
  (typeof ANALYTICS_INTERVAL.UNITS)[keyof typeof ANALYTICS_INTERVAL.UNITS];

// Analytics Interval Formats
export type AnalyticsIntervalFormat =
  (typeof ANALYTICS_INTERVAL.FORMATS)[keyof typeof ANALYTICS_INTERVAL.FORMATS];

// Analytics Interval Grouping Types
export type AnalyticsIntervalGroupingType =
  (typeof ANALYTICS_INTERVAL.GROUPING_TYPES)[keyof typeof ANALYTICS_INTERVAL.GROUPING_TYPES];

// Analytics Interval Labels
export function getAnalyticsIntervalLabel(interval: AnalyticsIntervalType): string {
  const labels: Record<AnalyticsIntervalType, string> = {
    [ANALYTICS_INTERVAL.INTERVALS.SECOND]: 'Second',
    [ANALYTICS_INTERVAL.INTERVALS.SECONDS_5]: '5 Seconds',
    [ANALYTICS_INTERVAL.INTERVALS.SECONDS_15]: '15 Seconds',
    [ANALYTICS_INTERVAL.INTERVALS.SECONDS_30]: '30 Seconds',
    [ANALYTICS_INTERVAL.INTERVALS.MINUTE]: 'Minute',
    [ANALYTICS_INTERVAL.INTERVALS.MINUTES_5]: '5 Minutes',
    [ANALYTICS_INTERVAL.INTERVALS.MINUTES_10]: '10 Minutes',
    [ANALYTICS_INTERVAL.INTERVALS.MINUTES_15]: '15 Minutes',
    [ANALYTICS_INTERVAL.INTERVALS.MINUTES_30]: '30 Minutes',
    [ANALYTICS_INTERVAL.INTERVALS.HOUR]: 'Hour',
    [ANALYTICS_INTERVAL.INTERVALS.HOURS_2]: '2 Hours',
    [ANALYTICS_INTERVAL.INTERVALS.HOURS_4]: '4 Hours',
    [ANALYTICS_INTERVAL.INTERVALS.HOURS_6]: '6 Hours',
    [ANALYTICS_INTERVAL.INTERVALS.HOURS_12]: '12 Hours',
    [ANALYTICS_INTERVAL.INTERVALS.DAY]: 'Day',
    [ANALYTICS_INTERVAL.INTERVALS.DAYS_2]: '2 Days',
    [ANALYTICS_INTERVAL.INTERVALS.DAYS_7]: '7 Days',
    [ANALYTICS_INTERVAL.INTERVALS.WEEK]: 'Week',
    [ANALYTICS_INTERVAL.INTERVALS.WEEKS_2]: '2 Weeks',
    [ANALYTICS_INTERVAL.INTERVALS.WEEKS_4]: '4 Weeks',
    [ANALYTICS_INTERVAL.INTERVALS.MONTH]: 'Month',
    [ANALYTICS_INTERVAL.INTERVALS.MONTHS_2]: '2 Months',
    [ANALYTICS_INTERVAL.INTERVALS.MONTHS_3]: '3 Months',
    [ANALYTICS_INTERVAL.INTERVALS.MONTHS_6]: '6 Months',
    [ANALYTICS_INTERVAL.INTERVALS.QUARTER]: 'Quarter',
    [ANALYTICS_INTERVAL.INTERVALS.YEAR]: 'Year',
  };
  return labels[interval] || 'Unknown';
}

// Analytics Interval Category Labels
export function getAnalyticsIntervalCategoryLabel(category: AnalyticsIntervalCategory): string {
  const labels: Record<AnalyticsIntervalCategory, string> = {
    [ANALYTICS_INTERVAL.CATEGORIES.MICRO]: 'Micro (< 1 min)',
    [ANALYTICS_INTERVAL.CATEGORIES.SHORT]: 'Short (1-15 min)',
    [ANALYTICS_INTERVAL.CATEGORIES.MEDIUM]: 'Medium (30 min - 2 hours)',
    [ANALYTICS_INTERVAL.CATEGORIES.LONG]: 'Long (4-12 hours)',
    [ANALYTICS_INTERVAL.CATEGORIES.DAILY]: 'Daily (1-7 days)',
    [ANALYTICS_INTERVAL.CATEGORIES.WEEKLY]: 'Weekly (1-4 weeks)',
    [ANALYTICS_INTERVAL.CATEGORIES.MONTHLY]: 'Monthly (1-6 months)',
    [ANALYTICS_INTERVAL.CATEGORIES.YEARLY]: 'Yearly (1+ years)',
  };
  return labels[category] || 'Unknown';
}

// Analytics Interval Unit Labels
export function getAnalyticsIntervalUnitLabel(unit: AnalyticsIntervalUnit): string {
  const labels: Record<AnalyticsIntervalUnit, string> = {
    [ANALYTICS_INTERVAL.UNITS.SECOND]: 'Second',
    [ANALYTICS_INTERVAL.UNITS.MINUTE]: 'Minute',
    [ANALYTICS_INTERVAL.UNITS.HOUR]: 'Hour',
    [ANALYTICS_INTERVAL.UNITS.DAY]: 'Day',
    [ANALYTICS_INTERVAL.UNITS.WEEK]: 'Week',
    [ANALYTICS_INTERVAL.UNITS.MONTH]: 'Month',
    [ANALYTICS_INTERVAL.UNITS.QUARTER]: 'Quarter',
    [ANALYTICS_INTERVAL.UNITS.YEAR]: 'Year',
  };
  return labels[unit] || 'Unknown';
}

// Analytics Interval Format Labels
export function getAnalyticsIntervalFormatLabel(format: AnalyticsIntervalFormat): string {
  const labels: Record<AnalyticsIntervalFormat, string> = {
    [ANALYTICS_INTERVAL.FORMATS.TIMESTAMP]: 'Timestamp',
    [ANALYTICS_INTERVAL.FORMATS.DATE]: 'Date',
    [ANALYTICS_INTERVAL.FORMATS.DATE_TIME]: 'Date & Time',
    [ANALYTICS_INTERVAL.FORMATS.TIME]: 'Time',
    [ANALYTICS_INTERVAL.FORMATS.RELATIVE]: 'Relative',
  };
  return labels[format] || 'Unknown';
}

// Get interval category
export function getAnalyticsIntervalCategory(
  interval: AnalyticsIntervalType
): AnalyticsIntervalCategory {
  const microIntervals: AnalyticsIntervalType[] = [
    ANALYTICS_INTERVAL.INTERVALS.SECOND,
    ANALYTICS_INTERVAL.INTERVALS.SECONDS_5,
    ANALYTICS_INTERVAL.INTERVALS.SECONDS_15,
    ANALYTICS_INTERVAL.INTERVALS.SECONDS_30,
  ];

  const shortIntervals: AnalyticsIntervalType[] = [
    ANALYTICS_INTERVAL.INTERVALS.MINUTE,
    ANALYTICS_INTERVAL.INTERVALS.MINUTES_5,
    ANALYTICS_INTERVAL.INTERVALS.MINUTES_10,
    ANALYTICS_INTERVAL.INTERVALS.MINUTES_15,
  ];

  const mediumIntervals: AnalyticsIntervalType[] = [
    ANALYTICS_INTERVAL.INTERVALS.MINUTES_30,
    ANALYTICS_INTERVAL.INTERVALS.HOUR,
    ANALYTICS_INTERVAL.INTERVALS.HOURS_2,
  ];

  const longIntervals: AnalyticsIntervalType[] = [
    ANALYTICS_INTERVAL.INTERVALS.HOURS_4,
    ANALYTICS_INTERVAL.INTERVALS.HOURS_6,
    ANALYTICS_INTERVAL.INTERVALS.HOURS_12,
  ];

  const dailyIntervals: AnalyticsIntervalType[] = [
    ANALYTICS_INTERVAL.INTERVALS.DAY,
    ANALYTICS_INTERVAL.INTERVALS.DAYS_2,
    ANALYTICS_INTERVAL.INTERVALS.DAYS_7,
  ];

  const weeklyIntervals: AnalyticsIntervalType[] = [
    ANALYTICS_INTERVAL.INTERVALS.WEEK,
    ANALYTICS_INTERVAL.INTERVALS.WEEKS_2,
    ANALYTICS_INTERVAL.INTERVALS.WEEKS_4,
  ];

  const monthlyIntervals: AnalyticsIntervalType[] = [
    ANALYTICS_INTERVAL.INTERVALS.MONTH,
    ANALYTICS_INTERVAL.INTERVALS.MONTHS_2,
    ANALYTICS_INTERVAL.INTERVALS.MONTHS_3,
    ANALYTICS_INTERVAL.INTERVALS.MONTHS_6,
  ];

  const yearlyIntervals: AnalyticsIntervalType[] = [
    ANALYTICS_INTERVAL.INTERVALS.QUARTER,
    ANALYTICS_INTERVAL.INTERVALS.YEAR,
  ];

  if (microIntervals.includes(interval)) return ANALYTICS_INTERVAL.CATEGORIES.MICRO;
  if (shortIntervals.includes(interval)) return ANALYTICS_INTERVAL.CATEGORIES.SHORT;
  if (mediumIntervals.includes(interval)) return ANALYTICS_INTERVAL.CATEGORIES.MEDIUM;
  if (longIntervals.includes(interval)) return ANALYTICS_INTERVAL.CATEGORIES.LONG;
  if (dailyIntervals.includes(interval)) return ANALYTICS_INTERVAL.CATEGORIES.DAILY;
  if (weeklyIntervals.includes(interval)) return ANALYTICS_INTERVAL.CATEGORIES.WEEKLY;
  if (monthlyIntervals.includes(interval)) return ANALYTICS_INTERVAL.CATEGORIES.MONTHLY;
  if (yearlyIntervals.includes(interval)) return ANALYTICS_INTERVAL.CATEGORIES.YEARLY;

  return ANALYTICS_INTERVAL.CATEGORIES.DAILY;
}

// Get interval unit
export function getAnalyticsIntervalUnit(interval: AnalyticsIntervalType): AnalyticsIntervalUnit {
  const secondIntervals: AnalyticsIntervalType[] = [
    ANALYTICS_INTERVAL.INTERVALS.SECOND,
    ANALYTICS_INTERVAL.INTERVALS.SECONDS_5,
    ANALYTICS_INTERVAL.INTERVALS.SECONDS_15,
    ANALYTICS_INTERVAL.INTERVALS.SECONDS_30,
  ];

  const minuteIntervals: AnalyticsIntervalType[] = [
    ANALYTICS_INTERVAL.INTERVALS.MINUTE,
    ANALYTICS_INTERVAL.INTERVALS.MINUTES_5,
    ANALYTICS_INTERVAL.INTERVALS.MINUTES_10,
    ANALYTICS_INTERVAL.INTERVALS.MINUTES_15,
    ANALYTICS_INTERVAL.INTERVALS.MINUTES_30,
  ];

  const hourIntervals: AnalyticsIntervalType[] = [
    ANALYTICS_INTERVAL.INTERVALS.HOUR,
    ANALYTICS_INTERVAL.INTERVALS.HOURS_2,
    ANALYTICS_INTERVAL.INTERVALS.HOURS_4,
    ANALYTICS_INTERVAL.INTERVALS.HOURS_6,
    ANALYTICS_INTERVAL.INTERVALS.HOURS_12,
  ];

  const dayIntervals: AnalyticsIntervalType[] = [
    ANALYTICS_INTERVAL.INTERVALS.DAY,
    ANALYTICS_INTERVAL.INTERVALS.DAYS_2,
    ANALYTICS_INTERVAL.INTERVALS.DAYS_7,
  ];

  const weekIntervals: AnalyticsIntervalType[] = [
    ANALYTICS_INTERVAL.INTERVALS.WEEK,
    ANALYTICS_INTERVAL.INTERVALS.WEEKS_2,
    ANALYTICS_INTERVAL.INTERVALS.WEEKS_4,
  ];

  const monthIntervals: AnalyticsIntervalType[] = [
    ANALYTICS_INTERVAL.INTERVALS.MONTH,
    ANALYTICS_INTERVAL.INTERVALS.MONTHS_2,
    ANALYTICS_INTERVAL.INTERVALS.MONTHS_3,
    ANALYTICS_INTERVAL.INTERVALS.MONTHS_6,
  ];

  if (secondIntervals.includes(interval)) return ANALYTICS_INTERVAL.UNITS.SECOND;
  if (minuteIntervals.includes(interval)) return ANALYTICS_INTERVAL.UNITS.MINUTE;
  if (hourIntervals.includes(interval)) return ANALYTICS_INTERVAL.UNITS.HOUR;
  if (dayIntervals.includes(interval)) return ANALYTICS_INTERVAL.UNITS.DAY;
  if (weekIntervals.includes(interval)) return ANALYTICS_INTERVAL.UNITS.WEEK;
  if (monthIntervals.includes(interval)) return ANALYTICS_INTERVAL.UNITS.MONTH;
  if (interval === ANALYTICS_INTERVAL.INTERVALS.QUARTER) return ANALYTICS_INTERVAL.UNITS.QUARTER;
  if (interval === ANALYTICS_INTERVAL.INTERVALS.YEAR) return ANALYTICS_INTERVAL.UNITS.YEAR;

  return ANALYTICS_INTERVAL.UNITS.DAY;
}

// Get interval seconds
export function getAnalyticsIntervalSeconds(interval: AnalyticsIntervalType): number {
  const secondsMap: Partial<Record<AnalyticsIntervalType, number>> = {
    [ANALYTICS_INTERVAL.INTERVALS.SECOND]: 1,
    [ANALYTICS_INTERVAL.INTERVALS.SECONDS_5]: 5,
    [ANALYTICS_INTERVAL.INTERVALS.SECONDS_15]: 15,
    [ANALYTICS_INTERVAL.INTERVALS.SECONDS_30]: 30,
    [ANALYTICS_INTERVAL.INTERVALS.MINUTE]: 60,
    [ANALYTICS_INTERVAL.INTERVALS.MINUTES_5]: 300,
    [ANALYTICS_INTERVAL.INTERVALS.MINUTES_10]: 600,
    [ANALYTICS_INTERVAL.INTERVALS.MINUTES_15]: 900,
    [ANALYTICS_INTERVAL.INTERVALS.MINUTES_30]: 1800,
    [ANALYTICS_INTERVAL.INTERVALS.HOUR]: 3600,
    [ANALYTICS_INTERVAL.INTERVALS.HOURS_2]: 7200,
    [ANALYTICS_INTERVAL.INTERVALS.HOURS_4]: 14400,
    [ANALYTICS_INTERVAL.INTERVALS.HOURS_6]: 21600,
    [ANALYTICS_INTERVAL.INTERVALS.HOURS_12]: 43200,
    [ANALYTICS_INTERVAL.INTERVALS.DAY]: 86400,
    [ANALYTICS_INTERVAL.INTERVALS.DAYS_2]: 172800,
    [ANALYTICS_INTERVAL.INTERVALS.DAYS_7]: 604800,
    [ANALYTICS_INTERVAL.INTERVALS.WEEK]: 604800,
    [ANALYTICS_INTERVAL.INTERVALS.WEEKS_2]: 1209600,
    [ANALYTICS_INTERVAL.INTERVALS.WEEKS_4]: 2419200,
    [ANALYTICS_INTERVAL.INTERVALS.MONTH]: 2592000,
    [ANALYTICS_INTERVAL.INTERVALS.MONTHS_2]: 5184000,
    [ANALYTICS_INTERVAL.INTERVALS.MONTHS_3]: 7776000,
    [ANALYTICS_INTERVAL.INTERVALS.MONTHS_6]: 15552000,
    [ANALYTICS_INTERVAL.INTERVALS.QUARTER]: 7776000,
    [ANALYTICS_INTERVAL.INTERVALS.YEAR]: 31536000,
  };
  return secondsMap[interval] || 3600;
}
