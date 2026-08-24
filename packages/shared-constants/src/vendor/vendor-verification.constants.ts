/**
 * Vendor Verification Constants
 * Verification statuses for vendors
 */

export const VENDOR_VERIFICATION = {
  // Verification Types
  TYPES: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
  } as const,

  // Verification Categories
  CATEGORIES: {
    PENDING: 'pending',
    ACTIVE: 'active',
    FAILED: 'failed',
    EXPIRED: 'expired',
  } as const,

  // Verification Colors (for UI)
  COLORS: {
    PENDING: '#yellow-500',
    IN_PROGRESS: '#blue-500',
    VERIFIED: '#green-500',
    REJECTED: '#red-500',
    EXPIRED: '#gray-500',
  } as const,

  // Verification Icons (for UI)
  ICONS: {
    PENDING: '⏳',
    IN_PROGRESS: '🔄',
    VERIFIED: '✅',
    REJECTED: '❌',
    EXPIRED: '⌛',
  } as const,

  // Verification Documents
  DOCUMENTS: {
    NID: 'nid',
    PASSPORT: 'passport',
    TRADE_LICENSE: 'trade_license',
    TIN: 'tin',
    VAT: 'vat',
    BANK_STATEMENT: 'bank_statement',
    TAX_CERTIFICATE: 'tax_certificate',
    AUDIT_REPORT: 'audit_report',
  } as const,

  // Verification Steps
  STEPS: {
    DOCUMENT_SUBMISSION: 'document_submission',
    DOCUMENT_VERIFICATION: 'document_verification',
    BACKGROUND_CHECK: 'background_check',
    FINAL_APPROVAL: 'final_approval',
  } as const,
} as const;

// Verification Types
export type VendorVerificationType =
  (typeof VENDOR_VERIFICATION.TYPES)[keyof typeof VENDOR_VERIFICATION.TYPES];

// Verification Categories
export type VendorVerificationCategory =
  (typeof VENDOR_VERIFICATION.CATEGORIES)[keyof typeof VENDOR_VERIFICATION.CATEGORIES];

// Verification Colors
export type VendorVerificationColor =
  (typeof VENDOR_VERIFICATION.COLORS)[keyof typeof VENDOR_VERIFICATION.COLORS];

// Verification Icons
export type VendorVerificationIcon =
  (typeof VENDOR_VERIFICATION.ICONS)[keyof typeof VENDOR_VERIFICATION.ICONS];

// Verification Documents
export type VendorVerificationDocument =
  (typeof VENDOR_VERIFICATION.DOCUMENTS)[keyof typeof VENDOR_VERIFICATION.DOCUMENTS];

// Verification Steps
export type VendorVerificationStep =
  (typeof VENDOR_VERIFICATION.STEPS)[keyof typeof VENDOR_VERIFICATION.STEPS];

// Utility Functions
export function vendorVerificationGetLabel(verification: VendorVerificationType): string {
  const labels: Record<VendorVerificationType, string> = {
    [VENDOR_VERIFICATION.TYPES.PENDING]: 'Pending',
    [VENDOR_VERIFICATION.TYPES.IN_PROGRESS]: 'In Progress',
    [VENDOR_VERIFICATION.TYPES.VERIFIED]: 'Verified',
    [VENDOR_VERIFICATION.TYPES.REJECTED]: 'Rejected',
    [VENDOR_VERIFICATION.TYPES.EXPIRED]: 'Expired',
  };
  return labels[verification] || 'Unknown';
}

export function vendorVerificationIsVerified(verification: VendorVerificationType): boolean {
  return verification === VENDOR_VERIFICATION.TYPES.VERIFIED;
}

export function vendorVerificationIsPending(verification: VendorVerificationType): boolean {
  return (
    verification === VENDOR_VERIFICATION.TYPES.PENDING ||
    verification === VENDOR_VERIFICATION.TYPES.IN_PROGRESS
  );
}

export function vendorVerificationIsFailed(verification: VendorVerificationType): boolean {
  return verification === VENDOR_VERIFICATION.TYPES.REJECTED;
}

export function vendorVerificationGetCategory(
  verification: VendorVerificationType
): VendorVerificationCategory {
  const categories: Record<VendorVerificationType, VendorVerificationCategory> = {
    [VENDOR_VERIFICATION.TYPES.PENDING]: VENDOR_VERIFICATION.CATEGORIES.PENDING,
    [VENDOR_VERIFICATION.TYPES.IN_PROGRESS]: VENDOR_VERIFICATION.CATEGORIES.PENDING,
    [VENDOR_VERIFICATION.TYPES.VERIFIED]: VENDOR_VERIFICATION.CATEGORIES.ACTIVE,
    [VENDOR_VERIFICATION.TYPES.REJECTED]: VENDOR_VERIFICATION.CATEGORIES.FAILED,
    [VENDOR_VERIFICATION.TYPES.EXPIRED]: VENDOR_VERIFICATION.CATEGORIES.EXPIRED,
  };
  return categories[verification] || VENDOR_VERIFICATION.CATEGORIES.PENDING;
}

export function vendorVerificationGetDocumentLabel(document: VendorVerificationDocument): string {
  const labels: Record<VendorVerificationDocument, string> = {
    [VENDOR_VERIFICATION.DOCUMENTS.NID]: 'National ID',
    [VENDOR_VERIFICATION.DOCUMENTS.PASSPORT]: 'Passport',
    [VENDOR_VERIFICATION.DOCUMENTS.TRADE_LICENSE]: 'Trade License',
    [VENDOR_VERIFICATION.DOCUMENTS.TIN]: 'TIN Certificate',
    [VENDOR_VERIFICATION.DOCUMENTS.VAT]: 'VAT Registration',
    [VENDOR_VERIFICATION.DOCUMENTS.BANK_STATEMENT]: 'Bank Statement',
    [VENDOR_VERIFICATION.DOCUMENTS.TAX_CERTIFICATE]: 'Tax Certificate',
    [VENDOR_VERIFICATION.DOCUMENTS.AUDIT_REPORT]: 'Audit Report',
  };
  return labels[document] || 'Unknown';
}

export function vendorVerificationGetStepLabel(step: VendorVerificationStep): string {
  const labels: Record<VendorVerificationStep, string> = {
    [VENDOR_VERIFICATION.STEPS.DOCUMENT_SUBMISSION]: 'Document Submission',
    [VENDOR_VERIFICATION.STEPS.DOCUMENT_VERIFICATION]: 'Document Verification',
    [VENDOR_VERIFICATION.STEPS.BACKGROUND_CHECK]: 'Background Check',
    [VENDOR_VERIFICATION.STEPS.FINAL_APPROVAL]: 'Final Approval',
  };
  return labels[step] || 'Unknown';
}
