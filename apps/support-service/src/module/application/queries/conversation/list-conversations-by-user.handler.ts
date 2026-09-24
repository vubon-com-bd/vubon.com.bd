import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListConversationsByUserQuery } from './list-conversations-by-user.query';
import type { ConversationRepository } from '../../../domain/repositories/conversation.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { ConversationResponseDTO } from '../../dtos/responses/conversation-response.dto';

@QueryHandler(ListConversationsByUserQuery)
export class ListConversationsByUserHandler
  extends BaseQueryHandler<ListConversationsByUserQuery, readonly ConversationResponseDTO[]>
  implements IQueryHandler<ListConversationsByUserQuery>
{
  readonly queryType = 'support.conversation.list-by-user';

  constructor(private readonly conversationRepo: ConversationRepository) {
    super();
  }

  async execute(query: ListConversationsByUserQuery): Promise<readonly ConversationResponseDTO[]> {
    const convs = await this.conversationRepo.findByUser(UserIdVO.create(query.userId));
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
