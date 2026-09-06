/**
 * Auth Verification Constants (EXTENDS common/verification)
 * @module shared-constants/auth/auth-verification.constants
 */

import { VERIFICATION } from '../common/verification.constants';

export const AUTH_VERIFICATION = {
  // Base verification from common
  ...VERIFICATION,

  // Auth verification specific
  AUTH_VERIFICATION_PREFIX: 'auth:verification:',
  AUTH_VERIFICATION_MAX_ATTEMPTS: 3,
  AUTH_VERIFICATION_RESEND_COOLDOWN: 60, // 1 minute
  AUTH_VERIFICATION_EXPIRY_SECONDS: 300, // 5 minutes

  // Verification types
  AUTH_VERIFICATION_TYPE: {
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
  } as const,

  // Verification status
  AUTH_VERIFICATION_STATUS: {
    PENDING: 'pending',
    VERIFIED: 'verified',
    FAILED: 'failed',
    EXPIRED: 'expired',
    IN_PROGRESS: 'in_progress',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    CANCELLED: 'cancelled',
  } as const,

  // OTP settings
  AUTH_OTP: {
    LENGTH: 6,
    EXPIRY_SECONDS: 300,
    MAX_ATTEMPTS: 3,
    RESEND_COOLDOWN: 60,
    ALLOWED_CHARS: '0123456789',
  },
} as const;

export type AuthVerificationType =
  (typeof AUTH_VERIFICATION.AUTH_VERIFICATION_TYPE)[keyof typeof AUTH_VERIFICATION.AUTH_VERIFICATION_TYPE];
export type AuthVerificationStatus =
  (typeof AUTH_VERIFICATION.AUTH_VERIFICATION_STATUS)[keyof typeof AUTH_VERIFICATION.AUTH_VERIFICATION_STATUS];
