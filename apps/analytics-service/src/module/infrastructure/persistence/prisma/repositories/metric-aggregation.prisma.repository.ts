import { Injectable } from '@nestjs/common';
import { MetricAggregation as PrismaMetricAggregation } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { MetricAggregationEntity } from '../../../../domain/entities/metric-aggregation.entity';
import { MetricIdVO } from '../../../../domain/value-objects/primitives/metric-id.vo';
import { MetricAggregationVO } from '../../../../domain/value-objects/composites/metric-aggregation.vo';
import { MetricValueVO } from '../../../../domain/value-objects/primitives/metric-value.vo';
import { MetricUnitVO } from '../../../../domain/value-objects/primitives/metric-unit.vo';
import type { MetricAggregationRepository } from '../../../../domain/repositories/metric-aggregation.repository.interface';

@Injectable()
export class MetricAggregationPrismaRepository
  extends BasePrismaRepository<MetricAggregationEntity, MetricIdVO>
  implements MetricAggregationRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaMetricAggregation): MetricAggregationEntity {
    const vo = MetricAggregationVO.create({
      aggregation: raw.aggregation,
      aggregateValue: MetricValueVO.create(raw.value),
      unit: MetricUnitVO.create(raw.unit),
      sampleSize: raw.sampleSize,
    });
    return MetricAggregationEntity.reconstitute(
      MetricIdVO.create(raw.metricId),
      {
        metricId: MetricIdVO.create(raw.metricId),
        aggregation: vo,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: MetricIdVO): Promise<MetricAggregationEntity | null> {
    const raw = await this.prisma.metricAggregation.findFirst({
      where: { metricId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly MetricAggregationEntity[]> {
    const rows = await this.prisma.metricAggregation.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: MetricAggregationEntity): Promise<MetricAggregationEntity> {
    const agg = entity.aggregation;
    const data = {
      metricId: entity.metricId.value,
      aggregation: agg.aggregation,
      value: agg.aggregateValue.numeric,
      unit: agg.unit.value,
      sampleSize: agg.sampleSize,
      intervalValue: null,
      windowStartMs: BigInt(Date.now() - 60_000),
      windowEndMs: BigInt(Date.now()),
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.metricAggregation.create({ data });
    return this.toDomain(raw);
  }

  async delete(id: MetricIdVO): Promise<void> {
    await this.prisma.metricAggregation.deleteMany({
      where: { metricId: id.value },
    });
  }

  async findByMetricId(metricId: MetricIdVO): Promise<readonly MetricAggregationEntity[]> {
    const rows = await this.prisma.metricAggregation.findMany({
      where: { metricId: metricId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
