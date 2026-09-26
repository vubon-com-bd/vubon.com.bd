/**
 * ConversationServiceInterface
 * @module support-service/application/services/interfaces
 */
import type { StartConversationRequestDTO } from '../../dtos/requests/conversation/start-conversation.dto';
import type { EndConversationRequestDTO } from '../../dtos/requests/conversation/end-conversation.dto';
import type { UpdateConversationRequestDTO } from '../../dtos/requests/conversation/update-conversation.dto';
import type { ConversationResponseDTO } from '../../dtos/responses/conversation-response.dto';
import type { ConversationListResponseDTO } from '../../dtos/responses/conversation-list-response.dto';

export interface ConversationServiceInterface {
  start(input: StartConversationRequestDTO): Promise<ConversationResponseDTO>;
  end(input: EndConversationRequestDTO): Promise<ConversationResponseDTO>;
  update(
    conversationId: string,
    input: UpdateConversationRequestDTO,
  ): Promise<ConversationResponseDTO>;
  getById(conversationId: string): Promise<ConversationResponseDTO>;
  listByUser(
    userId: string,
    page: number,
    limit: number,
  ): Promise<ConversationListResponseDTO>;
}
