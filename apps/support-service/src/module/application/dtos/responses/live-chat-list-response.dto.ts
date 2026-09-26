/**
 * LiveChatListResponseDTO
 * @module support-service/application/dtos/responses
 */
import type { LiveChatResponseDTO } from './live-chat-response.dto';

export interface LiveChatListResponseDTO {
  readonly items: readonly LiveChatResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
