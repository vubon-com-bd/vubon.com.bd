/**
 * @fileoverview Analytics aggregation methods and functions definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Analytics aggregation methods
 */
export enum AnalyticsAggregationMethod {
  /** Sum of values */
  SUM = 'SUM',
  /** Average of values */
  AVG = 'AVG',
  /** Count of values */
  COUNT = 'COUNT',
  /** Minimum value */
  MIN = 'MIN',
  /** Maximum value */
  MAX = 'MAX',
  /** Median value */
  MEDIAN = 'MEDIAN',
  /** Mode value (most frequent) */
  MODE = 'MODE',
  /** Percentile value */
  PERCENTILE = 'PERCENTILE',
  /** Standard deviation */
  STD_DEV = 'STD_DEV',
  /** Variance */
  VARIANCE = 'VARIANCE',
  /** Unique count (distinct values) */
  UNIQUE_COUNT = 'UNIQUE_COUNT',
  /** Distinct count (unique values) */
  DISTINCT_COUNT = 'DISTINCT_COUNT',
  /** First value in group */
  FIRST = 'FIRST',
  /** Last value in group */
  LAST = 'LAST',
  /** Sum of distinct values */
  SUM_DISTINCT = 'SUM_DISTINCT',
  /** Average of distinct values */
  AVG_DISTINCT = 'AVG_DISTINCT',
  /** Count of non-null values */
  COUNT_NOT_NULL = 'COUNT_NOT_NULL',
  /** Count of null values */
  COUNT_NULL = 'COUNT_NULL',
  /** Percentage of total */
  PERCENTAGE = 'PERCENTAGE',
  /** Cumulative sum */
  CUMULATIVE_SUM = 'CUMULATIVE_SUM',
  /** Running average */
  RUNNING_AVG = 'RUNNING_AVG',
  /** Weighted average */
  WEIGHTED_AVG = 'WEIGHTED_AVG',
  /** Geometric mean */
  GEOMETRIC_MEAN = 'GEOMETRIC_MEAN',
  /** Harmonic mean */
  HARMONIC_MEAN = 'HARMONIC_MEAN',
  /** Range (max - min) */
  RANGE = 'RANGE',
  /** Interquartile range */
  IQR = 'IQR',
  /** Skewness */
  SKEWNESS = 'SKEWNESS',
  /** Kurtosis */
  KURTOSIS = 'KURTOSIS',
  /** Covariance */
  COVARIANCE = 'COVARIANCE',
  /** Correlation */
  CORRELATION = 'CORRELATION',
  /** Regression slope */
  REGRESSION_SLOPE = 'REGRESSION_SLOPE',
  /** Regression intercept */
  REGRESSION_INTERCEPT = 'REGRESSION_INTERCEPT',
  /** Growth rate */
  GROWTH_RATE = 'GROWTH_RATE',
  /** Compound annual growth rate */
  CAGR = 'CAGR',
}

/**
 * Aggregation category classification
 */
export enum AnalyticsAggregationCategory {
  /** Basic statistical aggregations */
  BASIC = 'BASIC',
  /** Advanced statistical aggregations */
  ADVANCED = 'ADVANCED',
  /** Distribution aggregations */
  DISTRIBUTION = 'DISTRIBUTION',
  /** Unique value aggregations */
  UNIQUE = 'UNIQUE',
  /** Cumulative aggregations */
  CUMULATIVE = 'CUMULATIVE',
  /** Weighted aggregations */
  WEIGHTED = 'WEIGHTED',
  /** Financial aggregations */
  FINANCIAL = 'FINANCIAL',
  /** Statistical aggregations */
  STATISTICAL = 'STATISTICAL',
}

/**
 * Aggregation category mapping
 */
export const ANALYTICS_AGGREGATION_CATEGORY_MAP: Record<
  AnalyticsAggregationMethod,
  AnalyticsAggregationCategory
