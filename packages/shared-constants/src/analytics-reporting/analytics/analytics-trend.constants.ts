/**
 * @fileoverview Analytics trend analysis methods and patterns definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Trend directions
 */
export enum AnalyticsTrendDirection {
  /** Upward trend - values increasing over time */
  UPWARD = 'UPWARD',
  /** Downward trend - values decreasing over time */
  DOWNWARD = 'DOWNWARD',
  /** Stable trend - values remain relatively constant */
  STABLE = 'STABLE',
  /** Volatile trend - values fluctuate significantly */
  VOLATILE = 'VOLATILE',
  /** Seasonal trend - patterns repeat at regular intervals */
  SEASONAL = 'SEASONAL',
  /** Cyclical trend - patterns repeat over longer periods */
  CYCLICAL = 'CYCLICAL',
  /** Linear trend - constant rate of change */
  LINEAR = 'LINEAR',
  /** Exponential trend - accelerating rate of change */
  EXPONENTIAL = 'EXPONENTIAL',
  /** Decaying trend - diminishing rate of change */
  DECAYING = 'DECAYING',
  /** S-curve trend - logistic growth pattern */
  S_CURVE = 'S_CURVE',
  /** Plateau trend - growth stabilizes after initial growth */
  PLATEAU = 'PLATEAU',
  /** Irregular trend - no discernible pattern */
  IRREGULAR = 'IRREGULAR',
  /** Bipolar trend - alternating between two states */
  BIPOLAR = 'BIPOLAR',
  /** Step trend - sudden changes at specific points */
  STEP = 'STEP',
  /** Ramp trend - gradual linear increase */
  RAMP = 'RAMP',
  /** Pulse trend - temporary spikes followed by return */
  PULSE = 'PULSE',
  /** Fading trend - pattern diminishes over time */
  FADING = 'FADING',
  /** Emerging trend - pattern begins to appear */
  EMERGING = 'EMERGING',
}

/**
 * Trend analysis methods
 */
export enum AnalyticsTrendMethod {
  /** Moving average trend analysis */
  MOVING_AVERAGE = 'MOVING_AVERAGE',
  /** Simple moving average */
  SMA = 'SMA',
  /** Exponential moving average */
  EMA = 'EMA',
  /** Weighted moving average */
  WMA = 'WMA',
  /** Linear regression trend line */
  TREND_LINE = 'TREND_LINE',
  /** Polynomial regression */
  POLYNOMIAL_REGRESSION = 'POLYNOMIAL_REGRESSION',
  /** Exponential smoothing */
  EXPONENTIAL_SMOOTHING = 'EXPONENTIAL_SMOOTHING',
  /** Holt-Winters forecasting */
  HOLT_WINTERS = 'HOLT_WINTERS',
  /** ARIMA modeling */
  ARIMA = 'ARIMA',
  /** Seasonal decomposition */
  SEASONAL_DECOMPOSITION = 'SEASONAL_DECOMPOSITION',
  /** Mann-Kendall trend test */
  MANN_KENDALL = 'MANN_KENDALL',
  /** Sen's slope estimator */
  SENS_SLOPE = 'SENS_SLOPE',
  /** Spearman rank correlation */
  SPEARMAN_RANK = 'SPEARMAN_RANK',
  /** Theil-Sen estimator */
  THEIL_SEN = 'THEIL_SEN',
  /** Kernel regression */
  KERNEL_REGRESSION = 'KERNEL_REGRESSION',
  /** LOESS regression */
  LOESS = 'LOESS',
  /** Principal component analysis */
  PCA = 'PCA',
  /** Singular value decomposition */
  SVD = 'SVD',
  /** Change point detection */
  CHANGE_POINT_DETECTION = 'CHANGE_POINT_DETECTION',
  /** Breakpoint analysis */
  BREAKPOINT_ANALYSIS = 'BREAKPOINT_ANALYSIS',
}

/**
 * Trend category classification
 */
export enum AnalyticsTrendCategory {
  /** Direction-based trends */
  DIRECTION = 'DIRECTION',
  /** Pattern-based trends */
  PATTERN = 'PATTERN',
  /** Statistical methods */
  STATISTICAL = 'STATISTICAL',
  /** Machine learning methods */
  ML = 'ML',
  /** Time series methods */
  TIME_SERIES = 'TIME_SERIES',
  /** Regression methods */
  REGRESSION = 'REGRESSION',
}

/**
 * Trend configuration
 */
