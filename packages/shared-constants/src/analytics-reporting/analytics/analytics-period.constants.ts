/**
 * @fileoverview Analytics time periods and date ranges definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Analytics time periods
 */
export enum AnalyticsPeriod {
  /** Today */
  TODAY = 'TODAY',
  /** Yesterday */
  YESTERDAY = 'YESTERDAY',
  /** Last 7 days */
  LAST_7_DAYS = 'LAST_7_DAYS',
  /** Last 14 days */
  LAST_14_DAYS = 'LAST_14_DAYS',
  /** Last 30 days */
  LAST_30_DAYS = 'LAST_30_DAYS',
  /** Last 60 days */
  LAST_60_DAYS = 'LAST_60_DAYS',
  /** Last 90 days */
  LAST_90_DAYS = 'LAST_90_DAYS',
  /** Last 180 days */
  LAST_180_DAYS = 'LAST_180_DAYS',
  /** Last 365 days */
  LAST_365_DAYS = 'LAST_365_DAYS',
  /** This month */
  THIS_MONTH = 'THIS_MONTH',
  /** Last month */
  LAST_MONTH = 'LAST_MONTH',
  /** This quarter */
  THIS_QUARTER = 'THIS_QUARTER',
  /** Last quarter */
  LAST_QUARTER = 'LAST_QUARTER',
  /** This year */
  THIS_YEAR = 'THIS_YEAR',
  /** Last year */
  LAST_YEAR = 'LAST_YEAR',
  /** Custom date range */
  CUSTOM_RANGE = 'CUSTOM_RANGE',
  /** Last 24 hours */
  LAST_24_HOURS = 'LAST_24_HOURS',
  /** Last 48 hours */
  LAST_48_HOURS = 'LAST_48_HOURS',
  /** Last 7 days excluding today */
  LAST_7_DAYS_EXCLUDING_TODAY = 'LAST_7_DAYS_EXCLUDING_TODAY',
  /** Last 30 days excluding today */
  LAST_30_DAYS_EXCLUDING_TODAY = 'LAST_30_DAYS_EXCLUDING_TODAY',
  /** Week to date */
  WEEK_TO_DATE = 'WEEK_TO_DATE',
  /** Month to date */
  MONTH_TO_DATE = 'MONTH_TO_DATE',
  /** Quarter to date */
  QUARTER_TO_DATE = 'QUARTER_TO_DATE',
  /** Year to date */
  YEAR_TO_DATE = 'YEAR_TO_DATE',
  /** Previous week */
  PREVIOUS_WEEK = 'PREVIOUS_WEEK',
  /** Previous month */
  PREVIOUS_MONTH = 'PREVIOUS_MONTH',
  /** Previous quarter */
  PREVIOUS_QUARTER = 'PREVIOUS_QUARTER',
  /** Previous year */
  PREVIOUS_YEAR = 'PREVIOUS_YEAR',
  /** Next 7 days */
  NEXT_7_DAYS = 'NEXT_7_DAYS',
  /** Next 30 days */
  NEXT_30_DAYS = 'NEXT_30_DAYS',
  /** Next 90 days */
  NEXT_90_DAYS = 'NEXT_90_DAYS',
}

/**
 * Period category classification
 */
export enum AnalyticsPeriodCategory {
  /** Day-based periods */
  DAY = 'DAY',
  /** Week-based periods */
  WEEK = 'WEEK',
  /** Month-based periods */
  MONTH = 'MONTH',
  /** Quarter-based periods */
  QUARTER = 'QUARTER',
  /** Year-based periods */
  YEAR = 'YEAR',
  /** Custom periods */
  CUSTOM = 'CUSTOM',
  /** Relative periods */
  RELATIVE = 'RELATIVE',
  /** Year-to-date periods */
  YTD = 'YTD',
}

/**
 * Period category mapping
 */