> = {
  [AnalyticsAggregationMethod.SUM]: AnalyticsAggregationCategory.BASIC,
  [AnalyticsAggregationMethod.AVG]: AnalyticsAggregationCategory.BASIC,
  [AnalyticsAggregationMethod.COUNT]: AnalyticsAggregationCategory.BASIC,
  [AnalyticsAggregationMethod.MIN]: AnalyticsAggregationCategory.BASIC,
  [AnalyticsAggregationMethod.MAX]: AnalyticsAggregationCategory.BASIC,
  [AnalyticsAggregationMethod.MEDIAN]: AnalyticsAggregationCategory.DISTRIBUTION,
  [AnalyticsAggregationMethod.MODE]: AnalyticsAggregationCategory.DISTRIBUTION,
  [AnalyticsAggregationMethod.PERCENTILE]: AnalyticsAggregationCategory.DISTRIBUTION,
  [AnalyticsAggregationMethod.STD_DEV]: AnalyticsAggregationCategory.STATISTICAL,
  [AnalyticsAggregationMethod.VARIANCE]: AnalyticsAggregationCategory.STATISTICAL,
  [AnalyticsAggregationMethod.UNIQUE_COUNT]: AnalyticsAggregationCategory.UNIQUE,
  [AnalyticsAggregationMethod.DISTINCT_COUNT]: AnalyticsAggregationCategory.UNIQUE,
  [AnalyticsAggregationMethod.FIRST]: AnalyticsAggregationCategory.BASIC,
  [AnalyticsAggregationMethod.LAST]: AnalyticsAggregationCategory.BASIC,
  [AnalyticsAggregationMethod.SUM_DISTINCT]: AnalyticsAggregationCategory.UNIQUE,
  [AnalyticsAggregationMethod.AVG_DISTINCT]: AnalyticsAggregationCategory.UNIQUE,
  [AnalyticsAggregationMethod.COUNT_NOT_NULL]: AnalyticsAggregationCategory.BASIC,
  [AnalyticsAggregationMethod.COUNT_NULL]: AnalyticsAggregationCategory.BASIC,
  [AnalyticsAggregationMethod.PERCENTAGE]: AnalyticsAggregationCategory.FINANCIAL,
  [AnalyticsAggregationMethod.CUMULATIVE_SUM]: AnalyticsAggregationCategory.CUMULATIVE,
  [AnalyticsAggregationMethod.RUNNING_AVG]: AnalyticsAggregationCategory.CUMULATIVE,
  [AnalyticsAggregationMethod.WEIGHTED_AVG]: AnalyticsAggregationCategory.WEIGHTED,
  [AnalyticsAggregationMethod.GEOMETRIC_MEAN]: AnalyticsAggregationCategory.ADVANCED,
  [AnalyticsAggregationMethod.HARMONIC_MEAN]: AnalyticsAggregationCategory.ADVANCED,
  [AnalyticsAggregationMethod.RANGE]: AnalyticsAggregationCategory.DISTRIBUTION,
  [AnalyticsAggregationMethod.IQR]: AnalyticsAggregationCategory.DISTRIBUTION,
  [AnalyticsAggregationMethod.SKEWNESS]: AnalyticsAggregationCategory.STATISTICAL,
  [AnalyticsAggregationMethod.KURTOSIS]: AnalyticsAggregationCategory.STATISTICAL,
  [AnalyticsAggregationMethod.COVARIANCE]: AnalyticsAggregationCategory.STATISTICAL,
  [AnalyticsAggregationMethod.CORRELATION]: AnalyticsAggregationCategory.STATISTICAL,
  [AnalyticsAggregationMethod.REGRESSION_SLOPE]: AnalyticsAggregationCategory.ADVANCED,
  [AnalyticsAggregationMethod.REGRESSION_INTERCEPT]: AnalyticsAggregationCategory.ADVANCED,
  [AnalyticsAggregationMethod.GROWTH_RATE]: AnalyticsAggregationCategory.FINANCIAL,
  [AnalyticsAggregationMethod.CAGR]: AnalyticsAggregationCategory.FINANCIAL,
};

/**
 * Data type support for aggregations
 */
export enum AnalyticsAggregationDataType {
  /** Numeric data type */
  NUMERIC = 'NUMERIC',
  /** String data type */
  STRING = 'STRING',
  /** Date data type */
  DATE = 'DATE',
  /** Boolean data type */
  BOOLEAN = 'BOOLEAN',
  /** Any data type */
  ANY = 'ANY',
}

/**
 * Aggregation configuration
 */
export interface AnalyticsAggregationConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  dataTypes: AnalyticsAggregationDataType[];
  requiresSorting: boolean;
  requiresGrouping: boolean;
  priority: number;
}

export const ANALYTICS_AGGREGATION_CONFIG: Record<
  AnalyticsAggregationMethod,
  AnalyticsAggregationConfig
