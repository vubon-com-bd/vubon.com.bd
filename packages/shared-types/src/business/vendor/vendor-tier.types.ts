/**
 * Vendor Tier Value Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-tier.constants থেকে।
 */

import type {
  VENDOR_TIER,
  VENDOR_TIER_THRESHOLD,
  VENDOR_TIER_BENEFIT,
} from '@vubon/shared-constants/business';

export type VendorTierValue = (typeof VENDOR_TIER)[keyof typeof VENDOR_TIER];

export type VendorTierThreshold = typeof VENDOR_TIER_THRESHOLD;
export type VendorTierBenefit = typeof VENDOR_TIER_BENEFIT;

export interface VendorTierMetadata {
  readonly value: VendorTierValue;
  readonly label: string;
  readonly minSales: number;
  readonly maxSales: number | null;
  readonly commissionPercent: number;
  readonly payoutDays: number;
}

export interface VendorTierHistory {
  readonly vendorId: string;
  readonly previousTier: VendorTierValue;
  readonly newTier: VendorTierValue;
  readonly reason: string;
  readonly changedAt: string;
}
