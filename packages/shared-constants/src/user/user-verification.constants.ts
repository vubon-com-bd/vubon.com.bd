/**
 * User Verification Constants (EXTENDS common/verification)
 * @module shared-constants/user/user-verification.constants
 */

import { VERIFICATION } from '../common/verification.constants';

export const USER_VERIFICATION = {
  // Base verification from common
  ...VERIFICATION,

  // User verification types
  TYPES: {
    EMAIL: 'email',
    PHONE: 'phone',
    IDENTITY: 'identity',
    ADDRESS: 'address',
    AGE: 'age',
    NID: 'nid',
    TIN: 'tin',
    BIN: 'bin',
    PASSPORT: 'passport',
    DRIVING_LICENSE: 'driving_license',
    BIRTH_CERTIFICATE: 'birth_certificate',
    SOCIAL: 'social',
    DEVICE: 'device',
    SESSION: 'session',
    TWO_FA: 'two_fa',
    BIOMETRIC: 'biometric',
    DOCUMENT: 'document',
    VIDEO: 'video',
    LIVE: 'live',
    FACE: 'face',
  } as const,

  // Verification status
  STATUS: {
    PENDING: 'pending',
    SUBMITTED: 'submitted',
    IN_REVIEW: 'in_review',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REVOKED: 'revoked',
    SUSPENDED: 'suspended',
  } as const,

  // Verification levels
  LEVELS: {
    LEVEL_0: {
      label: 'Unverified',
      requirements: [],
      limits: {
        daily: 0,
        monthly: 0,
        transaction: 0,
      },
    },
    LEVEL_1: {
      label: 'Basic',
      requirements: ['email', 'phone'],
      limits: {
        daily: 5000,
        monthly: 50000,
        transaction: 1000,
      },
    },
    LEVEL_2: {
      label: 'Verified',
      requirements: ['email', 'phone', 'nid', 'address'],
      limits: {
        daily: 50000,
        monthly: 500000,
        transaction: 10000,
      },
    },
    LEVEL_3: {
      label: 'Premium',
      requirements: ['email', 'phone', 'nid', 'address', 'tin'],
      limits: {
        daily: 200000,
        monthly: 2000000,
        transaction: 50000,
      },
    },
    LEVEL_4: {
      label: 'Enterprise',
      requirements: ['email', 'phone', 'nid', 'address', 'tin', 'bin', 'passport'],
      limits: {
        daily: 1000000,
        monthly: 10000000,
        transaction: 200000,
      },
    },
  } as const,

  // Verification documents
  DOCUMENTS: {
    NID: {
      allowed_types: ['smart_card', 'old_card'],
      max_size_mb: 5,
      allowed_extensions: ['jpg', 'jpeg', 'png', 'pdf'],
      required_fields: ['nid_number', 'date_of_birth', 'name'],
    },
    TIN: {
      max_size_mb: 5,
      allowed_extensions: ['jpg', 'jpeg', 'png', 'pdf'],
      required_fields: ['tin_number', 'name', 'address'],
    },
    BIN: {
      max_size_mb: 5,
      allowed_extensions: ['jpg', 'jpeg', 'png', 'pdf'],
      required_fields: ['bin_number', 'company_name', 'address'],
    },
    PASSPORT: {
      max_size_mb: 5,
      allowed_extensions: ['jpg', 'jpeg', 'png', 'pdf'],
      required_fields: ['passport_number', 'date_of_birth', 'nationality'],
    },
    DRIVING_LICENSE: {
      max_size_mb: 5,
      allowed_extensions: ['jpg', 'jpeg', 'png', 'pdf'],
      required_fields: ['license_number', 'date_of_birth', 'name'],
    },
    BIRTH_CERTIFICATE: {
      max_size_mb: 5,
      allowed_extensions: ['jpg', 'jpeg', 'png', 'pdf'],
      required_fields: ['certificate_number', 'date_of_birth', 'name'],
    },
  } as const,

  // Verification limits
  LIMITS: {
    MAX_ATTEMPTS: 3,
    MAX_SUBMISSIONS: 5,
    VERIFICATION_TIMEOUT: 300,
    RESEND_COOLDOWN: 60,
    OTP_LENGTH: 6,
    OTP_EXPIRY: 300,
    MAX_OTP_ATTEMPTS: 3,
    DOCUMENT_MAX_SIZE: 10,
  },

  // Verification settings
  SETTINGS: {
    AUTO_VERIFY_EMAIL: true,
    AUTO_VERIFY_PHONE: false,
    VERIFY_AGE: true,
    MINIMUM_AGE: 18,
    KYC_REQUIRED: true,
    TWO_FA_REQUIRED: false,
    BIOMETRIC_ENABLED: false,
    FACE_VERIFICATION_ENABLED: false,
    VIDEO_VERIFICATION_ENABLED: false,
    LIVE_VERIFICATION_ENABLED: false,
  },
} as const;

export type UserVerificationType =
  (typeof USER_VERIFICATION.TYPES)[keyof typeof USER_VERIFICATION.TYPES];
export type UserVerificationStatus =
  (typeof USER_VERIFICATION.STATUS)[keyof typeof USER_VERIFICATION.STATUS];
export type UserVerificationLevel = keyof typeof USER_VERIFICATION.LEVELS;
export type UserVerificationDocument = keyof typeof USER_VERIFICATION.DOCUMENTS;
