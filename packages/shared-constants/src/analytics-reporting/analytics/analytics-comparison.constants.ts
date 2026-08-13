/**
 * @fileoverview Analytics comparison methods and techniques definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Analytics comparison methods
 */
export enum AnalyticsComparisonMethod {
  /** Period over period comparison */
  PERIOD_OVER_PERIOD = 'PERIOD_OVER_PERIOD',
  /** Year over year comparison */
  YEAR_OVER_YEAR = 'YEAR_OVER_YEAR',
  /** Month over month comparison */
  MONTH_OVER_MONTH = 'MONTH_OVER_MONTH',
  /** Week over week comparison */
  WEEK_OVER_WEEK = 'WEEK_OVER_WEEK',
  /** Day over day comparison */
  DAY_OVER_DAY = 'DAY_OVER_DAY',
  /** Custom comparison */
  CUSTOM_COMPARISON = 'CUSTOM_COMPARISON',
  /** Target comparison */
  TARGET_COMPARISON = 'TARGET_COMPARISON',
  /** Benchmark comparison */
  BENCHMARK_COMPARISON = 'BENCHMARK_COMPARISON',
  /** Quarter over quarter comparison */
  QUARTER_OVER_QUARTER = 'QUARTER_OVER_QUARTER',
  /** Hour over hour comparison */
  HOUR_OVER_HOUR = 'HOUR_OVER_HOUR',
  /** Sequential comparison */
  SEQUENTIAL_COMPARISON = 'SEQUENTIAL_COMPARISON',
  /** Rolling comparison */
  ROLLING_COMPARISON = 'ROLLING_COMPARISON',
  /** Moving average comparison */
  MOVING_AVERAGE_COMPARISON = 'MOVING_AVERAGE_COMPARISON',
  /** Year to date comparison */
  YTD_COMPARISON = 'YTD_COMPARISON',
  /** Quarter to date comparison */
  QTD_COMPARISON = 'QTD_COMPARISON',
  /** Month to date comparison */
  MTD_COMPARISON = 'MTD_COMPARISON',
  /** Week to date comparison */
  WTD_COMPARISON = 'WTD_COMPARISON',
  /** Same period last year */
  SAME_PERIOD_LAST_YEAR = 'SAME_PERIOD_LAST_YEAR',
  /** Previous period comparison */
  PREVIOUS_PERIOD = 'PREVIOUS_PERIOD',
  /** Next period comparison */
  NEXT_PERIOD = 'NEXT_PERIOD',
  /** Trend comparison */
  TREND_COMPARISON = 'TREND_COMPARISON',
  /** Cohort comparison */
  COHORT_COMPARISON = 'COHORT_COMPARISON',
  /** Segment comparison */
  SEGMENT_COMPARISON = 'SEGMENT_COMPARISON',
}

/**
 * Comparison category classification
 */
export enum AnalyticsComparisonCategory {
  /** Time-based comparisons */
  TIME = 'TIME',
  /** Target-based comparisons */
  TARGET = 'TARGET',
  /** Benchmark-based comparisons */
  BENCHMARK = 'BENCHMARK',
  /** Rolling comparisons */
  ROLLING = 'ROLLING',
  /** Sequential comparisons */
  SEQUENTIAL = 'SEQUENTIAL',
  /** Custom comparisons */
  CUSTOM = 'CUSTOM',
  /** Trend comparisons */
  TREND = 'TREND',
  /** Cohort comparisons */
  COHORT = 'COHORT',
  /** Segment comparisons */
  SEGMENT = 'SEGMENT',
}

/**
 * Comparison category mapping
 */
export const ANALYTICS_COMPARISON_CATEGORY_MAP: Record<
  AnalyticsComparisonMethod,
  AnalyticsComparisonCategory
