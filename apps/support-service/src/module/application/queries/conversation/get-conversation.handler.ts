/**
 * GetConversationHandler
 * @module support-service/application/queries/conversation
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetConversationQuery } from './get-conversation.query';
import type { ConversationResponseDTO } from '../../dtos/responses/conversation-response.dto';
import type { ConversationServiceInterface } from '../../services/interfaces/conversation.service.interface';

export class GetConversationHandler extends BaseQueryHandler<
  GetConversationQuery,
  ConversationResponseDTO
> {
  readonly queryType = 'support.conversation.get';

  constructor(private readonly conversationService: ConversationServiceInterface) {
    super();
  }

  async execute(query: GetConversationQuery): Promise<ConversationResponseDTO> {
    return this.conversationService.getById(query.conversationId);
  }
}
