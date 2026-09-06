/**
 * Payment Verification Constants (EXTENDS common/verification + common/status)
 * @module shared-constants/business/payment/payment-verification.constants
 */

import { VERIFICATION } from '../../common/verification.constants';
import { STATUS } from '../../common/status.constants';
import { SECURITY } from '../../common/security.constants';
import { TYPES } from '../../common/types.constants';

export const PAYMENT_VERIFICATION = {
  // Base verification from common
  ...VERIFICATION,

  // Status from common
  STATUS: STATUS,

  // Security from common
  SECURITY: SECURITY,

  // Types from common
  TYPES: TYPES,

  // Verification specific
  VERIFICATION_TIMEOUT_SECONDS: 300,
  MAX_VERIFICATION_ATTEMPTS: 3,
  VERIFICATION_CACHE_TTL: 3600,
  VERIFICATION_PREFIX: 'payment:verification:',
  VERIFICATION_EXPIRY_SECONDS: 600,

  // Verification status
  PAYMENT_VERIFICATION_STATUS: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    FAILED: 'failed',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    REJECTED: 'rejected',
    APPROVED: 'approved',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    REQUIRES_ACTION: 'requires_action',
    REQUIRES_CONFIRMATION: 'requires_confirmation',
  } as const,

  // Verification type
  PAYMENT_VERIFICATION_TYPE: {
    OTP: 'otp',
    PIN: 'pin',
    BIOMETRIC: 'biometric',
    SMS: 'sms',
    EMAIL: 'email',
    QR_CODE: 'qr_code',
    FACE_ID: 'face_id',
    FINGERPRINT: 'fingerprint',
    TWO_FA: 'two_fa',
    SECURITY_QUESTION: 'security_question',
    KYC: 'kyc',
    DOCUMENT: 'document',
    LIVE: 'live',
    VIDEO: 'video',
  } as const,

  // Verification method
  PAYMENT_VERIFICATION_METHOD: {
    AUTO: 'auto',
    MANUAL: 'manual',
    THIRD_PARTY: 'third_party',
    HYBRID: 'hybrid',
    AI: 'ai',
  } as const,

  // OTP settings
  PAYMENT_OTP: {
    LENGTH: 6,
    EXPIRY_SECONDS: 300,
    MAX_ATTEMPTS: 3,
    RESEND_COOLDOWN: 60,
    ALLOWED_CHARS: '0123456789',
    GENERATE_METHOD: 'random',
    RESEND_MAX: 5,
  } as const,

  // Verification limits
  PAYMENT_VERIFICATION_LIMITS: {
    MAX_ATTEMPTS_PER_HOUR: 10,
    MAX_ATTEMPTS_PER_DAY: 50,
    LOCKOUT_DURATION: 900, // 15 minutes
    VERIFICATION_TIMEOUT: 300, // 5 minutes
  } as const,
} as const;

export type PaymentVerificationStatus =
  (typeof PAYMENT_VERIFICATION.PAYMENT_VERIFICATION_STATUS)[keyof typeof PAYMENT_VERIFICATION.PAYMENT_VERIFICATION_STATUS];
export type PaymentVerificationType =
  (typeof PAYMENT_VERIFICATION.PAYMENT_VERIFICATION_TYPE)[keyof typeof PAYMENT_VERIFICATION.PAYMENT_VERIFICATION_TYPE];
export type PaymentVerificationMethod =
  (typeof PAYMENT_VERIFICATION.PAYMENT_VERIFICATION_METHOD)[keyof typeof PAYMENT_VERIFICATION.PAYMENT_VERIFICATION_METHOD];

export const PAYMENT_VERIFICATION_STATUS_LABELS: Record<PaymentVerificationStatus, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  failed: 'Failed',
  expired: 'Expired',
  cancelled: 'Cancelled',
  rejected: 'Rejected',
  approved: 'Approved',
  verified: 'Verified',
  unverified: 'Unverified',
  requires_action: 'Requires Action',
  requires_confirmation: 'Requires Confirmation',
};

export const PAYMENT_VERIFICATION_STATUS_COLORS: Record<PaymentVerificationStatus, string> = {
  pending: '#eab308',
  in_progress: '#60a5fa',
  completed: '#22c55e',
  failed: '#ef4444',
  expired: '#9ca3af',
  cancelled: '#dc2626',
  rejected: '#ef4444',
  approved: '#22c55e',
  verified: '#22c55e',
  unverified: '#f59e0b',
  requires_action: '#f59e0b',
  requires_confirmation: '#eab308',
};
