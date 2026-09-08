import { validateBiometricType } from '../auth/biometric-validator';
import { AdminBiometric } from '@vubon/shared-types';

export const validateAdminBiometric = (biometric: AdminBiometric): boolean => {
  return validateBiometricType(biometric.type) && biometric.isEnabled && biometric.isRequired;
};
