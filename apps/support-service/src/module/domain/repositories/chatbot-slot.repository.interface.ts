/**
 * ChatbotSlotRepository — Repository interface
 * @module support-service/domain/repositories
 *
 * Note: ChatbotSlotEntity = ChatbotEntityEntity (chatbot-entity.entity.ts)
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ChatbotSlotEntity } from '../entities/chatbot-entity.entity';
import { ChatbotEntityIdVO } from '../value-objects/primitives/chatbot-entity-id.vo';
import { ChatbotIdVO } from '../value-objects/primitives/chatbot-id.vo';

export interface ChatbotSlotRepository
  extends BaseRepository<ChatbotSlotEntity, ChatbotEntityIdVO> {
  findByChatbot(chatbotId: ChatbotIdVO): Promise<readonly ChatbotSlotEntity[]>;
  findRequiredByChatbot(chatbotId: ChatbotIdVO): Promise<readonly ChatbotSlotEntity[]>;
  findByName(chatbotId: ChatbotIdVO, name: string): Promise<ChatbotSlotEntity | null>;
  countByChatbot(chatbotId: ChatbotIdVO): Promise<number>;
}
