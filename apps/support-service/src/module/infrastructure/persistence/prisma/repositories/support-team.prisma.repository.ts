/**
 * SupportTeamPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { SupportTeamRepository } from '../../../../domain/repositories/support-team.repository.interface';
import { SupportTeamEntity } from '../../../../domain/entities/support-team.entity';
import { TeamIdVO } from '../../../../domain/value-objects/primitives/team-id.vo';
import { TeamNameVO } from '../../../../domain/value-objects/primitives/team-name.vo';
import { TeamTypeVO } from '../../../../domain/value-objects/primitives/team-type.vo';
import { AgentIdVO } from '../../../../domain/value-objects/primitives/agent-id.vo';
import { SupportTeamMapper } from '../mappers/support-team.mapper';

@Injectable()
export class SupportTeamPrismaRepository implements SupportTeamRepository {
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: SupportTeamMapper,
  ) {}

  async findById(id: TeamIdVO): Promise<SupportTeamEntity | null> {
    const raw = await this.prisma.supportTeam.findUnique({ where: { id: id.value } });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SupportTeamEntity[]> {
    const rows = await this.prisma.supportTeam.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: SupportTeamEntity): Promise<SupportTeamEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.supportTeam.upsert({
      where: { id: data.id },
      create: { ...data, memberIds: [...data.memberIds] },
      update: {
        name: data.name,
        isActive: data.isActive,
        leadAgentId: data.leadAgentId,
        memberIds: [...data.memberIds],
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: TeamIdVO): Promise<void> {
    await this.prisma.supportTeam.delete({ where: { id: id.value } });
  }

  async exists(id: TeamIdVO): Promise<boolean> {
    const count = await this.prisma.supportTeam.count({ where: { id: id.value } });
    return count > 0;
  }

  async findByName(name: TeamNameVO): Promise<SupportTeamEntity | null> {
    const raw = await this.prisma.supportTeam.findFirst({
      where: { name: name.value },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findActive(): Promise<readonly SupportTeamEntity[]> {
    const rows = await this.prisma.supportTeam.findMany({
      where: { isActive: true },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByType(type: TeamTypeVO): Promise<readonly SupportTeamEntity[]> {
    const rows = await this.prisma.supportTeam.findMany({
      where: { type: type.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByMember(agentId: AgentIdVO): Promise<readonly SupportTeamEntity[]> {
    const rows = await this.prisma.supportTeam.findMany({
      where: { memberIds: { has: agentId.value } },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }
}
