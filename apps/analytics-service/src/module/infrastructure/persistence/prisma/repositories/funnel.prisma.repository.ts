import { Injectable } from '@nestjs/common';
import { Funnel as PrismaFunnel, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { FunnelEntity } from '../../../../domain/entities/funnel.entity';
import { FunnelIdVO } from '../../../../domain/value-objects/primitives/funnel-id.vo';
import { FunnelStepVO } from '../../../../domain/value-objects/primitives/funnel-step.vo';
import type { FunnelRepository } from '../../../../domain/repositories/funnel.repository.interface';

@Injectable()
export class FunnelPrismaRepository
  extends BasePrismaRepository<FunnelEntity, FunnelIdVO>
  implements FunnelRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaFunnel): FunnelEntity {
    const steps = (raw.steps as readonly string[]) ?? [];
    return FunnelEntity.reconstitute(
      FunnelIdVO.create(raw.id),
      {
        name: raw.name,
        steps: steps.map((s) => FunnelStepVO.create(s)),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: FunnelIdVO): Promise<FunnelEntity | null> {
    const raw = await this.prisma.funnel.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly FunnelEntity[]> {
    const rows = await this.prisma.funnel.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: FunnelEntity): Promise<FunnelEntity> {
    const data = {
      name: entity.name,
      steps: entity.steps.map((s) => s.value) as Prisma.InputJsonValue,
      ownerId: 'system',
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.funnel.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: FunnelIdVO): Promise<void> {
    await this.prisma.funnel.delete({ where: { id: id.value } });
  }

  async findByName(name: string): Promise<FunnelEntity | null> {
    const raw = await this.prisma.funnel.findFirst({
      where: { name, deletedAt: null },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
