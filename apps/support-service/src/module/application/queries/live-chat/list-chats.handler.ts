/**
 * ListChatsHandler
 * @module support-service/application/queries/live-chat
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListChatsQuery } from './list-chats.query';
import type { LiveChatListResponseDTO } from '../../dtos/responses/live-chat-list-response.dto';
import type { LiveChatServiceInterface } from '../../services/interfaces/live-chat.service.interface';

export class ListChatsHandler extends BaseQueryHandler<
  ListChatsQuery,
  LiveChatListResponseDTO
> {
  readonly queryType = 'support.livechat.list';

  constructor(private readonly chatService: LiveChatServiceInterface) {
    super();
  }

  async execute(query: ListChatsQuery): Promise<LiveChatListResponseDTO> {
    return this.chatService.list(query.page, query.limit);
  }
}
