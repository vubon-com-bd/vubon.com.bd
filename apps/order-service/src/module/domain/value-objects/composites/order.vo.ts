/**
 * OrderVO — Composite Value Object
 * @module order-service/domain/value-objects/composites
 *
 * Snapshot of order core data. Immutable.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { OrderIdVO } from '../primitives/order-id.vo.js';
import { OrderNumberVO } from '../primitives/order-number.vo.js';
import { OrderStatusVO } from '../primitives/order-status.vo.js';
import { OrderChannelVO } from '../primitives/order-channel.vo.js';
import { OrderSourceVO } from '../primitives/order-source.vo.js';
import { OrderNoteVO } from '../primitives/order-note.vo.js';
import { OrderTotalVO } from '../primitives/order-total.vo.js';
import { OrderSubtotalVO } from '../primitives/order-subtotal.vo.js';
import { OrderDiscountVO } from '../primitives/order-discount.vo.js';
import { OrderTaxVO } from '../primitives/order-tax.vo.js';
import { OrderShippingVO } from '../primitives/order-shipping.vo.js';
import { CustomerIdVO } from '../primitives/customer-id.vo.js';

export interface OrderVOProps {
  readonly id: OrderIdVO;
  readonly orderNumber: OrderNumberVO;
  readonly customerId: CustomerIdVO;
  readonly status: OrderStatusVO;
  readonly channel: OrderChannelVO;
  readonly source: OrderSourceVO;
  readonly subtotal: OrderSubtotalVO;
  readonly discount: OrderDiscountVO;
  readonly tax: OrderTaxVO;
  readonly shipping: OrderShippingVO;
  readonly total: OrderTotalVO;
  readonly note?: OrderNoteVO;
}

export class OrderVO extends BaseVO<OrderVOProps> {
  private constructor(props: OrderVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: OrderVOProps): OrderVO {
    const vo = new OrderVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: OrderVOProps): OrderVO {
    return new OrderVO(props);
  }

  protected validate(): void {
    const v = this.value;
    // Total should match subtotal - discount + tax + shipping
    const expectedTotal =
      Math.round(
        (v.subtotal.amount - v.discount.amount + v.tax.amount + v.shipping.amount) * 100,
      ) / 100;
    if (Math.abs(expectedTotal - v.total.amount) > 0.01) {
      throw new ValidationError(
        `Order total mismatch: expected ${expectedTotal}, got ${v.total.amount}`,
        'total',
      );
    }
  }

  // ═══ Getters ═══
  get id(): OrderIdVO { return this.value.id; }
  get orderNumber(): OrderNumberVO { return this.value.orderNumber; }
  get customerId(): CustomerIdVO { return this.value.customerId; }
  get status(): OrderStatusVO { return this.value.status; }
  get channel(): OrderChannelVO { return this.value.channel; }
  get source(): OrderSourceVO { return this.value.source; }
  get subtotal(): OrderSubtotalVO { return this.value.subtotal; }
  get discount(): OrderDiscountVO { return this.value.discount; }
  get tax(): OrderTaxVO { return this.value.tax; }
  get shipping(): OrderShippingVO { return this.value.shipping; }
  get total(): OrderTotalVO { return this.value.total; }
  get note(): OrderNoteVO | undefined { return this.value.note; }

  // ═══ Business methods ═══
  isPending(): boolean { return this.status.isPending(); }
  isTerminal(): boolean { return this.status.isTerminal(); }
  isCancellable(): boolean { return this.status.isCancellable(); }
  hasDiscount(): boolean { return this.discount.isApplied(); }
  hasNote(): boolean { return this.note !== undefined && !this.note.isEmpty(); }
}
