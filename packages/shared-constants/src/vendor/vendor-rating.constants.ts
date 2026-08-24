/**
 * Vendor Rating Constants
 * Configuration for vendor ratings
 */

export const VENDOR_RATING = {
  // Rating Types
  TYPES: {
    OVERALL: 'overall',
    PRODUCT: 'product',
    SERVICE: 'service',
    DELIVERY: 'delivery',
    COMMUNICATION: 'communication',
    VALUE: 'value',
  } as const,

  // Rating Scales
  SCALES: {
    MIN: 1,
    MAX: 5,
    DEFAULT: 3,
  } as const,

  // Rating Levels
  LEVELS: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    POOR: 'poor',
    VERY_POOR: 'very_poor',
  } as const,

  // Rating Scores
  SCORES: {
    EXCELLENT: 4.5,
    GOOD: 3.5,
    AVERAGE: 2.5,
    POOR: 1.5,
    VERY_POOR: 1.0,
  } as const,

  // Rating Colors (for UI)
  COLORS: {
    EXCELLENT: '#green-500',
    GOOD: '#blue-500',
    AVERAGE: '#yellow-500',
    POOR: '#orange-500',
    VERY_POOR: '#red-500',
  } as const,

  // Rating Icons (for UI)
  ICONS: {
    EXCELLENT: '⭐⭐⭐⭐⭐',
    GOOD: '⭐⭐⭐⭐',
    AVERAGE: '⭐⭐⭐',
    POOR: '⭐⭐',
    VERY_POOR: '⭐',
  } as const,

  // Rating Categories
  CATEGORIES: {
    POSITIVE: 'positive',
    NEUTRAL: 'neutral',
    NEGATIVE: 'negative',
  } as const,

  // Rating Limits
  LIMITS: {
    MIN_RATINGS_FOR_AVERAGE: 5,
    MIN_RATINGS_FOR_FEATURED: 10,
    MAX_RATINGS_PER_DAY: 3,
    MAX_RATINGS_PER_VENDOR: 100,
  } as const,
} as const;

// Rating Types
export type VendorRatingType = (typeof VENDOR_RATING.TYPES)[keyof typeof VENDOR_RATING.TYPES];

// Rating Levels
export type VendorRatingLevel = (typeof VENDOR_RATING.LEVELS)[keyof typeof VENDOR_RATING.LEVELS];

// Rating Scores
export type VendorRatingScore = (typeof VENDOR_RATING.SCORES)[keyof typeof VENDOR_RATING.SCORES];

// Rating Colors
export type VendorRatingColor = (typeof VENDOR_RATING.COLORS)[keyof typeof VENDOR_RATING.COLORS];

// Rating Icons
export type VendorRatingIcon = (typeof VENDOR_RATING.ICONS)[keyof typeof VENDOR_RATING.ICONS];

// Rating Categories
export type VendorRatingCategory =
  (typeof VENDOR_RATING.CATEGORIES)[keyof typeof VENDOR_RATING.CATEGORIES];

// Utility Functions
export function vendorRatingGetTypeLabel(type: VendorRatingType): string {
  const labels: Record<VendorRatingType, string> = {
    [VENDOR_RATING.TYPES.OVERALL]: 'Overall',
    [VENDOR_RATING.TYPES.PRODUCT]: 'Product',
    [VENDOR_RATING.TYPES.SERVICE]: 'Service',
    [VENDOR_RATING.TYPES.DELIVERY]: 'Delivery',
    [VENDOR_RATING.TYPES.COMMUNICATION]: 'Communication',
    [VENDOR_RATING.TYPES.VALUE]: 'Value',
  };
  return labels[type] || 'Unknown';
}

export function vendorRatingGetLevel(score: number): VendorRatingLevel {
  if (score >= VENDOR_RATING.SCORES.EXCELLENT) return VENDOR_RATING.LEVELS.EXCELLENT;
  if (score >= VENDOR_RATING.SCORES.GOOD) return VENDOR_RATING.LEVELS.GOOD;
  if (score >= VENDOR_RATING.SCORES.AVERAGE) return VENDOR_RATING.LEVELS.AVERAGE;
  if (score >= VENDOR_RATING.SCORES.POOR) return VENDOR_RATING.LEVELS.POOR;
  return VENDOR_RATING.LEVELS.VERY_POOR;
}

