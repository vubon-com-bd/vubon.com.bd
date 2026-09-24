import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListTicketsQuery } from './list-tickets.query';
import type { TicketRepository } from '../../../domain/repositories/ticket.repository.interface';
import type { TicketListResponseDTO } from '../../dtos/responses/ticket-list-response.dto';

@QueryHandler(ListTicketsQuery)
export class ListTicketsHandler
  extends BaseQueryHandler<ListTicketsQuery, TicketListResponseDTO>
  implements IQueryHandler<ListTicketsQuery>
{
  readonly queryType = 'support.ticket.list';

  constructor(private readonly ticketRepo: TicketRepository) {
    super();
  }

  async execute(query: ListTicketsQuery): Promise<TicketListResponseDTO> {
    const all = await this.ticketRepo.findAll();
    return {
      items: all.map((t) => ({
        id: t.id.value,
        number: t.number.value,
        subject: t.subject.value,
        status: t.status.value,
        priority: t.priority.value,
        createdAt: t.createdAt,
      })),
      total: all.length,
      page: query.page,
      limit: query.limit,
    };
  }
}