export const ANALYTICS_PERIOD_CATEGORY_MAP: Record<AnalyticsPeriod, AnalyticsPeriodCategory> = {
  [AnalyticsPeriod.TODAY]: AnalyticsPeriodCategory.DAY,
  [AnalyticsPeriod.YESTERDAY]: AnalyticsPeriodCategory.DAY,
  [AnalyticsPeriod.LAST_7_DAYS]: AnalyticsPeriodCategory.WEEK,
  [AnalyticsPeriod.LAST_14_DAYS]: AnalyticsPeriodCategory.WEEK,
  [AnalyticsPeriod.LAST_30_DAYS]: AnalyticsPeriodCategory.MONTH,
  [AnalyticsPeriod.LAST_60_DAYS]: AnalyticsPeriodCategory.MONTH,
  [AnalyticsPeriod.LAST_90_DAYS]: AnalyticsPeriodCategory.QUARTER,
  [AnalyticsPeriod.LAST_180_DAYS]: AnalyticsPeriodCategory.QUARTER,
  [AnalyticsPeriod.LAST_365_DAYS]: AnalyticsPeriodCategory.YEAR,
  [AnalyticsPeriod.THIS_MONTH]: AnalyticsPeriodCategory.MONTH,
  [AnalyticsPeriod.LAST_MONTH]: AnalyticsPeriodCategory.MONTH,
  [AnalyticsPeriod.THIS_QUARTER]: AnalyticsPeriodCategory.QUARTER,
  [AnalyticsPeriod.LAST_QUARTER]: AnalyticsPeriodCategory.QUARTER,
  [AnalyticsPeriod.THIS_YEAR]: AnalyticsPeriodCategory.YEAR,
  [AnalyticsPeriod.LAST_YEAR]: AnalyticsPeriodCategory.YEAR,
  [AnalyticsPeriod.CUSTOM_RANGE]: AnalyticsPeriodCategory.CUSTOM,
  [AnalyticsPeriod.LAST_24_HOURS]: AnalyticsPeriodCategory.DAY,
  [AnalyticsPeriod.LAST_48_HOURS]: AnalyticsPeriodCategory.DAY,
  [AnalyticsPeriod.LAST_7_DAYS_EXCLUDING_TODAY]: AnalyticsPeriodCategory.WEEK,
  [AnalyticsPeriod.LAST_30_DAYS_EXCLUDING_TODAY]: AnalyticsPeriodCategory.MONTH,
  [AnalyticsPeriod.WEEK_TO_DATE]: AnalyticsPeriodCategory.WEEK,
  [AnalyticsPeriod.MONTH_TO_DATE]: AnalyticsPeriodCategory.MONTH,
  [AnalyticsPeriod.QUARTER_TO_DATE]: AnalyticsPeriodCategory.QUARTER,
  [AnalyticsPeriod.YEAR_TO_DATE]: AnalyticsPeriodCategory.YTD,
  [AnalyticsPeriod.PREVIOUS_WEEK]: AnalyticsPeriodCategory.WEEK,
  [AnalyticsPeriod.PREVIOUS_MONTH]: AnalyticsPeriodCategory.MONTH,
  [AnalyticsPeriod.PREVIOUS_QUARTER]: AnalyticsPeriodCategory.QUARTER,
  [AnalyticsPeriod.PREVIOUS_YEAR]: AnalyticsPeriodCategory.YEAR,
  [AnalyticsPeriod.NEXT_7_DAYS]: AnalyticsPeriodCategory.WEEK,
  [AnalyticsPeriod.NEXT_30_DAYS]: AnalyticsPeriodCategory.MONTH,
  [AnalyticsPeriod.NEXT_90_DAYS]: AnalyticsPeriodCategory.QUARTER,
};

/**
 * Period configuration
 */
export interface AnalyticsPeriodConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  days: number;
  isRelative: boolean;
  priority: number;
}

