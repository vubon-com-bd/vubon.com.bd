/**
 * SendChatMessageRequestDTO
 * @module support-service/application/dtos/requests/live-chat
 */
export interface SendChatMessageRequestDTO {
  readonly sessionId: string;
  readonly senderId?: string;
  readonly senderType: 'customer' | 'agent' | 'bot' | 'system';
  readonly content: string;
}
