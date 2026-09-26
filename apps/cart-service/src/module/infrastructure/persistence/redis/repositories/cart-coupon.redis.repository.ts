import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { CouponKeys } from '../keys/coupon.keys';
import { CartCouponEntity } from '../../../../domain/entities/cart-coupon.entity';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo';
import { CouponCodeVO } from '../../../../domain/value-objects/primitives/coupon-code.vo';
import { CouponDiscountVO } from '../../../../domain/value-objects/primitives/coupon-discount.vo';
import { CouponStatusVO } from '../../../../domain/value-objects/primitives/coupon-status.vo';
import type { CartCouponRepository } from '../../../../domain/repositories/cart-coupon.repository.interface';

interface SerializedCoupon {
  readonly id: string;
  readonly cartId: string;
  readonly code: string;
  readonly discount: number;
  readonly status: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'cart:coupon';
const TTL_SECONDS = 3600;

@Injectable()
export class CartCouponRedisRepository
  extends BaseCacheRepository<CartCouponEntity, string>
  implements CartCouponRepository
{
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: CartCouponEntity): SerializedCoupon {
    return {
      id: entity.id,
      cartId: entity.cartId.value,
      code: entity.code.value,
      discount: entity.discount.discount,
      status: entity.status.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(data: SerializedCoupon): CartCouponEntity {
    return CartCouponEntity.reconstitute(
      data.id,
      {
        cartId: CartIdVO.create(data.cartId),
        code: CouponCodeVO.create(data.code),
        discount: CouponDiscountVO.create(data.discount),
        status: CouponStatusVO.create(data.status),
      },
      data.createdAt,
      data.updatedAt,
      null,
    );
  }

  async findById(id: string): Promise<CartCouponEntity | null> {
    const raw = await this.redis.get<SerializedCoupon>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly CartCouponEntity[]> {
    return [];
  }

  async save(entity: CartCouponEntity): Promise<CartCouponEntity> {
    const serialized = this.serialize(entity);
    await this.redis.set(this.keyFor(entity.id), serialized, TTL_SECONDS);
    await this.redis.set(CouponKeys.byCart(entity.cartId.value), serialized, TTL_SECONDS);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async findByCartId(cartId: CartIdVO): Promise<CartCouponEntity | null> {
    const raw = await this.redis.get<SerializedCoupon>(CouponKeys.byCart(cartId.value));
    return raw ? this.deserialize(raw) : null;
  }

  async deleteByCartId(cartId: CartIdVO): Promise<void> {
    await this.redis.del(CouponKeys.byCart(cartId.value));
  }
}
