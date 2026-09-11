import { BaseEntity } from '../common/base.types';
import { AUTH_VERIFICATION } from '@vubon/shared-constants/src/auth/auth-verification.constants';
import { STATUS } from '@vubon/shared-constants/src/common/status.constants';

/**
 * Verification type and status values
 */
export type AuthVerificationType = (typeof AUTH_VERIFICATION)[keyof typeof AUTH_VERIFICATION];
export type VerificationStatus = (typeof STATUS.VERIFICATION)[keyof typeof STATUS.VERIFICATION];

/**
 * Auth verification interface
 * @internal — code is hashed, never stored plain.
 */
export interface AuthVerification extends BaseEntity {
  verificationId: string;
  userId: string;
  type: AuthVerificationType;
  /** @internal bcrypt hash of code */
  codeHash: string;
  status: VerificationStatus;
  expiresAt: Date;
  verifiedAt?: Date;
  attempts: number;
  maxAttempts: number;
  metadata: Record<string, unknown>;
}
