import { BaseEntity } from '../common/base.types';
import { AuthLoginAttemptStatus } from '@vubon/shared-constants/src/auth/auth-login-attempt.constants';

/**
 * Login attempt status — re-export from constants
 */
export type { AuthLoginAttemptStatus as LoginAttemptStatus };

/**
 * Auth login attempt interface
 *
 * Design notes:
 * - Uses `AuthLoginAttemptStatus` from constants (single source of truth).
 * - `status` is limited to: success | failed | blocked.
 */
export interface AuthLoginAttempt extends Omit<BaseEntity, 'status'> {
  attemptId: string;
  userId: string;
  email: string;
  ipAddress: string;
  userAgent: string;
  status: AuthLoginAttemptStatus;
  failureReason?: string;
  attemptedAt: Date;
  metadata: Record<string, unknown>;
}
