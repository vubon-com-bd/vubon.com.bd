/**
 * Survey Domain Events
 * @module support-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp, type Timestamp } from '@vubon/shared-types/common';
import { SurveyIdVO } from '../value-objects/primitives/survey-id.vo';
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

export interface SurveyCompletedPayload {
  readonly userId: string;
  readonly answerCount: number;
}

export class SurveyCompletedEvent extends BaseDomainEvent<
  'support.survey.completed',
  SurveyCompletedPayload
> {
  constructor(
    id: SurveyIdVO,
    userId: UserIdVO,
    answerCount: number,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'survey', version, occurredAt),
      type: 'support.survey.completed',
      payload: { userId: userId.value, answerCount },
    });
  }
}

export interface SurveyResponseReceivedPayload {
  readonly userId: string;
  readonly answerCount: number;
}

export class SurveyResponseReceivedEvent extends BaseDomainEvent<
  'support.survey.response_received',
  SurveyResponseReceivedPayload
> {
  constructor(
    id: SurveyIdVO,
    userId: UserIdVO,
    answerCount: number,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'survey', version, occurredAt),
      type: 'support.survey.response_received',
      payload: { userId: userId.value, answerCount },
    });
  }
}
