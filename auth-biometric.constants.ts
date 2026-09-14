/**
 * Auth Biometric Constants
 * @module shared-constants/auth/auth-biometric
 *
 * Note: Granular biometric types (fingerprint, face, ...). Overlaps with
 * DEVICE.CAPABILITIES.BIOMETRIC at a coarser level by intent — capability
 * flag vs concrete modality. Kept separate.
 */

export const AUTH_BIOMETRIC = {
  FINGERPRINT: 'fingerprint',
  FACE: 'face',
  VOICE: 'voice',
  IRIS: 'iris',
  PALM: 'palm',
} as const;

export type AuthBiometricTypeValue =
  (typeof AUTH_BIOMETRIC)[keyof typeof AUTH_BIOMETRIC];
