/**
 * Auth MFA Types
 * @module shared-types/auth
 *
 * Values আসে shared-constants/auth/auth-mfa.constants থেকে।
 */

import type { AUTH_MFA, AUTH_MFA_METHOD } from '@vubon/shared-constants/auth';
import type { UserId, OtpCode } from '../common/primitives';

export type MfaMethodValue = (typeof AUTH_MFA_METHOD)[keyof typeof AUTH_MFA_METHOD];

export type MfaOtpLength = typeof AUTH_MFA.OTP_LENGTH;
export type MfaBackupCodesCount = typeof AUTH_MFA.BACKUP_CODES_COUNT;
export type MfaTotpPeriod = typeof AUTH_MFA.TOTP_PERIOD_SECONDS;

export interface MfaConfig {
  readonly userId: UserId;
  readonly enabled: boolean;
  readonly primaryMethod: MfaMethodValue;
  readonly backupMethods: readonly MfaMethodValue[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface MfaSecret {
  readonly userId: UserId;
  readonly secret: string;
  readonly method: MfaMethodValue;
  readonly verified: boolean;
  readonly createdAt: string;
  readonly verifiedAt?: string;
}

export interface MfaSetupResult {
  readonly secret: string;
  readonly qrCodeUrl: string;
  readonly otpauthUrl: string;
  readonly backupCodes: readonly string[];
}

export interface MfaVerifyInput {
  readonly userId: UserId;
  readonly code: OtpCode;
  readonly method: MfaMethodValue;
}

export interface MfaVerifyResult {
  readonly verified: boolean;
  readonly method: MfaMethodValue;
  readonly usedBackupCode: boolean;
  readonly remainingBackupCodes: number;
  readonly verifiedAt: string;
}

export interface MfaBackupCode {
  readonly userId: UserId;
  readonly code: string;
  readonly used: boolean;
  readonly usedAt?: string;
  readonly createdAt: string;
}

export interface MfaChallenge {
  readonly challengeId: string;
  readonly userId: UserId;
  readonly method: MfaMethodValue;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly attempts: number;
}