> = {
  [AnalyticsComparisonMethod.PERIOD_OVER_PERIOD]: AnalyticsComparisonCategory.TIME,
  [AnalyticsComparisonMethod.YEAR_OVER_YEAR]: AnalyticsComparisonCategory.TIME,
  [AnalyticsComparisonMethod.MONTH_OVER_MONTH]: AnalyticsComparisonCategory.TIME,
  [AnalyticsComparisonMethod.WEEK_OVER_WEEK]: AnalyticsComparisonCategory.TIME,
  [AnalyticsComparisonMethod.DAY_OVER_DAY]: AnalyticsComparisonCategory.TIME,
  [AnalyticsComparisonMethod.CUSTOM_COMPARISON]: AnalyticsComparisonCategory.CUSTOM,
  [AnalyticsComparisonMethod.TARGET_COMPARISON]: AnalyticsComparisonCategory.TARGET,
  [AnalyticsComparisonMethod.BENCHMARK_COMPARISON]: AnalyticsComparisonCategory.BENCHMARK,
  [AnalyticsComparisonMethod.QUARTER_OVER_QUARTER]: AnalyticsComparisonCategory.TIME,
  [AnalyticsComparisonMethod.HOUR_OVER_HOUR]: AnalyticsComparisonCategory.TIME,
  [AnalyticsComparisonMethod.SEQUENTIAL_COMPARISON]: AnalyticsComparisonCategory.SEQUENTIAL,
  [AnalyticsComparisonMethod.ROLLING_COMPARISON]: AnalyticsComparisonCategory.ROLLING,
  [AnalyticsComparisonMethod.MOVING_AVERAGE_COMPARISON]: AnalyticsComparisonCategory.ROLLING,
  [AnalyticsComparisonMethod.YTD_COMPARISON]: AnalyticsComparisonCategory.TIME,
  [AnalyticsComparisonMethod.QTD_COMPARISON]: AnalyticsComparisonCategory.TIME,
  [AnalyticsComparisonMethod.MTD_COMPARISON]: AnalyticsComparisonCategory.TIME,
  [AnalyticsComparisonMethod.WTD_COMPARISON]: AnalyticsComparisonCategory.TIME,
  [AnalyticsComparisonMethod.SAME_PERIOD_LAST_YEAR]: AnalyticsComparisonCategory.TIME,
  [AnalyticsComparisonMethod.PREVIOUS_PERIOD]: AnalyticsComparisonCategory.TIME,
  [AnalyticsComparisonMethod.NEXT_PERIOD]: AnalyticsComparisonCategory.TIME,
  [AnalyticsComparisonMethod.TREND_COMPARISON]: AnalyticsComparisonCategory.TREND,
  [AnalyticsComparisonMethod.COHORT_COMPARISON]: AnalyticsComparisonCategory.COHORT,
  [AnalyticsComparisonMethod.SEGMENT_COMPARISON]: AnalyticsComparisonCategory.SEGMENT,
};

/**
 * Comparison configuration
 */
export interface AnalyticsComparisonConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  requiresBasePeriod: boolean;
  requiresTargetPeriod: boolean;
  offsetUnit?: 'day' | 'week' | 'month' | 'quarter' | 'year' | 'hour';
  offsetValue?: number;
  priority: number;
}

export const ANALYTICS_COMPARISON_CONFIG: Record<
  AnalyticsComparisonMethod,
  AnalyticsComparisonConfig
