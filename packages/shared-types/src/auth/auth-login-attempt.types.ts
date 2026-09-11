import { BaseEntity } from '../common/base.types';
import { AUTH_LOGIN_ATTEMPT } from '@vubon/shared-constants/src/auth/auth-login-attempt.constants';

/**
 * Login attempt status — from constants but filtered
 */
export type LoginAttemptStatus = (typeof AUTH_LOGIN_ATTEMPT)['SUCCESS' | 'FAILED' | 'BLOCKED'];

/**
 * Auth login attempt interface
 */
export interface AuthLoginAttempt extends Omit<BaseEntity, 'status'> {
  attemptId: string;
  userId: string;
  email: string;
  ipAddress: string;
  userAgent: string;
  status: LoginAttemptStatus;
  failureReason?: string;
  attemptedAt: Date;
  metadata: Record<string, unknown>;
}
