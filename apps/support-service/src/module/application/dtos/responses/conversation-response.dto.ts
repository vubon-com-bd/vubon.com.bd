/**
 * ConversationResponseDTO
 * @module support-service/application/dtos/responses
 */
import type {
  ConversationStatusValue,
  ConversationTypeValue,
} from '@vubon/shared-types/support';

export interface ConversationResponseDTO {
  readonly id: string;
  readonly title?: string;
  readonly type: ConversationTypeValue;
  readonly status: ConversationStatusValue;
  readonly ticketId?: string;
  readonly participantIds: readonly string[];
  readonly messageCount: number;
  readonly unreadCount: number;
  readonly lastMessageAt?: string;
  readonly lastMessagePreview?: string;
  readonly isLocked: boolean;
  readonly isPinned: boolean;
  readonly archivedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