> = {
  [AnalyticsComparisonMethod.PERIOD_OVER_PERIOD]: {
    label: 'Period Over Period',
    description: 'Compare current period with previous period',
    icon: 'Repeat',
    color: '#3B82F6',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    priority: 1,
  },
  [AnalyticsComparisonMethod.YEAR_OVER_YEAR]: {
    label: 'Year Over Year',
    description: 'Compare current period with same period last year',
    icon: 'Calendar',
    color: '#6366F1',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    offsetUnit: 'year',
    offsetValue: 1,
    priority: 1,
  },
  [AnalyticsComparisonMethod.MONTH_OVER_MONTH]: {
    label: 'Month Over Month',
    description: 'Compare current month with previous month',
    icon: 'Calendar',
    color: '#8B5CF6',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    offsetUnit: 'month',
    offsetValue: 1,
    priority: 2,
  },
  [AnalyticsComparisonMethod.WEEK_OVER_WEEK]: {
    label: 'Week Over Week',
    description: 'Compare current week with previous week',
    icon: 'Calendar',
    color: '#10B981',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    offsetUnit: 'week',
    offsetValue: 1,
    priority: 2,
  },
  [AnalyticsComparisonMethod.DAY_OVER_DAY]: {
    label: 'Day Over Day',
    description: 'Compare current day with previous day',
    icon: 'Calendar',
    color: '#F59E0B',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    offsetUnit: 'day',
    offsetValue: 1,
    priority: 2,
  },
  [AnalyticsComparisonMethod.CUSTOM_COMPARISON]: {
    label: 'Custom Comparison',
    description: 'Compare with custom date range',
    icon: 'Settings',
    color: '#6B7280',
    requiresBasePeriod: true,
    requiresTargetPeriod: true,
    priority: 4,
  },
  [AnalyticsComparisonMethod.TARGET_COMPARISON]: {
    label: 'Target Comparison',
    description: 'Compare actual performance against target',
    icon: 'Target',
    color: '#EF4444',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    priority: 1,
  },
  [AnalyticsComparisonMethod.BENCHMARK_COMPARISON]: {
    label: 'Benchmark Comparison',
    description: 'Compare against industry benchmark',
    icon: 'Trophy',
    color: '#F59E0B',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    priority: 2,
  },
  [AnalyticsComparisonMethod.QUARTER_OVER_QUARTER]: {
    label: 'Quarter Over Quarter',
    description: 'Compare current quarter with previous quarter',
    icon: 'Calendar',
    color: '#F97316',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    offsetUnit: 'quarter',
    offsetValue: 1,
    priority: 2,
  },
  [AnalyticsComparisonMethod.HOUR_OVER_HOUR]: {
    label: 'Hour Over Hour',
    description: 'Compare current hour with previous hour',
    icon: 'Clock',
    color: '#EC4899',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    offsetUnit: 'hour',
    offsetValue: 1,
    priority: 3,
  },
  [AnalyticsComparisonMethod.SEQUENTIAL_COMPARISON]: {
    label: 'Sequential Comparison',
    description: 'Compare sequential periods',
    icon: 'ArrowRight',
    color: '#8B5CF6',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    priority: 2,
  },
  [AnalyticsComparisonMethod.ROLLING_COMPARISON]: {
    label: 'Rolling Comparison',
    description: 'Compare using rolling window periods',
    icon: 'Repeat',
    color: '#10B981',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    priority: 2,
  },
  [AnalyticsComparisonMethod.MOVING_AVERAGE_COMPARISON]: {
    label: 'Moving Average Comparison',
    description: 'Compare with moving average',
    icon: 'TrendingUp',
    color: '#3B82F6',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    priority: 3,
  },
  [AnalyticsComparisonMethod.YTD_COMPARISON]: {
    label: 'Year to Date Comparison',
    description: 'Compare year to date with previous year',
    icon: 'Calendar',
    color: '#34D399',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    priority: 2,
  },
  [AnalyticsComparisonMethod.QTD_COMPARISON]: {
    label: 'Quarter to Date Comparison',
    description: 'Compare quarter to date with previous quarter',
    icon: 'Calendar',
    color: '#60A5FA',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    priority: 2,
  },
  [AnalyticsComparisonMethod.MTD_COMPARISON]: {
    label: 'Month to Date Comparison',
    description: 'Compare month to date with previous month',
    icon: 'Calendar',
    color: '#FCD34D',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    priority: 2,
  },
  [AnalyticsComparisonMethod.WTD_COMPARISON]: {
    label: 'Week to Date Comparison',
    description: 'Compare week to date with previous week',
    icon: 'Calendar',
    color: '#FCA5A5',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    priority: 2,
  },
  [AnalyticsComparisonMethod.SAME_PERIOD_LAST_YEAR]: {
    label: 'Same Period Last Year',
    description: 'Compare with same period in previous year',
    icon: 'Calendar',
    color: '#D8B4FE',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    offsetUnit: 'year',
    offsetValue: 1,
    priority: 2,
  },
  [AnalyticsComparisonMethod.PREVIOUS_PERIOD]: {
    label: 'Previous Period',
    description: 'Compare with previous period',
    icon: 'ArrowLeft',
    color: '#C4B5FD',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    priority: 2,
  },
  [AnalyticsComparisonMethod.NEXT_PERIOD]: {
    label: 'Next Period',
    description: 'Compare with next period',
    icon: 'ArrowRight',
    color: '#6EE7B7',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    priority: 3,
  },
  [AnalyticsComparisonMethod.TREND_COMPARISON]: {
    label: 'Trend Comparison',
    description: 'Compare trends over time',
    icon: 'TrendingUp',
    color: '#F472B6',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    priority: 2,
  },
  [AnalyticsComparisonMethod.COHORT_COMPARISON]: {
    label: 'Cohort Comparison',
    description: 'Compare across cohorts',
    icon: 'Users',
    color: '#818CF8',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    priority: 2,
  },
  [AnalyticsComparisonMethod.SEGMENT_COMPARISON]: {
    label: 'Segment Comparison',
    description: 'Compare across segments',
    icon: 'PieChart',
    color: '#A78BFA',
    requiresBasePeriod: true,
    requiresTargetPeriod: false,
    priority: 2,
  },
};

