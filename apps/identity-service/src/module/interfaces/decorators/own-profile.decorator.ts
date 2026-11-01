/**
 * @OwnProfile() — marks route requiring own-profile check
 * @module identity-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const OWN_PROFILE_META_KEY = 'identity_own_profile';

export const OwnProfile = (): MethodDecorator & ClassDecorator =>
  SetMetadata(OWN_PROFILE_META_KEY, true);
