/**
 * Login Attempt Tracker.
 * @module shared-utils/auth/login-attempt-tracker
 */
import {
  AUTH_LOGIN_ATTEMPT,
  AuthLoginAttemptStatus,
} from '@vubon/shared-constants/src/auth/auth-login-attempt.constants';

export interface AuthLoginAttempt {
  userId: string;
  email: string;
  status: AuthLoginAttemptStatus;
  attemptedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

export const createLoginAttempt = (
  userId: string,
  email: string,
  extra?: { ipAddress?: string; userAgent?: string }
): AuthLoginAttempt => ({
  userId,
  email,
  status: AUTH_LOGIN_ATTEMPT.PENDING,
  attemptedAt: new Date(),
  ...extra,
});

export const markAttemptSuccess = (attempt: AuthLoginAttempt): AuthLoginAttempt => ({
  ...attempt,
  status: AUTH_LOGIN_ATTEMPT.SUCCESS,
});

export const markAttemptFailed = (
  attempt: AuthLoginAttempt,
  _reason?: string
): AuthLoginAttempt => ({
  ...attempt,
  status: AUTH_LOGIN_ATTEMPT.FAILED,
});

export const markAttemptBlocked = (attempt: AuthLoginAttempt): AuthLoginAttempt => ({
  ...attempt,
  status: AUTH_LOGIN_ATTEMPT.BLOCKED,
});
