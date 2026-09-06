/**
 * Product Review Constants (EXTENDS common/status)
 * @module shared-constants/business/product/review.constants
 */

import { STATUS } from '../../common/status.constants';

export const PRODUCT_REVIEW = {
  // Base status from common
  STATUS: STATUS,

  // Review specific
  MIN_RATING: 1,
  MAX_RATING: 5,
  DEFAULT_RATING: 0,
  MIN_REVIEW_LENGTH: 10,
  MAX_REVIEW_LENGTH: 5000,
  MAX_REVIEW_IMAGES: 5,
  MAX_REVIEW_VIDEOS: 2,
  REVIEW_CACHE_TTL: 3600,

  // Review status
  PRODUCT_REVIEW_STATUS: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    FLAGGED: 'flagged',
    REMOVED: 'removed',
    SPAM: 'spam',
    HIDDEN: 'hidden',
    HELPFUL: 'helpful',
    UNHELPFUL: 'unhelpful',
  } as const,

  // Review type
  PRODUCT_REVIEW_TYPE: {
    PRODUCT: 'product',
    SELLER: 'seller',
    SERVICE: 'service',
    DELIVERY: 'delivery',
    QUALITY: 'quality',
    VALUE: 'value',
    OVERALL: 'overall',
  } as const,

  // Review verification
  PRODUCT_REVIEW_VERIFICATION: {
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    PENDING: 'pending',
  } as const,

  // Review rating
  PRODUCT_REVIEW_RATING: {
    POOR: 1,
    AVERAGE: 2,
    GOOD: 3,
    VERY_GOOD: 4,
    EXCELLENT: 5,
  } as const,

  // Review filter
  PRODUCT_REVIEW_FILTER: {
    ALL: 'all',
    POSITIVE: 'positive',
    NEUTRAL: 'neutral',
    NEGATIVE: 'negative',
    WITH_IMAGES: 'with_images',
    WITH_VIDEOS: 'with_videos',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
  } as const,

  // Review sort
  PRODUCT_REVIEW_SORT: {
    NEWEST: 'newest',
    OLDEST: 'oldest',
    HIGHEST_RATED: 'highest_rated',
    LOWEST_RATED: 'lowest_rated',
    MOST_HELPFUL: 'most_helpful',
    MOST_LIKED: 'most_liked',
  } as const,
} as const;

export type ProductReviewStatus =
  (typeof PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS)[keyof typeof PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS];
export type ProductReviewType =
  (typeof PRODUCT_REVIEW.PRODUCT_REVIEW_TYPE)[keyof typeof PRODUCT_REVIEW.PRODUCT_REVIEW_TYPE];
export type ProductReviewVerification =
  (typeof PRODUCT_REVIEW.PRODUCT_REVIEW_VERIFICATION)[keyof typeof PRODUCT_REVIEW.PRODUCT_REVIEW_VERIFICATION];
export type ProductReviewRating =
  (typeof PRODUCT_REVIEW.PRODUCT_REVIEW_RATING)[keyof typeof PRODUCT_REVIEW.PRODUCT_REVIEW_RATING];
export type ProductReviewFilter =
  (typeof PRODUCT_REVIEW.PRODUCT_REVIEW_FILTER)[keyof typeof PRODUCT_REVIEW.PRODUCT_REVIEW_FILTER];
export type ProductReviewSort =
  (typeof PRODUCT_REVIEW.PRODUCT_REVIEW_SORT)[keyof typeof PRODUCT_REVIEW.PRODUCT_REVIEW_SORT];

export const PRODUCT_REVIEW_STATUS_LABELS: Record<ProductReviewStatus, string> = {
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.PENDING]: 'Pending',
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.APPROVED]: 'Approved',
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.REJECTED]: 'Rejected',
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.FLAGGED]: 'Flagged',
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.REMOVED]: 'Removed',
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.SPAM]: 'Spam',
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.HIDDEN]: 'Hidden',
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.HELPFUL]: 'Helpful',
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.UNHELPFUL]: 'Unhelpful',
};

export const PRODUCT_REVIEW_STATUS_COLORS: Record<ProductReviewStatus, string> = {
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.PENDING]: '#eab308',
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.APPROVED]: '#22c55e',
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.REJECTED]: '#ef4444',
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.FLAGGED]: '#f59e0b',
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.REMOVED]: '#dc2626',
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.SPAM]: '#6b7280',
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.HIDDEN]: '#6b7280',
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.HELPFUL]: '#22c55e',
  [PRODUCT_REVIEW.PRODUCT_REVIEW_STATUS.UNHELPFUL]: '#ef4444',
};
