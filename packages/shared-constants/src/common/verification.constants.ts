/**
 * Verification Constants
 * @module shared-constants/common/verification.constants
 */

export const VERIFICATION = {
  // OTP settings
  OTP: {
    LENGTH: 6,
    EXPIRY_SECONDS: 300, // 5 minutes
    MAX_ATTEMPTS: 3,
    RESEND_COOLDOWN: 60, // 1 minute
  },

  // Email verification
  EMAIL: {
    TOKEN_LENGTH: 64,
    EXPIRY_HOURS: 24,
    MAX_ATTEMPTS: 3,
  },

  // Phone verification
  PHONE: {
    OTP_LENGTH: 6,
    EXPIRY_SECONDS: 300,
    MAX_ATTEMPTS: 3,
    RESEND_COOLDOWN: 60,
  },

  // Password reset
  PASSWORD_RESET: {
    TOKEN_LENGTH: 64,
    EXPIRY_HOURS: 1,
    MAX_ATTEMPTS: 3,
  },

  // Two-factor authentication
  TWO_FA: {
    CODE_LENGTH: 6,
    EXPIRY_SECONDS: 120, // 2 minutes
    MAX_ATTEMPTS: 5,
    RECOVERY_CODES: 10,
  },

  // Biometric verification
  BIOMETRIC: {
    MAX_ATTEMPTS: 5,
    LOCKOUT_SECONDS: 300,
    REQUIRED_CONFIRMATIONS: 2,
  },

  // Document verification
  DOCUMENT: {
    MAX_SIZE_MB: 10,
    ALLOWED_TYPES: ['jpg', 'jpeg', 'png', 'pdf'],
    EXPIRY_DAYS: 30,
  },

  // NID verification (Bangladesh)
  NID: {
    ALLOWED_TYPES: ['smart_card', 'old_card'],
    MAX_ATTEMPTS: 3,
    VERIFICATION_TIMEOUT: 300, // seconds
  },

  // TIN verification (Bangladesh)
  TIN: {
    MAX_ATTEMPTS: 3,
    VERIFICATION_TIMEOUT: 300,
  },

  // BIN verification (Bangladesh)
  BIN: {
    MAX_ATTEMPTS: 3,
    VERIFICATION_TIMEOUT: 300,
  },

  // Address verification
  ADDRESS: {
    MAX_ATTEMPTS: 3,
    VERIFICATION_TIMEOUT: 600,
  },

  // Age verification
  AGE: {
    MINIMUM_AGE: 18,
    MAXIMUM_AGE: 120,
    REQUIRED: true,
  },

  // Session verification
  SESSION: {
    MAX_CONCURRENT_SESSIONS: 5,
    SESSION_TIMEOUT_MINUTES: 60,
    REMEMBER_ME_DAYS: 30,
  },

  // Device verification
  DEVICE: {
    MAX_DEVICES: 5,
    UNKNOWN_DEVICE_TIMEOUT: 300,
    TRUSTED_DEVICE_EXPIRY_DAYS: 90,
  },

  // KYC levels
  KYC: {
    LEVEL_0: {
      name: 'Guest',
      requirements: [],
      limits: {
        daily: 0,
        monthly: 0,
        transaction: 0,
      },
    },
    LEVEL_1: {
      name: 'Basic',
      requirements: ['email_verified', 'phone_verified'],
      limits: {
        daily: 5000,
        monthly: 50000,
        transaction: 1000,
      },
    },
    LEVEL_2: {
      name: 'Verified',
      requirements: ['email_verified', 'phone_verified', 'nid_verified', 'address_verified'],
      limits: {
        daily: 50000,
        monthly: 500000,
        transaction: 10000,
      },
    },
    LEVEL_3: {
      name: 'Premium',
      requirements: [
        'email_verified',
        'phone_verified',
        'nid_verified',
        'address_verified',
        'tin_verified',
      ],
      limits: {
        daily: 200000,
        monthly: 2000000,
        transaction: 50000,
      },
    },
  },

  // Verification types
  TYPES: {
    EMAIL: 'email',
    PHONE: 'phone',
    NID: 'nid',
    TIN: 'tin',
    BIN: 'bin',
    ADDRESS: 'address',
    AGE: 'age',
    DOCUMENT: 'document',
    BIOMETRIC: 'biometric',
    TWO_FA: 'two_fa',
    KYC: 'kyc',
    DEVICE: 'device',
    SESSION: 'session',
  } as const,
} as const;

export type VerificationType = (typeof VERIFICATION.TYPES)[keyof typeof VERIFICATION.TYPES];
export type KYCLevel = keyof typeof VERIFICATION.KYC;
