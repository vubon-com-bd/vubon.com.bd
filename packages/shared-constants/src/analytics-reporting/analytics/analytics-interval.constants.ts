/**
 * @fileoverview Analytics data intervals and granularity definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Analytics data intervals
 */
export enum AnalyticsInterval {
  /** Minute level aggregation */
  MINUTE = 'MINUTE',
  /** Hour level aggregation */
  HOUR = 'HOUR',
  /** Day level aggregation */
  DAY = 'DAY',
  /** Week level aggregation */
  WEEK = 'WEEK',
  /** Month level aggregation */
  MONTH = 'MONTH',
  /** Quarter level aggregation */
  QUARTER = 'QUARTER',
  /** Year level aggregation */
  YEAR = 'YEAR',
  /** Custom interval */
  CUSTOM_INTERVAL = 'CUSTOM_INTERVAL',
  /** 5 minutes interval */
  FIVE_MINUTES = 'FIVE_MINUTES',
  /** 10 minutes interval */
  TEN_MINUTES = 'TEN_MINUTES',
  /** 15 minutes interval */
  FIFTEEN_MINUTES = 'FIFTEEN_MINUTES',
  /** 30 minutes interval */
  THIRTY_MINUTES = 'THIRTY_MINUTES',
  /** 2 hours interval */
  TWO_HOURS = 'TWO_HOURS',
  /** 6 hours interval */
  SIX_HOURS = 'SIX_HOURS',
  /** 12 hours interval */
  TWELVE_HOURS = 'TWELVE_HOURS',
  /** 2 days interval */
  TWO_DAYS = 'TWO_DAYS',
  /** 3 days interval */
  THREE_DAYS = 'THREE_DAYS',
  /** 5 days interval */
  FIVE_DAYS = 'FIVE_DAYS',
  /** Bi-weekly interval (14 days) */
  BI_WEEKLY = 'BI_WEEKLY',
  /** 2 months interval */
  TWO_MONTHS = 'TWO_MONTHS',
  /** 3 months interval */
  THREE_MONTHS = 'THREE_MONTHS',
  /** 6 months interval */
  SIX_MONTHS = 'SIX_MONTHS',
  /** 2 years interval */
  TWO_YEARS = 'TWO_YEARS',
  /** 5 years interval */
  FIVE_YEARS = 'FIVE_YEARS',
}

/**
 * Interval category classification
 */
export enum AnalyticsIntervalCategory {
  /** Second-based intervals */
  SECOND = 'SECOND',
  /** Minute-based intervals */
  MINUTE = 'MINUTE',
  /** Hour-based intervals */
  HOUR = 'HOUR',
  /** Day-based intervals */
  DAY = 'DAY',
  /** Week-based intervals */
  WEEK = 'WEEK',
  /** Month-based intervals */
  MONTH = 'MONTH',
  /** Quarter-based intervals */
  QUARTER = 'QUARTER',
  /** Year-based intervals */
  YEAR = 'YEAR',
  /** Custom intervals */
  CUSTOM = 'CUSTOM',
}

/**
 * Interval category mapping
 */
