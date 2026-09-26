import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { OrderTrackingEntity } from '../../../../domain/entities/order-tracking.entity';
import { TrackingIdVO } from '../../../../domain/value-objects/primitives/tracking-id.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';

interface SerializedTracking {
  readonly id: string;
  readonly orderId: string;
  readonly status: string;
  readonly trackingNumber: string | null;
  readonly updatedAt: string;
}

const PREFIX = 'order:tracking';
const TTL_SECONDS = 60 * 30;

@Injectable()
export class OrderTrackingCacheRepository extends BaseCacheRepository<OrderTrackingEntity, TrackingIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  async findById(id: TrackingIdVO): Promise<OrderTrackingEntity | null> {
    const raw = await this.redis.get<SerializedTracking>(this.keyFor(id));
    void raw;
    return null;
  }

  async findAll(): Promise<readonly OrderTrackingEntity[]> {
    return [];
  }

  async save(entity: OrderTrackingEntity): Promise<OrderTrackingEntity> {
    const data: SerializedTracking = {
      id: entity.id.value,
      orderId: entity.orderId.value,
      status: entity.status.value,
      trackingNumber: entity.trackingNumber?.value ?? null,
      updatedAt: entity.updatedAt,
    };
    await this.redis.set(this.keyFor(entity.id), data, TTL_SECONDS);
    return entity;
  }

  async delete(id: TrackingIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async findByOrder(orderId: OrderIdVO): Promise<readonly OrderTrackingEntity[]> {
    void orderId;
    return [];
  }
}
