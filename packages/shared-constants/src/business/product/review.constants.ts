/**
 * Product Review Constants (EXTENDS common/status + common/types)
 * @module shared-constants/business/product/review.constants
 */

import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { VERIFICATION } from '../../common/verification.constants';
import { PERMISSIONS } from '../../common/permissions.constants';

export const PRODUCT_REVIEW = {
  // Base status from common
  STATUS: STATUS,

  // Types from common
  TYPES: TYPES,

  // Verification from common
  VERIFICATION: VERIFICATION,

  // Permissions from common
  PERMISSIONS: PERMISSIONS,

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

  // Review validation
  PRODUCT_REVIEW_VALIDATION: {
    REQUIRES_RATING: true,
    REQUIRES_COMMENT: false,
    REQUIRES_VERIFICATION: false,
    ALLOW_ANONYMOUS: false,
    MAX_IMAGES: 5,
    MAX_VIDEOS: 2,
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
