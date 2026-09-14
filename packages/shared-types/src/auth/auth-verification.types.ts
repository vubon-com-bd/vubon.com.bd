/**
 * Auth Verification Types
 * @module shared-types/auth
 *
 * Values আসে shared-constants/auth/auth-verification.constants থেকে।
 *
 * ⚠️ Note: OtpLength security/-তে আছে।
 * এখানে AuthOtpLength।
 */

import type { AUTH_VERIFICATION } from '@vubon/shared-constants/auth';
import type { VERIFICATION_STATUS } from '@vubon/shared-constants/security';
import type { UserId, Email, Phone, OtpCode, VerifyToken } from '../common/primitives';

export type AuthVerificationStatus = (typeof VERIFICATION_STATUS)[keyof typeof VERIFICATION_STATUS];

export type AuthOtpLength = typeof AUTH_VERIFICATION.OTP_LENGTH;
export type AuthOtpExpiry = typeof AUTH_VERIFICATION.OTP_EXPIRY_SECONDS;

export interface AuthVerificationData {
  readonly id: string;
  readonly userId: UserId;
  readonly status: AuthVerificationStatus;
  readonly target: Email | Phone;
  readonly channel: 'email' | 'sms' | 'whatsapp' | 'push';
  readonly code?: OtpCode;
  readonly token?: VerifyToken;
  readonly attempts: number;
  readonly maxAttempts: number;
  readonly resendCount: number;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly verifiedAt?: string;
}

export interface AuthVerificationRequest {
  readonly userId: UserId;
  readonly target: Email | Phone;
  readonly channel: 'email' | 'sms' | 'whatsapp' | 'push';
  readonly purpose: 'email_verify' | 'phone_verify' | 'login' | 'password_reset';
}

export interface AuthVerificationResult {
  readonly verified: boolean;
  readonly status: AuthVerificationStatus;
  readonly userId?: UserId;
  readonly message?: string;
  readonly verifiedAt?: string;
}

export interface AuthVerifyInput {
  readonly userId: UserId;
  readonly code?: OtpCode;
  readonly token?: VerifyToken;
}
