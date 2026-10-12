/**
 * Vendor Review domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorReview';

export const VENDOR_REVIEW_EVENT_TYPE = {
  SUBMITTED: 'vendor.review.submitted',
  APPROVED: 'vendor.review.approved',
  REJECTED: 'vendor.review.rejected',
  FLAGGED: 'vendor.review.flagged',
  HIDDEN: 'vendor.review.hidden',
  RESTORED: 'vendor.review.restored',
} as const;

export interface VendorReviewSubmittedPayload {
  readonly reviewId: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly orderId: string;
  readonly rating: number;
  readonly isVerifiedPurchase: boolean;
  readonly submittedAt: string;
}
export interface VendorReviewApprovedPayload {
  readonly reviewId: string;
  readonly vendorId: string;
  readonly approvedAt: string;
}
export interface VendorReviewRejectedPayload {
  readonly reviewId: string;
  readonly vendorId: string;
  readonly reason: string;
  readonly rejectedAt: string;
}
export interface VendorReviewFlaggedPayload {
  readonly reviewId: string;
  readonly vendorId: string;
  readonly reason: string;
  readonly flagCount: number;
  readonly flaggedAt: string;
}
export interface VendorReviewHiddenPayload {
  readonly reviewId: string;
  readonly vendorId: string;
  readonly reason: string;
  readonly hiddenAt: string;
}
export interface VendorReviewRestoredPayload {
  readonly reviewId: string;
  readonly vendorId: string;
  readonly restoredAt: string;
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

export class VendorReviewSubmittedEvent extends BaseDomainEvent<typeof VENDOR_REVIEW_EVENT_TYPE.SUBMITTED, VendorReviewSubmittedPayload> {
  constructor(p: EventParams<VendorReviewSubmittedPayload>) { super(buildParams(VENDOR_REVIEW_EVENT_TYPE.SUBMITTED, p)); }
}
export class VendorReviewApprovedEvent extends BaseDomainEvent<typeof VENDOR_REVIEW_EVENT_TYPE.APPROVED, VendorReviewApprovedPayload> {
  constructor(p: EventParams<VendorReviewApprovedPayload>) { super(buildParams(VENDOR_REVIEW_EVENT_TYPE.APPROVED, p)); }
}
export class VendorReviewRejectedEvent extends BaseDomainEvent<typeof VENDOR_REVIEW_EVENT_TYPE.REJECTED, VendorReviewRejectedPayload> {
  constructor(p: EventParams<VendorReviewRejectedPayload>) { super(buildParams(VENDOR_REVIEW_EVENT_TYPE.REJECTED, p)); }
}
export class VendorReviewFlaggedEvent extends BaseDomainEvent<typeof VENDOR_REVIEW_EVENT_TYPE.FLAGGED, VendorReviewFlaggedPayload> {
  constructor(p: EventParams<VendorReviewFlaggedPayload>) { super(buildParams(VENDOR_REVIEW_EVENT_TYPE.FLAGGED, p)); }
}
export class VendorReviewHiddenEvent extends BaseDomainEvent<typeof VENDOR_REVIEW_EVENT_TYPE.HIDDEN, VendorReviewHiddenPayload> {
  constructor(p: EventParams<VendorReviewHiddenPayload>) { super(buildParams(VENDOR_REVIEW_EVENT_TYPE.HIDDEN, p)); }
}
export class VendorReviewRestoredEvent extends BaseDomainEvent<typeof VENDOR_REVIEW_EVENT_TYPE.RESTORED, VendorReviewRestoredPayload> {
  constructor(p: EventParams<VendorReviewRestoredPayload>) { super(buildParams(VENDOR_REVIEW_EVENT_TYPE.RESTORED, p)); }
}
