/**
 * RequireKycVerified decorator
 */
import { SetMetadata } from '@nestjs/common';

export const REQUIRE_KYC_VERIFIED_KEY = 'require_kyc_verified';
export const RequireKycVerified = () =>
  SetMetadata(REQUIRE_KYC_VERIFIED_KEY, true);
