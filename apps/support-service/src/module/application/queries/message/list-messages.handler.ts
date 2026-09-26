/**
 * ListMessagesHandler
 * @module support-service/application/queries/message
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListMessagesQuery } from './list-messages.query';
import type { MessageListResponseDTO } from '../../dtos/responses/message-list-response.dto';
import type { MessageServiceInterface } from '../../services/interfaces/message.service.interface';

export class ListMessagesHandler extends BaseQueryHandler<
  ListMessagesQuery,
  MessageListResponseDTO
> {
  readonly queryType = 'support.message.list';

  constructor(private readonly messageService: MessageServiceInterface) {
    super();
  }

  async execute(query: ListMessagesQuery): Promise<MessageListResponseDTO> {
    return this.messageService.listByConversation(
      query.conversationId,
      query.page,
      query.limit,
    );
  }
}
