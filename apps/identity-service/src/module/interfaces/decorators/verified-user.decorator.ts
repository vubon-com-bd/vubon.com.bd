/**
 * @VerifiedUser() — marks route requiring verified user
 * @module identity-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const VERIFIED_USER_META_KEY = 'identity_verified_user';

export const VerifiedUser = (): MethodDecorator & ClassDecorator =>
  SetMetadata(VERIFIED_USER_META_KEY, true);