export interface AnalyticsTrendConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  category: AnalyticsTrendCategory;
  requiresDataPoints: number;
  priority: number;
}

export const ANALYTICS_TREND_CONFIG: Record<AnalyticsTrendDirection, AnalyticsTrendConfig> = {
  [AnalyticsTrendDirection.UPWARD]: {
    label: 'Upward Trend',
    description: 'Values are consistently increasing over time',
    icon: 'TrendingUp',
    color: '#22C55E',
    category: AnalyticsTrendCategory.DIRECTION,
    requiresDataPoints: 3,
    priority: 1,
  },
  [AnalyticsTrendDirection.DOWNWARD]: {
    label: 'Downward Trend',
    description: 'Values are consistently decreasing over time',
    icon: 'TrendingDown',
    color: '#EF4444',
    category: AnalyticsTrendCategory.DIRECTION,
    requiresDataPoints: 3,
    priority: 1,
  },
  [AnalyticsTrendDirection.STABLE]: {
    label: 'Stable Trend',
    description: 'Values remain relatively constant over time',
    icon: 'Minus',
    color: '#6B7280',
    category: AnalyticsTrendCategory.DIRECTION,
    requiresDataPoints: 3,
    priority: 2,
  },
  [AnalyticsTrendDirection.VOLATILE]: {
    label: 'Volatile Trend',
    description: 'Values fluctuate significantly with no clear pattern',
    icon: 'Activity',
    color: '#F59E0B',
    category: AnalyticsTrendCategory.DIRECTION,
    requiresDataPoints: 5,
    priority: 2,
  },
  [AnalyticsTrendDirection.SEASONAL]: {
    label: 'Seasonal Trend',
    description: 'Patterns repeat at regular seasonal intervals',
    icon: 'Calendar',
    color: '#8B5CF6',
    category: AnalyticsTrendCategory.PATTERN,
    requiresDataPoints: 12,
    priority: 2,
  },
  [AnalyticsTrendDirection.CYCLICAL]: {
    label: 'Cyclical Trend',
    description: 'Patterns repeat over longer economic or business cycles',
    icon: 'Repeat',
    color: '#6366F1',
    category: AnalyticsTrendCategory.PATTERN,
    requiresDataPoints: 20,
    priority: 2,
  },
  [AnalyticsTrendDirection.LINEAR]: {
    label: 'Linear Trend',
    description: 'Constant rate of change over time',
    icon: 'TrendingUp',
    color: '#3B82F6',
    category: AnalyticsTrendCategory.PATTERN,
    requiresDataPoints: 3,
    priority: 1,
  },
  [AnalyticsTrendDirection.EXPONENTIAL]: {
    label: 'Exponential Trend',
    description: 'Accelerating rate of change over time',
    icon: 'TrendingUp',
    color: '#10B981',
    category: AnalyticsTrendCategory.PATTERN,
    requiresDataPoints: 4,
    priority: 2,
  },
  [AnalyticsTrendDirection.DECAYING]: {
    label: 'Decaying Trend',
    description: 'Diminishing rate of change over time',
    icon: 'TrendingDown',
    color: '#F97316',
    category: AnalyticsTrendCategory.PATTERN,
    requiresDataPoints: 4,
    priority: 2,
  },
  [AnalyticsTrendDirection.S_CURVE]: {
    label: 'S-Curve Trend',
    description: 'Logistic growth pattern with initial acceleration then deceleration',
    icon: 'TrendingUp',
    color: '#8B5CF6',
    category: AnalyticsTrendCategory.PATTERN,
    requiresDataPoints: 6,
    priority: 2,
  },
  [AnalyticsTrendDirection.PLATEAU]: {
    label: 'Plateau Trend',
    description: 'Growth stabilizes after initial growth period',
    icon: 'Minus',
    color: '#6B7280',
    category: AnalyticsTrendCategory.PATTERN,
    requiresDataPoints: 5,
    priority: 2,
  },
  [AnalyticsTrendDirection.IRREGULAR]: {
    label: 'Irregular Trend',
    description: 'No discernible pattern in the data',
    icon: 'Activity',
    color: '#9CA3AF',
    category: AnalyticsTrendCategory.PATTERN,
    requiresDataPoints: 3,
    priority: 3,
  },
  [AnalyticsTrendDirection.BIPOLAR]: {
    label: 'Bipolar Trend',
    description: 'Alternating between two distinct states or values',
    icon: 'ArrowUpDown',
    color: '#EC4899',
    category: AnalyticsTrendCategory.PATTERN,
    requiresDataPoints: 5,
    priority: 3,
  },
  [AnalyticsTrendDirection.STEP]: {
    label: 'Step Trend',
    description: 'Sudden changes at specific points in time',
    icon: 'ArrowRight',
    color: '#F59E0B',
    category: AnalyticsTrendCategory.PATTERN,
    requiresDataPoints: 4,
    priority: 3,
  },
  [AnalyticsTrendDirection.RAMP]: {
    label: 'Ramp Trend',
    description: 'Gradual linear increase or decrease',
    icon: 'TrendingUp',
    color: '#3B82F6',
    category: AnalyticsTrendCategory.PATTERN,
    requiresDataPoints: 3,
    priority: 2,
  },
  [AnalyticsTrendDirection.PULSE]: {
    label: 'Pulse Trend',
    description: 'Temporary spikes followed by return to baseline',
    icon: 'Zap',
    color: '#F472B6',
    category: AnalyticsTrendCategory.PATTERN,
    requiresDataPoints: 4,
    priority: 3,
  },
  [AnalyticsTrendDirection.FADING]: {
    label: 'Fading Trend',
    description: 'Pattern diminishes in strength over time',
    icon: 'TrendingDown',
    color: '#9CA3AF',
    category: AnalyticsTrendCategory.PATTERN,
    requiresDataPoints: 5,
    priority: 3,
  },
  [AnalyticsTrendDirection.EMERGING]: {
    label: 'Emerging Trend',
    description: 'Pattern begins to appear and strengthen',
    icon: 'Sparkles',
    color: '#34D399',
    category: AnalyticsTrendCategory.PATTERN,
    requiresDataPoints: 4,
    priority: 2,
  },
};