export const ANALYTICS_INTERVAL_CATEGORY_MAP: Record<AnalyticsInterval, AnalyticsIntervalCategory> =
  {
    [AnalyticsInterval.MINUTE]: AnalyticsIntervalCategory.MINUTE,
    [AnalyticsInterval.HOUR]: AnalyticsIntervalCategory.HOUR,
    [AnalyticsInterval.DAY]: AnalyticsIntervalCategory.DAY,
    [AnalyticsInterval.WEEK]: AnalyticsIntervalCategory.WEEK,
    [AnalyticsInterval.MONTH]: AnalyticsIntervalCategory.MONTH,
    [AnalyticsInterval.QUARTER]: AnalyticsIntervalCategory.QUARTER,
    [AnalyticsInterval.YEAR]: AnalyticsIntervalCategory.YEAR,
    [AnalyticsInterval.CUSTOM_INTERVAL]: AnalyticsIntervalCategory.CUSTOM,
    [AnalyticsInterval.FIVE_MINUTES]: AnalyticsIntervalCategory.MINUTE,
    [AnalyticsInterval.TEN_MINUTES]: AnalyticsIntervalCategory.MINUTE,
    [AnalyticsInterval.FIFTEEN_MINUTES]: AnalyticsIntervalCategory.MINUTE,
    [AnalyticsInterval.THIRTY_MINUTES]: AnalyticsIntervalCategory.MINUTE,
    [AnalyticsInterval.TWO_HOURS]: AnalyticsIntervalCategory.HOUR,
    [AnalyticsInterval.SIX_HOURS]: AnalyticsIntervalCategory.HOUR,
    [AnalyticsInterval.TWELVE_HOURS]: AnalyticsIntervalCategory.HOUR,
    [AnalyticsInterval.TWO_DAYS]: AnalyticsIntervalCategory.DAY,
    [AnalyticsInterval.THREE_DAYS]: AnalyticsIntervalCategory.DAY,
    [AnalyticsInterval.FIVE_DAYS]: AnalyticsIntervalCategory.DAY,
    [AnalyticsInterval.BI_WEEKLY]: AnalyticsIntervalCategory.WEEK,
    [AnalyticsInterval.TWO_MONTHS]: AnalyticsIntervalCategory.MONTH,
    [AnalyticsInterval.THREE_MONTHS]: AnalyticsIntervalCategory.MONTH,
    [AnalyticsInterval.SIX_MONTHS]: AnalyticsIntervalCategory.MONTH,
    [AnalyticsInterval.TWO_YEARS]: AnalyticsIntervalCategory.YEAR,
    [AnalyticsInterval.FIVE_YEARS]: AnalyticsIntervalCategory.YEAR,
  };

/**
 * Interval configuration
 */
export interface AnalyticsIntervalConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  months?: number;
  years?: number;
  priority: number;
}

