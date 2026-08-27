/**
 * Flash Sale Price Status Constants
 * Status-specific constants for flash sale pricing
 * @module FlashSalePriceStatusConstants
 */

/**
 * Flash sale price status
 */
export const FLASH_SALE_PRICE_STATUS = {
  ACTIVE: 'ACTIVE',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
  ARCHIVED: 'ARCHIVED',
} as const;

/**
 * Flash sale price status labels (detailed)
 */
export const FLASH_SALE_PRICE_STATUS_LABELS_DETAIL = {
  ACTIVE: 'Active',
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  EXPIRED: 'Expired',
  CANCELLED: 'Cancelled',
  ARCHIVED: 'Archived',
} as const;

/**
 * Flash sale price status colors (detailed)
 */
export const FLASH_SALE_PRICE_STATUS_COLORS_DETAIL = {
  ACTIVE: '#34D399',
  PENDING: '#FBBF24',
  APPROVED: '#60A5FA',
  REJECTED: '#F87171',
  EXPIRED: '#F59E0B',
  CANCELLED: '#9CA3AF',
  ARCHIVED: '#6B7280',
} as const;

/**
 * Flash sale price status categories
 */
export const FLASH_SALE_PRICE_STATUS_CATEGORIES = {
  ACTIVE: 'Active',
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  EXPIRED: 'Expired',
  CANCELLED: 'Cancelled',
  ARCHIVED: 'Archived',
} as const;

/**
 * Flash sale price status groups
 */
export const FLASH_SALE_PRICE_STATUS_GROUPS = {
  ACTIVE: ['ACTIVE', 'APPROVED'],
  PENDING: ['PENDING'],
  TERMINAL: ['REJECTED', 'EXPIRED', 'CANCELLED', 'ARCHIVED'],
  VALID: ['ACTIVE', 'APPROVED'],
  INVALID: ['REJECTED', 'EXPIRED', 'CANCELLED', 'ARCHIVED'],
} as const;

// ============================================================
// Types
// ============================================================

/**
 * Flash sale price status type
 */
export type FlashSalePriceStatusType = keyof typeof FLASH_SALE_PRICE_STATUS;

/**
 * Flash sale price status category
 */
export type FlashSalePriceStatusCategory = keyof typeof FLASH_SALE_PRICE_STATUS_CATEGORIES;

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get price status label (detailed)
 */
export const getFlashSalePriceStatusLabelDetail = (status: FlashSalePriceStatusType): string =>
  FLASH_SALE_PRICE_STATUS_LABELS_DETAIL[status] || status;

/**
 * Get price status color (detailed)
 */
export const getFlashSalePriceStatusColorDetail = (status: FlashSalePriceStatusType): string =>
  FLASH_SALE_PRICE_STATUS_COLORS_DETAIL[status] || '#6B7280';

/**
 * Get price status category
 */
export const getFlashSalePriceStatusCategory = (status: FlashSalePriceStatusType): string =>
  FLASH_SALE_PRICE_STATUS_CATEGORIES[status] || 'Unknown';

/**
 * Check if price status is active
 */
export const isFlashSalePriceActiveStatus = (status: FlashSalePriceStatusType): boolean =>
  status === 'ACTIVE' || status === 'APPROVED';

/**
 * Check if price status is pending
 */
export const isFlashSalePricePendingStatus = (status: FlashSalePriceStatusType): boolean =>
  status === 'PENDING';

/**
 * Check if price status is approved
 */
export const isFlashSalePriceApprovedStatus = (status: FlashSalePriceStatusType): boolean =>
  status === 'APPROVED';

/**
 * Check if price status is rejected
 */
export const isFlashSalePriceRejectedStatus = (status: FlashSalePriceStatusType): boolean =>
  status === 'REJECTED';

/**
 * Check if price status is expired
 */
export const isFlashSalePriceExpiredStatus = (status: FlashSalePriceStatusType): boolean =>
  status === 'EXPIRED';

/**
 * Check if price status is terminal (final state)
 */
export const isFlashSalePriceTerminalStatus = (status: FlashSalePriceStatusType): boolean =>
  status === 'REJECTED' || status === 'EXPIRED' || status === 'CANCELLED' || status === 'ARCHIVED';

/**
 * Check if price status is valid (can be used)
 */
export const isFlashSalePriceValidStatus = (status: FlashSalePriceStatusType): boolean =>
  status === 'ACTIVE' || status === 'APPROVED';

/**
 * Check if price status can transition to target
 */
export const isFlashSalePriceCanTransition = (
  from: FlashSalePriceStatusType,
  to: FlashSalePriceStatusType
): boolean => {
  const transitions: Record<FlashSalePriceStatusType, FlashSalePriceStatusType[]> = {
    PENDING: ['APPROVED', 'REJECTED', 'CANCELLED'],
    APPROVED: ['ACTIVE', 'CANCELLED', 'ARCHIVED'],
    ACTIVE: ['EXPIRED', 'CANCELLED', 'ARCHIVED'],
    REJECTED: ['PENDING', 'ARCHIVED'],
    EXPIRED: ['ARCHIVED'],
    CANCELLED: ['ARCHIVED'],
    ARCHIVED: [],
  };
  return transitions[from]?.includes(to) || false;
};

/**
 * Get available transitions for status
 */
export const getFlashSalePriceAvailableTransitions = (
  status: FlashSalePriceStatusType
): FlashSalePriceStatusType[] => {
  const transitions: Record<FlashSalePriceStatusType, FlashSalePriceStatusType[]> = {
    PENDING: ['APPROVED', 'REJECTED', 'CANCELLED'],
    APPROVED: ['ACTIVE', 'CANCELLED', 'ARCHIVED'],
    ACTIVE: ['EXPIRED', 'CANCELLED', 'ARCHIVED'],
    REJECTED: ['PENDING', 'ARCHIVED'],
    EXPIRED: ['ARCHIVED'],
    CANCELLED: ['ARCHIVED'],
    ARCHIVED: [],
  };
  return transitions[status] || [];
};

/**
 * Get price status priority (for ordering)
 */
export const getFlashSalePriceStatusPriority = (status: FlashSalePriceStatusType): number => {
  const priorities = {
    ACTIVE: 0,
    APPROVED: 1,
    PENDING: 2,
    REJECTED: 3,
    EXPIRED: 4,
    CANCELLED: 5,
    ARCHIVED: 6,
  };
  return priorities[status] ?? 9;
};

/**
 * Get price status badge type
 */
export const getFlashSalePriceStatusBadgeType = (status: FlashSalePriceStatusType): string => {
  const badgeTypes = {
    ACTIVE: 'success',
    APPROVED: 'info',
    PENDING: 'warning',
    REJECTED: 'error',
    EXPIRED: 'warning',
    CANCELLED: 'secondary',
    ARCHIVED: 'secondary',
  };
  return badgeTypes[status] || 'secondary';
};