export const ANALYTICS_PERIOD_CONFIG: Record<AnalyticsPeriod, AnalyticsPeriodConfig> = {
  [AnalyticsPeriod.TODAY]: {
    label: 'Today',
    description: 'Current day',
    icon: 'Calendar',
    color: '#3B82F6',
    days: 1,
    isRelative: false,
    priority: 1,
  },
  [AnalyticsPeriod.YESTERDAY]: {
    label: 'Yesterday',
    description: 'Previous day',
    icon: 'Calendar',
    color: '#6366F1',
    days: 1,
    isRelative: true,
    priority: 2,
  },
  [AnalyticsPeriod.LAST_7_DAYS]: {
    label: 'Last 7 Days',
    description: 'Previous 7 days including today',
    icon: 'Calendar',
    color: '#8B5CF6',
    days: 7,
    isRelative: true,
    priority: 1,
  },
  [AnalyticsPeriod.LAST_14_DAYS]: {
    label: 'Last 14 Days',
    description: 'Previous 14 days including today',
    icon: 'Calendar',
    color: '#10B981',
    days: 14,
    isRelative: true,
    priority: 2,
  },
  [AnalyticsPeriod.LAST_30_DAYS]: {
    label: 'Last 30 Days',
    description: 'Previous 30 days including today',
    icon: 'Calendar',
    color: '#F59E0B',
    days: 30,
    isRelative: true,
    priority: 1,
  },
  [AnalyticsPeriod.LAST_60_DAYS]: {
    label: 'Last 60 Days',
    description: 'Previous 60 days including today',
    icon: 'Calendar',
    color: '#F97316',
    days: 60,
    isRelative: true,
    priority: 2,
  },
  [AnalyticsPeriod.LAST_90_DAYS]: {
    label: 'Last 90 Days',
    description: 'Previous 90 days including today',
    icon: 'Calendar',
    color: '#EF4444',
    days: 90,
    isRelative: true,
    priority: 2,
  },
  [AnalyticsPeriod.LAST_180_DAYS]: {
    label: 'Last 180 Days',
    description: 'Previous 180 days including today',
    icon: 'Calendar',
    color: '#EC4899',
    days: 180,
    isRelative: true,
    priority: 3,
  },
  [AnalyticsPeriod.LAST_365_DAYS]: {
    label: 'Last 365 Days',
    description: 'Previous 365 days including today',
    icon: 'Calendar',
    color: '#8B5CF6',
    days: 365,
    isRelative: true,
    priority: 3,
  },
  [AnalyticsPeriod.THIS_MONTH]: {
    label: 'This Month',
    description: 'Current month from start to today',
    icon: 'Calendar',
    color: '#22C55E',
    days: 30,
    isRelative: false,
    priority: 1,
  },
  [AnalyticsPeriod.LAST_MONTH]: {
    label: 'Last Month',
    description: 'Previous full month',
    icon: 'Calendar',
    color: '#3B82F6',
    days: 30,
    isRelative: true,
    priority: 2,
  },
  [AnalyticsPeriod.THIS_QUARTER]: {
    label: 'This Quarter',
    description: 'Current quarter from start to today',
    icon: 'Calendar',
    color: '#8B5CF6',
    days: 90,
    isRelative: false,
    priority: 2,
  },
  [AnalyticsPeriod.LAST_QUARTER]: {
    label: 'Last Quarter',
    description: 'Previous full quarter',
    icon: 'Calendar',
    color: '#F59E0B',
    days: 90,
    isRelative: true,
    priority: 2,
  },
  [AnalyticsPeriod.THIS_YEAR]: {
    label: 'This Year',
    description: 'Current year from start to today',
    icon: 'Calendar',
    color: '#10B981',
    days: 365,
    isRelative: false,
    priority: 1,
  },
  [AnalyticsPeriod.LAST_YEAR]: {
    label: 'Last Year',
    description: 'Previous full year',
    icon: 'Calendar',
    color: '#EF4444',
    days: 365,
    isRelative: true,
    priority: 2,
  },
  [AnalyticsPeriod.CUSTOM_RANGE]: {
    label: 'Custom Range',
    description: 'User defined date range',
    icon: 'Calendar',
    color: '#6B7280',
    days: 0,
    isRelative: false,
    priority: 4,
  },
  [AnalyticsPeriod.LAST_24_HOURS]: {
    label: 'Last 24 Hours',
    description: 'Previous 24 hours',
    icon: 'Clock',
    color: '#3B82F6',
    days: 1,
    isRelative: true,
    priority: 2,
  },
  [AnalyticsPeriod.LAST_48_HOURS]: {
    label: 'Last 48 Hours',
    description: 'Previous 48 hours',
    icon: 'Clock',
    color: '#6366F1',
    days: 2,
    isRelative: true,
    priority: 3,
  },
  [AnalyticsPeriod.LAST_7_DAYS_EXCLUDING_TODAY]: {
    label: 'Last 7 Days (excl. today)',
    description: 'Previous 7 days excluding today',
    icon: 'Calendar',
    color: '#8B5CF6',
    days: 7,
    isRelative: true,
    priority: 3,
  },
  [AnalyticsPeriod.LAST_30_DAYS_EXCLUDING_TODAY]: {
    label: 'Last 30 Days (excl. today)',
    description: 'Previous 30 days excluding today',
    icon: 'Calendar',
    color: '#F59E0B',
    days: 30,
    isRelative: true,
    priority: 3,
  },
  [AnalyticsPeriod.WEEK_TO_DATE]: {
    label: 'Week to Date',
    description: 'From start of week to today',
    icon: 'Calendar',
    color: '#10B981',
    days: 7,
    isRelative: false,
    priority: 3,
  },
  [AnalyticsPeriod.MONTH_TO_DATE]: {
    label: 'Month to Date',
    description: 'From start of month to today',
    icon: 'Calendar',
    color: '#22C55E',
    days: 30,
    isRelative: false,
    priority: 3,
  },
  [AnalyticsPeriod.QUARTER_TO_DATE]: {
    label: 'Quarter to Date',
    description: 'From start of quarter to today',
    icon: 'Calendar',
    color: '#F59E0B',
    days: 90,
    isRelative: false,
    priority: 3,
  },
  [AnalyticsPeriod.YEAR_TO_DATE]: {
    label: 'Year to Date',
    description: 'From start of year to today',
    icon: 'Calendar',
    color: '#EF4444',
    days: 365,
    isRelative: false,
    priority: 2,
  },
  [AnalyticsPeriod.PREVIOUS_WEEK]: {
    label: 'Previous Week',
    description: 'Previous full week',
    icon: 'Calendar',
    color: '#8B5CF6',
    days: 7,
    isRelative: true,
    priority: 2,
  },
  [AnalyticsPeriod.PREVIOUS_MONTH]: {
    label: 'Previous Month',
    description: 'Previous full month',
    icon: 'Calendar',
    color: '#3B82F6',
    days: 30,
    isRelative: true,
    priority: 2,
  },
  [AnalyticsPeriod.PREVIOUS_QUARTER]: {
    label: 'Previous Quarter',
    description: 'Previous full quarter',
    icon: 'Calendar',
    color: '#F59E0B',
    days: 90,
    isRelative: true,
    priority: 2,
  },
  [AnalyticsPeriod.PREVIOUS_YEAR]: {
    label: 'Previous Year',
    description: 'Previous full year',
    icon: 'Calendar',
    color: '#EF4444',
    days: 365,
    isRelative: true,
    priority: 2,
  },
  [AnalyticsPeriod.NEXT_7_DAYS]: {
    label: 'Next 7 Days',
    description: 'Upcoming 7 days',
    icon: 'Calendar',
    color: '#22C55E',
    days: 7,
    isRelative: true,
    priority: 3,
  },
  [AnalyticsPeriod.NEXT_30_DAYS]: {
    label: 'Next 30 Days',
    description: 'Upcoming 30 days',
    icon: 'Calendar',
    color: '#10B981',
    days: 30,
    isRelative: true,
    priority: 3,
  },
  [AnalyticsPeriod.NEXT_90_DAYS]: {
    label: 'Next 90 Days',
    description: 'Upcoming 90 days',
    icon: 'Calendar',
    color: '#F59E0B',
    days: 90,
    isRelative: true,
    priority: 3,
  },
};

