/**
 * LiveChatServiceInterface
 * @module support-service/application/services/interfaces
 */
import type { StartChatRequestDTO } from '../../dtos/requests/live-chat/start-chat.dto';
import type { SendChatMessageRequestDTO } from '../../dtos/requests/live-chat/send-chat-message.dto';
import type { TransferChatRequestDTO } from '../../dtos/requests/live-chat/transfer-chat.dto';
import type { EndChatRequestDTO } from '../../dtos/requests/live-chat/end-chat.dto';
import type { LiveChatResponseDTO } from '../../dtos/responses/live-chat-response.dto';
import type { LiveChatListResponseDTO } from '../../dtos/responses/live-chat-list-response.dto';

export interface LiveChatServiceInterface {
  start(input: StartChatRequestDTO): Promise<LiveChatResponseDTO>;
  sendMessage(input: SendChatMessageRequestDTO): Promise<LiveChatResponseDTO>;
  transfer(input: TransferChatRequestDTO): Promise<LiveChatResponseDTO>;
  end(input: EndChatRequestDTO): Promise<LiveChatResponseDTO>;
  getById(sessionId: string): Promise<LiveChatResponseDTO>;
  list(page: number, limit: number): Promise<LiveChatListResponseDTO>;
}
