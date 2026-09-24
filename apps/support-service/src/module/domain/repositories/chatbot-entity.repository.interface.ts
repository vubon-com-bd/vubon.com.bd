import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ChatbotEntityEntity } from '../entities/chatbot-entity.entity';
import { ChatbotEntityIdVO } from '../value-objects/primitives/chatbot-entity-id.vo';
import { ChatbotIdVO } from '../value-objects/primitives/chatbot-id.vo';

export interface ChatbotEntityRepository extends BaseRepository<ChatbotEntityEntity, ChatbotEntityIdVO> {
  findByChatbot(chatbotId: ChatbotIdVO): Promise<readonly ChatbotEntityEntity[]>;
}
