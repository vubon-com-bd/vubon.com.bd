import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { MetricAggregationEntity } from '../../../../domain/entities/metric-aggregation.entity';
import { MetricIdVO } from '../../../../domain/value-objects/primitives/metric-id.vo';
import { MetricAggregationVO } from '../../../../domain/value-objects/composites/metric-aggregation.vo';
import { MetricValueVO } from '../../../../domain/value-objects/primitives/metric-value.vo';
import { MetricUnitVO } from '../../../../domain/value-objects/primitives/metric-unit.vo';

interface SerializedAggregation {
  readonly metricId: string;
  readonly aggregation: string;
  readonly aggregateValue: number;
  readonly unit: string;
  readonly sampleSize: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'analytics:aggregation';
const TTL_SECONDS = 60 * 10;

@Injectable()
export class MetricAggregationCacheRepository extends BaseCacheRepository<
  MetricAggregationEntity,
  MetricIdVO
> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: MetricAggregationEntity): SerializedAggregation {
    const agg = entity.aggregation;
    return {
      metricId: entity.metricId.value,
      aggregation: agg.aggregation,
      aggregateValue: agg.aggregateValue.numeric,
      unit: agg.unit.value,
      sampleSize: agg.sampleSize,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedAggregation): MetricAggregationEntity {
    const vo = MetricAggregationVO.create({
      aggregation: data.aggregation,
      aggregateValue: MetricValueVO.create(data.aggregateValue),
      unit: MetricUnitVO.create(data.unit),
      sampleSize: data.sampleSize,
    });
    return MetricAggregationEntity.reconstitute(
      MetricIdVO.create(data.metricId),
      {
        metricId: MetricIdVO.create(data.metricId),
        aggregation: vo,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: MetricIdVO): Promise<MetricAggregationEntity | null> {
    const raw = await this.redis.get<SerializedAggregation>(
      `${PREFIX}:${id.value}`,
    );
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly MetricAggregationEntity[]> {
    return [];
  }

  async save(entity: MetricAggregationEntity): Promise<MetricAggregationEntity> {
    await this.redis.set(
      `${PREFIX}:${entity.metricId.value}`,
      this.serialize(entity),
      TTL_SECONDS,
    );
    return entity;
  }

  async delete(id: MetricIdVO): Promise<void> {
    await this.redis.del(`${PREFIX}:${id.value}`);
  }

  async cacheResult(
    cacheKey: string,
    result: { value: number; sampleSize: number; unit: string },
  ): Promise<void> {
    await this.redis.set(`${PREFIX}:result:${cacheKey}`, result, TTL_SECONDS);
  }

  async getResult(
    cacheKey: string,
  ): Promise<{ value: number; sampleSize: number; unit: string } | null> {
    return this.redis.get(`${PREFIX}:result:${cacheKey}`);
  }

  async invalidateResult(cacheKey: string): Promise<void> {
    await this.redis.del(`${PREFIX}:result:${cacheKey}`);
  }
}
