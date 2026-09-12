import { validateBiometricType } from '../auth/biometric-validator';

export interface AdminBiometric {
  type: 'fingerprint' | 'face' | 'voice' | 'iris';
  isRequired: boolean;
  isEnabled: boolean;
  publicKey: string;
  credentialId: string;
  metadata: Record<string, unknown>;
}

export const validateAdminBiometric = (biometric: AdminBiometric): boolean => {
  return validateBiometricType(biometric.type) && biometric.isEnabled && biometric.isRequired;
};
