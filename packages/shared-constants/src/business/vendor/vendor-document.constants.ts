/**
 * Vendor Document Constants
 * ভেন্ডর ডকুমেন্ট সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';

export const VENDOR_DOCUMENT = {
  // Document types (TYPES ব্যবহার করে)
  TYPES: {
    NID: 'nid',
    PASSPORT: 'passport',
    DRIVING_LICENSE: 'driving_license',
    BUSINESS_LICENSE: 'business_license',
    TRADE_LICENSE: 'trade_license',
    TIN: 'tin',
    VAT: TYPES.VAT,
    BANK_STATEMENT: 'bank_statement',
    ADDRESS_PROOF: 'address_proof',
    PHOTO: 'photo',
    CONTRACT: 'contract',
    AGREEMENT: 'agreement',
    INSURANCE: 'insurance',
    WARRANTY: 'warranty',
    INVOICE: 'invoice',
    RECEIPT: 'receipt',
  },

  // Document status
  STATUS: {
    PENDING: TYPES.PENDING,
    APPROVED: 'approved',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
    DELETED: TYPES.DELETED,
  },

  // Document formats
  FORMATS: {
    PDF: 'pdf',
    JPG: 'jpg',
    PNG: 'png',
    DOC: 'doc',
    DOCX: 'docx',
    XLS: 'xls',
    XLSX: 'xlsx',
  },

  // Default values
  DEFAULTS: {
    MAX_SIZE: 5242880, // 5MB
    MAX_FILES: 10,
    ALLOWED_FORMATS: ['pdf', 'jpg', 'png', 'doc', 'docx'],
    EXPIRY_DAYS: 365,
  },
} as const;

export type VendorDocumentType = (typeof VENDOR_DOCUMENT.TYPES)[keyof typeof VENDOR_DOCUMENT.TYPES];
export type VendorDocumentStatus =
  (typeof VENDOR_DOCUMENT.STATUS)[keyof typeof VENDOR_DOCUMENT.STATUS];
export type VendorDocumentFormat =
  (typeof VENDOR_DOCUMENT.FORMATS)[keyof typeof VENDOR_DOCUMENT.FORMATS];
