import { Injectable } from '@nestjs/common';
import type { AgentServiceInterface } from '../interfaces/agent.service.interface';
import type { SupportAgentRepository } from '../../../domain/repositories/support-agent.repository.interface';
import { SupportAgentEntity } from '../../../domain/entities/support-agent.entity';
import { AgentIdVO } from '../../../domain/value-objects/primitives/agent-id.vo';
import { AgentStatusVO } from '../../../domain/value-objects/primitives/agent-status.vo';
import { AgentTypeVO } from '../../../domain/value-objects/primitives/agent-type.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { TeamIdVO } from '../../../domain/value-objects/primitives/team-id.vo';
import { AgentNotFoundError } from '../../errors/agent.errors';
import type { RegisterAgentRequestDTO } from '../../dtos/requests/agent';
import type { AgentResponseDTO } from '../../dtos/responses/agent-response.dto';

@Injectable()
export class AgentService implements AgentServiceInterface {
  constructor(private readonly agentRepo: SupportAgentRepository) {}

  async register(input: RegisterAgentRequestDTO): Promise<AgentResponseDTO> {
    const entity = SupportAgentEntity.create({
      userId: UserIdVO.create(input.userId),
      teamId: input.teamId ? TeamIdVO.create(input.teamId) : null,
      status: AgentStatusVO.create('offline'),
      type: AgentTypeVO.create(input.type),
      skills: input.skills ?? [],
      currentLoad: 0,
      maxLoad: input.maxLoad ?? 10,
    });
    const saved = await this.agentRepo.save(entity);
    return this.toDTO(saved);
  }

  async findById(id: AgentIdVO): Promise<SupportAgentEntity | null> {
    return this.agentRepo.findById(id);
  }

  async setStatus(id: AgentIdVO, status: string): Promise<void> {
    const existing = await this.agentRepo.findById(id);
    if (!existing) throw new AgentNotFoundError(id.value);
    const updated = existing.changeStatus(AgentStatusVO.create(status));
    await this.agentRepo.save(updated);
  }

  private toDTO(entity: SupportAgentEntity): AgentResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      teamId: entity.teamId?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      skills: entity.skills,
      currentLoad: entity.currentLoad,
      maxLoad: entity.maxLoad,
    };
  }
}
