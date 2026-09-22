export const VENDOR_REVIEW_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  FLAGGED: 'flagged',
  HIDDEN: 'hidden',
} as const;

export const VENDOR_REVIEW_CATEGORY = {
  PRODUCT_QUALITY: 'product_quality',
  SHIPPING_SPEED: 'shipping_speed',
  CUSTOMER_SERVICE: 'customer_service',
  PRICING: 'pricing',
  OVERALL: 'overall',
} as const;

export const VENDOR_REVIEW = {
  MIN_RATING: 1,
  MAX_RATING: 5,
  MIN_CONTENT_LENGTH: 10,
  MAX_CONTENT_LENGTH: 5000,
  FLAG_THRESHOLD: 3,
} as const;

export type VendorReviewStatusType =
  (typeof VENDOR_REVIEW_STATUS)[keyof typeof VENDOR_REVIEW_STATUS];

export type VendorReviewCategoryType =
  (typeof VENDOR_REVIEW_CATEGORY)[keyof typeof VENDOR_REVIEW_CATEGORY];
