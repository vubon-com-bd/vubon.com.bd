/**
 * EndChatRequestDTO
 * @module support-service/application/dtos/requests/live-chat
 */
export interface EndChatRequestDTO {
  readonly sessionId: string;
  readonly reason?: string;
}
