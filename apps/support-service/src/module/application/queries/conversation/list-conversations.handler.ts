/**
 * ListConversationsHandler
 * @module support-service/application/queries/conversation
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListConversationsQuery } from './list-conversations.query';
import type { ConversationListResponseDTO } from '../../dtos/responses/conversation-list-response.dto';
import type { ConversationServiceInterface } from '../../services/interfaces/conversation.service.interface';

export class ListConversationsHandler extends BaseQueryHandler<
  ListConversationsQuery,
  ConversationListResponseDTO
> {
  readonly queryType = 'support.conversation.list';

  constructor(private readonly conversationService: ConversationServiceInterface) {
    super();
  }

  async execute(query: ListConversationsQuery): Promise<ConversationListResponseDTO> {
    return this.conversationService.listByUser(query.userId, query.page, query.limit);
  }
}
