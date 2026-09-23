import { Injectable } from '@nestjs/common';
import {
  BaseCacheRepository,
  RedisService,
} from '@vubon/shared-kernel/infrastructure';
import { ShippingMethodEntity } from '../../../../domain/entities/shipping-method.entity';

interface SerializedShippingMethod {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly status: string;
  readonly baseRate: number;
  readonly perKgRate: number | null;
  readonly currency: string;
  readonly estimatedDays: number | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'logistics:shipping-method';
const TTL_SECONDS = 60 * 60;

@Injectable()
export class ShippingMethodCacheRepository extends BaseCacheRepository<ShippingMethodEntity, string> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: ShippingMethodEntity): SerializedShippingMethod {
    return {
      id: entity.id,
      name: entity.name,
      type: entity.type.value,
      status: entity.status,
      baseRate: entity.baseRate,
      perKgRate: entity.perKgRate,
      currency: entity.currency,
      estimatedDays: entity.estimatedDays,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async findById(id: string): Promise<ShippingMethodEntity | null> {
    const raw = await this.redis.get<SerializedShippingMethod>(this.keyFor(id));
    if (!raw) return null;
    return null;
  }

  async findAll(): Promise<readonly ShippingMethodEntity[]> {
    return [];
  }

  async save(entity: ShippingMethodEntity): Promise<ShippingMethodEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
