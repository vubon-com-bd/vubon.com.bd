import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'ProductReview';

export class ReviewSubmittedEvent extends BaseDomainEvent<
  'product.review.submitted',
  { productId: string; reviewId: string; rating: number; userId: string }
> {
  constructor(aggregateId: string, productId: string, reviewId: string, rating: number, userId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.review.submitted',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, reviewId, rating, userId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class ReviewApprovedEvent extends BaseDomainEvent<
  'product.review.approved',
  { productId: string; reviewId: string }
> {
  constructor(aggregateId: string, productId: string, reviewId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.review.approved',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, reviewId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class ReviewRejectedEvent extends BaseDomainEvent<
  'product.review.rejected',
  { productId: string; reviewId: string; reason: string }
> {
  constructor(aggregateId: string, productId: string, reviewId: string, reason: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.review.rejected',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, reviewId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class ReviewUpdatedEvent extends BaseDomainEvent<
  'product.review.updated',
  { productId: string; reviewId: string }
> {
  constructor(aggregateId: string, productId: string, reviewId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.review.updated',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, reviewId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class ReviewDeletedEvent extends BaseDomainEvent<
  'product.review.deleted',
  { productId: string; reviewId: string }
> {
  constructor(aggregateId: string, productId: string, reviewId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.review.deleted',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, reviewId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
