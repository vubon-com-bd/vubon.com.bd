import { SetMetadata } from '@nestjs/common';
import { BIOMETRIC_REQUIRED_KEY } from '../guards/biometric.guard';

export const BiometricRequired = (): MethodDecorator & ClassDecorator =>
  SetMetadata(BIOMETRIC_REQUIRED_KEY, true);
