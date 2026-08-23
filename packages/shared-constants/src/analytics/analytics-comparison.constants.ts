/**
 * Analytics Comparison Constants
 * Comparison methods for analytics data analysis
 */

export const ANALYTICS_COMPARISON = {
  // Comparison Types
  TYPES: {
    // Period Comparisons
    PERIOD_OVER_PERIOD: 'period_over_period',
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    WEEK_OVER_WEEK: 'week_over_week',
    DAY_OVER_DAY: 'day_over_day',

    // Benchmark Comparisons
    BENCHMARK: 'benchmark',
    TARGET: 'target',
    GOAL: 'goal',
    AVERAGE: 'average',
    MEDIAN: 'median',
    TOP_QUARTILE: 'top_quartile',
    BOTTOM_QUARTILE: 'bottom_quartile',

    // Segment Comparisons
    SEGMENT: 'segment',
    COHORT: 'cohort',
    GROUP: 'group',
    CATEGORY: 'category',

    // Trend Comparisons
    TREND: 'trend',
    CHANGE: 'change',
    DIFFERENCE: 'difference',
    PERCENT_CHANGE: 'percent_change',

    // Custom Comparisons
    CUSTOM: 'custom',
    NONE: 'none',
  } as const,

  // Comparison Methods
  METHODS: {
    ABSOLUTE: 'absolute',
    PERCENTAGE: 'percentage',
    RELATIVE: 'relative',
    RATIO: 'ratio',
    INDEX: 'index',
  } as const,

  // Comparison Directions
  DIRECTIONS: {
    INCREASE: 'increase',
    DECREASE: 'decrease',
    SAME: 'same',
    NEGATIVE: 'negative',
    POSITIVE: 'positive',
    NEUTRAL: 'neutral',
  } as const,

  // Comparison Significance
  SIGNIFICANCE: {
    VERY_HIGH: 'very_high',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    NEGLIGIBLE: 'negligible',
  } as const,

  // Comparison Units
  UNITS: {
    ABSOLUTE: 'absolute',
    PERCENTAGE: 'percentage',
    POINTS: 'points',
    BASIS_POINTS: 'basis_points',
    RATIO: 'ratio',
  } as const,
} as const;

// Analytics Comparison Types
export type AnalyticsComparisonType =
  (typeof ANALYTICS_COMPARISON.TYPES)[keyof typeof ANALYTICS_COMPARISON.TYPES];

// Analytics Comparison Methods
export type AnalyticsComparisonMethod =
  (typeof ANALYTICS_COMPARISON.METHODS)[keyof typeof ANALYTICS_COMPARISON.METHODS];

// Analytics Comparison Directions
export type AnalyticsComparisonDirection =
  (typeof ANALYTICS_COMPARISON.DIRECTIONS)[keyof typeof ANALYTICS_COMPARISON.DIRECTIONS];

// Analytics Comparison Significance
export type AnalyticsComparisonSignificance =
  (typeof ANALYTICS_COMPARISON.SIGNIFICANCE)[keyof typeof ANALYTICS_COMPARISON.SIGNIFICANCE];

// Analytics Comparison Units
export type AnalyticsComparisonUnit =
  (typeof ANALYTICS_COMPARISON.UNITS)[keyof typeof ANALYTICS_COMPARISON.UNITS];

