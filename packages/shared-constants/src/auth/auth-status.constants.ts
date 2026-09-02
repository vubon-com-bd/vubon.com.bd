/**
 * Auth Status Constants
 * প্রমাণীকরণ স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টস
 */

import { AUTH } from './auth.constants';

export const AUTH_STATUS = {
  ...AUTH.STATUS,

  // Additional auth status
  ACCOUNT_CREATED: 'account_created',
  ACCOUNT_ACTIVATED: 'account_activated',
  ACCOUNT_DEACTIVATED: 'account_deactivated',
  ACCOUNT_LOCKED: 'account_locked',
  ACCOUNT_UNLOCKED: 'account_unlocked',
  PASSWORD_CHANGED: 'password_changed',
  PASSWORD_RESET: 'password_reset',
  EMAIL_VERIFIED: 'email_verified',
  EMAIL_CHANGED: 'email_changed',
  PHONE_VERIFIED: 'phone_verified',
  PHONE_CHANGED: 'phone_changed',
  MFA_ENABLED: 'mfa_enabled',
  MFA_DISABLED: 'mfa_disabled',
  MFA_VERIFIED: 'mfa_verified',
  SESSION_CREATED: 'session_created',
  SESSION_TERMINATED: 'session_terminated',
  SESSION_EXPIRED: 'session_expired',
  TOKEN_REFRESHED: 'token_refreshed',
  TOKEN_REVOKED: 'token_revoked',
  LOGIN_SUCCESS: 'login_success',
  LOGIN_FAILED: 'login_failed',
  LOGOUT_SUCCESS: 'logout_success',
  REGISTER_SUCCESS: 'register_success',
} as const;

export type AuthStatusType = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS];
