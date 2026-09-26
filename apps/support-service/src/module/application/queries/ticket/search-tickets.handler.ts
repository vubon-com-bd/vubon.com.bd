/**
 * SearchTicketsHandler
 * @module support-service/application/queries/ticket
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { SearchTicketsQuery } from './search-tickets.query';
import type { TicketListResponseDTO } from '../../dtos/responses/ticket-list-response.dto';
import type { TicketServiceInterface } from '../../services/interfaces/ticket.service.interface';

export class SearchTicketsHandler extends BaseQueryHandler<
  SearchTicketsQuery,
  TicketListResponseDTO
> {
  readonly queryType = 'support.ticket.search';

  constructor(private readonly ticketService: TicketServiceInterface) {
    super();
  }

  async execute(query: SearchTicketsQuery): Promise<TicketListResponseDTO> {
    return this.ticketService.list(query.page, query.limit, {
      search: query.keyword,
    });
  }
}
