/**
 * MessageServiceInterface
 * @module support-service/application/services/interfaces
 */
import type { SendMessageRequestDTO } from '../../dtos/requests/message/send-message.dto';
import type { MarkMessageReadRequestDTO } from '../../dtos/requests/message/mark-read.dto';
import type { AttachFileRequestDTO } from '../../dtos/requests/message/attach-file.dto';
import type { MessageResponseDTO } from '../../dtos/responses/message-response.dto';
import type { MessageListResponseDTO } from '../../dtos/responses/message-list-response.dto';

export interface MessageServiceInterface {
  send(input: SendMessageRequestDTO): Promise<MessageResponseDTO>;
  markRead(input: MarkMessageReadRequestDTO): Promise<MessageResponseDTO>;
  attachFile(input: AttachFileRequestDTO): Promise<MessageResponseDTO>;
  listByConversation(
    conversationId: string,
    page: number,
    limit: number,
  ): Promise<MessageListResponseDTO>;
}
