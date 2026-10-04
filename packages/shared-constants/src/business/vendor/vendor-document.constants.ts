export const VENDOR_DOCUMENT_TYPE = {
  BUSINESS_LICENSE: 'business_license',
  TRADE_LICENSE: 'trade_license',
  TAX_ID: 'tax_id',
  VAT_CERTIFICATE: 'vat_certificate',
  BANK_STATEMENT: 'bank_statement',
  IDENTITY_PROOF: 'identity_proof',
  ADDRESS_PROOF: 'address_proof',
  PARTNERSHIP_DEED: 'partnership_deed',
  MEMORANDUM: 'memorandum',
  ARTICLES: 'articles',
  INSURANCE: 'insurance',
  OTHER: 'other',
} as const;

export const VENDOR_DOCUMENT_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  RESUBMITTED: 'resubmitted',
} as const;

export const VENDOR_DOCUMENT = {
  MAX_SIZE_MB: 10,
  MAX_DOCUMENTS: 20,
  ALLOWED_FORMATS: ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'],
  EXPIRY_REMINDER_DAYS: 30,
  REQUIRE_ALL: false,
  AUTO_VERIFY_OCR: false,
} as const;

export type VendorDocumentTypeType =
  (typeof VENDOR_DOCUMENT_TYPE)[keyof typeof VENDOR_DOCUMENT_TYPE];
export type VendorDocumentStatusType =
  (typeof VENDOR_DOCUMENT_STATUS)[keyof typeof VENDOR_DOCUMENT_STATUS];
