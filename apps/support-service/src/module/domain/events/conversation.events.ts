import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Conversation';

export class ConversationStartedEvent extends BaseDomainEvent<
  'support.conversation.started',
  { conversationId: string; userId: string; type: string }
> {
  constructor(aggregateId: string, userId: string, type: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.conversation.started',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { conversationId: aggregateId, userId, type },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class ConversationEndedEvent extends BaseDomainEvent<
  'support.conversation.ended',
  { conversationId: string }
> {
  constructor(aggregateId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.conversation.ended',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { conversationId: aggregateId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
