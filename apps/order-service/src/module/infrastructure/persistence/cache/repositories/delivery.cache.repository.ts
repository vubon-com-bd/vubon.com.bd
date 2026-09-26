import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { DeliveryEntity } from '../../../../domain/entities/delivery.entity';
import { DeliveryIdVO } from '../../../../domain/value-objects/primitives/delivery-id.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';

interface SerializedDelivery {
  readonly id: string;
  readonly orderId: string;
  readonly status: string;
  readonly type: string;
  readonly updatedAt: string;
}

const PREFIX = 'order:delivery';
const TTL_SECONDS = 60 * 30;

@Injectable()
export class DeliveryCacheRepository extends BaseCacheRepository<DeliveryEntity, DeliveryIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  async findById(id: DeliveryIdVO): Promise<DeliveryEntity | null> {
    const raw = await this.redis.get<SerializedDelivery>(this.keyFor(id));
    void raw;
    return null;
  }

  async findAll(): Promise<readonly DeliveryEntity[]> {
    return [];
  }

  async save(entity: DeliveryEntity): Promise<DeliveryEntity> {
    const data: SerializedDelivery = {
      id: entity.id.value,
      orderId: entity.orderId.value,
      status: entity.status.value,
      type: entity.type.value,
      updatedAt: entity.updatedAt,
    };
    await this.redis.set(this.keyFor(entity.id), data, TTL_SECONDS);
    return entity;
  }

  async delete(id: DeliveryIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async findByOrder(orderId: OrderIdVO): Promise<DeliveryEntity | null> {
    void orderId;
    return null;
  }
}
