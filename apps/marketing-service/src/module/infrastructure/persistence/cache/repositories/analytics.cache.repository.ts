import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { MarketingAnalyticsEntity } from '../../../../domain/entities/marketing-analytics.entity';
import { AnalyticsMetricVO } from '../../../../domain/value-objects/primitives/analytics-metric.vo';
import { AnalyticsGranularityVO } from '../../../../domain/value-objects/primitives/analytics-granularity.vo';

const PREFIX = 'marketing:analytics';
const TTL_SECONDS = 60 * 5;

interface SerializedAnalytics {
  readonly id: string;
  readonly metric: string;
  readonly value: number;
  readonly granularity: string;
  readonly recordedAt: string;
  readonly createdAt: string;
}

@Injectable()
export class AnalyticsCacheRepository extends BaseCacheRepository<MarketingAnalyticsEntity, string> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: MarketingAnalyticsEntity): SerializedAnalytics {
    return {
      id: entity.id,
      metric: entity.metric.value,
      value: entity.value,
      granularity: entity.granularity.value,
      recordedAt: entity.recordedAt.toISOString(),
      createdAt: entity.createdAt,
    };
  }

  private deserialize(data: SerializedAnalytics): MarketingAnalyticsEntity {
    return MarketingAnalyticsEntity.reconstitute(
      data.id,
      {
        metric: AnalyticsMetricVO.create(data.metric),
        value: data.value,
        granularity: AnalyticsGranularityVO.create(data.granularity),
        recordedAt: new Date(data.recordedAt),
      },
      data.createdAt,
      data.createdAt,
      null,
    );
  }

  async findById(id: string): Promise<MarketingAnalyticsEntity | null> {
    const raw = await this.redis.get<SerializedAnalytics>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly MarketingAnalyticsEntity[]> {
    return [];
  }

  async save(entity: MarketingAnalyticsEntity): Promise<MarketingAnalyticsEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
