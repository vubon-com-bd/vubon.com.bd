import type { ChatbotEntityEntity } from '../../../domain/entities/chatbot-entity.entity';
import type { ChatbotEntityIdVO } from '../../../domain/value-objects/primitives/chatbot-entity-id.vo';
import type { TrainEntityRequestDTO } from '../../dtos/requests/chatbot';

export interface ChatbotEntityServiceInterface {
  train(input: TrainEntityRequestDTO): Promise<{ id: string }>;
  findById(id: ChatbotEntityIdVO): Promise<ChatbotEntityEntity | null>;
}
