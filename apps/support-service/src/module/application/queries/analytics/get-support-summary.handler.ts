import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetSupportSummaryQuery } from './get-support-summary.query';
import type { TicketRepository } from '../../../domain/repositories/ticket.repository.interface';

export interface SupportSummaryView {
  readonly totalTickets: number;
  readonly openTickets: number;
  readonly resolvedTickets: number;
  readonly averageResponseMinutes: number;
  readonly averageResolutionMinutes: number;
  readonly satisfactionScore: number;
  readonly slaCompliancePercent: number;
}

@QueryHandler(GetSupportSummaryQuery)
export class GetSupportSummaryHandler
  extends BaseQueryHandler<GetSupportSummaryQuery, SupportSummaryView>
  implements IQueryHandler<GetSupportSummaryQuery>
{
  readonly queryType = 'support.analytics.summary';

  constructor(private readonly ticketRepo: TicketRepository) {
    super();
  }

  async execute(_query: GetSupportSummaryQuery): Promise<SupportSummaryView> {
    const tickets = await this.ticketRepo.findAll();
    const open = tickets.filter((t) => t.isOpen).length;
    const resolved = tickets.filter((t) =>
      ['resolved', 'closed'].includes(t.status.value),
    ).length;
    return {
      totalTickets: tickets.length,
      openTickets: open,
      resolvedTickets: resolved,
      averageResponseMinutes: 0,
      averageResolutionMinutes: 0,
      satisfactionScore: 0,
      slaCompliancePercent: 0,
    };
  }
}
