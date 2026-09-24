import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetChatQuery } from './get-chat.query';
import type { LiveChatRepository } from '../../../domain/repositories/live-chat.repository.interface';
import { LiveChatIdVO } from '../../../domain/value-objects/primitives/live-chat-id.vo';
import { ChatNotFoundError } from '../../errors/chat.errors';
import type { LiveChatResponseDTO } from '../../dtos/responses/live-chat-response.dto';

@QueryHandler(GetChatQuery)
export class GetChatHandler
  extends BaseQueryHandler<GetChatQuery, LiveChatResponseDTO>
  implements IQueryHandler<GetChatQuery>
{
  readonly queryType = 'support.chat.get';

  constructor(private readonly liveChatRepo: LiveChatRepository) {
    super();
  }

  async execute(query: GetChatQuery): Promise<LiveChatResponseDTO> {
    const chat = await this.liveChatRepo.findById(LiveChatIdVO.create(query.chatId));
    if (!chat) throw new ChatNotFoundError(query.chatId);
    return {
      id: chat.id.value,
      userId: chat.userId.value,
      agentId: chat.agentId?.value ?? null,
      status: chat.status.value,
      startedAt: chat.startedAt.toISOString(),
      endedAt: chat.endedAt?.toISOString() ?? null,
    };
  }
}
