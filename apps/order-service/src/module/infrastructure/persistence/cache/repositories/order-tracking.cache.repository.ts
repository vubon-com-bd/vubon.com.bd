/**
 * OrderTrackingCacheRepository
 */
import { Injectable } from '@nestjs/common';
import { RedisService, BaseCacheRepository } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { OrderTrackingEntity } from '../../../../domain/entities/order-tracking.entity.js';
import { TrackingStatusVO } from '../../../../domain/value-objects/primitives/tracking-status.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';

interface Snapshot {
  id: string;
  orderId: string;
  event: string;
  message: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  trackingNumber?: string;
  createdBy?: string;
  occurredAt: string;
  createdAt: string;
}

@Injectable()
export class OrderTrackingCacheRepository extends BaseCacheRepository<OrderTrackingEntity, string> {
  constructor(redis: RedisService) {
    super(redis, 'tracking', CACHE_TTL.FIVE_MINUTES);
  }

  async findById(id: string): Promise<OrderTrackingEntity | null> {
    const raw = await this.redis.get<Snapshot>(this.keyFor(id));
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly OrderTrackingEntity[]> {
    return [];
  }

  async save(entity: OrderTrackingEntity): Promise<OrderTrackingEntity> {
    const snap = this.toSnapshot(entity);
    await this.redis.raw.set(this.keyFor(entity.id), JSON.stringify(snap), 'EX', this.ttlSeconds);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.raw.del(this.keyFor(id));
  }

  private toSnapshot(entity: OrderTrackingEntity): Snapshot {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      event: entity.event.value,
      message: entity.message,
      location: entity.location,
      latitude: entity.latitude,
      longitude: entity.longitude,
      trackingNumber: entity.trackingNumber,
      createdBy: entity.createdBy,
      occurredAt: entity.occurredAt,
      createdAt: entity.createdAt,
    };
  }

  private toDomain(raw: Snapshot): OrderTrackingEntity {
    return OrderTrackingEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt,
      updatedAt: raw.createdAt,
      props: {
        orderId: OrderIdVO.reconstitute(raw.orderId),
        event: TrackingStatusVO.reconstitute(raw.event),
        message: raw.message,
        location: raw.location,
        latitude: raw.latitude,
        longitude: raw.longitude,
        trackingNumber: raw.trackingNumber,
        createdBy: raw.createdBy,
        occurredAt: raw.occurredAt,
      },
    });
  }
}
