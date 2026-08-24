/**
 * Vendor Payout Status Constants
 * Status definitions for vendor payouts
 */

export const VENDOR_PAYOUT_STATUS = {
  // Status Types
  TYPES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    ON_HOLD: 'on_hold',
    SCHEDULED: 'scheduled',
  } as const,

  // Status Categories
  CATEGORIES: {
    PENDING: 'pending',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    FAILED: 'failed',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    PENDING: '#yellow-500',
    PROCESSING: '#blue-500',
    COMPLETED: '#green-500',
    FAILED: '#red-500',
    CANCELLED: '#gray-500',
    ON_HOLD: '#orange-500',
    SCHEDULED: '#purple-500',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    PENDING: '⏳',
    PROCESSING: '🔄',
    COMPLETED: '✅',
    FAILED: '❌',
    CANCELLED: '🚫',
    ON_HOLD: '⏸️',
    SCHEDULED: '📅',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    PENDING_TO_PROCESSING: 'pending_to_processing',
    PENDING_TO_SCHEDULED: 'pending_to_scheduled',
    PENDING_TO_CANCELLED: 'pending_to_cancelled',
    PROCESSING_TO_COMPLETED: 'processing_to_completed',
    PROCESSING_TO_FAILED: 'processing_to_failed',
    PROCESSING_TO_ON_HOLD: 'processing_to_on_hold',
    SCHEDULED_TO_PROCESSING: 'scheduled_to_processing',
    SCHEDULED_TO_CANCELLED: 'scheduled_to_cancelled',
    ON_HOLD_TO_PROCESSING: 'on_hold_to_processing',
    ON_HOLD_TO_CANCELLED: 'on_hold_to_cancelled',
    FAILED_TO_PENDING: 'failed_to_pending',
    CANCELLED_TO_PENDING: 'cancelled_to_pending',
  } as const,
} as const;

// Status Types
export type VendorPayoutStatusType =
  (typeof VENDOR_PAYOUT_STATUS.TYPES)[keyof typeof VENDOR_PAYOUT_STATUS.TYPES];

// Status Categories
export type VendorPayoutStatusCategory =
  (typeof VENDOR_PAYOUT_STATUS.CATEGORIES)[keyof typeof VENDOR_PAYOUT_STATUS.CATEGORIES];

// Status Colors
export type VendorPayoutStatusColor =
  (typeof VENDOR_PAYOUT_STATUS.COLORS)[keyof typeof VENDOR_PAYOUT_STATUS.COLORS];

// Status Icons
export type VendorPayoutStatusIcon =
  (typeof VENDOR_PAYOUT_STATUS.ICONS)[keyof typeof VENDOR_PAYOUT_STATUS.ICONS];

// Status Transitions
export type VendorPayoutStatusTransition =
  (typeof VENDOR_PAYOUT_STATUS.TRANSITIONS)[keyof typeof VENDOR_PAYOUT_STATUS.TRANSITIONS];

// Utility Functions
export function vendorPayoutStatusGetLabel(status: VendorPayoutStatusType): string {
  const labels: Record<VendorPayoutStatusType, string> = {
    [VENDOR_PAYOUT_STATUS.TYPES.PENDING]: 'Pending',
    [VENDOR_PAYOUT_STATUS.TYPES.PROCESSING]: 'Processing',
    [VENDOR_PAYOUT_STATUS.TYPES.COMPLETED]: 'Completed',
    [VENDOR_PAYOUT_STATUS.TYPES.FAILED]: 'Failed',
    [VENDOR_PAYOUT_STATUS.TYPES.CANCELLED]: 'Cancelled',
    [VENDOR_PAYOUT_STATUS.TYPES.ON_HOLD]: 'On Hold',
    [VENDOR_PAYOUT_STATUS.TYPES.SCHEDULED]: 'Scheduled',
  };
  return labels[status] || 'Unknown';
}

export function vendorPayoutStatusIsCompleted(status: VendorPayoutStatusType): boolean {
  return status === VENDOR_PAYOUT_STATUS.TYPES.COMPLETED;
}

