import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Survey';

export class SurveyCompletedEvent extends BaseDomainEvent<
  'support.survey.completed',
  { surveyId: string; userId: string }
> {
  constructor(aggregateId: string, userId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.survey.completed',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { surveyId: aggregateId, userId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class SurveyResponseReceivedEvent extends BaseDomainEvent<
  'support.survey.response.received',
  { surveyId: string; userId: string }
> {
  constructor(aggregateId: string, surveyId: string, userId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.survey.response.received',
      aggregateId,
      aggregateType: 'SurveyResponse',
      payload: { surveyId, userId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