> = {
  [AnalyticsAggregationMethod.SUM]: {
    label: 'Sum',
    description: 'Sum of all values',
    icon: 'Plus',
    color: '#3B82F6',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: false,
    requiresGrouping: false,
    priority: 1,
  },
  [AnalyticsAggregationMethod.AVG]: {
    label: 'Average',
    description: 'Average (mean) of values',
    icon: 'Divide',
    color: '#6366F1',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: false,
    requiresGrouping: false,
    priority: 1,
  },
  [AnalyticsAggregationMethod.COUNT]: {
    label: 'Count',
    description: 'Count of all values',
    icon: 'Hash',
    color: '#8B5CF6',
    dataTypes: [AnalyticsAggregationDataType.ANY],
    requiresSorting: false,
    requiresGrouping: false,
    priority: 1,
  },
  [AnalyticsAggregationMethod.MIN]: {
    label: 'Minimum',
    description: 'Minimum value',
    icon: 'ArrowDown',
    color: '#10B981',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC, AnalyticsAggregationDataType.DATE],
    requiresSorting: true,
    requiresGrouping: false,
    priority: 2,
  },
  [AnalyticsAggregationMethod.MAX]: {
    label: 'Maximum',
    description: 'Maximum value',
    icon: 'ArrowUp',
    color: '#F59E0B',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC, AnalyticsAggregationDataType.DATE],
    requiresSorting: true,
    requiresGrouping: false,
    priority: 2,
  },
  [AnalyticsAggregationMethod.MEDIAN]: {
    label: 'Median',
    description: 'Median (middle) value',
    icon: 'BarChart',
    color: '#F97316',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: true,
    requiresGrouping: false,
    priority: 2,
  },
  [AnalyticsAggregationMethod.MODE]: {
    label: 'Mode',
    description: 'Most frequent value',
    icon: 'BarChart',
    color: '#EF4444',
    dataTypes: [AnalyticsAggregationDataType.ANY],
    requiresSorting: true,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.PERCENTILE]: {
    label: 'Percentile',
    description: 'Value at a specific percentile',
    icon: 'PieChart',
    color: '#EC4899',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: true,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.STD_DEV]: {
    label: 'Standard Deviation',
    description: 'Standard deviation of values',
    icon: 'Sigma',
    color: '#F472B6',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: false,
    requiresGrouping: false,
    priority: 2,
  },
  [AnalyticsAggregationMethod.VARIANCE]: {
    label: 'Variance',
    description: 'Variance of values',
    icon: 'Sigma',
    color: '#FB923C',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: false,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.UNIQUE_COUNT]: {
    label: 'Unique Count',
    description: 'Count of unique values',
    icon: 'List',
    color: '#34D399',
    dataTypes: [AnalyticsAggregationDataType.ANY],
    requiresSorting: true,
    requiresGrouping: false,
    priority: 2,
  },
  [AnalyticsAggregationMethod.DISTINCT_COUNT]: {
    label: 'Distinct Count',
    description: 'Count of distinct values (alias for Unique Count)',
    icon: 'List',
    color: '#60A5FA',
    dataTypes: [AnalyticsAggregationDataType.ANY],
    requiresSorting: true,
    requiresGrouping: false,
    priority: 2,
  },
  [AnalyticsAggregationMethod.FIRST]: {
    label: 'First',
    description: 'First value in the group',
    icon: 'ArrowRight',
    color: '#FCD34D',
    dataTypes: [AnalyticsAggregationDataType.ANY],
    requiresSorting: true,
    requiresGrouping: true,
    priority: 3,
  },
  [AnalyticsAggregationMethod.LAST]: {
    label: 'Last',
    description: 'Last value in the group',
    icon: 'ArrowLeft',
    color: '#FCA5A5',
    dataTypes: [AnalyticsAggregationDataType.ANY],
    requiresSorting: true,
    requiresGrouping: true,
    priority: 3,
  },
  [AnalyticsAggregationMethod.SUM_DISTINCT]: {
    label: 'Sum Distinct',
    description: 'Sum of distinct values',
    icon: 'Plus',
    color: '#D8B4FE',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: true,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.AVG_DISTINCT]: {
    label: 'Average Distinct',
    description: 'Average of distinct values',
    icon: 'Divide',
    color: '#C4B5FD',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: true,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.COUNT_NOT_NULL]: {
    label: 'Count Not Null',
    description: 'Count of non-null values',
    icon: 'Hash',
    color: '#6EE7B7',
    dataTypes: [AnalyticsAggregationDataType.ANY],
    requiresSorting: false,
    requiresGrouping: false,
    priority: 2,
  },
  [AnalyticsAggregationMethod.COUNT_NULL]: {
    label: 'Count Null',
    description: 'Count of null values',
    icon: 'Hash',
    color: '#FCA5A5',
    dataTypes: [AnalyticsAggregationDataType.ANY],
    requiresSorting: false,
    requiresGrouping: false,
    priority: 2,
  },
  [AnalyticsAggregationMethod.PERCENTAGE]: {
    label: 'Percentage',
    description: 'Percentage of total',
    icon: 'Percent',
    color: '#FCD34D',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: false,
    requiresGrouping: true,
    priority: 2,
  },
  [AnalyticsAggregationMethod.CUMULATIVE_SUM]: {
    label: 'Cumulative Sum',
    description: 'Running cumulative sum',
    icon: 'TrendingUp',
    color: '#34D399',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: true,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.RUNNING_AVG]: {
    label: 'Running Average',
    description: 'Running average (moving average)',
    icon: 'TrendingUp',
    color: '#60A5FA',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: true,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.WEIGHTED_AVG]: {
    label: 'Weighted Average',
    description: 'Weighted average of values',
    icon: 'Divide',
    color: '#818CF8',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: false,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.GEOMETRIC_MEAN]: {
    label: 'Geometric Mean',
    description: 'Geometric mean of values',
    icon: 'Divide',
    color: '#34D399',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: false,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.HARMONIC_MEAN]: {
    label: 'Harmonic Mean',
    description: 'Harmonic mean of values',
    icon: 'Divide',
    color: '#FBBF24',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: false,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.RANGE]: {
    label: 'Range',
    description: 'Range (max - min) of values',
    icon: 'BarChart',
    color: '#FB923C',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: true,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.IQR]: {
    label: 'IQR',
    description: 'Interquartile range (Q3 - Q1)',
    icon: 'BarChart',
    color: '#F472B6',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: true,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.SKEWNESS]: {
    label: 'Skewness',
    description: 'Skewness of distribution',
    icon: 'BarChart',
    color: '#818CF8',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: false,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.KURTOSIS]: {
    label: 'Kurtosis',
    description: 'Kurtosis of distribution',
    icon: 'BarChart',
    color: '#A78BFA',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: false,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.COVARIANCE]: {
    label: 'Covariance',
    description: 'Covariance between two variables',
    icon: 'Sigma',
    color: '#34D399',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: false,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.CORRELATION]: {
    label: 'Correlation',
    description: 'Correlation between two variables',
    icon: 'Sigma',
    color: '#60A5FA',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: false,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.REGRESSION_SLOPE]: {
    label: 'Regression Slope',
    description: 'Slope of regression line',
    icon: 'TrendingUp',
    color: '#FCD34D',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: false,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.REGRESSION_INTERCEPT]: {
    label: 'Regression Intercept',
    description: 'Intercept of regression line',
    icon: 'TrendingUp',
    color: '#FCA5A5',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: false,
    requiresGrouping: false,
    priority: 3,
  },
  [AnalyticsAggregationMethod.GROWTH_RATE]: {
    label: 'Growth Rate',
    description: 'Growth rate of values over time',
    icon: 'TrendingUp',
    color: '#34D399',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: true,
    requiresGrouping: false,
    priority: 2,
  },
  [AnalyticsAggregationMethod.CAGR]: {
    label: 'CAGR',
    description: 'Compound Annual Growth Rate',
    icon: 'TrendingUp',
    color: '#60A5FA',
    dataTypes: [AnalyticsAggregationDataType.NUMERIC],
    requiresSorting: true,
    requiresGrouping: false,
    priority: 2,
  },
};

