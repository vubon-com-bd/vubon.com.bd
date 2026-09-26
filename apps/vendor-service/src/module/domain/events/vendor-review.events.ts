import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'VendorReview';

export class ReviewSubmittedEvent extends BaseDomainEvent<
  'vendor.review.submitted',
  { reviewId: string; vendorId: string; userId: string; rating: number }
> {
  constructor(
    aggregateId: string,
    reviewId: string,
    vendorId: string,
    userId: string,
    rating: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.review.submitted',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { reviewId, vendorId, userId, rating },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class ReviewApprovedEvent extends BaseDomainEvent<
  'vendor.review.approved',
  { reviewId: string; vendorId: string }
> {
  constructor(
    aggregateId: string,
    reviewId: string,
    vendorId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'vendor.review.approved',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { reviewId, vendorId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
