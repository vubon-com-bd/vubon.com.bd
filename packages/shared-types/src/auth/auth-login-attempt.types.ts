/**
 * Auth Login Attempt Types
 * @module shared-types/auth
 *
 * Values আসে shared-constants/auth/auth-login-attempt.constants থেকে।
 */

import type { AUTH_LOGIN_ATTEMPT, AUTH_LOGIN_ATTEMPT_STATUS } from '@vubon/shared-constants/auth';
import type { UserId, Email, Phone, IpAddress } from '../common/primitives';

export type LoginAttemptStatusValue =
  (typeof AUTH_LOGIN_ATTEMPT_STATUS)[keyof typeof AUTH_LOGIN_ATTEMPT_STATUS];

export type MaxLoginAttempts = typeof AUTH_LOGIN_ATTEMPT.MAX_ATTEMPTS;
export type LockoutDuration = typeof AUTH_LOGIN_ATTEMPT.LOCKOUT_DURATION_SECONDS;

export interface LoginAttempt {
  readonly id: string;
  readonly userId?: UserId;
  readonly identifier: Email | Phone | string;
  readonly status: LoginAttemptStatusValue;
  readonly ipAddress?: IpAddress;
  readonly userAgent?: string;
  readonly deviceId?: string;
  readonly failureReason?: string;
  readonly attemptedAt: string;
}

export interface LoginAttemptSummary {
  readonly identifier: string;
  readonly totalAttempts: number;
  readonly failedAttempts: number;
  readonly lastAttemptAt: string;
  readonly isLocked: boolean;
  readonly lockedUntil?: string;
  readonly lockoutRemainingSeconds?: number;
}

export interface AccountLockout {
  readonly userId: UserId;
  readonly reason: string;
  readonly lockedAt: string;
  readonly lockedUntil: string;
  readonly attemptCount: number;
  readonly ipAddress?: IpAddress;
}

export interface LoginAttemptFilter {
  readonly userId?: UserId;
  readonly identifier?: string;
  readonly status?: LoginAttemptStatusValue;
  readonly fromDate?: string;
  readonly toDate?: string;
}
