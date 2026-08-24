/**
 * Vendor Report Status Constants
 * Status definitions for vendor reports
 */

export const VENDOR_REPORT_STATUS = {
  // Status Types
  TYPES: {
    PENDING: 'pending',
    GENERATING: 'generating',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  } as const,

  // Status Categories
  CATEGORIES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    PENDING: '#yellow-500',
    GENERATING: '#blue-500',
    COMPLETED: '#green-500',
    FAILED: '#red-500',
    CANCELLED: '#gray-500',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    PENDING: '⏳',
    GENERATING: '🔄',
    COMPLETED: '✅',
    FAILED: '❌',
    CANCELLED: '🚫',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    PENDING_TO_GENERATING: 'pending_to_generating',
    PENDING_TO_CANCELLED: 'pending_to_cancelled',
    GENERATING_TO_COMPLETED: 'generating_to_completed',
    GENERATING_TO_FAILED: 'generating_to_failed',
    GENERATING_TO_CANCELLED: 'generating_to_cancelled',
    COMPLETED_TO_CANCELLED: 'completed_to_cancelled',
    FAILED_TO_PENDING: 'failed_to_pending',
    CANCELLED_TO_PENDING: 'cancelled_to_pending',
  } as const,
} as const;

// Status Types
export type VendorReportStatusType =
  (typeof VENDOR_REPORT_STATUS.TYPES)[keyof typeof VENDOR_REPORT_STATUS.TYPES];

// Status Categories
export type VendorReportStatusCategory =
  (typeof VENDOR_REPORT_STATUS.CATEGORIES)[keyof typeof VENDOR_REPORT_STATUS.CATEGORIES];

// Status Colors
export type VendorReportStatusColor =
  (typeof VENDOR_REPORT_STATUS.COLORS)[keyof typeof VENDOR_REPORT_STATUS.COLORS];

// Status Icons
export type VendorReportStatusIcon =
  (typeof VENDOR_REPORT_STATUS.ICONS)[keyof typeof VENDOR_REPORT_STATUS.ICONS];

// Status Transitions
export type VendorReportStatusTransition =
  (typeof VENDOR_REPORT_STATUS.TRANSITIONS)[keyof typeof VENDOR_REPORT_STATUS.TRANSITIONS];

// Utility Functions
export function vendorReportStatusGetLabel(status: VendorReportStatusType): string {
  const labels: Record<VendorReportStatusType, string> = {
    [VENDOR_REPORT_STATUS.TYPES.PENDING]: 'Pending',
    [VENDOR_REPORT_STATUS.TYPES.GENERATING]: 'Generating',
    [VENDOR_REPORT_STATUS.TYPES.COMPLETED]: 'Completed',
    [VENDOR_REPORT_STATUS.TYPES.FAILED]: 'Failed',
    [VENDOR_REPORT_STATUS.TYPES.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown';
}

export function vendorReportStatusIsCompleted(status: VendorReportStatusType): boolean {
  return status === VENDOR_REPORT_STATUS.TYPES.COMPLETED;
}

export function vendorReportStatusIsPending(status: VendorReportStatusType): boolean {
  return (
    status === VENDOR_REPORT_STATUS.TYPES.PENDING ||
    status === VENDOR_REPORT_STATUS.TYPES.GENERATING
  );
}

export function vendorReportStatusIsFailed(status: VendorReportStatusType): boolean {
  return status === VENDOR_REPORT_STATUS.TYPES.FAILED;
}

export function vendorReportStatusGetCategory(
  status: VendorReportStatusType
): VendorReportStatusCategory {
  const categories: Record<VendorReportStatusType, VendorReportStatusCategory> = {
    [VENDOR_REPORT_STATUS.TYPES.PENDING]: VENDOR_REPORT_STATUS.CATEGORIES.PENDING,
    [VENDOR_REPORT_STATUS.TYPES.GENERATING]: VENDOR_REPORT_STATUS.CATEGORIES.PROCESSING,
    [VENDOR_REPORT_STATUS.TYPES.COMPLETED]: VENDOR_REPORT_STATUS.CATEGORIES.COMPLETED,
    [VENDOR_REPORT_STATUS.TYPES.FAILED]: VENDOR_REPORT_STATUS.CATEGORIES.FAILED,
    [VENDOR_REPORT_STATUS.TYPES.CANCELLED]: VENDOR_REPORT_STATUS.CATEGORIES.FAILED,
  };
  return categories[status] || VENDOR_REPORT_STATUS.CATEGORIES.PENDING;
}

export function vendorReportStatusCanTransition(
  status: VendorReportStatusType,
  transition: VendorReportStatusTransition
): boolean {
  const allowedTransitions: Record<VendorReportStatusType, VendorReportStatusTransition[]> = {
    [VENDOR_REPORT_STATUS.TYPES.PENDING]: [
      VENDOR_REPORT_STATUS.TRANSITIONS.PENDING_TO_GENERATING,
      VENDOR_REPORT_STATUS.TRANSITIONS.PENDING_TO_CANCELLED,
    ],
    [VENDOR_REPORT_STATUS.TYPES.GENERATING]: [
      VENDOR_REPORT_STATUS.TRANSITIONS.GENERATING_TO_COMPLETED,
      VENDOR_REPORT_STATUS.TRANSITIONS.GENERATING_TO_FAILED,
      VENDOR_REPORT_STATUS.TRANSITIONS.GENERATING_TO_CANCELLED,
    ],
    [VENDOR_REPORT_STATUS.TYPES.COMPLETED]: [
      VENDOR_REPORT_STATUS.TRANSITIONS.COMPLETED_TO_CANCELLED,
    ],
    [VENDOR_REPORT_STATUS.TYPES.FAILED]: [VENDOR_REPORT_STATUS.TRANSITIONS.FAILED_TO_PENDING],
    [VENDOR_REPORT_STATUS.TYPES.CANCELLED]: [VENDOR_REPORT_STATUS.TRANSITIONS.CANCELLED_TO_PENDING],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
