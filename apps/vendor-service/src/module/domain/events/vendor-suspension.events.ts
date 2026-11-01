/**
 * Vendor Suspension Domain Events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import {
  VENDOR_AGGREGATE_TYPE,
  buildEventParams,
  type EventParams,
} from './event.helpers.js';

export const VENDOR_SUSPENSION_EVENT_TYPE = {
  CREATED: 'vendor.suspension.created',
  LIFTED: 'vendor.suspension.lifted',
  EXPIRED: 'vendor.suspension.expired',
  APPEALED: 'vendor.suspension.appealed',
  APPEAL_APPROVED: 'vendor.suspension.appeal_approved',
  APPEAL_REJECTED: 'vendor.suspension.appeal_rejected',
} as const;

export interface VendorSuspensionCreatedPayload {
  readonly suspensionId: string;
  readonly vendorId: string;
  readonly reason: string;
  readonly description?: string;
  readonly suspendedAt: string;
  readonly suspendedBy: string;
  readonly durationDays?: number;
  readonly expectedLiftAt?: string;
}

export interface VendorSuspensionLiftedPayload {
  readonly suspensionId: string;
  readonly vendorId: string;
  readonly liftedAt: string;
  readonly liftedBy: string;
  readonly liftReason?: string;
}

export interface VendorSuspensionExpiredPayload {
  readonly suspensionId: string;
  readonly vendorId: string;
  readonly expiredAt: string;
}

export interface VendorSuspensionAppealedPayload {
  readonly suspensionId: string;
  readonly vendorId: string;
  readonly appealedAt: string;
  readonly appealNotes: string;
}

export interface VendorSuspensionAppealApprovedPayload {
  readonly suspensionId: string;
  readonly vendorId: string;
  readonly approvedAt: string;
  readonly approvedBy: string;
  readonly notes?: string;
}

export interface VendorSuspensionAppealRejectedPayload {
  readonly suspensionId: string;
  readonly vendorId: string;
  readonly rejectedAt: string;
  readonly rejectedBy: string;
  readonly reason: string;
}

export class VendorSuspensionCreatedEvent extends BaseDomainEvent<
  typeof VENDOR_SUSPENSION_EVENT_TYPE.CREATED,
  VendorSuspensionCreatedPayload
> {
  constructor(p: EventParams<VendorSuspensionCreatedPayload>) {
    super(
      buildEventParams(
        VENDOR_SUSPENSION_EVENT_TYPE.CREATED,
        VENDOR_AGGREGATE_TYPE.SUSPENSION,
        p,
      ),
    );
  }
}

export class VendorSuspensionLiftedEvent extends BaseDomainEvent<
  typeof VENDOR_SUSPENSION_EVENT_TYPE.LIFTED,
  VendorSuspensionLiftedPayload
> {
  constructor(p: EventParams<VendorSuspensionLiftedPayload>) {
    super(
      buildEventParams(
        VENDOR_SUSPENSION_EVENT_TYPE.LIFTED,
        VENDOR_AGGREGATE_TYPE.SUSPENSION,
        p,
      ),
    );
  }
}

export class VendorSuspensionExpiredEvent extends BaseDomainEvent<
  typeof VENDOR_SUSPENSION_EVENT_TYPE.EXPIRED,
  VendorSuspensionExpiredPayload
> {
  constructor(p: EventParams<VendorSuspensionExpiredPayload>) {
    super(
      buildEventParams(
        VENDOR_SUSPENSION_EVENT_TYPE.EXPIRED,
        VENDOR_AGGREGATE_TYPE.SUSPENSION,
        p,
      ),
    );
  }
}

export class VendorSuspensionAppealedEvent extends BaseDomainEvent<
  typeof VENDOR_SUSPENSION_EVENT_TYPE.APPEALED,
  VendorSuspensionAppealedPayload
> {
  constructor(p: EventParams<VendorSuspensionAppealedPayload>) {
    super(
      buildEventParams(
        VENDOR_SUSPENSION_EVENT_TYPE.APPEALED,
        VENDOR_AGGREGATE_TYPE.SUSPENSION,
        p,
      ),
    );
  }
}

export class VendorSuspensionAppealApprovedEvent extends BaseDomainEvent<
  typeof VENDOR_SUSPENSION_EVENT_TYPE.APPEAL_APPROVED,
  VendorSuspensionAppealApprovedPayload
> {
  constructor(p: EventParams<VendorSuspensionAppealApprovedPayload>) {
    super(
      buildEventParams(
        VENDOR_SUSPENSION_EVENT_TYPE.APPEAL_APPROVED,
        VENDOR_AGGREGATE_TYPE.SUSPENSION,
        p,
      ),
    );
  }
}

export class VendorSuspensionAppealRejectedEvent extends BaseDomainEvent<
  typeof VENDOR_SUSPENSION_EVENT_TYPE.APPEAL_REJECTED,
  VendorSuspensionAppealRejectedPayload
> {
  constructor(p: EventParams<VendorSuspensionAppealRejectedPayload>) {
    super(
      buildEventParams(
        VENDOR_SUSPENSION_EVENT_TYPE.APPEAL_REJECTED,
        VENDOR_AGGREGATE_TYPE.SUSPENSION,
        p,
      ),
    );
  }
}
