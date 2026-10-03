/**
 * OrderTotalVO — composite money breakdown for an order
 * @module order-service/domain/value-objects/composites
 *
 * Calculation rules:
 *  - subtotal = sum(item.lineSubtotal)
 *  - discount applied after item discounts
 *  - taxableAmount = subtotal − discounts
 *  - tax = taxableAmount × rate
 *  - total = taxableAmount + tax + shipping
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { OrderSubtotalVO } from '../primitives/order-subtotal.vo.js';
import { OrderDiscountVO } from '../primitives/order-discount.vo.js';
import { OrderTaxVO } from '../primitives/order-tax.vo.js';
import { OrderShippingVO } from '../primitives/order-shipping.vo.js';
import { OrderTotalVO } from '../primitives/order-total.vo.js';

export interface OrderTotalVOProps {
  readonly subtotal: OrderSubtotalVO;
  readonly discount: OrderDiscountVO;
  readonly tax: OrderTaxVO;
  readonly shipping: OrderShippingVO;
  readonly total: OrderTotalVO;
  readonly itemCount: number;
}

export interface OrderTotalInput {
  readonly subtotal: number;
  readonly discountAmount?: number;
  readonly taxRate?: number;
  readonly shippingCost?: number;
  readonly currency: string;
  readonly itemCount: number;
}

export class OrderTotalsCompositeVO extends BaseVO<OrderTotalVOProps> {
  private constructor(props: OrderTotalVOProps) { super(props); }

  static create(props: OrderTotalVOProps): OrderTotalsCompositeVO {
    const vo = new OrderTotalsCompositeVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: OrderTotalVOProps): OrderTotalsCompositeVO {
    return new OrderTotalsCompositeVO(props);
  }

  /** Calculate complete total breakdown from raw inputs. */
  static calculate(input: OrderTotalInput): OrderTotalsCompositeVO {
    const currency = input.currency;
    const subtotal = Math.max(0, input.subtotal);
    const discountAmount = Math.min(input.discountAmount ?? 0, subtotal);
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const taxRate = input.taxRate ?? 0;
    const taxAmount = Math.round(taxableAmount * taxRate * 100) / 100;
    const shippingCost = Math.max(0, input.shippingCost ?? 0);
    const total = Math.round((taxableAmount + taxAmount + shippingCost) * 100) / 100;

    return new OrderTotalsCompositeVO({
      subtotal: OrderSubtotalVO.create(subtotal, currency),
      discount: OrderDiscountVO.create(discountAmount, currency),
      tax: OrderTaxVO.create(taxAmount, currency, taxRate),
      shipping: OrderShippingVO.create(shippingCost, currency),
      total: OrderTotalVO.create(total, currency),
      itemCount: input.itemCount,
    });
  }

  static empty(currency: string): OrderTotalsCompositeVO {
    return new OrderTotalsCompositeVO({
      subtotal: OrderSubtotalVO.zero(currency),
      discount: OrderDiscountVO.zero(currency),
      tax: OrderTaxVO.zero(currency),
      shipping: OrderShippingVO.free(currency),
      total: OrderTotalVO.create(0, currency),
      itemCount: 0,
    });
  }

  protected validate(): void {
    const v = this.value;
    if (v.itemCount < 0) {
      throw new ValidationError('Item count cannot be negative', 'itemCount');
    }
    const expected = Math.round(
      (v.subtotal.amount - v.discount.amount + v.tax.amount + v.shipping.amount) * 100,
    ) / 100;
    if (Math.abs(expected - v.total.amount) > 0.01) {
      throw new ValidationError(
        `Total mismatch: expected ${expected}, got ${v.total.amount}`,
        'total',
      );
    }
  }

  get subtotal(): OrderSubtotalVO { return this.value.subtotal; }
  get discount(): OrderDiscountVO { return this.value.discount; }
  get tax(): OrderTaxVO { return this.value.tax; }
  get shipping(): OrderShippingVO { return this.value.shipping; }
  get total(): OrderTotalVO { return this.value.total; }
  get itemCount(): number { return this.value.itemCount; }
  get currency(): string { return this.value.total.currency; }

  get taxableAmount(): number {
    return Math.round((this.subtotal.amount - this.discount.amount) * 100) / 100;
  }

  get totalDiscounts(): number {
    return this.discount.amount;
  }

  get hasDiscount(): boolean {
    return this.discount.amount > 0;
  }

  get hasTax(): boolean {
    return this.tax.amount > 0;
  }

  get hasFreeShipping(): boolean {
    return this.shipping.isFree;
  }

  get isEmpty(): boolean {
    return this.itemCount === 0;
  }

  /** Effective discount rate (0-100). */
  get discountPercent(): number {
    if (this.subtotal.amount === 0) return 0;
    return Math.round((this.discount.amount / this.subtotal.amount) * 100);
  }
}
