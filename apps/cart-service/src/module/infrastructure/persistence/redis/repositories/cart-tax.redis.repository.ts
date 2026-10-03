/**
 * CartTaxRedisRepository
 * @module cart-service/infrastructure/persistence/redis/repositories
 */
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { CartTaxRepository } from '../../../../domain/repositories/cart-tax.repository.interface.js';
import { CartTaxEntity } from '../../../../domain/entities/cart-tax.entity.js';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo.js';
import { CartTaxIdVO } from '../../../../domain/value-objects/primitives/cart-tax-id.vo.js';
import { CartTaxRateVO } from '../../../../domain/value-objects/primitives/cart-tax-rate.vo.js';
import { TAX_KEYS } from '../keys/shipping-tax.keys.js';

interface Serialized {
  id: string;
  cartId: string;
  rate: number;
  inclusive: boolean;
  region?: string;
}

@Injectable()
export class CartTaxRedisRepository implements CartTaxRepository {
  private readonly ttl = CACHE_TTL.SEVEN_DAYS;

  constructor(@Inject(RedisService) private readonly redis: RedisService) {}

  async findById(id: string): Promise<CartTaxEntity | null> {
    const raw = await this.redis.get<Serialized>(TAX_KEYS.base(id));
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CartTaxEntity[]> {
    return [];
  }

  async save(e: CartTaxEntity): Promise<CartTaxEntity> {
    await this.redis.set(TAX_KEYS.byCart(e.cartId.value), this.toPersistence(e), this.ttl);
    return e;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(TAX_KEYS.base(id));
  }

  async exists(id: string): Promise<boolean> {
    return this.redis.exists(TAX_KEYS.base(id));
  }

  async findByCartId(cartId: CartIdVO): Promise<CartTaxEntity | null> {
    const raw = await this.redis.get<Serialized>(TAX_KEYS.byCart(cartId.value));
    return raw ? this.toDomain(raw) : null;
  }

  async findByRegion(_region: string): Promise<readonly CartTaxEntity[]> {
    return [];
  }

  async upsertForCart(_cartId: CartIdVO, entity: CartTaxEntity): Promise<CartTaxEntity> {
    return this.save(entity);
  }

  async deleteByCartId(cartId: CartIdVO): Promise<number> {
    const existed = (await this.findByCartId(cartId)) !== null;
    await this.redis.del(TAX_KEYS.byCart(cartId.value));
    return existed ? 1 : 0;
  }

  private toPersistence(t: CartTaxEntity): Serialized {
    return {
      id: t.id,
      cartId: t.cartId.value,
      rate: t.rate.percent,
      inclusive: t.inclusive,
      region: t.region,
    };
  }

  private toDomain(raw: Serialized): CartTaxEntity {
    return CartTaxEntity.reconstitute({
      id: raw.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      props: {
        cartId: CartIdVO.reconstitute(raw.cartId),
        rate: CartTaxRateVO.reconstitute(raw.rate),
        inclusive: raw.inclusive,
        region: raw.region,
      },
    });
  }
}

void CartTaxIdVO;
