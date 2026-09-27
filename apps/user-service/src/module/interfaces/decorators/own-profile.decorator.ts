/**
 * RequireOwnProfile decorator — metadata flag
 * @module user-service/interfaces/decorators
 *
 * Usage:
 *   @RequireOwnProfile()
 *   @UseGuards(OwnProfileGuard)
 */
import { SetMetadata } from '@nestjs/common';

export const REQUIRE_OWN_PROFILE_KEY = 'require_own_profile';
export const RequireOwnProfile = () =>
  SetMetadata(REQUIRE_OWN_PROFILE_KEY, true);
