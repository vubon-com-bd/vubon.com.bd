/**
 * Common Verification
 * সাধারণ ভেরিফিকেশন কনস্ট্যান্টস
 */

export const VERIFICATION = {
  // Verification types
  TYPES: {
    EMAIL: 'email',
    PHONE: 'phone',
    NID: 'nid',
    PASSPORT: 'passport',
    DRIVING_LICENSE: 'driving_license',
    BIRTH_REGISTRATION: 'birth_registration',
    TAX_ID: 'tax_id',
    BUSINESS_LICENSE: 'business_license',
    TRADE_LICENSE: 'trade_license',
    BANK_ACCOUNT: 'bank_account',
    MOBILE_WALLET: 'mobile_wallet',
    ADDRESS: 'address',
    SOCIAL: 'social',
    BIOMETRIC: 'biometric',
    FACIAL: 'facial',
  },

  // Verification status
  STATUS: {
    PENDING: 'pending',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
    IN_PROGRESS: 'in_progress',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    AWAITING_REVIEW: 'awaiting_review',
  },

  // Verification methods
  METHODS: {
    OTP: 'otp',
    MAGIC_LINK: 'magic_link',
    DOCUMENT: 'document',
    BIOMETRIC: 'biometric',
    SOCIAL: 'social',
    GOVERNMENT: 'government',
    THIRD_PARTY: 'third_party',
    MANUAL: 'manual',
  },

  // Default values
  DEFAULTS: {
    MAX_ATTEMPTS: 3,
    EXPIRY_DAYS: 30,
    CODE_LENGTH: 6,
    RESEND_COOLDOWN: 60,
  },
} as const;

export type VerificationType = (typeof VERIFICATION.TYPES)[keyof typeof VERIFICATION.TYPES];
export type VerificationStatus = (typeof VERIFICATION.STATUS)[keyof typeof VERIFICATION.STATUS];
export type VerificationMethod = (typeof VERIFICATION.METHODS)[keyof typeof VERIFICATION.METHODS];
