/**
 * Vendor Suspension domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorSuspension';

export const VENDOR_SUSPENSION_EVENT_TYPE = {
  ISSUED: 'vendor.suspension.issued',
  APPEALED: 'vendor.suspension.appealed',
  APPEAL_APPROVED: 'vendor.suspension.appeal_approved',
  APPEAL_REJECTED: 'vendor.suspension.appeal_rejected',
  LIFTED_FROM_LOG: 'vendor.suspension.lifted_from_log',
  EXTENDED: 'vendor.suspension.extended',
  EXPIRED: 'vendor.suspension.expired',
} as const;

export interface VendorSuspensionIssuedPayload {
  readonly suspensionId: string;
  readonly vendorId: string;
  readonly reason: string;
  readonly durationDays: number;
  readonly suspendedBy: string;
  readonly issuedAt: string;
}
export interface VendorSuspensionAppealedPayload {
  readonly suspensionId: string;
  readonly vendorId: string;
  readonly reason: string;
  readonly appealedAt: string;
}
export interface VendorSuspensionAppealApprovedPayload {
  readonly suspensionId: string;
  readonly vendorId: string;
  readonly approvedBy: string;
  readonly approvedAt: string;
}
export interface VendorSuspensionAppealRejectedPayload {
  readonly suspensionId: string;
  readonly vendorId: string;
  readonly rejectedBy: string;
  readonly note?: string;
  readonly rejectedAt: string;
}
export interface VendorSuspensionLiftedLogPayload {
  readonly suspensionId: string;
  readonly vendorId: string;
  readonly liftedBy: string;
  readonly liftedAt: string;
}
export interface VendorSuspensionExtendedPayload {
  readonly suspensionId: string;
  readonly vendorId: string;
  readonly previousDuration: number;
  readonly newDuration: number;
  readonly extendedBy: string;
  readonly extendedAt: string;
}
export interface VendorSuspensionExpiredPayload {
  readonly suspensionId: string;
  readonly vendorId: string;
  readonly expiredAt: string;
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
    aggregateType: AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class VendorSuspensionIssuedEvent extends BaseDomainEvent<typeof VENDOR_SUSPENSION_EVENT_TYPE.ISSUED, VendorSuspensionIssuedPayload> {
  constructor(p: EventParams<VendorSuspensionIssuedPayload>) { super(buildParams(VENDOR_SUSPENSION_EVENT_TYPE.ISSUED, p)); }
}
export class VendorSuspensionAppealedEvent extends BaseDomainEvent<typeof VENDOR_SUSPENSION_EVENT_TYPE.APPEALED, VendorSuspensionAppealedPayload> {
  constructor(p: EventParams<VendorSuspensionAppealedPayload>) { super(buildParams(VENDOR_SUSPENSION_EVENT_TYPE.APPEALED, p)); }
}
export class VendorSuspensionAppealApprovedEvent extends BaseDomainEvent<typeof VENDOR_SUSPENSION_EVENT_TYPE.APPEAL_APPROVED, VendorSuspensionAppealApprovedPayload> {
  constructor(p: EventParams<VendorSuspensionAppealApprovedPayload>) { super(buildParams(VENDOR_SUSPENSION_EVENT_TYPE.APPEAL_APPROVED, p)); }
}
export class VendorSuspensionAppealRejectedEvent extends BaseDomainEvent<typeof VENDOR_SUSPENSION_EVENT_TYPE.APPEAL_REJECTED, VendorSuspensionAppealRejectedPayload> {
  constructor(p: EventParams<VendorSuspensionAppealRejectedPayload>) { super(buildParams(VENDOR_SUSPENSION_EVENT_TYPE.APPEAL_REJECTED, p)); }
}
export class VendorSuspensionLiftedLogEvent extends BaseDomainEvent<typeof VENDOR_SUSPENSION_EVENT_TYPE.LIFTED_FROM_LOG, VendorSuspensionLiftedLogPayload> {
  constructor(p: EventParams<VendorSuspensionLiftedLogPayload>) { super(buildParams(VENDOR_SUSPENSION_EVENT_TYPE.LIFTED_FROM_LOG, p)); }
}
export class VendorSuspensionExtendedEvent extends BaseDomainEvent<typeof VENDOR_SUSPENSION_EVENT_TYPE.EXTENDED, VendorSuspensionExtendedPayload> {
  constructor(p: EventParams<VendorSuspensionExtendedPayload>) { super(buildParams(VENDOR_SUSPENSION_EVENT_TYPE.EXTENDED, p)); }
}
export class VendorSuspensionExpiredEvent extends BaseDomainEvent<typeof VENDOR_SUSPENSION_EVENT_TYPE.EXPIRED, VendorSuspensionExpiredPayload> {
  constructor(p: EventParams<VendorSuspensionExpiredPayload>) { super(buildParams(VENDOR_SUSPENSION_EVENT_TYPE.EXPIRED, p)); }
}