/**
 * Date range interface
 */
export interface DateRange {
  startDate: Date;
  endDate: Date;
}

/**
 * Get period category
 */
export function getPeriodCategory(period: AnalyticsPeriod): AnalyticsPeriodCategory {
  return ANALYTICS_PERIOD_CATEGORY_MAP[period];
}

/**
 * Get period label
 */
export function getPeriodLabel(period: AnalyticsPeriod): string {
  return ANALYTICS_PERIOD_CONFIG[period]?.label || period;
}

/**
 * Get period description
 */
export function getPeriodDescription(period: AnalyticsPeriod): string {
  return ANALYTICS_PERIOD_CONFIG[period]?.description || '';
}

/**
 * Get period days
 */
export function getPeriodDays(period: AnalyticsPeriod): number {
  return ANALYTICS_PERIOD_CONFIG[period]?.days || 0;
}

/**
 * Check if period is relative
 */
export function isPeriodRelative(period: AnalyticsPeriod): boolean {
  return ANALYTICS_PERIOD_CONFIG[period]?.isRelative || false;
}

/**
 * Get periods by category
 */
export function getPeriodsByCategory(category: AnalyticsPeriodCategory): AnalyticsPeriod[] {
  return Object.entries(ANALYTICS_PERIOD_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([period]) => period as AnalyticsPeriod);
}

