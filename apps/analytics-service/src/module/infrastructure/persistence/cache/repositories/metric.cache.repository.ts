/**
 * Metric Cache Repository
 * @module analytics-service/infrastructure/persistence/cache/repositories
 *
 * Redis-backed cache for metric entities (hot analytics queries)।
 */
import { Injectable } from '@nestjs/common';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { MetricEntity } from '../../../../domain/entities/metric.entity.js';
import { MetricIdVO } from '../../../../domain/value-objects/primitives/metric-id.vo.js';
import { MetricNameVO } from '../../../../domain/value-objects/primitives/metric-name.vo.js';
import { MetricUnitVO } from '../../../../domain/value-objects/primitives/metric-unit.vo.js';
import { MetricTypeVO } from '../../../../domain/value-objects/primitives/metric-type.vo.js';
import { MetricValueVO } from '../../../../domain/value-objects/primitives/metric-value.vo.js';

const PREFIX = 'analytics:metric';
const DEFAULT_TTL = CACHE_TTL.FIVE_MINUTES;

interface MetricCachePayload {
  readonly id: string;
  readonly name: string;
  readonly unit: string;
  readonly type: string;
  readonly seriesKey: string;
  readonly currentValue: number;
  readonly sampleCount: number;
  readonly minValue?: number;
  readonly maxValue?: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

@Injectable()
export class MetricCacheRepository {
  constructor(private readonly redis: RedisService) {}

  private keyFor(id: string): string {
    return `${PREFIX}:${id}`;
  }

  private seriesKey(seriesKey: string): string {
    return `${PREFIX}:series:${seriesKey}`;
  }

  async findById(id: string): Promise<MetricEntity | null> {
    const payload = await this.redis.get<MetricCachePayload>(this.keyFor(id));
    return payload ? this.deserialize(payload) : null;
  }

  async findBySeriesKey(seriesKey: string): Promise<MetricEntity | null> {
    const payload = await this.redis.get<MetricCachePayload>(this.seriesKey(seriesKey));
    return payload ? this.deserialize(payload) : null;
  }

  async save(entity: MetricEntity, ttlSeconds: number = DEFAULT_TTL): Promise<void> {
    const payload = this.serialize(entity);
    await this.redis.set(this.keyFor(entity.id), payload, ttlSeconds);
    await this.redis.set(this.seriesKey(entity.seriesKey), payload, ttlSeconds);
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async deleteBySeriesKey(seriesKey: string): Promise<void> {
    await this.redis.del(this.seriesKey(seriesKey));
  }

  async exists(id: string): Promise<boolean> {
    return this.redis.exists(this.keyFor(id));
  }

  async deleteOlderThan(_cutoff: string): Promise<number> {
    // Cache entries auto-expire via TTL — no manual cleanup needed
    return 0;
  }

  // ─── Private ───────────────────────────────────

  private serialize(entity: MetricEntity): MetricCachePayload {
    return {
      id: entity.id,
      name: entity.name.value,
      unit: entity.unit.value,
      type: entity.type.value,
      seriesKey: entity.seriesKey,
      currentValue: entity.currentValue.numeric,
      sampleCount: entity.sampleCount,
      minValue: entity.minValue?.numeric,
      maxValue: entity.maxValue?.numeric,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(payload: MetricCachePayload): MetricEntity {
    return MetricEntity.reconstitute({
      id: payload.id,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
      props: {
        name: MetricNameVO.create(payload.name),
        unit: MetricUnitVO.create(payload.unit),
        type: MetricTypeVO.create(payload.type),
        seriesKey: payload.seriesKey,
        currentValue: MetricValueVO.create(payload.currentValue),
        sampleCount: payload.sampleCount,
        minValue: payload.minValue !== undefined ? MetricValueVO.create(payload.minValue) : undefined,
        maxValue: payload.maxValue !== undefined ? MetricValueVO.create(payload.maxValue) : undefined,
      },
    });
  }
}
