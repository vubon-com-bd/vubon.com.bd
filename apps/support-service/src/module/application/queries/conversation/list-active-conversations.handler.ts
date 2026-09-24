import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListActiveConversationsQuery } from './list-active-conversations.query';
import type { ConversationRepository } from '../../../domain/repositories/conversation.repository.interface';
import type { ConversationResponseDTO } from '../../dtos/responses/conversation-response.dto';

@QueryHandler(ListActiveConversationsQuery)
export class ListActiveConversationsHandler
  extends BaseQueryHandler<ListActiveConversationsQuery, readonly ConversationResponseDTO[]>
  implements IQueryHandler<ListActiveConversationsQuery>
{
  readonly queryType = 'support.conversation.list-active';

  constructor(private readonly conversationRepo: ConversationRepository) {
    super();
  }

  async execute(_query: ListActiveConversationsQuery): Promise<readonly ConversationResponseDTO[]> {
    const convs = await this.conversationRepo.findActive();
    return convs.map((c) => ({
      id: c.id.value,
      userId: c.userId.value,
      agentId: c.agentId?.value ?? null,
      status: c.status.value,
      type: c.type.value,
      startedAt: c.startedAt.toISOString(),
      endedAt: c.endedAt?.toISOString() ?? null,
    }));
  }
}