/**
 * Get default periods for dashboard
 */
export function getDefaultDashboardPeriods(): AnalyticsPeriod[] {
  return [
    AnalyticsPeriod.TODAY,
    AnalyticsPeriod.YESTERDAY,
    AnalyticsPeriod.LAST_7_DAYS,
    AnalyticsPeriod.LAST_30_DAYS,
    AnalyticsPeriod.LAST_90_DAYS,
    AnalyticsPeriod.THIS_MONTH,
    AnalyticsPeriod.THIS_YEAR,
  ];
}

/**
 * Get comparison periods
 */
export function getComparisonPeriods(): AnalyticsPeriod[] {
  return [
    AnalyticsPeriod.PREVIOUS_WEEK,
    AnalyticsPeriod.PREVIOUS_MONTH,
    AnalyticsPeriod.PREVIOUS_QUARTER,
    AnalyticsPeriod.PREVIOUS_YEAR,
    AnalyticsPeriod.LAST_7_DAYS,
    AnalyticsPeriod.LAST_30_DAYS,
    AnalyticsPeriod.LAST_90_DAYS,
  ];
}

/**
 * Get relative periods
 */
export function getRelativePeriods(): AnalyticsPeriod[] {
  return Object.values(AnalyticsPeriod).filter((period) => isPeriodRelative(period));
}

/**
 * Get absolute periods
 */
export function getAbsolutePeriods(): AnalyticsPeriod[] {
  return Object.values(AnalyticsPeriod).filter((period) => !isPeriodRelative(period));
}

/**
 * Get period for days
 */
export function getPeriodForDays(days: number): AnalyticsPeriod | null {
  const periodMap: Record<number, AnalyticsPeriod> = {
    1: AnalyticsPeriod.TODAY,
    7: AnalyticsPeriod.LAST_7_DAYS,
    14: AnalyticsPeriod.LAST_14_DAYS,
    30: AnalyticsPeriod.LAST_30_DAYS,
    60: AnalyticsPeriod.LAST_60_DAYS,
    90: AnalyticsPeriod.LAST_90_DAYS,
    180: AnalyticsPeriod.LAST_180_DAYS,
    365: AnalyticsPeriod.LAST_365_DAYS,
  };

  return periodMap[days] || null;
}

