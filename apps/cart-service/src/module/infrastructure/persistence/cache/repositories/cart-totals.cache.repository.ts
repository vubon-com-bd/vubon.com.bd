/**
 * CartTotalsCacheRepository — caches cart totals
 * @module cart-service/infrastructure/persistence/cache/repositories
 */
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { CartTotalsCompositeVO } from '../../../../domain/value-objects/composites/cart-totals.vo.js';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo.js';

export const CART_TOTALS_CACHE = Symbol('CART_TOTALS_CACHE');

interface CachedTotals {
  currency: string;
  itemCount: number;
  subtotal: number;
  itemDiscounts: number;
  couponDiscount: number;
  voucherDiscount: number;
  taxAmount: number;
  shippingAmount: number;
  grandTotal: number;
}

@Injectable()
export class CartTotalsCacheRepository {
  private readonly ttl = CACHE_TTL.FIVE_MINUTES;

  constructor(@Inject(RedisService) private readonly redis: RedisService) {}

  private key(cartId: string): string {
    return `cart:${cartId}:totals:cache`;
  }

  async get(cartId: CartIdVO): Promise<CartTotalsCompositeVO | null> {
    const raw = await this.redis.get<CachedTotals>(this.key(cartId.value));
    if (!raw) return null;
    return CartTotalsCompositeVO.reconstitute(raw);
  }

  async set(cartId: CartIdVO, totals: CartTotalsCompositeVO): Promise<void> {
    const data: CachedTotals = {
      currency: totals.currency,
      itemCount: totals.itemCount,
      subtotal: totals.subtotal,
      itemDiscounts: totals.itemDiscounts,
      couponDiscount: totals.couponDiscount,
      voucherDiscount: totals.voucherDiscount,
      taxAmount: totals.taxAmount,
      shippingAmount: totals.shippingAmount,
      grandTotal: totals.grandTotal,
    };
    await this.redis.set(this.key(cartId.value), data, this.ttl);
  }

  async invalidate(cartId: CartIdVO): Promise<void> {
    await this.redis.del(this.key(cartId.value));
  }
}
