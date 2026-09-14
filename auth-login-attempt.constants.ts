/**
 * Auth Login Attempt Constants
 * @module shared-constants/auth/auth-login-attempt
 *
 * Note: `PENDING`, `FAILED`, `BLOCKED` overlap with STATUS values by intent —
 * login-attempt status is a distinct domain from entity status.
 * Kept separate for semantic clarity.
 */

export const AUTH_LOGIN_ATTEMPT = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  BLOCKED: 'blocked',
} as const;

export type AuthLoginAttemptStatus =
  (typeof AUTH_LOGIN_ATTEMPT)[keyof typeof AUTH_LOGIN_ATTEMPT];
