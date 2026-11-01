/**
 * @MfaRequired() — marks route requiring MFA
 * @module identity-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const MFA_REQUIRED_KEY = 'mfaRequired';

export const MfaRequired = (): MethodDecorator & ClassDecorator =>
  SetMetadata(MFA_REQUIRED_KEY, true);
