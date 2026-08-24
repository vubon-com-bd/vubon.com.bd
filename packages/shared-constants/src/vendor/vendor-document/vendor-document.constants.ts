/**
 * Vendor Document Constants
 * Configuration for vendor documents
 */

export const VENDOR_DOCUMENT = {
  // Document Types
  TYPES: {
    NID: 'nid',
    PASSPORT: 'passport',
    TRADE_LICENSE: 'trade_license',
    TIN: 'tin',
    VAT: 'vat',
    BANK_STATEMENT: 'bank_statement',
    TAX_CERTIFICATE: 'tax_certificate',
    AUDIT_REPORT: 'audit_report',
    PHOTO: 'photo',
    SIGNATURE: 'signature',
    OTHER: 'other',
  } as const,

  // Document Statuses
  STATUS: {
    PENDING: 'pending',
    UPLOADED: 'uploaded',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
    REQUIRES_UPDATE: 'requires_update',
  } as const,

  // Document Categories
  CATEGORIES: {
    IDENTITY: 'identity',
    BUSINESS: 'business',
    FINANCIAL: 'financial',
    LEGAL: 'legal',
    OTHER: 'other',
  } as const,

  // Document Formats
  FORMATS: {
    PDF: 'pdf',
    JPG: 'jpg',
    PNG: 'png',
    JPEG: 'jpeg',
    DOC: 'doc',
    DOCX: 'docx',
  } as const,

  // Document Statuses (expanded)
  DOCUMENT_STATUS: {
    PENDING: 'pending',
    UPLOADED: 'uploaded',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
    REQUIRES_UPDATE: 'requires_update',
  } as const,

  // Document Limits
  LIMITS: {
    MAX_SIZE: 5242880, // 5MB
    MAX_FILES: 10,
    MAX_TOTAL_SIZE: 52428800, // 50MB
    MIN_DIMENSIONS: {
      PHOTO: [300, 300],
      SIGNATURE: [200, 100],
    },
  } as const,

  // Document Expiry Periods (in months)
  EXPIRY_PERIODS: {
    NID: 120, // 10 years
    PASSPORT: 60, // 5 years
    TRADE_LICENSE: 12, // 1 year
    TIN: 12, // 1 year
    VAT: 12, // 1 year
    BANK_STATEMENT: 3, // 3 months
    TAX_CERTIFICATE: 12, // 1 year
    AUDIT_REPORT: 12, // 1 year
  } as const,
} as const;

// Document Types
export type VendorDocumentType = (typeof VENDOR_DOCUMENT.TYPES)[keyof typeof VENDOR_DOCUMENT.TYPES];

// Document Statuses
export type VendorDocumentStatus =
  (typeof VENDOR_DOCUMENT.STATUS)[keyof typeof VENDOR_DOCUMENT.STATUS];

// Document Categories
export type VendorDocumentCategory =
  (typeof VENDOR_DOCUMENT.CATEGORIES)[keyof typeof VENDOR_DOCUMENT.CATEGORIES];

// Document Formats
export type VendorDocumentFormat =
  (typeof VENDOR_DOCUMENT.FORMATS)[keyof typeof VENDOR_DOCUMENT.FORMATS];

// Utility Functions
export function vendorDocumentGetTypeLabel(type: VendorDocumentType): string {
  const labels: Record<VendorDocumentType, string> = {
    [VENDOR_DOCUMENT.TYPES.NID]: 'National ID',
    [VENDOR_DOCUMENT.TYPES.PASSPORT]: 'Passport',
    [VENDOR_DOCUMENT.TYPES.TRADE_LICENSE]: 'Trade License',
    [VENDOR_DOCUMENT.TYPES.TIN]: 'TIN Certificate',
    [VENDOR_DOCUMENT.TYPES.VAT]: 'VAT Registration',
    [VENDOR_DOCUMENT.TYPES.BANK_STATEMENT]: 'Bank Statement',
    [VENDOR_DOCUMENT.TYPES.TAX_CERTIFICATE]: 'Tax Certificate',
    [VENDOR_DOCUMENT.TYPES.AUDIT_REPORT]: 'Audit Report',
    [VENDOR_DOCUMENT.TYPES.PHOTO]: 'Photo',
    [VENDOR_DOCUMENT.TYPES.SIGNATURE]: 'Signature',
    [VENDOR_DOCUMENT.TYPES.OTHER]: 'Other',
  };
  return labels[type] || 'Unknown';
}

export function vendorDocumentGetStatusLabel(status: VendorDocumentStatus): string {
  const labels: Record<VendorDocumentStatus, string> = {
    [VENDOR_DOCUMENT.STATUS.PENDING]: 'Pending',
    [VENDOR_DOCUMENT.STATUS.UPLOADED]: 'Uploaded',
    [VENDOR_DOCUMENT.STATUS.VERIFIED]: 'Verified',
    [VENDOR_DOCUMENT.STATUS.REJECTED]: 'Rejected',
    [VENDOR_DOCUMENT.STATUS.EXPIRED]: 'Expired',
    [VENDOR_DOCUMENT.STATUS.REQUIRES_UPDATE]: 'Requires Update',
  };
  return labels[status] || 'Unknown';
}

