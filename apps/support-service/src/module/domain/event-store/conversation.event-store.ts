/**
 * ConversationEventStore — Event sourcing for conversations
 * @module support-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type {
  DomainEvent,
  EventEnvelope,
} from '@vubon/shared-kernel/domain/base/base.event';
import { ConversationIdVO } from '../value-objects/primitives/conversation-id.vo';

export interface ConversationEventStore extends BaseEventStore {
  getEvents(conversationId: ConversationIdVO): Promise<readonly DomainEvent[]>;
  saveEvents(
    conversationId: ConversationIdVO,
    events: readonly DomainEvent[],
    expectedVersion?: number,
  ): Promise<void>;
  getVersionForConversation(conversationId: ConversationIdVO): Promise<number>;
  existsForConversation(conversationId: ConversationIdVO): Promise<boolean>;
  loadStreamForConversation(
    conversationId: ConversationIdVO,
    fromVersion?: number,
  ): Promise<readonly EventEnvelope[]>;
}
