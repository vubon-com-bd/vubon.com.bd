/**
 * StartConversationRequestDTO
 * @module support-service/application/dtos/requests/conversation
 */
import type {
  ConversationTypeValue,
} from '@vubon/shared-types/support';

export interface StartConversationRequestDTO {
  readonly title?: string;
  readonly type: ConversationTypeValue;
  readonly participantIds: readonly string[];
  readonly ticketId?: string;
}
