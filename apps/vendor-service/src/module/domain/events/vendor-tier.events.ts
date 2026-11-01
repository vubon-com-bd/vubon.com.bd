/**
 * Vendor Tier Domain Events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import {
  VENDOR_AGGREGATE_TYPE,
  buildEventParams,
  type EventParams,
} from './event.helpers.js';

export const VENDOR_TIER_EVENT_TYPE = {
  UPGRADED: 'vendor.tier.upgraded',
  DOWNGRADED: 'vendor.tier.downgraded',
  BENEFIT_APPLIED: 'vendor.tier.benefit_applied',
  ELIGIBLE_FOR_UPGRADE: 'vendor.tier.eligible_for_upgrade',
} as const;

export interface VendorTierUpgradedPayload {
  readonly vendorId: string;
  readonly fromTier: string;
  readonly toTier: string;
  readonly upgradedAt: string;
  readonly reason: string;
  readonly totalSales: number;
  readonly newCommissionPercent: number;
  readonly newPayoutDays: number;
}

export interface VendorTierDowngradedPayload {
  readonly vendorId: string;
  readonly fromTier: string;
  readonly toTier: string;
  readonly downgradedAt: string;
  readonly reason: string;
  readonly totalSales: number;
  readonly newCommissionPercent: number;
}

export interface VendorTierBenefitAppliedPayload {
  readonly vendorId: string;
  readonly tier: string;
  readonly benefit: string;
  readonly appliedAt: string;
  readonly value: number | string;
}

export interface VendorTierEligibleForUpgradePayload {
  readonly vendorId: string;
  readonly currentTier: string;
  readonly eligibleTier: string;
  readonly detectedAt: string;
  readonly totalSales: number;
  readonly requiredSales: number;
}

export class VendorTierUpgradedEvent extends BaseDomainEvent<
  typeof VENDOR_TIER_EVENT_TYPE.UPGRADED,
  VendorTierUpgradedPayload
> {
  constructor(p: EventParams<VendorTierUpgradedPayload>) {
    super(
      buildEventParams(
        VENDOR_TIER_EVENT_TYPE.UPGRADED,
        VENDOR_AGGREGATE_TYPE.VENDOR,
        p,
      ),
    );
  }
}

export class VendorTierDowngradedEvent extends BaseDomainEvent<
  typeof VENDOR_TIER_EVENT_TYPE.DOWNGRADED,
  VendorTierDowngradedPayload
> {
  constructor(p: EventParams<VendorTierDowngradedPayload>) {
    super(
      buildEventParams(
        VENDOR_TIER_EVENT_TYPE.DOWNGRADED,
        VENDOR_AGGREGATE_TYPE.VENDOR,
        p,
      ),
    );
  }
}

export class VendorTierBenefitAppliedEvent extends BaseDomainEvent<
  typeof VENDOR_TIER_EVENT_TYPE.BENEFIT_APPLIED,
  VendorTierBenefitAppliedPayload
> {
  constructor(p: EventParams<VendorTierBenefitAppliedPayload>) {
    super(
      buildEventParams(
        VENDOR_TIER_EVENT_TYPE.BENEFIT_APPLIED,
        VENDOR_AGGREGATE_TYPE.VENDOR,
        p,
      ),
    );
  }
}

export class VendorTierEligibleForUpgradeEvent extends BaseDomainEvent<
  typeof VENDOR_TIER_EVENT_TYPE.ELIGIBLE_FOR_UPGRADE,
  VendorTierEligibleForUpgradePayload
> {
  constructor(p: EventParams<VendorTierEligibleForUpgradePayload>) {
    super(
      buildEventParams(
        VENDOR_TIER_EVENT_TYPE.ELIGIBLE_FOR_UPGRADE,
        VENDOR_AGGREGATE_TYPE.VENDOR,
        p,
      ),
    );
  }
}
