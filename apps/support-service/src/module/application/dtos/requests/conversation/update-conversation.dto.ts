/**
 * UpdateConversationRequestDTO
 * @module support-service/application/dtos/requests/conversation
 */
export interface UpdateConversationRequestDTO {
  readonly title?: string;
  readonly isLocked?: boolean;
  readonly isPinned?: boolean;
}
