import { SetMetadata } from '@nestjs/common';

export const VERIFIED_REQUIRED_KEY = 'verifiedRequired';

/** Mark a route as requiring the user's email/phone to be verified. */
export const VerifiedRequired = (): MethodDecorator & ClassDecorator =>
  SetMetadata(VERIFIED_REQUIRED_KEY, true);