// Analytics Comparison Labels
export function getAnalyticsComparisonLabel(comparison: AnalyticsComparisonType): string {
  const labels: Record<AnalyticsComparisonType, string> = {
    [ANALYTICS_COMPARISON.TYPES.PERIOD_OVER_PERIOD]: 'Period Over Period',
    [ANALYTICS_COMPARISON.TYPES.YEAR_OVER_YEAR]: 'Year Over Year',
    [ANALYTICS_COMPARISON.TYPES.QUARTER_OVER_QUARTER]: 'Quarter Over Quarter',
    [ANALYTICS_COMPARISON.TYPES.MONTH_OVER_MONTH]: 'Month Over Month',
    [ANALYTICS_COMPARISON.TYPES.WEEK_OVER_WEEK]: 'Week Over Week',
    [ANALYTICS_COMPARISON.TYPES.DAY_OVER_DAY]: 'Day Over Day',
    [ANALYTICS_COMPARISON.TYPES.BENCHMARK]: 'Benchmark',
    [ANALYTICS_COMPARISON.TYPES.TARGET]: 'Target',
    [ANALYTICS_COMPARISON.TYPES.GOAL]: 'Goal',
    [ANALYTICS_COMPARISON.TYPES.AVERAGE]: 'Average',
    [ANALYTICS_COMPARISON.TYPES.MEDIAN]: 'Median',
    [ANALYTICS_COMPARISON.TYPES.TOP_QUARTILE]: 'Top Quartile',
    [ANALYTICS_COMPARISON.TYPES.BOTTOM_QUARTILE]: 'Bottom Quartile',
    [ANALYTICS_COMPARISON.TYPES.SEGMENT]: 'Segment',
    [ANALYTICS_COMPARISON.TYPES.COHORT]: 'Cohort',
    [ANALYTICS_COMPARISON.TYPES.GROUP]: 'Group',
    [ANALYTICS_COMPARISON.TYPES.CATEGORY]: 'Category',
    [ANALYTICS_COMPARISON.TYPES.TREND]: 'Trend',
    [ANALYTICS_COMPARISON.TYPES.CHANGE]: 'Change',
    [ANALYTICS_COMPARISON.TYPES.DIFFERENCE]: 'Difference',
    [ANALYTICS_COMPARISON.TYPES.PERCENT_CHANGE]: 'Percent Change',
    [ANALYTICS_COMPARISON.TYPES.CUSTOM]: 'Custom',
    [ANALYTICS_COMPARISON.TYPES.NONE]: 'None',
  };
  return labels[comparison] || 'Unknown';
}

// Analytics Comparison Method Labels
export function getAnalyticsComparisonMethodLabel(method: AnalyticsComparisonMethod): string {
  const labels: Record<AnalyticsComparisonMethod, string> = {
    [ANALYTICS_COMPARISON.METHODS.ABSOLUTE]: 'Absolute',
    [ANALYTICS_COMPARISON.METHODS.PERCENTAGE]: 'Percentage',
    [ANALYTICS_COMPARISON.METHODS.RELATIVE]: 'Relative',
    [ANALYTICS_COMPARISON.METHODS.RATIO]: 'Ratio',
    [ANALYTICS_COMPARISON.METHODS.INDEX]: 'Index',
  };
  return labels[method] || 'Unknown';
}

// Analytics Comparison Direction Labels
export function getAnalyticsComparisonDirectionLabel(
  direction: AnalyticsComparisonDirection
): string {
  const labels: Record<AnalyticsComparisonDirection, string> = {
    [ANALYTICS_COMPARISON.DIRECTIONS.INCREASE]: 'Increase',
    [ANALYTICS_COMPARISON.DIRECTIONS.DECREASE]: 'Decrease',
    [ANALYTICS_COMPARISON.DIRECTIONS.SAME]: 'Same',
    [ANALYTICS_COMPARISON.DIRECTIONS.NEGATIVE]: 'Negative',
    [ANALYTICS_COMPARISON.DIRECTIONS.POSITIVE]: 'Positive',
    [ANALYTICS_COMPARISON.DIRECTIONS.NEUTRAL]: 'Neutral',
  };
  return labels[direction] || 'Unknown';
}

