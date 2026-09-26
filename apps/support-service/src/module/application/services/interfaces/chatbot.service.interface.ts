/**
 * ChatbotServiceInterface
 * @module support-service/application/services/interfaces
 */
import type { SendChatbotMessageRequestDTO } from '../../dtos/requests/chatbot/send-chatbot-message.dto';
import type { TrainIntentRequestDTO } from '../../dtos/requests/chatbot/train-intent.dto';
import type { TrainEntityRequestDTO } from '../../dtos/requests/chatbot/train-entity.dto';
import type { ChatbotResponseDTO } from '../../dtos/responses/chatbot-response.dto';
import type { ChatbotReplyResponseDTO } from '../../dtos/responses/chatbot-reply-response.dto';

export interface ChatbotServiceInterface {
  sendMessage(input: SendChatbotMessageRequestDTO): Promise<ChatbotReplyResponseDTO>;
  trainIntent(input: TrainIntentRequestDTO): Promise<ChatbotResponseDTO>;
  trainEntity(input: TrainEntityRequestDTO): Promise<ChatbotResponseDTO>;
  getById(chatbotId: string): Promise<ChatbotResponseDTO>;
}
