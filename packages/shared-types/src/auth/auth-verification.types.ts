import { BaseEntity } from '../common/base.types';
import { AUTH_VERIFICATION } from '@vubon/shared-constants/src/auth/auth-verification.constants';

/**
 * Auth verification interface
 */
export interface AuthVerification extends BaseEntity {
  verificationId: string;
  userId: string;
  type: keyof typeof AUTH_VERIFICATION | string;
  code: string;
  status: string;
  expiresAt: Date;
  verifiedAt?: Date;
  attempts: number;
  maxAttempts: number;
  metadata: Record<string, unknown>;
}
