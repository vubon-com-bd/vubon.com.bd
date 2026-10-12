/**
 * @VerifiedRequired() — marks route requiring email+phone verification
 * @module identity-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const VERIFIED_REQUIRED_KEY = 'verifiedRequired';

export const VerifiedRequired = (): MethodDecorator & ClassDecorator =>
  SetMetadata(VERIFIED_REQUIRED_KEY, true);
