/**
 * AgentServiceInterface
 * @module support-service/application/services/interfaces
 */
import type { RegisterAgentRequestDTO } from '../../dtos/requests/agent/register-agent.dto';
import type { UpdateAgentRequestDTO } from '../../dtos/requests/agent/update-agent.dto';
import type { SetAgentStatusRequestDTO } from '../../dtos/requests/agent/set-agent-status.dto';
import type { AgentResponseDTO } from '../../dtos/responses/agent-response.dto';
import type { AgentListResponseDTO } from '../../dtos/responses/agent-list-response.dto';

export interface AgentServiceInterface {
  register(input: RegisterAgentRequestDTO): Promise<AgentResponseDTO>;
  update(input: UpdateAgentRequestDTO): Promise<AgentResponseDTO>;
  setStatus(input: SetAgentStatusRequestDTO): Promise<AgentResponseDTO>;
  getById(agentId: string): Promise<AgentResponseDTO>;
  list(page: number, limit: number): Promise<AgentListResponseDTO>;
}
