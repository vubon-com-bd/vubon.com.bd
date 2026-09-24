import type { ConversationEntity } from '../../../domain/entities/conversation.entity';
import type { ConversationIdVO } from '../../../domain/value-objects/primitives/conversation-id.vo';
import type { StartConversationRequestDTO } from '../../dtos/requests/conversation';
import type { ConversationResponseDTO } from '../../dtos/responses/conversation-response.dto';

export interface ConversationServiceInterface {
  start(input: StartConversationRequestDTO): Promise<ConversationResponseDTO>;
  end(id: ConversationIdVO): Promise<void>;
  findById(id: ConversationIdVO): Promise<ConversationEntity | null>;
}
