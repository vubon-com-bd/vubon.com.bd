/**
 * ChatbotIntentRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ChatbotIntentEntity } from '../entities/chatbot-intent.entity';
import { ChatbotIntentIdVO } from '../value-objects/primitives/chatbot-intent-id.vo';
import { ChatbotIdVO } from '../value-objects/primitives/chatbot-id.vo';

export interface ChatbotIntentRepository
  extends BaseRepository<ChatbotIntentEntity, ChatbotIntentIdVO> {
  findByChatbot(chatbotId: ChatbotIdVO): Promise<readonly ChatbotIntentEntity[]>;
  findByName(chatbotId: ChatbotIdVO, name: string): Promise<ChatbotIntentEntity | null>;
  search(chatbotId: ChatbotIdVO, text: string): Promise<readonly ChatbotIntentEntity[]>;
  countByChatbot(chatbotId: ChatbotIdVO): Promise<number>;
}