export function vendorRatingGetLevelLabel(level: VendorRatingLevel): string {
  const labels: Record<VendorRatingLevel, string> = {
    [VENDOR_RATING.LEVELS.EXCELLENT]: 'Excellent',
    [VENDOR_RATING.LEVELS.GOOD]: 'Good',
    [VENDOR_RATING.LEVELS.AVERAGE]: 'Average',
    [VENDOR_RATING.LEVELS.POOR]: 'Poor',
    [VENDOR_RATING.LEVELS.VERY_POOR]: 'Very Poor',
  };
  return labels[level] || 'Unknown';
}

export function vendorRatingGetColor(level: VendorRatingLevel): VendorRatingColor {
  const colors: Record<VendorRatingLevel, VendorRatingColor> = {
    [VENDOR_RATING.LEVELS.EXCELLENT]: VENDOR_RATING.COLORS.EXCELLENT,
    [VENDOR_RATING.LEVELS.GOOD]: VENDOR_RATING.COLORS.GOOD,
    [VENDOR_RATING.LEVELS.AVERAGE]: VENDOR_RATING.COLORS.AVERAGE,
    [VENDOR_RATING.LEVELS.POOR]: VENDOR_RATING.COLORS.POOR,
    [VENDOR_RATING.LEVELS.VERY_POOR]: VENDOR_RATING.COLORS.VERY_POOR,
  };
  return colors[level] || '#gray-400';
}

export function vendorRatingGetStars(level: VendorRatingLevel): string {
  const stars: Record<VendorRatingLevel, string> = {
    [VENDOR_RATING.LEVELS.EXCELLENT]: VENDOR_RATING.ICONS.EXCELLENT,
    [VENDOR_RATING.LEVELS.GOOD]: VENDOR_RATING.ICONS.GOOD,
    [VENDOR_RATING.LEVELS.AVERAGE]: VENDOR_RATING.ICONS.AVERAGE,
    [VENDOR_RATING.LEVELS.POOR]: VENDOR_RATING.ICONS.POOR,
    [VENDOR_RATING.LEVELS.VERY_POOR]: VENDOR_RATING.ICONS.VERY_POOR,
  };
  return stars[level] || '⭐';
}

export function vendorRatingGetCategory(level: VendorRatingLevel): VendorRatingCategory {
  const categories: Record<VendorRatingLevel, VendorRatingCategory> = {
    [VENDOR_RATING.LEVELS.EXCELLENT]: VENDOR_RATING.CATEGORIES.POSITIVE,
    [VENDOR_RATING.LEVELS.GOOD]: VENDOR_RATING.CATEGORIES.POSITIVE,
    [VENDOR_RATING.LEVELS.AVERAGE]: VENDOR_RATING.CATEGORIES.NEUTRAL,
    [VENDOR_RATING.LEVELS.POOR]: VENDOR_RATING.CATEGORIES.NEGATIVE,
    [VENDOR_RATING.LEVELS.VERY_POOR]: VENDOR_RATING.CATEGORIES.NEGATIVE,
  };
  return categories[level] || VENDOR_RATING.CATEGORIES.NEUTRAL;
}

export function vendorRatingIsPositive(level: VendorRatingLevel): boolean {
  return level === VENDOR_RATING.LEVELS.EXCELLENT || level === VENDOR_RATING.LEVELS.GOOD;
}

export function vendorRatingIsNegative(level: VendorRatingLevel): boolean {
  return level === VENDOR_RATING.LEVELS.POOR || level === VENDOR_RATING.LEVELS.VERY_POOR;
}

export function vendorRatingGetAverageScore(scores: number[]): number {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((a, b) => a + b, 0);
  return parseFloat((sum / scores.length).toFixed(1));
}
