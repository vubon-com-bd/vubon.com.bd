/**
 * ListTicketsHandler
 * @module support-service/application/queries/ticket
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListTicketsQuery } from './list-tickets.query';
import type { TicketListResponseDTO } from '../../dtos/responses/ticket-list-response.dto';
import type { TicketServiceInterface } from '../../services/interfaces/ticket.service.interface';

export class ListTicketsHandler extends BaseQueryHandler<
  ListTicketsQuery,
  TicketListResponseDTO
> {
  readonly queryType = 'support.ticket.list';

  constructor(private readonly ticketService: TicketServiceInterface) {
    super();
  }

  async execute(query: ListTicketsQuery): Promise<TicketListResponseDTO> {
    return this.ticketService.list(query.page, query.limit, query.filter);
  }
}
