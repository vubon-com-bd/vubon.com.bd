/**
 * Auth Login Attempt Constants
 * @module shared-constants/auth/auth-login-attempt
 *
 * Note: Intentionally does NOT spread STATUS — those values
 * (active/inactive/pending) are meaningless for a login attempt.
 */

export const AUTH_LOGIN_ATTEMPT = {
  SUCCESS: 'success',
  FAILED: 'failed',
  BLOCKED: 'blocked',
} as const;

export type AuthLoginAttemptStatus = (typeof AUTH_LOGIN_ATTEMPT)[keyof typeof AUTH_LOGIN_ATTEMPT];
