/**
 * Cart Totals Composite VO — CALCULATION ENGINE
 * @module cart-service/domain/value-objects/composites
 *
 * Business rules:
 * - subtotal = sum(item.lineSubtotal)
 * - itemDiscounts = sum(item.discountAmount)
 * - couponDiscount applied after item discounts, capped at remaining subtotal
 * - voucherDiscount applied after coupon, capped at remaining subtotal
 * - taxableAmount = subtotal - itemDiscounts - couponDiscount - voucherDiscount
 * - taxAmount = taxableAmount × taxRate (unless tax-inclusive)
 * - shippingAmount = effective shipping (free if threshold hit)
 * - grandTotal = taxableAmount + taxAmount + shippingAmount
 *
 * All rounding at 2 decimals per step to avoid drift.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface CartTotalsProps {
  readonly currency: string;
  readonly itemCount: number;
  readonly subtotal: number;
  readonly itemDiscounts: number;
  readonly couponDiscount: number;
  readonly voucherDiscount: number;
  readonly taxAmount: number;
  readonly shippingAmount: number;
  readonly grandTotal: number;
}

export interface CartTotalsInput {
  readonly currency: string;
  readonly itemCount: number;
  readonly subtotal: number;
  readonly itemDiscounts?: number;
  readonly couponDiscount?: number;
  readonly voucherDiscount?: number;
  readonly taxRate?: number;
  readonly taxInclusive?: boolean;
  readonly shippingCost?: number;
}

export class CartTotalsCompositeVO extends BaseVO<CartTotalsProps> {
  private constructor(props: CartTotalsProps) {
    super(props);
  }

  static create(props: CartTotalsProps): CartTotalsCompositeVO {
    for (const [k, v] of Object.entries(props)) {
      if (typeof v === 'number' && (v < 0 || !Number.isFinite(v))) {
        throw new ValidationError(`Invalid value for ${k}: ${v}`, k);
      }
    }
    return new CartTotalsCompositeVO(props);
  }

  static reconstitute(props: CartTotalsProps): CartTotalsCompositeVO {
    return new CartTotalsCompositeVO(props);
  }

  /** Pure calculation — caller supplies already-computed item discounts etc. */
  static calculate(input: CartTotalsInput): CartTotalsCompositeVO {
    const r = (n: number): number => Math.round(n * 100) / 100;

    const subtotal = Math.max(0, input.subtotal);
    const itemDiscounts = Math.min(input.itemDiscounts ?? 0, subtotal);
    const afterItems = Math.max(0, subtotal - itemDiscounts);

    const couponDiscount = Math.min(input.couponDiscount ?? 0, afterItems);
    const afterCoupon = Math.max(0, afterItems - couponDiscount);

    const voucherDiscount = Math.min(input.voucherDiscount ?? 0, afterCoupon);
    const taxableAmount = Math.max(0, afterCoupon - voucherDiscount);

    const taxRate = input.taxRate ?? 0;
    let taxAmount = 0;
    if (taxRate > 0 && !input.taxInclusive) {
      taxAmount = r((taxableAmount * taxRate) / 100);
    }

    const shippingAmount = Math.max(0, input.shippingCost ?? 0);
    const grandTotal = r(taxableAmount + taxAmount + shippingAmount);

    return new CartTotalsCompositeVO({
      currency: input.currency,
      itemCount: input.itemCount,
      subtotal: r(subtotal),
      itemDiscounts: r(itemDiscounts),
      couponDiscount: r(couponDiscount),
      voucherDiscount: r(voucherDiscount),
      taxAmount,
      shippingAmount,
      grandTotal,
    });
  }

  static empty(currency: string): CartTotalsCompositeVO {
    return new CartTotalsCompositeVO({
      currency,
      itemCount: 0,
      subtotal: 0,
      itemDiscounts: 0,
      couponDiscount: 0,
      voucherDiscount: 0,
      taxAmount: 0,
      shippingAmount: 0,
      grandTotal: 0,
    });
  }

  get currency(): string { return this.value.currency; }
  get itemCount(): number { return this.value.itemCount; }
  get subtotal(): number { return this.value.subtotal; }
  get itemDiscounts(): number { return this.value.itemDiscounts; }
  get couponDiscount(): number { return this.value.couponDiscount; }
  get voucherDiscount(): number { return this.value.voucherDiscount; }
  get taxAmount(): number { return this.value.taxAmount; }
  get shippingAmount(): number { return this.value.shippingAmount; }
  get grandTotal(): number { return this.value.grandTotal; }

  get totalDiscounts(): number {
    return Math.round(
      (this.value.itemDiscounts + this.value.couponDiscount + this.value.voucherDiscount) * 100,
    ) / 100;
  }

  get isEmpty(): boolean {
    return this.value.itemCount === 0;
  }

  get discountPercent(): number {
    if (this.value.subtotal === 0) return 0;
    return Math.round((this.totalDiscounts / this.value.subtotal) * 100);
  }

  hasDiscount(): boolean {
    return this.totalDiscounts > 0;
  }

  hasFreeShipping(): boolean {
    return this.value.shippingAmount === 0;
  }
}