/**
 * Trend method configuration
 */
export const ANALYTICS_TREND_METHOD_CONFIG: Record<
  AnalyticsTrendMethod,
  { label: string; description: string; category: string; complexity: 'low' | 'medium' | 'high' }
> = {
  [AnalyticsTrendMethod.MOVING_AVERAGE]: {
    label: 'Moving Average',
    description: 'Calculate average over sliding windows',
    category: 'Time Series',
    complexity: 'low',
  },
  [AnalyticsTrendMethod.SMA]: {
    label: 'Simple Moving Average',
    description: 'Unweighted average over a specific window',
    category: 'Time Series',
    complexity: 'low',
  },
  [AnalyticsTrendMethod.EMA]: {
    label: 'Exponential Moving Average',
    description: 'Weighted average giving more importance to recent data',
    category: 'Time Series',
    complexity: 'medium',
  },
  [AnalyticsTrendMethod.WMA]: {
    label: 'Weighted Moving Average',
    description: 'Custom weighted average over a window',
    category: 'Time Series',
    complexity: 'medium',
  },
  [AnalyticsTrendMethod.TREND_LINE]: {
    label: 'Trend Line',
    description: 'Linear regression line through data points',
    category: 'Regression',
    complexity: 'low',
  },
  [AnalyticsTrendMethod.POLYNOMIAL_REGRESSION]: {
    label: 'Polynomial Regression',
    description: 'Fit polynomial curve to data points',
    category: 'Regression',
    complexity: 'high',
  },
  [AnalyticsTrendMethod.EXPONENTIAL_SMOOTHING]: {
    label: 'Exponential Smoothing',
    description: 'Exponential weighted forecasting method',
    category: 'Time Series',
    complexity: 'medium',
  },
  [AnalyticsTrendMethod.HOLT_WINTERS]: {
    label: 'Holt-Winters',
    description: 'Advanced forecasting with trend and seasonality',
    category: 'Time Series',
    complexity: 'high',
  },
  [AnalyticsTrendMethod.ARIMA]: {
    label: 'ARIMA',
    description: 'Auto-regressive integrated moving average',
    category: 'Time Series',
    complexity: 'high',
  },
  [AnalyticsTrendMethod.SEASONAL_DECOMPOSITION]: {
    label: 'Seasonal Decomposition',
    description: 'Break down time series into components',
    category: 'Time Series',
    complexity: 'medium',
  },
  [AnalyticsTrendMethod.MANN_KENDALL]: {
    label: 'Mann-Kendall',
    description: 'Non-parametric trend test',
    category: 'Statistical',
    complexity: 'medium',
  },
  [AnalyticsTrendMethod.SENS_SLOPE]: {
    label: "Sen's Slope",
    description: 'Robust slope estimator for trends',
    category: 'Statistical',
    complexity: 'medium',
  },
  [AnalyticsTrendMethod.SPEARMAN_RANK]: {
    label: 'Spearman Rank',
    description: 'Rank correlation trend test',
    category: 'Statistical',
    complexity: 'medium',
  },
  [AnalyticsTrendMethod.THEIL_SEN]: {
    label: 'Theil-Sen',
    description: 'Robust regression estimator',
    category: 'Statistical',
    complexity: 'medium',
  },
  [AnalyticsTrendMethod.KERNEL_REGRESSION]: {
    label: 'Kernel Regression',
    description: 'Non-parametric regression method',
    category: 'ML',
    complexity: 'high',
  },
  [AnalyticsTrendMethod.LOESS]: {
    label: 'LOESS',
    description: 'Locally weighted scatterplot smoothing',
    category: 'ML',
    complexity: 'high',
  },
  [AnalyticsTrendMethod.PCA]: {
    label: 'Principal Component Analysis',
    description: 'Dimensionality reduction for trend detection',
    category: 'ML',
    complexity: 'high',
  },
  [AnalyticsTrendMethod.SVD]: {
    label: 'Singular Value Decomposition',
    description: 'Matrix decomposition for trend detection',
    category: 'ML',
    complexity: 'high',
  },
  [AnalyticsTrendMethod.CHANGE_POINT_DETECTION]: {
    label: 'Change Point Detection',
    description: 'Detect points where trend changes',
    category: 'Statistical',
    complexity: 'high',
  },
  [AnalyticsTrendMethod.BREAKPOINT_ANALYSIS]: {
    label: 'Breakpoint Analysis',
    description: 'Analyze structural breaks in time series',
    category: 'Statistical',
    complexity: 'high',
  },
};

