/**
 * Review domain events
 * @module product-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { REVIEW_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const REVIEW_EVENT_TYPE = {
  SUBMITTED: 'review.submitted',
  APPROVED: 'review.approved',
  REJECTED: 'review.rejected',
  DELETED: 'review.deleted',
  UPDATED: 'review.updated',
  HELPFUL_MARKED: 'review.helpful.marked',
  REPORTED: 'review.reported',
} as const;

export interface ReviewSubmittedPayload {
  readonly reviewId: string;
  readonly productId: string;
  readonly userId: string;
  readonly rating: number;
  readonly hasComment: boolean;
  readonly imageCount: number;
  readonly isVerifiedPurchase: boolean;
}

export interface ReviewModeratedPayload {
  readonly reviewId: string;
  readonly productId: string;
  readonly moderatedBy: string;
  readonly reason?: string;
}

export interface ReviewDeletedPayload {
  readonly reviewId: string;
  readonly productId: string;
  readonly deletedBy: string;
}

export interface ReviewUpdatedPayload {
  readonly reviewId: string;
  readonly productId: string;
  readonly oldRating: number;
  readonly newRating: number;
  readonly changedFields: readonly string[];
}

export interface ReviewHelpfulMarkedPayload {
  readonly reviewId: string;
  readonly productId: string;
  readonly markedBy: string;
  readonly helpfulCount: number;
}

export interface ReviewReportedPayload {
  readonly reviewId: string;
  readonly productId: string;
  readonly reportedBy: string;
  readonly reason: string;
  readonly reportCount: number;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class ReviewSubmittedEvent extends BaseDomainEvent<
  typeof REVIEW_EVENT_TYPE.SUBMITTED,
  ReviewSubmittedPayload
> {
  constructor(p: EventParams<ReviewSubmittedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: REVIEW_EVENT_TYPE.SUBMITTED,
      aggregateId: p.aggregateId,
      aggregateType: REVIEW_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ReviewApprovedEvent extends BaseDomainEvent<
  typeof REVIEW_EVENT_TYPE.APPROVED,
  ReviewModeratedPayload
> {
  constructor(p: EventParams<ReviewModeratedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: REVIEW_EVENT_TYPE.APPROVED,
      aggregateId: p.aggregateId,
      aggregateType: REVIEW_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ReviewRejectedEvent extends BaseDomainEvent<
  typeof REVIEW_EVENT_TYPE.REJECTED,
  ReviewModeratedPayload
> {
  constructor(p: EventParams<ReviewModeratedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: REVIEW_EVENT_TYPE.REJECTED,
      aggregateId: p.aggregateId,
      aggregateType: REVIEW_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ReviewDeletedEvent extends BaseDomainEvent<
  typeof REVIEW_EVENT_TYPE.DELETED,
  ReviewDeletedPayload
> {
  constructor(p: EventParams<ReviewDeletedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: REVIEW_EVENT_TYPE.DELETED,
      aggregateId: p.aggregateId,
      aggregateType: REVIEW_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ReviewUpdatedEvent extends BaseDomainEvent<
  typeof REVIEW_EVENT_TYPE.UPDATED,
  ReviewUpdatedPayload
> {
  constructor(p: EventParams<ReviewUpdatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: REVIEW_EVENT_TYPE.UPDATED,
      aggregateId: p.aggregateId,
      aggregateType: REVIEW_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ReviewHelpfulMarkedEvent extends BaseDomainEvent<
  typeof REVIEW_EVENT_TYPE.HELPFUL_MARKED,
  ReviewHelpfulMarkedPayload
> {
  constructor(p: EventParams<ReviewHelpfulMarkedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: REVIEW_EVENT_TYPE.HELPFUL_MARKED,
      aggregateId: p.aggregateId,
      aggregateType: REVIEW_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ReviewReportedEvent extends BaseDomainEvent<
  typeof REVIEW_EVENT_TYPE.REPORTED,
  ReviewReportedPayload
> {
  constructor(p: EventParams<ReviewReportedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: REVIEW_EVENT_TYPE.REPORTED,
      aggregateId: p.aggregateId,
      aggregateType: REVIEW_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
