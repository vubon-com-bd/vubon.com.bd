import { Injectable } from '@nestjs/common';
import {
  BaseCacheRepository,
  RedisService,
} from '@vubon/shared-kernel/infrastructure';
import { DeliveryEntity } from '../../../../domain/entities/delivery.entity';
import { DeliveryIdVO } from '../../../../domain/value-objects/primitives/delivery-id.vo';

interface SerializedDelivery {
  readonly id: string;
  readonly shipmentId: string;
  readonly status: string;
  readonly type: string;
  readonly scheduledAt: string | null;
  readonly deliveredAt: string | null;
  readonly attempts: number;
  readonly maxAttempts: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'logistics:delivery';
const TTL_SECONDS = 60 * 15;

@Injectable()
export class DeliveryCacheRepository extends BaseCacheRepository<DeliveryEntity, DeliveryIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: DeliveryEntity): SerializedDelivery {
    return {
      id: entity.id.value,
      shipmentId: entity.shipmentId.value,
      status: entity.status.value,
      type: entity.type.value,
      scheduledAt: entity.scheduledAt?.toISOString() ?? null,
      deliveredAt: entity.deliveredAt?.toISOString() ?? null,
      attempts: entity.attempts,
      maxAttempts: entity.maxAttempts,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async findById(id: DeliveryIdVO): Promise<DeliveryEntity | null> {
    const raw = await this.redis.get<SerializedDelivery>(this.keyFor(id));
    if (!raw) return null;
    return null;
  }

  async findAll(): Promise<readonly DeliveryEntity[]> {
    return [];
  }

  async save(entity: DeliveryEntity): Promise<DeliveryEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: DeliveryIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
