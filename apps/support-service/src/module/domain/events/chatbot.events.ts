import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Chatbot';

export class ChatbotIntentDetectedEvent extends BaseDomainEvent<
  'support.chatbot.intent.detected',
  { chatbotId: string; intent: string }
> {
  constructor(aggregateId: string, intent: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.chatbot.intent.detected',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { chatbotId: aggregateId, intent },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class ChatbotEscalatedEvent extends BaseDomainEvent<
  'support.chatbot.escalated',
  { chatbotId: string; reason: string }
> {
  constructor(aggregateId: string, reason: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'support.chatbot.escalated',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { chatbotId: aggregateId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
