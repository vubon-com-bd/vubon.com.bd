import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Message';

export class MessageSentEvent extends BaseDomainEvent<
  'support.message.sent',
  { messageId: string; conversationId: string; senderId: string }
> {
  constructor(aggregateId: string, conversationId: string, senderId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.message.sent',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { messageId: aggregateId, conversationId, senderId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class MessageReadEvent extends BaseDomainEvent<
  'support.message.read',
  { messageId: string }
> {
  constructor(aggregateId: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.message.read',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { messageId: aggregateId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
