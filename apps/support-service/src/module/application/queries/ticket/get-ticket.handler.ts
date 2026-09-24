import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTicketQuery } from './get-ticket.query';
import type { TicketRepository } from '../../../domain/repositories/ticket.repository.interface';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';
import { TicketNotFoundError } from '../../errors/ticket.errors';
import type { TicketResponseDTO } from '../../dtos/responses/ticket-response.dto';

@QueryHandler(GetTicketQuery)
export class GetTicketHandler
  extends BaseQueryHandler<GetTicketQuery, TicketResponseDTO>
  implements IQueryHandler<GetTicketQuery>
{
  readonly queryType = 'support.ticket.get';

  constructor(private readonly ticketRepo: TicketRepository) {
    super();
  }

  async execute(query: GetTicketQuery): Promise<TicketResponseDTO> {
    const ticket = await this.ticketRepo.findById(TicketIdVO.create(query.ticketId));
    if (!ticket) throw new TicketNotFoundError(query.ticketId);
    return {
      id: ticket.id.value,
      number: ticket.number.value,
      subject: ticket.subject.value,
      description: ticket.description.value,
      status: ticket.status.value,
      priority: ticket.priority.value,
      type: ticket.type.value,
      channel: ticket.channel.value,
      userId: ticket.userId.value,
      assignedAgentId: ticket.assignedAgentId?.value ?? null,
      tags: ticket.tags,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
      resolvedAt: ticket.resolvedAt?.toISOString() ?? null,
      closedAt: ticket.closedAt?.toISOString() ?? null,
    };
  }
}
