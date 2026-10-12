/**
 * Vendor Rating domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorRating';

export const VENDOR_RATING_EVENT_TYPE = {
  REVIEW_RECORDED: 'vendor.rating.review_recorded',
  REVIEW_REMOVED: 'vendor.rating.review_removed',
  RECALCULATED: 'vendor.rating.recalculated',
  AUTO_HIDDEN: 'vendor.rating.auto_hidden',
  AUTO_FLAGGED: 'vendor.rating.auto_flagged',
} as const;

export interface VendorRatingReviewRecordedPayload {
  readonly ratingId: string;
  readonly vendorId: string;
  readonly starRating: number;
  readonly totalReviews: number;
  readonly newOverall: number;
  readonly recordedAt: string;
}
export interface VendorRatingReviewRemovedPayload {
  readonly ratingId: string;
  readonly vendorId: string;
  readonly starRating: number;
  readonly totalReviews: number;
  readonly newOverall: number;
  readonly removedAt: string;
}
export interface VendorRatingRecalculatedPayload {
  readonly ratingId: string;
  readonly vendorId: string;
  readonly oldOverall: number;
  readonly newOverall: number;
  readonly totalReviews: number;
  readonly recalculatedAt: string;
}
export interface VendorRatingAutoHiddenPayload {
  readonly ratingId: string;
  readonly vendorId: string;
  readonly overall: number;
  readonly totalReviews: number;
  readonly hiddenAt: string;
}
export interface VendorRatingAutoFlaggedPayload {
  readonly ratingId: string;
  readonly vendorId: string;
  readonly overall: number;
  readonly totalReviews: number;
  readonly flaggedAt: string;
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

export class VendorRatingReviewRecordedEvent extends BaseDomainEvent<typeof VENDOR_RATING_EVENT_TYPE.REVIEW_RECORDED, VendorRatingReviewRecordedPayload> {
  constructor(p: EventParams<VendorRatingReviewRecordedPayload>) { super(buildParams(VENDOR_RATING_EVENT_TYPE.REVIEW_RECORDED, p)); }
}
export class VendorRatingReviewRemovedEvent extends BaseDomainEvent<typeof VENDOR_RATING_EVENT_TYPE.REVIEW_REMOVED, VendorRatingReviewRemovedPayload> {
  constructor(p: EventParams<VendorRatingReviewRemovedPayload>) { super(buildParams(VENDOR_RATING_EVENT_TYPE.REVIEW_REMOVED, p)); }
}
export class VendorRatingRecalculatedEvent extends BaseDomainEvent<typeof VENDOR_RATING_EVENT_TYPE.RECALCULATED, VendorRatingRecalculatedPayload> {
  constructor(p: EventParams<VendorRatingRecalculatedPayload>) { super(buildParams(VENDOR_RATING_EVENT_TYPE.RECALCULATED, p)); }
}
export class VendorRatingAutoHiddenEvent extends BaseDomainEvent<typeof VENDOR_RATING_EVENT_TYPE.AUTO_HIDDEN, VendorRatingAutoHiddenPayload> {
  constructor(p: EventParams<VendorRatingAutoHiddenPayload>) { super(buildParams(VENDOR_RATING_EVENT_TYPE.AUTO_HIDDEN, p)); }
}
export class VendorRatingAutoFlaggedEvent extends BaseDomainEvent<typeof VENDOR_RATING_EVENT_TYPE.AUTO_FLAGGED, VendorRatingAutoFlaggedPayload> {
  constructor(p: EventParams<VendorRatingAutoFlaggedPayload>) { super(buildParams(VENDOR_RATING_EVENT_TYPE.AUTO_FLAGGED, p)); }
}
