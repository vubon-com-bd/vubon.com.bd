/**
 * CartCouponRedisRepository — stub
 * @module cart-service/infrastructure/persistence/redis/repositories
 */
import { Injectable } from '@nestjs/common';
import type { CartCouponRepository } from '../../../../domain/repositories/cart-coupon.repository.interface.js';
import { CartCouponEntity } from '../../../../domain/entities/cart-coupon.entity.js';
import { CartRedisService } from '../redis.service.js';
import { CartCouponKeys } from '../keys/coupon.keys.js';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo.js';
import { CouponCodeVO } from '../../../../domain/value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '../../../../domain/value-objects/primitives/coupon-status.vo.js';
import { CouponDiscountVO } from '../../../../domain/value-objects/primitives/coupon-discount.vo.js';

const DEFAULT_TTL = 7 * 24 * 60 * 60;

@Injectable()
export class CartCouponRedisRepository implements CartCouponRepository {
  constructor(private readonly redis: CartRedisService) {}

  async findById(_id: string): Promise<CartCouponEntity | null> {
    return null;
  }

  async findAll(): Promise<readonly CartCouponEntity[]> {
    return [];
  }

  async exists(id: string): Promise<boolean> {
    return this.redis.exists(CartCouponKeys.byId(id));
  }

  async findByCartId(cartId: string): Promise<readonly CartCouponEntity[]> {
    const ids = (await this.redis.get<readonly string[]>(CartCouponKeys.byCart(cartId))) ?? [];
    const out: CartCouponEntity[] = [];
    for (const id of ids) {
      const raw = await this.redis.get<Record<string, unknown>>(CartCouponKeys.byId(id));
      if (raw) out.push(this.fromRaw(raw));
    }
    return out;
  }

  async findUsableByCartId(cartId: string): Promise<CartCouponEntity | null> {
    const list = await this.findByCartId(cartId);
    return list.find((c) => c.isUsable()) ?? null;
  }

  async existsByCartAndCode(cartId: string, code: string): Promise<boolean> {
    return this.redis.exists(CartCouponKeys.byCartCode(cartId, code));
  }

  async findByCartAndCode(cartId: string, code: string): Promise<CartCouponEntity | null> {
    const id = await this.redis.get<string>(CartCouponKeys.byCartCode(cartId, code));
    if (!id) return null;
    const raw = await this.redis.get<Record<string, unknown>>(CartCouponKeys.byId(id));
    return raw ? this.fromRaw(raw) : null;
  }

  async findByCode(_code: string): Promise<readonly CartCouponEntity[]> {
    return [];
  }

  async findByStatus(_status: string): Promise<readonly CartCouponEntity[]> {
    return [];
  }

  async findExpired(_beforeDate: Date): Promise<readonly CartCouponEntity[]> {
    return [];
  }

  async findPaginated(_options: unknown): Promise<never> {
    throw new Error('Not implemented');
  }

  async getStats(_filter?: unknown): Promise<never> {
    throw new Error('Not implemented');
  }

  async deleteByCartId(_cartId: string): Promise<number> {
    return 0;
  }

  async bulkUpdateStatus(_ids: readonly string[], _status: string): Promise<number> {
    return 0;
  }

  async softDelete(_id: string, _deletedBy?: string): Promise<void> {
    // N/A
  }

  async restore(_id: string): Promise<void> {
    // N/A
  }

  async save(entity: CartCouponEntity): Promise<CartCouponEntity> {
    const raw = {
      id: entity.id,
      cartId: entity.cartId.value,
      code: entity.code.value,
      status: entity.status.value,
      discountType: entity.discount.type,
      discountValue: entity.discount.value_,
      appliedDiscountAmount: entity.appliedDiscountAmount,
      currency: entity.currency,
      minOrderAmount: entity.minOrderAmount ?? null,
      expiresAt: entity.expiresAt,
      updatedAt: entity.updatedAtInternal,
    };
    await this.redis.set(CartCouponKeys.byId(entity.id), raw, DEFAULT_TTL);
    await this.addToSet(CartCouponKeys.byCart(entity.cartId.value), entity.id);
    await this.redis.set(
      CartCouponKeys.byCartCode(entity.cartId.value, entity.code.value),
      entity.id,
      DEFAULT_TTL,
    );
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(CartCouponKeys.byId(id));
  }

  private async addToSet(key: string, value: string): Promise<void> {
    const set = (await this.redis.get<readonly string[]>(key)) ?? [];
    if (!set.includes(value)) {
      await this.redis.set(key, [...set, value], DEFAULT_TTL);
    }
  }

  private fromRaw(raw: Record<string, unknown>): CartCouponEntity {
    return CartCouponEntity.reconstitute({
      id: raw['id'] as string,
      createdAt: new Date(raw['updatedAt'] as string).toISOString(),
      updatedAt: new Date(raw['updatedAt'] as string).toISOString(),
      props: {
        cartId: CartIdVO.reconstitute(raw['cartId'] as string),
        code: CouponCodeVO.reconstitute(raw['code'] as string),
        status: CouponStatusVO.reconstitute(raw['status'] as string),
        discount: CouponDiscountVO.reconstitute({
          type: raw['discountType'] as 'percentage' | 'fixed',
          value: raw['discountValue'] as number,
        }),
        appliedDiscountAmount: raw['appliedDiscountAmount'] as number,
        currency: raw['currency'] as string,
        minOrderAmount: (raw['minOrderAmount'] as number | null) ?? undefined,
        expiresAt: raw['expiresAt'] as string,
      },
    });
  }
}
