import { SetMetadata } from '@nestjs/common';

export const REQUIRE_OWN_PROFILE_KEY = 'require_own_profile';
export const RequireOwnProfile = (): MethodDecorator & ClassDecorator =>
  SetMetadata(REQUIRE_OWN_PROFILE_KEY, true);
