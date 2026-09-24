import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ChatbotEntity } from '../entities/chatbot.entity';
import { ChatbotIdVO } from '../value-objects/primitives/chatbot-id.vo';

export interface ChatbotRepository extends BaseRepository<ChatbotEntity, ChatbotIdVO> {
  findActive(): Promise<readonly ChatbotEntity[]>;
}
