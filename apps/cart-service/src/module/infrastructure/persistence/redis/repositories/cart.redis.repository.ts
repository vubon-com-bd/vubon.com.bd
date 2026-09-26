import { Injectable } from '@nestjs/common';
import { BaseCacheRepository } from '@vubon/shared-kernel/infrastructure';
import { RedisService } from '../redis.service';
import { CartKeys } from '../keys/cart.keys';
import { CartEntity } from '../../../../domain/entities/cart.entity';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo';
import { CartStatusVO } from '../../../../domain/value-objects/primitives/cart-status.vo';
import { CartTypeVO } from '../../../../domain/value-objects/primitives/cart-type.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { CartRepository } from '../../../../domain/repositories/cart.repository.interface';

interface SerializedCart {
  readonly id: string;
  readonly userId: string | null;
  readonly type: string;
  readonly status: string;
  readonly itemCount: number;
  readonly subtotal: number;
  readonly discountTotal: number;
  readonly taxTotal: number;
  readonly shippingTotal: number;
  readonly grandTotal: number;
  readonly currency: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'cart:entity';
const TTL_SECONDS = 86400 * 7;

@Injectable()
export class CartRedisRepository
  extends BaseCacheRepository<CartEntity, CartIdVO>
  implements CartRepository
{
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: CartEntity): SerializedCart {
    return {
      id: entity.id.value,
      userId: entity.userId?.value ?? null,
      type: entity.type.value,
      status: entity.status.value,
      itemCount: entity.itemCount,
      subtotal: entity.subtotal,
      discountTotal: entity.discountTotal,
      taxTotal: entity.taxTotal,
      shippingTotal: entity.shippingTotal,
      grandTotal: entity.grandTotal,
      currency: entity.currency,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedCart): CartEntity {
    return CartEntity.reconstitute(
      CartIdVO.create(data.id),
      {
        userId: data.userId ? UserIdVO.create(data.userId) : null,
        type: CartTypeVO.create(data.type),
        status: CartStatusVO.create(data.status),
        itemCount: data.itemCount,
        subtotal: data.subtotal,
        discountTotal: data.discountTotal,
        taxTotal: data.taxTotal,
        shippingTotal: data.shippingTotal,
        grandTotal: data.grandTotal,
        currency: data.currency,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: CartIdVO): Promise<CartEntity | null> {
    const raw = await this.redis.get<SerializedCart>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly CartEntity[]> {
    return [];
  }

  async save(entity: CartEntity): Promise<CartEntity> {
    const serialized = this.serialize(entity);
    await this.redis.set(this.keyFor(entity.id), serialized, TTL_SECONDS);
    if (entity.userId) {
      await this.redis.set(CartKeys.byUser(entity.userId.value), serialized, TTL_SECONDS);
    }
    return entity;
  }

  async delete(id: CartIdVO): Promise<void> {
    const entity = await this.findById(id);
    await this.redis.del(this.keyFor(id));
    if (entity?.userId) {
      await this.redis.del(CartKeys.byUser(entity.userId.value));
    }
  }

  async findByUserId(userId: UserIdVO): Promise<CartEntity | null> {
    const raw = await this.redis.get<SerializedCart>(CartKeys.byUser(userId.value));
    return raw ? this.deserialize(raw) : null;
  }

  async findActiveByUser(userId: UserIdVO): Promise<CartEntity | null> {
    return this.findByUserId(userId);
  }
}
