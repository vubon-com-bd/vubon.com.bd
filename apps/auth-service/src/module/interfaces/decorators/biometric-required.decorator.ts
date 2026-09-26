/**
 * @BiometricRequired — route needs an active biometric binding
 * @module auth-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const BIOMETRIC_REQUIRED_KEY = 'auth:biometricRequired';

export const BiometricRequired = () =>
  SetMetadata(BIOMETRIC_REQUIRED_KEY, true);
