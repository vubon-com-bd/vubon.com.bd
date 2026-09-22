import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { VendorPerformanceEntity } from '../../../../domain/entities/vendor-performance.entity';
import { PerformanceIdVO } from '../../../../domain/value-objects/primitives/performance-id.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { RatingValueVO } from '../../../../domain/value-objects/primitives/rating-value.vo';
import { ScoreValueVO } from '../../../../domain/value-objects/primitives/score-value.vo';

interface SerializedPerformance {
  readonly id: string;
  readonly vendorId: string;
  readonly overallScore: number;
  readonly rating: number;
  readonly totalOrders: number;
  readonly completedOrders: number;
  readonly cancelledOrders: number;
  readonly avgResponseTimeHours: number;
  readonly onTimeDeliveryRate: number;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'vendor:performance';
const TTL_SECONDS = 60 * 15;

@Injectable()
export class PerformanceCacheRepository extends BaseCacheRepository<VendorPerformanceEntity, PerformanceIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: VendorPerformanceEntity): SerializedPerformance {
    return {
      id: entity.id.value,
      vendorId: entity.vendorId.value,
      overallScore: entity.overallScore.numeric,
      rating: entity.rating.value,
      totalOrders: entity.totalOrders,
      completedOrders: entity.completedOrders,
      cancelledOrders: entity.cancelledOrders,
      avgResponseTimeHours: entity.avgResponseTimeHours,
      onTimeDeliveryRate: entity.onTimeDeliveryRate,
      periodStart: entity.periodStart.toISOString(),
      periodEnd: entity.periodEnd.toISOString(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedPerformance): VendorPerformanceEntity {
    return VendorPerformanceEntity.reconstitute(
      PerformanceIdVO.create(data.id),
      {
        vendorId: VendorIdVO.create(data.vendorId),
        overallScore: ScoreValueVO.create(data.overallScore),
        rating: RatingValueVO.create(data.rating),
        totalOrders: data.totalOrders,
        completedOrders: data.completedOrders,
        cancelledOrders: data.cancelledOrders,
        avgResponseTimeHours: data.avgResponseTimeHours,
        onTimeDeliveryRate: data.onTimeDeliveryRate,
        periodStart: new Date(data.periodStart),
        periodEnd: new Date(data.periodEnd),
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: PerformanceIdVO): Promise<VendorPerformanceEntity | null> {
    const raw = await this.redis.get<SerializedPerformance>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly VendorPerformanceEntity[]> {
    return [];
  }

  async save(entity: VendorPerformanceEntity): Promise<VendorPerformanceEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: PerformanceIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
