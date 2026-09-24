import type { ChatbotIntentEntity } from '../../../domain/entities/chatbot-intent.entity';
import type { ChatbotIntentIdVO } from '../../../domain/value-objects/primitives/chatbot-intent-id.vo';
import type { TrainIntentRequestDTO } from '../../dtos/requests/chatbot';

export interface ChatbotIntentServiceInterface {
  train(input: TrainIntentRequestDTO): Promise<{ id: string }>;
  findById(id: ChatbotIntentIdVO): Promise<ChatbotIntentEntity | null>;
}
