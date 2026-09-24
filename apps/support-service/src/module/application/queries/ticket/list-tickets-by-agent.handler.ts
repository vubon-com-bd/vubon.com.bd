import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListTicketsByAgentQuery } from './list-tickets-by-agent.query';
import type { TicketRepository } from '../../../domain/repositories/ticket.repository.interface';
import { AgentIdVO } from '../../../domain/value-objects/primitives/agent-id.vo';
import type { TicketPublicResponseDTO } from '../../dtos/responses/ticket-public-response.dto';

@QueryHandler(ListTicketsByAgentQuery)
export class ListTicketsByAgentHandler
  extends BaseQueryHandler<ListTicketsByAgentQuery, readonly TicketPublicResponseDTO[]>
  implements IQueryHandler<ListTicketsByAgentQuery>
{
  readonly queryType = 'support.ticket.list-by-agent';

  constructor(private readonly ticketRepo: TicketRepository) {
    super();
  }

  async execute(query: ListTicketsByAgentQuery): Promise<readonly TicketPublicResponseDTO[]> {
    const tickets = await this.ticketRepo.findAssignedTo(AgentIdVO.create(query.agentId));
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
