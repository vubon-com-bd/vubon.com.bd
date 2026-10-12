/**
 * @KycVerified() — marks route requiring KYC verification
 * @module identity-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const KYC_VERIFIED_META_KEY = 'identity_kyc_verified';

export const KycVerified = (): MethodDecorator & ClassDecorator =>
  SetMetadata(KYC_VERIFIED_META_KEY, true);
