/**
 * Analytics Period Constants
 * Time periods for analytics data analysis
 */

export const ANALYTICS_PERIOD = {
  // Predefined Periods
  PERIODS: {
    // Real-time
    REALTIME: 'realtime',
    LIVE: 'live',
    NOW: 'now',

    // Today
    TODAY: 'today',
    TODAY_SO_FAR: 'today_so_far',

    // Yesterday
    YESTERDAY: 'yesterday',
    LAST_24_HOURS: 'last_24_hours',

    // Week
    THIS_WEEK: 'this_week',
    LAST_WEEK: 'last_week',
    LAST_7_DAYS: 'last_7_days',
    WEEK_TO_DATE: 'week_to_date',

    // Month
    THIS_MONTH: 'this_month',
    LAST_MONTH: 'last_month',
    LAST_30_DAYS: 'last_30_days',
    MONTH_TO_DATE: 'month_to_date',

    // Quarter
    THIS_QUARTER: 'this_quarter',
    LAST_QUARTER: 'last_quarter',
    QUARTER_TO_DATE: 'quarter_to_date',

    // Year
    THIS_YEAR: 'this_year',
    LAST_YEAR: 'last_year',
    LAST_365_DAYS: 'last_365_days',
    YEAR_TO_DATE: 'year_to_date',

    // Custom
    CUSTOM: 'custom',
    ALL_TIME: 'all_time',

    // Rolling Periods
    ROLLING_7_DAYS: 'rolling_7_days',
    ROLLING_30_DAYS: 'rolling_30_days',
    ROLLING_60_DAYS: 'rolling_60_days',
    ROLLING_90_DAYS: 'rolling_90_days',
    ROLLING_180_DAYS: 'rolling_180_days',
    ROLLING_365_DAYS: 'rolling_365_days',
  } as const,

  // Period Types
  TYPES: {
    FIXED: 'fixed',
    ROLLING: 'rolling',
    RELATIVE: 'relative',
    COMPARATIVE: 'comparative',
    CUSTOM: 'custom',
  } as const,

  // Period Granularity
  GRANULARITY: {
    MINUTE: 'minute',
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
  } as const,

  // Period Comparison Types
  COMPARISON_TYPES: {
    PREVIOUS_PERIOD: 'previous_period',
    YEAR_OVER_YEAR: 'year_over_year',
    PERIOD_OVER_PERIOD: 'period_over_period',
    CUSTOM: 'custom',
  } as const,

  // Period Formats
  FORMATS: {
    SHORT: 'short',
    MEDIUM: 'medium',
    LONG: 'long',
    FULL: 'full',
  } as const,
} as const;

// Analytics Period Types
export type AnalyticsPeriodType =
  (typeof ANALYTICS_PERIOD.PERIODS)[keyof typeof ANALYTICS_PERIOD.PERIODS];

// Analytics Period Type Enum
export type AnalyticsPeriodTypeEnum =
  (typeof ANALYTICS_PERIOD.TYPES)[keyof typeof ANALYTICS_PERIOD.TYPES];

// Analytics Period Granularity
export type AnalyticsPeriodGranularity =
  (typeof ANALYTICS_PERIOD.GRANULARITY)[keyof typeof ANALYTICS_PERIOD.GRANULARITY];

// Analytics Period Comparison Types
export type AnalyticsPeriodComparisonType =
  (typeof ANALYTICS_PERIOD.COMPARISON_TYPES)[keyof typeof ANALYTICS_PERIOD.COMPARISON_TYPES];

// Analytics Period Formats
export type AnalyticsPeriodFormat =
  (typeof ANALYTICS_PERIOD.FORMATS)[keyof typeof ANALYTICS_PERIOD.FORMATS];

