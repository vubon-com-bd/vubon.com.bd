/**
 * Vendor Document Status Constants
 * Status definitions for vendor documents
 */

export const VENDOR_DOCUMENT_STATUS = {
  // Status Types
  TYPES: {
    PENDING: 'pending',
    UPLOADED: 'uploaded',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
    REQUIRES_UPDATE: 'requires_update',
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
    UPLOADED: '#blue-500',
    VERIFIED: '#green-500',
    REJECTED: '#red-500',
    EXPIRED: '#gray-500',
    REQUIRES_UPDATE: '#orange-500',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    PENDING: '⏳',
    UPLOADED: '📤',
    VERIFIED: '✅',
    REJECTED: '❌',
    EXPIRED: '⌛',
    REQUIRES_UPDATE: '🔄',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    PENDING_TO_UPLOADED: 'pending_to_uploaded',
    UPLOADED_TO_VERIFIED: 'uploaded_to_verified',
    UPLOADED_TO_REJECTED: 'uploaded_to_rejected',
    UPLOADED_TO_REQUIRES_UPDATE: 'uploaded_to_requires_update',
    VERIFIED_TO_EXPIRED: 'verified_to_expired',
    REJECTED_TO_PENDING: 'rejected_to_pending',
    REQUIRES_UPDATE_TO_PENDING: 'requires_update_to_pending',
    REQUIRES_UPDATE_TO_UPLOADED: 'requires_update_to_uploaded',
    EXPIRED_TO_PENDING: 'expired_to_pending',
    VERIFIED_TO_REQUIRES_UPDATE: 'verified_to_requires_update',
  } as const,
} as const;

// Status Types
export type VendorDocumentStatusType =
  (typeof VENDOR_DOCUMENT_STATUS.TYPES)[keyof typeof VENDOR_DOCUMENT_STATUS.TYPES];

// Status Categories
export type VendorDocumentStatusCategory =
  (typeof VENDOR_DOCUMENT_STATUS.CATEGORIES)[keyof typeof VENDOR_DOCUMENT_STATUS.CATEGORIES];

// Status Colors
export type VendorDocumentStatusColor =
  (typeof VENDOR_DOCUMENT_STATUS.COLORS)[keyof typeof VENDOR_DOCUMENT_STATUS.COLORS];

// Status Icons
export type VendorDocumentStatusIcon =
  (typeof VENDOR_DOCUMENT_STATUS.ICONS)[keyof typeof VENDOR_DOCUMENT_STATUS.ICONS];

// Status Transitions
export type VendorDocumentStatusTransition =
  (typeof VENDOR_DOCUMENT_STATUS.TRANSITIONS)[keyof typeof VENDOR_DOCUMENT_STATUS.TRANSITIONS];

// Utility Functions
export function vendorDocumentStatusGetLabel(status: VendorDocumentStatusType): string {
  const labels: Record<VendorDocumentStatusType, string> = {
    [VENDOR_DOCUMENT_STATUS.TYPES.PENDING]: 'Pending',
    [VENDOR_DOCUMENT_STATUS.TYPES.UPLOADED]: 'Uploaded',
    [VENDOR_DOCUMENT_STATUS.TYPES.VERIFIED]: 'Verified',
    [VENDOR_DOCUMENT_STATUS.TYPES.REJECTED]: 'Rejected',
    [VENDOR_DOCUMENT_STATUS.TYPES.EXPIRED]: 'Expired',
    [VENDOR_DOCUMENT_STATUS.TYPES.REQUIRES_UPDATE]: 'Requires Update',
  };
  return labels[status] || 'Unknown';
}

export function vendorDocumentStatusIsVerified(status: VendorDocumentStatusType): boolean {
  return status === VENDOR_DOCUMENT_STATUS.TYPES.VERIFIED;
}

export function vendorDocumentStatusIsPending(status: VendorDocumentStatusType): boolean {
  return (
    status === VENDOR_DOCUMENT_STATUS.TYPES.PENDING ||
    status === VENDOR_DOCUMENT_STATUS.TYPES.UPLOADED
  );
}

