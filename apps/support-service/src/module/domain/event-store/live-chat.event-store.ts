/**
 * LiveChatEventStore — Event sourcing for live chats
 * @module support-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type {
  DomainEvent,
  EventEnvelope,
} from '@vubon/shared-kernel/domain/base/base.event';
import { LiveChatIdVO } from '../value-objects/primitives/live-chat-id.vo';

export interface LiveChatEventStore extends BaseEventStore {
  getEvents(chatId: LiveChatIdVO): Promise<readonly DomainEvent[]>;
  saveEvents(
    chatId: LiveChatIdVO,
    events: readonly DomainEvent[],
    expectedVersion?: number,
  ): Promise<void>;
  getVersionForChat(chatId: LiveChatIdVO): Promise<number>;
  existsForChat(chatId: LiveChatIdVO): Promise<boolean>;
  loadStreamForChat(
    chatId: LiveChatIdVO,
    fromVersion?: number,
  ): Promise<readonly EventEnvelope[]>;
}
