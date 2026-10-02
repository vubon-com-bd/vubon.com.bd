/**
 * CartSummaryCacheRepository — caches cart summary view
 * @module cart-service/infrastructure/persistence/cache/repositories
 */
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo.js';

export const CART_SUMMARY_CACHE = Symbol('CART_SUMMARY_CACHE');

export interface CachedSummary {
  id: string;
  type: string;
  status: string;
  itemCount: number;
  uniqueItemCount: number;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingAmount: number;
  total: number;
  currency: string;
  hasCoupon: boolean;
  hasVoucher: boolean;
  lastActivityAt: string;
}

@Injectable()
export class CartSummaryCacheRepository {
  private readonly ttl = CACHE_TTL.FIVE_MINUTES;

  constructor(@Inject(RedisService) private readonly redis: RedisService) {}

  private key(cartId: string): string {
    return `cart:${cartId}:summary:cache`;
  }

  async get(cartId: CartIdVO): Promise<CachedSummary | null> {
    return this.redis.get<CachedSummary>(this.key(cartId.value));
  }

  async set(cartId: CartIdVO, summary: CachedSummary): Promise<void> {
    await this.redis.set(this.key(cartId.value), summary, this.ttl);
  }

  async invalidate(cartId: CartIdVO): Promise<void> {
    await this.redis.del(this.key(cartId.value));
  }
}