export const ANALYTICS_INTERVAL_CONFIG: Record<AnalyticsInterval, AnalyticsIntervalConfig> = {
  [AnalyticsInterval.MINUTE]: {
    label: 'Minute',
    description: 'Aggregate data by minute',
    icon: 'Clock',
    color: '#3B82F6',
    milliseconds: 60000,
    seconds: 60,
    minutes: 1,
    hours: 0,
    days: 0,
    priority: 1,
  },
  [AnalyticsInterval.HOUR]: {
    label: 'Hour',
    description: 'Aggregate data by hour',
    icon: 'Clock',
    color: '#6366F1',
    milliseconds: 3600000,
    seconds: 3600,
    minutes: 60,
    hours: 1,
    days: 0,
    priority: 1,
  },
  [AnalyticsInterval.DAY]: {
    label: 'Day',
    description: 'Aggregate data by day',
    icon: 'Calendar',
    color: '#8B5CF6',
    milliseconds: 86400000,
    seconds: 86400,
    minutes: 1440,
    hours: 24,
    days: 1,
    priority: 1,
  },
  [AnalyticsInterval.WEEK]: {
    label: 'Week',
    description: 'Aggregate data by week',
    icon: 'Calendar',
    color: '#10B981',
    milliseconds: 604800000,
    seconds: 604800,
    minutes: 10080,
    hours: 168,
    days: 7,
    priority: 2,
  },
  [AnalyticsInterval.MONTH]: {
    label: 'Month',
    description: 'Aggregate data by month',
    icon: 'Calendar',
    color: '#F59E0B',
    milliseconds: 2592000000,
    seconds: 2592000,
    minutes: 43200,
    hours: 720,
    days: 30,
    months: 1,
    priority: 1,
  },
  [AnalyticsInterval.QUARTER]: {
    label: 'Quarter',
    description: 'Aggregate data by quarter',
    icon: 'Calendar',
    color: '#F97316',
    milliseconds: 7776000000,
    seconds: 7776000,
    minutes: 129600,
    hours: 2160,
    days: 90,
    months: 3,
    priority: 2,
  },
  [AnalyticsInterval.YEAR]: {
    label: 'Year',
    description: 'Aggregate data by year',
    icon: 'Calendar',
    color: '#EF4444',
    milliseconds: 31536000000,
    seconds: 31536000,
    minutes: 525600,
    hours: 8760,
    days: 365,
    years: 1,
    priority: 1,
  },
  [AnalyticsInterval.CUSTOM_INTERVAL]: {
    label: 'Custom Interval',
    description: 'User defined custom interval',
    icon: 'Calendar',
    color: '#6B7280',
    milliseconds: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    priority: 5,
  },
  [AnalyticsInterval.FIVE_MINUTES]: {
    label: '5 Minutes',
    description: 'Aggregate data by 5 minute intervals',
    icon: 'Clock',
    color: '#3B82F6',
    milliseconds: 300000,
    seconds: 300,
    minutes: 5,
    hours: 0,
    days: 0,
    priority: 2,
  },
  [AnalyticsInterval.TEN_MINUTES]: {
    label: '10 Minutes',
    description: 'Aggregate data by 10 minute intervals',
    icon: 'Clock',
    color: '#6366F1',
    milliseconds: 600000,
    seconds: 600,
    minutes: 10,
    hours: 0,
    days: 0,
    priority: 2,
  },
  [AnalyticsInterval.FIFTEEN_MINUTES]: {
    label: '15 Minutes',
    description: 'Aggregate data by 15 minute intervals',
    icon: 'Clock',
    color: '#8B5CF6',
    milliseconds: 900000,
    seconds: 900,
    minutes: 15,
    hours: 0,
    days: 0,
    priority: 2,
  },
  [AnalyticsInterval.THIRTY_MINUTES]: {
    label: '30 Minutes',
    description: 'Aggregate data by 30 minute intervals',
    icon: 'Clock',
    color: '#10B981',
    milliseconds: 1800000,
    seconds: 1800,
    minutes: 30,
    hours: 0,
    days: 0,
    priority: 2,
  },
  [AnalyticsInterval.TWO_HOURS]: {
    label: '2 Hours',
    description: 'Aggregate data by 2 hour intervals',
    icon: 'Clock',
    color: '#F59E0B',
    milliseconds: 7200000,
    seconds: 7200,
    minutes: 120,
    hours: 2,
    days: 0,
    priority: 3,
  },
  [AnalyticsInterval.SIX_HOURS]: {
    label: '6 Hours',
    description: 'Aggregate data by 6 hour intervals',
    icon: 'Clock',
    color: '#F97316',
    milliseconds: 21600000,
    seconds: 21600,
    minutes: 360,
    hours: 6,
    days: 0,
    priority: 3,
  },
  [AnalyticsInterval.TWELVE_HOURS]: {
    label: '12 Hours',
    description: 'Aggregate data by 12 hour intervals',
    icon: 'Clock',
    color: '#EF4444',
    milliseconds: 43200000,
    seconds: 43200,
    minutes: 720,
    hours: 12,
    days: 0,
    priority: 3,
  },
  [AnalyticsInterval.TWO_DAYS]: {
    label: '2 Days',
    description: 'Aggregate data by 2 day intervals',
    icon: 'Calendar',
    color: '#EC4899',
    milliseconds: 172800000,
    seconds: 172800,
    minutes: 2880,
    hours: 48,
    days: 2,
    priority: 3,
  },
  [AnalyticsInterval.THREE_DAYS]: {
    label: '3 Days',
    description: 'Aggregate data by 3 day intervals',
    icon: 'Calendar',
    color: '#F472B6',
    milliseconds: 259200000,
    seconds: 259200,
    minutes: 4320,
    hours: 72,
    days: 3,
    priority: 3,
  },
  [AnalyticsInterval.FIVE_DAYS]: {
    label: '5 Days',
    description: 'Aggregate data by 5 day intervals',
    icon: 'Calendar',
    color: '#FB923C',
    milliseconds: 432000000,
    seconds: 432000,
    minutes: 7200,
    hours: 120,
    days: 5,
    priority: 3,
  },
  [AnalyticsInterval.BI_WEEKLY]: {
    label: 'Bi-Weekly',
    description: 'Aggregate data by bi-weekly intervals (14 days)',
    icon: 'Calendar',
    color: '#34D399',
    milliseconds: 1209600000,
    seconds: 1209600,
    minutes: 20160,
    hours: 336,
    days: 14,
    priority: 3,
  },
  [AnalyticsInterval.TWO_MONTHS]: {
    label: '2 Months',
    description: 'Aggregate data by 2 month intervals',
    icon: 'Calendar',
    color: '#60A5FA',
    milliseconds: 5184000000,
    seconds: 5184000,
    minutes: 86400,
    hours: 1440,
    days: 60,
    months: 2,
    priority: 3,
  },
  [AnalyticsInterval.THREE_MONTHS]: {
    label: '3 Months',
    description: 'Aggregate data by 3 month intervals',
    icon: 'Calendar',
    color: '#FCD34D',
    milliseconds: 7776000000,
    seconds: 7776000,
    minutes: 129600,
    hours: 2160,
    days: 90,
    months: 3,
    priority: 3,
  },
  [AnalyticsInterval.SIX_MONTHS]: {
    label: '6 Months',
    description: 'Aggregate data by 6 month intervals',
    icon: 'Calendar',
    color: '#FCA5A5',
    milliseconds: 15552000000,
    seconds: 15552000,
    minutes: 259200,
    hours: 4320,
    days: 180,
    months: 6,
    priority: 3,
  },
  [AnalyticsInterval.TWO_YEARS]: {
    label: '2 Years',
    description: 'Aggregate data by 2 year intervals',
    icon: 'Calendar',
    color: '#D8B4FE',
    milliseconds: 63072000000,
    seconds: 63072000,
    minutes: 1051200,
    hours: 17520,
    days: 730,
    years: 2,
    priority: 3,
  },
  [AnalyticsInterval.FIVE_YEARS]: {
    label: '5 Years',
    description: 'Aggregate data by 5 year intervals',
    icon: 'Calendar',
    color: '#C4B5FD',
    milliseconds: 157680000000,
    seconds: 157680000,
    minutes: 2628000,
    hours: 43800,
    days: 1825,
    years: 5,
    priority: 3,
  },
};

