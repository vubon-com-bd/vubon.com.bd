/**
 * AgentService — use case orchestration
 * @module support-service/application/services/impl
 */
import { Injectable } from '@nestjs/common';

import type { AgentServiceInterface } from '../interfaces/agent.service.interface';
import type { SupportAgentRepository } from '../../../domain/repositories/support-agent.repository.interface';
import { SupportAgentEntity } from '../../../domain/entities/support-agent.entity';
import { AgentIdVO } from '../../../domain/value-objects/primitives/agent-id.vo';
import { AgentStatusVO } from '../../../domain/value-objects/primitives/agent-status.vo';
import { AgentTypeVO } from '../../../domain/value-objects/primitives/agent-type.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { TeamIdVO } from '../../../domain/value-objects/primitives/team-id.vo';

import { AgentMapper } from '../../mappers/agent.mapper';
import { AgentNotFoundException } from '../../errors/agent.errors';
import type { RegisterAgentRequestDTO } from '../../dtos/requests/agent/register-agent.dto';
import type { UpdateAgentRequestDTO } from '../../dtos/requests/agent/update-agent.dto';
import type { SetAgentStatusRequestDTO } from '../../dtos/requests/agent/set-agent-status.dto';
import type { AgentResponseDTO } from '../../dtos/responses/agent-response.dto';
import type { AgentListResponseDTO } from '../../dtos/responses/agent-list-response.dto';

@Injectable()
export class AgentService implements AgentServiceInterface {
  constructor(
    private readonly agentRepo: SupportAgentRepository,
    private readonly mapper: AgentMapper,
  ) {}

  async register(input: RegisterAgentRequestDTO): Promise<AgentResponseDTO> {
    const now = new Date().toISOString();
    const agent = SupportAgentEntity.create({
      id: AgentIdVO.fromUserId(input.userId),
      userId: UserIdVO.create(input.userId),
      type: AgentTypeVO.create('agent'),
      teamId: input.teamIds?.[0] ? TeamIdVO.create(input.teamIds[0]) : undefined,
      maxConcurrentTickets: input.maxConcurrentTickets ?? 5,
      now,
    });
    await this.agentRepo.save(agent);
    return this.mapper.map(agent);
  }

  async update(input: UpdateAgentRequestDTO): Promise<AgentResponseDTO> {
    const agent = await this.loadOrThrow(input.agentId);
    // Name/skills/languages updates pass through metadata layer in fuller impl
    void input.name;
    void input.skills;
    void input.languages;
    if (input.maxConcurrentTickets !== undefined) {
      (agent as unknown as { _maxConcurrentTickets: number })._maxConcurrentTickets =
        input.maxConcurrentTickets;
    }
    await this.agentRepo.save(agent);
    return this.mapper.map(agent);
  }

  async setStatus(input: SetAgentStatusRequestDTO): Promise<AgentResponseDTO> {
    const agent = await this.loadOrThrow(input.agentId);
    agent.changeStatus(
      AgentStatusVO.create(input.status),
      new Date().toISOString(),
    );
    await this.agentRepo.save(agent);
    return this.mapper.map(agent);
  }

  async getById(agentId: string): Promise<AgentResponseDTO> {
    const agent = await this.loadOrThrow(agentId);
    return this.mapper.map(agent);
  }

  async list(page: number, limit: number): Promise<AgentListResponseDTO> {
    const all = await this.agentRepo.findAll();
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

  private async loadOrThrow(agentId: string): Promise<SupportAgentEntity> {
    const agent = await this.agentRepo.findById(AgentIdVO.create(agentId));
    if (!agent) {
      throw new AgentNotFoundException(agentId);
    }
    return agent;
  }
}
