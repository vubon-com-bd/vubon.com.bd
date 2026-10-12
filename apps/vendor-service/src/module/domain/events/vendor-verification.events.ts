/**
 * Vendor Verification domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorVerification';

export const VENDOR_VERIFICATION_EVENT_TYPE = {
  SUBMITTED: 'vendor.verification.submitted',
  REVIEW_STARTED: 'vendor.verification.review_started',
  APPROVED: 'vendor.verification.approved',
  REJECTED: 'vendor.verification.rejected',
  EXPIRED: 'vendor.verification.expired',
} as const;

export interface VendorVerificationSubmittedPayload {
  readonly verificationId: string;
  readonly vendorId: string;
  readonly submittedAt: string;
}
export interface VendorVerificationReviewStartedPayload {
  readonly verificationId: string;
  readonly vendorId: string;
  readonly reviewedBy: string;
  readonly startedAt: string;
}
export interface VendorVerificationApprovedPayload {
  readonly verificationId: string;
  readonly vendorId: string;
  readonly reviewedBy: string;
  readonly approvedAt: string;
}
export interface VendorVerificationRejectedPayload {
  readonly verificationId: string;
  readonly vendorId: string;
  readonly reviewedBy: string;
  readonly reason: string;
  readonly rejectedAt: string;
}
export interface VendorVerificationExpiredPayload {
  readonly verificationId: string;
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

export class VendorVerificationSubmittedEvent extends BaseDomainEvent<typeof VENDOR_VERIFICATION_EVENT_TYPE.SUBMITTED, VendorVerificationSubmittedPayload> {
  constructor(p: EventParams<VendorVerificationSubmittedPayload>) { super(buildParams(VENDOR_VERIFICATION_EVENT_TYPE.SUBMITTED, p)); }
}
export class VendorVerificationReviewStartedEvent extends BaseDomainEvent<typeof VENDOR_VERIFICATION_EVENT_TYPE.REVIEW_STARTED, VendorVerificationReviewStartedPayload> {
  constructor(p: EventParams<VendorVerificationReviewStartedPayload>) { super(buildParams(VENDOR_VERIFICATION_EVENT_TYPE.REVIEW_STARTED, p)); }
}
export class VendorVerificationApprovedEvent extends BaseDomainEvent<typeof VENDOR_VERIFICATION_EVENT_TYPE.APPROVED, VendorVerificationApprovedPayload> {
  constructor(p: EventParams<VendorVerificationApprovedPayload>) { super(buildParams(VENDOR_VERIFICATION_EVENT_TYPE.APPROVED, p)); }
}
export class VendorVerificationRejectedEvent extends BaseDomainEvent<typeof VENDOR_VERIFICATION_EVENT_TYPE.REJECTED, VendorVerificationRejectedPayload> {
  constructor(p: EventParams<VendorVerificationRejectedPayload>) { super(buildParams(VENDOR_VERIFICATION_EVENT_TYPE.REJECTED, p)); }
}
export class VendorVerificationExpiredEvent extends BaseDomainEvent<typeof VENDOR_VERIFICATION_EVENT_TYPE.EXPIRED, VendorVerificationExpiredPayload> {
  constructor(p: EventParams<VendorVerificationExpiredPayload>) { super(buildParams(VENDOR_VERIFICATION_EVENT_TYPE.EXPIRED, p)); }
}
