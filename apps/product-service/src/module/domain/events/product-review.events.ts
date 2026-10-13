/**
 * Product Review Domain Events
 * @module product-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PRODUCT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const REVIEW_EVENT_TYPE = {
  SUBMITTED: 'product.review.submitted',
  APPROVED: 'product.review.approved',
  REJECTED: 'product.review.rejected',
  UPDATED: 'product.review.updated',
  DELETED: 'product.review.deleted',
  MARKED_HELPFUL: 'product.review.marked_helpful',
  REPORTED: 'product.review.reported',
} as const;

export interface ReviewSubmittedPayload {
  readonly reviewId: string;
  readonly productId: string;
  readonly userId: string;
  readonly rating: number;
  readonly submittedAt: string;
}

export interface ReviewApprovedPayload {
  readonly reviewId: string;
  readonly productId: string;
  readonly approvedBy?: string;
  readonly approvedAt: string;
}

export interface ReviewRejectedPayload {
  readonly reviewId: string;
  readonly productId: string;
  readonly reason: string;
  readonly rejectedAt: string;
}

export interface ReviewUpdatedPayload {
  readonly reviewId: string;
  readonly productId: string;
  readonly changedFields: readonly string[];
  readonly updatedAt: string;
}

export interface ReviewDeletedPayload {
  readonly reviewId: string;
  readonly productId: string;
  readonly deletedAt: string;
  readonly deletedBy?: string;
}

export interface ReviewMarkedHelpfulPayload {
  readonly reviewId: string;
  readonly helpfulCount: number;
  readonly markedAt: string;
}

export interface ReviewReportedPayload {
  readonly reviewId: string;
  readonly reportCount: number;
  readonly reason: string;
  readonly reportedAt: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

function buildParams<TType extends string, TPayload>(
  type: TType,
  p: EventParams<TPayload>,
) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: PRODUCT_AGGREGATE_TYPE.REVIEW,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class ReviewSubmittedEvent extends BaseDomainEvent<
  typeof REVIEW_EVENT_TYPE.SUBMITTED,
  ReviewSubmittedPayload
> {
  constructor(p: EventParams<ReviewSubmittedPayload>) {
    super(buildParams(REVIEW_EVENT_TYPE.SUBMITTED, p));
  }
}

export class ReviewApprovedEvent extends BaseDomainEvent<
  typeof REVIEW_EVENT_TYPE.APPROVED,
  ReviewApprovedPayload
> {
  constructor(p: EventParams<ReviewApprovedPayload>) {
    super(buildParams(REVIEW_EVENT_TYPE.APPROVED, p));
  }
}

export class ReviewRejectedEvent extends BaseDomainEvent<
  typeof REVIEW_EVENT_TYPE.REJECTED,
  ReviewRejectedPayload
> {
  constructor(p: EventParams<ReviewRejectedPayload>) {
    super(buildParams(REVIEW_EVENT_TYPE.REJECTED, p));
  }
}

export class ReviewUpdatedEvent extends BaseDomainEvent<
  typeof REVIEW_EVENT_TYPE.UPDATED,
  ReviewUpdatedPayload
> {
  constructor(p: EventParams<ReviewUpdatedPayload>) {
    super(buildParams(REVIEW_EVENT_TYPE.UPDATED, p));
  }
}

export class ReviewDeletedEvent extends BaseDomainEvent<
  typeof REVIEW_EVENT_TYPE.DELETED,
  ReviewDeletedPayload
> {
  constructor(p: EventParams<ReviewDeletedPayload>) {
    super(buildParams(REVIEW_EVENT_TYPE.DELETED, p));
  }
}

export class ReviewMarkedHelpfulEvent extends BaseDomainEvent<
  typeof REVIEW_EVENT_TYPE.MARKED_HELPFUL,
  ReviewMarkedHelpfulPayload
> {
  constructor(p: EventParams<ReviewMarkedHelpfulPayload>) {
    super(buildParams(REVIEW_EVENT_TYPE.MARKED_HELPFUL, p));
  }
}

export class ReviewReportedEvent extends BaseDomainEvent<
  typeof REVIEW_EVENT_TYPE.REPORTED,
  ReviewReportedPayload
> {
  constructor(p: EventParams<ReviewReportedPayload>) {
    super(buildParams(REVIEW_EVENT_TYPE.REPORTED, p));
  }
}
