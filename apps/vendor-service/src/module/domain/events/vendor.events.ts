/**
 * Vendor Core Domain Events
 * @module vendor-service/domain/events
 *
 * Vendor aggregate-এর lifecycle events।
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import {
  VENDOR_AGGREGATE_TYPE,
  buildEventParams,
  type EventParams,
} from './event.helpers.js';

// ═══ Event Type Constants ═══
export const VENDOR_EVENT_TYPE = {
  REGISTERED: 'vendor.vendor.registered',
  UPDATED: 'vendor.vendor.updated',
  PROFILE_UPDATED: 'vendor.vendor.profile_updated',
  BUSINESS_UPDATED: 'vendor.vendor.business_updated',
  STATUS_CHANGED: 'vendor.vendor.status_changed',
  APPROVED: 'vendor.vendor.approved',
  REJECTED: 'vendor.vendor.rejected',
  ACTIVATED: 'vendor.vendor.activated',
  DEACTIVATED: 'vendor.vendor.deactivated',
  SUSPENDED: 'vendor.vendor.suspended',
  REACTIVATED: 'vendor.vendor.reactivated',
  BLOCKED: 'vendor.vendor.blocked',
  DELETED: 'vendor.vendor.deleted',
  FEATURED: 'vendor.vendor.featured',
  UNFEATURED: 'vendor.vendor.unfeatured',
  VERIFIED: 'vendor.vendor.verified',
} as const;

// ═══ Payload Interfaces ═══
export interface VendorRegisteredPayload {
  readonly vendorId: string;
  readonly userId: string;
  readonly name: string;
  readonly slug: string;
  readonly type: string;
  readonly businessType: string;
  readonly email: string;
  readonly registeredAt: string;
}

export interface VendorUpdatedPayload {
  readonly vendorId: string;
  readonly changedFields: readonly string[];
  readonly updatedAt: string;
  readonly updatedBy?: string;
}

export interface VendorProfileUpdatedPayload {
  readonly vendorId: string;
  readonly changedFields: readonly string[];
  readonly updatedAt: string;
}

export interface VendorBusinessUpdatedPayload {
  readonly vendorId: string;
  readonly changedFields: readonly string[];
  readonly updatedAt: string;
}

export interface VendorStatusChangedPayload {
  readonly vendorId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
  readonly reason?: string;
}

export interface VendorApprovedPayload {
  readonly vendorId: string;
  readonly approvedBy: string;
  readonly approvedAt: string;
  readonly tier?: string;
}

export interface VendorRejectedPayload {
  readonly vendorId: string;
  readonly rejectedBy: string;
  readonly rejectedAt: string;
  readonly reason: string;
}

export interface VendorActivatedPayload {
  readonly vendorId: string;
  readonly activatedAt: string;
}

export interface VendorDeactivatedPayload {
  readonly vendorId: string;
  readonly deactivatedAt: string;
  readonly reason?: string;
}

export interface VendorSuspendedPayload {
  readonly vendorId: string;
  readonly suspensionId: string;
  readonly reason: string;
  readonly suspendedAt: string;
  readonly suspendedBy: string;
  readonly durationDays?: number;
}

export interface VendorReactivatedPayload {
  readonly vendorId: string;
  readonly reactivatedAt: string;
}

export interface VendorBlockedPayload {
  readonly vendorId: string;
  readonly blockedAt: string;
  readonly blockedBy: string;
  readonly reason: string;
}

export interface VendorDeletedPayload {
  readonly vendorId: string;
  readonly deletedAt: string;
  readonly deletedBy?: string;
}

export interface VendorFeaturedPayload {
  readonly vendorId: string;
  readonly featuredAt: string;
  readonly featuredBy?: string;
}

export interface VendorUnfeaturedPayload {
  readonly vendorId: string;
  readonly unfeaturedAt: string;
  readonly reason?: string;
}

export interface VendorVerifiedPayload {
  readonly vendorId: string;
  readonly verifiedAt: string;
}

// ═══ Concrete Events ═══
export class VendorRegisteredEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.REGISTERED,
  VendorRegisteredPayload
> {
  constructor(p: EventParams<VendorRegisteredPayload>) {
    super(buildEventParams(VENDOR_EVENT_TYPE.REGISTERED, VENDOR_AGGREGATE_TYPE.VENDOR, p));
  }
}

export class VendorUpdatedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.UPDATED,
  VendorUpdatedPayload
> {
  constructor(p: EventParams<VendorUpdatedPayload>) {
    super(buildEventParams(VENDOR_EVENT_TYPE.UPDATED, VENDOR_AGGREGATE_TYPE.VENDOR, p));
  }
}

export class VendorProfileUpdatedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.PROFILE_UPDATED,
  VendorProfileUpdatedPayload
> {
  constructor(p: EventParams<VendorProfileUpdatedPayload>) {
    super(buildEventParams(VENDOR_EVENT_TYPE.PROFILE_UPDATED, VENDOR_AGGREGATE_TYPE.VENDOR, p));
  }
}

export class VendorBusinessUpdatedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.BUSINESS_UPDATED,
  VendorBusinessUpdatedPayload
> {
  constructor(p: EventParams<VendorBusinessUpdatedPayload>) {
    super(buildEventParams(VENDOR_EVENT_TYPE.BUSINESS_UPDATED, VENDOR_AGGREGATE_TYPE.VENDOR, p));
  }
}

export class VendorStatusChangedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.STATUS_CHANGED,
  VendorStatusChangedPayload
> {
  constructor(p: EventParams<VendorStatusChangedPayload>) {
    super(buildEventParams(VENDOR_EVENT_TYPE.STATUS_CHANGED, VENDOR_AGGREGATE_TYPE.VENDOR, p));
  }
}

export class VendorApprovedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.APPROVED,
  VendorApprovedPayload
> {
  constructor(p: EventParams<VendorApprovedPayload>) {
    super(buildEventParams(VENDOR_EVENT_TYPE.APPROVED, VENDOR_AGGREGATE_TYPE.VENDOR, p));
  }
}

export class VendorRejectedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.REJECTED,
  VendorRejectedPayload
> {
  constructor(p: EventParams<VendorRejectedPayload>) {
    super(buildEventParams(VENDOR_EVENT_TYPE.REJECTED, VENDOR_AGGREGATE_TYPE.VENDOR, p));
  }
}

export class VendorActivatedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.ACTIVATED,
  VendorActivatedPayload
> {
  constructor(p: EventParams<VendorActivatedPayload>) {
    super(buildEventParams(VENDOR_EVENT_TYPE.ACTIVATED, VENDOR_AGGREGATE_TYPE.VENDOR, p));
  }
}

export class VendorDeactivatedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.DEACTIVATED,
  VendorDeactivatedPayload
> {
  constructor(p: EventParams<VendorDeactivatedPayload>) {
    super(buildEventParams(VENDOR_EVENT_TYPE.DEACTIVATED, VENDOR_AGGREGATE_TYPE.VENDOR, p));
  }
}

export class VendorSuspendedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.SUSPENDED,
  VendorSuspendedPayload
> {
  constructor(p: EventParams<VendorSuspendedPayload>) {
    super(buildEventParams(VENDOR_EVENT_TYPE.SUSPENDED, VENDOR_AGGREGATE_TYPE.VENDOR, p));
  }
}

export class VendorReactivatedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.REACTIVATED,
  VendorReactivatedPayload
> {
  constructor(p: EventParams<VendorReactivatedPayload>) {
    super(buildEventParams(VENDOR_EVENT_TYPE.REACTIVATED, VENDOR_AGGREGATE_TYPE.VENDOR, p));
  }
}

export class VendorBlockedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.BLOCKED,
  VendorBlockedPayload
> {
  constructor(p: EventParams<VendorBlockedPayload>) {
    super(buildEventParams(VENDOR_EVENT_TYPE.BLOCKED, VENDOR_AGGREGATE_TYPE.VENDOR, p));
  }
}

export class VendorDeletedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.DELETED,
  VendorDeletedPayload
> {
  constructor(p: EventParams<VendorDeletedPayload>) {
    super(buildEventParams(VENDOR_EVENT_TYPE.DELETED, VENDOR_AGGREGATE_TYPE.VENDOR, p));
  }
}

export class VendorFeaturedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.FEATURED,
  VendorFeaturedPayload
> {
  constructor(p: EventParams<VendorFeaturedPayload>) {
    super(buildEventParams(VENDOR_EVENT_TYPE.FEATURED, VENDOR_AGGREGATE_TYPE.VENDOR, p));
  }
}

export class VendorUnfeaturedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.UNFEATURED,
  VendorUnfeaturedPayload
> {
  constructor(p: EventParams<VendorUnfeaturedPayload>) {
    super(buildEventParams(VENDOR_EVENT_TYPE.UNFEATURED, VENDOR_AGGREGATE_TYPE.VENDOR, p));
  }
}

export class VendorVerifiedEvent extends BaseDomainEvent<
  typeof VENDOR_EVENT_TYPE.VERIFIED,
  VendorVerifiedPayload
> {
  constructor(p: EventParams<VendorVerifiedPayload>) {
    super(buildEventParams(VENDOR_EVENT_TYPE.VERIFIED, VENDOR_AGGREGATE_TYPE.VENDOR, p));
  }
}
