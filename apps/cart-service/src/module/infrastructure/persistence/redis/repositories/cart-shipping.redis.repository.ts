/**
 * CartShippingRedisRepository
 * @module cart-service/infrastructure/persistence/redis/repositories
 */
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { CartShippingRepository } from '../../../../domain/repositories/cart-shipping.repository.interface.js';
import { CartShippingEntity } from '../../../../domain/entities/cart-shipping.entity.js';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo.js';
import { CartShippingMethodVO } from '../../../../domain/value-objects/primitives/cart-shipping-method.vo.js';
import { SHIPPING_KEYS } from '../keys/shipping-tax.keys.js';

interface Serialized {
  id: string;
  cartId: string;
  method: string;
  cost: number;
  currency: string;
  freeShippingThreshold: number;
  addressId?: string;
}

@Injectable()
export class CartShippingRedisRepository implements CartShippingRepository {
  private readonly ttl = CACHE_TTL.SEVEN_DAYS;

  constructor(@Inject(RedisService) private readonly redis: RedisService) {}

  async findById(id: string): Promise<CartShippingEntity | null> {
    const raw = await this.redis.get<Serialized>(SHIPPING_KEYS.base(id));
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CartShippingEntity[]> {
    return [];
  }

  async save(e: CartShippingEntity): Promise<CartShippingEntity> {
    await this.redis.set(SHIPPING_KEYS.byCart(e.cartId.value), this.toPersistence(e), this.ttl);
    return e;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(SHIPPING_KEYS.base(id));
  }

  async exists(id: string): Promise<boolean> {
    return this.redis.exists(SHIPPING_KEYS.base(id));
  }

  async findByCartId(cartId: CartIdVO): Promise<CartShippingEntity | null> {
    const raw = await this.redis.get<Serialized>(SHIPPING_KEYS.byCart(cartId.value));
    return raw ? this.toDomain(raw) : null;
  }

  async findByAddressId(_addressId: string): Promise<readonly CartShippingEntity[]> {
    return [];
  }

  async upsertForCart(_cartId: CartIdVO, entity: CartShippingEntity): Promise<CartShippingEntity> {
    return this.save(entity);
  }

  async deleteByCartId(cartId: CartIdVO): Promise<number> {
    const existed = (await this.findByCartId(cartId)) !== null;
    await this.redis.del(SHIPPING_KEYS.byCart(cartId.value));
    return existed ? 1 : 0;
  }

  private toPersistence(s: CartShippingEntity): Serialized {
    return {
      id: s.id,
      cartId: s.cartId.value,
      method: s.method.value,
      cost: s.cost,
      currency: s.currency,
      freeShippingThreshold: s.freeShippingThreshold,
      addressId: s.addressId,
    };
  }

  private toDomain(raw: Serialized): CartShippingEntity {
    return CartShippingEntity.reconstitute({
      id: raw.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      props: {
        cartId: CartIdVO.reconstitute(raw.cartId),
        method: CartShippingMethodVO.reconstitute(raw.method),
        cost: raw.cost,
        currency: raw.currency,
        freeShippingThreshold: raw.freeShippingThreshold,
        addressId: raw.addressId,
      },
    });
  }
}