/**
 * Get aggregation category
 */
export function getAggregationCategory(
  method: AnalyticsAggregationMethod
): AnalyticsAggregationCategory {
  return ANALYTICS_AGGREGATION_CATEGORY_MAP[method];
}

/**
 * Get aggregation label
 */
export function getAggregationLabel(method: AnalyticsAggregationMethod): string {
  return ANALYTICS_AGGREGATION_CONFIG[method]?.label || method;
}

/**
 * Get aggregation description
 */
export function getAggregationDescription(method: AnalyticsAggregationMethod): string {
  return ANALYTICS_AGGREGATION_CONFIG[method]?.description || '';
}

/**
 * Get data types supported by aggregation
 */
export function getAggregationDataTypes(
  method: AnalyticsAggregationMethod
): AnalyticsAggregationDataType[] {
  return ANALYTICS_AGGREGATION_CONFIG[method]?.dataTypes || [];
}

/**
 * Check if aggregation requires sorting
 */
export function aggregationRequiresSorting(method: AnalyticsAggregationMethod): boolean {
  return ANALYTICS_AGGREGATION_CONFIG[method]?.requiresSorting || false;
}

/**
 * Check if aggregation requires grouping
 */
export function aggregationRequiresGrouping(method: AnalyticsAggregationMethod): boolean {
  return ANALYTICS_AGGREGATION_CONFIG[method]?.requiresGrouping || false;
}

/**
 * Get aggregations by category
 */
