import type { ChatbotEntity } from '../../../domain/entities/chatbot.entity';
import type { ChatbotIdVO } from '../../../domain/value-objects/primitives/chatbot-id.vo';
import type { SendChatbotMessageRequestDTO } from '../../dtos/requests/chatbot';
import type { ChatbotMessageResponseDTO } from '../../dtos/responses/chatbot-response.dto';

export interface ChatbotServiceInterface {
  findById(id: ChatbotIdVO): Promise<ChatbotEntity | null>;
  sendMessage(input: SendChatbotMessageRequestDTO): Promise<ChatbotMessageResponseDTO>;
}