/**
 * Get interval category
 */
export function getIntervalCategory(interval: AnalyticsInterval): AnalyticsIntervalCategory {
  return ANALYTICS_INTERVAL_CATEGORY_MAP[interval];
}

/**
 * Get interval label
 */
export function getIntervalLabel(interval: AnalyticsInterval): string {
  return ANALYTICS_INTERVAL_CONFIG[interval]?.label || interval;
}

/**
 * Get interval description
 */
export function getIntervalDescription(interval: AnalyticsInterval): string {
  return ANALYTICS_INTERVAL_CONFIG[interval]?.description || '';
}

/**
 * Get interval milliseconds
 */
export function getIntervalMilliseconds(interval: AnalyticsInterval): number {
  return ANALYTICS_INTERVAL_CONFIG[interval]?.milliseconds || 0;
}

/**
 * Get interval seconds
 */
export function getIntervalSeconds(interval: AnalyticsInterval): number {
  return ANALYTICS_INTERVAL_CONFIG[interval]?.seconds || 0;
}

/**
 * Get interval minutes
 */
export function getIntervalMinutes(interval: AnalyticsInterval): number {
  return ANALYTICS_INTERVAL_CONFIG[interval]?.minutes || 0;
}

/**
 * Get interval hours
 */
export function getIntervalHours(interval: AnalyticsInterval): number {
  return ANALYTICS_INTERVAL_CONFIG[interval]?.hours || 0;
}

/**
 * Get interval days
 */
export function getIntervalDays(interval: AnalyticsInterval): number {
  return ANALYTICS_INTERVAL_CONFIG[interval]?.days || 0;
}

/**
 * Get intervals by category
 */
export function getIntervalsByCategory(category: AnalyticsIntervalCategory): AnalyticsInterval[] {
  return Object.entries(ANALYTICS_INTERVAL_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([interval]) => interval as AnalyticsInterval);
}

/**
 * Get minute-based intervals
 */
export function getMinuteIntervals(): AnalyticsInterval[] {
  return getIntervalsByCategory(AnalyticsIntervalCategory.MINUTE);
}

/**
 * Get hour-based intervals
 */
export function getHourIntervals(): AnalyticsInterval[] {
  return getIntervalsByCategory(AnalyticsIntervalCategory.HOUR);
}

/**
 * Get day-based intervals
 */
export function getDayIntervals(): AnalyticsInterval[] {
  return getIntervalsByCategory(AnalyticsIntervalCategory.DAY);
}

/**
 * Get week-based intervals
 */
export function getWeekIntervals(): AnalyticsInterval[] {
  return getIntervalsByCategory(AnalyticsIntervalCategory.WEEK);
}

/**
 * Get month-based intervals
 */
export function getMonthIntervals(): AnalyticsInterval[] {
  return getIntervalsByCategory(AnalyticsIntervalCategory.MONTH);
}

/**
 * Get quarter-based intervals
 */
export function getQuarterIntervals(): AnalyticsInterval[] {
  return getIntervalsByCategory(AnalyticsIntervalCategory.QUARTER);
}

