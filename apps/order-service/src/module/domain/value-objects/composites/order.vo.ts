/**
 * OrderVO — aggregate snapshot of an order
 * @module order-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ORDER_LIMIT } from '@vubon/shared-constants/business/order';
import { OrderIdVO } from '../primitives/order-id.vo.js';
import { OrderNumberVO } from '../primitives/order-number.vo.js';
import { OrderStatusVO } from '../primitives/order-status.vo.js';
import { OrderTypeVO } from '../primitives/order-type.vo.js';
import { OrderPriorityVO } from '../primitives/order-priority.vo.js';
import { CustomerIdVO } from '../primitives/customer-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { PaymentIdVO } from '../primitives/payment-id.vo.js';
import { OrderItemVO } from './order-item.vo.js';

export interface OrderVOProps {
  readonly id: OrderIdVO;
  readonly orderNumber: OrderNumberVO;
  readonly customerId: CustomerIdVO;
  readonly vendorIds: readonly VendorIdVO[];
  readonly type: OrderTypeVO;
  readonly status: OrderStatusVO;
  readonly priority: OrderPriorityVO;
  readonly items: readonly OrderItemVO[];
  readonly subtotal: number;
  readonly discountAmount: number;
  readonly taxAmount: number;
  readonly shippingAmount: number;
  readonly total: number;
  readonly currency: string;
  readonly paymentId?: PaymentIdVO;
  readonly notes?: string;
  readonly customerNotes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class OrderVO extends BaseVO<OrderVOProps> {
  private constructor(props: OrderVOProps) { super(props); }

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
    if (v.items.length === 0) {
      throw new ValidationError('Order must have at least one item', 'items');
    }
    if (v.items.length > ORDER_LIMIT.MAX_ITEMS) {
      throw new ValidationError(
        `Order cannot have more than ${ORDER_LIMIT.MAX_ITEMS} items`,
        'items',
      );
    }
    if (v.subtotal < 0 || v.total < 0) {
      throw new ValidationError('Amounts cannot be negative', 'total');
    }
    if (v.currency.length !== 3) {
      throw new ValidationError('Currency must be 3-char code', 'currency');
    }
    // Currency consistency — all items must match order currency
    const mismatched = v.items.find((i) => i.currency !== v.currency);
    if (mismatched) {
      throw new ValidationError(
        `Item currency "${mismatched.currency}" does not match order "${v.currency}"`,
        'currency',
      );
    }
    // Total consistency check
    const expectedTotal = this.calcExpectedTotal();
    if (Math.abs(expectedTotal - v.total) > 0.01) {
      throw new ValidationError(
        `Total mismatch: expected ${expectedTotal}, got ${v.total}`,
        'total',
      );
    }
  }

  private calcExpectedTotal(): number {
    const v = this.value;
    return Math.round((v.subtotal - v.discountAmount + v.taxAmount + v.shippingAmount) * 100) / 100;
  }

  get id(): OrderIdVO { return this.value.id; }
  get orderNumber(): OrderNumberVO { return this.value.orderNumber; }
  get customerId(): CustomerIdVO { return this.value.customerId; }
  get vendorIds(): readonly VendorIdVO[] { return this.value.vendorIds; }
  get type(): OrderTypeVO { return this.value.type; }
  get status(): OrderStatusVO { return this.value.status; }
  get priority(): OrderPriorityVO { return this.value.priority; }
  get items(): readonly OrderItemVO[] { return this.value.items; }
  get subtotal(): number { return this.value.subtotal; }
  get discountAmount(): number { return this.value.discountAmount; }
  get taxAmount(): number { return this.value.taxAmount; }
  get shippingAmount(): number { return this.value.shippingAmount; }
  get total(): number { return this.value.total; }
  get currency(): string { return this.value.currency; }
  get paymentId(): PaymentIdVO | undefined { return this.value.paymentId; }
  get notes(): string | undefined { return this.value.notes; }
  get customerNotes(): string | undefined { return this.value.customerNotes; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  get itemCount(): number {
    return this.items.reduce((sum, i) => sum + i.quantity.value, 0);
  }

  get uniqueItemCount(): number {
    return this.items.length;
  }

  get hasMultipleVendors(): boolean {
    return this.vendorIds.length > 1;
  }

  isPaid(): boolean {
    return this.paymentId !== undefined;
  }

  isActive(): boolean {
    return this.status.isActive();
  }

  isFinal(): boolean {
    return this.status.isFinal();
  }

  /** Can the order still be cancelled? */
  canCancel(): boolean {
    return !this.status.isShipped() && !this.status.isFinal();
  }

  /** Total number of items in a specific status. */
  countItemsByStatus(statusValue: string): number {
    return this.items.filter((i) => i.status.value === statusValue).length;
  }

  /** Total weight (if all items have weights — not available here, returns 0). */
  get itemTotalDiscounts(): number {
    return Math.round(this.items.reduce((sum, i) => sum + i.discountAmount, 0) * 100) / 100;
  }
}