export function vendorDocumentStatusIsRejected(status: VendorDocumentStatusType): boolean {
  return status === VENDOR_DOCUMENT_STATUS.TYPES.REJECTED;
}

export function vendorDocumentStatusIsExpired(status: VendorDocumentStatusType): boolean {
  return status === VENDOR_DOCUMENT_STATUS.TYPES.EXPIRED;
}

export function vendorDocumentStatusGetCategory(
  status: VendorDocumentStatusType
): VendorDocumentStatusCategory {
  const categories: Record<VendorDocumentStatusType, VendorDocumentStatusCategory> = {
    [VENDOR_DOCUMENT_STATUS.TYPES.PENDING]: VENDOR_DOCUMENT_STATUS.CATEGORIES.PENDING,
    [VENDOR_DOCUMENT_STATUS.TYPES.UPLOADED]: VENDOR_DOCUMENT_STATUS.CATEGORIES.ACTIVE,
    [VENDOR_DOCUMENT_STATUS.TYPES.VERIFIED]: VENDOR_DOCUMENT_STATUS.CATEGORIES.COMPLETED,
    [VENDOR_DOCUMENT_STATUS.TYPES.REJECTED]: VENDOR_DOCUMENT_STATUS.CATEGORIES.FAILED,
    [VENDOR_DOCUMENT_STATUS.TYPES.EXPIRED]: VENDOR_DOCUMENT_STATUS.CATEGORIES.FAILED,
    [VENDOR_DOCUMENT_STATUS.TYPES.REQUIRES_UPDATE]: VENDOR_DOCUMENT_STATUS.CATEGORIES.PENDING,
  };
  return categories[status] || VENDOR_DOCUMENT_STATUS.CATEGORIES.PENDING;
}

export function vendorDocumentStatusCanTransition(
  status: VendorDocumentStatusType,
  transition: VendorDocumentStatusTransition
): boolean {
  const allowedTransitions: Record<VendorDocumentStatusType, VendorDocumentStatusTransition[]> = {
    [VENDOR_DOCUMENT_STATUS.TYPES.PENDING]: [
      VENDOR_DOCUMENT_STATUS.TRANSITIONS.PENDING_TO_UPLOADED,
    ],
    [VENDOR_DOCUMENT_STATUS.TYPES.UPLOADED]: [
      VENDOR_DOCUMENT_STATUS.TRANSITIONS.UPLOADED_TO_VERIFIED,
      VENDOR_DOCUMENT_STATUS.TRANSITIONS.UPLOADED_TO_REJECTED,
      VENDOR_DOCUMENT_STATUS.TRANSITIONS.UPLOADED_TO_REQUIRES_UPDATE,
    ],
    [VENDOR_DOCUMENT_STATUS.TYPES.VERIFIED]: [
      VENDOR_DOCUMENT_STATUS.TRANSITIONS.VERIFIED_TO_EXPIRED,
      VENDOR_DOCUMENT_STATUS.TRANSITIONS.VERIFIED_TO_REQUIRES_UPDATE,
    ],
    [VENDOR_DOCUMENT_STATUS.TYPES.REJECTED]: [
      VENDOR_DOCUMENT_STATUS.TRANSITIONS.REJECTED_TO_PENDING,
    ],
    [VENDOR_DOCUMENT_STATUS.TYPES.REQUIRES_UPDATE]: [
      VENDOR_DOCUMENT_STATUS.TRANSITIONS.REQUIRES_UPDATE_TO_PENDING,
      VENDOR_DOCUMENT_STATUS.TRANSITIONS.REQUIRES_UPDATE_TO_UPLOADED,
    ],
    [VENDOR_DOCUMENT_STATUS.TYPES.EXPIRED]: [VENDOR_DOCUMENT_STATUS.TRANSITIONS.EXPIRED_TO_PENDING],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
