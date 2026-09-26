/**
 * SupportAgentPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { SupportAgentRepository } from '../../../../domain/repositories/support-agent.repository.interface';
import { SupportAgentEntity } from '../../../../domain/entities/support-agent.entity';
import { AgentIdVO } from '../../../../domain/value-objects/primitives/agent-id.vo';
import { AgentStatusVO } from '../../../../domain/value-objects/primitives/agent-status.vo';
import { AgentTypeVO } from '../../../../domain/value-objects/primitives/agent-type.vo';
import { TeamIdVO } from '../../../../domain/value-objects/primitives/team-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { SupportAgentMapper } from '../mappers/support-agent.mapper';

@Injectable()
export class SupportAgentPrismaRepository implements SupportAgentRepository {
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: SupportAgentMapper,
  ) {}

  async findById(id: AgentIdVO): Promise<SupportAgentEntity | null> {
    const raw = await this.prisma.supportAgent.findUnique({ where: { id: id.value } });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SupportAgentEntity[]> {
    const rows = await this.prisma.supportAgent.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: SupportAgentEntity): Promise<SupportAgentEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.supportAgent.upsert({
      where: { id: data.id },
      create: { ...data, currentTicketIds: [...data.currentTicketIds] },
      update: {
        status: data.status,
        teamId: data.teamId,
        maxConcurrentTickets: data.maxConcurrentTickets,
        currentTicketIds: [...data.currentTicketIds],
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: AgentIdVO): Promise<void> {
    await this.prisma.supportAgent.delete({ where: { id: id.value } });
  }

  async exists(id: AgentIdVO): Promise<boolean> {
    const count = await this.prisma.supportAgent.count({ where: { id: id.value } });
    return count > 0;
  }

  async findByUser(userId: UserIdVO): Promise<SupportAgentEntity | null> {
    const raw = await this.prisma.supportAgent.findUnique({
      where: { userId: userId.value },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findByTeam(teamId: TeamIdVO): Promise<readonly SupportAgentEntity[]> {
    const rows = await this.prisma.supportAgent.findMany({
      where: { teamId: teamId.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByStatus(status: AgentStatusVO): Promise<readonly SupportAgentEntity[]> {
    const rows = await this.prisma.supportAgent.findMany({
      where: { status: status.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByType(type: AgentTypeVO): Promise<readonly SupportAgentEntity[]> {
    const rows = await this.prisma.supportAgent.findMany({
      where: { type: type.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findAvailable(): Promise<readonly SupportAgentEntity[]> {
    const rows = await this.prisma.supportAgent.findMany({
      where: { status: 'online' },
      orderBy: { currentTicketIds: 'asc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findLeastLoaded(): Promise<readonly SupportAgentEntity[]> {
    const rows = await this.prisma.supportAgent.findMany({
      where: { status: 'online' },
    });
    return rows
      .map((r) => this.mapper.toDomain(r))
      .sort((a, b) => a.currentLoad - b.currentLoad);
  }

  async findSupervisors(): Promise<readonly SupportAgentEntity[]> {
    const rows = await this.prisma.supportAgent.findMany({
      where: { type: { in: ['lead', 'supervisor', 'manager'] } },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }
}
