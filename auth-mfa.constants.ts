/**
 * Auth MFA Constants
 * @module shared-constants/auth/auth-mfa
 *
 * Note: `SMS`, `EMAIL`, `PUSH` overlap with NOTIFICATION.CHANNEL by intent —
 * MFA delivery method vs notification channel are different domains.
 * Kept separate for semantic clarity.
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
