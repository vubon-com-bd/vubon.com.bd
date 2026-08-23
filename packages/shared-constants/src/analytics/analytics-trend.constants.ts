/**
 * Analytics Trend Constants
 * Trend analysis and pattern detection
 */

export const ANALYTICS_TREND = {
  // Trend Types
  TYPES: {
    // Basic Trends
    UPWARD: 'upward',
    DOWNWARD: 'downward',
    STABLE: 'stable',
    FLAT: 'flat',
    VOLATILE: 'volatile',
    ERRATIC: 'erratic',

    // Seasonal Trends
    SEASONAL: 'seasonal',
    CYCLICAL: 'cyclical',
    PERIODIC: 'periodic',

    // Pattern Trends
    LINEAR: 'linear',
    EXPONENTIAL: 'exponential',
    LOGARITHMIC: 'logarithmic',
    POLYNOMIAL: 'polynomial',
    POWER: 'power',

    // Complex Trends
    S_CURVE: 's_curve',
    BELL_CURVE: 'bell_curve',
    U_SHAPE: 'u_shape',
    J_SHAPE: 'j_shape',
    L_SHAPE: 'l_shape',

    // Market Trends
    BULLISH: 'bullish',
    BEARISH: 'bearish',
    SIDEWAYS: 'sideways',
    BREAKOUT: 'breakout',

    // Custom Trends
    CUSTOM: 'custom',
    NONE: 'none',
  } as const,

  // Trend Strengths
  STRENGTHS: {
    VERY_STRONG: 'very_strong',
    STRONG: 'strong',
    MODERATE: 'moderate',
    WEAK: 'weak',
    VERY_WEAK: 'very_weak',
    NONE: 'none',
  } as const,

  // Trend Directions
  DIRECTIONS: {
    POSITIVE: 'positive',
    NEGATIVE: 'negative',
    NEUTRAL: 'neutral',
    MIXED: 'mixed',
  } as const,

  // Trend Patterns
  PATTERNS: {
    // Growth Patterns
    STEADY_GROWTH: 'steady_growth',
    ACCELERATING_GROWTH: 'accelerating_growth',
    DECELERATING_GROWTH: 'decelerating_growth',

    // Decline Patterns
    STEADY_DECLINE: 'steady_decline',
    ACCELERATING_DECLINE: 'accelerating_decline',
    DECELERATING_DECLINE: 'decelerating_decline',

    // Fluctuation Patterns
    RANDOM: 'random',
    PERIODIC: 'periodic',
    CHAOTIC: 'chaotic',

    // Special Patterns
    BREAKOUT_UP: 'breakout_up',
    BREAKOUT_DOWN: 'breakout_down',
    REVERSAL_UP: 'reversal_up',
    REVERSAL_DOWN: 'reversal_down',
    CONSOLIDATION: 'consolidation',
  } as const,

  // Trend Analysis Methods
  METHODS: {
    MOVING_AVERAGE: 'moving_average',
    EXPONENTIAL_SMOOTHING: 'exponential_smoothing',
    LINEAR_REGRESSION: 'linear_regression',
    POLYNOMIAL_REGRESSION: 'polynomial_regression',
    MANN_KENDALL: 'mann_kendall',
    SEN_SLOPE: 'sen_slope',
    THIEL_SEN: 'thiel_sen',
  } as const,

  // Trend Confidence
  CONFIDENCE: {
    VERY_HIGH: 'very_high',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    VERY_LOW: 'very_low',
  } as const,

  // Trend Horizon
  HORIZONS: {
    SHORT_TERM: 'short_term',
    MEDIUM_TERM: 'medium_term',
    LONG_TERM: 'long_term',
    VERY_LONG_TERM: 'very_long_term',
  } as const,
} as const;

// Analytics Trend Types
export type AnalyticsTrendType = (typeof ANALYTICS_TREND.TYPES)[keyof typeof ANALYTICS_TREND.TYPES];

