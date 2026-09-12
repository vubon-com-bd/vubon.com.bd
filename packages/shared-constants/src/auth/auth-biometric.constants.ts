/**
 * Auth Biometric Constants
 * @module shared-constants/auth/auth-biometric
 */

export const AUTH_BIOMETRIC = {
  FINGERPRINT: 'fingerprint',
  FACE: 'face',
  VOICE: 'voice',
  IRIS: 'iris',
  PALM: 'palm',
} as const;

export type AuthBiometricTypeValue = (typeof AUTH_BIOMETRIC)[keyof typeof AUTH_BIOMETRIC];
