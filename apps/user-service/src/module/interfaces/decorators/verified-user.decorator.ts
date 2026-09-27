/**
 * RequireVerifiedUser decorator
 */
import { SetMetadata } from '@nestjs/common';

export const REQUIRE_VERIFIED_USER_KEY = 'require_verified_user';
export const RequireVerifiedUser = () =>
  SetMetadata(REQUIRE_VERIFIED_USER_KEY, true);
