/**
 * User Verification Types Module
 * User verification types for the e-commerce platform
 * Handles email verification, phone verification, identity verification, and document verification
 */

import { authentication } from '@vubon/shared-constants';
import { UserId, Email, PhoneNumber, Timestamp } from '../auth/core-primitives.types';

// Import verification constants from shared-constants
const {
  VERIFICATION_TYPE,
  VERIFICATION_CODE_LENGTH,
  VERIFICATION_CODE_EXPIRY,
  VERIFICATION_MAX_ATTEMPTS,
  VERIFICATION_CONFIG,
} = authentication;

/**
 * Verification Type
 * Types of verification (re-exported from shared-constants)
 */
export type VerificationType = (typeof VERIFICATION_TYPE)[keyof typeof VERIFICATION_TYPE];

/**
 * Verification Status
 * Status of verification
 */
export type VerificationStatus = 'pending' | 'verified' | 'failed' | 'expired' | 'revoked';

/**
 * Verification Method
 * Methods used for verification
 */
export type VerificationMethod = 'email' | 'sms' | 'authenticator' | 'backup_codes' | 'document';

/**
 * Verification
 * User verification record
 */
export interface Verification {
  id: string;
  userId: UserId;
  type: VerificationType;
  status: VerificationStatus;
  method: VerificationMethod;
  value: string;
  code?: string;
  expiresAt: Timestamp;
  createdAt: Timestamp;
  verifiedAt?: Timestamp;
  attempts: number;
  maxAttempts: number;
  metadata?: Record<string, unknown>;
}

/**
 * Verification Request
 * Request to initiate verification
 */
export interface VerificationRequest {
  userId: UserId;
  type: VerificationType;
  method: VerificationMethod;
  value: string;
  metadata?: Record<string, unknown>;
}

/**
 * Verification Response
 * Response after verification initiation
 */
export interface VerificationResponse {
  success: boolean;
  data?: {
    verificationId: string;
    type: VerificationType;
    method: VerificationMethod;
    status: VerificationStatus;
    expiresAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Verification Confirm Request
 * Request to confirm verification
 */
export interface VerificationConfirmRequest {
  verificationId: string;
  userId: UserId;
  code: string;
  metadata?: Record<string, unknown>;
}

/**
 * Verification Confirm Response
 * Response after verification confirmation
 */
export interface VerificationConfirmResponse {
  success: boolean;
  data?: {
    verified: boolean;
    type: VerificationType;
    verifiedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Verification Resend Request
 * Request to resend verification
 */
export interface VerificationResendRequest {
  verificationId: string;
  userId: UserId;
  metadata?: Record<string, unknown>;
}

/**
 * Verification Resend Response
 * Response after verification resend
 */
export interface VerificationResendResponse {
  success: boolean;
  data?: {
    verificationId: string;
    expiresAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Email Verification
 * Email verification specific data
 */
export interface EmailVerification {
  id: string;
  userId: UserId;
  email: Email;
  status: VerificationStatus;
  token: string;
  expiresAt: Timestamp;
  createdAt: Timestamp;
  verifiedAt?: Timestamp;
  attempts: number;
  metadata?: Record<string, unknown>;
}

/**
 * Phone Verification
 * Phone verification specific data
 */
export interface PhoneVerification {
  id: string;
  userId: UserId;
  phoneNumber: PhoneNumber;
  countryCode: string;
  status: VerificationStatus;
  code: string;
  expiresAt: Timestamp;
  createdAt: Timestamp;
  verifiedAt?: Timestamp;
  attempts: number;
  metadata?: Record<string, unknown>;
}

/**
 * Document Verification
 * Document verification specific data
 */
export interface DocumentVerification {
  id: string;
  userId: UserId;
  documentType: string;
  documentNumber: string;
  status: VerificationStatus;
  frontImage: string;
  backImage?: string;
  selfieImage?: string;
  expiresAt?: Timestamp;
  createdAt: Timestamp;
  verifiedAt?: Timestamp;
  rejectionReason?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Verification Filter
 * Filter criteria for verification queries
 */
export interface VerificationFilter {
  userId?: UserId[];
  type?: VerificationType[];
  status?: VerificationStatus[];
  method?: VerificationMethod[];
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  verified?: boolean;
}

/**
 * Verification Statistics
 * Statistical data about verifications
 */
export interface VerificationStatistics {
  totalVerifications: number;
  byType: Record<VerificationType, number>;
  byStatus: Record<VerificationStatus, number>;
  byMethod: Record<VerificationMethod, number>;
  successRate: number;
  failureRate: number;
  averageAttempts: number;
  averageTimeToVerify: number;
  pendingVerifications: number;
  expiredVerifications: number;
  timestamp: Timestamp;
}

/**
 * Verification Response Builder
 * Helper for building verification responses
 */
export interface VerificationResponseBuilder {
  initiateSuccess(response: VerificationResponse): VerificationResponse;
  confirmSuccess(response: VerificationConfirmResponse): VerificationConfirmResponse;
  resendSuccess(response: VerificationResendResponse): VerificationResendResponse;
  error(
    code: string,
    message: string,
    details?: Record<string, unknown>
  ): VerificationErrorResponse;
}

/**
 * Verification Error Response
 * Error response for verification operations
 */
export interface VerificationErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Verification Constants
 * Verification-related constants
 */
export const VERIFICATION_TYPES = VERIFICATION_TYPE;
export const VERIFICATION_STATUSES = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  FAILED: 'failed',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
} as const;

export const VERIFICATION_CONFIG_DEFAULT = VERIFICATION_CONFIG;

/**
 * Default Verification Configuration
 */
export const DEFAULT_VERIFICATION_CONFIG = {
  codeLength: VERIFICATION_CODE_LENGTH,
  codeExpiry: VERIFICATION_CODE_EXPIRY,
  maxAttempts: VERIFICATION_MAX_ATTEMPTS,
  requireEmailVerification: true,
  requirePhoneVerification: false,
  requireDocumentVerification: false,
  allowResendAfter: 60, // 1 minute
  maxResendAttempts: 5,
} as const;

/**
 * Verification Audit Log
 * Audit log for verification operations
 */
export interface VerificationAuditLog {
  id: string;
  userId: UserId;
  verificationId: string;
  operation: 'initiate' | 'confirm' | 'resend' | 'expire' | 'fail';
  type: VerificationType;
  status: VerificationStatus;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
  timestamp: Timestamp;
}

/**
 * Verification Webhook
 * Webhook payload for verification events
 */
export interface VerificationWebhook {
  event: string;
  userId: UserId;
  type: VerificationType;
  status: VerificationStatus;
  timestamp: Timestamp;
  data: Record<string, unknown>;
}
