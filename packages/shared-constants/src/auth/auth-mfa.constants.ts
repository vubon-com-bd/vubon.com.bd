/**
 * Auth MFA Constants
 * @module shared-constants/auth/auth-mfa
 */

export const AUTH_MFA = {
  TOTP: 'totp',
  SMS: 'sms',
  EMAIL: 'email',
  BACKUP: 'backup',
  PUSH: 'push',
  WEBAUTHN: 'webauthn',
} as const;

export type MfaTypeValue = (typeof AUTH_MFA)[keyof typeof AUTH_MFA];
