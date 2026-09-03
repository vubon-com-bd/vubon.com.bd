/**
 * User KYC Constants
 * ইউজার KYC সম্পর্কিত কনস্ট্যান্টস
 */

export const USER_KYC = {
  // KYC types
  TYPES: {
    NID: 'nid',
    PASSPORT: 'passport',
    DRIVING_LICENSE: 'driving_license',
    BIRTH_REGISTRATION: 'birth_registration',
    TAX_ID: 'tax_id',
    BUSINESS_LICENSE: 'business_license',
    TRADE_LICENSE: 'trade_license',
    BANK_STATEMENT: 'bank_statement',
    UTILITY_BILL: 'utility_bill',
    MOBILE_BILL: 'mobile_bill',
    ADDRESS_PROOF: 'address_proof',
    INCOME_PROOF: 'income_proof',
    EDUCATION_PROOF: 'education_proof',
  },

  // KYC status
  STATUS: {
    NOT_SUBMITTED: 'not_submitted',
    SUBMITTED: 'submitted',
    PENDING: 'pending',
    UNDER_REVIEW: 'under_review',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    NEEDS_REVISION: 'needs_revision',
  },

  // KYC risk levels
  RISK_LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
  },

  // Document types
  DOCUMENT_TYPES: {
    IDENTITY: 'identity',
    ADDRESS: 'address',
    INCOME: 'income',
    BUSINESS: 'business',
    EDUCATION: 'education',
    OTHER: 'other',
  },

  // Default values
  DEFAULTS: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'pdf'],
    EXPIRY_DAYS: 365,
    REVIEW_DAYS: 7,
  },
} as const;

export type UserKYCType = (typeof USER_KYC.TYPES)[keyof typeof USER_KYC.TYPES];
export type UserKYCStatus = (typeof USER_KYC.STATUS)[keyof typeof USER_KYC.STATUS];
export type UserKYCRiskLevel = (typeof USER_KYC.RISK_LEVELS)[keyof typeof USER_KYC.RISK_LEVELS];
export type UserKYCDocumentType =
  (typeof USER_KYC.DOCUMENT_TYPES)[keyof typeof USER_KYC.DOCUMENT_TYPES];