/**
 * Comparison result interface
 */
export interface ComparisonResult {
  method: AnalyticsComparisonMethod;
  baseValue: number;
  compareValue: number;
  absoluteDifference: number;
  percentageDifference: number;
  isPositive: boolean;
  label: string;
  formattedBase: string;
  formattedCompare: string;
  formattedDifference: string;
}

/**
 * Comparison target interface
 */
export interface ComparisonTarget {
  targetValue: number;
  description: string;
  unit?: string;
  isReached: boolean;
  variance: number;
  percentageVariance: number;
}

/**
 * Comparison benchmark interface
 */
export interface ComparisonBenchmark {
  benchmarkValue: number;
  benchmarkLabel: string;
  description: string;
  variance: number;
  percentageVariance: number;
  isAboveBenchmark: boolean;
}

/**
 * Get comparison category
 */
export function getComparisonCategory(
  method: AnalyticsComparisonMethod
): AnalyticsComparisonCategory {
  return ANALYTICS_COMPARISON_CATEGORY_MAP[method];
}

/**
 * Get comparison label
 */
export function getComparisonLabel(method: AnalyticsComparisonMethod): string {
  return ANALYTICS_COMPARISON_CONFIG[method]?.label || method;
}

/**
 * Get comparison description
 */
export function getComparisonDescription(method: AnalyticsComparisonMethod): string {
  return ANALYTICS_COMPARISON_CONFIG[method]?.description || '';
}

/**
 * Check if comparison requires base period
 */
export function comparisonRequiresBasePeriod(method: AnalyticsComparisonMethod): boolean {
  return ANALYTICS_COMPARISON_CONFIG[method]?.requiresBasePeriod || false;
}

/**
 * Check if comparison requires target period
 */
export function comparisonRequiresTargetPeriod(method: AnalyticsComparisonMethod): boolean {
  return ANALYTICS_COMPARISON_CONFIG[method]?.requiresTargetPeriod || false;
}

/**
 * Get comparisons by category
 */
export function getComparisonsByCategory(
  category: AnalyticsComparisonCategory
): AnalyticsComparisonMethod[] {
  return Object.entries(ANALYTICS_COMPARISON_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([method]) => method as AnalyticsComparisonMethod);
}

/**
 * Get time-based comparisons
 */
export function getTimeComparisons(): AnalyticsComparisonMethod[] {
  return getComparisonsByCategory(AnalyticsComparisonCategory.TIME);
}

/**
 * Get target-based comparisons
 */
export function getTargetComparisons(): AnalyticsComparisonMethod[] {
  return getComparisonsByCategory(AnalyticsComparisonCategory.TARGET);
}

/**
 * Get benchmark-based comparisons
 */
export function getBenchmarkComparisons(): AnalyticsComparisonMethod[] {
  return getComparisonsByCategory(AnalyticsComparisonCategory.BENCHMARK);
}

/**
 * Get rolling comparisons
 */
export function getRollingComparisons(): AnalyticsComparisonMethod[] {
  return getComparisonsByCategory(AnalyticsComparisonCategory.ROLLING);
}

/**
 * Get sequential comparisons
 */
export function getSequentialComparisons(): AnalyticsComparisonMethod[] {
  return getComparisonsByCategory(AnalyticsComparisonCategory.SEQUENTIAL);
}

