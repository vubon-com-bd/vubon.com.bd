/**
 * ChatbotRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ChatbotEntity } from '../entities/chatbot.entity';
import { ChatbotIdVO } from '../value-objects/primitives/chatbot-id.vo';
import { ChatbotStatusVO } from '../value-objects/primitives/chatbot-status.vo';
import { ChatbotTypeVO } from '../value-objects/primitives/chatbot-type.vo';

export interface ChatbotRepository
  extends BaseRepository<ChatbotEntity, ChatbotIdVO> {
  findActive(): Promise<readonly ChatbotEntity[]>;
  findByStatus(status: ChatbotStatusVO): Promise<readonly ChatbotEntity[]>;
  findByType(type: ChatbotTypeVO): Promise<readonly ChatbotEntity[]>;
  findByLanguage(language: string): Promise<readonly ChatbotEntity[]>;
}
