import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ChatbotIntentEntity } from '../entities/chatbot-intent.entity';
import { ChatbotIntentIdVO } from '../value-objects/primitives/chatbot-intent-id.vo';
import { ChatbotIdVO } from '../value-objects/primitives/chatbot-id.vo';

export interface ChatbotIntentRepository extends BaseRepository<ChatbotIntentEntity, ChatbotIntentIdVO> {
  findByChatbot(chatbotId: ChatbotIdVO): Promise<readonly ChatbotIntentEntity[]>;
}
