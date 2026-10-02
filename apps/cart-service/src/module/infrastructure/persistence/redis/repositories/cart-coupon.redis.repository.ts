/**
 * CartCouponRedisRepository
 * @module cart-service/infrastructure/persistence/redis/repositories
 */
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { CartCouponRepository } from '../../../../domain/repositories/cart-coupon.repository.interface.js';
import { CartCouponEntity } from '../../../../domain/entities/cart-coupon.entity.js';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo.js';
import { CouponCodeVO } from '../../../../domain/value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '../../../../domain/value-objects/primitives/coupon-status.vo.js';
import { COUPON_KEYS } from '../keys/coupon.keys.js';

interface SerializedCoupon {
  id: string;
  cartId: string;
  code: string;
  status: string;
  discountAmount: number;
  currency: string;
  appliedAt: string;
}

@Injectable()
export class CartCouponRedisRepository implements CartCouponRepository {
  private readonly ttl = CACHE_TTL.SEVEN_DAYS;

  constructor(
    @Inject(RedisService) private readonly redis: RedisService,
  ) {}

  async findById(id: string): Promise<CartCouponEntity | null> {
    const raw = await this.redis.get<SerializedCoupon>(`cart-coupon:${id}`);
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CartCouponEntity[]> {
    return [];
  }

  async save(entity: CartCouponEntity): Promise<CartCouponEntity> {
    const data = this.toPersistence(entity);
    await this.redis.set(COUPON_KEYS.cartCoupon(entity.cartId.value), data, this.ttl);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(`cart-coupon:${id}`);
  }

  async exists(id: string): Promise<boolean> {
    return this.redis.exists(`cart-coupon:${id}`);
  }

  async findByCartId(cartId: CartIdVO): Promise<CartCouponEntity | null> {
    const raw = await this.redis.get<SerializedCoupon>(COUPON_KEYS.cartCoupon(cartId.value));
    return raw ? this.toDomain(raw) : null;
  }

  async findByCode(cartId: CartIdVO, code: string): Promise<CartCouponEntity | null> {
    const coupon = await this.findByCartId(cartId);
    return coupon && coupon.code.value === code.toUpperCase() ? coupon : null;
  }

  async findActiveByCartId(cartId: CartIdVO): Promise<CartCouponEntity | null> {
    const coupon = await this.findByCartId(cartId);
    return coupon && coupon.isActive() ? coupon : null;
  }

  async existsByCartId(cartId: CartIdVO): Promise<boolean> {
    return (await this.findByCartId(cartId)) !== null;
  }

  async deleteByCartId(cartId: CartIdVO): Promise<number> {
    const existed = await this.existsByCartId(cartId);
    await this.redis.del(COUPON_KEYS.cartCoupon(cartId.value));
    return existed ? 1 : 0;
  }

  private toPersistence(c: CartCouponEntity): SerializedCoupon {
    return {
      id: c.id,
      cartId: c.cartId.value,
      code: c.code.value,
      status: c.status.value,
      discountAmount: c.discountAmount,
      currency: c.currency,
      appliedAt: c.appliedAt,
    };
  }

  private toDomain(raw: SerializedCoupon): CartCouponEntity {
    return CartCouponEntity.reconstitute({
      id: raw.id,
      createdAt: raw.appliedAt,
      updatedAt: raw.appliedAt,
      props: {
        cartId: CartIdVO.reconstitute(raw.cartId),
        code: CouponCodeVO.reconstitute(raw.code),
        status: CouponStatusVO.reconstitute(raw.status),
        discountAmount: raw.discountAmount,
        currency: raw.currency,
        appliedAt: raw.appliedAt,
      },
    });
  }
}
