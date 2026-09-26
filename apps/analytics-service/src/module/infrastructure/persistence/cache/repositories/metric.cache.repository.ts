import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { MetricEntity } from '../../../../domain/entities/metric.entity';
import { MetricIdVO } from '../../../../domain/value-objects/primitives/metric-id.vo';
import { MetricNameVO } from '../../../../domain/value-objects/primitives/metric-name.vo';
import { MetricValueVO } from '../../../../domain/value-objects/primitives/metric-value.vo';
import { MetricUnitVO } from '../../../../domain/value-objects/primitives/metric-unit.vo';
import { MetricTypeVO } from '../../../../domain/value-objects/primitives/metric-type.vo';

interface SerializedMetric {
  readonly id: string;
  readonly name: string;
  readonly value: number;
  readonly unit: string;
  readonly type: string;
  readonly windowStartMs: number | null;
  readonly windowEndMs: number | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'analytics:metric';
const TTL_SECONDS = 60 * 5; // 5 minutes

@Injectable()
export class MetricCacheRepository extends BaseCacheRepository<MetricEntity, MetricIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: MetricEntity): SerializedMetric {
    return {
      id: entity.id.value,
      name: entity.name.value,
      value: entity.value.numeric,
      unit: entity.unit.value,
      type: entity.type.value,
      windowStartMs: entity.window?.startMs ?? null,
      windowEndMs: entity.window?.endMs ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedMetric): MetricEntity {
    return MetricEntity.reconstitute(
      MetricIdVO.create(data.id),
      {
        name: MetricNameVO.create(data.name),
        value: MetricValueVO.create(data.value),
        unit: MetricUnitVO.create(data.unit),
        type: MetricTypeVO.create(data.type),
        window:
          data.windowStartMs !== null && data.windowEndMs !== null
            ? { startMs: data.windowStartMs, endMs: data.windowEndMs }
            : null,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: MetricIdVO): Promise<MetricEntity | null> {
    const raw = await this.redis.get<SerializedMetric>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly MetricEntity[]> {
    return [];
  }

  async save(entity: MetricEntity): Promise<MetricEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: MetricIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  /**
   * Cache the latest metric by name for fast lookup.
   */
  async cacheLatestByName(name: MetricNameVO, entity: MetricEntity): Promise<void> {
    await this.redis.set(
      `${PREFIX}:latest:${name.value}`,
      this.serialize(entity),
      TTL_SECONDS,
    );
  }

  async getLatestByName(name: MetricNameVO): Promise<MetricEntity | null> {
    const raw = await this.redis.get<SerializedMetric>(
      `${PREFIX}:latest:${name.value}`,
    );
    return raw ? this.deserialize(raw) : null;
  }

  async invalidateName(name: MetricNameVO): Promise<void> {
    await this.redis.del(`${PREFIX}:latest:${name.value}`);
  }
}
