/**
 * Vendor Invoice Status Constants
 * Status definitions for vendor invoices
 */

export const VENDOR_INVOICE_STATUS = {
  // Status Types
  TYPES: {
    DRAFT: 'draft',
    PENDING: 'pending',
    APPROVED: 'approved',
    PAID: 'paid',
    OVERDUE: 'overdue',
    CANCELLED: 'cancelled',
    VOID: 'void',
  } as const,

  // Status Categories
  CATEGORIES: {
    DRAFT: 'draft',
    PENDING: 'pending',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    FAILED: 'failed',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    DRAFT: '#gray-400',
    PENDING: '#yellow-500',
    APPROVED: '#blue-500',
    PAID: '#green-500',
    OVERDUE: '#red-500',
    CANCELLED: '#gray-500',
    VOID: '#gray-600',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    DRAFT: '📝',
    PENDING: '⏳',
    APPROVED: '✅',
    PAID: '💰',
    OVERDUE: '🚨',
    CANCELLED: '🚫',
    VOID: '⛔',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    DRAFT_TO_PENDING: 'draft_to_pending',
    DRAFT_TO_CANCELLED: 'draft_to_cancelled',
    PENDING_TO_APPROVED: 'pending_to_approved',
    PENDING_TO_CANCELLED: 'pending_to_cancelled',
    APPROVED_TO_PAID: 'approved_to_paid',
    APPROVED_TO_OVERDUE: 'approved_to_overdue',
    APPROVED_TO_CANCELLED: 'approved_to_cancelled',
    PAID_TO_VOID: 'paid_to_void',
    OVERDUE_TO_PAID: 'overdue_to_paid',
    OVERDUE_TO_CANCELLED: 'overdue_to_cancelled',
    CANCELLED_TO_PENDING: 'cancelled_to_pending',
    VOID_TO_PAID: 'void_to_paid',
  } as const,
} as const;

// Status Types
export type VendorInvoiceStatusType =
  (typeof VENDOR_INVOICE_STATUS.TYPES)[keyof typeof VENDOR_INVOICE_STATUS.TYPES];

// Status Categories
export type VendorInvoiceStatusCategory =
  (typeof VENDOR_INVOICE_STATUS.CATEGORIES)[keyof typeof VENDOR_INVOICE_STATUS.CATEGORIES];

// Status Colors
export type VendorInvoiceStatusColor =
  (typeof VENDOR_INVOICE_STATUS.COLORS)[keyof typeof VENDOR_INVOICE_STATUS.COLORS];

// Status Icons
export type VendorInvoiceStatusIcon =
  (typeof VENDOR_INVOICE_STATUS.ICONS)[keyof typeof VENDOR_INVOICE_STATUS.ICONS];

// Status Transitions
export type VendorInvoiceStatusTransition =
  (typeof VENDOR_INVOICE_STATUS.TRANSITIONS)[keyof typeof VENDOR_INVOICE_STATUS.TRANSITIONS];

// Utility Functions
export function vendorInvoiceStatusGetLabel(status: VendorInvoiceStatusType): string {
  const labels: Record<VendorInvoiceStatusType, string> = {
    [VENDOR_INVOICE_STATUS.TYPES.DRAFT]: 'Draft',
    [VENDOR_INVOICE_STATUS.TYPES.PENDING]: 'Pending',
    [VENDOR_INVOICE_STATUS.TYPES.APPROVED]: 'Approved',
    [VENDOR_INVOICE_STATUS.TYPES.PAID]: 'Paid',
    [VENDOR_INVOICE_STATUS.TYPES.OVERDUE]: 'Overdue',
    [VENDOR_INVOICE_STATUS.TYPES.CANCELLED]: 'Cancelled',
    [VENDOR_INVOICE_STATUS.TYPES.VOID]: 'Void',
  };
  return labels[status] || 'Unknown';
}

export function vendorInvoiceStatusIsPaid(status: VendorInvoiceStatusType): boolean {
  return status === VENDOR_INVOICE_STATUS.TYPES.PAID;
}