// Analytics Comparison Significance Labels
export function getAnalyticsComparisonSignificanceLabel(
  significance: AnalyticsComparisonSignificance
): string {
  const labels: Record<AnalyticsComparisonSignificance, string> = {
    [ANALYTICS_COMPARISON.SIGNIFICANCE.VERY_HIGH]: 'Very High',
    [ANALYTICS_COMPARISON.SIGNIFICANCE.HIGH]: 'High',
    [ANALYTICS_COMPARISON.SIGNIFICANCE.MEDIUM]: 'Medium',
    [ANALYTICS_COMPARISON.SIGNIFICANCE.LOW]: 'Low',
    [ANALYTICS_COMPARISON.SIGNIFICANCE.NEGLIGIBLE]: 'Negligible',
  };
  return labels[significance] || 'Unknown';
}

// Analytics Comparison Unit Labels
export function getAnalyticsComparisonUnitLabel(unit: AnalyticsComparisonUnit): string {
  const labels: Record<AnalyticsComparisonUnit, string> = {
    [ANALYTICS_COMPARISON.UNITS.ABSOLUTE]: 'Absolute',
    [ANALYTICS_COMPARISON.UNITS.PERCENTAGE]: 'Percentage',
    [ANALYTICS_COMPARISON.UNITS.POINTS]: 'Points',
    [ANALYTICS_COMPARISON.UNITS.BASIS_POINTS]: 'Basis Points',
    [ANALYTICS_COMPARISON.UNITS.RATIO]: 'Ratio',
  };
  return labels[unit] || 'Unknown';
}

// Check if comparison is period-based
export function isAnalyticsComparisonPeriodBased(comparison: AnalyticsComparisonType): boolean {
  const periodBased: AnalyticsComparisonType[] = [
    ANALYTICS_COMPARISON.TYPES.PERIOD_OVER_PERIOD,
    ANALYTICS_COMPARISON.TYPES.YEAR_OVER_YEAR,
    ANALYTICS_COMPARISON.TYPES.QUARTER_OVER_QUARTER,
    ANALYTICS_COMPARISON.TYPES.MONTH_OVER_MONTH,
    ANALYTICS_COMPARISON.TYPES.WEEK_OVER_WEEK,
    ANALYTICS_COMPARISON.TYPES.DAY_OVER_DAY,
  ];
  return periodBased.includes(comparison);
}

// Check if comparison is benchmark-based
export function isAnalyticsComparisonBenchmarkBased(comparison: AnalyticsComparisonType): boolean {
  const benchmarkBased: AnalyticsComparisonType[] = [
    ANALYTICS_COMPARISON.TYPES.BENCHMARK,
    ANALYTICS_COMPARISON.TYPES.TARGET,
    ANALYTICS_COMPARISON.TYPES.GOAL,
    ANALYTICS_COMPARISON.TYPES.AVERAGE,
    ANALYTICS_COMPARISON.TYPES.MEDIAN,
    ANALYTICS_COMPARISON.TYPES.TOP_QUARTILE,
    ANALYTICS_COMPARISON.TYPES.BOTTOM_QUARTILE,
  ];
  return benchmarkBased.includes(comparison);
}

// Get comparison direction from numeric change
export function getAnalyticsComparisonDirection(change: number): AnalyticsComparisonDirection {
  if (change > 0) return ANALYTICS_COMPARISON.DIRECTIONS.INCREASE;
  if (change < 0) return ANALYTICS_COMPARISON.DIRECTIONS.DECREASE;
  return ANALYTICS_COMPARISON.DIRECTIONS.SAME;
}

// Get comparison significance from p-value
export function getAnalyticsComparisonSignificance(
  pValue: number
): AnalyticsComparisonSignificance {
  if (pValue < 0.001) return ANALYTICS_COMPARISON.SIGNIFICANCE.VERY_HIGH;
  if (pValue < 0.01) return ANALYTICS_COMPARISON.SIGNIFICANCE.HIGH;
  if (pValue < 0.05) return ANALYTICS_COMPARISON.SIGNIFICANCE.MEDIUM;
  if (pValue < 0.1) return ANALYTICS_COMPARISON.SIGNIFICANCE.LOW;
  return ANALYTICS_COMPARISON.SIGNIFICANCE.NEGLIGIBLE;
}
