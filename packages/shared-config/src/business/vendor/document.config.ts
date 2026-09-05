/**
 * Document Config
 * ডকুমেন্ট কনফিগারেশন
 */

import { VENDOR_DOCUMENT } from '@vubon/shared-constants';

export interface DocumentConfig {
  enabled: boolean;
  types: Record<string, string>;
  maxSize: number;
  maxFiles: number;
  allowedTypes: string[];
  expiryDays: number;
  status: Record<string, string>;
  formats: Record<string, string>;
  defaults: {
    maxSize: number;
    maxFiles: number;
    allowedFormats: string[];
    expiryDays: number;
  };
}

export const documentConfig: DocumentConfig = {
  enabled: true,

  types: {
    nid: VENDOR_DOCUMENT.TYPES.NID,
    passport: VENDOR_DOCUMENT.TYPES.PASSPORT,
    driving_license: VENDOR_DOCUMENT.TYPES.DRIVING_LICENSE,
    business_license: VENDOR_DOCUMENT.TYPES.BUSINESS_LICENSE,
    trade_license: VENDOR_DOCUMENT.TYPES.TRADE_LICENSE,
    tin: VENDOR_DOCUMENT.TYPES.TIN,
    vat: VENDOR_DOCUMENT.TYPES.VAT,
    bank_statement: VENDOR_DOCUMENT.TYPES.BANK_STATEMENT,
    address_proof: VENDOR_DOCUMENT.TYPES.ADDRESS_PROOF,
    photo: VENDOR_DOCUMENT.TYPES.PHOTO,
    contract: VENDOR_DOCUMENT.TYPES.CONTRACT,
    agreement: VENDOR_DOCUMENT.TYPES.AGREEMENT,
    insurance: VENDOR_DOCUMENT.TYPES.INSURANCE,
    warranty: VENDOR_DOCUMENT.TYPES.WARRANTY,
    invoice: VENDOR_DOCUMENT.TYPES.INVOICE,
    receipt: VENDOR_DOCUMENT.TYPES.RECEIPT,
  },

  maxSize: 10 * 1024 * 1024,
  maxFiles: 10,
  allowedTypes: ['pdf', 'jpg', 'png', 'doc', 'docx'],
  expiryDays: 365,

  status: {
    pending: VENDOR_DOCUMENT.STATUS.PENDING,
    approved: VENDOR_DOCUMENT.STATUS.APPROVED,
    rejected: VENDOR_DOCUMENT.STATUS.REJECTED,
    expired: VENDOR_DOCUMENT.STATUS.EXPIRED,
    deleted: VENDOR_DOCUMENT.STATUS.DELETED,
  },

  formats: {
    pdf: VENDOR_DOCUMENT.FORMATS.PDF,
    jpg: VENDOR_DOCUMENT.FORMATS.JPG,
    png: VENDOR_DOCUMENT.FORMATS.PNG,
    doc: VENDOR_DOCUMENT.FORMATS.DOC,
    docx: VENDOR_DOCUMENT.FORMATS.DOCX,
    xls: VENDOR_DOCUMENT.FORMATS.XLS,
    xlsx: VENDOR_DOCUMENT.FORMATS.XLSX,
  },

  defaults: {
    maxSize: VENDOR_DOCUMENT.DEFAULTS.MAX_SIZE,
    maxFiles: VENDOR_DOCUMENT.DEFAULTS.MAX_FILES,
    allowedFormats: [...VENDOR_DOCUMENT.DEFAULTS.ALLOWED_FORMATS],
    expiryDays: VENDOR_DOCUMENT.DEFAULTS.EXPIRY_DAYS,
  },
} as const;

export type DocumentConfigType = typeof documentConfig;