// Analytics Period Labels
export function getAnalyticsPeriodLabel(period: AnalyticsPeriodType): string {
  const labels: Record<AnalyticsPeriodType, string> = {
    [ANALYTICS_PERIOD.PERIODS.REALTIME]: 'Real-time',
    [ANALYTICS_PERIOD.PERIODS.LIVE]: 'Live',
    [ANALYTICS_PERIOD.PERIODS.NOW]: 'Now',
    [ANALYTICS_PERIOD.PERIODS.TODAY]: 'Today',
    [ANALYTICS_PERIOD.PERIODS.TODAY_SO_FAR]: 'Today So Far',
    [ANALYTICS_PERIOD.PERIODS.YESTERDAY]: 'Yesterday',
    [ANALYTICS_PERIOD.PERIODS.LAST_24_HOURS]: 'Last 24 Hours',
    [ANALYTICS_PERIOD.PERIODS.THIS_WEEK]: 'This Week',
    [ANALYTICS_PERIOD.PERIODS.LAST_WEEK]: 'Last Week',
    [ANALYTICS_PERIOD.PERIODS.LAST_7_DAYS]: 'Last 7 Days',
    [ANALYTICS_PERIOD.PERIODS.WEEK_TO_DATE]: 'Week to Date',
    [ANALYTICS_PERIOD.PERIODS.THIS_MONTH]: 'This Month',
    [ANALYTICS_PERIOD.PERIODS.LAST_MONTH]: 'Last Month',
    [ANALYTICS_PERIOD.PERIODS.LAST_30_DAYS]: 'Last 30 Days',
    [ANALYTICS_PERIOD.PERIODS.MONTH_TO_DATE]: 'Month to Date',
    [ANALYTICS_PERIOD.PERIODS.THIS_QUARTER]: 'This Quarter',
    [ANALYTICS_PERIOD.PERIODS.LAST_QUARTER]: 'Last Quarter',
    [ANALYTICS_PERIOD.PERIODS.QUARTER_TO_DATE]: 'Quarter to Date',
    [ANALYTICS_PERIOD.PERIODS.THIS_YEAR]: 'This Year',
    [ANALYTICS_PERIOD.PERIODS.LAST_YEAR]: 'Last Year',
    [ANALYTICS_PERIOD.PERIODS.LAST_365_DAYS]: 'Last 365 Days',
    [ANALYTICS_PERIOD.PERIODS.YEAR_TO_DATE]: 'Year to Date',
    [ANALYTICS_PERIOD.PERIODS.CUSTOM]: 'Custom',
    [ANALYTICS_PERIOD.PERIODS.ALL_TIME]: 'All Time',
    [ANALYTICS_PERIOD.PERIODS.ROLLING_7_DAYS]: 'Rolling 7 Days',
    [ANALYTICS_PERIOD.PERIODS.ROLLING_30_DAYS]: 'Rolling 30 Days',
    [ANALYTICS_PERIOD.PERIODS.ROLLING_60_DAYS]: 'Rolling 60 Days',
    [ANALYTICS_PERIOD.PERIODS.ROLLING_90_DAYS]: 'Rolling 90 Days',
    [ANALYTICS_PERIOD.PERIODS.ROLLING_180_DAYS]: 'Rolling 180 Days',
    [ANALYTICS_PERIOD.PERIODS.ROLLING_365_DAYS]: 'Rolling 365 Days',
  };
  return labels[period] || 'Unknown';
}

