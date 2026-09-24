import { Injectable } from '@nestjs/common';
import { SupportAgent as PrismaSupportAgent } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SupportAgentEntity } from '../../../../domain/entities/support-agent.entity';
import { AgentIdVO } from '../../../../domain/value-objects/primitives/agent-id.vo';
import { AgentStatusVO } from '../../../../domain/value-objects/primitives/agent-status.vo';
import { AgentTypeVO } from '../../../../domain/value-objects/primitives/agent-type.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { TeamIdVO } from '../../../../domain/value-objects/primitives/team-id.vo';
import type { SupportAgentRepository } from '../../../../domain/repositories/support-agent.repository.interface';

@Injectable()
export class SupportAgentPrismaRepository
  extends BasePrismaRepository<SupportAgentEntity, AgentIdVO>
  implements SupportAgentRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSupportAgent): SupportAgentEntity {
    return SupportAgentEntity.reconstitute(
      AgentIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        teamId: raw.teamId ? TeamIdVO.create(raw.teamId) : null,
        status: AgentStatusVO.create(raw.status),
        type: AgentTypeVO.create(raw.type),
        skills: raw.skills,
        currentLoad: raw.currentLoad,
        maxLoad: raw.maxLoad,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: AgentIdVO): Promise<SupportAgentEntity | null> {
    const raw = await this.prisma.supportAgent.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SupportAgentEntity[]> {
    const rows = await this.prisma.supportAgent.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SupportAgentEntity): Promise<SupportAgentEntity> {
    const data = {
      userId: entity.userId.value,
      teamId: entity.teamId?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      skills: [...entity.skills],
      currentLoad: entity.currentLoad,
      maxLoad: entity.maxLoad,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.supportAgent.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: AgentIdVO): Promise<void> {
    await this.prisma.supportAgent.delete({ where: { id: id.value } });
  }

  async findAvailable(): Promise<readonly SupportAgentEntity[]> {
    const rows = await this.prisma.supportAgent.findMany({
      where: { status: 'online' },
    });
    return rows.filter((r) => r.currentLoad < r.maxLoad).map((r) => this.toDomain(r));
  }

  async findByTeam(teamId: TeamIdVO): Promise<readonly SupportAgentEntity[]> {
    const rows = await this.prisma.supportAgent.findMany({ where: { teamId: teamId.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByUser(userId: UserIdVO): Promise<SupportAgentEntity | null> {
    const raw = await this.prisma.supportAgent.findUnique({ where: { userId: userId.value } });
    return raw ? this.toDomain(raw) : null;
  }
}
