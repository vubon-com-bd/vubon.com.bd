/**
 * VendorTier decorator — requires vendor to be in one of given tiers
 * @module vendor-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';
import type { VENDOR_TIER } from '@vubon/shared-constants/business';

export type VendorTierValue = (typeof VENDOR_TIER)[keyof typeof VENDOR_TIER];

export const REQUIRED_VENDOR_TIER_KEY = 'required_vendor_tier';

export const VendorTier = (
  ...tiers: readonly VendorTierValue[]
): MethodDecorator & ClassDecorator =>
  SetMetadata(REQUIRED_VENDOR_TIER_KEY, tiers);