/**
 * Get default comparisons for dashboard
 */
export function getDefaultDashboardComparisons(): AnalyticsComparisonMethod[] {
  return [
    AnalyticsComparisonMethod.PERIOD_OVER_PERIOD,
    AnalyticsComparisonMethod.YEAR_OVER_YEAR,
    AnalyticsComparisonMethod.MONTH_OVER_MONTH,
    AnalyticsComparisonMethod.TARGET_COMPARISON,
    AnalyticsComparisonMethod.BENCHMARK_COMPARISON,
  ];
}

/**
 * Compare two values
 */
export function compareValues(
  baseValue: number,
  compareValue: number
): Omit<
  ComparisonResult,
  'method' | 'label' | 'formattedBase' | 'formattedCompare' | 'formattedDifference'
> {
  const absoluteDifference = compareValue - baseValue;
  const percentageDifference =
    baseValue !== 0 ? (absoluteDifference / Math.abs(baseValue)) * 100 : 0;
  const isPositive = absoluteDifference > 0;

  return {
    baseValue,
    compareValue,
    absoluteDifference,
    percentageDifference,
    isPositive,
  };
}

/**
 * Create comparison result
 */
export function createComparisonResult(
  method: AnalyticsComparisonMethod,
  baseValue: number,
  compareValue: number,
  valueFormatter?: (value: number) => string
): ComparisonResult {
  const comparison = compareValues(baseValue, compareValue);
  const defaultFormatter = (value: number) =>
    value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const formatter = valueFormatter || defaultFormatter;

  return {
    method,
    ...comparison,
    label: getComparisonLabel(method),
    formattedBase: formatter(baseValue),
    formattedCompare: formatter(compareValue),
    formattedDifference: formatter(comparison.absoluteDifference),
  };
}

/**
 * Check if target is reached
 */
export function checkTargetReached(actualValue: number, targetValue: number): ComparisonTarget {
  const variance = actualValue - targetValue;
  const percentageVariance = targetValue !== 0 ? (variance / Math.abs(targetValue)) * 100 : 0;
  const isReached = actualValue >= targetValue;

  return {
    targetValue,
    description: `Target value: ${targetValue}`,
    isReached,
    variance,
    percentageVariance,
  };
}

/**
 * Compare against benchmark
 */
export function compareAgainstBenchmark(
  actualValue: number,
  benchmarkValue: number,
  benchmarkLabel: string = 'Benchmark'
): ComparisonBenchmark {
  const variance = actualValue - benchmarkValue;
  const percentageVariance = benchmarkValue !== 0 ? (variance / Math.abs(benchmarkValue)) * 100 : 0;
  const isAboveBenchmark = actualValue >= benchmarkValue;

  return {
    benchmarkValue,
    benchmarkLabel,
    description: `Comparing against ${benchmarkLabel}`,
    variance,
    percentageVariance,
    isAboveBenchmark,
  };
}

/**
 * Get offset for comparison method
 */
export function getComparisonOffset(
  method: AnalyticsComparisonMethod
): { unit: 'day' | 'week' | 'month' | 'quarter' | 'year' | 'hour'; value: number } | null {
  const config = ANALYTICS_COMPARISON_CONFIG[method];
  if (config.offsetUnit && config.offsetValue) {
    return {
      unit: config.offsetUnit,
      value: config.offsetValue,
    };
  }
  return null;
}

/**
 * Recommended comparison methods for time periods
 */
export function getRecommendedComparison(days: number): AnalyticsComparisonMethod {
  if (days <= 1) {
    return AnalyticsComparisonMethod.HOUR_OVER_HOUR;
  }
  if (days <= 7) {
    return AnalyticsComparisonMethod.DAY_OVER_DAY;
  }
  if (days <= 30) {
    return AnalyticsComparisonMethod.WEEK_OVER_WEEK;
  }
  if (days <= 90) {
    return AnalyticsComparisonMethod.MONTH_OVER_MONTH;
  }
  if (days <= 365) {
    return AnalyticsComparisonMethod.QUARTER_OVER_QUARTER;
  }
  return AnalyticsComparisonMethod.YEAR_OVER_YEAR;
}
