/**
 * GetChatHandler
 * @module support-service/application/queries/live-chat
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetChatQuery } from './get-chat.query';
import type { LiveChatResponseDTO } from '../../dtos/responses/live-chat-response.dto';
import type { LiveChatServiceInterface } from '../../services/interfaces/live-chat.service.interface';

export class GetChatHandler extends BaseQueryHandler<
  GetChatQuery,
  LiveChatResponseDTO
> {
  readonly queryType = 'support.livechat.get';

  constructor(private readonly chatService: LiveChatServiceInterface) {
    super();
  }

  async execute(query: GetChatQuery): Promise<LiveChatResponseDTO> {
    return this.chatService.getById(query.sessionId);
  }
}