/**
 * Get year-based intervals
 */
export function getYearIntervals(): AnalyticsInterval[] {
  return getIntervalsByCategory(AnalyticsIntervalCategory.YEAR);
}

/**
 * Get default intervals for dashboard
 */
export function getDefaultDashboardIntervals(): AnalyticsInterval[] {
  return [
    AnalyticsInterval.HOUR,
    AnalyticsInterval.DAY,
    AnalyticsInterval.WEEK,
    AnalyticsInterval.MONTH,
    AnalyticsInterval.QUARTER,
    AnalyticsInterval.YEAR,
  ];
}

/**
 * Get real-time intervals
 */
export function getRealtimeIntervals(): AnalyticsInterval[] {
  return [
    AnalyticsInterval.MINUTE,
    AnalyticsInterval.FIVE_MINUTES,
    AnalyticsInterval.TEN_MINUTES,
    AnalyticsInterval.FIFTEEN_MINUTES,
    AnalyticsInterval.THIRTY_MINUTES,
    AnalyticsInterval.HOUR,
  ];
}

/**
 * Get long-term intervals
 */
export function getLongTermIntervals(): AnalyticsInterval[] {
  return [
    AnalyticsInterval.MONTH,
    AnalyticsInterval.QUARTER,
    AnalyticsInterval.YEAR,
    AnalyticsInterval.TWO_YEARS,
    AnalyticsInterval.FIVE_YEARS,
  ];
}

/**
 * Check if interval is minute-based
 */
export function isMinuteInterval(interval: AnalyticsInterval): boolean {
  return getIntervalCategory(interval) === AnalyticsIntervalCategory.MINUTE;
}

/**
 * Check if interval is hour-based
 */
export function isHourInterval(interval: AnalyticsInterval): boolean {
  return getIntervalCategory(interval) === AnalyticsIntervalCategory.HOUR;
}

/**
 * Check if interval is day-based
 */
export function isDayInterval(interval: AnalyticsInterval): boolean {
  return getIntervalCategory(interval) === AnalyticsIntervalCategory.DAY;
}

/**
 * Check if interval is week-based
 */
export function isWeekInterval(interval: AnalyticsInterval): boolean {
  return getIntervalCategory(interval) === AnalyticsIntervalCategory.WEEK;
}

/**
 * Check if interval is month-based
 */
export function isMonthInterval(interval: AnalyticsInterval): boolean {
  return getIntervalCategory(interval) === AnalyticsIntervalCategory.MONTH;
}

/**
 * Check if interval is quarter-based
 */
export function isQuarterInterval(interval: AnalyticsInterval): boolean {
  return getIntervalCategory(interval) === AnalyticsIntervalCategory.QUARTER;
}

/**
 * Check if interval is year-based
 */
export function isYearInterval(interval: AnalyticsInterval): boolean {
  return getIntervalCategory(interval) === AnalyticsIntervalCategory.YEAR;
}

/**
 * Get interval for duration in milliseconds
 */
export function getIntervalForDuration(durationMs: number): AnalyticsInterval | null {
  const intervals = Object.values(AnalyticsInterval);
  let closestInterval: AnalyticsInterval | null = null;
  let closestDiff = Infinity;

  for (const interval of intervals) {
    const intervalMs = getIntervalMilliseconds(interval);
    if (intervalMs === 0) continue;

    const diff = Math.abs(durationMs - intervalMs);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestInterval = interval;
    }
  }

  return closestInterval;
}

/**
 * Recommended interval based on date range
 */
export function getRecommendedInterval(startDate: Date, endDate: Date): AnalyticsInterval {
  const diffMs = endDate.getTime() - startDate.getTime();
  const diffDays = diffMs / (24 * 60 * 60 * 1000);

  if (diffDays <= 1) {
    return AnalyticsInterval.HOUR;
  }
  if (diffDays <= 7) {
    return AnalyticsInterval.DAY;
  }
  if (diffDays <= 30) {
    return AnalyticsInterval.DAY;
  }
  if (diffDays <= 90) {
    return AnalyticsInterval.WEEK;
  }
  if (diffDays <= 365) {
    return AnalyticsInterval.MONTH;
  }
  if (diffDays <= 730) {
    return AnalyticsInterval.QUARTER;
  }
  return AnalyticsInterval.YEAR;
}
