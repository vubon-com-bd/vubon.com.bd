/**
 * Vendor Review Constants
 * Configuration for vendor reviews
 */

export const VENDOR_REVIEW = {
  // Review Types
  TYPES: {
    PRODUCT: 'product',
    SERVICE: 'service',
    DELIVERY: 'delivery',
    GENERAL: 'general',
  } as const,

  // Review Statuses
  STATUS: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    FLAGGED: 'flagged',
    HIDDEN: 'hidden',
    DELETED: 'deleted',
  } as const,

  // Review Ratings
  RATINGS: {
    MIN: 1,
    MAX: 5,
    DEFAULT: 3,
  } as const,

  // Review Categories
  CATEGORIES: {
    POSITIVE: 'positive',
    NEUTRAL: 'neutral',
    NEGATIVE: 'negative',
  } as const,

  // Review Colors (for UI)
  COLORS: {
    PENDING: '#yellow-500',
    APPROVED: '#green-500',
    REJECTED: '#red-500',
    FLAGGED: '#orange-500',
    HIDDEN: '#gray-500',
    DELETED: '#gray-600',
  } as const,

  // Review Icons (for UI)
  ICONS: {
    PENDING: '⏳',
    APPROVED: '✅',
    REJECTED: '❌',
    FLAGGED: '⚠️',
    HIDDEN: '👻',
    DELETED: '🗑️',
  } as const,

  // Review Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_CONTENT_LENGTH: 2000,
    MAX_REVIEWS_PER_DAY: 5,
    MAX_REVIEWS_PER_VENDOR: 50,
    MIN_CHARACTERS: 10,
  } as const,

  // Review Helpfulness
  HELPFULNESS: {
    HELPFUL: 'helpful',
    NOT_HELPFUL: 'not_helpful',
    REPORT: 'report',
  } as const,
} as const;

// Review Types
export type VendorReviewType = (typeof VENDOR_REVIEW.TYPES)[keyof typeof VENDOR_REVIEW.TYPES];

// Review Statuses
export type VendorReviewStatus = (typeof VENDOR_REVIEW.STATUS)[keyof typeof VENDOR_REVIEW.STATUS];

// Review Categories
export type VendorReviewCategory =
  (typeof VENDOR_REVIEW.CATEGORIES)[keyof typeof VENDOR_REVIEW.CATEGORIES];

// Review Colors
export type VendorReviewColor = (typeof VENDOR_REVIEW.COLORS)[keyof typeof VENDOR_REVIEW.COLORS];

// Review Icons
export type VendorReviewIcon = (typeof VENDOR_REVIEW.ICONS)[keyof typeof VENDOR_REVIEW.ICONS];

// Review Helpfulness
export type VendorReviewHelpfulness =
  (typeof VENDOR_REVIEW.HELPFULNESS)[keyof typeof VENDOR_REVIEW.HELPFULNESS];

// Utility Functions
export function vendorReviewGetTypeLabel(type: VendorReviewType): string {
  const labels: Record<VendorReviewType, string> = {
    [VENDOR_REVIEW.TYPES.PRODUCT]: 'Product Review',
    [VENDOR_REVIEW.TYPES.SERVICE]: 'Service Review',
    [VENDOR_REVIEW.TYPES.DELIVERY]: 'Delivery Review',
    [VENDOR_REVIEW.TYPES.GENERAL]: 'General Review',
  };
  return labels[type] || 'Unknown';
}

export function vendorReviewGetStatusLabel(status: VendorReviewStatus): string {
  const labels: Record<VendorReviewStatus, string> = {
    [VENDOR_REVIEW.STATUS.PENDING]: 'Pending',
    [VENDOR_REVIEW.STATUS.APPROVED]: 'Approved',
    [VENDOR_REVIEW.STATUS.REJECTED]: 'Rejected',
    [VENDOR_REVIEW.STATUS.FLAGGED]: 'Flagged',
    [VENDOR_REVIEW.STATUS.HIDDEN]: 'Hidden',
    [VENDOR_REVIEW.STATUS.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown';
}

export function vendorReviewIsApproved(status: VendorReviewStatus): boolean {
  return status === VENDOR_REVIEW.STATUS.APPROVED;
}

export function vendorReviewIsPending(status: VendorReviewStatus): boolean {
  return status === VENDOR_REVIEW.STATUS.PENDING || status === VENDOR_REVIEW.STATUS.FLAGGED;
}

export function vendorReviewIsVisible(status: VendorReviewStatus): boolean {
  return status === VENDOR_REVIEW.STATUS.APPROVED;
}

export function vendorReviewGetCategory(rating: number): VendorReviewCategory {
  if (rating >= 4) return VENDOR_REVIEW.CATEGORIES.POSITIVE;
  if (rating >= 3) return VENDOR_REVIEW.CATEGORIES.NEUTRAL;
  return VENDOR_REVIEW.CATEGORIES.NEGATIVE;
}

export function vendorReviewGetCategoryLabel(category: VendorReviewCategory): string {
  const labels: Record<VendorReviewCategory, string> = {
    [VENDOR_REVIEW.CATEGORIES.POSITIVE]: 'Positive',
    [VENDOR_REVIEW.CATEGORIES.NEUTRAL]: 'Neutral',
    [VENDOR_REVIEW.CATEGORIES.NEGATIVE]: 'Negative',
  };
  return labels[category] || 'Unknown';
}

export function vendorReviewIsPositive(category: VendorReviewCategory): boolean {
  return category === VENDOR_REVIEW.CATEGORIES.POSITIVE;
}

export function vendorReviewIsNegative(category: VendorReviewCategory): boolean {
  return category === VENDOR_REVIEW.CATEGORIES.NEGATIVE;
}

export function vendorReviewGetHelpfulnessLabel(helpfulness: VendorReviewHelpfulness): string {
  const labels: Record<VendorReviewHelpfulness, string> = {
    [VENDOR_REVIEW.HELPFULNESS.HELPFUL]: 'Helpful',
    [VENDOR_REVIEW.HELPFULNESS.NOT_HELPFUL]: 'Not Helpful',
    [VENDOR_REVIEW.HELPFULNESS.REPORT]: 'Report',
  };
  return labels[helpfulness] || 'Unknown';
}
