/**
 * TicketStatsHandler
 * @module support-service/application/queries/ticket
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { TicketStatsQuery } from './ticket-stats.query';
import type { TicketRepository } from '../../../domain/repositories/ticket.repository.interface';
import { TicketStatusVO } from '../../../domain/value-objects/primitives/ticket-status.vo';
import { TICKET_STATUS } from '@vubon/shared-constants/support';

export interface TicketStatsDTO {
  readonly total: number;
  readonly open: number;
  readonly pending: number;
  readonly inProgress: number;
  readonly resolved: number;
  readonly closed: number;
}

export class TicketStatsHandler extends BaseQueryHandler<
  TicketStatsQuery,
  TicketStatsDTO
> {
  readonly queryType = 'support.ticket.stats';

  constructor(private readonly ticketRepo: TicketRepository) {
    super();
  }

  async execute(_query: TicketStatsQuery): Promise<TicketStatsDTO> {
    const [total, open, pending, inProgress, resolved, closed] = await Promise.all([
      this.ticketRepo.findAll().then((r) => r.length),
      this.ticketRepo.countByStatus(TicketStatusVO.create(TICKET_STATUS.OPEN)),
      this.ticketRepo.countByStatus(TicketStatusVO.create(TICKET_STATUS.PENDING)),
      this.ticketRepo.countByStatus(TicketStatusVO.create(TICKET_STATUS.IN_PROGRESS)),
      this.ticketRepo.countByStatus(TicketStatusVO.create(TICKET_STATUS.RESOLVED)),
      this.ticketRepo.countByStatus(TicketStatusVO.create(TICKET_STATUS.CLOSED)),
    ]);
    return { total, open, pending, inProgress, resolved, closed };
  }
}
