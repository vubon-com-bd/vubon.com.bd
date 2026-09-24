import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAgentsQuery } from './list-agents.query';
import type { SupportAgentRepository } from '../../../domain/repositories/support-agent.repository.interface';
import type { AgentResponseDTO } from '../../dtos/responses/agent-response.dto';

@QueryHandler(ListAgentsQuery)
export class ListAgentsHandler
  extends BaseQueryHandler<ListAgentsQuery, readonly AgentResponseDTO[]>
  implements IQueryHandler<ListAgentsQuery>
{
  readonly queryType = 'support.agent.list';

  constructor(private readonly agentRepo: SupportAgentRepository) {
    super();
  }

  async execute(_query: ListAgentsQuery): Promise<readonly AgentResponseDTO[]> {
    const agents = await this.agentRepo.findAll();
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