export function getAggregationsByCategory(
  category: AnalyticsAggregationCategory
): AnalyticsAggregationMethod[] {
  return Object.entries(ANALYTICS_AGGREGATION_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([method]) => method as AnalyticsAggregationMethod);
}

/**
 * Get basic aggregations
 */
export function getBasicAggregations(): AnalyticsAggregationMethod[] {
  return getAggregationsByCategory(AnalyticsAggregationCategory.BASIC);
}

/**
 * Get statistical aggregations
 */
export function getStatisticalAggregations(): AnalyticsAggregationMethod[] {
  return getAggregationsByCategory(AnalyticsAggregationCategory.STATISTICAL);
}

/**
 * Get distribution aggregations
 */
export function getDistributionAggregations(): AnalyticsAggregationMethod[] {
  return getAggregationsByCategory(AnalyticsAggregationCategory.DISTRIBUTION);
}

/**
 * Get unique aggregations
 */
export function getUniqueAggregations(): AnalyticsAggregationMethod[] {
  return getAggregationsByCategory(AnalyticsAggregationCategory.UNIQUE);
}

/**
 * Get cumulative aggregations
 */
export function getCumulativeAggregations(): AnalyticsAggregationMethod[] {
  return getAggregationsByCategory(AnalyticsAggregationCategory.CUMULATIVE);
}

/**
 * Get weighted aggregations
 */
export function getWeightedAggregations(): AnalyticsAggregationMethod[] {
  return getAggregationsByCategory(AnalyticsAggregationCategory.WEIGHTED);
}

/**
 * Get financial aggregations
 */
export function getFinancialAggregations(): AnalyticsAggregationMethod[] {
  return getAggregationsByCategory(AnalyticsAggregationCategory.FINANCIAL);
}

/**
 * Check if aggregation supports data type
 */
export function aggregationSupportsDataType(
  method: AnalyticsAggregationMethod,
  dataType: AnalyticsAggregationDataType
): boolean {
  const supportedTypes = getAggregationDataTypes(method);
  return (
    supportedTypes.includes(dataType) || supportedTypes.includes(AnalyticsAggregationDataType.ANY)
  );
}

/**
 * Get default aggregations for numeric data
 */
export function getDefaultNumericAggregations(): AnalyticsAggregationMethod[] {
  return [
    AnalyticsAggregationMethod.SUM,
    AnalyticsAggregationMethod.AVG,
    AnalyticsAggregationMethod.COUNT,
    AnalyticsAggregationMethod.MIN,
    AnalyticsAggregationMethod.MAX,
    AnalyticsAggregationMethod.MEDIAN,
    AnalyticsAggregationMethod.STD_DEV,
  ];
}

/**
 * Get default aggregations for string data
 */
export function getDefaultStringAggregations(): AnalyticsAggregationMethod[] {
  return [
    AnalyticsAggregationMethod.COUNT,
    AnalyticsAggregationMethod.UNIQUE_COUNT,
    AnalyticsAggregationMethod.FIRST,
    AnalyticsAggregationMethod.LAST,
  ];
}

/**
 * Get default aggregations for date data
 */
export function getDefaultDateAggregations(): AnalyticsAggregationMethod[] {
  return [
    AnalyticsAggregationMethod.COUNT,
    AnalyticsAggregationMethod.MIN,
    AnalyticsAggregationMethod.MAX,
    AnalyticsAggregationMethod.FIRST,
    AnalyticsAggregationMethod.LAST,
  ];
}

/**
 * Aggregation result interface
 */
export interface AggregationResult {
  method: AnalyticsAggregationMethod;
  value: number | string | Date | null;
  label: string;
  formattedValue: string;
}

/**
 * Format aggregation value
 */
export function formatAggregationValue(
  value: number | string | Date | null,
  method: AnalyticsAggregationMethod
): string {
  if (value === null || value === undefined) {
    return 'N/A';
  }

  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  if (typeof value === 'number') {
    // Check if it's a financial metric
    if (
      method === AnalyticsAggregationMethod.SUM ||
      method === AnalyticsAggregationMethod.CUMULATIVE_SUM ||
      method === AnalyticsAggregationMethod.GROWTH_RATE ||
      method === AnalyticsAggregationMethod.CAGR
    ) {
      return value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    if (method === AnalyticsAggregationMethod.PERCENTAGE) {
      return `${(value * 100).toFixed(2)}%`;
    }
    if (
      method === AnalyticsAggregationMethod.STD_DEV ||
      method === AnalyticsAggregationMethod.VARIANCE
    ) {
      return value.toFixed(4);
    }
    return value.toLocaleString();
  }

  return String(value);
}