/**
 * Get trend direction label
 */
export function getTrendDirectionLabel(direction: AnalyticsTrendDirection): string {
  return ANALYTICS_TREND_CONFIG[direction]?.label || direction;
}

/**
 * Get trend direction description
 */
export function getTrendDirectionDescription(direction: AnalyticsTrendDirection): string {
  return ANALYTICS_TREND_CONFIG[direction]?.description || '';
}

/**
 * Get trend direction color
 */
export function getTrendDirectionColor(direction: AnalyticsTrendDirection): string {
  return ANALYTICS_TREND_CONFIG[direction]?.color || '#6B7280';
}

/**
 * Get trend direction icon
 */
export function getTrendDirectionIcon(direction: AnalyticsTrendDirection): string {
  return ANALYTICS_TREND_CONFIG[direction]?.icon || 'Activity';
}

/**
 * Get trend method label
 */
export function getTrendMethodLabel(method: AnalyticsTrendMethod): string {
  return ANALYTICS_TREND_METHOD_CONFIG[method]?.label || method;
}

/**
 * Get trend method description
 */
export function getTrendMethodDescription(method: AnalyticsTrendMethod): string {
  return ANALYTICS_TREND_METHOD_CONFIG[method]?.description || '';
}

/**
 * Check if trend is positive (upward)
 */
export function isPositiveTrend(direction: AnalyticsTrendDirection): boolean {
  return (
    direction === AnalyticsTrendDirection.UPWARD ||
    direction === AnalyticsTrendDirection.EXPONENTIAL ||
    direction === AnalyticsTrendDirection.LINEAR ||
    direction === AnalyticsTrendDirection.RAMP ||
    direction === AnalyticsTrendDirection.EMERGING
  );
}

/**
 * Check if trend is negative (downward)
 */
export function isNegativeTrend(direction: AnalyticsTrendDirection): boolean {
  return (
    direction === AnalyticsTrendDirection.DOWNWARD ||
    direction === AnalyticsTrendDirection.DECAYING ||
    direction === AnalyticsTrendDirection.FADING
  );
}

/**
 * Check if trend is neutral (stable)
 */
export function isNeutralTrend(direction: AnalyticsTrendDirection): boolean {
  return (
    direction === AnalyticsTrendDirection.STABLE || direction === AnalyticsTrendDirection.PLATEAU
  );
}

/**
 * Trend analysis result
 */
export interface TrendAnalysisResult {
  direction: AnalyticsTrendDirection;
  strength: 'weak' | 'moderate' | 'strong' | 'very_strong';
  confidence: number; // 0-1
  slope: number;
  rSquared: number;
  pValue: number;
  method: AnalyticsTrendMethod;
  forecast?: number[];
}

