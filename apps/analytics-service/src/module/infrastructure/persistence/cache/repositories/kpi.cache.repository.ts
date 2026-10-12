/**
 * KPI Cache Repository
 * @module analytics-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { KpiEntity } from '../../../../domain/entities/kpi.entity.js';
import { KpiIdVO } from '../../../../domain/value-objects/primitives/kpi-id.vo.js';
import { KpiNameVO } from '../../../../domain/value-objects/primitives/kpi-name.vo.js';
import { KpiTargetVO } from '../../../../domain/value-objects/primitives/kpi-target.vo.js';
import { KpiThresholdVO } from '../../../../domain/value-objects/primitives/kpi-threshold.vo.js';
import { MetricNameVO } from '../../../../domain/value-objects/primitives/metric-name.vo.js';

const PREFIX = 'analytics:kpi';
const DEFAULT_TTL = CACHE_TTL.FIFTEEN_MINUTES;

interface KpiCachePayload {
  readonly id: string;
  readonly name: string;
  readonly metric: string;
  readonly target: number;
  readonly thresholdPercent: number;
  readonly higherIsBetter: boolean;
  readonly isActive: boolean;
  readonly lastActualValue?: number;
  readonly lastEvaluatedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

@Injectable()
export class KpiCacheRepository {
  constructor(private readonly redis: RedisService) {}

  private keyFor(id: string): string {
    return `${PREFIX}:${id}`;
  }

  private activeKey(): string {
    return `${PREFIX}:active:list`;
  }

  async findById(id: string): Promise<KpiEntity | null> {
    const payload = await this.redis.get<KpiCachePayload>(this.keyFor(id));
    return payload ? this.deserialize(payload) : null;
  }

  async save(entity: KpiEntity, ttlSeconds: number = DEFAULT_TTL): Promise<void> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), ttlSeconds);
  }

  async saveActiveList(entities: readonly KpiEntity[], ttlSeconds: number = DEFAULT_TTL): Promise<void> {
    const payload = entities.map((e) => this.serialize(e));
    await this.redis.set(this.activeKey(), payload, ttlSeconds);
  }

  async getActiveList(): Promise<readonly KpiEntity[] | null> {
    const payload = await this.redis.get<readonly KpiCachePayload[]>(this.activeKey());
    return payload ? payload.map((p) => this.deserialize(p)) : null;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(this.keyFor(id));
    await this.redis.del(this.activeKey());
  }

  async invalidateActive(): Promise<void> {
    await this.redis.del(this.activeKey());
  }

  async exists(id: string): Promise<boolean> {
    return this.redis.exists(this.keyFor(id));
  }

  private serialize(entity: KpiEntity): KpiCachePayload {
    return {
      id: entity.id,
      name: entity.name.value,
      metric: entity.metric.value,
      target: entity.target.numeric,
      thresholdPercent: entity.threshold.percent,
      higherIsBetter: entity.higherIsBetter,
      isActive: entity.isActive,
      lastActualValue: entity.lastActualValue,
      lastEvaluatedAt: entity.lastEvaluatedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(payload: KpiCachePayload): KpiEntity {
    return KpiEntity.reconstitute({
      id: payload.id,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
      props: {
        name: KpiNameVO.create(payload.name),
        metric: MetricNameVO.create(payload.metric),
        target: KpiTargetVO.create(payload.target),
        threshold: KpiThresholdVO.create(payload.thresholdPercent),
        higherIsBetter: payload.higherIsBetter,
        isActive: payload.isActive,
        lastActualValue: payload.lastActualValue,
        lastEvaluatedAt: payload.lastEvaluatedAt,
      },
    });
  }
}
