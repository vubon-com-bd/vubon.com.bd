import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListTicketsByStatusQuery } from './list-tickets-by-status.query';
import type { TicketRepository } from '../../../domain/repositories/ticket.repository.interface';
import { TicketStatusVO } from '../../../domain/value-objects/primitives/ticket-status.vo';
import type { TicketPublicResponseDTO } from '../../dtos/responses/ticket-public-response.dto';

@QueryHandler(ListTicketsByStatusQuery)
export class ListTicketsByStatusHandler
  extends BaseQueryHandler<ListTicketsByStatusQuery, readonly TicketPublicResponseDTO[]>
  implements IQueryHandler<ListTicketsByStatusQuery>
{
  readonly queryType = 'support.ticket.list-by-status';

  constructor(private readonly ticketRepo: TicketRepository) {
    super();
  }

  async execute(query: ListTicketsByStatusQuery): Promise<readonly TicketPublicResponseDTO[]> {
    const tickets = await this.ticketRepo.findByStatus(TicketStatusVO.create(query.status));
    return tickets.map((t) => ({
      id: t.id.value,
      number: t.number.value,
      subject: t.subject.value,
      status: t.status.value,
      priority: t.priority.value,
      createdAt: t.createdAt,
    }));
  }
}
