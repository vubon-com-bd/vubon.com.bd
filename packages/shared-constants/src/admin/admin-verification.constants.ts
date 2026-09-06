/**
 * Admin Verification Constants (EXTENDS common/verification)
 * @module shared-constants/admin/admin-verification.constants
 */

import { VERIFICATION } from '../common/verification.constants';

export const ADMIN_VERIFICATION = {
  // Base verification from common
  ...VERIFICATION,

  // Admin verification specific
  ADMIN_VERIFICATION_PREFIX: 'admin:verification:',
  ADMIN_VERIFICATION_MAX_ATTEMPTS: 3,
  ADMIN_VERIFICATION_RESEND_COOLDOWN: 60,
  ADMIN_VERIFICATION_EXPIRY_SECONDS: 300,

  // Verification types
  ADMIN_VERIFICATION_TYPE: {
    EMAIL: 'email',
    PHONE: 'phone',
    EMAIL_CHANGE: 'email_change',
    PHONE_CHANGE: 'phone_change',
    PASSWORD_RESET: 'password_reset',
    MFA_SETUP: 'mfa_setup',
    MFA_VERIFY: 'mfa_verify',
    DEVICE_VERIFY: 'device_verify',
    SOCIAL_LINK: 'social_link',
    ACCOUNT_VERIFY: 'account_verify',
    TWO_FA_VERIFY: 'two_fa_verify',
    DOCUMENT_VERIFY: 'document_verify',
    ADMIN_APPROVAL: 'admin_approval',
    ADMIN_REJECTION: 'admin_rejection',
    ADMIN_VERIFICATION: 'admin_verification',
    SECURITY_CLEARANCE: 'security_clearance',
    BACKGROUND_CHECK: 'background_check',
  } as const,

  // Verification status
  ADMIN_VERIFICATION_STATUS: {
    PENDING: 'pending',
    VERIFIED: 'verified',
    FAILED: 'failed',
    EXPIRED: 'expired',
    IN_PROGRESS: 'in_progress',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    CANCELLED: 'cancelled',
    REQUIRES_REVIEW: 'requires_review',
    REQUIRES_ACTION: 'requires_action',
    COMPLETED: 'completed',
  } as const,

  // OTP settings
  ADMIN_OTP: {
    LENGTH: 6,
    EXPIRY_SECONDS: 300,
    MAX_ATTEMPTS: 3,
    RESEND_COOLDOWN: 60,
    ALLOWED_CHARS: '0123456789',
  },

  // Admin verification levels
  LEVELS: {
    LEVEL_1: {
      label: 'Basic',
      requirements: ['email', 'phone'],
      verification_methods: ['otp', 'email'],
    },
    LEVEL_2: {
      label: 'Standard',
      requirements: ['email', 'phone', 'nid'],
      verification_methods: ['otp', 'email', 'document'],
    },
    LEVEL_3: {
      label: 'Advanced',
      requirements: ['email', 'phone', 'nid', 'tin', 'address'],
      verification_methods: ['otp', 'email', 'document', 'video'],
    },
    LEVEL_4: {
      label: 'Premium',
      requirements: ['email', 'phone', 'nid', 'tin', 'bin', 'address', 'background_check'],
      verification_methods: ['otp', 'email', 'document', 'video', 'background'],
    },
  } as const,

  // Document verification
  DOCUMENT: {
    MAX_SIZE_MB: 10,
    ALLOWED_TYPES: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
    REQUIRED_FIELDS: ['name', 'document_number', 'issue_date', 'expiry_date'],
    VERIFICATION_TIMEOUT: 86400,
  },

  // Security clearance
  SECURITY_CLEARANCE: {
    LEVELS: ['confidential', 'secret', 'top_secret'],
    REQUIRED_FOR: ['system_admin', 'security_admin', 'database_admin'],
    VALIDITY_DAYS: 365,
    RENEWAL_DAYS: 30,
  },
} as const;

export type AdminVerificationType =
  (typeof ADMIN_VERIFICATION.ADMIN_VERIFICATION_TYPE)[keyof typeof ADMIN_VERIFICATION.ADMIN_VERIFICATION_TYPE];
export type AdminVerificationStatus =
  (typeof ADMIN_VERIFICATION.ADMIN_VERIFICATION_STATUS)[keyof typeof ADMIN_VERIFICATION.ADMIN_VERIFICATION_STATUS];
export type AdminVerificationLevel = keyof typeof ADMIN_VERIFICATION.LEVELS;
export type AdminSecurityClearance = (typeof ADMIN_VERIFICATION.SECURITY_CLEARANCE.LEVELS)[number];