// Analytics Period Type Labels
export function getAnalyticsPeriodTypeLabel(type: AnalyticsPeriodTypeEnum): string {
  const labels: Record<AnalyticsPeriodTypeEnum, string> = {
    [ANALYTICS_PERIOD.TYPES.FIXED]: 'Fixed',
    [ANALYTICS_PERIOD.TYPES.ROLLING]: 'Rolling',
    [ANALYTICS_PERIOD.TYPES.RELATIVE]: 'Relative',
    [ANALYTICS_PERIOD.TYPES.COMPARATIVE]: 'Comparative',
    [ANALYTICS_PERIOD.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown';
}

// Analytics Period Granularity Labels
export function getAnalyticsPeriodGranularityLabel(
  granularity: AnalyticsPeriodGranularity
): string {
  const labels: Record<AnalyticsPeriodGranularity, string> = {
    [ANALYTICS_PERIOD.GRANULARITY.MINUTE]: 'Minute',
    [ANALYTICS_PERIOD.GRANULARITY.HOUR]: 'Hour',
    [ANALYTICS_PERIOD.GRANULARITY.DAY]: 'Day',
    [ANALYTICS_PERIOD.GRANULARITY.WEEK]: 'Week',
    [ANALYTICS_PERIOD.GRANULARITY.MONTH]: 'Month',
    [ANALYTICS_PERIOD.GRANULARITY.QUARTER]: 'Quarter',
    [ANALYTICS_PERIOD.GRANULARITY.YEAR]: 'Year',
  };
  return labels[granularity] || 'Unknown';
}

// Analytics Period Comparison Type Labels
export function getAnalyticsPeriodComparisonTypeLabel(type: AnalyticsPeriodComparisonType): string {
  const labels: Record<AnalyticsPeriodComparisonType, string> = {
    [ANALYTICS_PERIOD.COMPARISON_TYPES.PREVIOUS_PERIOD]: 'Previous Period',
    [ANALYTICS_PERIOD.COMPARISON_TYPES.YEAR_OVER_YEAR]: 'Year Over Year',
    [ANALYTICS_PERIOD.COMPARISON_TYPES.PERIOD_OVER_PERIOD]: 'Period Over Period',
    [ANALYTICS_PERIOD.COMPARISON_TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown';
}

// Check if period is rolling
export function isAnalyticsPeriodRolling(period: AnalyticsPeriodType): boolean {
  const rollingPeriods: AnalyticsPeriodType[] = [
    ANALYTICS_PERIOD.PERIODS.ROLLING_7_DAYS,
    ANALYTICS_PERIOD.PERIODS.ROLLING_30_DAYS,
    ANALYTICS_PERIOD.PERIODS.ROLLING_60_DAYS,
    ANALYTICS_PERIOD.PERIODS.ROLLING_90_DAYS,
    ANALYTICS_PERIOD.PERIODS.ROLLING_180_DAYS,
    ANALYTICS_PERIOD.PERIODS.ROLLING_365_DAYS,
  ];
  return rollingPeriods.includes(period);
}

// Check if period is fixed
export function isAnalyticsPeriodFixed(period: AnalyticsPeriodType): boolean {
  const fixedPeriods: AnalyticsPeriodType[] = [
    ANALYTICS_PERIOD.PERIODS.TODAY,
    ANALYTICS_PERIOD.PERIODS.YESTERDAY,
    ANALYTICS_PERIOD.PERIODS.THIS_WEEK,
    ANALYTICS_PERIOD.PERIODS.LAST_WEEK,
    ANALYTICS_PERIOD.PERIODS.THIS_MONTH,
    ANALYTICS_PERIOD.PERIODS.LAST_MONTH,
    ANALYTICS_PERIOD.PERIODS.THIS_QUARTER,
    ANALYTICS_PERIOD.PERIODS.LAST_QUARTER,
    ANALYTICS_PERIOD.PERIODS.THIS_YEAR,
    ANALYTICS_PERIOD.PERIODS.LAST_YEAR,
  ];
  return fixedPeriods.includes(period);
}

// Check if period is relative
export function isAnalyticsPeriodRelative(period: AnalyticsPeriodType): boolean {
  const relativePeriods: AnalyticsPeriodType[] = [
    ANALYTICS_PERIOD.PERIODS.LAST_24_HOURS,
    ANALYTICS_PERIOD.PERIODS.LAST_7_DAYS,
    ANALYTICS_PERIOD.PERIODS.LAST_30_DAYS,
    ANALYTICS_PERIOD.PERIODS.LAST_365_DAYS,
  ];
  return relativePeriods.includes(period);
}

// Get period days count
export function getAnalyticsPeriodDays(period: AnalyticsPeriodType): number {
  const daysMap: Partial<Record<AnalyticsPeriodType, number>> = {
    [ANALYTICS_PERIOD.PERIODS.LAST_24_HOURS]: 1,
    [ANALYTICS_PERIOD.PERIODS.LAST_7_DAYS]: 7,
    [ANALYTICS_PERIOD.PERIODS.LAST_30_DAYS]: 30,
    [ANALYTICS_PERIOD.PERIODS.LAST_365_DAYS]: 365,
    [ANALYTICS_PERIOD.PERIODS.ROLLING_7_DAYS]: 7,
    [ANALYTICS_PERIOD.PERIODS.ROLLING_30_DAYS]: 30,
    [ANALYTICS_PERIOD.PERIODS.ROLLING_60_DAYS]: 60,
    [ANALYTICS_PERIOD.PERIODS.ROLLING_90_DAYS]: 90,
    [ANALYTICS_PERIOD.PERIODS.ROLLING_180_DAYS]: 180,
    [ANALYTICS_PERIOD.PERIODS.ROLLING_365_DAYS]: 365,
  };
  return daysMap[period] || 0;
}