// Analytics Trend Strengths
export type AnalyticsTrendStrength =
  (typeof ANALYTICS_TREND.STRENGTHS)[keyof typeof ANALYTICS_TREND.STRENGTHS];

// Analytics Trend Directions
export type AnalyticsTrendDirection =
  (typeof ANALYTICS_TREND.DIRECTIONS)[keyof typeof ANALYTICS_TREND.DIRECTIONS];

// Analytics Trend Patterns
export type AnalyticsTrendPattern =
  (typeof ANALYTICS_TREND.PATTERNS)[keyof typeof ANALYTICS_TREND.PATTERNS];

// Analytics Trend Analysis Methods
export type AnalyticsTrendMethod =
  (typeof ANALYTICS_TREND.METHODS)[keyof typeof ANALYTICS_TREND.METHODS];

// Analytics Trend Confidence
export type AnalyticsTrendConfidence =
  (typeof ANALYTICS_TREND.CONFIDENCE)[keyof typeof ANALYTICS_TREND.CONFIDENCE];

// Analytics Trend Horizons
export type AnalyticsTrendHorizon =
  (typeof ANALYTICS_TREND.HORIZONS)[keyof typeof ANALYTICS_TREND.HORIZONS];

// Analytics Trend Labels
export function getAnalyticsTrendLabel(trend: AnalyticsTrendType): string {
  const labels: Record<AnalyticsTrendType, string> = {
    [ANALYTICS_TREND.TYPES.UPWARD]: 'Upward',
    [ANALYTICS_TREND.TYPES.DOWNWARD]: 'Downward',
    [ANALYTICS_TREND.TYPES.STABLE]: 'Stable',
    [ANALYTICS_TREND.TYPES.FLAT]: 'Flat',
    [ANALYTICS_TREND.TYPES.VOLATILE]: 'Volatile',
    [ANALYTICS_TREND.TYPES.ERRATIC]: 'Erratic',
    [ANALYTICS_TREND.TYPES.SEASONAL]: 'Seasonal',
    [ANALYTICS_TREND.TYPES.CYCLICAL]: 'Cyclical',
    [ANALYTICS_TREND.TYPES.PERIODIC]: 'Periodic',
    [ANALYTICS_TREND.TYPES.LINEAR]: 'Linear',
    [ANALYTICS_TREND.TYPES.EXPONENTIAL]: 'Exponential',
    [ANALYTICS_TREND.TYPES.LOGARITHMIC]: 'Logarithmic',
    [ANALYTICS_TREND.TYPES.POLYNOMIAL]: 'Polynomial',
    [ANALYTICS_TREND.TYPES.POWER]: 'Power',
    [ANALYTICS_TREND.TYPES.S_CURVE]: 'S-Curve',
    [ANALYTICS_TREND.TYPES.BELL_CURVE]: 'Bell Curve',
    [ANALYTICS_TREND.TYPES.U_SHAPE]: 'U-Shape',
    [ANALYTICS_TREND.TYPES.J_SHAPE]: 'J-Shape',
    [ANALYTICS_TREND.TYPES.L_SHAPE]: 'L-Shape',
    [ANALYTICS_TREND.TYPES.BULLISH]: 'Bullish',
    [ANALYTICS_TREND.TYPES.BEARISH]: 'Bearish',
    [ANALYTICS_TREND.TYPES.SIDEWAYS]: 'Sideways',
    [ANALYTICS_TREND.TYPES.BREAKOUT]: 'Breakout',
    [ANALYTICS_TREND.TYPES.CUSTOM]: 'Custom',
    [ANALYTICS_TREND.TYPES.NONE]: 'None',
  };
  return labels[trend] || 'Unknown';
}

