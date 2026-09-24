import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListActiveChatsQuery } from './list-active-chats.query';
import type { LiveChatRepository } from '../../../domain/repositories/live-chat.repository.interface';

@QueryHandler(ListActiveChatsQuery)
export class ListActiveChatsHandler
  extends BaseQueryHandler<ListActiveChatsQuery, readonly unknown[]>
  implements IQueryHandler<ListActiveChatsQuery>
{
  readonly queryType = 'support.chat.list-active';

  constructor(private readonly liveChatRepo: LiveChatRepository) {
    super();
  }

  async execute(_query: ListActiveChatsQuery): Promise<readonly unknown[]> {
    void this.liveChatRepo;
    return [];
  }
}