/**
 * Calculate date range for period
 */
export function calculateDateRange(period: AnalyticsPeriod): DateRange {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (period) {
    case AnalyticsPeriod.TODAY:
      return {
        startDate: new Date(today),
        endDate: new Date(today),
      };
    case AnalyticsPeriod.YESTERDAY: {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        startDate: new Date(yesterday),
        endDate: new Date(yesterday),
      };
    }
    case AnalyticsPeriod.LAST_7_DAYS: {
      const start = new Date(today);
      start.setDate(start.getDate() - 6);
      return {
        startDate: start,
        endDate: new Date(today),
      };
    }
    case AnalyticsPeriod.LAST_14_DAYS: {
      const start = new Date(today);
      start.setDate(start.getDate() - 13);
      return {
        startDate: start,
        endDate: new Date(today),
      };
    }
    case AnalyticsPeriod.LAST_30_DAYS: {
      const start = new Date(today);
      start.setDate(start.getDate() - 29);
      return {
        startDate: start,
        endDate: new Date(today),
      };
    }
    case AnalyticsPeriod.LAST_60_DAYS: {
      const start = new Date(today);
      start.setDate(start.getDate() - 59);
      return {
        startDate: start,
        endDate: new Date(today),
      };
    }
    case AnalyticsPeriod.LAST_90_DAYS: {
      const start = new Date(today);
      start.setDate(start.getDate() - 89);
      return {
        startDate: start,
        endDate: new Date(today),
      };
    }
    case AnalyticsPeriod.LAST_180_DAYS: {
      const start = new Date(today);
      start.setDate(start.getDate() - 179);
      return {
        startDate: start,
        endDate: new Date(today),
      };
    }
    case AnalyticsPeriod.LAST_365_DAYS: {
      const start = new Date(today);
      start.setDate(start.getDate() - 364);
      return {
        startDate: start,
        endDate: new Date(today),
      };
    }
    case AnalyticsPeriod.THIS_MONTH: {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      return {
        startDate: start,
        endDate: new Date(today),
      };
    }
    case AnalyticsPeriod.LAST_MONTH: {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return {
        startDate: start,
        endDate: end,
      };
    }
    case AnalyticsPeriod.THIS_QUARTER: {
      const quarter = Math.floor(now.getMonth() / 3);
      const start = new Date(now.getFullYear(), quarter * 3, 1);
      return {
        startDate: start,
        endDate: new Date(today),
      };
    }
    case AnalyticsPeriod.LAST_QUARTER: {
      const quarter = Math.floor(now.getMonth() / 3);
      const start = new Date(now.getFullYear(), quarter * 3 - 3, 1);
      const end = new Date(now.getFullYear(), quarter * 3, 0);
      return {
        startDate: start,
        endDate: end,
      };
    }
    case AnalyticsPeriod.THIS_YEAR: {
      const start = new Date(now.getFullYear(), 0, 1);
      return {
        startDate: start,
        endDate: new Date(today),
      };
    }
    case AnalyticsPeriod.LAST_YEAR: {
      const start = new Date(now.getFullYear() - 1, 0, 1);
      const end = new Date(now.getFullYear() - 1, 11, 31);
      return {
        startDate: start,
        endDate: end,
      };
    }
    case AnalyticsPeriod.LAST_24_HOURS: {
      const start = new Date(now);
      start.setHours(now.getHours() - 24);
      return {
        startDate: start,
        endDate: new Date(now),
      };
    }
    case AnalyticsPeriod.LAST_48_HOURS: {
      const start = new Date(now);
      start.setHours(now.getHours() - 48);
      return {
        startDate: start,
        endDate: new Date(now),
      };
    }
    case AnalyticsPeriod.LAST_7_DAYS_EXCLUDING_TODAY: {
      const start = new Date(today);
      start.setDate(start.getDate() - 7);
      const end = new Date(today);
      end.setDate(end.getDate() - 1);
      return {
        startDate: start,
        endDate: end,
      };
    }
    case AnalyticsPeriod.LAST_30_DAYS_EXCLUDING_TODAY: {
      const start = new Date(today);
      start.setDate(start.getDate() - 30);
      const end = new Date(today);
      end.setDate(end.getDate() - 1);
      return {
        startDate: start,
        endDate: end,
      };
    }
    case AnalyticsPeriod.WEEK_TO_DATE: {
      const day = now.getDay();
      const start = new Date(today);
      start.setDate(start.getDate() - day);
      return {
        startDate: start,
        endDate: new Date(today),
      };
    }
    case AnalyticsPeriod.MONTH_TO_DATE: {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      return {
        startDate: start,
        endDate: new Date(today),
      };
    }
    case AnalyticsPeriod.QUARTER_TO_DATE: {
      const quarter = Math.floor(now.getMonth() / 3);
      const start = new Date(now.getFullYear(), quarter * 3, 1);
      return {
        startDate: start,
        endDate: new Date(today),
      };
    }
    case AnalyticsPeriod.YEAR_TO_DATE: {
      const start = new Date(now.getFullYear(), 0, 1);
      return {
        startDate: start,
        endDate: new Date(today),
      };
    }
    case AnalyticsPeriod.PREVIOUS_WEEK: {
      const start = new Date(today);
      start.setDate(start.getDate() - 7);
      const end = new Date(today);
      end.setDate(end.getDate() - 1);
      return {
        startDate: start,
        endDate: end,
      };
    }
    case AnalyticsPeriod.PREVIOUS_MONTH: {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return {
        startDate: start,
        endDate: end,
      };
    }
    case AnalyticsPeriod.PREVIOUS_QUARTER: {
      const quarter = Math.floor(now.getMonth() / 3);
      const start = new Date(now.getFullYear(), quarter * 3 - 3, 1);
      const end = new Date(now.getFullYear(), quarter * 3, 0);
      return {
        startDate: start,
        endDate: end,
      };
    }
    case AnalyticsPeriod.PREVIOUS_YEAR: {
      const start = new Date(now.getFullYear() - 1, 0, 1);
      const end = new Date(now.getFullYear() - 1, 11, 31);
      return {
        startDate: start,
        endDate: end,
      };
    }
    case AnalyticsPeriod.NEXT_7_DAYS: {
      const start = new Date(today);
      start.setDate(start.getDate() + 1);
      const end = new Date(today);
      end.setDate(end.getDate() + 7);
      return {
        startDate: start,
        endDate: end,
      };
    }
    case AnalyticsPeriod.NEXT_30_DAYS: {
      const start = new Date(today);
      start.setDate(start.getDate() + 1);
      const end = new Date(today);
      end.setDate(end.getDate() + 30);
      return {
        startDate: start,
        endDate: end,
      };
    }
    case AnalyticsPeriod.NEXT_90_DAYS: {
      const start = new Date(today);
      start.setDate(start.getDate() + 1);
      const end = new Date(today);
      end.setDate(end.getDate() + 90);
      return {
        startDate: start,
        endDate: end,
      };
    }
    default:
      return {
        startDate: new Date(today),
        endDate: new Date(today),
      };
  }
}

/**
 * Format date range for display
 */
export function formatDateRange(range: DateRange): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const startStr = range.startDate.toLocaleDateString('en-US', options);
  const endStr = range.endDate.toLocaleDateString('en-US', options);

  if (startStr === endStr) {
    return startStr;
  }

  return `${startStr} - ${endStr}`;
}
