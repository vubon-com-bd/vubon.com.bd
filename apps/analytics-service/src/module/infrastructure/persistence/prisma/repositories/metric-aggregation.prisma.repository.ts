/**
 * Metric Aggregation Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { MetricAggregationEntity } from '../../../../domain/entities/metric-aggregation.entity.js';
import { MetricAggregationVO } from '../../../../domain/value-objects/composites/metric-aggregation.vo.js';
import { MetricNameVO } from '../../../../domain/value-objects/primitives/metric-name.vo.js';
import { TimeRangeVO } from '../../../../domain/value-objects/composites/time-range.vo.js';
import { EventTimestampVO } from '../../../../domain/value-objects/primitives/event-timestamp.vo.js';
import { DimensionValueCompositeVO } from '../../../../domain/value-objects/composites/dimension-value.vo.js';
import { DimensionNameVO } from '../../../../domain/value-objects/primitives/dimension-name.vo.js';
import { DimensionValueVO } from '../../../../domain/value-objects/primitives/dimension-value.vo.js';
import type {
  MetricAggregationRepository as IMetricAggregationRepository,
  AggregationQuery,
} from '../../../../domain/repositories/metric-aggregation.repository.interface.js';

type PrismaAggRow = {
  id: string;
  aggregationKey: string;
  metricName: string;
  aggregation: string;
  value: { toString(): string } | number;
  sampleCount: number | null;
  granularity: string | null;
  rangeStart: Date;
  rangeEnd: Date;
  dimensions: unknown;
  createdAt: Date;
  updatedAt: Date;
};

function toNumber(v: { toString(): string } | number): number {
  return typeof v === 'number' ? v : Number(v.toString());
}

@Injectable()
export class MetricAggregationPrismaRepository
  extends AnalyticsBasePrismaRepository<MetricAggregationEntity, PrismaAggRow, string>
  implements IMetricAggregationRepository
{
  protected readonly delegateName = 'analyticsMetricAggregation';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaAggRow): MetricAggregationEntity {
    const dims = Array.isArray(raw.dimensions) ? raw.dimensions : [];
    const dimensionVOs = dims.map((d) => {
      const obj = d as { dimension: string; value: string };
      return DimensionValueCompositeVO.create({
        dimension: DimensionNameVO.create(obj.dimension),
        value: DimensionValueVO.create(obj.value),
      });
    });

    return MetricAggregationEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        aggregation: MetricAggregationVO.create({
          metric: MetricNameVO.create(raw.metricName),
          aggregation: raw.aggregation as never,
          value: toNumber(raw.value),
          range: TimeRangeVO.create({
            startAt: EventTimestampVO.fromDate(raw.rangeStart),
            endAt: EventTimestampVO.fromDate(raw.rangeEnd),
          }),
          sampleCount: raw.sampleCount ?? undefined,
        }),
        dimensions: dimensionVOs,
      },
    });
  }

  protected toPersistence(domain: MetricAggregationEntity): Record<string, unknown> {
    const agg = domain.aggregation;
    return {
      id: domain.id,
      aggregationKey: domain.aggregationKey(),
      metricName: agg.metric.value,
      aggregation: agg.aggregation,
      value: agg.aggregationValue,
      sampleCount: agg.sampleCount ?? null,
      granularity: agg.granularity?.value_ ?? null,
      rangeStart: new Date(agg.range.startAt.value.epochMs),
      rangeEnd: new Date(agg.range.endAt.value.epochMs),
      dimensions: domain.dimensions.map((d) => ({
        dimension: d.dimension.value,
        value: d.value.value,
      })),
    };
  }

  protected idOf(domain: MetricAggregationEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByAggregationKey(key: string): Promise<MetricAggregationEntity | null> {
    const raw = await this.model.findUnique({
      where: { aggregationKey: key },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByQuery(query: AggregationQuery): Promise<readonly MetricAggregationEntity[]> {
    const rows = await this.model.findMany({
      where: {
        metricName: query.metric.value,
        rangeStart: { gte: new Date(query.range.startAt.value.epochMs) },
        rangeEnd: { lte: new Date(query.range.endAt.value.epochMs) },
      },
      orderBy: { rangeStart: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countByQuery(query: AggregationQuery): Promise<number> {
    return this.model.count({
      where: {
        metricName: query.metric.value,
        rangeStart: { gte: new Date(query.range.startAt.value.epochMs) },
        rangeEnd: { lte: new Date(query.range.endAt.value.epochMs) },
      },
    });
  }

  async bulkUpsert(aggregations: readonly MetricAggregationEntity[]): Promise<number> {
    let count = 0;
    for (const a of aggregations) {
      const data = this.toPersistence(a);
      await this.model.upsert({
        where: { aggregationKey: a.aggregationKey() },
        create: data as never,
        update: data as never,
      });
      count++;
    }
    return count;
  }

  async deleteOlderThan(cutoff: string): Promise<number> {
    const result = await this.model.deleteMany({
      where: { rangeEnd: { lt: new Date(cutoff) } },
    });
    return result.count;
  }
}
