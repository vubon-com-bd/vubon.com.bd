/**
 * User Verification Constants
 * ইউজার ভেরিফিকেশন সম্পর্কিত কনস্ট্যান্টস
 */

export const USER_VERIFICATION = {
  METHODS: {
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

  LEVELS: {
    BASIC: 'basic',
    STANDARD: 'standard',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
    VERIFIED: 'verified',
  },

  DEFAULTS: {
    MAX_ATTEMPTS: 3,
    EXPIRY_DAYS: 30,
    CODE_LENGTH: 6,
    RESEND_COOLDOWN: 60,
  },
} as const;
