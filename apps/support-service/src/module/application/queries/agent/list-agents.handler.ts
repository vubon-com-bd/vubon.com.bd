/**
 * ListAgentsHandler
 * @module support-service/application/queries/agent
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAgentsQuery } from './list-agents.query';
import type { AgentListResponseDTO } from '../../dtos/responses/agent-list-response.dto';
import type { AgentServiceInterface } from '../../services/interfaces/agent.service.interface';

export class ListAgentsHandler extends BaseQueryHandler<
  ListAgentsQuery,
  AgentListResponseDTO
> {
  readonly queryType = 'support.agent.list';

  constructor(private readonly agentService: AgentServiceInterface) {
    super();
  }

  async execute(query: ListAgentsQuery): Promise<AgentListResponseDTO> {
    return this.agentService.list(query.page, query.limit);
  }
}
