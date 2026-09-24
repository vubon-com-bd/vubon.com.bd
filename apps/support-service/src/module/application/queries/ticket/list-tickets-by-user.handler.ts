import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListTicketsByUserQuery } from './list-tickets-by-user.query';
import type { TicketRepository } from '../../../domain/repositories/ticket.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { TicketPublicResponseDTO } from '../../dtos/responses/ticket-public-response.dto';

@QueryHandler(ListTicketsByUserQuery)
export class ListTicketsByUserHandler
  extends BaseQueryHandler<ListTicketsByUserQuery, readonly TicketPublicResponseDTO[]>
  implements IQueryHandler<ListTicketsByUserQuery>
{
  readonly queryType = 'support.ticket.list-by-user';

  constructor(private readonly ticketRepo: TicketRepository) {
    super();
  }

  async execute(query: ListTicketsByUserQuery): Promise<readonly TicketPublicResponseDTO[]> {
    const tickets = await this.ticketRepo.findByUser(UserIdVO.create(query.userId));
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
