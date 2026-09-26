import { Injectable } from '@nestjs/common';
import { Kpi as PrismaKpi } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { KpiEntity } from '../../../../domain/entities/kpi.entity';
import { KpiIdVO } from '../../../../domain/value-objects/primitives/kpi-id.vo';
import { KpiNameVO } from '../../../../domain/value-objects/primitives/kpi-name.vo';
import { KpiTargetVO } from '../../../../domain/value-objects/primitives/kpi-target.vo';
import { KpiThresholdVO } from '../../../../domain/value-objects/primitives/kpi-threshold.vo';
import type { KpiRepository } from '../../../../domain/repositories/kpi.repository.interface';

@Injectable()
export class KpiPrismaRepository
  extends BasePrismaRepository<KpiEntity, KpiIdVO>
  implements KpiRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaKpi): KpiEntity {
    return KpiEntity.reconstitute(
      KpiIdVO.create(raw.id),
      {
        name: KpiNameVO.create(raw.name),
        target: KpiTargetVO.create(raw.target),
        threshold: KpiThresholdVO.create(raw.threshold),
        metricName: raw.metricName,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: KpiIdVO): Promise<KpiEntity | null> {
    const raw = await this.prisma.kpi.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly KpiEntity[]> {
    const rows = await this.prisma.kpi.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: KpiEntity): Promise<KpiEntity> {
    const data = {
      name: entity.name.value,
      metricName: entity.metricName,
      target: entity.target.numeric,
      threshold: entity.threshold.numeric,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.kpi.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ownerId: 'system', ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: KpiIdVO): Promise<void> {
    await this.prisma.kpi.delete({ where: { id: id.value } });
  }

  async findByName(name: KpiNameVO): Promise<KpiEntity | null> {
    const raw = await this.prisma.kpi.findFirst({
      where: { name: name.value, deletedAt: null },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByMetricName(metricName: string): Promise<readonly KpiEntity[]> {
    const rows = await this.prisma.kpi.findMany({
      where: { metricName, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
