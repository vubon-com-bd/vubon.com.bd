import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetConversationQuery } from './get-conversation.query';
import type { ConversationRepository } from '../../../domain/repositories/conversation.repository.interface';
import { ConversationIdVO } from '../../../domain/value-objects/primitives/conversation-id.vo';
import { ChatNotFoundError } from '../../errors/chat.errors';
import type { ConversationResponseDTO } from '../../dtos/responses/conversation-response.dto';

@QueryHandler(GetConversationQuery)
export class GetConversationHandler
  extends BaseQueryHandler<GetConversationQuery, ConversationResponseDTO>
  implements IQueryHandler<GetConversationQuery>
{
  readonly queryType = 'support.conversation.get';

  constructor(private readonly conversationRepo: ConversationRepository) {
    super();
  }

  async execute(query: GetConversationQuery): Promise<ConversationResponseDTO> {
    const conv = await this.conversationRepo.findById(ConversationIdVO.create(query.conversationId));
    if (!conv) throw new ChatNotFoundError(query.conversationId);
    return {
      id: conv.id.value,
      userId: conv.userId.value,
      agentId: conv.agentId?.value ?? null,
      status: conv.status.value,
      type: conv.type.value,
      startedAt: conv.startedAt.toISOString(),
      endedAt: conv.endedAt?.toISOString() ?? null,
    };
  }
}
