import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAgentPerformanceQuery } from './get-agent-performance.query';
import type { TicketRepository } from '../../../domain/repositories/ticket.repository.interface';
import { AgentIdVO } from '../../../domain/value-objects/primitives/agent-id.vo';

export interface AgentPerformanceView {
  readonly agentId: string;
  readonly totalAssigned: number;
  readonly resolved: number;
  readonly averageResolutionMinutes: number;
}

@QueryHandler(GetAgentPerformanceQuery)
export class GetAgentPerformanceHandler
  extends BaseQueryHandler<GetAgentPerformanceQuery, AgentPerformanceView>
  implements IQueryHandler<GetAgentPerformanceQuery>
{
  readonly queryType = 'support.analytics.agent-performance';

  constructor(private readonly ticketRepo: TicketRepository) {
    super();
  }

  async execute(query: GetAgentPerformanceQuery): Promise<AgentPerformanceView> {
    const tickets = await this.ticketRepo.findAssignedTo(
      AgentIdVO.create(query.agentId),
    );
    const resolved = tickets.filter((t) =>
      ['resolved', 'closed'].includes(t.status.value),
    ).length;
    return {
      agentId: query.agentId,
      totalAssigned: tickets.length,
      resolved,
      averageResolutionMinutes: 0,
    };
  }
}
