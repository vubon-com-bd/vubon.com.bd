/**
 * TeamService — use case orchestration
 * @module support-service/application/services/impl
 */
import { Injectable } from '@nestjs/common';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import type { TeamServiceInterface } from '../interfaces/team.service.interface';
import type { SupportTeamRepository } from '../../../domain/repositories/support-team.repository.interface';
import { SupportTeamEntity } from '../../../domain/entities/support-team.entity';
import { TeamIdVO } from '../../../domain/value-objects/primitives/team-id.vo';
import { TeamNameVO } from '../../../domain/value-objects/primitives/team-name.vo';
import { TeamTypeVO } from '../../../domain/value-objects/primitives/team-type.vo';
import { AgentIdVO } from '../../../domain/value-objects/primitives/agent-id.vo';

import { TeamMapper } from '../../mappers/team.mapper';
import { TeamNotFoundException } from '../../errors/team.errors';
import type { CreateTeamRequestDTO } from '../../dtos/requests/team/create-team.dto';
import type { UpdateTeamRequestDTO } from '../../dtos/requests/team/update-team.dto';
import type { AddTeamMemberRequestDTO } from '../../dtos/requests/team/add-team-member.dto';
import type { TeamResponseDTO } from '../../dtos/responses/team-response.dto';
import type { TeamListResponseDTO } from '../../dtos/responses/team-list-response.dto';

@Injectable()
export class TeamService implements TeamServiceInterface {
  constructor(
    private readonly teamRepo: SupportTeamRepository,
    private readonly mapper: TeamMapper,
  ) {}

  async create(input: CreateTeamRequestDTO): Promise<TeamResponseDTO> {
    const now = new Date().toISOString();
    const team = SupportTeamEntity.create({
      id: TeamIdVO.fromName(input.name),
      name: TeamNameVO.create(input.name),
      type: TeamTypeVO.create(input.type),
      leadAgentId: input.leaderId ? AgentIdVO.create(input.leaderId) : undefined,
      now,
    });
    await this.teamRepo.save(team);
    return this.mapper.map(team);
  }

  async update(input: UpdateTeamRequestDTO): Promise<TeamResponseDTO> {
    const team = await this.loadOrThrow(input.teamId);
    if (input.name !== undefined) {
      team.rename(TeamNameVO.create(input.name), new Date().toISOString());
    }
    await this.teamRepo.save(team);
    return this.mapper.map(team);
  }

  async addMember(input: AddTeamMemberRequestDTO): Promise<TeamResponseDTO> {
    const team = await this.loadOrThrow(input.teamId);
    const agentId = AgentIdVO.create(input.userId);
    if (team.isMember(agentId)) {
      throw new BusinessRuleError(
        'Agent already in team',
        'team.member.duplicate',
      );
    }
    team.addMember(agentId, new Date().toISOString());
    await this.teamRepo.save(team);
    return this.mapper.map(team);
  }

  async getById(teamId: string): Promise<TeamResponseDTO> {
    const team = await this.loadOrThrow(teamId);
    return this.mapper.map(team);
  }

  async list(page: number, limit: number): Promise<TeamListResponseDTO> {
    const all = await this.teamRepo.findAll();
    const safeLimit = Math.max(1, Math.min(limit, 100));
    const safePage = Math.max(1, page);
    const total = all.length;
    const start = (safePage - 1) * safeLimit;
    const slice = all.slice(start, start + safeLimit);
    return {
      items: this.mapper.toList(slice),
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit) || 1,
    };
  }

  private async loadOrThrow(teamId: string): Promise<SupportTeamEntity> {
    const team = await this.teamRepo.findById(TeamIdVO.create(teamId));
    if (!team) {
      throw new TeamNotFoundException(teamId);
    }
    return team;
  }
}
