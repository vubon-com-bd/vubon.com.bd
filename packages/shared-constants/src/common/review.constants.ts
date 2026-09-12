/**
 * Review Constants
 * @module shared-constants/common/review.constants
 */

export const REVIEW = {
  // Review status
  REVIEW_STATUS: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    FLAGGED: 'flagged',
    REMOVED: 'removed',
    SPAM: 'spam',
    HIDDEN: 'hidden',
  } as const,

  // Review types
  TYPE: {
    PRODUCT: 'product',
    SELLER: 'seller',
    SERVICE: 'service',
    DELIVERY: 'delivery',
  } as const,

  // Review moderation
  MODERATION: {
    AUTO_APPROVE: true,
    FLAG_THRESHOLD: 5,
    BLOCK_THRESHOLD: 10,
    REQUIRED_REVIEWS: 3,
    SPAM_THRESHOLD: 3,
    PROFANITY_FILTER: true,
    IMAGE_REQUIRED: false,
    VERIFIED_ONLY: true,
  },

  // Review limits
  LIMITS: {
    MIN_CHARS: 20,
    MAX_CHARS: 5000,
    MIN_WORDS: 5,
    MAX_WORDS: 500,
    MAX_IMAGES: 5,
    MAX_VIDEOS: 2,
    MAX_REVIEWS_PER_DAY: 10,
    MAX_REVIEWS_PER_PRODUCT: 1000,
  },

  // Review features
  FEATURES: {
    IMAGES: true,
    VIDEOS: true,
    LIKES: true,
    DISLIKES: true,
    REPORTS: true,
    REPLIES: true,
    HELPFUL_VOTES: true,
    EDIT_ALLOWED: true,
    DELETE_ALLOWED: true,
  },

  // Review analytics
  ANALYTICS: {
    TRACK_VIEWS: true,
    TRACK_HELPFUL: true,
    TRACK_REPORTS: true,
    TRACK_FLAGS: true,
    AVERAGE_RATING: true,
    DISTRIBUTION: true,
    SENTIMENT_ANALYSIS: false,
  },

  // Sort options
  SORT: {
    NEWEST: 'newest',
    OLDEST: 'oldest',
    HIGHEST_RATED: 'highest_rated',
    LOWEST_RATED: 'lowest_rated',
    MOST_HELPFUL: 'most_helpful',
    MOST_LIKED: 'most_liked',
    RECENT: 'recent',
    RELEVANT: 'relevant',
  } as const,

  // Filter options
  FILTER: {
    ALL: 'all',
    POSITIVE: 'positive',
    NEUTRAL: 'neutral',
    NEGATIVE: 'negative',
    WITH_IMAGES: 'with_images',
    WITH_VIDEOS: 'with_videos',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    APPROVED: 'approved',
    PENDING: 'pending',
  } as const,

  // Default values
  DEFAULTS: {
    STATUS: 'pending',
    TYPE: 'product',
    SORT: 'newest',
    FILTER: 'all',
  },
} as const;

export type ReviewStatusType = (typeof REVIEW.REVIEW_STATUS)[keyof typeof REVIEW.REVIEW_STATUS];
export type ReviewType = (typeof REVIEW.TYPE)[keyof typeof REVIEW.TYPE];
export type ReviewSort = (typeof REVIEW.SORT)[keyof typeof REVIEW.SORT];
export type ReviewFilter = (typeof REVIEW.FILTER)[keyof typeof REVIEW.FILTER];
