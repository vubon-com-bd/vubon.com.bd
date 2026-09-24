import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'LiveChat';

export class ChatStartedEvent extends BaseDomainEvent<
  'support.chat.started',
  { chatId: string; userId: string }
> {
  constructor(aggregateId: string, userId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.chat.started',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { chatId: aggregateId, userId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class ChatEndedEvent extends BaseDomainEvent<
  'support.chat.ended',
  { chatId: string }
> {
  constructor(aggregateId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.chat.ended',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { chatId: aggregateId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class AgentJoinedEvent extends BaseDomainEvent<
  'support.chat.agent.joined',
  { chatId: string; agentId: string }
> {
  constructor(aggregateId: string, agentId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.chat.agent.joined',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { chatId: aggregateId, agentId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
