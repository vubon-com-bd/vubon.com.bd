export const REVIEW_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SPAM: 'spam',
  DELETED: 'deleted',
} as const;

export const REVIEW_RATING = {
  MIN: 1,
  MAX: 5,
  DEFAULT: 5,
} as const;

export const REVIEW = {
  TITLE_MAX_LENGTH: 150,
  COMMENT_MIN_LENGTH: 10,
  COMMENT_MAX_LENGTH: 2000,
  MAX_IMAGES: 5,
  IMAGE_MAX_SIZE_MB: 5,
  EDIT_WINDOW_HOURS: 24,
  VERIFIED_PURCHASE_REQUIRED: false,
  AUTO_APPROVE: false,
} as const;

export type ReviewStatusType = (typeof REVIEW_STATUS)[keyof typeof REVIEW_STATUS];