export function vendorInvoiceStatusIsPending(status: VendorInvoiceStatusType): boolean {
  return (
    status === VENDOR_INVOICE_STATUS.TYPES.PENDING ||
    status === VENDOR_INVOICE_STATUS.TYPES.APPROVED
  );
}

export function vendorInvoiceStatusIsOverdue(status: VendorInvoiceStatusType): boolean {
  return status === VENDOR_INVOICE_STATUS.TYPES.OVERDUE;
}

export function vendorInvoiceStatusIsDraft(status: VendorInvoiceStatusType): boolean {
  return status === VENDOR_INVOICE_STATUS.TYPES.DRAFT;
}

export function vendorInvoiceStatusGetCategory(
  status: VendorInvoiceStatusType
): VendorInvoiceStatusCategory {
  const categories: Record<VendorInvoiceStatusType, VendorInvoiceStatusCategory> = {
    [VENDOR_INVOICE_STATUS.TYPES.DRAFT]: VENDOR_INVOICE_STATUS.CATEGORIES.DRAFT,
    [VENDOR_INVOICE_STATUS.TYPES.PENDING]: VENDOR_INVOICE_STATUS.CATEGORIES.PENDING,
    [VENDOR_INVOICE_STATUS.TYPES.APPROVED]: VENDOR_INVOICE_STATUS.CATEGORIES.ACTIVE,
    [VENDOR_INVOICE_STATUS.TYPES.PAID]: VENDOR_INVOICE_STATUS.CATEGORIES.COMPLETED,
    [VENDOR_INVOICE_STATUS.TYPES.OVERDUE]: VENDOR_INVOICE_STATUS.CATEGORIES.ACTIVE,
    [VENDOR_INVOICE_STATUS.TYPES.CANCELLED]: VENDOR_INVOICE_STATUS.CATEGORIES.FAILED,
    [VENDOR_INVOICE_STATUS.TYPES.VOID]: VENDOR_INVOICE_STATUS.CATEGORIES.FAILED,
  };
  return categories[status] || VENDOR_INVOICE_STATUS.CATEGORIES.PENDING;
}

export function vendorInvoiceStatusCanTransition(
  status: VendorInvoiceStatusType,
  transition: VendorInvoiceStatusTransition
): boolean {
  const allowedTransitions: Record<VendorInvoiceStatusType, VendorInvoiceStatusTransition[]> = {
    [VENDOR_INVOICE_STATUS.TYPES.DRAFT]: [
      VENDOR_INVOICE_STATUS.TRANSITIONS.DRAFT_TO_PENDING,
      VENDOR_INVOICE_STATUS.TRANSITIONS.DRAFT_TO_CANCELLED,
    ],
    [VENDOR_INVOICE_STATUS.TYPES.PENDING]: [
      VENDOR_INVOICE_STATUS.TRANSITIONS.PENDING_TO_APPROVED,
      VENDOR_INVOICE_STATUS.TRANSITIONS.PENDING_TO_CANCELLED,
    ],
    [VENDOR_INVOICE_STATUS.TYPES.APPROVED]: [
      VENDOR_INVOICE_STATUS.TRANSITIONS.APPROVED_TO_PAID,
      VENDOR_INVOICE_STATUS.TRANSITIONS.APPROVED_TO_OVERDUE,
      VENDOR_INVOICE_STATUS.TRANSITIONS.APPROVED_TO_CANCELLED,
    ],
    [VENDOR_INVOICE_STATUS.TYPES.PAID]: [VENDOR_INVOICE_STATUS.TRANSITIONS.PAID_TO_VOID],
    [VENDOR_INVOICE_STATUS.TYPES.OVERDUE]: [
      VENDOR_INVOICE_STATUS.TRANSITIONS.OVERDUE_TO_PAID,
      VENDOR_INVOICE_STATUS.TRANSITIONS.OVERDUE_TO_CANCELLED,
    ],
    [VENDOR_INVOICE_STATUS.TYPES.CANCELLED]: [
      VENDOR_INVOICE_STATUS.TRANSITIONS.CANCELLED_TO_PENDING,
    ],
    [VENDOR_INVOICE_STATUS.TYPES.VOID]: [VENDOR_INVOICE_STATUS.TRANSITIONS.VOID_TO_PAID],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
