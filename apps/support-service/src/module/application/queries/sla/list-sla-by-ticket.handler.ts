/**
 * ListSlaByTicketHandler
 * @module support-service/application/queries/sla
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListSlaByTicketQuery } from './list-sla-by-ticket.query';
import type { SlaResponseDTO } from '../../dtos/responses/sla-response.dto';
import type { SlaServiceInterface } from '../../services/interfaces/sla.service.interface';

export class ListSlaByTicketHandler extends BaseQueryHandler<
  ListSlaByTicketQuery,
  readonly SlaResponseDTO[]
> {
  readonly queryType = 'support.sla.list_by_ticket';

  constructor(private readonly slaService: SlaServiceInterface) {
    super();
  }

  async execute(query: ListSlaByTicketQuery): Promise<readonly SlaResponseDTO[]> {
    return this.slaService.listByTicket(query.ticketId);
  }
}
