import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListMessagesByTicketQuery } from './list-messages-by-ticket.query';
import type { TicketMessageRepository } from '../../../domain/repositories/ticket-message.repository.interface';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';
import type { MessageResponseDTO } from '../../dtos/responses/message-response.dto';

@QueryHandler(ListMessagesByTicketQuery)
export class ListMessagesByTicketHandler
  extends BaseQueryHandler<ListMessagesByTicketQuery, readonly MessageResponseDTO[]>
  implements IQueryHandler<ListMessagesByTicketQuery>
{
  readonly queryType = 'support.message.list-by-ticket';

  constructor(private readonly messageRepo: TicketMessageRepository) {
    super();
  }

  async execute(query: ListMessagesByTicketQuery): Promise<readonly MessageResponseDTO[]> {
    const messages = await this.messageRepo.findByTicket(TicketIdVO.create(query.ticketId));
    return messages.map((msg) => ({
      id: msg.id.value,
      conversationId: msg.ticketId.value,
      senderId: msg.senderId.value,
      content: msg.content.value,
      type: msg.type.value,
      status: msg.status.value,
      createdAt: msg.createdAt,
    }));
  }
}
