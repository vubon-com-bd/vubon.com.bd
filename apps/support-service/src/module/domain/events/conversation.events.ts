/**
 * Conversation Domain Events
 * @module support-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp, type Timestamp } from '@vubon/shared-types/common';
import { ConversationIdVO } from '../value-objects/primitives/conversation-id.vo';
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

export interface ConversationStartedPayload {
  readonly userId: string;
  readonly type: string;
}

export class ConversationStartedEvent extends BaseDomainEvent<
  'support.conversation.started',
  ConversationStartedPayload
> {
  constructor(
    id: ConversationIdVO,
    userId: UserIdVO,
    type: string,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'conversation', version, occurredAt),
      type: 'support.conversation.started',
      payload: { userId: userId.value, type },
    });
  }
}

export interface ConversationEndedPayload {
  readonly reason?: string;
}

export class ConversationEndedEvent extends BaseDomainEvent<
  'support.conversation.ended',
  ConversationEndedPayload
> {
  constructor(
    id: ConversationIdVO,
    occurredAt: number,
    reason?: string,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'conversation', version, occurredAt),
      type: 'support.conversation.ended',
      payload: { reason },
    });
  }
}
