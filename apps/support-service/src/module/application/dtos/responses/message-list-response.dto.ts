/**
 * MessageListResponseDTO — paginated list
 * @module support-service/application/dtos/responses
 */
import type { MessageResponseDTO } from './message-response.dto';

export interface MessageListResponseDTO {
  readonly items: readonly MessageResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
