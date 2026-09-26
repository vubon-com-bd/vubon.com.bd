/**
 * Feedback Domain Events
 * @module support-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp, type Timestamp } from '@vubon/shared-types/common';
import { FeedbackIdVO } from '../value-objects/primitives/feedback-id.vo';
import { FeedbackTypeVO } from '../value-objects/primitives/feedback-type.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

interface MetaFields {
  readonly id: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly occurredAt: Timestamp;
  readonly version: number;
}

const meta = (
  aggregateId: string,
  aggregateType: string,
  version: number,
  occurredAt: number,
): MetaFields => ({
  id: `${aggregateId}-${version}-${occurredAt}`,
  aggregateId,
  aggregateType,
  occurredAt: toTimestamp(occurredAt),
  version,
});

export interface FeedbackSubmittedPayload {
  readonly userId: string;
  readonly type: string;
  readonly rating?: number;
}

export class FeedbackSubmittedEvent extends BaseDomainEvent<
  'support.feedback.submitted',
  FeedbackSubmittedPayload
> {
  constructor(
    id: FeedbackIdVO,
    userId: UserIdVO,
    type: FeedbackTypeVO,
    occurredAt: number,
    rating?: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'feedback', version, occurredAt),
      type: 'support.feedback.submitted',
      payload: { userId: userId.value, type: type.value, rating },
    });
  }
}

export interface FeedbackReviewedPayload {
  readonly reviewerId: string;
  readonly outcome: string;
}

export class FeedbackReviewedEvent extends BaseDomainEvent<
  'support.feedback.reviewed',
  FeedbackReviewedPayload
> {
  constructor(
    id: FeedbackIdVO,
    reviewerId: UserIdVO,
    outcome: string,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'feedback', version, occurredAt),
      type: 'support.feedback.reviewed',
      payload: { reviewerId: reviewerId.value, outcome },
    });
  }
}
