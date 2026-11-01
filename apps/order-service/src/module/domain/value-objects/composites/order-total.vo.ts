/**
 * OrderTotalVO — Composite (breakdown)
 * @module order-service/domain/value-objects/composites
 *
 * Composite representation of order total with full breakdown.
 * (Distinct from primitives/order-total.vo.ts which holds only amount+currency.)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { OrderSubtotalVO } from '../primitives/order-subtotal.vo.js';
import { OrderDiscountVO } from '../primitives/order-discount.vo.js';
import { OrderTaxVO } from '../primitives/order-tax.vo.js';
import { OrderShippingVO } from '../primitives/order-shipping.vo.js';
import { OrderTotalVO as OrderTotalPrimitive } from '../primitives/order-total.vo.js';

export interface OrderTotalBreakdownVOProps {
  readonly subtotal: OrderSubtotalVO;
  readonly discount: OrderDiscountVO;
  readonly tax: OrderTaxVO;
  readonly shipping: OrderShippingVO;
}

export class OrderTotalBreakdownVO extends BaseVO<OrderTotalBreakdownVOProps> {
  private constructor(props: OrderTotalBreakdownVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: OrderTotalBreakdownVOProps): OrderTotalBreakdownVO {
    const vo = new OrderTotalBreakdownVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: OrderTotalBreakdownVOProps): OrderTotalBreakdownVO {
    return new OrderTotalBreakdownVO(props);
  }

  protected validate(): void {
    const v = this.value;
    const currency = v.subtotal.currency;
    if (
      v.discount.currency !== currency ||
      v.tax.currency !== currency ||
      v.shipping.currency !== currency
    ) {
      throw new ValidationError('Currency mismatch in order breakdown', 'currency');
    }
    if (v.discount.amount > v.subtotal.amount) {
      throw new ValidationError(
        'Discount cannot exceed subtotal',
        'discount',
      );
    }
  }

  // ═══ Getters ═══
  get subtotal(): OrderSubtotalVO { return this.value.subtotal; }
  get discount(): OrderDiscountVO { return this.value.discount; }
  get tax(): OrderTaxVO { return this.value.tax; }
  get shipping(): OrderShippingVO { return this.value.shipping; }

  // ═══ Computed ═══
  computeTotal(): OrderTotalPrimitive {
    const amount =
      this.subtotal.amount - this.discount.amount + this.tax.amount + this.shipping.amount;
    return OrderTotalPrimitive.create(amount, this.subtotal.currency);
  }

  get currency(): string { return this.subtotal.currency; }
}
