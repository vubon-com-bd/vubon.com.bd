import { Injectable } from '@nestjs/common';
import { Metric as PrismaMetric, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { MetricEntity } from '../../../../domain/entities/metric.entity';
import { MetricIdVO } from '../../../../domain/value-objects/primitives/metric-id.vo';
import { MetricNameVO } from '../../../../domain/value-objects/primitives/metric-name.vo';
import { MetricValueVO } from '../../../../domain/value-objects/primitives/metric-value.vo';
import { MetricUnitVO } from '../../../../domain/value-objects/primitives/metric-unit.vo';
import { MetricTypeVO } from '../../../../domain/value-objects/primitives/metric-type.vo';
import type { MetricRepository } from '../../../../domain/repositories/metric.repository.interface';

@Injectable()
export class MetricPrismaRepository
  extends BasePrismaRepository<MetricEntity, MetricIdVO>
  implements MetricRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaMetric): MetricEntity {
    return MetricEntity.reconstitute(
      MetricIdVO.create(raw.id),
      {
        name: MetricNameVO.create(raw.name),
        value: MetricValueVO.create(raw.value),
        unit: MetricUnitVO.create(raw.unit),
        type: MetricTypeVO.create(raw.type),
        window:
          raw.windowStartMs !== null && raw.windowEndMs !== null
            ? {
                startMs: Number(raw.windowStartMs),
                endMs: Number(raw.windowEndMs),
              }
            : null,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: MetricIdVO): Promise<MetricEntity | null> {
    const raw = await this.prisma.metric.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly MetricEntity[]> {
    const rows = await this.prisma.metric.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: MetricEntity): Promise<MetricEntity> {
    const data = {
      name: entity.name.value,
      value: entity.value.numeric,
      unit: entity.unit.value,
      type: entity.type.value,
      windowStartMs: entity.window ? BigInt(entity.window.startMs) : null,
      windowEndMs: entity.window ? BigInt(entity.window.endMs) : null,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.metric.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: MetricIdVO): Promise<void> {
    await this.prisma.metric.delete({ where: { id: id.value } });
  }

  async findByName(name: MetricNameVO): Promise<readonly MetricEntity[]> {
    const rows = await this.prisma.metric.findMany({
      where: { name: name.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findLatestByName(name: MetricNameVO): Promise<MetricEntity | null> {
    const raw = await this.prisma.metric.findFirst({
      where: { name: name.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async aggregateByName(
    name: MetricNameVO,
    startMs: number,
    endMs: number,
  ): Promise<number> {
    const result = await this.prisma.metric.aggregate({
      where: {
        name: name.value,
        createdAt: { gte: new Date(startMs), lte: new Date(endMs) },
        deletedAt: null,
      },
      _sum: { value: true },
    });
    return result._sum.value ?? 0;
  }
}
