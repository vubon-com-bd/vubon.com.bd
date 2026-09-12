/**
 * Auth Method Constants
 * @module shared-constants/auth/auth-method
 */

export const AUTH_METHOD = {
  PASSWORD: 'password',
  OTP: 'otp',
  BIOMETRIC: 'biometric',
  MAGIC_LINK: 'magic_link',
  RECOVERY_CODE: 'recovery_code',
  API_KEY: 'api_key',
} as const;

export type AuthMethodValue = (typeof AUTH_METHOD)[keyof typeof AUTH_METHOD];
