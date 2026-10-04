/**
 * DeliveryCacheRepository
 */
import { Injectable } from '@nestjs/common';
import { RedisService, BaseCacheRepository } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { DeliveryEntity } from '../../../../domain/entities/delivery.entity.js';
import { DeliveryStatusVO } from '../../../../domain/value-objects/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '../../../../domain/value-objects/primitives/delivery-type.vo.js';
import { DeliveryMethodIdVO } from '../../../../domain/value-objects/primitives/delivery-method-id.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';

interface Snapshot {
  id: string;
  orderId: string;
  deliveryMethodId?: string;
  status: string;
  type: string;
  trackingNumber?: string;
  courierId?: string;
  estimatedAt?: string;
  deliveredAt?: string;
  attempts: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class DeliveryCacheRepository extends BaseCacheRepository<DeliveryEntity, string> {
  constructor(redis: RedisService) {
    super(redis, 'delivery', CACHE_TTL.FIVE_MINUTES);
  }

  async findById(id: string): Promise<DeliveryEntity | null> {
    const raw = await this.redis.get<Snapshot>(this.keyFor(id));
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly DeliveryEntity[]> {
    return [];
  }

  async save(entity: DeliveryEntity): Promise<DeliveryEntity> {
    const snap = this.toSnapshot(entity);
    await this.redis.raw.set(this.keyFor(entity.id), JSON.stringify(snap), 'EX', this.ttlSeconds);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.raw.del(this.keyFor(id));
  }

  private toSnapshot(entity: DeliveryEntity): Snapshot {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      deliveryMethodId: entity.methodId?.value,
      status: entity.status.value,
      type: entity.type.value,
      trackingNumber: entity.trackingNumber,
      courierId: entity.courierId,
      estimatedAt: entity.estimatedAt,
      deliveredAt: entity.deliveredAt,
      attempts: entity.attempts,
      notes: entity.notes,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private toDomain(raw: Snapshot): DeliveryEntity {
    return DeliveryEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      props: {
        orderId: OrderIdVO.reconstitute(raw.orderId),
        methodId: raw.deliveryMethodId ? DeliveryMethodIdVO.reconstitute(raw.deliveryMethodId) : undefined,
        status: DeliveryStatusVO.reconstitute(raw.status),
        type: DeliveryTypeVO.reconstitute(raw.type),
        trackingNumber: raw.trackingNumber,
        courierId: raw.courierId,
        estimatedAt: raw.estimatedAt,
        deliveredAt: raw.deliveredAt,
        attempts: raw.attempts,
        notes: raw.notes,
      },
    });
  }
}
