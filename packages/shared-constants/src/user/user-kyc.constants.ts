/**
 * User KYC Constants (EXTENDS common/types)
 * @module shared-constants/user/user-kyc.constants
 */

import { TYPES } from '../common/types.constants';

export const USER_KYC = {
  // Base types from common
  ...TYPES,

  // KYC levels
  LEVELS: {
    LEVEL_0: {
      id: 'level_0',
      name: 'Guest',
      description: 'Basic guest access',
      requirements: [],
      limits: {
        daily: 0,
        monthly: 0,
        per_transaction: 0,
      },
      features: ['browse', 'search'],
    },
    LEVEL_1: {
      id: 'level_1',
      name: 'Basic',
      description: 'Basic verified user',
      requirements: ['email_verified', 'phone_verified'],
      limits: {
        daily: 5000,
        monthly: 50000,
        per_transaction: 1000,
      },
      features: ['browse', 'search', 'order', 'payment', 'review'],
    },
    LEVEL_2: {
      id: 'level_2',
      name: 'Verified',
      description: 'Identity verified user',
      requirements: ['email_verified', 'phone_verified', 'nid_verified', 'address_verified'],
      limits: {
        daily: 50000,
        monthly: 500000,
        per_transaction: 10000,
      },
      features: ['browse', 'search', 'order', 'payment', 'review', 'sell', 'withdraw'],
    },
    LEVEL_3: {
      id: 'level_3',
      name: 'Premium',
      description: 'Premium verified user',
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
        per_transaction: 50000,
      },
      features: [
        'browse',
        'search',
        'order',
        'payment',
        'review',
        'sell',
        'withdraw',
        'bulk_order',
        'premium_support',
      ],
    },
    LEVEL_4: {
      id: 'level_4',
      name: 'Enterprise',
      description: 'Enterprise verified user',
      requirements: [
        'email_verified',
        'phone_verified',
        'nid_verified',
        'address_verified',
        'tin_verified',
        'bin_verified',
      ],
      limits: {
        daily: 1000000,
        monthly: 10000000,
        per_transaction: 200000,
      },
      features: [
        'browse',
        'search',
        'order',
        'payment',
        'review',
        'sell',
        'withdraw',
        'bulk_order',
        'priority_support',
        'api_access',
        'wholesale',
      ],
    },
  } as const,

  // KYC status
  STATUS: {
    PENDING: 'pending',
    SUBMITTED: 'submitted',
    IN_REVIEW: 'in_review',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
    SUSPENDED: 'suspended',
    NEEDS_UPDATE: 'needs_update',
    PARTIAL: 'partial',
    COMPLETED: 'completed',
  } as const,

  // KYC document types
  DOCUMENT_TYPES: {
    NID: 'nid',
    TIN: 'tin',
    BIN: 'bin',
    PASSPORT: 'passport',
    DRIVING_LICENSE: 'driving_license',
    BIRTH_CERTIFICATE: 'birth_certificate',
    UTILITY_BILL: 'utility_bill',
    BANK_STATEMENT: 'bank_statement',
    TAX_RETURN: 'tax_return',
    TRADE_LICENSE: 'trade_license',
    COMPANY_REGISTRATION: 'company_registration',
    PHOTO: 'photo',
    SIGNATURE: 'signature',
    SELFIE: 'selfie',
    VIDEO: 'video',
  } as const,

  // KYC fields
  FIELDS: {
    FULL_NAME: 'fullName',
    DATE_OF_BIRTH: 'dateOfBirth',
    GENDER: 'gender',
    NATIONALITY: 'nationality',
    NID_NUMBER: 'nidNumber',
    TIN_NUMBER: 'tinNumber',
    BIN_NUMBER: 'binNumber',
    PASSPORT_NUMBER: 'passportNumber',
    DRIVING_LICENSE_NUMBER: 'drivingLicenseNumber',
    BIRTH_CERTIFICATE_NUMBER: 'birthCertificateNumber',
    ADDRESS: 'address',
    CITY: 'city',
    STATE: 'state',
    COUNTRY: 'country',
    POSTAL_CODE: 'postalCode',
    PHONE: 'phone',
    EMAIL: 'email',
    OCCUPATION: 'occupation',
    INCOME_RANGE: 'incomeRange',
    SOURCE_OF_FUNDS: 'sourceOfFunds',
    PURPOSE_OF_ACCOUNT: 'purposeOfAccount',
  } as const,

  // KYC limits
  LIMITS: {
    MAX_ATTEMPTS: 3,
    MAX_SUBMISSIONS: 5,
    REVIEW_TIMEOUT_HOURS: 72,
    EXPIRY_DAYS: 365,
    MAX_DOCUMENTS: 10,
    DOCUMENT_MAX_SIZE_MB: 10,
    ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
    MIN_AGE: 18,
    MAX_AGE: 120,
  },

  // KYC verification methods
  VERIFICATION_METHODS: {
    MANUAL: 'manual',
    AUTOMATED: 'automated',
    AI: 'ai',
    THIRD_PARTY: 'third_party',
    HYBRID: 'hybrid',
  } as const,

  // KYC risk levels
  RISK_LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
  } as const,

  // Default values
  DEFAULTS: {
    LEVEL: 'level_0',
    STATUS: 'pending',
    RISK_LEVEL: 'low',
    VERIFICATION_METHOD: 'automated',
  },
} as const;

export type UserKycLevel = keyof typeof USER_KYC.LEVELS;
export type UserKycStatus = (typeof USER_KYC.STATUS)[keyof typeof USER_KYC.STATUS];
export type UserKycDocumentType =
  (typeof USER_KYC.DOCUMENT_TYPES)[keyof typeof USER_KYC.DOCUMENT_TYPES];
export type UserKycField = (typeof USER_KYC.FIELDS)[keyof typeof USER_KYC.FIELDS];
export type UserKycVerificationMethod =
  (typeof USER_KYC.VERIFICATION_METHODS)[keyof typeof USER_KYC.VERIFICATION_METHODS];
export type UserKycRiskLevel = (typeof USER_KYC.RISK_LEVELS)[keyof typeof USER_KYC.RISK_LEVELS];
