/**
 * ConversationListResponseDTO — paginated list
 * @module support-service/application/dtos/responses
 */
import type { ConversationResponseDTO } from './conversation-response.dto';

export interface ConversationListResponseDTO {
  readonly items: readonly ConversationResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