/**
 * Trend strength calculation
 */
export function calculateTrendStrength(
  slope: number,
  rSquared: number
): 'weak' | 'moderate' | 'strong' | 'very_strong' {
  const absSlope = Math.abs(slope);

  if (rSquared >= 0.9 && absSlope > 0.5) {
    return 'very_strong';
  }
  if (rSquared >= 0.7 && absSlope > 0.3) {
    return 'strong';
  }
  if (rSquared >= 0.5 && absSlope > 0.1) {
    return 'moderate';
  }
  return 'weak';
}

/**
 * Determine trend direction from slope
 */
export function determineTrendDirection(slope: number): AnalyticsTrendDirection {
  if (slope > 0.1) {
    return AnalyticsTrendDirection.UPWARD;
  }
  if (slope < -0.1) {
    return AnalyticsTrendDirection.DOWNWARD;
  }
  return AnalyticsTrendDirection.STABLE;
}

/**
 * Recommended trend methods by data type
 */
export function getRecommendedTrendMethods(
  dataPoints: number,
  hasSeasonality: boolean
): AnalyticsTrendMethod[] {
  const methods: AnalyticsTrendMethod[] = [];

  if (dataPoints >= 3) {
    methods.push(AnalyticsTrendMethod.TREND_LINE);
    methods.push(AnalyticsTrendMethod.MOVING_AVERAGE);
  }

  if (dataPoints >= 5) {
    methods.push(AnalyticsTrendMethod.SMA);
    methods.push(AnalyticsTrendMethod.MANN_KENDALL);
  }

  if (dataPoints >= 10) {
    methods.push(AnalyticsTrendMethod.EMA);
    methods.push(AnalyticsTrendMethod.THEIL_SEN);
  }

  if (dataPoints >= 12 && hasSeasonality) {
    methods.push(AnalyticsTrendMethod.SEASONAL_DECOMPOSITION);
    methods.push(AnalyticsTrendMethod.HOLT_WINTERS);
  }

  if (dataPoints >= 20) {
    methods.push(AnalyticsTrendMethod.ARIMA);
    methods.push(AnalyticsTrendMethod.BREAKPOINT_ANALYSIS);
  }

  if (dataPoints >= 30) {
    methods.push(AnalyticsTrendMethod.KERNEL_REGRESSION);
    methods.push(AnalyticsTrendMethod.LOESS);
  }

  return methods;
}

/**
 * Trend interpretation helpers
 */
export const TREND_INTERPRETATIONS = {
  [AnalyticsTrendDirection.UPWARD]: {
    positive: 'Growth is accelerating. Business is expanding.',
    negative: 'Growth may be unsustainable. Monitor for exhaustion.',
    neutral: 'Steady growth pattern. Continue current strategy.',
  },
  [AnalyticsTrendDirection.DOWNWARD]: {
    positive: 'Decline may be expected (e.g., seasonal). Monitor for reversal.',
    negative: 'Critical decline detected. Immediate action required.',
    neutral: 'Gradual decline. Investigate root causes.',
  },
  [AnalyticsTrendDirection.STABLE]: {
    positive: 'Consistent performance. Maintain current operations.',
    negative: 'No growth. Explore new opportunities for expansion.',
    neutral: 'Stable but stagnant. Consider optimization.',
  },
  [AnalyticsTrendDirection.VOLATILE]: {
    positive: 'High volatility with upward spikes. Opportunity for gains.',
    negative: 'Unstable performance. Risk management needed.',
    neutral: 'Unpredictable pattern. Use robust forecasting methods.',
  },
  [AnalyticsTrendDirection.SEASONAL]: {
    positive: 'Predictable seasonal patterns. Optimize seasonal strategies.',
    negative: 'Seasonal declines expected. Plan for downturns.',
    neutral: 'Seasonal patterns identified. Use for planning.',
  },
  [AnalyticsTrendDirection.CYCLICAL]: {
    positive: 'Cyclical growth phase. Capitalize on upswing.',
    negative: 'Cyclical downturn. Prepare for recovery.',
    neutral: 'Cyclical pattern identified. Plan accordingly.',
  },
};

/**
 * Get trend interpretation
 */
export function getTrendInterpretation(
  direction: AnalyticsTrendDirection,
  sentiment: 'positive' | 'negative' | 'neutral'
): string {
  return TREND_INTERPRETATIONS[direction]?.[sentiment] || 'No interpretation available.';
}
