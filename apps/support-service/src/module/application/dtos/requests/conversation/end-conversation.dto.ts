/**
 * EndConversationRequestDTO
 * @module support-service/application/dtos/requests/conversation
 */
export interface EndConversationRequestDTO {
  readonly conversationId: string;
  readonly reason?: string;
}
