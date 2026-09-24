import { Injectable } from '@nestjs/common';
import { SupportTeam as PrismaSupportTeam } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SupportTeamEntity } from '../../../../domain/entities/support-team.entity';
import { TeamIdVO } from '../../../../domain/value-objects/primitives/team-id.vo';
import { TeamNameVO } from '../../../../domain/value-objects/primitives/team-name.vo';
import { TeamTypeVO } from '../../../../domain/value-objects/primitives/team-type.vo';
import type { SupportTeamRepository } from '../../../../domain/repositories/support-team.repository.interface';

@Injectable()
export class SupportTeamPrismaRepository
  extends BasePrismaRepository<SupportTeamEntity, TeamIdVO>
  implements SupportTeamRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSupportTeam): SupportTeamEntity {
    return SupportTeamEntity.reconstitute(
      TeamIdVO.create(raw.id),
      {
        name: TeamNameVO.create(raw.name),
        type: TeamTypeVO.create(raw.type),
        description: raw.description,
        isActive: raw.isActive,
        members: [],
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: TeamIdVO): Promise<SupportTeamEntity | null> {
    const raw = await this.prisma.supportTeam.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SupportTeamEntity[]> {
    const rows = await this.prisma.supportTeam.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SupportTeamEntity): Promise<SupportTeamEntity> {
    const data = {
      name: entity.name.value,
      type: entity.type.value,
      description: entity.description,
      isActive: entity.isActive,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.supportTeam.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: TeamIdVO): Promise<void> {
    await this.prisma.supportTeam.delete({ where: { id: id.value } });
  }

  async findActive(): Promise<readonly SupportTeamEntity[]> {
    const rows = await this.prisma.supportTeam.findMany({ where: { isActive: true } });
    return rows.map((r) => this.toDomain(r));
  }
}
