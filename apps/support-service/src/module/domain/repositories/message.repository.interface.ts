/**
 * MessageRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { MessageEntity } from '../entities/message.entity';
import { MessageIdVO } from '../value-objects/primitives/message-id.vo';
import { ConversationIdVO } from '../value-objects/primitives/conversation-id.vo';

export interface MessageRepository
  extends BaseRepository<MessageEntity, MessageIdVO> {
  findByConversation(conversationId: ConversationIdVO): Promise<readonly MessageEntity[]>;
  findUnreadByConversation(conversationId: ConversationIdVO): Promise<readonly MessageEntity[]>;
  countByConversation(conversationId: ConversationIdVO): Promise<number>;
  latestByConversation(conversationId: ConversationIdVO): Promise<MessageEntity | null>;
}
