/**
 * MessageResponseDTO
 * @module support-service/application/dtos/responses
 */
import type {
  SupportMessageTypeValue,
  SupportMessageStatusValue,
  SupportMessageSenderTypeValue,
} from '@vubon/shared-types/support';

export interface MessageResponseDTO {
  readonly id: string;
  readonly conversationId: string;
  readonly ticketId?: string;
  readonly senderId?: string;
  readonly senderType: SupportMessageSenderTypeValue;
  readonly senderName?: string;
  readonly type: SupportMessageTypeValue;
  readonly status: SupportMessageStatusValue;
  readonly content?: string;
  readonly attachments?: readonly string[];
  readonly isInternal: boolean;
  readonly readAt?: string;
  readonly editedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
