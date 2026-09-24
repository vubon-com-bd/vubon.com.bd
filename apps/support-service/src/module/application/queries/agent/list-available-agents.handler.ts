import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAvailableAgentsQuery } from './list-available-agents.query';
import type { SupportAgentRepository } from '../../../domain/repositories/support-agent.repository.interface';
import type { AgentResponseDTO } from '../../dtos/responses/agent-response.dto';

@QueryHandler(ListAvailableAgentsQuery)
export class ListAvailableAgentsHandler
  extends BaseQueryHandler<ListAvailableAgentsQuery, readonly AgentResponseDTO[]>
  implements IQueryHandler<ListAvailableAgentsQuery>
{
  readonly queryType = 'support.agent.list-available';

  constructor(private readonly agentRepo: SupportAgentRepository) {
    super();
  }

  async execute(_query: ListAvailableAgentsQuery): Promise<readonly AgentResponseDTO[]> {
    const agents = await this.agentRepo.findAvailable();
    return agents.map((a) => ({
      id: a.id.value,
      userId: a.userId.value,
      teamId: a.teamId?.value ?? null,
      status: a.status.value,
      type: a.type.value,
      skills: a.skills,
      currentLoad: a.currentLoad,
      maxLoad: a.maxLoad,
    }));
  }
}