export function vendorPayoutStatusIsPending(status: VendorPayoutStatusType): boolean {
  return (
    status === VENDOR_PAYOUT_STATUS.TYPES.PENDING ||
    status === VENDOR_PAYOUT_STATUS.TYPES.PROCESSING ||
    status === VENDOR_PAYOUT_STATUS.TYPES.SCHEDULED
  );
}

export function vendorPayoutStatusIsFailed(status: VendorPayoutStatusType): boolean {
  return status === VENDOR_PAYOUT_STATUS.TYPES.FAILED;
}

export function vendorPayoutStatusGetCategory(
  status: VendorPayoutStatusType
): VendorPayoutStatusCategory {
  const categories: Record<VendorPayoutStatusType, VendorPayoutStatusCategory> = {
    [VENDOR_PAYOUT_STATUS.TYPES.PENDING]: VENDOR_PAYOUT_STATUS.CATEGORIES.PENDING,
    [VENDOR_PAYOUT_STATUS.TYPES.PROCESSING]: VENDOR_PAYOUT_STATUS.CATEGORIES.ACTIVE,
    [VENDOR_PAYOUT_STATUS.TYPES.COMPLETED]: VENDOR_PAYOUT_STATUS.CATEGORIES.COMPLETED,
    [VENDOR_PAYOUT_STATUS.TYPES.FAILED]: VENDOR_PAYOUT_STATUS.CATEGORIES.FAILED,
    [VENDOR_PAYOUT_STATUS.TYPES.CANCELLED]: VENDOR_PAYOUT_STATUS.CATEGORIES.FAILED,
    [VENDOR_PAYOUT_STATUS.TYPES.ON_HOLD]: VENDOR_PAYOUT_STATUS.CATEGORIES.PENDING,
    [VENDOR_PAYOUT_STATUS.TYPES.SCHEDULED]: VENDOR_PAYOUT_STATUS.CATEGORIES.PENDING,
  };
  return categories[status] || VENDOR_PAYOUT_STATUS.CATEGORIES.PENDING;
}

export function vendorPayoutStatusCanTransition(
  status: VendorPayoutStatusType,
  transition: VendorPayoutStatusTransition
): boolean {
  const allowedTransitions: Record<VendorPayoutStatusType, VendorPayoutStatusTransition[]> = {
    [VENDOR_PAYOUT_STATUS.TYPES.PENDING]: [
      VENDOR_PAYOUT_STATUS.TRANSITIONS.PENDING_TO_PROCESSING,
      VENDOR_PAYOUT_STATUS.TRANSITIONS.PENDING_TO_SCHEDULED,
      VENDOR_PAYOUT_STATUS.TRANSITIONS.PENDING_TO_CANCELLED,
    ],
    [VENDOR_PAYOUT_STATUS.TYPES.PROCESSING]: [
      VENDOR_PAYOUT_STATUS.TRANSITIONS.PROCESSING_TO_COMPLETED,
      VENDOR_PAYOUT_STATUS.TRANSITIONS.PROCESSING_TO_FAILED,
      VENDOR_PAYOUT_STATUS.TRANSITIONS.PROCESSING_TO_ON_HOLD,
    ],
    [VENDOR_PAYOUT_STATUS.TYPES.SCHEDULED]: [
      VENDOR_PAYOUT_STATUS.TRANSITIONS.SCHEDULED_TO_PROCESSING,
      VENDOR_PAYOUT_STATUS.TRANSITIONS.SCHEDULED_TO_CANCELLED,
    ],
    [VENDOR_PAYOUT_STATUS.TYPES.ON_HOLD]: [
      VENDOR_PAYOUT_STATUS.TRANSITIONS.ON_HOLD_TO_PROCESSING,
      VENDOR_PAYOUT_STATUS.TRANSITIONS.ON_HOLD_TO_CANCELLED,
    ],
    [VENDOR_PAYOUT_STATUS.TYPES.FAILED]: [VENDOR_PAYOUT_STATUS.TRANSITIONS.FAILED_TO_PENDING],
    [VENDOR_PAYOUT_STATUS.TYPES.CANCELLED]: [VENDOR_PAYOUT_STATUS.TRANSITIONS.CANCELLED_TO_PENDING],
    [VENDOR_PAYOUT_STATUS.TYPES.COMPLETED]: [],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
