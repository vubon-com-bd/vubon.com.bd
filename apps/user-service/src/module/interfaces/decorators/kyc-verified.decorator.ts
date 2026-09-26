import { SetMetadata } from '@nestjs/common';

export const KYC_VERIFIED_KEY = 'kyc_verified';
export const RequireKycVerified = (): MethodDecorator & ClassDecorator =>
  SetMetadata(KYC_VERIFIED_KEY, true);
