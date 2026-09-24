import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAgentQuery } from './get-agent.query';
import type { SupportAgentRepository } from '../../../domain/repositories/support-agent.repository.interface';
import { AgentIdVO } from '../../../domain/value-objects/primitives/agent-id.vo';
import { AgentNotFoundError } from '../../../domain/errors/agent.errors';
import type { AgentResponseDTO } from '../../dtos/responses/agent-response.dto';

@QueryHandler(GetAgentQuery)
export class GetAgentHandler
  extends BaseQueryHandler<GetAgentQuery, AgentResponseDTO>
  implements IQueryHandler<GetAgentQuery>
{
  readonly queryType = 'support.agent.get';

  constructor(private readonly agentRepo: SupportAgentRepository) {
    super();
  }

  async execute(query: GetAgentQuery): Promise<AgentResponseDTO> {
    const a = await this.agentRepo.findById(AgentIdVO.create(query.agentId));
    if (!a) throw new AgentNotFoundError(query.agentId);
    return {
      id: a.id.value,
      userId: a.userId.value,
      teamId: a.teamId?.value ?? null,
      status: a.status.value,
      type: a.type.value,
      skills: a.skills,
      currentLoad: a.currentLoad,
      maxLoad: a.maxLoad,
    };
  }
}
