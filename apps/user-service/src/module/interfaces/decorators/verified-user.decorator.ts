import { SetMetadata } from '@nestjs/common';

export const VERIFIED_USER_KEY = 'verified_user';
export const RequireVerifiedUser = (): MethodDecorator & ClassDecorator =>
  SetMetadata(VERIFIED_USER_KEY, true);
