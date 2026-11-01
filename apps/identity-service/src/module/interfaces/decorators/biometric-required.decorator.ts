/**
 * @BiometricRequired() — marks route requiring biometric
 * @module identity-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const BIOMETRIC_REQUIRED_KEY = 'biometricRequired';

export const BiometricRequired = (): MethodDecorator & ClassDecorator =>
  SetMetadata(BIOMETRIC_REQUIRED_KEY, true);
