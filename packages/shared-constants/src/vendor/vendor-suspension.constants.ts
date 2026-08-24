/**
 * Vendor Suspension Constants
 * Suspension types for vendors
 */

export const VENDOR_SUSPENSION = {
  // Suspension Types
  TYPES: {
    TEMPORARY: 'temporary',
    PERMANENT: 'permanent',
    REVIEW: 'review',
    APPEAL: 'appeal',
  } as const,

  // Suspension Categories
  CATEGORIES: {
    PENDING: 'pending',
    ACTIVE: 'active',
    RESOLVED: 'resolved',
  } as const,

  // Suspension Colors (for UI)
  COLORS: {
    TEMPORARY: '#orange-500',
    PERMANENT: '#red-600',
    REVIEW: '#yellow-500',
    APPEAL: '#blue-500',
  } as const,

  // Suspension Icons (for UI)
  ICONS: {
    TEMPORARY: '⏸️',
    PERMANENT: '⛔',
    REVIEW: '🔍',
    APPEAL: '⚖️',
  } as const,

  // Suspension Reasons
  REASONS: {
    POLICY_VIOLATION: 'policy_violation',
    TERMS_VIOLATION: 'terms_violation',
    FRAUD_SUSPECTED: 'fraud_suspected',
    POOR_PERFORMANCE: 'poor_performance',
    COMPLAINTS: 'complaints',
    LEGAL_ISSUE: 'legal_issue',
    DOCUMENT_EXPIRED: 'document_expired',
  } as const,

  // Suspension Durations (in days)
  DURATIONS: {
    TEMPORARY_MIN: 1,
    TEMPORARY_MAX: 30,
    REVIEW_MIN: 3,
    REVIEW_MAX: 7,
    PERMANENT: -1, // Infinite
  } as const,
} as const;

// Suspension Types
export type VendorSuspensionType =
  (typeof VENDOR_SUSPENSION.TYPES)[keyof typeof VENDOR_SUSPENSION.TYPES];

// Suspension Categories
export type VendorSuspensionCategory =
  (typeof VENDOR_SUSPENSION.CATEGORIES)[keyof typeof VENDOR_SUSPENSION.CATEGORIES];

// Suspension Colors
export type VendorSuspensionColor =
  (typeof VENDOR_SUSPENSION.COLORS)[keyof typeof VENDOR_SUSPENSION.COLORS];

// Suspension Icons
export type VendorSuspensionIcon =
  (typeof VENDOR_SUSPENSION.ICONS)[keyof typeof VENDOR_SUSPENSION.ICONS];

// Suspension Reasons
export type VendorSuspensionReason =
  (typeof VENDOR_SUSPENSION.REASONS)[keyof typeof VENDOR_SUSPENSION.REASONS];

// Utility Functions
export function vendorSuspensionGetLabel(suspension: VendorSuspensionType): string {
  const labels: Record<VendorSuspensionType, string> = {
    [VENDOR_SUSPENSION.TYPES.TEMPORARY]: 'Temporary Suspension',
    [VENDOR_SUSPENSION.TYPES.PERMANENT]: 'Permanent Suspension',
    [VENDOR_SUSPENSION.TYPES.REVIEW]: 'Under Review',
    [VENDOR_SUSPENSION.TYPES.APPEAL]: 'Appeal',
  };
  return labels[suspension] || 'Unknown';
}

export function vendorSuspensionIsActive(suspension: VendorSuspensionType): boolean {
  return (
    suspension === VENDOR_SUSPENSION.TYPES.TEMPORARY ||
    suspension === VENDOR_SUSPENSION.TYPES.PERMANENT
  );
}

export function vendorSuspensionIsPending(suspension: VendorSuspensionType): boolean {
  return (
    suspension === VENDOR_SUSPENSION.TYPES.REVIEW || suspension === VENDOR_SUSPENSION.TYPES.APPEAL
  );
}

export function vendorSuspensionIsPermanent(suspension: VendorSuspensionType): boolean {
  return suspension === VENDOR_SUSPENSION.TYPES.PERMANENT;
}

export function vendorSuspensionGetCategory(
  suspension: VendorSuspensionType
): VendorSuspensionCategory {
  const categories: Record<VendorSuspensionType, VendorSuspensionCategory> = {
    [VENDOR_SUSPENSION.TYPES.TEMPORARY]: VENDOR_SUSPENSION.CATEGORIES.ACTIVE,
    [VENDOR_SUSPENSION.TYPES.PERMANENT]: VENDOR_SUSPENSION.CATEGORIES.ACTIVE,
    [VENDOR_SUSPENSION.TYPES.REVIEW]: VENDOR_SUSPENSION.CATEGORIES.PENDING,
    [VENDOR_SUSPENSION.TYPES.APPEAL]: VENDOR_SUSPENSION.CATEGORIES.PENDING,
  };
  return categories[suspension] || VENDOR_SUSPENSION.CATEGORIES.PENDING;
}

export function vendorSuspensionGetReasonLabel(reason: VendorSuspensionReason): string {
  const labels: Record<VendorSuspensionReason, string> = {
    [VENDOR_SUSPENSION.REASONS.POLICY_VIOLATION]: 'Policy Violation',
    [VENDOR_SUSPENSION.REASONS.TERMS_VIOLATION]: 'Terms of Service Violation',
    [VENDOR_SUSPENSION.REASONS.FRAUD_SUSPECTED]: 'Fraud Suspected',
    [VENDOR_SUSPENSION.REASONS.POOR_PERFORMANCE]: 'Poor Performance',
    [VENDOR_SUSPENSION.REASONS.COMPLAINTS]: 'Customer Complaints',
    [VENDOR_SUSPENSION.REASONS.LEGAL_ISSUE]: 'Legal Issue',
    [VENDOR_SUSPENSION.REASONS.DOCUMENT_EXPIRED]: 'Document Expired',
  };
  return labels[reason] || 'Unknown';
}

export function vendorSuspensionGetDuration(suspension: VendorSuspensionType): number {
  const durations: Record<VendorSuspensionType, number> = {
    [VENDOR_SUSPENSION.TYPES.TEMPORARY]: VENDOR_SUSPENSION.DURATIONS.TEMPORARY_MIN,
    [VENDOR_SUSPENSION.TYPES.PERMANENT]: VENDOR_SUSPENSION.DURATIONS.PERMANENT,
    [VENDOR_SUSPENSION.TYPES.REVIEW]: VENDOR_SUSPENSION.DURATIONS.REVIEW_MIN,
    [VENDOR_SUSPENSION.TYPES.APPEAL]: VENDOR_SUSPENSION.DURATIONS.REVIEW_MIN,
  };
  return durations[suspension] || 7;
}
