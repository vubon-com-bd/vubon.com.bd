import { Injectable } from '@nestjs/common';
import type { TeamServiceInterface } from '../interfaces/team.service.interface';
import type { SupportTeamRepository } from '../../../domain/repositories/support-team.repository.interface';
import { SupportTeamEntity } from '../../../domain/entities/support-team.entity';
import { TeamIdVO } from '../../../domain/value-objects/primitives/team-id.vo';
import { TeamNameVO } from '../../../domain/value-objects/primitives/team-name.vo';
import { TeamTypeVO } from '../../../domain/value-objects/primitives/team-type.vo';
import { AgentIdVO } from '../../../domain/value-objects/primitives/agent-id.vo';
import { NoAgentAvailableError } from '../../errors/agent.errors';
import type { CreateTeamRequestDTO } from '../../dtos/requests/team';
import type { TeamResponseDTO } from '../../dtos/responses/team-response.dto';

@Injectable()
export class TeamService implements TeamServiceInterface {
  constructor(private readonly teamRepo: SupportTeamRepository) {}

  async create(input: CreateTeamRequestDTO): Promise<TeamResponseDTO> {
    const entity = SupportTeamEntity.create({
      name: TeamNameVO.create(input.name),
      type: TeamTypeVO.create(input.type),
      description: input.description ?? null,
      isActive: true,
      members: [],
    });
    const saved = await this.teamRepo.save(entity);
    return this.toDTO(saved);
  }

  async findById(id: TeamIdVO): Promise<SupportTeamEntity | null> {
    return this.teamRepo.findById(id);
  }

  async addMember(teamId: TeamIdVO, agentId: string): Promise<void> {
    const existing = await this.teamRepo.findById(teamId);
    if (!existing) throw new NoAgentAvailableError(teamId.value);
    const updated = existing.addMember(AgentIdVO.create(agentId));
    await this.teamRepo.save(updated);
  }

  private toDTO(entity: SupportTeamEntity): TeamResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name.value,
      type: entity.type.value,
      description: entity.description,
      isActive: entity.isActive,
      memberCount: entity.members.length,
    };
  }
}
