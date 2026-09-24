import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTicketStatsQuery } from './get-ticket-stats.query';
import type { TicketRepository } from '../../../domain/repositories/ticket.repository.interface';

export interface TicketStatsView {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byPriority: Readonly<Record<string, number>>;
}

@QueryHandler(GetTicketStatsQuery)
export class GetTicketStatsHandler
  extends BaseQueryHandler<GetTicketStatsQuery, TicketStatsView>
  implements IQueryHandler<GetTicketStatsQuery>
{
  readonly queryType = 'support.analytics.ticket-stats';

  constructor(private readonly ticketRepo: TicketRepository) {
    super();
  }

  async execute(_query: GetTicketStatsQuery): Promise<TicketStatsView> {
    const tickets = await this.ticketRepo.findAll();
    const byStatus: Record<string, number> = {};
    const byPriority: Record<string, number> = {};
    for (const t of tickets) {
      byStatus[t.status.value] = (byStatus[t.status.value] ?? 0) + 1;
      byPriority[t.priority.value] = (byPriority[t.priority.value] ?? 0) + 1;
    }
    return {
      total: tickets.length,
      byStatus,
      byPriority,
    };
  }
}