export function vendorDocumentGetCategory(type: VendorDocumentType): VendorDocumentCategory {
  const categories: Record<VendorDocumentType, VendorDocumentCategory> = {
    [VENDOR_DOCUMENT.TYPES.NID]: VENDOR_DOCUMENT.CATEGORIES.IDENTITY,
    [VENDOR_DOCUMENT.TYPES.PASSPORT]: VENDOR_DOCUMENT.CATEGORIES.IDENTITY,
    [VENDOR_DOCUMENT.TYPES.TRADE_LICENSE]: VENDOR_DOCUMENT.CATEGORIES.BUSINESS,
    [VENDOR_DOCUMENT.TYPES.TIN]: VENDOR_DOCUMENT.CATEGORIES.BUSINESS,
    [VENDOR_DOCUMENT.TYPES.VAT]: VENDOR_DOCUMENT.CATEGORIES.BUSINESS,
    [VENDOR_DOCUMENT.TYPES.BANK_STATEMENT]: VENDOR_DOCUMENT.CATEGORIES.FINANCIAL,
    [VENDOR_DOCUMENT.TYPES.TAX_CERTIFICATE]: VENDOR_DOCUMENT.CATEGORIES.FINANCIAL,
    [VENDOR_DOCUMENT.TYPES.AUDIT_REPORT]: VENDOR_DOCUMENT.CATEGORIES.FINANCIAL,
    [VENDOR_DOCUMENT.TYPES.PHOTO]: VENDOR_DOCUMENT.CATEGORIES.IDENTITY,
    [VENDOR_DOCUMENT.TYPES.SIGNATURE]: VENDOR_DOCUMENT.CATEGORIES.LEGAL,
    [VENDOR_DOCUMENT.TYPES.OTHER]: VENDOR_DOCUMENT.CATEGORIES.OTHER,
  };
  return categories[type] || VENDOR_DOCUMENT.CATEGORIES.OTHER;
}

export function vendorDocumentGetFormatLabel(format: VendorDocumentFormat): string {
  const labels: Record<VendorDocumentFormat, string> = {
    [VENDOR_DOCUMENT.FORMATS.PDF]: 'PDF',
    [VENDOR_DOCUMENT.FORMATS.JPG]: 'JPG',
    [VENDOR_DOCUMENT.FORMATS.PNG]: 'PNG',
    [VENDOR_DOCUMENT.FORMATS.JPEG]: 'JPEG',
    [VENDOR_DOCUMENT.FORMATS.DOC]: 'DOC',
    [VENDOR_DOCUMENT.FORMATS.DOCX]: 'DOCX',
  };
  return labels[format] || 'Unknown';
}

export function vendorDocumentIsVerified(status: VendorDocumentStatus): boolean {
  return status === VENDOR_DOCUMENT.STATUS.VERIFIED;
}

export function vendorDocumentIsPending(status: VendorDocumentStatus): boolean {
  return status === VENDOR_DOCUMENT.STATUS.PENDING || status === VENDOR_DOCUMENT.STATUS.UPLOADED;
}

export function vendorDocumentIsRejected(status: VendorDocumentStatus): boolean {
  return status === VENDOR_DOCUMENT.STATUS.REJECTED;
}

export function vendorDocumentGetExpiryMonths(type: VendorDocumentType): number {
  const periods: Record<VendorDocumentType, number> = {
    [VENDOR_DOCUMENT.TYPES.NID]: VENDOR_DOCUMENT.EXPIRY_PERIODS.NID,
    [VENDOR_DOCUMENT.TYPES.PASSPORT]: VENDOR_DOCUMENT.EXPIRY_PERIODS.PASSPORT,
    [VENDOR_DOCUMENT.TYPES.TRADE_LICENSE]: VENDOR_DOCUMENT.EXPIRY_PERIODS.TRADE_LICENSE,
    [VENDOR_DOCUMENT.TYPES.TIN]: VENDOR_DOCUMENT.EXPIRY_PERIODS.TIN,
    [VENDOR_DOCUMENT.TYPES.VAT]: VENDOR_DOCUMENT.EXPIRY_PERIODS.VAT,
    [VENDOR_DOCUMENT.TYPES.BANK_STATEMENT]: VENDOR_DOCUMENT.EXPIRY_PERIODS.BANK_STATEMENT,
    [VENDOR_DOCUMENT.TYPES.TAX_CERTIFICATE]: VENDOR_DOCUMENT.EXPIRY_PERIODS.TAX_CERTIFICATE,
    [VENDOR_DOCUMENT.TYPES.AUDIT_REPORT]: VENDOR_DOCUMENT.EXPIRY_PERIODS.AUDIT_REPORT,
    [VENDOR_DOCUMENT.TYPES.PHOTO]: 0,
    [VENDOR_DOCUMENT.TYPES.SIGNATURE]: 0,
    [VENDOR_DOCUMENT.TYPES.OTHER]: 0,
  };
  return periods[type] || 0;
}
