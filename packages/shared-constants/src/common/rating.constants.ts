/**
 * Rating Constants
 * @module shared-constants/common/rating.constants
 */

export const RATING = {
  // Rating scale
  MIN: 1,
  MAX: 5,
  DEFAULT_VALUE: 0,
  STEP: 0.5,

  // Rating levels
  LEVELS: {
    EXCELLENT: 5,
    VERY_GOOD: 4,
    GOOD: 3,
    AVERAGE: 2,
    POOR: 1,
  } as const,

  // Rating labels
  LABELS: {
    5: 'Excellent',
    4: 'Very Good',
    3: 'Good',
    2: 'Average',
    1: 'Poor',
  } as const,

  // Rating colors
  COLORS: {
    5: '#22c55e', // green
    4: '#84cc16', // lime
    3: '#eab308', // yellow
    2: '#f59e0b', // amber
    1: '#ef4444', // red
    0: '#9ca3af', // gray
  } as const,

  // Rating categories
  CATEGORIES: {
    PRODUCT: 'product',
    SELLER: 'seller',
    SERVICE: 'service',
    DELIVERY: 'delivery',
    QUALITY: 'quality',
    VALUE: 'value',
    OVERALL: 'overall',
  } as const,

  // Rating status
  RATING_STATUS: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    FLAGGED: 'flagged',
    REMOVED: 'removed',
  } as const,

  // Rating filters
  FILTERS: {
    ALL: 'all',
    POSITIVE: 'positive', // 4-5 stars
    NEUTRAL: 'neutral', // 3 stars
    NEGATIVE: 'negative', // 1-2 stars
    WITH_COMMENT: 'with_comment',
    WITH_IMAGE: 'with_image',
  } as const,

  // Sort options
  SORT: {
    NEWEST: 'newest',
    OLDEST: 'oldest',
    HIGHEST: 'highest',
    LOWEST: 'lowest',
    HELPFUL: 'helpful',
  } as const,

  // Rating calculations
  CALCULATION: {
    DECIMALS: 1,
    ROUNDING: 'round',
    WEIGHT: {
      HELP_RATE: 0.1,
      VERIFIED_PURCHASE: 0.2,
    },
  },

  // Review limits
  LIMITS: {
    MIN_WORDS: 10,
    MAX_WORDS: 500,
    MIN_CHARS: 20,
    MAX_CHARS: 5000,
  },

  // Default values
  DEFAULTS: {
    RATING: 0,
    STATUS: 'pending',
    SORT: 'newest',
    FILTER: 'all',
  },
} as const;

export type RatingLevel = (typeof RATING.LEVELS)[keyof typeof RATING.LEVELS];
export type RatingCategory = (typeof RATING.CATEGORIES)[keyof typeof RATING.CATEGORIES];
export type RatingStatus = (typeof RATING.RATING_STATUS)[keyof typeof RATING.RATING_STATUS];
export type RatingFilter = (typeof RATING.FILTERS)[keyof typeof RATING.FILTERS];
export type RatingSort = (typeof RATING.SORT)[keyof typeof RATING.SORT];
