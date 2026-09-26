/**
 * TransferChatRequestDTO
 * @module support-service/application/dtos/requests/live-chat
 */
export interface TransferChatRequestDTO {
  readonly sessionId: string;
  readonly toAgentId: string;
  readonly reason?: string;
}
