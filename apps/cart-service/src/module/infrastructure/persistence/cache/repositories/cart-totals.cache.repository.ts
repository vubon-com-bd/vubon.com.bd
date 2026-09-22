import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo';
import { CartTotalsVO } from '../../../../domain/value-objects/composites/cart-totals.vo';

const PREFIX = 'cart:totals';
const TTL_SECONDS = 60 * 15;

interface SerializedTotals {
  readonly itemCount: number;
  readonly subtotal: number;
  readonly discountTotal: number;
  readonly taxTotal: number;
  readonly shippingTotal: number;
  readonly grandTotal: number;
  readonly currency: string;
}

@Injectable()
export class CartTotalsCacheRepository {
  constructor(private readonly redis: RedisService) {}

  private keyFor(cartId: CartIdVO): string {
    return `${PREFIX}:${cartId.value}`;
  }

  async find(cartId: CartIdVO): Promise<CartTotalsVO | null> {
    const raw = await this.redis.get<SerializedTotals>(this.keyFor(cartId));
    if (!raw) return null;
    return CartTotalsVO.create({
      itemCount: raw.itemCount,
      subtotal: raw.subtotal,
      discountTotal: raw.discountTotal,
      taxTotal: raw.taxTotal,
      shippingTotal: raw.shippingTotal,
      grandTotal: raw.grandTotal,
      currency: raw.currency,
    });
  }

  async save(cartId: CartIdVO, totals: CartTotalsVO): Promise<void> {
    const payload: SerializedTotals = {
      itemCount: totals.itemCount,
      subtotal: totals.subtotal,
      discountTotal: totals.discountTotal,
      taxTotal: totals.taxTotal,
      shippingTotal: totals.shippingTotal,
      grandTotal: totals.grandTotal,
      currency: totals.currency,
    };
    await this.redis.set(this.keyFor(cartId), payload, TTL_SECONDS);
  }

  async invalidate(cartId: CartIdVO): Promise<void> {
    await this.redis.del(this.keyFor(cartId));
  }
}
