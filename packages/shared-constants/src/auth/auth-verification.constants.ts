/**
 * Auth Verification Constants
 * প্রমাণীকরণ যাচাইকরণ সম্পর্কিত কনস্ট্যান্টস
 */

export const AUTH_VERIFICATION = {
  // Verification types
  TYPES: {
    EMAIL: 'email',
    PHONE: 'phone',
    NID: 'nid',
    BIRTH_REG: 'birth_reg',
    PASSPORT: 'passport',
    DRIVING_LICENSE: 'driving_license',
    ADDRESS: 'address',
    BANK_ACCOUNT: 'bank_account',
    MOBILE_WALLET: 'mobile_wallet',
    TAX_ID: 'tax_id',
    BUSINESS_LICENSE: 'business_license',
    TRADE_LICENSE: 'trade_license',
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
    OTP_LENGTH: 6,
    OTP_EXPIRY: 300, // 5 minutes
    MAX_ATTEMPTS: 3,
    RESEND_COOLDOWN: 60, // 1 minute
    VERIFICATION_TOKEN_EXPIRY: 86400, // 24 hours
  },
} as const;

export type AuthVerificationType =
  (typeof AUTH_VERIFICATION.TYPES)[keyof typeof AUTH_VERIFICATION.TYPES];
export type AuthVerificationStatus =
  (typeof AUTH_VERIFICATION.STATUS)[keyof typeof AUTH_VERIFICATION.STATUS];
export type AuthVerificationMethod =
  (typeof AUTH_VERIFICATION.METHODS)[keyof typeof AUTH_VERIFICATION.METHODS];
