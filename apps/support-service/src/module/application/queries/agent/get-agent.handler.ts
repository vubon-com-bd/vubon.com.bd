/**
 * GetAgentHandler
 * @module support-service/application/queries/agent
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAgentQuery } from './get-agent.query';
import type { AgentResponseDTO } from '../../dtos/responses/agent-response.dto';
import type { AgentServiceInterface } from '../../services/interfaces/agent.service.interface';

export class GetAgentHandler extends BaseQueryHandler<
  GetAgentQuery,
  AgentResponseDTO
> {
  readonly queryType = 'support.agent.get';

  constructor(private readonly agentService: AgentServiceInterface) {
    super();
  }

  async execute(query: GetAgentQuery): Promise<AgentResponseDTO> {
    return this.agentService.getById(query.agentId);
  }
}
