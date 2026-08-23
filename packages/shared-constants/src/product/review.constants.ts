/**
 * Review Constants
 * Review configuration and settings
 */

export const PRODUCTREVIEW = {
  // Review Statuses
  STATUSES: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    FLAGGED: 'flagged',
    DELETED: 'deleted',
    SPAM: 'spam',
    HELPFUL: 'helpful',
    NOT_HELPFUL: 'not_helpful',
    REPORTED: 'reported',
    RESOLVED: 'resolved',
  } as const,

  // Review Types
  TYPES: {
    PRODUCT: 'product',
    SERVICE: 'service',
    VENDOR: 'vendor',
    SHIPPING: 'shipping',
    OVERALL: 'overall',
    CUSTOM: 'custom',
  } as const,

  // Review Ratings
  RATINGS: {
    ONE_STAR: 1,
    TWO_STARS: 2,
    THREE_STARS: 3,
    FOUR_STARS: 4,
    FIVE_STARS: 5,
  } as const,

  // Review Verification
  VERIFICATION: {
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    PENDING: 'pending',
  } as const,

  // Review Defaults
  DEFAULTS: {
    DEFAULT_STATUS: 'pending',
    DEFAULT_TYPE: 'product',
    DEFAULT_RATING: 5,
    DEFAULT_VERIFICATION: 'unverified',
    MAX_IMAGES: 5,
    MAX_RATINGS: 5,
    MIN_RATINGS: 1,
    DEFAULT_HELPFUL_COUNT: 0,
    DEFAULT_NOT_HELPFUL_COUNT: 0,
    DEFAULT_FLAG_COUNT: 0,
    DEFAULT_REPORT_COUNT: 0,
  } as const,

  // Review Limits
  LIMITS: {
    MIN_TITLE_LENGTH: 3,
    MAX_TITLE_LENGTH: 100,
    MIN_COMMENT_LENGTH: 5,
    MAX_COMMENT_LENGTH: 5000,
    MAX_IMAGES: 5,
    MAX_VIDEOS: 1,
    MAX_RATINGS: 5,
    MIN_RATINGS: 1,
    MAX_REVIEWS_PER_USER: 10,
    MAX_REVIEWS_PER_PRODUCT: 10000,
    MAX_FLAG_COUNT: 100,
    MAX_REPORT_COUNT: 50,
  } as const,
} as const;

// Review Statuses
export type ProductReviewStatus =
  (typeof PRODUCTREVIEW.STATUSES)[keyof typeof PRODUCTREVIEW.STATUSES];

// Review Types
export type ProductReviewType = (typeof PRODUCTREVIEW.TYPES)[keyof typeof PRODUCTREVIEW.TYPES];

// Review Ratings
export type ProductReviewRating =
  (typeof PRODUCTREVIEW.RATINGS)[keyof typeof PRODUCTREVIEW.RATINGS];

// Review Verification
export type ProductReviewVerification =
  (typeof PRODUCTREVIEW.VERIFICATION)[keyof typeof PRODUCTREVIEW.VERIFICATION];

// Review Defaults
export type ProductReviewDefault =
  (typeof PRODUCTREVIEW.DEFAULTS)[keyof typeof PRODUCTREVIEW.DEFAULTS];

// Review Limits
export type ProductReviewLimit = (typeof PRODUCTREVIEW.LIMITS)[keyof typeof PRODUCTREVIEW.LIMITS];

// Utility Functions
export function productreviewGetStatusLabel(status: ProductReviewStatus): string {
  const labels: Record<ProductReviewStatus, string> = {
    [PRODUCTREVIEW.STATUSES.PENDING]: 'Pending',
    [PRODUCTREVIEW.STATUSES.APPROVED]: 'Approved',
    [PRODUCTREVIEW.STATUSES.REJECTED]: 'Rejected',
    [PRODUCTREVIEW.STATUSES.FLAGGED]: 'Flagged',
    [PRODUCTREVIEW.STATUSES.DELETED]: 'Deleted',
    [PRODUCTREVIEW.STATUSES.SPAM]: 'Spam',
    [PRODUCTREVIEW.STATUSES.HELPFUL]: 'Helpful',
    [PRODUCTREVIEW.STATUSES.NOT_HELPFUL]: 'Not Helpful',
    [PRODUCTREVIEW.STATUSES.REPORTED]: 'Reported',
    [PRODUCTREVIEW.STATUSES.RESOLVED]: 'Resolved',
  };
  return labels[status] || 'Unknown Status';
}

export function productreviewGetTypeLabel(type: ProductReviewType): string {
  const labels: Record<ProductReviewType, string> = {
    [PRODUCTREVIEW.TYPES.PRODUCT]: 'Product',
    [PRODUCTREVIEW.TYPES.SERVICE]: 'Service',
    [PRODUCTREVIEW.TYPES.VENDOR]: 'Vendor',
    [PRODUCTREVIEW.TYPES.SHIPPING]: 'Shipping',
    [PRODUCTREVIEW.TYPES.OVERALL]: 'Overall',
    [PRODUCTREVIEW.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Review Type';
}

export function productreviewGetRatingLabel(rating: ProductReviewRating): string {
  const labels: Record<ProductReviewRating, string> = {
    [PRODUCTREVIEW.RATINGS.ONE_STAR]: '1 Star',
    [PRODUCTREVIEW.RATINGS.TWO_STARS]: '2 Stars',
    [PRODUCTREVIEW.RATINGS.THREE_STARS]: '3 Stars',
    [PRODUCTREVIEW.RATINGS.FOUR_STARS]: '4 Stars',
    [PRODUCTREVIEW.RATINGS.FIVE_STARS]: '5 Stars',
  };
  return labels[rating] || 'Unknown Rating';
}

export function productreviewGetVerificationLabel(verification: ProductReviewVerification): string {
  const labels: Record<ProductReviewVerification, string> = {
    [PRODUCTREVIEW.VERIFICATION.VERIFIED]: 'Verified',
    [PRODUCTREVIEW.VERIFICATION.UNVERIFIED]: 'Unverified',
    [PRODUCTREVIEW.VERIFICATION.PENDING]: 'Pending',
  };
  return labels[verification] || 'Unknown Verification';
}

export function productreviewIsApproved(status: ProductReviewStatus): boolean {
  return status === PRODUCTREVIEW.STATUSES.APPROVED;
}

export function productreviewIsPending(status: ProductReviewStatus): boolean {
  return status === PRODUCTREVIEW.STATUSES.PENDING;
}

export function productreviewIsRejected(status: ProductReviewStatus): boolean {
  return status === PRODUCTREVIEW.STATUSES.REJECTED;
}

export function productreviewIsVerified(verification: ProductReviewVerification): boolean {
  return verification === PRODUCTREVIEW.VERIFICATION.VERIFIED;
}

export function productreviewGetDefaultRating(): number {
  return PRODUCTREVIEW.DEFAULTS.DEFAULT_RATING;
}

export function productreviewGetMaxImages(): number {
  return PRODUCTREVIEW.DEFAULTS.MAX_IMAGES;
}
