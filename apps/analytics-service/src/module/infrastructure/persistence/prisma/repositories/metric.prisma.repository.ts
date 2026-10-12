/**
 * Metric Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { MetricEntity } from '../../../../domain/entities/metric.entity.js';
import { MetricIdVO } from '../../../../domain/value-objects/primitives/metric-id.vo.js';
import { MetricNameVO } from '../../../../domain/value-objects/primitives/metric-name.vo.js';
import { MetricUnitVO } from '../../../../domain/value-objects/primitives/metric-unit.vo.js';
import { MetricTypeVO } from '../../../../domain/value-objects/primitives/metric-type.vo.js';
import { MetricValueVO } from '../../../../domain/value-objects/primitives/metric-value.vo.js';
import { TimeRangeVO } from '../../../../domain/value-objects/composites/time-range.vo.js';
import type { MetricRepository as IMetricRepository } from '../../../../domain/repositories/metric.repository.interface.js';

type PrismaMetricRow = {
  id: string;
  name: string;
  unit: string;
  type: string;
  seriesKey: string;
  currentValue: { toString(): string } | number;
  sampleCount: number;
  minValue: { toString(): string } | number | null;
  maxValue: { toString(): string } | number | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

function toNumber(v: { toString(): string } | number | null): number | undefined {
  if (v === null) return undefined;
  return typeof v === 'number' ? v : Number(v.toString());
}

@Injectable()
export class MetricPrismaRepository
  extends AnalyticsBasePrismaRepository<MetricEntity, PrismaMetricRow, string>
  implements IMetricRepository
{
  protected readonly delegateName = 'analyticsMetric';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaMetricRow): MetricEntity {
    const min = toNumber(raw.minValue);
    const max = toNumber(raw.maxValue);
    return MetricEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        name: MetricNameVO.create(raw.name),
        unit: MetricUnitVO.create(raw.unit),
        type: MetricTypeVO.create(raw.type),
        currentValue: MetricValueVO.create(toNumber(raw.currentValue) ?? 0),
        sampleCount: raw.sampleCount,
        minValue: min !== undefined ? MetricValueVO.create(min) : undefined,
        maxValue: max !== undefined ? MetricValueVO.create(max) : undefined,
        seriesKey: raw.seriesKey,
      },
    });
  }

  protected toPersistence(domain: MetricEntity): Record<string, unknown> {
    return {
      id: domain.id,
      name: domain.name.value,
      unit: domain.unit.value,
      type: domain.type.value,
      seriesKey: domain.seriesKey,
      currentValue: domain.currentValue.numeric,
      sampleCount: domain.sampleCount,
      minValue: domain.minValue?.numeric ?? null,
      maxValue: domain.maxValue?.numeric ?? null,
      version: domain.version,
    };
  }

  protected idOf(domain: MetricEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByMetricId(id: MetricIdVO): Promise<MetricEntity | null> {
    const raw = await this.model.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByName(name: MetricNameVO): Promise<readonly MetricEntity[]> {
    const rows = await this.model.findMany({ where: { name: name.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findBySeriesKey(seriesKey: string): Promise<MetricEntity | null> {
    const raw = await this.model.findUnique({ where: { seriesKey } });
    return raw ? this.toDomain(raw) : null;
  }

  async findActiveInRange(_range: TimeRangeVO): Promise<readonly MetricEntity[]> {
    const rows = await this.model.findMany({
      where: { deletedAt: null },
      orderBy: { updatedAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async bulkUpsert(metrics: readonly MetricEntity[]): Promise<number> {
    let count = 0;
    for (const m of metrics) {
      const data = this.toPersistence(m);
      await this.model.upsert({
        where: { seriesKey: m.seriesKey },
        create: data as never,
        update: data as never,
      });
      count++;
    }
    return count;
  }

  async deleteOlderThan(cutoff: string): Promise<number> {
    const result = await this.model.deleteMany({
      where: { updatedAt: { lt: new Date(cutoff) } },
    });
    return result.count;
  }
}
