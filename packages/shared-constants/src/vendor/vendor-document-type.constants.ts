/**
 * ডকুমেন্ট প্রকারভেদ সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ডকুমেন্ট টাইপ অবজেক্ট
 */
export const DocumentType = {
  NATIONAL_ID: 'NATIONAL_ID',
  PASSPORT: 'PASSPORT',
  DRIVING_LICENSE: 'DRIVING_LICENSE',
  TRADE_LICENSE: 'TRADE_LICENSE',
  TIN_CERTIFICATE: 'TIN_CERTIFICATE',
  BANK_STATEMENT: 'BANK_STATEMENT',
  UTILITY_BILL: 'UTILITY_BILL',
  BUSINESS_CERTIFICATE: 'BUSINESS_CERTIFICATE',
  TAX_RETURN: 'TAX_RETURN',
  GST_CERTIFICATE: 'GST_CERTIFICATE',
} as const;

/**
 * ডকুমেন্ট টাইপ - ইউনিয়ন টাইপ
 */
export type DocumentTypeValue = (typeof DocumentType)[keyof typeof DocumentType];

/**
 * ডকুমেন্ট টাইপ লেবেলসমূহ
 */
export const DocumentTypeLabels: Record<DocumentTypeValue, { en: string; bn: string }> = {
  [DocumentType.NATIONAL_ID]: {
    en: 'National ID',
    bn: 'জাতীয় পরিচয়পত্র',
  },
  [DocumentType.PASSPORT]: {
    en: 'Passport',
    bn: 'পাসপোর্ট',
  },
  [DocumentType.DRIVING_LICENSE]: {
    en: 'Driving License',
    bn: 'ড্রাইভিং লাইসেন্স',
  },
  [DocumentType.TRADE_LICENSE]: {
    en: 'Trade License',
    bn: 'ট্রেড লাইসেন্স',
  },
  [DocumentType.TIN_CERTIFICATE]: {
    en: 'TIN Certificate',
    bn: 'টিআইএন সার্টিফিকেট',
  },
  [DocumentType.BANK_STATEMENT]: {
    en: 'Bank Statement',
    bn: 'ব্যাংক স্টেটমেন্ট',
  },
  [DocumentType.UTILITY_BILL]: {
    en: 'Utility Bill',
    bn: 'ইউটিলিটি বিল',
  },
  [DocumentType.BUSINESS_CERTIFICATE]: {
    en: 'Business Certificate',
    bn: 'ব্যবসা সার্টিফিকেট',
  },
  [DocumentType.TAX_RETURN]: {
    en: 'Tax Return',
    bn: 'কর রিটার্ন',
  },
  [DocumentType.GST_CERTIFICATE]: {
    en: 'GST Certificate',
    bn: 'জিএসটি সার্টিফিকেট',
  },
};

/**
 * ডকুমেন্ট টাইপ অনুযায়ী প্রয়োজনীয় তথ্য
 */
export const DocumentTypeRequirements: Record<DocumentTypeValue, string[]> = {
  [DocumentType.NATIONAL_ID]: ['idNumber', 'dateOfBirth', 'fullName'],
  [DocumentType.PASSPORT]: ['passportNumber', 'expiryDate', 'fullName'],
  [DocumentType.DRIVING_LICENSE]: ['licenseNumber', 'expiryDate', 'fullName'],
  [DocumentType.TRADE_LICENSE]: ['licenseNumber', 'businessName', 'expiryDate'],
  [DocumentType.TIN_CERTIFICATE]: ['tinNumber', 'businessName', 'issueDate'],
  [DocumentType.BANK_STATEMENT]: ['accountNumber', 'bankName', 'statementDate'],
  [DocumentType.UTILITY_BILL]: ['billNumber', 'address', 'issueDate'],
  [DocumentType.BUSINESS_CERTIFICATE]: ['certificateNumber', 'businessName', 'issueDate'],
  [DocumentType.TAX_RETURN]: ['returnNumber', 'taxYear', 'filingDate'],
  [DocumentType.GST_CERTIFICATE]: ['gstNumber', 'businessName', 'issueDate'],
};

/**
 * ডকুমেন্ট টাইপ বৈধতা সময়কাল (দিন)
 */
export const DocumentTypeValidityPeriods: Record<DocumentTypeValue, number> = {
  [DocumentType.NATIONAL_ID]: 3650, // 10 years
  [DocumentType.PASSPORT]: 3650, // 10 years
  [DocumentType.DRIVING_LICENSE]: 1825, // 5 years
  [DocumentType.TRADE_LICENSE]: 365, // 1 year
  [DocumentType.TIN_CERTIFICATE]: 365, // 1 year
  [DocumentType.BANK_STATEMENT]: 30, // 1 month
  [DocumentType.UTILITY_BILL]: 30, // 1 month
  [DocumentType.BUSINESS_CERTIFICATE]: 1095, // 3 years
  [DocumentType.TAX_RETURN]: 365, // 1 year
  [DocumentType.GST_CERTIFICATE]: 365, // 1 year
};

/**
 * ডকুমেন্ট টাইপ যাচাই অগ্রাধিকার (১ = সর্বোচ্চ)
 */
export const DocumentTypePriorities: Record<DocumentTypeValue, number> = {
  [DocumentType.NATIONAL_ID]: 1,
  [DocumentType.PASSPORT]: 1,
  [DocumentType.DRIVING_LICENSE]: 2,
  [DocumentType.TRADE_LICENSE]: 3,
  [DocumentType.TIN_CERTIFICATE]: 3,
  [DocumentType.BANK_STATEMENT]: 4,
  [DocumentType.UTILITY_BILL]: 4,
  [DocumentType.BUSINESS_CERTIFICATE]: 5,
  [DocumentType.TAX_RETURN]: 5,
  [DocumentType.GST_CERTIFICATE]: 5,
};

/**
 * ডকুমেন্ট টাইপ ক্যাটাগরি ম্যাপিং
 */
export const DocumentTypeCategoryMap: Record<DocumentTypeValue, string> = {
  [DocumentType.NATIONAL_ID]: DocumentCategory.IDENTITY,
  [DocumentType.PASSPORT]: DocumentCategory.IDENTITY,
  [DocumentType.DRIVING_LICENSE]: DocumentCategory.IDENTITY,
  [DocumentType.TRADE_LICENSE]: DocumentCategory.BUSINESS,
  [DocumentType.TIN_CERTIFICATE]: DocumentCategory.TAX,
  [DocumentType.BANK_STATEMENT]: DocumentCategory.BANK,
  [DocumentType.UTILITY_BILL]: DocumentCategory.ADDRESS,
  [DocumentType.BUSINESS_CERTIFICATE]: DocumentCategory.BUSINESS,
  [DocumentType.TAX_RETURN]: DocumentCategory.TAX,
  [DocumentType.GST_CERTIFICATE]: DocumentCategory.TAX,
};

import { DocumentCategory } from './vendor-document.constants';