// Analytics Trend Strength Labels
export function getAnalyticsTrendStrengthLabel(strength: AnalyticsTrendStrength): string {
  const labels: Record<AnalyticsTrendStrength, string> = {
    [ANALYTICS_TREND.STRENGTHS.VERY_STRONG]: 'Very Strong',
    [ANALYTICS_TREND.STRENGTHS.STRONG]: 'Strong',
    [ANALYTICS_TREND.STRENGTHS.MODERATE]: 'Moderate',
    [ANALYTICS_TREND.STRENGTHS.WEAK]: 'Weak',
    [ANALYTICS_TREND.STRENGTHS.VERY_WEAK]: 'Very Weak',
    [ANALYTICS_TREND.STRENGTHS.NONE]: 'None',
  };
  return labels[strength] || 'Unknown';
}

// Analytics Trend Direction Labels
export function getAnalyticsTrendDirectionLabel(direction: AnalyticsTrendDirection): string {
  const labels: Record<AnalyticsTrendDirection, string> = {
    [ANALYTICS_TREND.DIRECTIONS.POSITIVE]: 'Positive',
    [ANALYTICS_TREND.DIRECTIONS.NEGATIVE]: 'Negative',
    [ANALYTICS_TREND.DIRECTIONS.NEUTRAL]: 'Neutral',
    [ANALYTICS_TREND.DIRECTIONS.MIXED]: 'Mixed',
  };
  return labels[direction] || 'Unknown';
}

// Analytics Trend Pattern Labels
export function getAnalyticsTrendPatternLabel(pattern: AnalyticsTrendPattern): string {
  const labels: Record<AnalyticsTrendPattern, string> = {
    [ANALYTICS_TREND.PATTERNS.STEADY_GROWTH]: 'Steady Growth',
    [ANALYTICS_TREND.PATTERNS.ACCELERATING_GROWTH]: 'Accelerating Growth',
    [ANALYTICS_TREND.PATTERNS.DECELERATING_GROWTH]: 'Decelerating Growth',
    [ANALYTICS_TREND.PATTERNS.STEADY_DECLINE]: 'Steady Decline',
    [ANALYTICS_TREND.PATTERNS.ACCELERATING_DECLINE]: 'Accelerating Decline',
    [ANALYTICS_TREND.PATTERNS.DECELERATING_DECLINE]: 'Decelerating Decline',
    [ANALYTICS_TREND.PATTERNS.RANDOM]: 'Random',
    [ANALYTICS_TREND.PATTERNS.PERIODIC]: 'Periodic',
    [ANALYTICS_TREND.PATTERNS.CHAOTIC]: 'Chaotic',
    [ANALYTICS_TREND.PATTERNS.BREAKOUT_UP]: 'Breakout Up',
    [ANALYTICS_TREND.PATTERNS.BREAKOUT_DOWN]: 'Breakout Down',
    [ANALYTICS_TREND.PATTERNS.REVERSAL_UP]: 'Reversal Up',
    [ANALYTICS_TREND.PATTERNS.REVERSAL_DOWN]: 'Reversal Down',
    [ANALYTICS_TREND.PATTERNS.CONSOLIDATION]: 'Consolidation',
  };
  return labels[pattern] || 'Unknown';
}

// Analytics Trend Method Labels
export function getAnalyticsTrendMethodLabel(method: AnalyticsTrendMethod): string {
  const labels: Record<AnalyticsTrendMethod, string> = {
    [ANALYTICS_TREND.METHODS.MOVING_AVERAGE]: 'Moving Average',
    [ANALYTICS_TREND.METHODS.EXPONENTIAL_SMOOTHING]: 'Exponential Smoothing',
    [ANALYTICS_TREND.METHODS.LINEAR_REGRESSION]: 'Linear Regression',
    [ANALYTICS_TREND.METHODS.POLYNOMIAL_REGRESSION]: 'Polynomial Regression',
    [ANALYTICS_TREND.METHODS.MANN_KENDALL]: 'Mann-Kendall',
    [ANALYTICS_TREND.METHODS.SEN_SLOPE]: "Sen's Slope",
    [ANALYTICS_TREND.METHODS.THIEL_SEN]: 'Thiel-Sen',
  };
  return labels[method] || 'Unknown';
}

