/**
 * SendMessageRequestDTO
 * @module support-service/application/dtos/requests/message
 *
 * Matches SupportMessageInputSchema
 */
import type {
  SupportMessageTypeValue,
} from '@vubon/shared-types/support';

export interface SendMessageRequestDTO {
  readonly conversationId: string;
  readonly content: string;
  readonly type?: SupportMessageTypeValue;
  readonly attachments?: readonly string[];
  readonly isInternal?: boolean;
  readonly senderId?: string;
  readonly senderType?: 'customer' | 'agent' | 'bot' | 'system';
}
