/**
 * Vendor aggregate domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { VENDOR_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const VENDOR_EVENT_TYPE = {
  REGISTERED: 'vendor.registered',
  STATUS_CHANGED: 'vendor.status_changed',
  ACTIVATED: 'vendor.activated',
  DEACTIVATED: 'vendor.deactivated',
  APPROVED: 'vendor.approved',
  REJECTED: 'vendor.rejected',
  SUSPENDED: 'vendor.suspended',
  SUSPENSION_LIFTED: 'vendor.suspension_lifted',
  BLOCKED: 'vendor.blocked',
  DELETED: 'vendor.deleted',
  PROFILE_UPDATED: 'vendor.profile_updated',
  CONTACT_UPDATED: 'vendor.contact_updated',
  ADDRESS_UPDATED: 'vendor.address_updated',
  BRANDING_UPDATED: 'vendor.branding_updated',
  COMMISSION_CONFIGURED: 'vendor.commission_configured',
  PAYOUT_CONFIGURED: 'vendor.payout_configured',
  VERIFIED: 'vendor.verified',
  FEATURED: 'vendor.featured',
  UNFEATURED: 'vendor.unfeatured',
  TIER_UPGRADED: 'vendor.tier_upgraded',
  TIER_DOWNGRADED: 'vendor.tier_downgraded',
  RATING_UPDATED: 'vendor.rating_updated',
  SALES_RECORDED: 'vendor.sales_recorded',
} as const;

// ─── Payloads ───
export interface VendorRegisteredPayload {
  readonly vendorId: string;
  readonly userId: string;
  readonly name: string;
  readonly slug: string;
  readonly email: string;
  readonly type: string;
  readonly businessType: string;
  readonly registeredAt: string;
}

export interface VendorStatusChangedPayload {
  readonly vendorId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
  readonly changedBy?: string;
  readonly changedAt: string;
}

export interface VendorActivatedPayload {
  readonly vendorId: string;
  readonly activatedAt: string;
}

export interface VendorDeactivatedPayload {
  readonly vendorId: string;
  readonly reason?: string;
  readonly deactivatedAt: string;
}

export interface VendorApprovedPayload {
  readonly vendorId: string;
  readonly approvedBy: string;
  readonly approvedAt: string;
}

export interface VendorRejectedPayload {
  readonly vendorId: string;
  readonly rejectedBy: string;
  readonly reason: string;
  readonly rejectedAt: string;
}

export interface VendorSuspendedPayload {
  readonly vendorId: string;
  readonly reason: string;
  readonly durationDays: number;
  readonly suspendedBy: string;
  readonly suspendedAt: string;
}

export interface VendorSuspensionLiftedPayload {
  readonly vendorId: string;
  readonly liftedBy: string;
  readonly liftedAt: string;
}

export interface VendorBlockedPayload {
  readonly vendorId: string;
  readonly reason: string;
  readonly blockedBy: string;
  readonly blockedAt: string;
}

export interface VendorDeletedPayload {
  readonly vendorId: string;
  readonly deletedBy?: string;
  readonly deletedAt: string;
}

export interface VendorProfileUpdatedPayload {
  readonly vendorId: string;
  readonly changes: readonly string[];
  readonly updatedAt: string;
}

export interface VendorContactUpdatedPayload {
  readonly vendorId: string;
  readonly updatedAt: string;
}

export interface VendorAddressUpdatedPayload {
  readonly vendorId: string;
  readonly district: string;
  readonly division: string;
  readonly updatedAt: string;
}

export interface VendorBrandingUpdatedPayload {
  readonly vendorId: string;
  readonly hasLogo: boolean;
  readonly hasBanner: boolean;
  readonly updatedAt: string;
}

export interface VendorCommissionConfiguredPayload {
  readonly vendorId: string;
  readonly type: string;
  readonly percent: number;
  readonly effectiveFrom: string;
}

export interface VendorPayoutConfiguredPayload {
  readonly vendorId: string;
  readonly method: string;
  readonly cycle: string;
  readonly bankAccountId?: string;
}

export interface VendorVerifiedPayload {
  readonly vendorId: string;
  readonly verifiedAt: string;
}

export interface VendorFeaturedPayload {
  readonly vendorId: string;
  readonly featuredAt: string;
  readonly featuredBy?: string;
}

export interface VendorTierChangedPayload {
  readonly vendorId: string;
  readonly fromTier: string;
  readonly toTier: string;
  readonly reason: string;
  readonly changedAt: string;
}

export interface VendorRatingUpdatedPayload {
  readonly vendorId: string;
  readonly previousRating: number;
  readonly newRating: number;
  readonly totalReviews: number;
  readonly updatedAt: string;
}

export interface VendorSalesRecordedPayload {
  readonly vendorId: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly recordedAt: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

function buildParams<TType extends string, TPayload>(type: TType, p: EventParams<TPayload>) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: VENDOR_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

// ─── Event classes ───
export class VendorRegisteredEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.REGISTERED,
  VendorRegisteredPayload
> {
  constructor(p: EventParams<VendorRegisteredPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.REGISTERED, p));
  }
}

export class VendorStatusChangedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.STATUS_CHANGED,
  VendorStatusChangedPayload
> {
  constructor(p: EventParams<VendorStatusChangedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.STATUS_CHANGED, p));
  }
}

export class VendorActivatedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.ACTIVATED,
  VendorActivatedPayload
> {
  constructor(p: EventParams<VendorActivatedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.ACTIVATED, p));
  }
}

export class VendorDeactivatedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.DEACTIVATED,
  VendorDeactivatedPayload
> {
  constructor(p: EventParams<VendorDeactivatedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.DEACTIVATED, p));
  }
}

export class VendorApprovedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.APPROVED,
  VendorApprovedPayload
> {
  constructor(p: EventParams<VendorApprovedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.APPROVED, p));
  }
}

export class VendorRejectedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.REJECTED,
  VendorRejectedPayload
> {
  constructor(p: EventParams<VendorRejectedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.REJECTED, p));
  }
}

export class VendorSuspendedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.SUSPENDED,
  VendorSuspendedPayload
> {
  constructor(p: EventParams<VendorSuspendedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.SUSPENDED, p));
  }
}

export class VendorSuspensionLiftedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.SUSPENSION_LIFTED,
  VendorSuspensionLiftedPayload
> {
  constructor(p: EventParams<VendorSuspensionLiftedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.SUSPENSION_LIFTED, p));
  }
}

export class VendorBlockedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.BLOCKED,
  VendorBlockedPayload
> {
  constructor(p: EventParams<VendorBlockedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.BLOCKED, p));
  }
}

export class VendorDeletedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.DELETED,
  VendorDeletedPayload
> {
  constructor(p: EventParams<VendorDeletedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.DELETED, p));
  }
}

export class VendorProfileUpdatedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.PROFILE_UPDATED,
  VendorProfileUpdatedPayload
> {
  constructor(p: EventParams<VendorProfileUpdatedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.PROFILE_UPDATED, p));
  }
}

export class VendorContactUpdatedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.CONTACT_UPDATED,
  VendorContactUpdatedPayload
> {
  constructor(p: EventParams<VendorContactUpdatedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.CONTACT_UPDATED, p));
  }
}

export class VendorAddressUpdatedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.ADDRESS_UPDATED,
  VendorAddressUpdatedPayload
> {
  constructor(p: EventParams<VendorAddressUpdatedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.ADDRESS_UPDATED, p));
  }
}

export class VendorBrandingUpdatedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.BRANDING_UPDATED,
  VendorBrandingUpdatedPayload
> {
  constructor(p: EventParams<VendorBrandingUpdatedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.BRANDING_UPDATED, p));
  }
}

export class VendorCommissionConfiguredEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.COMMISSION_CONFIGURED,
  VendorCommissionConfiguredPayload
> {
  constructor(p: EventParams<VendorCommissionConfiguredPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.COMMISSION_CONFIGURED, p));
  }
}

export class VendorPayoutConfiguredEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.PAYOUT_CONFIGURED,
  VendorPayoutConfiguredPayload
> {
  constructor(p: EventParams<VendorPayoutConfiguredPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.PAYOUT_CONFIGURED, p));
  }
}

export class VendorVerifiedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.VERIFIED,
  VendorVerifiedPayload
> {
  constructor(p: EventParams<VendorVerifiedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.VERIFIED, p));
  }
}

export class VendorFeaturedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.FEATURED,
  VendorFeaturedPayload
> {
  constructor(p: EventParams<VendorFeaturedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.FEATURED, p));
  }
}

export class VendorUnfeaturedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.UNFEATURED,
  VendorFeaturedPayload
> {
  constructor(p: EventParams<VendorFeaturedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.UNFEATURED, p));
  }
}

export class VendorTierUpgradedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.TIER_UPGRADED,
  VendorTierChangedPayload
> {
  constructor(p: EventParams<VendorTierChangedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.TIER_UPGRADED, p));
  }
}

export class VendorTierDowngradedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.TIER_DOWNGRADED,
  VendorTierChangedPayload
> {
  constructor(p: EventParams<VendorTierChangedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.TIER_DOWNGRADED, p));
  }
}

export class VendorRatingUpdatedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.RATING_UPDATED,
  VendorRatingUpdatedPayload
> {
  constructor(p: EventParams<VendorRatingUpdatedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.RATING_UPDATED, p));
  }
}

export class VendorSalesRecordedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.SALES_RECORDED,
  VendorSalesRecordedPayload
> {
  constructor(p: EventParams<VendorSalesRecordedPayload>) {
    super(buildParams(VENDOR_EVENT_TYPE.SALES_RECORDED, p));
  }
}
