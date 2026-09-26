/**
 * SendChatbotMessageRequestDTO
 * @module support-service/application/dtos/requests/chatbot
 */
export interface SendChatbotMessageRequestDTO {
  readonly chatbotId: string;
  readonly sessionId?: string;
  readonly userId?: string;
  readonly message: string;
}
