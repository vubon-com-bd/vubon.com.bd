/**
 * @VerifiedRequired — route needs email or phone verified
 * @module auth-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const VERIFIED_REQUIRED_KEY = 'auth:verifiedRequired';

export type VerificationChannel = 'email' | 'phone' | 'any';

export const VerifiedRequired = (channel: VerificationChannel = 'any') =>
  SetMetadata(VERIFIED_REQUIRED_KEY, channel);
