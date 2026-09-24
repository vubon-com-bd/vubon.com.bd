import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Feedback';

export class FeedbackSubmittedEvent extends BaseDomainEvent<
  'support.feedback.submitted',
  { feedbackId: string; userId: string; type: string }
> {
  constructor(aggregateId: string, userId: string, type: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.feedback.submitted',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { feedbackId: aggregateId, userId, type },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class FeedbackReviewedEvent extends BaseDomainEvent<
  'support.feedback.reviewed',
  { feedbackId: string; status: string }
> {
  constructor(aggregateId: string, status: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.feedback.reviewed',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { feedbackId: aggregateId, status },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
