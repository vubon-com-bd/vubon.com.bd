/**
 * Auth Method Constants
 * @module shared-constants/auth/auth-method
 *
 * Note: Overlaps with AUTH_TYPES (auth-type.constants). To avoid
 * duplicate values, this enum references shared values from AUTH_TYPES
 * and adds method-specific entries only.
 */

import { AUTH_TYPES } from './auth-type.constants';

export const AUTH_METHOD = {
  // Referenced from AUTH_TYPES (avoid duplication)
  PASSWORD: AUTH_TYPES.PASSWORD,
  OTP: AUTH_TYPES.OTP,
  BIOMETRIC: AUTH_TYPES.BIOMETRIC,
  MAGIC_LINK: AUTH_TYPES.MAGIC_LINK,
  API_KEY: AUTH_TYPES.API_KEY,

  // Method-specific (not in AUTH_TYPES)
  RECOVERY_CODE: 'recovery_code',
} as const;

export type AuthMethodValue = (typeof AUTH_METHOD)[keyof typeof AUTH_METHOD];
