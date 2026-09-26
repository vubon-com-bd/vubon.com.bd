import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo';
import { CartStatusVO } from '../../../../domain/value-objects/primitives/cart-status.vo';
import { CartSummaryVO } from '../../../../domain/value-objects/composites/cart-summary.vo';

const PREFIX = 'cart:summary';
const TTL_SECONDS = 60 * 15;

interface SerializedSummary {
  readonly cartId: string;
  readonly status: string;
  readonly itemCount: number;
  readonly subtotal: number;
  readonly discountTotal: number;
  readonly grandTotal: number;
  readonly currency: string;
  readonly hasCoupon: boolean;
  readonly hasVoucher: boolean;
}

@Injectable()
export class CartSummaryCacheRepository {
  constructor(private readonly redis: RedisService) {}

  private keyFor(cartId: CartIdVO): string {
    return `${PREFIX}:${cartId.value}`;
  }

  async find(cartId: CartIdVO): Promise<CartSummaryVO | null> {
    const raw = await this.redis.get<SerializedSummary>(this.keyFor(cartId));
    if (!raw) return null;
    return CartSummaryVO.create({
      cartId: CartIdVO.create(raw.cartId),
      status: CartStatusVO.create(raw.status),
      itemCount: raw.itemCount,
      subtotal: raw.subtotal,
      discountTotal: raw.discountTotal,
      grandTotal: raw.grandTotal,
      currency: raw.currency,
      hasCoupon: raw.hasCoupon,
      hasVoucher: raw.hasVoucher,
    });
  }

  async save(cartId: CartIdVO, summary: CartSummaryVO): Promise<void> {
    const payload: SerializedSummary = {
      cartId: summary.cartId.value,
      status: summary.status.value,
      itemCount: summary.itemCount,
      subtotal: summary.subtotal,
      discountTotal: summary.discountTotal,
      grandTotal: summary.grandTotal,
      currency: summary.currency,
      hasCoupon: summary.hasCoupon,
      hasVoucher: summary.hasVoucher,
    };
    await this.redis.set(this.keyFor(cartId), payload, TTL_SECONDS);
  }

  async invalidate(cartId: CartIdVO): Promise<void> {
    await this.redis.del(this.keyFor(cartId));
  }
}