// Analytics Trend Confidence Labels
export function getAnalyticsTrendConfidenceLabel(confidence: AnalyticsTrendConfidence): string {
  const labels: Record<AnalyticsTrendConfidence, string> = {
    [ANALYTICS_TREND.CONFIDENCE.VERY_HIGH]: 'Very High',
    [ANALYTICS_TREND.CONFIDENCE.HIGH]: 'High',
    [ANALYTICS_TREND.CONFIDENCE.MEDIUM]: 'Medium',
    [ANALYTICS_TREND.CONFIDENCE.LOW]: 'Low',
    [ANALYTICS_TREND.CONFIDENCE.VERY_LOW]: 'Very Low',
  };
  return labels[confidence] || 'Unknown';
}

// Analytics Trend Horizon Labels
export function getAnalyticsTrendHorizonLabel(horizon: AnalyticsTrendHorizon): string {
  const labels: Record<AnalyticsTrendHorizon, string> = {
    [ANALYTICS_TREND.HORIZONS.SHORT_TERM]: 'Short Term',
    [ANALYTICS_TREND.HORIZONS.MEDIUM_TERM]: 'Medium Term',
    [ANALYTICS_TREND.HORIZONS.LONG_TERM]: 'Long Term',
    [ANALYTICS_TREND.HORIZONS.VERY_LONG_TERM]: 'Very Long Term',
  };
  return labels[horizon] || 'Unknown';
}

// Check if trend is upward
export function isAnalyticsTrendUpward(trend: AnalyticsTrendType): boolean {
  const upwardTrends: AnalyticsTrendType[] = [
    ANALYTICS_TREND.TYPES.UPWARD,
    ANALYTICS_TREND.TYPES.BULLISH,
    ANALYTICS_TREND.TYPES.BREAKOUT,
    ANALYTICS_TREND.TYPES.EXPONENTIAL,
    ANALYTICS_TREND.TYPES.LINEAR,
  ];
  return upwardTrends.includes(trend);
}

// Check if trend is downward
export function isAnalyticsTrendDownward(trend: AnalyticsTrendType): boolean {
  const downwardTrends: AnalyticsTrendType[] = [
    ANALYTICS_TREND.TYPES.DOWNWARD,
    ANALYTICS_TREND.TYPES.BEARISH,
  ];
  return downwardTrends.includes(trend);
}

// Check if trend is stable
export function isAnalyticsTrendStable(trend: AnalyticsTrendType): boolean {
  const stableTrends: AnalyticsTrendType[] = [
    ANALYTICS_TREND.TYPES.STABLE,
    ANALYTICS_TREND.TYPES.FLAT,
    ANALYTICS_TREND.TYPES.SIDEWAYS,
  ];
  return stableTrends.includes(trend);
}

// Get trend direction from slope
export function getAnalyticsTrendDirection(slope: number): AnalyticsTrendDirection {
  if (slope > 0.1) return ANALYTICS_TREND.DIRECTIONS.POSITIVE;
  if (slope < -0.1) return ANALYTICS_TREND.DIRECTIONS.NEGATIVE;
  if (slope > -0.1 && slope < 0.1) return ANALYTICS_TREND.DIRECTIONS.NEUTRAL;
  return ANALYTICS_TREND.DIRECTIONS.MIXED;
}

// Get trend strength from R-squared value
export function getAnalyticsTrendStrength(rSquared: number): AnalyticsTrendStrength {
  if (rSquared > 0.9) return ANALYTICS_TREND.STRENGTHS.VERY_STRONG;
  if (rSquared > 0.7) return ANALYTICS_TREND.STRENGTHS.STRONG;
  if (rSquared > 0.5) return ANALYTICS_TREND.STRENGTHS.MODERATE;
  if (rSquared > 0.3) return ANALYTICS_TREND.STRENGTHS.WEAK;
  if (rSquared > 0.1) return ANALYTICS_TREND.STRENGTHS.VERY_WEAK;
  return ANALYTICS_TREND.STRENGTHS.NONE;
}
