import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { KpiEntity } from '../../../../domain/entities/kpi.entity';
import { KpiIdVO } from '../../../../domain/value-objects/primitives/kpi-id.vo';
import { KpiNameVO } from '../../../../domain/value-objects/primitives/kpi-name.vo';
import { KpiTargetVO } from '../../../../domain/value-objects/primitives/kpi-target.vo';
import { KpiThresholdVO } from '../../../../domain/value-objects/primitives/kpi-threshold.vo';

interface SerializedKpi {
  readonly id: string;
  readonly name: string;
  readonly metricName: string;
  readonly target: number;
  readonly threshold: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'analytics:kpi';
const TTL_SECONDS = 60 * 10; // 10 minutes

@Injectable()
export class KpiCacheRepository extends BaseCacheRepository<KpiEntity, KpiIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: KpiEntity): SerializedKpi {
    return {
      id: entity.id.value,
      name: entity.name.value,
      metricName: entity.metricName,
      target: entity.target.numeric,
      threshold: entity.threshold.numeric,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedKpi): KpiEntity {
    return KpiEntity.reconstitute(
      KpiIdVO.create(data.id),
      {
        name: KpiNameVO.create(data.name),
        target: KpiTargetVO.create(data.target),
        threshold: KpiThresholdVO.create(data.threshold),
        metricName: data.metricName,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: KpiIdVO): Promise<KpiEntity | null> {
    const raw = await this.redis.get<SerializedKpi>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly KpiEntity[]> {
    return [];
  }

  async save(entity: KpiEntity): Promise<KpiEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: KpiIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  /**
   * Cache evaluation state — last status of a KPI.
   */
  async cacheEvaluationStatus(
    kpiId: string,
    status: 'achieved' | 'below' | 'at',
  ): Promise<void> {
    await this.redis.set(`${PREFIX}:status:${kpiId}`, { status }, TTL_SECONDS);
  }

  async getEvaluationStatus(
    kpiId: string,
  ): Promise<'achieved' | 'below' | 'at' | null> {
    const raw = await this.redis.get<{ status: 'achieved' | 'below' | 'at' }>(
      `${PREFIX}:status:${kpiId}`,
    );
    return raw?.status ?? null;
  }
}
