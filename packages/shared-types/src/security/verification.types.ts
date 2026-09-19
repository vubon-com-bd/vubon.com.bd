/**
 * Verification Types
 * @module shared-types/security
 *
 * Values আসে shared-constants/security/verification.constants থেকে।
 */

import type { VERIFICATION_TYPE, VERIFICATION_STATUS, OTP } from '@vubon/shared-constants/security';
import type { Email, Phone, OtpCode, VerifyToken } from '../common/primitives';

export type VerificationType = (typeof VERIFICATION_TYPE)[keyof typeof VERIFICATION_TYPE];
export type VerificationStatus = (typeof VERIFICATION_STATUS)[keyof typeof VERIFICATION_STATUS];
export type OtpLength = typeof OTP.LENGTH;

export interface VerificationData {
  readonly id: string;
  readonly type: VerificationType;
  readonly status: VerificationStatus;
  readonly targetId: string;
  readonly targetValue: Email | Phone | string;
  readonly code?: OtpCode;
  readonly token?: VerifyToken;
  readonly attempts: number;
  readonly maxAttempts: number;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly verifiedAt?: string;
}

export interface VerificationRequest {
  readonly type: VerificationType;
  readonly target: Email | Phone;
  readonly channel?: string;
}

export interface VerificationResult {
  readonly verified: boolean;
  readonly status: VerificationStatus;
  readonly message?: string;
  readonly verifiedAt?: string;
}

export interface OtpConfig {
  readonly length: number;
  readonly expirySeconds: number;
  readonly maxAttempts: number;
  readonly resendCooldownSeconds: number;
}

export interface KYCData {
  readonly userId: string;
  readonly status: VerificationStatus;
  readonly level: number;
  readonly documents: readonly KYCDocument[];
  readonly submittedAt: string;
  readonly reviewedAt?: string;
  readonly reviewedBy?: string;
  readonly rejectionReason?: string;
}

export interface KYCDocument {
  readonly id: string;
  readonly type: string;
  readonly number?: string;
  readonly fileUrl: string;
  readonly verified: boolean;
  readonly uploadedAt: string;
}
