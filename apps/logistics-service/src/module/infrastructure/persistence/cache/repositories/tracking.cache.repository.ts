import { Injectable } from '@nestjs/common';
import {
  BaseCacheRepository,
  RedisService,
} from '@vubon/shared-kernel/infrastructure';
import { TrackingEntity } from '../../../../domain/entities/tracking.entity';
import { TrackingIdVO } from '../../../../domain/value-objects/primitives/tracking-id.vo';

interface SerializedTracking {
  readonly id: string;
  readonly trackingNumber: string;
  readonly shipmentId: string;
  readonly status: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'logistics:tracking';
const TTL_SECONDS = 60 * 5;

@Injectable()
export class TrackingCacheRepository extends BaseCacheRepository<TrackingEntity, TrackingIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: TrackingEntity): SerializedTracking {
    return {
      id: entity.id.value,
      trackingNumber: entity.number.value,
      shipmentId: entity.shipmentId.value,
      status: entity.status.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async findById(id: TrackingIdVO): Promise<TrackingEntity | null> {
    const raw = await this.redis.get<SerializedTracking>(this.keyFor(id));
    if (!raw) return null;
    return null;
  }

  async findAll(): Promise<readonly TrackingEntity[]> {
    return [];
  }

  async save(entity: TrackingEntity): Promise<TrackingEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: TrackingIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
