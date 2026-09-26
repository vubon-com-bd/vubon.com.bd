/**
 * Chatbot Domain Events
 * @module support-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp, type Timestamp } from '@vubon/shared-types/common';
import { ChatbotIdVO } from '../value-objects/primitives/chatbot-id.vo';
import { ChatbotIntentIdVO } from '../value-objects/primitives/chatbot-intent-id.vo';

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

export interface ChatbotIntentDetectedPayload {
  readonly intentId: string;
  readonly confidence: number;
  readonly matchedText: string;
}

export class ChatbotIntentDetectedEvent extends BaseDomainEvent<
  'support.chatbot.intent_detected',
  ChatbotIntentDetectedPayload
> {
  constructor(
    id: ChatbotIdVO,
    intentId: ChatbotIntentIdVO,
    confidence: number,
    matchedText: string,
    occurredAt: number,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'chatbot', version, occurredAt),
      type: 'support.chatbot.intent_detected',
      payload: { intentId: intentId.value, confidence, matchedText },
    });
  }
}

export interface ChatbotEscalatedPayload {
  readonly reason: string;
  readonly targetAgentId?: string;
}

export class ChatbotEscalatedEvent extends BaseDomainEvent<
  'support.chatbot.escalated',
  ChatbotEscalatedPayload
> {
  constructor(
    id: ChatbotIdVO,
    reason: string,
    occurredAt: number,
    targetAgentId?: string,
    version = 1,
  ) {
    super({
      ...meta(id.value, 'chatbot', version, occurredAt),
      type: 'support.chatbot.escalated',
      payload: { reason, targetAgentId },
    });
  }
}
