import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTicketDetailQuery } from './get-ticket-detail.query';
import type { TicketRepository } from '../../../domain/repositories/ticket.repository.interface';
import type { TicketMessageRepository } from '../../../domain/repositories/ticket-message.repository.interface';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';
import { TicketNotFoundError } from '../../errors/ticket.errors';
import type { TicketDetailResponseDTO } from '../../dtos/responses/ticket-detail-response.dto';

@QueryHandler(GetTicketDetailQuery)
export class GetTicketDetailHandler
  extends BaseQueryHandler<GetTicketDetailQuery, TicketDetailResponseDTO>
  implements IQueryHandler<GetTicketDetailQuery>
{
  readonly queryType = 'support.ticket.detail';

  constructor(
    private readonly ticketRepo: TicketRepository,
    private readonly messageRepo: TicketMessageRepository,
  ) {
    super();
  }

  async execute(query: GetTicketDetailQuery): Promise<TicketDetailResponseDTO> {
    const ticket = await this.ticketRepo.findById(TicketIdVO.create(query.ticketId));
    if (!ticket) throw new TicketNotFoundError(query.ticketId);
    const messages = await this.messageRepo.findByTicket(ticket.id);
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
      messageCount: messages.length,
      attachmentCount: 0,
      escalationCount: 0,
      satisfactionScore: null,
    };
  }
}
