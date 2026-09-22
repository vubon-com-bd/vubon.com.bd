import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { CheckoutEntity } from '../../../../domain/entities/checkout.entity';
import { CheckoutIdVO } from '../../../../domain/value-objects/primitives/checkout-id.vo';

interface SerializedCheckout {
  readonly id: string;
  readonly customerId: string;
  readonly status: string;
  readonly step: string;
  readonly updatedAt: string;
}

const PREFIX = 'order:checkout';
const TTL_SECONDS = 60 * 30;

@Injectable()
export class CheckoutCacheRepository extends BaseCacheRepository<CheckoutEntity, CheckoutIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  async findById(id: CheckoutIdVO): Promise<CheckoutEntity | null> {
    const raw = await this.redis.get<SerializedCheckout>(this.keyFor(id));
    void raw;
    return null;
  }

  async findAll(): Promise<readonly CheckoutEntity[]> {
    return [];
  }

  async save(entity: CheckoutEntity): Promise<CheckoutEntity> {
    const data: SerializedCheckout = {
      id: entity.id.value,
      customerId: entity.customerId.value,
      status: entity.status.value,
      step: entity.step.value,
      updatedAt: entity.updatedAt,
    };
    await this.redis.set(this.keyFor(entity.id), data, TTL_SECONDS);
    return entity;
  }

  async delete(id: CheckoutIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
