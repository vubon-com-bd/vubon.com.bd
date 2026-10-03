export const ANALYTICS_TREND_TYPE = {
  UPWARD: 'upward',
  DOWNWARD: 'downward',
  STABLE: 'stable',
  VOLATILE: 'volatile',
  SEASONAL: 'seasonal',
  UNKNOWN: 'unknown',
} as const;

export const ANALYTICS_TREND_STRENGTH = {
  VERY_STRONG: 'very_strong',
  STRONG: 'strong',
  MODERATE: 'moderate',
  WEAK: 'weak',
  NONE: 'none',
} as const;

export const ANALYTICS_TREND_LIMIT = {
  MIN_DATA_POINTS: 7,
  MAX_DATA_POINTS: 365,
  SIGNIFICANCE_THRESHOLD: 0.05,
  SMOOTHING_WINDOW: 7,
  FORECAST_DAYS: 30,
} as const;

export type AnalyticsTrendTypeType =
  (typeof ANALYTICS_TREND_TYPE)[keyof typeof ANALYTICS_TREND_TYPE];
export type AnalyticsTrendStrengthType =
  (typeof ANALYTICS_TREND_STRENGTH)[keyof typeof ANALYTICS_TREND_STRENGTH];
