/**
 * Auth Login Attempt Constants
 * @module shared-constants/auth/auth-login-attempt
 */

export const AUTH_LOGIN_ATTEMPT = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  BLOCKED: 'blocked',
} as const;

export type AuthLoginAttemptStatus = (typeof AUTH_LOGIN_ATTEMPT)[keyof typeof AUTH_LOGIN_ATTEMPT];
