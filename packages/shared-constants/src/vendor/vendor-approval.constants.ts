/**
 * Vendor Approval Constants
 * Approval statuses for vendors
 */

export const VENDOR_APPROVAL = {
  // Approval Types
  TYPES: {
    PENDING: 'pending',
    REVIEW: 'review',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    CONDITIONAL: 'conditional',
  } as const,

  // Approval Categories
  CATEGORIES: {
    PENDING: 'pending',
    ACTIVE: 'active',
    FAILED: 'failed',
  } as const,

  // Approval Colors (for UI)
  COLORS: {
    PENDING: '#yellow-500',
    REVIEW: '#blue-500',
    APPROVED: '#green-500',
    REJECTED: '#red-500',
    CONDITIONAL: '#orange-500',
  } as const,

  // Approval Icons (for UI)
  ICONS: {
    PENDING: '⏳',
    REVIEW: '🔍',
    APPROVED: '✅',
    REJECTED: '❌',
    CONDITIONAL: '⚠️',
  } as const,

  // Approval Reasons
  REASONS: {
    DOCUMENT_INCOMPLETE: 'document_incomplete',
    DOCUMENT_INVALID: 'document_invalid',
    BACKGROUND_CHECK_FAILED: 'background_check_failed',
    POLICY_VIOLATION: 'policy_violation',
    FRAUD_SUSPECTED: 'fraud_suspected',
    CONDITIONAL_APPROVAL: 'conditional_approval',
  } as const,

  // Approval Actions
  ACTIONS: {
    APPROVE: 'approve',
    REJECT: 'reject',
    REQUEST_CHANGES: 'request_changes',
    ESCALATE: 'escalate',
    DEFER: 'defer',
  } as const,
} as const;

// Approval Types
export type VendorApprovalType = (typeof VENDOR_APPROVAL.TYPES)[keyof typeof VENDOR_APPROVAL.TYPES];

// Approval Categories
export type VendorApprovalCategory =
  (typeof VENDOR_APPROVAL.CATEGORIES)[keyof typeof VENDOR_APPROVAL.CATEGORIES];

// Approval Colors
export type VendorApprovalColor =
  (typeof VENDOR_APPROVAL.COLORS)[keyof typeof VENDOR_APPROVAL.COLORS];

// Approval Icons
export type VendorApprovalIcon = (typeof VENDOR_APPROVAL.ICONS)[keyof typeof VENDOR_APPROVAL.ICONS];

// Approval Reasons
export type VendorApprovalReason =
  (typeof VENDOR_APPROVAL.REASONS)[keyof typeof VENDOR_APPROVAL.REASONS];

// Approval Actions
export type VendorApprovalAction =
  (typeof VENDOR_APPROVAL.ACTIONS)[keyof typeof VENDOR_APPROVAL.ACTIONS];

// Utility Functions
export function vendorApprovalGetLabel(approval: VendorApprovalType): string {
  const labels: Record<VendorApprovalType, string> = {
    [VENDOR_APPROVAL.TYPES.PENDING]: 'Pending',
    [VENDOR_APPROVAL.TYPES.REVIEW]: 'In Review',
    [VENDOR_APPROVAL.TYPES.APPROVED]: 'Approved',
    [VENDOR_APPROVAL.TYPES.REJECTED]: 'Rejected',
    [VENDOR_APPROVAL.TYPES.CONDITIONAL]: 'Conditional',
  };
  return labels[approval] || 'Unknown';
}

export function vendorApprovalIsApproved(approval: VendorApprovalType): boolean {
  return approval === VENDOR_APPROVAL.TYPES.APPROVED;
}

export function vendorApprovalIsPending(approval: VendorApprovalType): boolean {
  return approval === VENDOR_APPROVAL.TYPES.PENDING || approval === VENDOR_APPROVAL.TYPES.REVIEW;
}

export function vendorApprovalIsRejected(approval: VendorApprovalType): boolean {
  return approval === VENDOR_APPROVAL.TYPES.REJECTED;
}

export function vendorApprovalGetCategory(approval: VendorApprovalType): VendorApprovalCategory {
  const categories: Record<VendorApprovalType, VendorApprovalCategory> = {
    [VENDOR_APPROVAL.TYPES.PENDING]: VENDOR_APPROVAL.CATEGORIES.PENDING,
    [VENDOR_APPROVAL.TYPES.REVIEW]: VENDOR_APPROVAL.CATEGORIES.PENDING,
    [VENDOR_APPROVAL.TYPES.APPROVED]: VENDOR_APPROVAL.CATEGORIES.ACTIVE,
    [VENDOR_APPROVAL.TYPES.REJECTED]: VENDOR_APPROVAL.CATEGORIES.FAILED,
    [VENDOR_APPROVAL.TYPES.CONDITIONAL]: VENDOR_APPROVAL.CATEGORIES.ACTIVE,
  };
  return categories[approval] || VENDOR_APPROVAL.CATEGORIES.PENDING;
}

export function vendorApprovalGetReasonLabel(reason: VendorApprovalReason): string {
  const labels: Record<VendorApprovalReason, string> = {
    [VENDOR_APPROVAL.REASONS.DOCUMENT_INCOMPLETE]: 'Document Incomplete',
    [VENDOR_APPROVAL.REASONS.DOCUMENT_INVALID]: 'Document Invalid',
    [VENDOR_APPROVAL.REASONS.BACKGROUND_CHECK_FAILED]: 'Background Check Failed',
    [VENDOR_APPROVAL.REASONS.POLICY_VIOLATION]: 'Policy Violation',
    [VENDOR_APPROVAL.REASONS.FRAUD_SUSPECTED]: 'Fraud Suspected',
    [VENDOR_APPROVAL.REASONS.CONDITIONAL_APPROVAL]: 'Conditional Approval',
  };
  return labels[reason] || 'Unknown';
}

export function vendorApprovalGetActionLabel(action: VendorApprovalAction): string {
  const labels: Record<VendorApprovalAction, string> = {
    [VENDOR_APPROVAL.ACTIONS.APPROVE]: 'Approve',
    [VENDOR_APPROVAL.ACTIONS.REJECT]: 'Reject',
    [VENDOR_APPROVAL.ACTIONS.REQUEST_CHANGES]: 'Request Changes',
    [VENDOR_APPROVAL.ACTIONS.ESCALATE]: 'Escalate',
    [VENDOR_APPROVAL.ACTIONS.DEFER]: 'Defer',
  };
  return labels[action] || 'Unknown';
}
