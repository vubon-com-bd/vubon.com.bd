/**
 * ভেন্ডার ডকুমেন্ট সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * ডকুমেন্ট ক্যাটাগরি অবজেক্ট
 */
export const DocumentCategory = {
  IDENTITY: 'IDENTITY',
  BUSINESS: 'BUSINESS',
  ADDRESS: 'ADDRESS',
  TAX: 'TAX',
  BANK: 'BANK',
  CERTIFICATION: 'CERTIFICATION',
  LICENSE: 'LICENSE',
} as const;

/**
 * ডকুমেন্ট ক্যাটাগরি - ইউনিয়ন টাইপ
 */
export type DocumentCategoryValue = (typeof DocumentCategory)[keyof typeof DocumentCategory];

/**
 * ডকুমেন্ট স্টোরেজ পাথসমূহ
 */
export const DocumentStoragePaths: Record<DocumentCategoryValue, string> = {
  [DocumentCategory.IDENTITY]: 'vendor/documents/identity',
  [DocumentCategory.BUSINESS]: 'vendor/documents/business',
  [DocumentCategory.ADDRESS]: 'vendor/documents/address',
  [DocumentCategory.TAX]: 'vendor/documents/tax',
  [DocumentCategory.BANK]: 'vendor/documents/bank',
  [DocumentCategory.CERTIFICATION]: 'vendor/documents/certification',
  [DocumentCategory.LICENSE]: 'vendor/documents/license',
};

/**
 * ডকুমেন্ট ক্যাটাগরি লেবেলসমূহ
 */
export const DocumentCategoryLabels: Record<DocumentCategoryValue, { en: string; bn: string }> = {
  [DocumentCategory.IDENTITY]: {
    en: 'Identity Documents',
    bn: 'পরিচয় নথি',
  },
  [DocumentCategory.BUSINESS]: {
    en: 'Business Documents',
    bn: 'ব্যবসায়িক নথি',
  },
  [DocumentCategory.ADDRESS]: {
    en: 'Address Proof',
    bn: 'ঠিকানা প্রমাণ',
  },
  [DocumentCategory.TAX]: {
    en: 'Tax Documents',
    bn: 'কর নথি',
  },
  [DocumentCategory.BANK]: {
    en: 'Bank Documents',
    bn: 'ব্যাংক নথি',
  },
  [DocumentCategory.CERTIFICATION]: {
    en: 'Certifications',
    bn: 'সার্টিফিকেশন',
  },
  [DocumentCategory.LICENSE]: {
    en: 'Licenses',
    bn: 'লাইসেন্স',
  },
};

/**
 * সর্বোচ্চ ডকুমেন্ট সাইজ (৫এমবি)
 */
export const MaxDocumentSize = 5 * 1024 * 1024;

/**
 * অনুমোদিত ডকুমেন্ট টাইপসমূহ
 */
export const AllowedDocumentTypes = [
  'PDF',
  'JPG',
  'JPEG',
  'PNG',
  'DOC',
  'DOCX',
  'XLS',
  'XLSX',
] as const;

/**
 * অনুমোদিত ডকুমেন্ট টাইপ - ইউনিয়ন টাইপ
 */
export type AllowedDocumentTypeValue = (typeof AllowedDocumentTypes)[number];

/**
 * ডকুমেন্ট রিটেনশন দিন (৩ বছর)
 */
export const DocumentRetentionDays = 1095;

/**
 * ডকুমেন্ট ভার্সনিং সক্ষম
 */
export const DocumentVersioningEnabled = true;

/**
 * ডকুমেন্ট মাইম টাইপ ম্যাপিং
 */
export const DocumentMimeTypes: Record<string, string> = {
  PDF: 'application/pdf',
  JPG: 'image/jpeg',
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  DOC: 'application/msword',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  XLS: 'application/vnd.ms-excel',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

/**
 * ডকুমেন্ট এক্সটেনশন ম্যাপিং
 */
export const DocumentExtensionMap: Record<string, string> = {
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
};

/**
 * ডকুমেন্ট সর্বোচ্চ সংখ্যা
 */
export const MaxDocumentsPerCategory = 10;

/**
 * ডকুমেন্ট সর্বোচ্চ ভার্সন সংখ্যা
 */
export const MaxDocumentVersions = 5;

/**
 * ডকুমেন্ট আপলোড টাইমআউট (মিনিট)
 */
export const DocumentUploadTimeoutMinutes = 30;
