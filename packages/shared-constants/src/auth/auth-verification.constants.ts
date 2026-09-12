/**
 * Auth Verification Constants
 * @module shared-constants/auth/auth-verification
 *
 * Note: Does NOT spread COMMON_VERIFICATION — nested objects would leak.
 */

export const AUTH_VERIFICATION = {
  EMAIL: 'email',
  PHONE: 'phone',
  DOCUMENT: 'document',
  TWO_FACTOR: 'two_factor',
  RECOVERY: 'recovery',
} as const;

export type AuthVerificationType = (typeof AUTH_VERIFICATION)[keyof typeof AUTH_VERIFICATION];
