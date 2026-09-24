import type { SupportAgentEntity } from '../../../domain/entities/support-agent.entity';
import type { AgentIdVO } from '../../../domain/value-objects/primitives/agent-id.vo';
import type { RegisterAgentRequestDTO } from '../../dtos/requests/agent';
import type { AgentResponseDTO } from '../../dtos/responses/agent-response.dto';

export interface AgentServiceInterface {
  register(input: RegisterAgentRequestDTO): Promise<AgentResponseDTO>;
  findById(id: AgentIdVO): Promise<SupportAgentEntity | null>;
  setStatus(id: AgentIdVO, status: string): Promise<void>;
}
