import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { DOCUMENT } from '../../common/document.constants';
import { VERIFICATION } from '../../common/verification.constants';

export const VENDOR_DOCUMENT = {
  TYPES: {
    ...COMMON_TYPES,
    // Vendor-specific document types
    TIN: 'tin',
    TRADE_LICENSE: 'trade_license',
    BANK_STATEMENT: 'bank_statement',
    UTILITY_BILL: 'utility_bill',
    GST_CERTIFICATE: 'gst_certificate',
    VAT_CERTIFICATE: 'vat_certificate',
    INSURANCE: 'insurance',
    // Common document types from DOCUMENT.TYPES
    ...DOCUMENT.TYPES,
  },
  DOCUMENT_TYPES: { ...DOCUMENT.TYPES },
  VERIFICATION: { ...VERIFICATION },
  DOCUMENT_STATUS: {
    PENDING: 'pending',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
  },
  MAX_DOCUMENTS: 20,
  MAX_FILE_SIZE_MB: DOCUMENT.SETTINGS.MAX_FILE_SIZE_MB,
  SUPPORTED_FORMATS: DOCUMENT.SETTINGS.ALLOWED_EXTENSIONS,
  EXPIRY_REMINDER_DAYS: 30,
} as const;
