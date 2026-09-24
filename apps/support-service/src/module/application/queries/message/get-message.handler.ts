import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetMessageQuery } from './get-message.query';
import type { TicketMessageRepository } from '../../../domain/repositories/ticket-message.repository.interface';
import { MessageIdVO } from '../../../domain/value-objects/primitives/message-id.vo';
import { MessageNotFoundError } from '../../errors/message.errors';
import type { MessageResponseDTO } from '../../dtos/responses/message-response.dto';

@QueryHandler(GetMessageQuery)
export class GetMessageHandler
  extends BaseQueryHandler<GetMessageQuery, MessageResponseDTO>
  implements IQueryHandler<GetMessageQuery>
{
  readonly queryType = 'support.message.get';

  constructor(private readonly messageRepo: TicketMessageRepository) {
    super();
  }

  async execute(query: GetMessageQuery): Promise<MessageResponseDTO> {
    const msg = await this.messageRepo.findById(MessageIdVO.create(query.messageId));
    if (!msg) throw new MessageNotFoundError(query.messageId);
    return {
      id: msg.id.value,
      conversationId: msg.ticketId.value,
      senderId: msg.senderId.value,
      content: msg.content.value,
      type: msg.type.value,
      status: msg.status.value,
      createdAt: msg.createdAt,
    };
  }
}
